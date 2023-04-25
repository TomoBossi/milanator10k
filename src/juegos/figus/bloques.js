/**

  Bloques para el juego Figus
    crearAlbum
    faltaFiguEnÁlbum
    comprarFigu
    pegarFigu
    crearContador
    incrementarContador

**/

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  { // Crear álbum
    "type": "crearAlbum",
    "message0": "Crear álbum",
    "style": "colour_blocks",
    "previousStatement":true,
    "nextStatement":true
  },
  { // Falta figu en álbum
    "type": "faltaFiguEnÁlbum",
    "message0": "falta figu en álbum",
    "style": "colour_blocks",
    "output":"Boolean"
  },
  { // Comprar figu
    "type": "comprarFigu",
    "message0": "Comprar figu",
    "style": "colour_blocks",
    "previousStatement":true,
    "nextStatement":true
  },
  { // Pegar figu
    "type": "pegarFigu",
    "message0": "Pegar figu",
    "style": "colour_blocks",
    "previousStatement":true,
    "nextStatement":true
  },
  { // Crear contador
    "type": "crearContador",
    "message0": "Crear contador",
    "style": "colour_blocks",
    "previousStatement":true,
    "nextStatement":true
  },
  { // Incrementar contador
    "type": "incrementarContador",
    "message0": "Incrementar contador",
    "style": "colour_blocks",
    "previousStatement":true,
    "nextStatement":true
  },
  { // Contador
    "type": "contador",
    "message0": "contador",
    "style": "colour_blocks",
    "output":"Number"
  },
  { // Crear anotador
    "type": "crearAnotador",
    "message0": "Crear anotador",
    "style": "colour_blocks",
    "previousStatement":true,
    "nextStatement":true
  },
  { // Anotar
    "type": "anotar",
    "message0": "Anotar %1",
    "args0": [{
      "type":"input_value",
      "name":"X",
      "check":"Number"
    }],
    "style": "colour_blocks",
    "previousStatement":true,
    "nextStatement":true
  },
  { // Anotador
    "type": "anotador",
    "message0": "anotaciones",
    "style": "colour_blocks",
    "output":"Array"
  },
  { // Imprimir resultado
    "type": "decir",
    "message0": "Decir %1",
    "args0": [{
      "type":"input_value",
      "name":"X",
      "check":"Number"
    }],
    "style": "colour_blocks",
    "previousStatement":true,
    "nextStatement":true
  },
  {
    "type": "logic_compare_figus",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "A"
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["es igual a", "EQ"],
          ["es menor a", "LT"],
          ["es mayor a", "GT"]
        ]
      },
      {
        "type": "input_value",
        "name": "B"
      }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "style": "logic_blocks",
    "helpUrl": "%{BKY_LOGIC_COMPARE_HELPURL}",
    "extensions": ["logic_compare", "logic_op_tooltip"]
  },
  {
    "type": "math_on_list_figus",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["suma de", "SUM"],
          ["producto de", "PROD"],
          ["promedio de", "AVERAGE"]
        ]
      },
      {
        "type": "input_value",
        "name": "X",
        "check": "Array"
      }
    ],
    "output": "Number",
    "style": "math_blocks",
    "helpUrl": "%{BKY_MATH_ONLIST_HELPURL}"
  }
]);  // END JSON EXTRACT (Do not delete this comment.)
