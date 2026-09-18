
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
    public static readonly RULE_undefine = 49;
    public static readonly RULE_specifiers = 50;
    public static readonly RULE_identifier = 51;
    public static readonly RULE_identifier_atom = 52;
    public static readonly RULE_br = 53;
    public static readonly RULE_char = 54;
    public static readonly RULE_char_nested = 55;
    public static readonly RULE_char_in_assign = 56;
    public static readonly RULE_char_in_def = 57;
    public static readonly RULE_char_in_recipe = 58;
    public static readonly RULE_text = 59;
    public static readonly RULE_text_nested = 60;
    public static readonly RULE_text_in_assign = 61;
    public static readonly RULE_text_in_recipe = 62;
    public static readonly RULE_keywords = 63;
    public static readonly RULE_colon = 64;
    public static readonly RULE_comment_opt = 65;
    public static readonly RULE_ws = 66;
    public static readonly RULE_hook = 67;
    public static readonly RULE_hook_program = 68;

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
        "targets", "recipes", "recipes_opt", "recipe", "undefine", "specifiers", 
        "identifier", "identifier_atom", "br", "char", "char_nested", "char_in_assign", 
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
            this.state = 142;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 0, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 138;
                this.statements();
                this.state = 139;
                this.match(cbuildParser.EOF);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 141;
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
            this.state = 149;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 147;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
                    case 1:
                        {
                        this.state = 144;
                        this.statement();
                        }
                        break;
                    case 2:
                        {
                        this.state = 145;
                        this.br();
                        }
                        break;
                    case 3:
                        {
                        this.state = 146;
                        this.ws();
                        }
                        break;
                    }
                    }
                }
                this.state = 151;
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
            this.state = 274;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 152;
                this.if_eq_kw();
                this.state = 154;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 153;
                    this.ws();
                    }
                }

                this.state = 156;
                this.condition();
                this.state = 158;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 157;
                    this.ws();
                    }
                }

                this.state = 160;
                this.statements_opt();
                this.state = 162;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 161;
                    this.ws();
                    }
                }

                this.state = 164;
                this.match(cbuildParser.ENDIF);
                this.state = 166;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 165;
                    this.ws();
                    }
                }

                this.state = 168;
                this.comment_opt();
                this.state = 169;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 171;
                this.if_eq_kw();
                this.state = 173;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 172;
                    this.ws();
                    }
                }

                this.state = 175;
                this.condition();
                this.state = 177;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 176;
                    this.ws();
                    }
                }

                this.state = 179;
                this.statements_opt();
                this.state = 181;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 180;
                    this.ws();
                    }
                }

                this.state = 183;
                this.match(cbuildParser.ELSE);
                this.state = 185;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 184;
                    this.ws();
                    }
                }

                this.state = 187;
                this.statements_opt();
                this.state = 189;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 188;
                    this.ws();
                    }
                }

                this.state = 191;
                this.match(cbuildParser.ENDIF);
                this.state = 192;
                this.comment_opt();
                this.state = 193;
                this.br();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 195;
                this.if_eq_kw();
                this.state = 197;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 196;
                    this.ws();
                    }
                }

                this.state = 199;
                this.condition();
                this.state = 201;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 200;
                    this.ws();
                    }
                }

                this.state = 203;
                this.statements_opt();
                this.state = 205;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 204;
                    this.ws();
                    }
                }

                this.state = 207;
                this.match(cbuildParser.ELSE);
                this.state = 209;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 208;
                    this.ws();
                    }
                }

                this.state = 211;
                this.conditional();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 213;
                this.if_def_kw();
                this.state = 215;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 214;
                    this.ws();
                    }
                }

                this.state = 217;
                this.pattern();
                this.state = 219;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 218;
                    this.ws();
                    }
                }

                this.state = 221;
                this.statements_opt();
                this.state = 223;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 222;
                    this.ws();
                    }
                }

                this.state = 225;
                this.match(cbuildParser.ENDIF);
                this.state = 227;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 226;
                    this.ws();
                    }
                }

                this.state = 229;
                this.comment_opt();
                this.state = 230;
                this.br();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 232;
                this.if_def_kw();
                this.state = 234;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 233;
                    this.ws();
                    }
                }

                this.state = 236;
                this.pattern();
                this.state = 238;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 237;
                    this.ws();
                    }
                }

                this.state = 240;
                this.statements_opt();
                this.state = 242;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 241;
                    this.ws();
                    }
                }

                this.state = 244;
                this.match(cbuildParser.ELSE);
                this.state = 246;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 245;
                    this.ws();
                    }
                }

                this.state = 248;
                this.statements_opt();
                this.state = 250;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 249;
                    this.ws();
                    }
                }

                this.state = 252;
                this.match(cbuildParser.ENDIF);
                this.state = 253;
                this.comment_opt();
                this.state = 254;
                this.br();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 256;
                this.if_def_kw();
                this.state = 258;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 257;
                    this.ws();
                    }
                }

                this.state = 260;
                this.pattern();
                this.state = 262;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 261;
                    this.ws();
                    }
                }

                this.state = 264;
                this.statements_opt();
                this.state = 266;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 265;
                    this.ws();
                    }
                }

                this.state = 268;
                this.match(cbuildParser.ELSE);
                this.state = 270;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 269;
                    this.ws();
                    }
                }

                this.state = 272;
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
            this.state = 344;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 36, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 276;
                this.if_eq_kw();
                this.state = 278;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 277;
                    this.ws();
                    }
                }

                this.state = 280;
                this.condition();
                this.state = 281;
                this.match(cbuildParser.NL);
                this.state = 282;
                this.recipes_opt();
                this.state = 283;
                this.match(cbuildParser.ENDIF);
                this.state = 284;
                this.comment_opt();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 286;
                this.if_eq_kw();
                this.state = 288;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 287;
                    this.ws();
                    }
                }

                this.state = 290;
                this.condition();
                this.state = 291;
                this.match(cbuildParser.NL);
                this.state = 292;
                this.recipes_opt();
                this.state = 293;
                this.match(cbuildParser.ELSE);
                this.state = 294;
                this.match(cbuildParser.NL);
                this.state = 295;
                this.recipes_opt();
                this.state = 296;
                this.match(cbuildParser.ENDIF);
                this.state = 297;
                this.comment_opt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 299;
                this.if_eq_kw();
                this.state = 301;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 300;
                    this.ws();
                    }
                }

                this.state = 303;
                this.condition();
                this.state = 304;
                this.match(cbuildParser.NL);
                this.state = 305;
                this.recipes_opt();
                this.state = 306;
                this.match(cbuildParser.ELSE);
                this.state = 307;
                this.match(cbuildParser.NL);
                this.state = 308;
                this.conditional_in_recipe();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 310;
                this.if_def_kw();
                this.state = 312;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 311;
                    this.ws();
                    }
                }

                this.state = 314;
                this.pattern();
                this.state = 315;
                this.match(cbuildParser.NL);
                this.state = 316;
                this.recipes_opt();
                this.state = 317;
                this.match(cbuildParser.ENDIF);
                this.state = 318;
                this.comment_opt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 320;
                this.if_def_kw();
                this.state = 322;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 321;
                    this.ws();
                    }
                }

                this.state = 324;
                this.pattern();
                this.state = 325;
                this.match(cbuildParser.NL);
                this.state = 326;
                this.recipes_opt();
                this.state = 327;
                this.match(cbuildParser.ELSE);
                this.state = 328;
                this.match(cbuildParser.NL);
                this.state = 329;
                this.recipes_opt();
                this.state = 330;
                this.match(cbuildParser.ENDIF);
                this.state = 331;
                this.comment_opt();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 333;
                this.if_def_kw();
                this.state = 335;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 334;
                    this.ws();
                    }
                }

                this.state = 337;
                this.pattern();
                this.state = 338;
                this.match(cbuildParser.NL);
                this.state = 339;
                this.recipes_opt();
                this.state = 340;
                this.match(cbuildParser.ELSE);
                this.state = 341;
                this.match(cbuildParser.NL);
                this.state = 342;
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
            this.state = 346;
            this.comment_opt();
            this.state = 347;
            this.br();
            this.state = 348;
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
            this.state = 400;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 48, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 351;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 350;
                    this.ws();
                    }
                }

                this.state = 353;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 355;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 354;
                    this.ws();
                    }
                }

                this.state = 357;
                this.conditional();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 359;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 358;
                    this.ws();
                    }
                }

                this.state = 361;
                this.define();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 363;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 362;
                    this.ws();
                    }
                }

                this.state = 365;
                this.include();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 367;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 366;
                    this.ws();
                    }
                }

                this.state = 369;
                this.export_();
                this.state = 370;
                this.br();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 373;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 372;
                    this.ws();
                    }
                }

                this.state = 375;
                this.vpath();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 377;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 376;
                    this.ws();
                    }
                }

                this.state = 379;
                this.assignment();
                this.state = 380;
                this.br();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 383;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 382;
                    this.ws();
                    }
                }

                this.state = 385;
                this.function_();
                this.state = 386;
                this.br();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 389;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 388;
                    this.ws();
                    }
                }

                this.state = 391;
                this.rule();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 393;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 392;
                    this.ws();
                    }
                }

                this.state = 395;
                this.hook();
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 397;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 396;
                    this.ws();
                    }
                }

                this.state = 399;
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
            this.state = 403;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 30)) & ~0x1F) === 0 && ((1 << (_la - 30)) & 7) !== 0)) {
                {
                this.state = 402;
                this.specifiers();
                }
            }

            this.state = 405;
            this.match(cbuildParser.DEFINE);
            this.state = 406;
            this.ws();
            this.state = 407;
            this.pattern();
            this.state = 409;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context) ) {
            case 1:
                {
                this.state = 408;
                this.ws();
                }
                break;
            }
            this.state = 412;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 411;
                this.match(cbuildParser.ASSIGN_OP);
                }
            }

            this.state = 415;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 414;
                this.ws();
                }
            }

            this.state = 417;
            this.define_body();
            this.state = 418;
            this.match(cbuildParser.ENDEF);
            this.state = 419;
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
            this.state = 425;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 30)) & ~0x1F) === 0 && ((1 << (_la - 30)) & 4375) !== 0)) {
                {
                this.state = 423;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case cbuildParser.OVERRIDE:
                case cbuildParser.EXPORT:
                case cbuildParser.UNEXPORT:
                case cbuildParser.DEFINE:
                    {
                    this.state = 421;
                    this.define();
                    }
                    break;
                case cbuildParser.NL:
                case cbuildParser.COMMENT:
                    {
                    this.state = 422;
                    this.definition();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 427;
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
            this.state = 436;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 55, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 428;
                this.comment_opt();
                this.state = 429;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 431;
                this.comment_opt();
                this.state = 432;
                this.br();
                this.state = 433;
                this.exprs_in_def();
                this.state = 434;
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
            this.state = 438;
            this.include_kw();
            this.state = 439;
            this.expressions();
            this.state = 440;
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
            this.state = 450;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 57, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 442;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 443;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 444;
                this.assignment_prefix();
                this.state = 448;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 445;
                    this.ws();
                    this.state = 446;
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
            this.state = 452;
            this.match(cbuildParser.VPATH);
            this.state = 454;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 453;
                this.vpath_args();
                }
            }

            this.state = 456;
            this.comment_opt();
            this.state = 457;
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
            this.state = 459;
            this.ws();
            this.state = 460;
            this.pattern();
            this.state = 464;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 461;
                this.ws();
                this.state = 462;
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
            this.state = 486;
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
                this.state = 466;
                this.pattern();
                this.state = 468;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 467;
                    this.ws();
                    }
                }

                this.state = 470;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 472;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 61, this.context) ) {
                case 1:
                    {
                    this.state = 471;
                    this.exprs_in_assign();
                    }
                    break;
                }
                this.state = 474;
                this.comment_opt();
                }
                break;
            case cbuildParser.OVERRIDE:
            case cbuildParser.EXPORT:
            case cbuildParser.UNEXPORT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 476;
                this.assignment_prefix();
                this.state = 478;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 477;
                    this.ws();
                    }
                }

                this.state = 480;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 482;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 63, this.context) ) {
                case 1:
                    {
                    this.state = 481;
                    this.exprs_in_assign();
                    }
                    break;
                }
                this.state = 484;
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
            this.state = 488;
            this.specifiers();
            this.state = 489;
            this.ws();
            this.state = 490;
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
            this.state = 492;
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
            this.state = 494;
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
            this.state = 496;
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
            this.state = 498;
            this.match(cbuildParser.LPAREN);
            this.state = 499;
            this.expressions_opt();
            this.state = 500;
            this.match(cbuildParser.COMMA);
            this.state = 501;
            this.expressions_opt();
            this.state = 502;
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
            this.state = 505;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288611902) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 815) !== 0)) {
                {
                this.state = 504;
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
            this.state = 508;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 507;
                this.ws();
                }
            }

            this.state = 510;
            this.expression();
            this.state = 512;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 67, this.context) ) {
            case 1:
                {
                this.state = 511;
                this.ws();
                }
                break;
            }
            this.state = 519;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 68, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 514;
                    this.ws();
                    this.state = 515;
                    this.expression();
                    }
                    }
                }
                this.state = 521;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 68, this.context);
            }
            this.state = 523;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 522;
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
            this.state = 526;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 525;
                this.ws();
                }
            }

            this.state = 528;
            this.expr_nested();
            this.state = 530;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 71, this.context) ) {
            case 1:
                {
                this.state = 529;
                this.ws();
                }
                break;
            }
            this.state = 537;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 72, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 532;
                    this.ws();
                    this.state = 533;
                    this.expr_nested();
                    }
                    }
                }
                this.state = 539;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 72, this.context);
            }
            this.state = 541;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 540;
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
            this.state = 544;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 543;
                this.ws();
                }
            }

            this.state = 546;
            this.expr_in_assign();
            this.state = 548;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 75, this.context) ) {
            case 1:
                {
                this.state = 547;
                this.ws();
                }
                break;
            }
            this.state = 555;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 550;
                    this.ws();
                    this.state = 551;
                    this.expr_in_assign();
                    }
                    }
                }
                this.state = 557;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 76, this.context);
            }
            this.state = 559;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 77, this.context) ) {
            case 1:
                {
                this.state = 558;
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
            this.state = 562;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 561;
                this.ws();
                }
            }

            this.state = 564;
            this.expr_in_recipe();
            this.state = 566;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 79, this.context) ) {
            case 1:
                {
                this.state = 565;
                this.ws();
                }
                break;
            }
            this.state = 573;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 568;
                    this.ws();
                    this.state = 569;
                    this.expr_in_recipe();
                    }
                    }
                }
                this.state = 575;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 80, this.context);
            }
            this.state = 577;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 576;
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
            this.state = 596;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 85, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 579;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 581;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 38) {
                    {
                    this.state = 580;
                    this.br();
                    }
                }

                this.state = 583;
                this.first_expr_in_def();
                this.state = 593;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 84, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        this.state = 591;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 83, this.context) ) {
                        case 1:
                            {
                            {
                            this.state = 584;
                            this.br();
                            this.state = 585;
                            this.first_expr_in_def();
                            }
                            }
                            break;
                        case 2:
                            {
                            {
                            this.state = 587;
                            this.br();
                            }
                            }
                            break;
                        case 3:
                            {
                            {
                            this.state = 588;
                            this.ws();
                            this.state = 589;
                            this.expr_in_recipe();
                            }
                            }
                            break;
                        }
                        }
                    }
                    this.state = 595;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 84, this.context);
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
            this.state = 600;
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
                this.state = 598;
                this.char_in_def();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                {
                this.state = 599;
                this.function_();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 603;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288675390) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1071) !== 0)) {
                {
                this.state = 602;
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
            this.state = 606;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 605;
                this.expression_atom();
                }
                }
                this.state = 608;
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
            this.state = 616;
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
                this.state = 610;
                this.text();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 611;
                this.function_();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 612;
                this.match(cbuildParser.LPAREN);
                this.state = 613;
                this.exprs_nested();
                this.state = 614;
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
            this.state = 619;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 618;
                this.expr_nested_atom();
                }
                }
                this.state = 621;
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
            this.state = 629;
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
                this.state = 623;
                this.text_nested();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 624;
                this.function_();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 625;
                this.match(cbuildParser.LPAREN);
                this.state = 626;
                this.exprs_nested();
                this.state = 627;
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
            this.state = 632;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 631;
                this.expr_in_assign_atom();
                }
                }
                this.state = 634;
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
                this.state = 636;
                this.text_in_assign();
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
    public expr_in_recipe(): Expr_in_recipeContext {
        let localContext = new Expr_in_recipeContext(this.context, this.state);
        this.enterRule(localContext, 64, cbuildParser.RULE_expr_in_recipe);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 641;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 640;
                this.expr_in_recipe_atom();
                }
                }
                this.state = 643;
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
            this.state = 647;
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
                this.state = 645;
                this.text_in_recipe();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 646;
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
            this.state = 706;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 96, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 649;
                this.match(cbuildParser.VAR);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 650;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 651;
                this.function_name();
                this.state = 652;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 654;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 655;
                this.function_name();
                this.state = 656;
                this.ws();
                this.state = 657;
                this.arguments();
                this.state = 658;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 660;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 661;
                this.function_name();
                this.state = 662;
                this.match(cbuildParser.COMMA);
                this.state = 663;
                this.arguments();
                this.state = 664;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 666;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 667;
                this.function_name();
                this.state = 668;
                this.match(cbuildParser.COLON);
                this.state = 669;
                this.expressions();
                this.state = 670;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 672;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 673;
                this.function_name();
                this.state = 674;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 675;
                this.expressions();
                this.state = 676;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 678;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 679;
                this.function_name();
                this.state = 680;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 682;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 683;
                this.function_name();
                this.state = 684;
                this.ws();
                this.state = 685;
                this.arguments();
                this.state = 686;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 688;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 689;
                this.function_name();
                this.state = 690;
                this.match(cbuildParser.COMMA);
                this.state = 691;
                this.arguments();
                this.state = 692;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 694;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 695;
                this.function_name();
                this.state = 696;
                this.match(cbuildParser.COLON);
                this.state = 697;
                this.expressions();
                this.state = 698;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 700;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 701;
                this.function_name();
                this.state = 702;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 703;
                this.expressions();
                this.state = 704;
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
            this.state = 709;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 708;
                this.function_name_atom();
                }
                }
                this.state = 711;
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
            this.state = 715;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 713;
                this.match(cbuildParser.CHARS);
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 714;
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
            this.state = 718;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288611902) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 815) !== 0)) {
                {
                this.state = 717;
                this.argument();
                }
            }

            this.state = 726;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 14) {
                {
                {
                this.state = 720;
                this.match(cbuildParser.COMMA);
                this.state = 722;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288611902) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 815) !== 0)) {
                    {
                    this.state = 721;
                    this.argument();
                    }
                }

                }
                }
                this.state = 728;
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
            this.state = 729;
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
            this.state = 772;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 112, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 731;
                this.static_pattern_rule();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 732;
                this.targets();
                this.state = 734;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 733;
                    this.ws();
                    }
                }

                this.state = 736;
                this.colon();
                this.state = 738;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 103, this.context) ) {
                case 1:
                    {
                    this.state = 737;
                    this.ws();
                    }
                    break;
                }
                this.state = 740;
                this.prerequisites();
                this.state = 749;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 106, this.context) ) {
                case 1:
                    {
                    this.state = 742;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 40 || _la === 41) {
                        {
                        this.state = 741;
                        this.ws();
                        }
                    }

                    this.state = 744;
                    this.match(cbuildParser.PIPE);
                    this.state = 746;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 105, this.context) ) {
                    case 1:
                        {
                        this.state = 745;
                        this.ws();
                        }
                        break;
                    }
                    this.state = 748;
                    this.orderonlyprerequisites();
                    }
                    break;
                }
                this.state = 752;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 751;
                    this.ws();
                    }
                }

                this.state = 754;
                this.match(cbuildParser.NL);
                this.state = 756;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 108, this.context) ) {
                case 1:
                    {
                    this.state = 755;
                    this.recipes();
                    }
                    break;
                }
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 758;
                this.targets();
                this.state = 760;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 759;
                    this.ws();
                    }
                }

                this.state = 762;
                this.colon();
                this.state = 764;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 763;
                    this.ws();
                    }
                }

                this.state = 766;
                this.assignment();
                this.state = 768;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 767;
                    this.ws();
                    }
                }

                this.state = 770;
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
            this.state = 774;
            this.targets();
            this.state = 776;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 775;
                this.ws();
                }
            }

            this.state = 778;
            this.colon();
            this.state = 780;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 779;
                this.ws();
                }
            }

            this.state = 782;
            this.pattern();
            this.state = 784;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 783;
                this.ws();
                }
            }

            this.state = 786;
            this.colon();
            this.state = 788;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 116, this.context) ) {
            case 1:
                {
                this.state = 787;
                this.ws();
                }
                break;
            }
            this.state = 790;
            this.prerequisites();
            this.state = 799;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 119, this.context) ) {
            case 1:
                {
                this.state = 792;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 791;
                    this.ws();
                    }
                }

                this.state = 794;
                this.match(cbuildParser.PIPE);
                this.state = 796;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 118, this.context) ) {
                case 1:
                    {
                    this.state = 795;
                    this.ws();
                    }
                    break;
                }
                this.state = 798;
                this.orderonlyprerequisites();
                }
                break;
            }
            this.state = 802;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 801;
                this.ws();
                }
            }

            this.state = 804;
            this.match(cbuildParser.NL);
            this.state = 806;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 121, this.context) ) {
            case 1:
                {
                this.state = 805;
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
            this.state = 808;
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
            this.state = 812;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    this.state = 812;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case cbuildParser.LPAREN:
                    case cbuildParser.RPAREN:
                    case cbuildParser.L_CURLY_BRACE:
                    case cbuildParser.R_CURLY_BRACE:
                    case cbuildParser.COMMA:
                    case cbuildParser.CHARS:
                        {
                        this.state = 810;
                        this.identifier();
                        }
                        break;
                    case cbuildParser.DOLLAR_LPAREN:
                    case cbuildParser.DOLLAR_L_CURLY_BRACE:
                    case cbuildParser.VAR:
                        {
                        this.state = 811;
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
                this.state = 814;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 123, this.context);
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
            this.state = 817;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 31772) !== 0) || _la === 37) {
                {
                this.state = 816;
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
            this.state = 820;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 31772) !== 0) || _la === 37) {
                {
                this.state = 819;
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
            this.state = 822;
            this.target();
            this.state = 828;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 126, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 823;
                    this.ws();
                    this.state = 824;
                    this.target();
                    }
                    }
                }
                this.state = 830;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 126, this.context);
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
            this.state = 832;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 831;
                    this.recipe();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 834;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 127, this.context);
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
            this.state = 836;
            this.comment_opt();
            this.state = 838;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 24)) & ~0x1F) === 0 && ((1 << (_la - 24)) & 507919) !== 0)) {
                {
                this.state = 837;
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
            this.state = 860;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 132, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 840;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 842;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 129, this.context) ) {
                case 1:
                    {
                    this.state = 841;
                    this.ws();
                    }
                    break;
                }
                this.state = 844;
                this.exprs_in_recipe();
                this.state = 845;
                this.match(cbuildParser.NL);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 847;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 849;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 848;
                    this.ws();
                    }
                }

                this.state = 851;
                this.match(cbuildParser.COMMENT);
                this.state = 852;
                this.match(cbuildParser.NL);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 854;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 853;
                    this.ws();
                    }
                }

                this.state = 856;
                this.match(cbuildParser.COMMENT);
                this.state = 857;
                this.match(cbuildParser.NL);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 858;
                this.conditional_in_recipe();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 859;
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
    public undefine(): UndefineContext {
        let localContext = new UndefineContext(this.context, this.state);
        this.enterRule(localContext, 98, cbuildParser.RULE_undefine);
        try {
            this.state = 872;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.UNDEFINE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 862;
                this.match(cbuildParser.UNDEFINE);
                this.state = 863;
                this.ws();
                this.state = 864;
                this.pattern();
                }
                break;
            case cbuildParser.OVERRIDE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 866;
                this.match(cbuildParser.OVERRIDE);
                this.state = 867;
                this.ws();
                this.state = 868;
                this.match(cbuildParser.UNDEFINE);
                this.state = 869;
                this.ws();
                this.state = 870;
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
        this.enterRule(localContext, 100, cbuildParser.RULE_specifiers);
        try {
            this.state = 885;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 134, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 874;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 875;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 876;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 877;
                this.match(cbuildParser.OVERRIDE);
                this.state = 878;
                this.ws();
                this.state = 879;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 881;
                this.match(cbuildParser.EXPORT);
                this.state = 882;
                this.ws();
                this.state = 883;
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
        this.enterRule(localContext, 102, cbuildParser.RULE_identifier);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 888;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 887;
                    this.identifier_atom();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 890;
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
        this.enterRule(localContext, 104, cbuildParser.RULE_identifier_atom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 892;
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
        this.enterRule(localContext, 106, cbuildParser.RULE_br);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 894;
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
        this.enterRule(localContext, 108, cbuildParser.RULE_char);
        try {
            this.state = 905;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 896;
                this.match(cbuildParser.CHARS);
                }
                break;
            case cbuildParser.BACKSLASH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 897;
                this.match(cbuildParser.BACKSLASH);
                }
                break;
            case cbuildParser.ASSIGN_OP:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 898;
                this.match(cbuildParser.ASSIGN_OP);
                }
                break;
            case cbuildParser.COLON:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 899;
                this.match(cbuildParser.COLON);
                }
                break;
            case cbuildParser.DOUBLE_DOLLAR:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 900;
                this.match(cbuildParser.DOUBLE_DOLLAR);
                }
                break;
            case cbuildParser.PLUS:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 901;
                this.match(cbuildParser.PLUS);
                }
                break;
            case cbuildParser.QUESTION:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 902;
                this.match(cbuildParser.QUESTION);
                }
                break;
            case cbuildParser.BANG:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 903;
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
                this.state = 904;
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
        this.enterRule(localContext, 110, cbuildParser.RULE_char_nested);
        try {
            this.state = 909;
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
                this.state = 907;
                this.char();
                }
                break;
            case cbuildParser.COMMA:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 908;
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
        this.enterRule(localContext, 112, cbuildParser.RULE_char_in_assign);
        try {
            this.state = 918;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 138, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 911;
                this.char_nested();
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
                this.match(cbuildParser.PIPE);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 917;
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
        this.enterRule(localContext, 114, cbuildParser.RULE_char_in_def);
        try {
            this.state = 939;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 139, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 920;
                this.char();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 921;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 922;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 923;
                this.match(cbuildParser.L_CURLY_BRACE);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 924;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 925;
                this.match(cbuildParser.COMMA);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 926;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 927;
                this.match(cbuildParser.INCLUDE);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 928;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 929;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 930;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 931;
                this.match(cbuildParser.IFDEF);
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 932;
                this.match(cbuildParser.IFNDEF);
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 933;
                this.match(cbuildParser.IFEQ);
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 934;
                this.match(cbuildParser.IFNEQ);
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 935;
                this.match(cbuildParser.ELSE);
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 936;
                this.match(cbuildParser.ENDIF);
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 937;
                this.match(cbuildParser.DEFINE);
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 938;
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
        this.enterRule(localContext, 116, cbuildParser.RULE_char_in_recipe);
        try {
            this.state = 944;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 140, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 941;
                this.char_in_assign();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 942;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 943;
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
        this.enterRule(localContext, 118, cbuildParser.RULE_text);
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
                    this.char();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 949;
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
        this.enterRule(localContext, 120, cbuildParser.RULE_text_nested);
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
                    this.char_nested();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 954;
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
        this.enterRule(localContext, 122, cbuildParser.RULE_text_in_assign);
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
                    this.char_in_assign();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 959;
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
        this.enterRule(localContext, 124, cbuildParser.RULE_text_in_recipe);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 962;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 961;
                    this.char_in_recipe();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 964;
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
        this.enterRule(localContext, 126, cbuildParser.RULE_keywords);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 966;
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
        this.enterRule(localContext, 128, cbuildParser.RULE_colon);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 968;
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
        this.enterRule(localContext, 130, cbuildParser.RULE_comment_opt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 971;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 145, this.context) ) {
            case 1:
                {
                this.state = 970;
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
        this.enterRule(localContext, 132, cbuildParser.RULE_ws);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 973;
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
        this.enterRule(localContext, 134, cbuildParser.RULE_hook);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 975;
            this.match(cbuildParser.HOOK);
            this.state = 977;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 976;
                this.ws();
                }
            }

            this.state = 979;
            this.match(cbuildParser.L_CURLY_BRACE);
            this.state = 980;
            this.hook_program();
            this.state = 981;
            this.match(cbuildParser.R_CURLY_BRACE);
            this.state = 983;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 147, this.context) ) {
            case 1:
                {
                this.state = 982;
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
        this.enterRule(localContext, 136, cbuildParser.RULE_hook_program);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 988;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 148, this.context);
            while (alternative !== 1 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1 + 1) {
                    {
                    {
                    this.state = 985;
                    this.matchWildcard();
                    }
                    }
                }
                this.state = 990;
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
        4,1,42,992,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,39,
        2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
        7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,
        2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,
        7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,
        2,66,7,66,2,67,7,67,2,68,7,68,1,0,1,0,1,0,1,0,3,0,143,8,0,1,1,1,
        1,1,1,5,1,148,8,1,10,1,12,1,151,9,1,1,2,1,2,3,2,155,8,2,1,2,1,2,
        3,2,159,8,2,1,2,1,2,3,2,163,8,2,1,2,1,2,3,2,167,8,2,1,2,1,2,1,2,
        1,2,1,2,3,2,174,8,2,1,2,1,2,3,2,178,8,2,1,2,1,2,3,2,182,8,2,1,2,
        1,2,3,2,186,8,2,1,2,1,2,3,2,190,8,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,
        198,8,2,1,2,1,2,3,2,202,8,2,1,2,1,2,3,2,206,8,2,1,2,1,2,3,2,210,
        8,2,1,2,1,2,1,2,1,2,3,2,216,8,2,1,2,1,2,3,2,220,8,2,1,2,1,2,3,2,
        224,8,2,1,2,1,2,3,2,228,8,2,1,2,1,2,1,2,1,2,1,2,3,2,235,8,2,1,2,
        1,2,3,2,239,8,2,1,2,1,2,3,2,243,8,2,1,2,1,2,3,2,247,8,2,1,2,1,2,
        3,2,251,8,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,259,8,2,1,2,1,2,3,2,263,
        8,2,1,2,1,2,3,2,267,8,2,1,2,1,2,3,2,271,8,2,1,2,1,2,3,2,275,8,2,
        1,3,1,3,3,3,279,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,289,8,3,
        1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,302,8,3,1,3,1,3,
        1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,313,8,3,1,3,1,3,1,3,1,3,1,3,1,3,
        1,3,1,3,3,3,323,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,
        3,3,336,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,345,8,3,1,4,1,4,1,4,
        1,4,1,5,3,5,352,8,5,1,5,1,5,3,5,356,8,5,1,5,1,5,3,5,360,8,5,1,5,
        1,5,3,5,364,8,5,1,5,1,5,3,5,368,8,5,1,5,1,5,1,5,1,5,3,5,374,8,5,
        1,5,1,5,3,5,378,8,5,1,5,1,5,1,5,1,5,3,5,384,8,5,1,5,1,5,1,5,1,5,
        3,5,390,8,5,1,5,1,5,3,5,394,8,5,1,5,1,5,3,5,398,8,5,1,5,3,5,401,
        8,5,1,6,3,6,404,8,6,1,6,1,6,1,6,1,6,3,6,410,8,6,1,6,3,6,413,8,6,
        1,6,3,6,416,8,6,1,6,1,6,1,6,1,6,1,7,1,7,5,7,424,8,7,10,7,12,7,427,
        9,7,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,3,8,437,8,8,1,9,1,9,1,9,1,9,
        1,10,1,10,1,10,1,10,1,10,1,10,3,10,449,8,10,3,10,451,8,10,1,11,1,
        11,3,11,455,8,11,1,11,1,11,1,11,1,12,1,12,1,12,1,12,1,12,3,12,465,
        8,12,1,13,1,13,3,13,469,8,13,1,13,1,13,3,13,473,8,13,1,13,1,13,1,
        13,1,13,3,13,479,8,13,1,13,1,13,3,13,483,8,13,1,13,1,13,3,13,487,
        8,13,1,14,1,14,1,14,1,14,1,15,1,15,1,16,1,16,1,17,1,17,1,18,1,18,
        1,18,1,18,1,18,1,18,1,19,3,19,506,8,19,1,20,3,20,509,8,20,1,20,1,
        20,3,20,513,8,20,1,20,1,20,1,20,5,20,518,8,20,10,20,12,20,521,9,
        20,1,20,3,20,524,8,20,1,21,3,21,527,8,21,1,21,1,21,3,21,531,8,21,
        1,21,1,21,1,21,5,21,536,8,21,10,21,12,21,539,9,21,1,21,3,21,542,
        8,21,1,22,3,22,545,8,22,1,22,1,22,3,22,549,8,22,1,22,1,22,1,22,5,
        22,554,8,22,10,22,12,22,557,9,22,1,22,3,22,560,8,22,1,23,3,23,563,
        8,23,1,23,1,23,3,23,567,8,23,1,23,1,23,1,23,5,23,572,8,23,10,23,
        12,23,575,9,23,1,23,3,23,578,8,23,1,24,1,24,3,24,582,8,24,1,24,1,
        24,1,24,1,24,1,24,1,24,1,24,1,24,5,24,592,8,24,10,24,12,24,595,9,
        24,3,24,597,8,24,1,25,1,25,3,25,601,8,25,1,25,3,25,604,8,25,1,26,
        4,26,607,8,26,11,26,12,26,608,1,27,1,27,1,27,1,27,1,27,1,27,3,27,
        617,8,27,1,28,4,28,620,8,28,11,28,12,28,621,1,29,1,29,1,29,1,29,
        1,29,1,29,3,29,630,8,29,1,30,4,30,633,8,30,11,30,12,30,634,1,31,
        1,31,3,31,639,8,31,1,32,4,32,642,8,32,11,32,12,32,643,1,33,1,33,
        3,33,648,8,33,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,
        1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,
        1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,
        1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,
        1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,3,34,707,8,34,1,35,4,35,
        710,8,35,11,35,12,35,711,1,36,1,36,3,36,716,8,36,1,37,3,37,719,8,
        37,1,37,1,37,3,37,723,8,37,5,37,725,8,37,10,37,12,37,728,9,37,1,
        38,1,38,1,39,1,39,1,39,3,39,735,8,39,1,39,1,39,3,39,739,8,39,1,39,
        1,39,3,39,743,8,39,1,39,1,39,3,39,747,8,39,1,39,3,39,750,8,39,1,
        39,3,39,753,8,39,1,39,1,39,3,39,757,8,39,1,39,1,39,3,39,761,8,39,
        1,39,1,39,3,39,765,8,39,1,39,1,39,3,39,769,8,39,1,39,1,39,3,39,773,
        8,39,1,40,1,40,3,40,777,8,40,1,40,1,40,3,40,781,8,40,1,40,1,40,3,
        40,785,8,40,1,40,1,40,3,40,789,8,40,1,40,1,40,3,40,793,8,40,1,40,
        1,40,3,40,797,8,40,1,40,3,40,800,8,40,1,40,3,40,803,8,40,1,40,1,
        40,3,40,807,8,40,1,41,1,41,1,42,1,42,4,42,813,8,42,11,42,12,42,814,
        1,43,3,43,818,8,43,1,44,3,44,821,8,44,1,45,1,45,1,45,1,45,5,45,827,
        8,45,10,45,12,45,830,9,45,1,46,4,46,833,8,46,11,46,12,46,834,1,47,
        1,47,3,47,839,8,47,1,48,1,48,3,48,843,8,48,1,48,1,48,1,48,1,48,1,
        48,3,48,850,8,48,1,48,1,48,1,48,3,48,855,8,48,1,48,1,48,1,48,1,48,
        3,48,861,8,48,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,
        3,49,873,8,49,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,
        1,50,3,50,886,8,50,1,51,4,51,889,8,51,11,51,12,51,890,1,52,1,52,
        1,53,1,53,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,3,54,906,
        8,54,1,55,1,55,3,55,910,8,55,1,56,1,56,1,56,1,56,1,56,1,56,1,56,
        3,56,919,8,56,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,
        1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,3,57,940,8,57,1,58,
        1,58,1,58,3,58,945,8,58,1,59,4,59,948,8,59,11,59,12,59,949,1,60,
        4,60,953,8,60,11,60,12,60,954,1,61,4,61,958,8,61,11,61,12,61,959,
        1,62,4,62,963,8,62,11,62,12,62,964,1,63,1,63,1,64,1,64,1,65,3,65,
        972,8,65,1,66,1,66,1,67,1,67,3,67,978,8,67,1,67,1,67,1,67,1,67,3,
        67,984,8,67,1,68,5,68,987,8,68,10,68,12,68,990,9,68,1,68,1,988,0,
        69,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,
        44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,
        88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,
        124,126,128,130,132,134,136,0,7,1,0,26,27,1,0,24,25,1,0,20,22,2,
        0,10,14,37,37,2,0,20,20,23,35,1,0,6,9,1,0,40,41,1139,0,142,1,0,0,
        0,2,149,1,0,0,0,4,274,1,0,0,0,6,344,1,0,0,0,8,346,1,0,0,0,10,400,
        1,0,0,0,12,403,1,0,0,0,14,425,1,0,0,0,16,436,1,0,0,0,18,438,1,0,
        0,0,20,450,1,0,0,0,22,452,1,0,0,0,24,459,1,0,0,0,26,486,1,0,0,0,
        28,488,1,0,0,0,30,492,1,0,0,0,32,494,1,0,0,0,34,496,1,0,0,0,36,498,
        1,0,0,0,38,505,1,0,0,0,40,508,1,0,0,0,42,526,1,0,0,0,44,544,1,0,
        0,0,46,562,1,0,0,0,48,596,1,0,0,0,50,600,1,0,0,0,52,606,1,0,0,0,
        54,616,1,0,0,0,56,619,1,0,0,0,58,629,1,0,0,0,60,632,1,0,0,0,62,638,
        1,0,0,0,64,641,1,0,0,0,66,647,1,0,0,0,68,706,1,0,0,0,70,709,1,0,
        0,0,72,715,1,0,0,0,74,718,1,0,0,0,76,729,1,0,0,0,78,772,1,0,0,0,
        80,774,1,0,0,0,82,808,1,0,0,0,84,812,1,0,0,0,86,817,1,0,0,0,88,820,
        1,0,0,0,90,822,1,0,0,0,92,832,1,0,0,0,94,836,1,0,0,0,96,860,1,0,
        0,0,98,872,1,0,0,0,100,885,1,0,0,0,102,888,1,0,0,0,104,892,1,0,0,
        0,106,894,1,0,0,0,108,905,1,0,0,0,110,909,1,0,0,0,112,918,1,0,0,
        0,114,939,1,0,0,0,116,944,1,0,0,0,118,947,1,0,0,0,120,952,1,0,0,
        0,122,957,1,0,0,0,124,962,1,0,0,0,126,966,1,0,0,0,128,968,1,0,0,
        0,130,971,1,0,0,0,132,973,1,0,0,0,134,975,1,0,0,0,136,988,1,0,0,
        0,138,139,3,2,1,0,139,140,5,0,0,1,140,143,1,0,0,0,141,143,5,0,0,
        1,142,138,1,0,0,0,142,141,1,0,0,0,143,1,1,0,0,0,144,148,3,10,5,0,
        145,148,3,106,53,0,146,148,3,132,66,0,147,144,1,0,0,0,147,145,1,
        0,0,0,147,146,1,0,0,0,148,151,1,0,0,0,149,147,1,0,0,0,149,150,1,
        0,0,0,150,3,1,0,0,0,151,149,1,0,0,0,152,154,3,30,15,0,153,155,3,
        132,66,0,154,153,1,0,0,0,154,155,1,0,0,0,155,156,1,0,0,0,156,158,
        3,36,18,0,157,159,3,132,66,0,158,157,1,0,0,0,158,159,1,0,0,0,159,
        160,1,0,0,0,160,162,3,8,4,0,161,163,3,132,66,0,162,161,1,0,0,0,162,
        163,1,0,0,0,163,164,1,0,0,0,164,166,5,29,0,0,165,167,3,132,66,0,
        166,165,1,0,0,0,166,167,1,0,0,0,167,168,1,0,0,0,168,169,3,130,65,
        0,169,170,3,106,53,0,170,275,1,0,0,0,171,173,3,30,15,0,172,174,3,
        132,66,0,173,172,1,0,0,0,173,174,1,0,0,0,174,175,1,0,0,0,175,177,
        3,36,18,0,176,178,3,132,66,0,177,176,1,0,0,0,177,178,1,0,0,0,178,
        179,1,0,0,0,179,181,3,8,4,0,180,182,3,132,66,0,181,180,1,0,0,0,181,
        182,1,0,0,0,182,183,1,0,0,0,183,185,5,28,0,0,184,186,3,132,66,0,
        185,184,1,0,0,0,185,186,1,0,0,0,186,187,1,0,0,0,187,189,3,8,4,0,
        188,190,3,132,66,0,189,188,1,0,0,0,189,190,1,0,0,0,190,191,1,0,0,
        0,191,192,5,29,0,0,192,193,3,130,65,0,193,194,3,106,53,0,194,275,
        1,0,0,0,195,197,3,30,15,0,196,198,3,132,66,0,197,196,1,0,0,0,197,
        198,1,0,0,0,198,199,1,0,0,0,199,201,3,36,18,0,200,202,3,132,66,0,
        201,200,1,0,0,0,201,202,1,0,0,0,202,203,1,0,0,0,203,205,3,8,4,0,
        204,206,3,132,66,0,205,204,1,0,0,0,205,206,1,0,0,0,206,207,1,0,0,
        0,207,209,5,28,0,0,208,210,3,132,66,0,209,208,1,0,0,0,209,210,1,
        0,0,0,210,211,1,0,0,0,211,212,3,4,2,0,212,275,1,0,0,0,213,215,3,
        32,16,0,214,216,3,132,66,0,215,214,1,0,0,0,215,216,1,0,0,0,216,217,
        1,0,0,0,217,219,3,84,42,0,218,220,3,132,66,0,219,218,1,0,0,0,219,
        220,1,0,0,0,220,221,1,0,0,0,221,223,3,8,4,0,222,224,3,132,66,0,223,
        222,1,0,0,0,223,224,1,0,0,0,224,225,1,0,0,0,225,227,5,29,0,0,226,
        228,3,132,66,0,227,226,1,0,0,0,227,228,1,0,0,0,228,229,1,0,0,0,229,
        230,3,130,65,0,230,231,3,106,53,0,231,275,1,0,0,0,232,234,3,32,16,
        0,233,235,3,132,66,0,234,233,1,0,0,0,234,235,1,0,0,0,235,236,1,0,
        0,0,236,238,3,84,42,0,237,239,3,132,66,0,238,237,1,0,0,0,238,239,
        1,0,0,0,239,240,1,0,0,0,240,242,3,8,4,0,241,243,3,132,66,0,242,241,
        1,0,0,0,242,243,1,0,0,0,243,244,1,0,0,0,244,246,5,28,0,0,245,247,
        3,132,66,0,246,245,1,0,0,0,246,247,1,0,0,0,247,248,1,0,0,0,248,250,
        3,8,4,0,249,251,3,132,66,0,250,249,1,0,0,0,250,251,1,0,0,0,251,252,
        1,0,0,0,252,253,5,29,0,0,253,254,3,130,65,0,254,255,3,106,53,0,255,
        275,1,0,0,0,256,258,3,32,16,0,257,259,3,132,66,0,258,257,1,0,0,0,
        258,259,1,0,0,0,259,260,1,0,0,0,260,262,3,84,42,0,261,263,3,132,
        66,0,262,261,1,0,0,0,262,263,1,0,0,0,263,264,1,0,0,0,264,266,3,8,
        4,0,265,267,3,132,66,0,266,265,1,0,0,0,266,267,1,0,0,0,267,268,1,
        0,0,0,268,270,5,28,0,0,269,271,3,132,66,0,270,269,1,0,0,0,270,271,
        1,0,0,0,271,272,1,0,0,0,272,273,3,4,2,0,273,275,1,0,0,0,274,152,
        1,0,0,0,274,171,1,0,0,0,274,195,1,0,0,0,274,213,1,0,0,0,274,232,
        1,0,0,0,274,256,1,0,0,0,275,5,1,0,0,0,276,278,3,30,15,0,277,279,
        3,132,66,0,278,277,1,0,0,0,278,279,1,0,0,0,279,280,1,0,0,0,280,281,
        3,36,18,0,281,282,5,38,0,0,282,283,3,94,47,0,283,284,5,29,0,0,284,
        285,3,130,65,0,285,345,1,0,0,0,286,288,3,30,15,0,287,289,3,132,66,
        0,288,287,1,0,0,0,288,289,1,0,0,0,289,290,1,0,0,0,290,291,3,36,18,
        0,291,292,5,38,0,0,292,293,3,94,47,0,293,294,5,28,0,0,294,295,5,
        38,0,0,295,296,3,94,47,0,296,297,5,29,0,0,297,298,3,130,65,0,298,
        345,1,0,0,0,299,301,3,30,15,0,300,302,3,132,66,0,301,300,1,0,0,0,
        301,302,1,0,0,0,302,303,1,0,0,0,303,304,3,36,18,0,304,305,5,38,0,
        0,305,306,3,94,47,0,306,307,5,28,0,0,307,308,5,38,0,0,308,309,3,
        6,3,0,309,345,1,0,0,0,310,312,3,32,16,0,311,313,3,132,66,0,312,311,
        1,0,0,0,312,313,1,0,0,0,313,314,1,0,0,0,314,315,3,84,42,0,315,316,
        5,38,0,0,316,317,3,94,47,0,317,318,5,29,0,0,318,319,3,130,65,0,319,
        345,1,0,0,0,320,322,3,32,16,0,321,323,3,132,66,0,322,321,1,0,0,0,
        322,323,1,0,0,0,323,324,1,0,0,0,324,325,3,84,42,0,325,326,5,38,0,
        0,326,327,3,94,47,0,327,328,5,28,0,0,328,329,5,38,0,0,329,330,3,
        94,47,0,330,331,5,29,0,0,331,332,3,130,65,0,332,345,1,0,0,0,333,
        335,3,32,16,0,334,336,3,132,66,0,335,334,1,0,0,0,335,336,1,0,0,0,
        336,337,1,0,0,0,337,338,3,84,42,0,338,339,5,38,0,0,339,340,3,94,
        47,0,340,341,5,28,0,0,341,342,5,38,0,0,342,343,3,6,3,0,343,345,1,
        0,0,0,344,276,1,0,0,0,344,286,1,0,0,0,344,299,1,0,0,0,344,310,1,
        0,0,0,344,320,1,0,0,0,344,333,1,0,0,0,345,7,1,0,0,0,346,347,3,130,
        65,0,347,348,3,106,53,0,348,349,3,2,1,0,349,9,1,0,0,0,350,352,3,
        132,66,0,351,350,1,0,0,0,351,352,1,0,0,0,352,353,1,0,0,0,353,401,
        5,42,0,0,354,356,3,132,66,0,355,354,1,0,0,0,355,356,1,0,0,0,356,
        357,1,0,0,0,357,401,3,4,2,0,358,360,3,132,66,0,359,358,1,0,0,0,359,
        360,1,0,0,0,360,361,1,0,0,0,361,401,3,12,6,0,362,364,3,132,66,0,
        363,362,1,0,0,0,363,364,1,0,0,0,364,365,1,0,0,0,365,401,3,18,9,0,
        366,368,3,132,66,0,367,366,1,0,0,0,367,368,1,0,0,0,368,369,1,0,0,
        0,369,370,3,20,10,0,370,371,3,106,53,0,371,401,1,0,0,0,372,374,3,
        132,66,0,373,372,1,0,0,0,373,374,1,0,0,0,374,375,1,0,0,0,375,401,
        3,22,11,0,376,378,3,132,66,0,377,376,1,0,0,0,377,378,1,0,0,0,378,
        379,1,0,0,0,379,380,3,26,13,0,380,381,3,106,53,0,381,401,1,0,0,0,
        382,384,3,132,66,0,383,382,1,0,0,0,383,384,1,0,0,0,384,385,1,0,0,
        0,385,386,3,68,34,0,386,387,3,106,53,0,387,401,1,0,0,0,388,390,3,
        132,66,0,389,388,1,0,0,0,389,390,1,0,0,0,390,391,1,0,0,0,391,401,
        3,78,39,0,392,394,3,132,66,0,393,392,1,0,0,0,393,394,1,0,0,0,394,
        395,1,0,0,0,395,401,3,134,67,0,396,398,3,132,66,0,397,396,1,0,0,
        0,397,398,1,0,0,0,398,399,1,0,0,0,399,401,3,98,49,0,400,351,1,0,
        0,0,400,355,1,0,0,0,400,359,1,0,0,0,400,363,1,0,0,0,400,367,1,0,
        0,0,400,373,1,0,0,0,400,377,1,0,0,0,400,383,1,0,0,0,400,389,1,0,
        0,0,400,393,1,0,0,0,400,397,1,0,0,0,401,11,1,0,0,0,402,404,3,100,
        50,0,403,402,1,0,0,0,403,404,1,0,0,0,404,405,1,0,0,0,405,406,5,34,
        0,0,406,407,3,132,66,0,407,409,3,84,42,0,408,410,3,132,66,0,409,
        408,1,0,0,0,409,410,1,0,0,0,410,412,1,0,0,0,411,413,5,1,0,0,412,
        411,1,0,0,0,412,413,1,0,0,0,413,415,1,0,0,0,414,416,3,132,66,0,415,
        414,1,0,0,0,415,416,1,0,0,0,416,417,1,0,0,0,417,418,3,14,7,0,418,
        419,5,23,0,0,419,420,3,106,53,0,420,13,1,0,0,0,421,424,3,12,6,0,
        422,424,3,16,8,0,423,421,1,0,0,0,423,422,1,0,0,0,424,427,1,0,0,0,
        425,423,1,0,0,0,425,426,1,0,0,0,426,15,1,0,0,0,427,425,1,0,0,0,428,
        429,3,130,65,0,429,430,3,106,53,0,430,437,1,0,0,0,431,432,3,130,
        65,0,432,433,3,106,53,0,433,434,3,48,24,0,434,435,3,106,53,0,435,
        437,1,0,0,0,436,428,1,0,0,0,436,431,1,0,0,0,437,17,1,0,0,0,438,439,
        3,34,17,0,439,440,3,40,20,0,440,441,3,106,53,0,441,19,1,0,0,0,442,
        451,5,31,0,0,443,451,5,32,0,0,444,448,3,28,14,0,445,446,3,132,66,
        0,446,447,3,90,45,0,447,449,1,0,0,0,448,445,1,0,0,0,448,449,1,0,
        0,0,449,451,1,0,0,0,450,442,1,0,0,0,450,443,1,0,0,0,450,444,1,0,
        0,0,451,21,1,0,0,0,452,454,5,35,0,0,453,455,3,24,12,0,454,453,1,
        0,0,0,454,455,1,0,0,0,455,456,1,0,0,0,456,457,3,130,65,0,457,458,
        3,106,53,0,458,23,1,0,0,0,459,460,3,132,66,0,460,464,3,84,42,0,461,
        462,3,132,66,0,462,463,3,40,20,0,463,465,1,0,0,0,464,461,1,0,0,0,
        464,465,1,0,0,0,465,25,1,0,0,0,466,468,3,84,42,0,467,469,3,132,66,
        0,468,467,1,0,0,0,468,469,1,0,0,0,469,470,1,0,0,0,470,472,5,1,0,
        0,471,473,3,44,22,0,472,471,1,0,0,0,472,473,1,0,0,0,473,474,1,0,
        0,0,474,475,3,130,65,0,475,487,1,0,0,0,476,478,3,28,14,0,477,479,
        3,132,66,0,478,477,1,0,0,0,478,479,1,0,0,0,479,480,1,0,0,0,480,482,
        5,1,0,0,481,483,3,44,22,0,482,481,1,0,0,0,482,483,1,0,0,0,483,484,
        1,0,0,0,484,485,3,130,65,0,485,487,1,0,0,0,486,466,1,0,0,0,486,476,
        1,0,0,0,487,27,1,0,0,0,488,489,3,100,50,0,489,490,3,132,66,0,490,
        491,3,84,42,0,491,29,1,0,0,0,492,493,7,0,0,0,493,31,1,0,0,0,494,
        495,7,1,0,0,495,33,1,0,0,0,496,497,7,2,0,0,497,35,1,0,0,0,498,499,
        5,10,0,0,499,500,3,38,19,0,500,501,5,14,0,0,501,502,3,38,19,0,502,
        503,5,11,0,0,503,37,1,0,0,0,504,506,3,40,20,0,505,504,1,0,0,0,505,
        506,1,0,0,0,506,39,1,0,0,0,507,509,3,132,66,0,508,507,1,0,0,0,508,
        509,1,0,0,0,509,510,1,0,0,0,510,512,3,52,26,0,511,513,3,132,66,0,
        512,511,1,0,0,0,512,513,1,0,0,0,513,519,1,0,0,0,514,515,3,132,66,
        0,515,516,3,52,26,0,516,518,1,0,0,0,517,514,1,0,0,0,518,521,1,0,
        0,0,519,517,1,0,0,0,519,520,1,0,0,0,520,523,1,0,0,0,521,519,1,0,
        0,0,522,524,3,132,66,0,523,522,1,0,0,0,523,524,1,0,0,0,524,41,1,
        0,0,0,525,527,3,132,66,0,526,525,1,0,0,0,526,527,1,0,0,0,527,528,
        1,0,0,0,528,530,3,56,28,0,529,531,3,132,66,0,530,529,1,0,0,0,530,
        531,1,0,0,0,531,537,1,0,0,0,532,533,3,132,66,0,533,534,3,56,28,0,
        534,536,1,0,0,0,535,532,1,0,0,0,536,539,1,0,0,0,537,535,1,0,0,0,
        537,538,1,0,0,0,538,541,1,0,0,0,539,537,1,0,0,0,540,542,3,132,66,
        0,541,540,1,0,0,0,541,542,1,0,0,0,542,43,1,0,0,0,543,545,3,132,66,
        0,544,543,1,0,0,0,544,545,1,0,0,0,545,546,1,0,0,0,546,548,3,60,30,
        0,547,549,3,132,66,0,548,547,1,0,0,0,548,549,1,0,0,0,549,555,1,0,
        0,0,550,551,3,132,66,0,551,552,3,60,30,0,552,554,1,0,0,0,553,550,
        1,0,0,0,554,557,1,0,0,0,555,553,1,0,0,0,555,556,1,0,0,0,556,559,
        1,0,0,0,557,555,1,0,0,0,558,560,3,132,66,0,559,558,1,0,0,0,559,560,
        1,0,0,0,560,45,1,0,0,0,561,563,3,132,66,0,562,561,1,0,0,0,562,563,
        1,0,0,0,563,564,1,0,0,0,564,566,3,64,32,0,565,567,3,132,66,0,566,
        565,1,0,0,0,566,567,1,0,0,0,567,573,1,0,0,0,568,569,3,132,66,0,569,
        570,3,64,32,0,570,572,1,0,0,0,571,568,1,0,0,0,572,575,1,0,0,0,573,
        571,1,0,0,0,573,574,1,0,0,0,574,577,1,0,0,0,575,573,1,0,0,0,576,
        578,3,132,66,0,577,576,1,0,0,0,577,578,1,0,0,0,578,47,1,0,0,0,579,
        597,3,106,53,0,580,582,3,106,53,0,581,580,1,0,0,0,581,582,1,0,0,
        0,582,583,1,0,0,0,583,593,3,50,25,0,584,585,3,106,53,0,585,586,3,
        50,25,0,586,592,1,0,0,0,587,592,3,106,53,0,588,589,3,132,66,0,589,
        590,3,64,32,0,590,592,1,0,0,0,591,584,1,0,0,0,591,587,1,0,0,0,591,
        588,1,0,0,0,592,595,1,0,0,0,593,591,1,0,0,0,593,594,1,0,0,0,594,
        597,1,0,0,0,595,593,1,0,0,0,596,579,1,0,0,0,596,581,1,0,0,0,597,
        49,1,0,0,0,598,601,3,114,57,0,599,601,3,68,34,0,600,598,1,0,0,0,
        600,599,1,0,0,0,601,603,1,0,0,0,602,604,3,64,32,0,603,602,1,0,0,
        0,603,604,1,0,0,0,604,51,1,0,0,0,605,607,3,54,27,0,606,605,1,0,0,
        0,607,608,1,0,0,0,608,606,1,0,0,0,608,609,1,0,0,0,609,53,1,0,0,0,
        610,617,3,118,59,0,611,617,3,68,34,0,612,613,5,10,0,0,613,614,3,
        42,21,0,614,615,5,11,0,0,615,617,1,0,0,0,616,610,1,0,0,0,616,611,
        1,0,0,0,616,612,1,0,0,0,617,55,1,0,0,0,618,620,3,58,29,0,619,618,
        1,0,0,0,620,621,1,0,0,0,621,619,1,0,0,0,621,622,1,0,0,0,622,57,1,
        0,0,0,623,630,3,120,60,0,624,630,3,68,34,0,625,626,5,10,0,0,626,
        627,3,42,21,0,627,628,5,11,0,0,628,630,1,0,0,0,629,623,1,0,0,0,629,
        624,1,0,0,0,629,625,1,0,0,0,630,59,1,0,0,0,631,633,3,62,31,0,632,
        631,1,0,0,0,633,634,1,0,0,0,634,632,1,0,0,0,634,635,1,0,0,0,635,
        61,1,0,0,0,636,639,3,122,61,0,637,639,3,68,34,0,638,636,1,0,0,0,
        638,637,1,0,0,0,639,63,1,0,0,0,640,642,3,66,33,0,641,640,1,0,0,0,
        642,643,1,0,0,0,643,641,1,0,0,0,643,644,1,0,0,0,644,65,1,0,0,0,645,
        648,3,124,62,0,646,648,3,68,34,0,647,645,1,0,0,0,647,646,1,0,0,0,
        648,67,1,0,0,0,649,707,5,4,0,0,650,651,5,2,0,0,651,652,3,70,35,0,
        652,653,5,11,0,0,653,707,1,0,0,0,654,655,5,2,0,0,655,656,3,70,35,
        0,656,657,3,132,66,0,657,658,3,74,37,0,658,659,5,11,0,0,659,707,
        1,0,0,0,660,661,5,2,0,0,661,662,3,70,35,0,662,663,5,14,0,0,663,664,
        3,74,37,0,664,665,5,11,0,0,665,707,1,0,0,0,666,667,5,2,0,0,667,668,
        3,70,35,0,668,669,5,9,0,0,669,670,3,40,20,0,670,671,5,11,0,0,671,
        707,1,0,0,0,672,673,5,2,0,0,673,674,3,70,35,0,674,675,5,1,0,0,675,
        676,3,40,20,0,676,677,5,11,0,0,677,707,1,0,0,0,678,679,5,3,0,0,679,
        680,3,70,35,0,680,681,5,13,0,0,681,707,1,0,0,0,682,683,5,3,0,0,683,
        684,3,70,35,0,684,685,3,132,66,0,685,686,3,74,37,0,686,687,5,13,
        0,0,687,707,1,0,0,0,688,689,5,3,0,0,689,690,3,70,35,0,690,691,5,
        14,0,0,691,692,3,74,37,0,692,693,5,13,0,0,693,707,1,0,0,0,694,695,
        5,3,0,0,695,696,3,70,35,0,696,697,5,9,0,0,697,698,3,40,20,0,698,
        699,5,13,0,0,699,707,1,0,0,0,700,701,5,3,0,0,701,702,3,70,35,0,702,
        703,5,1,0,0,703,704,3,40,20,0,704,705,5,13,0,0,705,707,1,0,0,0,706,
        649,1,0,0,0,706,650,1,0,0,0,706,654,1,0,0,0,706,660,1,0,0,0,706,
        666,1,0,0,0,706,672,1,0,0,0,706,678,1,0,0,0,706,682,1,0,0,0,706,
        688,1,0,0,0,706,694,1,0,0,0,706,700,1,0,0,0,707,69,1,0,0,0,708,710,
        3,72,36,0,709,708,1,0,0,0,710,711,1,0,0,0,711,709,1,0,0,0,711,712,
        1,0,0,0,712,71,1,0,0,0,713,716,5,37,0,0,714,716,3,68,34,0,715,713,
        1,0,0,0,715,714,1,0,0,0,716,73,1,0,0,0,717,719,3,76,38,0,718,717,
        1,0,0,0,718,719,1,0,0,0,719,726,1,0,0,0,720,722,5,14,0,0,721,723,
        3,76,38,0,722,721,1,0,0,0,722,723,1,0,0,0,723,725,1,0,0,0,724,720,
        1,0,0,0,725,728,1,0,0,0,726,724,1,0,0,0,726,727,1,0,0,0,727,75,1,
        0,0,0,728,726,1,0,0,0,729,730,3,40,20,0,730,77,1,0,0,0,731,773,3,
        80,40,0,732,734,3,90,45,0,733,735,3,132,66,0,734,733,1,0,0,0,734,
        735,1,0,0,0,735,736,1,0,0,0,736,738,3,128,64,0,737,739,3,132,66,
        0,738,737,1,0,0,0,738,739,1,0,0,0,739,740,1,0,0,0,740,749,3,86,43,
        0,741,743,3,132,66,0,742,741,1,0,0,0,742,743,1,0,0,0,743,744,1,0,
        0,0,744,746,5,15,0,0,745,747,3,132,66,0,746,745,1,0,0,0,746,747,
        1,0,0,0,747,748,1,0,0,0,748,750,3,88,44,0,749,742,1,0,0,0,749,750,
        1,0,0,0,750,752,1,0,0,0,751,753,3,132,66,0,752,751,1,0,0,0,752,753,
        1,0,0,0,753,754,1,0,0,0,754,756,5,38,0,0,755,757,3,92,46,0,756,755,
        1,0,0,0,756,757,1,0,0,0,757,773,1,0,0,0,758,760,3,90,45,0,759,761,
        3,132,66,0,760,759,1,0,0,0,760,761,1,0,0,0,761,762,1,0,0,0,762,764,
        3,128,64,0,763,765,3,132,66,0,764,763,1,0,0,0,764,765,1,0,0,0,765,
        766,1,0,0,0,766,768,3,26,13,0,767,769,3,132,66,0,768,767,1,0,0,0,
        768,769,1,0,0,0,769,770,1,0,0,0,770,771,5,38,0,0,771,773,1,0,0,0,
        772,731,1,0,0,0,772,732,1,0,0,0,772,758,1,0,0,0,773,79,1,0,0,0,774,
        776,3,90,45,0,775,777,3,132,66,0,776,775,1,0,0,0,776,777,1,0,0,0,
        777,778,1,0,0,0,778,780,3,128,64,0,779,781,3,132,66,0,780,779,1,
        0,0,0,780,781,1,0,0,0,781,782,1,0,0,0,782,784,3,84,42,0,783,785,
        3,132,66,0,784,783,1,0,0,0,784,785,1,0,0,0,785,786,1,0,0,0,786,788,
        3,128,64,0,787,789,3,132,66,0,788,787,1,0,0,0,788,789,1,0,0,0,789,
        790,1,0,0,0,790,799,3,86,43,0,791,793,3,132,66,0,792,791,1,0,0,0,
        792,793,1,0,0,0,793,794,1,0,0,0,794,796,5,15,0,0,795,797,3,132,66,
        0,796,795,1,0,0,0,796,797,1,0,0,0,797,798,1,0,0,0,798,800,3,88,44,
        0,799,792,1,0,0,0,799,800,1,0,0,0,800,802,1,0,0,0,801,803,3,132,
        66,0,802,801,1,0,0,0,802,803,1,0,0,0,803,804,1,0,0,0,804,806,5,38,
        0,0,805,807,3,92,46,0,806,805,1,0,0,0,806,807,1,0,0,0,807,81,1,0,
        0,0,808,809,3,84,42,0,809,83,1,0,0,0,810,813,3,102,51,0,811,813,
        3,68,34,0,812,810,1,0,0,0,812,811,1,0,0,0,813,814,1,0,0,0,814,812,
        1,0,0,0,814,815,1,0,0,0,815,85,1,0,0,0,816,818,3,90,45,0,817,816,
        1,0,0,0,817,818,1,0,0,0,818,87,1,0,0,0,819,821,3,90,45,0,820,819,
        1,0,0,0,820,821,1,0,0,0,821,89,1,0,0,0,822,828,3,82,41,0,823,824,
        3,132,66,0,824,825,3,82,41,0,825,827,1,0,0,0,826,823,1,0,0,0,827,
        830,1,0,0,0,828,826,1,0,0,0,828,829,1,0,0,0,829,91,1,0,0,0,830,828,
        1,0,0,0,831,833,3,96,48,0,832,831,1,0,0,0,833,834,1,0,0,0,834,832,
        1,0,0,0,834,835,1,0,0,0,835,93,1,0,0,0,836,838,3,130,65,0,837,839,
        3,92,46,0,838,837,1,0,0,0,838,839,1,0,0,0,839,95,1,0,0,0,840,842,
        5,39,0,0,841,843,3,132,66,0,842,841,1,0,0,0,842,843,1,0,0,0,843,
        844,1,0,0,0,844,845,3,46,23,0,845,846,5,38,0,0,846,861,1,0,0,0,847,
        849,5,39,0,0,848,850,3,132,66,0,849,848,1,0,0,0,849,850,1,0,0,0,
        850,851,1,0,0,0,851,852,5,42,0,0,852,861,5,38,0,0,853,855,3,132,
        66,0,854,853,1,0,0,0,854,855,1,0,0,0,855,856,1,0,0,0,856,857,5,42,
        0,0,857,861,5,38,0,0,858,861,3,6,3,0,859,861,5,38,0,0,860,840,1,
        0,0,0,860,847,1,0,0,0,860,854,1,0,0,0,860,858,1,0,0,0,860,859,1,
        0,0,0,861,97,1,0,0,0,862,863,5,33,0,0,863,864,3,132,66,0,864,865,
        3,84,42,0,865,873,1,0,0,0,866,867,5,30,0,0,867,868,3,132,66,0,868,
        869,5,33,0,0,869,870,3,132,66,0,870,871,3,84,42,0,871,873,1,0,0,
        0,872,862,1,0,0,0,872,866,1,0,0,0,873,99,1,0,0,0,874,886,5,30,0,
        0,875,886,5,31,0,0,876,886,5,32,0,0,877,878,5,30,0,0,878,879,3,132,
        66,0,879,880,5,31,0,0,880,886,1,0,0,0,881,882,5,31,0,0,882,883,3,
        132,66,0,883,884,5,30,0,0,884,886,1,0,0,0,885,874,1,0,0,0,885,875,
        1,0,0,0,885,876,1,0,0,0,885,877,1,0,0,0,885,881,1,0,0,0,886,101,
        1,0,0,0,887,889,3,104,52,0,888,887,1,0,0,0,889,890,1,0,0,0,890,888,
        1,0,0,0,890,891,1,0,0,0,891,103,1,0,0,0,892,893,7,3,0,0,893,105,
        1,0,0,0,894,895,5,38,0,0,895,107,1,0,0,0,896,906,5,37,0,0,897,906,
        5,16,0,0,898,906,5,1,0,0,899,906,5,9,0,0,900,906,5,5,0,0,901,906,
        5,17,0,0,902,906,5,18,0,0,903,906,5,19,0,0,904,906,3,126,63,0,905,
        896,1,0,0,0,905,897,1,0,0,0,905,898,1,0,0,0,905,899,1,0,0,0,905,
        900,1,0,0,0,905,901,1,0,0,0,905,902,1,0,0,0,905,903,1,0,0,0,905,
        904,1,0,0,0,906,109,1,0,0,0,907,910,3,108,54,0,908,910,5,14,0,0,
        909,907,1,0,0,0,909,908,1,0,0,0,910,111,1,0,0,0,911,919,3,110,55,
        0,912,919,5,10,0,0,913,919,5,11,0,0,914,919,5,12,0,0,915,919,5,13,
        0,0,916,919,5,15,0,0,917,919,3,126,63,0,918,911,1,0,0,0,918,912,
        1,0,0,0,918,913,1,0,0,0,918,914,1,0,0,0,918,915,1,0,0,0,918,916,
        1,0,0,0,918,917,1,0,0,0,919,113,1,0,0,0,920,940,3,108,54,0,921,940,
        5,10,0,0,922,940,5,11,0,0,923,940,5,12,0,0,924,940,5,13,0,0,925,
        940,5,14,0,0,926,940,5,42,0,0,927,940,5,20,0,0,928,940,5,30,0,0,
        929,940,5,31,0,0,930,940,5,32,0,0,931,940,5,24,0,0,932,940,5,25,
        0,0,933,940,5,26,0,0,934,940,5,27,0,0,935,940,5,28,0,0,936,940,5,
        29,0,0,937,940,5,34,0,0,938,940,5,33,0,0,939,920,1,0,0,0,939,921,
        1,0,0,0,939,922,1,0,0,0,939,923,1,0,0,0,939,924,1,0,0,0,939,925,
        1,0,0,0,939,926,1,0,0,0,939,927,1,0,0,0,939,928,1,0,0,0,939,929,
        1,0,0,0,939,930,1,0,0,0,939,931,1,0,0,0,939,932,1,0,0,0,939,933,
        1,0,0,0,939,934,1,0,0,0,939,935,1,0,0,0,939,936,1,0,0,0,939,937,
        1,0,0,0,939,938,1,0,0,0,940,115,1,0,0,0,941,945,3,112,56,0,942,945,
        5,42,0,0,943,945,5,15,0,0,944,941,1,0,0,0,944,942,1,0,0,0,944,943,
        1,0,0,0,945,117,1,0,0,0,946,948,3,108,54,0,947,946,1,0,0,0,948,949,
        1,0,0,0,949,947,1,0,0,0,949,950,1,0,0,0,950,119,1,0,0,0,951,953,
        3,110,55,0,952,951,1,0,0,0,953,954,1,0,0,0,954,952,1,0,0,0,954,955,
        1,0,0,0,955,121,1,0,0,0,956,958,3,112,56,0,957,956,1,0,0,0,958,959,
        1,0,0,0,959,957,1,0,0,0,959,960,1,0,0,0,960,123,1,0,0,0,961,963,
        3,116,58,0,962,961,1,0,0,0,963,964,1,0,0,0,964,962,1,0,0,0,964,965,
        1,0,0,0,965,125,1,0,0,0,966,967,7,4,0,0,967,127,1,0,0,0,968,969,
        7,5,0,0,969,129,1,0,0,0,970,972,5,42,0,0,971,970,1,0,0,0,971,972,
        1,0,0,0,972,131,1,0,0,0,973,974,7,6,0,0,974,133,1,0,0,0,975,977,
        5,36,0,0,976,978,3,132,66,0,977,976,1,0,0,0,977,978,1,0,0,0,978,
        979,1,0,0,0,979,980,5,12,0,0,980,981,3,136,68,0,981,983,5,13,0,0,
        982,984,3,132,66,0,983,982,1,0,0,0,983,984,1,0,0,0,984,135,1,0,0,
        0,985,987,9,0,0,0,986,985,1,0,0,0,987,990,1,0,0,0,988,989,1,0,0,
        0,988,986,1,0,0,0,989,137,1,0,0,0,990,988,1,0,0,0,149,142,147,149,
        154,158,162,166,173,177,181,185,189,197,201,205,209,215,219,223,
        227,234,238,242,246,250,258,262,266,270,274,278,288,301,312,322,
        335,344,351,355,359,363,367,373,377,383,389,393,397,400,403,409,
        412,415,423,425,436,448,450,454,464,468,472,478,482,486,505,508,
        512,519,523,526,530,537,541,544,548,555,559,562,566,573,577,581,
        591,593,596,600,603,608,616,621,629,634,638,643,647,706,711,715,
        718,722,726,734,738,742,746,749,752,756,760,764,768,772,776,780,
        784,788,792,796,799,802,806,812,814,817,820,828,834,838,842,849,
        854,860,872,885,890,905,909,918,939,944,949,954,959,964,971,977,
        983,988
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
