// ========== MODALES Y AUTH ==========
//
// ⚠️ AVISO DE SEGURIDAD
// Cuando la API (API_BASE_URL) no responde, esta app cae a un modo local
// que guarda usuarios en localStorage. Ese modo es SOLO para demo/desarrollo
// sin backend: cualquier persona con acceso al navegador puede abrir las
// DevTools y editar localStorage a mano (por ejemplo poner "admin": true
// en "usuarioSesion"), así que ningún permiso decidido aquí es realmente
// seguro. Hasheamos la contraseña antes de guardarla para no dejarla en
// texto plano a simple vista, pero eso NO reemplaza tener un backend real:
// la verificación de contraseña y de permisos de administrador debe
// hacerse siempre en el servidor (como ya intenta hacer apiRequest), y
// Admin/admin.html debería exigir una sesión válida emitida por ese
// servidor en vez de confiar en lo que hay en localStorage.
async function hashPassword(texto) {
  const datos = new TextEncoder().encode(texto);
  const buffer = await crypto.subtle.digest('SHA-256', datos);
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function abrirModal(id) { document.getElementById(id).style.display = 'block'; }
function cerrarModal(id) { document.getElementById(id).style.display = 'none'; }

function gestionarClicAuth() {
  const u = JSON.parse(localStorage.getItem('usuarioSesion'));
  if (u) {
    document.getElementById('dropdownUsuario').classList.toggle('mostrar');
  } else {
    abrirModal('modalAuth');
    cambiarVistaAuth('login');
  }
}

window.onclick = function(ev) {
  if (!ev.target.matches('#btnAuthTrigger')) {
    document.querySelectorAll('.dropdown-contenido.mostrar')
      .forEach(d => d.classList.remove('mostrar'));
  }
};

function cambiarVistaAuth(v) {
  document.getElementById('vistaLogin').style.display    = v === 'login'    ? 'block' : 'none';
  document.getElementById('vistaRegistro').style.display = v === 'registro' ? 'block' : 'none';
}

const API_BASE_URL = 'http://localhost:8000';

async function apiRequest(path, options = {}, fallbackValue = null) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || 'Error de API');
    }
    return data;
  } catch (error) {
    console.warn('La API local no está disponible:', error.message);
    return fallbackValue;
  }
}

function obtenerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem('usuariosBuffet') || '[]');
  } catch (error) {
    return [];
  }
}

function guardarUsuarios(usuarios) {
  localStorage.setItem('usuariosBuffet', JSON.stringify(usuarios));
}

async function asegurarUsuarioAdmin() {
  const respuesta = await apiRequest('/api/usuarios/ensure-admin', { method: 'POST' }, { ok: true });
  if (respuesta && respuesta.ok) {
    return;
  }

  const usuarios = obtenerUsuarios();
  const adminExiste = usuarios.some(usuario => usuario.correo === 'admin@buffetdigital.com');
  if (!adminExiste) {
    usuarios.push({
      id: 1,
      nombre: 'Administrador',
      correo: 'admin@buffetdigital.com',
      password: await hashPassword('admin123'), // recuerda cambiar esta clave por defecto
      admin: true
    });
    guardarUsuarios(usuarios);
  }
}

async function procesarRegistro() {
  const nombre = document.getElementById('regNombre').value.trim();
  const correo = document.getElementById('regCorreo').value.trim().toLowerCase();
  const pass = document.getElementById('regPass').value;
  if (!nombre || !correo || !pass) { alert('Llena todos los campos.'); return; }

  const respuesta = await apiRequest('/api/usuarios/register', {
    method: 'POST',
    body: JSON.stringify({ nombre, correo, password: pass })
  });

  if (respuesta && respuesta.ok) {
    alert('Cuenta creada. Ya puedes ingresar.');
    cambiarVistaAuth('login');
    return;
  }

  const usuarios = obtenerUsuarios();
  if (usuarios.some(usuario => usuario.correo === correo)) {
    alert('Ya existe una cuenta con ese correo.');
    return;
  }

  usuarios.push({ id: Date.now(), nombre, correo, password: await hashPassword(pass), admin: false });
  guardarUsuarios(usuarios);
  alert('Cuenta creada. Ya puedes ingresar.');
  cambiarVistaAuth('login');
}

async function procesarLogin() {
  const correo = document.getElementById('loginCorreo').value.trim().toLowerCase();
  const pass = document.getElementById('loginPass').value;
  if (!correo || !pass) { alert('Ingresa tu correo y contraseña.'); return; }

  await asegurarUsuarioAdmin();

  const respuesta = await apiRequest('/api/usuarios/login', {
    method: 'POST',
    body: JSON.stringify({ correo, password: pass })
  });

  if (respuesta && respuesta.ok && respuesta.user) {
    const u = respuesta.user;
    localStorage.setItem('usuarioSesion', JSON.stringify({
      id: u.id,
      nombre: u.nombre,
      correo: u.correo,
      admin: Boolean(u.admin)
    }));

    cerrarModal('modalAuth');
    if (esAdministrador({ ...u, admin: Boolean(u.admin) })) { window.location.href = 'Admin/admin.html'; return; }
    verificarSesion();
    alert('Hola, ' + u.nombre);
    return;
  }

  const passHash = await hashPassword(pass);
  const usuarios = obtenerUsuarios();
  const u = usuarios.find(usuario => usuario.correo === correo && usuario.password === passHash);

  if (!u) {
    alert('Los datos ingresados no coinciden.');
    return;
  }

  localStorage.setItem('usuarioSesion', JSON.stringify({
    id: u.id,
    nombre: u.nombre,
    correo: u.correo,
    admin: Boolean(u.admin)
  }));

  cerrarModal('modalAuth');
  if (esAdministrador({ ...u, admin: Boolean(u.admin) })) { window.location.href = 'Admin/admin.html'; return; }
  verificarSesion();
  alert('Hola, ' + u.nombre);
}

function verificarSesion() {
  const u = JSON.parse(localStorage.getItem('usuarioSesion'));
  document.getElementById('btnAuthTrigger').innerHTML = u
    ? 'Mi cuenta (' + u.nombre.split(' ')[0] + ') ▾'
    : 'Ingresar';
  actualizarSidebarPerfil();
  const enlaceAdmin = document.getElementById('enlaceAdmin');
  if (enlaceAdmin) enlaceAdmin.style.display = esAdministrador(u) ? 'block' : 'none';
}

function abrirPerfil() {
  const u = JSON.parse(localStorage.getItem('usuarioSesion'));
  if (!u) return;
  document.getElementById('perfilNombre').innerText = u.nombre;
  document.getElementById('perfilCorreo').innerText = u.correo;
  abrirModal('modalPerfil');
}

function cerrarSesion() {
  localStorage.removeItem('usuarioSesion');
  verificarSesion();
  alert('Sesión cerrada.');
}


