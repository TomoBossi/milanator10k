/**

  LAYOUT

  Módulo para configurar la interfaz

  FUNCIONES
    inicializar     Inicializa todo lo necesario una vez que se termina de cargar la página

**/

const Layout = {
  Horizontal: 1,
  Vertical: 2
};

const layout = {dist:Layout.Horizontal}; // default

Layout.inicializar = function() {
  Object.assign(layout, (Juego.layout || {}));
  const tabla = document.getElementById('layout');
  const blockly = document.getElementById('blockly');
  const canvas = document.getElementById('canvas');
  let cel = document.createElement('td');
  cel.setAttribute('classname', 'np');
  let row = document.createElement('tr');
  tabla.appendChild(row);
  row.appendChild(cel);
  cel.appendChild(blockly);
  if (layout.dist == Layout.Vertical) {
    row = document.createElement('tr');
    tabla.appendChild(row);
  }
  cel = document.createElement('td');
  cel.setAttribute('classname', 'np');
  row.appendChild(cel);
  cel.appendChild(canvas);
};

Layout.anchoCanvas = function() {
  return (layout.dist == Layout.Horizontal ? 400 : window.innerWidth-20);
};

Layout.altoCanvas = function() {
  return (layout.dist == Layout.Horizontal ? window.innerHeight-60 : 170);
};

Layout.anchoBlockly = function() {
  return (layout.dist == Layout.Horizontal ? window.innerWidth-Canvas.ancho-30 : window.innerWidth-15);
};

Layout.altoBlockly = function() {
  return window.innerHeight - (layout.dist == Layout.Horizontal ? 55 : Canvas.alto + 70);
};