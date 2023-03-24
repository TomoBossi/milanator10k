/**

  FIGUS

  Juego para simular el llenado de un álbum de figuritas

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

Juego.tiemposBloque = {
  controls_repeat_ext:2,
  controls_if:2,
  math_number:2,
  logic_boolean:2
};

Juego.acciones = ['crearAlbum','faltaFiguEnÁlbum','comprarFigu','pegarFigu','crearContador','incrementarContador'];

for (let a of Juego.acciones) {
  Mila.generador.addReservedWords(a);
  Mila.generador[a] = function(bloque){
    let resultado = a + "()";
    if (a === 'faltaFiguEnÁlbum') {
      resultado = [resultado, 0];
    } else {
      resultado += ";\n";
    }
    return resultado;
  };
  Juego.tiemposBloque[a] = 4;
}

// Inicializa todo lo necesario antes de que se termine de cargar la página
Juego.preCarga = function() {
  Mila.agregarScriptFuente(`src/juegos/figus/bloques.js`);
  for (let i=0; i<6; i++) {
    Mila.agregarImagenFuenteLocal(`figus/figu${i}.png`, `figu${i}`);
  }
  Mila.agregarImagenFuenteLocal(`figus/vacia.png`, 'vacia');
};

// Inicializa todo lo necesario una vez que se termina de cargar la página
Juego.inicializar = function() {
  Juego.robots = []; // Necesito que el campo "robots" exista antes de llamar a reiniciar
  Juego.reiniciar();
};

// Reinicia la ejecución del juego
Juego.reiniciar = function() {
  Juego.detener();
  Juego.robots = [{rol:"AUTO"}];
  Juego.elementos = {
    album: [],
  };
  Canvas.nuevoObjeto({texto:"Nueva figu:", x:10, y:150});
}

// Detiene el juego
Juego.detener = function() {
  for (robot of Juego.robots) {
    clearInterval(robot.intervalo); // Si había un movimiento programado, lo anulo
  }
};

// Ordena el movimiento de un robot en el mapa
Juego.mover = function(robot, direccion) {
  let i;
  switch (direccion) {
    case 'crearAlbum':
      for (i=0; i<6; i++) {
        let img = {imagen:'vacia', x:10+65*i, y:250, rot:0, scale:.3};
        Juego.elementos.album.push(img);
        Canvas.nuevoObjeto(img);
      }
      Canvas.nuevoObjeto({texto:"Álbum:", x:10, y:220});
      break;
    case 'faltaFiguEnÁlbum':
      return Juego.elementos.album.some((x) => x.imagen === 'vacia');
      break;
    case 'comprarFigu':
      i = Math.floor(Math.random()*6);
      Juego.elementos.figuActual = {imagen:`figu${i}`, x:120, y:110, scale:.3, i:i};
      Canvas.nuevoObjeto(Juego.elementos.figuActual);
      break;
    case 'pegarFigu':
      i = Juego.elementos.figuActual.i;
      Juego.elementos.figuActual.x = 10+65*i;
      Juego.elementos.figuActual.y = 250;
      Juego.elementos.album[i].del = true;
      Juego.elementos.album[i] = Juego.elementos.figuActual;
      delete Juego.elementos.figuActual;
      break;
    case 'crearContador':
      let c = {texto:0, x:150, y:50};
      Juego.elementos.contador = c;
      Canvas.nuevoObjeto(c);
      Canvas.nuevoObjeto({texto:"Contador:", x:10, y:50});
      break;
    case 'incrementarContador':
      Juego.elementos.contador.texto += 1;
      break;
    default:
      //
  }
};

Juego.roles = function() {
  return [
    ["Programa", "AUTO"]
  ];
}

Juego.paso = function() {
  for(robot of Juego.robots){
    let k = robot.velocidad;
    switch (robot.estado) {
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
  }
}

// Antes de terminar de cargar la página, llamo a esta función
Juego.preCarga();
