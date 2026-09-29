// ========== NAVEGACIÓN ==========
function ocultarTodo() {
  ['inicio','categorias','subBebidas','menu','pantallaBusqueda','favoritos','panelAdmin','detalleRender','armador']
    .forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
  document.getElementById('barraAgregar').classList.remove('visible');
}

function volverAlInicio() {
  vistaActual = 'inicio';
  ocultarTodo();
  document.getElementById('inicio').style.display = 'flex';
  window.scrollTo(0, 0);
}

function irACategorias() {
  vistaActual = 'categorias';
  ocultarTodo();
  document.getElementById('categorias').style.display = 'block';
  window.scrollTo(0, 0);
}

function volverACategorias() { irACategorias(); }

function mostrarFavoritos() {
  vistaActual = 'favoritos';
  ocultarTodo();
  const cont = document.getElementById('favoritos');
  const platos = favoritos.map(indice => ({ receta: RECETAS[indice], indice })).filter(item => item.receta);
  let html = `<div class="favoritos-cabecera"><div><span class="favoritos-kicker">TU COLECCIÓN</span><h1>Mis recetas</h1><p>Guarda tus favoritos y repite tus combinaciones en un clic.</p></div><button class="boton-sec" onclick="irACategorias()">Explorar menú</button></div>`;
  if (!platos.length && !recetasGuardadas.length) {
    html += `<div class="favoritos-vacio"><span class="favoritos-vacio-icon">♥</span><h2>Aún no tienes recetas guardadas</h2><p>Guarda un plato del menú o una combinación personalizada para verla aquí.</p><button class="boton" onclick="irACategorias()">Ver el menú</button></div>`;
  } else {
    if (platos.length) {
      html += `<section class="favoritos-seccion"><div class="favoritos-seccion-cab"><h2>Platos favoritos</h2><span>${platos.length}</span></div><div class="favoritos-grid">`;
      platos.forEach(({ receta, indice }) => {
        html += `<article class="receta-guardada"><div><span class="receta-guardada-tipo">DEL MENÚ</span><h3>${receta.n}</h3><p>${receta.bebida ? 'Bebida · ' : nombrePrep(receta.prep) + ' · '}${fmt(receta.p)}</p></div><div class="receta-guardada-acciones"><button class="boton-repetir" onclick="repetirFavorito(${indice})">Repetir pedido</button><button class="boton-quitar-receta" onclick="quitarFavoritoDesdeColeccion(${indice})" aria-label="Quitar de favoritos">×</button></div></article>`;
      });
      html += `</div></section>`;
    }
    if (recetasGuardadas.length) {
      html += `<section class="favoritos-seccion"><div class="favoritos-seccion-cab"><h2>Mis combinaciones</h2><span>${recetasGuardadas.length}</span></div><div class="favoritos-grid">`;
      recetasGuardadas.forEach((receta, indice) => {
        html += `<article class="receta-guardada personalizada"><div><span class="receta-guardada-tipo">PERSONALIZADA</span><h3>${receta.nombre}</h3><p>${receta.detalle} · ${fmt(receta.unitario)}</p></div><div class="receta-guardada-acciones"><button class="boton-repetir" onclick="repetirRecetaGuardada(${indice})">Repetir pedido</button><button class="boton-quitar-receta" onclick="eliminarRecetaGuardada(${indice})" aria-label="Eliminar receta">×</button></div></article>`;
      });
      html += `</div></section>`;
    }
  }
  cont.innerHTML = html;
  cont.style.display = 'block';
  window.scrollTo(0, 0);
}

function mostrarSubcategoriasBebidas() {
  vistaActual = 'bebidas';
  ocultarTodo();
  document.getElementById('subBebidas').style.display = 'block';
  window.scrollTo(0, 0);
}

function mostrarPlatos(cat) {
  categoriaActual = cat;
  vistaActual = 'menu';
  const meta = CATEGORIAS[cat] || { titulo: cat, desc: '', img: '' };
  const platos = RECETAS.filter(r => r.cat === cat);
  const precios = platos.map(r => r.p);

  // --- Columna izquierda: imagen y contexto ---
  let izq = `
    <aside class="cat-hero">
      <img class="cat-hero-img" src="${imagenOptimizada(meta.img, 720, 62)}" ${atributosImagen({ critica: true })} alt="${meta.titulo}"
           onerror="this.style.display='none'">
      <div class="cat-hero-cuerpo">
        <h2 class="cat-hero-titulo">${meta.titulo}</h2>
        <p class="cat-hero-desc">${meta.desc}</p>`;

  if (platos.length) {
    izq += `
        <div class="cat-hero-datos">
          <div class="cat-hero-dato"><span>Platos</span><strong>${platos.length}</strong></div>
          <div class="cat-hero-dato"><span>Desde</span><strong>${fmt(Math.min(...precios))}</strong></div>
          <div class="cat-hero-dato"><span>Hasta</span><strong>${fmt(Math.max(...precios))}</strong></div>
        </div>`;
  }

  izq += `
        <button class="boton" onclick="abrirArmador()">Arma tu plato</button>
        <button class="boton-sec" onclick="volverACategorias()">Volver a categorías</button>
      </div>
    </aside>`;

  // --- Columna derecha: los platos ---
  let der = `
    <div class="cat-lista">
      <div class="cat-lista-cabecera">
        <h3 class="cat-lista-titulo">${platos.length ? 'Elige un plato y ajústalo' : 'Sin platos por ahora'}</h3>
        <span class="cat-lista-conteo">${platos.length} opcion${platos.length === 1 ? '' : 'es'}</span>
      </div>`;

  if (!platos.length) {
    der += `<p class="menu-vacio">Todavía no hay platos en esta categoría. Puedes armar el tuyo desde cero.</p>`;
  } else {
    der += `<div class="platos-grid">`;
    platos.forEach(r => {
      const idx = RECETAS.indexOf(r);
      if (r.bebida) {
        der += `
          <div class="plato-card" onclick="abrirReceta(${idx})">
            <div class="plato-card-top">
              <span class="plato-card-nombre">${r.n}</span>
              <button class="boton-favorito ${esFavorito(idx) ? 'activo' : ''}" data-favorito="${idx}" onclick="toggleFavorito(${idx}, event)" aria-label="${esFavorito(idx) ? 'Quitar de favoritos' : 'Guardar en favoritos'}">${esFavorito(idx) ? '♥' : '♡'}</button>
              <span class="plato-card-precio">${fmt(r.p)}</span>
            </div>
            <span class="plato-card-meta">Bebida</span>
            <span class="plato-card-cta">Elegir tamaño ›</span>
          </div>`;
      } else {
        const nombres = r.ing.map(id => ING[id] ? ING[id].n : id);
        const visibles = nombres.slice(0, 4).join(', ');
        const resto = nombres.length > 4 ? ` y ${nombres.length - 4} más` : '';
        const prots = r.ing.filter(id => ING[id] && ING[id].g === 'proteina').length;
        der += `
          <div class="plato-card" onclick="abrirReceta(${idx})">
            <div class="plato-card-top">
              <span class="plato-card-nombre">${r.n}</span>
              <button class="boton-favorito ${esFavorito(idx) ? 'activo' : ''}" data-favorito="${idx}" onclick="toggleFavorito(${idx}, event)" aria-label="${esFavorito(idx) ? 'Quitar de favoritos' : 'Guardar en favoritos'}">${esFavorito(idx) ? '♥' : '♡'}</button>
              <span class="plato-card-precio">${fmt(r.p)}</span>
            </div>
            <span class="plato-card-meta">${nombrePrep(r.prep)} · ${r.ing.length} ingredientes${prots ? ' · ' + prots + ' proteína' + (prots > 1 ? 's' : '') : ''}</span>
            <span class="plato-card-ing">${visibles}${resto}</span>
            <span class="plato-card-cta">Personalizar ›</span>
          </div>`;
      }
    });
    der += `</div>`;
  }
  der += `</div>`;

  ocultarTodo();
  const cont = document.getElementById('menu');
  cont.innerHTML = `<div class="cat-layout">${izq}${der}</div>`;
  cont.style.display = 'block';
  window.scrollTo(0, 0);
}

