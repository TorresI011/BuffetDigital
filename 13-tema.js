// ========== TEMA CLARO / OSCURO ==========
function aplicarTema(modo) {
  const oscuro = modo === 'oscuro';
  document.body.classList.toggle('oscuro', oscuro);
  document.documentElement.setAttribute('data-tema', oscuro ? 'oscuro' : 'claro');
  const btn = document.getElementById('btnTema');
  if (btn) {
    btn.innerText = oscuro ? '☀️' : '🌙';
    btn.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    btn.setAttribute('title', oscuro ? 'Modo claro' : 'Modo oscuro');
  }
  const txt = document.getElementById('txtTemaSidebar');
  if (txt) txt.innerText = oscuro ? 'Modo claro' : 'Modo oscuro';
  try { localStorage.setItem('tema', modo); } catch (err) {}
}

function alternarTema() {
  aplicarTema(document.body.classList.contains('oscuro') ? 'claro' : 'oscuro');
}

function temaGuardado() {
  let t = null;
  try { t = localStorage.getItem('tema'); } catch (err) {}
  if (t) return t;
  return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'oscuro' : 'claro';
}

function inicializarCatalogoAdmin() {
  if (localStorage.getItem('adminCatalogo')) return;
  localStorage.setItem('adminCatalogo', JSON.stringify(RECETAS.map((receta, index) => ({
    index,
    n: receta.n,
    cat: receta.cat,
    p: receta.p
  }))));
}

function inicializarAdminEstatico() {
  asegurarUsuarioAdmin();
  if (!localStorage.getItem('pedidosAdmin')) {
    localStorage.setItem('pedidosAdmin', JSON.stringify(obtenerPedidosAdmin()));
  }
}

function actualizarNombresCategorias() {
  const enlaces = {
    asiatico: 'navCatAsiatico', oriental: 'navCatOriental', europeo: 'navCatEuropeo',
    latino: 'navCatLatino', rapido: 'navCatRapido', vegetariano: 'navCatVegetariano', vegano: 'navCatVegano'
  };
  Object.entries(enlaces).forEach(([id, elementoId]) => {
    const elemento = document.getElementById(elementoId);
    if (elemento && CATEGORIAS[id]) elemento.innerText = CATEGORIAS[id].label;
  });
}

