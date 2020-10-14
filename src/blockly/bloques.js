/**

  BLOCKLY/BLOQUES

  Definición de bloques propios
    derecha
    izquierda
    arriba
    abajo

**/

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  { // Movimiento a derecha
    "type": "derecha",
    "message0": "%{BKY_DERECHA}",
    "style": "logic_blocks",
    "previousStatement":true,
    "nextStatement":true
  },
  { // Movimiento a izquierda
    "type": "izquierda",
    "message0": "%{BKY_IZQUIERDA}",
    "style": "math_blocks",
    "previousStatement":true,
    "nextStatement":true
  },
  { // Movimiento hacia arriba
    "type": "arriba",
    "message0": "%{BKY_ARRIBA}",
    "style": "loop_blocks",
    "previousStatement":true,
    "nextStatement":true
  },
  { // Movimiento hacia abajo
    "type": "abajo",
    "message0": "%{BKY_ABAJO}",
    "style": "text_blocks",
    "previousStatement":true,
    "nextStatement":true
  }
]);  // END JSON EXTRACT (Do not delete this comment.)