/**

  MILA.Blockly

  Funciones para interactuar con Blockly

  FUNCIONES
    inicializar             Inicializa el entorno Blockly
      inyectarBlockly       Inyecta la interfaz Blockly en la div con id "blockly" y guarda el resultado en Mila.workspace

**/

Mila.Blockly = {};

// Inicializa el entorno Blockly
Mila.Blockly.inicializar = function() {
  Mila.Blockly.inyectarBlockly();   // Inyectar la interfaz de Blockly
}

// Inyecta la interfaz Blockly en la div con id "blockly" y guarda el resultado en Mila.workspace
Mila.Blockly.inyectarBlockly = function() {
  // Toma como segundo argumento un objeto de configuración
  Mila.workspace = Blockly.inject('blockly', {
    toolbox: Juego.toolbox                      // Set de bloques del juego actual
  });
};
