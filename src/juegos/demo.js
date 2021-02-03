/**

  DEMO

  Juego de demostración para mostrar las capacidades del entorno

  VARIABLES
    robots          Lista de robots en juego
    tiemposBloque   Duración de cada bloque

  FUNCIONES
    preCarga        Inicializa todo lo necesario antes de que se termine de cargar la página
    inicializar     Inicializa todo lo necesario una vez que se termina de cargar la página
    reiniciar       Reinicia la ejecución del juego
    detener         Detiene el juego

    mover           Ordena el movimiento de un robot en el mapa

**/

const Juego = {};

// Duración de cada bloque
Juego.tiemposBloque = {
  derecha:200,
  izquierda:200,
  arriba:200,
  abajo:200,
  controls_repeat_ext:100,
  controls_if:100,
  math_number:100,
  logic_boolean:100
};

// Inicializa todo lo necesario antes de que se termine de cargar la página
Juego.preCarga = function() {
  Mila.agregarImagenFuente("robot.png");
  Mila.agregarImagenFuente("caja.png");
};

// Inicializa todo lo necesario una vez que se termina de cargar la página
Juego.inicializar = function() {
  Juego.robots = []; // Necesito que el campo "robots" exista antes de llamar a reiniciar
  Juego.reiniciar();
};

// Reinicia la ejecución del juego
Juego.reiniciar = function() {
  Juego.detener();
  Juego.robots = [
    {imagen:'robot', x:50, y:50, rot:180, rol:"DELANTERO"},
    {imagen:'robot', x:250, y:250, rot:0, rol:"ARQUERO"}
  ];
  Juego.obstaculos = [
    {imagen:'caja', x:150, y:50, rot:0},
    {imagen:'caja', x:50, y:150, rot:0},
    {imagen:'caja', x:150, y:250, rot:0}
  ];
  for (robot of Juego.robots) {
    Canvas.nuevoObjeto(robot);
  }
  for (obstaculo of Juego.obstaculos) {
    Canvas.nuevoObjeto(obstaculo);
  }
}

// Detiene el juego
Juego.detener = function() {
  for (robot of Juego.robots) {
    clearInterval(robot.intervalo); // Si había un movimiento programado, lo anulo
  }
};

// Ordena el movimiento de un robot en el mapa
Juego.mover = function(robot, direccion) {

  var k=10;
  robot.veces = 0;
  const f = function() {
    robot.veces ++;
    if (robot.veces==8) {
      clearInterval(robot.intervalo);
    } else {
      switch (direccion) {
        case DERECHA:
          robot.x = robot.x+k;
          robot.rot = 90;
          break;
        case IZQUIERDA:
          robot.x = robot.x-k;
          robot.rot = 270;
          break;
        case ABAJO:
          robot.y = robot.y+k;
          robot.rot = 180;
          break;
        case ARRIBA:
          robot.y = robot.y-k;
          robot.rot = 0;
          break;
      }
      Canvas.actualizar();
    }
  };
  clearInterval(robot.intervalo);
  let intervalo = setInterval(f,25);
  robot.intervalo = intervalo;
};

Juego.roles = function(){
  return [
  [Blockly.Msg.ARQUERO, "ARQUERO"],
  [Blockly.Msg.DELANTERO, "DELANTERO"]
];
}

// Antes de terminar de cargar la página, llamo a esta función
Juego.preCarga();
