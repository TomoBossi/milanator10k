/**

  MILA.Blockly

  Funciones para interactuar con Blockly

  FUNCIONES
    inicializar             Inicializa el entorno Blockly
      inyectarBlockly       Inyecta la interfaz Blockly en la div con id "blockly" y guarda el resultado en Mila.workspace

    generarXml              Genera el xml de un workspace en formato string
    cargarDesdeXml          Crea los bloques en un workspace a partir de un xml en formato string

**/

Mila.Blockly = {};

// Inicializa el entorno Blockly
Mila.Blockly.inicializar = function() {
  Mila.Blockly.inyectarBlockly();   // Inyectar la interfaz de Blockly
  // Agrego un listener de eventos para guardar el workspace tras cada cambio
  Mila.workspace.addChangeListener(function(evento) {
    sessionStorage.xml = Mila.Blockly.generarXml(Mila.workspace);
  });
  // Me fijo si hay un workspace guardado
  if (sessionStorage.xml) {
    Mila.Blockly.cargarDesdeXml(Mila.workspace, sessionStorage.xml);
  // Si no, creo un workspace vacío
  } else {
    // Crear bloque inicial
  }
};

// Inyecta la interfaz Blockly en la div con id "blockly" y guarda el resultado en Mila.workspace
Mila.Blockly.inyectarBlockly = function() {
  // Toma como segundo argumento un objeto de configuración
  Mila.workspace = Blockly.inject('blockly', {
    toolbox: Juego.toolbox                      // Set de bloques del juego actual
  });
};

// Genera el xml de un workspace en formato string
Mila.Blockly.generarXml = function(workspace) {
  return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
};

// Crea los bloques en un workspace a partir de un xml en formato string
Mila.Blockly.cargarDesdeXml = function(workspace, xml) {
  Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);
};
