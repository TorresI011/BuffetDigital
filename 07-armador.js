// ========== ARMADOR: PLATO DESDE CERO ==========
function abrirArmador() {
  recetaActual = null;
  cantidadActual = 1;
  armado = {
    base: null,
    proteina: null,
    vegetales: [],
    salsas: [],
    toppings: [],
    preparacion: 'salteado',
    tamano: 'personal',
    nombre: ''
  };
  vistaActual = 'armador';
  renderArmador();
}

function renderArmador() {
  const a = armado;
  const base = BASES.find(b => b.id === a.base);

  // ---------- Columna izquierda: resumen en vivo ----------
  let izq = `<aside class="detalle-lateral">`;
  if (base) {
    const lineas = [];
    if (a.proteina) lineas.push(ING[a.proteina].n);
    a.vegetales.forEach(id => lineas.push(ING[id].n));
    a.salsas.forEach(id => lineas.push(ING[id].n));
    a.toppings.forEach(id => lineas.push(ING[id].n));

    izq += `
      <div class="detalle-tarjeta">
        <img class="detalle-imagen" src="${imagenOptimizada(base.img, 640, 60)}" ${atributosImagen({ critica: true })} alt="${base.n}" onerror="this.style.display='none'">
        <div class="detalle-tarjeta-cuerpo">
          <div class="detalle-encabezado">
            <h2 class="detalle-nombre">${a.nombre.trim() || base.n}</h2>
          </div>
          <p class="detalle-descripcion">${lineas.length ? lineas.join(', ') : 'Todavía no has elegido ingredientes.'}</p>
          <span class="detalle-etiqueta">${nombrePrep(a.preparacion)} · ${TAMANOS.find(t => t.id === a.tamano).n}</span>
        </div>
      </div>
      ${bloqueDesglose(desgloseArmado(a))}`;
  } else {
    izq += `
      <div class="detalle-tarjeta">
        <div class="detalle-tarjeta-cuerpo">
          <h2 class="detalle-nombre">Tu plato</h2>
          <p class="detalle-descripcion">Elige una base a la derecha y aquí verás cómo se arma y cuánto cuesta, paso a paso.</p>
        </div>
      </div>`;
  }
  izq += `</aside>`;

  // ---------- Columna derecha: los pasos ----------
  let der = `
    <div class="detalle-cuerpo">
      <div class="armador-cabecera">
        <h2>Arma tu plato</h2>
        <p>Elige una base y constrúyelo como quieras. El precio se actualiza en cada paso.</p>
      </div>

      <div class="bloque">
        <div class="bloque-titulo">1. Elige la base</div>
        <p class="bloque-nota">La base incluye el acompañamiento principal, algunos vegetales y una salsa.</p>
        <div class="bases-grid">`;
  BASES.forEach(b => {
    der += `
      <div class="base-card ${a.base === b.id ? 'activa' : ''}" onclick="setBase('${b.id}')">
        <img src="${imagenOptimizada(b.img, 480, 58)}" ${atributosImagen()} alt="${b.n}" onerror="this.style.display='none'">
        <div class="base-card-info">
          <span class="base-card-nombre">${b.n}</span>
          <span class="base-card-inc">Incluye ${b.incVeg} vegetales y ${b.incSalsa} salsa</span>
          <span class="base-card-precio">${fmt(b.p)}</span>
        </div>
      </div>`;
  });
  der += `</div></div>`;

  if (!base) {
    der += `<div class="armador-bloqueo">Elige una base para continuar.</div>`;
  } else {
    // --- 2 a 5: personaliza tu plato, todo en un solo bloque ---
    {
      const vUsados = a.vegetales.length;
      const vRestan = Math.max(0, base.incVeg - vUsados);
      const sUsados = a.salsas.length;
      const sRestan = Math.max(0, base.incSalsa - sUsados);
      const protElegida = a.proteina ? ING[a.proteina].n : 'Sin proteína';

      der += `
      <div class="bloque">
        <div class="bloque-titulo">2. Personaliza tu plato</div>
        <p class="bloque-nota">Toca cada sección para elegir. Los vegetales y salsas incluidos ya están cubiertos por la base; lo demás suma su precio.</p>

        <div class="acordeon">
          <div class="acordeon-cab" onclick="this.parentNode.classList.toggle('abierto')">
            <span>Proteína</span>
            <span class="acordeon-resumen">${protElegida}</span>
            <span class="acordeon-flecha">›</span>
          </div>
          <div class="acordeon-cuerpo">
            <div class="chips">
              <div class="chip ${a.proteina === null ? 'activo' : ''}" onclick="setProteina(null)">
                <span>Sin proteína</span><span class="chip-precio">$0</span>
              </div>`;
      Object.keys(ING).filter(id => ING[id].g === 'proteina').forEach(id => {
        der += `
              <div class="chip ${a.proteina === id ? 'activo' : ''}" onclick="setProteina('${id}')">
                <span>${ING[id].n}</span><span class="chip-precio">+${fmt(ING[id].p).slice(1)}</span>
              </div>`;
      });
      der += `</div></div></div>`;

      der += `
        <div class="acordeon">
          <div class="acordeon-cab" onclick="this.parentNode.classList.toggle('abierto')">
            <span>Vegetales</span>
            <span class="acordeon-resumen">${vUsados ? vUsados + ' elegido' + (vUsados > 1 ? 's' : '') : 'Ninguno'}</span>
            <span class="acordeon-flecha">›</span>
          </div>
          <div class="acordeon-cuerpo">
            <p class="bloque-nota" style="margin:0 0 10px;">
              ${vRestan > 0
                ? `Te quedan <strong>${vRestan}</strong> vegetal${vRestan > 1 ? 'es' : ''} incluido${vRestan > 1 ? 's' : ''}.`
                : `Ya usaste los ${base.incVeg} incluidos. Cada vegetal adicional cuesta ${fmt(PRECIO_VEGETAL_EXTRA)}.`}
            </p>
            <div class="chips">`;
      Object.keys(ING).filter(id => ING[id].g === 'vegetal').forEach(id => {
        const sel = a.vegetales.includes(id);
        const cobra = sel ? a.vegetales.indexOf(id) >= base.incVeg : vUsados >= base.incVeg;
        der += `
              <div class="chip ${sel ? 'activo' : ''}" onclick="toggleVegetal('${id}')">
                <span>${ING[id].n}</span>
                <span class="chip-precio">${cobra ? '+' + fmt(PRECIO_VEGETAL_EXTRA).slice(1) : 'incluido'}</span>
              </div>`;
      });
      der += `</div></div></div>`;

      der += `
        <div class="acordeon">
          <div class="acordeon-cab" onclick="this.parentNode.classList.toggle('abierto')">
            <span>Salsas</span>
            <span class="acordeon-resumen">${sUsados ? sUsados + ' elegida' + (sUsados > 1 ? 's' : '') : 'Ninguna'}</span>
            <span class="acordeon-flecha">›</span>
          </div>
          <div class="acordeon-cuerpo">
            <p class="bloque-nota" style="margin:0 0 10px;">
              ${sRestan > 0
                ? `Te queda <strong>${sRestan}</strong> salsa incluida.`
                : `Cada salsa adicional cuesta ${fmt(PRECIO_SALSA_EXTRA)}.`}
            </p>
            <div class="chips">`;
      Object.keys(ING).filter(id => ING[id].g === 'salsa').forEach(id => {
        const sel = a.salsas.includes(id);
        const cobra = sel ? a.salsas.indexOf(id) >= base.incSalsa : sUsados >= base.incSalsa;
        der += `
              <div class="chip ${sel ? 'activo' : ''}" onclick="toggleSalsa('${id}')">
                <span>${ING[id].n}</span>
                <span class="chip-precio">${cobra ? '+' + fmt(PRECIO_SALSA_EXTRA).slice(1) : 'incluida'}</span>
              </div>`;
      });
      der += `</div></div></div>`;

      der += `
        <div class="acordeon">
          <div class="acordeon-cab" onclick="this.parentNode.classList.toggle('abierto')">
            <span>Toppings</span>
            <span class="acordeon-resumen">${a.toppings.length ? a.toppings.length + ' elegido' + (a.toppings.length > 1 ? 's' : '') : 'Ninguno'}</span>
            <span class="acordeon-flecha">›</span>
          </div>
          <div class="acordeon-cuerpo">
            <div class="chips">`;
      Object.keys(ING).filter(id => ING[id].g === 'topping').forEach(id => {
        der += `
              <div class="chip ${a.toppings.includes(id) ? 'activo' : ''}" onclick="toggleTopping('${id}')">
                <span>${ING[id].n}</span><span class="chip-precio">+${fmt(ING[id].p).slice(1)}</span>
              </div>`;
      });
      der += `</div></div></div>`;

      der += `</div>`; // cierra .bloque
    }

    // --- 6 y 7 ---
    der += `<div class="paso-num">3. Preparación</div>` + bloquePreparacion(a.preparacion, 'setPrepArmado', null);
    der += `<div class="paso-num">4. Tamaño</div>` + bloqueTamanos(a.tamano, 'setTamanoArmado');

    der += `
      <div class="bloque">
        <div class="bloque-titulo">Ponle nombre (opcional)</div>
        <p class="bloque-nota">Así lo verás en el carrito y en tus pedidos.</p>
        <input type="text" class="input-nombre-plato" id="inputNombrePlato"
               placeholder="Ej: Mi bowl de siempre" value="${a.nombre}"
               oninput="armado.nombre = this.value">
      </div>`;
  }
  der += `</div>`;

  ocultarTodo();
  const cont = document.getElementById('armador');
  cont.innerHTML = `
    <button class="btn-volver-detalle" onclick="irACategorias()">← Volver a categorías</button>
    <div class="detalle-layout">${izq}${der}</div>`;
  cont.style.display = 'block';

  if (base) {
    document.getElementById('barraAgregar').classList.add('visible');
    document.getElementById('txtCantidad').innerText = cantidadActual;
    actualizarTotalBarra();
  }
}

function rerenderArmador() {
  const y = window.scrollY;
  renderArmador();
  window.scrollTo(0, y);
}

function setBase(id)        { armado.base = id; rerenderArmador(); }
function setProteina(id)    { armado.proteina = id; rerenderArmador(); }
function setPrepArmado(id)  { armado.preparacion = id; rerenderArmador(); }
function setTamanoArmado(id){ armado.tamano = id; rerenderArmador(); }

function toggleLista(lista, id) {
  const i = lista.indexOf(id);
  if (i === -1) lista.push(id); else lista.splice(i, 1);
}
function toggleVegetal(id) { toggleLista(armado.vegetales, id); rerenderArmador(); }
function toggleSalsa(id)   { toggleLista(armado.salsas, id);   rerenderArmador(); }
function toggleTopping(id) { toggleLista(armado.toppings, id); rerenderArmador(); }

