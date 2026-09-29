// ========== PANEL DE ADMINISTRACIÓN ==========
// ⚠️ Ver el aviso de seguridad al inicio de 12-auth.js: este chequeo es
// solo de interfaz (oculta/muestra botones); no protege nada por sí solo.
function esAdministrador(u) {
  return Boolean(u && u.admin === true);
}

function abrirPanelAdmin() {
  const u = JSON.parse(localStorage.getItem('usuarioSesion'));
  if (!esAdministrador(u)) { alert('Esta sección es exclusiva para administradores.'); return; }
  window.location.href = 'Admin/admin.html';
}

function obtenerPedidosAdmin() {
  return JSON.parse(localStorage.getItem('pedidosAdmin') || 'null') || [
    { id:'#BD-1048', cliente:'Mariana López', detalle:'Bowl de quinoa + bebida', total:32000, estado:'En preparación', hora:'12:42 p. m.' },
    { id:'#BD-1047', cliente:'Juan Esteban', detalle:'Hamburguesa clásica x2', total:44000, estado:'Listo para entregar', hora:'12:28 p. m.' },
    { id:'#BD-1046', cliente:'Laura Gómez', detalle:'Curry de garbanzos', total:24000, estado:'Entregado', hora:'11:56 a. m.' },
    { id:'#BD-1045', cliente:'Carlos Ruiz', detalle:'Pizza pepperoni', total:28000, estado:'En preparación', hora:'11:41 a. m.' }
  ];
}

function renderPanelAdmin() {
  const pedidos = obtenerPedidosAdmin();
  const ventas = pedidos.reduce((total, pedido) => total + pedido.total, 0);
  const platosActivos = RECETAS.length + BEBIDAS.length;
  const estados = ['Recibido', 'En preparación', 'Listo para entregar', 'Entregado'];
  const filas = pedidos.map((pedido, indice) => `
    <tr>
      <td><strong>${pedido.id}</strong><small>${pedido.hora}</small></td>
      <td><strong>${pedido.cliente}</strong><small>${pedido.detalle}</small></td>
      <td class="admin-precio">${fmt(pedido.total)}</td>
      <td><select class="admin-estado" onchange="actualizarEstadoPedido(${indice}, this.value)">
        ${estados.map(estado => `<option ${estado === pedido.estado ? 'selected' : ''}>${estado}</option>`).join('')}
      </select></td>
    </tr>`).join('');
  const categorias = Object.entries(CATEGORIAS).slice(0, 7).map(([id, categoria]) => `
    <div class="admin-inventario-fila"><span>${categoria.label}</span><strong>${RECETAS.filter(receta => receta.cat === id).length} platos</strong><span class="admin-activo">Activo</span></div>`).join('');

  document.getElementById('panelAdmin').innerHTML = `
    <div class="admin-cabecera">
      <div><span class="admin-eyebrow">OPERACIÓN · HOY</span><h1>Panel de administración</h1><p>Una vista rápida de lo que está pasando en Buffet Digital.</p></div>
      <button class="boton-sec" onclick="volverAlInicio()">← Ver tienda</button>
    </div>
    <div class="admin-metricas">
      <div class="admin-metrica"><span>Ventas del día</span><strong>${fmt(ventas)}</strong><small class="admin-positivo">+12.8% vs. ayer</small></div>
      <div class="admin-metrica"><span>Pedidos activos</span><strong>${pedidos.filter(pedido => pedido.estado !== 'Entregado').length}</strong><small>de ${pedidos.length} pedidos totales</small></div>
      <div class="admin-metrica"><span>Ticket promedio</span><strong>${fmt(Math.round(ventas / pedidos.length))}</strong><small>por pedido</small></div>
      <div class="admin-metrica"><span>Platos publicados</span><strong>${platosActivos}</strong><small class="admin-positivo">Catálogo saludable</small></div>
    </div>
    <div class="admin-grid-principal">
      <section class="admin-bloque admin-pedidos"><div class="admin-bloque-cabecera"><div><span class="admin-etiqueta">FLUJO DE PEDIDOS</span><h2>Pedidos recientes</h2></div><span class="admin-contador">${pedidos.length} hoy</span></div>
        <div class="admin-tabla-wrap"><table><thead><tr><th>Pedido</th><th>Cliente</th><th>Total</th><th>Estado</th></tr></thead><tbody>${filas}</tbody></table></div>
      </section>
      <section class="admin-bloque"><div class="admin-bloque-cabecera"><div><span class="admin-etiqueta">CATÁLOGO</span><h2>Disponibilidad</h2></div><button class="admin-link" onclick="irACategorias()">Gestionar</button></div>
        <div class="admin-inventario">${categorias}</div>
        <div class="admin-nota"><span class="admin-nota-icon">i</span><span>Todos los platos están visibles para tus clientes.</span></div>
      </section>
    </div>
    <section class="admin-bloque admin-actividad"><div class="admin-bloque-cabecera"><div><span class="admin-etiqueta">ACTIVIDAD</span><h2>Resumen operativo</h2></div></div><div class="admin-actividad-grid"><div><strong>92%</strong><span>Pedidos entregados a tiempo</span></div><div><strong>4.8/5</strong><span>Calificación promedio</span></div><div><strong>18 min</strong><span>Tiempo medio de preparación</span></div></div></section>`;
}

function actualizarEstadoPedido(indice, estado) {
  const pedidos = obtenerPedidosAdmin();
  pedidos[indice].estado = estado;
  localStorage.setItem('pedidosAdmin', JSON.stringify(pedidos));
  renderPanelAdmin();
}

