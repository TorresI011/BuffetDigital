/* =========================================================
   BUFFET DIGITAL — MOTOR DE PERSONALIZACIÓN Y PRECIOS
   ---------------------------------------------------------
   Regla de oro: ningún precio se escribe suelto en el HTML.
   Todo sale del catálogo de ingredientes + reglas de precio.
   ========================================================= */

// ========== PARÁMETROS DE PRECIO ==========
const PRECIO_VEGETAL_EXTRA = 1500;   // vegetal por encima de los incluidos
const PRECIO_SALSA_EXTRA   = 1500;   // salsa por encima de las incluidas
const PRECIO_MINIMO_PLATO  = 9000;   // piso de seguridad

// ========== CATÁLOGO DE INGREDIENTES ==========
// g = grupo: proteina | vegetal | salsa | topping | carbo | otro
// p = precio de la porción
// vgn = apto vegano, veg = apto vegetariano
const ING = {
  // --- PROTEÍNAS (las únicas que descuentan al quitarse) ---
  pollo:        { n:'Pollo',              g:'proteina', p:7000 },
  res:          { n:'Carne de res',       g:'proteina', p:9000 },
  cerdo:        { n:'Cerdo',              g:'proteina', p:7500 },
  costilla:     { n:'Costilla de cerdo',  g:'proteina', p:11000 },
  alitas:       { n:'Alitas de pollo',    g:'proteina', p:8000 },
  salchicha:    { n:'Salchicha',          g:'proteina', p:4000 },
  jamon:        { n:'Jamón',              g:'proteina', p:5000 },
  pepperoni:    { n:'Pepperoni',          g:'proteina', p:4500 },
  tocineta:     { n:'Tocineta',           g:'proteina', p:3500 },
  cordero:      { n:'Cordero',            g:'proteina', p:13000 },
  camaron:      { n:'Camarones',          g:'proteina', p:11000 },
  salmon:       { n:'Salmón',             g:'proteina', p:12000 },
  atun:         { n:'Atún',               g:'proteina', p:9500 },
  pescadoBlanco:{ n:'Pescado blanco',     g:'proteina', p:10000 },
  huevo:        { n:'Huevo',              g:'proteina', p:3000, veg:true },
  tofu:         { n:'Tofu',               g:'proteina', p:5000, veg:true, vgn:true },
  tempeh:       { n:'Tempeh',             g:'proteina', p:5500, veg:true, vgn:true },
  garbanzo:     { n:'Garbanzos',          g:'proteina', p:4000, veg:true, vgn:true },
  lenteja:      { n:'Lentejas',           g:'proteina', p:3500, veg:true, vgn:true },
  frijol:       { n:'Fríjoles',           g:'proteina', p:3500, veg:true, vgn:true },
  falafel:      { n:'Falafel',            g:'proteina', p:5500, veg:true, vgn:true },
  hamburguesaVeg:{n:'Medallón vegetal',   g:'proteina', p:6000, veg:true, vgn:true },

  // --- VEGETALES ---
  lechuga:      { n:'Lechuga',            g:'vegetal', p:1500, veg:true, vgn:true },
  tomate:       { n:'Tomate',             g:'vegetal', p:1500, veg:true, vgn:true },
  cebolla:      { n:'Cebolla',            g:'vegetal', p:1200, veg:true, vgn:true },
  cebollaMorada:{ n:'Cebolla morada',     g:'vegetal', p:1200, veg:true, vgn:true },
  cebollaVerde: { n:'Cebolla verde',      g:'vegetal', p:1200, veg:true, vgn:true },
  pepino:       { n:'Pepino',             g:'vegetal', p:1500, veg:true, vgn:true },
  zanahoria:    { n:'Zanahoria',          g:'vegetal', p:1500, veg:true, vgn:true },
  pimenton:     { n:'Pimentón',           g:'vegetal', p:1800, veg:true, vgn:true },
  champinon:    { n:'Champiñones',        g:'vegetal', p:2500, veg:true, vgn:true },
  brocoli:      { n:'Brócoli',            g:'vegetal', p:2000, veg:true, vgn:true },
  espinaca:     { n:'Espinaca',           g:'vegetal', p:2000, veg:true, vgn:true },
  maiz:         { n:'Maíz tierno',        g:'vegetal', p:1800, veg:true, vgn:true },
  arveja:       { n:'Arveja',             g:'vegetal', p:1800, veg:true, vgn:true },
  aguacate:     { n:'Aguacate',           g:'vegetal', p:4000, veg:true, vgn:true },
  platano:      { n:'Plátano maduro',     g:'vegetal', p:2000, veg:true, vgn:true },
  papa:         { n:'Papa',               g:'vegetal', p:2500, veg:true, vgn:true },
  repollo:      { n:'Repollo',            g:'vegetal', p:1200, veg:true, vgn:true },
  berenjena:    { n:'Berenjena',          g:'vegetal', p:2500, veg:true, vgn:true },
  calabacin:    { n:'Calabacín',          g:'vegetal', p:2200, veg:true, vgn:true },
  apio:         { n:'Apio',               g:'vegetal', p:1200, veg:true, vgn:true },
  pina:         { n:'Piña',               g:'vegetal', p:2000, veg:true, vgn:true },
  fresa:        { n:'Fresa',              g:'vegetal', p:3000, veg:true, vgn:true },
  aceitunas:    { n:'Aceitunas',          g:'vegetal', p:2000, veg:true, vgn:true },
  jalapeno:     { n:'Jalapeño',           g:'vegetal', p:1500, veg:true, vgn:true },
  perejil:      { n:'Perejil',            g:'vegetal', p:1000, veg:true, vgn:true },
  albahaca:     { n:'Albahaca',           g:'vegetal', p:1200, veg:true, vgn:true },
  cilantro:     { n:'Cilantro',           g:'vegetal', p:1000, veg:true, vgn:true },
  ajo:          { n:'Ajo',                g:'vegetal', p:1000, veg:true, vgn:true },

  // --- SALSAS Y ADEREZOS ---
  soya:         { n:'Salsa de soja',      g:'salsa', p:1200, veg:true, vgn:true },
  teriyaki:     { n:'Teriyaki',           g:'salsa', p:1800, veg:true, vgn:true },
  sriracha:     { n:'Sriracha',           g:'salsa', p:1500, veg:true, vgn:true },
  bbq:          { n:'Salsa BBQ',          g:'salsa', p:2000, veg:true, vgn:true },
  hogao:        { n:'Hogao',              g:'salsa', p:2000, veg:true, vgn:true },
  chimichurri:  { n:'Chimichurri',        g:'salsa', p:2500, veg:true, vgn:true },
  tahini:       { n:'Tahini',             g:'salsa', p:2500, veg:true, vgn:true },
  curry:        { n:'Salsa curry',        g:'salsa', p:2500, veg:true, vgn:true },
  pesto:        { n:'Pesto',              g:'salsa', p:3000, veg:true },
  pomodoro:     { n:'Salsa pomodoro',     g:'salsa', p:2000, veg:true, vgn:true },
  guacamole:    { n:'Guacamole',          g:'salsa', p:4000, veg:true, vgn:true },
  mayoajo:      { n:'Mayonesa de ajo',    g:'salsa', p:1500, veg:true },
  yogurRaita:   { n:'Yogur raita',        g:'salsa', p:2000, veg:true },
  chutney:      { n:'Chutney de mango',   g:'salsa', p:2500, veg:true, vgn:true },
  bechamel:     { n:'Bechamel',           g:'salsa', p:2500, veg:true },
  salsaAgridulce:{n:'Salsa agridulce',    g:'salsa', p:1800, veg:true, vgn:true },
  salsaNaranja: { n:'Salsa de naranja',   g:'salsa', p:1800, veg:true, vgn:true },
  salsaRoja:    { n:'Salsa roja picante', g:'salsa', p:1800, veg:true, vgn:true },
  aderezoCesar: { n:'Aderezo César',      g:'salsa', p:2000, veg:true },
  mostaza:      { n:'Mostaza y miel',     g:'salsa', p:1500, veg:true },
  hummus:       { n:'Hummus',             g:'salsa', p:3000, veg:true, vgn:true },
  aji:          { n:'Ají casero',         g:'salsa', p:1500, veg:true, vgn:true },
  vinagreta:    { n:'Vinagreta',          g:'salsa', p:1500, veg:true, vgn:true },

  // --- TOPPINGS ---
  quesoMozzarella:{ n:'Queso mozzarella', g:'topping', p:3000, veg:true },
  quesoCheddar: { n:'Queso cheddar',      g:'topping', p:3000, veg:true },
  quesoFeta:    { n:'Queso feta',         g:'topping', p:3500, veg:true },
  quesoParmesano:{n:'Queso parmesano',    g:'topping', p:2500, veg:true },
  quesoVegano:  { n:'Queso vegano',       g:'topping', p:4500, veg:true, vgn:true },
  huevoFrito:   { n:'Huevo frito encima', g:'topping', p:3000, veg:true },
  semillas:     { n:'Semillas mixtas',    g:'topping', p:2000, veg:true, vgn:true },
  edamame:      { n:'Edamame',            g:'topping', p:3500, veg:true, vgn:true },
  mani:         { n:'Maní tostado',       g:'topping', p:2000, veg:true, vgn:true },
  sesamo:       { n:'Ajonjolí',           g:'topping', p:1500, veg:true, vgn:true },
  crutones:     { n:'Crutones',           g:'topping', p:1800, veg:true, vgn:true },
  papasFritas:  { n:'Papas fritas',       g:'topping', p:5000, veg:true, vgn:true },
  arosCebolla:  { n:'Aros de cebolla',    g:'topping', p:4000, veg:true },
  patacones:    { n:'Patacones',          g:'topping', p:4500, veg:true, vgn:true },
  chicharron:   { n:'Chicharrón',         g:'topping', p:5000 },
  prosciutto:   { n:'Prosciutto',         g:'topping', p:5000 },
  trufa:        { n:'Trufa negra',        g:'topping', p:9000, veg:true, vgn:true },

  // --- BASES DE CARBOHIDRATO (aparecen en recetas) ---
  arroz:        { n:'Arroz',              g:'carbo', p:2500, veg:true, vgn:true },
  arrozIntegral:{ n:'Arroz integral',     g:'carbo', p:3000, veg:true, vgn:true },
  quinoa:       { n:'Quinoa',             g:'carbo', p:4000, veg:true, vgn:true },
  pasta:        { n:'Pasta',              g:'carbo', p:3000, veg:true, vgn:true },
  fideos:       { n:'Fideos',             g:'carbo', p:3000, veg:true, vgn:true },
  trigo:        { n:'Trigo partido',      g:'carbo', p:2500, veg:true, vgn:true },
  pan:          { n:'Pan artesanal',      g:'carbo', p:2500, veg:true, vgn:true },
  panPita:      { n:'Pan pita',           g:'carbo', p:2500, veg:true, vgn:true },
  panNaan:      { n:'Pan naan',           g:'carbo', p:3000, veg:true },
  panHotdog:    { n:'Pan de hot dog',     g:'carbo', p:2000, veg:true, vgn:true },
  tortilla:     { n:'Tortilla',           g:'carbo', p:2500, veg:true, vgn:true },
  arepaMasa:    { n:'Arepa',              g:'carbo', p:2500, veg:true, vgn:true },
  masaPizza:    { n:'Masa de pizza',      g:'carbo', p:4000, veg:true, vgn:true },
  masaDumpling: { n:'Masa de dumpling',   g:'carbo', p:3000, veg:true, vgn:true },
  masaRollo:    { n:'Masa de rollo',      g:'carbo', p:2500, veg:true, vgn:true },
  masaSamosa:   { n:'Masa de samosa',     g:'carbo', p:2500, veg:true, vgn:true },
  masaMaiz:     { n:'Masa de maíz',       g:'carbo', p:2500, veg:true, vgn:true },
  masaCrepe:    { n:'Masa de crepe',      g:'carbo', p:2500, veg:true },
  alga:         { n:'Alga nori',          g:'carbo', p:2000, veg:true, vgn:true },

  // --- CONDIMENTOS Y OTROS (no se cobran aparte) ---
  aceiteOliva:  { n:'Aceite de oliva',    g:'otro', p:0, veg:true, vgn:true },
  mantequilla:  { n:'Mantequilla',        g:'otro', p:0, veg:true },
  limon:        { n:'Limón',              g:'otro', p:0, veg:true, vgn:true },
  comino:       { n:'Comino',             g:'otro', p:0, veg:true, vgn:true },
  curcuma:      { n:'Cúrcuma',            g:'otro', p:0, veg:true, vgn:true },
  jengibre:     { n:'Jengibre',           g:'otro', p:0, veg:true, vgn:true },
  pimienta:     { n:'Pimienta',           g:'otro', p:0, veg:true, vgn:true },
  sal:          { n:'Sal',                g:'otro', p:0, veg:true, vgn:true },
  azucar:       { n:'Azúcar',             g:'otro', p:0, veg:true, vgn:true },
  especias:     { n:'Especias de la casa',g:'otro', p:0, veg:true, vgn:true },
  lecheCoco:    { n:'Leche de coco',      g:'otro', p:2500, veg:true, vgn:true },
  leche:        { n:'Leche',              g:'otro', p:1500, veg:true },
  crema:        { n:'Crema de leche',     g:'otro', p:2000, veg:true },
  yogur:        { n:'Yogur',              g:'otro', p:2000, veg:true },
  helado:       { n:'Helado',             g:'otro', p:4000, veg:true },
  vinoTinto:    { n:'Vino tinto',         g:'otro', p:4000, veg:true, vgn:true }
};

// ========== PREPARACIONES ==========
const PREPARACIONES = [
  { id:'crudo',    n:'En crudo',      d:'Fresco, sin cocción',        rec:0 },
  { id:'vapor',    n:'Al vapor',      d:'Sin grasa añadida',          rec:0 },
  { id:'hervido',  n:'Hervido',       d:'Cocción en caldo',           rec:0 },
  { id:'salteado', n:'Salteado',      d:'Wok a fuego alto',           rec:1000 },
  { id:'guisado',  n:'Guisado',       d:'Cocción lenta en salsa',     rec:1000 },
  { id:'plancha',  n:'A la plancha',  d:'Sellado en plancha',         rec:1500 },
  { id:'horno',    n:'Al horno',      d:'Horneado lento',             rec:1500 },
  { id:'frito',    n:'Frito',         d:'Inmersión en aceite',        rec:1500 },
  { id:'apanado',  n:'Apanado',       d:'Empanizado y frito',         rec:2000 },
  { id:'parrilla', n:'A la parrilla', d:'Carbón, sabor ahumado',      rec:2500 }
];
const recargoPrep = id => (PREPARACIONES.find(p => p.id === id) || { rec:0 }).rec;
const nombrePrep  = id => (PREPARACIONES.find(p => p.id === id) || { n:'—' }).n;

// ========== TAMAÑOS ==========
const TAMANOS = [
  { id:'personal',  n:'Personal',       d:'1 persona',        rec:0 },
  { id:'grande',    n:'Grande',         d:'Porción 1.5x',     rec:6000 },
  { id:'compartir', n:'Para compartir', d:'2 personas',       rec:12000 }
];
const recargoTam = id => (TAMANOS.find(t => t.id === id) || { rec:0 }).rec;

// ========== BASES DEL ARMADOR ==========
// p = precio base. Incluye el carbohidrato, N vegetales y N salsas.
const BASES = [
  { id:'bowlArroz', n:'Bowl de arroz',    p:12000, carbo:'arroz',     incVeg:3, incSalsa:1, img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=70' },
  { id:'bowlQuinoa',n:'Bowl de quinoa',   p:16000, carbo:'quinoa',    incVeg:3, incSalsa:1, img:'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&q=70' },
  { id:'bowlPasta', n:'Bowl de pasta',    p:13000, carbo:'pasta',     incVeg:3, incSalsa:1, img:'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=70' },
  { id:'ensalada',  n:'Ensalada grande',  p:11000, carbo:null,        incVeg:4, incSalsa:1, img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=70' },
  { id:'hamburguesa',n:'Hamburguesa',     p:8000, carbo:'pan',       incVeg:2, incSalsa:1, img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=70' },
  { id:'wrap',      n:'Wrap o burrito',   p:10000, carbo:'tortilla',  incVeg:3, incSalsa:1, img:'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=70' },
  { id:'tacos',     n:'Tacos (3 unidades)',p:11000,carbo:'tortilla',  incVeg:3, incSalsa:1, img:'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=70' },
  { id:'arepa',     n:'Arepa rellena',    p:7000, carbo:'arepaMasa', incVeg:2, incSalsa:1, img:'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&q=70' },
  { id:'pizza',     n:'Pizza personal',   p:17000, carbo:'masaPizza', incVeg:3, incSalsa:1, img:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=70' },
  { id:'sopa',      n:'Sopa o curry',     p:12000, carbo:null,        incVeg:3, incSalsa:1, img:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=70' },
  { id:'sandwich',  n:'Sándwich',         p:9000, carbo:'pan',       incVeg:3, incSalsa:1, img:'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&q=70' }
];

// ========== RECETAS DEL MENÚ ==========
const RECETAS = [];
function R(cat, n, p, prep, ing) { RECETAS.push({ cat, n, p, prep, ing }); }

// --- ASIÁTICO ---
R('asiatico','Sushi roll clásico',28000,'crudo',['arroz','alga','salmon','aguacate','pepino','sesamo']);
R('asiatico','Sushi tempura roll',32000,'frito',['arroz','alga','camaron','aguacate','mayoajo']);
R('asiatico','Ramen de cerdo',30000,'hervido',['fideos','cerdo','huevo','cebollaVerde','champinon']);
R('asiatico','Ramen vegetariano',26000,'hervido',['fideos','tofu','champinon','espinaca','maiz']);
R('asiatico','Arroz frito con pollo',24000,'salteado',['arroz','pollo','huevo','zanahoria','cebollaVerde','soya']);
R('asiatico','Pad thai de camarones',35000,'salteado',['fideos','camaron','huevo','mani','cebollaVerde']);
R('asiatico','Pad thai vegetariano',28000,'salteado',['fideos','tofu','huevo','mani','cebollaVerde']);
R('asiatico','Pollo agridulce',26000,'frito',['pollo','arroz','pimenton','cebolla','salsaAgridulce']);
R('asiatico','Cerdo a la naranja',29000,'frito',['cerdo','arroz','pimenton','salsaNaranja']);
R('asiatico','Dumplings al vapor',22000,'vapor',['masaDumpling','cerdo','cebollaVerde','soya']);
R('asiatico','Rollos primavera',18000,'frito',['masaRollo','zanahoria','repollo','fideos']);
R('asiatico','Bibimbap coreano',31000,'salteado',['arroz','res','huevo','espinaca','zanahoria','sriracha']);
R('asiatico','Pollo teriyaki',27000,'plancha',['pollo','arroz','teriyaki','sesamo','cebollaVerde']);
R('asiatico','Curry tailandés con pollo',33000,'guisado',['pollo','arroz','curry','lecheCoco','pimenton']);

// --- ORIENTAL ---
R('oriental','Hummus con pan pita',18000,'crudo',['garbanzo','tahini','limon','aceiteOliva','panPita']);
R('oriental','Falafel con ensalada',22000,'frito',['falafel','lechuga','tomate','pepino','tahini']);
R('oriental','Shawarma de pollo',24000,'parrilla',['pollo','panPita','cebollaMorada','tomate','yogurRaita']);
R('oriental','Kebab de cordero',32000,'parrilla',['cordero','panPita','cebollaMorada','tomate','yogurRaita']);
R('oriental','Pollo tikka masala',30000,'guisado',['pollo','arroz','curry','yogur','tomate']);
R('oriental','Shawarma mixto',27000,'parrilla',['pollo','res','panPita','cebollaMorada','yogurRaita']);
R('oriental','Arroz basmati especiado',16000,'hervido',['arroz','curcuma','comino','ajo']);
R('oriental','Curry de garbanzos',24000,'guisado',['garbanzo','arroz','curry','tomate','lecheCoco']);
R('oriental','Samosas',18000,'frito',['masaSamosa','papa','arveja','comino']);
R('oriental','Pan naan con ajo',12000,'horno',['panNaan','ajo','mantequilla']);
R('oriental','Ensalada tabulé',20000,'crudo',['trigo','perejil','tomate','cebolla','limon']);
R('oriental','Baba ganoush',19000,'horno',['berenjena','tahini','ajo','limon','panPita']);
R('oriental','Cordero al curry',35000,'guisado',['cordero','arroz','curry','yogur','cebolla']);
R('oriental','Arroz biryani de pollo',28000,'horno',['arroz','pollo','curcuma','cebolla','yogur']);
R('oriental','Lentejas especiadas',21000,'guisado',['lenteja','arroz','comino','curcuma','cebolla']);

// --- EUROPEO ---
R('europeo','Pasta carbonara',28000,'salteado',['pasta','tocineta','huevo','quesoParmesano','pimienta']);
R('europeo','Pasta boloñesa',26000,'guisado',['pasta','res','pomodoro','cebolla','quesoParmesano']);
R('europeo','Lasaña tradicional',30000,'horno',['pasta','res','pomodoro','quesoMozzarella','bechamel']);
R('europeo','Pizza pepperoni',28000,'horno',['masaPizza','pomodoro','quesoMozzarella','pepperoni']);
R('europeo','Paella mixta',40000,'guisado',['arroz','camaron','pollo','pimenton','curcuma']);
R('europeo','Risotto de champiñones',29000,'guisado',['arroz','champinon','quesoParmesano','cebolla','mantequilla']);
R('europeo','Pollo al vino',32000,'guisado',['pollo','vinoTinto','champinon','cebolla','papa']);
R('europeo','Filete a la pimienta',38000,'plancha',['res','pimienta','papa','mantequilla']);
R('europeo','Pizza margarita',24000,'horno',['masaPizza','pomodoro','quesoMozzarella','albahaca']);
R('europeo','Tortilla española',22000,'plancha',['huevo','papa','cebolla','aceiteOliva']);
R('europeo','Croquetas de jamón',20000,'frito',['jamon','bechamel','pan','huevo']);
R('europeo','Schnitzel alemán',34000,'apanado',['cerdo','pan','huevo','limon','papa']);
R('europeo','Salmón al horno',42000,'horno',['salmon','limon','aceiteOliva','espinaca','papa']);
R('europeo','Ensalada caprese',21000,'crudo',['tomate','quesoMozzarella','albahaca','aceiteOliva']);
R('europeo','Crepes dulces',18000,'plancha',['masaCrepe','huevo','fresa','azucar']);

// --- LATINOAMERICANO ---
R('latino','Bandeja paisa',35000,'frito',['frijol','arroz','res','chicharron','huevo','platano','arepaMasa','aguacate']);
R('latino','Tacos al pastor',22000,'parrilla',['tortilla','cerdo','pina','cebolla','cilantro']);
R('latino','Burrito de pollo',24000,'plancha',['tortilla','pollo','frijol','arroz','quesoCheddar']);
R('latino','Ceviche peruano',32000,'crudo',['pescadoBlanco','limon','cebollaMorada','cilantro','maiz']);
R('latino','Churrasco',38000,'parrilla',['res','chimichurri','papa','lechuga','tomate']);
R('latino','Arepa con queso',12000,'plancha',['arepaMasa','quesoMozzarella']);
R('latino','Arepa con carne',18000,'plancha',['arepaMasa','res','quesoMozzarella']);
R('latino','Quesadilla mixta',23000,'plancha',['tortilla','pollo','res','quesoCheddar','pimenton']);
R('latino','Lomo saltado',34000,'salteado',['res','papa','cebolla','tomate','arroz','soya']);
R('latino','Empanadas colombianas',15000,'frito',['masaMaiz','papa','res','aji']);
R('latino','Sancocho',28000,'hervido',['pollo','platano','papa','maiz','cilantro']);
R('latino','Arroz con pollo',20000,'salteado',['arroz','pollo','zanahoria','arveja','pimenton']);
R('latino','Patacones con hogao',16000,'frito',['platano','hogao']);
R('latino','Tamal',18000,'vapor',['masaMaiz','cerdo','pollo','arveja','zanahoria']);
R('latino','Enchiladas',26000,'horno',['tortilla','pollo','quesoCheddar','salsaRoja','cebolla']);

// --- RÁPIDO ---
R('rapido','Hamburguesa clásica',22000,'parrilla',['pan','res','lechuga','tomate','quesoCheddar','mayoajo']);
R('rapido','Hamburguesa doble carne',30000,'parrilla',['pan','res','quesoCheddar','lechuga','tomate','mayoajo']);
R('rapido','Hamburguesa BBQ',28000,'parrilla',['pan','res','bbq','arosCebolla','quesoCheddar','tocineta']);
R('rapido','Hot dog especial',18000,'plancha',['panHotdog','salchicha','quesoCheddar','cebolla','papasFritas']);
R('rapido','Costillas BBQ',38000,'horno',['costilla','bbq','papasFritas','lechuga']);
R('rapido','Alitas picantes',24000,'frito',['alitas','sriracha','apio']);
R('rapido','Nuggets de pollo',20000,'apanado',['pollo','pan','huevo','mayoajo']);
R('rapido','Papas fritas',10000,'frito',['papa','sal']);
R('rapido','Papas con queso y tocineta',18000,'frito',['papa','quesoCheddar','tocineta','cebollaVerde']);
R('rapido','Sándwich club',22000,'plancha',['pan','pollo','tocineta','lechuga','tomate','huevo']);
R('rapido','Mac & cheese',19000,'horno',['pasta','quesoCheddar','bechamel']);
R('rapido','Pollo frito',26000,'frito',['pollo','pan','especias','papasFritas']);
R('rapido','Wrap de pollo',21000,'plancha',['tortilla','pollo','lechuga','tomate','mayoajo']);
R('rapido','Ensalada César con pollo',24000,'crudo',['lechuga','pollo','quesoParmesano','crutones','aderezoCesar']);
R('rapido','Malteada',14000,'crudo',['helado','leche','azucar']);

// --- VEGETARIANO ---
R('vegetariano','Ensalada César vegetariana',20000,'crudo',['lechuga','quesoParmesano','crutones','aderezoCesar']);
R('vegetariano','Pasta primavera',24000,'salteado',['pasta','brocoli','zanahoria','pimenton','quesoParmesano']);
R('vegetariano','Pizza vegetariana',25000,'horno',['masaPizza','pomodoro','quesoMozzarella','pimenton','champinon','aceitunas']);
R('vegetariano','Lasaña de verduras',26000,'horno',['pasta','berenjena','calabacin','pomodoro','quesoMozzarella']);
R('vegetariano','Hamburguesa veggie',22000,'plancha',['pan','hamburguesaVeg','lechuga','tomate','quesoCheddar']);
R('vegetariano','Wrap de vegetales',20000,'plancha',['tortilla','lechuga','tomate','aguacate','zanahoria','hummus']);
R('vegetariano','Arroz salteado vegetal',21000,'salteado',['arroz','brocoli','zanahoria','huevo','soya']);
R('vegetariano','Tacos vegetarianos',19000,'plancha',['tortilla','frijol','maiz','aguacate','quesoFeta']);
R('vegetariano','Quesadillas de vegetales',21000,'plancha',['tortilla','quesoMozzarella','champinon','pimenton','cebolla']);
R('vegetariano','Risotto de espinaca',25000,'guisado',['arroz','espinaca','quesoParmesano','cebolla','mantequilla']);
R('vegetariano','Arepa con aguacate',14000,'plancha',['arepaMasa','aguacate','quesoFeta']);
R('vegetariano','Ensalada griega',22000,'crudo',['lechuga','tomate','pepino','quesoFeta','aceitunas','aceiteOliva']);
R('vegetariano','Crema de verduras',18000,'hervido',['zanahoria','papa','brocoli','cebolla','crema']);
R('vegetariano','Champiñones al ajillo',20000,'salteado',['champinon','ajo','aceiteOliva','perejil']);
R('vegetariano','Tortilla de vegetales',19000,'plancha',['huevo','pimenton','cebolla','espinaca','papa']);

// --- VEGANO ---
R('vegano','Hamburguesa vegana',24000,'plancha',['pan','hamburguesaVeg','lechuga','tomate','quesoVegano']);
R('vegano','Pizza vegana',27000,'horno',['masaPizza','pomodoro','quesoVegano','champinon','pimenton']);
R('vegano','Bowl vegano',26000,'salteado',['quinoa','tofu','aguacate','brocoli','tahini']);
R('vegano','Curry vegano',25000,'guisado',['arroz','garbanzo','curry','lecheCoco','espinaca']);
R('vegano','Tacos veganos',20000,'plancha',['tortilla','frijol','maiz','aguacate','guacamole']);
R('vegano','Wrap vegano',22000,'plancha',['tortilla','hummus','lechuga','zanahoria','aguacate']);
R('vegano','Ensalada vegana especial',21000,'crudo',['lechuga','quinoa','aguacate','semillas','tahini']);
R('vegano','Lentejas guisadas',18000,'guisado',['lenteja','cebolla','zanahoria','tomate','arroz']);
R('vegano','Arroz con vegetales',19000,'salteado',['arroz','brocoli','zanahoria','maiz','soya']);
R('vegano','Pasta vegana',23000,'salteado',['pasta','pomodoro','champinon','albahaca','quesoVegano']);
R('vegano','Falafel vegano',22000,'frito',['falafel','tahini','lechuga','tomate','panPita']);
R('vegano','Sopa de verduras',16000,'hervido',['zanahoria','papa','brocoli','cebolla','apio']);
R('vegano','Arepa vegana',15000,'plancha',['arepaMasa','aguacate','frijol']);
R('vegano','Nuggets veganos',23000,'apanado',['tofu','pan','mostaza','papasFritas']);
R('vegano','Postre vegano',14000,'crudo',['fresa','lecheCoco','semillas','azucar']);

// ========== BEBIDAS (sin personalización de ingredientes) ==========
const BEBIDAS = [
  // Bebidas asiáticas
  { cat:'bebidasAsiaticas', n:'Bubble Tea',      p:14000 },
  { cat:'bebidasAsiaticas', n:'Matcha Latte',    p:13000 },
  { cat:'bebidasAsiaticas', n:'Sake',            p:22000 },
  { cat:'bebidasAsiaticas', n:'Soju',            p:20000 },
  { cat:'bebidasAsiaticas', n:'Makgeolli',       p:18000 },
  { cat:'bebidasAsiaticas', n:'Lassi',           p:14000 },
  { cat:'bebidasAsiaticas', n:'Masala Chai',     p:12000 },
  { cat:'bebidasAsiaticas', n:'Bandung',         p:13000 },
  { cat:'bebidasAsiaticas', n:'Teh Tarik',       p:11000 },
  { cat:'bebidasAsiaticas', n:'Thai Iced Tea',   p:14000 },
  { cat:'bebidasAsiaticas', n:'Kombucha',        p:16000 },
  { cat:'bebidasAsiaticas', n:'Calamansi Juice', p:12000 },
  { cat:'bebidasAsiaticas', n:'Yakult',          p:6000 },
  { cat:'bebidasAsiaticas', n:'Amazake',         p:15000 },
  { cat:'bebidasAsiaticas', n:'Sugarcane Juice', p:10000 },
  // Bebidas americanas
  { cat:'bebidasAmericanas', n:'Limonada natural', p:8000 },
  { cat:'bebidasAmericanas', n:'Limonada de coco', p:12000 },
  { cat:'bebidasAmericanas', n:'Jugo de maracuyá', p:9000 },
  { cat:'bebidasAmericanas', n:'Jugo de mango', p:9000 },
  { cat:'bebidasAmericanas', n:'Milo frío', p:10000 },
  { cat:'bebidasAmericanas', n:'Chocolate caliente', p:9000 },
  { cat:'bebidasAmericanas', n:'Café filtrado', p:7000 },
  { cat:'bebidasAmericanas', n:'Café latte', p:11000 },
  // Bebidas europeas
  { cat:'bebidasEuropeas', n:'Espresso italiano', p:7000 },
  { cat:'bebidasEuropeas', n:'Cappuccino', p:11000 },
  { cat:'bebidasEuropeas', n:'Mocaccino', p:12000 },
  { cat:'bebidasEuropeas', n:'Té Earl Grey', p:8000 },
  { cat:'bebidasEuropeas', n:'Té de frutos rojos', p:9000 },
  { cat:'bebidasEuropeas', n:'Sangría sin alcohol', p:14000 },
  { cat:'bebidasEuropeas', n:'Limonada italiana', p:12000 },
  { cat:'bebidasEuropeas', n:'Chocolate vienés', p:13000 },
  // Gaseosas y bebidas frías
  { cat:'bebidasGaseosas', n:'Cola clásica', p:6000 },
  { cat:'bebidasGaseosas', n:'Cola sin azúcar', p:6000 },
  { cat:'bebidasGaseosas', n:'Gaseosa de manzana', p:6000 },
  { cat:'bebidasGaseosas', n:'Gaseosa de uva', p:6000 },
  { cat:'bebidasGaseosas', n:'Agua con gas', p:5000 },
  { cat:'bebidasGaseosas', n:'Agua natural', p:4000 },
  { cat:'bebidasGaseosas', n:'Tónica', p:7000 },
  { cat:'bebidasGaseosas', n:'Ginger ale', p:7000 }
];
BEBIDAS.forEach(b => RECETAS.push({ cat:b.cat, n:b.n, p:b.p, prep:null, ing:[], bebida:true }));

// ========== METADATOS DE CATEGORÍA ==========
const CATEGORIAS = {
  asiatico:          { label:'Asiático',            titulo:'MENÚ ASIÁTICO',           img:'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80', desc:'Cocina asiática con ingredientes frescos y especias tradicionales.' },
  oriental:          { label:'Oriental',            titulo:'MENÚ ORIENTAL',           img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', desc:'Sabores de Oriente Medio con especias aromáticas y hierbas frescas.' },
  europeo:           { label:'Europeo',             titulo:'MENÚ EUROPEO',            img:'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80', desc:'Recetas clásicas europeas con técnicas tradicionales.' },
  latino:            { label:'Latinoamericano',     titulo:'MENÚ LATINOAMERICANO',    img:'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80', desc:'Sabores de Latinoamérica con recetas de tradición familiar.' },
  rapido:            { label:'Rápido',              titulo:'MENÚ RÁPIDO',             img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', desc:'Comfort food preparado al momento con salsas caseras.' },
  vegetariano:       { label:'Vegetariano',         titulo:'MENÚ VEGETARIANO',        img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', desc:'Platos sin carne, llenos de color y sabor.' },
  vegano:            { label:'Vegano',              titulo:'MENÚ VEGANO',             img:'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80', desc:'100% de origen vegetal, sin ningún producto animal.' },
  bebidasAsiaticas:  { label:'Bebidas asiáticas',   titulo:'BEBIDAS ASIÁTICAS',       img:'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800&q=80', desc:'Tés, infusiones y bebidas tradicionales de Asia.' },
  bebidasAmericanas: { label:'Bebidas americanas',  titulo:'BEBIDAS AMERICANAS',      img:'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80', desc:'Jugos, cafés y bebidas frescas de América.' },
  bebidasEuropeas:   { label:'Bebidas europeas',    titulo:'BEBIDAS EUROPEAS',        img:'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80', desc:'Cafés, tés y bebidas inspiradas en Europa.' },
  bebidasGaseosas:   { label:'Gaseosas y frías',    titulo:'GASEOSAS Y BEBIDAS FRÍAS',  img:'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=800&q=80', desc:'Opciones frías y gaseosas para acompañar tu plato.' }
};

function aplicarCambiosAdmin() {
  const categoriasGuardadas = JSON.parse(localStorage.getItem('adminCategorias') || '{}');
  Object.keys(categoriasGuardadas).forEach(id => {
    if (!CATEGORIAS[id]) return;
    if (categoriasGuardadas[id].label) CATEGORIAS[id].label = categoriasGuardadas[id].label;
    if (categoriasGuardadas[id].desc) CATEGORIAS[id].desc = categoriasGuardadas[id].desc;
    CATEGORIAS[id].titulo = 'MENÚ ' + CATEGORIAS[id].label.toUpperCase();
  });
  const preciosGuardados = JSON.parse(localStorage.getItem('adminPrecios') || '{}');
  RECETAS.forEach((receta, indice) => {
    if (Number.isFinite(Number(preciosGuardados[indice])) && Number(preciosGuardados[indice]) >= 0) {
      receta.p = Number(preciosGuardados[indice]);
    }
  });
}

aplicarCambiosAdmin();

// ========== VALIDACIÓN DE DATOS (consola) ==========
(function validarCatalogo() {
  const faltantes = new Set();
  RECETAS.forEach(r => r.ing.forEach(id => { if (!ING[id]) faltantes.add(id); }));
  BASES.forEach(b => { if (b.carbo && !ING[b.carbo]) faltantes.add(b.carbo); });
  if (faltantes.size) console.warn('Ingredientes sin definir en ING:', [...faltantes]);
})();

