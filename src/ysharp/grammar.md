# Ysharp grammar

### expression grammar

- expression &rarr; assignment
- assignment &rarr; lvalue assignment_op assignment |
  ternary_conditional
- ternary_conditional &rarr; equality "?" expression ":" ternary_conditional
  | equality
- equality &rarr; comparison ( ( "!=" | "==" ) comparison )\*
- comparison &rarr; term ( ( ">" | ">=" | "<" | "<=" ) term )\*
- term &rarr; factor ( ( "-" | "+" ) factor )\*
- factor &rarr; unary ( ( "/" | "\*" | "%" ) unary )\*
- unary &rarr; ( "!" | "-" | "+" | "++" | "--" ) unary | postfix
- postfix &rarr; call ( "++" | "--" )\*
- call &rarr; primary ( "(" arguments? ")" | "." IDENTIFIER | "?." IDENTIFIER )\*
- primary &rarr; array | map | atom
- atom &rarr;
  IDENTIFIER |
  DECIMAL_NUMBER |
  DOUBLE
  HEX_NUMBER |
  STRING |
  CHAR |
  true |
  false |
  null |
  "(" expression ")"
- array &rarr; "[" (expression ("," expression)*)? "]"
- map &rarr; "{" (STRING ":" expression ("," STRING ":" expression)\*)? "}"
- assignment_op &rarr; "=" | "+=" | "-="
  | "\*=" | "/=" | "%="
- lvalue &rarr; postfix

### declaration grammar

- declaration &rarr;
  funDecl |
  varDecl |
  constDecl |
  statement

- funDecl &rarr; "function" function
- varDecl &rarr; "var" IDENTIFIER ("=" expression)? ";"
- constDecl &rarr; "const" IDENTIFIER "=" expression ";"

### statement grammar

- statement &rarr;
  exprStmt |
  forStmt |
  whileStmt |
  tryStmt |
  ifStmt |
  printStmt |
  printlnStmt |
  returnStmt |
  breakStmt |
  continueStmt |
  block

- block &rarr; "do" declaration\* "end"
- exprStmt &rarr; expression ";"
- forStmt &rarr;
  ( "for" ( varDecl | exprStmt | ";" ) expression? ";" expression? statement )
  | ( "for" varDecl "in" expression statement)
- whileStmt &rarr;
  "while" expression statement

- tryStmt &rarr;
  "try" block "catch" "(" IDENTIFIER ")" block ( "finally" block )?

- ifStmt &rarr; "if" expression "then" block
  ( "elif" expression "then" block )\*
  ( "else" block )?

- printStmt &rarr; "print" expression ";"
- printlnStmt &rarr; "println" expression ";"
- returnStmt &rarr; "return" expression? ";"
- breakStmt &rarr; "break" ";"
- continueStmt &rarr; "continue" ";"

### utility

- NUMBER &rarr; INT | DOUBLE
- INT &rarr; [0-9]+
- DOUBLE &rarr; [0-9]+.[0-9]+
- function &rarr; IDENTIFIER "(" parameters? ")" block
- parameters &rarr; IDENTIFIER ( "," IDENTIFIER )\*
- arguments &rarr; expression ( "," expression )\*

HEX_NUMBER &rarr; 0x[0-9A-Fa-f]+
DECIMAL_NUMBER &rarr; [0-9]+

### program

`this is the start point of program`

- program &rarr; declaration\* EOF
