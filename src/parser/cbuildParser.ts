
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { cbuildListener } from "./cbuildListener.js";
import { cbuildVisitor } from "./cbuildVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class cbuildParser extends antlr.Parser {
    public static readonly ASSIGN_OP = 1;
    public static readonly DOLLAR_LPAREN = 2;
    public static readonly DOLLAR_L_CURLY_BRACE = 3;
    public static readonly VAR = 4;
    public static readonly DOUBLE_DOLLAR = 5;
    public static readonly GROUPED_DOUBLE_COLON = 6;
    public static readonly GROUPED_COLON = 7;
    public static readonly DOUBLE_COLON = 8;
    public static readonly COLON = 9;
    public static readonly LPAREN = 10;
    public static readonly RPAREN = 11;
    public static readonly L_CURLY_BRACE = 12;
    public static readonly R_CURLY_BRACE = 13;
    public static readonly COMMA = 14;
    public static readonly PIPE = 15;
    public static readonly INCLUDE = 16;
    public static readonly DASH_INCLUDE = 17;
    public static readonly SINCLUDE = 18;
    public static readonly ENDEF = 19;
    public static readonly IFDEF = 20;
    public static readonly IFNDEF = 21;
    public static readonly IFEQ = 22;
    public static readonly IFNEQ = 23;
    public static readonly ELSE = 24;
    public static readonly ENDIF = 25;
    public static readonly OVERRIDE = 26;
    public static readonly EXPORT = 27;
    public static readonly UNEXPORT = 28;
    public static readonly UNDEFINE = 29;
    public static readonly DEFINE = 30;
    public static readonly VPATH = 31;
    public static readonly ESCAPED_QUOTE = 32;
    public static readonly SLIT = 33;
    public static readonly HOOK = 34;
    public static readonly BACKSLASH = 35;
    public static readonly CHARS = 36;
    public static readonly NL = 37;
    public static readonly LEADING_TAB = 38;
    public static readonly WS = 39;
    public static readonly TAB = 40;
    public static readonly COMMENT = 41;
    public static readonly RULE_cbuildfile = 0;
    public static readonly RULE_statements = 1;
    public static readonly RULE_conditional = 2;
    public static readonly RULE_conditional_in_recipe = 3;
    public static readonly RULE_statements_opt = 4;
    public static readonly RULE_statement = 5;
    public static readonly RULE_define = 6;
    public static readonly RULE_define_body = 7;
    public static readonly RULE_definition = 8;
    public static readonly RULE_include = 9;
    public static readonly RULE_export = 10;
    public static readonly RULE_vpath = 11;
    public static readonly RULE_vpath_args = 12;
    public static readonly RULE_assignment = 13;
    public static readonly RULE_assignment_prefix = 14;
    public static readonly RULE_if_eq_kw = 15;
    public static readonly RULE_if_def_kw = 16;
    public static readonly RULE_include_kw = 17;
    public static readonly RULE_condition = 18;
    public static readonly RULE_expressions_opt = 19;
    public static readonly RULE_expressions = 20;
    public static readonly RULE_exprs_nested = 21;
    public static readonly RULE_exprs_in_assign = 22;
    public static readonly RULE_exprs_in_recipe = 23;
    public static readonly RULE_exprs_in_def = 24;
    public static readonly RULE_first_expr_in_def = 25;
    public static readonly RULE_expression = 26;
    public static readonly RULE_expression_atom = 27;
    public static readonly RULE_expr_nested = 28;
    public static readonly RULE_expr_nested_atom = 29;
    public static readonly RULE_expr_in_assign = 30;
    public static readonly RULE_expr_in_assign_atom = 31;
    public static readonly RULE_expr_in_recipe = 32;
    public static readonly RULE_expr_in_recipe_atom = 33;
    public static readonly RULE_function = 34;
    public static readonly RULE_function_name = 35;
    public static readonly RULE_function_name_atom = 36;
    public static readonly RULE_arguments = 37;
    public static readonly RULE_argument = 38;
    public static readonly RULE_rule = 39;
    public static readonly RULE_static_pattern_rule = 40;
    public static readonly RULE_target = 41;
    public static readonly RULE_pattern = 42;
    public static readonly RULE_prerequisites = 43;
    public static readonly RULE_orderonlyprerequisites = 44;
    public static readonly RULE_targets = 45;
    public static readonly RULE_recipes = 46;
    public static readonly RULE_recipes_opt = 47;
    public static readonly RULE_recipe = 48;
    public static readonly RULE_specifiers = 49;
    public static readonly RULE_identifier = 50;
    public static readonly RULE_identifier_atom = 51;
    public static readonly RULE_br = 52;
    public static readonly RULE_char = 53;
    public static readonly RULE_char_nested = 54;
    public static readonly RULE_char_in_assign = 55;
    public static readonly RULE_char_in_def = 56;
    public static readonly RULE_char_in_recipe = 57;
    public static readonly RULE_text = 58;
    public static readonly RULE_text_nested = 59;
    public static readonly RULE_text_in_assign = 60;
    public static readonly RULE_text_in_recipe = 61;
    public static readonly RULE_keywords = 62;
    public static readonly RULE_colon = 63;
    public static readonly RULE_comment_opt = 64;
    public static readonly RULE_ws = 65;
    public static readonly RULE_hook = 66;
    public static readonly RULE_hook_program = 67;

    public static readonly literalNames = [
        null, null, "'$('", "'${'", null, "'$$'", "'&::'", "'&:'", "'::'", 
        "':'", "'('", "')'", "'{'", "'}'", "','", "'|'", "'include'", "'-include'", 
        "'sinclude'", "'endef'", "'ifdef'", "'ifndef'", "'ifeq'", "'ifneq'", 
        "'else'", "'endif'", "'override'", "'export'", "'unexport'", "'undefine'", 
        "'define'", "'vpath'", null, null, "'hook'", "'\\'", null, null, 
        null, null, "'\\t'"
    ];

    public static readonly symbolicNames = [
        null, "ASSIGN_OP", "DOLLAR_LPAREN", "DOLLAR_L_CURLY_BRACE", "VAR", 
        "DOUBLE_DOLLAR", "GROUPED_DOUBLE_COLON", "GROUPED_COLON", "DOUBLE_COLON", 
        "COLON", "LPAREN", "RPAREN", "L_CURLY_BRACE", "R_CURLY_BRACE", "COMMA", 
        "PIPE", "INCLUDE", "DASH_INCLUDE", "SINCLUDE", "ENDEF", "IFDEF", 
        "IFNDEF", "IFEQ", "IFNEQ", "ELSE", "ENDIF", "OVERRIDE", "EXPORT", 
        "UNEXPORT", "UNDEFINE", "DEFINE", "VPATH", "ESCAPED_QUOTE", "SLIT", 
        "HOOK", "BACKSLASH", "CHARS", "NL", "LEADING_TAB", "WS", "TAB", 
        "COMMENT"
    ];
    public static readonly ruleNames = [
        "cbuildfile", "statements", "conditional", "conditional_in_recipe", 
        "statements_opt", "statement", "define", "define_body", "definition", 
        "include", "export", "vpath", "vpath_args", "assignment", "assignment_prefix", 
        "if_eq_kw", "if_def_kw", "include_kw", "condition", "expressions_opt", 
        "expressions", "exprs_nested", "exprs_in_assign", "exprs_in_recipe", 
        "exprs_in_def", "first_expr_in_def", "expression", "expression_atom", 
        "expr_nested", "expr_nested_atom", "expr_in_assign", "expr_in_assign_atom", 
        "expr_in_recipe", "expr_in_recipe_atom", "function", "function_name", 
        "function_name_atom", "arguments", "argument", "rule", "static_pattern_rule", 
        "target", "pattern", "prerequisites", "orderonlyprerequisites", 
        "targets", "recipes", "recipes_opt", "recipe", "specifiers", "identifier", 
        "identifier_atom", "br", "char", "char_nested", "char_in_assign", 
        "char_in_def", "char_in_recipe", "text", "text_nested", "text_in_assign", 
        "text_in_recipe", "keywords", "colon", "comment_opt", "ws", "hook", 
        "hook_program",
    ];

    public get grammarFileName(): string { return "cbuild.g4"; }
    public get literalNames(): (string | null)[] { return cbuildParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return cbuildParser.symbolicNames; }
    public get ruleNames(): string[] { return cbuildParser.ruleNames; }
    public get serializedATN(): number[] { return cbuildParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, cbuildParser._ATN, cbuildParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public cbuildfile(): CbuildfileContext {
        let localContext = new CbuildfileContext(this.context, this.state);
        this.enterRule(localContext, 0, cbuildParser.RULE_cbuildfile);
        try {
            this.state = 140;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 136;
                this.statements();
                this.state = 137;
                this.match(cbuildParser.EOF);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 139;
                this.match(cbuildParser.EOF);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statements(): StatementsContext {
        let localContext = new StatementsContext(this.context, this.state);
        this.enterRule(localContext, 2, cbuildParser.RULE_statements);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 147;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 145;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
                    case 1:
                        {
                        this.state = 142;
                        this.statement();
                        }
                        break;
                    case 2:
                        {
                        this.state = 143;
                        this.br();
                        }
                        break;
                    case 3:
                        {
                        this.state = 144;
                        this.ws();
                        }
                        break;
                    }
                    }
                }
                this.state = 149;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conditional(): ConditionalContext {
        let localContext = new ConditionalContext(this.context, this.state);
        this.enterRule(localContext, 4, cbuildParser.RULE_conditional);
        let _la: number;
        try {
            this.state = 272;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 150;
                this.if_eq_kw();
                this.state = 152;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 151;
                    this.ws();
                    }
                }

                this.state = 154;
                this.condition();
                this.state = 156;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 155;
                    this.ws();
                    }
                }

                this.state = 158;
                this.statements_opt();
                this.state = 160;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 159;
                    this.ws();
                    }
                }

                this.state = 162;
                this.match(cbuildParser.ENDIF);
                this.state = 164;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 163;
                    this.ws();
                    }
                }

                this.state = 166;
                this.comment_opt();
                this.state = 167;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 169;
                this.if_eq_kw();
                this.state = 171;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 170;
                    this.ws();
                    }
                }

                this.state = 173;
                this.condition();
                this.state = 175;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 174;
                    this.ws();
                    }
                }

                this.state = 177;
                this.statements_opt();
                this.state = 179;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 178;
                    this.ws();
                    }
                }

                this.state = 181;
                this.match(cbuildParser.ELSE);
                this.state = 183;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 182;
                    this.ws();
                    }
                }

                this.state = 185;
                this.statements_opt();
                this.state = 187;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 186;
                    this.ws();
                    }
                }

                this.state = 189;
                this.match(cbuildParser.ENDIF);
                this.state = 190;
                this.comment_opt();
                this.state = 191;
                this.br();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 193;
                this.if_eq_kw();
                this.state = 195;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 194;
                    this.ws();
                    }
                }

                this.state = 197;
                this.condition();
                this.state = 199;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 198;
                    this.ws();
                    }
                }

                this.state = 201;
                this.statements_opt();
                this.state = 203;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 202;
                    this.ws();
                    }
                }

                this.state = 205;
                this.match(cbuildParser.ELSE);
                this.state = 207;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 206;
                    this.ws();
                    }
                }

                this.state = 209;
                this.conditional();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 211;
                this.if_def_kw();
                this.state = 213;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 212;
                    this.ws();
                    }
                }

                this.state = 215;
                this.pattern();
                this.state = 217;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 216;
                    this.ws();
                    }
                }

                this.state = 219;
                this.statements_opt();
                this.state = 221;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 220;
                    this.ws();
                    }
                }

                this.state = 223;
                this.match(cbuildParser.ENDIF);
                this.state = 225;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 224;
                    this.ws();
                    }
                }

                this.state = 227;
                this.comment_opt();
                this.state = 228;
                this.br();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 230;
                this.if_def_kw();
                this.state = 232;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 231;
                    this.ws();
                    }
                }

                this.state = 234;
                this.pattern();
                this.state = 236;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 235;
                    this.ws();
                    }
                }

                this.state = 238;
                this.statements_opt();
                this.state = 240;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 239;
                    this.ws();
                    }
                }

                this.state = 242;
                this.match(cbuildParser.ELSE);
                this.state = 244;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 243;
                    this.ws();
                    }
                }

                this.state = 246;
                this.statements_opt();
                this.state = 248;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 247;
                    this.ws();
                    }
                }

                this.state = 250;
                this.match(cbuildParser.ENDIF);
                this.state = 251;
                this.comment_opt();
                this.state = 252;
                this.br();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 254;
                this.if_def_kw();
                this.state = 256;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 255;
                    this.ws();
                    }
                }

                this.state = 258;
                this.pattern();
                this.state = 260;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 259;
                    this.ws();
                    }
                }

                this.state = 262;
                this.statements_opt();
                this.state = 264;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 263;
                    this.ws();
                    }
                }

                this.state = 266;
                this.match(cbuildParser.ELSE);
                this.state = 268;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 267;
                    this.ws();
                    }
                }

                this.state = 270;
                this.conditional();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conditional_in_recipe(): Conditional_in_recipeContext {
        let localContext = new Conditional_in_recipeContext(this.context, this.state);
        this.enterRule(localContext, 6, cbuildParser.RULE_conditional_in_recipe);
        let _la: number;
        try {
            this.state = 342;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 274;
                this.if_eq_kw();
                this.state = 276;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 275;
                    this.ws();
                    }
                }

                this.state = 278;
                this.condition();
                this.state = 279;
                this.match(cbuildParser.NL);
                this.state = 280;
                this.recipes_opt();
                this.state = 281;
                this.match(cbuildParser.ENDIF);
                this.state = 282;
                this.comment_opt();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 284;
                this.if_eq_kw();
                this.state = 286;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 285;
                    this.ws();
                    }
                }

                this.state = 288;
                this.condition();
                this.state = 289;
                this.match(cbuildParser.NL);
                this.state = 290;
                this.recipes_opt();
                this.state = 291;
                this.match(cbuildParser.ELSE);
                this.state = 292;
                this.match(cbuildParser.NL);
                this.state = 293;
                this.recipes_opt();
                this.state = 294;
                this.match(cbuildParser.ENDIF);
                this.state = 295;
                this.comment_opt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 297;
                this.if_eq_kw();
                this.state = 299;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 298;
                    this.ws();
                    }
                }

                this.state = 301;
                this.condition();
                this.state = 302;
                this.match(cbuildParser.NL);
                this.state = 303;
                this.recipes_opt();
                this.state = 304;
                this.match(cbuildParser.ELSE);
                this.state = 305;
                this.match(cbuildParser.NL);
                this.state = 306;
                this.conditional_in_recipe();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 308;
                this.if_def_kw();
                this.state = 310;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 309;
                    this.ws();
                    }
                }

                this.state = 312;
                this.pattern();
                this.state = 313;
                this.match(cbuildParser.NL);
                this.state = 314;
                this.recipes_opt();
                this.state = 315;
                this.match(cbuildParser.ENDIF);
                this.state = 316;
                this.comment_opt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 318;
                this.if_def_kw();
                this.state = 320;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 319;
                    this.ws();
                    }
                }

                this.state = 322;
                this.pattern();
                this.state = 323;
                this.match(cbuildParser.NL);
                this.state = 324;
                this.recipes_opt();
                this.state = 325;
                this.match(cbuildParser.ELSE);
                this.state = 326;
                this.match(cbuildParser.NL);
                this.state = 327;
                this.recipes_opt();
                this.state = 328;
                this.match(cbuildParser.ENDIF);
                this.state = 329;
                this.comment_opt();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 331;
                this.if_def_kw();
                this.state = 333;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 332;
                    this.ws();
                    }
                }

                this.state = 335;
                this.pattern();
                this.state = 336;
                this.match(cbuildParser.NL);
                this.state = 337;
                this.recipes_opt();
                this.state = 338;
                this.match(cbuildParser.ELSE);
                this.state = 339;
                this.match(cbuildParser.NL);
                this.state = 340;
                this.conditional_in_recipe();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statements_opt(): Statements_optContext {
        let localContext = new Statements_optContext(this.context, this.state);
        this.enterRule(localContext, 8, cbuildParser.RULE_statements_opt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 344;
            this.comment_opt();
            this.state = 345;
            this.br();
            this.state = 346;
            this.statements();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public statement(): StatementContext {
        let localContext = new StatementContext(this.context, this.state);
        this.enterRule(localContext, 10, cbuildParser.RULE_statement);
        let _la: number;
        try {
            this.state = 394;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 349;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 348;
                    this.ws();
                    }
                }

                this.state = 351;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 353;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 352;
                    this.ws();
                    }
                }

                this.state = 355;
                this.conditional();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 357;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 356;
                    this.ws();
                    }
                }

                this.state = 359;
                this.define();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 361;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 360;
                    this.ws();
                    }
                }

                this.state = 363;
                this.include();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 365;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 364;
                    this.ws();
                    }
                }

                this.state = 367;
                this.export_();
                this.state = 368;
                this.br();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 371;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 370;
                    this.ws();
                    }
                }

                this.state = 373;
                this.vpath();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 375;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 374;
                    this.ws();
                    }
                }

                this.state = 377;
                this.assignment();
                this.state = 378;
                this.br();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 381;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 380;
                    this.ws();
                    }
                }

                this.state = 383;
                this.function_();
                this.state = 384;
                this.br();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 387;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 386;
                    this.ws();
                    }
                }

                this.state = 389;
                this.rule();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 391;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 390;
                    this.ws();
                    }
                }

                this.state = 393;
                this.hook();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public define(): DefineContext {
        let localContext = new DefineContext(this.context, this.state);
        this.enterRule(localContext, 12, cbuildParser.RULE_define);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 397;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1006632960) !== 0)) {
                {
                this.state = 396;
                this.specifiers();
                }
            }

            this.state = 399;
            this.match(cbuildParser.DEFINE);
            this.state = 400;
            this.ws();
            this.state = 401;
            this.pattern();
            this.state = 403;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
            case 1:
                {
                this.state = 402;
                this.ws();
                }
                break;
            }
            this.state = 406;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 405;
                this.match(cbuildParser.ASSIGN_OP);
                }
            }

            this.state = 409;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 408;
                this.ws();
                }
            }

            this.state = 411;
            this.define_body();
            this.state = 412;
            this.match(cbuildParser.ENDEF);
            this.state = 413;
            this.br();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public define_body(): Define_bodyContext {
        let localContext = new Define_bodyContext(this.context, this.state);
        this.enterRule(localContext, 14, cbuildParser.RULE_define_body);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 419;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 26)) & ~0x1F) === 0 && ((1 << (_la - 26)) & 34847) !== 0)) {
                {
                this.state = 417;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case cbuildParser.OVERRIDE:
                case cbuildParser.EXPORT:
                case cbuildParser.UNEXPORT:
                case cbuildParser.UNDEFINE:
                case cbuildParser.DEFINE:
                    {
                    this.state = 415;
                    this.define();
                    }
                    break;
                case cbuildParser.NL:
                case cbuildParser.COMMENT:
                    {
                    this.state = 416;
                    this.definition();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 421;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public definition(): DefinitionContext {
        let localContext = new DefinitionContext(this.context, this.state);
        this.enterRule(localContext, 16, cbuildParser.RULE_definition);
        try {
            this.state = 430;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 422;
                this.comment_opt();
                this.state = 423;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 425;
                this.comment_opt();
                this.state = 426;
                this.br();
                this.state = 427;
                this.exprs_in_def();
                this.state = 428;
                this.br();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public include(): IncludeContext {
        let localContext = new IncludeContext(this.context, this.state);
        this.enterRule(localContext, 18, cbuildParser.RULE_include);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 432;
            this.include_kw();
            this.state = 433;
            this.expressions();
            this.state = 434;
            this.br();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public export_(): ExportContext {
        let localContext = new ExportContext(this.context, this.state);
        this.enterRule(localContext, 20, cbuildParser.RULE_export);
        let _la: number;
        try {
            this.state = 444;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 56, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 436;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 437;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 438;
                this.assignment_prefix();
                this.state = 442;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 439;
                    this.ws();
                    this.state = 440;
                    this.targets();
                    }
                }

                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public vpath(): VpathContext {
        let localContext = new VpathContext(this.context, this.state);
        this.enterRule(localContext, 22, cbuildParser.RULE_vpath);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 446;
            this.match(cbuildParser.VPATH);
            this.state = 448;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 447;
                this.vpath_args();
                }
            }

            this.state = 450;
            this.comment_opt();
            this.state = 451;
            this.br();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public vpath_args(): Vpath_argsContext {
        let localContext = new Vpath_argsContext(this.context, this.state);
        this.enterRule(localContext, 24, cbuildParser.RULE_vpath_args);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 453;
            this.ws();
            this.state = 454;
            this.pattern();
            this.state = 458;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 455;
                this.ws();
                this.state = 456;
                this.expressions();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assignment(): AssignmentContext {
        let localContext = new AssignmentContext(this.context, this.state);
        this.enterRule(localContext, 26, cbuildParser.RULE_assignment);
        let _la: number;
        try {
            this.state = 480;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 63, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 460;
                this.pattern();
                this.state = 462;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 461;
                    this.ws();
                    }
                }

                this.state = 464;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 466;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 60, this.context) ) {
                case 1:
                    {
                    this.state = 465;
                    this.exprs_in_assign();
                    }
                    break;
                }
                this.state = 468;
                this.comment_opt();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 470;
                this.assignment_prefix();
                this.state = 472;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 471;
                    this.ws();
                    }
                }

                this.state = 474;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 476;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 62, this.context) ) {
                case 1:
                    {
                    this.state = 475;
                    this.exprs_in_assign();
                    }
                    break;
                }
                this.state = 478;
                this.comment_opt();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public assignment_prefix(): Assignment_prefixContext {
        let localContext = new Assignment_prefixContext(this.context, this.state);
        this.enterRule(localContext, 28, cbuildParser.RULE_assignment_prefix);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 482;
            this.specifiers();
            this.state = 483;
            this.ws();
            this.state = 484;
            this.pattern();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public if_eq_kw(): If_eq_kwContext {
        let localContext = new If_eq_kwContext(this.context, this.state);
        this.enterRule(localContext, 30, cbuildParser.RULE_if_eq_kw);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 486;
            _la = this.tokenStream.LA(1);
            if(!(_la === 22 || _la === 23)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public if_def_kw(): If_def_kwContext {
        let localContext = new If_def_kwContext(this.context, this.state);
        this.enterRule(localContext, 32, cbuildParser.RULE_if_def_kw);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 488;
            _la = this.tokenStream.LA(1);
            if(!(_la === 20 || _la === 21)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public include_kw(): Include_kwContext {
        let localContext = new Include_kwContext(this.context, this.state);
        this.enterRule(localContext, 34, cbuildParser.RULE_include_kw);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 490;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 458752) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public condition(): ConditionContext {
        let localContext = new ConditionContext(this.context, this.state);
        this.enterRule(localContext, 36, cbuildParser.RULE_condition);
        let _la: number;
        try {
            this.state = 503;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 492;
                this.match(cbuildParser.LPAREN);
                this.state = 493;
                this.expressions_opt();
                this.state = 494;
                this.match(cbuildParser.COMMA);
                this.state = 495;
                this.expressions_opt();
                this.state = 496;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case cbuildParser.SLIT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 498;
                this.match(cbuildParser.SLIT);
                this.state = 500;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 499;
                    this.ws();
                    }
                }

                this.state = 502;
                this.match(cbuildParser.SLIT);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expressions_opt(): Expressions_optContext {
        let localContext = new Expressions_optContext(this.context, this.state);
        this.enterRule(localContext, 38, cbuildParser.RULE_expressions_opt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 506;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1598) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 411) !== 0)) {
                {
                this.state = 505;
                this.expressions();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expressions(): ExpressionsContext {
        let localContext = new ExpressionsContext(this.context, this.state);
        this.enterRule(localContext, 40, cbuildParser.RULE_expressions);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 509;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 508;
                this.ws();
                }
            }

            this.state = 511;
            this.expression();
            this.state = 513;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 68, this.context) ) {
            case 1:
                {
                this.state = 512;
                this.ws();
                }
                break;
            }
            this.state = 520;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 69, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 515;
                    this.ws();
                    this.state = 516;
                    this.expression();
                    }
                    }
                }
                this.state = 522;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 69, this.context);
            }
            this.state = 524;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 523;
                this.ws();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exprs_nested(): Exprs_nestedContext {
        let localContext = new Exprs_nestedContext(this.context, this.state);
        this.enterRule(localContext, 42, cbuildParser.RULE_exprs_nested);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 527;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 526;
                this.ws();
                }
            }

            this.state = 529;
            this.expr_nested();
            this.state = 531;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context) ) {
            case 1:
                {
                this.state = 530;
                this.ws();
                }
                break;
            }
            this.state = 538;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 533;
                    this.ws();
                    this.state = 534;
                    this.expr_nested();
                    }
                    }
                }
                this.state = 540;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
            }
            this.state = 542;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 541;
                this.ws();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exprs_in_assign(): Exprs_in_assignContext {
        let localContext = new Exprs_in_assignContext(this.context, this.state);
        this.enterRule(localContext, 44, cbuildParser.RULE_exprs_in_assign);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 545;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 544;
                this.ws();
                }
            }

            this.state = 547;
            this.expr_in_assign();
            this.state = 549;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context) ) {
            case 1:
                {
                this.state = 548;
                this.ws();
                }
                break;
            }
            this.state = 556;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 551;
                    this.ws();
                    this.state = 552;
                    this.expr_in_assign();
                    }
                    }
                }
                this.state = 558;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            }
            this.state = 560;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 78, this.context) ) {
            case 1:
                {
                this.state = 559;
                this.ws();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exprs_in_recipe(): Exprs_in_recipeContext {
        let localContext = new Exprs_in_recipeContext(this.context, this.state);
        this.enterRule(localContext, 46, cbuildParser.RULE_exprs_in_recipe);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 563;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 562;
                this.ws();
                }
            }

            this.state = 565;
            this.expr_in_recipe();
            this.state = 567;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context) ) {
            case 1:
                {
                this.state = 566;
                this.ws();
                }
                break;
            }
            this.state = 574;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 569;
                    this.ws();
                    this.state = 570;
                    this.expr_in_recipe();
                    }
                    }
                }
                this.state = 576;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
            }
            this.state = 578;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 577;
                this.ws();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public exprs_in_def(): Exprs_in_defContext {
        let localContext = new Exprs_in_defContext(this.context, this.state);
        this.enterRule(localContext, 48, cbuildParser.RULE_exprs_in_def);
        let _la: number;
        try {
            let alternative: number;
            this.state = 597;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 86, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 580;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 582;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37) {
                    {
                    this.state = 581;
                    this.br();
                    }
                }

                this.state = 584;
                this.first_expr_in_def();
                this.state = 594;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        this.state = 592;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
                        case 1:
                            {
                            {
                            this.state = 585;
                            this.br();
                            this.state = 586;
                            this.first_expr_in_def();
                            }
                            }
                            break;
                        case 2:
                            {
                            {
                            this.state = 588;
                            this.br();
                            }
                            }
                            break;
                        case 3:
                            {
                            {
                            this.state = 589;
                            this.ws();
                            this.state = 590;
                            this.expr_in_recipe();
                            }
                            }
                            break;
                        }
                        }
                    }
                    this.state = 596;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
                }
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public first_expr_in_def(): First_expr_in_defContext {
        let localContext = new First_expr_in_defContext(this.context, this.state);
        this.enterRule(localContext, 50, cbuildParser.RULE_first_expr_in_def);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 601;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.LPAREN:
            case cbuildParser.RPAREN:
            case cbuildParser.L_CURLY_BRACE:
            case cbuildParser.R_CURLY_BRACE:
            case cbuildParser.COMMA:
            case cbuildParser.INCLUDE:
            case cbuildParser.IFDEF:
            case cbuildParser.IFNDEF:
            case cbuildParser.IFEQ:
            case cbuildParser.IFNEQ:
            case cbuildParser.ELSE:
            case cbuildParser.ENDIF:
            case cbuildParser.OVERRIDE:
            case cbuildParser.EXPORT:
            case cbuildParser.UNEXPORT:
            case cbuildParser.UNDEFINE:
            case cbuildParser.DEFINE:
            case cbuildParser.ESCAPED_QUOTE:
            case cbuildParser.SLIT:
            case cbuildParser.BACKSLASH:
            case cbuildParser.CHARS:
            case cbuildParser.COMMENT:
                {
                this.state = 599;
                this.char_in_def();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                {
                this.state = 600;
                this.function_();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 604;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294573630) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 539) !== 0)) {
                {
                this.state = 603;
                this.expr_in_recipe();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression(): ExpressionContext {
        let localContext = new ExpressionContext(this.context, this.state);
        this.enterRule(localContext, 52, cbuildParser.RULE_expression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 607;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 606;
                this.expression_atom();
                }
                }
                this.state = 609;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1598) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 27) !== 0));
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expression_atom(): Expression_atomContext {
        let localContext = new Expression_atomContext(this.context, this.state);
        this.enterRule(localContext, 54, cbuildParser.RULE_expression_atom);
        try {
            this.state = 617;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.ESCAPED_QUOTE:
            case cbuildParser.SLIT:
            case cbuildParser.BACKSLASH:
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 611;
                this.text();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 612;
                this.function_();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 613;
                this.match(cbuildParser.LPAREN);
                this.state = 614;
                this.exprs_nested();
                this.state = 615;
                this.match(cbuildParser.RPAREN);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr_nested(): Expr_nestedContext {
        let localContext = new Expr_nestedContext(this.context, this.state);
        this.enterRule(localContext, 56, cbuildParser.RULE_expr_nested);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 620;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 619;
                this.expr_nested_atom();
                }
                }
                this.state = 622;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 17982) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 27) !== 0));
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr_nested_atom(): Expr_nested_atomContext {
        let localContext = new Expr_nested_atomContext(this.context, this.state);
        this.enterRule(localContext, 58, cbuildParser.RULE_expr_nested_atom);
        try {
            this.state = 630;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.COMMA:
            case cbuildParser.ESCAPED_QUOTE:
            case cbuildParser.SLIT:
            case cbuildParser.BACKSLASH:
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 624;
                this.text_nested();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 625;
                this.function_();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 626;
                this.match(cbuildParser.LPAREN);
                this.state = 627;
                this.exprs_nested();
                this.state = 628;
                this.match(cbuildParser.RPAREN);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr_in_assign(): Expr_in_assignContext {
        let localContext = new Expr_in_assignContext(this.context, this.state);
        this.enterRule(localContext, 60, cbuildParser.RULE_expr_in_assign);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 633;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 632;
                this.expr_in_assign_atom();
                }
                }
                this.state = 635;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294540862) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 27) !== 0));
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr_in_assign_atom(): Expr_in_assign_atomContext {
        let localContext = new Expr_in_assign_atomContext(this.context, this.state);
        this.enterRule(localContext, 62, cbuildParser.RULE_expr_in_assign_atom);
        try {
            this.state = 639;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.LPAREN:
            case cbuildParser.RPAREN:
            case cbuildParser.L_CURLY_BRACE:
            case cbuildParser.R_CURLY_BRACE:
            case cbuildParser.COMMA:
            case cbuildParser.INCLUDE:
            case cbuildParser.ENDEF:
            case cbuildParser.IFDEF:
            case cbuildParser.IFNDEF:
            case cbuildParser.IFEQ:
            case cbuildParser.IFNEQ:
            case cbuildParser.ELSE:
            case cbuildParser.ENDIF:
            case cbuildParser.OVERRIDE:
            case cbuildParser.EXPORT:
            case cbuildParser.UNEXPORT:
            case cbuildParser.UNDEFINE:
            case cbuildParser.DEFINE:
            case cbuildParser.VPATH:
            case cbuildParser.ESCAPED_QUOTE:
            case cbuildParser.SLIT:
            case cbuildParser.BACKSLASH:
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 637;
                this.text_in_assign();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 638;
                this.function_();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr_in_recipe(): Expr_in_recipeContext {
        let localContext = new Expr_in_recipeContext(this.context, this.state);
        this.enterRule(localContext, 64, cbuildParser.RULE_expr_in_recipe);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 642;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 641;
                this.expr_in_recipe_atom();
                }
                }
                this.state = 644;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294573630) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 539) !== 0));
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public expr_in_recipe_atom(): Expr_in_recipe_atomContext {
        let localContext = new Expr_in_recipe_atomContext(this.context, this.state);
        this.enterRule(localContext, 66, cbuildParser.RULE_expr_in_recipe_atom);
        try {
            this.state = 648;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.LPAREN:
            case cbuildParser.RPAREN:
            case cbuildParser.L_CURLY_BRACE:
            case cbuildParser.R_CURLY_BRACE:
            case cbuildParser.COMMA:
            case cbuildParser.PIPE:
            case cbuildParser.INCLUDE:
            case cbuildParser.ENDEF:
            case cbuildParser.IFDEF:
            case cbuildParser.IFNDEF:
            case cbuildParser.IFEQ:
            case cbuildParser.IFNEQ:
            case cbuildParser.ELSE:
            case cbuildParser.ENDIF:
            case cbuildParser.OVERRIDE:
            case cbuildParser.EXPORT:
            case cbuildParser.UNEXPORT:
            case cbuildParser.UNDEFINE:
            case cbuildParser.DEFINE:
            case cbuildParser.VPATH:
            case cbuildParser.ESCAPED_QUOTE:
            case cbuildParser.SLIT:
            case cbuildParser.BACKSLASH:
            case cbuildParser.CHARS:
            case cbuildParser.COMMENT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 646;
                this.text_in_recipe();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 647;
                this.function_();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_(): FunctionContext {
        let localContext = new FunctionContext(this.context, this.state);
        this.enterRule(localContext, 68, cbuildParser.RULE_function);
        try {
            this.state = 707;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 97, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 650;
                this.match(cbuildParser.VAR);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 651;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 652;
                this.function_name();
                this.state = 653;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 655;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 656;
                this.function_name();
                this.state = 657;
                this.ws();
                this.state = 658;
                this.arguments();
                this.state = 659;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 661;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 662;
                this.function_name();
                this.state = 663;
                this.match(cbuildParser.COMMA);
                this.state = 664;
                this.arguments();
                this.state = 665;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 667;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 668;
                this.function_name();
                this.state = 669;
                this.match(cbuildParser.COLON);
                this.state = 670;
                this.expressions();
                this.state = 671;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 673;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 674;
                this.function_name();
                this.state = 675;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 676;
                this.expressions();
                this.state = 677;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 679;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 680;
                this.function_name();
                this.state = 681;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 683;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 684;
                this.function_name();
                this.state = 685;
                this.ws();
                this.state = 686;
                this.arguments();
                this.state = 687;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 689;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 690;
                this.function_name();
                this.state = 691;
                this.match(cbuildParser.COMMA);
                this.state = 692;
                this.arguments();
                this.state = 693;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 695;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 696;
                this.function_name();
                this.state = 697;
                this.match(cbuildParser.COLON);
                this.state = 698;
                this.expressions();
                this.state = 699;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 701;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 702;
                this.function_name();
                this.state = 703;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 704;
                this.expressions();
                this.state = 705;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_name(): Function_nameContext {
        let localContext = new Function_nameContext(this.context, this.state);
        this.enterRule(localContext, 70, cbuildParser.RULE_function_name);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 710;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 709;
                this.function_name_atom();
                }
                }
                this.state = 712;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 28) !== 0) || _la === 36);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public function_name_atom(): Function_name_atomContext {
        let localContext = new Function_name_atomContext(this.context, this.state);
        this.enterRule(localContext, 72, cbuildParser.RULE_function_name_atom);
        try {
            this.state = 716;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 714;
                this.match(cbuildParser.CHARS);
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 715;
                this.function_();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public arguments(): ArgumentsContext {
        let localContext = new ArgumentsContext(this.context, this.state);
        this.enterRule(localContext, 74, cbuildParser.RULE_arguments);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 719;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1598) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 411) !== 0)) {
                {
                this.state = 718;
                this.argument();
                }
            }

            this.state = 727;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 14) {
                {
                {
                this.state = 721;
                this.match(cbuildParser.COMMA);
                this.state = 723;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1598) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 411) !== 0)) {
                    {
                    this.state = 722;
                    this.argument();
                    }
                }

                }
                }
                this.state = 729;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public argument(): ArgumentContext {
        let localContext = new ArgumentContext(this.context, this.state);
        this.enterRule(localContext, 76, cbuildParser.RULE_argument);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 730;
            this.expressions();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public rule(): RuleContext {
        let localContext = new RuleContext(this.context, this.state);
        this.enterRule(localContext, 78, cbuildParser.RULE_rule);
        let _la: number;
        try {
            this.state = 773;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 113, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 732;
                this.static_pattern_rule();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 733;
                this.targets();
                this.state = 735;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 734;
                    this.ws();
                    }
                }

                this.state = 737;
                this.colon();
                this.state = 739;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 104, this.context) ) {
                case 1:
                    {
                    this.state = 738;
                    this.ws();
                    }
                    break;
                }
                this.state = 741;
                this.prerequisites();
                this.state = 750;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 107, this.context) ) {
                case 1:
                    {
                    this.state = 743;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 39 || _la === 40) {
                        {
                        this.state = 742;
                        this.ws();
                        }
                    }

                    this.state = 745;
                    this.match(cbuildParser.PIPE);
                    this.state = 747;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 106, this.context) ) {
                    case 1:
                        {
                        this.state = 746;
                        this.ws();
                        }
                        break;
                    }
                    this.state = 749;
                    this.orderonlyprerequisites();
                    }
                    break;
                }
                this.state = 753;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 752;
                    this.ws();
                    }
                }

                this.state = 755;
                this.match(cbuildParser.NL);
                this.state = 757;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 109, this.context) ) {
                case 1:
                    {
                    this.state = 756;
                    this.recipes();
                    }
                    break;
                }
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 759;
                this.targets();
                this.state = 761;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 760;
                    this.ws();
                    }
                }

                this.state = 763;
                this.colon();
                this.state = 765;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 764;
                    this.ws();
                    }
                }

                this.state = 767;
                this.assignment();
                this.state = 769;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 768;
                    this.ws();
                    }
                }

                this.state = 771;
                this.match(cbuildParser.NL);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public static_pattern_rule(): Static_pattern_ruleContext {
        let localContext = new Static_pattern_ruleContext(this.context, this.state);
        this.enterRule(localContext, 80, cbuildParser.RULE_static_pattern_rule);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 775;
            this.targets();
            this.state = 777;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 776;
                this.ws();
                }
            }

            this.state = 779;
            this.colon();
            this.state = 781;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 780;
                this.ws();
                }
            }

            this.state = 783;
            this.pattern();
            this.state = 785;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 784;
                this.ws();
                }
            }

            this.state = 787;
            this.colon();
            this.state = 789;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 117, this.context) ) {
            case 1:
                {
                this.state = 788;
                this.ws();
                }
                break;
            }
            this.state = 791;
            this.prerequisites();
            this.state = 800;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 120, this.context) ) {
            case 1:
                {
                this.state = 793;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 792;
                    this.ws();
                    }
                }

                this.state = 795;
                this.match(cbuildParser.PIPE);
                this.state = 797;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 119, this.context) ) {
                case 1:
                    {
                    this.state = 796;
                    this.ws();
                    }
                    break;
                }
                this.state = 799;
                this.orderonlyprerequisites();
                }
                break;
            }
            this.state = 803;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 802;
                this.ws();
                }
            }

            this.state = 805;
            this.match(cbuildParser.NL);
            this.state = 807;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 122, this.context) ) {
            case 1:
                {
                this.state = 806;
                this.recipes();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public target(): TargetContext {
        let localContext = new TargetContext(this.context, this.state);
        this.enterRule(localContext, 82, cbuildParser.RULE_target);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 809;
            this.pattern();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public pattern(): PatternContext {
        let localContext = new PatternContext(this.context, this.state);
        this.enterRule(localContext, 84, cbuildParser.RULE_pattern);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 813;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    this.state = 813;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case cbuildParser.LPAREN:
                    case cbuildParser.RPAREN:
                    case cbuildParser.L_CURLY_BRACE:
                    case cbuildParser.R_CURLY_BRACE:
                    case cbuildParser.COMMA:
                    case cbuildParser.INCLUDE:
                    case cbuildParser.ENDEF:
                    case cbuildParser.IFDEF:
                    case cbuildParser.IFNDEF:
                    case cbuildParser.IFEQ:
                    case cbuildParser.IFNEQ:
                    case cbuildParser.ELSE:
                    case cbuildParser.ENDIF:
                    case cbuildParser.OVERRIDE:
                    case cbuildParser.EXPORT:
                    case cbuildParser.UNEXPORT:
                    case cbuildParser.UNDEFINE:
                    case cbuildParser.DEFINE:
                    case cbuildParser.VPATH:
                    case cbuildParser.CHARS:
                        {
                        this.state = 811;
                        this.identifier();
                        }
                        break;
                    case cbuildParser.DOLLAR_LPAREN:
                    case cbuildParser.DOLLAR_L_CURLY_BRACE:
                    case cbuildParser.VAR:
                        {
                        this.state = 812;
                        this.function_();
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 815;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 124, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public prerequisites(): PrerequisitesContext {
        let localContext = new PrerequisitesContext(this.context, this.state);
        this.enterRule(localContext, 86, cbuildParser.RULE_prerequisites);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 818;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294540316) !== 0) || _la === 36) {
                {
                this.state = 817;
                this.targets();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public orderonlyprerequisites(): OrderonlyprerequisitesContext {
        let localContext = new OrderonlyprerequisitesContext(this.context, this.state);
        this.enterRule(localContext, 88, cbuildParser.RULE_orderonlyprerequisites);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 821;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294540316) !== 0) || _la === 36) {
                {
                this.state = 820;
                this.targets();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public targets(): TargetsContext {
        let localContext = new TargetsContext(this.context, this.state);
        this.enterRule(localContext, 90, cbuildParser.RULE_targets);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 823;
            this.target();
            this.state = 829;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 127, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 824;
                    this.ws();
                    this.state = 825;
                    this.target();
                    }
                    }
                }
                this.state = 831;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 127, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public recipes(): RecipesContext {
        let localContext = new RecipesContext(this.context, this.state);
        this.enterRule(localContext, 92, cbuildParser.RULE_recipes);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 833;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 832;
                    this.recipe();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 835;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 128, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public recipes_opt(): Recipes_optContext {
        let localContext = new Recipes_optContext(this.context, this.state);
        this.enterRule(localContext, 94, cbuildParser.RULE_recipes_opt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 837;
            this.comment_opt();
            this.state = 839;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 20)) & ~0x1F) === 0 && ((1 << (_la - 20)) & 4063247) !== 0)) {
                {
                this.state = 838;
                this.recipes();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public recipe(): RecipeContext {
        let localContext = new RecipeContext(this.context, this.state);
        this.enterRule(localContext, 96, cbuildParser.RULE_recipe);
        let _la: number;
        try {
            this.state = 861;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 133, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 841;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 843;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 130, this.context) ) {
                case 1:
                    {
                    this.state = 842;
                    this.ws();
                    }
                    break;
                }
                this.state = 845;
                this.exprs_in_recipe();
                this.state = 846;
                this.match(cbuildParser.NL);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 848;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 850;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 849;
                    this.ws();
                    }
                }

                this.state = 852;
                this.match(cbuildParser.COMMENT);
                this.state = 853;
                this.match(cbuildParser.NL);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 855;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 854;
                    this.ws();
                    }
                }

                this.state = 857;
                this.match(cbuildParser.COMMENT);
                this.state = 858;
                this.match(cbuildParser.NL);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 859;
                this.conditional_in_recipe();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 860;
                this.match(cbuildParser.NL);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public specifiers(): SpecifiersContext {
        let localContext = new SpecifiersContext(this.context, this.state);
        this.enterRule(localContext, 98, cbuildParser.RULE_specifiers);
        try {
            this.state = 883;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 134, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 863;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 864;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 865;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 866;
                this.match(cbuildParser.OVERRIDE);
                this.state = 867;
                this.ws();
                this.state = 868;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 870;
                this.match(cbuildParser.EXPORT);
                this.state = 871;
                this.ws();
                this.state = 872;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 874;
                this.match(cbuildParser.UNDEFINE);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 875;
                this.match(cbuildParser.OVERRIDE);
                this.state = 876;
                this.ws();
                this.state = 877;
                this.match(cbuildParser.UNDEFINE);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 879;
                this.match(cbuildParser.UNDEFINE);
                this.state = 880;
                this.ws();
                this.state = 881;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public identifier(): IdentifierContext {
        let localContext = new IdentifierContext(this.context, this.state);
        this.enterRule(localContext, 100, cbuildParser.RULE_identifier);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 886;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 885;
                    this.identifier_atom();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 888;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 135, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public identifier_atom(): Identifier_atomContext {
        let localContext = new Identifier_atomContext(this.context, this.state);
        this.enterRule(localContext, 102, cbuildParser.RULE_identifier_atom);
        try {
            this.state = 897;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 890;
                this.match(cbuildParser.CHARS);
                }
                break;
            case cbuildParser.INCLUDE:
            case cbuildParser.ENDEF:
            case cbuildParser.IFDEF:
            case cbuildParser.IFNDEF:
            case cbuildParser.IFEQ:
            case cbuildParser.IFNEQ:
            case cbuildParser.ELSE:
            case cbuildParser.ENDIF:
            case cbuildParser.OVERRIDE:
            case cbuildParser.EXPORT:
            case cbuildParser.UNEXPORT:
            case cbuildParser.UNDEFINE:
            case cbuildParser.DEFINE:
            case cbuildParser.VPATH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 891;
                this.keywords();
                }
                break;
            case cbuildParser.COMMA:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 892;
                this.match(cbuildParser.COMMA);
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 893;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case cbuildParser.RPAREN:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 894;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case cbuildParser.L_CURLY_BRACE:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 895;
                this.match(cbuildParser.L_CURLY_BRACE);
                }
                break;
            case cbuildParser.R_CURLY_BRACE:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 896;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public br(): BrContext {
        let localContext = new BrContext(this.context, this.state);
        this.enterRule(localContext, 104, cbuildParser.RULE_br);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 899;
            this.match(cbuildParser.NL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public char(): CharContext {
        let localContext = new CharContext(this.context, this.state);
        this.enterRule(localContext, 106, cbuildParser.RULE_char);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 901;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 546) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 27) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public char_nested(): Char_nestedContext {
        let localContext = new Char_nestedContext(this.context, this.state);
        this.enterRule(localContext, 108, cbuildParser.RULE_char_nested);
        try {
            this.state = 905;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.ESCAPED_QUOTE:
            case cbuildParser.SLIT:
            case cbuildParser.BACKSLASH:
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 903;
                this.char();
                }
                break;
            case cbuildParser.COMMA:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 904;
                this.match(cbuildParser.COMMA);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public char_in_assign(): Char_in_assignContext {
        let localContext = new Char_in_assignContext(this.context, this.state);
        this.enterRule(localContext, 110, cbuildParser.RULE_char_in_assign);
        try {
            this.state = 913;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.COMMA:
            case cbuildParser.ESCAPED_QUOTE:
            case cbuildParser.SLIT:
            case cbuildParser.BACKSLASH:
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 907;
                this.char_nested();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 908;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case cbuildParser.RPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 909;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case cbuildParser.L_CURLY_BRACE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 910;
                this.match(cbuildParser.L_CURLY_BRACE);
                }
                break;
            case cbuildParser.R_CURLY_BRACE:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 911;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case cbuildParser.INCLUDE:
            case cbuildParser.ENDEF:
            case cbuildParser.IFDEF:
            case cbuildParser.IFNDEF:
            case cbuildParser.IFEQ:
            case cbuildParser.IFNEQ:
            case cbuildParser.ELSE:
            case cbuildParser.ENDIF:
            case cbuildParser.OVERRIDE:
            case cbuildParser.EXPORT:
            case cbuildParser.UNEXPORT:
            case cbuildParser.UNDEFINE:
            case cbuildParser.DEFINE:
            case cbuildParser.VPATH:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 912;
                this.keywords();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public char_in_def(): Char_in_defContext {
        let localContext = new Char_in_defContext(this.context, this.state);
        this.enterRule(localContext, 112, cbuildParser.RULE_char_in_def);
        try {
            this.state = 934;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.ESCAPED_QUOTE:
            case cbuildParser.SLIT:
            case cbuildParser.BACKSLASH:
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 915;
                this.char();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 916;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case cbuildParser.RPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 917;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case cbuildParser.L_CURLY_BRACE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 918;
                this.match(cbuildParser.L_CURLY_BRACE);
                }
                break;
            case cbuildParser.R_CURLY_BRACE:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 919;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case cbuildParser.COMMA:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 920;
                this.match(cbuildParser.COMMA);
                }
                break;
            case cbuildParser.COMMENT:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 921;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case cbuildParser.INCLUDE:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 922;
                this.match(cbuildParser.INCLUDE);
                }
                break;
            case cbuildParser.OVERRIDE:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 923;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case cbuildParser.EXPORT:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 924;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case cbuildParser.UNEXPORT:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 925;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case cbuildParser.IFDEF:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 926;
                this.match(cbuildParser.IFDEF);
                }
                break;
            case cbuildParser.IFNDEF:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 927;
                this.match(cbuildParser.IFNDEF);
                }
                break;
            case cbuildParser.IFEQ:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 928;
                this.match(cbuildParser.IFEQ);
                }
                break;
            case cbuildParser.IFNEQ:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 929;
                this.match(cbuildParser.IFNEQ);
                }
                break;
            case cbuildParser.ELSE:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 930;
                this.match(cbuildParser.ELSE);
                }
                break;
            case cbuildParser.ENDIF:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 931;
                this.match(cbuildParser.ENDIF);
                }
                break;
            case cbuildParser.DEFINE:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 932;
                this.match(cbuildParser.DEFINE);
                }
                break;
            case cbuildParser.UNDEFINE:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 933;
                this.match(cbuildParser.UNDEFINE);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public char_in_recipe(): Char_in_recipeContext {
        let localContext = new Char_in_recipeContext(this.context, this.state);
        this.enterRule(localContext, 114, cbuildParser.RULE_char_in_recipe);
        try {
            this.state = 939;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.LPAREN:
            case cbuildParser.RPAREN:
            case cbuildParser.L_CURLY_BRACE:
            case cbuildParser.R_CURLY_BRACE:
            case cbuildParser.COMMA:
            case cbuildParser.INCLUDE:
            case cbuildParser.ENDEF:
            case cbuildParser.IFDEF:
            case cbuildParser.IFNDEF:
            case cbuildParser.IFEQ:
            case cbuildParser.IFNEQ:
            case cbuildParser.ELSE:
            case cbuildParser.ENDIF:
            case cbuildParser.OVERRIDE:
            case cbuildParser.EXPORT:
            case cbuildParser.UNEXPORT:
            case cbuildParser.UNDEFINE:
            case cbuildParser.DEFINE:
            case cbuildParser.VPATH:
            case cbuildParser.ESCAPED_QUOTE:
            case cbuildParser.SLIT:
            case cbuildParser.BACKSLASH:
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 936;
                this.char_in_assign();
                }
                break;
            case cbuildParser.COMMENT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 937;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case cbuildParser.PIPE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 938;
                this.match(cbuildParser.PIPE);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public text(): TextContext {
        let localContext = new TextContext(this.context, this.state);
        this.enterRule(localContext, 116, cbuildParser.RULE_text);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 942;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 941;
                    this.char();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 944;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 141, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public text_nested(): Text_nestedContext {
        let localContext = new Text_nestedContext(this.context, this.state);
        this.enterRule(localContext, 118, cbuildParser.RULE_text_nested);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 947;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 946;
                    this.char_nested();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 949;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 142, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public text_in_assign(): Text_in_assignContext {
        let localContext = new Text_in_assignContext(this.context, this.state);
        this.enterRule(localContext, 120, cbuildParser.RULE_text_in_assign);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 952;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 951;
                    this.char_in_assign();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 954;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 143, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public text_in_recipe(): Text_in_recipeContext {
        let localContext = new Text_in_recipeContext(this.context, this.state);
        this.enterRule(localContext, 122, cbuildParser.RULE_text_in_recipe);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 957;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 956;
                    this.char_in_recipe();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 959;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 144, this.context);
            } while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public keywords(): KeywordsContext {
        let localContext = new KeywordsContext(this.context, this.state);
        this.enterRule(localContext, 124, cbuildParser.RULE_keywords);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 961;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294508544) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public colon(): ColonContext {
        let localContext = new ColonContext(this.context, this.state);
        this.enterRule(localContext, 126, cbuildParser.RULE_colon);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 963;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 960) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public comment_opt(): Comment_optContext {
        let localContext = new Comment_optContext(this.context, this.state);
        this.enterRule(localContext, 128, cbuildParser.RULE_comment_opt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 966;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 145, this.context) ) {
            case 1:
                {
                this.state = 965;
                this.match(cbuildParser.COMMENT);
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ws(): WsContext {
        let localContext = new WsContext(this.context, this.state);
        this.enterRule(localContext, 130, cbuildParser.RULE_ws);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 968;
            _la = this.tokenStream.LA(1);
            if(!(_la === 39 || _la === 40)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public hook(): HookContext {
        let localContext = new HookContext(this.context, this.state);
        this.enterRule(localContext, 132, cbuildParser.RULE_hook);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 970;
            this.match(cbuildParser.HOOK);
            this.state = 972;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 971;
                this.ws();
                }
            }

            this.state = 974;
            this.match(cbuildParser.L_CURLY_BRACE);
            this.state = 975;
            this.hook_program();
            this.state = 976;
            this.match(cbuildParser.R_CURLY_BRACE);
            this.state = 978;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 147, this.context) ) {
            case 1:
                {
                this.state = 977;
                this.ws();
                }
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public hook_program(): Hook_programContext {
        let localContext = new Hook_programContext(this.context, this.state);
        this.enterRule(localContext, 134, cbuildParser.RULE_hook_program);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 983;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 148, this.context);
            while (alternative !== 1 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1 + 1) {
                    {
                    {
                    this.state = 980;
                    this.matchWildcard();
                    }
                    }
                }
                this.state = 985;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 148, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public static readonly _serializedATN: number[] = [
        4,1,41,987,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,1,0,1,0,1,0,1,0,3,0,141,8,0,1,1,1,1,1,1,5,1,
        146,8,1,10,1,12,1,149,9,1,1,2,1,2,3,2,153,8,2,1,2,1,2,3,2,157,8,
        2,1,2,1,2,3,2,161,8,2,1,2,1,2,3,2,165,8,2,1,2,1,2,1,2,1,2,1,2,3,
        2,172,8,2,1,2,1,2,3,2,176,8,2,1,2,1,2,3,2,180,8,2,1,2,1,2,3,2,184,
        8,2,1,2,1,2,3,2,188,8,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,196,8,2,1,2,
        1,2,3,2,200,8,2,1,2,1,2,3,2,204,8,2,1,2,1,2,3,2,208,8,2,1,2,1,2,
        1,2,1,2,3,2,214,8,2,1,2,1,2,3,2,218,8,2,1,2,1,2,3,2,222,8,2,1,2,
        1,2,3,2,226,8,2,1,2,1,2,1,2,1,2,1,2,3,2,233,8,2,1,2,1,2,3,2,237,
        8,2,1,2,1,2,3,2,241,8,2,1,2,1,2,3,2,245,8,2,1,2,1,2,3,2,249,8,2,
        1,2,1,2,1,2,1,2,1,2,1,2,3,2,257,8,2,1,2,1,2,3,2,261,8,2,1,2,1,2,
        3,2,265,8,2,1,2,1,2,3,2,269,8,2,1,2,1,2,3,2,273,8,2,1,3,1,3,3,3,
        277,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,287,8,3,1,3,1,3,1,3,
        1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,300,8,3,1,3,1,3,1,3,1,3,1,3,
        1,3,1,3,1,3,1,3,3,3,311,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,
        321,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,334,8,3,
        1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,343,8,3,1,4,1,4,1,4,1,4,1,5,3,5,
        350,8,5,1,5,1,5,3,5,354,8,5,1,5,1,5,3,5,358,8,5,1,5,1,5,3,5,362,
        8,5,1,5,1,5,3,5,366,8,5,1,5,1,5,1,5,1,5,3,5,372,8,5,1,5,1,5,3,5,
        376,8,5,1,5,1,5,1,5,1,5,3,5,382,8,5,1,5,1,5,1,5,1,5,3,5,388,8,5,
        1,5,1,5,3,5,392,8,5,1,5,3,5,395,8,5,1,6,3,6,398,8,6,1,6,1,6,1,6,
        1,6,3,6,404,8,6,1,6,3,6,407,8,6,1,6,3,6,410,8,6,1,6,1,6,1,6,1,6,
        1,7,1,7,5,7,418,8,7,10,7,12,7,421,9,7,1,8,1,8,1,8,1,8,1,8,1,8,1,
        8,1,8,3,8,431,8,8,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,10,
        3,10,443,8,10,3,10,445,8,10,1,11,1,11,3,11,449,8,11,1,11,1,11,1,
        11,1,12,1,12,1,12,1,12,1,12,3,12,459,8,12,1,13,1,13,3,13,463,8,13,
        1,13,1,13,3,13,467,8,13,1,13,1,13,1,13,1,13,3,13,473,8,13,1,13,1,
        13,3,13,477,8,13,1,13,1,13,3,13,481,8,13,1,14,1,14,1,14,1,14,1,15,
        1,15,1,16,1,16,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,18,1,18,
        3,18,501,8,18,1,18,3,18,504,8,18,1,19,3,19,507,8,19,1,20,3,20,510,
        8,20,1,20,1,20,3,20,514,8,20,1,20,1,20,1,20,5,20,519,8,20,10,20,
        12,20,522,9,20,1,20,3,20,525,8,20,1,21,3,21,528,8,21,1,21,1,21,3,
        21,532,8,21,1,21,1,21,1,21,5,21,537,8,21,10,21,12,21,540,9,21,1,
        21,3,21,543,8,21,1,22,3,22,546,8,22,1,22,1,22,3,22,550,8,22,1,22,
        1,22,1,22,5,22,555,8,22,10,22,12,22,558,9,22,1,22,3,22,561,8,22,
        1,23,3,23,564,8,23,1,23,1,23,3,23,568,8,23,1,23,1,23,1,23,5,23,573,
        8,23,10,23,12,23,576,9,23,1,23,3,23,579,8,23,1,24,1,24,3,24,583,
        8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,5,24,593,8,24,10,24,
        12,24,596,9,24,3,24,598,8,24,1,25,1,25,3,25,602,8,25,1,25,3,25,605,
        8,25,1,26,4,26,608,8,26,11,26,12,26,609,1,27,1,27,1,27,1,27,1,27,
        1,27,3,27,618,8,27,1,28,4,28,621,8,28,11,28,12,28,622,1,29,1,29,
        1,29,1,29,1,29,1,29,3,29,631,8,29,1,30,4,30,634,8,30,11,30,12,30,
        635,1,31,1,31,3,31,640,8,31,1,32,4,32,643,8,32,11,32,12,32,644,1,
        33,1,33,3,33,649,8,33,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,3,34,708,8,34,1,
        35,4,35,711,8,35,11,35,12,35,712,1,36,1,36,3,36,717,8,36,1,37,3,
        37,720,8,37,1,37,1,37,3,37,724,8,37,5,37,726,8,37,10,37,12,37,729,
        9,37,1,38,1,38,1,39,1,39,1,39,3,39,736,8,39,1,39,1,39,3,39,740,8,
        39,1,39,1,39,3,39,744,8,39,1,39,1,39,3,39,748,8,39,1,39,3,39,751,
        8,39,1,39,3,39,754,8,39,1,39,1,39,3,39,758,8,39,1,39,1,39,3,39,762,
        8,39,1,39,1,39,3,39,766,8,39,1,39,1,39,3,39,770,8,39,1,39,1,39,3,
        39,774,8,39,1,40,1,40,3,40,778,8,40,1,40,1,40,3,40,782,8,40,1,40,
        1,40,3,40,786,8,40,1,40,1,40,3,40,790,8,40,1,40,1,40,3,40,794,8,
        40,1,40,1,40,3,40,798,8,40,1,40,3,40,801,8,40,1,40,3,40,804,8,40,
        1,40,1,40,3,40,808,8,40,1,41,1,41,1,42,1,42,4,42,814,8,42,11,42,
        12,42,815,1,43,3,43,819,8,43,1,44,3,44,822,8,44,1,45,1,45,1,45,1,
        45,5,45,828,8,45,10,45,12,45,831,9,45,1,46,4,46,834,8,46,11,46,12,
        46,835,1,47,1,47,3,47,840,8,47,1,48,1,48,3,48,844,8,48,1,48,1,48,
        1,48,1,48,1,48,3,48,851,8,48,1,48,1,48,1,48,3,48,856,8,48,1,48,1,
        48,1,48,1,48,3,48,862,8,48,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,
        49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,3,
        49,884,8,49,1,50,4,50,887,8,50,11,50,12,50,888,1,51,1,51,1,51,1,
        51,1,51,1,51,1,51,3,51,898,8,51,1,52,1,52,1,53,1,53,1,54,1,54,3,
        54,906,8,54,1,55,1,55,1,55,1,55,1,55,1,55,3,55,914,8,55,1,56,1,56,
        1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,
        1,56,1,56,1,56,1,56,3,56,935,8,56,1,57,1,57,1,57,3,57,940,8,57,1,
        58,4,58,943,8,58,11,58,12,58,944,1,59,4,59,948,8,59,11,59,12,59,
        949,1,60,4,60,953,8,60,11,60,12,60,954,1,61,4,61,958,8,61,11,61,
        12,61,959,1,62,1,62,1,63,1,63,1,64,3,64,967,8,64,1,65,1,65,1,66,
        1,66,3,66,973,8,66,1,66,1,66,1,66,1,66,3,66,979,8,66,1,67,5,67,982,
        8,67,10,67,12,67,985,9,67,1,67,1,983,0,68,0,2,4,6,8,10,12,14,16,
        18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,
        62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,
        104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,134,
        0,7,1,0,22,23,1,0,20,21,1,0,16,18,5,0,1,1,5,5,9,9,32,33,35,36,2,
        0,16,16,19,31,1,0,6,9,1,0,39,40,1134,0,140,1,0,0,0,2,147,1,0,0,0,
        4,272,1,0,0,0,6,342,1,0,0,0,8,344,1,0,0,0,10,394,1,0,0,0,12,397,
        1,0,0,0,14,419,1,0,0,0,16,430,1,0,0,0,18,432,1,0,0,0,20,444,1,0,
        0,0,22,446,1,0,0,0,24,453,1,0,0,0,26,480,1,0,0,0,28,482,1,0,0,0,
        30,486,1,0,0,0,32,488,1,0,0,0,34,490,1,0,0,0,36,503,1,0,0,0,38,506,
        1,0,0,0,40,509,1,0,0,0,42,527,1,0,0,0,44,545,1,0,0,0,46,563,1,0,
        0,0,48,597,1,0,0,0,50,601,1,0,0,0,52,607,1,0,0,0,54,617,1,0,0,0,
        56,620,1,0,0,0,58,630,1,0,0,0,60,633,1,0,0,0,62,639,1,0,0,0,64,642,
        1,0,0,0,66,648,1,0,0,0,68,707,1,0,0,0,70,710,1,0,0,0,72,716,1,0,
        0,0,74,719,1,0,0,0,76,730,1,0,0,0,78,773,1,0,0,0,80,775,1,0,0,0,
        82,809,1,0,0,0,84,813,1,0,0,0,86,818,1,0,0,0,88,821,1,0,0,0,90,823,
        1,0,0,0,92,833,1,0,0,0,94,837,1,0,0,0,96,861,1,0,0,0,98,883,1,0,
        0,0,100,886,1,0,0,0,102,897,1,0,0,0,104,899,1,0,0,0,106,901,1,0,
        0,0,108,905,1,0,0,0,110,913,1,0,0,0,112,934,1,0,0,0,114,939,1,0,
        0,0,116,942,1,0,0,0,118,947,1,0,0,0,120,952,1,0,0,0,122,957,1,0,
        0,0,124,961,1,0,0,0,126,963,1,0,0,0,128,966,1,0,0,0,130,968,1,0,
        0,0,132,970,1,0,0,0,134,983,1,0,0,0,136,137,3,2,1,0,137,138,5,0,
        0,1,138,141,1,0,0,0,139,141,5,0,0,1,140,136,1,0,0,0,140,139,1,0,
        0,0,141,1,1,0,0,0,142,146,3,10,5,0,143,146,3,104,52,0,144,146,3,
        130,65,0,145,142,1,0,0,0,145,143,1,0,0,0,145,144,1,0,0,0,146,149,
        1,0,0,0,147,145,1,0,0,0,147,148,1,0,0,0,148,3,1,0,0,0,149,147,1,
        0,0,0,150,152,3,30,15,0,151,153,3,130,65,0,152,151,1,0,0,0,152,153,
        1,0,0,0,153,154,1,0,0,0,154,156,3,36,18,0,155,157,3,130,65,0,156,
        155,1,0,0,0,156,157,1,0,0,0,157,158,1,0,0,0,158,160,3,8,4,0,159,
        161,3,130,65,0,160,159,1,0,0,0,160,161,1,0,0,0,161,162,1,0,0,0,162,
        164,5,25,0,0,163,165,3,130,65,0,164,163,1,0,0,0,164,165,1,0,0,0,
        165,166,1,0,0,0,166,167,3,128,64,0,167,168,3,104,52,0,168,273,1,
        0,0,0,169,171,3,30,15,0,170,172,3,130,65,0,171,170,1,0,0,0,171,172,
        1,0,0,0,172,173,1,0,0,0,173,175,3,36,18,0,174,176,3,130,65,0,175,
        174,1,0,0,0,175,176,1,0,0,0,176,177,1,0,0,0,177,179,3,8,4,0,178,
        180,3,130,65,0,179,178,1,0,0,0,179,180,1,0,0,0,180,181,1,0,0,0,181,
        183,5,24,0,0,182,184,3,130,65,0,183,182,1,0,0,0,183,184,1,0,0,0,
        184,185,1,0,0,0,185,187,3,8,4,0,186,188,3,130,65,0,187,186,1,0,0,
        0,187,188,1,0,0,0,188,189,1,0,0,0,189,190,5,25,0,0,190,191,3,128,
        64,0,191,192,3,104,52,0,192,273,1,0,0,0,193,195,3,30,15,0,194,196,
        3,130,65,0,195,194,1,0,0,0,195,196,1,0,0,0,196,197,1,0,0,0,197,199,
        3,36,18,0,198,200,3,130,65,0,199,198,1,0,0,0,199,200,1,0,0,0,200,
        201,1,0,0,0,201,203,3,8,4,0,202,204,3,130,65,0,203,202,1,0,0,0,203,
        204,1,0,0,0,204,205,1,0,0,0,205,207,5,24,0,0,206,208,3,130,65,0,
        207,206,1,0,0,0,207,208,1,0,0,0,208,209,1,0,0,0,209,210,3,4,2,0,
        210,273,1,0,0,0,211,213,3,32,16,0,212,214,3,130,65,0,213,212,1,0,
        0,0,213,214,1,0,0,0,214,215,1,0,0,0,215,217,3,84,42,0,216,218,3,
        130,65,0,217,216,1,0,0,0,217,218,1,0,0,0,218,219,1,0,0,0,219,221,
        3,8,4,0,220,222,3,130,65,0,221,220,1,0,0,0,221,222,1,0,0,0,222,223,
        1,0,0,0,223,225,5,25,0,0,224,226,3,130,65,0,225,224,1,0,0,0,225,
        226,1,0,0,0,226,227,1,0,0,0,227,228,3,128,64,0,228,229,3,104,52,
        0,229,273,1,0,0,0,230,232,3,32,16,0,231,233,3,130,65,0,232,231,1,
        0,0,0,232,233,1,0,0,0,233,234,1,0,0,0,234,236,3,84,42,0,235,237,
        3,130,65,0,236,235,1,0,0,0,236,237,1,0,0,0,237,238,1,0,0,0,238,240,
        3,8,4,0,239,241,3,130,65,0,240,239,1,0,0,0,240,241,1,0,0,0,241,242,
        1,0,0,0,242,244,5,24,0,0,243,245,3,130,65,0,244,243,1,0,0,0,244,
        245,1,0,0,0,245,246,1,0,0,0,246,248,3,8,4,0,247,249,3,130,65,0,248,
        247,1,0,0,0,248,249,1,0,0,0,249,250,1,0,0,0,250,251,5,25,0,0,251,
        252,3,128,64,0,252,253,3,104,52,0,253,273,1,0,0,0,254,256,3,32,16,
        0,255,257,3,130,65,0,256,255,1,0,0,0,256,257,1,0,0,0,257,258,1,0,
        0,0,258,260,3,84,42,0,259,261,3,130,65,0,260,259,1,0,0,0,260,261,
        1,0,0,0,261,262,1,0,0,0,262,264,3,8,4,0,263,265,3,130,65,0,264,263,
        1,0,0,0,264,265,1,0,0,0,265,266,1,0,0,0,266,268,5,24,0,0,267,269,
        3,130,65,0,268,267,1,0,0,0,268,269,1,0,0,0,269,270,1,0,0,0,270,271,
        3,4,2,0,271,273,1,0,0,0,272,150,1,0,0,0,272,169,1,0,0,0,272,193,
        1,0,0,0,272,211,1,0,0,0,272,230,1,0,0,0,272,254,1,0,0,0,273,5,1,
        0,0,0,274,276,3,30,15,0,275,277,3,130,65,0,276,275,1,0,0,0,276,277,
        1,0,0,0,277,278,1,0,0,0,278,279,3,36,18,0,279,280,5,37,0,0,280,281,
        3,94,47,0,281,282,5,25,0,0,282,283,3,128,64,0,283,343,1,0,0,0,284,
        286,3,30,15,0,285,287,3,130,65,0,286,285,1,0,0,0,286,287,1,0,0,0,
        287,288,1,0,0,0,288,289,3,36,18,0,289,290,5,37,0,0,290,291,3,94,
        47,0,291,292,5,24,0,0,292,293,5,37,0,0,293,294,3,94,47,0,294,295,
        5,25,0,0,295,296,3,128,64,0,296,343,1,0,0,0,297,299,3,30,15,0,298,
        300,3,130,65,0,299,298,1,0,0,0,299,300,1,0,0,0,300,301,1,0,0,0,301,
        302,3,36,18,0,302,303,5,37,0,0,303,304,3,94,47,0,304,305,5,24,0,
        0,305,306,5,37,0,0,306,307,3,6,3,0,307,343,1,0,0,0,308,310,3,32,
        16,0,309,311,3,130,65,0,310,309,1,0,0,0,310,311,1,0,0,0,311,312,
        1,0,0,0,312,313,3,84,42,0,313,314,5,37,0,0,314,315,3,94,47,0,315,
        316,5,25,0,0,316,317,3,128,64,0,317,343,1,0,0,0,318,320,3,32,16,
        0,319,321,3,130,65,0,320,319,1,0,0,0,320,321,1,0,0,0,321,322,1,0,
        0,0,322,323,3,84,42,0,323,324,5,37,0,0,324,325,3,94,47,0,325,326,
        5,24,0,0,326,327,5,37,0,0,327,328,3,94,47,0,328,329,5,25,0,0,329,
        330,3,128,64,0,330,343,1,0,0,0,331,333,3,32,16,0,332,334,3,130,65,
        0,333,332,1,0,0,0,333,334,1,0,0,0,334,335,1,0,0,0,335,336,3,84,42,
        0,336,337,5,37,0,0,337,338,3,94,47,0,338,339,5,24,0,0,339,340,5,
        37,0,0,340,341,3,6,3,0,341,343,1,0,0,0,342,274,1,0,0,0,342,284,1,
        0,0,0,342,297,1,0,0,0,342,308,1,0,0,0,342,318,1,0,0,0,342,331,1,
        0,0,0,343,7,1,0,0,0,344,345,3,128,64,0,345,346,3,104,52,0,346,347,
        3,2,1,0,347,9,1,0,0,0,348,350,3,130,65,0,349,348,1,0,0,0,349,350,
        1,0,0,0,350,351,1,0,0,0,351,395,5,41,0,0,352,354,3,130,65,0,353,
        352,1,0,0,0,353,354,1,0,0,0,354,355,1,0,0,0,355,395,3,4,2,0,356,
        358,3,130,65,0,357,356,1,0,0,0,357,358,1,0,0,0,358,359,1,0,0,0,359,
        395,3,12,6,0,360,362,3,130,65,0,361,360,1,0,0,0,361,362,1,0,0,0,
        362,363,1,0,0,0,363,395,3,18,9,0,364,366,3,130,65,0,365,364,1,0,
        0,0,365,366,1,0,0,0,366,367,1,0,0,0,367,368,3,20,10,0,368,369,3,
        104,52,0,369,395,1,0,0,0,370,372,3,130,65,0,371,370,1,0,0,0,371,
        372,1,0,0,0,372,373,1,0,0,0,373,395,3,22,11,0,374,376,3,130,65,0,
        375,374,1,0,0,0,375,376,1,0,0,0,376,377,1,0,0,0,377,378,3,26,13,
        0,378,379,3,104,52,0,379,395,1,0,0,0,380,382,3,130,65,0,381,380,
        1,0,0,0,381,382,1,0,0,0,382,383,1,0,0,0,383,384,3,68,34,0,384,385,
        3,104,52,0,385,395,1,0,0,0,386,388,3,130,65,0,387,386,1,0,0,0,387,
        388,1,0,0,0,388,389,1,0,0,0,389,395,3,78,39,0,390,392,3,130,65,0,
        391,390,1,0,0,0,391,392,1,0,0,0,392,393,1,0,0,0,393,395,3,132,66,
        0,394,349,1,0,0,0,394,353,1,0,0,0,394,357,1,0,0,0,394,361,1,0,0,
        0,394,365,1,0,0,0,394,371,1,0,0,0,394,375,1,0,0,0,394,381,1,0,0,
        0,394,387,1,0,0,0,394,391,1,0,0,0,395,11,1,0,0,0,396,398,3,98,49,
        0,397,396,1,0,0,0,397,398,1,0,0,0,398,399,1,0,0,0,399,400,5,30,0,
        0,400,401,3,130,65,0,401,403,3,84,42,0,402,404,3,130,65,0,403,402,
        1,0,0,0,403,404,1,0,0,0,404,406,1,0,0,0,405,407,5,1,0,0,406,405,
        1,0,0,0,406,407,1,0,0,0,407,409,1,0,0,0,408,410,3,130,65,0,409,408,
        1,0,0,0,409,410,1,0,0,0,410,411,1,0,0,0,411,412,3,14,7,0,412,413,
        5,19,0,0,413,414,3,104,52,0,414,13,1,0,0,0,415,418,3,12,6,0,416,
        418,3,16,8,0,417,415,1,0,0,0,417,416,1,0,0,0,418,421,1,0,0,0,419,
        417,1,0,0,0,419,420,1,0,0,0,420,15,1,0,0,0,421,419,1,0,0,0,422,423,
        3,128,64,0,423,424,3,104,52,0,424,431,1,0,0,0,425,426,3,128,64,0,
        426,427,3,104,52,0,427,428,3,48,24,0,428,429,3,104,52,0,429,431,
        1,0,0,0,430,422,1,0,0,0,430,425,1,0,0,0,431,17,1,0,0,0,432,433,3,
        34,17,0,433,434,3,40,20,0,434,435,3,104,52,0,435,19,1,0,0,0,436,
        445,5,27,0,0,437,445,5,28,0,0,438,442,3,28,14,0,439,440,3,130,65,
        0,440,441,3,90,45,0,441,443,1,0,0,0,442,439,1,0,0,0,442,443,1,0,
        0,0,443,445,1,0,0,0,444,436,1,0,0,0,444,437,1,0,0,0,444,438,1,0,
        0,0,445,21,1,0,0,0,446,448,5,31,0,0,447,449,3,24,12,0,448,447,1,
        0,0,0,448,449,1,0,0,0,449,450,1,0,0,0,450,451,3,128,64,0,451,452,
        3,104,52,0,452,23,1,0,0,0,453,454,3,130,65,0,454,458,3,84,42,0,455,
        456,3,130,65,0,456,457,3,40,20,0,457,459,1,0,0,0,458,455,1,0,0,0,
        458,459,1,0,0,0,459,25,1,0,0,0,460,462,3,84,42,0,461,463,3,130,65,
        0,462,461,1,0,0,0,462,463,1,0,0,0,463,464,1,0,0,0,464,466,5,1,0,
        0,465,467,3,44,22,0,466,465,1,0,0,0,466,467,1,0,0,0,467,468,1,0,
        0,0,468,469,3,128,64,0,469,481,1,0,0,0,470,472,3,28,14,0,471,473,
        3,130,65,0,472,471,1,0,0,0,472,473,1,0,0,0,473,474,1,0,0,0,474,476,
        5,1,0,0,475,477,3,44,22,0,476,475,1,0,0,0,476,477,1,0,0,0,477,478,
        1,0,0,0,478,479,3,128,64,0,479,481,1,0,0,0,480,460,1,0,0,0,480,470,
        1,0,0,0,481,27,1,0,0,0,482,483,3,98,49,0,483,484,3,130,65,0,484,
        485,3,84,42,0,485,29,1,0,0,0,486,487,7,0,0,0,487,31,1,0,0,0,488,
        489,7,1,0,0,489,33,1,0,0,0,490,491,7,2,0,0,491,35,1,0,0,0,492,493,
        5,10,0,0,493,494,3,38,19,0,494,495,5,14,0,0,495,496,3,38,19,0,496,
        497,5,11,0,0,497,504,1,0,0,0,498,500,5,33,0,0,499,501,3,130,65,0,
        500,499,1,0,0,0,500,501,1,0,0,0,501,502,1,0,0,0,502,504,5,33,0,0,
        503,492,1,0,0,0,503,498,1,0,0,0,504,37,1,0,0,0,505,507,3,40,20,0,
        506,505,1,0,0,0,506,507,1,0,0,0,507,39,1,0,0,0,508,510,3,130,65,
        0,509,508,1,0,0,0,509,510,1,0,0,0,510,511,1,0,0,0,511,513,3,52,26,
        0,512,514,3,130,65,0,513,512,1,0,0,0,513,514,1,0,0,0,514,520,1,0,
        0,0,515,516,3,130,65,0,516,517,3,52,26,0,517,519,1,0,0,0,518,515,
        1,0,0,0,519,522,1,0,0,0,520,518,1,0,0,0,520,521,1,0,0,0,521,524,
        1,0,0,0,522,520,1,0,0,0,523,525,3,130,65,0,524,523,1,0,0,0,524,525,
        1,0,0,0,525,41,1,0,0,0,526,528,3,130,65,0,527,526,1,0,0,0,527,528,
        1,0,0,0,528,529,1,0,0,0,529,531,3,56,28,0,530,532,3,130,65,0,531,
        530,1,0,0,0,531,532,1,0,0,0,532,538,1,0,0,0,533,534,3,130,65,0,534,
        535,3,56,28,0,535,537,1,0,0,0,536,533,1,0,0,0,537,540,1,0,0,0,538,
        536,1,0,0,0,538,539,1,0,0,0,539,542,1,0,0,0,540,538,1,0,0,0,541,
        543,3,130,65,0,542,541,1,0,0,0,542,543,1,0,0,0,543,43,1,0,0,0,544,
        546,3,130,65,0,545,544,1,0,0,0,545,546,1,0,0,0,546,547,1,0,0,0,547,
        549,3,60,30,0,548,550,3,130,65,0,549,548,1,0,0,0,549,550,1,0,0,0,
        550,556,1,0,0,0,551,552,3,130,65,0,552,553,3,60,30,0,553,555,1,0,
        0,0,554,551,1,0,0,0,555,558,1,0,0,0,556,554,1,0,0,0,556,557,1,0,
        0,0,557,560,1,0,0,0,558,556,1,0,0,0,559,561,3,130,65,0,560,559,1,
        0,0,0,560,561,1,0,0,0,561,45,1,0,0,0,562,564,3,130,65,0,563,562,
        1,0,0,0,563,564,1,0,0,0,564,565,1,0,0,0,565,567,3,64,32,0,566,568,
        3,130,65,0,567,566,1,0,0,0,567,568,1,0,0,0,568,574,1,0,0,0,569,570,
        3,130,65,0,570,571,3,64,32,0,571,573,1,0,0,0,572,569,1,0,0,0,573,
        576,1,0,0,0,574,572,1,0,0,0,574,575,1,0,0,0,575,578,1,0,0,0,576,
        574,1,0,0,0,577,579,3,130,65,0,578,577,1,0,0,0,578,579,1,0,0,0,579,
        47,1,0,0,0,580,598,3,104,52,0,581,583,3,104,52,0,582,581,1,0,0,0,
        582,583,1,0,0,0,583,584,1,0,0,0,584,594,3,50,25,0,585,586,3,104,
        52,0,586,587,3,50,25,0,587,593,1,0,0,0,588,593,3,104,52,0,589,590,
        3,130,65,0,590,591,3,64,32,0,591,593,1,0,0,0,592,585,1,0,0,0,592,
        588,1,0,0,0,592,589,1,0,0,0,593,596,1,0,0,0,594,592,1,0,0,0,594,
        595,1,0,0,0,595,598,1,0,0,0,596,594,1,0,0,0,597,580,1,0,0,0,597,
        582,1,0,0,0,598,49,1,0,0,0,599,602,3,112,56,0,600,602,3,68,34,0,
        601,599,1,0,0,0,601,600,1,0,0,0,602,604,1,0,0,0,603,605,3,64,32,
        0,604,603,1,0,0,0,604,605,1,0,0,0,605,51,1,0,0,0,606,608,3,54,27,
        0,607,606,1,0,0,0,608,609,1,0,0,0,609,607,1,0,0,0,609,610,1,0,0,
        0,610,53,1,0,0,0,611,618,3,116,58,0,612,618,3,68,34,0,613,614,5,
        10,0,0,614,615,3,42,21,0,615,616,5,11,0,0,616,618,1,0,0,0,617,611,
        1,0,0,0,617,612,1,0,0,0,617,613,1,0,0,0,618,55,1,0,0,0,619,621,3,
        58,29,0,620,619,1,0,0,0,621,622,1,0,0,0,622,620,1,0,0,0,622,623,
        1,0,0,0,623,57,1,0,0,0,624,631,3,118,59,0,625,631,3,68,34,0,626,
        627,5,10,0,0,627,628,3,42,21,0,628,629,5,11,0,0,629,631,1,0,0,0,
        630,624,1,0,0,0,630,625,1,0,0,0,630,626,1,0,0,0,631,59,1,0,0,0,632,
        634,3,62,31,0,633,632,1,0,0,0,634,635,1,0,0,0,635,633,1,0,0,0,635,
        636,1,0,0,0,636,61,1,0,0,0,637,640,3,120,60,0,638,640,3,68,34,0,
        639,637,1,0,0,0,639,638,1,0,0,0,640,63,1,0,0,0,641,643,3,66,33,0,
        642,641,1,0,0,0,643,644,1,0,0,0,644,642,1,0,0,0,644,645,1,0,0,0,
        645,65,1,0,0,0,646,649,3,122,61,0,647,649,3,68,34,0,648,646,1,0,
        0,0,648,647,1,0,0,0,649,67,1,0,0,0,650,708,5,4,0,0,651,652,5,2,0,
        0,652,653,3,70,35,0,653,654,5,11,0,0,654,708,1,0,0,0,655,656,5,2,
        0,0,656,657,3,70,35,0,657,658,3,130,65,0,658,659,3,74,37,0,659,660,
        5,11,0,0,660,708,1,0,0,0,661,662,5,2,0,0,662,663,3,70,35,0,663,664,
        5,14,0,0,664,665,3,74,37,0,665,666,5,11,0,0,666,708,1,0,0,0,667,
        668,5,2,0,0,668,669,3,70,35,0,669,670,5,9,0,0,670,671,3,40,20,0,
        671,672,5,11,0,0,672,708,1,0,0,0,673,674,5,2,0,0,674,675,3,70,35,
        0,675,676,5,1,0,0,676,677,3,40,20,0,677,678,5,11,0,0,678,708,1,0,
        0,0,679,680,5,3,0,0,680,681,3,70,35,0,681,682,5,13,0,0,682,708,1,
        0,0,0,683,684,5,3,0,0,684,685,3,70,35,0,685,686,3,130,65,0,686,687,
        3,74,37,0,687,688,5,13,0,0,688,708,1,0,0,0,689,690,5,3,0,0,690,691,
        3,70,35,0,691,692,5,14,0,0,692,693,3,74,37,0,693,694,5,13,0,0,694,
        708,1,0,0,0,695,696,5,3,0,0,696,697,3,70,35,0,697,698,5,9,0,0,698,
        699,3,40,20,0,699,700,5,13,0,0,700,708,1,0,0,0,701,702,5,3,0,0,702,
        703,3,70,35,0,703,704,5,1,0,0,704,705,3,40,20,0,705,706,5,13,0,0,
        706,708,1,0,0,0,707,650,1,0,0,0,707,651,1,0,0,0,707,655,1,0,0,0,
        707,661,1,0,0,0,707,667,1,0,0,0,707,673,1,0,0,0,707,679,1,0,0,0,
        707,683,1,0,0,0,707,689,1,0,0,0,707,695,1,0,0,0,707,701,1,0,0,0,
        708,69,1,0,0,0,709,711,3,72,36,0,710,709,1,0,0,0,711,712,1,0,0,0,
        712,710,1,0,0,0,712,713,1,0,0,0,713,71,1,0,0,0,714,717,5,36,0,0,
        715,717,3,68,34,0,716,714,1,0,0,0,716,715,1,0,0,0,717,73,1,0,0,0,
        718,720,3,76,38,0,719,718,1,0,0,0,719,720,1,0,0,0,720,727,1,0,0,
        0,721,723,5,14,0,0,722,724,3,76,38,0,723,722,1,0,0,0,723,724,1,0,
        0,0,724,726,1,0,0,0,725,721,1,0,0,0,726,729,1,0,0,0,727,725,1,0,
        0,0,727,728,1,0,0,0,728,75,1,0,0,0,729,727,1,0,0,0,730,731,3,40,
        20,0,731,77,1,0,0,0,732,774,3,80,40,0,733,735,3,90,45,0,734,736,
        3,130,65,0,735,734,1,0,0,0,735,736,1,0,0,0,736,737,1,0,0,0,737,739,
        3,126,63,0,738,740,3,130,65,0,739,738,1,0,0,0,739,740,1,0,0,0,740,
        741,1,0,0,0,741,750,3,86,43,0,742,744,3,130,65,0,743,742,1,0,0,0,
        743,744,1,0,0,0,744,745,1,0,0,0,745,747,5,15,0,0,746,748,3,130,65,
        0,747,746,1,0,0,0,747,748,1,0,0,0,748,749,1,0,0,0,749,751,3,88,44,
        0,750,743,1,0,0,0,750,751,1,0,0,0,751,753,1,0,0,0,752,754,3,130,
        65,0,753,752,1,0,0,0,753,754,1,0,0,0,754,755,1,0,0,0,755,757,5,37,
        0,0,756,758,3,92,46,0,757,756,1,0,0,0,757,758,1,0,0,0,758,774,1,
        0,0,0,759,761,3,90,45,0,760,762,3,130,65,0,761,760,1,0,0,0,761,762,
        1,0,0,0,762,763,1,0,0,0,763,765,3,126,63,0,764,766,3,130,65,0,765,
        764,1,0,0,0,765,766,1,0,0,0,766,767,1,0,0,0,767,769,3,26,13,0,768,
        770,3,130,65,0,769,768,1,0,0,0,769,770,1,0,0,0,770,771,1,0,0,0,771,
        772,5,37,0,0,772,774,1,0,0,0,773,732,1,0,0,0,773,733,1,0,0,0,773,
        759,1,0,0,0,774,79,1,0,0,0,775,777,3,90,45,0,776,778,3,130,65,0,
        777,776,1,0,0,0,777,778,1,0,0,0,778,779,1,0,0,0,779,781,3,126,63,
        0,780,782,3,130,65,0,781,780,1,0,0,0,781,782,1,0,0,0,782,783,1,0,
        0,0,783,785,3,84,42,0,784,786,3,130,65,0,785,784,1,0,0,0,785,786,
        1,0,0,0,786,787,1,0,0,0,787,789,3,126,63,0,788,790,3,130,65,0,789,
        788,1,0,0,0,789,790,1,0,0,0,790,791,1,0,0,0,791,800,3,86,43,0,792,
        794,3,130,65,0,793,792,1,0,0,0,793,794,1,0,0,0,794,795,1,0,0,0,795,
        797,5,15,0,0,796,798,3,130,65,0,797,796,1,0,0,0,797,798,1,0,0,0,
        798,799,1,0,0,0,799,801,3,88,44,0,800,793,1,0,0,0,800,801,1,0,0,
        0,801,803,1,0,0,0,802,804,3,130,65,0,803,802,1,0,0,0,803,804,1,0,
        0,0,804,805,1,0,0,0,805,807,5,37,0,0,806,808,3,92,46,0,807,806,1,
        0,0,0,807,808,1,0,0,0,808,81,1,0,0,0,809,810,3,84,42,0,810,83,1,
        0,0,0,811,814,3,100,50,0,812,814,3,68,34,0,813,811,1,0,0,0,813,812,
        1,0,0,0,814,815,1,0,0,0,815,813,1,0,0,0,815,816,1,0,0,0,816,85,1,
        0,0,0,817,819,3,90,45,0,818,817,1,0,0,0,818,819,1,0,0,0,819,87,1,
        0,0,0,820,822,3,90,45,0,821,820,1,0,0,0,821,822,1,0,0,0,822,89,1,
        0,0,0,823,829,3,82,41,0,824,825,3,130,65,0,825,826,3,82,41,0,826,
        828,1,0,0,0,827,824,1,0,0,0,828,831,1,0,0,0,829,827,1,0,0,0,829,
        830,1,0,0,0,830,91,1,0,0,0,831,829,1,0,0,0,832,834,3,96,48,0,833,
        832,1,0,0,0,834,835,1,0,0,0,835,833,1,0,0,0,835,836,1,0,0,0,836,
        93,1,0,0,0,837,839,3,128,64,0,838,840,3,92,46,0,839,838,1,0,0,0,
        839,840,1,0,0,0,840,95,1,0,0,0,841,843,5,38,0,0,842,844,3,130,65,
        0,843,842,1,0,0,0,843,844,1,0,0,0,844,845,1,0,0,0,845,846,3,46,23,
        0,846,847,5,37,0,0,847,862,1,0,0,0,848,850,5,38,0,0,849,851,3,130,
        65,0,850,849,1,0,0,0,850,851,1,0,0,0,851,852,1,0,0,0,852,853,5,41,
        0,0,853,862,5,37,0,0,854,856,3,130,65,0,855,854,1,0,0,0,855,856,
        1,0,0,0,856,857,1,0,0,0,857,858,5,41,0,0,858,862,5,37,0,0,859,862,
        3,6,3,0,860,862,5,37,0,0,861,841,1,0,0,0,861,848,1,0,0,0,861,855,
        1,0,0,0,861,859,1,0,0,0,861,860,1,0,0,0,862,97,1,0,0,0,863,884,5,
        26,0,0,864,884,5,27,0,0,865,884,5,28,0,0,866,867,5,26,0,0,867,868,
        3,130,65,0,868,869,5,27,0,0,869,884,1,0,0,0,870,871,5,27,0,0,871,
        872,3,130,65,0,872,873,5,26,0,0,873,884,1,0,0,0,874,884,5,29,0,0,
        875,876,5,26,0,0,876,877,3,130,65,0,877,878,5,29,0,0,878,884,1,0,
        0,0,879,880,5,29,0,0,880,881,3,130,65,0,881,882,5,26,0,0,882,884,
        1,0,0,0,883,863,1,0,0,0,883,864,1,0,0,0,883,865,1,0,0,0,883,866,
        1,0,0,0,883,870,1,0,0,0,883,874,1,0,0,0,883,875,1,0,0,0,883,879,
        1,0,0,0,884,99,1,0,0,0,885,887,3,102,51,0,886,885,1,0,0,0,887,888,
        1,0,0,0,888,886,1,0,0,0,888,889,1,0,0,0,889,101,1,0,0,0,890,898,
        5,36,0,0,891,898,3,124,62,0,892,898,5,14,0,0,893,898,5,10,0,0,894,
        898,5,11,0,0,895,898,5,12,0,0,896,898,5,13,0,0,897,890,1,0,0,0,897,
        891,1,0,0,0,897,892,1,0,0,0,897,893,1,0,0,0,897,894,1,0,0,0,897,
        895,1,0,0,0,897,896,1,0,0,0,898,103,1,0,0,0,899,900,5,37,0,0,900,
        105,1,0,0,0,901,902,7,3,0,0,902,107,1,0,0,0,903,906,3,106,53,0,904,
        906,5,14,0,0,905,903,1,0,0,0,905,904,1,0,0,0,906,109,1,0,0,0,907,
        914,3,108,54,0,908,914,5,10,0,0,909,914,5,11,0,0,910,914,5,12,0,
        0,911,914,5,13,0,0,912,914,3,124,62,0,913,907,1,0,0,0,913,908,1,
        0,0,0,913,909,1,0,0,0,913,910,1,0,0,0,913,911,1,0,0,0,913,912,1,
        0,0,0,914,111,1,0,0,0,915,935,3,106,53,0,916,935,5,10,0,0,917,935,
        5,11,0,0,918,935,5,12,0,0,919,935,5,13,0,0,920,935,5,14,0,0,921,
        935,5,41,0,0,922,935,5,16,0,0,923,935,5,26,0,0,924,935,5,27,0,0,
        925,935,5,28,0,0,926,935,5,20,0,0,927,935,5,21,0,0,928,935,5,22,
        0,0,929,935,5,23,0,0,930,935,5,24,0,0,931,935,5,25,0,0,932,935,5,
        30,0,0,933,935,5,29,0,0,934,915,1,0,0,0,934,916,1,0,0,0,934,917,
        1,0,0,0,934,918,1,0,0,0,934,919,1,0,0,0,934,920,1,0,0,0,934,921,
        1,0,0,0,934,922,1,0,0,0,934,923,1,0,0,0,934,924,1,0,0,0,934,925,
        1,0,0,0,934,926,1,0,0,0,934,927,1,0,0,0,934,928,1,0,0,0,934,929,
        1,0,0,0,934,930,1,0,0,0,934,931,1,0,0,0,934,932,1,0,0,0,934,933,
        1,0,0,0,935,113,1,0,0,0,936,940,3,110,55,0,937,940,5,41,0,0,938,
        940,5,15,0,0,939,936,1,0,0,0,939,937,1,0,0,0,939,938,1,0,0,0,940,
        115,1,0,0,0,941,943,3,106,53,0,942,941,1,0,0,0,943,944,1,0,0,0,944,
        942,1,0,0,0,944,945,1,0,0,0,945,117,1,0,0,0,946,948,3,108,54,0,947,
        946,1,0,0,0,948,949,1,0,0,0,949,947,1,0,0,0,949,950,1,0,0,0,950,
        119,1,0,0,0,951,953,3,110,55,0,952,951,1,0,0,0,953,954,1,0,0,0,954,
        952,1,0,0,0,954,955,1,0,0,0,955,121,1,0,0,0,956,958,3,114,57,0,957,
        956,1,0,0,0,958,959,1,0,0,0,959,957,1,0,0,0,959,960,1,0,0,0,960,
        123,1,0,0,0,961,962,7,4,0,0,962,125,1,0,0,0,963,964,7,5,0,0,964,
        127,1,0,0,0,965,967,5,41,0,0,966,965,1,0,0,0,966,967,1,0,0,0,967,
        129,1,0,0,0,968,969,7,6,0,0,969,131,1,0,0,0,970,972,5,34,0,0,971,
        973,3,130,65,0,972,971,1,0,0,0,972,973,1,0,0,0,973,974,1,0,0,0,974,
        975,5,12,0,0,975,976,3,134,67,0,976,978,5,13,0,0,977,979,3,130,65,
        0,978,977,1,0,0,0,978,979,1,0,0,0,979,133,1,0,0,0,980,982,9,0,0,
        0,981,980,1,0,0,0,982,985,1,0,0,0,983,984,1,0,0,0,983,981,1,0,0,
        0,984,135,1,0,0,0,985,983,1,0,0,0,149,140,145,147,152,156,160,164,
        171,175,179,183,187,195,199,203,207,213,217,221,225,232,236,240,
        244,248,256,260,264,268,272,276,286,299,310,320,333,342,349,353,
        357,361,365,371,375,381,387,391,394,397,403,406,409,417,419,430,
        442,444,448,458,462,466,472,476,480,500,503,506,509,513,520,524,
        527,531,538,542,545,549,556,560,563,567,574,578,582,592,594,597,
        601,604,609,617,622,630,635,639,644,648,707,712,716,719,723,727,
        735,739,743,747,750,753,757,761,765,769,773,777,781,785,789,793,
        797,800,803,807,813,815,818,821,829,835,839,843,850,855,861,883,
        888,897,905,913,934,939,944,949,954,959,966,972,978,983
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!cbuildParser.__ATN) {
            cbuildParser.__ATN = new antlr.ATNDeserializer().deserialize(cbuildParser._serializedATN);
        }

        return cbuildParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(cbuildParser.literalNames, cbuildParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return cbuildParser.vocabulary;
    }

    private static readonly decisionsToDFA = cbuildParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class CbuildfileContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public statements(): StatementsContext | null {
        return this.getRuleContext(0, StatementsContext);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(cbuildParser.EOF, 0)!;
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_cbuildfile;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterCbuildfile) {
             listener.enterCbuildfile(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitCbuildfile) {
             listener.exitCbuildfile(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitCbuildfile) {
            return visitor.visitCbuildfile(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StatementsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public statement(): StatementContext[];
    public statement(i: number): StatementContext | null;
    public statement(i?: number): StatementContext[] | StatementContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StatementContext);
        }

        return this.getRuleContext(i, StatementContext);
    }
    public br(): BrContext[];
    public br(i: number): BrContext | null;
    public br(i?: number): BrContext[] | BrContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BrContext);
        }

        return this.getRuleContext(i, BrContext);
    }
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_statements;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterStatements) {
             listener.enterStatements(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitStatements) {
             listener.exitStatements(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitStatements) {
            return visitor.visitStatements(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConditionalContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public if_eq_kw(): If_eq_kwContext | null {
        return this.getRuleContext(0, If_eq_kwContext);
    }
    public condition(): ConditionContext | null {
        return this.getRuleContext(0, ConditionContext);
    }
    public statements_opt(): Statements_optContext[];
    public statements_opt(i: number): Statements_optContext | null;
    public statements_opt(i?: number): Statements_optContext[] | Statements_optContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Statements_optContext);
        }

        return this.getRuleContext(i, Statements_optContext);
    }
    public ENDIF(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.ENDIF, 0);
    }
    public comment_opt(): Comment_optContext | null {
        return this.getRuleContext(0, Comment_optContext);
    }
    public br(): BrContext | null {
        return this.getRuleContext(0, BrContext);
    }
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public ELSE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.ELSE, 0);
    }
    public conditional(): ConditionalContext | null {
        return this.getRuleContext(0, ConditionalContext);
    }
    public if_def_kw(): If_def_kwContext | null {
        return this.getRuleContext(0, If_def_kwContext);
    }
    public pattern(): PatternContext | null {
        return this.getRuleContext(0, PatternContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_conditional;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterConditional) {
             listener.enterConditional(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitConditional) {
             listener.exitConditional(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitConditional) {
            return visitor.visitConditional(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Conditional_in_recipeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public if_eq_kw(): If_eq_kwContext | null {
        return this.getRuleContext(0, If_eq_kwContext);
    }
    public condition(): ConditionContext | null {
        return this.getRuleContext(0, ConditionContext);
    }
    public NL(): antlr.TerminalNode[];
    public NL(i: number): antlr.TerminalNode | null;
    public NL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(cbuildParser.NL);
    	} else {
    		return this.getToken(cbuildParser.NL, i);
    	}
    }
    public recipes_opt(): Recipes_optContext[];
    public recipes_opt(i: number): Recipes_optContext | null;
    public recipes_opt(i?: number): Recipes_optContext[] | Recipes_optContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Recipes_optContext);
        }

        return this.getRuleContext(i, Recipes_optContext);
    }
    public ENDIF(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.ENDIF, 0);
    }
    public comment_opt(): Comment_optContext | null {
        return this.getRuleContext(0, Comment_optContext);
    }
    public ws(): WsContext | null {
        return this.getRuleContext(0, WsContext);
    }
    public ELSE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.ELSE, 0);
    }
    public conditional_in_recipe(): Conditional_in_recipeContext | null {
        return this.getRuleContext(0, Conditional_in_recipeContext);
    }
    public if_def_kw(): If_def_kwContext | null {
        return this.getRuleContext(0, If_def_kwContext);
    }
    public pattern(): PatternContext | null {
        return this.getRuleContext(0, PatternContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_conditional_in_recipe;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterConditional_in_recipe) {
             listener.enterConditional_in_recipe(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitConditional_in_recipe) {
             listener.exitConditional_in_recipe(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitConditional_in_recipe) {
            return visitor.visitConditional_in_recipe(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Statements_optContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public comment_opt(): Comment_optContext {
        return this.getRuleContext(0, Comment_optContext)!;
    }
    public br(): BrContext {
        return this.getRuleContext(0, BrContext)!;
    }
    public statements(): StatementsContext {
        return this.getRuleContext(0, StatementsContext)!;
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_statements_opt;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterStatements_opt) {
             listener.enterStatements_opt(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitStatements_opt) {
             listener.exitStatements_opt(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitStatements_opt) {
            return visitor.visitStatements_opt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COMMENT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.COMMENT, 0);
    }
    public ws(): WsContext | null {
        return this.getRuleContext(0, WsContext);
    }
    public conditional(): ConditionalContext | null {
        return this.getRuleContext(0, ConditionalContext);
    }
    public define(): DefineContext | null {
        return this.getRuleContext(0, DefineContext);
    }
    public include(): IncludeContext | null {
        return this.getRuleContext(0, IncludeContext);
    }
    public export(): ExportContext | null {
        return this.getRuleContext(0, ExportContext);
    }
    public br(): BrContext | null {
        return this.getRuleContext(0, BrContext);
    }
    public vpath(): VpathContext | null {
        return this.getRuleContext(0, VpathContext);
    }
    public assignment(): AssignmentContext | null {
        return this.getRuleContext(0, AssignmentContext);
    }
    public function(): FunctionContext | null {
        return this.getRuleContext(0, FunctionContext);
    }
    public rule(): RuleContext | null {
        return this.getRuleContext(0, RuleContext);
    }
    public hook(): HookContext | null {
        return this.getRuleContext(0, HookContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_statement;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitStatement) {
            return visitor.visitStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DefineContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DEFINE(): antlr.TerminalNode {
        return this.getToken(cbuildParser.DEFINE, 0)!;
    }
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public pattern(): PatternContext {
        return this.getRuleContext(0, PatternContext)!;
    }
    public define_body(): Define_bodyContext {
        return this.getRuleContext(0, Define_bodyContext)!;
    }
    public ENDEF(): antlr.TerminalNode {
        return this.getToken(cbuildParser.ENDEF, 0)!;
    }
    public br(): BrContext {
        return this.getRuleContext(0, BrContext)!;
    }
    public specifiers(): SpecifiersContext | null {
        return this.getRuleContext(0, SpecifiersContext);
    }
    public ASSIGN_OP(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.ASSIGN_OP, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_define;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterDefine) {
             listener.enterDefine(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitDefine) {
             listener.exitDefine(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitDefine) {
            return visitor.visitDefine(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Define_bodyContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public define(): DefineContext[];
    public define(i: number): DefineContext | null;
    public define(i?: number): DefineContext[] | DefineContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DefineContext);
        }

        return this.getRuleContext(i, DefineContext);
    }
    public definition(): DefinitionContext[];
    public definition(i: number): DefinitionContext | null;
    public definition(i?: number): DefinitionContext[] | DefinitionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DefinitionContext);
        }

        return this.getRuleContext(i, DefinitionContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_define_body;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterDefine_body) {
             listener.enterDefine_body(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitDefine_body) {
             listener.exitDefine_body(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitDefine_body) {
            return visitor.visitDefine_body(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DefinitionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public comment_opt(): Comment_optContext {
        return this.getRuleContext(0, Comment_optContext)!;
    }
    public br(): BrContext[];
    public br(i: number): BrContext | null;
    public br(i?: number): BrContext[] | BrContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BrContext);
        }

        return this.getRuleContext(i, BrContext);
    }
    public exprs_in_def(): Exprs_in_defContext | null {
        return this.getRuleContext(0, Exprs_in_defContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_definition;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterDefinition) {
             listener.enterDefinition(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitDefinition) {
             listener.exitDefinition(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitDefinition) {
            return visitor.visitDefinition(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IncludeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public include_kw(): Include_kwContext {
        return this.getRuleContext(0, Include_kwContext)!;
    }
    public expressions(): ExpressionsContext {
        return this.getRuleContext(0, ExpressionsContext)!;
    }
    public br(): BrContext {
        return this.getRuleContext(0, BrContext)!;
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_include;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterInclude) {
             listener.enterInclude(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitInclude) {
             listener.exitInclude(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitInclude) {
            return visitor.visitInclude(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExportContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EXPORT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.EXPORT, 0);
    }
    public UNEXPORT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.UNEXPORT, 0);
    }
    public assignment_prefix(): Assignment_prefixContext | null {
        return this.getRuleContext(0, Assignment_prefixContext);
    }
    public ws(): WsContext | null {
        return this.getRuleContext(0, WsContext);
    }
    public targets(): TargetsContext | null {
        return this.getRuleContext(0, TargetsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_export;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExport) {
             listener.enterExport(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExport) {
             listener.exitExport(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExport) {
            return visitor.visitExport(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VpathContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VPATH(): antlr.TerminalNode {
        return this.getToken(cbuildParser.VPATH, 0)!;
    }
    public comment_opt(): Comment_optContext {
        return this.getRuleContext(0, Comment_optContext)!;
    }
    public br(): BrContext {
        return this.getRuleContext(0, BrContext)!;
    }
    public vpath_args(): Vpath_argsContext | null {
        return this.getRuleContext(0, Vpath_argsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_vpath;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterVpath) {
             listener.enterVpath(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitVpath) {
             listener.exitVpath(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitVpath) {
            return visitor.visitVpath(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Vpath_argsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public pattern(): PatternContext {
        return this.getRuleContext(0, PatternContext)!;
    }
    public expressions(): ExpressionsContext | null {
        return this.getRuleContext(0, ExpressionsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_vpath_args;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterVpath_args) {
             listener.enterVpath_args(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitVpath_args) {
             listener.exitVpath_args(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitVpath_args) {
            return visitor.visitVpath_args(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AssignmentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public pattern(): PatternContext | null {
        return this.getRuleContext(0, PatternContext);
    }
    public ASSIGN_OP(): antlr.TerminalNode {
        return this.getToken(cbuildParser.ASSIGN_OP, 0)!;
    }
    public comment_opt(): Comment_optContext {
        return this.getRuleContext(0, Comment_optContext)!;
    }
    public ws(): WsContext | null {
        return this.getRuleContext(0, WsContext);
    }
    public exprs_in_assign(): Exprs_in_assignContext | null {
        return this.getRuleContext(0, Exprs_in_assignContext);
    }
    public assignment_prefix(): Assignment_prefixContext | null {
        return this.getRuleContext(0, Assignment_prefixContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_assignment;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterAssignment) {
             listener.enterAssignment(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitAssignment) {
             listener.exitAssignment(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitAssignment) {
            return visitor.visitAssignment(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Assignment_prefixContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public specifiers(): SpecifiersContext {
        return this.getRuleContext(0, SpecifiersContext)!;
    }
    public ws(): WsContext {
        return this.getRuleContext(0, WsContext)!;
    }
    public pattern(): PatternContext {
        return this.getRuleContext(0, PatternContext)!;
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_assignment_prefix;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterAssignment_prefix) {
             listener.enterAssignment_prefix(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitAssignment_prefix) {
             listener.exitAssignment_prefix(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitAssignment_prefix) {
            return visitor.visitAssignment_prefix(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class If_eq_kwContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IFEQ(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.IFEQ, 0);
    }
    public IFNEQ(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.IFNEQ, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_if_eq_kw;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterIf_eq_kw) {
             listener.enterIf_eq_kw(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitIf_eq_kw) {
             listener.exitIf_eq_kw(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitIf_eq_kw) {
            return visitor.visitIf_eq_kw(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class If_def_kwContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IFDEF(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.IFDEF, 0);
    }
    public IFNDEF(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.IFNDEF, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_if_def_kw;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterIf_def_kw) {
             listener.enterIf_def_kw(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitIf_def_kw) {
             listener.exitIf_def_kw(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitIf_def_kw) {
            return visitor.visitIf_def_kw(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Include_kwContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INCLUDE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.INCLUDE, 0);
    }
    public DASH_INCLUDE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.DASH_INCLUDE, 0);
    }
    public SINCLUDE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.SINCLUDE, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_include_kw;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterInclude_kw) {
             listener.enterInclude_kw(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitInclude_kw) {
             listener.exitInclude_kw(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitInclude_kw) {
            return visitor.visitInclude_kw(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConditionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.LPAREN, 0);
    }
    public expressions_opt(): Expressions_optContext[];
    public expressions_opt(i: number): Expressions_optContext | null;
    public expressions_opt(i?: number): Expressions_optContext[] | Expressions_optContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Expressions_optContext);
        }

        return this.getRuleContext(i, Expressions_optContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.COMMA, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.RPAREN, 0);
    }
    public SLIT(): antlr.TerminalNode[];
    public SLIT(i: number): antlr.TerminalNode | null;
    public SLIT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(cbuildParser.SLIT);
    	} else {
    		return this.getToken(cbuildParser.SLIT, i);
    	}
    }
    public ws(): WsContext | null {
        return this.getRuleContext(0, WsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_condition;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterCondition) {
             listener.enterCondition(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitCondition) {
             listener.exitCondition(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitCondition) {
            return visitor.visitCondition(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expressions_optContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expressions(): ExpressionsContext | null {
        return this.getRuleContext(0, ExpressionsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_expressions_opt;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExpressions_opt) {
             listener.enterExpressions_opt(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExpressions_opt) {
             listener.exitExpressions_opt(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExpressions_opt) {
            return visitor.visitExpressions_opt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_expressions;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExpressions) {
             listener.enterExpressions(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExpressions) {
             listener.exitExpressions(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExpressions) {
            return visitor.visitExpressions(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Exprs_nestedContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr_nested(): Expr_nestedContext[];
    public expr_nested(i: number): Expr_nestedContext | null;
    public expr_nested(i?: number): Expr_nestedContext[] | Expr_nestedContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Expr_nestedContext);
        }

        return this.getRuleContext(i, Expr_nestedContext);
    }
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_exprs_nested;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExprs_nested) {
             listener.enterExprs_nested(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExprs_nested) {
             listener.exitExprs_nested(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExprs_nested) {
            return visitor.visitExprs_nested(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Exprs_in_assignContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr_in_assign(): Expr_in_assignContext[];
    public expr_in_assign(i: number): Expr_in_assignContext | null;
    public expr_in_assign(i?: number): Expr_in_assignContext[] | Expr_in_assignContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Expr_in_assignContext);
        }

        return this.getRuleContext(i, Expr_in_assignContext);
    }
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_exprs_in_assign;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExprs_in_assign) {
             listener.enterExprs_in_assign(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExprs_in_assign) {
             listener.exitExprs_in_assign(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExprs_in_assign) {
            return visitor.visitExprs_in_assign(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Exprs_in_recipeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr_in_recipe(): Expr_in_recipeContext[];
    public expr_in_recipe(i: number): Expr_in_recipeContext | null;
    public expr_in_recipe(i?: number): Expr_in_recipeContext[] | Expr_in_recipeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Expr_in_recipeContext);
        }

        return this.getRuleContext(i, Expr_in_recipeContext);
    }
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_exprs_in_recipe;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExprs_in_recipe) {
             listener.enterExprs_in_recipe(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExprs_in_recipe) {
             listener.exitExprs_in_recipe(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExprs_in_recipe) {
            return visitor.visitExprs_in_recipe(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Exprs_in_defContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public br(): BrContext[];
    public br(i: number): BrContext | null;
    public br(i?: number): BrContext[] | BrContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BrContext);
        }

        return this.getRuleContext(i, BrContext);
    }
    public first_expr_in_def(): First_expr_in_defContext[];
    public first_expr_in_def(i: number): First_expr_in_defContext | null;
    public first_expr_in_def(i?: number): First_expr_in_defContext[] | First_expr_in_defContext | null {
        if (i === undefined) {
            return this.getRuleContexts(First_expr_in_defContext);
        }

        return this.getRuleContext(i, First_expr_in_defContext);
    }
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public expr_in_recipe(): Expr_in_recipeContext[];
    public expr_in_recipe(i: number): Expr_in_recipeContext | null;
    public expr_in_recipe(i?: number): Expr_in_recipeContext[] | Expr_in_recipeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Expr_in_recipeContext);
        }

        return this.getRuleContext(i, Expr_in_recipeContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_exprs_in_def;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExprs_in_def) {
             listener.enterExprs_in_def(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExprs_in_def) {
             listener.exitExprs_in_def(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExprs_in_def) {
            return visitor.visitExprs_in_def(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class First_expr_in_defContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public char_in_def(): Char_in_defContext | null {
        return this.getRuleContext(0, Char_in_defContext);
    }
    public function(): FunctionContext | null {
        return this.getRuleContext(0, FunctionContext);
    }
    public expr_in_recipe(): Expr_in_recipeContext | null {
        return this.getRuleContext(0, Expr_in_recipeContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_first_expr_in_def;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterFirst_expr_in_def) {
             listener.enterFirst_expr_in_def(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitFirst_expr_in_def) {
             listener.exitFirst_expr_in_def(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitFirst_expr_in_def) {
            return visitor.visitFirst_expr_in_def(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression_atom(): Expression_atomContext[];
    public expression_atom(i: number): Expression_atomContext | null;
    public expression_atom(i?: number): Expression_atomContext[] | Expression_atomContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Expression_atomContext);
        }

        return this.getRuleContext(i, Expression_atomContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_expression;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expression_atomContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public text(): TextContext | null {
        return this.getRuleContext(0, TextContext);
    }
    public function(): FunctionContext | null {
        return this.getRuleContext(0, FunctionContext);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.LPAREN, 0);
    }
    public exprs_nested(): Exprs_nestedContext | null {
        return this.getRuleContext(0, Exprs_nestedContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.RPAREN, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_expression_atom;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExpression_atom) {
             listener.enterExpression_atom(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExpression_atom) {
             listener.exitExpression_atom(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExpression_atom) {
            return visitor.visitExpression_atom(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_nestedContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr_nested_atom(): Expr_nested_atomContext[];
    public expr_nested_atom(i: number): Expr_nested_atomContext | null;
    public expr_nested_atom(i?: number): Expr_nested_atomContext[] | Expr_nested_atomContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Expr_nested_atomContext);
        }

        return this.getRuleContext(i, Expr_nested_atomContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_expr_nested;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExpr_nested) {
             listener.enterExpr_nested(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExpr_nested) {
             listener.exitExpr_nested(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExpr_nested) {
            return visitor.visitExpr_nested(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_nested_atomContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public text_nested(): Text_nestedContext | null {
        return this.getRuleContext(0, Text_nestedContext);
    }
    public function(): FunctionContext | null {
        return this.getRuleContext(0, FunctionContext);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.LPAREN, 0);
    }
    public exprs_nested(): Exprs_nestedContext | null {
        return this.getRuleContext(0, Exprs_nestedContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.RPAREN, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_expr_nested_atom;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExpr_nested_atom) {
             listener.enterExpr_nested_atom(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExpr_nested_atom) {
             listener.exitExpr_nested_atom(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExpr_nested_atom) {
            return visitor.visitExpr_nested_atom(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_in_assignContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr_in_assign_atom(): Expr_in_assign_atomContext[];
    public expr_in_assign_atom(i: number): Expr_in_assign_atomContext | null;
    public expr_in_assign_atom(i?: number): Expr_in_assign_atomContext[] | Expr_in_assign_atomContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Expr_in_assign_atomContext);
        }

        return this.getRuleContext(i, Expr_in_assign_atomContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_expr_in_assign;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExpr_in_assign) {
             listener.enterExpr_in_assign(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExpr_in_assign) {
             listener.exitExpr_in_assign(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExpr_in_assign) {
            return visitor.visitExpr_in_assign(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_in_assign_atomContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public text_in_assign(): Text_in_assignContext | null {
        return this.getRuleContext(0, Text_in_assignContext);
    }
    public function(): FunctionContext | null {
        return this.getRuleContext(0, FunctionContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_expr_in_assign_atom;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExpr_in_assign_atom) {
             listener.enterExpr_in_assign_atom(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExpr_in_assign_atom) {
             listener.exitExpr_in_assign_atom(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExpr_in_assign_atom) {
            return visitor.visitExpr_in_assign_atom(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_in_recipeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr_in_recipe_atom(): Expr_in_recipe_atomContext[];
    public expr_in_recipe_atom(i: number): Expr_in_recipe_atomContext | null;
    public expr_in_recipe_atom(i?: number): Expr_in_recipe_atomContext[] | Expr_in_recipe_atomContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Expr_in_recipe_atomContext);
        }

        return this.getRuleContext(i, Expr_in_recipe_atomContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_expr_in_recipe;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExpr_in_recipe) {
             listener.enterExpr_in_recipe(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExpr_in_recipe) {
             listener.exitExpr_in_recipe(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExpr_in_recipe) {
            return visitor.visitExpr_in_recipe(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Expr_in_recipe_atomContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public text_in_recipe(): Text_in_recipeContext | null {
        return this.getRuleContext(0, Text_in_recipeContext);
    }
    public function(): FunctionContext | null {
        return this.getRuleContext(0, FunctionContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_expr_in_recipe_atom;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterExpr_in_recipe_atom) {
             listener.enterExpr_in_recipe_atom(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitExpr_in_recipe_atom) {
             listener.exitExpr_in_recipe_atom(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitExpr_in_recipe_atom) {
            return visitor.visitExpr_in_recipe_atom(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VAR(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.VAR, 0);
    }
    public DOLLAR_LPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.DOLLAR_LPAREN, 0);
    }
    public function_name(): Function_nameContext | null {
        return this.getRuleContext(0, Function_nameContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.RPAREN, 0);
    }
    public ws(): WsContext | null {
        return this.getRuleContext(0, WsContext);
    }
    public arguments(): ArgumentsContext | null {
        return this.getRuleContext(0, ArgumentsContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.COMMA, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.COLON, 0);
    }
    public expressions(): ExpressionsContext | null {
        return this.getRuleContext(0, ExpressionsContext);
    }
    public ASSIGN_OP(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.ASSIGN_OP, 0);
    }
    public DOLLAR_L_CURLY_BRACE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.DOLLAR_L_CURLY_BRACE, 0);
    }
    public R_CURLY_BRACE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.R_CURLY_BRACE, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_function;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterFunction) {
             listener.enterFunction(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitFunction) {
             listener.exitFunction(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitFunction) {
            return visitor.visitFunction(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Function_nameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public function_name_atom(): Function_name_atomContext[];
    public function_name_atom(i: number): Function_name_atomContext | null;
    public function_name_atom(i?: number): Function_name_atomContext[] | Function_name_atomContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Function_name_atomContext);
        }

        return this.getRuleContext(i, Function_name_atomContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_function_name;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterFunction_name) {
             listener.enterFunction_name(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitFunction_name) {
             listener.exitFunction_name(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitFunction_name) {
            return visitor.visitFunction_name(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Function_name_atomContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CHARS(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.CHARS, 0);
    }
    public function(): FunctionContext | null {
        return this.getRuleContext(0, FunctionContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_function_name_atom;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterFunction_name_atom) {
             listener.enterFunction_name_atom(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitFunction_name_atom) {
             listener.exitFunction_name_atom(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitFunction_name_atom) {
            return visitor.visitFunction_name_atom(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArgumentsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public argument(): ArgumentContext[];
    public argument(i: number): ArgumentContext | null;
    public argument(i?: number): ArgumentContext[] | ArgumentContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ArgumentContext);
        }

        return this.getRuleContext(i, ArgumentContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(cbuildParser.COMMA);
    	} else {
    		return this.getToken(cbuildParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_arguments;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterArguments) {
             listener.enterArguments(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitArguments) {
             listener.exitArguments(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitArguments) {
            return visitor.visitArguments(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArgumentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expressions(): ExpressionsContext {
        return this.getRuleContext(0, ExpressionsContext)!;
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_argument;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterArgument) {
             listener.enterArgument(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitArgument) {
             listener.exitArgument(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitArgument) {
            return visitor.visitArgument(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class RuleContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public static_pattern_rule(): Static_pattern_ruleContext | null {
        return this.getRuleContext(0, Static_pattern_ruleContext);
    }
    public targets(): TargetsContext | null {
        return this.getRuleContext(0, TargetsContext);
    }
    public colon(): ColonContext | null {
        return this.getRuleContext(0, ColonContext);
    }
    public prerequisites(): PrerequisitesContext | null {
        return this.getRuleContext(0, PrerequisitesContext);
    }
    public NL(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.NL, 0);
    }
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public PIPE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.PIPE, 0);
    }
    public orderonlyprerequisites(): OrderonlyprerequisitesContext | null {
        return this.getRuleContext(0, OrderonlyprerequisitesContext);
    }
    public recipes(): RecipesContext | null {
        return this.getRuleContext(0, RecipesContext);
    }
    public assignment(): AssignmentContext | null {
        return this.getRuleContext(0, AssignmentContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_rule;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterRule) {
             listener.enterRule(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitRule) {
             listener.exitRule(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitRule) {
            return visitor.visitRule(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Static_pattern_ruleContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public targets(): TargetsContext {
        return this.getRuleContext(0, TargetsContext)!;
    }
    public colon(): ColonContext[];
    public colon(i: number): ColonContext | null;
    public colon(i?: number): ColonContext[] | ColonContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ColonContext);
        }

        return this.getRuleContext(i, ColonContext);
    }
    public pattern(): PatternContext {
        return this.getRuleContext(0, PatternContext)!;
    }
    public prerequisites(): PrerequisitesContext {
        return this.getRuleContext(0, PrerequisitesContext)!;
    }
    public NL(): antlr.TerminalNode {
        return this.getToken(cbuildParser.NL, 0)!;
    }
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public PIPE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.PIPE, 0);
    }
    public orderonlyprerequisites(): OrderonlyprerequisitesContext | null {
        return this.getRuleContext(0, OrderonlyprerequisitesContext);
    }
    public recipes(): RecipesContext | null {
        return this.getRuleContext(0, RecipesContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_static_pattern_rule;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterStatic_pattern_rule) {
             listener.enterStatic_pattern_rule(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitStatic_pattern_rule) {
             listener.exitStatic_pattern_rule(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitStatic_pattern_rule) {
            return visitor.visitStatic_pattern_rule(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TargetContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public pattern(): PatternContext {
        return this.getRuleContext(0, PatternContext)!;
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_target;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterTarget) {
             listener.enterTarget(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitTarget) {
             listener.exitTarget(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitTarget) {
            return visitor.visitTarget(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PatternContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext[];
    public identifier(i: number): IdentifierContext | null;
    public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IdentifierContext);
        }

        return this.getRuleContext(i, IdentifierContext);
    }
    public function_(): FunctionContext[];
    public function_(i: number): FunctionContext | null;
    public function_(i?: number): FunctionContext[] | FunctionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FunctionContext);
        }

        return this.getRuleContext(i, FunctionContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_pattern;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterPattern) {
             listener.enterPattern(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitPattern) {
             listener.exitPattern(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitPattern) {
            return visitor.visitPattern(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PrerequisitesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public targets(): TargetsContext | null {
        return this.getRuleContext(0, TargetsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_prerequisites;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterPrerequisites) {
             listener.enterPrerequisites(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitPrerequisites) {
             listener.exitPrerequisites(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitPrerequisites) {
            return visitor.visitPrerequisites(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class OrderonlyprerequisitesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public targets(): TargetsContext | null {
        return this.getRuleContext(0, TargetsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_orderonlyprerequisites;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterOrderonlyprerequisites) {
             listener.enterOrderonlyprerequisites(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitOrderonlyprerequisites) {
             listener.exitOrderonlyprerequisites(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitOrderonlyprerequisites) {
            return visitor.visitOrderonlyprerequisites(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TargetsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public target(): TargetContext[];
    public target(i: number): TargetContext | null;
    public target(i?: number): TargetContext[] | TargetContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TargetContext);
        }

        return this.getRuleContext(i, TargetContext);
    }
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_targets;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterTargets) {
             listener.enterTargets(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitTargets) {
             listener.exitTargets(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitTargets) {
            return visitor.visitTargets(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class RecipesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public recipe(): RecipeContext[];
    public recipe(i: number): RecipeContext | null;
    public recipe(i?: number): RecipeContext[] | RecipeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RecipeContext);
        }

        return this.getRuleContext(i, RecipeContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_recipes;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterRecipes) {
             listener.enterRecipes(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitRecipes) {
             listener.exitRecipes(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitRecipes) {
            return visitor.visitRecipes(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Recipes_optContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public comment_opt(): Comment_optContext {
        return this.getRuleContext(0, Comment_optContext)!;
    }
    public recipes(): RecipesContext | null {
        return this.getRuleContext(0, RecipesContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_recipes_opt;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterRecipes_opt) {
             listener.enterRecipes_opt(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitRecipes_opt) {
             listener.exitRecipes_opt(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitRecipes_opt) {
            return visitor.visitRecipes_opt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class RecipeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LEADING_TAB(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.LEADING_TAB, 0);
    }
    public exprs_in_recipe(): Exprs_in_recipeContext | null {
        return this.getRuleContext(0, Exprs_in_recipeContext);
    }
    public NL(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.NL, 0);
    }
    public ws(): WsContext | null {
        return this.getRuleContext(0, WsContext);
    }
    public COMMENT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.COMMENT, 0);
    }
    public conditional_in_recipe(): Conditional_in_recipeContext | null {
        return this.getRuleContext(0, Conditional_in_recipeContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_recipe;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterRecipe) {
             listener.enterRecipe(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitRecipe) {
             listener.exitRecipe(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitRecipe) {
            return visitor.visitRecipe(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class SpecifiersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public OVERRIDE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.OVERRIDE, 0);
    }
    public EXPORT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.EXPORT, 0);
    }
    public UNEXPORT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.UNEXPORT, 0);
    }
    public ws(): WsContext | null {
        return this.getRuleContext(0, WsContext);
    }
    public UNDEFINE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.UNDEFINE, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_specifiers;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterSpecifiers) {
             listener.enterSpecifiers(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitSpecifiers) {
             listener.exitSpecifiers(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitSpecifiers) {
            return visitor.visitSpecifiers(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier_atom(): Identifier_atomContext[];
    public identifier_atom(i: number): Identifier_atomContext | null;
    public identifier_atom(i?: number): Identifier_atomContext[] | Identifier_atomContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Identifier_atomContext);
        }

        return this.getRuleContext(i, Identifier_atomContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_identifier;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterIdentifier) {
             listener.enterIdentifier(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitIdentifier) {
             listener.exitIdentifier(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitIdentifier) {
            return visitor.visitIdentifier(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Identifier_atomContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CHARS(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.CHARS, 0);
    }
    public keywords(): KeywordsContext | null {
        return this.getRuleContext(0, KeywordsContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.COMMA, 0);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.RPAREN, 0);
    }
    public L_CURLY_BRACE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.L_CURLY_BRACE, 0);
    }
    public R_CURLY_BRACE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.R_CURLY_BRACE, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_identifier_atom;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterIdentifier_atom) {
             listener.enterIdentifier_atom(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitIdentifier_atom) {
             listener.exitIdentifier_atom(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitIdentifier_atom) {
            return visitor.visitIdentifier_atom(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BrContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public NL(): antlr.TerminalNode {
        return this.getToken(cbuildParser.NL, 0)!;
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_br;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterBr) {
             listener.enterBr(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitBr) {
             listener.exitBr(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitBr) {
            return visitor.visitBr(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CharContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CHARS(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.CHARS, 0);
    }
    public SLIT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.SLIT, 0);
    }
    public ESCAPED_QUOTE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.ESCAPED_QUOTE, 0);
    }
    public BACKSLASH(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.BACKSLASH, 0);
    }
    public ASSIGN_OP(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.ASSIGN_OP, 0);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.COLON, 0);
    }
    public DOUBLE_DOLLAR(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.DOUBLE_DOLLAR, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_char;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterChar) {
             listener.enterChar(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitChar) {
             listener.exitChar(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitChar) {
            return visitor.visitChar(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Char_nestedContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public char(): CharContext | null {
        return this.getRuleContext(0, CharContext);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.COMMA, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_char_nested;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterChar_nested) {
             listener.enterChar_nested(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitChar_nested) {
             listener.exitChar_nested(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitChar_nested) {
            return visitor.visitChar_nested(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Char_in_assignContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public char_nested(): Char_nestedContext | null {
        return this.getRuleContext(0, Char_nestedContext);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.RPAREN, 0);
    }
    public L_CURLY_BRACE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.L_CURLY_BRACE, 0);
    }
    public R_CURLY_BRACE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.R_CURLY_BRACE, 0);
    }
    public keywords(): KeywordsContext | null {
        return this.getRuleContext(0, KeywordsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_char_in_assign;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterChar_in_assign) {
             listener.enterChar_in_assign(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitChar_in_assign) {
             listener.exitChar_in_assign(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitChar_in_assign) {
            return visitor.visitChar_in_assign(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Char_in_defContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public char(): CharContext | null {
        return this.getRuleContext(0, CharContext);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.RPAREN, 0);
    }
    public L_CURLY_BRACE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.L_CURLY_BRACE, 0);
    }
    public R_CURLY_BRACE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.R_CURLY_BRACE, 0);
    }
    public COMMA(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.COMMA, 0);
    }
    public COMMENT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.COMMENT, 0);
    }
    public INCLUDE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.INCLUDE, 0);
    }
    public OVERRIDE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.OVERRIDE, 0);
    }
    public EXPORT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.EXPORT, 0);
    }
    public UNEXPORT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.UNEXPORT, 0);
    }
    public IFDEF(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.IFDEF, 0);
    }
    public IFNDEF(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.IFNDEF, 0);
    }
    public IFEQ(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.IFEQ, 0);
    }
    public IFNEQ(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.IFNEQ, 0);
    }
    public ELSE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.ELSE, 0);
    }
    public ENDIF(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.ENDIF, 0);
    }
    public DEFINE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.DEFINE, 0);
    }
    public UNDEFINE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.UNDEFINE, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_char_in_def;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterChar_in_def) {
             listener.enterChar_in_def(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitChar_in_def) {
             listener.exitChar_in_def(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitChar_in_def) {
            return visitor.visitChar_in_def(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Char_in_recipeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public char_in_assign(): Char_in_assignContext | null {
        return this.getRuleContext(0, Char_in_assignContext);
    }
    public COMMENT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.COMMENT, 0);
    }
    public PIPE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.PIPE, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_char_in_recipe;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterChar_in_recipe) {
             listener.enterChar_in_recipe(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitChar_in_recipe) {
             listener.exitChar_in_recipe(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitChar_in_recipe) {
            return visitor.visitChar_in_recipe(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TextContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public char(): CharContext[];
    public char(i: number): CharContext | null;
    public char(i?: number): CharContext[] | CharContext | null {
        if (i === undefined) {
            return this.getRuleContexts(CharContext);
        }

        return this.getRuleContext(i, CharContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_text;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterText) {
             listener.enterText(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitText) {
             listener.exitText(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitText) {
            return visitor.visitText(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Text_nestedContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public char_nested(): Char_nestedContext[];
    public char_nested(i: number): Char_nestedContext | null;
    public char_nested(i?: number): Char_nestedContext[] | Char_nestedContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Char_nestedContext);
        }

        return this.getRuleContext(i, Char_nestedContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_text_nested;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterText_nested) {
             listener.enterText_nested(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitText_nested) {
             listener.exitText_nested(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitText_nested) {
            return visitor.visitText_nested(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Text_in_assignContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public char_in_assign(): Char_in_assignContext[];
    public char_in_assign(i: number): Char_in_assignContext | null;
    public char_in_assign(i?: number): Char_in_assignContext[] | Char_in_assignContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Char_in_assignContext);
        }

        return this.getRuleContext(i, Char_in_assignContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_text_in_assign;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterText_in_assign) {
             listener.enterText_in_assign(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitText_in_assign) {
             listener.exitText_in_assign(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitText_in_assign) {
            return visitor.visitText_in_assign(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Text_in_recipeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public char_in_recipe(): Char_in_recipeContext[];
    public char_in_recipe(i: number): Char_in_recipeContext | null;
    public char_in_recipe(i?: number): Char_in_recipeContext[] | Char_in_recipeContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Char_in_recipeContext);
        }

        return this.getRuleContext(i, Char_in_recipeContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_text_in_recipe;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterText_in_recipe) {
             listener.enterText_in_recipe(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitText_in_recipe) {
             listener.exitText_in_recipe(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitText_in_recipe) {
            return visitor.visitText_in_recipe(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class KeywordsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INCLUDE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.INCLUDE, 0);
    }
    public OVERRIDE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.OVERRIDE, 0);
    }
    public EXPORT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.EXPORT, 0);
    }
    public UNEXPORT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.UNEXPORT, 0);
    }
    public IFDEF(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.IFDEF, 0);
    }
    public IFNDEF(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.IFNDEF, 0);
    }
    public IFEQ(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.IFEQ, 0);
    }
    public IFNEQ(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.IFNEQ, 0);
    }
    public ELSE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.ELSE, 0);
    }
    public ENDIF(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.ENDIF, 0);
    }
    public DEFINE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.DEFINE, 0);
    }
    public ENDEF(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.ENDEF, 0);
    }
    public UNDEFINE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.UNDEFINE, 0);
    }
    public VPATH(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.VPATH, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_keywords;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterKeywords) {
             listener.enterKeywords(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitKeywords) {
             listener.exitKeywords(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitKeywords) {
            return visitor.visitKeywords(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ColonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.COLON, 0);
    }
    public DOUBLE_COLON(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.DOUBLE_COLON, 0);
    }
    public GROUPED_COLON(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.GROUPED_COLON, 0);
    }
    public GROUPED_DOUBLE_COLON(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.GROUPED_DOUBLE_COLON, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_colon;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterColon) {
             listener.enterColon(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitColon) {
             listener.exitColon(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitColon) {
            return visitor.visitColon(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Comment_optContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public COMMENT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.COMMENT, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_comment_opt;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterComment_opt) {
             listener.enterComment_opt(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitComment_opt) {
             listener.exitComment_opt(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitComment_opt) {
            return visitor.visitComment_opt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class WsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WS(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.WS, 0);
    }
    public TAB(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.TAB, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_ws;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterWs) {
             listener.enterWs(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitWs) {
             listener.exitWs(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitWs) {
            return visitor.visitWs(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class HookContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public HOOK(): antlr.TerminalNode {
        return this.getToken(cbuildParser.HOOK, 0)!;
    }
    public L_CURLY_BRACE(): antlr.TerminalNode {
        return this.getToken(cbuildParser.L_CURLY_BRACE, 0)!;
    }
    public hook_program(): Hook_programContext {
        return this.getRuleContext(0, Hook_programContext)!;
    }
    public R_CURLY_BRACE(): antlr.TerminalNode {
        return this.getToken(cbuildParser.R_CURLY_BRACE, 0)!;
    }
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_hook;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterHook) {
             listener.enterHook(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitHook) {
             listener.exitHook(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitHook) {
            return visitor.visitHook(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Hook_programContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_hook_program;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterHook_program) {
             listener.enterHook_program(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitHook_program) {
             listener.exitHook_program(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitHook_program) {
            return visitor.visitHook_program(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
