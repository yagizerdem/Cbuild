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
    : if_eq_kw ws? condition NL recipes_opt  ENDIF comment_opt
    | if_eq_kw ws? condition  NL recipes_opt  ELSE NL recipes_opt  ENDIF comment_opt
    | if_eq_kw ws? condition  NL recipes_opt  ELSE NL conditional_in_recipe
    | if_def_kw ws? identifier NL recipes_opt  ENDIF comment_opt
    | if_def_kw ws? identifier NL recipes_opt  ELSE NL recipes_opt  ENDIF comment_opt
    | if_def_kw ws? identifier NL recipes_opt  ELSE NL conditional_in_recipe
    ;

statements_opt
    : comment_opt br statements?
    ;

statement
    : ws? COMMENT
    | ws? conditional
    | ws? define
    | ws? include
    | ws? export br
    | ws? vpath
    | ws? assignment br
    | ws? function br
    | ws? rule
    | ws? ysharp_hook
    ;

define
    : specifiers? DEFINE ws pattern ws? ASSIGN_OP? ws? definition ENDEF br
    ;

definition
    : comment_opt br
    | comment_opt br exprs_in_def br
    ;

include
    : include_kw expressions br
    ;

export
    : EXPORT
    | UNEXPORT
    | assignment_prefix (ws targets)?
    ;

vpath
    : VPATH vpath_args? comment_opt br
    ;

vpath_args
    : ws pattern (ws expressions)?
    ;

assignment
    : pattern ws? ASSIGN_OP exprs_in_assign? comment_opt
    | assignment_prefix ws? ASSIGN_OP exprs_in_assign? comment_opt
    ;

assignment_prefix: specifiers ws pattern;


if_eq_kw
    : IFEQ
    | IFNEQ
    ;

if_def_kw
    : IFDEF
    | IFNDEF
    ;

include_kw
    : INCLUDE
    | DASH_INCLUDE
    | SINCLUDE
    ;

condition
    : LPAREN expressions_opt  COMMA expressions_opt RPAREN
    | SLIT ws? SLIT
    ;

expressions_opt
    : expressions?
    ;

expressions
    : ws? expression ws? (ws expression)* ws?
    ;

exprs_nested
    : ws? expr_nested ws? (ws expr_nested)* ws?
    ;

exprs_in_assign
    : ws? expr_in_assign ws? (ws expr_in_assign)* ws?
    ;

exprs_in_recipe
    : ws? expr_in_recipe ws? (ws expr_in_recipe)* ws?
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

	| DOLLAR_L_CURLY_BRACE function_name R_CURLY_BRACE
	| DOLLAR_L_CURLY_BRACE function_name ws arguments R_CURLY_BRACE
	| DOLLAR_L_CURLY_BRACE function_name COMMA arguments R_CURLY_BRACE
	| DOLLAR_L_CURLY_BRACE function_name COLON expressions R_CURLY_BRACE
	| DOLLAR_L_CURLY_BRACE function_name ASSIGN_OP expressions R_CURLY_BRACE
	;

function_name
    : function_name_atom+
    ;

function_name_atom
    : CHARS
    | function
    ;

arguments
    : argument? (COMMA argument?)*
    ;

argument
    : expressions
    ;

rule
    : static_pattern_rule
    | targets ws? colon ws? prerequisites ( ws? PIPE ws? orderonlyprerequisites)? ws? NL recipes?
    | targets ws? colon ws? assignment ws? NL
    ;

static_pattern_rule
    : targets ws? colon ws? pattern ws? colon ws? prerequisites (ws? PIPE ws? orderonlyprerequisites)? ws? NL recipes?
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

orderonlyprerequisites
    : targets?
    ;

targets
    : target (ws target)*
    ;

recipes
    : recipe+
    ;

recipes_opt
    : comment_opt recipes?
    ;

recipe
    : LEADING_TAB ws? exprs_in_recipe NL
    | LEADING_TAB ws? COMMENT NL
    | ws? COMMENT NL
    | conditional_in_recipe
    | NL
    ;

specifiers
    : OVERRIDE
    | EXPORT
    | UNEXPORT
    | OVERRIDE ws EXPORT
    | EXPORT ws OVERRIDE
    | UNDEFINE
    | OVERRIDE ws UNDEFINE
    | UNDEFINE ws OVERRIDE
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
    | DOUBLE_DOLLAR
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

char_in_recipe: char_in_assign  | DOUBLE_DOLLAR | COMMENT | PIPE;

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
    | VPATH
    ;

colon
    : COLON
    | DOUBLE_COLON
    | GROUPED_COLON
    | GROUPED_DOUBLE_COLON
    ;

comment_opt: COMMENT?;

ws
    : WS
    | TAB
    ;

ysharp_hook : 'ysharp' ws? '{' ysharp_program '}' ws? ;

ysharp_program : .*? ;

ASSIGN_OP
    : ':::='
    | '::='
    | ':='
    | '?='
    | '+='
    | '!='
    | '='
    ;

DOLLAR_LPAREN: '$(';
DOLLAR_L_CURLY_BRACE: '${';

VAR
    : '$' [a-zA-Z0-9_@%<?^+*]
    ;

DOUBLE_DOLLAR
    : '$$'
    ;

GROUPED_DOUBLE_COLON : '&::';
GROUPED_COLON        : '&:';
DOUBLE_COLON         : '::';
COLON                : ':';
LPAREN : '(';
RPAREN : ')';
L_CURLY_BRACE: '{';
R_CURLY_BRACE: '}';
COMMA  : ',';
PIPE: '|';

INCLUDE  : 'include';
DASH_INCLUDE  : '-include';
SINCLUDE      : 'sinclude';
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
VPATH : 'vpath';

SLIT
    : '"'  ( '\\' . | ~["\\\r\n] )* '"'
    | '\'' ( '\\' . | ~['\\\r\n] )* '\''
    ;

CHARS
    : ~[ \t\r\n$(){}:,=#|]+
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


