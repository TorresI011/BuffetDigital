// ========== ESTADO GLOBAL ==========
let vistaActual     = 'inicio';
let categoriaActual = null;
let cantidadActual  = 1;
let carrito         = [];
let favoritos       = [];
let recetasGuardadas = [];
let direccionEntrega = null;
const ZONAS_ENTREGA = {
  envigado: { nombre: 'Envigado', ciudad: 'Medellín, Envigado', envio: 5000, disponible: true, tiempo: '25 a 35 min' },
  medellin: { nombre: 'Medellín', ciudad: 'Medellín', envio: 7000, disponible: true, tiempo: '35 a 50 min' },
  sabaneta: { nombre: 'Sabaneta', ciudad: 'Sabaneta', envio: 6000, disponible: true, tiempo: '30 a 45 min' },
  bello: { nombre: 'Bello', ciudad: 'Bello', envio: 8000, disponible: true, tiempo: '45 a 60 min' },
  rionegro: { nombre: 'Rionegro', ciudad: 'Rionegro', envio: 0, disponible: false, tiempo: null }
};

// Estado de la pantalla de receta
let recetaActual = null;   // { receta, quitados:[], agregados:[], preparacion, tamano }

// Estado del armador
let armado = null;         // { base, proteina, vegetales:[], salsas:[], toppings:[], preparacion, tamano, nombre }

const fmt = n => '$' + Math.round(n).toLocaleString('es-CO');

function cargarFavoritos() {
  try { favoritos = JSON.parse(localStorage.getItem('favoritosBuffet') || '[]') || []; } catch (error) { favoritos = []; }
  try { recetasGuardadas = JSON.parse(localStorage.getItem('recetasBuffet') || '[]') || []; } catch (error) { recetasGuardadas = []; }
}

function mostrarToast(mensaje, tipo = 'exito') {
  const contenedor = document.getElementById('contenedorToasts');
  if (!contenedor) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`;
  toast.innerHTML = `<span class="toast-icon">${tipo === 'exito' ? '✓' : '!'}</span><span>${mensaje}</span><button class="toast-cerrar" aria-label="Cerrar notificación">&times;</button>`;
  toast.querySelector('.toast-cerrar').onclick = () => cerrarToast(toast);
  contenedor.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => cerrarToast(toast), 4200);
}

function cerrarToast(toast) {
  if (!toast || toast.classList.contains('saliendo')) return;
  toast.classList.add('saliendo');
  setTimeout(() => toast.remove(), 220);
}

function esFavorito(indice) { return favoritos.includes(indice); }

function toggleFavorito(indice, evento) {
  if (evento) evento.stopPropagation();
  const posicion = favoritos.indexOf(indice);
  if (posicion === -1) {
    favoritos.push(indice);
    mostrarToast('Plato guardado en favoritos.');
  } else {
    favoritos.splice(posicion, 1);
    mostrarToast('Plato eliminado de favoritos.', 'aviso');
  }
  localStorage.setItem('favoritosBuffet', JSON.stringify(favoritos));
  const boton = document.querySelector(`[data-favorito="${indice}"]`);
  if (boton) {
    boton.classList.toggle('activo', esFavorito(indice));
    boton.innerText = esFavorito(indice) ? '♥' : '♡';
    boton.setAttribute('aria-label', esFavorito(indice) ? 'Quitar de favoritos' : 'Guardar en favoritos');
  }
}

function detalleRecetaActual() {
  const e = recetaActual;
  const partes = [];
  e.quitados.forEach(id => partes.push('sin ' + ING[id].n.toLowerCase()));
  e.agregados.forEach(id => partes.push('+ ' + ING[id].n.toLowerCase()));
  if (e.receta.prep && e.preparacion !== e.receta.prep) partes.push(nombrePrep(e.preparacion).toLowerCase());
  if (e.tamano !== 'personal') partes.push(TAMANOS.find(t => t.id === e.tamano).n.toLowerCase());
  return partes.length ? partes.join(', ') : 'Como viene en la carta';
}

function guardarRecetaActual() {
  if (!recetaActual) return;
  const receta = recetaActual;
  const guardada = {
    id: 'receta-' + Date.now(),
    nombre: receta.receta.n,
    detalle: detalleRecetaActual(),
    unitario: precioReceta(receta),
    tipo: 'recetaGuardada'
  };
  recetasGuardadas.unshift(guardada);
  localStorage.setItem('recetasBuffet', JSON.stringify(recetasGuardadas));
  mostrarToast('Combinación guardada en Mis recetas.');
}

function repetirFavorito(indice) {
  const receta = RECETAS[indice];
  if (!receta) return;
  carrito.push({ nombre: receta.n, tipo: 'receta', detalle: 'Como viene en la carta', unitario: receta.p, cantidad: 1, total: receta.p });
  guardarCarrito();
  actualizarBotonCarrito();
  mostrarToast(`${receta.n} agregado al carrito.`);
}

function repetirRecetaGuardada(indice) {
  const receta = recetasGuardadas[indice];
  if (!receta) return;
  carrito.push({ ...receta, cantidad: 1, total: receta.unitario });
  guardarCarrito();
  actualizarBotonCarrito();
  mostrarToast(`${receta.nombre} agregado al carrito.`);
}

function eliminarRecetaGuardada(indice) {
  recetasGuardadas.splice(indice, 1);
  localStorage.setItem('recetasBuffet', JSON.stringify(recetasGuardadas));
  mostrarToast('Receta eliminada de Mis recetas.', 'aviso');
  mostrarFavoritos();
}

function quitarFavoritoDesdeColeccion(indice) {
  const posicion = favoritos.indexOf(indice);
  if (posicion !== -1) favoritos.splice(posicion, 1);
  localStorage.setItem('favoritosBuffet', JSON.stringify(favoritos));
  mostrarToast('Plato eliminado de favoritos.', 'aviso');
  mostrarFavoritos();
}

function imagenOptimizada(url, ancho = 800, calidad = 65) {
  if (!url) return '';
  try {
    const imagen = new URL(url);
    imagen.searchParams.set('auto', 'format');
    imagen.searchParams.set('fit', 'crop');
    imagen.searchParams.set('w', ancho);
    imagen.searchParams.set('q', calidad);
    return imagen.toString();
  } catch (error) {
    return url;
  }
}

function atributosImagen({ critica = false } = {}) {
  return critica
    ? 'loading="eager" fetchpriority="high" decoding="async" width="720" height="190"'
    : 'loading="lazy" decoding="async" width="480" height="120"';
}

