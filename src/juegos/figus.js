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
  controls_whileUntil:2,
  controls_repeat_ext:2,
  math_number:2,
  logic_boolean:2
};

Juego.acciones = [
  'crearAlbum','faltaFiguEnÁlbum',
  'comprarFigu','pegarFigu',
  'crearContador','incrementarContador','contador',
  'crearAnotador','anotar','anotador'
];

Mila.generador.header = 'var anotador = [];\n'

for (let a of Juego.acciones) {
  Mila.generador.addReservedWords(a);
  Mila.generador[a] = function(bloque){
    if (a == 'anotador') {
      return [a, 0];
    }
    let resultado = a + `(${Juego.argsBloque(bloque)})`;
    if (['faltaFiguEnÁlbum','contador'].includes(a)) {
      resultado = [resultado, 0];
    } else {
      resultado += ";\n";
      if (a == 'anotar') {
        resultado += `anotador.push(${Juego.argsBloque(bloque)});\n`;
      }
    }
    return resultado;
  };
  Juego.tiemposBloque[a] = 4;
}

Juego.argsBloque = function(bloque) {
  if (bloque.type == 'anotar') {
    return Mila.generador.valueToCode(bloque, "X", 0);
  }
  return '';
}

// Inicializa todo lo necesario antes de que se termine de cargar la página
Juego.preCarga = function() {
  Mila.agregarScriptFuente(`src/juegos/figus/bloques.js`);
  for (let i=0; i<6; i++) {
    Mila.agregarImagenFuenteLocal(`figus/figu${i}.png`, `figu${i}`);
  }
  Mila.agregarImagenFuenteLocal(`figus/vacia.png`, 'vacia');
  Mila.agregarScriptFuente('src/juegos/figus/seedrandom.js');
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
  Canvas.nuevoObjeto({texto:"Nueva figu:", x:10, y:45});
  Math.seedrandom('nombreJugador' in Juego ? Juego.nombreJugador : Math.random());
}

// Detiene el juego
Juego.detener = function() {
  for (robot of Juego.robots) {
    clearInterval(robot.intervalo); // Si había un movimiento programado, lo anulo
  }
};

// Ordena el movimiento de un robot en el mapa
Juego.mover = function(robot, direccion, args) {
  let i;
  switch (direccion) {
    case 'crearAlbum':
      if (Juego.elementos.album.length > 0) {
        for (let e of Juego.elementos.album) {
          e.del = true;
        }
        Juego.elementos.album = [];
      } else {
        Canvas.nuevoObjeto({texto:"Álbum:", x:10, y:120});
      }
      for (i=0; i<6; i++) {
        let img = {imagen:'vacia', x:10+65*i, y:130, rot:0, scale:.3};
        Juego.elementos.album.push(img);
        Canvas.nuevoObjeto(img);
      }
      break;
    case 'faltaFiguEnÁlbum':
      if (Juego.elementos.album.length == 0) {
        alert("Todavía no creaste el álbum");
        Mila.detener();
        break;
      }
      return Juego.elementos.album.some((x) => x.imagen === 'vacia');
      break;
    case 'comprarFigu':
      if ('figuActual' in Juego.elementos) {
        Juego.elementos.figuActual.del = true;
      }
      i = Math.floor(Math.random()*6);
      Juego.elementos.figuActual = {imagen:`figu${i}`, x:120, y:10, scale:.3, i:i};
      Canvas.nuevoObjeto(Juego.elementos.figuActual);
      break;
    case 'pegarFigu':
      if (!('figuActual' in Juego.elementos)) {
        alert("No tenés ninguna figu para pegar");
        Mila.detener();
        break;
      }
      if (Juego.elementos.album.length == 0) {
        alert("Todavía no creaste el álbum");
        Mila.detener();
        break;
      }
      i = Juego.elementos.figuActual.i;
      Juego.elementos.figuActual.x = 10+65*i;
      Juego.elementos.figuActual.y = 130;
      Juego.elementos.album[i].del = true;
      Juego.elementos.album[i] = Juego.elementos.figuActual;
      delete Juego.elementos.figuActual;
      break;
    case 'crearContador':
      if ('contador' in Juego.elementos) {
        Juego.elementos.contador.texto = 0;
      } else {
        let c = {texto:0, x:310, y:45};
        Juego.elementos.contador = c;
        Canvas.nuevoObjeto(c);
        Canvas.nuevoObjeto({texto:"Contador:", x:220, y:45});
      }
      break;
    case 'incrementarContador':
      if (!('contador' in Juego.elementos)) {
        alert("Todavía no creaste el contador");
        Mila.detener();
        break;
      }
      Juego.elementos.contador.texto += 1;
      break;
    case 'contador':
      if (!('contador' in Juego.elementos)) {
        alert("Todavía no creaste el contador");
        Mila.detener();
        break;
      }
      return Juego.elementos.contador.texto;
      break;
    case 'crearAnotador':
      if ('anotador' in Juego.elementos) {
        for (let e of Juego.elementos.anotador) {
          e.del = true;
        }
      } else {
        Canvas.nuevoObjeto({texto:"Anotador:", x:10, y:260});
      }
      Juego.elementos.anotador = [];
      break;
    case 'anotar':
      if (!('anotador' in Juego.elementos)) {
        alert("Todavía no creaste el anotador");
        Mila.detener();
        break;
      } else {
        let a = {texto:(args === undefined ? '?' : args),
          x:10+50*(Math.floor(Juego.elementos.anotador.length % 8)),
          y:290 + 20*(Math.floor(Juego.elementos.anotador.length / 8))
        };
        Juego.elementos.anotador.push(a);
        Canvas.nuevoObjeto(a);
      }
      break;
    case 'anotador':
      if (!('anotador' in Juego.elementos)) {
        alert("Todavía no creaste el anotador");
        Mila.detener();
        break;
      }
      let e = {len: Juego.elementos.anotador.length}
      for (let i=0; i<Juego.elementos.anotador.length; i++) {
        e['elem' + i] = Juego.elementos.anotador[i];
      }
      return e;
      break;
    default:
      //
  }
};

Juego.roles = function() {
  return [
    ["Programa", "AUTO"]
  ];
};

Juego.paso = function() {
};

Juego.jugador = function(nombre) {
  if (nombre) {
    Juego.nombreJugador = nombre;
  } else {
    delete Juego.nombreJugador;
  }
};

// Antes de terminar de cargar la página, llamo a esta función
Juego.preCarga();

Blockly.JavaScript['math_on_list_figus'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list, code;
  switch (func) {
    case 'SUM':
      list = Blockly.JavaScript.valueToCode(block, 'X',
          Blockly.JavaScript.ORDER_MEMBER) || '[]';
      code = list + '.reduce(function(x, y) {return x + y;})';
      break;
    case 'PROD':
      list = Blockly.JavaScript.valueToCode(block, 'X',
          Blockly.JavaScript.ORDER_MEMBER) || '[]';
      code = list + '.reduce(function(x, y) {return x + y;})';
      break;
    case 'AVERAGE':
      var functionName = Blockly.JavaScript.provideFunction_(
          'mathMean',
          ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
              '(myList) {',
            '  return myList.reduce(function(x, y) {return x + y;}) / ' +
                  'myList.length;',
            '}']);
      list = Blockly.JavaScript.valueToCode(block, 'X',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
    default:
      throw Error('Unknown operator: ' + func);
  }
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['logic_compare_figus'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'LT': '<',
    'GT': '>',
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};
