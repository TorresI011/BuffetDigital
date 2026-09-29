// ========== ARRANQUE ==========
window.onload = function() {
  aplicarTema(temaGuardado());
  cargarCarrito();
  cargarFavoritos();
  inicializarAdminEstatico();
  if (direccionEntrega) {
    document.getElementById('selectZonaEntrega').value = direccionEntrega.zona || '';
    document.getElementById('inputCiudad').value = direccionEntrega.ciudad;
    document.getElementById('inputDireccion').value = direccionEntrega.direccion;
    actualizarZonaEntrega();
    const zona = ZONAS_ENTREGA[direccionEntrega.zona];
    const ubicacion = (zona ? zona.nombre : direccionEntrega.ciudad) + ' - ' + direccionEntrega.direccion.split(',')[0];
    document.getElementById('txtUbicacion').innerText = ubicacion;
    document.getElementById('txtUbicacionSidebar').innerText = ubicacion;
  }
  renderCategorias();
  actualizarNombresCategorias();
  inicializarCatalogoAdmin();
  verificarSesion();
  volverAlInicio();
};