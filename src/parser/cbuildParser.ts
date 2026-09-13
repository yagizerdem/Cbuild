
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
    public static readonly SLIT = 32;
    public static readonly HOOK = 33;
    public static readonly CHARS = 34;
    public static readonly NL = 35;
    public static readonly LEADING_TAB = 36;
    public static readonly WS = 37;
    public static readonly TAB = 38;
    public static readonly COMMENT = 39;
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
        "'define'", "'vpath'", null, "'hook'", null, null, null, null, "'\\t'"
    ];

    public static readonly symbolicNames = [
        null, "ASSIGN_OP", "DOLLAR_LPAREN", "DOLLAR_L_CURLY_BRACE", "VAR", 
        "DOUBLE_DOLLAR", "GROUPED_DOUBLE_COLON", "GROUPED_COLON", "DOUBLE_COLON", 
        "COLON", "LPAREN", "RPAREN", "L_CURLY_BRACE", "R_CURLY_BRACE", "COMMA", 
        "PIPE", "INCLUDE", "DASH_INCLUDE", "SINCLUDE", "ENDEF", "IFDEF", 
        "IFNDEF", "IFEQ", "IFNEQ", "ELSE", "ENDIF", "OVERRIDE", "EXPORT", 
        "UNEXPORT", "UNDEFINE", "DEFINE", "VPATH", "SLIT", "HOOK", "CHARS", 
        "NL", "LEADING_TAB", "WS", "TAB", "COMMENT"
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
            this.state = 209;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 147;
                this.if_eq_kw();
                this.state = 149;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 148;
                    this.ws();
                    }
                }

                this.state = 151;
                this.condition();
                this.state = 152;
                this.statements_opt();
                this.state = 153;
                this.match(cbuildParser.ENDIF);
                this.state = 154;
                this.comment_opt();
                this.state = 155;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 157;
                this.if_eq_kw();
                this.state = 159;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 158;
                    this.ws();
                    }
                }

                this.state = 161;
                this.condition();
                this.state = 162;
                this.statements_opt();
                this.state = 163;
                this.match(cbuildParser.ELSE);
                this.state = 164;
                this.statements_opt();
                this.state = 165;
                this.match(cbuildParser.ENDIF);
                this.state = 166;
                this.comment_opt();
                this.state = 167;
                this.br();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 169;
                this.if_eq_kw();
                this.state = 171;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 170;
                    this.ws();
                    }
                }

                this.state = 173;
                this.condition();
                this.state = 174;
                this.statements_opt();
                this.state = 175;
                this.match(cbuildParser.ELSE);
                this.state = 176;
                this.conditional();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 178;
                this.if_def_kw();
                this.state = 180;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 179;
                    this.ws();
                    }
                }

                this.state = 182;
                this.identifier();
                this.state = 183;
                this.statements_opt();
                this.state = 184;
                this.match(cbuildParser.ENDIF);
                this.state = 185;
                this.comment_opt();
                this.state = 186;
                this.br();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 188;
                this.if_def_kw();
                this.state = 190;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 189;
                    this.ws();
                    }
                }

                this.state = 192;
                this.identifier();
                this.state = 193;
                this.statements_opt();
                this.state = 194;
                this.match(cbuildParser.ELSE);
                this.state = 195;
                this.statements_opt();
                this.state = 196;
                this.match(cbuildParser.ENDIF);
                this.state = 197;
                this.comment_opt();
                this.state = 198;
                this.br();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 200;
                this.if_def_kw();
                this.state = 202;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 201;
                    this.ws();
                    }
                }

                this.state = 204;
                this.identifier();
                this.state = 205;
                this.statements_opt();
                this.state = 206;
                this.match(cbuildParser.ELSE);
                this.state = 207;
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
            this.state = 279;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 16, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 211;
                this.if_eq_kw();
                this.state = 213;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 212;
                    this.ws();
                    }
                }

                this.state = 215;
                this.condition();
                this.state = 216;
                this.match(cbuildParser.NL);
                this.state = 217;
                this.recipes_opt();
                this.state = 218;
                this.match(cbuildParser.ENDIF);
                this.state = 219;
                this.comment_opt();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 221;
                this.if_eq_kw();
                this.state = 223;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 222;
                    this.ws();
                    }
                }

                this.state = 225;
                this.condition();
                this.state = 226;
                this.match(cbuildParser.NL);
                this.state = 227;
                this.recipes_opt();
                this.state = 228;
                this.match(cbuildParser.ELSE);
                this.state = 229;
                this.match(cbuildParser.NL);
                this.state = 230;
                this.recipes_opt();
                this.state = 231;
                this.match(cbuildParser.ENDIF);
                this.state = 232;
                this.comment_opt();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 234;
                this.if_eq_kw();
                this.state = 236;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 235;
                    this.ws();
                    }
                }

                this.state = 238;
                this.condition();
                this.state = 239;
                this.match(cbuildParser.NL);
                this.state = 240;
                this.recipes_opt();
                this.state = 241;
                this.match(cbuildParser.ELSE);
                this.state = 242;
                this.match(cbuildParser.NL);
                this.state = 243;
                this.conditional_in_recipe();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 245;
                this.if_def_kw();
                this.state = 247;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 246;
                    this.ws();
                    }
                }

                this.state = 249;
                this.identifier();
                this.state = 250;
                this.match(cbuildParser.NL);
                this.state = 251;
                this.recipes_opt();
                this.state = 252;
                this.match(cbuildParser.ENDIF);
                this.state = 253;
                this.comment_opt();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 255;
                this.if_def_kw();
                this.state = 257;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 256;
                    this.ws();
                    }
                }

                this.state = 259;
                this.identifier();
                this.state = 260;
                this.match(cbuildParser.NL);
                this.state = 261;
                this.recipes_opt();
                this.state = 262;
                this.match(cbuildParser.ELSE);
                this.state = 263;
                this.match(cbuildParser.NL);
                this.state = 264;
                this.recipes_opt();
                this.state = 265;
                this.match(cbuildParser.ENDIF);
                this.state = 266;
                this.comment_opt();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 268;
                this.if_def_kw();
                this.state = 270;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 269;
                    this.ws();
                    }
                }

                this.state = 272;
                this.identifier();
                this.state = 273;
                this.match(cbuildParser.NL);
                this.state = 274;
                this.recipes_opt();
                this.state = 275;
                this.match(cbuildParser.ELSE);
                this.state = 276;
                this.match(cbuildParser.NL);
                this.state = 277;
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
            this.state = 281;
            this.comment_opt();
            this.state = 282;
            this.br();
            this.state = 283;
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
            this.state = 331;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 27, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 286;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 285;
                    this.ws();
                    }
                }

                this.state = 288;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 290;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 289;
                    this.ws();
                    }
                }

                this.state = 292;
                this.conditional();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 294;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 293;
                    this.ws();
                    }
                }

                this.state = 296;
                this.define();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 298;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 297;
                    this.ws();
                    }
                }

                this.state = 300;
                this.include();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 302;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 301;
                    this.ws();
                    }
                }

                this.state = 304;
                this.export_();
                this.state = 305;
                this.br();
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 308;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 307;
                    this.ws();
                    }
                }

                this.state = 310;
                this.vpath();
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 312;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 311;
                    this.ws();
                    }
                }

                this.state = 314;
                this.assignment();
                this.state = 315;
                this.br();
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 318;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 317;
                    this.ws();
                    }
                }

                this.state = 320;
                this.function_();
                this.state = 321;
                this.br();
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 324;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 323;
                    this.ws();
                    }
                }

                this.state = 326;
                this.rule();
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 328;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 327;
                    this.ws();
                    }
                }

                this.state = 330;
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
            this.state = 334;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1006632960) !== 0)) {
                {
                this.state = 333;
                this.specifiers();
                }
            }

            this.state = 336;
            this.match(cbuildParser.DEFINE);
            this.state = 337;
            this.ws();
            this.state = 338;
            this.pattern();
            this.state = 340;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 29, this.context) ) {
            case 1:
                {
                this.state = 339;
                this.ws();
                }
                break;
            }
            this.state = 343;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 1) {
                {
                this.state = 342;
                this.match(cbuildParser.ASSIGN_OP);
                }
            }

            this.state = 346;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 345;
                this.ws();
                }
            }

            this.state = 348;
            this.definition();
            this.state = 349;
            this.match(cbuildParser.ENDEF);
            this.state = 350;
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
            this.state = 360;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 32, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 352;
                this.comment_opt();
                this.state = 353;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 355;
                this.comment_opt();
                this.state = 356;
                this.br();
                this.state = 357;
                this.exprs_in_def();
                this.state = 358;
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
            this.state = 362;
            this.include_kw();
            this.state = 363;
            this.expressions();
            this.state = 364;
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
            this.state = 374;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 34, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 366;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 367;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 368;
                this.assignment_prefix();
                this.state = 372;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 369;
                    this.ws();
                    this.state = 370;
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
            this.state = 376;
            this.match(cbuildParser.VPATH);
            this.state = 378;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 377;
                this.vpath_args();
                }
            }

            this.state = 380;
            this.comment_opt();
            this.state = 381;
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
            this.state = 383;
            this.ws();
            this.state = 384;
            this.pattern();
            this.state = 388;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 385;
                this.ws();
                this.state = 386;
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
            this.state = 410;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 41, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 390;
                this.pattern();
                this.state = 392;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 391;
                    this.ws();
                    }
                }

                this.state = 394;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 396;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 38, this.context) ) {
                case 1:
                    {
                    this.state = 395;
                    this.exprs_in_assign();
                    }
                    break;
                }
                this.state = 398;
                this.comment_opt();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 400;
                this.assignment_prefix();
                this.state = 402;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 401;
                    this.ws();
                    }
                }

                this.state = 404;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 406;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context) ) {
                case 1:
                    {
                    this.state = 405;
                    this.exprs_in_assign();
                    }
                    break;
                }
                this.state = 408;
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
            this.state = 412;
            this.specifiers();
            this.state = 413;
            this.ws();
            this.state = 414;
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
            this.state = 416;
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
            this.state = 418;
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
            this.state = 420;
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
            this.state = 433;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 422;
                this.match(cbuildParser.LPAREN);
                this.state = 423;
                this.expressions_opt();
                this.state = 424;
                this.match(cbuildParser.COMMA);
                this.state = 425;
                this.expressions_opt();
                this.state = 426;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case cbuildParser.SLIT:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 428;
                this.match(cbuildParser.SLIT);
                this.state = 430;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 429;
                    this.ws();
                    }
                }

                this.state = 432;
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
            this.state = 436;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1598) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 101) !== 0)) {
                {
                this.state = 435;
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
            this.state = 439;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 438;
                this.ws();
                }
            }

            this.state = 441;
            this.expression();
            this.state = 443;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 46, this.context) ) {
            case 1:
                {
                this.state = 442;
                this.ws();
                }
                break;
            }
            this.state = 450;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 47, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 445;
                    this.ws();
                    this.state = 446;
                    this.expression();
                    }
                    }
                }
                this.state = 452;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 47, this.context);
            }
            this.state = 454;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 453;
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
            this.state = 457;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 456;
                this.ws();
                }
            }

            this.state = 459;
            this.expr_nested();
            this.state = 461;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 50, this.context) ) {
            case 1:
                {
                this.state = 460;
                this.ws();
                }
                break;
            }
            this.state = 468;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 463;
                    this.ws();
                    this.state = 464;
                    this.expr_nested();
                    }
                    }
                }
                this.state = 470;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 51, this.context);
            }
            this.state = 472;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 471;
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
            this.state = 475;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 474;
                this.ws();
                }
            }

            this.state = 477;
            this.expr_in_assign();
            this.state = 479;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                {
                this.state = 478;
                this.ws();
                }
                break;
            }
            this.state = 486;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 55, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 481;
                    this.ws();
                    this.state = 482;
                    this.expr_in_assign();
                    }
                    }
                }
                this.state = 488;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 55, this.context);
            }
            this.state = 490;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 56, this.context) ) {
            case 1:
                {
                this.state = 489;
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
            this.state = 493;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 492;
                this.ws();
                }
            }

            this.state = 495;
            this.expr_in_recipe();
            this.state = 497;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 58, this.context) ) {
            case 1:
                {
                this.state = 496;
                this.ws();
                }
                break;
            }
            this.state = 504;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 59, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 499;
                    this.ws();
                    this.state = 500;
                    this.expr_in_recipe();
                    }
                    }
                }
                this.state = 506;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 59, this.context);
            }
            this.state = 508;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 507;
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
            this.state = 527;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 510;
                this.br();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 512;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 35) {
                    {
                    this.state = 511;
                    this.br();
                    }
                }

                this.state = 514;
                this.first_expr_in_def();
                this.state = 524;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 63, this.context);
                while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                    if (alternative === 1) {
                        {
                        this.state = 522;
                        this.errorHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this.tokenStream, 62, this.context) ) {
                        case 1:
                            {
                            {
                            this.state = 515;
                            this.br();
                            this.state = 516;
                            this.first_expr_in_def();
                            }
                            }
                            break;
                        case 2:
                            {
                            {
                            this.state = 518;
                            this.br();
                            }
                            }
                            break;
                        case 3:
                            {
                            {
                            this.state = 519;
                            this.ws();
                            this.state = 520;
                            this.expr_in_recipe();
                            }
                            }
                            break;
                        }
                        }
                    }
                    this.state = 526;
                    this.errorHandler.sync(this);
                    alternative = this.interpreter.adaptivePredict(this.tokenStream, 63, this.context);
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
            this.state = 531;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.LPAREN:
            case cbuildParser.RPAREN:
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
            case cbuildParser.SLIT:
            case cbuildParser.CHARS:
            case cbuildParser.COMMENT:
                {
                this.state = 529;
                this.char_in_def();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                {
                this.state = 530;
                this.function_();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.state = 534;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294561342) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 133) !== 0)) {
                {
                this.state = 533;
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
            this.state = 537;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 536;
                this.expression_atom();
                }
                }
                this.state = 539;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1598) !== 0) || _la === 32 || _la === 34);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 547;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.SLIT:
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 541;
                this.text();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 542;
                this.function_();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 543;
                this.match(cbuildParser.LPAREN);
                this.state = 544;
                this.exprs_nested();
                this.state = 545;
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
            this.state = 550;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 549;
                this.expr_nested_atom();
                }
                }
                this.state = 552;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 17982) !== 0) || _la === 32 || _la === 34);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 560;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.COMMA:
            case cbuildParser.SLIT:
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 554;
                this.text_nested();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 555;
                this.function_();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 556;
                this.match(cbuildParser.LPAREN);
                this.state = 557;
                this.exprs_nested();
                this.state = 558;
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
            this.state = 563;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 562;
                this.expr_in_assign_atom();
                }
                }
                this.state = 565;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294528574) !== 0) || _la === 32 || _la === 34);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 569;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.LPAREN:
            case cbuildParser.RPAREN:
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
            case cbuildParser.SLIT:
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 567;
                this.text_in_assign();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 568;
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
            this.state = 572;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 571;
                this.expr_in_recipe_atom();
                }
                }
                this.state = 574;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294561342) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 133) !== 0));
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 578;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.LPAREN:
            case cbuildParser.RPAREN:
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
            case cbuildParser.SLIT:
            case cbuildParser.CHARS:
            case cbuildParser.COMMENT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 576;
                this.text_in_recipe();
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 577;
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
            this.state = 637;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 75, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 580;
                this.match(cbuildParser.VAR);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 581;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 582;
                this.function_name();
                this.state = 583;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 585;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 586;
                this.function_name();
                this.state = 587;
                this.ws();
                this.state = 588;
                this.arguments();
                this.state = 589;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 591;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 592;
                this.function_name();
                this.state = 593;
                this.match(cbuildParser.COMMA);
                this.state = 594;
                this.arguments();
                this.state = 595;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 597;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 598;
                this.function_name();
                this.state = 599;
                this.match(cbuildParser.COLON);
                this.state = 600;
                this.expressions();
                this.state = 601;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 603;
                this.match(cbuildParser.DOLLAR_LPAREN);
                this.state = 604;
                this.function_name();
                this.state = 605;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 606;
                this.expressions();
                this.state = 607;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 609;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 610;
                this.function_name();
                this.state = 611;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 613;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 614;
                this.function_name();
                this.state = 615;
                this.ws();
                this.state = 616;
                this.arguments();
                this.state = 617;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 9:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 619;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 620;
                this.function_name();
                this.state = 621;
                this.match(cbuildParser.COMMA);
                this.state = 622;
                this.arguments();
                this.state = 623;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 10:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 625;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 626;
                this.function_name();
                this.state = 627;
                this.match(cbuildParser.COLON);
                this.state = 628;
                this.expressions();
                this.state = 629;
                this.match(cbuildParser.R_CURLY_BRACE);
                }
                break;
            case 11:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 631;
                this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
                this.state = 632;
                this.function_name();
                this.state = 633;
                this.match(cbuildParser.ASSIGN_OP);
                this.state = 634;
                this.expressions();
                this.state = 635;
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
            this.state = 640;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 639;
                this.function_name_atom();
                }
                }
                this.state = 642;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 28) !== 0) || _la === 34);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 646;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 644;
                this.match(cbuildParser.CHARS);
                }
                break;
            case cbuildParser.DOLLAR_LPAREN:
            case cbuildParser.DOLLAR_L_CURLY_BRACE:
            case cbuildParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 645;
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
            this.state = 649;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1598) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 101) !== 0)) {
                {
                this.state = 648;
                this.argument();
                }
            }

            this.state = 657;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 14) {
                {
                {
                this.state = 651;
                this.match(cbuildParser.COMMA);
                this.state = 653;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1598) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 101) !== 0)) {
                    {
                    this.state = 652;
                    this.argument();
                    }
                }

                }
                }
                this.state = 659;
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
            this.state = 660;
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
            this.state = 703;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 91, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 662;
                this.static_pattern_rule();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 663;
                this.targets();
                this.state = 665;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 664;
                    this.ws();
                    }
                }

                this.state = 667;
                this.colon();
                this.state = 669;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 82, this.context) ) {
                case 1:
                    {
                    this.state = 668;
                    this.ws();
                    }
                    break;
                }
                this.state = 671;
                this.prerequisites();
                this.state = 680;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 85, this.context) ) {
                case 1:
                    {
                    this.state = 673;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    if (_la === 37 || _la === 38) {
                        {
                        this.state = 672;
                        this.ws();
                        }
                    }

                    this.state = 675;
                    this.match(cbuildParser.PIPE);
                    this.state = 677;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 84, this.context) ) {
                    case 1:
                        {
                        this.state = 676;
                        this.ws();
                        }
                        break;
                    }
                    this.state = 679;
                    this.orderonlyprerequisites();
                    }
                    break;
                }
                this.state = 683;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 682;
                    this.ws();
                    }
                }

                this.state = 685;
                this.match(cbuildParser.NL);
                this.state = 687;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 87, this.context) ) {
                case 1:
                    {
                    this.state = 686;
                    this.recipes();
                    }
                    break;
                }
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 689;
                this.targets();
                this.state = 691;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 690;
                    this.ws();
                    }
                }

                this.state = 693;
                this.colon();
                this.state = 695;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 694;
                    this.ws();
                    }
                }

                this.state = 697;
                this.assignment();
                this.state = 699;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 698;
                    this.ws();
                    }
                }

                this.state = 701;
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
            this.state = 705;
            this.targets();
            this.state = 707;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 706;
                this.ws();
                }
            }

            this.state = 709;
            this.colon();
            this.state = 711;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 710;
                this.ws();
                }
            }

            this.state = 713;
            this.pattern();
            this.state = 715;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 714;
                this.ws();
                }
            }

            this.state = 717;
            this.colon();
            this.state = 719;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 95, this.context) ) {
            case 1:
                {
                this.state = 718;
                this.ws();
                }
                break;
            }
            this.state = 721;
            this.prerequisites();
            this.state = 730;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 98, this.context) ) {
            case 1:
                {
                this.state = 723;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 722;
                    this.ws();
                    }
                }

                this.state = 725;
                this.match(cbuildParser.PIPE);
                this.state = 727;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 97, this.context) ) {
                case 1:
                    {
                    this.state = 726;
                    this.ws();
                    }
                    break;
                }
                this.state = 729;
                this.orderonlyprerequisites();
                }
                break;
            }
            this.state = 733;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 732;
                this.ws();
                }
            }

            this.state = 735;
            this.match(cbuildParser.NL);
            this.state = 737;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 100, this.context) ) {
            case 1:
                {
                this.state = 736;
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
            this.state = 739;
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
            this.state = 743;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                this.state = 743;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case cbuildParser.LPAREN:
                case cbuildParser.RPAREN:
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
                    this.state = 741;
                    this.identifier();
                    }
                    break;
                case cbuildParser.DOLLAR_LPAREN:
                case cbuildParser.DOLLAR_L_CURLY_BRACE:
                case cbuildParser.VAR:
                    {
                    this.state = 742;
                    this.function_();
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                }
                this.state = 745;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294528028) !== 0) || _la === 34);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
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
            this.state = 748;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294528028) !== 0) || _la === 34) {
                {
                this.state = 747;
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
            this.state = 751;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294528028) !== 0) || _la === 34) {
                {
                this.state = 750;
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
            this.state = 753;
            this.target();
            this.state = 759;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 105, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 754;
                    this.ws();
                    this.state = 755;
                    this.target();
                    }
                    }
                }
                this.state = 761;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 105, this.context);
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
            this.state = 763;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 762;
                    this.recipe();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 765;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 106, this.context);
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
            this.state = 767;
            this.comment_opt();
            this.state = 769;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 20)) & ~0x1F) === 0 && ((1 << (_la - 20)) & 1015823) !== 0)) {
                {
                this.state = 768;
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
            this.state = 791;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 111, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 771;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 773;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 108, this.context) ) {
                case 1:
                    {
                    this.state = 772;
                    this.ws();
                    }
                    break;
                }
                this.state = 775;
                this.exprs_in_recipe();
                this.state = 776;
                this.match(cbuildParser.NL);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 778;
                this.match(cbuildParser.LEADING_TAB);
                this.state = 780;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 779;
                    this.ws();
                    }
                }

                this.state = 782;
                this.match(cbuildParser.COMMENT);
                this.state = 783;
                this.match(cbuildParser.NL);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 785;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 37 || _la === 38) {
                    {
                    this.state = 784;
                    this.ws();
                    }
                }

                this.state = 787;
                this.match(cbuildParser.COMMENT);
                this.state = 788;
                this.match(cbuildParser.NL);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 789;
                this.conditional_in_recipe();
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 790;
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
            this.state = 813;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 112, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 793;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 794;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 795;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 796;
                this.match(cbuildParser.OVERRIDE);
                this.state = 797;
                this.ws();
                this.state = 798;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 800;
                this.match(cbuildParser.EXPORT);
                this.state = 801;
                this.ws();
                this.state = 802;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case 6:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 804;
                this.match(cbuildParser.UNDEFINE);
                }
                break;
            case 7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 805;
                this.match(cbuildParser.OVERRIDE);
                this.state = 806;
                this.ws();
                this.state = 807;
                this.match(cbuildParser.UNDEFINE);
                }
                break;
            case 8:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 809;
                this.match(cbuildParser.UNDEFINE);
                this.state = 810;
                this.ws();
                this.state = 811;
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
            this.state = 816;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 815;
                    this.identifier_atom();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 818;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 113, this.context);
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
            this.state = 825;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 820;
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
                this.state = 821;
                this.keywords();
                }
                break;
            case cbuildParser.COMMA:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 822;
                this.match(cbuildParser.COMMA);
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 823;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case cbuildParser.RPAREN:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 824;
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
    public br(): BrContext {
        let localContext = new BrContext(this.context, this.state);
        this.enterRule(localContext, 102, cbuildParser.RULE_br);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 827;
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
            this.state = 829;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 546) !== 0) || _la === 32 || _la === 34)) {
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
            this.state = 833;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.SLIT:
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 831;
                this.char();
                }
                break;
            case cbuildParser.COMMA:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 832;
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
            this.state = 840;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 116, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 835;
                this.char_nested();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 836;
                this.match(cbuildParser.DOUBLE_DOLLAR);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 837;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 838;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case 5:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 839;
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
        this.enterRule(localContext, 110, cbuildParser.RULE_char_in_def);
        try {
            this.state = 859;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case cbuildParser.ASSIGN_OP:
            case cbuildParser.DOUBLE_DOLLAR:
            case cbuildParser.COLON:
            case cbuildParser.SLIT:
            case cbuildParser.CHARS:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 842;
                this.char();
                }
                break;
            case cbuildParser.LPAREN:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 843;
                this.match(cbuildParser.LPAREN);
                }
                break;
            case cbuildParser.RPAREN:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 844;
                this.match(cbuildParser.RPAREN);
                }
                break;
            case cbuildParser.COMMA:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 845;
                this.match(cbuildParser.COMMA);
                }
                break;
            case cbuildParser.COMMENT:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 846;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case cbuildParser.INCLUDE:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 847;
                this.match(cbuildParser.INCLUDE);
                }
                break;
            case cbuildParser.OVERRIDE:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 848;
                this.match(cbuildParser.OVERRIDE);
                }
                break;
            case cbuildParser.EXPORT:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 849;
                this.match(cbuildParser.EXPORT);
                }
                break;
            case cbuildParser.UNEXPORT:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 850;
                this.match(cbuildParser.UNEXPORT);
                }
                break;
            case cbuildParser.IFDEF:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 851;
                this.match(cbuildParser.IFDEF);
                }
                break;
            case cbuildParser.IFNDEF:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 852;
                this.match(cbuildParser.IFNDEF);
                }
                break;
            case cbuildParser.IFEQ:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 853;
                this.match(cbuildParser.IFEQ);
                }
                break;
            case cbuildParser.IFNEQ:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 854;
                this.match(cbuildParser.IFNEQ);
                }
                break;
            case cbuildParser.ELSE:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 855;
                this.match(cbuildParser.ELSE);
                }
                break;
            case cbuildParser.ENDIF:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 856;
                this.match(cbuildParser.ENDIF);
                }
                break;
            case cbuildParser.DEFINE:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 857;
                this.match(cbuildParser.DEFINE);
                }
                break;
            case cbuildParser.UNDEFINE:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 858;
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
            this.state = 865;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 118, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 861;
                this.char_in_assign();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 862;
                this.match(cbuildParser.DOUBLE_DOLLAR);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 863;
                this.match(cbuildParser.COMMENT);
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 864;
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
        this.enterRule(localContext, 114, cbuildParser.RULE_text);
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 868;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 867;
                    this.char();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 870;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 119, this.context);
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
            this.state = 873;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 872;
                    this.char_nested();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 875;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 120, this.context);
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
            this.state = 878;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 877;
                    this.char_in_assign();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 880;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 121, this.context);
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
            this.state = 883;
            this.errorHandler.sync(this);
            alternative = 1;
            do {
                switch (alternative) {
                case 1:
                    {
                    {
                    this.state = 882;
                    this.char_in_recipe();
                    }
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 885;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 122, this.context);
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
            this.state = 887;
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
            this.state = 889;
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
            this.state = 892;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 123, this.context) ) {
            case 1:
                {
                this.state = 891;
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
            this.state = 894;
            _la = this.tokenStream.LA(1);
            if(!(_la === 37 || _la === 38)) {
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
            this.state = 896;
            this.match(cbuildParser.HOOK);
            this.state = 898;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 37 || _la === 38) {
                {
                this.state = 897;
                this.ws();
                }
            }

            this.state = 900;
            this.match(cbuildParser.L_CURLY_BRACE);
            this.state = 901;
            this.hook_program();
            this.state = 902;
            this.match(cbuildParser.R_CURLY_BRACE);
            this.state = 904;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 125, this.context) ) {
            case 1:
                {
                this.state = 903;
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
            this.state = 909;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 126, this.context);
            while (alternative !== 1 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1 + 1) {
                    {
                    {
                    this.state = 906;
                    this.matchWildcard();
                    }
                    }
                }
                this.state = 911;
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

    public static readonly _serializedATN: number[] = [
        4,1,39,913,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
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
        1,146,9,1,1,2,1,2,3,2,150,8,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,
        2,160,8,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,172,8,2,1,
        2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,181,8,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
        2,1,2,3,2,191,8,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,203,
        8,2,1,2,1,2,1,2,1,2,1,2,3,2,210,8,2,1,3,1,3,3,3,214,8,3,1,3,1,3,
        1,3,1,3,1,3,1,3,1,3,1,3,3,3,224,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,
        1,3,1,3,1,3,1,3,3,3,237,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,
        3,3,248,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,258,8,3,1,3,1,3,
        1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,271,8,3,1,3,1,3,1,3,1,3,
        1,3,1,3,1,3,3,3,280,8,3,1,4,1,4,1,4,1,4,1,5,3,5,287,8,5,1,5,1,5,
        3,5,291,8,5,1,5,1,5,3,5,295,8,5,1,5,1,5,3,5,299,8,5,1,5,1,5,3,5,
        303,8,5,1,5,1,5,1,5,1,5,3,5,309,8,5,1,5,1,5,3,5,313,8,5,1,5,1,5,
        1,5,1,5,3,5,319,8,5,1,5,1,5,1,5,1,5,3,5,325,8,5,1,5,1,5,3,5,329,
        8,5,1,5,3,5,332,8,5,1,6,3,6,335,8,6,1,6,1,6,1,6,1,6,3,6,341,8,6,
        1,6,3,6,344,8,6,1,6,3,6,347,8,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,
        1,7,1,7,1,7,1,7,3,7,361,8,7,1,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,
        1,9,3,9,373,8,9,3,9,375,8,9,1,10,1,10,3,10,379,8,10,1,10,1,10,1,
        10,1,11,1,11,1,11,1,11,1,11,3,11,389,8,11,1,12,1,12,3,12,393,8,12,
        1,12,1,12,3,12,397,8,12,1,12,1,12,1,12,1,12,3,12,403,8,12,1,12,1,
        12,3,12,407,8,12,1,12,1,12,3,12,411,8,12,1,13,1,13,1,13,1,13,1,14,
        1,14,1,15,1,15,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,17,1,17,1,17,
        3,17,431,8,17,1,17,3,17,434,8,17,1,18,3,18,437,8,18,1,19,3,19,440,
        8,19,1,19,1,19,3,19,444,8,19,1,19,1,19,1,19,5,19,449,8,19,10,19,
        12,19,452,9,19,1,19,3,19,455,8,19,1,20,3,20,458,8,20,1,20,1,20,3,
        20,462,8,20,1,20,1,20,1,20,5,20,467,8,20,10,20,12,20,470,9,20,1,
        20,3,20,473,8,20,1,21,3,21,476,8,21,1,21,1,21,3,21,480,8,21,1,21,
        1,21,1,21,5,21,485,8,21,10,21,12,21,488,9,21,1,21,3,21,491,8,21,
        1,22,3,22,494,8,22,1,22,1,22,3,22,498,8,22,1,22,1,22,1,22,5,22,503,
        8,22,10,22,12,22,506,9,22,1,22,3,22,509,8,22,1,23,1,23,3,23,513,
        8,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,1,23,5,23,523,8,23,10,23,
        12,23,526,9,23,3,23,528,8,23,1,24,1,24,3,24,532,8,24,1,24,3,24,535,
        8,24,1,25,4,25,538,8,25,11,25,12,25,539,1,26,1,26,1,26,1,26,1,26,
        1,26,3,26,548,8,26,1,27,4,27,551,8,27,11,27,12,27,552,1,28,1,28,
        1,28,1,28,1,28,1,28,3,28,561,8,28,1,29,4,29,564,8,29,11,29,12,29,
        565,1,30,1,30,3,30,570,8,30,1,31,4,31,573,8,31,11,31,12,31,574,1,
        32,1,32,3,32,579,8,32,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,
        33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,
        33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,
        33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,
        33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,1,33,3,33,638,8,33,1,
        34,4,34,641,8,34,11,34,12,34,642,1,35,1,35,3,35,647,8,35,1,36,3,
        36,650,8,36,1,36,1,36,3,36,654,8,36,5,36,656,8,36,10,36,12,36,659,
        9,36,1,37,1,37,1,38,1,38,1,38,3,38,666,8,38,1,38,1,38,3,38,670,8,
        38,1,38,1,38,3,38,674,8,38,1,38,1,38,3,38,678,8,38,1,38,3,38,681,
        8,38,1,38,3,38,684,8,38,1,38,1,38,3,38,688,8,38,1,38,1,38,3,38,692,
        8,38,1,38,1,38,3,38,696,8,38,1,38,1,38,3,38,700,8,38,1,38,1,38,3,
        38,704,8,38,1,39,1,39,3,39,708,8,39,1,39,1,39,3,39,712,8,39,1,39,
        1,39,3,39,716,8,39,1,39,1,39,3,39,720,8,39,1,39,1,39,3,39,724,8,
        39,1,39,1,39,3,39,728,8,39,1,39,3,39,731,8,39,1,39,3,39,734,8,39,
        1,39,1,39,3,39,738,8,39,1,40,1,40,1,41,1,41,4,41,744,8,41,11,41,
        12,41,745,1,42,3,42,749,8,42,1,43,3,43,752,8,43,1,44,1,44,1,44,1,
        44,5,44,758,8,44,10,44,12,44,761,9,44,1,45,4,45,764,8,45,11,45,12,
        45,765,1,46,1,46,3,46,770,8,46,1,47,1,47,3,47,774,8,47,1,47,1,47,
        1,47,1,47,1,47,3,47,781,8,47,1,47,1,47,1,47,3,47,786,8,47,1,47,1,
        47,1,47,1,47,3,47,792,8,47,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,
        48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,3,
        48,814,8,48,1,49,4,49,817,8,49,11,49,12,49,818,1,50,1,50,1,50,1,
        50,1,50,3,50,826,8,50,1,51,1,51,1,52,1,52,1,53,1,53,3,53,834,8,53,
        1,54,1,54,1,54,1,54,1,54,3,54,841,8,54,1,55,1,55,1,55,1,55,1,55,
        1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,1,55,3,55,
        860,8,55,1,56,1,56,1,56,1,56,3,56,866,8,56,1,57,4,57,869,8,57,11,
        57,12,57,870,1,58,4,58,874,8,58,11,58,12,58,875,1,59,4,59,879,8,
        59,11,59,12,59,880,1,60,4,60,884,8,60,11,60,12,60,885,1,61,1,61,
        1,62,1,62,1,63,3,63,893,8,63,1,64,1,64,1,65,1,65,3,65,899,8,65,1,
        65,1,65,1,65,1,65,3,65,905,8,65,1,66,5,66,908,8,66,10,66,12,66,911,
        9,66,1,66,1,909,0,67,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,
        32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,
        76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,
        114,116,118,120,122,124,126,128,130,132,0,7,1,0,22,23,1,0,20,21,
        1,0,16,18,5,0,1,1,5,5,9,9,32,32,34,34,2,0,16,16,19,31,1,0,6,9,1,
        0,37,38,1034,0,138,1,0,0,0,2,144,1,0,0,0,4,209,1,0,0,0,6,279,1,0,
        0,0,8,281,1,0,0,0,10,331,1,0,0,0,12,334,1,0,0,0,14,360,1,0,0,0,16,
        362,1,0,0,0,18,374,1,0,0,0,20,376,1,0,0,0,22,383,1,0,0,0,24,410,
        1,0,0,0,26,412,1,0,0,0,28,416,1,0,0,0,30,418,1,0,0,0,32,420,1,0,
        0,0,34,433,1,0,0,0,36,436,1,0,0,0,38,439,1,0,0,0,40,457,1,0,0,0,
        42,475,1,0,0,0,44,493,1,0,0,0,46,527,1,0,0,0,48,531,1,0,0,0,50,537,
        1,0,0,0,52,547,1,0,0,0,54,550,1,0,0,0,56,560,1,0,0,0,58,563,1,0,
        0,0,60,569,1,0,0,0,62,572,1,0,0,0,64,578,1,0,0,0,66,637,1,0,0,0,
        68,640,1,0,0,0,70,646,1,0,0,0,72,649,1,0,0,0,74,660,1,0,0,0,76,703,
        1,0,0,0,78,705,1,0,0,0,80,739,1,0,0,0,82,743,1,0,0,0,84,748,1,0,
        0,0,86,751,1,0,0,0,88,753,1,0,0,0,90,763,1,0,0,0,92,767,1,0,0,0,
        94,791,1,0,0,0,96,813,1,0,0,0,98,816,1,0,0,0,100,825,1,0,0,0,102,
        827,1,0,0,0,104,829,1,0,0,0,106,833,1,0,0,0,108,840,1,0,0,0,110,
        859,1,0,0,0,112,865,1,0,0,0,114,868,1,0,0,0,116,873,1,0,0,0,118,
        878,1,0,0,0,120,883,1,0,0,0,122,887,1,0,0,0,124,889,1,0,0,0,126,
        892,1,0,0,0,128,894,1,0,0,0,130,896,1,0,0,0,132,909,1,0,0,0,134,
        135,3,2,1,0,135,136,5,0,0,1,136,139,1,0,0,0,137,139,5,0,0,1,138,
        134,1,0,0,0,138,137,1,0,0,0,139,1,1,0,0,0,140,143,3,10,5,0,141,143,
        3,102,51,0,142,140,1,0,0,0,142,141,1,0,0,0,143,146,1,0,0,0,144,142,
        1,0,0,0,144,145,1,0,0,0,145,3,1,0,0,0,146,144,1,0,0,0,147,149,3,
        28,14,0,148,150,3,128,64,0,149,148,1,0,0,0,149,150,1,0,0,0,150,151,
        1,0,0,0,151,152,3,34,17,0,152,153,3,8,4,0,153,154,5,25,0,0,154,155,
        3,126,63,0,155,156,3,102,51,0,156,210,1,0,0,0,157,159,3,28,14,0,
        158,160,3,128,64,0,159,158,1,0,0,0,159,160,1,0,0,0,160,161,1,0,0,
        0,161,162,3,34,17,0,162,163,3,8,4,0,163,164,5,24,0,0,164,165,3,8,
        4,0,165,166,5,25,0,0,166,167,3,126,63,0,167,168,3,102,51,0,168,210,
        1,0,0,0,169,171,3,28,14,0,170,172,3,128,64,0,171,170,1,0,0,0,171,
        172,1,0,0,0,172,173,1,0,0,0,173,174,3,34,17,0,174,175,3,8,4,0,175,
        176,5,24,0,0,176,177,3,4,2,0,177,210,1,0,0,0,178,180,3,30,15,0,179,
        181,3,128,64,0,180,179,1,0,0,0,180,181,1,0,0,0,181,182,1,0,0,0,182,
        183,3,98,49,0,183,184,3,8,4,0,184,185,5,25,0,0,185,186,3,126,63,
        0,186,187,3,102,51,0,187,210,1,0,0,0,188,190,3,30,15,0,189,191,3,
        128,64,0,190,189,1,0,0,0,190,191,1,0,0,0,191,192,1,0,0,0,192,193,
        3,98,49,0,193,194,3,8,4,0,194,195,5,24,0,0,195,196,3,8,4,0,196,197,
        5,25,0,0,197,198,3,126,63,0,198,199,3,102,51,0,199,210,1,0,0,0,200,
        202,3,30,15,0,201,203,3,128,64,0,202,201,1,0,0,0,202,203,1,0,0,0,
        203,204,1,0,0,0,204,205,3,98,49,0,205,206,3,8,4,0,206,207,5,24,0,
        0,207,208,3,4,2,0,208,210,1,0,0,0,209,147,1,0,0,0,209,157,1,0,0,
        0,209,169,1,0,0,0,209,178,1,0,0,0,209,188,1,0,0,0,209,200,1,0,0,
        0,210,5,1,0,0,0,211,213,3,28,14,0,212,214,3,128,64,0,213,212,1,0,
        0,0,213,214,1,0,0,0,214,215,1,0,0,0,215,216,3,34,17,0,216,217,5,
        35,0,0,217,218,3,92,46,0,218,219,5,25,0,0,219,220,3,126,63,0,220,
        280,1,0,0,0,221,223,3,28,14,0,222,224,3,128,64,0,223,222,1,0,0,0,
        223,224,1,0,0,0,224,225,1,0,0,0,225,226,3,34,17,0,226,227,5,35,0,
        0,227,228,3,92,46,0,228,229,5,24,0,0,229,230,5,35,0,0,230,231,3,
        92,46,0,231,232,5,25,0,0,232,233,3,126,63,0,233,280,1,0,0,0,234,
        236,3,28,14,0,235,237,3,128,64,0,236,235,1,0,0,0,236,237,1,0,0,0,
        237,238,1,0,0,0,238,239,3,34,17,0,239,240,5,35,0,0,240,241,3,92,
        46,0,241,242,5,24,0,0,242,243,5,35,0,0,243,244,3,6,3,0,244,280,1,
        0,0,0,245,247,3,30,15,0,246,248,3,128,64,0,247,246,1,0,0,0,247,248,
        1,0,0,0,248,249,1,0,0,0,249,250,3,98,49,0,250,251,5,35,0,0,251,252,
        3,92,46,0,252,253,5,25,0,0,253,254,3,126,63,0,254,280,1,0,0,0,255,
        257,3,30,15,0,256,258,3,128,64,0,257,256,1,0,0,0,257,258,1,0,0,0,
        258,259,1,0,0,0,259,260,3,98,49,0,260,261,5,35,0,0,261,262,3,92,
        46,0,262,263,5,24,0,0,263,264,5,35,0,0,264,265,3,92,46,0,265,266,
        5,25,0,0,266,267,3,126,63,0,267,280,1,0,0,0,268,270,3,30,15,0,269,
        271,3,128,64,0,270,269,1,0,0,0,270,271,1,0,0,0,271,272,1,0,0,0,272,
        273,3,98,49,0,273,274,5,35,0,0,274,275,3,92,46,0,275,276,5,24,0,
        0,276,277,5,35,0,0,277,278,3,6,3,0,278,280,1,0,0,0,279,211,1,0,0,
        0,279,221,1,0,0,0,279,234,1,0,0,0,279,245,1,0,0,0,279,255,1,0,0,
        0,279,268,1,0,0,0,280,7,1,0,0,0,281,282,3,126,63,0,282,283,3,102,
        51,0,283,284,3,2,1,0,284,9,1,0,0,0,285,287,3,128,64,0,286,285,1,
        0,0,0,286,287,1,0,0,0,287,288,1,0,0,0,288,332,5,39,0,0,289,291,3,
        128,64,0,290,289,1,0,0,0,290,291,1,0,0,0,291,292,1,0,0,0,292,332,
        3,4,2,0,293,295,3,128,64,0,294,293,1,0,0,0,294,295,1,0,0,0,295,296,
        1,0,0,0,296,332,3,12,6,0,297,299,3,128,64,0,298,297,1,0,0,0,298,
        299,1,0,0,0,299,300,1,0,0,0,300,332,3,16,8,0,301,303,3,128,64,0,
        302,301,1,0,0,0,302,303,1,0,0,0,303,304,1,0,0,0,304,305,3,18,9,0,
        305,306,3,102,51,0,306,332,1,0,0,0,307,309,3,128,64,0,308,307,1,
        0,0,0,308,309,1,0,0,0,309,310,1,0,0,0,310,332,3,20,10,0,311,313,
        3,128,64,0,312,311,1,0,0,0,312,313,1,0,0,0,313,314,1,0,0,0,314,315,
        3,24,12,0,315,316,3,102,51,0,316,332,1,0,0,0,317,319,3,128,64,0,
        318,317,1,0,0,0,318,319,1,0,0,0,319,320,1,0,0,0,320,321,3,66,33,
        0,321,322,3,102,51,0,322,332,1,0,0,0,323,325,3,128,64,0,324,323,
        1,0,0,0,324,325,1,0,0,0,325,326,1,0,0,0,326,332,3,76,38,0,327,329,
        3,128,64,0,328,327,1,0,0,0,328,329,1,0,0,0,329,330,1,0,0,0,330,332,
        3,130,65,0,331,286,1,0,0,0,331,290,1,0,0,0,331,294,1,0,0,0,331,298,
        1,0,0,0,331,302,1,0,0,0,331,308,1,0,0,0,331,312,1,0,0,0,331,318,
        1,0,0,0,331,324,1,0,0,0,331,328,1,0,0,0,332,11,1,0,0,0,333,335,3,
        96,48,0,334,333,1,0,0,0,334,335,1,0,0,0,335,336,1,0,0,0,336,337,
        5,30,0,0,337,338,3,128,64,0,338,340,3,82,41,0,339,341,3,128,64,0,
        340,339,1,0,0,0,340,341,1,0,0,0,341,343,1,0,0,0,342,344,5,1,0,0,
        343,342,1,0,0,0,343,344,1,0,0,0,344,346,1,0,0,0,345,347,3,128,64,
        0,346,345,1,0,0,0,346,347,1,0,0,0,347,348,1,0,0,0,348,349,3,14,7,
        0,349,350,5,19,0,0,350,351,3,102,51,0,351,13,1,0,0,0,352,353,3,126,
        63,0,353,354,3,102,51,0,354,361,1,0,0,0,355,356,3,126,63,0,356,357,
        3,102,51,0,357,358,3,46,23,0,358,359,3,102,51,0,359,361,1,0,0,0,
        360,352,1,0,0,0,360,355,1,0,0,0,361,15,1,0,0,0,362,363,3,32,16,0,
        363,364,3,38,19,0,364,365,3,102,51,0,365,17,1,0,0,0,366,375,5,27,
        0,0,367,375,5,28,0,0,368,372,3,26,13,0,369,370,3,128,64,0,370,371,
        3,88,44,0,371,373,1,0,0,0,372,369,1,0,0,0,372,373,1,0,0,0,373,375,
        1,0,0,0,374,366,1,0,0,0,374,367,1,0,0,0,374,368,1,0,0,0,375,19,1,
        0,0,0,376,378,5,31,0,0,377,379,3,22,11,0,378,377,1,0,0,0,378,379,
        1,0,0,0,379,380,1,0,0,0,380,381,3,126,63,0,381,382,3,102,51,0,382,
        21,1,0,0,0,383,384,3,128,64,0,384,388,3,82,41,0,385,386,3,128,64,
        0,386,387,3,38,19,0,387,389,1,0,0,0,388,385,1,0,0,0,388,389,1,0,
        0,0,389,23,1,0,0,0,390,392,3,82,41,0,391,393,3,128,64,0,392,391,
        1,0,0,0,392,393,1,0,0,0,393,394,1,0,0,0,394,396,5,1,0,0,395,397,
        3,42,21,0,396,395,1,0,0,0,396,397,1,0,0,0,397,398,1,0,0,0,398,399,
        3,126,63,0,399,411,1,0,0,0,400,402,3,26,13,0,401,403,3,128,64,0,
        402,401,1,0,0,0,402,403,1,0,0,0,403,404,1,0,0,0,404,406,5,1,0,0,
        405,407,3,42,21,0,406,405,1,0,0,0,406,407,1,0,0,0,407,408,1,0,0,
        0,408,409,3,126,63,0,409,411,1,0,0,0,410,390,1,0,0,0,410,400,1,0,
        0,0,411,25,1,0,0,0,412,413,3,96,48,0,413,414,3,128,64,0,414,415,
        3,82,41,0,415,27,1,0,0,0,416,417,7,0,0,0,417,29,1,0,0,0,418,419,
        7,1,0,0,419,31,1,0,0,0,420,421,7,2,0,0,421,33,1,0,0,0,422,423,5,
        10,0,0,423,424,3,36,18,0,424,425,5,14,0,0,425,426,3,36,18,0,426,
        427,5,11,0,0,427,434,1,0,0,0,428,430,5,32,0,0,429,431,3,128,64,0,
        430,429,1,0,0,0,430,431,1,0,0,0,431,432,1,0,0,0,432,434,5,32,0,0,
        433,422,1,0,0,0,433,428,1,0,0,0,434,35,1,0,0,0,435,437,3,38,19,0,
        436,435,1,0,0,0,436,437,1,0,0,0,437,37,1,0,0,0,438,440,3,128,64,
        0,439,438,1,0,0,0,439,440,1,0,0,0,440,441,1,0,0,0,441,443,3,50,25,
        0,442,444,3,128,64,0,443,442,1,0,0,0,443,444,1,0,0,0,444,450,1,0,
        0,0,445,446,3,128,64,0,446,447,3,50,25,0,447,449,1,0,0,0,448,445,
        1,0,0,0,449,452,1,0,0,0,450,448,1,0,0,0,450,451,1,0,0,0,451,454,
        1,0,0,0,452,450,1,0,0,0,453,455,3,128,64,0,454,453,1,0,0,0,454,455,
        1,0,0,0,455,39,1,0,0,0,456,458,3,128,64,0,457,456,1,0,0,0,457,458,
        1,0,0,0,458,459,1,0,0,0,459,461,3,54,27,0,460,462,3,128,64,0,461,
        460,1,0,0,0,461,462,1,0,0,0,462,468,1,0,0,0,463,464,3,128,64,0,464,
        465,3,54,27,0,465,467,1,0,0,0,466,463,1,0,0,0,467,470,1,0,0,0,468,
        466,1,0,0,0,468,469,1,0,0,0,469,472,1,0,0,0,470,468,1,0,0,0,471,
        473,3,128,64,0,472,471,1,0,0,0,472,473,1,0,0,0,473,41,1,0,0,0,474,
        476,3,128,64,0,475,474,1,0,0,0,475,476,1,0,0,0,476,477,1,0,0,0,477,
        479,3,58,29,0,478,480,3,128,64,0,479,478,1,0,0,0,479,480,1,0,0,0,
        480,486,1,0,0,0,481,482,3,128,64,0,482,483,3,58,29,0,483,485,1,0,
        0,0,484,481,1,0,0,0,485,488,1,0,0,0,486,484,1,0,0,0,486,487,1,0,
        0,0,487,490,1,0,0,0,488,486,1,0,0,0,489,491,3,128,64,0,490,489,1,
        0,0,0,490,491,1,0,0,0,491,43,1,0,0,0,492,494,3,128,64,0,493,492,
        1,0,0,0,493,494,1,0,0,0,494,495,1,0,0,0,495,497,3,62,31,0,496,498,
        3,128,64,0,497,496,1,0,0,0,497,498,1,0,0,0,498,504,1,0,0,0,499,500,
        3,128,64,0,500,501,3,62,31,0,501,503,1,0,0,0,502,499,1,0,0,0,503,
        506,1,0,0,0,504,502,1,0,0,0,504,505,1,0,0,0,505,508,1,0,0,0,506,
        504,1,0,0,0,507,509,3,128,64,0,508,507,1,0,0,0,508,509,1,0,0,0,509,
        45,1,0,0,0,510,528,3,102,51,0,511,513,3,102,51,0,512,511,1,0,0,0,
        512,513,1,0,0,0,513,514,1,0,0,0,514,524,3,48,24,0,515,516,3,102,
        51,0,516,517,3,48,24,0,517,523,1,0,0,0,518,523,3,102,51,0,519,520,
        3,128,64,0,520,521,3,62,31,0,521,523,1,0,0,0,522,515,1,0,0,0,522,
        518,1,0,0,0,522,519,1,0,0,0,523,526,1,0,0,0,524,522,1,0,0,0,524,
        525,1,0,0,0,525,528,1,0,0,0,526,524,1,0,0,0,527,510,1,0,0,0,527,
        512,1,0,0,0,528,47,1,0,0,0,529,532,3,110,55,0,530,532,3,66,33,0,
        531,529,1,0,0,0,531,530,1,0,0,0,532,534,1,0,0,0,533,535,3,62,31,
        0,534,533,1,0,0,0,534,535,1,0,0,0,535,49,1,0,0,0,536,538,3,52,26,
        0,537,536,1,0,0,0,538,539,1,0,0,0,539,537,1,0,0,0,539,540,1,0,0,
        0,540,51,1,0,0,0,541,548,3,114,57,0,542,548,3,66,33,0,543,544,5,
        10,0,0,544,545,3,40,20,0,545,546,5,11,0,0,546,548,1,0,0,0,547,541,
        1,0,0,0,547,542,1,0,0,0,547,543,1,0,0,0,548,53,1,0,0,0,549,551,3,
        56,28,0,550,549,1,0,0,0,551,552,1,0,0,0,552,550,1,0,0,0,552,553,
        1,0,0,0,553,55,1,0,0,0,554,561,3,116,58,0,555,561,3,66,33,0,556,
        557,5,10,0,0,557,558,3,40,20,0,558,559,5,11,0,0,559,561,1,0,0,0,
        560,554,1,0,0,0,560,555,1,0,0,0,560,556,1,0,0,0,561,57,1,0,0,0,562,
        564,3,60,30,0,563,562,1,0,0,0,564,565,1,0,0,0,565,563,1,0,0,0,565,
        566,1,0,0,0,566,59,1,0,0,0,567,570,3,118,59,0,568,570,3,66,33,0,
        569,567,1,0,0,0,569,568,1,0,0,0,570,61,1,0,0,0,571,573,3,64,32,0,
        572,571,1,0,0,0,573,574,1,0,0,0,574,572,1,0,0,0,574,575,1,0,0,0,
        575,63,1,0,0,0,576,579,3,120,60,0,577,579,3,66,33,0,578,576,1,0,
        0,0,578,577,1,0,0,0,579,65,1,0,0,0,580,638,5,4,0,0,581,582,5,2,0,
        0,582,583,3,68,34,0,583,584,5,11,0,0,584,638,1,0,0,0,585,586,5,2,
        0,0,586,587,3,68,34,0,587,588,3,128,64,0,588,589,3,72,36,0,589,590,
        5,11,0,0,590,638,1,0,0,0,591,592,5,2,0,0,592,593,3,68,34,0,593,594,
        5,14,0,0,594,595,3,72,36,0,595,596,5,11,0,0,596,638,1,0,0,0,597,
        598,5,2,0,0,598,599,3,68,34,0,599,600,5,9,0,0,600,601,3,38,19,0,
        601,602,5,11,0,0,602,638,1,0,0,0,603,604,5,2,0,0,604,605,3,68,34,
        0,605,606,5,1,0,0,606,607,3,38,19,0,607,608,5,11,0,0,608,638,1,0,
        0,0,609,610,5,3,0,0,610,611,3,68,34,0,611,612,5,13,0,0,612,638,1,
        0,0,0,613,614,5,3,0,0,614,615,3,68,34,0,615,616,3,128,64,0,616,617,
        3,72,36,0,617,618,5,13,0,0,618,638,1,0,0,0,619,620,5,3,0,0,620,621,
        3,68,34,0,621,622,5,14,0,0,622,623,3,72,36,0,623,624,5,13,0,0,624,
        638,1,0,0,0,625,626,5,3,0,0,626,627,3,68,34,0,627,628,5,9,0,0,628,
        629,3,38,19,0,629,630,5,13,0,0,630,638,1,0,0,0,631,632,5,3,0,0,632,
        633,3,68,34,0,633,634,5,1,0,0,634,635,3,38,19,0,635,636,5,13,0,0,
        636,638,1,0,0,0,637,580,1,0,0,0,637,581,1,0,0,0,637,585,1,0,0,0,
        637,591,1,0,0,0,637,597,1,0,0,0,637,603,1,0,0,0,637,609,1,0,0,0,
        637,613,1,0,0,0,637,619,1,0,0,0,637,625,1,0,0,0,637,631,1,0,0,0,
        638,67,1,0,0,0,639,641,3,70,35,0,640,639,1,0,0,0,641,642,1,0,0,0,
        642,640,1,0,0,0,642,643,1,0,0,0,643,69,1,0,0,0,644,647,5,34,0,0,
        645,647,3,66,33,0,646,644,1,0,0,0,646,645,1,0,0,0,647,71,1,0,0,0,
        648,650,3,74,37,0,649,648,1,0,0,0,649,650,1,0,0,0,650,657,1,0,0,
        0,651,653,5,14,0,0,652,654,3,74,37,0,653,652,1,0,0,0,653,654,1,0,
        0,0,654,656,1,0,0,0,655,651,1,0,0,0,656,659,1,0,0,0,657,655,1,0,
        0,0,657,658,1,0,0,0,658,73,1,0,0,0,659,657,1,0,0,0,660,661,3,38,
        19,0,661,75,1,0,0,0,662,704,3,78,39,0,663,665,3,88,44,0,664,666,
        3,128,64,0,665,664,1,0,0,0,665,666,1,0,0,0,666,667,1,0,0,0,667,669,
        3,124,62,0,668,670,3,128,64,0,669,668,1,0,0,0,669,670,1,0,0,0,670,
        671,1,0,0,0,671,680,3,84,42,0,672,674,3,128,64,0,673,672,1,0,0,0,
        673,674,1,0,0,0,674,675,1,0,0,0,675,677,5,15,0,0,676,678,3,128,64,
        0,677,676,1,0,0,0,677,678,1,0,0,0,678,679,1,0,0,0,679,681,3,86,43,
        0,680,673,1,0,0,0,680,681,1,0,0,0,681,683,1,0,0,0,682,684,3,128,
        64,0,683,682,1,0,0,0,683,684,1,0,0,0,684,685,1,0,0,0,685,687,5,35,
        0,0,686,688,3,90,45,0,687,686,1,0,0,0,687,688,1,0,0,0,688,704,1,
        0,0,0,689,691,3,88,44,0,690,692,3,128,64,0,691,690,1,0,0,0,691,692,
        1,0,0,0,692,693,1,0,0,0,693,695,3,124,62,0,694,696,3,128,64,0,695,
        694,1,0,0,0,695,696,1,0,0,0,696,697,1,0,0,0,697,699,3,24,12,0,698,
        700,3,128,64,0,699,698,1,0,0,0,699,700,1,0,0,0,700,701,1,0,0,0,701,
        702,5,35,0,0,702,704,1,0,0,0,703,662,1,0,0,0,703,663,1,0,0,0,703,
        689,1,0,0,0,704,77,1,0,0,0,705,707,3,88,44,0,706,708,3,128,64,0,
        707,706,1,0,0,0,707,708,1,0,0,0,708,709,1,0,0,0,709,711,3,124,62,
        0,710,712,3,128,64,0,711,710,1,0,0,0,711,712,1,0,0,0,712,713,1,0,
        0,0,713,715,3,82,41,0,714,716,3,128,64,0,715,714,1,0,0,0,715,716,
        1,0,0,0,716,717,1,0,0,0,717,719,3,124,62,0,718,720,3,128,64,0,719,
        718,1,0,0,0,719,720,1,0,0,0,720,721,1,0,0,0,721,730,3,84,42,0,722,
        724,3,128,64,0,723,722,1,0,0,0,723,724,1,0,0,0,724,725,1,0,0,0,725,
        727,5,15,0,0,726,728,3,128,64,0,727,726,1,0,0,0,727,728,1,0,0,0,
        728,729,1,0,0,0,729,731,3,86,43,0,730,723,1,0,0,0,730,731,1,0,0,
        0,731,733,1,0,0,0,732,734,3,128,64,0,733,732,1,0,0,0,733,734,1,0,
        0,0,734,735,1,0,0,0,735,737,5,35,0,0,736,738,3,90,45,0,737,736,1,
        0,0,0,737,738,1,0,0,0,738,79,1,0,0,0,739,740,3,82,41,0,740,81,1,
        0,0,0,741,744,3,98,49,0,742,744,3,66,33,0,743,741,1,0,0,0,743,742,
        1,0,0,0,744,745,1,0,0,0,745,743,1,0,0,0,745,746,1,0,0,0,746,83,1,
        0,0,0,747,749,3,88,44,0,748,747,1,0,0,0,748,749,1,0,0,0,749,85,1,
        0,0,0,750,752,3,88,44,0,751,750,1,0,0,0,751,752,1,0,0,0,752,87,1,
        0,0,0,753,759,3,80,40,0,754,755,3,128,64,0,755,756,3,80,40,0,756,
        758,1,0,0,0,757,754,1,0,0,0,758,761,1,0,0,0,759,757,1,0,0,0,759,
        760,1,0,0,0,760,89,1,0,0,0,761,759,1,0,0,0,762,764,3,94,47,0,763,
        762,1,0,0,0,764,765,1,0,0,0,765,763,1,0,0,0,765,766,1,0,0,0,766,
        91,1,0,0,0,767,769,3,126,63,0,768,770,3,90,45,0,769,768,1,0,0,0,
        769,770,1,0,0,0,770,93,1,0,0,0,771,773,5,36,0,0,772,774,3,128,64,
        0,773,772,1,0,0,0,773,774,1,0,0,0,774,775,1,0,0,0,775,776,3,44,22,
        0,776,777,5,35,0,0,777,792,1,0,0,0,778,780,5,36,0,0,779,781,3,128,
        64,0,780,779,1,0,0,0,780,781,1,0,0,0,781,782,1,0,0,0,782,783,5,39,
        0,0,783,792,5,35,0,0,784,786,3,128,64,0,785,784,1,0,0,0,785,786,
        1,0,0,0,786,787,1,0,0,0,787,788,5,39,0,0,788,792,5,35,0,0,789,792,
        3,6,3,0,790,792,5,35,0,0,791,771,1,0,0,0,791,778,1,0,0,0,791,785,
        1,0,0,0,791,789,1,0,0,0,791,790,1,0,0,0,792,95,1,0,0,0,793,814,5,
        26,0,0,794,814,5,27,0,0,795,814,5,28,0,0,796,797,5,26,0,0,797,798,
        3,128,64,0,798,799,5,27,0,0,799,814,1,0,0,0,800,801,5,27,0,0,801,
        802,3,128,64,0,802,803,5,26,0,0,803,814,1,0,0,0,804,814,5,29,0,0,
        805,806,5,26,0,0,806,807,3,128,64,0,807,808,5,29,0,0,808,814,1,0,
        0,0,809,810,5,29,0,0,810,811,3,128,64,0,811,812,5,26,0,0,812,814,
        1,0,0,0,813,793,1,0,0,0,813,794,1,0,0,0,813,795,1,0,0,0,813,796,
        1,0,0,0,813,800,1,0,0,0,813,804,1,0,0,0,813,805,1,0,0,0,813,809,
        1,0,0,0,814,97,1,0,0,0,815,817,3,100,50,0,816,815,1,0,0,0,817,818,
        1,0,0,0,818,816,1,0,0,0,818,819,1,0,0,0,819,99,1,0,0,0,820,826,5,
        34,0,0,821,826,3,122,61,0,822,826,5,14,0,0,823,826,5,10,0,0,824,
        826,5,11,0,0,825,820,1,0,0,0,825,821,1,0,0,0,825,822,1,0,0,0,825,
        823,1,0,0,0,825,824,1,0,0,0,826,101,1,0,0,0,827,828,5,35,0,0,828,
        103,1,0,0,0,829,830,7,3,0,0,830,105,1,0,0,0,831,834,3,104,52,0,832,
        834,5,14,0,0,833,831,1,0,0,0,833,832,1,0,0,0,834,107,1,0,0,0,835,
        841,3,106,53,0,836,841,5,5,0,0,837,841,5,10,0,0,838,841,5,11,0,0,
        839,841,3,122,61,0,840,835,1,0,0,0,840,836,1,0,0,0,840,837,1,0,0,
        0,840,838,1,0,0,0,840,839,1,0,0,0,841,109,1,0,0,0,842,860,3,104,
        52,0,843,860,5,10,0,0,844,860,5,11,0,0,845,860,5,14,0,0,846,860,
        5,39,0,0,847,860,5,16,0,0,848,860,5,26,0,0,849,860,5,27,0,0,850,
        860,5,28,0,0,851,860,5,20,0,0,852,860,5,21,0,0,853,860,5,22,0,0,
        854,860,5,23,0,0,855,860,5,24,0,0,856,860,5,25,0,0,857,860,5,30,
        0,0,858,860,5,29,0,0,859,842,1,0,0,0,859,843,1,0,0,0,859,844,1,0,
        0,0,859,845,1,0,0,0,859,846,1,0,0,0,859,847,1,0,0,0,859,848,1,0,
        0,0,859,849,1,0,0,0,859,850,1,0,0,0,859,851,1,0,0,0,859,852,1,0,
        0,0,859,853,1,0,0,0,859,854,1,0,0,0,859,855,1,0,0,0,859,856,1,0,
        0,0,859,857,1,0,0,0,859,858,1,0,0,0,860,111,1,0,0,0,861,866,3,108,
        54,0,862,866,5,5,0,0,863,866,5,39,0,0,864,866,5,15,0,0,865,861,1,
        0,0,0,865,862,1,0,0,0,865,863,1,0,0,0,865,864,1,0,0,0,866,113,1,
        0,0,0,867,869,3,104,52,0,868,867,1,0,0,0,869,870,1,0,0,0,870,868,
        1,0,0,0,870,871,1,0,0,0,871,115,1,0,0,0,872,874,3,106,53,0,873,872,
        1,0,0,0,874,875,1,0,0,0,875,873,1,0,0,0,875,876,1,0,0,0,876,117,
        1,0,0,0,877,879,3,108,54,0,878,877,1,0,0,0,879,880,1,0,0,0,880,878,
        1,0,0,0,880,881,1,0,0,0,881,119,1,0,0,0,882,884,3,112,56,0,883,882,
        1,0,0,0,884,885,1,0,0,0,885,883,1,0,0,0,885,886,1,0,0,0,886,121,
        1,0,0,0,887,888,7,4,0,0,888,123,1,0,0,0,889,890,7,5,0,0,890,125,
        1,0,0,0,891,893,5,39,0,0,892,891,1,0,0,0,892,893,1,0,0,0,893,127,
        1,0,0,0,894,895,7,6,0,0,895,129,1,0,0,0,896,898,5,33,0,0,897,899,
        3,128,64,0,898,897,1,0,0,0,898,899,1,0,0,0,899,900,1,0,0,0,900,901,
        5,12,0,0,901,902,3,132,66,0,902,904,5,13,0,0,903,905,3,128,64,0,
        904,903,1,0,0,0,904,905,1,0,0,0,905,131,1,0,0,0,906,908,9,0,0,0,
        907,906,1,0,0,0,908,911,1,0,0,0,909,910,1,0,0,0,909,907,1,0,0,0,
        910,133,1,0,0,0,911,909,1,0,0,0,127,138,142,144,149,159,171,180,
        190,202,209,213,223,236,247,257,270,279,286,290,294,298,302,308,
        312,318,324,328,331,334,340,343,346,360,372,374,378,388,392,396,
        402,406,410,430,433,436,439,443,450,454,457,461,468,472,475,479,
        486,490,493,497,504,508,512,522,524,527,531,534,539,547,552,560,
        565,569,574,578,637,642,646,649,653,657,665,669,673,677,680,683,
        687,691,695,699,703,707,711,715,719,723,727,730,733,737,743,745,
        748,751,759,765,769,773,780,785,791,813,818,825,833,840,859,865,
        870,875,880,885,892,898,904,909
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
    public ws(): WsContext | null {
        return this.getRuleContext(0, WsContext);
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
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
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
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
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
    public DOUBLE_DOLLAR(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.DOUBLE_DOLLAR, 0);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.LPAREN, 0);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.RPAREN, 0);
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
    public DOUBLE_DOLLAR(): antlr.TerminalNode | null {
        return this.getToken(cbuildParser.DOUBLE_DOLLAR, 0);
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
