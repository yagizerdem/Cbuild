grammar Hello;
r : 'hello' ID ;
ID : [a-z]+ ;
// Define a grammar called Hello
// match keyword hello followed by an identifier
// match lower-case identifiers
WS : [ \t\r\n]+-> skip ; // skip spaces, tabs, newlines, \r (Windows)