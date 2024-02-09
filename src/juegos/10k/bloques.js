/**

  Bloques para el juego Diez mil
      tirarCubilete
      dadosArrojados
      crearTabla
      acumularPuntos
      puntosParaDados
      hay10Mil
      decir
      logic_compare_10k
      math_on_list_10k
      count
**/

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  { // Tirar cubilete
    "type": "tirarCubilete",
    "message0": "Tirar cubilete",
    "style": "colour_blocks",
    "previousStatement":true,
    "nextStatement":true
  },{ // Dados arrojados
    "type": "dadosArrojados",
    "message0": "dados arrojados",
    "style": "colour_blocks",
    "output":"Array"
  },{ // Puntos para dados
    "type": "puntosParaDados",
    "message0": "puntaje con dados %1",
    "args0": [{
      "type":"input_value",
      "name":"X",
      "check":"Array"
    }],
    "style": "colour_blocks",
    "output":"Array"
  },{ // Hay 10 mil
    "type": "hay10Mil",
    "message0": "alguien en %1 llegó a 10 mil puntos",
    "args0":[{
      "type":"input_value",
      "name":"X",
      "check":"Array"
    }],
    "style": "colour_blocks",
    "output":"Boolean",
    "tooltip":"Toma una lista de números correspondientes a los puntajes de cada jugador y devuelve si alguno ya llegó a 10 mil puntos"
  },{ // Puntajes de los jugadores tras realizar una ronda
    "type": "puntosRonda",
    "message0": "puntaje de una ronda de %1 jugadores",
    "args0":[{
      "type": "field_number",
      "name": "K",
      "value": 4
    }],
    "style": "colour_blocks",
    "output":"Array",
    "tooltip":"Juega una ronda y devuelve una lista con la cantidad de puntos que hizo cada jugador"
  },{ // Puntajes de los jugadores tras realizar una ronda (con cantidad fija de jugadores)
    "type": "puntosRondaFix",
    "message0": "puntaje de una ronda",
    "style": "colour_blocks",
    "output":"Array",
    "tooltip":"Juega una ronda y devuelve una lista con la cantidad de puntos que hizo cada jugador"
  },{ // Imprimir resultado
    "type": "decir",
    "message0": "Decir %1",
    "args0": [{
      "type":"input_value",
      "name":"X"
    }],
    "style": "colour_blocks",
    "previousStatement":true,
    "nextStatement":true
  },{ // Asignar posición lista variable
    "type": "list_assign_var",
    "message0": "Asignar a la posición %1 de %2 el valor %3",
    "args0": [{
      "type":"input_value",
      "name":"POS",
      "check":"Number"
    },{
      "type": "field_variable",
      "name": "VAR",
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
    },{
      "type":"input_value",
      "name":"X"
    }],
    "style": "colour_blocks",
    "previousStatement":true,
    "nextStatement":true
  },{ // Agregar en lista
    "type": "list_push_var",
    "message0": "Agregar %1 al final de %2",
    "args0": [{
      "type":"input_value",
      "name":"X"
    },{
      "type": "field_variable",
      "name": "VAR",
      "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
    }],
    "style": "colour_blocks",
    "previousStatement":true,
    "nextStatement":true
  },{ // Suma de listas
    "type": "list_plus_list",
    "message0": "Suma de listas %1 y %2",
    "args0": [{
      "type":"input_value",
      "name":"A",
      "check":"Array"
    },{
      "type":"input_value",
      "name":"B",
      "check":"Array"
    }],
    "style": "colour_blocks",
    "output":"Array"
  },{ // Lista vacía
    "type": "listaVacia",
    "message0": "lista vacía",
    "style": "colour_blocks",
    "output":"Array"
  },{ // Lista de ceros
    "type": "listaDeCeros",
    "message0": "lista con %1 ceros",
    "args0":[{
      "type": "field_number",
      "name": "K",
      "value": 4
    }],
    "style": "colour_blocks",
    "output":"Array"
  },{ // Lista de 4 ceros
    "type": "listaDeCerosFix",
    "message0": "lista con 4 ceros",
    "style": "colour_blocks",
    "output":"Array"
  },{ // Comparación
    "type": "logic_compare_10k",
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
          ["es distinto a", "NEQ"],
          ["es menor a", "LT"],
          ["es mayor a", "GT"],
          ["es menor o igual a", "LTE"],
          ["es mayor o igual a", "GTE"]
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
  },{ // Operación sobre lista
    "type": "math_on_list_10k",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["suma de", "SUM"],
          ["producto de", "PROD"],
          ["promedio de", "AVERAGE"],
          ["mínimo de", "MIN"],
          ["máximo de", "MAX"]
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
  },{ // Cantidad de apariciones
    "type": "count",
    "message0": "Cantidad de apariciones de %1 en %2",
    "args0": [{
      "type":"input_value",
      "name":"ELEM",
      "check":"Number"
    },{
      "type":"input_value",
      "name":"LIST",
      "check":"Array"
    }],
    "output": "Number",
    "style": "math_blocks",
    "helpUrl": "Devuelve la cantidad de apariciones del elemento en la lista."
  }
]);  // END JSON EXTRACT (Do not delete this comment.)
