// ========== MOTOR DE PRECIOS ==========

/** Precio de una receta del menú con sus modificaciones. */
function precioReceta(e) {
  let total = e.receta.p;
  // Solo las proteínas descuentan al quitarse
  e.quitados.forEach(id => {
    if (ING[id] && ING[id].g === 'proteina') total -= ING[id].p;
  });
  // Todo lo que se agrega suma su precio de catálogo
  e.agregados.forEach(id => { if (ING[id]) total += ING[id].p; });
  // Diferencia de preparación respecto a la original
  if (e.preparacion && e.receta.prep) {
    total += recargoPrep(e.preparacion) - recargoPrep(e.receta.prep);
  }
  total += recargoTam(e.tamano);
  return Math.max(PRECIO_MINIMO_PLATO, total);
}

/** Desglose legible del precio de una receta. */
function desgloseReceta(e) {
  const filas = [{ t: e.receta.n, v: e.receta.p }];
  e.quitados.forEach(id => {
    if (ING[id] && ING[id].g === 'proteina') filas.push({ t:'Sin ' + ING[id].n.toLowerCase(), v: -ING[id].p });
  });
  e.agregados.forEach(id => { if (ING[id]) filas.push({ t:'+ ' + ING[id].n, v: ING[id].p }); });
  if (e.preparacion && e.receta.prep && e.preparacion !== e.receta.prep) {
    const dif = recargoPrep(e.preparacion) - recargoPrep(e.receta.prep);
    if (dif !== 0) filas.push({ t: nombrePrep(e.preparacion), v: dif });
  }
  const rt = recargoTam(e.tamano);
  if (rt) filas.push({ t: TAMANOS.find(t => t.id === e.tamano).n, v: rt });
  return filas;
}

/** Precio de un plato armado desde cero. */
function precioArmado(a) {
  const base = BASES.find(b => b.id === a.base);
  if (!base) return 0;
  let total = base.p;
  if (a.proteina && ING[a.proteina]) total += ING[a.proteina].p;
  total += Math.max(0, a.vegetales.length - base.incVeg) * PRECIO_VEGETAL_EXTRA;
  total += Math.max(0, a.salsas.length   - base.incSalsa) * PRECIO_SALSA_EXTRA;
  a.toppings.forEach(id => { if (ING[id]) total += ING[id].p; });
  total += recargoPrep(a.preparacion);
  total += recargoTam(a.tamano);
  return total;
}

/** Desglose legible del plato armado. */
function desgloseArmado(a) {
  const base = BASES.find(b => b.id === a.base);
  const filas = [{ t: base.n, v: base.p }];
  if (a.proteina && ING[a.proteina]) filas.push({ t: ING[a.proteina].n, v: ING[a.proteina].p });
  const vExtra = Math.max(0, a.vegetales.length - base.incVeg);
  if (vExtra) filas.push({ t: vExtra + ' vegetal' + (vExtra > 1 ? 'es' : '') + ' extra', v: vExtra * PRECIO_VEGETAL_EXTRA });
  const sExtra = Math.max(0, a.salsas.length - base.incSalsa);
  if (sExtra) filas.push({ t: sExtra + ' salsa' + (sExtra > 1 ? 's' : '') + ' extra', v: sExtra * PRECIO_SALSA_EXTRA });
  a.toppings.forEach(id => { if (ING[id]) filas.push({ t: ING[id].n, v: ING[id].p }); });
  const rp = recargoPrep(a.preparacion);
  if (rp) filas.push({ t: nombrePrep(a.preparacion), v: rp });
  const rt = recargoTam(a.tamano);
  if (rt) filas.push({ t: TAMANOS.find(t => t.id === a.tamano).n, v: rt });
  return filas;
}

