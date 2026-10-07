grammar ysharp;


program
    : declaration* EOF
    ;



declaration
    : funDecl
    | varDecl
    | constDecl
    | statement
    ;

funDecl
    : FUNCTION function
    ;

varDecl
    : VAR IDENTIFIER (ASSIGN expression)? SEMI
    ;

constDecl
    : CONST IDENTIFIER ASSIGN expression SEMI
    ;


statement
    : exprStmt
    | forStmt
    | whileStmt
    | tryStmt
    | ifStmt
    | printStmt
    | printlnStmt
    | returnStmt
    | breakStmt
    | continueStmt
    | block
    ;

block
    : DO declaration* END
    ;

exprStmt
    : expression SEMI
    ;

forStmt
    : FOR (varDecl | exprStmt | SEMI)
      expression?
      SEMI
      expression?
      statement

    | FOR varDecl IN expression statement
    ;

whileStmt
    : WHILE expression statement
    ;

tryStmt
    : TRY block
      CATCH LPAREN IDENTIFIER RPAREN block
      (FINALLY block)?
    ;

ifStmt
    : IF expression THEN block
      (ELIF expression THEN block)*
      (ELSE block)?
    ;

printStmt
    : PRINT expression SEMI
    ;

printlnStmt
    : PRINTLN expression SEMI
    ;

returnStmt
    : RETURN expression? SEMI
    ;

breakStmt
    : BREAK SEMI
    ;

continueStmt
    : CONTINUE SEMI
    ;

expression
    : assignment
    ;

assignment
    : lvalue assignmentOp assignment
    | ternaryConditional
    ;

ternaryConditional
    : equality QUESTION expression COLON ternaryConditional
    | equality
    ;

equality
    : comparison ((NOT_EQUAL | EQUAL) comparison)*
    ;

comparison
    : term ((GT | GTE | LT | LTE) term)*
    ;

term
    : factor ((MINUS | PLUS) factor)*
    ;

factor
    : unary ((DIV | MUL | MOD) unary)*
    ;

unary
    : (NOT | MINUS | PLUS  | INC | DEC) unary
    | postfix
    ;

postfix
    : call (INC | DEC)*
    ;

call
    : primary (
          LPAREN arguments? RPAREN
        | DOT IDENTIFIER
        | SAFE_DOT IDENTIFIER
      )*
    ;

primary
    : array
    | map
    | atom
    ;

atom
    : IDENTIFIER
    | DECIMAL_NUMBER
    | DOUBLE
    | HEX_NUMBER
    | STRING
    | CHAR
    | TRUE
    | FALSE
    | NULL
    | LPAREN expression RPAREN
    ;

array
    : LBRACKET (expression (COMMA expression)*)? RBRACKET
    ;

map
    : LBRACE
      (STRING COLON expression
          (COMMA STRING COLON expression)*
      )?
      RBRACE
    ;

assignmentOp
    : ASSIGN
    | PLUS_ASSIGN
    | MINUS_ASSIGN
    | MUL_ASSIGN
    | DIV_ASSIGN
    | MOD_ASSIGN
    ;

lvalue
    : postfix
    ;


function
    : IDENTIFIER LPAREN parameters? RPAREN block
    ;

parameters
    : IDENTIFIER (COMMA IDENTIFIER)*
    ;

arguments
    : expression (COMMA expression)*
    ;


FUNCTION : 'function';
VAR      : 'var';
CONST    : 'const';

DO       : 'do';
END      : 'end';

FOR      : 'for';
IN       : 'in';
WHILE    : 'while';

TRY      : 'try';
CATCH    : 'catch';
FINALLY  : 'finally';

IF       : 'if';
THEN     : 'then';
ELIF     : 'elif';
ELSE     : 'else';

PRINT    : 'print';
PRINTLN  : 'println';

RETURN   : 'return';
BREAK    : 'break';
CONTINUE : 'continue';

TRUE     : 'true';
FALSE    : 'false';
NULL     : 'null';



INC : '++';
DEC : '--';

PLUS_ASSIGN  : '+=';
MINUS_ASSIGN : '-=';
MUL_ASSIGN   : '*=';
DIV_ASSIGN   : '/=';
MOD_ASSIGN   : '%=';

EQUAL     : '==';
NOT_EQUAL : '!=';

GTE : '>=';
LTE : '<=';
GT  : '>';
LT  : '<';

SAFE_DOT : '?.';

ASSIGN : '=';

PLUS  : '+';
MINUS : '-';
MUL   : '*';
DIV   : '/';
MOD   : '%';

NOT     : '!';


QUESTION : '?';
COLON    : ':';

LPAREN   : '(';
RPAREN   : ')';

LBRACKET : '[';
RBRACKET : ']';

LBRACE   : '{';
RBRACE   : '}';

COMMA : ',';
DOT   : '.';
SEMI  : ';';


HEX_NUMBER
    : '0x' [0-9a-fA-F]+
    ;

DOUBLE
    : [0-9]+ '.' [0-9]+
    ;

DECIMAL_NUMBER
    : [0-9]+
    ;

STRING
    : '"' (ESCAPE_SEQUENCE | ~["\\\r\n])* '"'
    ;

CHAR
    : '\'' (ESCAPE_SEQUENCE | ~['\\\r\n]) '\''
    ;

fragment ESCAPE_SEQUENCE
    : '\\' [btnfr"'\\]
    ;

IDENTIFIER
    : [a-zA-Z_] [a-zA-Z0-9_]*
    ;



WS
    : [ \t\r\n]+ -> skip
    ;

LINE_COMMENT
    : '//' ~[\r\n]* -> skip
    ;

BLOCK_COMMENT
    : '/*' .*? '*/' -> skip
    ;