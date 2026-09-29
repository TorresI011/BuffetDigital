// ========== PANTALLA DE RECETA (editar un plato del menú) ==========
function abrirReceta(idx) {
  const receta = RECETAS[idx];
  categoriaActual = receta.cat;
  cantidadActual = 1;
  recetaActual = {
    receta,
    indice: idx,
    quitados: [],
    agregados: [],
    preparacion: receta.prep,
    tamano: 'personal'
  };
  armado = null;
  renderReceta();
}

function renderReceta() {
  const e = recetaActual;
  const r = e.receta;
  const meta = CATEGORIAS[r.cat] || {};

  // --- Columna izquierda: imagen, nombre y desglose ---
  let izq = `
    <aside class="detalle-lateral">
      <div class="detalle-tarjeta">
        <img class="detalle-imagen" src="${imagenOptimizada(meta.img, 720, 62)}" ${atributosImagen({ critica: true })} alt="${r.n}" onerror="this.style.display='none'">
        <div class="detalle-tarjeta-cuerpo">
          <div class="detalle-encabezado">
            <h2 class="detalle-nombre">${r.n}</h2>
            <span class="detalle-precio-base">${fmt(r.p)}</span>
          </div>
          <p class="detalle-descripcion">${meta.desc || ''}</p>
          ${r.bebida ? '' : `<span class="detalle-etiqueta">${nombrePrep(r.prep)} · ${r.ing.length} ingredientes</span>`}
          <button class="boton-guardar-receta" onclick="guardarRecetaActual()">♥ Guardar en Mis recetas</button>
        </div>
      </div>
      ${bloqueDesglose(desgloseReceta(e))}
    </aside>`;

  // --- Columna derecha: personalización ---
  let der = `<div class="detalle-cuerpo">`;

  if (r.bebida) {
    der += bloqueTamanos(e.tamano, 'setTamanoReceta');
  } else {
    der += `
      <div class="bloque">
        <div class="bloque-titulo">Ingredientes del plato</div>
        <p class="bloque-nota">Puedes quitar lo que no quieras. Solo las proteínas descuentan del precio; el resto se retira sin costo.</p>
        <div class="lista-ing">`;

    r.ing.forEach(id => {
      const ing = ING[id];
      if (!ing) return;
      const quitado = e.quitados.includes(id);
      const esProt = ing.g === 'proteina';
      const etiqueta = esProt
        ? `<span class="ing-delta">−${fmt(ing.p).slice(1)}</span>`
        : `<span class="ing-nota">sin costo</span>`;
      der += `
        <div class="ing-fila ${quitado ? 'quitada' : ''}" onclick="toggleQuitar('${id}')">
          <span class="ing-nombre">${ing.n}</span>
          <span class="ing-derecha">
            ${quitado ? '<span class="ing-estado">Quitado</span>' : etiqueta}
            <span class="ing-accion">${quitado ? 'Devolver' : 'Quitar'}</span>
          </span>
        </div>`;
    });
    der += `</div></div>`;

    der += bloqueAgregar(r.ing.concat(e.agregados), e.agregados, 'toggleAgregar');
    der += bloquePreparacion(e.preparacion, 'setPrepReceta', r.prep);
    der += bloqueTamanos(e.tamano, 'setTamanoReceta');
  }
  der += `</div>`;

  ocultarTodo();
  const cont = document.getElementById('detalleRender');
  cont.innerHTML = `
    <button class="btn-volver-detalle" onclick="volverAlMenu()">← Volver al menú</button>
    <div class="detalle-layout">${izq}${der}</div>`;
  cont.style.display = 'block';
  document.getElementById('barraAgregar').classList.add('visible');
  document.getElementById('txtCantidad').innerText = cantidadActual;
  actualizarTotalBarra();
}

function toggleQuitar(id) {
  const q = recetaActual.quitados;
  const i = q.indexOf(id);
  if (i === -1) q.push(id); else q.splice(i, 1);
  renderReceta();
  window.scrollTo(0, guardarScroll());
}

function toggleAgregar(id) {
  const a = recetaActual ? recetaActual.agregados : null;
  if (!a) return;
  const i = a.indexOf(id);
  if (i === -1) a.push(id); else a.splice(i, 1);
  renderReceta();
  window.scrollTo(0, guardarScroll());
}

let scrollGuardado = 0;
function guardarScroll() { return scrollGuardado; }
document.addEventListener('scroll', () => { scrollGuardado = window.scrollY; });

function setPrepReceta(id) { recetaActual.preparacion = id; renderReceta(); window.scrollTo(0, guardarScroll()); }
function setTamanoReceta(id) { recetaActual.tamano = id; renderReceta(); window.scrollTo(0, guardarScroll()); }

function volverAlMenu() {
  recetaActual = null;
  mostrarPlatos(categoriaActual);
}

