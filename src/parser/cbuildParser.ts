
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
    public static readonly BACKSLASH = 16;
    public static readonly PLUS = 17;
    public static readonly QUESTION = 18;
    public static readonly BANG = 19;
    public static readonly INCLUDE = 20;
    public static readonly DASH_INCLUDE = 21;
    public static readonly SINCLUDE = 22;
    public static readonly ENDEF = 23;
    public static readonly IFDEF = 24;
    public static readonly IFNDEF = 25;
    public static readonly IFEQ = 26;
    public static readonly IFNEQ = 27;
    public static readonly ELSE = 28;
    public static readonly ENDIF = 29;
    public static readonly OVERRIDE = 30;
    public static readonly EXPORT = 31;
    public static readonly UNEXPORT = 32;
    public static readonly UNDEFINE = 33;
    public static readonly DEFINE = 34;
    public static readonly VPATH = 35;
    public static readonly HOOK = 36;
    public static readonly CHARS = 37;
    public static readonly NL = 38;
    public static readonly LEADING_TAB = 39;
    public static readonly WS = 40;
    public static readonly TAB = 41;
    public static readonly COMMENT = 42;
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
        "':'", "'('", "')'", "'{'", "'}'", "','", "'|'", "'\\'", "'+'", 
        "'?'", "'!'", "'include'", "'-include'", "'sinclude'", "'endef'", 
        "'ifdef'", "'ifndef'", "'ifeq'", "'ifneq'", "'else'", "'endif'", 
        "'override'", "'export'", "'unexport'", "'undefine'", "'define'", 
        "'vpath'", "'hook'", null, null, null, null, "'\\t'"
    ];

    public static readonly symbolicNames = [
        null, "ASSIGN_OP", "DOLLAR_LPAREN", "DOLLAR_L_CURLY_BRACE", "VAR", 
        "DOUBLE_DOLLAR", "GROUPED_DOUBLE_COLON", "GROUPED_COLON", "DOUBLE_COLON", 
        "COLON", "LPAREN", "RPAREN", "L_CURLY_BRACE", "R_CURLY_BRACE", "COMMA", 
        "PIPE", "BACKSLASH", "PLUS", "QUESTION", "BANG", "INCLUDE", "DASH_INCLUDE", 
        "SINCLUDE", "ENDEF", "IFDEF", "IFNDEF", "IFEQ", "IFNEQ", "ELSE", 
        "ENDIF", "OVERRIDE", "EXPORT", "UNEXPORT", "UNDEFINE", "DEFINE", 
        "VPATH", "HOOK", "CHARS", "NL", "LEADING_TAB", "WS", "TAB", "COMMENT"
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
                if (_la === 40 || _la === 41) {
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
            if (((((_la - 30)) & ~0x1F) === 0 && ((1 << (_la - 30)) & 15) !== 0)) {
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
            if (_la === 40 || _la === 41) {
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
            while (((((_la - 30)) & ~0x1F) === 0 && ((1 << (_la - 30)) & 4383) !== 0)) {
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
                if (_la === 40 || _la === 41) {
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
            if (_la === 40 || _la === 41) {
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
            if (_la === 40 || _la === 41) {
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
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
            case cbuildParser.LPAREN:
            case cbuildParser.RPAREN:
            case cbuildParser.L_CURLY_BRACE:
            case cbuildParser.R_CURLY_BRACE:
            case cbuildParser.COMMA:
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 460;
                this.pattern();
                this.state = 462;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
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
            case cbuildParser.OVERRIDE:
            case cbuildParser.EXPORT:
            case cbuildParser.UNEXPORT:
            case cbuildParser.UNDEFINE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 470;
                this.assignment_prefix();
                this.state = 472;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
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
            if(!(_la === 26 || _la === 27)) {
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
            if(!(_la === 24 || _la === 25)) {
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
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 7340032) !== 0))) {
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
        try {
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
            this.state = 499;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288611902) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 815) !== 0)) {
                {
                this.state = 498;
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
            this.state = 502;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 501;
                this.ws();
                }
            }

            this.state = 504;
            this.expression();
            this.state = 506;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 66, this.context) ) {
            case 1:
                {
                this.state = 505;
                this.ws();
                }
                break;
            }
            this.state = 513;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 67, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 508;
                    this.ws();
                    this.state = 509;
                    this.expression();
                    }
                    }
                }
                this.state = 515;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 67, this.context);
            }
            this.state = 517;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 516;
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
            this.state = 520;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 519;
                this.ws();
                }
            }

            this.state = 522;
            this.expr_nested();
            this.state = 524;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 70, this.context) ) {
            case 1:
                {
                this.state = 523;
                this.ws();
                }
                break;
            }
            this.state = 531;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 71, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 526;
                    this.ws();
                    this.state = 527;
                    this.expr_nested();
                    }
                    }
                }
                this.state = 533;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 71, this.context);
            }
            this.state = 535;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 534;
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
            this.state = 538;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 537;
                this.ws();
                }
            }

            this.state = 540;
            this.expr_in_assign();
            this.state = 542;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 74, this.context) ) {
            case 1:
                {
                this.state = 541;
                this.ws();
                }
                break;
            }
            this.state = 549;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 544;
                    this.ws();
                    this.state = 545;
                    this.expr_in_assign();
                    }
                    }
                }
                this.state = 551;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
            }
            this.state = 553;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context) ) {
            case 1:
                {
                this.state = 552;
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
            this.state = 556;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 555;
                this.ws();
                }
            }

            this.state = 558;
            this.expr_in_recipe();
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
            this.state = 567;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 562;
                    this.ws();
                    this.state = 563;
                    this.expr_in_recipe();
                    }
                    }
                }
                this.state = 569;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
            }
            this.state = 571;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 570;
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
            this.state = 590;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 573;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 575;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 38) {
                    {
                    this.state = 574;
                    this.br();
                    }
                }

                this.state = 577;
                this.first_expr_in_def();
                this.state = 587;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        this.state = 585;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
                        case 1:
                            {
                            {
                            this.state = 578;
                            this.br();
                            this.state = 579;
                            this.first_expr_in_def();
                            }
                            }
                            break;
                        case 2:
                            {
                            {
                            this.state = 581;
                            this.br();
                            }
                            }
                            break;
                        case 3:
                            {
                            {
                            this.state = 582;
                            this.ws();
                            this.state = 583;
                            this.expr_in_recipe();
                            }
                            }
                            break;
                        }
                        }
                    }
                    this.state = 589;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
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
            this.state = 594;
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
            case cbuildParser.BACKSLASH:
            case cbuildParser.PLUS:
            case cbuildParser.QUESTION:
            case cbuildParser.BANG:
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
            case cbuildParser.COMMENT:
                {
                this.state = 592;
                this.char_in_def();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                {
                this.state = 593;
                this.function_();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 597;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288675390) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1071) !== 0)) {
                {
                this.state = 596;
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
            this.state = 600;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 599;
                this.expression_atom();
                }
                }
                this.state = 602;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288611902) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 47) !== 0));
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
            this.state = 610;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.BACKSLASH:
            case cbuildParser.PLUS:
            case cbuildParser.QUESTION:
            case cbuildParser.BANG:
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
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 604;
                this.text();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 605;
                this.function_();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 606;
                this.match(cbuildParser.LPAREN);
                this.state = 607;
                this.exprs_nested();
                this.state = 608;
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
            this.state = 613;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 612;
                this.expr_nested_atom();
                }
                }
                this.state = 615;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288628286) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 47) !== 0));
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
            this.state = 623;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.COMMA:
            case cbuildParser.BACKSLASH:
            case cbuildParser.PLUS:
            case cbuildParser.QUESTION:
            case cbuildParser.BANG:
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
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 617;
                this.text_nested();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 618;
                this.function_();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 619;
                this.match(cbuildParser.LPAREN);
                this.state = 620;
                this.exprs_nested();
                this.state = 621;
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
            this.state = 626;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 625;
                this.expr_in_assign_atom();
                }
                }
                this.state = 628;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288675390) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 47) !== 0));
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
            this.state = 632;
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
            case cbuildParser.BACKSLASH:
            case cbuildParser.PLUS:
            case cbuildParser.QUESTION:
            case cbuildParser.BANG:
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
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 630;
                this.text_in_assign();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 631;
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
            this.state = 635;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 634;
                this.expr_in_recipe_atom();
                }
                }
                this.state = 637;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288675390) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1071) !== 0));
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
            this.state = 641;
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
            case cbuildParser.BACKSLASH:
            case cbuildParser.PLUS:
            case cbuildParser.QUESTION:
            case cbuildParser.BANG:
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
            case cbuildParser.COMMENT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 639;
                this.text_in_recipe();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 640;
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
            this.state = 700;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 643;
                this.match(cbuildParser.VAR);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 644;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 645;
                this.function_name();
                this.state = 646;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 648;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 649;
                this.function_name();
                this.state = 650;
                this.ws();
                this.state = 651;
                this.arguments();
                this.state = 652;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 654;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 655;
                this.function_name();
                this.state = 656;
                this.match(cbuildParser.COMMA);
                this.state = 657;
                this.arguments();
                this.state = 658;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 660;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 661;
                this.function_name();
                this.state = 662;
                this.match(cbuildParser.COLON);
                this.state = 663;
                this.expressions();
                this.state = 664;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 666;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 667;
                this.function_name();
                this.state = 668;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 669;
                this.expressions();
                this.state = 670;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 672;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 673;
                this.function_name();
                this.state = 674;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 676;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 677;
                this.function_name();
                this.state = 678;
                this.ws();
                this.state = 679;
                this.arguments();
                this.state = 680;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 682;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 683;
                this.function_name();
                this.state = 684;
                this.match(cbuildParser.COMMA);
                this.state = 685;
                this.arguments();
                this.state = 686;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 688;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 689;
                this.function_name();
                this.state = 690;
                this.match(cbuildParser.COLON);
                this.state = 691;
                this.expressions();
                this.state = 692;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 694;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 695;
                this.function_name();
                this.state = 696;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 697;
                this.expressions();
                this.state = 698;
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
            this.state = 703;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 702;
                this.function_name_atom();
                }
                }
                this.state = 705;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 28) !== 0) || _la === 37);
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
            this.state = 709;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 707;
                this.match(cbuildParser.CHARS);
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 708;
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
            this.state = 712;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288611902) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 815) !== 0)) {
                {
                this.state = 711;
                this.argument();
                }
            }

            this.state = 720;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 14) {
                {
                {
                this.state = 714;
                this.match(cbuildParser.COMMA);
                this.state = 716;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288611902) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 815) !== 0)) {
                    {
                    this.state = 715;
                    this.argument();
                    }
                }

                }
                }
                this.state = 722;
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
            this.state = 723;
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
            this.state = 766;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 725;
                this.static_pattern_rule();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 726;
                this.targets();
                this.state = 728;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 727;
                    this.ws();
                    }
                }

                this.state = 730;
                this.colon();
                this.state = 732;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 102, this.context) ) {
                case 1:
                    {
                    this.state = 731;
                    this.ws();
                    }
                    break;
                }
                this.state = 734;
                this.prerequisites();
                this.state = 743;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 105, this.context) ) {
                case 1:
                    {
                    this.state = 736;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 40 || _la === 41) {
                        {
                        this.state = 735;
                        this.ws();
                        }
                    }

                    this.state = 738;
                    this.match(cbuildParser.PIPE);
                    this.state = 740;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 104, this.context) ) {
                    case 1:
                        {
                        this.state = 739;
                        this.ws();
                        }
                        break;
                    }
                    this.state = 742;
                    this.orderonlyprerequisites();
                    }
                    break;
                }
                this.state = 746;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 745;
                    this.ws();
                    }
                }

                this.state = 748;
                this.match(cbuildParser.NL);
                this.state = 750;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 107, this.context) ) {
                case 1:
                    {
                    this.state = 749;
                    this.recipes();
                    }
                    break;
                }
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 752;
                this.targets();
                this.state = 754;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 753;
                    this.ws();
                    }
                }

                this.state = 756;
                this.colon();
                this.state = 758;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 757;
                    this.ws();
                    }
                }

                this.state = 760;
                this.assignment();
                this.state = 762;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 761;
                    this.ws();
                    }
                }

                this.state = 764;
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
            this.state = 768;
            this.targets();
            this.state = 770;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 769;
                this.ws();
                }
            }

            this.state = 772;
            this.colon();
            this.state = 774;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 773;
                this.ws();
                }
            }

            this.state = 776;
            this.pattern();
            this.state = 778;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 777;
                this.ws();
                }
            }

            this.state = 780;
            this.colon();
            this.state = 782;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 115, this.context) ) {
            case 1:
                {
                this.state = 781;
                this.ws();
                }
                break;
            }
            this.state = 784;
            this.prerequisites();
            this.state = 793;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 118, this.context) ) {
            case 1:
                {
                this.state = 786;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 785;
                    this.ws();
                    }
                }

                this.state = 788;
                this.match(cbuildParser.PIPE);
                this.state = 790;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 117, this.context) ) {
                case 1:
                    {
                    this.state = 789;
                    this.ws();
                    }
                    break;
                }
                this.state = 792;
                this.orderonlyprerequisites();
                }
                break;
            }
            this.state = 796;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 795;
                this.ws();
                }
            }

            this.state = 798;
            this.match(cbuildParser.NL);
            this.state = 800;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 120, this.context) ) {
            case 1:
                {
                this.state = 799;
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
            this.state = 802;
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
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 806;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 806;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case cbuildParser.LPAREN:
                case cbuildParser.RPAREN:
                case cbuildParser.L_CURLY_BRACE:
                case cbuildParser.R_CURLY_BRACE:
                case cbuildParser.COMMA:
                case cbuildParser.CHARS:
                    {
                    this.state = 804;
                    this.identifier();
                    }
                    break;
                case cbuildParser.DOLLAR_LPAREN:
                case cbuildParser.DOLLAR_L_CURLY_BRACE:
                case cbuildParser.VAR:
                    {
                    this.state = 805;
                    this.function_();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 808;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 31772) !== 0) || _la === 37);
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
            this.state = 811;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 31772) !== 0) || _la === 37) {
                {
                this.state = 810;
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
            this.state = 814;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 31772) !== 0) || _la === 37) {
                {
                this.state = 813;
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
            this.state = 816;
            this.target();
            this.state = 822;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 125, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 817;
                    this.ws();
                    this.state = 818;
                    this.target();
                    }
                    }
                }
                this.state = 824;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 125, this.context);
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
            this.state = 826;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 825;
                    this.recipe();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 828;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 126, this.context);
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
            this.state = 830;
            this.comment_opt();
            this.state = 832;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 24)) & ~0x1F) === 0 && ((1 << (_la - 24)) & 507919) !== 0)) {
                {
                this.state = 831;
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
            this.state = 854;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 131, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 834;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 836;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 128, this.context) ) {
                case 1:
                    {
                    this.state = 835;
                    this.ws();
                    }
                    break;
                }
                this.state = 838;
                this.exprs_in_recipe();
                this.state = 839;
                this.match(cbuildParser.NL);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 841;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 843;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 842;
                    this.ws();
                    }
                }

                this.state = 845;
                this.match(cbuildParser.COMMENT);
                this.state = 846;
                this.match(cbuildParser.NL);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 848;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 847;
                    this.ws();
                    }
                }

                this.state = 850;
                this.match(cbuildParser.COMMENT);
                this.state = 851;
                this.match(cbuildParser.NL);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 852;
                this.conditional_in_recipe();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 853;
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
            this.state = 876;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 132, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 856;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 857;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 858;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 859;
                this.match(cbuildParser.OVERRIDE);
                this.state = 860;
                this.ws();
                this.state = 861;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 863;
                this.match(cbuildParser.EXPORT);
                this.state = 864;
                this.ws();
                this.state = 865;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 867;
                this.match(cbuildParser.UNDEFINE);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 868;
                this.match(cbuildParser.OVERRIDE);
                this.state = 869;
                this.ws();
                this.state = 870;
                this.match(cbuildParser.UNDEFINE);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 872;
                this.match(cbuildParser.UNDEFINE);
                this.state = 873;
                this.ws();
                this.state = 874;
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
            this.state = 879;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 878;
                    this.identifier_atom();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 881;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 133, this.context);
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
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 883;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 10)) & ~0x1F) === 0 && ((1 << (_la - 10)) & 134217759) !== 0))) {
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
    public br(): BrContext {
        let localContext = new BrContext(this.context, this.state);
        this.enterRule(localContext, 104, cbuildParser.RULE_br);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 885;
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
        try {
            this.state = 896;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 887;
                this.match(cbuildParser.CHARS);
                }
                break;
            case cbuildParser.BACKSLASH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 888;
                this.match(cbuildParser.BACKSLASH);
                }
                break;
            case cbuildParser.ASSIGN_OP:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 889;
                this.match(cbuildParser.ASSIGN_OP);
                }
                break;
            case cbuildParser.COLON:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 890;
                this.match(cbuildParser.COLON);
                }
                break;
            case cbuildParser.DOUBLE_DOLLAR:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 891;
                this.match(cbuildParser.DOUBLE_DOLLAR);
                }
                break;
            case cbuildParser.PLUS:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 892;
                this.match(cbuildParser.PLUS);
                }
                break;
            case cbuildParser.QUESTION:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 893;
                this.match(cbuildParser.QUESTION);
                }
                break;
            case cbuildParser.BANG:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 894;
                this.match(cbuildParser.BANG);
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
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 895;
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
    public char_nested(): Char_nestedContext {
        let localContext = new Char_nestedContext(this.context, this.state);
        this.enterRule(localContext, 108, cbuildParser.RULE_char_nested);
        try {
            this.state = 900;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.BACKSLASH:
            case cbuildParser.PLUS:
            case cbuildParser.QUESTION:
            case cbuildParser.BANG:
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
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 898;
                this.char();
                }
                break;
            case cbuildParser.COMMA:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 899;
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
            this.state = 909;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 136, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 902;
                this.char_nested();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 903;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 904;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 905;
                this.match(cbuildParser.L_CURLY_BRACE);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 906;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 907;
                this.match(cbuildParser.PIPE);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 908;
                this.keywords();
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
    public char_in_def(): Char_in_defContext {
        let localContext = new Char_in_defContext(this.context, this.state);
        this.enterRule(localContext, 112, cbuildParser.RULE_char_in_def);
        try {
            this.state = 930;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 137, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 911;
                this.char();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 912;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 913;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 914;
                this.match(cbuildParser.L_CURLY_BRACE);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 915;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 916;
                this.match(cbuildParser.COMMA);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 917;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 918;
                this.match(cbuildParser.INCLUDE);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 919;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 920;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 921;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 922;
                this.match(cbuildParser.IFDEF);
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 923;
                this.match(cbuildParser.IFNDEF);
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 924;
                this.match(cbuildParser.IFEQ);
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 925;
                this.match(cbuildParser.IFNEQ);
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 926;
                this.match(cbuildParser.ELSE);
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 927;
                this.match(cbuildParser.ENDIF);
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 928;
                this.match(cbuildParser.DEFINE);
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 929;
                this.match(cbuildParser.UNDEFINE);
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
    public char_in_recipe(): Char_in_recipeContext {
        let localContext = new Char_in_recipeContext(this.context, this.state);
        this.enterRule(localContext, 114, cbuildParser.RULE_char_in_recipe);
        try {
            this.state = 935;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 138, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 932;
                this.char_in_assign();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 933;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 934;
                this.match(cbuildParser.PIPE);
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
    public text(): TextContext {
        let localContext = new TextContext(this.context, this.state);
        this.enterRule(localContext, 116, cbuildParser.RULE_text);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 938;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 937;
                    this.char();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 940;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 139, this.context);
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
            this.state = 943;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 942;
                    this.char_nested();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 945;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 140, this.context);
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
            this.state = 948;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 947;
                    this.char_in_assign();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 950;
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
    public text_in_recipe(): Text_in_recipeContext {
        let localContext = new Text_in_recipeContext(this.context, this.state);
        this.enterRule(localContext, 122, cbuildParser.RULE_text_in_recipe);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 953;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 952;
                    this.char_in_recipe();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 955;
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
    public keywords(): KeywordsContext {
        let localContext = new KeywordsContext(this.context, this.state);
        this.enterRule(localContext, 124, cbuildParser.RULE_keywords);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 957;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 20)) & ~0x1F) === 0 && ((1 << (_la - 20)) & 65529) !== 0))) {
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
            this.state = 959;
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
            this.state = 962;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 143, this.context) ) {
            case 1:
                {
                this.state = 961;
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
            this.state = 964;
            _la = this.tokenStream.LA(1);
            if(!(_la === 40 || _la === 41)) {
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
            this.state = 966;
            this.match(cbuildParser.HOOK);
            this.state = 968;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 967;
                this.ws();
                }
            }

            this.state = 970;
            this.match(cbuildParser.L_CURLY_BRACE);
            this.state = 971;
            this.hook_program();
            this.state = 972;
            this.match(cbuildParser.R_CURLY_BRACE);
            this.state = 974;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 145, this.context) ) {
            case 1:
                {
                this.state = 973;
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
            this.state = 979;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 146, this.context);
            while (alternative !== 1 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1 + 1) {
                    {
                    {
                    this.state = 976;
                    this.matchWildcard();
                    }
                    }
                }
                this.state = 981;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 146, this.context);
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
        4,1,42,983,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
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
        1,15,1,16,1,16,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,19,3,19,
        500,8,19,1,20,3,20,503,8,20,1,20,1,20,3,20,507,8,20,1,20,1,20,1,
        20,5,20,512,8,20,10,20,12,20,515,9,20,1,20,3,20,518,8,20,1,21,3,
        21,521,8,21,1,21,1,21,3,21,525,8,21,1,21,1,21,1,21,5,21,530,8,21,
        10,21,12,21,533,9,21,1,21,3,21,536,8,21,1,22,3,22,539,8,22,1,22,
        1,22,3,22,543,8,22,1,22,1,22,1,22,5,22,548,8,22,10,22,12,22,551,
        9,22,1,22,3,22,554,8,22,1,23,3,23,557,8,23,1,23,1,23,3,23,561,8,
        23,1,23,1,23,1,23,5,23,566,8,23,10,23,12,23,569,9,23,1,23,3,23,572,
        8,23,1,24,1,24,3,24,576,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,
        1,24,5,24,586,8,24,10,24,12,24,589,9,24,3,24,591,8,24,1,25,1,25,
        3,25,595,8,25,1,25,3,25,598,8,25,1,26,4,26,601,8,26,11,26,12,26,
        602,1,27,1,27,1,27,1,27,1,27,1,27,3,27,611,8,27,1,28,4,28,614,8,
        28,11,28,12,28,615,1,29,1,29,1,29,1,29,1,29,1,29,3,29,624,8,29,1,
        30,4,30,627,8,30,11,30,12,30,628,1,31,1,31,3,31,633,8,31,1,32,4,
        32,636,8,32,11,32,12,32,637,1,33,1,33,3,33,642,8,33,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,3,34,701,8,34,1,35,4,35,704,8,35,11,35,12,35,705,1,
        36,1,36,3,36,710,8,36,1,37,3,37,713,8,37,1,37,1,37,3,37,717,8,37,
        5,37,719,8,37,10,37,12,37,722,9,37,1,38,1,38,1,39,1,39,1,39,3,39,
        729,8,39,1,39,1,39,3,39,733,8,39,1,39,1,39,3,39,737,8,39,1,39,1,
        39,3,39,741,8,39,1,39,3,39,744,8,39,1,39,3,39,747,8,39,1,39,1,39,
        3,39,751,8,39,1,39,1,39,3,39,755,8,39,1,39,1,39,3,39,759,8,39,1,
        39,1,39,3,39,763,8,39,1,39,1,39,3,39,767,8,39,1,40,1,40,3,40,771,
        8,40,1,40,1,40,3,40,775,8,40,1,40,1,40,3,40,779,8,40,1,40,1,40,3,
        40,783,8,40,1,40,1,40,3,40,787,8,40,1,40,1,40,3,40,791,8,40,1,40,
        3,40,794,8,40,1,40,3,40,797,8,40,1,40,1,40,3,40,801,8,40,1,41,1,
        41,1,42,1,42,4,42,807,8,42,11,42,12,42,808,1,43,3,43,812,8,43,1,
        44,3,44,815,8,44,1,45,1,45,1,45,1,45,5,45,821,8,45,10,45,12,45,824,
        9,45,1,46,4,46,827,8,46,11,46,12,46,828,1,47,1,47,3,47,833,8,47,
        1,48,1,48,3,48,837,8,48,1,48,1,48,1,48,1,48,1,48,3,48,844,8,48,1,
        48,1,48,1,48,3,48,849,8,48,1,48,1,48,1,48,1,48,3,48,855,8,48,1,49,
        1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,
        1,49,1,49,1,49,1,49,1,49,1,49,3,49,877,8,49,1,50,4,50,880,8,50,11,
        50,12,50,881,1,51,1,51,1,52,1,52,1,53,1,53,1,53,1,53,1,53,1,53,1,
        53,1,53,1,53,3,53,897,8,53,1,54,1,54,3,54,901,8,54,1,55,1,55,1,55,
        1,55,1,55,1,55,1,55,3,55,910,8,55,1,56,1,56,1,56,1,56,1,56,1,56,
        1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,
        3,56,931,8,56,1,57,1,57,1,57,3,57,936,8,57,1,58,4,58,939,8,58,11,
        58,12,58,940,1,59,4,59,944,8,59,11,59,12,59,945,1,60,4,60,949,8,
        60,11,60,12,60,950,1,61,4,61,954,8,61,11,61,12,61,955,1,62,1,62,
        1,63,1,63,1,64,3,64,963,8,64,1,65,1,65,1,66,1,66,3,66,969,8,66,1,
        66,1,66,1,66,1,66,3,66,975,8,66,1,67,5,67,978,8,67,10,67,12,67,981,
        9,67,1,67,1,979,0,68,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,
        32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,
        76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,
        114,116,118,120,122,124,126,128,130,132,134,0,7,1,0,26,27,1,0,24,
        25,1,0,20,22,2,0,10,14,37,37,2,0,20,20,23,35,1,0,6,9,1,0,40,41,1131,
        0,140,1,0,0,0,2,147,1,0,0,0,4,272,1,0,0,0,6,342,1,0,0,0,8,344,1,
        0,0,0,10,394,1,0,0,0,12,397,1,0,0,0,14,419,1,0,0,0,16,430,1,0,0,
        0,18,432,1,0,0,0,20,444,1,0,0,0,22,446,1,0,0,0,24,453,1,0,0,0,26,
        480,1,0,0,0,28,482,1,0,0,0,30,486,1,0,0,0,32,488,1,0,0,0,34,490,
        1,0,0,0,36,492,1,0,0,0,38,499,1,0,0,0,40,502,1,0,0,0,42,520,1,0,
        0,0,44,538,1,0,0,0,46,556,1,0,0,0,48,590,1,0,0,0,50,594,1,0,0,0,
        52,600,1,0,0,0,54,610,1,0,0,0,56,613,1,0,0,0,58,623,1,0,0,0,60,626,
        1,0,0,0,62,632,1,0,0,0,64,635,1,0,0,0,66,641,1,0,0,0,68,700,1,0,
        0,0,70,703,1,0,0,0,72,709,1,0,0,0,74,712,1,0,0,0,76,723,1,0,0,0,
        78,766,1,0,0,0,80,768,1,0,0,0,82,802,1,0,0,0,84,806,1,0,0,0,86,811,
        1,0,0,0,88,814,1,0,0,0,90,816,1,0,0,0,92,826,1,0,0,0,94,830,1,0,
        0,0,96,854,1,0,0,0,98,876,1,0,0,0,100,879,1,0,0,0,102,883,1,0,0,
        0,104,885,1,0,0,0,106,896,1,0,0,0,108,900,1,0,0,0,110,909,1,0,0,
        0,112,930,1,0,0,0,114,935,1,0,0,0,116,938,1,0,0,0,118,943,1,0,0,
        0,120,948,1,0,0,0,122,953,1,0,0,0,124,957,1,0,0,0,126,959,1,0,0,
        0,128,962,1,0,0,0,130,964,1,0,0,0,132,966,1,0,0,0,134,979,1,0,0,
        0,136,137,3,2,1,0,137,138,5,0,0,1,138,141,1,0,0,0,139,141,5,0,0,
        1,140,136,1,0,0,0,140,139,1,0,0,0,141,1,1,0,0,0,142,146,3,10,5,0,
        143,146,3,104,52,0,144,146,3,130,65,0,145,142,1,0,0,0,145,143,1,
        0,0,0,145,144,1,0,0,0,146,149,1,0,0,0,147,145,1,0,0,0,147,148,1,
        0,0,0,148,3,1,0,0,0,149,147,1,0,0,0,150,152,3,30,15,0,151,153,3,
        130,65,0,152,151,1,0,0,0,152,153,1,0,0,0,153,154,1,0,0,0,154,156,
        3,36,18,0,155,157,3,130,65,0,156,155,1,0,0,0,156,157,1,0,0,0,157,
        158,1,0,0,0,158,160,3,8,4,0,159,161,3,130,65,0,160,159,1,0,0,0,160,
        161,1,0,0,0,161,162,1,0,0,0,162,164,5,29,0,0,163,165,3,130,65,0,
        164,163,1,0,0,0,164,165,1,0,0,0,165,166,1,0,0,0,166,167,3,128,64,
        0,167,168,3,104,52,0,168,273,1,0,0,0,169,171,3,30,15,0,170,172,3,
        130,65,0,171,170,1,0,0,0,171,172,1,0,0,0,172,173,1,0,0,0,173,175,
        3,36,18,0,174,176,3,130,65,0,175,174,1,0,0,0,175,176,1,0,0,0,176,
        177,1,0,0,0,177,179,3,8,4,0,178,180,3,130,65,0,179,178,1,0,0,0,179,
        180,1,0,0,0,180,181,1,0,0,0,181,183,5,28,0,0,182,184,3,130,65,0,
        183,182,1,0,0,0,183,184,1,0,0,0,184,185,1,0,0,0,185,187,3,8,4,0,
        186,188,3,130,65,0,187,186,1,0,0,0,187,188,1,0,0,0,188,189,1,0,0,
        0,189,190,5,29,0,0,190,191,3,128,64,0,191,192,3,104,52,0,192,273,
        1,0,0,0,193,195,3,30,15,0,194,196,3,130,65,0,195,194,1,0,0,0,195,
        196,1,0,0,0,196,197,1,0,0,0,197,199,3,36,18,0,198,200,3,130,65,0,
        199,198,1,0,0,0,199,200,1,0,0,0,200,201,1,0,0,0,201,203,3,8,4,0,
        202,204,3,130,65,0,203,202,1,0,0,0,203,204,1,0,0,0,204,205,1,0,0,
        0,205,207,5,28,0,0,206,208,3,130,65,0,207,206,1,0,0,0,207,208,1,
        0,0,0,208,209,1,0,0,0,209,210,3,4,2,0,210,273,1,0,0,0,211,213,3,
        32,16,0,212,214,3,130,65,0,213,212,1,0,0,0,213,214,1,0,0,0,214,215,
        1,0,0,0,215,217,3,84,42,0,216,218,3,130,65,0,217,216,1,0,0,0,217,
        218,1,0,0,0,218,219,1,0,0,0,219,221,3,8,4,0,220,222,3,130,65,0,221,
        220,1,0,0,0,221,222,1,0,0,0,222,223,1,0,0,0,223,225,5,29,0,0,224,
        226,3,130,65,0,225,224,1,0,0,0,225,226,1,0,0,0,226,227,1,0,0,0,227,
        228,3,128,64,0,228,229,3,104,52,0,229,273,1,0,0,0,230,232,3,32,16,
        0,231,233,3,130,65,0,232,231,1,0,0,0,232,233,1,0,0,0,233,234,1,0,
        0,0,234,236,3,84,42,0,235,237,3,130,65,0,236,235,1,0,0,0,236,237,
        1,0,0,0,237,238,1,0,0,0,238,240,3,8,4,0,239,241,3,130,65,0,240,239,
        1,0,0,0,240,241,1,0,0,0,241,242,1,0,0,0,242,244,5,28,0,0,243,245,
        3,130,65,0,244,243,1,0,0,0,244,245,1,0,0,0,245,246,1,0,0,0,246,248,
        3,8,4,0,247,249,3,130,65,0,248,247,1,0,0,0,248,249,1,0,0,0,249,250,
        1,0,0,0,250,251,5,29,0,0,251,252,3,128,64,0,252,253,3,104,52,0,253,
        273,1,0,0,0,254,256,3,32,16,0,255,257,3,130,65,0,256,255,1,0,0,0,
        256,257,1,0,0,0,257,258,1,0,0,0,258,260,3,84,42,0,259,261,3,130,
        65,0,260,259,1,0,0,0,260,261,1,0,0,0,261,262,1,0,0,0,262,264,3,8,
        4,0,263,265,3,130,65,0,264,263,1,0,0,0,264,265,1,0,0,0,265,266,1,
        0,0,0,266,268,5,28,0,0,267,269,3,130,65,0,268,267,1,0,0,0,268,269,
        1,0,0,0,269,270,1,0,0,0,270,271,3,4,2,0,271,273,1,0,0,0,272,150,
        1,0,0,0,272,169,1,0,0,0,272,193,1,0,0,0,272,211,1,0,0,0,272,230,
        1,0,0,0,272,254,1,0,0,0,273,5,1,0,0,0,274,276,3,30,15,0,275,277,
        3,130,65,0,276,275,1,0,0,0,276,277,1,0,0,0,277,278,1,0,0,0,278,279,
        3,36,18,0,279,280,5,38,0,0,280,281,3,94,47,0,281,282,5,29,0,0,282,
        283,3,128,64,0,283,343,1,0,0,0,284,286,3,30,15,0,285,287,3,130,65,
        0,286,285,1,0,0,0,286,287,1,0,0,0,287,288,1,0,0,0,288,289,3,36,18,
        0,289,290,5,38,0,0,290,291,3,94,47,0,291,292,5,28,0,0,292,293,5,
        38,0,0,293,294,3,94,47,0,294,295,5,29,0,0,295,296,3,128,64,0,296,
        343,1,0,0,0,297,299,3,30,15,0,298,300,3,130,65,0,299,298,1,0,0,0,
        299,300,1,0,0,0,300,301,1,0,0,0,301,302,3,36,18,0,302,303,5,38,0,
        0,303,304,3,94,47,0,304,305,5,28,0,0,305,306,5,38,0,0,306,307,3,
        6,3,0,307,343,1,0,0,0,308,310,3,32,16,0,309,311,3,130,65,0,310,309,
        1,0,0,0,310,311,1,0,0,0,311,312,1,0,0,0,312,313,3,84,42,0,313,314,
        5,38,0,0,314,315,3,94,47,0,315,316,5,29,0,0,316,317,3,128,64,0,317,
        343,1,0,0,0,318,320,3,32,16,0,319,321,3,130,65,0,320,319,1,0,0,0,
        320,321,1,0,0,0,321,322,1,0,0,0,322,323,3,84,42,0,323,324,5,38,0,
        0,324,325,3,94,47,0,325,326,5,28,0,0,326,327,5,38,0,0,327,328,3,
        94,47,0,328,329,5,29,0,0,329,330,3,128,64,0,330,343,1,0,0,0,331,
        333,3,32,16,0,332,334,3,130,65,0,333,332,1,0,0,0,333,334,1,0,0,0,
        334,335,1,0,0,0,335,336,3,84,42,0,336,337,5,38,0,0,337,338,3,94,
        47,0,338,339,5,28,0,0,339,340,5,38,0,0,340,341,3,6,3,0,341,343,1,
        0,0,0,342,274,1,0,0,0,342,284,1,0,0,0,342,297,1,0,0,0,342,308,1,
        0,0,0,342,318,1,0,0,0,342,331,1,0,0,0,343,7,1,0,0,0,344,345,3,128,
        64,0,345,346,3,104,52,0,346,347,3,2,1,0,347,9,1,0,0,0,348,350,3,
        130,65,0,349,348,1,0,0,0,349,350,1,0,0,0,350,351,1,0,0,0,351,395,
        5,42,0,0,352,354,3,130,65,0,353,352,1,0,0,0,353,354,1,0,0,0,354,
        355,1,0,0,0,355,395,3,4,2,0,356,358,3,130,65,0,357,356,1,0,0,0,357,
        358,1,0,0,0,358,359,1,0,0,0,359,395,3,12,6,0,360,362,3,130,65,0,
        361,360,1,0,0,0,361,362,1,0,0,0,362,363,1,0,0,0,363,395,3,18,9,0,
        364,366,3,130,65,0,365,364,1,0,0,0,365,366,1,0,0,0,366,367,1,0,0,
        0,367,368,3,20,10,0,368,369,3,104,52,0,369,395,1,0,0,0,370,372,3,
        130,65,0,371,370,1,0,0,0,371,372,1,0,0,0,372,373,1,0,0,0,373,395,
        3,22,11,0,374,376,3,130,65,0,375,374,1,0,0,0,375,376,1,0,0,0,376,
        377,1,0,0,0,377,378,3,26,13,0,378,379,3,104,52,0,379,395,1,0,0,0,
        380,382,3,130,65,0,381,380,1,0,0,0,381,382,1,0,0,0,382,383,1,0,0,
        0,383,384,3,68,34,0,384,385,3,104,52,0,385,395,1,0,0,0,386,388,3,
        130,65,0,387,386,1,0,0,0,387,388,1,0,0,0,388,389,1,0,0,0,389,395,
        3,78,39,0,390,392,3,130,65,0,391,390,1,0,0,0,391,392,1,0,0,0,392,
        393,1,0,0,0,393,395,3,132,66,0,394,349,1,0,0,0,394,353,1,0,0,0,394,
        357,1,0,0,0,394,361,1,0,0,0,394,365,1,0,0,0,394,371,1,0,0,0,394,
        375,1,0,0,0,394,381,1,0,0,0,394,387,1,0,0,0,394,391,1,0,0,0,395,
        11,1,0,0,0,396,398,3,98,49,0,397,396,1,0,0,0,397,398,1,0,0,0,398,
        399,1,0,0,0,399,400,5,34,0,0,400,401,3,130,65,0,401,403,3,84,42,
        0,402,404,3,130,65,0,403,402,1,0,0,0,403,404,1,0,0,0,404,406,1,0,
        0,0,405,407,5,1,0,0,406,405,1,0,0,0,406,407,1,0,0,0,407,409,1,0,
        0,0,408,410,3,130,65,0,409,408,1,0,0,0,409,410,1,0,0,0,410,411,1,
        0,0,0,411,412,3,14,7,0,412,413,5,23,0,0,413,414,3,104,52,0,414,13,
        1,0,0,0,415,418,3,12,6,0,416,418,3,16,8,0,417,415,1,0,0,0,417,416,
        1,0,0,0,418,421,1,0,0,0,419,417,1,0,0,0,419,420,1,0,0,0,420,15,1,
        0,0,0,421,419,1,0,0,0,422,423,3,128,64,0,423,424,3,104,52,0,424,
        431,1,0,0,0,425,426,3,128,64,0,426,427,3,104,52,0,427,428,3,48,24,
        0,428,429,3,104,52,0,429,431,1,0,0,0,430,422,1,0,0,0,430,425,1,0,
        0,0,431,17,1,0,0,0,432,433,3,34,17,0,433,434,3,40,20,0,434,435,3,
        104,52,0,435,19,1,0,0,0,436,445,5,31,0,0,437,445,5,32,0,0,438,442,
        3,28,14,0,439,440,3,130,65,0,440,441,3,90,45,0,441,443,1,0,0,0,442,
        439,1,0,0,0,442,443,1,0,0,0,443,445,1,0,0,0,444,436,1,0,0,0,444,
        437,1,0,0,0,444,438,1,0,0,0,445,21,1,0,0,0,446,448,5,35,0,0,447,
        449,3,24,12,0,448,447,1,0,0,0,448,449,1,0,0,0,449,450,1,0,0,0,450,
        451,3,128,64,0,451,452,3,104,52,0,452,23,1,0,0,0,453,454,3,130,65,
        0,454,458,3,84,42,0,455,456,3,130,65,0,456,457,3,40,20,0,457,459,
        1,0,0,0,458,455,1,0,0,0,458,459,1,0,0,0,459,25,1,0,0,0,460,462,3,
        84,42,0,461,463,3,130,65,0,462,461,1,0,0,0,462,463,1,0,0,0,463,464,
        1,0,0,0,464,466,5,1,0,0,465,467,3,44,22,0,466,465,1,0,0,0,466,467,
        1,0,0,0,467,468,1,0,0,0,468,469,3,128,64,0,469,481,1,0,0,0,470,472,
        3,28,14,0,471,473,3,130,65,0,472,471,1,0,0,0,472,473,1,0,0,0,473,
        474,1,0,0,0,474,476,5,1,0,0,475,477,3,44,22,0,476,475,1,0,0,0,476,
        477,1,0,0,0,477,478,1,0,0,0,478,479,3,128,64,0,479,481,1,0,0,0,480,
        460,1,0,0,0,480,470,1,0,0,0,481,27,1,0,0,0,482,483,3,98,49,0,483,
        484,3,130,65,0,484,485,3,84,42,0,485,29,1,0,0,0,486,487,7,0,0,0,
        487,31,1,0,0,0,488,489,7,1,0,0,489,33,1,0,0,0,490,491,7,2,0,0,491,
        35,1,0,0,0,492,493,5,10,0,0,493,494,3,38,19,0,494,495,5,14,0,0,495,
        496,3,38,19,0,496,497,5,11,0,0,497,37,1,0,0,0,498,500,3,40,20,0,
        499,498,1,0,0,0,499,500,1,0,0,0,500,39,1,0,0,0,501,503,3,130,65,
        0,502,501,1,0,0,0,502,503,1,0,0,0,503,504,1,0,0,0,504,506,3,52,26,
        0,505,507,3,130,65,0,506,505,1,0,0,0,506,507,1,0,0,0,507,513,1,0,
        0,0,508,509,3,130,65,0,509,510,3,52,26,0,510,512,1,0,0,0,511,508,
        1,0,0,0,512,515,1,0,0,0,513,511,1,0,0,0,513,514,1,0,0,0,514,517,
        1,0,0,0,515,513,1,0,0,0,516,518,3,130,65,0,517,516,1,0,0,0,517,518,
        1,0,0,0,518,41,1,0,0,0,519,521,3,130,65,0,520,519,1,0,0,0,520,521,
        1,0,0,0,521,522,1,0,0,0,522,524,3,56,28,0,523,525,3,130,65,0,524,
        523,1,0,0,0,524,525,1,0,0,0,525,531,1,0,0,0,526,527,3,130,65,0,527,
        528,3,56,28,0,528,530,1,0,0,0,529,526,1,0,0,0,530,533,1,0,0,0,531,
        529,1,0,0,0,531,532,1,0,0,0,532,535,1,0,0,0,533,531,1,0,0,0,534,
        536,3,130,65,0,535,534,1,0,0,0,535,536,1,0,0,0,536,43,1,0,0,0,537,
        539,3,130,65,0,538,537,1,0,0,0,538,539,1,0,0,0,539,540,1,0,0,0,540,
        542,3,60,30,0,541,543,3,130,65,0,542,541,1,0,0,0,542,543,1,0,0,0,
        543,549,1,0,0,0,544,545,3,130,65,0,545,546,3,60,30,0,546,548,1,0,
        0,0,547,544,1,0,0,0,548,551,1,0,0,0,549,547,1,0,0,0,549,550,1,0,
        0,0,550,553,1,0,0,0,551,549,1,0,0,0,552,554,3,130,65,0,553,552,1,
        0,0,0,553,554,1,0,0,0,554,45,1,0,0,0,555,557,3,130,65,0,556,555,
        1,0,0,0,556,557,1,0,0,0,557,558,1,0,0,0,558,560,3,64,32,0,559,561,
        3,130,65,0,560,559,1,0,0,0,560,561,1,0,0,0,561,567,1,0,0,0,562,563,
        3,130,65,0,563,564,3,64,32,0,564,566,1,0,0,0,565,562,1,0,0,0,566,
        569,1,0,0,0,567,565,1,0,0,0,567,568,1,0,0,0,568,571,1,0,0,0,569,
        567,1,0,0,0,570,572,3,130,65,0,571,570,1,0,0,0,571,572,1,0,0,0,572,
        47,1,0,0,0,573,591,3,104,52,0,574,576,3,104,52,0,575,574,1,0,0,0,
        575,576,1,0,0,0,576,577,1,0,0,0,577,587,3,50,25,0,578,579,3,104,
        52,0,579,580,3,50,25,0,580,586,1,0,0,0,581,586,3,104,52,0,582,583,
        3,130,65,0,583,584,3,64,32,0,584,586,1,0,0,0,585,578,1,0,0,0,585,
        581,1,0,0,0,585,582,1,0,0,0,586,589,1,0,0,0,587,585,1,0,0,0,587,
        588,1,0,0,0,588,591,1,0,0,0,589,587,1,0,0,0,590,573,1,0,0,0,590,
        575,1,0,0,0,591,49,1,0,0,0,592,595,3,112,56,0,593,595,3,68,34,0,
        594,592,1,0,0,0,594,593,1,0,0,0,595,597,1,0,0,0,596,598,3,64,32,
        0,597,596,1,0,0,0,597,598,1,0,0,0,598,51,1,0,0,0,599,601,3,54,27,
        0,600,599,1,0,0,0,601,602,1,0,0,0,602,600,1,0,0,0,602,603,1,0,0,
        0,603,53,1,0,0,0,604,611,3,116,58,0,605,611,3,68,34,0,606,607,5,
        10,0,0,607,608,3,42,21,0,608,609,5,11,0,0,609,611,1,0,0,0,610,604,
        1,0,0,0,610,605,1,0,0,0,610,606,1,0,0,0,611,55,1,0,0,0,612,614,3,
        58,29,0,613,612,1,0,0,0,614,615,1,0,0,0,615,613,1,0,0,0,615,616,
        1,0,0,0,616,57,1,0,0,0,617,624,3,118,59,0,618,624,3,68,34,0,619,
        620,5,10,0,0,620,621,3,42,21,0,621,622,5,11,0,0,622,624,1,0,0,0,
        623,617,1,0,0,0,623,618,1,0,0,0,623,619,1,0,0,0,624,59,1,0,0,0,625,
        627,3,62,31,0,626,625,1,0,0,0,627,628,1,0,0,0,628,626,1,0,0,0,628,
        629,1,0,0,0,629,61,1,0,0,0,630,633,3,120,60,0,631,633,3,68,34,0,
        632,630,1,0,0,0,632,631,1,0,0,0,633,63,1,0,0,0,634,636,3,66,33,0,
        635,634,1,0,0,0,636,637,1,0,0,0,637,635,1,0,0,0,637,638,1,0,0,0,
        638,65,1,0,0,0,639,642,3,122,61,0,640,642,3,68,34,0,641,639,1,0,
        0,0,641,640,1,0,0,0,642,67,1,0,0,0,643,701,5,4,0,0,644,645,5,2,0,
        0,645,646,3,70,35,0,646,647,5,11,0,0,647,701,1,0,0,0,648,649,5,2,
        0,0,649,650,3,70,35,0,650,651,3,130,65,0,651,652,3,74,37,0,652,653,
        5,11,0,0,653,701,1,0,0,0,654,655,5,2,0,0,655,656,3,70,35,0,656,657,
        5,14,0,0,657,658,3,74,37,0,658,659,5,11,0,0,659,701,1,0,0,0,660,
        661,5,2,0,0,661,662,3,70,35,0,662,663,5,9,0,0,663,664,3,40,20,0,
        664,665,5,11,0,0,665,701,1,0,0,0,666,667,5,2,0,0,667,668,3,70,35,
        0,668,669,5,1,0,0,669,670,3,40,20,0,670,671,5,11,0,0,671,701,1,0,
        0,0,672,673,5,3,0,0,673,674,3,70,35,0,674,675,5,13,0,0,675,701,1,
        0,0,0,676,677,5,3,0,0,677,678,3,70,35,0,678,679,3,130,65,0,679,680,
        3,74,37,0,680,681,5,13,0,0,681,701,1,0,0,0,682,683,5,3,0,0,683,684,
        3,70,35,0,684,685,5,14,0,0,685,686,3,74,37,0,686,687,5,13,0,0,687,
        701,1,0,0,0,688,689,5,3,0,0,689,690,3,70,35,0,690,691,5,9,0,0,691,
        692,3,40,20,0,692,693,5,13,0,0,693,701,1,0,0,0,694,695,5,3,0,0,695,
        696,3,70,35,0,696,697,5,1,0,0,697,698,3,40,20,0,698,699,5,13,0,0,
        699,701,1,0,0,0,700,643,1,0,0,0,700,644,1,0,0,0,700,648,1,0,0,0,
        700,654,1,0,0,0,700,660,1,0,0,0,700,666,1,0,0,0,700,672,1,0,0,0,
        700,676,1,0,0,0,700,682,1,0,0,0,700,688,1,0,0,0,700,694,1,0,0,0,
        701,69,1,0,0,0,702,704,3,72,36,0,703,702,1,0,0,0,704,705,1,0,0,0,
        705,703,1,0,0,0,705,706,1,0,0,0,706,71,1,0,0,0,707,710,5,37,0,0,
        708,710,3,68,34,0,709,707,1,0,0,0,709,708,1,0,0,0,710,73,1,0,0,0,
        711,713,3,76,38,0,712,711,1,0,0,0,712,713,1,0,0,0,713,720,1,0,0,
        0,714,716,5,14,0,0,715,717,3,76,38,0,716,715,1,0,0,0,716,717,1,0,
        0,0,717,719,1,0,0,0,718,714,1,0,0,0,719,722,1,0,0,0,720,718,1,0,
        0,0,720,721,1,0,0,0,721,75,1,0,0,0,722,720,1,0,0,0,723,724,3,40,
        20,0,724,77,1,0,0,0,725,767,3,80,40,0,726,728,3,90,45,0,727,729,
        3,130,65,0,728,727,1,0,0,0,728,729,1,0,0,0,729,730,1,0,0,0,730,732,
        3,126,63,0,731,733,3,130,65,0,732,731,1,0,0,0,732,733,1,0,0,0,733,
        734,1,0,0,0,734,743,3,86,43,0,735,737,3,130,65,0,736,735,1,0,0,0,
        736,737,1,0,0,0,737,738,1,0,0,0,738,740,5,15,0,0,739,741,3,130,65,
        0,740,739,1,0,0,0,740,741,1,0,0,0,741,742,1,0,0,0,742,744,3,88,44,
        0,743,736,1,0,0,0,743,744,1,0,0,0,744,746,1,0,0,0,745,747,3,130,
        65,0,746,745,1,0,0,0,746,747,1,0,0,0,747,748,1,0,0,0,748,750,5,38,
        0,0,749,751,3,92,46,0,750,749,1,0,0,0,750,751,1,0,0,0,751,767,1,
        0,0,0,752,754,3,90,45,0,753,755,3,130,65,0,754,753,1,0,0,0,754,755,
        1,0,0,0,755,756,1,0,0,0,756,758,3,126,63,0,757,759,3,130,65,0,758,
        757,1,0,0,0,758,759,1,0,0,0,759,760,1,0,0,0,760,762,3,26,13,0,761,
        763,3,130,65,0,762,761,1,0,0,0,762,763,1,0,0,0,763,764,1,0,0,0,764,
        765,5,38,0,0,765,767,1,0,0,0,766,725,1,0,0,0,766,726,1,0,0,0,766,
        752,1,0,0,0,767,79,1,0,0,0,768,770,3,90,45,0,769,771,3,130,65,0,
        770,769,1,0,0,0,770,771,1,0,0,0,771,772,1,0,0,0,772,774,3,126,63,
        0,773,775,3,130,65,0,774,773,1,0,0,0,774,775,1,0,0,0,775,776,1,0,
        0,0,776,778,3,84,42,0,777,779,3,130,65,0,778,777,1,0,0,0,778,779,
        1,0,0,0,779,780,1,0,0,0,780,782,3,126,63,0,781,783,3,130,65,0,782,
        781,1,0,0,0,782,783,1,0,0,0,783,784,1,0,0,0,784,793,3,86,43,0,785,
        787,3,130,65,0,786,785,1,0,0,0,786,787,1,0,0,0,787,788,1,0,0,0,788,
        790,5,15,0,0,789,791,3,130,65,0,790,789,1,0,0,0,790,791,1,0,0,0,
        791,792,1,0,0,0,792,794,3,88,44,0,793,786,1,0,0,0,793,794,1,0,0,
        0,794,796,1,0,0,0,795,797,3,130,65,0,796,795,1,0,0,0,796,797,1,0,
        0,0,797,798,1,0,0,0,798,800,5,38,0,0,799,801,3,92,46,0,800,799,1,
        0,0,0,800,801,1,0,0,0,801,81,1,0,0,0,802,803,3,84,42,0,803,83,1,
        0,0,0,804,807,3,100,50,0,805,807,3,68,34,0,806,804,1,0,0,0,806,805,
        1,0,0,0,807,808,1,0,0,0,808,806,1,0,0,0,808,809,1,0,0,0,809,85,1,
        0,0,0,810,812,3,90,45,0,811,810,1,0,0,0,811,812,1,0,0,0,812,87,1,
        0,0,0,813,815,3,90,45,0,814,813,1,0,0,0,814,815,1,0,0,0,815,89,1,
        0,0,0,816,822,3,82,41,0,817,818,3,130,65,0,818,819,3,82,41,0,819,
        821,1,0,0,0,820,817,1,0,0,0,821,824,1,0,0,0,822,820,1,0,0,0,822,
        823,1,0,0,0,823,91,1,0,0,0,824,822,1,0,0,0,825,827,3,96,48,0,826,
        825,1,0,0,0,827,828,1,0,0,0,828,826,1,0,0,0,828,829,1,0,0,0,829,
        93,1,0,0,0,830,832,3,128,64,0,831,833,3,92,46,0,832,831,1,0,0,0,
        832,833,1,0,0,0,833,95,1,0,0,0,834,836,5,39,0,0,835,837,3,130,65,
        0,836,835,1,0,0,0,836,837,1,0,0,0,837,838,1,0,0,0,838,839,3,46,23,
        0,839,840,5,38,0,0,840,855,1,0,0,0,841,843,5,39,0,0,842,844,3,130,
        65,0,843,842,1,0,0,0,843,844,1,0,0,0,844,845,1,0,0,0,845,846,5,42,
        0,0,846,855,5,38,0,0,847,849,3,130,65,0,848,847,1,0,0,0,848,849,
        1,0,0,0,849,850,1,0,0,0,850,851,5,42,0,0,851,855,5,38,0,0,852,855,
        3,6,3,0,853,855,5,38,0,0,854,834,1,0,0,0,854,841,1,0,0,0,854,848,
        1,0,0,0,854,852,1,0,0,0,854,853,1,0,0,0,855,97,1,0,0,0,856,877,5,
        30,0,0,857,877,5,31,0,0,858,877,5,32,0,0,859,860,5,30,0,0,860,861,
        3,130,65,0,861,862,5,31,0,0,862,877,1,0,0,0,863,864,5,31,0,0,864,
        865,3,130,65,0,865,866,5,30,0,0,866,877,1,0,0,0,867,877,5,33,0,0,
        868,869,5,30,0,0,869,870,3,130,65,0,870,871,5,33,0,0,871,877,1,0,
        0,0,872,873,5,33,0,0,873,874,3,130,65,0,874,875,5,30,0,0,875,877,
        1,0,0,0,876,856,1,0,0,0,876,857,1,0,0,0,876,858,1,0,0,0,876,859,
        1,0,0,0,876,863,1,0,0,0,876,867,1,0,0,0,876,868,1,0,0,0,876,872,
        1,0,0,0,877,99,1,0,0,0,878,880,3,102,51,0,879,878,1,0,0,0,880,881,
        1,0,0,0,881,879,1,0,0,0,881,882,1,0,0,0,882,101,1,0,0,0,883,884,
        7,3,0,0,884,103,1,0,0,0,885,886,5,38,0,0,886,105,1,0,0,0,887,897,
        5,37,0,0,888,897,5,16,0,0,889,897,5,1,0,0,890,897,5,9,0,0,891,897,
        5,5,0,0,892,897,5,17,0,0,893,897,5,18,0,0,894,897,5,19,0,0,895,897,
        3,124,62,0,896,887,1,0,0,0,896,888,1,0,0,0,896,889,1,0,0,0,896,890,
        1,0,0,0,896,891,1,0,0,0,896,892,1,0,0,0,896,893,1,0,0,0,896,894,
        1,0,0,0,896,895,1,0,0,0,897,107,1,0,0,0,898,901,3,106,53,0,899,901,
        5,14,0,0,900,898,1,0,0,0,900,899,1,0,0,0,901,109,1,0,0,0,902,910,
        3,108,54,0,903,910,5,10,0,0,904,910,5,11,0,0,905,910,5,12,0,0,906,
        910,5,13,0,0,907,910,5,15,0,0,908,910,3,124,62,0,909,902,1,0,0,0,
        909,903,1,0,0,0,909,904,1,0,0,0,909,905,1,0,0,0,909,906,1,0,0,0,
        909,907,1,0,0,0,909,908,1,0,0,0,910,111,1,0,0,0,911,931,3,106,53,
        0,912,931,5,10,0,0,913,931,5,11,0,0,914,931,5,12,0,0,915,931,5,13,
        0,0,916,931,5,14,0,0,917,931,5,42,0,0,918,931,5,20,0,0,919,931,5,
        30,0,0,920,931,5,31,0,0,921,931,5,32,0,0,922,931,5,24,0,0,923,931,
        5,25,0,0,924,931,5,26,0,0,925,931,5,27,0,0,926,931,5,28,0,0,927,
        931,5,29,0,0,928,931,5,34,0,0,929,931,5,33,0,0,930,911,1,0,0,0,930,
        912,1,0,0,0,930,913,1,0,0,0,930,914,1,0,0,0,930,915,1,0,0,0,930,
        916,1,0,0,0,930,917,1,0,0,0,930,918,1,0,0,0,930,919,1,0,0,0,930,
        920,1,0,0,0,930,921,1,0,0,0,930,922,1,0,0,0,930,923,1,0,0,0,930,
        924,1,0,0,0,930,925,1,0,0,0,930,926,1,0,0,0,930,927,1,0,0,0,930,
        928,1,0,0,0,930,929,1,0,0,0,931,113,1,0,0,0,932,936,3,110,55,0,933,
        936,5,42,0,0,934,936,5,15,0,0,935,932,1,0,0,0,935,933,1,0,0,0,935,
        934,1,0,0,0,936,115,1,0,0,0,937,939,3,106,53,0,938,937,1,0,0,0,939,
        940,1,0,0,0,940,938,1,0,0,0,940,941,1,0,0,0,941,117,1,0,0,0,942,
        944,3,108,54,0,943,942,1,0,0,0,944,945,1,0,0,0,945,943,1,0,0,0,945,
        946,1,0,0,0,946,119,1,0,0,0,947,949,3,110,55,0,948,947,1,0,0,0,949,
        950,1,0,0,0,950,948,1,0,0,0,950,951,1,0,0,0,951,121,1,0,0,0,952,
        954,3,114,57,0,953,952,1,0,0,0,954,955,1,0,0,0,955,953,1,0,0,0,955,
        956,1,0,0,0,956,123,1,0,0,0,957,958,7,4,0,0,958,125,1,0,0,0,959,
        960,7,5,0,0,960,127,1,0,0,0,961,963,5,42,0,0,962,961,1,0,0,0,962,
        963,1,0,0,0,963,129,1,0,0,0,964,965,7,6,0,0,965,131,1,0,0,0,966,
        968,5,36,0,0,967,969,3,130,65,0,968,967,1,0,0,0,968,969,1,0,0,0,
        969,970,1,0,0,0,970,971,5,12,0,0,971,972,3,134,67,0,972,974,5,13,
        0,0,973,975,3,130,65,0,974,973,1,0,0,0,974,975,1,0,0,0,975,133,1,
        0,0,0,976,978,9,0,0,0,977,976,1,0,0,0,978,981,1,0,0,0,979,980,1,
        0,0,0,979,977,1,0,0,0,980,135,1,0,0,0,981,979,1,0,0,0,147,140,145,
        147,152,156,160,164,171,175,179,183,187,195,199,203,207,213,217,
        221,225,232,236,240,244,248,256,260,264,268,272,276,286,299,310,
        320,333,342,349,353,357,361,365,371,375,381,387,391,394,397,403,
        406,409,417,419,430,442,444,448,458,462,466,472,476,480,499,502,
        506,513,517,520,524,531,535,538,542,549,553,556,560,567,571,575,
        585,587,590,594,597,602,610,615,623,628,632,637,641,700,705,709,
        712,716,720,728,732,736,740,743,746,750,754,758,762,766,770,774,
        778,782,786,790,793,796,800,806,808,811,814,822,828,832,836,843,
        848,854,876,881,896,900,909,930,935,940,945,950,955,962,968,974,
        979
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
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(cbuildParser.LPAREN, 0)!;
    }
    public expressions_opt(): Expressions_optContext[];
    public expressions_opt(i: number): Expressions_optContext | null;
    public expressions_opt(i?: number): Expressions_optContext[] | Expressions_optContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Expressions_optContext);
        }

        return this.getRuleContext(i, Expressions_optContext);
    }
    public COMMA(): antlr.TerminalNode {
        return this.getToken(cbuildParser.COMMA, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(cbuildParser.RPAREN, 0)!;
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
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.PLUS, 0);
    }
    public QUESTION(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.QUESTION, 0);
    }
    public BANG(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.BANG, 0);
    }
    public keywords(): KeywordsContext | null {
        return this.getRuleContext(0, KeywordsContext);
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
    public PIPE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.PIPE, 0);
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
