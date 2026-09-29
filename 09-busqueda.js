// ========== BÚSQUEDA ==========
function normalizar(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/&/g, 'y');
}
function resaltar(texto, q) {
  if (!q) return texto;
  const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
  return texto.replace(re, '<mark>$1</mark>');
}

let timeoutBusqueda = null;
function buscar(query) {
  query = query.trim();
  if (!query) { volverAlInicio(); return; }
  clearTimeout(timeoutBusqueda);
  timeoutBusqueda = setTimeout(() => ejecutarBusqueda(query), 120);
}

function ejecutarBusqueda(query) {
  const q = normalizar(query);

  const cats = Object.keys(CATEGORIAS)
    .filter(id => normalizar(CATEGORIAS[id].label).includes(q))
    .map(id => ({ id, ...CATEGORIAS[id], n: RECETAS.filter(r => r.cat === id).length }));

  const platos = RECETAS
    .map((r, i) => ({ ...r, i }))
    .filter(r => normalizar(r.n).includes(q) ||
                 (CATEGORIAS[r.cat] && normalizar(CATEGORIAS[r.cat].label).includes(q)));

  // También busca por ingrediente
  const porIngrediente = RECETAS
    .map((r, i) => ({ ...r, i }))
    .filter(r => !platos.some(p => p.i === r.i) &&
                 r.ing.some(id => ING[id] && normalizar(ING[id].n).includes(q)));

  const total = cats.length + platos.length + porIngrediente.length;

  let html = `
    <div class="busqueda-header">
      <h2 class="busqueda-titulo">Resultados de búsqueda</h2>
      <p class="busqueda-subtitulo">
        ${total > 0 ? `<strong>${total}</strong> resultado${total !== 1 ? 's' : ''} para` : 'Sin resultados para'}
        <span class="busqueda-query">"${query}"</span>
      </p>
    </div>`;

  if (!total) {
    html += `
      <div class="sin-resultados">
        <div class="emoji-vacio">🔍</div>
        <p><strong>No encontramos nada con ese nombre.</strong></p>
        <p style="margin-top:8px;">Prueba con pollo, aguacate, vegano… o arma tu propio plato.</p>
        <button class="boton" onclick="abrirArmador()">Arma tu plato</button>
      </div>`;
  } else {
    if (cats.length) {
      html += `<div class="seccion-resultado"><div class="seccion-resultado-titulo">Categorías (${cats.length})</div>`;
      cats.forEach(c => {
        html += `
          <div class="resultado-categoria" onclick="irACategoriaDesdeBusqueda('${c.id}')">
            <img class="resultado-cat-imagen" src="${imagenOptimizada(c.img, 160, 55)}" ${atributosImagen()} alt="${c.label}" onerror="this.style.background='#EEE';this.removeAttribute('src')">
            <div class="resultado-cat-info">
              <div class="resultado-cat-nombre">${resaltar(c.label, query)}</div>
              <div class="resultado-cat-sub">${c.n} platos disponibles</div>
            </div>
            <span class="resultado-cat-flecha">›</span>
          </div>`;
      });
      html += `</div>`;
    }

    if (platos.length) {
      html += `<div class="seccion-resultado"><div class="seccion-resultado-titulo">Platos (${platos.length})</div>`;
      platos.forEach(p => {
        html += filaResultadoPlato(p, query, '');
      });
      html += `</div>`;
    }

    if (porIngrediente.length) {
      html += `<div class="seccion-resultado"><div class="seccion-resultado-titulo">Contienen "${query}" (${porIngrediente.length})</div>`;
      porIngrediente.forEach(p => {
        const coincide = p.ing.filter(id => ING[id] && normalizar(ING[id].n).includes(q)).map(id => ING[id].n).join(', ');
        html += filaResultadoPlato(p, query, coincide);
      });
      html += `</div>`;
    }
  }

  ocultarTodo();
  const pant = document.getElementById('pantallaBusqueda');
  pant.innerHTML = html;
  pant.style.display = 'block';
  window.scrollTo(0, 0);
}

function filaResultadoPlato(p, query, extra) {
  const label = CATEGORIAS[p.cat] ? CATEGORIAS[p.cat].label : p.cat;
  return `
    <div class="resultado-plato" onclick="irAPlatoDesdeBusqueda(${p.i})">
      <div class="resultado-plato-izq">
        <span class="resultado-plato-nombre">${resaltar(p.n, query)}</span>
        <span class="resultado-plato-cat">${label}${extra ? ' · ' + extra : ''}</span>
      </div>
      <span class="resultado-plato-precio">${fmt(p.p)}</span>
    </div>`;
}

function irACategoriaDesdeBusqueda(cat) {
  document.getElementById('inputBuscador').value = '';
  mostrarPlatos(cat);
}
function irAPlatoDesdeBusqueda(idx) {
  document.getElementById('inputBuscador').value = '';
  abrirReceta(idx);
}

