
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
    public static readonly RULE_empty_recipe_line = 49;
    public static readonly RULE_undefine = 50;
    public static readonly RULE_specifiers = 51;
    public static readonly RULE_identifier = 52;
    public static readonly RULE_identifier_atom = 53;
    public static readonly RULE_br = 54;
    public static readonly RULE_char = 55;
    public static readonly RULE_char_nested = 56;
    public static readonly RULE_char_in_assign = 57;
    public static readonly RULE_char_in_def = 58;
    public static readonly RULE_char_in_recipe = 59;
    public static readonly RULE_text = 60;
    public static readonly RULE_text_nested = 61;
    public static readonly RULE_text_in_assign = 62;
    public static readonly RULE_text_in_recipe = 63;
    public static readonly RULE_keywords = 64;
    public static readonly RULE_colon = 65;
    public static readonly RULE_comment_opt = 66;
    public static readonly RULE_ws = 67;
    public static readonly RULE_hook = 68;
    public static readonly RULE_hook_program = 69;

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
        "targets", "recipes", "recipes_opt", "recipe", "empty_recipe_line", 
        "undefine", "specifiers", "identifier", "identifier_atom", "br", 
        "char", "char_nested", "char_in_assign", "char_in_def", "char_in_recipe", 
        "text", "text_nested", "text_in_assign", "text_in_recipe", "keywords", 
        "colon", "comment_opt", "ws", "hook", "hook_program",
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
            this.state = 144;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 140;
                this.statements();
                this.state = 141;
                this.match(cbuildParser.EOF);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 143;
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
            this.state = 151;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 149;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
                    case 1:
                        {
                        this.state = 146;
                        this.statement();
                        }
                        break;
                    case 2:
                        {
                        this.state = 147;
                        this.br();
                        }
                        break;
                    case 3:
                        {
                        this.state = 148;
                        this.ws();
                        }
                        break;
                    }
                    }
                }
                this.state = 153;
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
            this.state = 276;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 154;
                this.if_eq_kw();
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
                this.condition();
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
                this.statements_opt();
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
                this.match(cbuildParser.ENDIF);
                this.state = 168;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 167;
                    this.ws();
                    }
                }

                this.state = 170;
                this.comment_opt();
                this.state = 171;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 173;
                this.if_eq_kw();
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
                this.condition();
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
                this.statements_opt();
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
                this.match(cbuildParser.ELSE);
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
                this.statements_opt();
                this.state = 191;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 190;
                    this.ws();
                    }
                }

                this.state = 193;
                this.match(cbuildParser.ENDIF);
                this.state = 194;
                this.comment_opt();
                this.state = 195;
                this.br();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 197;
                this.if_eq_kw();
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
                this.condition();
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
                this.statements_opt();
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
                this.match(cbuildParser.ELSE);
                this.state = 211;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 210;
                    this.ws();
                    }
                }

                this.state = 213;
                this.conditional();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 215;
                this.if_def_kw();
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
                this.pattern();
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
                this.statements_opt();
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
                this.match(cbuildParser.ENDIF);
                this.state = 229;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 228;
                    this.ws();
                    }
                }

                this.state = 231;
                this.comment_opt();
                this.state = 232;
                this.br();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 234;
                this.if_def_kw();
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
                this.pattern();
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
                this.statements_opt();
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
                this.match(cbuildParser.ELSE);
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
                this.statements_opt();
                this.state = 252;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 251;
                    this.ws();
                    }
                }

                this.state = 254;
                this.match(cbuildParser.ENDIF);
                this.state = 255;
                this.comment_opt();
                this.state = 256;
                this.br();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 258;
                this.if_def_kw();
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
                this.pattern();
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
                this.statements_opt();
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
                this.match(cbuildParser.ELSE);
                this.state = 272;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 271;
                    this.ws();
                    }
                }

                this.state = 274;
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
            this.state = 346;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 278;
                this.if_eq_kw();
                this.state = 280;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 279;
                    this.ws();
                    }
                }

                this.state = 282;
                this.condition();
                this.state = 283;
                this.match(cbuildParser.NL);
                this.state = 284;
                this.recipes_opt();
                this.state = 285;
                this.match(cbuildParser.ENDIF);
                this.state = 286;
                this.comment_opt();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 288;
                this.if_eq_kw();
                this.state = 290;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 289;
                    this.ws();
                    }
                }

                this.state = 292;
                this.condition();
                this.state = 293;
                this.match(cbuildParser.NL);
                this.state = 294;
                this.recipes_opt();
                this.state = 295;
                this.match(cbuildParser.ELSE);
                this.state = 296;
                this.match(cbuildParser.NL);
                this.state = 297;
                this.recipes_opt();
                this.state = 298;
                this.match(cbuildParser.ENDIF);
                this.state = 299;
                this.comment_opt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 301;
                this.if_eq_kw();
                this.state = 303;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 302;
                    this.ws();
                    }
                }

                this.state = 305;
                this.condition();
                this.state = 306;
                this.match(cbuildParser.NL);
                this.state = 307;
                this.recipes_opt();
                this.state = 308;
                this.match(cbuildParser.ELSE);
                this.state = 309;
                this.match(cbuildParser.NL);
                this.state = 310;
                this.conditional_in_recipe();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 312;
                this.if_def_kw();
                this.state = 314;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 313;
                    this.ws();
                    }
                }

                this.state = 316;
                this.pattern();
                this.state = 317;
                this.match(cbuildParser.NL);
                this.state = 318;
                this.recipes_opt();
                this.state = 319;
                this.match(cbuildParser.ENDIF);
                this.state = 320;
                this.comment_opt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 322;
                this.if_def_kw();
                this.state = 324;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 323;
                    this.ws();
                    }
                }

                this.state = 326;
                this.pattern();
                this.state = 327;
                this.match(cbuildParser.NL);
                this.state = 328;
                this.recipes_opt();
                this.state = 329;
                this.match(cbuildParser.ELSE);
                this.state = 330;
                this.match(cbuildParser.NL);
                this.state = 331;
                this.recipes_opt();
                this.state = 332;
                this.match(cbuildParser.ENDIF);
                this.state = 333;
                this.comment_opt();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 335;
                this.if_def_kw();
                this.state = 337;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 336;
                    this.ws();
                    }
                }

                this.state = 339;
                this.pattern();
                this.state = 340;
                this.match(cbuildParser.NL);
                this.state = 341;
                this.recipes_opt();
                this.state = 342;
                this.match(cbuildParser.ELSE);
                this.state = 343;
                this.match(cbuildParser.NL);
                this.state = 344;
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
            this.state = 348;
            this.comment_opt();
            this.state = 349;
            this.br();
            this.state = 350;
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
            this.state = 402;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
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
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
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
                this.conditional();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
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
                this.define();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
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
                this.include();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 369;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context) ) {
                case 1:
                    {
                    this.state = 368;
                    this.ws();
                    }
                    break;
                }
                this.state = 371;
                this.export_();
                this.state = 372;
                this.br();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
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
                this.vpath();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 379;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 378;
                    this.ws();
                    }
                }

                this.state = 381;
                this.assignment();
                this.state = 382;
                this.br();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 385;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 384;
                    this.ws();
                    }
                }

                this.state = 387;
                this.function_();
                this.state = 388;
                this.br();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
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
                this.rule();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 395;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 394;
                    this.ws();
                    }
                }

                this.state = 397;
                this.hook();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 399;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 398;
                    this.ws();
                    }
                }

                this.state = 401;
                this.undefine();
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
            this.state = 405;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 30)) & ~0x1F) === 0 && ((1 << (_la - 30)) & 7) !== 0)) {
                {
                this.state = 404;
                this.specifiers();
                }
            }

            this.state = 407;
            this.match(cbuildParser.DEFINE);
            this.state = 408;
            this.ws();
            this.state = 409;
            this.pattern();
            this.state = 411;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context) ) {
            case 1:
                {
                this.state = 410;
                this.ws();
                }
                break;
            }
            this.state = 414;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 413;
                this.match(cbuildParser.ASSIGN_OP);
                }
            }

            this.state = 417;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 416;
                this.ws();
                }
            }

            this.state = 419;
            this.define_body();
            this.state = 420;
            this.match(cbuildParser.ENDEF);
            this.state = 421;
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
            this.state = 427;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 30)) & ~0x1F) === 0 && ((1 << (_la - 30)) & 4375) !== 0)) {
                {
                this.state = 425;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case cbuildParser.OVERRIDE:
                case cbuildParser.EXPORT:
                case cbuildParser.UNEXPORT:
                case cbuildParser.DEFINE:
                    {
                    this.state = 423;
                    this.define();
                    }
                    break;
                case cbuildParser.NL:
                case cbuildParser.COMMENT:
                    {
                    this.state = 424;
                    this.definition();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 429;
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
            this.state = 438;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 430;
                this.comment_opt();
                this.state = 431;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 433;
                this.comment_opt();
                this.state = 434;
                this.br();
                this.state = 435;
                this.exprs_in_def();
                this.state = 436;
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
            this.state = 440;
            this.include_kw();
            this.state = 441;
            this.expressions();
            this.state = 442;
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
            this.state = 465;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 62, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 445;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 444;
                    this.ws();
                    }
                }

                this.state = 447;
                this.match(cbuildParser.EXPORT);
                this.state = 449;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 448;
                    this.ws();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 452;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 451;
                    this.ws();
                    }
                }

                this.state = 454;
                this.match(cbuildParser.UNEXPORT);
                this.state = 456;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 455;
                    this.ws();
                    }
                }

                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 459;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 458;
                    this.ws();
                    }
                }

                this.state = 461;
                this.assignment_prefix();
                this.state = 463;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 462;
                    this.ws();
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
            this.state = 467;
            this.match(cbuildParser.VPATH);
            this.state = 469;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 468;
                this.vpath_args();
                }
            }

            this.state = 471;
            this.comment_opt();
            this.state = 472;
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
            this.state = 474;
            this.ws();
            this.state = 475;
            this.pattern();
            this.state = 479;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 476;
                this.ws();
                this.state = 477;
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
            this.state = 501;
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
                this.state = 481;
                this.pattern();
                this.state = 483;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 482;
                    this.ws();
                    }
                }

                this.state = 485;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 487;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 66, this.context) ) {
                case 1:
                    {
                    this.state = 486;
                    this.exprs_in_assign();
                    }
                    break;
                }
                this.state = 489;
                this.comment_opt();
                }
                break;
            case cbuildParser.OVERRIDE:
            case cbuildParser.EXPORT:
            case cbuildParser.UNEXPORT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 491;
                this.assignment_prefix();
                this.state = 493;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 492;
                    this.ws();
                    }
                }

                this.state = 495;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 497;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 68, this.context) ) {
                case 1:
                    {
                    this.state = 496;
                    this.exprs_in_assign();
                    }
                    break;
                }
                this.state = 499;
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
            this.state = 503;
            this.specifiers();
            this.state = 504;
            this.ws();
            this.state = 505;
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
            this.state = 507;
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
            this.state = 509;
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
            this.state = 511;
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
            this.state = 513;
            this.match(cbuildParser.LPAREN);
            this.state = 514;
            this.expressions_opt();
            this.state = 515;
            this.match(cbuildParser.COMMA);
            this.state = 516;
            this.expressions_opt();
            this.state = 517;
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
            this.state = 520;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288611902) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 815) !== 0)) {
                {
                this.state = 519;
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
            this.state = 523;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 522;
                this.ws();
                }
            }

            this.state = 525;
            this.expression();
            this.state = 527;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context) ) {
            case 1:
                {
                this.state = 526;
                this.ws();
                }
                break;
            }
            this.state = 534;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 529;
                    this.ws();
                    this.state = 530;
                    this.expression();
                    }
                    }
                }
                this.state = 536;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
            }
            this.state = 538;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 537;
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
            this.state = 541;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 540;
                this.ws();
                }
            }

            this.state = 543;
            this.expr_nested();
            this.state = 545;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context) ) {
            case 1:
                {
                this.state = 544;
                this.ws();
                }
                break;
            }
            this.state = 552;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 547;
                    this.ws();
                    this.state = 548;
                    this.expr_nested();
                    }
                    }
                }
                this.state = 554;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            }
            this.state = 556;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 555;
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
            this.state = 559;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 558;
                this.ws();
                }
            }

            this.state = 561;
            this.expr_in_assign();
            this.state = 563;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context) ) {
            case 1:
                {
                this.state = 562;
                this.ws();
                }
                break;
            }
            this.state = 570;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 565;
                    this.ws();
                    this.state = 566;
                    this.expr_in_assign();
                    }
                    }
                }
                this.state = 572;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
            }
            this.state = 574;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
            case 1:
                {
                this.state = 573;
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
            this.state = 577;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 576;
                this.ws();
                }
            }

            this.state = 579;
            this.expr_in_recipe();
            this.state = 581;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
            case 1:
                {
                this.state = 580;
                this.ws();
                }
                break;
            }
            this.state = 588;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 583;
                    this.ws();
                    this.state = 584;
                    this.expr_in_recipe();
                    }
                    }
                }
                this.state = 590;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
            }
            this.state = 592;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 591;
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
            this.state = 611;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 90, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 594;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 596;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 38) {
                    {
                    this.state = 595;
                    this.br();
                    }
                }

                this.state = 598;
                this.first_expr_in_def();
                this.state = 608;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        this.state = 606;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context) ) {
                        case 1:
                            {
                            {
                            this.state = 599;
                            this.br();
                            this.state = 600;
                            this.first_expr_in_def();
                            }
                            }
                            break;
                        case 2:
                            {
                            {
                            this.state = 602;
                            this.br();
                            }
                            }
                            break;
                        case 3:
                            {
                            {
                            this.state = 603;
                            this.ws();
                            this.state = 604;
                            this.expr_in_recipe();
                            }
                            }
                            break;
                        }
                        }
                    }
                    this.state = 610;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
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
            this.state = 615;
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
                this.state = 613;
                this.char_in_def();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                {
                this.state = 614;
                this.function_();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 618;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288675390) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1071) !== 0)) {
                {
                this.state = 617;
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
            this.state = 621;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 620;
                this.expression_atom();
                }
                }
                this.state = 623;
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
            this.state = 631;
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
                this.state = 625;
                this.text();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 626;
                this.function_();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 627;
                this.match(cbuildParser.LPAREN);
                this.state = 628;
                this.exprs_nested();
                this.state = 629;
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
            this.state = 634;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 633;
                this.expr_nested_atom();
                }
                }
                this.state = 636;
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
            this.state = 644;
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
                this.state = 638;
                this.text_nested();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 639;
                this.function_();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 640;
                this.match(cbuildParser.LPAREN);
                this.state = 641;
                this.exprs_nested();
                this.state = 642;
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
            this.state = 647;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 646;
                this.expr_in_assign_atom();
                }
                }
                this.state = 649;
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
            this.state = 653;
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
                this.state = 651;
                this.text_in_assign();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 652;
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
            this.state = 656;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 655;
                this.expr_in_recipe_atom();
                }
                }
                this.state = 658;
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
            this.state = 662;
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
                this.state = 660;
                this.text_in_recipe();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 661;
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
            this.state = 721;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 101, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 664;
                this.match(cbuildParser.VAR);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 665;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 666;
                this.function_name();
                this.state = 667;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 669;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 670;
                this.function_name();
                this.state = 671;
                this.ws();
                this.state = 672;
                this.arguments();
                this.state = 673;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 675;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 676;
                this.function_name();
                this.state = 677;
                this.match(cbuildParser.COMMA);
                this.state = 678;
                this.arguments();
                this.state = 679;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 681;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 682;
                this.function_name();
                this.state = 683;
                this.match(cbuildParser.COLON);
                this.state = 684;
                this.expressions();
                this.state = 685;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 687;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 688;
                this.function_name();
                this.state = 689;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 690;
                this.expressions();
                this.state = 691;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 693;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 694;
                this.function_name();
                this.state = 695;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 697;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 698;
                this.function_name();
                this.state = 699;
                this.ws();
                this.state = 700;
                this.arguments();
                this.state = 701;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 703;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 704;
                this.function_name();
                this.state = 705;
                this.match(cbuildParser.COMMA);
                this.state = 706;
                this.arguments();
                this.state = 707;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 709;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 710;
                this.function_name();
                this.state = 711;
                this.match(cbuildParser.COLON);
                this.state = 712;
                this.expressions();
                this.state = 713;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 715;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 716;
                this.function_name();
                this.state = 717;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 718;
                this.expressions();
                this.state = 719;
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
            this.state = 724;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 723;
                this.function_name_atom();
                }
                }
                this.state = 726;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 950300) !== 0) || _la === 37);
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
            this.state = 734;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 728;
                this.match(cbuildParser.CHARS);
                }
                break;
            case cbuildParser.PLUS:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 729;
                this.match(cbuildParser.PLUS);
                }
                break;
            case cbuildParser.QUESTION:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 730;
                this.match(cbuildParser.QUESTION);
                }
                break;
            case cbuildParser.PIPE:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 731;
                this.match(cbuildParser.PIPE);
                }
                break;
            case cbuildParser.BANG:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 732;
                this.match(cbuildParser.BANG);
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 733;
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
            this.state = 737;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288611902) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 815) !== 0)) {
                {
                this.state = 736;
                this.argument();
                }
            }

            this.state = 745;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 14) {
                {
                {
                this.state = 739;
                this.match(cbuildParser.COMMA);
                this.state = 741;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288611902) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 815) !== 0)) {
                    {
                    this.state = 740;
                    this.argument();
                    }
                }

                }
                }
                this.state = 747;
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
            this.state = 748;
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
            this.state = 791;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 117, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 750;
                this.static_pattern_rule();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 751;
                this.targets();
                this.state = 753;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 752;
                    this.ws();
                    }
                }

                this.state = 755;
                this.colon();
                this.state = 757;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 108, this.context) ) {
                case 1:
                    {
                    this.state = 756;
                    this.ws();
                    }
                    break;
                }
                this.state = 759;
                this.prerequisites();
                this.state = 768;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
                case 1:
                    {
                    this.state = 761;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 40 || _la === 41) {
                        {
                        this.state = 760;
                        this.ws();
                        }
                    }

                    this.state = 763;
                    this.match(cbuildParser.PIPE);
                    this.state = 765;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 110, this.context) ) {
                    case 1:
                        {
                        this.state = 764;
                        this.ws();
                        }
                        break;
                    }
                    this.state = 767;
                    this.orderonlyprerequisites();
                    }
                    break;
                }
                this.state = 771;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 770;
                    this.ws();
                    }
                }

                this.state = 773;
                this.match(cbuildParser.NL);
                this.state = 775;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 113, this.context) ) {
                case 1:
                    {
                    this.state = 774;
                    this.recipes();
                    }
                    break;
                }
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 777;
                this.targets();
                this.state = 779;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 778;
                    this.ws();
                    }
                }

                this.state = 781;
                this.colon();
                this.state = 783;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 782;
                    this.ws();
                    }
                }

                this.state = 785;
                this.assignment();
                this.state = 787;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 786;
                    this.ws();
                    }
                }

                this.state = 789;
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
            this.state = 793;
            this.targets();
            this.state = 795;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 794;
                this.ws();
                }
            }

            this.state = 797;
            this.colon();
            this.state = 799;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 798;
                this.ws();
                }
            }

            this.state = 801;
            this.pattern();
            this.state = 803;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 802;
                this.ws();
                }
            }

            this.state = 805;
            this.colon();
            this.state = 807;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 121, this.context) ) {
            case 1:
                {
                this.state = 806;
                this.ws();
                }
                break;
            }
            this.state = 809;
            this.prerequisites();
            this.state = 818;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 124, this.context) ) {
            case 1:
                {
                this.state = 811;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 810;
                    this.ws();
                    }
                }

                this.state = 813;
                this.match(cbuildParser.PIPE);
                this.state = 815;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 123, this.context) ) {
                case 1:
                    {
                    this.state = 814;
                    this.ws();
                    }
                    break;
                }
                this.state = 817;
                this.orderonlyprerequisites();
                }
                break;
            }
            this.state = 821;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 820;
                this.ws();
                }
            }

            this.state = 823;
            this.match(cbuildParser.NL);
            this.state = 825;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 126, this.context) ) {
            case 1:
                {
                this.state = 824;
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
            this.state = 827;
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
            this.state = 831;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    this.state = 831;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case cbuildParser.LPAREN:
                    case cbuildParser.RPAREN:
                    case cbuildParser.L_CURLY_BRACE:
                    case cbuildParser.R_CURLY_BRACE:
                    case cbuildParser.COMMA:
                    case cbuildParser.CHARS:
                        {
                        this.state = 829;
                        this.identifier();
                        }
                        break;
                    case cbuildParser.DOLLAR_LPAREN:
                    case cbuildParser.DOLLAR_L_CURLY_BRACE:
                    case cbuildParser.VAR:
                        {
                        this.state = 830;
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
                this.state = 833;
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
    public prerequisites(): PrerequisitesContext {
        let localContext = new PrerequisitesContext(this.context, this.state);
        this.enterRule(localContext, 86, cbuildParser.RULE_prerequisites);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 836;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 31772) !== 0) || _la === 37) {
                {
                this.state = 835;
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
            this.state = 839;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 31772) !== 0) || _la === 37) {
                {
                this.state = 838;
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
            this.state = 841;
            this.target();
            this.state = 847;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 131, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 842;
                    this.ws();
                    this.state = 843;
                    this.target();
                    }
                    }
                }
                this.state = 849;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 131, this.context);
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
            this.state = 852;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    this.state = 852;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 132, this.context) ) {
                    case 1:
                        {
                        this.state = 850;
                        this.recipe();
                        }
                        break;
                    case 2:
                        {
                        this.state = 851;
                        this.empty_recipe_line();
                        }
                        break;
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 854;
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
    public recipes_opt(): Recipes_optContext {
        let localContext = new Recipes_optContext(this.context, this.state);
        this.enterRule(localContext, 94, cbuildParser.RULE_recipes_opt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 856;
            this.comment_opt();
            this.state = 858;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 24)) & ~0x1F) === 0 && ((1 << (_la - 24)) & 507919) !== 0)) {
                {
                this.state = 857;
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
            this.state = 880;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 138, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 860;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 862;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 135, this.context) ) {
                case 1:
                    {
                    this.state = 861;
                    this.ws();
                    }
                    break;
                }
                this.state = 864;
                this.exprs_in_recipe();
                this.state = 865;
                this.match(cbuildParser.NL);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 867;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 869;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 868;
                    this.ws();
                    }
                }

                this.state = 871;
                this.match(cbuildParser.COMMENT);
                this.state = 872;
                this.match(cbuildParser.NL);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 874;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 873;
                    this.ws();
                    }
                }

                this.state = 876;
                this.match(cbuildParser.COMMENT);
                this.state = 877;
                this.match(cbuildParser.NL);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 878;
                this.conditional_in_recipe();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 879;
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
    public empty_recipe_line(): Empty_recipe_lineContext {
        let localContext = new Empty_recipe_lineContext(this.context, this.state);
        this.enterRule(localContext, 98, cbuildParser.RULE_empty_recipe_line);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 882;
            this.match(cbuildParser.LEADING_TAB);
            this.state = 884;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 883;
                this.ws();
                }
            }

            this.state = 886;
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
    public undefine(): UndefineContext {
        let localContext = new UndefineContext(this.context, this.state);
        this.enterRule(localContext, 100, cbuildParser.RULE_undefine);
        try {
            this.state = 898;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.UNDEFINE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 888;
                this.match(cbuildParser.UNDEFINE);
                this.state = 889;
                this.ws();
                this.state = 890;
                this.pattern();
                }
                break;
            case cbuildParser.OVERRIDE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 892;
                this.match(cbuildParser.OVERRIDE);
                this.state = 893;
                this.ws();
                this.state = 894;
                this.match(cbuildParser.UNDEFINE);
                this.state = 895;
                this.ws();
                this.state = 896;
                this.pattern();
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
    public specifiers(): SpecifiersContext {
        let localContext = new SpecifiersContext(this.context, this.state);
        this.enterRule(localContext, 102, cbuildParser.RULE_specifiers);
        try {
            this.state = 911;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 141, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 900;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 901;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 902;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 903;
                this.match(cbuildParser.OVERRIDE);
                this.state = 904;
                this.ws();
                this.state = 905;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 907;
                this.match(cbuildParser.EXPORT);
                this.state = 908;
                this.ws();
                this.state = 909;
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
        this.enterRule(localContext, 104, cbuildParser.RULE_identifier);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 914;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 913;
                    this.identifier_atom();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 916;
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
    public identifier_atom(): Identifier_atomContext {
        let localContext = new Identifier_atomContext(this.context, this.state);
        this.enterRule(localContext, 106, cbuildParser.RULE_identifier_atom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 918;
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
        this.enterRule(localContext, 108, cbuildParser.RULE_br);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 920;
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
        this.enterRule(localContext, 110, cbuildParser.RULE_char);
        try {
            this.state = 931;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 922;
                this.match(cbuildParser.CHARS);
                }
                break;
            case cbuildParser.BACKSLASH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 923;
                this.match(cbuildParser.BACKSLASH);
                }
                break;
            case cbuildParser.ASSIGN_OP:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 924;
                this.match(cbuildParser.ASSIGN_OP);
                }
                break;
            case cbuildParser.COLON:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 925;
                this.match(cbuildParser.COLON);
                }
                break;
            case cbuildParser.DOUBLE_DOLLAR:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 926;
                this.match(cbuildParser.DOUBLE_DOLLAR);
                }
                break;
            case cbuildParser.PLUS:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 927;
                this.match(cbuildParser.PLUS);
                }
                break;
            case cbuildParser.QUESTION:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 928;
                this.match(cbuildParser.QUESTION);
                }
                break;
            case cbuildParser.BANG:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 929;
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
                this.state = 930;
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
        this.enterRule(localContext, 112, cbuildParser.RULE_char_nested);
        try {
            this.state = 935;
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
                this.state = 933;
                this.char();
                }
                break;
            case cbuildParser.COMMA:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 934;
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
        this.enterRule(localContext, 114, cbuildParser.RULE_char_in_assign);
        try {
            this.state = 944;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 145, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 937;
                this.char_nested();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 938;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 939;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 940;
                this.match(cbuildParser.L_CURLY_BRACE);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 941;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 942;
                this.match(cbuildParser.PIPE);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 943;
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
        this.enterRule(localContext, 116, cbuildParser.RULE_char_in_def);
        try {
            this.state = 965;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 146, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 946;
                this.char();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 947;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 948;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 949;
                this.match(cbuildParser.L_CURLY_BRACE);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 950;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 951;
                this.match(cbuildParser.COMMA);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 952;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 953;
                this.match(cbuildParser.INCLUDE);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 954;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 955;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 956;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 957;
                this.match(cbuildParser.IFDEF);
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 958;
                this.match(cbuildParser.IFNDEF);
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 959;
                this.match(cbuildParser.IFEQ);
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 960;
                this.match(cbuildParser.IFNEQ);
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 961;
                this.match(cbuildParser.ELSE);
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 962;
                this.match(cbuildParser.ENDIF);
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 963;
                this.match(cbuildParser.DEFINE);
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 964;
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
        this.enterRule(localContext, 118, cbuildParser.RULE_char_in_recipe);
        try {
            this.state = 970;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 147, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 967;
                this.char_in_assign();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 968;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 969;
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
        this.enterRule(localContext, 120, cbuildParser.RULE_text);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 973;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 972;
                    this.char();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 975;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 148, this.context);
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
        this.enterRule(localContext, 122, cbuildParser.RULE_text_nested);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 978;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 977;
                    this.char_nested();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 980;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 149, this.context);
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
        this.enterRule(localContext, 124, cbuildParser.RULE_text_in_assign);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 983;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 982;
                    this.char_in_assign();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 985;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 150, this.context);
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
        this.enterRule(localContext, 126, cbuildParser.RULE_text_in_recipe);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 988;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 987;
                    this.char_in_recipe();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 990;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 151, this.context);
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
        this.enterRule(localContext, 128, cbuildParser.RULE_keywords);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 992;
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
        this.enterRule(localContext, 130, cbuildParser.RULE_colon);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 994;
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
        this.enterRule(localContext, 132, cbuildParser.RULE_comment_opt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 997;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 152, this.context) ) {
            case 1:
                {
                this.state = 996;
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
        this.enterRule(localContext, 134, cbuildParser.RULE_ws);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 999;
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
        this.enterRule(localContext, 136, cbuildParser.RULE_hook);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1001;
            this.match(cbuildParser.HOOK);
            this.state = 1003;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 1002;
                this.ws();
                }
            }

            this.state = 1005;
            this.match(cbuildParser.L_CURLY_BRACE);
            this.state = 1006;
            this.hook_program();
            this.state = 1007;
            this.match(cbuildParser.R_CURLY_BRACE);
            this.state = 1009;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 154, this.context) ) {
            case 1:
                {
                this.state = 1008;
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
        this.enterRule(localContext, 138, cbuildParser.RULE_hook_program);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 1014;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 155, this.context);
            while (alternative !== 1 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1 + 1) {
                    {
                    {
                    this.state = 1011;
                    this.matchWildcard();
                    }
                    }
                }
                this.state = 1016;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 155, this.context);
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
        4,1,42,1018,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
        46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,
        52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,
        59,7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,
        65,2,66,7,66,2,67,7,67,2,68,7,68,2,69,7,69,1,0,1,0,1,0,1,0,3,0,145,
        8,0,1,1,1,1,1,1,5,1,150,8,1,10,1,12,1,153,9,1,1,2,1,2,3,2,157,8,
        2,1,2,1,2,3,2,161,8,2,1,2,1,2,3,2,165,8,2,1,2,1,2,3,2,169,8,2,1,
        2,1,2,1,2,1,2,1,2,3,2,176,8,2,1,2,1,2,3,2,180,8,2,1,2,1,2,3,2,184,
        8,2,1,2,1,2,3,2,188,8,2,1,2,1,2,3,2,192,8,2,1,2,1,2,1,2,1,2,1,2,
        1,2,3,2,200,8,2,1,2,1,2,3,2,204,8,2,1,2,1,2,3,2,208,8,2,1,2,1,2,
        3,2,212,8,2,1,2,1,2,1,2,1,2,3,2,218,8,2,1,2,1,2,3,2,222,8,2,1,2,
        1,2,3,2,226,8,2,1,2,1,2,3,2,230,8,2,1,2,1,2,1,2,1,2,1,2,3,2,237,
        8,2,1,2,1,2,3,2,241,8,2,1,2,1,2,3,2,245,8,2,1,2,1,2,3,2,249,8,2,
        1,2,1,2,3,2,253,8,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,261,8,2,1,2,1,2,
        3,2,265,8,2,1,2,1,2,3,2,269,8,2,1,2,1,2,3,2,273,8,2,1,2,1,2,3,2,
        277,8,2,1,3,1,3,3,3,281,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,
        291,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,304,8,3,
        1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,315,8,3,1,3,1,3,1,3,1,3,
        1,3,1,3,1,3,1,3,3,3,325,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,
        1,3,1,3,3,3,338,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,347,8,3,1,4,
        1,4,1,4,1,4,1,5,3,5,354,8,5,1,5,1,5,3,5,358,8,5,1,5,1,5,3,5,362,
        8,5,1,5,1,5,3,5,366,8,5,1,5,1,5,3,5,370,8,5,1,5,1,5,1,5,1,5,3,5,
        376,8,5,1,5,1,5,3,5,380,8,5,1,5,1,5,1,5,1,5,3,5,386,8,5,1,5,1,5,
        1,5,1,5,3,5,392,8,5,1,5,1,5,3,5,396,8,5,1,5,1,5,3,5,400,8,5,1,5,
        3,5,403,8,5,1,6,3,6,406,8,6,1,6,1,6,1,6,1,6,3,6,412,8,6,1,6,3,6,
        415,8,6,1,6,3,6,418,8,6,1,6,1,6,1,6,1,6,1,7,1,7,5,7,426,8,7,10,7,
        12,7,429,9,7,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,3,8,439,8,8,1,9,1,9,
        1,9,1,9,1,10,3,10,446,8,10,1,10,1,10,3,10,450,8,10,1,10,3,10,453,
        8,10,1,10,1,10,3,10,457,8,10,1,10,3,10,460,8,10,1,10,1,10,3,10,464,
        8,10,3,10,466,8,10,1,11,1,11,3,11,470,8,11,1,11,1,11,1,11,1,12,1,
        12,1,12,1,12,1,12,3,12,480,8,12,1,13,1,13,3,13,484,8,13,1,13,1,13,
        3,13,488,8,13,1,13,1,13,1,13,1,13,3,13,494,8,13,1,13,1,13,3,13,498,
        8,13,1,13,1,13,3,13,502,8,13,1,14,1,14,1,14,1,14,1,15,1,15,1,16,
        1,16,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,19,3,19,521,8,19,
        1,20,3,20,524,8,20,1,20,1,20,3,20,528,8,20,1,20,1,20,1,20,5,20,533,
        8,20,10,20,12,20,536,9,20,1,20,3,20,539,8,20,1,21,3,21,542,8,21,
        1,21,1,21,3,21,546,8,21,1,21,1,21,1,21,5,21,551,8,21,10,21,12,21,
        554,9,21,1,21,3,21,557,8,21,1,22,3,22,560,8,22,1,22,1,22,3,22,564,
        8,22,1,22,1,22,1,22,5,22,569,8,22,10,22,12,22,572,9,22,1,22,3,22,
        575,8,22,1,23,3,23,578,8,23,1,23,1,23,3,23,582,8,23,1,23,1,23,1,
        23,5,23,587,8,23,10,23,12,23,590,9,23,1,23,3,23,593,8,23,1,24,1,
        24,3,24,597,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,5,24,607,
        8,24,10,24,12,24,610,9,24,3,24,612,8,24,1,25,1,25,3,25,616,8,25,
        1,25,3,25,619,8,25,1,26,4,26,622,8,26,11,26,12,26,623,1,27,1,27,
        1,27,1,27,1,27,1,27,3,27,632,8,27,1,28,4,28,635,8,28,11,28,12,28,
        636,1,29,1,29,1,29,1,29,1,29,1,29,3,29,645,8,29,1,30,4,30,648,8,
        30,11,30,12,30,649,1,31,1,31,3,31,654,8,31,1,32,4,32,657,8,32,11,
        32,12,32,658,1,33,1,33,3,33,663,8,33,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,3,
        34,722,8,34,1,35,4,35,725,8,35,11,35,12,35,726,1,36,1,36,1,36,1,
        36,1,36,1,36,3,36,735,8,36,1,37,3,37,738,8,37,1,37,1,37,3,37,742,
        8,37,5,37,744,8,37,10,37,12,37,747,9,37,1,38,1,38,1,39,1,39,1,39,
        3,39,754,8,39,1,39,1,39,3,39,758,8,39,1,39,1,39,3,39,762,8,39,1,
        39,1,39,3,39,766,8,39,1,39,3,39,769,8,39,1,39,3,39,772,8,39,1,39,
        1,39,3,39,776,8,39,1,39,1,39,3,39,780,8,39,1,39,1,39,3,39,784,8,
        39,1,39,1,39,3,39,788,8,39,1,39,1,39,3,39,792,8,39,1,40,1,40,3,40,
        796,8,40,1,40,1,40,3,40,800,8,40,1,40,1,40,3,40,804,8,40,1,40,1,
        40,3,40,808,8,40,1,40,1,40,3,40,812,8,40,1,40,1,40,3,40,816,8,40,
        1,40,3,40,819,8,40,1,40,3,40,822,8,40,1,40,1,40,3,40,826,8,40,1,
        41,1,41,1,42,1,42,4,42,832,8,42,11,42,12,42,833,1,43,3,43,837,8,
        43,1,44,3,44,840,8,44,1,45,1,45,1,45,1,45,5,45,846,8,45,10,45,12,
        45,849,9,45,1,46,1,46,4,46,853,8,46,11,46,12,46,854,1,47,1,47,3,
        47,859,8,47,1,48,1,48,3,48,863,8,48,1,48,1,48,1,48,1,48,1,48,3,48,
        870,8,48,1,48,1,48,1,48,3,48,875,8,48,1,48,1,48,1,48,1,48,3,48,881,
        8,48,1,49,1,49,3,49,885,8,49,1,49,1,49,1,50,1,50,1,50,1,50,1,50,
        1,50,1,50,1,50,1,50,1,50,3,50,899,8,50,1,51,1,51,1,51,1,51,1,51,
        1,51,1,51,1,51,1,51,1,51,1,51,3,51,912,8,51,1,52,4,52,915,8,52,11,
        52,12,52,916,1,53,1,53,1,54,1,54,1,55,1,55,1,55,1,55,1,55,1,55,1,
        55,1,55,1,55,3,55,932,8,55,1,56,1,56,3,56,936,8,56,1,57,1,57,1,57,
        1,57,1,57,1,57,1,57,3,57,945,8,57,1,58,1,58,1,58,1,58,1,58,1,58,
        1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,
        3,58,966,8,58,1,59,1,59,1,59,3,59,971,8,59,1,60,4,60,974,8,60,11,
        60,12,60,975,1,61,4,61,979,8,61,11,61,12,61,980,1,62,4,62,984,8,
        62,11,62,12,62,985,1,63,4,63,989,8,63,11,63,12,63,990,1,64,1,64,
        1,65,1,65,1,66,3,66,998,8,66,1,67,1,67,1,68,1,68,3,68,1004,8,68,
        1,68,1,68,1,68,1,68,3,68,1010,8,68,1,69,5,69,1013,8,69,10,69,12,
        69,1016,9,69,1,69,1,1014,0,70,0,2,4,6,8,10,12,14,16,18,20,22,24,
        26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,
        70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,
        110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,0,7,
        1,0,26,27,1,0,24,25,1,0,20,22,2,0,10,14,37,37,2,0,20,20,23,35,1,
        0,6,9,1,0,40,41,1175,0,144,1,0,0,0,2,151,1,0,0,0,4,276,1,0,0,0,6,
        346,1,0,0,0,8,348,1,0,0,0,10,402,1,0,0,0,12,405,1,0,0,0,14,427,1,
        0,0,0,16,438,1,0,0,0,18,440,1,0,0,0,20,465,1,0,0,0,22,467,1,0,0,
        0,24,474,1,0,0,0,26,501,1,0,0,0,28,503,1,0,0,0,30,507,1,0,0,0,32,
        509,1,0,0,0,34,511,1,0,0,0,36,513,1,0,0,0,38,520,1,0,0,0,40,523,
        1,0,0,0,42,541,1,0,0,0,44,559,1,0,0,0,46,577,1,0,0,0,48,611,1,0,
        0,0,50,615,1,0,0,0,52,621,1,0,0,0,54,631,1,0,0,0,56,634,1,0,0,0,
        58,644,1,0,0,0,60,647,1,0,0,0,62,653,1,0,0,0,64,656,1,0,0,0,66,662,
        1,0,0,0,68,721,1,0,0,0,70,724,1,0,0,0,72,734,1,0,0,0,74,737,1,0,
        0,0,76,748,1,0,0,0,78,791,1,0,0,0,80,793,1,0,0,0,82,827,1,0,0,0,
        84,831,1,0,0,0,86,836,1,0,0,0,88,839,1,0,0,0,90,841,1,0,0,0,92,852,
        1,0,0,0,94,856,1,0,0,0,96,880,1,0,0,0,98,882,1,0,0,0,100,898,1,0,
        0,0,102,911,1,0,0,0,104,914,1,0,0,0,106,918,1,0,0,0,108,920,1,0,
        0,0,110,931,1,0,0,0,112,935,1,0,0,0,114,944,1,0,0,0,116,965,1,0,
        0,0,118,970,1,0,0,0,120,973,1,0,0,0,122,978,1,0,0,0,124,983,1,0,
        0,0,126,988,1,0,0,0,128,992,1,0,0,0,130,994,1,0,0,0,132,997,1,0,
        0,0,134,999,1,0,0,0,136,1001,1,0,0,0,138,1014,1,0,0,0,140,141,3,
        2,1,0,141,142,5,0,0,1,142,145,1,0,0,0,143,145,5,0,0,1,144,140,1,
        0,0,0,144,143,1,0,0,0,145,1,1,0,0,0,146,150,3,10,5,0,147,150,3,108,
        54,0,148,150,3,134,67,0,149,146,1,0,0,0,149,147,1,0,0,0,149,148,
        1,0,0,0,150,153,1,0,0,0,151,149,1,0,0,0,151,152,1,0,0,0,152,3,1,
        0,0,0,153,151,1,0,0,0,154,156,3,30,15,0,155,157,3,134,67,0,156,155,
        1,0,0,0,156,157,1,0,0,0,157,158,1,0,0,0,158,160,3,36,18,0,159,161,
        3,134,67,0,160,159,1,0,0,0,160,161,1,0,0,0,161,162,1,0,0,0,162,164,
        3,8,4,0,163,165,3,134,67,0,164,163,1,0,0,0,164,165,1,0,0,0,165,166,
        1,0,0,0,166,168,5,29,0,0,167,169,3,134,67,0,168,167,1,0,0,0,168,
        169,1,0,0,0,169,170,1,0,0,0,170,171,3,132,66,0,171,172,3,108,54,
        0,172,277,1,0,0,0,173,175,3,30,15,0,174,176,3,134,67,0,175,174,1,
        0,0,0,175,176,1,0,0,0,176,177,1,0,0,0,177,179,3,36,18,0,178,180,
        3,134,67,0,179,178,1,0,0,0,179,180,1,0,0,0,180,181,1,0,0,0,181,183,
        3,8,4,0,182,184,3,134,67,0,183,182,1,0,0,0,183,184,1,0,0,0,184,185,
        1,0,0,0,185,187,5,28,0,0,186,188,3,134,67,0,187,186,1,0,0,0,187,
        188,1,0,0,0,188,189,1,0,0,0,189,191,3,8,4,0,190,192,3,134,67,0,191,
        190,1,0,0,0,191,192,1,0,0,0,192,193,1,0,0,0,193,194,5,29,0,0,194,
        195,3,132,66,0,195,196,3,108,54,0,196,277,1,0,0,0,197,199,3,30,15,
        0,198,200,3,134,67,0,199,198,1,0,0,0,199,200,1,0,0,0,200,201,1,0,
        0,0,201,203,3,36,18,0,202,204,3,134,67,0,203,202,1,0,0,0,203,204,
        1,0,0,0,204,205,1,0,0,0,205,207,3,8,4,0,206,208,3,134,67,0,207,206,
        1,0,0,0,207,208,1,0,0,0,208,209,1,0,0,0,209,211,5,28,0,0,210,212,
        3,134,67,0,211,210,1,0,0,0,211,212,1,0,0,0,212,213,1,0,0,0,213,214,
        3,4,2,0,214,277,1,0,0,0,215,217,3,32,16,0,216,218,3,134,67,0,217,
        216,1,0,0,0,217,218,1,0,0,0,218,219,1,0,0,0,219,221,3,84,42,0,220,
        222,3,134,67,0,221,220,1,0,0,0,221,222,1,0,0,0,222,223,1,0,0,0,223,
        225,3,8,4,0,224,226,3,134,67,0,225,224,1,0,0,0,225,226,1,0,0,0,226,
        227,1,0,0,0,227,229,5,29,0,0,228,230,3,134,67,0,229,228,1,0,0,0,
        229,230,1,0,0,0,230,231,1,0,0,0,231,232,3,132,66,0,232,233,3,108,
        54,0,233,277,1,0,0,0,234,236,3,32,16,0,235,237,3,134,67,0,236,235,
        1,0,0,0,236,237,1,0,0,0,237,238,1,0,0,0,238,240,3,84,42,0,239,241,
        3,134,67,0,240,239,1,0,0,0,240,241,1,0,0,0,241,242,1,0,0,0,242,244,
        3,8,4,0,243,245,3,134,67,0,244,243,1,0,0,0,244,245,1,0,0,0,245,246,
        1,0,0,0,246,248,5,28,0,0,247,249,3,134,67,0,248,247,1,0,0,0,248,
        249,1,0,0,0,249,250,1,0,0,0,250,252,3,8,4,0,251,253,3,134,67,0,252,
        251,1,0,0,0,252,253,1,0,0,0,253,254,1,0,0,0,254,255,5,29,0,0,255,
        256,3,132,66,0,256,257,3,108,54,0,257,277,1,0,0,0,258,260,3,32,16,
        0,259,261,3,134,67,0,260,259,1,0,0,0,260,261,1,0,0,0,261,262,1,0,
        0,0,262,264,3,84,42,0,263,265,3,134,67,0,264,263,1,0,0,0,264,265,
        1,0,0,0,265,266,1,0,0,0,266,268,3,8,4,0,267,269,3,134,67,0,268,267,
        1,0,0,0,268,269,1,0,0,0,269,270,1,0,0,0,270,272,5,28,0,0,271,273,
        3,134,67,0,272,271,1,0,0,0,272,273,1,0,0,0,273,274,1,0,0,0,274,275,
        3,4,2,0,275,277,1,0,0,0,276,154,1,0,0,0,276,173,1,0,0,0,276,197,
        1,0,0,0,276,215,1,0,0,0,276,234,1,0,0,0,276,258,1,0,0,0,277,5,1,
        0,0,0,278,280,3,30,15,0,279,281,3,134,67,0,280,279,1,0,0,0,280,281,
        1,0,0,0,281,282,1,0,0,0,282,283,3,36,18,0,283,284,5,38,0,0,284,285,
        3,94,47,0,285,286,5,29,0,0,286,287,3,132,66,0,287,347,1,0,0,0,288,
        290,3,30,15,0,289,291,3,134,67,0,290,289,1,0,0,0,290,291,1,0,0,0,
        291,292,1,0,0,0,292,293,3,36,18,0,293,294,5,38,0,0,294,295,3,94,
        47,0,295,296,5,28,0,0,296,297,5,38,0,0,297,298,3,94,47,0,298,299,
        5,29,0,0,299,300,3,132,66,0,300,347,1,0,0,0,301,303,3,30,15,0,302,
        304,3,134,67,0,303,302,1,0,0,0,303,304,1,0,0,0,304,305,1,0,0,0,305,
        306,3,36,18,0,306,307,5,38,0,0,307,308,3,94,47,0,308,309,5,28,0,
        0,309,310,5,38,0,0,310,311,3,6,3,0,311,347,1,0,0,0,312,314,3,32,
        16,0,313,315,3,134,67,0,314,313,1,0,0,0,314,315,1,0,0,0,315,316,
        1,0,0,0,316,317,3,84,42,0,317,318,5,38,0,0,318,319,3,94,47,0,319,
        320,5,29,0,0,320,321,3,132,66,0,321,347,1,0,0,0,322,324,3,32,16,
        0,323,325,3,134,67,0,324,323,1,0,0,0,324,325,1,0,0,0,325,326,1,0,
        0,0,326,327,3,84,42,0,327,328,5,38,0,0,328,329,3,94,47,0,329,330,
        5,28,0,0,330,331,5,38,0,0,331,332,3,94,47,0,332,333,5,29,0,0,333,
        334,3,132,66,0,334,347,1,0,0,0,335,337,3,32,16,0,336,338,3,134,67,
        0,337,336,1,0,0,0,337,338,1,0,0,0,338,339,1,0,0,0,339,340,3,84,42,
        0,340,341,5,38,0,0,341,342,3,94,47,0,342,343,5,28,0,0,343,344,5,
        38,0,0,344,345,3,6,3,0,345,347,1,0,0,0,346,278,1,0,0,0,346,288,1,
        0,0,0,346,301,1,0,0,0,346,312,1,0,0,0,346,322,1,0,0,0,346,335,1,
        0,0,0,347,7,1,0,0,0,348,349,3,132,66,0,349,350,3,108,54,0,350,351,
        3,2,1,0,351,9,1,0,0,0,352,354,3,134,67,0,353,352,1,0,0,0,353,354,
        1,0,0,0,354,355,1,0,0,0,355,403,5,42,0,0,356,358,3,134,67,0,357,
        356,1,0,0,0,357,358,1,0,0,0,358,359,1,0,0,0,359,403,3,4,2,0,360,
        362,3,134,67,0,361,360,1,0,0,0,361,362,1,0,0,0,362,363,1,0,0,0,363,
        403,3,12,6,0,364,366,3,134,67,0,365,364,1,0,0,0,365,366,1,0,0,0,
        366,367,1,0,0,0,367,403,3,18,9,0,368,370,3,134,67,0,369,368,1,0,
        0,0,369,370,1,0,0,0,370,371,1,0,0,0,371,372,3,20,10,0,372,373,3,
        108,54,0,373,403,1,0,0,0,374,376,3,134,67,0,375,374,1,0,0,0,375,
        376,1,0,0,0,376,377,1,0,0,0,377,403,3,22,11,0,378,380,3,134,67,0,
        379,378,1,0,0,0,379,380,1,0,0,0,380,381,1,0,0,0,381,382,3,26,13,
        0,382,383,3,108,54,0,383,403,1,0,0,0,384,386,3,134,67,0,385,384,
        1,0,0,0,385,386,1,0,0,0,386,387,1,0,0,0,387,388,3,68,34,0,388,389,
        3,108,54,0,389,403,1,0,0,0,390,392,3,134,67,0,391,390,1,0,0,0,391,
        392,1,0,0,0,392,393,1,0,0,0,393,403,3,78,39,0,394,396,3,134,67,0,
        395,394,1,0,0,0,395,396,1,0,0,0,396,397,1,0,0,0,397,403,3,136,68,
        0,398,400,3,134,67,0,399,398,1,0,0,0,399,400,1,0,0,0,400,401,1,0,
        0,0,401,403,3,100,50,0,402,353,1,0,0,0,402,357,1,0,0,0,402,361,1,
        0,0,0,402,365,1,0,0,0,402,369,1,0,0,0,402,375,1,0,0,0,402,379,1,
        0,0,0,402,385,1,0,0,0,402,391,1,0,0,0,402,395,1,0,0,0,402,399,1,
        0,0,0,403,11,1,0,0,0,404,406,3,102,51,0,405,404,1,0,0,0,405,406,
        1,0,0,0,406,407,1,0,0,0,407,408,5,34,0,0,408,409,3,134,67,0,409,
        411,3,84,42,0,410,412,3,134,67,0,411,410,1,0,0,0,411,412,1,0,0,0,
        412,414,1,0,0,0,413,415,5,1,0,0,414,413,1,0,0,0,414,415,1,0,0,0,
        415,417,1,0,0,0,416,418,3,134,67,0,417,416,1,0,0,0,417,418,1,0,0,
        0,418,419,1,0,0,0,419,420,3,14,7,0,420,421,5,23,0,0,421,422,3,108,
        54,0,422,13,1,0,0,0,423,426,3,12,6,0,424,426,3,16,8,0,425,423,1,
        0,0,0,425,424,1,0,0,0,426,429,1,0,0,0,427,425,1,0,0,0,427,428,1,
        0,0,0,428,15,1,0,0,0,429,427,1,0,0,0,430,431,3,132,66,0,431,432,
        3,108,54,0,432,439,1,0,0,0,433,434,3,132,66,0,434,435,3,108,54,0,
        435,436,3,48,24,0,436,437,3,108,54,0,437,439,1,0,0,0,438,430,1,0,
        0,0,438,433,1,0,0,0,439,17,1,0,0,0,440,441,3,34,17,0,441,442,3,40,
        20,0,442,443,3,108,54,0,443,19,1,0,0,0,444,446,3,134,67,0,445,444,
        1,0,0,0,445,446,1,0,0,0,446,447,1,0,0,0,447,449,5,31,0,0,448,450,
        3,134,67,0,449,448,1,0,0,0,449,450,1,0,0,0,450,466,1,0,0,0,451,453,
        3,134,67,0,452,451,1,0,0,0,452,453,1,0,0,0,453,454,1,0,0,0,454,456,
        5,32,0,0,455,457,3,134,67,0,456,455,1,0,0,0,456,457,1,0,0,0,457,
        466,1,0,0,0,458,460,3,134,67,0,459,458,1,0,0,0,459,460,1,0,0,0,460,
        461,1,0,0,0,461,463,3,28,14,0,462,464,3,134,67,0,463,462,1,0,0,0,
        463,464,1,0,0,0,464,466,1,0,0,0,465,445,1,0,0,0,465,452,1,0,0,0,
        465,459,1,0,0,0,466,21,1,0,0,0,467,469,5,35,0,0,468,470,3,24,12,
        0,469,468,1,0,0,0,469,470,1,0,0,0,470,471,1,0,0,0,471,472,3,132,
        66,0,472,473,3,108,54,0,473,23,1,0,0,0,474,475,3,134,67,0,475,479,
        3,84,42,0,476,477,3,134,67,0,477,478,3,40,20,0,478,480,1,0,0,0,479,
        476,1,0,0,0,479,480,1,0,0,0,480,25,1,0,0,0,481,483,3,84,42,0,482,
        484,3,134,67,0,483,482,1,0,0,0,483,484,1,0,0,0,484,485,1,0,0,0,485,
        487,5,1,0,0,486,488,3,44,22,0,487,486,1,0,0,0,487,488,1,0,0,0,488,
        489,1,0,0,0,489,490,3,132,66,0,490,502,1,0,0,0,491,493,3,28,14,0,
        492,494,3,134,67,0,493,492,1,0,0,0,493,494,1,0,0,0,494,495,1,0,0,
        0,495,497,5,1,0,0,496,498,3,44,22,0,497,496,1,0,0,0,497,498,1,0,
        0,0,498,499,1,0,0,0,499,500,3,132,66,0,500,502,1,0,0,0,501,481,1,
        0,0,0,501,491,1,0,0,0,502,27,1,0,0,0,503,504,3,102,51,0,504,505,
        3,134,67,0,505,506,3,84,42,0,506,29,1,0,0,0,507,508,7,0,0,0,508,
        31,1,0,0,0,509,510,7,1,0,0,510,33,1,0,0,0,511,512,7,2,0,0,512,35,
        1,0,0,0,513,514,5,10,0,0,514,515,3,38,19,0,515,516,5,14,0,0,516,
        517,3,38,19,0,517,518,5,11,0,0,518,37,1,0,0,0,519,521,3,40,20,0,
        520,519,1,0,0,0,520,521,1,0,0,0,521,39,1,0,0,0,522,524,3,134,67,
        0,523,522,1,0,0,0,523,524,1,0,0,0,524,525,1,0,0,0,525,527,3,52,26,
        0,526,528,3,134,67,0,527,526,1,0,0,0,527,528,1,0,0,0,528,534,1,0,
        0,0,529,530,3,134,67,0,530,531,3,52,26,0,531,533,1,0,0,0,532,529,
        1,0,0,0,533,536,1,0,0,0,534,532,1,0,0,0,534,535,1,0,0,0,535,538,
        1,0,0,0,536,534,1,0,0,0,537,539,3,134,67,0,538,537,1,0,0,0,538,539,
        1,0,0,0,539,41,1,0,0,0,540,542,3,134,67,0,541,540,1,0,0,0,541,542,
        1,0,0,0,542,543,1,0,0,0,543,545,3,56,28,0,544,546,3,134,67,0,545,
        544,1,0,0,0,545,546,1,0,0,0,546,552,1,0,0,0,547,548,3,134,67,0,548,
        549,3,56,28,0,549,551,1,0,0,0,550,547,1,0,0,0,551,554,1,0,0,0,552,
        550,1,0,0,0,552,553,1,0,0,0,553,556,1,0,0,0,554,552,1,0,0,0,555,
        557,3,134,67,0,556,555,1,0,0,0,556,557,1,0,0,0,557,43,1,0,0,0,558,
        560,3,134,67,0,559,558,1,0,0,0,559,560,1,0,0,0,560,561,1,0,0,0,561,
        563,3,60,30,0,562,564,3,134,67,0,563,562,1,0,0,0,563,564,1,0,0,0,
        564,570,1,0,0,0,565,566,3,134,67,0,566,567,3,60,30,0,567,569,1,0,
        0,0,568,565,1,0,0,0,569,572,1,0,0,0,570,568,1,0,0,0,570,571,1,0,
        0,0,571,574,1,0,0,0,572,570,1,0,0,0,573,575,3,134,67,0,574,573,1,
        0,0,0,574,575,1,0,0,0,575,45,1,0,0,0,576,578,3,134,67,0,577,576,
        1,0,0,0,577,578,1,0,0,0,578,579,1,0,0,0,579,581,3,64,32,0,580,582,
        3,134,67,0,581,580,1,0,0,0,581,582,1,0,0,0,582,588,1,0,0,0,583,584,
        3,134,67,0,584,585,3,64,32,0,585,587,1,0,0,0,586,583,1,0,0,0,587,
        590,1,0,0,0,588,586,1,0,0,0,588,589,1,0,0,0,589,592,1,0,0,0,590,
        588,1,0,0,0,591,593,3,134,67,0,592,591,1,0,0,0,592,593,1,0,0,0,593,
        47,1,0,0,0,594,612,3,108,54,0,595,597,3,108,54,0,596,595,1,0,0,0,
        596,597,1,0,0,0,597,598,1,0,0,0,598,608,3,50,25,0,599,600,3,108,
        54,0,600,601,3,50,25,0,601,607,1,0,0,0,602,607,3,108,54,0,603,604,
        3,134,67,0,604,605,3,64,32,0,605,607,1,0,0,0,606,599,1,0,0,0,606,
        602,1,0,0,0,606,603,1,0,0,0,607,610,1,0,0,0,608,606,1,0,0,0,608,
        609,1,0,0,0,609,612,1,0,0,0,610,608,1,0,0,0,611,594,1,0,0,0,611,
        596,1,0,0,0,612,49,1,0,0,0,613,616,3,116,58,0,614,616,3,68,34,0,
        615,613,1,0,0,0,615,614,1,0,0,0,616,618,1,0,0,0,617,619,3,64,32,
        0,618,617,1,0,0,0,618,619,1,0,0,0,619,51,1,0,0,0,620,622,3,54,27,
        0,621,620,1,0,0,0,622,623,1,0,0,0,623,621,1,0,0,0,623,624,1,0,0,
        0,624,53,1,0,0,0,625,632,3,120,60,0,626,632,3,68,34,0,627,628,5,
        10,0,0,628,629,3,42,21,0,629,630,5,11,0,0,630,632,1,0,0,0,631,625,
        1,0,0,0,631,626,1,0,0,0,631,627,1,0,0,0,632,55,1,0,0,0,633,635,3,
        58,29,0,634,633,1,0,0,0,635,636,1,0,0,0,636,634,1,0,0,0,636,637,
        1,0,0,0,637,57,1,0,0,0,638,645,3,122,61,0,639,645,3,68,34,0,640,
        641,5,10,0,0,641,642,3,42,21,0,642,643,5,11,0,0,643,645,1,0,0,0,
        644,638,1,0,0,0,644,639,1,0,0,0,644,640,1,0,0,0,645,59,1,0,0,0,646,
        648,3,62,31,0,647,646,1,0,0,0,648,649,1,0,0,0,649,647,1,0,0,0,649,
        650,1,0,0,0,650,61,1,0,0,0,651,654,3,124,62,0,652,654,3,68,34,0,
        653,651,1,0,0,0,653,652,1,0,0,0,654,63,1,0,0,0,655,657,3,66,33,0,
        656,655,1,0,0,0,657,658,1,0,0,0,658,656,1,0,0,0,658,659,1,0,0,0,
        659,65,1,0,0,0,660,663,3,126,63,0,661,663,3,68,34,0,662,660,1,0,
        0,0,662,661,1,0,0,0,663,67,1,0,0,0,664,722,5,4,0,0,665,666,5,2,0,
        0,666,667,3,70,35,0,667,668,5,11,0,0,668,722,1,0,0,0,669,670,5,2,
        0,0,670,671,3,70,35,0,671,672,3,134,67,0,672,673,3,74,37,0,673,674,
        5,11,0,0,674,722,1,0,0,0,675,676,5,2,0,0,676,677,3,70,35,0,677,678,
        5,14,0,0,678,679,3,74,37,0,679,680,5,11,0,0,680,722,1,0,0,0,681,
        682,5,2,0,0,682,683,3,70,35,0,683,684,5,9,0,0,684,685,3,40,20,0,
        685,686,5,11,0,0,686,722,1,0,0,0,687,688,5,2,0,0,688,689,3,70,35,
        0,689,690,5,1,0,0,690,691,3,40,20,0,691,692,5,11,0,0,692,722,1,0,
        0,0,693,694,5,3,0,0,694,695,3,70,35,0,695,696,5,13,0,0,696,722,1,
        0,0,0,697,698,5,3,0,0,698,699,3,70,35,0,699,700,3,134,67,0,700,701,
        3,74,37,0,701,702,5,13,0,0,702,722,1,0,0,0,703,704,5,3,0,0,704,705,
        3,70,35,0,705,706,5,14,0,0,706,707,3,74,37,0,707,708,5,13,0,0,708,
        722,1,0,0,0,709,710,5,3,0,0,710,711,3,70,35,0,711,712,5,9,0,0,712,
        713,3,40,20,0,713,714,5,13,0,0,714,722,1,0,0,0,715,716,5,3,0,0,716,
        717,3,70,35,0,717,718,5,1,0,0,718,719,3,40,20,0,719,720,5,13,0,0,
        720,722,1,0,0,0,721,664,1,0,0,0,721,665,1,0,0,0,721,669,1,0,0,0,
        721,675,1,0,0,0,721,681,1,0,0,0,721,687,1,0,0,0,721,693,1,0,0,0,
        721,697,1,0,0,0,721,703,1,0,0,0,721,709,1,0,0,0,721,715,1,0,0,0,
        722,69,1,0,0,0,723,725,3,72,36,0,724,723,1,0,0,0,725,726,1,0,0,0,
        726,724,1,0,0,0,726,727,1,0,0,0,727,71,1,0,0,0,728,735,5,37,0,0,
        729,735,5,17,0,0,730,735,5,18,0,0,731,735,5,15,0,0,732,735,5,19,
        0,0,733,735,3,68,34,0,734,728,1,0,0,0,734,729,1,0,0,0,734,730,1,
        0,0,0,734,731,1,0,0,0,734,732,1,0,0,0,734,733,1,0,0,0,735,73,1,0,
        0,0,736,738,3,76,38,0,737,736,1,0,0,0,737,738,1,0,0,0,738,745,1,
        0,0,0,739,741,5,14,0,0,740,742,3,76,38,0,741,740,1,0,0,0,741,742,
        1,0,0,0,742,744,1,0,0,0,743,739,1,0,0,0,744,747,1,0,0,0,745,743,
        1,0,0,0,745,746,1,0,0,0,746,75,1,0,0,0,747,745,1,0,0,0,748,749,3,
        40,20,0,749,77,1,0,0,0,750,792,3,80,40,0,751,753,3,90,45,0,752,754,
        3,134,67,0,753,752,1,0,0,0,753,754,1,0,0,0,754,755,1,0,0,0,755,757,
        3,130,65,0,756,758,3,134,67,0,757,756,1,0,0,0,757,758,1,0,0,0,758,
        759,1,0,0,0,759,768,3,86,43,0,760,762,3,134,67,0,761,760,1,0,0,0,
        761,762,1,0,0,0,762,763,1,0,0,0,763,765,5,15,0,0,764,766,3,134,67,
        0,765,764,1,0,0,0,765,766,1,0,0,0,766,767,1,0,0,0,767,769,3,88,44,
        0,768,761,1,0,0,0,768,769,1,0,0,0,769,771,1,0,0,0,770,772,3,134,
        67,0,771,770,1,0,0,0,771,772,1,0,0,0,772,773,1,0,0,0,773,775,5,38,
        0,0,774,776,3,92,46,0,775,774,1,0,0,0,775,776,1,0,0,0,776,792,1,
        0,0,0,777,779,3,90,45,0,778,780,3,134,67,0,779,778,1,0,0,0,779,780,
        1,0,0,0,780,781,1,0,0,0,781,783,3,130,65,0,782,784,3,134,67,0,783,
        782,1,0,0,0,783,784,1,0,0,0,784,785,1,0,0,0,785,787,3,26,13,0,786,
        788,3,134,67,0,787,786,1,0,0,0,787,788,1,0,0,0,788,789,1,0,0,0,789,
        790,5,38,0,0,790,792,1,0,0,0,791,750,1,0,0,0,791,751,1,0,0,0,791,
        777,1,0,0,0,792,79,1,0,0,0,793,795,3,90,45,0,794,796,3,134,67,0,
        795,794,1,0,0,0,795,796,1,0,0,0,796,797,1,0,0,0,797,799,3,130,65,
        0,798,800,3,134,67,0,799,798,1,0,0,0,799,800,1,0,0,0,800,801,1,0,
        0,0,801,803,3,84,42,0,802,804,3,134,67,0,803,802,1,0,0,0,803,804,
        1,0,0,0,804,805,1,0,0,0,805,807,3,130,65,0,806,808,3,134,67,0,807,
        806,1,0,0,0,807,808,1,0,0,0,808,809,1,0,0,0,809,818,3,86,43,0,810,
        812,3,134,67,0,811,810,1,0,0,0,811,812,1,0,0,0,812,813,1,0,0,0,813,
        815,5,15,0,0,814,816,3,134,67,0,815,814,1,0,0,0,815,816,1,0,0,0,
        816,817,1,0,0,0,817,819,3,88,44,0,818,811,1,0,0,0,818,819,1,0,0,
        0,819,821,1,0,0,0,820,822,3,134,67,0,821,820,1,0,0,0,821,822,1,0,
        0,0,822,823,1,0,0,0,823,825,5,38,0,0,824,826,3,92,46,0,825,824,1,
        0,0,0,825,826,1,0,0,0,826,81,1,0,0,0,827,828,3,84,42,0,828,83,1,
        0,0,0,829,832,3,104,52,0,830,832,3,68,34,0,831,829,1,0,0,0,831,830,
        1,0,0,0,832,833,1,0,0,0,833,831,1,0,0,0,833,834,1,0,0,0,834,85,1,
        0,0,0,835,837,3,90,45,0,836,835,1,0,0,0,836,837,1,0,0,0,837,87,1,
        0,0,0,838,840,3,90,45,0,839,838,1,0,0,0,839,840,1,0,0,0,840,89,1,
        0,0,0,841,847,3,82,41,0,842,843,3,134,67,0,843,844,3,82,41,0,844,
        846,1,0,0,0,845,842,1,0,0,0,846,849,1,0,0,0,847,845,1,0,0,0,847,
        848,1,0,0,0,848,91,1,0,0,0,849,847,1,0,0,0,850,853,3,96,48,0,851,
        853,3,98,49,0,852,850,1,0,0,0,852,851,1,0,0,0,853,854,1,0,0,0,854,
        852,1,0,0,0,854,855,1,0,0,0,855,93,1,0,0,0,856,858,3,132,66,0,857,
        859,3,92,46,0,858,857,1,0,0,0,858,859,1,0,0,0,859,95,1,0,0,0,860,
        862,5,39,0,0,861,863,3,134,67,0,862,861,1,0,0,0,862,863,1,0,0,0,
        863,864,1,0,0,0,864,865,3,46,23,0,865,866,5,38,0,0,866,881,1,0,0,
        0,867,869,5,39,0,0,868,870,3,134,67,0,869,868,1,0,0,0,869,870,1,
        0,0,0,870,871,1,0,0,0,871,872,5,42,0,0,872,881,5,38,0,0,873,875,
        3,134,67,0,874,873,1,0,0,0,874,875,1,0,0,0,875,876,1,0,0,0,876,877,
        5,42,0,0,877,881,5,38,0,0,878,881,3,6,3,0,879,881,5,38,0,0,880,860,
        1,0,0,0,880,867,1,0,0,0,880,874,1,0,0,0,880,878,1,0,0,0,880,879,
        1,0,0,0,881,97,1,0,0,0,882,884,5,39,0,0,883,885,3,134,67,0,884,883,
        1,0,0,0,884,885,1,0,0,0,885,886,1,0,0,0,886,887,5,38,0,0,887,99,
        1,0,0,0,888,889,5,33,0,0,889,890,3,134,67,0,890,891,3,84,42,0,891,
        899,1,0,0,0,892,893,5,30,0,0,893,894,3,134,67,0,894,895,5,33,0,0,
        895,896,3,134,67,0,896,897,3,84,42,0,897,899,1,0,0,0,898,888,1,0,
        0,0,898,892,1,0,0,0,899,101,1,0,0,0,900,912,5,30,0,0,901,912,5,31,
        0,0,902,912,5,32,0,0,903,904,5,30,0,0,904,905,3,134,67,0,905,906,
        5,31,0,0,906,912,1,0,0,0,907,908,5,31,0,0,908,909,3,134,67,0,909,
        910,5,30,0,0,910,912,1,0,0,0,911,900,1,0,0,0,911,901,1,0,0,0,911,
        902,1,0,0,0,911,903,1,0,0,0,911,907,1,0,0,0,912,103,1,0,0,0,913,
        915,3,106,53,0,914,913,1,0,0,0,915,916,1,0,0,0,916,914,1,0,0,0,916,
        917,1,0,0,0,917,105,1,0,0,0,918,919,7,3,0,0,919,107,1,0,0,0,920,
        921,5,38,0,0,921,109,1,0,0,0,922,932,5,37,0,0,923,932,5,16,0,0,924,
        932,5,1,0,0,925,932,5,9,0,0,926,932,5,5,0,0,927,932,5,17,0,0,928,
        932,5,18,0,0,929,932,5,19,0,0,930,932,3,128,64,0,931,922,1,0,0,0,
        931,923,1,0,0,0,931,924,1,0,0,0,931,925,1,0,0,0,931,926,1,0,0,0,
        931,927,1,0,0,0,931,928,1,0,0,0,931,929,1,0,0,0,931,930,1,0,0,0,
        932,111,1,0,0,0,933,936,3,110,55,0,934,936,5,14,0,0,935,933,1,0,
        0,0,935,934,1,0,0,0,936,113,1,0,0,0,937,945,3,112,56,0,938,945,5,
        10,0,0,939,945,5,11,0,0,940,945,5,12,0,0,941,945,5,13,0,0,942,945,
        5,15,0,0,943,945,3,128,64,0,944,937,1,0,0,0,944,938,1,0,0,0,944,
        939,1,0,0,0,944,940,1,0,0,0,944,941,1,0,0,0,944,942,1,0,0,0,944,
        943,1,0,0,0,945,115,1,0,0,0,946,966,3,110,55,0,947,966,5,10,0,0,
        948,966,5,11,0,0,949,966,5,12,0,0,950,966,5,13,0,0,951,966,5,14,
        0,0,952,966,5,42,0,0,953,966,5,20,0,0,954,966,5,30,0,0,955,966,5,
        31,0,0,956,966,5,32,0,0,957,966,5,24,0,0,958,966,5,25,0,0,959,966,
        5,26,0,0,960,966,5,27,0,0,961,966,5,28,0,0,962,966,5,29,0,0,963,
        966,5,34,0,0,964,966,5,33,0,0,965,946,1,0,0,0,965,947,1,0,0,0,965,
        948,1,0,0,0,965,949,1,0,0,0,965,950,1,0,0,0,965,951,1,0,0,0,965,
        952,1,0,0,0,965,953,1,0,0,0,965,954,1,0,0,0,965,955,1,0,0,0,965,
        956,1,0,0,0,965,957,1,0,0,0,965,958,1,0,0,0,965,959,1,0,0,0,965,
        960,1,0,0,0,965,961,1,0,0,0,965,962,1,0,0,0,965,963,1,0,0,0,965,
        964,1,0,0,0,966,117,1,0,0,0,967,971,3,114,57,0,968,971,5,42,0,0,
        969,971,5,15,0,0,970,967,1,0,0,0,970,968,1,0,0,0,970,969,1,0,0,0,
        971,119,1,0,0,0,972,974,3,110,55,0,973,972,1,0,0,0,974,975,1,0,0,
        0,975,973,1,0,0,0,975,976,1,0,0,0,976,121,1,0,0,0,977,979,3,112,
        56,0,978,977,1,0,0,0,979,980,1,0,0,0,980,978,1,0,0,0,980,981,1,0,
        0,0,981,123,1,0,0,0,982,984,3,114,57,0,983,982,1,0,0,0,984,985,1,
        0,0,0,985,983,1,0,0,0,985,986,1,0,0,0,986,125,1,0,0,0,987,989,3,
        118,59,0,988,987,1,0,0,0,989,990,1,0,0,0,990,988,1,0,0,0,990,991,
        1,0,0,0,991,127,1,0,0,0,992,993,7,4,0,0,993,129,1,0,0,0,994,995,
        7,5,0,0,995,131,1,0,0,0,996,998,5,42,0,0,997,996,1,0,0,0,997,998,
        1,0,0,0,998,133,1,0,0,0,999,1000,7,6,0,0,1000,135,1,0,0,0,1001,1003,
        5,36,0,0,1002,1004,3,134,67,0,1003,1002,1,0,0,0,1003,1004,1,0,0,
        0,1004,1005,1,0,0,0,1005,1006,5,12,0,0,1006,1007,3,138,69,0,1007,
        1009,5,13,0,0,1008,1010,3,134,67,0,1009,1008,1,0,0,0,1009,1010,1,
        0,0,0,1010,137,1,0,0,0,1011,1013,9,0,0,0,1012,1011,1,0,0,0,1013,
        1016,1,0,0,0,1014,1015,1,0,0,0,1014,1012,1,0,0,0,1015,139,1,0,0,
        0,1016,1014,1,0,0,0,156,144,149,151,156,160,164,168,175,179,183,
        187,191,199,203,207,211,217,221,225,229,236,240,244,248,252,260,
        264,268,272,276,280,290,303,314,324,337,346,353,357,361,365,369,
        375,379,385,391,395,399,402,405,411,414,417,425,427,438,445,449,
        452,456,459,463,465,469,479,483,487,493,497,501,520,523,527,534,
        538,541,545,552,556,559,563,570,574,577,581,588,592,596,606,608,
        611,615,618,623,631,636,644,649,653,658,662,721,726,734,737,741,
        745,753,757,761,765,768,771,775,779,783,787,791,795,799,803,807,
        811,815,818,821,825,831,833,836,839,847,852,854,858,862,869,874,
        880,884,898,911,916,931,935,944,965,970,975,980,985,990,997,1003,
        1009,1014
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
    public undefine(): UndefineContext | null {
        return this.getRuleContext(0, UndefineContext);
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
    public ws(): WsContext[];
    public ws(i: number): WsContext | null;
    public ws(i?: number): WsContext[] | WsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(WsContext);
        }

        return this.getRuleContext(i, WsContext);
    }
    public UNEXPORT(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.UNEXPORT, 0);
    }
    public assignment_prefix(): Assignment_prefixContext | null {
        return this.getRuleContext(0, Assignment_prefixContext);
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
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.PLUS, 0);
    }
    public QUESTION(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.QUESTION, 0);
    }
    public PIPE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.PIPE, 0);
    }
    public BANG(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.BANG, 0);
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
    public empty_recipe_line(): Empty_recipe_lineContext[];
    public empty_recipe_line(i: number): Empty_recipe_lineContext | null;
    public empty_recipe_line(i?: number): Empty_recipe_lineContext[] | Empty_recipe_lineContext | null {
        if (i === undefined) {
            return this.getRuleContexts(Empty_recipe_lineContext);
        }

        return this.getRuleContext(i, Empty_recipe_lineContext);
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


export class Empty_recipe_lineContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LEADING_TAB(): antlr.TerminalNode {
        return this.getToken(cbuildParser.LEADING_TAB, 0)!;
    }
    public NL(): antlr.TerminalNode {
        return this.getToken(cbuildParser.NL, 0)!;
    }
    public ws(): WsContext | null {
        return this.getRuleContext(0, WsContext);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_empty_recipe_line;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterEmpty_recipe_line) {
             listener.enterEmpty_recipe_line(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitEmpty_recipe_line) {
             listener.exitEmpty_recipe_line(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitEmpty_recipe_line) {
            return visitor.visitEmpty_recipe_line(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UndefineContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public UNDEFINE(): antlr.TerminalNode {
        return this.getToken(cbuildParser.UNDEFINE, 0)!;
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
    public OVERRIDE(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.OVERRIDE, 0);
    }
    public override get ruleIndex(): number {
        return cbuildParser.RULE_undefine;
    }
    public override enterRule(listener: cbuildListener): void {
        if(listener.enterUndefine) {
             listener.enterUndefine(this);
        }
    }
    public override exitRule(listener: cbuildListener): void {
        if(listener.exitUndefine) {
             listener.exitUndefine(this);
        }
    }
    public override accept<Result>(visitor: cbuildVisitor<Result>): Result | null {
        if (visitor.visitUndefine) {
            return visitor.visitUndefine(this);
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
