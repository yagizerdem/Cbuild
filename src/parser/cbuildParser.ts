
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
    public static readonly RULE_definition = 7;
    public static readonly RULE_include = 8;
    public static readonly RULE_export = 9;
    public static readonly RULE_vpath = 10;
    public static readonly RULE_vpath_args = 11;
    public static readonly RULE_assignment = 12;
    public static readonly RULE_assignment_prefix = 13;
    public static readonly RULE_if_eq_kw = 14;
    public static readonly RULE_if_def_kw = 15;
    public static readonly RULE_include_kw = 16;
    public static readonly RULE_condition = 17;
    public static readonly RULE_expressions_opt = 18;
    public static readonly RULE_expressions = 19;
    public static readonly RULE_exprs_nested = 20;
    public static readonly RULE_exprs_in_assign = 21;
    public static readonly RULE_exprs_in_recipe = 22;
    public static readonly RULE_exprs_in_def = 23;
    public static readonly RULE_first_expr_in_def = 24;
    public static readonly RULE_expression = 25;
    public static readonly RULE_expression_atom = 26;
    public static readonly RULE_expr_nested = 27;
    public static readonly RULE_expr_nested_atom = 28;
    public static readonly RULE_expr_in_assign = 29;
    public static readonly RULE_expr_in_assign_atom = 30;
    public static readonly RULE_expr_in_recipe = 31;
    public static readonly RULE_expr_in_recipe_atom = 32;
    public static readonly RULE_function = 33;
    public static readonly RULE_function_name = 34;
    public static readonly RULE_function_name_atom = 35;
    public static readonly RULE_arguments = 36;
    public static readonly RULE_argument = 37;
    public static readonly RULE_rule = 38;
    public static readonly RULE_static_pattern_rule = 39;
    public static readonly RULE_target = 40;
    public static readonly RULE_pattern = 41;
    public static readonly RULE_prerequisites = 42;
    public static readonly RULE_orderonlyprerequisites = 43;
    public static readonly RULE_targets = 44;
    public static readonly RULE_recipes = 45;
    public static readonly RULE_recipes_opt = 46;
    public static readonly RULE_recipe = 47;
    public static readonly RULE_specifiers = 48;
    public static readonly RULE_identifier = 49;
    public static readonly RULE_identifier_atom = 50;
    public static readonly RULE_br = 51;
    public static readonly RULE_char = 52;
    public static readonly RULE_char_nested = 53;
    public static readonly RULE_char_in_assign = 54;
    public static readonly RULE_char_in_def = 55;
    public static readonly RULE_char_in_recipe = 56;
    public static readonly RULE_text = 57;
    public static readonly RULE_text_nested = 58;
    public static readonly RULE_text_in_assign = 59;
    public static readonly RULE_text_in_recipe = 60;
    public static readonly RULE_keywords = 61;
    public static readonly RULE_colon = 62;
    public static readonly RULE_comment_opt = 63;
    public static readonly RULE_ws = 64;
    public static readonly RULE_hook = 65;
    public static readonly RULE_hook_program = 66;

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
        "statements_opt", "statement", "define", "definition", "include", 
        "export", "vpath", "vpath_args", "assignment", "assignment_prefix", 
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
            this.state = 138;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 134;
                this.statements();
                this.state = 135;
                this.match(cbuildParser.EOF);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 137;
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
            this.state = 144;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 142;
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
                    case cbuildParser.INCLUDE:
                    case cbuildParser.DASH_INCLUDE:
                    case cbuildParser.SINCLUDE:
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
                    case cbuildParser.HOOK:
                    case cbuildParser.CHARS:
                    case cbuildParser.WS:
                    case cbuildParser.TAB:
                    case cbuildParser.COMMENT:
                        {
                        this.state = 140;
                        this.statement();
                        }
                        break;
                    case cbuildParser.NL:
                        {
                        this.state = 141;
                        this.br();
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                }
                this.state = 146;
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
            this.state = 269;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 147;
                this.if_eq_kw();
                this.state = 149;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 148;
                    this.ws();
                    }
                }

                this.state = 151;
                this.condition();
                this.state = 153;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 152;
                    this.ws();
                    }
                }

                this.state = 155;
                this.statements_opt();
                this.state = 157;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 156;
                    this.ws();
                    }
                }

                this.state = 159;
                this.match(cbuildParser.ENDIF);
                this.state = 161;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 160;
                    this.ws();
                    }
                }

                this.state = 163;
                this.comment_opt();
                this.state = 164;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 166;
                this.if_eq_kw();
                this.state = 168;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 167;
                    this.ws();
                    }
                }

                this.state = 170;
                this.condition();
                this.state = 172;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 171;
                    this.ws();
                    }
                }

                this.state = 174;
                this.statements_opt();
                this.state = 176;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 175;
                    this.ws();
                    }
                }

                this.state = 178;
                this.match(cbuildParser.ELSE);
                this.state = 180;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 179;
                    this.ws();
                    }
                }

                this.state = 182;
                this.statements_opt();
                this.state = 184;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 183;
                    this.ws();
                    }
                }

                this.state = 186;
                this.match(cbuildParser.ENDIF);
                this.state = 187;
                this.comment_opt();
                this.state = 188;
                this.br();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 190;
                this.if_eq_kw();
                this.state = 192;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 191;
                    this.ws();
                    }
                }

                this.state = 194;
                this.condition();
                this.state = 196;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 195;
                    this.ws();
                    }
                }

                this.state = 198;
                this.statements_opt();
                this.state = 200;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 199;
                    this.ws();
                    }
                }

                this.state = 202;
                this.match(cbuildParser.ELSE);
                this.state = 204;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 203;
                    this.ws();
                    }
                }

                this.state = 206;
                this.conditional();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 208;
                this.if_def_kw();
                this.state = 210;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 209;
                    this.ws();
                    }
                }

                this.state = 212;
                this.pattern();
                this.state = 214;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 213;
                    this.ws();
                    }
                }

                this.state = 216;
                this.statements_opt();
                this.state = 218;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 217;
                    this.ws();
                    }
                }

                this.state = 220;
                this.match(cbuildParser.ENDIF);
                this.state = 222;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 221;
                    this.ws();
                    }
                }

                this.state = 224;
                this.comment_opt();
                this.state = 225;
                this.br();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 227;
                this.if_def_kw();
                this.state = 229;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 228;
                    this.ws();
                    }
                }

                this.state = 231;
                this.pattern();
                this.state = 233;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 232;
                    this.ws();
                    }
                }

                this.state = 235;
                this.statements_opt();
                this.state = 237;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 236;
                    this.ws();
                    }
                }

                this.state = 239;
                this.match(cbuildParser.ELSE);
                this.state = 241;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 240;
                    this.ws();
                    }
                }

                this.state = 243;
                this.statements_opt();
                this.state = 245;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 244;
                    this.ws();
                    }
                }

                this.state = 247;
                this.match(cbuildParser.ENDIF);
                this.state = 248;
                this.comment_opt();
                this.state = 249;
                this.br();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 251;
                this.if_def_kw();
                this.state = 253;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 252;
                    this.ws();
                    }
                }

                this.state = 255;
                this.pattern();
                this.state = 257;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 256;
                    this.ws();
                    }
                }

                this.state = 259;
                this.statements_opt();
                this.state = 261;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 260;
                    this.ws();
                    }
                }

                this.state = 263;
                this.match(cbuildParser.ELSE);
                this.state = 265;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 264;
                    this.ws();
                    }
                }

                this.state = 267;
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
            this.state = 339;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 271;
                this.if_eq_kw();
                this.state = 273;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 272;
                    this.ws();
                    }
                }

                this.state = 275;
                this.condition();
                this.state = 276;
                this.match(cbuildParser.NL);
                this.state = 277;
                this.recipes_opt();
                this.state = 278;
                this.match(cbuildParser.ENDIF);
                this.state = 279;
                this.comment_opt();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 281;
                this.if_eq_kw();
                this.state = 283;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 282;
                    this.ws();
                    }
                }

                this.state = 285;
                this.condition();
                this.state = 286;
                this.match(cbuildParser.NL);
                this.state = 287;
                this.recipes_opt();
                this.state = 288;
                this.match(cbuildParser.ELSE);
                this.state = 289;
                this.match(cbuildParser.NL);
                this.state = 290;
                this.recipes_opt();
                this.state = 291;
                this.match(cbuildParser.ENDIF);
                this.state = 292;
                this.comment_opt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 294;
                this.if_eq_kw();
                this.state = 296;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 295;
                    this.ws();
                    }
                }

                this.state = 298;
                this.condition();
                this.state = 299;
                this.match(cbuildParser.NL);
                this.state = 300;
                this.recipes_opt();
                this.state = 301;
                this.match(cbuildParser.ELSE);
                this.state = 302;
                this.match(cbuildParser.NL);
                this.state = 303;
                this.conditional_in_recipe();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 305;
                this.if_def_kw();
                this.state = 307;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 306;
                    this.ws();
                    }
                }

                this.state = 309;
                this.pattern();
                this.state = 310;
                this.match(cbuildParser.NL);
                this.state = 311;
                this.recipes_opt();
                this.state = 312;
                this.match(cbuildParser.ENDIF);
                this.state = 313;
                this.comment_opt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 315;
                this.if_def_kw();
                this.state = 317;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 316;
                    this.ws();
                    }
                }

                this.state = 319;
                this.pattern();
                this.state = 320;
                this.match(cbuildParser.NL);
                this.state = 321;
                this.recipes_opt();
                this.state = 322;
                this.match(cbuildParser.ELSE);
                this.state = 323;
                this.match(cbuildParser.NL);
                this.state = 324;
                this.recipes_opt();
                this.state = 325;
                this.match(cbuildParser.ENDIF);
                this.state = 326;
                this.comment_opt();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 328;
                this.if_def_kw();
                this.state = 330;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 329;
                    this.ws();
                    }
                }

                this.state = 332;
                this.pattern();
                this.state = 333;
                this.match(cbuildParser.NL);
                this.state = 334;
                this.recipes_opt();
                this.state = 335;
                this.match(cbuildParser.ELSE);
                this.state = 336;
                this.match(cbuildParser.NL);
                this.state = 337;
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
            this.state = 341;
            this.comment_opt();
            this.state = 342;
            this.br();
            this.state = 343;
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
            this.state = 391;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 47, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 346;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 345;
                    this.ws();
                    }
                }

                this.state = 348;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 350;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 349;
                    this.ws();
                    }
                }

                this.state = 352;
                this.conditional();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 354;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 353;
                    this.ws();
                    }
                }

                this.state = 356;
                this.define();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 358;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 357;
                    this.ws();
                    }
                }

                this.state = 360;
                this.include();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 362;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 361;
                    this.ws();
                    }
                }

                this.state = 364;
                this.export_();
                this.state = 365;
                this.br();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 368;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 367;
                    this.ws();
                    }
                }

                this.state = 370;
                this.vpath();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 372;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 371;
                    this.ws();
                    }
                }

                this.state = 374;
                this.assignment();
                this.state = 375;
                this.br();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 378;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 377;
                    this.ws();
                    }
                }

                this.state = 380;
                this.function_();
                this.state = 381;
                this.br();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 384;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 383;
                    this.ws();
                    }
                }

                this.state = 386;
                this.rule();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 388;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 387;
                    this.ws();
                    }
                }

                this.state = 390;
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
            this.state = 394;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1006632960) !== 0)) {
                {
                this.state = 393;
                this.specifiers();
                }
            }

            this.state = 396;
            this.match(cbuildParser.DEFINE);
            this.state = 397;
            this.ws();
            this.state = 398;
            this.pattern();
            this.state = 400;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
            case 1:
                {
                this.state = 399;
                this.ws();
                }
                break;
            }
            this.state = 403;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 402;
                this.match(cbuildParser.ASSIGN_OP);
                }
            }

            this.state = 406;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 405;
                this.ws();
                }
            }

            this.state = 408;
            this.definition();
            this.state = 409;
            this.match(cbuildParser.ENDEF);
            this.state = 410;
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
    public definition(): DefinitionContext {
        let localContext = new DefinitionContext(this.context, this.state);
        this.enterRule(localContext, 14, cbuildParser.RULE_definition);
        try {
            this.state = 420;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 52, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 412;
                this.comment_opt();
                this.state = 413;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 415;
                this.comment_opt();
                this.state = 416;
                this.br();
                this.state = 417;
                this.exprs_in_def();
                this.state = 418;
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
        this.enterRule(localContext, 16, cbuildParser.RULE_include);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 422;
            this.include_kw();
            this.state = 423;
            this.expressions();
            this.state = 424;
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
        this.enterRule(localContext, 18, cbuildParser.RULE_export);
        let _la: number;
        try {
            this.state = 434;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 426;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 427;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 428;
                this.assignment_prefix();
                this.state = 432;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 429;
                    this.ws();
                    this.state = 430;
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
        this.enterRule(localContext, 20, cbuildParser.RULE_vpath);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 436;
            this.match(cbuildParser.VPATH);
            this.state = 438;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 437;
                this.vpath_args();
                }
            }

            this.state = 440;
            this.comment_opt();
            this.state = 441;
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
        this.enterRule(localContext, 22, cbuildParser.RULE_vpath_args);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 443;
            this.ws();
            this.state = 444;
            this.pattern();
            this.state = 448;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 445;
                this.ws();
                this.state = 446;
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
        this.enterRule(localContext, 24, cbuildParser.RULE_assignment);
        let _la: number;
        try {
            this.state = 470;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 450;
                this.pattern();
                this.state = 452;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 451;
                    this.ws();
                    }
                }

                this.state = 454;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 456;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 58, this.context) ) {
                case 1:
                    {
                    this.state = 455;
                    this.exprs_in_assign();
                    }
                    break;
                }
                this.state = 458;
                this.comment_opt();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 460;
                this.assignment_prefix();
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
        this.enterRule(localContext, 26, cbuildParser.RULE_assignment_prefix);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 472;
            this.specifiers();
            this.state = 473;
            this.ws();
            this.state = 474;
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
        this.enterRule(localContext, 28, cbuildParser.RULE_if_eq_kw);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 476;
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
        this.enterRule(localContext, 30, cbuildParser.RULE_if_def_kw);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 478;
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
        this.enterRule(localContext, 32, cbuildParser.RULE_include_kw);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 480;
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
        this.enterRule(localContext, 34, cbuildParser.RULE_condition);
        let _la: number;
        try {
            this.state = 493;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 482;
                this.match(cbuildParser.LPAREN);
                this.state = 483;
                this.expressions_opt();
                this.state = 484;
                this.match(cbuildParser.COMMA);
                this.state = 485;
                this.expressions_opt();
                this.state = 486;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case cbuildParser.SLIT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 488;
                this.match(cbuildParser.SLIT);
                this.state = 490;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 489;
                    this.ws();
                    }
                }

                this.state = 492;
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
        this.enterRule(localContext, 36, cbuildParser.RULE_expressions_opt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 496;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1598) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 411) !== 0)) {
                {
                this.state = 495;
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
        this.enterRule(localContext, 38, cbuildParser.RULE_expressions);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 499;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 498;
                this.ws();
                }
            }

            this.state = 501;
            this.expression();
            this.state = 503;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 66, this.context) ) {
            case 1:
                {
                this.state = 502;
                this.ws();
                }
                break;
            }
            this.state = 510;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 67, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 505;
                    this.ws();
                    this.state = 506;
                    this.expression();
                    }
                    }
                }
                this.state = 512;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 67, this.context);
            }
            this.state = 514;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 513;
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
        this.enterRule(localContext, 40, cbuildParser.RULE_exprs_nested);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 517;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 516;
                this.ws();
                }
            }

            this.state = 519;
            this.expr_nested();
            this.state = 521;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 70, this.context) ) {
            case 1:
                {
                this.state = 520;
                this.ws();
                }
                break;
            }
            this.state = 528;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 71, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 523;
                    this.ws();
                    this.state = 524;
                    this.expr_nested();
                    }
                    }
                }
                this.state = 530;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 71, this.context);
            }
            this.state = 532;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 531;
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
        this.enterRule(localContext, 42, cbuildParser.RULE_exprs_in_assign);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 535;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 534;
                this.ws();
                }
            }

            this.state = 537;
            this.expr_in_assign();
            this.state = 539;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 74, this.context) ) {
            case 1:
                {
                this.state = 538;
                this.ws();
                }
                break;
            }
            this.state = 546;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 541;
                    this.ws();
                    this.state = 542;
                    this.expr_in_assign();
                    }
                    }
                }
                this.state = 548;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 75, this.context);
            }
            this.state = 550;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context) ) {
            case 1:
                {
                this.state = 549;
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
        this.enterRule(localContext, 44, cbuildParser.RULE_exprs_in_recipe);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 553;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 552;
                this.ws();
                }
            }

            this.state = 555;
            this.expr_in_recipe();
            this.state = 557;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 78, this.context) ) {
            case 1:
                {
                this.state = 556;
                this.ws();
                }
                break;
            }
            this.state = 564;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 559;
                    this.ws();
                    this.state = 560;
                    this.expr_in_recipe();
                    }
                    }
                }
                this.state = 566;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 79, this.context);
            }
            this.state = 568;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 567;
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
        this.enterRule(localContext, 46, cbuildParser.RULE_exprs_in_def);
        let _la: number;
        try {
            let alternative: number;
            this.state = 587;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 570;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 572;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37) {
                    {
                    this.state = 571;
                    this.br();
                    }
                }

                this.state = 574;
                this.first_expr_in_def();
                this.state = 584;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 83, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        this.state = 582;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
                        case 1:
                            {
                            {
                            this.state = 575;
                            this.br();
                            this.state = 576;
                            this.first_expr_in_def();
                            }
                            }
                            break;
                        case 2:
                            {
                            {
                            this.state = 578;
                            this.br();
                            }
                            }
                            break;
                        case 3:
                            {
                            {
                            this.state = 579;
                            this.ws();
                            this.state = 580;
                            this.expr_in_recipe();
                            }
                            }
                            break;
                        }
                        }
                    }
                    this.state = 586;
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
        this.enterRule(localContext, 48, cbuildParser.RULE_first_expr_in_def);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 591;
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
                this.state = 589;
                this.char_in_def();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                {
                this.state = 590;
                this.function_();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 594;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294573630) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 539) !== 0)) {
                {
                this.state = 593;
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
        this.enterRule(localContext, 50, cbuildParser.RULE_expression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 597;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 596;
                this.expression_atom();
                }
                }
                this.state = 599;
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
        this.enterRule(localContext, 52, cbuildParser.RULE_expression_atom);
        try {
            this.state = 607;
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
                this.state = 601;
                this.text();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 602;
                this.function_();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 603;
                this.match(cbuildParser.LPAREN);
                this.state = 604;
                this.exprs_nested();
                this.state = 605;
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
        this.enterRule(localContext, 54, cbuildParser.RULE_expr_nested);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 610;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 609;
                this.expr_nested_atom();
                }
                }
                this.state = 612;
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
        this.enterRule(localContext, 56, cbuildParser.RULE_expr_nested_atom);
        try {
            this.state = 620;
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
                this.state = 614;
                this.text_nested();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 615;
                this.function_();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 616;
                this.match(cbuildParser.LPAREN);
                this.state = 617;
                this.exprs_nested();
                this.state = 618;
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
        this.enterRule(localContext, 58, cbuildParser.RULE_expr_in_assign);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 623;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 622;
                this.expr_in_assign_atom();
                }
                }
                this.state = 625;
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
        this.enterRule(localContext, 60, cbuildParser.RULE_expr_in_assign_atom);
        try {
            this.state = 629;
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
                this.state = 627;
                this.text_in_assign();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 628;
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
        this.enterRule(localContext, 62, cbuildParser.RULE_expr_in_recipe);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 632;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 631;
                this.expr_in_recipe_atom();
                }
                }
                this.state = 634;
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
        this.enterRule(localContext, 64, cbuildParser.RULE_expr_in_recipe_atom);
        try {
            this.state = 638;
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
                this.state = 636;
                this.text_in_recipe();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 637;
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
        this.enterRule(localContext, 66, cbuildParser.RULE_function);
        try {
            this.state = 697;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 640;
                this.match(cbuildParser.VAR);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 641;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 642;
                this.function_name();
                this.state = 643;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 645;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 646;
                this.function_name();
                this.state = 647;
                this.ws();
                this.state = 648;
                this.arguments();
                this.state = 649;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 651;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 652;
                this.function_name();
                this.state = 653;
                this.match(cbuildParser.COMMA);
                this.state = 654;
                this.arguments();
                this.state = 655;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 657;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 658;
                this.function_name();
                this.state = 659;
                this.match(cbuildParser.COLON);
                this.state = 660;
                this.expressions();
                this.state = 661;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 663;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 664;
                this.function_name();
                this.state = 665;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 666;
                this.expressions();
                this.state = 667;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 669;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 670;
                this.function_name();
                this.state = 671;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 673;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 674;
                this.function_name();
                this.state = 675;
                this.ws();
                this.state = 676;
                this.arguments();
                this.state = 677;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 679;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 680;
                this.function_name();
                this.state = 681;
                this.match(cbuildParser.COMMA);
                this.state = 682;
                this.arguments();
                this.state = 683;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 685;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 686;
                this.function_name();
                this.state = 687;
                this.match(cbuildParser.COLON);
                this.state = 688;
                this.expressions();
                this.state = 689;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 691;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 692;
                this.function_name();
                this.state = 693;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 694;
                this.expressions();
                this.state = 695;
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
        this.enterRule(localContext, 68, cbuildParser.RULE_function_name);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 700;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 699;
                this.function_name_atom();
                }
                }
                this.state = 702;
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
        this.enterRule(localContext, 70, cbuildParser.RULE_function_name_atom);
        try {
            this.state = 706;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 704;
                this.match(cbuildParser.CHARS);
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 705;
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
        this.enterRule(localContext, 72, cbuildParser.RULE_arguments);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 709;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1598) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 411) !== 0)) {
                {
                this.state = 708;
                this.argument();
                }
            }

            this.state = 717;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 14) {
                {
                {
                this.state = 711;
                this.match(cbuildParser.COMMA);
                this.state = 713;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1598) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 411) !== 0)) {
                    {
                    this.state = 712;
                    this.argument();
                    }
                }

                }
                }
                this.state = 719;
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
        this.enterRule(localContext, 74, cbuildParser.RULE_argument);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 720;
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
        this.enterRule(localContext, 76, cbuildParser.RULE_rule);
        let _la: number;
        try {
            this.state = 763;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 722;
                this.static_pattern_rule();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 723;
                this.targets();
                this.state = 725;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 724;
                    this.ws();
                    }
                }

                this.state = 727;
                this.colon();
                this.state = 729;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 102, this.context) ) {
                case 1:
                    {
                    this.state = 728;
                    this.ws();
                    }
                    break;
                }
                this.state = 731;
                this.prerequisites();
                this.state = 740;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 105, this.context) ) {
                case 1:
                    {
                    this.state = 733;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 39 || _la === 40) {
                        {
                        this.state = 732;
                        this.ws();
                        }
                    }

                    this.state = 735;
                    this.match(cbuildParser.PIPE);
                    this.state = 737;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 104, this.context) ) {
                    case 1:
                        {
                        this.state = 736;
                        this.ws();
                        }
                        break;
                    }
                    this.state = 739;
                    this.orderonlyprerequisites();
                    }
                    break;
                }
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
                this.match(cbuildParser.NL);
                this.state = 747;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 107, this.context) ) {
                case 1:
                    {
                    this.state = 746;
                    this.recipes();
                    }
                    break;
                }
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 749;
                this.targets();
                this.state = 751;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 750;
                    this.ws();
                    }
                }

                this.state = 753;
                this.colon();
                this.state = 755;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 754;
                    this.ws();
                    }
                }

                this.state = 757;
                this.assignment();
                this.state = 759;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 758;
                    this.ws();
                    }
                }

                this.state = 761;
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
        this.enterRule(localContext, 78, cbuildParser.RULE_static_pattern_rule);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 765;
            this.targets();
            this.state = 767;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 766;
                this.ws();
                }
            }

            this.state = 769;
            this.colon();
            this.state = 771;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 770;
                this.ws();
                }
            }

            this.state = 773;
            this.pattern();
            this.state = 775;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 774;
                this.ws();
                }
            }

            this.state = 777;
            this.colon();
            this.state = 779;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 115, this.context) ) {
            case 1:
                {
                this.state = 778;
                this.ws();
                }
                break;
            }
            this.state = 781;
            this.prerequisites();
            this.state = 790;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 118, this.context) ) {
            case 1:
                {
                this.state = 783;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 782;
                    this.ws();
                    }
                }

                this.state = 785;
                this.match(cbuildParser.PIPE);
                this.state = 787;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 117, this.context) ) {
                case 1:
                    {
                    this.state = 786;
                    this.ws();
                    }
                    break;
                }
                this.state = 789;
                this.orderonlyprerequisites();
                }
                break;
            }
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
            this.match(cbuildParser.NL);
            this.state = 797;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 120, this.context) ) {
            case 1:
                {
                this.state = 796;
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
        this.enterRule(localContext, 80, cbuildParser.RULE_target);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 799;
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
        this.enterRule(localContext, 82, cbuildParser.RULE_pattern);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 803;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 803;
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
                    this.state = 801;
                    this.identifier();
                    }
                    break;
                case cbuildParser.DOLLAR_LPAREN:
                case cbuildParser.DOLLAR_L_CURLY_BRACE:
                case cbuildParser.VAR:
                    {
                    this.state = 802;
                    this.function_();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 805;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294540316) !== 0) || _la === 36);
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
        this.enterRule(localContext, 84, cbuildParser.RULE_prerequisites);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 808;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294540316) !== 0) || _la === 36) {
                {
                this.state = 807;
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
        this.enterRule(localContext, 86, cbuildParser.RULE_orderonlyprerequisites);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 811;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294540316) !== 0) || _la === 36) {
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
    public targets(): TargetsContext {
        let localContext = new TargetsContext(this.context, this.state);
        this.enterRule(localContext, 88, cbuildParser.RULE_targets);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 813;
            this.target();
            this.state = 819;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 125, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 814;
                    this.ws();
                    this.state = 815;
                    this.target();
                    }
                    }
                }
                this.state = 821;
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
        this.enterRule(localContext, 90, cbuildParser.RULE_recipes);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 823;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 822;
                    this.recipe();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 825;
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
        this.enterRule(localContext, 92, cbuildParser.RULE_recipes_opt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 827;
            this.comment_opt();
            this.state = 829;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 20)) & ~0x1F) === 0 && ((1 << (_la - 20)) & 4063247) !== 0)) {
                {
                this.state = 828;
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
        this.enterRule(localContext, 94, cbuildParser.RULE_recipe);
        let _la: number;
        try {
            this.state = 851;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 131, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 831;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 833;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 128, this.context) ) {
                case 1:
                    {
                    this.state = 832;
                    this.ws();
                    }
                    break;
                }
                this.state = 835;
                this.exprs_in_recipe();
                this.state = 836;
                this.match(cbuildParser.NL);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 838;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 840;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 839;
                    this.ws();
                    }
                }

                this.state = 842;
                this.match(cbuildParser.COMMENT);
                this.state = 843;
                this.match(cbuildParser.NL);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 845;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 39 || _la === 40) {
                    {
                    this.state = 844;
                    this.ws();
                    }
                }

                this.state = 847;
                this.match(cbuildParser.COMMENT);
                this.state = 848;
                this.match(cbuildParser.NL);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 849;
                this.conditional_in_recipe();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 850;
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
        this.enterRule(localContext, 96, cbuildParser.RULE_specifiers);
        try {
            this.state = 873;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 132, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 853;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 854;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 855;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 856;
                this.match(cbuildParser.OVERRIDE);
                this.state = 857;
                this.ws();
                this.state = 858;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 860;
                this.match(cbuildParser.EXPORT);
                this.state = 861;
                this.ws();
                this.state = 862;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 864;
                this.match(cbuildParser.UNDEFINE);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 865;
                this.match(cbuildParser.OVERRIDE);
                this.state = 866;
                this.ws();
                this.state = 867;
                this.match(cbuildParser.UNDEFINE);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 869;
                this.match(cbuildParser.UNDEFINE);
                this.state = 870;
                this.ws();
                this.state = 871;
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
        this.enterRule(localContext, 98, cbuildParser.RULE_identifier);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 876;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 875;
                    this.identifier_atom();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 878;
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
        this.enterRule(localContext, 100, cbuildParser.RULE_identifier_atom);
        try {
            this.state = 887;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 880;
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
                this.state = 881;
                this.keywords();
                }
                break;
            case cbuildParser.COMMA:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 882;
                this.match(cbuildParser.COMMA);
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 883;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case cbuildParser.RPAREN:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 884;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case cbuildParser.L_CURLY_BRACE:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 885;
                this.match(cbuildParser.L_CURLY_BRACE);
                }
                break;
            case cbuildParser.R_CURLY_BRACE:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 886;
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
        this.enterRule(localContext, 102, cbuildParser.RULE_br);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 889;
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
        this.enterRule(localContext, 104, cbuildParser.RULE_char);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 891;
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
        this.enterRule(localContext, 106, cbuildParser.RULE_char_nested);
        try {
            this.state = 895;
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
                this.state = 893;
                this.char();
                }
                break;
            case cbuildParser.COMMA:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 894;
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
        this.enterRule(localContext, 108, cbuildParser.RULE_char_in_assign);
        try {
            this.state = 903;
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
                this.state = 897;
                this.char_nested();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 898;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case cbuildParser.RPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 899;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case cbuildParser.L_CURLY_BRACE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 900;
                this.match(cbuildParser.L_CURLY_BRACE);
                }
                break;
            case cbuildParser.R_CURLY_BRACE:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 901;
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
                this.state = 902;
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
        this.enterRule(localContext, 110, cbuildParser.RULE_char_in_def);
        try {
            this.state = 924;
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
                this.state = 905;
                this.char();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 906;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case cbuildParser.RPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 907;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case cbuildParser.L_CURLY_BRACE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 908;
                this.match(cbuildParser.L_CURLY_BRACE);
                }
                break;
            case cbuildParser.R_CURLY_BRACE:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 909;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case cbuildParser.COMMA:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 910;
                this.match(cbuildParser.COMMA);
                }
                break;
            case cbuildParser.COMMENT:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 911;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case cbuildParser.INCLUDE:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 912;
                this.match(cbuildParser.INCLUDE);
                }
                break;
            case cbuildParser.OVERRIDE:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 913;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case cbuildParser.EXPORT:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 914;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case cbuildParser.UNEXPORT:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 915;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case cbuildParser.IFDEF:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 916;
                this.match(cbuildParser.IFDEF);
                }
                break;
            case cbuildParser.IFNDEF:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 917;
                this.match(cbuildParser.IFNDEF);
                }
                break;
            case cbuildParser.IFEQ:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 918;
                this.match(cbuildParser.IFEQ);
                }
                break;
            case cbuildParser.IFNEQ:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 919;
                this.match(cbuildParser.IFNEQ);
                }
                break;
            case cbuildParser.ELSE:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 920;
                this.match(cbuildParser.ELSE);
                }
                break;
            case cbuildParser.ENDIF:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 921;
                this.match(cbuildParser.ENDIF);
                }
                break;
            case cbuildParser.DEFINE:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 922;
                this.match(cbuildParser.DEFINE);
                }
                break;
            case cbuildParser.UNDEFINE:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 923;
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
        this.enterRule(localContext, 112, cbuildParser.RULE_char_in_recipe);
        try {
            this.state = 929;
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
                this.state = 926;
                this.char_in_assign();
                }
                break;
            case cbuildParser.COMMENT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 927;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case cbuildParser.PIPE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 928;
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
        this.enterRule(localContext, 114, cbuildParser.RULE_text);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 932;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 931;
                    this.char();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 934;
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
        this.enterRule(localContext, 116, cbuildParser.RULE_text_nested);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 937;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 936;
                    this.char_nested();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 939;
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
        this.enterRule(localContext, 118, cbuildParser.RULE_text_in_assign);
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
                    this.char_in_assign();
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
    public text_in_recipe(): Text_in_recipeContext {
        let localContext = new Text_in_recipeContext(this.context, this.state);
        this.enterRule(localContext, 120, cbuildParser.RULE_text_in_recipe);
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
                    this.char_in_recipe();
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
    public keywords(): KeywordsContext {
        let localContext = new KeywordsContext(this.context, this.state);
        this.enterRule(localContext, 122, cbuildParser.RULE_keywords);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 951;
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
        this.enterRule(localContext, 124, cbuildParser.RULE_colon);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 953;
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
        this.enterRule(localContext, 126, cbuildParser.RULE_comment_opt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 956;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 143, this.context) ) {
            case 1:
                {
                this.state = 955;
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
        this.enterRule(localContext, 128, cbuildParser.RULE_ws);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 958;
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
        this.enterRule(localContext, 130, cbuildParser.RULE_hook);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 960;
            this.match(cbuildParser.HOOK);
            this.state = 962;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 39 || _la === 40) {
                {
                this.state = 961;
                this.ws();
                }
            }

            this.state = 964;
            this.match(cbuildParser.L_CURLY_BRACE);
            this.state = 965;
            this.hook_program();
            this.state = 966;
            this.match(cbuildParser.R_CURLY_BRACE);
            this.state = 968;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 145, this.context) ) {
            case 1:
                {
                this.state = 967;
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
        this.enterRule(localContext, 132, cbuildParser.RULE_hook_program);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 973;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 146, this.context);
            while (alternative !== 1 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1 + 1) {
                    {
                    {
                    this.state = 970;
                    this.matchWildcard();
                    }
                    }
                }
                this.state = 975;
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
        4,1,41,977,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,1,0,1,0,1,0,1,0,3,0,139,8,0,1,1,1,1,5,1,143,8,1,10,1,12,
        1,146,9,1,1,2,1,2,3,2,150,8,2,1,2,1,2,3,2,154,8,2,1,2,1,2,3,2,158,
        8,2,1,2,1,2,3,2,162,8,2,1,2,1,2,1,2,1,2,1,2,3,2,169,8,2,1,2,1,2,
        3,2,173,8,2,1,2,1,2,3,2,177,8,2,1,2,1,2,3,2,181,8,2,1,2,1,2,3,2,
        185,8,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,193,8,2,1,2,1,2,3,2,197,8,2,
        1,2,1,2,3,2,201,8,2,1,2,1,2,3,2,205,8,2,1,2,1,2,1,2,1,2,3,2,211,
        8,2,1,2,1,2,3,2,215,8,2,1,2,1,2,3,2,219,8,2,1,2,1,2,3,2,223,8,2,
        1,2,1,2,1,2,1,2,1,2,3,2,230,8,2,1,2,1,2,3,2,234,8,2,1,2,1,2,3,2,
        238,8,2,1,2,1,2,3,2,242,8,2,1,2,1,2,3,2,246,8,2,1,2,1,2,1,2,1,2,
        1,2,1,2,3,2,254,8,2,1,2,1,2,3,2,258,8,2,1,2,1,2,3,2,262,8,2,1,2,
        1,2,3,2,266,8,2,1,2,1,2,3,2,270,8,2,1,3,1,3,3,3,274,8,3,1,3,1,3,
        1,3,1,3,1,3,1,3,1,3,1,3,3,3,284,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,
        1,3,1,3,1,3,1,3,3,3,297,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,
        3,3,308,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,318,8,3,1,3,1,3,
        1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,331,8,3,1,3,1,3,1,3,1,3,
        1,3,1,3,1,3,3,3,340,8,3,1,4,1,4,1,4,1,4,1,5,3,5,347,8,5,1,5,1,5,
        3,5,351,8,5,1,5,1,5,3,5,355,8,5,1,5,1,5,3,5,359,8,5,1,5,1,5,3,5,
        363,8,5,1,5,1,5,1,5,1,5,3,5,369,8,5,1,5,1,5,3,5,373,8,5,1,5,1,5,
        1,5,1,5,3,5,379,8,5,1,5,1,5,1,5,1,5,3,5,385,8,5,1,5,1,5,3,5,389,
        8,5,1,5,3,5,392,8,5,1,6,3,6,395,8,6,1,6,1,6,1,6,1,6,3,6,401,8,6,
        1,6,3,6,404,8,6,1,6,3,6,407,8,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,
        1,7,1,7,1,7,1,7,3,7,421,8,7,1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,
        1,9,3,9,433,8,9,3,9,435,8,9,1,10,1,10,3,10,439,8,10,1,10,1,10,1,
        10,1,11,1,11,1,11,1,11,1,11,3,11,449,8,11,1,12,1,12,3,12,453,8,12,
        1,12,1,12,3,12,457,8,12,1,12,1,12,1,12,1,12,3,12,463,8,12,1,12,1,
        12,3,12,467,8,12,1,12,1,12,3,12,471,8,12,1,13,1,13,1,13,1,13,1,14,
        1,14,1,15,1,15,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,
        3,17,491,8,17,1,17,3,17,494,8,17,1,18,3,18,497,8,18,1,19,3,19,500,
        8,19,1,19,1,19,3,19,504,8,19,1,19,1,19,1,19,5,19,509,8,19,10,19,
        12,19,512,9,19,1,19,3,19,515,8,19,1,20,3,20,518,8,20,1,20,1,20,3,
        20,522,8,20,1,20,1,20,1,20,5,20,527,8,20,10,20,12,20,530,9,20,1,
        20,3,20,533,8,20,1,21,3,21,536,8,21,1,21,1,21,3,21,540,8,21,1,21,
        1,21,1,21,5,21,545,8,21,10,21,12,21,548,9,21,1,21,3,21,551,8,21,
        1,22,3,22,554,8,22,1,22,1,22,3,22,558,8,22,1,22,1,22,1,22,5,22,563,
        8,22,10,22,12,22,566,9,22,1,22,3,22,569,8,22,1,23,1,23,3,23,573,
        8,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,5,23,583,8,23,10,23,
        12,23,586,9,23,3,23,588,8,23,1,24,1,24,3,24,592,8,24,1,24,3,24,595,
        8,24,1,25,4,25,598,8,25,11,25,12,25,599,1,26,1,26,1,26,1,26,1,26,
        1,26,3,26,608,8,26,1,27,4,27,611,8,27,11,27,12,27,612,1,28,1,28,
        1,28,1,28,1,28,1,28,3,28,621,8,28,1,29,4,29,624,8,29,11,29,12,29,
        625,1,30,1,30,3,30,630,8,30,1,31,4,31,633,8,31,11,31,12,31,634,1,
        32,1,32,3,32,639,8,32,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,
        33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,
        33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,
        33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,
        33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,3,33,698,8,33,1,
        34,4,34,701,8,34,11,34,12,34,702,1,35,1,35,3,35,707,8,35,1,36,3,
        36,710,8,36,1,36,1,36,3,36,714,8,36,5,36,716,8,36,10,36,12,36,719,
        9,36,1,37,1,37,1,38,1,38,1,38,3,38,726,8,38,1,38,1,38,3,38,730,8,
        38,1,38,1,38,3,38,734,8,38,1,38,1,38,3,38,738,8,38,1,38,3,38,741,
        8,38,1,38,3,38,744,8,38,1,38,1,38,3,38,748,8,38,1,38,1,38,3,38,752,
        8,38,1,38,1,38,3,38,756,8,38,1,38,1,38,3,38,760,8,38,1,38,1,38,3,
        38,764,8,38,1,39,1,39,3,39,768,8,39,1,39,1,39,3,39,772,8,39,1,39,
        1,39,3,39,776,8,39,1,39,1,39,3,39,780,8,39,1,39,1,39,3,39,784,8,
        39,1,39,1,39,3,39,788,8,39,1,39,3,39,791,8,39,1,39,3,39,794,8,39,
        1,39,1,39,3,39,798,8,39,1,40,1,40,1,41,1,41,4,41,804,8,41,11,41,
        12,41,805,1,42,3,42,809,8,42,1,43,3,43,812,8,43,1,44,1,44,1,44,1,
        44,5,44,818,8,44,10,44,12,44,821,9,44,1,45,4,45,824,8,45,11,45,12,
        45,825,1,46,1,46,3,46,830,8,46,1,47,1,47,3,47,834,8,47,1,47,1,47,
        1,47,1,47,1,47,3,47,841,8,47,1,47,1,47,1,47,3,47,846,8,47,1,47,1,
        47,1,47,1,47,3,47,852,8,47,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,
        48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,3,
        48,874,8,48,1,49,4,49,877,8,49,11,49,12,49,878,1,50,1,50,1,50,1,
        50,1,50,1,50,1,50,3,50,888,8,50,1,51,1,51,1,52,1,52,1,53,1,53,3,
        53,896,8,53,1,54,1,54,1,54,1,54,1,54,1,54,3,54,904,8,54,1,55,1,55,
        1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,
        1,55,1,55,1,55,1,55,3,55,925,8,55,1,56,1,56,1,56,3,56,930,8,56,1,
        57,4,57,933,8,57,11,57,12,57,934,1,58,4,58,938,8,58,11,58,12,58,
        939,1,59,4,59,943,8,59,11,59,12,59,944,1,60,4,60,948,8,60,11,60,
        12,60,949,1,61,1,61,1,62,1,62,1,63,3,63,957,8,63,1,64,1,64,1,65,
        1,65,3,65,963,8,65,1,65,1,65,1,65,1,65,3,65,969,8,65,1,66,5,66,972,
        8,66,10,66,12,66,975,9,66,1,66,1,973,0,67,0,2,4,6,8,10,12,14,16,
        18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,
        62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,
        104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,0,7,
        1,0,22,23,1,0,20,21,1,0,16,18,5,0,1,1,5,5,9,9,32,33,35,36,2,0,16,
        16,19,31,1,0,6,9,1,0,39,40,1122,0,138,1,0,0,0,2,144,1,0,0,0,4,269,
        1,0,0,0,6,339,1,0,0,0,8,341,1,0,0,0,10,391,1,0,0,0,12,394,1,0,0,
        0,14,420,1,0,0,0,16,422,1,0,0,0,18,434,1,0,0,0,20,436,1,0,0,0,22,
        443,1,0,0,0,24,470,1,0,0,0,26,472,1,0,0,0,28,476,1,0,0,0,30,478,
        1,0,0,0,32,480,1,0,0,0,34,493,1,0,0,0,36,496,1,0,0,0,38,499,1,0,
        0,0,40,517,1,0,0,0,42,535,1,0,0,0,44,553,1,0,0,0,46,587,1,0,0,0,
        48,591,1,0,0,0,50,597,1,0,0,0,52,607,1,0,0,0,54,610,1,0,0,0,56,620,
        1,0,0,0,58,623,1,0,0,0,60,629,1,0,0,0,62,632,1,0,0,0,64,638,1,0,
        0,0,66,697,1,0,0,0,68,700,1,0,0,0,70,706,1,0,0,0,72,709,1,0,0,0,
        74,720,1,0,0,0,76,763,1,0,0,0,78,765,1,0,0,0,80,799,1,0,0,0,82,803,
        1,0,0,0,84,808,1,0,0,0,86,811,1,0,0,0,88,813,1,0,0,0,90,823,1,0,
        0,0,92,827,1,0,0,0,94,851,1,0,0,0,96,873,1,0,0,0,98,876,1,0,0,0,
        100,887,1,0,0,0,102,889,1,0,0,0,104,891,1,0,0,0,106,895,1,0,0,0,
        108,903,1,0,0,0,110,924,1,0,0,0,112,929,1,0,0,0,114,932,1,0,0,0,
        116,937,1,0,0,0,118,942,1,0,0,0,120,947,1,0,0,0,122,951,1,0,0,0,
        124,953,1,0,0,0,126,956,1,0,0,0,128,958,1,0,0,0,130,960,1,0,0,0,
        132,973,1,0,0,0,134,135,3,2,1,0,135,136,5,0,0,1,136,139,1,0,0,0,
        137,139,5,0,0,1,138,134,1,0,0,0,138,137,1,0,0,0,139,1,1,0,0,0,140,
        143,3,10,5,0,141,143,3,102,51,0,142,140,1,0,0,0,142,141,1,0,0,0,
        143,146,1,0,0,0,144,142,1,0,0,0,144,145,1,0,0,0,145,3,1,0,0,0,146,
        144,1,0,0,0,147,149,3,28,14,0,148,150,3,128,64,0,149,148,1,0,0,0,
        149,150,1,0,0,0,150,151,1,0,0,0,151,153,3,34,17,0,152,154,3,128,
        64,0,153,152,1,0,0,0,153,154,1,0,0,0,154,155,1,0,0,0,155,157,3,8,
        4,0,156,158,3,128,64,0,157,156,1,0,0,0,157,158,1,0,0,0,158,159,1,
        0,0,0,159,161,5,25,0,0,160,162,3,128,64,0,161,160,1,0,0,0,161,162,
        1,0,0,0,162,163,1,0,0,0,163,164,3,126,63,0,164,165,3,102,51,0,165,
        270,1,0,0,0,166,168,3,28,14,0,167,169,3,128,64,0,168,167,1,0,0,0,
        168,169,1,0,0,0,169,170,1,0,0,0,170,172,3,34,17,0,171,173,3,128,
        64,0,172,171,1,0,0,0,172,173,1,0,0,0,173,174,1,0,0,0,174,176,3,8,
        4,0,175,177,3,128,64,0,176,175,1,0,0,0,176,177,1,0,0,0,177,178,1,
        0,0,0,178,180,5,24,0,0,179,181,3,128,64,0,180,179,1,0,0,0,180,181,
        1,0,0,0,181,182,1,0,0,0,182,184,3,8,4,0,183,185,3,128,64,0,184,183,
        1,0,0,0,184,185,1,0,0,0,185,186,1,0,0,0,186,187,5,25,0,0,187,188,
        3,126,63,0,188,189,3,102,51,0,189,270,1,0,0,0,190,192,3,28,14,0,
        191,193,3,128,64,0,192,191,1,0,0,0,192,193,1,0,0,0,193,194,1,0,0,
        0,194,196,3,34,17,0,195,197,3,128,64,0,196,195,1,0,0,0,196,197,1,
        0,0,0,197,198,1,0,0,0,198,200,3,8,4,0,199,201,3,128,64,0,200,199,
        1,0,0,0,200,201,1,0,0,0,201,202,1,0,0,0,202,204,5,24,0,0,203,205,
        3,128,64,0,204,203,1,0,0,0,204,205,1,0,0,0,205,206,1,0,0,0,206,207,
        3,4,2,0,207,270,1,0,0,0,208,210,3,30,15,0,209,211,3,128,64,0,210,
        209,1,0,0,0,210,211,1,0,0,0,211,212,1,0,0,0,212,214,3,82,41,0,213,
        215,3,128,64,0,214,213,1,0,0,0,214,215,1,0,0,0,215,216,1,0,0,0,216,
        218,3,8,4,0,217,219,3,128,64,0,218,217,1,0,0,0,218,219,1,0,0,0,219,
        220,1,0,0,0,220,222,5,25,0,0,221,223,3,128,64,0,222,221,1,0,0,0,
        222,223,1,0,0,0,223,224,1,0,0,0,224,225,3,126,63,0,225,226,3,102,
        51,0,226,270,1,0,0,0,227,229,3,30,15,0,228,230,3,128,64,0,229,228,
        1,0,0,0,229,230,1,0,0,0,230,231,1,0,0,0,231,233,3,82,41,0,232,234,
        3,128,64,0,233,232,1,0,0,0,233,234,1,0,0,0,234,235,1,0,0,0,235,237,
        3,8,4,0,236,238,3,128,64,0,237,236,1,0,0,0,237,238,1,0,0,0,238,239,
        1,0,0,0,239,241,5,24,0,0,240,242,3,128,64,0,241,240,1,0,0,0,241,
        242,1,0,0,0,242,243,1,0,0,0,243,245,3,8,4,0,244,246,3,128,64,0,245,
        244,1,0,0,0,245,246,1,0,0,0,246,247,1,0,0,0,247,248,5,25,0,0,248,
        249,3,126,63,0,249,250,3,102,51,0,250,270,1,0,0,0,251,253,3,30,15,
        0,252,254,3,128,64,0,253,252,1,0,0,0,253,254,1,0,0,0,254,255,1,0,
        0,0,255,257,3,82,41,0,256,258,3,128,64,0,257,256,1,0,0,0,257,258,
        1,0,0,0,258,259,1,0,0,0,259,261,3,8,4,0,260,262,3,128,64,0,261,260,
        1,0,0,0,261,262,1,0,0,0,262,263,1,0,0,0,263,265,5,24,0,0,264,266,
        3,128,64,0,265,264,1,0,0,0,265,266,1,0,0,0,266,267,1,0,0,0,267,268,
        3,4,2,0,268,270,1,0,0,0,269,147,1,0,0,0,269,166,1,0,0,0,269,190,
        1,0,0,0,269,208,1,0,0,0,269,227,1,0,0,0,269,251,1,0,0,0,270,5,1,
        0,0,0,271,273,3,28,14,0,272,274,3,128,64,0,273,272,1,0,0,0,273,274,
        1,0,0,0,274,275,1,0,0,0,275,276,3,34,17,0,276,277,5,37,0,0,277,278,
        3,92,46,0,278,279,5,25,0,0,279,280,3,126,63,0,280,340,1,0,0,0,281,
        283,3,28,14,0,282,284,3,128,64,0,283,282,1,0,0,0,283,284,1,0,0,0,
        284,285,1,0,0,0,285,286,3,34,17,0,286,287,5,37,0,0,287,288,3,92,
        46,0,288,289,5,24,0,0,289,290,5,37,0,0,290,291,3,92,46,0,291,292,
        5,25,0,0,292,293,3,126,63,0,293,340,1,0,0,0,294,296,3,28,14,0,295,
        297,3,128,64,0,296,295,1,0,0,0,296,297,1,0,0,0,297,298,1,0,0,0,298,
        299,3,34,17,0,299,300,5,37,0,0,300,301,3,92,46,0,301,302,5,24,0,
        0,302,303,5,37,0,0,303,304,3,6,3,0,304,340,1,0,0,0,305,307,3,30,
        15,0,306,308,3,128,64,0,307,306,1,0,0,0,307,308,1,0,0,0,308,309,
        1,0,0,0,309,310,3,82,41,0,310,311,5,37,0,0,311,312,3,92,46,0,312,
        313,5,25,0,0,313,314,3,126,63,0,314,340,1,0,0,0,315,317,3,30,15,
        0,316,318,3,128,64,0,317,316,1,0,0,0,317,318,1,0,0,0,318,319,1,0,
        0,0,319,320,3,82,41,0,320,321,5,37,0,0,321,322,3,92,46,0,322,323,
        5,24,0,0,323,324,5,37,0,0,324,325,3,92,46,0,325,326,5,25,0,0,326,
        327,3,126,63,0,327,340,1,0,0,0,328,330,3,30,15,0,329,331,3,128,64,
        0,330,329,1,0,0,0,330,331,1,0,0,0,331,332,1,0,0,0,332,333,3,82,41,
        0,333,334,5,37,0,0,334,335,3,92,46,0,335,336,5,24,0,0,336,337,5,
        37,0,0,337,338,3,6,3,0,338,340,1,0,0,0,339,271,1,0,0,0,339,281,1,
        0,0,0,339,294,1,0,0,0,339,305,1,0,0,0,339,315,1,0,0,0,339,328,1,
        0,0,0,340,7,1,0,0,0,341,342,3,126,63,0,342,343,3,102,51,0,343,344,
        3,2,1,0,344,9,1,0,0,0,345,347,3,128,64,0,346,345,1,0,0,0,346,347,
        1,0,0,0,347,348,1,0,0,0,348,392,5,41,0,0,349,351,3,128,64,0,350,
        349,1,0,0,0,350,351,1,0,0,0,351,352,1,0,0,0,352,392,3,4,2,0,353,
        355,3,128,64,0,354,353,1,0,0,0,354,355,1,0,0,0,355,356,1,0,0,0,356,
        392,3,12,6,0,357,359,3,128,64,0,358,357,1,0,0,0,358,359,1,0,0,0,
        359,360,1,0,0,0,360,392,3,16,8,0,361,363,3,128,64,0,362,361,1,0,
        0,0,362,363,1,0,0,0,363,364,1,0,0,0,364,365,3,18,9,0,365,366,3,102,
        51,0,366,392,1,0,0,0,367,369,3,128,64,0,368,367,1,0,0,0,368,369,
        1,0,0,0,369,370,1,0,0,0,370,392,3,20,10,0,371,373,3,128,64,0,372,
        371,1,0,0,0,372,373,1,0,0,0,373,374,1,0,0,0,374,375,3,24,12,0,375,
        376,3,102,51,0,376,392,1,0,0,0,377,379,3,128,64,0,378,377,1,0,0,
        0,378,379,1,0,0,0,379,380,1,0,0,0,380,381,3,66,33,0,381,382,3,102,
        51,0,382,392,1,0,0,0,383,385,3,128,64,0,384,383,1,0,0,0,384,385,
        1,0,0,0,385,386,1,0,0,0,386,392,3,76,38,0,387,389,3,128,64,0,388,
        387,1,0,0,0,388,389,1,0,0,0,389,390,1,0,0,0,390,392,3,130,65,0,391,
        346,1,0,0,0,391,350,1,0,0,0,391,354,1,0,0,0,391,358,1,0,0,0,391,
        362,1,0,0,0,391,368,1,0,0,0,391,372,1,0,0,0,391,378,1,0,0,0,391,
        384,1,0,0,0,391,388,1,0,0,0,392,11,1,0,0,0,393,395,3,96,48,0,394,
        393,1,0,0,0,394,395,1,0,0,0,395,396,1,0,0,0,396,397,5,30,0,0,397,
        398,3,128,64,0,398,400,3,82,41,0,399,401,3,128,64,0,400,399,1,0,
        0,0,400,401,1,0,0,0,401,403,1,0,0,0,402,404,5,1,0,0,403,402,1,0,
        0,0,403,404,1,0,0,0,404,406,1,0,0,0,405,407,3,128,64,0,406,405,1,
        0,0,0,406,407,1,0,0,0,407,408,1,0,0,0,408,409,3,14,7,0,409,410,5,
        19,0,0,410,411,3,102,51,0,411,13,1,0,0,0,412,413,3,126,63,0,413,
        414,3,102,51,0,414,421,1,0,0,0,415,416,3,126,63,0,416,417,3,102,
        51,0,417,418,3,46,23,0,418,419,3,102,51,0,419,421,1,0,0,0,420,412,
        1,0,0,0,420,415,1,0,0,0,421,15,1,0,0,0,422,423,3,32,16,0,423,424,
        3,38,19,0,424,425,3,102,51,0,425,17,1,0,0,0,426,435,5,27,0,0,427,
        435,5,28,0,0,428,432,3,26,13,0,429,430,3,128,64,0,430,431,3,88,44,
        0,431,433,1,0,0,0,432,429,1,0,0,0,432,433,1,0,0,0,433,435,1,0,0,
        0,434,426,1,0,0,0,434,427,1,0,0,0,434,428,1,0,0,0,435,19,1,0,0,0,
        436,438,5,31,0,0,437,439,3,22,11,0,438,437,1,0,0,0,438,439,1,0,0,
        0,439,440,1,0,0,0,440,441,3,126,63,0,441,442,3,102,51,0,442,21,1,
        0,0,0,443,444,3,128,64,0,444,448,3,82,41,0,445,446,3,128,64,0,446,
        447,3,38,19,0,447,449,1,0,0,0,448,445,1,0,0,0,448,449,1,0,0,0,449,
        23,1,0,0,0,450,452,3,82,41,0,451,453,3,128,64,0,452,451,1,0,0,0,
        452,453,1,0,0,0,453,454,1,0,0,0,454,456,5,1,0,0,455,457,3,42,21,
        0,456,455,1,0,0,0,456,457,1,0,0,0,457,458,1,0,0,0,458,459,3,126,
        63,0,459,471,1,0,0,0,460,462,3,26,13,0,461,463,3,128,64,0,462,461,
        1,0,0,0,462,463,1,0,0,0,463,464,1,0,0,0,464,466,5,1,0,0,465,467,
        3,42,21,0,466,465,1,0,0,0,466,467,1,0,0,0,467,468,1,0,0,0,468,469,
        3,126,63,0,469,471,1,0,0,0,470,450,1,0,0,0,470,460,1,0,0,0,471,25,
        1,0,0,0,472,473,3,96,48,0,473,474,3,128,64,0,474,475,3,82,41,0,475,
        27,1,0,0,0,476,477,7,0,0,0,477,29,1,0,0,0,478,479,7,1,0,0,479,31,
        1,0,0,0,480,481,7,2,0,0,481,33,1,0,0,0,482,483,5,10,0,0,483,484,
        3,36,18,0,484,485,5,14,0,0,485,486,3,36,18,0,486,487,5,11,0,0,487,
        494,1,0,0,0,488,490,5,33,0,0,489,491,3,128,64,0,490,489,1,0,0,0,
        490,491,1,0,0,0,491,492,1,0,0,0,492,494,5,33,0,0,493,482,1,0,0,0,
        493,488,1,0,0,0,494,35,1,0,0,0,495,497,3,38,19,0,496,495,1,0,0,0,
        496,497,1,0,0,0,497,37,1,0,0,0,498,500,3,128,64,0,499,498,1,0,0,
        0,499,500,1,0,0,0,500,501,1,0,0,0,501,503,3,50,25,0,502,504,3,128,
        64,0,503,502,1,0,0,0,503,504,1,0,0,0,504,510,1,0,0,0,505,506,3,128,
        64,0,506,507,3,50,25,0,507,509,1,0,0,0,508,505,1,0,0,0,509,512,1,
        0,0,0,510,508,1,0,0,0,510,511,1,0,0,0,511,514,1,0,0,0,512,510,1,
        0,0,0,513,515,3,128,64,0,514,513,1,0,0,0,514,515,1,0,0,0,515,39,
        1,0,0,0,516,518,3,128,64,0,517,516,1,0,0,0,517,518,1,0,0,0,518,519,
        1,0,0,0,519,521,3,54,27,0,520,522,3,128,64,0,521,520,1,0,0,0,521,
        522,1,0,0,0,522,528,1,0,0,0,523,524,3,128,64,0,524,525,3,54,27,0,
        525,527,1,0,0,0,526,523,1,0,0,0,527,530,1,0,0,0,528,526,1,0,0,0,
        528,529,1,0,0,0,529,532,1,0,0,0,530,528,1,0,0,0,531,533,3,128,64,
        0,532,531,1,0,0,0,532,533,1,0,0,0,533,41,1,0,0,0,534,536,3,128,64,
        0,535,534,1,0,0,0,535,536,1,0,0,0,536,537,1,0,0,0,537,539,3,58,29,
        0,538,540,3,128,64,0,539,538,1,0,0,0,539,540,1,0,0,0,540,546,1,0,
        0,0,541,542,3,128,64,0,542,543,3,58,29,0,543,545,1,0,0,0,544,541,
        1,0,0,0,545,548,1,0,0,0,546,544,1,0,0,0,546,547,1,0,0,0,547,550,
        1,0,0,0,548,546,1,0,0,0,549,551,3,128,64,0,550,549,1,0,0,0,550,551,
        1,0,0,0,551,43,1,0,0,0,552,554,3,128,64,0,553,552,1,0,0,0,553,554,
        1,0,0,0,554,555,1,0,0,0,555,557,3,62,31,0,556,558,3,128,64,0,557,
        556,1,0,0,0,557,558,1,0,0,0,558,564,1,0,0,0,559,560,3,128,64,0,560,
        561,3,62,31,0,561,563,1,0,0,0,562,559,1,0,0,0,563,566,1,0,0,0,564,
        562,1,0,0,0,564,565,1,0,0,0,565,568,1,0,0,0,566,564,1,0,0,0,567,
        569,3,128,64,0,568,567,1,0,0,0,568,569,1,0,0,0,569,45,1,0,0,0,570,
        588,3,102,51,0,571,573,3,102,51,0,572,571,1,0,0,0,572,573,1,0,0,
        0,573,574,1,0,0,0,574,584,3,48,24,0,575,576,3,102,51,0,576,577,3,
        48,24,0,577,583,1,0,0,0,578,583,3,102,51,0,579,580,3,128,64,0,580,
        581,3,62,31,0,581,583,1,0,0,0,582,575,1,0,0,0,582,578,1,0,0,0,582,
        579,1,0,0,0,583,586,1,0,0,0,584,582,1,0,0,0,584,585,1,0,0,0,585,
        588,1,0,0,0,586,584,1,0,0,0,587,570,1,0,0,0,587,572,1,0,0,0,588,
        47,1,0,0,0,589,592,3,110,55,0,590,592,3,66,33,0,591,589,1,0,0,0,
        591,590,1,0,0,0,592,594,1,0,0,0,593,595,3,62,31,0,594,593,1,0,0,
        0,594,595,1,0,0,0,595,49,1,0,0,0,596,598,3,52,26,0,597,596,1,0,0,
        0,598,599,1,0,0,0,599,597,1,0,0,0,599,600,1,0,0,0,600,51,1,0,0,0,
        601,608,3,114,57,0,602,608,3,66,33,0,603,604,5,10,0,0,604,605,3,
        40,20,0,605,606,5,11,0,0,606,608,1,0,0,0,607,601,1,0,0,0,607,602,
        1,0,0,0,607,603,1,0,0,0,608,53,1,0,0,0,609,611,3,56,28,0,610,609,
        1,0,0,0,611,612,1,0,0,0,612,610,1,0,0,0,612,613,1,0,0,0,613,55,1,
        0,0,0,614,621,3,116,58,0,615,621,3,66,33,0,616,617,5,10,0,0,617,
        618,3,40,20,0,618,619,5,11,0,0,619,621,1,0,0,0,620,614,1,0,0,0,620,
        615,1,0,0,0,620,616,1,0,0,0,621,57,1,0,0,0,622,624,3,60,30,0,623,
        622,1,0,0,0,624,625,1,0,0,0,625,623,1,0,0,0,625,626,1,0,0,0,626,
        59,1,0,0,0,627,630,3,118,59,0,628,630,3,66,33,0,629,627,1,0,0,0,
        629,628,1,0,0,0,630,61,1,0,0,0,631,633,3,64,32,0,632,631,1,0,0,0,
        633,634,1,0,0,0,634,632,1,0,0,0,634,635,1,0,0,0,635,63,1,0,0,0,636,
        639,3,120,60,0,637,639,3,66,33,0,638,636,1,0,0,0,638,637,1,0,0,0,
        639,65,1,0,0,0,640,698,5,4,0,0,641,642,5,2,0,0,642,643,3,68,34,0,
        643,644,5,11,0,0,644,698,1,0,0,0,645,646,5,2,0,0,646,647,3,68,34,
        0,647,648,3,128,64,0,648,649,3,72,36,0,649,650,5,11,0,0,650,698,
        1,0,0,0,651,652,5,2,0,0,652,653,3,68,34,0,653,654,5,14,0,0,654,655,
        3,72,36,0,655,656,5,11,0,0,656,698,1,0,0,0,657,658,5,2,0,0,658,659,
        3,68,34,0,659,660,5,9,0,0,660,661,3,38,19,0,661,662,5,11,0,0,662,
        698,1,0,0,0,663,664,5,2,0,0,664,665,3,68,34,0,665,666,5,1,0,0,666,
        667,3,38,19,0,667,668,5,11,0,0,668,698,1,0,0,0,669,670,5,3,0,0,670,
        671,3,68,34,0,671,672,5,13,0,0,672,698,1,0,0,0,673,674,5,3,0,0,674,
        675,3,68,34,0,675,676,3,128,64,0,676,677,3,72,36,0,677,678,5,13,
        0,0,678,698,1,0,0,0,679,680,5,3,0,0,680,681,3,68,34,0,681,682,5,
        14,0,0,682,683,3,72,36,0,683,684,5,13,0,0,684,698,1,0,0,0,685,686,
        5,3,0,0,686,687,3,68,34,0,687,688,5,9,0,0,688,689,3,38,19,0,689,
        690,5,13,0,0,690,698,1,0,0,0,691,692,5,3,0,0,692,693,3,68,34,0,693,
        694,5,1,0,0,694,695,3,38,19,0,695,696,5,13,0,0,696,698,1,0,0,0,697,
        640,1,0,0,0,697,641,1,0,0,0,697,645,1,0,0,0,697,651,1,0,0,0,697,
        657,1,0,0,0,697,663,1,0,0,0,697,669,1,0,0,0,697,673,1,0,0,0,697,
        679,1,0,0,0,697,685,1,0,0,0,697,691,1,0,0,0,698,67,1,0,0,0,699,701,
        3,70,35,0,700,699,1,0,0,0,701,702,1,0,0,0,702,700,1,0,0,0,702,703,
        1,0,0,0,703,69,1,0,0,0,704,707,5,36,0,0,705,707,3,66,33,0,706,704,
        1,0,0,0,706,705,1,0,0,0,707,71,1,0,0,0,708,710,3,74,37,0,709,708,
        1,0,0,0,709,710,1,0,0,0,710,717,1,0,0,0,711,713,5,14,0,0,712,714,
        3,74,37,0,713,712,1,0,0,0,713,714,1,0,0,0,714,716,1,0,0,0,715,711,
        1,0,0,0,716,719,1,0,0,0,717,715,1,0,0,0,717,718,1,0,0,0,718,73,1,
        0,0,0,719,717,1,0,0,0,720,721,3,38,19,0,721,75,1,0,0,0,722,764,3,
        78,39,0,723,725,3,88,44,0,724,726,3,128,64,0,725,724,1,0,0,0,725,
        726,1,0,0,0,726,727,1,0,0,0,727,729,3,124,62,0,728,730,3,128,64,
        0,729,728,1,0,0,0,729,730,1,0,0,0,730,731,1,0,0,0,731,740,3,84,42,
        0,732,734,3,128,64,0,733,732,1,0,0,0,733,734,1,0,0,0,734,735,1,0,
        0,0,735,737,5,15,0,0,736,738,3,128,64,0,737,736,1,0,0,0,737,738,
        1,0,0,0,738,739,1,0,0,0,739,741,3,86,43,0,740,733,1,0,0,0,740,741,
        1,0,0,0,741,743,1,0,0,0,742,744,3,128,64,0,743,742,1,0,0,0,743,744,
        1,0,0,0,744,745,1,0,0,0,745,747,5,37,0,0,746,748,3,90,45,0,747,746,
        1,0,0,0,747,748,1,0,0,0,748,764,1,0,0,0,749,751,3,88,44,0,750,752,
        3,128,64,0,751,750,1,0,0,0,751,752,1,0,0,0,752,753,1,0,0,0,753,755,
        3,124,62,0,754,756,3,128,64,0,755,754,1,0,0,0,755,756,1,0,0,0,756,
        757,1,0,0,0,757,759,3,24,12,0,758,760,3,128,64,0,759,758,1,0,0,0,
        759,760,1,0,0,0,760,761,1,0,0,0,761,762,5,37,0,0,762,764,1,0,0,0,
        763,722,1,0,0,0,763,723,1,0,0,0,763,749,1,0,0,0,764,77,1,0,0,0,765,
        767,3,88,44,0,766,768,3,128,64,0,767,766,1,0,0,0,767,768,1,0,0,0,
        768,769,1,0,0,0,769,771,3,124,62,0,770,772,3,128,64,0,771,770,1,
        0,0,0,771,772,1,0,0,0,772,773,1,0,0,0,773,775,3,82,41,0,774,776,
        3,128,64,0,775,774,1,0,0,0,775,776,1,0,0,0,776,777,1,0,0,0,777,779,
        3,124,62,0,778,780,3,128,64,0,779,778,1,0,0,0,779,780,1,0,0,0,780,
        781,1,0,0,0,781,790,3,84,42,0,782,784,3,128,64,0,783,782,1,0,0,0,
        783,784,1,0,0,0,784,785,1,0,0,0,785,787,5,15,0,0,786,788,3,128,64,
        0,787,786,1,0,0,0,787,788,1,0,0,0,788,789,1,0,0,0,789,791,3,86,43,
        0,790,783,1,0,0,0,790,791,1,0,0,0,791,793,1,0,0,0,792,794,3,128,
        64,0,793,792,1,0,0,0,793,794,1,0,0,0,794,795,1,0,0,0,795,797,5,37,
        0,0,796,798,3,90,45,0,797,796,1,0,0,0,797,798,1,0,0,0,798,79,1,0,
        0,0,799,800,3,82,41,0,800,81,1,0,0,0,801,804,3,98,49,0,802,804,3,
        66,33,0,803,801,1,0,0,0,803,802,1,0,0,0,804,805,1,0,0,0,805,803,
        1,0,0,0,805,806,1,0,0,0,806,83,1,0,0,0,807,809,3,88,44,0,808,807,
        1,0,0,0,808,809,1,0,0,0,809,85,1,0,0,0,810,812,3,88,44,0,811,810,
        1,0,0,0,811,812,1,0,0,0,812,87,1,0,0,0,813,819,3,80,40,0,814,815,
        3,128,64,0,815,816,3,80,40,0,816,818,1,0,0,0,817,814,1,0,0,0,818,
        821,1,0,0,0,819,817,1,0,0,0,819,820,1,0,0,0,820,89,1,0,0,0,821,819,
        1,0,0,0,822,824,3,94,47,0,823,822,1,0,0,0,824,825,1,0,0,0,825,823,
        1,0,0,0,825,826,1,0,0,0,826,91,1,0,0,0,827,829,3,126,63,0,828,830,
        3,90,45,0,829,828,1,0,0,0,829,830,1,0,0,0,830,93,1,0,0,0,831,833,
        5,38,0,0,832,834,3,128,64,0,833,832,1,0,0,0,833,834,1,0,0,0,834,
        835,1,0,0,0,835,836,3,44,22,0,836,837,5,37,0,0,837,852,1,0,0,0,838,
        840,5,38,0,0,839,841,3,128,64,0,840,839,1,0,0,0,840,841,1,0,0,0,
        841,842,1,0,0,0,842,843,5,41,0,0,843,852,5,37,0,0,844,846,3,128,
        64,0,845,844,1,0,0,0,845,846,1,0,0,0,846,847,1,0,0,0,847,848,5,41,
        0,0,848,852,5,37,0,0,849,852,3,6,3,0,850,852,5,37,0,0,851,831,1,
        0,0,0,851,838,1,0,0,0,851,845,1,0,0,0,851,849,1,0,0,0,851,850,1,
        0,0,0,852,95,1,0,0,0,853,874,5,26,0,0,854,874,5,27,0,0,855,874,5,
        28,0,0,856,857,5,26,0,0,857,858,3,128,64,0,858,859,5,27,0,0,859,
        874,1,0,0,0,860,861,5,27,0,0,861,862,3,128,64,0,862,863,5,26,0,0,
        863,874,1,0,0,0,864,874,5,29,0,0,865,866,5,26,0,0,866,867,3,128,
        64,0,867,868,5,29,0,0,868,874,1,0,0,0,869,870,5,29,0,0,870,871,3,
        128,64,0,871,872,5,26,0,0,872,874,1,0,0,0,873,853,1,0,0,0,873,854,
        1,0,0,0,873,855,1,0,0,0,873,856,1,0,0,0,873,860,1,0,0,0,873,864,
        1,0,0,0,873,865,1,0,0,0,873,869,1,0,0,0,874,97,1,0,0,0,875,877,3,
        100,50,0,876,875,1,0,0,0,877,878,1,0,0,0,878,876,1,0,0,0,878,879,
        1,0,0,0,879,99,1,0,0,0,880,888,5,36,0,0,881,888,3,122,61,0,882,888,
        5,14,0,0,883,888,5,10,0,0,884,888,5,11,0,0,885,888,5,12,0,0,886,
        888,5,13,0,0,887,880,1,0,0,0,887,881,1,0,0,0,887,882,1,0,0,0,887,
        883,1,0,0,0,887,884,1,0,0,0,887,885,1,0,0,0,887,886,1,0,0,0,888,
        101,1,0,0,0,889,890,5,37,0,0,890,103,1,0,0,0,891,892,7,3,0,0,892,
        105,1,0,0,0,893,896,3,104,52,0,894,896,5,14,0,0,895,893,1,0,0,0,
        895,894,1,0,0,0,896,107,1,0,0,0,897,904,3,106,53,0,898,904,5,10,
        0,0,899,904,5,11,0,0,900,904,5,12,0,0,901,904,5,13,0,0,902,904,3,
        122,61,0,903,897,1,0,0,0,903,898,1,0,0,0,903,899,1,0,0,0,903,900,
        1,0,0,0,903,901,1,0,0,0,903,902,1,0,0,0,904,109,1,0,0,0,905,925,
        3,104,52,0,906,925,5,10,0,0,907,925,5,11,0,0,908,925,5,12,0,0,909,
        925,5,13,0,0,910,925,5,14,0,0,911,925,5,41,0,0,912,925,5,16,0,0,
        913,925,5,26,0,0,914,925,5,27,0,0,915,925,5,28,0,0,916,925,5,20,
        0,0,917,925,5,21,0,0,918,925,5,22,0,0,919,925,5,23,0,0,920,925,5,
        24,0,0,921,925,5,25,0,0,922,925,5,30,0,0,923,925,5,29,0,0,924,905,
        1,0,0,0,924,906,1,0,0,0,924,907,1,0,0,0,924,908,1,0,0,0,924,909,
        1,0,0,0,924,910,1,0,0,0,924,911,1,0,0,0,924,912,1,0,0,0,924,913,
        1,0,0,0,924,914,1,0,0,0,924,915,1,0,0,0,924,916,1,0,0,0,924,917,
        1,0,0,0,924,918,1,0,0,0,924,919,1,0,0,0,924,920,1,0,0,0,924,921,
        1,0,0,0,924,922,1,0,0,0,924,923,1,0,0,0,925,111,1,0,0,0,926,930,
        3,108,54,0,927,930,5,41,0,0,928,930,5,15,0,0,929,926,1,0,0,0,929,
        927,1,0,0,0,929,928,1,0,0,0,930,113,1,0,0,0,931,933,3,104,52,0,932,
        931,1,0,0,0,933,934,1,0,0,0,934,932,1,0,0,0,934,935,1,0,0,0,935,
        115,1,0,0,0,936,938,3,106,53,0,937,936,1,0,0,0,938,939,1,0,0,0,939,
        937,1,0,0,0,939,940,1,0,0,0,940,117,1,0,0,0,941,943,3,108,54,0,942,
        941,1,0,0,0,943,944,1,0,0,0,944,942,1,0,0,0,944,945,1,0,0,0,945,
        119,1,0,0,0,946,948,3,112,56,0,947,946,1,0,0,0,948,949,1,0,0,0,949,
        947,1,0,0,0,949,950,1,0,0,0,950,121,1,0,0,0,951,952,7,4,0,0,952,
        123,1,0,0,0,953,954,7,5,0,0,954,125,1,0,0,0,955,957,5,41,0,0,956,
        955,1,0,0,0,956,957,1,0,0,0,957,127,1,0,0,0,958,959,7,6,0,0,959,
        129,1,0,0,0,960,962,5,34,0,0,961,963,3,128,64,0,962,961,1,0,0,0,
        962,963,1,0,0,0,963,964,1,0,0,0,964,965,5,12,0,0,965,966,3,132,66,
        0,966,968,5,13,0,0,967,969,3,128,64,0,968,967,1,0,0,0,968,969,1,
        0,0,0,969,131,1,0,0,0,970,972,9,0,0,0,971,970,1,0,0,0,972,975,1,
        0,0,0,973,974,1,0,0,0,973,971,1,0,0,0,974,133,1,0,0,0,975,973,1,
        0,0,0,147,138,142,144,149,153,157,161,168,172,176,180,184,192,196,
        200,204,210,214,218,222,229,233,237,241,245,253,257,261,265,269,
        273,283,296,307,317,330,339,346,350,354,358,362,368,372,378,384,
        388,391,394,400,403,406,420,432,434,438,448,452,456,462,466,470,
        490,493,496,499,503,510,514,517,521,528,532,535,539,546,550,553,
        557,564,568,572,582,584,587,591,594,599,607,612,620,625,629,634,
        638,697,702,706,709,713,717,725,729,733,737,740,743,747,751,755,
        759,763,767,771,775,779,783,787,790,793,797,803,805,808,811,819,
        825,829,833,840,845,851,873,878,887,895,903,924,929,934,939,944,
        949,956,962,968,973
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
    public definition(): DefinitionContext {
        return this.getRuleContext(0, DefinitionContext)!;
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
