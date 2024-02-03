/**

  Diez mil

  Juego de dados en el que hay que tirar el cubilete hasta acumular 10 puntos con las siguientes reglas:
  - 50 puntos por cada cinco
  - 100 puntos por cada uno
  - 500 puntos adicionales si salen 3 cincos
  - 1000 puntos adicionales si salen 3 unos
  - 10000 puntos adicionales si salen 5 unos

  VARIABLES

  FUNCIONES

**/

const posicionesDados = [
  {x:10,y:270},{x:150,y:270},
  {x:80,y:340},
  {x:10,y:410},{x:150,y:410},
];

const Juego = {};

Juego.tiemposBloque = {
  controls_whileUntil:2,
  controls_repeat_ext:2,
  controls_if:2,
  math_number:2,
  logic_boolean:2,
  math_arithmetic:3,
  math_on_list_10k:4,
  logic_compare_10k:2,
  count:2,
  inicializarCubilete:3,
  tirarDado:3,
  verificarPuntaje:10,
  anotarPuntos:10
};

Juego.acciones = [
  'tirarCubilete','dadosArrojados',
  'crearTabla','acumularPuntos','puntosParaDados','hay10Mil',
  'decir'
];

Mila.generador.header = 'var var_puntajes = undefined;\nvar var_dados = undefined;\n';

Mila.generador.listaVacia = function(bloque) {
  return ["[]",0];
};

Mila.generador.list_assign_var = function(bloque) {
  let v = Blockly.JavaScript.variableDB_.getName(bloque.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  let pos = Mila.generador.valueToCode(bloque, "POS", 0);
  let val = Mila.generador.valueToCode(bloque, "X", 0);
  return `${v}[${pos}] = ${val};\n`;
};

Mila.generador.list_push_var = function(bloque) {
  let v = Blockly.JavaScript.variableDB_.getName(bloque.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  let val = Mila.generador.valueToCode(bloque, "X", 0);
  return `${v}.push(${val});\n`;
};

for (let a of Juego.acciones) {
  if (!(a in ['tirarCubilete','acumularPuntos'])) { // Casos especiales, no tienen función asociada
    Mila.generador.addReservedWords(a);
  }
  Mila.generador[a] = function(bloque){
    let args = Juego.argsBloque(bloque);
    if (a == 'dadosArrojados') {
      return [`(dadosArrojados()||var_dados)`,0];
    } else if (a == 'tirarCubilete') { // Caso especial porque tengo que actualizar var_dados
      return Juego.tirarCubilete();
    } else if (a == 'acumularPuntos') { // Caso especial porque tengo que actualizar var_puntajes
      return Juego.acumularPuntos(args);
    }
    let resultado = a + `(${args})`;
    if (['puntosParaDados','hay10Mil'].includes(a)) {
      resultado = [resultado, 0];
    } else {
      resultado += ";\n";
      if (a == 'crearTabla') {
        const cantJugadores = args === '' ? 0 : args;
        resultado += `var_puntajes = [];\nfor(var i=0; i<${cantJugadores}; i++){\n  var_puntajes.push(0);\n}\n`;
      }
    }
    return resultado;
  };
  Juego.tiemposBloque[a] = 2;
}

// Adicionales para los casos especiales
for (let a of ['inicializarCubilete', 'tirarDado', 'verificarPuntaje', 'anotarPuntos']) {
  Juego.acciones.push(a);
  Mila.generador.addReservedWords(a);
}

Mila.generador.count = function(bloque){
  const elem = Mila.generador.valueToCode(bloque, "ELEM", 0);
  const list = Mila.generador.valueToCode(bloque, "LIST", 0);
  return [`${list}.reduce((rec,x) => rec + (x == ${elem} ? 1 : 0), 0)`,0];
};

Juego.argsBloque = function(bloque) {
  if (['acumularPuntos','puntosParaDados','decir','crearTabla'].includes(bloque.type)) {
    return Mila.generador.valueToCode(bloque, "X", 0);
  }
  return '';
}

// Inicializa todo lo necesario antes de que se termine de cargar la página
Juego.preCarga = function() {
  Mila.agregarScriptFuente(`src/juegos/10k/bloques.js`);
  Mila.agregarScriptFuente('src/juegos/figus/seedrandom.js');
  for (let i=1; i<=6; i++) {
    Mila.agregarImagenFuenteLocal(`10k/${i}.png`, `dado${i}`);
  }
  Mila.agregarImagenFuenteLocal(`10k/cubilete.png`, 'cubilete');
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
    dados: [],
    cubilete: Canvas.nuevoObjeto({imagen:'cubilete', x:50, y:70, scale:.75})
  };
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
    case 'tirarCubilete':
      break; // Caso especial porque tengo que actualizar var_dados
    case 'dadosArrojados':
      if (!('dados' in Juego.elementos)) {
        alert("Todavía no arrojaste los dados");
        Mila.detener();
        break;
      }
      return undefined;
      break;
    case 'crearTabla':
      const cantJugadores = args === undefined ? 0 : args;
      Juego.elementos.tabla = [];
      for (let i=0; i<cantJugadores; i++) {
        Juego.elementos.tabla.push(0);
      }
      if ('textos' in Juego.elementos) {
        for (let texto of Juego.elementos.textos) {
          texto.del = true;
        }
      }
      Juego.elementos.textos = [];
      for (let i=0; i<cantJugadores; i++) {
        Juego.elementos.textos.push(Canvas.nuevoObjeto({texto:"0", x:360, y:120+30*i}));
      }
      Juego.elementos.textos.push(Canvas.nuevoObjeto({texto:"Puntajes", x:300, y:100}));
      for (let i=0; i<cantJugadores; i++) {
        Juego.elementos.textos.push(Canvas.nuevoObjeto({texto:`J ${i+1}`, x:300, y:120+30*i}));
      }
      break;
    case 'acumularPuntos':
      break; // Caso especial porque tengo que actualizar var_puntajes
    case 'puntosParaDados':
      if (args === undefined) { return 0; }
      let cantUnos = args.reduce((rec,x) => rec + (x == 1 ? 1 : 0), 0);
      let cantCincos = args.reduce((rec,x) => rec + (x == 5 ? 1 : 0), 0);
      let puntos = cantUnos*100 + cantCincos*50;
      if (cantUnos >= 3) {
        puntos += 1000;
      }
      if (cantCincos >= 3) {
        puntos += 500;
      }
      return puntos;
      break;
    case 'hay10Mil':
      if (!('tabla' in Juego.elementos)) {
        alert("Todavía no creaste la tabla de puntajes");
        Mila.detener();
        break;
      }
      return Juego.elementos.tabla.some((x) => x >= 10000);
      break;
    case 'decir':
      alert(args === undefined ? '?' : args);
      break;
    // Adicionales para los casos especiales
    case 'inicializarCubilete':
      for (let dado of Juego.elementos.dados) {
        dado.del = true;
      }
      Juego.elementos.dados = [];
      Juego.elementos.cubilete.rot = 180;
      Juego.elementos.cubilete.y = 10;
      break;
    case 'tirarDado':
      let i = Juego.elementos.dados.length;
      let dado = 1+Math.floor(Math.random()*6);
      let rot = Math.floor(Math.random()*360);
      let x = posicionesDados[i].x + Math.floor(Math.random()*30);
      let y = posicionesDados[i].y + Math.floor(Math.random()*30);
      Juego.elementos.dados.push(Canvas.nuevoObjeto({imagen:`dado${dado}`, x, y, scale:.4, rot}));
      if (i == 4) {
        Juego.elementos.cubilete.rot = 0;
        Juego.elementos.cubilete.y = 70;
      }
      return dado;
      break;
    case 'verificarPuntaje':
      if (!('tabla' in Juego.elementos)) {
        alert("Todavía no creaste la tabla de puntajes");
        Mila.detener();
        return false;
        break;
      }
      if (args.length != Juego.elementos.tabla.length) {
        alert(`La lista de puntajes a actualizar no puede tener ${args.length > Juego.elementos.tabla.length ? 'más' : 'menos'} elementos que la cantidad de jugadores`);
        Mila.detener();
        return false;
        break;
      }
      return true;
      break;
    case 'anotarPuntos':
      for (let i=0; i<Juego.elementos.tabla.length; i++) {
        Juego.elementos.tabla[i] += args[i];
        Juego.elementos.textos[i].texto = Juego.elementos.tabla[i];
      }
      break;
    default:
      //
  }
};

Juego.tirarCubilete = function() {
  let resultado = 'inicializarCubilete();\nvar_dados = [];\n';
  resultado += 'for (var i=0; i<5; i++) {\n  var_dados.push(tirarDado());\n}\n';
  return resultado;
};

Juego.acumularPuntos = function(args) {
  const puntos = args === '' ? "[]" : args;
  let resultado = `var puntos = ${puntos};\nif (verificarPuntaje(puntos)) {\n` +
  '  for (var i=0; i<var_puntajes.length; i++) {\n    var_puntajes[i] += puntos[i];\n  }\n' +
  '  anotarPuntos(puntos);\n}\n';
  return resultado;
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

Blockly.JavaScript['math_on_list_10k'] = function(block) {
  // Math functions for lists.
  var func = block.getFieldValue('OP');
  var list, code;
  switch (func) {
    case 'SUM':
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_MEMBER) || '[]';
      code = list + '.reduce(function(x, y) {return x + y;})';
      break;
    case 'MIN':
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_COMMA) || '[]';
      code = 'Math.min.apply(null, ' + list + ')';
      break;
    case 'MAX':
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_COMMA) || '[]';
      code = 'Math.max.apply(null, ' + list + ')';
      break;
    case 'AVERAGE':
      // mathMean([null,null,1,3]) == 2.0.
      var functionName = Blockly.JavaScript.provideFunction_(
          'mathMean',
          ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
              '(myList) {',
            '  return myList.reduce(function(x, y) {return x + y;}) / ' +
                  'myList.length;',
            '}']);
      list = Blockly.JavaScript.valueToCode(block, 'LIST',
          Blockly.JavaScript.ORDER_NONE) || '[]';
      code = functionName + '(' + list + ')';
      break;
      default:
        throw Error('Unknown operator: ' + func);
    }
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };

Blockly.JavaScript['logic_compare_10k'] = Blockly.JavaScript['logic_compare'];