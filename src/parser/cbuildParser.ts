
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
                switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context) ) {
                case 1:
                    {
                    this.state = 366;
                    this.ws();
                    }
                    break;
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
            this.state = 463;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 62, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 443;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 442;
                    this.ws();
                    }
                }

                this.state = 445;
                this.match(cbuildParser.EXPORT);
                this.state = 447;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 446;
                    this.ws();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 450;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 449;
                    this.ws();
                    }
                }

                this.state = 452;
                this.match(cbuildParser.UNEXPORT);
                this.state = 454;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 453;
                    this.ws();
                    }
                }

                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 457;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 456;
                    this.ws();
                    }
                }

                this.state = 459;
                this.assignment_prefix();
                this.state = 461;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 460;
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
            this.state = 465;
            this.match(cbuildParser.VPATH);
            this.state = 467;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 466;
                this.vpath_args();
                }
            }

            this.state = 469;
            this.comment_opt();
            this.state = 470;
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
            this.state = 472;
            this.ws();
            this.state = 473;
            this.pattern();
            this.state = 477;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 474;
                this.ws();
                this.state = 475;
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
            this.state = 499;
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
                this.state = 479;
                this.pattern();
                this.state = 481;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 480;
                    this.ws();
                    }
                }

                this.state = 483;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 485;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 66, this.context) ) {
                case 1:
                    {
                    this.state = 484;
                    this.exprs_in_assign();
                    }
                    break;
                }
                this.state = 487;
                this.comment_opt();
                }
                break;
            case cbuildParser.OVERRIDE:
            case cbuildParser.EXPORT:
            case cbuildParser.UNEXPORT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 489;
                this.assignment_prefix();
                this.state = 491;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 490;
                    this.ws();
                    }
                }

                this.state = 493;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 495;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 68, this.context) ) {
                case 1:
                    {
                    this.state = 494;
                    this.exprs_in_assign();
                    }
                    break;
                }
                this.state = 497;
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
            this.state = 501;
            this.specifiers();
            this.state = 502;
            this.ws();
            this.state = 503;
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
            this.state = 505;
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
            this.state = 507;
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
            this.state = 509;
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
            this.state = 511;
            this.match(cbuildParser.LPAREN);
            this.state = 512;
            this.expressions_opt();
            this.state = 513;
            this.match(cbuildParser.COMMA);
            this.state = 514;
            this.expressions_opt();
            this.state = 515;
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
            this.state = 518;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288611902) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 815) !== 0)) {
                {
                this.state = 517;
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
            this.state = 521;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 520;
                this.ws();
                }
            }

            this.state = 523;
            this.expression();
            this.state = 525;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 72, this.context) ) {
            case 1:
                {
                this.state = 524;
                this.ws();
                }
                break;
            }
            this.state = 532;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 527;
                    this.ws();
                    this.state = 528;
                    this.expression();
                    }
                    }
                }
                this.state = 534;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 73, this.context);
            }
            this.state = 536;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 535;
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
            this.state = 539;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 538;
                this.ws();
                }
            }

            this.state = 541;
            this.expr_nested();
            this.state = 543;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 76, this.context) ) {
            case 1:
                {
                this.state = 542;
                this.ws();
                }
                break;
            }
            this.state = 550;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 545;
                    this.ws();
                    this.state = 546;
                    this.expr_nested();
                    }
                    }
                }
                this.state = 552;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 77, this.context);
            }
            this.state = 554;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 553;
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
            this.state = 557;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 556;
                this.ws();
                }
            }

            this.state = 559;
            this.expr_in_assign();
            this.state = 561;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 80, this.context) ) {
            case 1:
                {
                this.state = 560;
                this.ws();
                }
                break;
            }
            this.state = 568;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 563;
                    this.ws();
                    this.state = 564;
                    this.expr_in_assign();
                    }
                    }
                }
                this.state = 570;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 81, this.context);
            }
            this.state = 572;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
            case 1:
                {
                this.state = 571;
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
            this.state = 575;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 574;
                this.ws();
                }
            }

            this.state = 577;
            this.expr_in_recipe();
            this.state = 579;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
            case 1:
                {
                this.state = 578;
                this.ws();
                }
                break;
            }
            this.state = 586;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 581;
                    this.ws();
                    this.state = 582;
                    this.expr_in_recipe();
                    }
                    }
                }
                this.state = 588;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 85, this.context);
            }
            this.state = 590;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 589;
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
            this.state = 609;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 90, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 592;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 594;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 38) {
                    {
                    this.state = 593;
                    this.br();
                    }
                }

                this.state = 596;
                this.first_expr_in_def();
                this.state = 606;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 89, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        this.state = 604;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 88, this.context) ) {
                        case 1:
                            {
                            {
                            this.state = 597;
                            this.br();
                            this.state = 598;
                            this.first_expr_in_def();
                            }
                            }
                            break;
                        case 2:
                            {
                            {
                            this.state = 600;
                            this.br();
                            }
                            }
                            break;
                        case 3:
                            {
                            {
                            this.state = 601;
                            this.ws();
                            this.state = 602;
                            this.expr_in_recipe();
                            }
                            }
                            break;
                        }
                        }
                    }
                    this.state = 608;
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
            this.state = 613;
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
                this.state = 611;
                this.char_in_def();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                {
                this.state = 612;
                this.function_();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 616;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288675390) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1071) !== 0)) {
                {
                this.state = 615;
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
            this.state = 619;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 618;
                this.expression_atom();
                }
                }
                this.state = 621;
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
            this.state = 629;
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
                this.state = 623;
                this.text();
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
    public expr_nested(): Expr_nestedContext {
        let localContext = new Expr_nestedContext(this.context, this.state);
        this.enterRule(localContext, 56, cbuildParser.RULE_expr_nested);
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
                this.expr_nested_atom();
                }
                }
                this.state = 634;
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
            this.state = 642;
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
                this.state = 636;
                this.text_nested();
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
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 638;
                this.match(cbuildParser.LPAREN);
                this.state = 639;
                this.exprs_nested();
                this.state = 640;
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
            this.state = 645;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 644;
                this.expr_in_assign_atom();
                }
                }
                this.state = 647;
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
            this.state = 651;
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
                this.state = 649;
                this.text_in_assign();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 650;
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
            this.state = 654;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 653;
                this.expr_in_recipe_atom();
                }
                }
                this.state = 656;
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
            this.state = 660;
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
                this.state = 658;
                this.text_in_recipe();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 659;
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
            this.state = 719;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 101, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 662;
                this.match(cbuildParser.VAR);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 663;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 664;
                this.function_name();
                this.state = 665;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 667;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 668;
                this.function_name();
                this.state = 669;
                this.ws();
                this.state = 670;
                this.arguments();
                this.state = 671;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 673;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 674;
                this.function_name();
                this.state = 675;
                this.match(cbuildParser.COMMA);
                this.state = 676;
                this.arguments();
                this.state = 677;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 679;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 680;
                this.function_name();
                this.state = 681;
                this.match(cbuildParser.COLON);
                this.state = 682;
                this.expressions();
                this.state = 683;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 685;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 686;
                this.function_name();
                this.state = 687;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 688;
                this.expressions();
                this.state = 689;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 691;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 692;
                this.function_name();
                this.state = 693;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 695;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 696;
                this.function_name();
                this.state = 697;
                this.ws();
                this.state = 698;
                this.arguments();
                this.state = 699;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 701;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 702;
                this.function_name();
                this.state = 703;
                this.match(cbuildParser.COMMA);
                this.state = 704;
                this.arguments();
                this.state = 705;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 707;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 708;
                this.function_name();
                this.state = 709;
                this.match(cbuildParser.COLON);
                this.state = 710;
                this.expressions();
                this.state = 711;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 713;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 714;
                this.function_name();
                this.state = 715;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 716;
                this.expressions();
                this.state = 717;
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
            this.state = 722;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 721;
                this.function_name_atom();
                }
                }
                this.state = 724;
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
            this.state = 728;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 726;
                this.match(cbuildParser.CHARS);
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 727;
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
            this.state = 731;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288611902) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 815) !== 0)) {
                {
                this.state = 730;
                this.argument();
                }
            }

            this.state = 739;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 14) {
                {
                {
                this.state = 733;
                this.match(cbuildParser.COMMA);
                this.state = 735;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4288611902) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 815) !== 0)) {
                    {
                    this.state = 734;
                    this.argument();
                    }
                }

                }
                }
                this.state = 741;
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
            this.state = 742;
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
            this.state = 785;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 117, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 744;
                this.static_pattern_rule();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 745;
                this.targets();
                this.state = 747;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 746;
                    this.ws();
                    }
                }

                this.state = 749;
                this.colon();
                this.state = 751;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 108, this.context) ) {
                case 1:
                    {
                    this.state = 750;
                    this.ws();
                    }
                    break;
                }
                this.state = 753;
                this.prerequisites();
                this.state = 762;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
                case 1:
                    {
                    this.state = 755;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 40 || _la === 41) {
                        {
                        this.state = 754;
                        this.ws();
                        }
                    }

                    this.state = 757;
                    this.match(cbuildParser.PIPE);
                    this.state = 759;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 110, this.context) ) {
                    case 1:
                        {
                        this.state = 758;
                        this.ws();
                        }
                        break;
                    }
                    this.state = 761;
                    this.orderonlyprerequisites();
                    }
                    break;
                }
                this.state = 765;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 764;
                    this.ws();
                    }
                }

                this.state = 767;
                this.match(cbuildParser.NL);
                this.state = 769;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 113, this.context) ) {
                case 1:
                    {
                    this.state = 768;
                    this.recipes();
                    }
                    break;
                }
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 771;
                this.targets();
                this.state = 773;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 772;
                    this.ws();
                    }
                }

                this.state = 775;
                this.colon();
                this.state = 777;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 776;
                    this.ws();
                    }
                }

                this.state = 779;
                this.assignment();
                this.state = 781;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 780;
                    this.ws();
                    }
                }

                this.state = 783;
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
            this.state = 787;
            this.targets();
            this.state = 789;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 788;
                this.ws();
                }
            }

            this.state = 791;
            this.colon();
            this.state = 793;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 792;
                this.ws();
                }
            }

            this.state = 795;
            this.pattern();
            this.state = 797;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 796;
                this.ws();
                }
            }

            this.state = 799;
            this.colon();
            this.state = 801;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 121, this.context) ) {
            case 1:
                {
                this.state = 800;
                this.ws();
                }
                break;
            }
            this.state = 803;
            this.prerequisites();
            this.state = 812;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 124, this.context) ) {
            case 1:
                {
                this.state = 805;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 804;
                    this.ws();
                    }
                }

                this.state = 807;
                this.match(cbuildParser.PIPE);
                this.state = 809;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 123, this.context) ) {
                case 1:
                    {
                    this.state = 808;
                    this.ws();
                    }
                    break;
                }
                this.state = 811;
                this.orderonlyprerequisites();
                }
                break;
            }
            this.state = 815;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 814;
                this.ws();
                }
            }

            this.state = 817;
            this.match(cbuildParser.NL);
            this.state = 819;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 126, this.context) ) {
            case 1:
                {
                this.state = 818;
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
            this.state = 821;
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
            this.state = 825;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    this.state = 825;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case cbuildParser.LPAREN:
                    case cbuildParser.RPAREN:
                    case cbuildParser.L_CURLY_BRACE:
                    case cbuildParser.R_CURLY_BRACE:
                    case cbuildParser.COMMA:
                    case cbuildParser.CHARS:
                        {
                        this.state = 823;
                        this.identifier();
                        }
                        break;
                    case cbuildParser.DOLLAR_LPAREN:
                    case cbuildParser.DOLLAR_L_CURLY_BRACE:
                    case cbuildParser.VAR:
                        {
                        this.state = 824;
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
                this.state = 827;
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
            this.state = 830;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 31772) !== 0) || _la === 37) {
                {
                this.state = 829;
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
            this.state = 833;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 31772) !== 0) || _la === 37) {
                {
                this.state = 832;
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
            this.state = 835;
            this.target();
            this.state = 841;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 131, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 836;
                    this.ws();
                    this.state = 837;
                    this.target();
                    }
                    }
                }
                this.state = 843;
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
            this.state = 845;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 844;
                    this.recipe();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 847;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 132, this.context);
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
            this.state = 849;
            this.comment_opt();
            this.state = 851;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 24)) & ~0x1F) === 0 && ((1 << (_la - 24)) & 507919) !== 0)) {
                {
                this.state = 850;
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
            this.state = 873;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 137, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 853;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 855;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 134, this.context) ) {
                case 1:
                    {
                    this.state = 854;
                    this.ws();
                    }
                    break;
                }
                this.state = 857;
                this.exprs_in_recipe();
                this.state = 858;
                this.match(cbuildParser.NL);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 860;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 862;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 861;
                    this.ws();
                    }
                }

                this.state = 864;
                this.match(cbuildParser.COMMENT);
                this.state = 865;
                this.match(cbuildParser.NL);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 867;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 40 || _la === 41) {
                    {
                    this.state = 866;
                    this.ws();
                    }
                }

                this.state = 869;
                this.match(cbuildParser.COMMENT);
                this.state = 870;
                this.match(cbuildParser.NL);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 871;
                this.conditional_in_recipe();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 872;
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
            this.state = 885;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.UNDEFINE:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 875;
                this.match(cbuildParser.UNDEFINE);
                this.state = 876;
                this.ws();
                this.state = 877;
                this.pattern();
                }
                break;
            case cbuildParser.OVERRIDE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 879;
                this.match(cbuildParser.OVERRIDE);
                this.state = 880;
                this.ws();
                this.state = 881;
                this.match(cbuildParser.UNDEFINE);
                this.state = 882;
                this.ws();
                this.state = 883;
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
            this.state = 898;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 139, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 887;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 888;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 889;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 890;
                this.match(cbuildParser.OVERRIDE);
                this.state = 891;
                this.ws();
                this.state = 892;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 894;
                this.match(cbuildParser.EXPORT);
                this.state = 895;
                this.ws();
                this.state = 896;
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
            this.state = 901;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 900;
                    this.identifier_atom();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 903;
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
    public identifier_atom(): Identifier_atomContext {
        let localContext = new Identifier_atomContext(this.context, this.state);
        this.enterRule(localContext, 104, cbuildParser.RULE_identifier_atom);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 905;
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
            this.state = 907;
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
            this.state = 918;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 909;
                this.match(cbuildParser.CHARS);
                }
                break;
            case cbuildParser.BACKSLASH:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 910;
                this.match(cbuildParser.BACKSLASH);
                }
                break;
            case cbuildParser.ASSIGN_OP:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 911;
                this.match(cbuildParser.ASSIGN_OP);
                }
                break;
            case cbuildParser.COLON:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 912;
                this.match(cbuildParser.COLON);
                }
                break;
            case cbuildParser.DOUBLE_DOLLAR:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 913;
                this.match(cbuildParser.DOUBLE_DOLLAR);
                }
                break;
            case cbuildParser.PLUS:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 914;
                this.match(cbuildParser.PLUS);
                }
                break;
            case cbuildParser.QUESTION:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 915;
                this.match(cbuildParser.QUESTION);
                }
                break;
            case cbuildParser.BANG:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 916;
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
                this.state = 917;
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
            this.state = 922;
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
                this.state = 920;
                this.char();
                }
                break;
            case cbuildParser.COMMA:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 921;
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
            this.state = 931;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 143, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 924;
                this.char_nested();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 925;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 926;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 927;
                this.match(cbuildParser.L_CURLY_BRACE);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 928;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 929;
                this.match(cbuildParser.PIPE);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 930;
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
            this.state = 952;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 144, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 933;
                this.char();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 934;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 935;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 936;
                this.match(cbuildParser.L_CURLY_BRACE);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 937;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 938;
                this.match(cbuildParser.COMMA);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 939;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 940;
                this.match(cbuildParser.INCLUDE);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 941;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 942;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 943;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 12:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 944;
                this.match(cbuildParser.IFDEF);
                }
                break;
            case 13:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 945;
                this.match(cbuildParser.IFNDEF);
                }
                break;
            case 14:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 946;
                this.match(cbuildParser.IFEQ);
                }
                break;
            case 15:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 947;
                this.match(cbuildParser.IFNEQ);
                }
                break;
            case 16:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 948;
                this.match(cbuildParser.ELSE);
                }
                break;
            case 17:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 949;
                this.match(cbuildParser.ENDIF);
                }
                break;
            case 18:
                this.enterOuterAlt(localContext, 18);
                {
                this.state = 950;
                this.match(cbuildParser.DEFINE);
                }
                break;
            case 19:
                this.enterOuterAlt(localContext, 19);
                {
                this.state = 951;
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
            this.state = 957;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 145, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 954;
                this.char_in_assign();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 955;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 956;
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
            this.state = 960;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 959;
                    this.char();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 962;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 146, this.context);
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
            this.state = 965;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 964;
                    this.char_nested();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 967;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 147, this.context);
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
            this.state = 970;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 969;
                    this.char_in_assign();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 972;
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
    public text_in_recipe(): Text_in_recipeContext {
        let localContext = new Text_in_recipeContext(this.context, this.state);
        this.enterRule(localContext, 124, cbuildParser.RULE_text_in_recipe);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 975;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 974;
                    this.char_in_recipe();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 977;
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
    public keywords(): KeywordsContext {
        let localContext = new KeywordsContext(this.context, this.state);
        this.enterRule(localContext, 126, cbuildParser.RULE_keywords);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 979;
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
            this.state = 981;
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
            this.state = 984;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 150, this.context) ) {
            case 1:
                {
                this.state = 983;
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
            this.state = 986;
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
            this.state = 988;
            this.match(cbuildParser.HOOK);
            this.state = 990;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40 || _la === 41) {
                {
                this.state = 989;
                this.ws();
                }
            }

            this.state = 992;
            this.match(cbuildParser.L_CURLY_BRACE);
            this.state = 993;
            this.hook_program();
            this.state = 994;
            this.match(cbuildParser.R_CURLY_BRACE);
            this.state = 996;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 152, this.context) ) {
            case 1:
                {
                this.state = 995;
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
            this.state = 1001;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 153, this.context);
            while (alternative !== 1 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1 + 1) {
                    {
                    {
                    this.state = 998;
                    this.matchWildcard();
                    }
                    }
                }
                this.state = 1003;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 153, this.context);
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
        4,1,42,1005,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
        46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,
        52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,
        59,7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,
        65,2,66,7,66,2,67,7,67,2,68,7,68,1,0,1,0,1,0,1,0,3,0,143,8,0,1,1,
        1,1,1,1,5,1,148,8,1,10,1,12,1,151,9,1,1,2,1,2,3,2,155,8,2,1,2,1,
        2,3,2,159,8,2,1,2,1,2,3,2,163,8,2,1,2,1,2,3,2,167,8,2,1,2,1,2,1,
        2,1,2,1,2,3,2,174,8,2,1,2,1,2,3,2,178,8,2,1,2,1,2,3,2,182,8,2,1,
        2,1,2,3,2,186,8,2,1,2,1,2,3,2,190,8,2,1,2,1,2,1,2,1,2,1,2,1,2,3,
        2,198,8,2,1,2,1,2,3,2,202,8,2,1,2,1,2,3,2,206,8,2,1,2,1,2,3,2,210,
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
        1,10,3,10,444,8,10,1,10,1,10,3,10,448,8,10,1,10,3,10,451,8,10,1,
        10,1,10,3,10,455,8,10,1,10,3,10,458,8,10,1,10,1,10,3,10,462,8,10,
        3,10,464,8,10,1,11,1,11,3,11,468,8,11,1,11,1,11,1,11,1,12,1,12,1,
        12,1,12,1,12,3,12,478,8,12,1,13,1,13,3,13,482,8,13,1,13,1,13,3,13,
        486,8,13,1,13,1,13,1,13,1,13,3,13,492,8,13,1,13,1,13,3,13,496,8,
        13,1,13,1,13,3,13,500,8,13,1,14,1,14,1,14,1,14,1,15,1,15,1,16,1,
        16,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,19,3,19,519,8,19,1,
        20,3,20,522,8,20,1,20,1,20,3,20,526,8,20,1,20,1,20,1,20,5,20,531,
        8,20,10,20,12,20,534,9,20,1,20,3,20,537,8,20,1,21,3,21,540,8,21,
        1,21,1,21,3,21,544,8,21,1,21,1,21,1,21,5,21,549,8,21,10,21,12,21,
        552,9,21,1,21,3,21,555,8,21,1,22,3,22,558,8,22,1,22,1,22,3,22,562,
        8,22,1,22,1,22,1,22,5,22,567,8,22,10,22,12,22,570,9,22,1,22,3,22,
        573,8,22,1,23,3,23,576,8,23,1,23,1,23,3,23,580,8,23,1,23,1,23,1,
        23,5,23,585,8,23,10,23,12,23,588,9,23,1,23,3,23,591,8,23,1,24,1,
        24,3,24,595,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,5,24,605,
        8,24,10,24,12,24,608,9,24,3,24,610,8,24,1,25,1,25,3,25,614,8,25,
        1,25,3,25,617,8,25,1,26,4,26,620,8,26,11,26,12,26,621,1,27,1,27,
        1,27,1,27,1,27,1,27,3,27,630,8,27,1,28,4,28,633,8,28,11,28,12,28,
        634,1,29,1,29,1,29,1,29,1,29,1,29,3,29,643,8,29,1,30,4,30,646,8,
        30,11,30,12,30,647,1,31,1,31,3,31,652,8,31,1,32,4,32,655,8,32,11,
        32,12,32,656,1,33,1,33,3,33,661,8,33,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,
        34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,1,34,3,
        34,720,8,34,1,35,4,35,723,8,35,11,35,12,35,724,1,36,1,36,3,36,729,
        8,36,1,37,3,37,732,8,37,1,37,1,37,3,37,736,8,37,5,37,738,8,37,10,
        37,12,37,741,9,37,1,38,1,38,1,39,1,39,1,39,3,39,748,8,39,1,39,1,
        39,3,39,752,8,39,1,39,1,39,3,39,756,8,39,1,39,1,39,3,39,760,8,39,
        1,39,3,39,763,8,39,1,39,3,39,766,8,39,1,39,1,39,3,39,770,8,39,1,
        39,1,39,3,39,774,8,39,1,39,1,39,3,39,778,8,39,1,39,1,39,3,39,782,
        8,39,1,39,1,39,3,39,786,8,39,1,40,1,40,3,40,790,8,40,1,40,1,40,3,
        40,794,8,40,1,40,1,40,3,40,798,8,40,1,40,1,40,3,40,802,8,40,1,40,
        1,40,3,40,806,8,40,1,40,1,40,3,40,810,8,40,1,40,3,40,813,8,40,1,
        40,3,40,816,8,40,1,40,1,40,3,40,820,8,40,1,41,1,41,1,42,1,42,4,42,
        826,8,42,11,42,12,42,827,1,43,3,43,831,8,43,1,44,3,44,834,8,44,1,
        45,1,45,1,45,1,45,5,45,840,8,45,10,45,12,45,843,9,45,1,46,4,46,846,
        8,46,11,46,12,46,847,1,47,1,47,3,47,852,8,47,1,48,1,48,3,48,856,
        8,48,1,48,1,48,1,48,1,48,1,48,3,48,863,8,48,1,48,1,48,1,48,3,48,
        868,8,48,1,48,1,48,1,48,1,48,3,48,874,8,48,1,49,1,49,1,49,1,49,1,
        49,1,49,1,49,1,49,1,49,1,49,3,49,886,8,49,1,50,1,50,1,50,1,50,1,
        50,1,50,1,50,1,50,1,50,1,50,1,50,3,50,899,8,50,1,51,4,51,902,8,51,
        11,51,12,51,903,1,52,1,52,1,53,1,53,1,54,1,54,1,54,1,54,1,54,1,54,
        1,54,1,54,1,54,3,54,919,8,54,1,55,1,55,3,55,923,8,55,1,56,1,56,1,
        56,1,56,1,56,1,56,1,56,3,56,932,8,56,1,57,1,57,1,57,1,57,1,57,1,
        57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,
        57,3,57,953,8,57,1,58,1,58,1,58,3,58,958,8,58,1,59,4,59,961,8,59,
        11,59,12,59,962,1,60,4,60,966,8,60,11,60,12,60,967,1,61,4,61,971,
        8,61,11,61,12,61,972,1,62,4,62,976,8,62,11,62,12,62,977,1,63,1,63,
        1,64,1,64,1,65,3,65,985,8,65,1,66,1,66,1,67,1,67,3,67,991,8,67,1,
        67,1,67,1,67,1,67,3,67,997,8,67,1,68,5,68,1000,8,68,10,68,12,68,
        1003,9,68,1,68,1,1001,0,69,0,2,4,6,8,10,12,14,16,18,20,22,24,26,
        28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,
        72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,
        112,114,116,118,120,122,124,126,128,130,132,134,136,0,7,1,0,26,27,
        1,0,24,25,1,0,20,22,2,0,10,14,37,37,2,0,20,20,23,35,1,0,6,9,1,0,
        40,41,1157,0,142,1,0,0,0,2,149,1,0,0,0,4,274,1,0,0,0,6,344,1,0,0,
        0,8,346,1,0,0,0,10,400,1,0,0,0,12,403,1,0,0,0,14,425,1,0,0,0,16,
        436,1,0,0,0,18,438,1,0,0,0,20,463,1,0,0,0,22,465,1,0,0,0,24,472,
        1,0,0,0,26,499,1,0,0,0,28,501,1,0,0,0,30,505,1,0,0,0,32,507,1,0,
        0,0,34,509,1,0,0,0,36,511,1,0,0,0,38,518,1,0,0,0,40,521,1,0,0,0,
        42,539,1,0,0,0,44,557,1,0,0,0,46,575,1,0,0,0,48,609,1,0,0,0,50,613,
        1,0,0,0,52,619,1,0,0,0,54,629,1,0,0,0,56,632,1,0,0,0,58,642,1,0,
        0,0,60,645,1,0,0,0,62,651,1,0,0,0,64,654,1,0,0,0,66,660,1,0,0,0,
        68,719,1,0,0,0,70,722,1,0,0,0,72,728,1,0,0,0,74,731,1,0,0,0,76,742,
        1,0,0,0,78,785,1,0,0,0,80,787,1,0,0,0,82,821,1,0,0,0,84,825,1,0,
        0,0,86,830,1,0,0,0,88,833,1,0,0,0,90,835,1,0,0,0,92,845,1,0,0,0,
        94,849,1,0,0,0,96,873,1,0,0,0,98,885,1,0,0,0,100,898,1,0,0,0,102,
        901,1,0,0,0,104,905,1,0,0,0,106,907,1,0,0,0,108,918,1,0,0,0,110,
        922,1,0,0,0,112,931,1,0,0,0,114,952,1,0,0,0,116,957,1,0,0,0,118,
        960,1,0,0,0,120,965,1,0,0,0,122,970,1,0,0,0,124,975,1,0,0,0,126,
        979,1,0,0,0,128,981,1,0,0,0,130,984,1,0,0,0,132,986,1,0,0,0,134,
        988,1,0,0,0,136,1001,1,0,0,0,138,139,3,2,1,0,139,140,5,0,0,1,140,
        143,1,0,0,0,141,143,5,0,0,1,142,138,1,0,0,0,142,141,1,0,0,0,143,
        1,1,0,0,0,144,148,3,10,5,0,145,148,3,106,53,0,146,148,3,132,66,0,
        147,144,1,0,0,0,147,145,1,0,0,0,147,146,1,0,0,0,148,151,1,0,0,0,
        149,147,1,0,0,0,149,150,1,0,0,0,150,3,1,0,0,0,151,149,1,0,0,0,152,
        154,3,30,15,0,153,155,3,132,66,0,154,153,1,0,0,0,154,155,1,0,0,0,
        155,156,1,0,0,0,156,158,3,36,18,0,157,159,3,132,66,0,158,157,1,0,
        0,0,158,159,1,0,0,0,159,160,1,0,0,0,160,162,3,8,4,0,161,163,3,132,
        66,0,162,161,1,0,0,0,162,163,1,0,0,0,163,164,1,0,0,0,164,166,5,29,
        0,0,165,167,3,132,66,0,166,165,1,0,0,0,166,167,1,0,0,0,167,168,1,
        0,0,0,168,169,3,130,65,0,169,170,3,106,53,0,170,275,1,0,0,0,171,
        173,3,30,15,0,172,174,3,132,66,0,173,172,1,0,0,0,173,174,1,0,0,0,
        174,175,1,0,0,0,175,177,3,36,18,0,176,178,3,132,66,0,177,176,1,0,
        0,0,177,178,1,0,0,0,178,179,1,0,0,0,179,181,3,8,4,0,180,182,3,132,
        66,0,181,180,1,0,0,0,181,182,1,0,0,0,182,183,1,0,0,0,183,185,5,28,
        0,0,184,186,3,132,66,0,185,184,1,0,0,0,185,186,1,0,0,0,186,187,1,
        0,0,0,187,189,3,8,4,0,188,190,3,132,66,0,189,188,1,0,0,0,189,190,
        1,0,0,0,190,191,1,0,0,0,191,192,5,29,0,0,192,193,3,130,65,0,193,
        194,3,106,53,0,194,275,1,0,0,0,195,197,3,30,15,0,196,198,3,132,66,
        0,197,196,1,0,0,0,197,198,1,0,0,0,198,199,1,0,0,0,199,201,3,36,18,
        0,200,202,3,132,66,0,201,200,1,0,0,0,201,202,1,0,0,0,202,203,1,0,
        0,0,203,205,3,8,4,0,204,206,3,132,66,0,205,204,1,0,0,0,205,206,1,
        0,0,0,206,207,1,0,0,0,207,209,5,28,0,0,208,210,3,132,66,0,209,208,
        1,0,0,0,209,210,1,0,0,0,210,211,1,0,0,0,211,212,3,4,2,0,212,275,
        1,0,0,0,213,215,3,32,16,0,214,216,3,132,66,0,215,214,1,0,0,0,215,
        216,1,0,0,0,216,217,1,0,0,0,217,219,3,84,42,0,218,220,3,132,66,0,
        219,218,1,0,0,0,219,220,1,0,0,0,220,221,1,0,0,0,221,223,3,8,4,0,
        222,224,3,132,66,0,223,222,1,0,0,0,223,224,1,0,0,0,224,225,1,0,0,
        0,225,227,5,29,0,0,226,228,3,132,66,0,227,226,1,0,0,0,227,228,1,
        0,0,0,228,229,1,0,0,0,229,230,3,130,65,0,230,231,3,106,53,0,231,
        275,1,0,0,0,232,234,3,32,16,0,233,235,3,132,66,0,234,233,1,0,0,0,
        234,235,1,0,0,0,235,236,1,0,0,0,236,238,3,84,42,0,237,239,3,132,
        66,0,238,237,1,0,0,0,238,239,1,0,0,0,239,240,1,0,0,0,240,242,3,8,
        4,0,241,243,3,132,66,0,242,241,1,0,0,0,242,243,1,0,0,0,243,244,1,
        0,0,0,244,246,5,28,0,0,245,247,3,132,66,0,246,245,1,0,0,0,246,247,
        1,0,0,0,247,248,1,0,0,0,248,250,3,8,4,0,249,251,3,132,66,0,250,249,
        1,0,0,0,250,251,1,0,0,0,251,252,1,0,0,0,252,253,5,29,0,0,253,254,
        3,130,65,0,254,255,3,106,53,0,255,275,1,0,0,0,256,258,3,32,16,0,
        257,259,3,132,66,0,258,257,1,0,0,0,258,259,1,0,0,0,259,260,1,0,0,
        0,260,262,3,84,42,0,261,263,3,132,66,0,262,261,1,0,0,0,262,263,1,
        0,0,0,263,264,1,0,0,0,264,266,3,8,4,0,265,267,3,132,66,0,266,265,
        1,0,0,0,266,267,1,0,0,0,267,268,1,0,0,0,268,270,5,28,0,0,269,271,
        3,132,66,0,270,269,1,0,0,0,270,271,1,0,0,0,271,272,1,0,0,0,272,273,
        3,4,2,0,273,275,1,0,0,0,274,152,1,0,0,0,274,171,1,0,0,0,274,195,
        1,0,0,0,274,213,1,0,0,0,274,232,1,0,0,0,274,256,1,0,0,0,275,5,1,
        0,0,0,276,278,3,30,15,0,277,279,3,132,66,0,278,277,1,0,0,0,278,279,
        1,0,0,0,279,280,1,0,0,0,280,281,3,36,18,0,281,282,5,38,0,0,282,283,
        3,94,47,0,283,284,5,29,0,0,284,285,3,130,65,0,285,345,1,0,0,0,286,
        288,3,30,15,0,287,289,3,132,66,0,288,287,1,0,0,0,288,289,1,0,0,0,
        289,290,1,0,0,0,290,291,3,36,18,0,291,292,5,38,0,0,292,293,3,94,
        47,0,293,294,5,28,0,0,294,295,5,38,0,0,295,296,3,94,47,0,296,297,
        5,29,0,0,297,298,3,130,65,0,298,345,1,0,0,0,299,301,3,30,15,0,300,
        302,3,132,66,0,301,300,1,0,0,0,301,302,1,0,0,0,302,303,1,0,0,0,303,
        304,3,36,18,0,304,305,5,38,0,0,305,306,3,94,47,0,306,307,5,28,0,
        0,307,308,5,38,0,0,308,309,3,6,3,0,309,345,1,0,0,0,310,312,3,32,
        16,0,311,313,3,132,66,0,312,311,1,0,0,0,312,313,1,0,0,0,313,314,
        1,0,0,0,314,315,3,84,42,0,315,316,5,38,0,0,316,317,3,94,47,0,317,
        318,5,29,0,0,318,319,3,130,65,0,319,345,1,0,0,0,320,322,3,32,16,
        0,321,323,3,132,66,0,322,321,1,0,0,0,322,323,1,0,0,0,323,324,1,0,
        0,0,324,325,3,84,42,0,325,326,5,38,0,0,326,327,3,94,47,0,327,328,
        5,28,0,0,328,329,5,38,0,0,329,330,3,94,47,0,330,331,5,29,0,0,331,
        332,3,130,65,0,332,345,1,0,0,0,333,335,3,32,16,0,334,336,3,132,66,
        0,335,334,1,0,0,0,335,336,1,0,0,0,336,337,1,0,0,0,337,338,3,84,42,
        0,338,339,5,38,0,0,339,340,3,94,47,0,340,341,5,28,0,0,341,342,5,
        38,0,0,342,343,3,6,3,0,343,345,1,0,0,0,344,276,1,0,0,0,344,286,1,
        0,0,0,344,299,1,0,0,0,344,310,1,0,0,0,344,320,1,0,0,0,344,333,1,
        0,0,0,345,7,1,0,0,0,346,347,3,130,65,0,347,348,3,106,53,0,348,349,
        3,2,1,0,349,9,1,0,0,0,350,352,3,132,66,0,351,350,1,0,0,0,351,352,
        1,0,0,0,352,353,1,0,0,0,353,401,5,42,0,0,354,356,3,132,66,0,355,
        354,1,0,0,0,355,356,1,0,0,0,356,357,1,0,0,0,357,401,3,4,2,0,358,
        360,3,132,66,0,359,358,1,0,0,0,359,360,1,0,0,0,360,361,1,0,0,0,361,
        401,3,12,6,0,362,364,3,132,66,0,363,362,1,0,0,0,363,364,1,0,0,0,
        364,365,1,0,0,0,365,401,3,18,9,0,366,368,3,132,66,0,367,366,1,0,
        0,0,367,368,1,0,0,0,368,369,1,0,0,0,369,370,3,20,10,0,370,371,3,
        106,53,0,371,401,1,0,0,0,372,374,3,132,66,0,373,372,1,0,0,0,373,
        374,1,0,0,0,374,375,1,0,0,0,375,401,3,22,11,0,376,378,3,132,66,0,
        377,376,1,0,0,0,377,378,1,0,0,0,378,379,1,0,0,0,379,380,3,26,13,
        0,380,381,3,106,53,0,381,401,1,0,0,0,382,384,3,132,66,0,383,382,
        1,0,0,0,383,384,1,0,0,0,384,385,1,0,0,0,385,386,3,68,34,0,386,387,
        3,106,53,0,387,401,1,0,0,0,388,390,3,132,66,0,389,388,1,0,0,0,389,
        390,1,0,0,0,390,391,1,0,0,0,391,401,3,78,39,0,392,394,3,132,66,0,
        393,392,1,0,0,0,393,394,1,0,0,0,394,395,1,0,0,0,395,401,3,134,67,
        0,396,398,3,132,66,0,397,396,1,0,0,0,397,398,1,0,0,0,398,399,1,0,
        0,0,399,401,3,98,49,0,400,351,1,0,0,0,400,355,1,0,0,0,400,359,1,
        0,0,0,400,363,1,0,0,0,400,367,1,0,0,0,400,373,1,0,0,0,400,377,1,
        0,0,0,400,383,1,0,0,0,400,389,1,0,0,0,400,393,1,0,0,0,400,397,1,
        0,0,0,401,11,1,0,0,0,402,404,3,100,50,0,403,402,1,0,0,0,403,404,
        1,0,0,0,404,405,1,0,0,0,405,406,5,34,0,0,406,407,3,132,66,0,407,
        409,3,84,42,0,408,410,3,132,66,0,409,408,1,0,0,0,409,410,1,0,0,0,
        410,412,1,0,0,0,411,413,5,1,0,0,412,411,1,0,0,0,412,413,1,0,0,0,
        413,415,1,0,0,0,414,416,3,132,66,0,415,414,1,0,0,0,415,416,1,0,0,
        0,416,417,1,0,0,0,417,418,3,14,7,0,418,419,5,23,0,0,419,420,3,106,
        53,0,420,13,1,0,0,0,421,424,3,12,6,0,422,424,3,16,8,0,423,421,1,
        0,0,0,423,422,1,0,0,0,424,427,1,0,0,0,425,423,1,0,0,0,425,426,1,
        0,0,0,426,15,1,0,0,0,427,425,1,0,0,0,428,429,3,130,65,0,429,430,
        3,106,53,0,430,437,1,0,0,0,431,432,3,130,65,0,432,433,3,106,53,0,
        433,434,3,48,24,0,434,435,3,106,53,0,435,437,1,0,0,0,436,428,1,0,
        0,0,436,431,1,0,0,0,437,17,1,0,0,0,438,439,3,34,17,0,439,440,3,40,
        20,0,440,441,3,106,53,0,441,19,1,0,0,0,442,444,3,132,66,0,443,442,
        1,0,0,0,443,444,1,0,0,0,444,445,1,0,0,0,445,447,5,31,0,0,446,448,
        3,132,66,0,447,446,1,0,0,0,447,448,1,0,0,0,448,464,1,0,0,0,449,451,
        3,132,66,0,450,449,1,0,0,0,450,451,1,0,0,0,451,452,1,0,0,0,452,454,
        5,32,0,0,453,455,3,132,66,0,454,453,1,0,0,0,454,455,1,0,0,0,455,
        464,1,0,0,0,456,458,3,132,66,0,457,456,1,0,0,0,457,458,1,0,0,0,458,
        459,1,0,0,0,459,461,3,28,14,0,460,462,3,132,66,0,461,460,1,0,0,0,
        461,462,1,0,0,0,462,464,1,0,0,0,463,443,1,0,0,0,463,450,1,0,0,0,
        463,457,1,0,0,0,464,21,1,0,0,0,465,467,5,35,0,0,466,468,3,24,12,
        0,467,466,1,0,0,0,467,468,1,0,0,0,468,469,1,0,0,0,469,470,3,130,
        65,0,470,471,3,106,53,0,471,23,1,0,0,0,472,473,3,132,66,0,473,477,
        3,84,42,0,474,475,3,132,66,0,475,476,3,40,20,0,476,478,1,0,0,0,477,
        474,1,0,0,0,477,478,1,0,0,0,478,25,1,0,0,0,479,481,3,84,42,0,480,
        482,3,132,66,0,481,480,1,0,0,0,481,482,1,0,0,0,482,483,1,0,0,0,483,
        485,5,1,0,0,484,486,3,44,22,0,485,484,1,0,0,0,485,486,1,0,0,0,486,
        487,1,0,0,0,487,488,3,130,65,0,488,500,1,0,0,0,489,491,3,28,14,0,
        490,492,3,132,66,0,491,490,1,0,0,0,491,492,1,0,0,0,492,493,1,0,0,
        0,493,495,5,1,0,0,494,496,3,44,22,0,495,494,1,0,0,0,495,496,1,0,
        0,0,496,497,1,0,0,0,497,498,3,130,65,0,498,500,1,0,0,0,499,479,1,
        0,0,0,499,489,1,0,0,0,500,27,1,0,0,0,501,502,3,100,50,0,502,503,
        3,132,66,0,503,504,3,84,42,0,504,29,1,0,0,0,505,506,7,0,0,0,506,
        31,1,0,0,0,507,508,7,1,0,0,508,33,1,0,0,0,509,510,7,2,0,0,510,35,
        1,0,0,0,511,512,5,10,0,0,512,513,3,38,19,0,513,514,5,14,0,0,514,
        515,3,38,19,0,515,516,5,11,0,0,516,37,1,0,0,0,517,519,3,40,20,0,
        518,517,1,0,0,0,518,519,1,0,0,0,519,39,1,0,0,0,520,522,3,132,66,
        0,521,520,1,0,0,0,521,522,1,0,0,0,522,523,1,0,0,0,523,525,3,52,26,
        0,524,526,3,132,66,0,525,524,1,0,0,0,525,526,1,0,0,0,526,532,1,0,
        0,0,527,528,3,132,66,0,528,529,3,52,26,0,529,531,1,0,0,0,530,527,
        1,0,0,0,531,534,1,0,0,0,532,530,1,0,0,0,532,533,1,0,0,0,533,536,
        1,0,0,0,534,532,1,0,0,0,535,537,3,132,66,0,536,535,1,0,0,0,536,537,
        1,0,0,0,537,41,1,0,0,0,538,540,3,132,66,0,539,538,1,0,0,0,539,540,
        1,0,0,0,540,541,1,0,0,0,541,543,3,56,28,0,542,544,3,132,66,0,543,
        542,1,0,0,0,543,544,1,0,0,0,544,550,1,0,0,0,545,546,3,132,66,0,546,
        547,3,56,28,0,547,549,1,0,0,0,548,545,1,0,0,0,549,552,1,0,0,0,550,
        548,1,0,0,0,550,551,1,0,0,0,551,554,1,0,0,0,552,550,1,0,0,0,553,
        555,3,132,66,0,554,553,1,0,0,0,554,555,1,0,0,0,555,43,1,0,0,0,556,
        558,3,132,66,0,557,556,1,0,0,0,557,558,1,0,0,0,558,559,1,0,0,0,559,
        561,3,60,30,0,560,562,3,132,66,0,561,560,1,0,0,0,561,562,1,0,0,0,
        562,568,1,0,0,0,563,564,3,132,66,0,564,565,3,60,30,0,565,567,1,0,
        0,0,566,563,1,0,0,0,567,570,1,0,0,0,568,566,1,0,0,0,568,569,1,0,
        0,0,569,572,1,0,0,0,570,568,1,0,0,0,571,573,3,132,66,0,572,571,1,
        0,0,0,572,573,1,0,0,0,573,45,1,0,0,0,574,576,3,132,66,0,575,574,
        1,0,0,0,575,576,1,0,0,0,576,577,1,0,0,0,577,579,3,64,32,0,578,580,
        3,132,66,0,579,578,1,0,0,0,579,580,1,0,0,0,580,586,1,0,0,0,581,582,
        3,132,66,0,582,583,3,64,32,0,583,585,1,0,0,0,584,581,1,0,0,0,585,
        588,1,0,0,0,586,584,1,0,0,0,586,587,1,0,0,0,587,590,1,0,0,0,588,
        586,1,0,0,0,589,591,3,132,66,0,590,589,1,0,0,0,590,591,1,0,0,0,591,
        47,1,0,0,0,592,610,3,106,53,0,593,595,3,106,53,0,594,593,1,0,0,0,
        594,595,1,0,0,0,595,596,1,0,0,0,596,606,3,50,25,0,597,598,3,106,
        53,0,598,599,3,50,25,0,599,605,1,0,0,0,600,605,3,106,53,0,601,602,
        3,132,66,0,602,603,3,64,32,0,603,605,1,0,0,0,604,597,1,0,0,0,604,
        600,1,0,0,0,604,601,1,0,0,0,605,608,1,0,0,0,606,604,1,0,0,0,606,
        607,1,0,0,0,607,610,1,0,0,0,608,606,1,0,0,0,609,592,1,0,0,0,609,
        594,1,0,0,0,610,49,1,0,0,0,611,614,3,114,57,0,612,614,3,68,34,0,
        613,611,1,0,0,0,613,612,1,0,0,0,614,616,1,0,0,0,615,617,3,64,32,
        0,616,615,1,0,0,0,616,617,1,0,0,0,617,51,1,0,0,0,618,620,3,54,27,
        0,619,618,1,0,0,0,620,621,1,0,0,0,621,619,1,0,0,0,621,622,1,0,0,
        0,622,53,1,0,0,0,623,630,3,118,59,0,624,630,3,68,34,0,625,626,5,
        10,0,0,626,627,3,42,21,0,627,628,5,11,0,0,628,630,1,0,0,0,629,623,
        1,0,0,0,629,624,1,0,0,0,629,625,1,0,0,0,630,55,1,0,0,0,631,633,3,
        58,29,0,632,631,1,0,0,0,633,634,1,0,0,0,634,632,1,0,0,0,634,635,
        1,0,0,0,635,57,1,0,0,0,636,643,3,120,60,0,637,643,3,68,34,0,638,
        639,5,10,0,0,639,640,3,42,21,0,640,641,5,11,0,0,641,643,1,0,0,0,
        642,636,1,0,0,0,642,637,1,0,0,0,642,638,1,0,0,0,643,59,1,0,0,0,644,
        646,3,62,31,0,645,644,1,0,0,0,646,647,1,0,0,0,647,645,1,0,0,0,647,
        648,1,0,0,0,648,61,1,0,0,0,649,652,3,122,61,0,650,652,3,68,34,0,
        651,649,1,0,0,0,651,650,1,0,0,0,652,63,1,0,0,0,653,655,3,66,33,0,
        654,653,1,0,0,0,655,656,1,0,0,0,656,654,1,0,0,0,656,657,1,0,0,0,
        657,65,1,0,0,0,658,661,3,124,62,0,659,661,3,68,34,0,660,658,1,0,
        0,0,660,659,1,0,0,0,661,67,1,0,0,0,662,720,5,4,0,0,663,664,5,2,0,
        0,664,665,3,70,35,0,665,666,5,11,0,0,666,720,1,0,0,0,667,668,5,2,
        0,0,668,669,3,70,35,0,669,670,3,132,66,0,670,671,3,74,37,0,671,672,
        5,11,0,0,672,720,1,0,0,0,673,674,5,2,0,0,674,675,3,70,35,0,675,676,
        5,14,0,0,676,677,3,74,37,0,677,678,5,11,0,0,678,720,1,0,0,0,679,
        680,5,2,0,0,680,681,3,70,35,0,681,682,5,9,0,0,682,683,3,40,20,0,
        683,684,5,11,0,0,684,720,1,0,0,0,685,686,5,2,0,0,686,687,3,70,35,
        0,687,688,5,1,0,0,688,689,3,40,20,0,689,690,5,11,0,0,690,720,1,0,
        0,0,691,692,5,3,0,0,692,693,3,70,35,0,693,694,5,13,0,0,694,720,1,
        0,0,0,695,696,5,3,0,0,696,697,3,70,35,0,697,698,3,132,66,0,698,699,
        3,74,37,0,699,700,5,13,0,0,700,720,1,0,0,0,701,702,5,3,0,0,702,703,
        3,70,35,0,703,704,5,14,0,0,704,705,3,74,37,0,705,706,5,13,0,0,706,
        720,1,0,0,0,707,708,5,3,0,0,708,709,3,70,35,0,709,710,5,9,0,0,710,
        711,3,40,20,0,711,712,5,13,0,0,712,720,1,0,0,0,713,714,5,3,0,0,714,
        715,3,70,35,0,715,716,5,1,0,0,716,717,3,40,20,0,717,718,5,13,0,0,
        718,720,1,0,0,0,719,662,1,0,0,0,719,663,1,0,0,0,719,667,1,0,0,0,
        719,673,1,0,0,0,719,679,1,0,0,0,719,685,1,0,0,0,719,691,1,0,0,0,
        719,695,1,0,0,0,719,701,1,0,0,0,719,707,1,0,0,0,719,713,1,0,0,0,
        720,69,1,0,0,0,721,723,3,72,36,0,722,721,1,0,0,0,723,724,1,0,0,0,
        724,722,1,0,0,0,724,725,1,0,0,0,725,71,1,0,0,0,726,729,5,37,0,0,
        727,729,3,68,34,0,728,726,1,0,0,0,728,727,1,0,0,0,729,73,1,0,0,0,
        730,732,3,76,38,0,731,730,1,0,0,0,731,732,1,0,0,0,732,739,1,0,0,
        0,733,735,5,14,0,0,734,736,3,76,38,0,735,734,1,0,0,0,735,736,1,0,
        0,0,736,738,1,0,0,0,737,733,1,0,0,0,738,741,1,0,0,0,739,737,1,0,
        0,0,739,740,1,0,0,0,740,75,1,0,0,0,741,739,1,0,0,0,742,743,3,40,
        20,0,743,77,1,0,0,0,744,786,3,80,40,0,745,747,3,90,45,0,746,748,
        3,132,66,0,747,746,1,0,0,0,747,748,1,0,0,0,748,749,1,0,0,0,749,751,
        3,128,64,0,750,752,3,132,66,0,751,750,1,0,0,0,751,752,1,0,0,0,752,
        753,1,0,0,0,753,762,3,86,43,0,754,756,3,132,66,0,755,754,1,0,0,0,
        755,756,1,0,0,0,756,757,1,0,0,0,757,759,5,15,0,0,758,760,3,132,66,
        0,759,758,1,0,0,0,759,760,1,0,0,0,760,761,1,0,0,0,761,763,3,88,44,
        0,762,755,1,0,0,0,762,763,1,0,0,0,763,765,1,0,0,0,764,766,3,132,
        66,0,765,764,1,0,0,0,765,766,1,0,0,0,766,767,1,0,0,0,767,769,5,38,
        0,0,768,770,3,92,46,0,769,768,1,0,0,0,769,770,1,0,0,0,770,786,1,
        0,0,0,771,773,3,90,45,0,772,774,3,132,66,0,773,772,1,0,0,0,773,774,
        1,0,0,0,774,775,1,0,0,0,775,777,3,128,64,0,776,778,3,132,66,0,777,
        776,1,0,0,0,777,778,1,0,0,0,778,779,1,0,0,0,779,781,3,26,13,0,780,
        782,3,132,66,0,781,780,1,0,0,0,781,782,1,0,0,0,782,783,1,0,0,0,783,
        784,5,38,0,0,784,786,1,0,0,0,785,744,1,0,0,0,785,745,1,0,0,0,785,
        771,1,0,0,0,786,79,1,0,0,0,787,789,3,90,45,0,788,790,3,132,66,0,
        789,788,1,0,0,0,789,790,1,0,0,0,790,791,1,0,0,0,791,793,3,128,64,
        0,792,794,3,132,66,0,793,792,1,0,0,0,793,794,1,0,0,0,794,795,1,0,
        0,0,795,797,3,84,42,0,796,798,3,132,66,0,797,796,1,0,0,0,797,798,
        1,0,0,0,798,799,1,0,0,0,799,801,3,128,64,0,800,802,3,132,66,0,801,
        800,1,0,0,0,801,802,1,0,0,0,802,803,1,0,0,0,803,812,3,86,43,0,804,
        806,3,132,66,0,805,804,1,0,0,0,805,806,1,0,0,0,806,807,1,0,0,0,807,
        809,5,15,0,0,808,810,3,132,66,0,809,808,1,0,0,0,809,810,1,0,0,0,
        810,811,1,0,0,0,811,813,3,88,44,0,812,805,1,0,0,0,812,813,1,0,0,
        0,813,815,1,0,0,0,814,816,3,132,66,0,815,814,1,0,0,0,815,816,1,0,
        0,0,816,817,1,0,0,0,817,819,5,38,0,0,818,820,3,92,46,0,819,818,1,
        0,0,0,819,820,1,0,0,0,820,81,1,0,0,0,821,822,3,84,42,0,822,83,1,
        0,0,0,823,826,3,102,51,0,824,826,3,68,34,0,825,823,1,0,0,0,825,824,
        1,0,0,0,826,827,1,0,0,0,827,825,1,0,0,0,827,828,1,0,0,0,828,85,1,
        0,0,0,829,831,3,90,45,0,830,829,1,0,0,0,830,831,1,0,0,0,831,87,1,
        0,0,0,832,834,3,90,45,0,833,832,1,0,0,0,833,834,1,0,0,0,834,89,1,
        0,0,0,835,841,3,82,41,0,836,837,3,132,66,0,837,838,3,82,41,0,838,
        840,1,0,0,0,839,836,1,0,0,0,840,843,1,0,0,0,841,839,1,0,0,0,841,
        842,1,0,0,0,842,91,1,0,0,0,843,841,1,0,0,0,844,846,3,96,48,0,845,
        844,1,0,0,0,846,847,1,0,0,0,847,845,1,0,0,0,847,848,1,0,0,0,848,
        93,1,0,0,0,849,851,3,130,65,0,850,852,3,92,46,0,851,850,1,0,0,0,
        851,852,1,0,0,0,852,95,1,0,0,0,853,855,5,39,0,0,854,856,3,132,66,
        0,855,854,1,0,0,0,855,856,1,0,0,0,856,857,1,0,0,0,857,858,3,46,23,
        0,858,859,5,38,0,0,859,874,1,0,0,0,860,862,5,39,0,0,861,863,3,132,
        66,0,862,861,1,0,0,0,862,863,1,0,0,0,863,864,1,0,0,0,864,865,5,42,
        0,0,865,874,5,38,0,0,866,868,3,132,66,0,867,866,1,0,0,0,867,868,
        1,0,0,0,868,869,1,0,0,0,869,870,5,42,0,0,870,874,5,38,0,0,871,874,
        3,6,3,0,872,874,5,38,0,0,873,853,1,0,0,0,873,860,1,0,0,0,873,867,
        1,0,0,0,873,871,1,0,0,0,873,872,1,0,0,0,874,97,1,0,0,0,875,876,5,
        33,0,0,876,877,3,132,66,0,877,878,3,84,42,0,878,886,1,0,0,0,879,
        880,5,30,0,0,880,881,3,132,66,0,881,882,5,33,0,0,882,883,3,132,66,
        0,883,884,3,84,42,0,884,886,1,0,0,0,885,875,1,0,0,0,885,879,1,0,
        0,0,886,99,1,0,0,0,887,899,5,30,0,0,888,899,5,31,0,0,889,899,5,32,
        0,0,890,891,5,30,0,0,891,892,3,132,66,0,892,893,5,31,0,0,893,899,
        1,0,0,0,894,895,5,31,0,0,895,896,3,132,66,0,896,897,5,30,0,0,897,
        899,1,0,0,0,898,887,1,0,0,0,898,888,1,0,0,0,898,889,1,0,0,0,898,
        890,1,0,0,0,898,894,1,0,0,0,899,101,1,0,0,0,900,902,3,104,52,0,901,
        900,1,0,0,0,902,903,1,0,0,0,903,901,1,0,0,0,903,904,1,0,0,0,904,
        103,1,0,0,0,905,906,7,3,0,0,906,105,1,0,0,0,907,908,5,38,0,0,908,
        107,1,0,0,0,909,919,5,37,0,0,910,919,5,16,0,0,911,919,5,1,0,0,912,
        919,5,9,0,0,913,919,5,5,0,0,914,919,5,17,0,0,915,919,5,18,0,0,916,
        919,5,19,0,0,917,919,3,126,63,0,918,909,1,0,0,0,918,910,1,0,0,0,
        918,911,1,0,0,0,918,912,1,0,0,0,918,913,1,0,0,0,918,914,1,0,0,0,
        918,915,1,0,0,0,918,916,1,0,0,0,918,917,1,0,0,0,919,109,1,0,0,0,
        920,923,3,108,54,0,921,923,5,14,0,0,922,920,1,0,0,0,922,921,1,0,
        0,0,923,111,1,0,0,0,924,932,3,110,55,0,925,932,5,10,0,0,926,932,
        5,11,0,0,927,932,5,12,0,0,928,932,5,13,0,0,929,932,5,15,0,0,930,
        932,3,126,63,0,931,924,1,0,0,0,931,925,1,0,0,0,931,926,1,0,0,0,931,
        927,1,0,0,0,931,928,1,0,0,0,931,929,1,0,0,0,931,930,1,0,0,0,932,
        113,1,0,0,0,933,953,3,108,54,0,934,953,5,10,0,0,935,953,5,11,0,0,
        936,953,5,12,0,0,937,953,5,13,0,0,938,953,5,14,0,0,939,953,5,42,
        0,0,940,953,5,20,0,0,941,953,5,30,0,0,942,953,5,31,0,0,943,953,5,
        32,0,0,944,953,5,24,0,0,945,953,5,25,0,0,946,953,5,26,0,0,947,953,
        5,27,0,0,948,953,5,28,0,0,949,953,5,29,0,0,950,953,5,34,0,0,951,
        953,5,33,0,0,952,933,1,0,0,0,952,934,1,0,0,0,952,935,1,0,0,0,952,
        936,1,0,0,0,952,937,1,0,0,0,952,938,1,0,0,0,952,939,1,0,0,0,952,
        940,1,0,0,0,952,941,1,0,0,0,952,942,1,0,0,0,952,943,1,0,0,0,952,
        944,1,0,0,0,952,945,1,0,0,0,952,946,1,0,0,0,952,947,1,0,0,0,952,
        948,1,0,0,0,952,949,1,0,0,0,952,950,1,0,0,0,952,951,1,0,0,0,953,
        115,1,0,0,0,954,958,3,112,56,0,955,958,5,42,0,0,956,958,5,15,0,0,
        957,954,1,0,0,0,957,955,1,0,0,0,957,956,1,0,0,0,958,117,1,0,0,0,
        959,961,3,108,54,0,960,959,1,0,0,0,961,962,1,0,0,0,962,960,1,0,0,
        0,962,963,1,0,0,0,963,119,1,0,0,0,964,966,3,110,55,0,965,964,1,0,
        0,0,966,967,1,0,0,0,967,965,1,0,0,0,967,968,1,0,0,0,968,121,1,0,
        0,0,969,971,3,112,56,0,970,969,1,0,0,0,971,972,1,0,0,0,972,970,1,
        0,0,0,972,973,1,0,0,0,973,123,1,0,0,0,974,976,3,116,58,0,975,974,
        1,0,0,0,976,977,1,0,0,0,977,975,1,0,0,0,977,978,1,0,0,0,978,125,
        1,0,0,0,979,980,7,4,0,0,980,127,1,0,0,0,981,982,7,5,0,0,982,129,
        1,0,0,0,983,985,5,42,0,0,984,983,1,0,0,0,984,985,1,0,0,0,985,131,
        1,0,0,0,986,987,7,6,0,0,987,133,1,0,0,0,988,990,5,36,0,0,989,991,
        3,132,66,0,990,989,1,0,0,0,990,991,1,0,0,0,991,992,1,0,0,0,992,993,
        5,12,0,0,993,994,3,136,68,0,994,996,5,13,0,0,995,997,3,132,66,0,
        996,995,1,0,0,0,996,997,1,0,0,0,997,135,1,0,0,0,998,1000,9,0,0,0,
        999,998,1,0,0,0,1000,1003,1,0,0,0,1001,1002,1,0,0,0,1001,999,1,0,
        0,0,1002,137,1,0,0,0,1003,1001,1,0,0,0,154,142,147,149,154,158,162,
        166,173,177,181,185,189,197,201,205,209,215,219,223,227,234,238,
        242,246,250,258,262,266,270,274,278,288,301,312,322,335,344,351,
        355,359,363,367,373,377,383,389,393,397,400,403,409,412,415,423,
        425,436,443,447,450,454,457,461,463,467,477,481,485,491,495,499,
        518,521,525,532,536,539,543,550,554,557,561,568,572,575,579,586,
        590,594,604,606,609,613,616,621,629,634,642,647,651,656,660,719,
        724,728,731,735,739,747,751,755,759,762,765,769,773,777,781,785,
        789,793,797,801,805,809,812,815,819,825,827,830,833,841,847,851,
        855,862,867,873,885,898,903,918,922,931,952,957,962,967,972,977,
        984,990,996,1001
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
