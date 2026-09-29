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

// ========== ESTADO GLOBAL ==========
let vistaActual     = 'inicio';
let categoriaActual = null;
let cantidadActual  = 1;
let carrito         = [];
let favoritos       = [];
let recetasGuardadas = [];
let direccionEntrega = null;
const ZONAS_ENTREGA = {
  envigado: { nombre: 'Envigado', ciudad: 'Medellín, Envigado', envio: 5000, disponible: true, tiempo: '25 a 35 min' },
  medellin: { nombre: 'Medellín', ciudad: 'Medellín', envio: 7000, disponible: true, tiempo: '35 a 50 min' },
  sabaneta: { nombre: 'Sabaneta', ciudad: 'Sabaneta', envio: 6000, disponible: true, tiempo: '30 a 45 min' },
  bello: { nombre: 'Bello', ciudad: 'Bello', envio: 8000, disponible: true, tiempo: '45 a 60 min' },
  rionegro: { nombre: 'Rionegro', ciudad: 'Rionegro', envio: 0, disponible: false, tiempo: null }
};

// Estado de la pantalla de receta
let recetaActual = null;   // { receta, quitados:[], agregados:[], preparacion, tamano }

// Estado del armador
let armado = null;         // { base, proteina, vegetales:[], salsas:[], toppings:[], preparacion, tamano, nombre }

const fmt = n => '$' + Math.round(n).toLocaleString('es-CO');

function cargarFavoritos() {
  try { favoritos = JSON.parse(localStorage.getItem('favoritosBuffet') || '[]') || []; } catch (error) { favoritos = []; }
  try { recetasGuardadas = JSON.parse(localStorage.getItem('recetasBuffet') || '[]') || []; } catch (error) { recetasGuardadas = []; }
}

function mostrarToast(mensaje, tipo = 'exito') {
  const contenedor = document.getElementById('contenedorToasts');
  if (!contenedor) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`;
  toast.innerHTML = `<span class="toast-icon">${tipo === 'exito' ? '✓' : '!'}</span><span>${mensaje}</span><button class="toast-cerrar" aria-label="Cerrar notificación">&times;</button>`;
  toast.querySelector('.toast-cerrar').onclick = () => cerrarToast(toast);
  contenedor.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => cerrarToast(toast), 4200);
}

function cerrarToast(toast) {
  if (!toast || toast.classList.contains('saliendo')) return;
  toast.classList.add('saliendo');
  setTimeout(() => toast.remove(), 220);
}

function esFavorito(indice) { return favoritos.includes(indice); }

function toggleFavorito(indice, evento) {
  if (evento) evento.stopPropagation();
  const posicion = favoritos.indexOf(indice);
  if (posicion === -1) {
    favoritos.push(indice);
    mostrarToast('Plato guardado en favoritos.');
  } else {
    favoritos.splice(posicion, 1);
    mostrarToast('Plato eliminado de favoritos.', 'aviso');
  }
  localStorage.setItem('favoritosBuffet', JSON.stringify(favoritos));
  const boton = document.querySelector(`[data-favorito="${indice}"]`);
  if (boton) {
    boton.classList.toggle('activo', esFavorito(indice));
    boton.innerText = esFavorito(indice) ? '♥' : '♡';
    boton.setAttribute('aria-label', esFavorito(indice) ? 'Quitar de favoritos' : 'Guardar en favoritos');
  }
}

function detalleRecetaActual() {
  const e = recetaActual;
  const partes = [];
  e.quitados.forEach(id => partes.push('sin ' + ING[id].n.toLowerCase()));
  e.agregados.forEach(id => partes.push('+ ' + ING[id].n.toLowerCase()));
  if (e.receta.prep && e.preparacion !== e.receta.prep) partes.push(nombrePrep(e.preparacion).toLowerCase());
  if (e.tamano !== 'personal') partes.push(TAMANOS.find(t => t.id === e.tamano).n.toLowerCase());
  return partes.length ? partes.join(', ') : 'Como viene en la carta';
}

function guardarRecetaActual() {
  if (!recetaActual) return;
  const receta = recetaActual;
  const guardada = {
    id: 'receta-' + Date.now(),
    nombre: receta.receta.n,
    detalle: detalleRecetaActual(),
    unitario: precioReceta(receta),
    tipo: 'recetaGuardada'
  };
  recetasGuardadas.unshift(guardada);
  localStorage.setItem('recetasBuffet', JSON.stringify(recetasGuardadas));
  mostrarToast('Combinación guardada en Mis recetas.');
}

function repetirFavorito(indice) {
  const receta = RECETAS[indice];
  if (!receta) return;
  carrito.push({ nombre: receta.n, tipo: 'receta', detalle: 'Como viene en la carta', unitario: receta.p, cantidad: 1, total: receta.p });
  guardarCarrito();
  actualizarBotonCarrito();
  mostrarToast(`${receta.n} agregado al carrito.`);
}

function repetirRecetaGuardada(indice) {
  const receta = recetasGuardadas[indice];
  if (!receta) return;
  carrito.push({ ...receta, cantidad: 1, total: receta.unitario });
  guardarCarrito();
  actualizarBotonCarrito();
  mostrarToast(`${receta.nombre} agregado al carrito.`);
}

function eliminarRecetaGuardada(indice) {
  recetasGuardadas.splice(indice, 1);
  localStorage.setItem('recetasBuffet', JSON.stringify(recetasGuardadas));
  mostrarToast('Receta eliminada de Mis recetas.', 'aviso');
  mostrarFavoritos();
}

function quitarFavoritoDesdeColeccion(indice) {
  const posicion = favoritos.indexOf(indice);
  if (posicion !== -1) favoritos.splice(posicion, 1);
  localStorage.setItem('favoritosBuffet', JSON.stringify(favoritos));
  mostrarToast('Plato eliminado de favoritos.', 'aviso');
  mostrarFavoritos();
}

function imagenOptimizada(url, ancho = 800, calidad = 65) {
  if (!url) return '';
  try {
    const imagen = new URL(url);
    imagen.searchParams.set('auto', 'format');
    imagen.searchParams.set('fit', 'crop');
    imagen.searchParams.set('w', ancho);
    imagen.searchParams.set('q', calidad);
    return imagen.toString();
  } catch (error) {
    return url;
  }
}

function atributosImagen({ critica = false } = {}) {
  return critica
    ? 'loading="eager" fetchpriority="high" decoding="async" width="720" height="190"'
    : 'loading="lazy" decoding="async" width="480" height="120"';
}

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
    usuario: usuario.nombre,
    cliente: usuario.nombre,
    detalle: detallePedido,
    productos: carrito.map(item => item.nombre),
    cantidades: carrito.map(item => item.cantidad),
    total: totalPedido,
    estado: 'Recibido',
    fecha: new Date().toISOString(),
    hora: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
  };

  const respuesta = await apiRequest('/api/pedidos', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (respuesta && respuesta.ok && respuesta.pedido) {
    localStorage.setItem('pedidosAdmin', JSON.stringify([
      {
        id: respuesta.pedido.id,
        cliente: usuario.nombre,
        detalle: detallePedido,
        total: totalPedido,
        estado: 'Recibido',
        hora: respuesta.pedido.hora
      },
      ...JSON.parse(localStorage.getItem('pedidosAdmin') || '[]')
    ]));
    carrito = [];
    guardarCarrito();
    actualizarBotonCarrito();
    cerrarModal('modalCarrito');
    alert(`Pedido ${respuesta.pedido.id} confirmado. Te avisaremos cuando esté listo.`);
    return;
  }

  alert('No se pudo guardar el pedido con la API. Intenta de nuevo.');
}

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

function esAdministrador(u) {
  return Boolean(u && (u.admin === true || u.correo === 'admin@buffetdigital.com'));
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

// ========== CATEGORÍAS: RENDER ==========
function renderCategorias() {
  const cont = document.getElementById('gridCategorias');
  if (!cont) return;
  const principales = ['asiatico','oriental','europeo','latino','rapido','vegetariano','vegano'];
  let html = `
    <div class="tarjeta-categoria destacada" onclick="abrirArmador()">
      <span>Arma tu plato</span>
      <small>Desde cero, a tu gusto</small>
    </div>`;
  principales.forEach(id => {
    html += `<div class="tarjeta-categoria img-${id}" onclick="mostrarPlatos('${id}')"><span>${CATEGORIAS[id].label}</span></div>`;
  });
  html += `<div class="tarjeta-categoria img-bebidas" onclick="mostrarSubcategoriasBebidas()"><span>Bebidas</span></div>`;
  cont.innerHTML = html;
}

// ========== SIDEBAR ==========
function toggleSidebar() {
  const sb = document.getElementById('sidebarDerecha');
  sb.classList.contains('abierto') ? cerrarSidebar() : abrirSidebar();
}
function abrirSidebar() {
  document.getElementById('sidebarDerecha').classList.add('abierto');
  document.getElementById('overlaySidebar').classList.add('visible');
  actualizarSidebarPerfil();
}
function cerrarSidebar() {
  document.getElementById('sidebarDerecha').classList.remove('abierto');
  document.getElementById('overlaySidebar').classList.remove('visible');
}
function toggleOtros() {
  document.getElementById('submenuOtros').classList.toggle('abierto');
  document.getElementById('flechaOtros').classList.toggle('rotada');
}
function actualizarSidebarPerfil() {
  const u = JSON.parse(localStorage.getItem('usuarioSesion'));
  const cont = document.getElementById('sidebarPerfil');
  if (u) {
    cont.innerHTML =
      '<div class="sidebar-perfil-activo" onclick="abrirPerfil(); cerrarSidebar();">' +
        '<div class="sidebar-avatar">' + u.nombre.trim().charAt(0).toUpperCase() + '</div>' +
        '<div class="sidebar-perfil-info">' +
          '<div class="sidebar-perfil-nombre">' + u.nombre + '</div>' +
          '<div class="sidebar-perfil-link">Ver mi perfil</div>' +
        '</div>' +
      '</div>';
  } else {
    cont.innerHTML =
      '<div class="sidebar-perfil-botones">' +
        '<button class="sidebar-btn-auth" onclick="cerrarSidebar(); abrirModal(\'modalAuth\'); cambiarVistaAuth(\'login\');">Ingresar</button>' +
        '<button class="sidebar-btn-auth principal" onclick="cerrarSidebar(); abrirModal(\'modalAuth\'); cambiarVistaAuth(\'registro\');">Registrarse</button>' +
      '</div>';
  }
}

// ========== UBICACIÓN ==========
function guardarUbicacion() {
  const zonaId = document.getElementById('selectZonaEntrega').value;
  const ciudad = document.getElementById('inputCiudad').value.trim();
  const direccion = document.getElementById('inputDireccion').value.trim();
  const zona = ZONAS_ENTREGA[zonaId];
  if (!zonaId || !zona) { mostrarToast('Selecciona una zona de entrega.', 'error'); return; }
  if (!zona.disponible) { mostrarToast('Por ahora no tenemos cobertura en esta zona.', 'error'); return; }
  if (!ciudad || !direccion) { mostrarToast('Ingresa la ciudad y tu dirección exacta.', 'error'); return; }
  const texto = zona.nombre + ' - ' + direccion.split(',')[0];
  direccionEntrega = { zona: zonaId, ciudad, direccion };
  localStorage.setItem('direccionBuffet', JSON.stringify(direccionEntrega));
  document.getElementById('txtUbicacion').innerText = texto;
  document.getElementById('txtUbicacionSidebar').innerText = texto;
  cerrarModal('modalUbicacion');
  mostrarToast(`Dirección actualizada: ${zona.nombre}.`);
  if (document.getElementById('modalCarrito').style.display === 'block') verCarrito();
}

function actualizarZonaEntrega() {
  const zona = ZONAS_ENTREGA[document.getElementById('selectZonaEntrega').value];
  const estado = document.getElementById('estadoZonaEntrega');
  if (!zona) {
    estado.className = 'estado-zona-entrega';
    estado.innerText = 'Selecciona una zona para continuar.';
    return;
  }
  estado.className = 'estado-zona-entrega ' + (zona.disponible ? 'disponible' : 'no-disponible');
  estado.innerText = zona.disponible ? `Disponible · ${zona.tiempo} · Envío desde ${fmt(zona.envio)}` : 'Aún no tenemos cobertura en esta zona.';
}

// ========== MODALES Y AUTH ==========
function abrirModal(id) { document.getElementById(id).style.display = 'block'; }
function cerrarModal(id) { document.getElementById(id).style.display = 'none'; }

function gestionarClicAuth() {
  const u = JSON.parse(localStorage.getItem('usuarioSesion'));
  if (u) {
    document.getElementById('dropdownUsuario').classList.toggle('mostrar');
  } else {
    abrirModal('modalAuth');
    cambiarVistaAuth('login');
  }
}

window.onclick = function(ev) {
  if (!ev.target.matches('#btnAuthTrigger')) {
    document.querySelectorAll('.dropdown-contenido.mostrar')
      .forEach(d => d.classList.remove('mostrar'));
  }
};

function cambiarVistaAuth(v) {
  document.getElementById('vistaLogin').style.display    = v === 'login'    ? 'block' : 'none';
  document.getElementById('vistaRegistro').style.display = v === 'registro' ? 'block' : 'none';
}

const API_BASE_URL = 'http://localhost:8000';

async function apiRequest(path, options = {}, fallbackValue = null) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || 'Error de API');
    }
    return data;
  } catch (error) {
    console.warn('La API local no está disponible:', error.message);
    return fallbackValue;
  }
}

function obtenerUsuarios() {
  try {
    return JSON.parse(localStorage.getItem('usuariosBuffet') || '[]');
  } catch (error) {
    return [];
  }
}

function guardarUsuarios(usuarios) {
  localStorage.setItem('usuariosBuffet', JSON.stringify(usuarios));
}

async function asegurarUsuarioAdmin() {
  const respuesta = await apiRequest('/api/usuarios/ensure-admin', { method: 'POST' }, { ok: true });
  if (respuesta && respuesta.ok) {
    return;
  }

  const usuarios = obtenerUsuarios();
  const adminExiste = usuarios.some(usuario => usuario.correo === 'admin@buffetdigital.com');
  if (!adminExiste) {
    usuarios.push({
      id: 1,
      nombre: 'Administrador',
      correo: 'admin@buffetdigital.com',
      password: 'admin123',
      admin: true
    });
    guardarUsuarios(usuarios);
  }
}

async function procesarRegistro() {
  const nombre = document.getElementById('regNombre').value.trim();
  const correo = document.getElementById('regCorreo').value.trim().toLowerCase();
  const pass = document.getElementById('regPass').value;
  if (!nombre || !correo || !pass) { alert('Llena todos los campos.'); return; }

  const respuesta = await apiRequest('/api/usuarios/register', {
    method: 'POST',
    body: JSON.stringify({ nombre, correo, password: pass })
  });

  if (respuesta && respuesta.ok) {
    alert('Cuenta creada. Ya puedes ingresar.');
    cambiarVistaAuth('login');
    return;
  }

  alert('No se pudo crear la cuenta con la API. Revisa el servidor y vuelve a intentarlo.');
}

async function procesarLogin() {
  const correo = document.getElementById('loginCorreo').value.trim().toLowerCase();
  const pass = document.getElementById('loginPass').value;
  if (!correo || !pass) { alert('Ingresa tu correo y contraseña.'); return; }

  await asegurarUsuarioAdmin();

  const respuesta = await apiRequest('/api/usuarios/login', {
    method: 'POST',
    body: JSON.stringify({ correo, password: pass })
  });

  if (respuesta && respuesta.ok && respuesta.user) {
    const u = respuesta.user;
    localStorage.setItem('usuarioSesion', JSON.stringify({
      id: u.id,
      nombre: u.nombre,
      correo: u.correo,
      admin: Boolean(u.admin)
    }));

    cerrarModal('modalAuth');
    if (esAdministrador({ ...u, admin: Boolean(u.admin) })) { window.location.href = 'Admin/admin.html'; return; }
    verificarSesion();
    alert('Hola, ' + u.nombre);
    return;
  }

  alert('Los datos ingresados no coinciden o el servidor no está disponible.');
}

function verificarSesion() {
  const u = JSON.parse(localStorage.getItem('usuarioSesion'));
  document.getElementById('btnAuthTrigger').innerHTML = u
    ? 'Mi cuenta (' + u.nombre.split(' ')[0] + ') ▾'
    : 'Ingresar';
  actualizarSidebarPerfil();
  const enlaceAdmin = document.getElementById('enlaceAdmin');
  if (enlaceAdmin) enlaceAdmin.style.display = esAdministrador(u) ? 'block' : 'none';
}

function abrirPerfil() {
  const u = JSON.parse(localStorage.getItem('usuarioSesion'));
  if (!u) return;
  document.getElementById('perfilNombre').innerText = u.nombre;
  document.getElementById('perfilCorreo').innerText = u.correo;
  abrirModal('modalPerfil');
}

function cerrarSesion() {
  localStorage.removeItem('usuarioSesion');
  verificarSesion();
  alert('Sesión cerrada.');
}


// ========== TEMA CLARO / OSCURO ==========
function aplicarTema(modo) {
  const oscuro = modo === 'oscuro';
  document.body.classList.toggle('oscuro', oscuro);
  document.documentElement.setAttribute('data-tema', oscuro ? 'oscuro' : 'claro');
  const btn = document.getElementById('btnTema');
  if (btn) {
    btn.innerText = oscuro ? '☀️' : '🌙';
    btn.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    btn.setAttribute('title', oscuro ? 'Modo claro' : 'Modo oscuro');
  }
  const txt = document.getElementById('txtTemaSidebar');
  if (txt) txt.innerText = oscuro ? 'Modo claro' : 'Modo oscuro';
  try { localStorage.setItem('tema', modo); } catch (err) {}
}

function alternarTema() {
  aplicarTema(document.body.classList.contains('oscuro') ? 'claro' : 'oscuro');
}

function temaGuardado() {
  let t = null;
  try { t = localStorage.getItem('tema'); } catch (err) {}
  if (t) return t;
  return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'oscuro' : 'claro';
}

function inicializarCatalogoAdmin() {
  if (localStorage.getItem('adminCatalogo')) return;
  localStorage.setItem('adminCatalogo', JSON.stringify(RECETAS.map((receta, index) => ({
    index,
    n: receta.n,
    cat: receta.cat,
    p: receta.p
  }))));
}

function inicializarAdminEstatico() {
  asegurarUsuarioAdmin();
  if (!localStorage.getItem('pedidosAdmin')) {
    localStorage.setItem('pedidosAdmin', JSON.stringify(obtenerPedidosAdmin()));
  }
}

function actualizarNombresCategorias() {
  const enlaces = {
    asiatico: 'navCatAsiatico', oriental: 'navCatOriental', europeo: 'navCatEuropeo',
    latino: 'navCatLatino', rapido: 'navCatRapido', vegetariano: 'navCatVegetariano', vegano: 'navCatVegano'
  };
  Object.entries(enlaces).forEach(([id, elementoId]) => {
    const elemento = document.getElementById(elementoId);
    if (elemento && CATEGORIAS[id]) elemento.innerText = CATEGORIAS[id].label;
  });
}

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