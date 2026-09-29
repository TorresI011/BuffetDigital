// ========== BLOQUES REUTILIZABLES ==========
function bloqueAgregar(yaPresentes, seleccionados, fn) {
  const grupos = [
    { g:'proteina', t:'Proteínas' },
    { g:'topping',  t:'Toppings y quesos' },
    { g:'vegetal',  t:'Vegetales' },
    { g:'salsa',    t:'Salsas' }
  ];
  let html = `
    <div class="bloque">
      <div class="bloque-titulo">Agrega lo que quieras</div>
      <p class="bloque-nota">Cada ingrediente suma su precio de carta.</p>`;

  grupos.forEach((gr, gi) => {
    const unicos = Object.keys(ING).filter(id =>
      ING[id].g === gr.g && (!yaPresentes.includes(id) || seleccionados.includes(id))
    );
    if (!unicos.length) return;
    html += `
      <div class="acordeon">
        <div class="acordeon-cab" onclick="this.parentNode.classList.toggle('abierto')">
          <span>${gr.t}</span><span class="acordeon-flecha">›</span>
        </div>
        <div class="acordeon-cuerpo">`;
    unicos.forEach(id => {
      const sel = seleccionados.includes(id);
      html += `
        <div class="ing-fila seleccionable ${sel ? 'activa' : ''}" onclick="${fn}('${id}')">
          <span class="ing-nombre">${ING[id].n}</span>
          <span class="ing-derecha">
            <span class="ing-delta mas">+${fmt(ING[id].p).slice(1)}</span>
            <span class="check ${sel ? 'activo' : ''}"></span>
          </span>
        </div>`;
    });
    html += `</div></div>`;
  });

  html += `</div>`;
  return html;
}

function bloquePreparacion(actual, fn, original) {
  let html = `
    <div class="bloque">
      <div class="bloque-titulo">Preparación</div>
      <p class="bloque-nota">El método de cocción cambia el costo: a más insumo y más tiempo, mayor recargo.</p>
      <div class="opciones-grid">`;
  PREPARACIONES.forEach(p => {
    const activo = p.id === actual;
    const dif = original ? p.rec - recargoPrep(original) : p.rec;
    const etiqueta = dif === 0 ? 'Sin cambio' : (dif > 0 ? '+' + fmt(dif).slice(1) : '−' + fmt(-dif).slice(1));
    html += `
      <div class="opcion ${activo ? 'activa' : ''}" onclick="${fn}('${p.id}')">
        <span class="opcion-nombre">${p.n}</span>
        <span class="opcion-desc">${p.d}</span>
        <span class="opcion-precio">${etiqueta}</span>
      </div>`;
  });
  html += `</div></div>`;
  return html;
}

function bloqueTamanos(actual, fn) {
  let html = `
    <div class="bloque">
      <div class="bloque-titulo">Tamaño</div>
      <div class="opciones-grid">`;
  TAMANOS.forEach(t => {
    html += `
      <div class="opcion ${t.id === actual ? 'activa' : ''}" onclick="${fn}('${t.id}')">
        <span class="opcion-nombre">${t.n}</span>
        <span class="opcion-desc">${t.d}</span>
        <span class="opcion-precio">${t.rec ? '+' + fmt(t.rec).slice(1) : 'Incluido'}</span>
      </div>`;
  });
  html += `</div></div>`;
  return html;
}

function bloqueDesglose(filas) {
  let html = `
    <div class="bloque desglose">
      <div class="bloque-titulo">Cómo se calcula tu precio</div>`;
  let total = 0;
  filas.forEach(f => {
    total += f.v;
    html += `
      <div class="desglose-fila">
        <span>${f.t}</span>
        <span class="${f.v < 0 ? 'negativo' : ''}">${f.v < 0 ? '−' + fmt(-f.v) : fmt(f.v)}</span>
      </div>`;
  });
  html += `
      <div class="desglose-fila total">
        <span>Precio por unidad</span><span>${fmt(Math.max(PRECIO_MINIMO_PLATO, total))}</span>
      </div>
    </div>`;
  return html;
}

