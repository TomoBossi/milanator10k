/**

  BLOCKLY/GENERADOR

  Definición del generador propio basado en el de Javascript

**/

// Generador
Mila.generador = Blockly.JavaScript;

// Prefijo de sentencia para iluminar los bloques cuando se ejecutan
Mila.generador.STATEMENT_PREFIX = 'iluminar(%1);';

// Palabras reservadas (no pueden ser nombres de funciones ni variables)
Mila.generador.addReservedWords('iluminar');
Mila.generador.addReservedWords('derecha');
Mila.generador.addReservedWords('izquierda');
Mila.generador.addReservedWords('arriba');
Mila.generador.addReservedWords('abajo');

// Funciones generadoras
Mila.generador.derecha = function(bloque){
  return "derecha();\n";
};
Mila.generador.izquierda = function(bloque){
  return "izquierda();\n";
};
Mila.generador.arriba = function(bloque){
  return "arriba();\n";
};
Mila.generador.abajo = function(bloque){
  return "abajo();\n";
};