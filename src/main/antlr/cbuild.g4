grammar cbuild;

cbuildfile: statements EOF
| EOF
;

statements: (statement | br)* ;

conditional
    : if_eq_kw ws? condition   statements_opt ENDIF comment_opt br
    | if_eq_kw ws? condition   statements_opt ELSE statements_opt ENDIF comment_opt br
    | if_eq_kw ws? condition   statements_opt ELSE conditional
    | if_def_kw ws? identifier  statements_opt ENDIF comment_opt br
    | if_def_kw ws? identifier  statements_opt ELSE statements_opt ENDIF comment_opt br
    | if_def_kw ws? identifier  statements_opt ELSE conditional
    ;

conditional_in_recipe
    : if_eq_kw ws? condition  recipes_opt ENDIF comment_opt
    | if_eq_kw ws? condition  recipes_opt ELSE recipes_opt ENDIF comment_opt
    | if_eq_kw ws? condition  recipes_opt ELSE conditional_in_recipe
    | if_def_kw ws? identifier recipes_opt ENDIF comment_opt
    | if_def_kw ws? identifier recipes_opt ELSE recipes_opt ENDIF comment_opt
    | if_def_kw ws? identifier recipes_opt ELSE conditional_in_recipe
    ;

statements_opt
    : comment_opt br statements?
    ;

statement: COMMENT
    | assignment br
    | function br
    | rule
    | conditional
    | define
    | include
    | export br
    ;

define
    : specifiers? DEFINE pattern ASSIGN_OP? definition ENDEF br
    ;

definition
    : comment_opt br
    | comment_opt br exprs_in_def br
    ;

include
    : INCLUDE expressions br
    ;

export
    : EXPORT
    | UNEXPORT
    | assignment_prefix (ws targets)?
    ;

assignment
    : pattern ws? ASSIGN_OP ws? exprs_in_assign? ws? comment_opt
    | assignment_prefix ws? ASSIGN_OP ws? exprs_in_assign? ws? comment_opt
    ;

assignment_prefix: specifiers pattern;


if_eq_kw
    : IFEQ
    | IFNEQ
    ;

if_def_kw
    : IFDEF
    | IFNDEF
    ;

condition
    : LPAREN ws? expressions_opt ws? COMMA ws? expressions_opt ws? RPAREN
    | SLIT ws? SLIT
    ;

expressions_opt
    : expressions?
    ;

expressions
    : expression (ws expression)*
    ;

exprs_nested
    : expr_nested (ws expr_nested)*
    ;

exprs_in_assign
    : expr_in_assign (ws expr_in_assign)*
    ;

exprs_in_recipe
    : expr_in_recipe (ws expr_in_recipe)*
    ;

exprs_in_def
    : br
    | br? first_expr_in_def ( (br first_expr_in_def) | (br) | (ws expr_in_recipe) )*
    ;

first_expr_in_def
    : (char_in_def | function) expr_in_recipe?
    ;

expression
    : expression_atom+
    ;

expression_atom
    : text
    | function
    | LPAREN exprs_nested RPAREN
    ;

expr_nested
    : expr_nested_atom+
    ;

expr_nested_atom
    : text_nested
    | function
    | LPAREN exprs_nested RPAREN
    ;

expr_in_assign
    : expr_in_assign_atom+
    ;

expr_in_assign_atom
    : text_in_assign
    | function
    ;

expr_in_recipe
    : expr_in_recipe_atom+
    ;

expr_in_recipe_atom
    : text_in_recipe
    | function
    ;

function
    : VAR
    | DOLLAR_LPAREN function_name RPAREN
    | DOLLAR_LPAREN function_name ws arguments RPAREN
    | DOLLAR_LPAREN function_name COMMA arguments RPAREN
    | DOLLAR_LPAREN function_name COLON expressions RPAREN
    | DOLLAR_LPAREN function_name ASSIGN_OP expressions RPAREN
    ;

function_name
    : function_name_atom+
    ;

function_name_atom
    : CHARS
    | function
    ;

arguments
    : argument? (COMMA argument? )*
    ;

argument
    : expressions
    ;

rule
    : targets ws? colon ws? prerequisites ws? NL recipes?
    | targets ws? colon ws? assignment ws? NL
    ;

target
    : pattern
    ;

pattern
    : (identifier | function)+
    ;

prerequisites
    : targets?
    ;

targets
    : target (ws target)*
    ;

recipes
    : recipe+
    ;

recipes_opt
    : comment_opt recipes? NL
    ;

recipe
    : LEADING_TAB ws? exprs_in_recipe NL
    | LEADING_TAB ws? COMMENT NL
    | NL conditional_in_recipe
    ;

specifiers
    : OVERRIDE
    | EXPORT
    | UNEXPORT
    | OVERRIDE EXPORT
    | EXPORT OVERRIDE
    | UNDEFINE
    | OVERRIDE UNDEFINE
    | UNDEFINE OVERRIDE
    ;

identifier
    : identifier_atom+
    ;

identifier_atom
    : CHARS
    | keywords
    | COMMA
    | LPAREN
    | RPAREN
    ;

br : NL;


char: CHARS
    | SLIT
    | ASSIGN_OP
    | COLON
    ;

char_nested: char | ',' ;


char_in_assign: char_nested
    | LPAREN
    | RPAREN
    | keywords
    ;

char_in_def
    : char
    | LPAREN
    | RPAREN
    | COMMA
    | COMMENT
    | INCLUDE
    | OVERRIDE
    | EXPORT
    | UNEXPORT
    | IFDEF
    | IFNDEF
    | IFEQ
    | IFNEQ
    | ELSE
    | ENDIF
    | DEFINE
    | UNDEFINE
    ;

char_in_recipe: char_in_assign | COMMENT;

text
    : char+
    ;

text_nested
    : char_nested+
    ;

text_in_assign
    : char_in_assign+
    ;

text_in_recipe
    : char_in_recipe+
    ;

keywords
    : INCLUDE
    | OVERRIDE
    | EXPORT
    | UNEXPORT
    | IFDEF
    | IFNDEF
    | IFEQ
    | IFNEQ
    | ELSE
    | ENDIF
    | DEFINE
    | ENDEF
    | UNDEFINE
    ;

colon
    : COLON
    | DOUBLE_COLON
    ;

comment_opt: COMMENT?;

ws
    : WS
    | TAB
    ;

ASSIGN_OP
    : ':::='
    | '::='
    | ':='
    | '?='
    | '+='
    | '!='
    | '='
    ;

DOLLAR_LPAREN
    : '$('
    ;

VAR
    : '$' [a-zA-Z0-9_@%<?^+*]
    ;

DOUBLE_COLON : '::';
COLON        : ':';
LPAREN : '(';
RPAREN : ')';
COMMA  : ',';

INCLUDE  : 'include';
ENDEF    : 'endef';
IFDEF  : 'ifdef';
IFNDEF : 'ifndef';
IFEQ   : 'ifeq';
IFNEQ  : 'ifneq';
ELSE   : 'else';
ENDIF  : 'endif';
OVERRIDE : 'override';
EXPORT   : 'export';
UNEXPORT : 'unexport';
UNDEFINE : 'undefine';
DEFINE : 'define';

SLIT
    : '"'  ( '\\' . | ~["\\\r\n] )* '"'
    | '\'' ( '\\' . | ~['\\\r\n] )* '\''
    ;

CHARS
    : ~[ \t\r\n$():,=#]+
    ;

NL : '\r'? '\n' ;

LEADING_TAB
    : {getCharPositionInLine() == 0}? '\t'
    ;

WS
    : [ ]+
    ;

TAB
    : '\t'
    ;

COMMENT: '#' ~[\r\n]* ;

