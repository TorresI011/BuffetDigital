// ========== CATEGORÍAS: RENDER ==========
function renderCategorias() {
  const cont = document.getElementById('gridCategorias');
  if (!cont) return;
  const principales = ['asiatico','oriental','europeo','latino','rapido','vegetariano','vegano'];
  let html = `
    <div class="tarjeta-categoria destacada" onclick="abrirArmador()">
      <span>Arma tu plato</span>
      <small>Desde cero, a tu gusto</small>
    </div>`;
  principales.forEach(id => {
    html += `<div class="tarjeta-categoria img-${id}" onclick="mostrarPlatos('${id}')"><span>${CATEGORIAS[id].label}</span></div>`;
  });
  html += `<div class="tarjeta-categoria img-bebidas" onclick="mostrarSubcategoriasBebidas()"><span>Bebidas</span></div>`;
  cont.innerHTML = html;
}

// ========== SIDEBAR ==========
function toggleSidebar() {
  const sb = document.getElementById('sidebarDerecha');
  sb.classList.contains('abierto') ? cerrarSidebar() : abrirSidebar();
}
function abrirSidebar() {
  document.getElementById('sidebarDerecha').classList.add('abierto');
  document.getElementById('overlaySidebar').classList.add('visible');
  actualizarSidebarPerfil();
}
function cerrarSidebar() {
  document.getElementById('sidebarDerecha').classList.remove('abierto');
  document.getElementById('overlaySidebar').classList.remove('visible');
}
function toggleOtros() {
  document.getElementById('submenuOtros').classList.toggle('abierto');
  document.getElementById('flechaOtros').classList.toggle('rotada');
}
function actualizarSidebarPerfil() {
  const u = JSON.parse(localStorage.getItem('usuarioSesion'));
  const cont = document.getElementById('sidebarPerfil');
  if (u) {
    cont.innerHTML =
      '<div class="sidebar-perfil-activo" onclick="abrirPerfil(); cerrarSidebar();">' +
        '<div class="sidebar-avatar">' + u.nombre.trim().charAt(0).toUpperCase() + '</div>' +
        '<div class="sidebar-perfil-info">' +
          '<div class="sidebar-perfil-nombre">' + u.nombre + '</div>' +
          '<div class="sidebar-perfil-link">Ver mi perfil</div>' +
        '</div>' +
      '</div>';
  } else {
    cont.innerHTML =
      '<div class="sidebar-perfil-botones">' +
        '<button class="sidebar-btn-auth" onclick="cerrarSidebar(); abrirModal(\'modalAuth\'); cambiarVistaAuth(\'login\');">Ingresar</button>' +
        '<button class="sidebar-btn-auth principal" onclick="cerrarSidebar(); abrirModal(\'modalAuth\'); cambiarVistaAuth(\'registro\');">Registrarse</button>' +
      '</div>';
  }
}

// ========== UBICACIÓN ==========
function guardarUbicacion() {
  const zonaId = document.getElementById('selectZonaEntrega').value;
  const ciudad = document.getElementById('inputCiudad').value.trim();
  const direccion = document.getElementById('inputDireccion').value.trim();
  const zona = ZONAS_ENTREGA[zonaId];
  if (!zonaId || !zona) { mostrarToast('Selecciona una zona de entrega.', 'error'); return; }
  if (!zona.disponible) { mostrarToast('Por ahora no tenemos cobertura en esta zona.', 'error'); return; }
  if (!ciudad || !direccion) { mostrarToast('Ingresa la ciudad y tu dirección exacta.', 'error'); return; }
  const texto = zona.nombre + ' - ' + direccion.split(',')[0];
  direccionEntrega = { zona: zonaId, ciudad, direccion };
  localStorage.setItem('direccionBuffet', JSON.stringify(direccionEntrega));
  document.getElementById('txtUbicacion').innerText = texto;
  document.getElementById('txtUbicacionSidebar').innerText = texto;
  cerrarModal('modalUbicacion');
  mostrarToast(`Dirección actualizada: ${zona.nombre}.`);
  if (document.getElementById('modalCarrito').style.display === 'block') verCarrito();
}

function actualizarZonaEntrega() {
  const zona = ZONAS_ENTREGA[document.getElementById('selectZonaEntrega').value];
  const estado = document.getElementById('estadoZonaEntrega');
  if (!zona) {
    estado.className = 'estado-zona-entrega';
    estado.innerText = 'Selecciona una zona para continuar.';
    return;
  }
  estado.className = 'estado-zona-entrega ' + (zona.disponible ? 'disponible' : 'no-disponible');
  estado.innerText = zona.disponible ? `Disponible · ${zona.tiempo} · Envío desde ${fmt(zona.envio)}` : 'Aún no tenemos cobertura en esta zona.';
}

