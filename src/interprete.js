/**

  INTÉRPRETE

  Módulo para ejecutar el código generado desde Blockly

  VARIABLES
    estado          Estado actual del intérprete (ejecutando, debuggeando, etc.)
    proximoPaso     Handler de timeout para el próximo paso del intérprete
    retraso         Duración del paso actual

  FUNCIONES
    inicializar         Inicializa todo lo necesario una vez que se termina de cargar la página
    compilar            Crea todos los intérpretes necesarios a partir del código generado por Blockly
      nuevo             Crea un nuevo intérprete a partir de un código personalizado

    ejecutar            Comienza a ejercutar el intérprete
    detener             Detiene la ejecución del intérprete
    debug               Ejecuta un paso de debug
    paso                Ejecuta el código de un bloque

    iluminar            Ilumina el bloque que se está ejecutando
      bloquePrimitivo   Determina si el tipo corresponde a un bloque primitivo

**/

const Interprete = {};

// Posibles valores para el estado del intérprete
const DETENIDO = 0;
const EJECUTANDO = 1;
const DEBUGGEANDO = 2;

// Posibles direcciones para llamar a Juego.mover
const DERECHA = 0;
const IZQUIERDA = 1;
const ARRIBA = 2;
const ABAJO = 3;

// Inicializa todo lo necesario una vez que se termina de cargar la página
Interprete.inicializar = function() {
  Interprete.estado = DETENIDO;
};

// Crea todos los intérpretes necesarios a partir del código generado por Blockly
Interprete.compilar = function(codigo) {
  Juego.robots[0].interprete = Interprete.nuevo(codigo);
};

// Crea un nuevo intérprete a partir de un código personalizado
Interprete.nuevo = function(codigo) {
  const initApi = function (interprete, global) {
    var wrapperDerecha = function() {
      Interprete.retraso = Juego.tiemposBloque.derecha;
      Juego.mover(DERECHA);
      return;
    };
    var wrapperIzquierda = function() {
      Interprete.retraso = Juego.tiemposBloque.izquierda;
      Juego.mover(IZQUIERDA);
      return;
    };
    var wrapperAbajo = function() {
      Interprete.retraso = Juego.tiemposBloque.abajo;
      Juego.mover(ABAJO);
      return;
    };
    var wrapperArriba = function() {
      Interprete.retraso = Juego.tiemposBloque.arriba;
      Juego.mover(ARRIBA);
      return;
    };
    interprete.setProperty(global, 'derecha',
        interprete.createNativeFunction(wrapperDerecha));
    interprete.setProperty(global, 'izquierda',
        interprete.createNativeFunction(wrapperIzquierda));
    interprete.setProperty(global, 'arriba',
        interprete.createNativeFunction(wrapperArriba));
    interprete.setProperty(global, 'abajo',
        interprete.createNativeFunction(wrapperAbajo));
    interprete.setProperty(global, 'iluminar',
        interprete.createNativeFunction(Interprete.iluminar));
  };
  return new Interpreter(codigo, initApi);
};

// Comienza a ejercutar el intérprete
Interprete.ejecutar = function(codigo) {
  Interprete.estado = EJECUTANDO;
  Interprete.proximoPaso = setTimeout(Interprete.paso, 100);
};

// Detiene la ejecución del intérprete
Interprete.detener = function() {
  Interprete.estado = DETENIDO;
  clearTimeout(Interprete.proximoPaso);   // Si había un paso programado, lo cancelo
  Interprete.iluminar(null);              // Si quedaron bloques iluminados, los anulo
};

// Ejecuta un paso de debug
Interprete.debug = function(codigo) {
  Interprete.estado = DEBUGGEANDO;
  Interprete.paso();
};

// Ejecuta el código de un bloque
  // Mientras siga en el mismo bloque ejecuto recursivamente
Interprete.paso = function() {
  if (Juego.robots[0].interprete.step()) {
    if (Interprete.retraso) {                         // Cambio de bloque
      let retraso = Interprete.retraso;
      Interprete.retraso = null;
      // Si estoy ejecutando programo próximo paso
      if (Interprete.estado == EJECUTANDO) {
        Interprete.proximoPaso =
          setTimeout(Interprete.paso, retraso);
      }
    } else {                                          // Sigo en el mismo bloque
      Interprete.paso();
    }
  } else {                                            // Finalizó la ejecución
    Interprete.iluminar(null);
  }
};

// Ilumina el bloque que se está ejecutando
Interprete.iluminar = function(idBloque) {
  const bloque = Mila.workspace.getBlockById(idBloque);
  if (bloque &&
      bloque.type in Juego.tiemposBloque &&
      !Interprete.bloquePrimitivo(bloque.type)) {
    // Asigno un retraso para la ejecución del próximo bloques
    Interprete.retraso = Juego.tiemposBloque[bloque.type];
  }
  Mila.workspace.highlightBlock(idBloque);
  return null; // Necesario para que los bloques de expresiones se evalúen
};

// Determina si el tipo corresponde a un bloque primitivo
  // En tal caso, el retraso lo va a asignar su función correspondiente y no el iluminar
Interprete.bloquePrimitivo = function(tipo) {
  return ['derecha','izquierda','arriba','abajo'].includes(tipo);
}