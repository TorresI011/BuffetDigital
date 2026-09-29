// ========== BARRA INFERIOR Y CARRITO ==========
const COSTO_ENVIO = 5000;
const ENVIO_GRATIS_DESDE = 50000;

function guardarCarrito() {
  localStorage.setItem('carritoBuffet', JSON.stringify(carrito));
}

function cargarCarrito() {
  try { carrito = JSON.parse(localStorage.getItem('carritoBuffet') || '[]') || []; } catch (error) { carrito = []; }
  try { direccionEntrega = JSON.parse(localStorage.getItem('direccionBuffet') || 'null'); } catch (error) { direccionEntrega = null; }
}

function subtotalCarrito() {
  return carrito.reduce((total, item) => total + item.unitario * item.cantidad, 0);
}

function envioCarrito() {
  const subtotal = subtotalCarrito();
  const zona = direccionEntrega && ZONAS_ENTREGA[direccionEntrega.zona];
  if (subtotal === 0 || !zona || !zona.disponible || subtotal >= ENVIO_GRATIS_DESDE) return 0;
  return zona.envio;
}

function totalCarrito() {
  return subtotalCarrito() + envioCarrito();
}

function precioUnitarioActual() {
  if (recetaActual) return precioReceta(recetaActual);
  if (armado && armado.base) return precioArmado(armado);
  return 0;
}

function actualizarTotalBarra() {
  document.getElementById('txtTotalBarra').innerText = fmt(precioUnitarioActual() * cantidadActual);
}

function cambiarCantidad(delta) {
  cantidadActual = Math.max(1, cantidadActual + delta);
  document.getElementById('txtCantidad').innerText = cantidadActual;
  actualizarTotalBarra();
}

function agregarAlCarrito() {
  let item = null;

  if (recetaActual) {
    const e = recetaActual;
    const unitario = precioReceta(e);
    const partes = [];
    e.quitados.forEach(id => partes.push('sin ' + ING[id].n.toLowerCase()));
    e.agregados.forEach(id => partes.push('+ ' + ING[id].n.toLowerCase()));
    if (e.receta.prep && e.preparacion !== e.receta.prep) partes.push(nombrePrep(e.preparacion).toLowerCase());
    if (e.tamano !== 'personal') partes.push(TAMANOS.find(t => t.id === e.tamano).n.toLowerCase());
    item = {
      nombre: e.receta.n,
      tipo: 'receta',
      detalle: partes.length ? partes.join(', ') : 'Como viene en la carta',
      unitario,
      cantidad: cantidadActual,
      total: unitario * cantidadActual
    };
  } else if (armado && armado.base) {
    const base = BASES.find(b => b.id === armado.base);
    const unitario = precioArmado(armado);
    const partes = [];
    if (armado.proteina) partes.push(ING[armado.proteina].n.toLowerCase());
    armado.vegetales.forEach(id => partes.push(ING[id].n.toLowerCase()));
    armado.salsas.forEach(id => partes.push(ING[id].n.toLowerCase()));
    armado.toppings.forEach(id => partes.push(ING[id].n.toLowerCase()));
    partes.push(nombrePrep(armado.preparacion).toLowerCase());
    if (armado.tamano !== 'personal') partes.push(TAMANOS.find(t => t.id === armado.tamano).n.toLowerCase());
    item = {
      nombre: armado.nombre.trim() || base.n + ' a tu gusto',
      tipo: 'armado',
      detalle: partes.join(', '),
      unitario,
      cantidad: cantidadActual,
      total: unitario * cantidadActual
    };
  }

  if (!item) return;

  carrito.push(item);
  guardarCarrito();
  actualizarBotonCarrito();
  document.getElementById('barraAgregar').classList.remove('visible');

  const btn = document.querySelector('.boton-carrito');
  btn.classList.add('pulso');
  setTimeout(() => btn.classList.remove('pulso'), 1200);

  if (item.tipo === 'armado') { abrirArmador(); } else { volverAlMenu(); }
}

function actualizarBotonCarrito() {
  const n = carrito.reduce((acc, i) => acc + i.cantidad, 0);
  document.getElementById('txtCarrito').innerText = 'Carrito (' + n + ')';
}

function verCarrito() {
  let html = '';
  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById('contadorCarritoModal').innerText = totalProductos + (totalProductos === 1 ? ' producto' : ' productos');
  carrito.forEach((item, i) => {
    html += `
      <div class="carrito-item">
        <div class="carrito-item-top">
          <div><strong>${item.nombre}</strong><span class="carrito-item-detalle">${item.detalle}</span></div>
          <span class="carrito-item-precio">${fmt(item.unitario * item.cantidad)}</span>
        </div>
        <div class="carrito-item-bottom"><div class="carrito-cantidad"><button onclick="cambiarCantidadCarrito(${i}, -1)" aria-label="Disminuir cantidad">−</button><span>${item.cantidad}</span><button onclick="cambiarCantidadCarrito(${i}, 1)" aria-label="Aumentar cantidad">+</button></div><span class="carrito-item-unitario">${fmt(item.unitario)} c/u</span><button class="carrito-eliminar" onclick="eliminarDelCarrito(${i})">Eliminar</button></div>
      </div>`;
  });
  document.getElementById('listaCarrito').innerHTML = html || '<div class="carrito-vacio"><strong>Tu carrito está vacío</strong><span>Agrega un plato del menú para comenzar.</span></div>';
  const subtotal = subtotalCarrito();
  const envio = envioCarrito();
  document.getElementById('resumenCarrito').innerHTML = subtotal ? `<div><span>Subtotal</span><strong>${fmt(subtotal)}</strong></div><div><span>Envío</span><strong>${envio ? fmt(envio) : 'Gratis'}</strong></div><div class="carrito-total"><span>Total</span><strong>${fmt(totalCarrito())}</strong></div>` : '';
  const zona = direccionEntrega && ZONAS_ENTREGA[direccionEntrega.zona];
  const disponibilidad = zona && zona.disponible ? ` · Llega en ${zona.tiempo}` : '';
  const direccion = direccionEntrega ? `${direccionEntrega.ciudad} · ${direccionEntrega.direccion}${disponibilidad}` : 'Agrega una dirección para calcular el envío.';
  document.getElementById('direccionCarrito').innerText = direccion;
  document.getElementById('btnConfirmarPedido').disabled = !carrito.length;
  abrirModal('modalCarrito');
}

function cambiarCantidadCarrito(indice, delta) {
  if (!carrito[indice]) return;
  carrito[indice].cantidad = Math.max(0, carrito[indice].cantidad + delta);
  if (carrito[indice].cantidad === 0) carrito.splice(indice, 1);
  guardarCarrito();
  actualizarBotonCarrito();
  verCarrito();
}

function eliminarDelCarrito(i) {
  carrito.splice(i, 1);
  guardarCarrito();
  actualizarBotonCarrito();
  verCarrito();
}

async function finalizarPedido() {
  if (!carrito.length) return;
  const usuario = JSON.parse(localStorage.getItem('usuarioSesion') || 'null');
  if (!usuario) {
    cerrarModal('modalCarrito');
    abrirModal('modalAuth');
    cambiarVistaAuth('login');
    alert('Inicia sesión para confirmar tu pedido.');
    return;
  }
  if (!direccionEntrega || !direccionEntrega.zona || !ZONAS_ENTREGA[direccionEntrega.zona]?.disponible) {
    cerrarModal('modalCarrito');
    abrirModal('modalUbicacion');
    alert('Agrega una dirección de entrega antes de confirmar.');
    return;
  }

  const detallePedido = carrito.map(item => `${item.nombre} x${item.cantidad}`).join(', ');
  const totalPedido = totalCarrito();
  const payload = {
    usuario_id: usuario.id,
    cliente: usuario.nombre,
    detalle: detallePedido,
    total: totalPedido,
    estado: 'Recibido',
    hora: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
  };

  const respuesta = await apiRequest('/api/pedidos', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (respuesta && respuesta.ok && respuesta.pedido) {
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidosAdmin') || 'null') || obtenerPedidosAdmin();
    pedidosGuardados.unshift({
      id: respuesta.pedido.id,
      cliente: usuario.nombre,
      detalle: detallePedido,
      total: totalPedido,
      estado: 'Recibido',
      hora: respuesta.pedido.hora
    });
    localStorage.setItem('pedidosAdmin', JSON.stringify(pedidosGuardados));
    carrito = [];
    guardarCarrito();
    actualizarBotonCarrito();
    cerrarModal('modalCarrito');
    alert(`Pedido ${respuesta.pedido.id} confirmado. Te avisaremos cuando esté listo.`);
    return;
  }

  const pedidosGuardados = JSON.parse(localStorage.getItem('pedidosAdmin') || 'null') || obtenerPedidosAdmin();
  const codigo = '#BD-' + String(1000 + pedidosGuardados.length + Math.floor(Math.random() * 900)).slice(-4);
  const pedido = {
    id: codigo,
    cliente: usuario.nombre,
    detalle: detallePedido,
    total: totalPedido,
    estado: 'Recibido',
    hora: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
  };

  pedidosGuardados.unshift(pedido);
  localStorage.setItem('pedidosAdmin', JSON.stringify(pedidosGuardados));
  carrito = [];
  guardarCarrito();
  actualizarBotonCarrito();
  cerrarModal('modalCarrito');
  alert(`Pedido ${codigo} confirmado. Te avisaremos cuando esté listo.`);
}

