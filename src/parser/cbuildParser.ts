// @ts-nocheck
// Generated from cbuild.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { cbuildListener } from "./cbuildListener";
import { cbuildVisitor } from "./cbuildVisitor";


export class cbuildParser extends Parser {
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
	public static readonly YSHARP = 33;
	public static readonly LUA = 34;
	public static readonly CHARS = 35;
	public static readonly NL = 36;
	public static readonly LEADING_TAB = 37;
	public static readonly WS = 38;
	public static readonly TAB = 39;
	public static readonly COMMENT = 40;
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
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"cbuildfile", "statements", "conditional", "conditional_in_recipe", "statements_opt", 
		"statement", "define", "definition", "include", "export", "vpath", "vpath_args", 
		"assignment", "assignment_prefix", "if_eq_kw", "if_def_kw", "include_kw", 
		"condition", "expressions_opt", "expressions", "exprs_nested", "exprs_in_assign", 
		"exprs_in_recipe", "exprs_in_def", "first_expr_in_def", "expression", 
		"expression_atom", "expr_nested", "expr_nested_atom", "expr_in_assign", 
		"expr_in_assign_atom", "expr_in_recipe", "expr_in_recipe_atom", "function", 
		"function_name", "function_name_atom", "arguments", "argument", "rule", 
		"static_pattern_rule", "target", "pattern", "prerequisites", "orderonlyprerequisites", 
		"targets", "recipes", "recipes_opt", "recipe", "specifiers", "identifier", 
		"identifier_atom", "br", "char", "char_nested", "char_in_assign", "char_in_def", 
		"char_in_recipe", "text", "text_nested", "text_in_assign", "text_in_recipe", 
		"keywords", "colon", "comment_opt", "ws",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, "'$('", "'${'", undefined, "'$$'", "'&::'", "'&:'", 
		"'::'", "':'", "'('", "')'", "'{'", "'}'", "','", "'|'", "'include'", 
		"'-include'", "'sinclude'", "'endef'", "'ifdef'", "'ifndef'", "'ifeq'", 
		"'ifneq'", "'else'", "'endif'", "'override'", "'export'", "'unexport'", 
		"'undefine'", "'define'", "'vpath'", undefined, "'ysharp'", "'lua'", undefined, 
		undefined, undefined, undefined, "'\t'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "ASSIGN_OP", "DOLLAR_LPAREN", "DOLLAR_L_CURLY_BRACE", "VAR", 
		"DOUBLE_DOLLAR", "GROUPED_DOUBLE_COLON", "GROUPED_COLON", "DOUBLE_COLON", 
		"COLON", "LPAREN", "RPAREN", "L_CURLY_BRACE", "R_CURLY_BRACE", "COMMA", 
		"PIPE", "INCLUDE", "DASH_INCLUDE", "SINCLUDE", "ENDEF", "IFDEF", "IFNDEF", 
		"IFEQ", "IFNEQ", "ELSE", "ENDIF", "OVERRIDE", "EXPORT", "UNEXPORT", "UNDEFINE", 
		"DEFINE", "VPATH", "SLIT", "YSHARP", "LUA", "CHARS", "NL", "LEADING_TAB", 
		"WS", "TAB", "COMMENT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(cbuildParser._LITERAL_NAMES, cbuildParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return cbuildParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "cbuild.g4"; }

	// @Override
	public get ruleNames(): string[] { return cbuildParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return cbuildParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(cbuildParser._ATN, this);
	}
	// @RuleVersion(0)
	public cbuildfile(): CbuildfileContext {
		let _localctx: CbuildfileContext = new CbuildfileContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, cbuildParser.RULE_cbuildfile);
		try {
			this.state = 134;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 130;
				this.statements();
				this.state = 131;
				this.match(cbuildParser.EOF);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 133;
				this.match(cbuildParser.EOF);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statements(): StatementsContext {
		let _localctx: StatementsContext = new StatementsContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, cbuildParser.RULE_statements);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 140;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					this.state = 138;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
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
					case cbuildParser.CHARS:
					case cbuildParser.WS:
					case cbuildParser.TAB:
					case cbuildParser.COMMENT:
						{
						this.state = 136;
						this.statement();
						}
						break;
					case cbuildParser.NL:
						{
						this.state = 137;
						this.br();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
				}
				this.state = 142;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conditional(): ConditionalContext {
		let _localctx: ConditionalContext = new ConditionalContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, cbuildParser.RULE_conditional);
		let _la: number;
		try {
			this.state = 205;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 143;
				this.if_eq_kw();
				this.state = 145;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 144;
					this.ws();
					}
				}

				this.state = 147;
				this.condition();
				this.state = 148;
				this.statements_opt();
				this.state = 149;
				this.match(cbuildParser.ENDIF);
				this.state = 150;
				this.comment_opt();
				this.state = 151;
				this.br();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 153;
				this.if_eq_kw();
				this.state = 155;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 154;
					this.ws();
					}
				}

				this.state = 157;
				this.condition();
				this.state = 158;
				this.statements_opt();
				this.state = 159;
				this.match(cbuildParser.ELSE);
				this.state = 160;
				this.statements_opt();
				this.state = 161;
				this.match(cbuildParser.ENDIF);
				this.state = 162;
				this.comment_opt();
				this.state = 163;
				this.br();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 165;
				this.if_eq_kw();
				this.state = 167;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 166;
					this.ws();
					}
				}

				this.state = 169;
				this.condition();
				this.state = 170;
				this.statements_opt();
				this.state = 171;
				this.match(cbuildParser.ELSE);
				this.state = 172;
				this.conditional();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 174;
				this.if_def_kw();
				this.state = 176;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 175;
					this.ws();
					}
				}

				this.state = 178;
				this.identifier();
				this.state = 179;
				this.statements_opt();
				this.state = 180;
				this.match(cbuildParser.ENDIF);
				this.state = 181;
				this.comment_opt();
				this.state = 182;
				this.br();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 184;
				this.if_def_kw();
				this.state = 186;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 185;
					this.ws();
					}
				}

				this.state = 188;
				this.identifier();
				this.state = 189;
				this.statements_opt();
				this.state = 190;
				this.match(cbuildParser.ELSE);
				this.state = 191;
				this.statements_opt();
				this.state = 192;
				this.match(cbuildParser.ENDIF);
				this.state = 193;
				this.comment_opt();
				this.state = 194;
				this.br();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 196;
				this.if_def_kw();
				this.state = 198;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 197;
					this.ws();
					}
				}

				this.state = 200;
				this.identifier();
				this.state = 201;
				this.statements_opt();
				this.state = 202;
				this.match(cbuildParser.ELSE);
				this.state = 203;
				this.conditional();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public conditional_in_recipe(): Conditional_in_recipeContext {
		let _localctx: Conditional_in_recipeContext = new Conditional_in_recipeContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, cbuildParser.RULE_conditional_in_recipe);
		let _la: number;
		try {
			this.state = 275;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 16, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 207;
				this.if_eq_kw();
				this.state = 209;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 208;
					this.ws();
					}
				}

				this.state = 211;
				this.condition();
				this.state = 212;
				this.match(cbuildParser.NL);
				this.state = 213;
				this.recipes_opt();
				this.state = 214;
				this.match(cbuildParser.ENDIF);
				this.state = 215;
				this.comment_opt();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 217;
				this.if_eq_kw();
				this.state = 219;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 218;
					this.ws();
					}
				}

				this.state = 221;
				this.condition();
				this.state = 222;
				this.match(cbuildParser.NL);
				this.state = 223;
				this.recipes_opt();
				this.state = 224;
				this.match(cbuildParser.ELSE);
				this.state = 225;
				this.match(cbuildParser.NL);
				this.state = 226;
				this.recipes_opt();
				this.state = 227;
				this.match(cbuildParser.ENDIF);
				this.state = 228;
				this.comment_opt();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 230;
				this.if_eq_kw();
				this.state = 232;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 231;
					this.ws();
					}
				}

				this.state = 234;
				this.condition();
				this.state = 235;
				this.match(cbuildParser.NL);
				this.state = 236;
				this.recipes_opt();
				this.state = 237;
				this.match(cbuildParser.ELSE);
				this.state = 238;
				this.match(cbuildParser.NL);
				this.state = 239;
				this.conditional_in_recipe();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 241;
				this.if_def_kw();
				this.state = 243;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 242;
					this.ws();
					}
				}

				this.state = 245;
				this.identifier();
				this.state = 246;
				this.match(cbuildParser.NL);
				this.state = 247;
				this.recipes_opt();
				this.state = 248;
				this.match(cbuildParser.ENDIF);
				this.state = 249;
				this.comment_opt();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 251;
				this.if_def_kw();
				this.state = 253;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 252;
					this.ws();
					}
				}

				this.state = 255;
				this.identifier();
				this.state = 256;
				this.match(cbuildParser.NL);
				this.state = 257;
				this.recipes_opt();
				this.state = 258;
				this.match(cbuildParser.ELSE);
				this.state = 259;
				this.match(cbuildParser.NL);
				this.state = 260;
				this.recipes_opt();
				this.state = 261;
				this.match(cbuildParser.ENDIF);
				this.state = 262;
				this.comment_opt();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 264;
				this.if_def_kw();
				this.state = 266;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 265;
					this.ws();
					}
				}

				this.state = 268;
				this.identifier();
				this.state = 269;
				this.match(cbuildParser.NL);
				this.state = 270;
				this.recipes_opt();
				this.state = 271;
				this.match(cbuildParser.ELSE);
				this.state = 272;
				this.match(cbuildParser.NL);
				this.state = 273;
				this.conditional_in_recipe();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statements_opt(): Statements_optContext {
		let _localctx: Statements_optContext = new Statements_optContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, cbuildParser.RULE_statements_opt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 277;
			this.comment_opt();
			this.state = 278;
			this.br();
			this.state = 279;
			this.statements();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, cbuildParser.RULE_statement);
		let _la: number;
		try {
			this.state = 323;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 282;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 281;
					this.ws();
					}
				}

				this.state = 284;
				this.match(cbuildParser.COMMENT);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 286;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 285;
					this.ws();
					}
				}

				this.state = 288;
				this.conditional();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 290;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 289;
					this.ws();
					}
				}

				this.state = 292;
				this.define();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 294;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 293;
					this.ws();
					}
				}

				this.state = 296;
				this.include();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 298;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 297;
					this.ws();
					}
				}

				this.state = 300;
				this.export();
				this.state = 301;
				this.br();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 304;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 303;
					this.ws();
					}
				}

				this.state = 306;
				this.vpath();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 308;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 307;
					this.ws();
					}
				}

				this.state = 310;
				this.assignment();
				this.state = 311;
				this.br();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 314;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 313;
					this.ws();
					}
				}

				this.state = 316;
				this.function();
				this.state = 317;
				this.br();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 320;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 319;
					this.ws();
					}
				}

				this.state = 322;
				this.rule();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public define(): DefineContext {
		let _localctx: DefineContext = new DefineContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, cbuildParser.RULE_define);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 326;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.OVERRIDE) | (1 << cbuildParser.EXPORT) | (1 << cbuildParser.UNEXPORT) | (1 << cbuildParser.UNDEFINE))) !== 0)) {
				{
				this.state = 325;
				this.specifiers();
				}
			}

			this.state = 328;
			this.match(cbuildParser.DEFINE);
			this.state = 329;
			this.ws();
			this.state = 330;
			this.pattern();
			this.state = 332;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				{
				this.state = 331;
				this.ws();
				}
				break;
			}
			this.state = 335;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === cbuildParser.ASSIGN_OP) {
				{
				this.state = 334;
				this.match(cbuildParser.ASSIGN_OP);
				}
			}

			this.state = 338;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 30, this._ctx) ) {
			case 1:
				{
				this.state = 337;
				this.ws();
				}
				break;
			}
			this.state = 340;
			this.definition();
			this.state = 341;
			this.match(cbuildParser.ENDEF);
			this.state = 342;
			this.br();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public definition(): DefinitionContext {
		let _localctx: DefinitionContext = new DefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, cbuildParser.RULE_definition);
		try {
			this.state = 352;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 31, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 344;
				this.comment_opt();
				this.state = 345;
				this.br();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 347;
				this.comment_opt();
				this.state = 348;
				this.br();
				this.state = 349;
				this.exprs_in_def();
				this.state = 350;
				this.br();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public include(): IncludeContext {
		let _localctx: IncludeContext = new IncludeContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, cbuildParser.RULE_include);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 354;
			this.include_kw();
			this.state = 355;
			this.expressions();
			this.state = 356;
			this.br();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public export(): ExportContext {
		let _localctx: ExportContext = new ExportContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, cbuildParser.RULE_export);
		let _la: number;
		try {
			this.state = 366;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 358;
				this.match(cbuildParser.EXPORT);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 359;
				this.match(cbuildParser.UNEXPORT);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 360;
				this.assignment_prefix();
				this.state = 364;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 361;
					this.ws();
					this.state = 362;
					this.targets();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public vpath(): VpathContext {
		let _localctx: VpathContext = new VpathContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, cbuildParser.RULE_vpath);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 368;
			this.match(cbuildParser.VPATH);
			this.state = 370;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				{
				this.state = 369;
				this.vpath_args();
				}
				break;
			}
			this.state = 372;
			this.comment_opt();
			this.state = 373;
			this.br();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public vpath_args(): Vpath_argsContext {
		let _localctx: Vpath_argsContext = new Vpath_argsContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, cbuildParser.RULE_vpath_args);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 375;
			this.ws();
			this.state = 376;
			this.pattern();
			this.state = 380;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 35, this._ctx) ) {
			case 1:
				{
				this.state = 377;
				this.ws();
				this.state = 378;
				this.expressions();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assignment(): AssignmentContext {
		let _localctx: AssignmentContext = new AssignmentContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, cbuildParser.RULE_assignment);
		let _la: number;
		try {
			this.state = 402;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 40, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 382;
				this.pattern();
				this.state = 384;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 383;
					this.ws();
					}
				}

				this.state = 386;
				this.match(cbuildParser.ASSIGN_OP);
				this.state = 388;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
				case 1:
					{
					this.state = 387;
					this.exprs_in_assign();
					}
					break;
				}
				this.state = 390;
				this.comment_opt();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 392;
				this.assignment_prefix();
				this.state = 394;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 393;
					this.ws();
					}
				}

				this.state = 396;
				this.match(cbuildParser.ASSIGN_OP);
				this.state = 398;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
				case 1:
					{
					this.state = 397;
					this.exprs_in_assign();
					}
					break;
				}
				this.state = 400;
				this.comment_opt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assignment_prefix(): Assignment_prefixContext {
		let _localctx: Assignment_prefixContext = new Assignment_prefixContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, cbuildParser.RULE_assignment_prefix);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 404;
			this.specifiers();
			this.state = 405;
			this.ws();
			this.state = 406;
			this.pattern();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public if_eq_kw(): If_eq_kwContext {
		let _localctx: If_eq_kwContext = new If_eq_kwContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, cbuildParser.RULE_if_eq_kw);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 408;
			_la = this._input.LA(1);
			if (!(_la === cbuildParser.IFEQ || _la === cbuildParser.IFNEQ)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public if_def_kw(): If_def_kwContext {
		let _localctx: If_def_kwContext = new If_def_kwContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, cbuildParser.RULE_if_def_kw);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 410;
			_la = this._input.LA(1);
			if (!(_la === cbuildParser.IFDEF || _la === cbuildParser.IFNDEF)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public include_kw(): Include_kwContext {
		let _localctx: Include_kwContext = new Include_kwContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, cbuildParser.RULE_include_kw);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 412;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.INCLUDE) | (1 << cbuildParser.DASH_INCLUDE) | (1 << cbuildParser.SINCLUDE))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public condition(): ConditionContext {
		let _localctx: ConditionContext = new ConditionContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, cbuildParser.RULE_condition);
		let _la: number;
		try {
			this.state = 425;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case cbuildParser.LPAREN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 414;
				this.match(cbuildParser.LPAREN);
				this.state = 415;
				this.expressions_opt();
				this.state = 416;
				this.match(cbuildParser.COMMA);
				this.state = 417;
				this.expressions_opt();
				this.state = 418;
				this.match(cbuildParser.RPAREN);
				}
				break;
			case cbuildParser.SLIT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 420;
				this.match(cbuildParser.SLIT);
				this.state = 422;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 421;
					this.ws();
					}
				}

				this.state = 424;
				this.match(cbuildParser.SLIT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressions_opt(): Expressions_optContext {
		let _localctx: Expressions_optContext = new Expressions_optContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, cbuildParser.RULE_expressions_opt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 428;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.ASSIGN_OP) | (1 << cbuildParser.DOLLAR_LPAREN) | (1 << cbuildParser.DOLLAR_L_CURLY_BRACE) | (1 << cbuildParser.VAR) | (1 << cbuildParser.DOUBLE_DOLLAR) | (1 << cbuildParser.COLON) | (1 << cbuildParser.LPAREN))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (cbuildParser.SLIT - 32)) | (1 << (cbuildParser.CHARS - 32)) | (1 << (cbuildParser.WS - 32)) | (1 << (cbuildParser.TAB - 32)))) !== 0)) {
				{
				this.state = 427;
				this.expressions();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressions(): ExpressionsContext {
		let _localctx: ExpressionsContext = new ExpressionsContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, cbuildParser.RULE_expressions);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 431;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
				{
				this.state = 430;
				this.ws();
				}
			}

			this.state = 433;
			this.expression();
			this.state = 435;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 45, this._ctx) ) {
			case 1:
				{
				this.state = 434;
				this.ws();
				}
				break;
			}
			this.state = 442;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 46, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 437;
					this.ws();
					this.state = 438;
					this.expression();
					}
					}
				}
				this.state = 444;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 46, this._ctx);
			}
			this.state = 446;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 47, this._ctx) ) {
			case 1:
				{
				this.state = 445;
				this.ws();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public exprs_nested(): Exprs_nestedContext {
		let _localctx: Exprs_nestedContext = new Exprs_nestedContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, cbuildParser.RULE_exprs_nested);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 449;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
				{
				this.state = 448;
				this.ws();
				}
			}

			this.state = 451;
			this.expr_nested();
			this.state = 453;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 49, this._ctx) ) {
			case 1:
				{
				this.state = 452;
				this.ws();
				}
				break;
			}
			this.state = 460;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 50, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 455;
					this.ws();
					this.state = 456;
					this.expr_nested();
					}
					}
				}
				this.state = 462;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 50, this._ctx);
			}
			this.state = 464;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
				{
				this.state = 463;
				this.ws();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public exprs_in_assign(): Exprs_in_assignContext {
		let _localctx: Exprs_in_assignContext = new Exprs_in_assignContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, cbuildParser.RULE_exprs_in_assign);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 467;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
				{
				this.state = 466;
				this.ws();
				}
			}

			this.state = 469;
			this.expr_in_assign();
			this.state = 471;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 53, this._ctx) ) {
			case 1:
				{
				this.state = 470;
				this.ws();
				}
				break;
			}
			this.state = 478;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 54, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 473;
					this.ws();
					this.state = 474;
					this.expr_in_assign();
					}
					}
				}
				this.state = 480;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 54, this._ctx);
			}
			this.state = 482;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 55, this._ctx) ) {
			case 1:
				{
				this.state = 481;
				this.ws();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public exprs_in_recipe(): Exprs_in_recipeContext {
		let _localctx: Exprs_in_recipeContext = new Exprs_in_recipeContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, cbuildParser.RULE_exprs_in_recipe);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 485;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
				{
				this.state = 484;
				this.ws();
				}
			}

			this.state = 487;
			this.expr_in_recipe();
			this.state = 489;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 57, this._ctx) ) {
			case 1:
				{
				this.state = 488;
				this.ws();
				}
				break;
			}
			this.state = 496;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 58, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 491;
					this.ws();
					this.state = 492;
					this.expr_in_recipe();
					}
					}
				}
				this.state = 498;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 58, this._ctx);
			}
			this.state = 500;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
				{
				this.state = 499;
				this.ws();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public exprs_in_def(): Exprs_in_defContext {
		let _localctx: Exprs_in_defContext = new Exprs_in_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, cbuildParser.RULE_exprs_in_def);
		let _la: number;
		try {
			let _alt: number;
			this.state = 519;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 63, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 502;
				this.br();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 504;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.NL) {
					{
					this.state = 503;
					this.br();
					}
				}

				this.state = 506;
				this.first_expr_in_def();
				this.state = 516;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 62, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						this.state = 514;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 61, this._ctx) ) {
						case 1:
							{
							{
							this.state = 507;
							this.br();
							this.state = 508;
							this.first_expr_in_def();
							}
							}
							break;

						case 2:
							{
							{
							this.state = 510;
							this.br();
							}
							}
							break;

						case 3:
							{
							{
							this.state = 511;
							this.ws();
							this.state = 512;
							this.expr_in_recipe();
							}
							}
							break;
						}
						}
					}
					this.state = 518;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 62, this._ctx);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public first_expr_in_def(): First_expr_in_defContext {
		let _localctx: First_expr_in_defContext = new First_expr_in_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, cbuildParser.RULE_first_expr_in_def);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 523;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
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
				this.state = 521;
				this.char_in_def();
				}
				break;
			case cbuildParser.DOLLAR_LPAREN:
			case cbuildParser.DOLLAR_L_CURLY_BRACE:
			case cbuildParser.VAR:
				{
				this.state = 522;
				this.function();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 526;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.ASSIGN_OP) | (1 << cbuildParser.DOLLAR_LPAREN) | (1 << cbuildParser.DOLLAR_L_CURLY_BRACE) | (1 << cbuildParser.VAR) | (1 << cbuildParser.DOUBLE_DOLLAR) | (1 << cbuildParser.COLON) | (1 << cbuildParser.LPAREN) | (1 << cbuildParser.RPAREN) | (1 << cbuildParser.COMMA) | (1 << cbuildParser.PIPE) | (1 << cbuildParser.INCLUDE) | (1 << cbuildParser.ENDEF) | (1 << cbuildParser.IFDEF) | (1 << cbuildParser.IFNDEF) | (1 << cbuildParser.IFEQ) | (1 << cbuildParser.IFNEQ) | (1 << cbuildParser.ELSE) | (1 << cbuildParser.ENDIF) | (1 << cbuildParser.OVERRIDE) | (1 << cbuildParser.EXPORT) | (1 << cbuildParser.UNEXPORT) | (1 << cbuildParser.UNDEFINE) | (1 << cbuildParser.DEFINE) | (1 << cbuildParser.VPATH))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (cbuildParser.SLIT - 32)) | (1 << (cbuildParser.CHARS - 32)) | (1 << (cbuildParser.COMMENT - 32)))) !== 0)) {
				{
				this.state = 525;
				this.expr_in_recipe();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, cbuildParser.RULE_expression);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 529;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 528;
					this.expression_atom();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 531;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 66, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression_atom(): Expression_atomContext {
		let _localctx: Expression_atomContext = new Expression_atomContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, cbuildParser.RULE_expression_atom);
		try {
			this.state = 539;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case cbuildParser.ASSIGN_OP:
			case cbuildParser.DOUBLE_DOLLAR:
			case cbuildParser.COLON:
			case cbuildParser.SLIT:
			case cbuildParser.CHARS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 533;
				this.text();
				}
				break;
			case cbuildParser.DOLLAR_LPAREN:
			case cbuildParser.DOLLAR_L_CURLY_BRACE:
			case cbuildParser.VAR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 534;
				this.function();
				}
				break;
			case cbuildParser.LPAREN:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 535;
				this.match(cbuildParser.LPAREN);
				this.state = 536;
				this.exprs_nested();
				this.state = 537;
				this.match(cbuildParser.RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr_nested(): Expr_nestedContext {
		let _localctx: Expr_nestedContext = new Expr_nestedContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, cbuildParser.RULE_expr_nested);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 542;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 541;
				this.expr_nested_atom();
				}
				}
				this.state = 544;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.ASSIGN_OP) | (1 << cbuildParser.DOLLAR_LPAREN) | (1 << cbuildParser.DOLLAR_L_CURLY_BRACE) | (1 << cbuildParser.VAR) | (1 << cbuildParser.DOUBLE_DOLLAR) | (1 << cbuildParser.COLON) | (1 << cbuildParser.LPAREN) | (1 << cbuildParser.COMMA))) !== 0) || _la === cbuildParser.SLIT || _la === cbuildParser.CHARS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr_nested_atom(): Expr_nested_atomContext {
		let _localctx: Expr_nested_atomContext = new Expr_nested_atomContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, cbuildParser.RULE_expr_nested_atom);
		try {
			this.state = 552;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case cbuildParser.ASSIGN_OP:
			case cbuildParser.DOUBLE_DOLLAR:
			case cbuildParser.COLON:
			case cbuildParser.COMMA:
			case cbuildParser.SLIT:
			case cbuildParser.CHARS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 546;
				this.text_nested();
				}
				break;
			case cbuildParser.DOLLAR_LPAREN:
			case cbuildParser.DOLLAR_L_CURLY_BRACE:
			case cbuildParser.VAR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 547;
				this.function();
				}
				break;
			case cbuildParser.LPAREN:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 548;
				this.match(cbuildParser.LPAREN);
				this.state = 549;
				this.exprs_nested();
				this.state = 550;
				this.match(cbuildParser.RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr_in_assign(): Expr_in_assignContext {
		let _localctx: Expr_in_assignContext = new Expr_in_assignContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, cbuildParser.RULE_expr_in_assign);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 555;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 554;
					this.expr_in_assign_atom();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 557;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 70, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr_in_assign_atom(): Expr_in_assign_atomContext {
		let _localctx: Expr_in_assign_atomContext = new Expr_in_assign_atomContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, cbuildParser.RULE_expr_in_assign_atom);
		try {
			this.state = 561;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
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
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 559;
				this.text_in_assign();
				}
				break;
			case cbuildParser.DOLLAR_LPAREN:
			case cbuildParser.DOLLAR_L_CURLY_BRACE:
			case cbuildParser.VAR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 560;
				this.function();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr_in_recipe(): Expr_in_recipeContext {
		let _localctx: Expr_in_recipeContext = new Expr_in_recipeContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, cbuildParser.RULE_expr_in_recipe);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 564;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 563;
				this.expr_in_recipe_atom();
				}
				}
				this.state = 566;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.ASSIGN_OP) | (1 << cbuildParser.DOLLAR_LPAREN) | (1 << cbuildParser.DOLLAR_L_CURLY_BRACE) | (1 << cbuildParser.VAR) | (1 << cbuildParser.DOUBLE_DOLLAR) | (1 << cbuildParser.COLON) | (1 << cbuildParser.LPAREN) | (1 << cbuildParser.RPAREN) | (1 << cbuildParser.COMMA) | (1 << cbuildParser.PIPE) | (1 << cbuildParser.INCLUDE) | (1 << cbuildParser.ENDEF) | (1 << cbuildParser.IFDEF) | (1 << cbuildParser.IFNDEF) | (1 << cbuildParser.IFEQ) | (1 << cbuildParser.IFNEQ) | (1 << cbuildParser.ELSE) | (1 << cbuildParser.ENDIF) | (1 << cbuildParser.OVERRIDE) | (1 << cbuildParser.EXPORT) | (1 << cbuildParser.UNEXPORT) | (1 << cbuildParser.UNDEFINE) | (1 << cbuildParser.DEFINE) | (1 << cbuildParser.VPATH))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (cbuildParser.SLIT - 32)) | (1 << (cbuildParser.CHARS - 32)) | (1 << (cbuildParser.COMMENT - 32)))) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr_in_recipe_atom(): Expr_in_recipe_atomContext {
		let _localctx: Expr_in_recipe_atomContext = new Expr_in_recipe_atomContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, cbuildParser.RULE_expr_in_recipe_atom);
		try {
			this.state = 570;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
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
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 568;
				this.text_in_recipe();
				}
				break;
			case cbuildParser.DOLLAR_LPAREN:
			case cbuildParser.DOLLAR_L_CURLY_BRACE:
			case cbuildParser.VAR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 569;
				this.function();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function(): FunctionContext {
		let _localctx: FunctionContext = new FunctionContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, cbuildParser.RULE_function);
		try {
			this.state = 629;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 74, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 572;
				this.match(cbuildParser.VAR);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 573;
				this.match(cbuildParser.DOLLAR_LPAREN);
				this.state = 574;
				this.function_name();
				this.state = 575;
				this.match(cbuildParser.RPAREN);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 577;
				this.match(cbuildParser.DOLLAR_LPAREN);
				this.state = 578;
				this.function_name();
				this.state = 579;
				this.ws();
				this.state = 580;
				this.arguments();
				this.state = 581;
				this.match(cbuildParser.RPAREN);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 583;
				this.match(cbuildParser.DOLLAR_LPAREN);
				this.state = 584;
				this.function_name();
				this.state = 585;
				this.match(cbuildParser.COMMA);
				this.state = 586;
				this.arguments();
				this.state = 587;
				this.match(cbuildParser.RPAREN);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 589;
				this.match(cbuildParser.DOLLAR_LPAREN);
				this.state = 590;
				this.function_name();
				this.state = 591;
				this.match(cbuildParser.COLON);
				this.state = 592;
				this.expressions();
				this.state = 593;
				this.match(cbuildParser.RPAREN);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 595;
				this.match(cbuildParser.DOLLAR_LPAREN);
				this.state = 596;
				this.function_name();
				this.state = 597;
				this.match(cbuildParser.ASSIGN_OP);
				this.state = 598;
				this.expressions();
				this.state = 599;
				this.match(cbuildParser.RPAREN);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 601;
				this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
				this.state = 602;
				this.function_name();
				this.state = 603;
				this.match(cbuildParser.R_CURLY_BRACE);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 605;
				this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
				this.state = 606;
				this.function_name();
				this.state = 607;
				this.ws();
				this.state = 608;
				this.arguments();
				this.state = 609;
				this.match(cbuildParser.R_CURLY_BRACE);
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 611;
				this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
				this.state = 612;
				this.function_name();
				this.state = 613;
				this.match(cbuildParser.COMMA);
				this.state = 614;
				this.arguments();
				this.state = 615;
				this.match(cbuildParser.R_CURLY_BRACE);
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 617;
				this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
				this.state = 618;
				this.function_name();
				this.state = 619;
				this.match(cbuildParser.COLON);
				this.state = 620;
				this.expressions();
				this.state = 621;
				this.match(cbuildParser.R_CURLY_BRACE);
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 623;
				this.match(cbuildParser.DOLLAR_L_CURLY_BRACE);
				this.state = 624;
				this.function_name();
				this.state = 625;
				this.match(cbuildParser.ASSIGN_OP);
				this.state = 626;
				this.expressions();
				this.state = 627;
				this.match(cbuildParser.R_CURLY_BRACE);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_name(): Function_nameContext {
		let _localctx: Function_nameContext = new Function_nameContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, cbuildParser.RULE_function_name);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 632;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 631;
				this.function_name_atom();
				}
				}
				this.state = 634;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.DOLLAR_LPAREN) | (1 << cbuildParser.DOLLAR_L_CURLY_BRACE) | (1 << cbuildParser.VAR))) !== 0) || _la === cbuildParser.CHARS);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public function_name_atom(): Function_name_atomContext {
		let _localctx: Function_name_atomContext = new Function_name_atomContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, cbuildParser.RULE_function_name_atom);
		try {
			this.state = 638;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case cbuildParser.CHARS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 636;
				this.match(cbuildParser.CHARS);
				}
				break;
			case cbuildParser.DOLLAR_LPAREN:
			case cbuildParser.DOLLAR_L_CURLY_BRACE:
			case cbuildParser.VAR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 637;
				this.function();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arguments(): ArgumentsContext {
		let _localctx: ArgumentsContext = new ArgumentsContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, cbuildParser.RULE_arguments);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 641;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.ASSIGN_OP) | (1 << cbuildParser.DOLLAR_LPAREN) | (1 << cbuildParser.DOLLAR_L_CURLY_BRACE) | (1 << cbuildParser.VAR) | (1 << cbuildParser.DOUBLE_DOLLAR) | (1 << cbuildParser.COLON) | (1 << cbuildParser.LPAREN))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (cbuildParser.SLIT - 32)) | (1 << (cbuildParser.CHARS - 32)) | (1 << (cbuildParser.WS - 32)) | (1 << (cbuildParser.TAB - 32)))) !== 0)) {
				{
				this.state = 640;
				this.argument();
				}
			}

			this.state = 649;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === cbuildParser.COMMA) {
				{
				{
				this.state = 643;
				this.match(cbuildParser.COMMA);
				this.state = 645;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.ASSIGN_OP) | (1 << cbuildParser.DOLLAR_LPAREN) | (1 << cbuildParser.DOLLAR_L_CURLY_BRACE) | (1 << cbuildParser.VAR) | (1 << cbuildParser.DOUBLE_DOLLAR) | (1 << cbuildParser.COLON) | (1 << cbuildParser.LPAREN))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (cbuildParser.SLIT - 32)) | (1 << (cbuildParser.CHARS - 32)) | (1 << (cbuildParser.WS - 32)) | (1 << (cbuildParser.TAB - 32)))) !== 0)) {
					{
					this.state = 644;
					this.argument();
					}
				}

				}
				}
				this.state = 651;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public argument(): ArgumentContext {
		let _localctx: ArgumentContext = new ArgumentContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, cbuildParser.RULE_argument);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 652;
			this.expressions();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rule(): RuleContext {
		let _localctx: RuleContext = new RuleContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, cbuildParser.RULE_rule);
		let _la: number;
		try {
			this.state = 695;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 90, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 654;
				this.static_pattern_rule();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 655;
				this.targets();
				this.state = 657;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 656;
					this.ws();
					}
				}

				this.state = 659;
				this.colon();
				this.state = 661;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 81, this._ctx) ) {
				case 1:
					{
					this.state = 660;
					this.ws();
					}
					break;
				}
				this.state = 663;
				this.prerequisites();
				this.state = 672;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 84, this._ctx) ) {
				case 1:
					{
					this.state = 665;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
						{
						this.state = 664;
						this.ws();
						}
					}

					this.state = 667;
					this.match(cbuildParser.PIPE);
					this.state = 669;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 83, this._ctx) ) {
					case 1:
						{
						this.state = 668;
						this.ws();
						}
						break;
					}
					this.state = 671;
					this.orderonlyprerequisites();
					}
					break;
				}
				this.state = 675;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 674;
					this.ws();
					}
				}

				this.state = 677;
				this.match(cbuildParser.NL);
				this.state = 679;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 86, this._ctx) ) {
				case 1:
					{
					this.state = 678;
					this.recipes();
					}
					break;
				}
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 681;
				this.targets();
				this.state = 683;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 682;
					this.ws();
					}
				}

				this.state = 685;
				this.colon();
				this.state = 687;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 686;
					this.ws();
					}
				}

				this.state = 689;
				this.assignment();
				this.state = 691;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 690;
					this.ws();
					}
				}

				this.state = 693;
				this.match(cbuildParser.NL);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public static_pattern_rule(): Static_pattern_ruleContext {
		let _localctx: Static_pattern_ruleContext = new Static_pattern_ruleContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, cbuildParser.RULE_static_pattern_rule);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 697;
			this.targets();
			this.state = 699;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
				{
				this.state = 698;
				this.ws();
				}
			}

			this.state = 701;
			this.colon();
			this.state = 703;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
				{
				this.state = 702;
				this.ws();
				}
			}

			this.state = 705;
			this.pattern();
			this.state = 707;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
				{
				this.state = 706;
				this.ws();
				}
			}

			this.state = 709;
			this.colon();
			this.state = 711;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 94, this._ctx) ) {
			case 1:
				{
				this.state = 710;
				this.ws();
				}
				break;
			}
			this.state = 713;
			this.prerequisites();
			this.state = 722;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 97, this._ctx) ) {
			case 1:
				{
				this.state = 715;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 714;
					this.ws();
					}
				}

				this.state = 717;
				this.match(cbuildParser.PIPE);
				this.state = 719;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 96, this._ctx) ) {
				case 1:
					{
					this.state = 718;
					this.ws();
					}
					break;
				}
				this.state = 721;
				this.orderonlyprerequisites();
				}
				break;
			}
			this.state = 725;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
				{
				this.state = 724;
				this.ws();
				}
			}

			this.state = 727;
			this.match(cbuildParser.NL);
			this.state = 729;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 99, this._ctx) ) {
			case 1:
				{
				this.state = 728;
				this.recipes();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public target(): TargetContext {
		let _localctx: TargetContext = new TargetContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, cbuildParser.RULE_target);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 731;
			this.pattern();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pattern(): PatternContext {
		let _localctx: PatternContext = new PatternContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, cbuildParser.RULE_pattern);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 735;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					this.state = 735;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
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
						this.state = 733;
						this.identifier();
						}
						break;
					case cbuildParser.DOLLAR_LPAREN:
					case cbuildParser.DOLLAR_L_CURLY_BRACE:
					case cbuildParser.VAR:
						{
						this.state = 734;
						this.function();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 737;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 101, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public prerequisites(): PrerequisitesContext {
		let _localctx: PrerequisitesContext = new PrerequisitesContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, cbuildParser.RULE_prerequisites);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 740;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.DOLLAR_LPAREN) | (1 << cbuildParser.DOLLAR_L_CURLY_BRACE) | (1 << cbuildParser.VAR) | (1 << cbuildParser.LPAREN) | (1 << cbuildParser.RPAREN) | (1 << cbuildParser.COMMA) | (1 << cbuildParser.INCLUDE) | (1 << cbuildParser.ENDEF) | (1 << cbuildParser.IFDEF) | (1 << cbuildParser.IFNDEF) | (1 << cbuildParser.IFEQ) | (1 << cbuildParser.IFNEQ) | (1 << cbuildParser.ELSE) | (1 << cbuildParser.ENDIF) | (1 << cbuildParser.OVERRIDE) | (1 << cbuildParser.EXPORT) | (1 << cbuildParser.UNEXPORT) | (1 << cbuildParser.UNDEFINE) | (1 << cbuildParser.DEFINE) | (1 << cbuildParser.VPATH))) !== 0) || _la === cbuildParser.CHARS) {
				{
				this.state = 739;
				this.targets();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public orderonlyprerequisites(): OrderonlyprerequisitesContext {
		let _localctx: OrderonlyprerequisitesContext = new OrderonlyprerequisitesContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, cbuildParser.RULE_orderonlyprerequisites);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 743;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.DOLLAR_LPAREN) | (1 << cbuildParser.DOLLAR_L_CURLY_BRACE) | (1 << cbuildParser.VAR) | (1 << cbuildParser.LPAREN) | (1 << cbuildParser.RPAREN) | (1 << cbuildParser.COMMA) | (1 << cbuildParser.INCLUDE) | (1 << cbuildParser.ENDEF) | (1 << cbuildParser.IFDEF) | (1 << cbuildParser.IFNDEF) | (1 << cbuildParser.IFEQ) | (1 << cbuildParser.IFNEQ) | (1 << cbuildParser.ELSE) | (1 << cbuildParser.ENDIF) | (1 << cbuildParser.OVERRIDE) | (1 << cbuildParser.EXPORT) | (1 << cbuildParser.UNEXPORT) | (1 << cbuildParser.UNDEFINE) | (1 << cbuildParser.DEFINE) | (1 << cbuildParser.VPATH))) !== 0) || _la === cbuildParser.CHARS) {
				{
				this.state = 742;
				this.targets();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public targets(): TargetsContext {
		let _localctx: TargetsContext = new TargetsContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, cbuildParser.RULE_targets);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 745;
			this.target();
			this.state = 751;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 104, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 746;
					this.ws();
					this.state = 747;
					this.target();
					}
					}
				}
				this.state = 753;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 104, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public recipes(): RecipesContext {
		let _localctx: RecipesContext = new RecipesContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, cbuildParser.RULE_recipes);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 755;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 754;
					this.recipe();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 757;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 105, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public recipes_opt(): Recipes_optContext {
		let _localctx: Recipes_optContext = new Recipes_optContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, cbuildParser.RULE_recipes_opt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 759;
			this.comment_opt();
			this.state = 761;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 20)) & ~0x1F) === 0 && ((1 << (_la - 20)) & ((1 << (cbuildParser.IFDEF - 20)) | (1 << (cbuildParser.IFNDEF - 20)) | (1 << (cbuildParser.IFEQ - 20)) | (1 << (cbuildParser.IFNEQ - 20)) | (1 << (cbuildParser.NL - 20)) | (1 << (cbuildParser.LEADING_TAB - 20)) | (1 << (cbuildParser.WS - 20)) | (1 << (cbuildParser.TAB - 20)) | (1 << (cbuildParser.COMMENT - 20)))) !== 0)) {
				{
				this.state = 760;
				this.recipes();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public recipe(): RecipeContext {
		let _localctx: RecipeContext = new RecipeContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, cbuildParser.RULE_recipe);
		let _la: number;
		try {
			this.state = 783;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 110, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 763;
				this.match(cbuildParser.LEADING_TAB);
				this.state = 765;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 107, this._ctx) ) {
				case 1:
					{
					this.state = 764;
					this.ws();
					}
					break;
				}
				this.state = 767;
				this.exprs_in_recipe();
				this.state = 768;
				this.match(cbuildParser.NL);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 770;
				this.match(cbuildParser.LEADING_TAB);
				this.state = 772;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 771;
					this.ws();
					}
				}

				this.state = 774;
				this.match(cbuildParser.COMMENT);
				this.state = 775;
				this.match(cbuildParser.NL);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 777;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === cbuildParser.WS || _la === cbuildParser.TAB) {
					{
					this.state = 776;
					this.ws();
					}
				}

				this.state = 779;
				this.match(cbuildParser.COMMENT);
				this.state = 780;
				this.match(cbuildParser.NL);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 781;
				this.conditional_in_recipe();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 782;
				this.match(cbuildParser.NL);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public specifiers(): SpecifiersContext {
		let _localctx: SpecifiersContext = new SpecifiersContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, cbuildParser.RULE_specifiers);
		try {
			this.state = 805;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 111, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 785;
				this.match(cbuildParser.OVERRIDE);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 786;
				this.match(cbuildParser.EXPORT);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 787;
				this.match(cbuildParser.UNEXPORT);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 788;
				this.match(cbuildParser.OVERRIDE);
				this.state = 789;
				this.ws();
				this.state = 790;
				this.match(cbuildParser.EXPORT);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 792;
				this.match(cbuildParser.EXPORT);
				this.state = 793;
				this.ws();
				this.state = 794;
				this.match(cbuildParser.OVERRIDE);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 796;
				this.match(cbuildParser.UNDEFINE);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 797;
				this.match(cbuildParser.OVERRIDE);
				this.state = 798;
				this.ws();
				this.state = 799;
				this.match(cbuildParser.UNDEFINE);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 801;
				this.match(cbuildParser.UNDEFINE);
				this.state = 802;
				this.ws();
				this.state = 803;
				this.match(cbuildParser.OVERRIDE);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, cbuildParser.RULE_identifier);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 808;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 807;
					this.identifier_atom();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 810;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 112, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier_atom(): Identifier_atomContext {
		let _localctx: Identifier_atomContext = new Identifier_atomContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, cbuildParser.RULE_identifier_atom);
		try {
			this.state = 817;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case cbuildParser.CHARS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 812;
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
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 813;
				this.keywords();
				}
				break;
			case cbuildParser.COMMA:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 814;
				this.match(cbuildParser.COMMA);
				}
				break;
			case cbuildParser.LPAREN:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 815;
				this.match(cbuildParser.LPAREN);
				}
				break;
			case cbuildParser.RPAREN:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 816;
				this.match(cbuildParser.RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public br(): BrContext {
		let _localctx: BrContext = new BrContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, cbuildParser.RULE_br);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 819;
			this.match(cbuildParser.NL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public char(): CharContext {
		let _localctx: CharContext = new CharContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, cbuildParser.RULE_char);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 821;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.ASSIGN_OP) | (1 << cbuildParser.DOUBLE_DOLLAR) | (1 << cbuildParser.COLON))) !== 0) || _la === cbuildParser.SLIT || _la === cbuildParser.CHARS)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public char_nested(): Char_nestedContext {
		let _localctx: Char_nestedContext = new Char_nestedContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, cbuildParser.RULE_char_nested);
		try {
			this.state = 825;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case cbuildParser.ASSIGN_OP:
			case cbuildParser.DOUBLE_DOLLAR:
			case cbuildParser.COLON:
			case cbuildParser.SLIT:
			case cbuildParser.CHARS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 823;
				this.char();
				}
				break;
			case cbuildParser.COMMA:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 824;
				this.match(cbuildParser.COMMA);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public char_in_assign(): Char_in_assignContext {
		let _localctx: Char_in_assignContext = new Char_in_assignContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, cbuildParser.RULE_char_in_assign);
		try {
			this.state = 832;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 115, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 827;
				this.char_nested();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 828;
				this.match(cbuildParser.DOUBLE_DOLLAR);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 829;
				this.match(cbuildParser.LPAREN);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 830;
				this.match(cbuildParser.RPAREN);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 831;
				this.keywords();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public char_in_def(): Char_in_defContext {
		let _localctx: Char_in_defContext = new Char_in_defContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, cbuildParser.RULE_char_in_def);
		try {
			this.state = 851;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case cbuildParser.ASSIGN_OP:
			case cbuildParser.DOUBLE_DOLLAR:
			case cbuildParser.COLON:
			case cbuildParser.SLIT:
			case cbuildParser.CHARS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 834;
				this.char();
				}
				break;
			case cbuildParser.LPAREN:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 835;
				this.match(cbuildParser.LPAREN);
				}
				break;
			case cbuildParser.RPAREN:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 836;
				this.match(cbuildParser.RPAREN);
				}
				break;
			case cbuildParser.COMMA:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 837;
				this.match(cbuildParser.COMMA);
				}
				break;
			case cbuildParser.COMMENT:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 838;
				this.match(cbuildParser.COMMENT);
				}
				break;
			case cbuildParser.INCLUDE:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 839;
				this.match(cbuildParser.INCLUDE);
				}
				break;
			case cbuildParser.OVERRIDE:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 840;
				this.match(cbuildParser.OVERRIDE);
				}
				break;
			case cbuildParser.EXPORT:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 841;
				this.match(cbuildParser.EXPORT);
				}
				break;
			case cbuildParser.UNEXPORT:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 842;
				this.match(cbuildParser.UNEXPORT);
				}
				break;
			case cbuildParser.IFDEF:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 843;
				this.match(cbuildParser.IFDEF);
				}
				break;
			case cbuildParser.IFNDEF:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 844;
				this.match(cbuildParser.IFNDEF);
				}
				break;
			case cbuildParser.IFEQ:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 845;
				this.match(cbuildParser.IFEQ);
				}
				break;
			case cbuildParser.IFNEQ:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 846;
				this.match(cbuildParser.IFNEQ);
				}
				break;
			case cbuildParser.ELSE:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 847;
				this.match(cbuildParser.ELSE);
				}
				break;
			case cbuildParser.ENDIF:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 848;
				this.match(cbuildParser.ENDIF);
				}
				break;
			case cbuildParser.DEFINE:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 849;
				this.match(cbuildParser.DEFINE);
				}
				break;
			case cbuildParser.UNDEFINE:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 850;
				this.match(cbuildParser.UNDEFINE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public char_in_recipe(): Char_in_recipeContext {
		let _localctx: Char_in_recipeContext = new Char_in_recipeContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, cbuildParser.RULE_char_in_recipe);
		try {
			this.state = 857;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 117, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 853;
				this.char_in_assign();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 854;
				this.match(cbuildParser.DOUBLE_DOLLAR);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 855;
				this.match(cbuildParser.COMMENT);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 856;
				this.match(cbuildParser.PIPE);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public text(): TextContext {
		let _localctx: TextContext = new TextContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, cbuildParser.RULE_text);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 860;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 859;
					this.char();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 862;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 118, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public text_nested(): Text_nestedContext {
		let _localctx: Text_nestedContext = new Text_nestedContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, cbuildParser.RULE_text_nested);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 865;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 864;
					this.char_nested();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 867;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 119, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public text_in_assign(): Text_in_assignContext {
		let _localctx: Text_in_assignContext = new Text_in_assignContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, cbuildParser.RULE_text_in_assign);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 870;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 869;
					this.char_in_assign();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 872;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 120, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public text_in_recipe(): Text_in_recipeContext {
		let _localctx: Text_in_recipeContext = new Text_in_recipeContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, cbuildParser.RULE_text_in_recipe);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 875;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 874;
					this.char_in_recipe();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 877;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 121, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public keywords(): KeywordsContext {
		let _localctx: KeywordsContext = new KeywordsContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, cbuildParser.RULE_keywords);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 879;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.INCLUDE) | (1 << cbuildParser.ENDEF) | (1 << cbuildParser.IFDEF) | (1 << cbuildParser.IFNDEF) | (1 << cbuildParser.IFEQ) | (1 << cbuildParser.IFNEQ) | (1 << cbuildParser.ELSE) | (1 << cbuildParser.ENDIF) | (1 << cbuildParser.OVERRIDE) | (1 << cbuildParser.EXPORT) | (1 << cbuildParser.UNEXPORT) | (1 << cbuildParser.UNDEFINE) | (1 << cbuildParser.DEFINE) | (1 << cbuildParser.VPATH))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public colon(): ColonContext {
		let _localctx: ColonContext = new ColonContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, cbuildParser.RULE_colon);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 881;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << cbuildParser.GROUPED_DOUBLE_COLON) | (1 << cbuildParser.GROUPED_COLON) | (1 << cbuildParser.DOUBLE_COLON) | (1 << cbuildParser.COLON))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public comment_opt(): Comment_optContext {
		let _localctx: Comment_optContext = new Comment_optContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, cbuildParser.RULE_comment_opt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 884;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 122, this._ctx) ) {
			case 1:
				{
				this.state = 883;
				this.match(cbuildParser.COMMENT);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ws(): WsContext {
		let _localctx: WsContext = new WsContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, cbuildParser.RULE_ws);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 886;
			_la = this._input.LA(1);
			if (!(_la === cbuildParser.WS || _la === cbuildParser.TAB)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03*\u037B\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x05\x02\x89\n\x02\x03\x03\x03\x03\x07\x03\x8D\n\x03\f\x03\x0E\x03" +
		"\x90\v\x03\x03\x04\x03\x04\x05\x04\x94\n\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04\x9E\n\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04" +
		"\xAA\n\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05" +
		"\x04\xB3\n\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04" +
		"\x03\x04\x05\x04\xBD\n\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04\xC9\n\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x04\x03\x04\x05\x04\xD0\n\x04\x03\x05\x03\x05\x05\x05\xD4" +
		"\n\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05" +
		"\x05\x05\xDE\n\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05\xEB\n\x05\x03\x05\x03\x05" +
		"\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05\xF6\n" +
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05" +
		"\x05\u0100\n\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05" +
		"\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05\u010D\n\x05\x03\x05\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05\u0116\n\x05\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x07\x05\x07\u011D\n\x07\x03\x07\x03\x07\x05\x07\u0121" +
		"\n\x07\x03\x07\x03\x07\x05\x07\u0125\n\x07\x03\x07\x03\x07\x05\x07\u0129" +
		"\n\x07\x03\x07\x03\x07\x05\x07\u012D\n\x07\x03\x07\x03\x07\x03\x07\x03" +
		"\x07\x05\x07\u0133\n\x07\x03\x07\x03\x07\x05\x07\u0137\n\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x05\x07\u013D\n\x07\x03\x07\x03\x07\x03\x07\x03\x07" +
		"\x05\x07\u0143\n\x07\x03\x07\x05\x07\u0146\n\x07\x03\b\x05\b\u0149\n\b" +
		"\x03\b\x03\b\x03\b\x03\b\x05\b\u014F\n\b\x03\b\x05\b\u0152\n\b\x03\b\x05" +
		"\b\u0155\n\b\x03\b\x03\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03" +
		"\t\x03\t\x03\t\x05\t\u0163\n\t\x03\n\x03\n\x03\n\x03\n\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x03\v\x05\v\u016F\n\v\x05\v\u0171\n\v\x03\f\x03\f\x05\f" +
		"\u0175\n\f\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x05\r\u017F" +
		"\n\r\x03\x0E\x03\x0E\x05\x0E\u0183\n\x0E\x03\x0E\x03\x0E\x05\x0E\u0187" +
		"\n\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\u018D\n\x0E\x03\x0E\x03" +
		"\x0E\x05\x0E\u0191\n\x0E\x03\x0E\x03\x0E\x05\x0E\u0195\n\x0E\x03\x0F\x03" +
		"\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03" +
		"\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13\u01A9" +
		"\n\x13\x03\x13\x05\x13\u01AC\n\x13\x03\x14\x05\x14\u01AF\n\x14\x03\x15" +
		"\x05\x15\u01B2\n\x15\x03\x15\x03\x15\x05\x15\u01B6\n\x15\x03\x15\x03\x15" +
		"\x03\x15\x07\x15\u01BB\n\x15\f\x15\x0E\x15\u01BE\v\x15\x03\x15\x05\x15" +
		"\u01C1\n\x15\x03\x16\x05\x16\u01C4\n\x16\x03\x16\x03\x16\x05\x16\u01C8" +
		"\n\x16\x03\x16\x03\x16\x03\x16\x07\x16\u01CD\n\x16\f\x16\x0E\x16\u01D0" +
		"\v\x16\x03\x16\x05\x16\u01D3\n\x16\x03\x17\x05\x17\u01D6\n\x17\x03\x17" +
		"\x03\x17\x05\x17\u01DA\n\x17\x03\x17\x03\x17\x03\x17\x07\x17\u01DF\n\x17" +
		"\f\x17\x0E\x17\u01E2\v\x17\x03\x17\x05\x17\u01E5\n\x17\x03\x18\x05\x18" +
		"\u01E8\n\x18\x03\x18\x03\x18\x05\x18\u01EC\n\x18\x03\x18\x03\x18\x03\x18" +
		"\x07\x18\u01F1\n\x18\f\x18\x0E\x18\u01F4\v\x18\x03\x18\x05\x18\u01F7\n" +
		"\x18\x03\x19\x03\x19\x05\x19\u01FB\n\x19\x03\x19\x03\x19\x03\x19\x03\x19" +
		"\x03\x19\x03\x19\x03\x19\x03\x19\x07\x19\u0205\n\x19\f\x19\x0E\x19\u0208" +
		"\v\x19\x05\x19\u020A\n\x19\x03\x1A\x03\x1A\x05\x1A\u020E\n\x1A\x03\x1A" +
		"\x05\x1A\u0211\n\x1A\x03\x1B\x06\x1B\u0214\n\x1B\r\x1B\x0E\x1B\u0215\x03" +
		"\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x05\x1C\u021E\n\x1C\x03\x1D" +
		"\x06\x1D\u0221\n\x1D\r\x1D\x0E\x1D\u0222\x03\x1E\x03\x1E\x03\x1E\x03\x1E" +
		"\x03\x1E\x03\x1E\x05\x1E\u022B\n\x1E\x03\x1F\x06\x1F\u022E\n\x1F\r\x1F" +
		"\x0E\x1F\u022F\x03 \x03 \x05 \u0234\n \x03!\x06!\u0237\n!\r!\x0E!\u0238" +
		"\x03\"\x03\"\x05\"\u023D\n\"\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03" +
		"#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03" +
		"#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03" +
		"#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03#\x03" +
		"#\x03#\x03#\x03#\x03#\x03#\x03#\x05#\u0278\n#\x03$\x06$\u027B\n$\r$\x0E" +
		"$\u027C\x03%\x03%\x05%\u0281\n%\x03&\x05&\u0284\n&\x03&\x03&\x05&\u0288" +
		"\n&\x07&\u028A\n&\f&\x0E&\u028D\v&\x03\'\x03\'\x03(\x03(\x03(\x05(\u0294" +
		"\n(\x03(\x03(\x05(\u0298\n(\x03(\x03(\x05(\u029C\n(\x03(\x03(\x05(\u02A0" +
		"\n(\x03(\x05(\u02A3\n(\x03(\x05(\u02A6\n(\x03(\x03(\x05(\u02AA\n(\x03" +
		"(\x03(\x05(\u02AE\n(\x03(\x03(\x05(\u02B2\n(\x03(\x03(\x05(\u02B6\n(\x03" +
		"(\x03(\x05(\u02BA\n(\x03)\x03)\x05)\u02BE\n)\x03)\x03)\x05)\u02C2\n)\x03" +
		")\x03)\x05)\u02C6\n)\x03)\x03)\x05)\u02CA\n)\x03)\x03)\x05)\u02CE\n)\x03" +
		")\x03)\x05)\u02D2\n)\x03)\x05)\u02D5\n)\x03)\x05)\u02D8\n)\x03)\x03)\x05" +
		")\u02DC\n)\x03*\x03*\x03+\x03+\x06+\u02E2\n+\r+\x0E+\u02E3\x03,\x05,\u02E7" +
		"\n,\x03-\x05-\u02EA\n-\x03.\x03.\x03.\x03.\x07.\u02F0\n.\f.\x0E.\u02F3" +
		"\v.\x03/\x06/\u02F6\n/\r/\x0E/\u02F7\x030\x030\x050\u02FC\n0\x031\x03" +
		"1\x051\u0300\n1\x031\x031\x031\x031\x031\x051\u0307\n1\x031\x031\x031" +
		"\x051\u030C\n1\x031\x031\x031\x031\x051\u0312\n1\x032\x032\x032\x032\x03" +
		"2\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x032\x03" +
		"2\x032\x052\u0328\n2\x033\x063\u032B\n3\r3\x0E3\u032C\x034\x034\x034\x03" +
		"4\x034\x054\u0334\n4\x035\x035\x036\x036\x037\x037\x057\u033C\n7\x038" +
		"\x038\x038\x038\x038\x058\u0343\n8\x039\x039\x039\x039\x039\x039\x039" +
		"\x039\x039\x039\x039\x039\x039\x039\x039\x039\x039\x059\u0356\n9\x03:" +
		"\x03:\x03:\x03:\x05:\u035C\n:\x03;\x06;\u035F\n;\r;\x0E;\u0360\x03<\x06" +
		"<\u0364\n<\r<\x0E<\u0365\x03=\x06=\u0369\n=\r=\x0E=\u036A\x03>\x06>\u036E" +
		"\n>\r>\x0E>\u036F\x03?\x03?\x03@\x03@\x03A\x05A\u0377\nA\x03B\x03B\x03" +
		"B\x02\x02\x02C\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02" +
		"\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02" +
		"&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02@\x02" +
		"B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02\\\x02" +
		"^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02n\x02p\x02r\x02t\x02v\x02x\x02" +
		"z\x02|\x02~\x02\x80\x02\x82\x02\x02\t\x03\x02\x18\x19\x03\x02\x16\x17" +
		"\x03\x02\x12\x14\x07\x02\x03\x03\x07\x07\v\v\"\"%%\x04\x02\x12\x12\x15" +
		"!\x03\x02\b\v\x03\x02()\x02\u03F1\x02\x88\x03\x02\x02\x02\x04\x8E\x03" +
		"\x02\x02\x02\x06\xCF\x03\x02\x02\x02\b\u0115\x03\x02\x02\x02\n\u0117\x03" +
		"\x02\x02\x02\f\u0145\x03\x02\x02\x02\x0E\u0148\x03\x02\x02\x02\x10\u0162" +
		"\x03\x02\x02\x02\x12\u0164\x03\x02\x02\x02\x14\u0170\x03\x02\x02\x02\x16" +
		"\u0172\x03\x02\x02\x02\x18\u0179\x03\x02\x02\x02\x1A\u0194\x03\x02\x02" +
		"\x02\x1C\u0196\x03\x02\x02\x02\x1E\u019A\x03\x02\x02\x02 \u019C\x03\x02" +
		"\x02\x02\"\u019E\x03\x02\x02\x02$\u01AB\x03\x02\x02\x02&\u01AE\x03\x02" +
		"\x02\x02(\u01B1\x03\x02\x02\x02*\u01C3\x03\x02\x02\x02,\u01D5\x03\x02" +
		"\x02\x02.\u01E7\x03\x02\x02\x020\u0209\x03\x02\x02\x022\u020D\x03\x02" +
		"\x02\x024\u0213\x03\x02\x02\x026\u021D\x03\x02\x02\x028\u0220\x03\x02" +
		"\x02\x02:\u022A\x03\x02\x02\x02<\u022D\x03\x02\x02\x02>\u0233\x03\x02" +
		"\x02\x02@\u0236\x03\x02\x02\x02B\u023C\x03\x02\x02\x02D\u0277\x03\x02" +
		"\x02\x02F\u027A\x03\x02\x02\x02H\u0280\x03\x02\x02\x02J\u0283\x03\x02" +
		"\x02\x02L\u028E\x03\x02\x02\x02N\u02B9\x03\x02\x02\x02P\u02BB\x03\x02" +
		"\x02\x02R\u02DD\x03\x02\x02\x02T\u02E1\x03\x02\x02\x02V\u02E6\x03\x02" +
		"\x02\x02X\u02E9\x03\x02\x02\x02Z\u02EB\x03\x02\x02\x02\\\u02F5\x03\x02" +
		"\x02\x02^\u02F9\x03\x02\x02\x02`\u0311\x03\x02\x02\x02b\u0327\x03\x02" +
		"\x02\x02d\u032A\x03\x02\x02\x02f\u0333\x03\x02\x02\x02h\u0335\x03\x02" +
		"\x02\x02j\u0337\x03\x02\x02\x02l\u033B\x03\x02\x02\x02n\u0342\x03\x02" +
		"\x02\x02p\u0355\x03\x02\x02\x02r\u035B\x03\x02\x02\x02t\u035E\x03\x02" +
		"\x02\x02v\u0363\x03\x02\x02\x02x\u0368\x03\x02\x02\x02z\u036D\x03\x02" +
		"\x02\x02|\u0371\x03\x02\x02\x02~\u0373\x03\x02\x02\x02\x80\u0376\x03\x02" +
		"\x02\x02\x82\u0378\x03\x02\x02\x02\x84\x85\x05\x04\x03\x02\x85\x86\x07" +
		"\x02\x02\x03\x86\x89\x03\x02\x02\x02\x87\x89\x07\x02\x02\x03\x88\x84\x03" +
		"\x02\x02\x02\x88\x87\x03\x02\x02\x02\x89\x03\x03\x02\x02\x02\x8A\x8D\x05" +
		"\f\x07\x02\x8B\x8D\x05h5\x02\x8C\x8A\x03\x02\x02\x02\x8C\x8B\x03\x02\x02" +
		"\x02\x8D\x90\x03\x02\x02\x02\x8E\x8C\x03\x02\x02\x02\x8E\x8F\x03\x02\x02" +
		"\x02\x8F\x05\x03\x02\x02\x02\x90\x8E\x03\x02\x02\x02\x91\x93\x05\x1E\x10" +
		"\x02\x92\x94\x05\x82B\x02\x93\x92\x03\x02\x02\x02\x93\x94\x03\x02\x02" +
		"\x02\x94\x95\x03\x02\x02\x02\x95\x96\x05$\x13\x02\x96\x97\x05\n\x06\x02" +
		"\x97\x98\x07\x1B\x02\x02\x98\x99\x05\x80A\x02\x99\x9A\x05h5\x02\x9A\xD0" +
		"\x03\x02\x02\x02\x9B\x9D\x05\x1E\x10\x02\x9C\x9E\x05\x82B\x02\x9D\x9C" +
		"\x03\x02\x02\x02\x9D\x9E\x03\x02\x02\x02\x9E\x9F\x03\x02\x02\x02\x9F\xA0" +
		"\x05$\x13\x02\xA0\xA1\x05\n\x06\x02\xA1\xA2\x07\x1A\x02\x02\xA2\xA3\x05" +
		"\n\x06\x02\xA3\xA4\x07\x1B\x02\x02\xA4\xA5\x05\x80A\x02\xA5\xA6\x05h5" +
		"\x02\xA6\xD0\x03\x02\x02\x02\xA7\xA9\x05\x1E\x10\x02\xA8\xAA\x05\x82B" +
		"\x02\xA9\xA8\x03\x02\x02\x02\xA9\xAA\x03\x02\x02\x02\xAA\xAB\x03\x02\x02" +
		"\x02\xAB\xAC\x05$\x13\x02\xAC\xAD\x05\n\x06\x02\xAD\xAE\x07\x1A\x02\x02" +
		"\xAE\xAF\x05\x06\x04\x02\xAF\xD0\x03\x02\x02\x02\xB0\xB2\x05 \x11\x02" +
		"\xB1\xB3\x05\x82B\x02\xB2\xB1\x03\x02\x02\x02\xB2\xB3\x03\x02\x02\x02" +
		"\xB3\xB4\x03\x02\x02\x02\xB4\xB5\x05d3\x02\xB5\xB6\x05\n\x06\x02\xB6\xB7" +
		"\x07\x1B\x02\x02\xB7\xB8\x05\x80A\x02\xB8\xB9\x05h5\x02\xB9\xD0\x03\x02" +
		"\x02\x02\xBA\xBC\x05 \x11\x02\xBB\xBD\x05\x82B\x02\xBC\xBB\x03\x02\x02" +
		"\x02\xBC\xBD\x03\x02\x02\x02\xBD\xBE\x03\x02\x02\x02\xBE\xBF\x05d3\x02" +
		"\xBF\xC0\x05\n\x06\x02\xC0\xC1\x07\x1A\x02\x02\xC1\xC2\x05\n\x06\x02\xC2" +
		"\xC3\x07\x1B\x02\x02\xC3\xC4\x05\x80A\x02\xC4\xC5\x05h5\x02\xC5\xD0\x03" +
		"\x02\x02\x02\xC6\xC8\x05 \x11\x02\xC7\xC9\x05\x82B\x02\xC8\xC7\x03\x02" +
		"\x02\x02\xC8\xC9\x03\x02\x02\x02\xC9\xCA\x03\x02\x02\x02\xCA\xCB\x05d" +
		"3\x02\xCB\xCC\x05\n\x06\x02\xCC\xCD\x07\x1A\x02\x02\xCD\xCE\x05\x06\x04" +
		"\x02\xCE\xD0\x03\x02\x02\x02\xCF\x91\x03\x02\x02\x02\xCF\x9B\x03\x02\x02" +
		"\x02\xCF\xA7\x03\x02\x02\x02\xCF\xB0\x03\x02\x02\x02\xCF\xBA\x03\x02\x02" +
		"\x02\xCF\xC6\x03\x02\x02\x02\xD0\x07\x03\x02\x02\x02\xD1\xD3\x05\x1E\x10" +
		"\x02\xD2\xD4\x05\x82B\x02\xD3\xD2\x03\x02\x02\x02\xD3\xD4\x03\x02\x02" +
		"\x02\xD4\xD5\x03\x02\x02\x02\xD5\xD6\x05$\x13\x02\xD6\xD7\x07&\x02\x02" +
		"\xD7\xD8\x05^0\x02\xD8\xD9\x07\x1B\x02\x02\xD9\xDA\x05\x80A\x02\xDA\u0116" +
		"\x03\x02\x02\x02\xDB\xDD\x05\x1E\x10\x02\xDC\xDE\x05\x82B\x02\xDD\xDC" +
		"\x03\x02\x02\x02\xDD\xDE\x03\x02\x02\x02\xDE\xDF\x03\x02\x02\x02\xDF\xE0" +
		"\x05$\x13\x02\xE0\xE1\x07&\x02\x02\xE1\xE2\x05^0\x02\xE2\xE3\x07\x1A\x02" +
		"\x02\xE3\xE4\x07&\x02\x02\xE4\xE5\x05^0\x02\xE5\xE6\x07\x1B\x02\x02\xE6" +
		"\xE7\x05\x80A\x02\xE7\u0116\x03\x02\x02\x02\xE8\xEA\x05\x1E\x10\x02\xE9" +
		"\xEB\x05\x82B\x02\xEA\xE9\x03\x02\x02\x02\xEA\xEB\x03\x02\x02\x02\xEB" +
		"\xEC\x03\x02\x02\x02\xEC\xED\x05$\x13\x02\xED\xEE\x07&\x02\x02\xEE\xEF" +
		"\x05^0\x02\xEF\xF0\x07\x1A\x02\x02\xF0\xF1\x07&\x02\x02\xF1\xF2\x05\b" +
		"\x05\x02\xF2\u0116\x03\x02\x02\x02\xF3\xF5\x05 \x11\x02\xF4\xF6\x05\x82" +
		"B\x02\xF5\xF4\x03\x02\x02\x02\xF5\xF6\x03\x02\x02\x02\xF6\xF7\x03\x02" +
		"\x02\x02\xF7\xF8\x05d3\x02\xF8\xF9\x07&\x02\x02\xF9\xFA\x05^0\x02\xFA" +
		"\xFB\x07\x1B\x02\x02\xFB\xFC\x05\x80A\x02\xFC\u0116\x03\x02\x02\x02\xFD" +
		"\xFF\x05 \x11\x02\xFE\u0100\x05\x82B\x02\xFF\xFE\x03\x02\x02\x02\xFF\u0100" +
		"\x03\x02\x02\x02\u0100\u0101\x03\x02\x02\x02\u0101\u0102\x05d3\x02\u0102" +
		"\u0103\x07&\x02\x02\u0103\u0104\x05^0\x02\u0104\u0105\x07\x1A\x02\x02" +
		"\u0105\u0106\x07&\x02\x02\u0106\u0107\x05^0\x02\u0107\u0108\x07\x1B\x02" +
		"\x02\u0108\u0109\x05\x80A\x02\u0109\u0116\x03\x02\x02\x02\u010A\u010C" +
		"\x05 \x11\x02\u010B\u010D\x05\x82B\x02\u010C\u010B\x03\x02\x02\x02\u010C" +
		"\u010D\x03\x02\x02\x02\u010D\u010E\x03\x02\x02\x02\u010E\u010F\x05d3\x02" +
		"\u010F\u0110\x07&\x02\x02\u0110\u0111\x05^0\x02\u0111\u0112\x07\x1A\x02" +
		"\x02\u0112\u0113\x07&\x02\x02\u0113\u0114\x05\b\x05\x02\u0114\u0116\x03" +
		"\x02\x02\x02\u0115\xD1\x03\x02\x02\x02\u0115\xDB\x03\x02\x02\x02\u0115" +
		"\xE8\x03\x02\x02\x02\u0115\xF3\x03\x02\x02\x02\u0115\xFD\x03\x02\x02\x02" +
		"\u0115\u010A\x03\x02\x02\x02\u0116\t\x03\x02\x02\x02\u0117\u0118\x05\x80" +
		"A\x02\u0118\u0119\x05h5\x02\u0119\u011A\x05\x04\x03\x02\u011A\v\x03\x02" +
		"\x02\x02\u011B\u011D\x05\x82B\x02\u011C\u011B\x03\x02\x02\x02\u011C\u011D" +
		"\x03\x02\x02\x02\u011D\u011E\x03\x02\x02\x02\u011E\u0146\x07*\x02\x02" +
		"\u011F\u0121\x05\x82B\x02\u0120\u011F\x03\x02\x02\x02\u0120\u0121\x03" +
		"\x02\x02\x02\u0121\u0122\x03\x02\x02\x02\u0122\u0146\x05\x06\x04\x02\u0123" +
		"\u0125\x05\x82B\x02\u0124\u0123\x03\x02\x02\x02\u0124\u0125\x03\x02\x02" +
		"\x02\u0125\u0126\x03\x02\x02\x02\u0126\u0146\x05\x0E\b\x02\u0127\u0129" +
		"\x05\x82B\x02\u0128\u0127\x03\x02\x02\x02\u0128\u0129\x03\x02\x02\x02" +
		"\u0129\u012A\x03\x02\x02\x02\u012A\u0146\x05\x12\n\x02\u012B\u012D\x05" +
		"\x82B\x02\u012C\u012B\x03\x02\x02\x02\u012C\u012D\x03\x02\x02\x02\u012D" +
		"\u012E\x03\x02\x02\x02\u012E\u012F\x05\x14\v\x02\u012F\u0130\x05h5\x02" +
		"\u0130\u0146\x03\x02\x02\x02\u0131\u0133\x05\x82B\x02\u0132\u0131\x03" +
		"\x02\x02\x02\u0132\u0133\x03\x02\x02\x02\u0133\u0134\x03\x02\x02\x02\u0134" +
		"\u0146\x05\x16\f\x02\u0135\u0137\x05\x82B\x02\u0136\u0135\x03\x02\x02" +
		"\x02\u0136\u0137\x03\x02\x02\x02\u0137\u0138\x03\x02\x02\x02\u0138\u0139" +
		"\x05\x1A\x0E\x02\u0139\u013A\x05h5\x02\u013A\u0146\x03\x02\x02\x02\u013B" +
		"\u013D\x05\x82B\x02\u013C\u013B\x03\x02\x02\x02\u013C\u013D\x03\x02\x02" +
		"\x02\u013D\u013E\x03\x02\x02\x02\u013E\u013F\x05D#\x02\u013F\u0140\x05" +
		"h5\x02\u0140\u0146\x03\x02\x02\x02\u0141\u0143\x05\x82B\x02\u0142\u0141" +
		"\x03\x02\x02\x02\u0142\u0143\x03\x02\x02\x02\u0143\u0144\x03\x02\x02\x02" +
		"\u0144\u0146\x05N(\x02\u0145\u011C\x03\x02\x02\x02\u0145\u0120\x03\x02" +
		"\x02\x02\u0145\u0124\x03\x02\x02\x02\u0145\u0128\x03\x02\x02\x02\u0145" +
		"\u012C\x03\x02\x02\x02\u0145\u0132\x03\x02\x02\x02\u0145\u0136\x03\x02" +
		"\x02\x02\u0145\u013C\x03\x02\x02\x02\u0145\u0142\x03\x02\x02\x02\u0146" +
		"\r\x03\x02\x02\x02\u0147\u0149\x05b2\x02\u0148\u0147\x03\x02\x02\x02\u0148" +
		"\u0149\x03\x02\x02\x02\u0149\u014A\x03\x02\x02\x02\u014A\u014B\x07 \x02" +
		"\x02\u014B\u014C\x05\x82B\x02\u014C\u014E\x05T+\x02\u014D\u014F\x05\x82" +
		"B\x02\u014E\u014D\x03\x02\x02\x02\u014E\u014F\x03\x02\x02\x02\u014F\u0151" +
		"\x03\x02\x02\x02\u0150\u0152\x07\x03\x02\x02\u0151\u0150\x03\x02\x02\x02" +
		"\u0151\u0152\x03\x02\x02\x02\u0152\u0154\x03\x02\x02\x02\u0153\u0155\x05" +
		"\x82B\x02\u0154\u0153\x03\x02\x02\x02\u0154\u0155\x03\x02\x02\x02\u0155" +
		"\u0156\x03\x02\x02\x02\u0156\u0157\x05\x10\t\x02\u0157\u0158\x07\x15\x02" +
		"\x02\u0158\u0159\x05h5\x02\u0159\x0F\x03\x02\x02\x02\u015A\u015B\x05\x80" +
		"A\x02\u015B\u015C\x05h5\x02\u015C\u0163\x03\x02\x02\x02\u015D\u015E\x05" +
		"\x80A\x02\u015E\u015F\x05h5\x02\u015F\u0160\x050\x19\x02\u0160\u0161\x05" +
		"h5\x02\u0161\u0163\x03\x02\x02\x02\u0162\u015A\x03\x02\x02\x02\u0162\u015D" +
		"\x03\x02\x02\x02\u0163\x11\x03\x02\x02\x02\u0164\u0165\x05\"\x12\x02\u0165" +
		"\u0166\x05(\x15\x02\u0166\u0167\x05h5\x02\u0167\x13\x03\x02\x02\x02\u0168" +
		"\u0171\x07\x1D\x02\x02\u0169\u0171\x07\x1E\x02\x02\u016A\u016E\x05\x1C" +
		"\x0F\x02\u016B\u016C\x05\x82B\x02\u016C\u016D\x05Z.\x02\u016D\u016F\x03" +
		"\x02\x02\x02\u016E\u016B\x03\x02\x02\x02\u016E\u016F\x03\x02\x02\x02\u016F" +
		"\u0171\x03\x02\x02\x02\u0170\u0168\x03\x02\x02\x02\u0170\u0169\x03\x02" +
		"\x02\x02\u0170\u016A\x03\x02\x02\x02\u0171\x15\x03\x02\x02\x02\u0172\u0174" +
		"\x07!\x02\x02\u0173\u0175\x05\x18\r\x02\u0174\u0173\x03\x02\x02\x02\u0174" +
		"\u0175\x03\x02\x02\x02\u0175\u0176\x03\x02\x02\x02\u0176\u0177\x05\x80" +
		"A\x02\u0177\u0178\x05h5\x02\u0178\x17\x03\x02\x02\x02\u0179\u017A\x05" +
		"\x82B\x02\u017A\u017E\x05T+\x02\u017B\u017C\x05\x82B\x02\u017C\u017D\x05" +
		"(\x15\x02\u017D\u017F\x03\x02\x02\x02\u017E\u017B\x03\x02\x02\x02\u017E" +
		"\u017F\x03\x02\x02\x02\u017F\x19\x03\x02\x02\x02\u0180\u0182\x05T+\x02" +
		"\u0181\u0183\x05\x82B\x02\u0182\u0181\x03\x02\x02\x02\u0182\u0183\x03" +
		"\x02\x02\x02\u0183\u0184\x03\x02\x02\x02\u0184\u0186\x07\x03\x02\x02\u0185" +
		"\u0187\x05,\x17\x02\u0186\u0185\x03\x02\x02\x02\u0186\u0187\x03\x02\x02" +
		"\x02\u0187\u0188\x03\x02\x02\x02\u0188\u0189\x05\x80A\x02\u0189\u0195" +
		"\x03\x02\x02\x02\u018A\u018C\x05\x1C\x0F\x02\u018B\u018D\x05\x82B\x02" +
		"\u018C\u018B\x03\x02\x02\x02\u018C\u018D\x03\x02\x02\x02\u018D\u018E\x03" +
		"\x02\x02\x02\u018E\u0190\x07\x03\x02\x02\u018F\u0191\x05,\x17\x02\u0190" +
		"\u018F\x03\x02\x02\x02\u0190\u0191\x03\x02\x02\x02\u0191\u0192\x03\x02" +
		"\x02\x02\u0192\u0193\x05\x80A\x02\u0193\u0195\x03\x02\x02\x02\u0194\u0180" +
		"\x03\x02\x02\x02\u0194\u018A\x03\x02\x02\x02\u0195\x1B\x03\x02\x02\x02" +
		"\u0196\u0197\x05b2\x02\u0197\u0198\x05\x82B\x02\u0198\u0199\x05T+\x02" +
		"\u0199\x1D\x03\x02\x02\x02\u019A\u019B\t\x02\x02\x02\u019B\x1F\x03\x02" +
		"\x02\x02\u019C\u019D\t\x03\x02\x02\u019D!\x03\x02\x02\x02\u019E\u019F" +
		"\t\x04\x02\x02\u019F#\x03\x02\x02\x02\u01A0\u01A1\x07\f\x02\x02\u01A1" +
		"\u01A2\x05&\x14\x02\u01A2\u01A3\x07\x10\x02\x02\u01A3\u01A4\x05&\x14\x02" +
		"\u01A4\u01A5\x07\r\x02\x02\u01A5\u01AC\x03\x02\x02\x02\u01A6\u01A8\x07" +
		"\"\x02\x02\u01A7\u01A9\x05\x82B\x02\u01A8\u01A7\x03\x02\x02\x02\u01A8" +
		"\u01A9\x03\x02\x02\x02\u01A9\u01AA\x03\x02\x02\x02\u01AA\u01AC\x07\"\x02" +
		"\x02\u01AB\u01A0\x03\x02\x02\x02\u01AB\u01A6\x03\x02\x02\x02\u01AC%\x03" +
		"\x02\x02\x02\u01AD\u01AF\x05(\x15\x02\u01AE\u01AD\x03\x02\x02\x02\u01AE" +
		"\u01AF\x03\x02\x02\x02\u01AF\'\x03\x02\x02\x02\u01B0\u01B2\x05\x82B\x02" +
		"\u01B1\u01B0\x03\x02\x02\x02\u01B1\u01B2\x03\x02\x02\x02\u01B2\u01B3\x03" +
		"\x02\x02\x02\u01B3\u01B5\x054\x1B\x02\u01B4\u01B6\x05\x82B\x02\u01B5\u01B4" +
		"\x03\x02\x02\x02\u01B5\u01B6\x03\x02\x02\x02\u01B6\u01BC\x03\x02\x02\x02" +
		"\u01B7\u01B8\x05\x82B\x02\u01B8\u01B9\x054\x1B\x02\u01B9\u01BB\x03\x02" +
		"\x02\x02\u01BA\u01B7\x03\x02\x02\x02\u01BB\u01BE\x03\x02\x02\x02\u01BC" +
		"\u01BA\x03\x02\x02\x02\u01BC\u01BD\x03\x02\x02\x02\u01BD\u01C0\x03\x02" +
		"\x02\x02\u01BE\u01BC\x03\x02\x02\x02\u01BF\u01C1\x05\x82B\x02\u01C0\u01BF" +
		"\x03\x02\x02\x02\u01C0\u01C1\x03\x02\x02\x02\u01C1)\x03\x02\x02\x02\u01C2" +
		"\u01C4\x05\x82B\x02\u01C3\u01C2\x03\x02\x02\x02\u01C3\u01C4\x03\x02\x02" +
		"\x02\u01C4\u01C5\x03\x02\x02\x02\u01C5\u01C7\x058\x1D\x02\u01C6\u01C8" +
		"\x05\x82B\x02\u01C7\u01C6\x03\x02\x02\x02\u01C7\u01C8\x03\x02\x02\x02" +
		"\u01C8\u01CE\x03\x02\x02\x02\u01C9\u01CA\x05\x82B\x02\u01CA\u01CB\x05" +
		"8\x1D\x02\u01CB\u01CD\x03\x02\x02\x02\u01CC\u01C9\x03\x02\x02\x02\u01CD" +
		"\u01D0\x03\x02\x02\x02\u01CE\u01CC\x03\x02\x02\x02\u01CE\u01CF\x03\x02" +
		"\x02\x02\u01CF\u01D2\x03\x02\x02\x02\u01D0\u01CE\x03\x02\x02\x02\u01D1" +
		"\u01D3\x05\x82B\x02\u01D2\u01D1\x03\x02\x02\x02\u01D2\u01D3\x03\x02\x02" +
		"\x02\u01D3+\x03\x02\x02\x02\u01D4\u01D6\x05\x82B\x02\u01D5\u01D4\x03\x02" +
		"\x02\x02\u01D5\u01D6\x03\x02\x02\x02\u01D6\u01D7\x03\x02\x02\x02\u01D7" +
		"\u01D9\x05<\x1F\x02\u01D8\u01DA\x05\x82B\x02\u01D9\u01D8\x03\x02\x02\x02" +
		"\u01D9\u01DA\x03\x02\x02\x02\u01DA\u01E0\x03\x02\x02\x02\u01DB\u01DC\x05" +
		"\x82B\x02\u01DC\u01DD\x05<\x1F\x02\u01DD\u01DF\x03\x02\x02\x02\u01DE\u01DB" +
		"\x03\x02\x02\x02\u01DF\u01E2";
	private static readonly _serializedATNSegment1: string =
		"\x03\x02\x02\x02\u01E0\u01DE\x03\x02\x02\x02\u01E0\u01E1\x03\x02\x02\x02" +
		"\u01E1\u01E4\x03\x02\x02\x02\u01E2\u01E0\x03\x02\x02\x02\u01E3\u01E5\x05" +
		"\x82B\x02\u01E4\u01E3\x03\x02\x02\x02\u01E4\u01E5\x03\x02\x02\x02\u01E5" +
		"-\x03\x02\x02\x02\u01E6\u01E8\x05\x82B\x02\u01E7\u01E6\x03\x02\x02\x02" +
		"\u01E7\u01E8\x03\x02\x02\x02\u01E8\u01E9\x03\x02\x02\x02\u01E9\u01EB\x05" +
		"@!\x02\u01EA\u01EC\x05\x82B\x02\u01EB\u01EA\x03\x02\x02\x02\u01EB\u01EC" +
		"\x03\x02\x02\x02\u01EC\u01F2\x03\x02\x02\x02\u01ED\u01EE\x05\x82B\x02" +
		"\u01EE\u01EF\x05@!\x02\u01EF\u01F1\x03\x02\x02\x02\u01F0\u01ED\x03\x02" +
		"\x02\x02\u01F1\u01F4\x03\x02\x02\x02\u01F2\u01F0\x03\x02\x02\x02\u01F2" +
		"\u01F3\x03\x02\x02\x02\u01F3\u01F6\x03\x02\x02\x02\u01F4\u01F2\x03\x02" +
		"\x02\x02\u01F5\u01F7\x05\x82B\x02\u01F6\u01F5\x03\x02\x02\x02\u01F6\u01F7" +
		"\x03\x02\x02\x02\u01F7/\x03\x02\x02\x02\u01F8\u020A\x05h5\x02\u01F9\u01FB" +
		"\x05h5\x02\u01FA\u01F9\x03\x02\x02\x02\u01FA\u01FB\x03\x02\x02\x02\u01FB" +
		"\u01FC\x03\x02\x02\x02\u01FC\u0206\x052\x1A\x02\u01FD\u01FE\x05h5\x02" +
		"\u01FE\u01FF\x052\x1A\x02\u01FF\u0205\x03\x02\x02\x02\u0200\u0205\x05" +
		"h5\x02\u0201\u0202\x05\x82B\x02\u0202\u0203\x05@!\x02\u0203\u0205\x03" +
		"\x02\x02\x02\u0204\u01FD\x03\x02\x02\x02\u0204\u0200\x03\x02\x02\x02\u0204" +
		"\u0201\x03\x02\x02\x02\u0205\u0208\x03\x02\x02\x02\u0206\u0204\x03\x02" +
		"\x02\x02\u0206\u0207\x03\x02\x02\x02\u0207\u020A\x03\x02\x02\x02\u0208" +
		"\u0206\x03\x02\x02\x02\u0209\u01F8\x03\x02\x02\x02\u0209\u01FA\x03\x02" +
		"\x02\x02\u020A1\x03\x02\x02\x02\u020B\u020E\x05p9\x02\u020C\u020E\x05" +
		"D#\x02\u020D\u020B\x03\x02\x02\x02\u020D\u020C\x03\x02\x02\x02\u020E\u0210" +
		"\x03\x02\x02\x02\u020F\u0211\x05@!\x02\u0210\u020F\x03\x02\x02\x02\u0210" +
		"\u0211\x03\x02\x02\x02\u02113\x03\x02\x02\x02\u0212\u0214\x056\x1C\x02" +
		"\u0213\u0212\x03\x02\x02\x02\u0214\u0215\x03\x02\x02\x02\u0215\u0213\x03" +
		"\x02\x02\x02\u0215\u0216\x03\x02\x02\x02\u02165\x03\x02\x02\x02\u0217" +
		"\u021E\x05t;\x02\u0218\u021E\x05D#\x02\u0219\u021A\x07\f\x02\x02\u021A" +
		"\u021B\x05*\x16\x02\u021B\u021C\x07\r\x02\x02\u021C\u021E\x03\x02\x02" +
		"\x02\u021D\u0217\x03\x02\x02\x02\u021D\u0218\x03\x02\x02\x02\u021D\u0219" +
		"\x03\x02\x02\x02\u021E7\x03\x02\x02\x02\u021F\u0221\x05:\x1E\x02\u0220" +
		"\u021F\x03\x02\x02\x02\u0221\u0222\x03\x02\x02\x02\u0222\u0220\x03\x02" +
		"\x02\x02\u0222\u0223\x03\x02\x02\x02\u02239\x03\x02\x02\x02\u0224\u022B" +
		"\x05v<\x02\u0225\u022B\x05D#\x02\u0226\u0227\x07\f\x02\x02\u0227\u0228" +
		"\x05*\x16\x02\u0228\u0229\x07\r\x02\x02\u0229\u022B\x03\x02\x02\x02\u022A" +
		"\u0224\x03\x02\x02\x02\u022A\u0225\x03\x02\x02\x02\u022A\u0226\x03\x02" +
		"\x02\x02\u022B;\x03\x02\x02\x02\u022C\u022E\x05> \x02\u022D\u022C\x03" +
		"\x02\x02\x02\u022E\u022F\x03\x02\x02\x02\u022F\u022D\x03\x02\x02\x02\u022F" +
		"\u0230\x03\x02\x02\x02\u0230=\x03\x02\x02\x02\u0231\u0234\x05x=\x02\u0232" +
		"\u0234\x05D#\x02\u0233\u0231\x03\x02\x02\x02\u0233\u0232\x03\x02\x02\x02" +
		"\u0234?\x03\x02\x02\x02\u0235\u0237\x05B\"\x02\u0236\u0235\x03\x02\x02" +
		"\x02\u0237\u0238\x03\x02\x02\x02\u0238\u0236\x03\x02\x02\x02\u0238\u0239" +
		"\x03\x02\x02\x02\u0239A\x03\x02\x02\x02\u023A\u023D\x05z>\x02\u023B\u023D" +
		"\x05D#\x02\u023C\u023A\x03\x02\x02\x02\u023C\u023B\x03\x02\x02\x02\u023D" +
		"C\x03\x02\x02\x02\u023E\u0278\x07\x06\x02\x02\u023F\u0240\x07\x04\x02" +
		"\x02\u0240\u0241\x05F$\x02\u0241\u0242\x07\r\x02\x02\u0242\u0278\x03\x02" +
		"\x02\x02\u0243\u0244\x07\x04\x02\x02\u0244\u0245\x05F$\x02\u0245\u0246" +
		"\x05\x82B\x02\u0246\u0247\x05J&\x02\u0247\u0248\x07\r\x02\x02\u0248\u0278" +
		"\x03\x02\x02\x02\u0249\u024A\x07\x04\x02\x02\u024A\u024B\x05F$\x02\u024B" +
		"\u024C\x07\x10\x02\x02\u024C\u024D\x05J&\x02\u024D\u024E\x07\r\x02\x02" +
		"\u024E\u0278\x03\x02\x02\x02\u024F\u0250\x07\x04\x02\x02\u0250\u0251\x05" +
		"F$\x02\u0251\u0252\x07\v\x02\x02\u0252\u0253\x05(\x15\x02\u0253\u0254" +
		"\x07\r\x02\x02\u0254\u0278\x03\x02\x02\x02\u0255\u0256\x07\x04\x02\x02" +
		"\u0256\u0257\x05F$\x02\u0257\u0258\x07\x03\x02\x02\u0258\u0259\x05(\x15" +
		"\x02\u0259\u025A\x07\r\x02\x02\u025A\u0278\x03\x02\x02\x02\u025B\u025C" +
		"\x07\x05\x02\x02\u025C\u025D\x05F$\x02\u025D\u025E\x07\x0F\x02\x02\u025E" +
		"\u0278\x03\x02\x02\x02\u025F\u0260\x07\x05\x02\x02\u0260\u0261\x05F$\x02" +
		"\u0261\u0262\x05\x82B\x02\u0262\u0263\x05J&\x02\u0263\u0264\x07\x0F\x02" +
		"\x02\u0264\u0278\x03\x02\x02\x02\u0265\u0266\x07\x05\x02\x02\u0266\u0267" +
		"\x05F$\x02\u0267\u0268\x07\x10\x02\x02\u0268\u0269\x05J&\x02\u0269\u026A" +
		"\x07\x0F\x02\x02\u026A\u0278\x03\x02\x02\x02\u026B\u026C\x07\x05\x02\x02" +
		"\u026C\u026D\x05F$\x02\u026D\u026E\x07\v\x02\x02\u026E\u026F\x05(\x15" +
		"\x02\u026F\u0270\x07\x0F\x02\x02\u0270\u0278\x03\x02\x02\x02\u0271\u0272" +
		"\x07\x05\x02\x02\u0272\u0273\x05F$\x02\u0273\u0274\x07\x03\x02\x02\u0274" +
		"\u0275\x05(\x15\x02\u0275\u0276\x07\x0F\x02\x02\u0276\u0278\x03\x02\x02" +
		"\x02\u0277\u023E\x03\x02\x02\x02\u0277\u023F\x03\x02\x02\x02\u0277\u0243" +
		"\x03\x02\x02\x02\u0277\u0249\x03\x02\x02\x02\u0277\u024F\x03\x02\x02\x02" +
		"\u0277\u0255\x03\x02\x02\x02\u0277\u025B\x03\x02\x02\x02\u0277\u025F\x03" +
		"\x02\x02\x02\u0277\u0265\x03\x02\x02\x02\u0277\u026B\x03\x02\x02\x02\u0277" +
		"\u0271\x03\x02\x02\x02\u0278E\x03\x02\x02\x02\u0279\u027B\x05H%\x02\u027A" +
		"\u0279\x03\x02\x02\x02\u027B\u027C\x03\x02\x02\x02\u027C\u027A\x03\x02" +
		"\x02\x02\u027C\u027D\x03\x02\x02\x02\u027DG\x03\x02\x02\x02\u027E\u0281" +
		"\x07%\x02\x02\u027F\u0281\x05D#\x02\u0280\u027E\x03\x02\x02\x02\u0280" +
		"\u027F\x03\x02\x02\x02\u0281I\x03\x02\x02\x02\u0282\u0284\x05L\'\x02\u0283" +
		"\u0282\x03\x02\x02\x02\u0283\u0284\x03\x02\x02\x02\u0284\u028B\x03\x02" +
		"\x02\x02\u0285\u0287\x07\x10\x02\x02\u0286\u0288\x05L\'\x02\u0287\u0286" +
		"\x03\x02\x02\x02\u0287\u0288\x03\x02\x02\x02\u0288\u028A\x03\x02\x02\x02" +
		"\u0289\u0285\x03\x02\x02\x02\u028A\u028D\x03\x02\x02\x02\u028B\u0289\x03" +
		"\x02\x02\x02\u028B\u028C\x03\x02\x02\x02\u028CK\x03\x02\x02\x02\u028D" +
		"\u028B\x03\x02\x02\x02\u028E\u028F\x05(\x15\x02\u028FM\x03\x02\x02\x02" +
		"\u0290\u02BA\x05P)\x02\u0291\u0293\x05Z.\x02\u0292\u0294\x05\x82B\x02" +
		"\u0293\u0292\x03\x02\x02\x02\u0293\u0294\x03\x02\x02\x02\u0294\u0295\x03" +
		"\x02\x02\x02\u0295\u0297\x05~@\x02\u0296\u0298\x05\x82B\x02\u0297\u0296" +
		"\x03\x02\x02\x02\u0297\u0298\x03\x02\x02\x02\u0298\u0299\x03\x02\x02\x02" +
		"\u0299\u02A2\x05V,\x02\u029A\u029C\x05\x82B\x02\u029B\u029A\x03\x02\x02" +
		"\x02\u029B\u029C\x03\x02\x02\x02\u029C\u029D\x03\x02\x02\x02\u029D\u029F" +
		"\x07\x11\x02\x02\u029E\u02A0\x05\x82B\x02\u029F\u029E\x03\x02\x02\x02" +
		"\u029F\u02A0\x03\x02\x02\x02\u02A0\u02A1\x03\x02\x02\x02\u02A1\u02A3\x05" +
		"X-\x02\u02A2\u029B\x03\x02\x02\x02\u02A2\u02A3\x03\x02\x02\x02\u02A3\u02A5" +
		"\x03\x02\x02\x02\u02A4\u02A6\x05\x82B\x02\u02A5\u02A4\x03\x02\x02\x02" +
		"\u02A5\u02A6\x03\x02\x02\x02\u02A6\u02A7\x03\x02\x02\x02\u02A7\u02A9\x07" +
		"&\x02\x02\u02A8\u02AA\x05\\/\x02\u02A9\u02A8\x03\x02\x02\x02\u02A9\u02AA" +
		"\x03\x02\x02\x02\u02AA\u02BA\x03\x02\x02\x02\u02AB\u02AD\x05Z.\x02\u02AC" +
		"\u02AE\x05\x82B\x02\u02AD\u02AC\x03\x02\x02\x02\u02AD\u02AE\x03\x02\x02" +
		"\x02\u02AE\u02AF\x03\x02\x02\x02\u02AF\u02B1\x05~@\x02\u02B0\u02B2\x05" +
		"\x82B\x02\u02B1\u02B0\x03\x02\x02\x02\u02B1\u02B2\x03\x02\x02\x02\u02B2" +
		"\u02B3\x03\x02\x02\x02\u02B3\u02B5\x05\x1A\x0E\x02\u02B4\u02B6\x05\x82" +
		"B\x02\u02B5\u02B4\x03\x02\x02\x02\u02B5\u02B6\x03\x02\x02\x02\u02B6\u02B7" +
		"\x03\x02\x02\x02\u02B7\u02B8\x07&\x02\x02\u02B8\u02BA\x03\x02\x02\x02" +
		"\u02B9\u0290\x03\x02\x02\x02\u02B9\u0291\x03\x02\x02\x02\u02B9\u02AB\x03" +
		"\x02\x02\x02\u02BAO\x03\x02\x02\x02\u02BB\u02BD\x05Z.\x02\u02BC\u02BE" +
		"\x05\x82B\x02\u02BD\u02BC\x03\x02\x02\x02\u02BD\u02BE\x03\x02\x02\x02" +
		"\u02BE\u02BF\x03\x02\x02\x02\u02BF\u02C1\x05~@\x02\u02C0\u02C2\x05\x82" +
		"B\x02\u02C1\u02C0\x03\x02\x02\x02\u02C1\u02C2\x03\x02\x02\x02\u02C2\u02C3" +
		"\x03\x02\x02\x02\u02C3\u02C5\x05T+\x02\u02C4\u02C6\x05\x82B\x02\u02C5" +
		"\u02C4\x03\x02\x02\x02\u02C5\u02C6\x03\x02\x02\x02\u02C6\u02C7\x03\x02" +
		"\x02\x02\u02C7\u02C9\x05~@\x02\u02C8\u02CA\x05\x82B\x02\u02C9\u02C8\x03" +
		"\x02\x02\x02\u02C9\u02CA\x03\x02\x02\x02\u02CA\u02CB\x03\x02\x02\x02\u02CB" +
		"\u02D4\x05V,\x02\u02CC\u02CE\x05\x82B\x02\u02CD\u02CC\x03\x02\x02\x02" +
		"\u02CD\u02CE\x03\x02\x02\x02\u02CE\u02CF\x03\x02\x02\x02\u02CF\u02D1\x07" +
		"\x11\x02\x02\u02D0\u02D2\x05\x82B\x02\u02D1\u02D0\x03\x02\x02\x02\u02D1" +
		"\u02D2\x03\x02\x02\x02\u02D2\u02D3\x03\x02\x02\x02\u02D3\u02D5\x05X-\x02" +
		"\u02D4\u02CD\x03\x02\x02\x02\u02D4\u02D5\x03\x02\x02\x02\u02D5\u02D7\x03" +
		"\x02\x02\x02\u02D6\u02D8\x05\x82B\x02\u02D7\u02D6\x03\x02\x02\x02\u02D7" +
		"\u02D8\x03\x02\x02\x02\u02D8\u02D9\x03\x02\x02\x02\u02D9\u02DB\x07&\x02" +
		"\x02\u02DA\u02DC\x05\\/\x02\u02DB\u02DA\x03\x02\x02\x02\u02DB\u02DC\x03" +
		"\x02\x02\x02\u02DCQ\x03\x02\x02\x02\u02DD\u02DE\x05T+\x02\u02DES\x03\x02" +
		"\x02\x02\u02DF\u02E2\x05d3\x02\u02E0\u02E2\x05D#\x02\u02E1\u02DF\x03\x02" +
		"\x02\x02\u02E1\u02E0\x03\x02\x02\x02\u02E2\u02E3\x03\x02\x02\x02\u02E3" +
		"\u02E1\x03\x02\x02\x02\u02E3\u02E4\x03\x02\x02\x02\u02E4U\x03\x02\x02" +
		"\x02\u02E5\u02E7\x05Z.\x02\u02E6\u02E5\x03\x02\x02\x02\u02E6\u02E7\x03" +
		"\x02\x02\x02\u02E7W\x03\x02\x02\x02\u02E8\u02EA\x05Z.\x02\u02E9\u02E8" +
		"\x03\x02\x02\x02\u02E9\u02EA\x03\x02\x02\x02\u02EAY\x03\x02\x02\x02\u02EB" +
		"\u02F1\x05R*\x02\u02EC\u02ED\x05\x82B\x02\u02ED\u02EE\x05R*\x02\u02EE" +
		"\u02F0\x03\x02\x02\x02\u02EF\u02EC\x03\x02\x02\x02\u02F0\u02F3\x03\x02" +
		"\x02\x02\u02F1\u02EF\x03\x02\x02\x02\u02F1\u02F2\x03\x02\x02\x02\u02F2" +
		"[\x03\x02\x02\x02\u02F3\u02F1\x03\x02\x02\x02\u02F4\u02F6\x05`1\x02\u02F5" +
		"\u02F4\x03\x02\x02\x02\u02F6\u02F7\x03\x02\x02\x02\u02F7\u02F5\x03\x02" +
		"\x02\x02\u02F7\u02F8\x03\x02\x02\x02\u02F8]\x03\x02\x02\x02\u02F9\u02FB" +
		"\x05\x80A\x02\u02FA\u02FC\x05\\/\x02\u02FB\u02FA\x03\x02\x02\x02\u02FB" +
		"\u02FC\x03\x02\x02\x02\u02FC_\x03\x02\x02\x02\u02FD\u02FF\x07\'\x02\x02" +
		"\u02FE\u0300\x05\x82B\x02\u02FF\u02FE\x03\x02\x02\x02\u02FF\u0300\x03" +
		"\x02\x02\x02\u0300\u0301\x03\x02\x02\x02\u0301\u0302\x05.\x18\x02\u0302" +
		"\u0303\x07&\x02\x02\u0303\u0312\x03\x02\x02\x02\u0304\u0306\x07\'\x02" +
		"\x02\u0305\u0307\x05\x82B\x02\u0306\u0305\x03\x02\x02\x02\u0306\u0307" +
		"\x03\x02\x02\x02\u0307\u0308\x03\x02\x02\x02\u0308\u0309\x07*\x02\x02" +
		"\u0309\u0312\x07&\x02\x02\u030A\u030C\x05\x82B\x02\u030B\u030A\x03\x02" +
		"\x02\x02\u030B\u030C\x03\x02\x02\x02\u030C\u030D\x03\x02\x02\x02\u030D" +
		"\u030E\x07*\x02\x02\u030E\u0312\x07&\x02\x02\u030F\u0312\x05\b\x05\x02" +
		"\u0310\u0312\x07&\x02\x02\u0311\u02FD\x03\x02\x02\x02\u0311\u0304\x03" +
		"\x02\x02\x02\u0311\u030B\x03\x02\x02\x02\u0311\u030F\x03\x02\x02\x02\u0311" +
		"\u0310\x03\x02\x02\x02\u0312a\x03\x02\x02\x02\u0313\u0328\x07\x1C\x02" +
		"\x02\u0314\u0328\x07\x1D\x02\x02\u0315\u0328\x07\x1E\x02\x02\u0316\u0317" +
		"\x07\x1C\x02\x02\u0317\u0318\x05\x82B\x02\u0318\u0319\x07\x1D\x02\x02" +
		"\u0319\u0328\x03\x02\x02\x02\u031A\u031B\x07\x1D\x02\x02\u031B\u031C\x05" +
		"\x82B\x02\u031C\u031D\x07\x1C\x02\x02\u031D\u0328\x03\x02\x02\x02\u031E" +
		"\u0328\x07\x1F\x02\x02\u031F\u0320\x07\x1C\x02\x02\u0320\u0321\x05\x82" +
		"B\x02\u0321\u0322\x07\x1F\x02\x02\u0322\u0328\x03\x02\x02\x02\u0323\u0324" +
		"\x07\x1F\x02\x02\u0324\u0325\x05\x82B\x02\u0325\u0326\x07\x1C\x02\x02" +
		"\u0326\u0328\x03\x02\x02\x02\u0327\u0313\x03\x02\x02\x02\u0327\u0314\x03" +
		"\x02\x02\x02\u0327\u0315\x03\x02\x02\x02\u0327\u0316\x03\x02\x02\x02\u0327" +
		"\u031A\x03\x02\x02\x02\u0327\u031E\x03\x02\x02\x02\u0327\u031F\x03\x02" +
		"\x02\x02\u0327\u0323\x03\x02\x02\x02\u0328c\x03\x02\x02\x02\u0329\u032B" +
		"\x05f4\x02\u032A\u0329\x03\x02\x02\x02\u032B\u032C\x03\x02\x02\x02\u032C" +
		"\u032A\x03\x02\x02\x02\u032C\u032D\x03\x02\x02\x02\u032De\x03\x02\x02" +
		"\x02\u032E\u0334\x07%\x02\x02\u032F\u0334\x05|?\x02\u0330\u0334\x07\x10" +
		"\x02\x02\u0331\u0334\x07\f\x02\x02\u0332\u0334\x07\r\x02\x02\u0333\u032E" +
		"\x03\x02\x02\x02\u0333\u032F\x03\x02\x02\x02\u0333\u0330\x03\x02\x02\x02" +
		"\u0333\u0331\x03\x02\x02\x02\u0333\u0332\x03\x02\x02\x02\u0334g\x03\x02" +
		"\x02\x02\u0335\u0336\x07&\x02\x02\u0336i\x03\x02\x02\x02\u0337\u0338\t" +
		"\x05\x02\x02\u0338k\x03\x02\x02\x02\u0339\u033C\x05j6\x02\u033A\u033C" +
		"\x07\x10\x02\x02\u033B\u0339\x03\x02\x02\x02\u033B\u033A\x03\x02\x02\x02" +
		"\u033Cm\x03\x02\x02\x02\u033D\u0343\x05l7\x02\u033E\u0343\x07\x07\x02" +
		"\x02\u033F\u0343\x07\f\x02\x02\u0340\u0343\x07\r\x02\x02\u0341\u0343\x05" +
		"|?\x02\u0342\u033D\x03\x02\x02\x02\u0342\u033E\x03\x02\x02\x02\u0342\u033F" +
		"\x03\x02\x02\x02\u0342\u0340\x03\x02\x02\x02\u0342\u0341\x03\x02\x02\x02" +
		"\u0343o\x03\x02\x02\x02\u0344\u0356\x05j6\x02\u0345\u0356\x07\f\x02\x02" +
		"\u0346\u0356\x07\r\x02\x02\u0347\u0356\x07\x10\x02\x02\u0348\u0356\x07" +
		"*\x02\x02\u0349\u0356\x07\x12\x02\x02\u034A\u0356\x07\x1C\x02\x02\u034B" +
		"\u0356\x07\x1D\x02\x02\u034C\u0356\x07\x1E\x02\x02\u034D\u0356\x07\x16" +
		"\x02\x02\u034E\u0356\x07\x17\x02\x02\u034F\u0356\x07\x18\x02\x02\u0350" +
		"\u0356\x07\x19\x02\x02\u0351\u0356\x07\x1A\x02\x02\u0352\u0356\x07\x1B" +
		"\x02\x02\u0353\u0356\x07 \x02\x02\u0354\u0356\x07\x1F\x02\x02\u0355\u0344" +
		"\x03\x02\x02\x02\u0355\u0345\x03\x02\x02\x02\u0355\u0346\x03\x02\x02\x02" +
		"\u0355\u0347\x03\x02\x02\x02\u0355\u0348\x03\x02\x02\x02\u0355\u0349\x03" +
		"\x02\x02\x02\u0355\u034A\x03\x02\x02\x02\u0355\u034B\x03\x02\x02\x02\u0355" +
		"\u034C\x03\x02\x02\x02\u0355\u034D\x03\x02\x02\x02\u0355\u034E\x03\x02" +
		"\x02\x02\u0355\u034F\x03\x02\x02\x02\u0355\u0350\x03\x02\x02\x02\u0355" +
		"\u0351\x03\x02\x02\x02\u0355\u0352\x03\x02\x02\x02\u0355\u0353\x03\x02" +
		"\x02\x02\u0355\u0354\x03\x02\x02\x02\u0356q\x03\x02\x02\x02\u0357\u035C" +
		"\x05n8\x02\u0358\u035C\x07\x07\x02\x02\u0359\u035C\x07*\x02\x02\u035A" +
		"\u035C\x07\x11\x02\x02\u035B\u0357\x03\x02\x02\x02\u035B\u0358\x03\x02" +
		"\x02\x02\u035B\u0359\x03\x02\x02\x02\u035B\u035A\x03\x02\x02\x02\u035C" +
		"s\x03\x02\x02\x02\u035D\u035F\x05j6\x02\u035E\u035D\x03\x02\x02\x02\u035F" +
		"\u0360\x03\x02\x02\x02\u0360\u035E\x03\x02\x02\x02\u0360\u0361\x03\x02" +
		"\x02\x02\u0361u\x03\x02\x02\x02\u0362\u0364\x05l7\x02\u0363\u0362\x03" +
		"\x02\x02\x02\u0364\u0365\x03\x02\x02\x02\u0365\u0363\x03\x02\x02\x02\u0365" +
		"\u0366\x03\x02\x02\x02\u0366w\x03\x02\x02\x02\u0367\u0369\x05n8\x02\u0368" +
		"\u0367\x03\x02\x02\x02\u0369\u036A\x03\x02\x02\x02\u036A\u0368\x03\x02" +
		"\x02\x02\u036A\u036B\x03\x02\x02\x02\u036By\x03\x02\x02\x02\u036C\u036E" +
		"\x05r:\x02\u036D\u036C\x03\x02\x02\x02\u036E\u036F\x03\x02\x02\x02\u036F" +
		"\u036D\x03\x02\x02\x02\u036F\u0370\x03\x02\x02\x02\u0370{\x03\x02\x02" +
		"\x02\u0371\u0372\t\x06\x02\x02\u0372}\x03\x02\x02\x02\u0373\u0374\t\x07" +
		"\x02\x02\u0374\x7F\x03\x02\x02\x02\u0375\u0377\x07*\x02\x02\u0376\u0375" +
		"\x03\x02\x02\x02\u0376\u0377\x03\x02\x02\x02\u0377\x81\x03\x02\x02\x02" +
		"\u0378\u0379\t\b\x02\x02\u0379\x83\x03\x02\x02\x02}\x88\x8C\x8E\x93\x9D" +
		"\xA9\xB2\xBC\xC8\xCF\xD3\xDD\xEA\xF5\xFF\u010C\u0115\u011C\u0120\u0124" +
		"\u0128\u012C\u0132\u0136\u013C\u0142\u0145\u0148\u014E\u0151\u0154\u0162" +
		"\u016E\u0170\u0174\u017E\u0182\u0186\u018C\u0190\u0194\u01A8\u01AB\u01AE" +
		"\u01B1\u01B5\u01BC\u01C0\u01C3\u01C7\u01CE\u01D2\u01D5\u01D9\u01E0\u01E4" +
		"\u01E7\u01EB\u01F2\u01F6\u01FA\u0204\u0206\u0209\u020D\u0210\u0215\u021D" +
		"\u0222\u022A\u022F\u0233\u0238\u023C\u0277\u027C\u0280\u0283\u0287\u028B" +
		"\u0293\u0297\u029B\u029F\u02A2\u02A5\u02A9\u02AD\u02B1\u02B5\u02B9\u02BD" +
		"\u02C1\u02C5\u02C9\u02CD\u02D1\u02D4\u02D7\u02DB\u02E1\u02E3\u02E6\u02E9" +
		"\u02F1\u02F7\u02FB\u02FF\u0306\u030B\u0311\u0327\u032C\u0333\u033B\u0342" +
		"\u0355\u035B\u0360\u0365\u036A\u036F\u0376";
	public static readonly _serializedATN: string = Utils.join(
		[
			cbuildParser._serializedATNSegment0,
			cbuildParser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!cbuildParser.__ATN) {
			cbuildParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(cbuildParser._serializedATN));
		}

		return cbuildParser.__ATN;
	}

}

export class CbuildfileContext extends ParserRuleContext {
	public statements(): StatementsContext | undefined {
		return this.tryGetRuleContext(0, StatementsContext);
	}
	public EOF(): TerminalNode { return this.getToken(cbuildParser.EOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_cbuildfile; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterCbuildfile) {
			listener.enterCbuildfile(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitCbuildfile) {
			listener.exitCbuildfile(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitCbuildfile) {
			return visitor.visitCbuildfile(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementsContext extends ParserRuleContext {
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	public br(): BrContext[];
	public br(i: number): BrContext;
	public br(i?: number): BrContext | BrContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BrContext);
		} else {
			return this.getRuleContext(i, BrContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_statements; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterStatements) {
			listener.enterStatements(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitStatements) {
			listener.exitStatements(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitStatements) {
			return visitor.visitStatements(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionalContext extends ParserRuleContext {
	public if_eq_kw(): If_eq_kwContext | undefined {
		return this.tryGetRuleContext(0, If_eq_kwContext);
	}
	public condition(): ConditionContext | undefined {
		return this.tryGetRuleContext(0, ConditionContext);
	}
	public statements_opt(): Statements_optContext[];
	public statements_opt(i: number): Statements_optContext;
	public statements_opt(i?: number): Statements_optContext | Statements_optContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Statements_optContext);
		} else {
			return this.getRuleContext(i, Statements_optContext);
		}
	}
	public ENDIF(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.ENDIF, 0); }
	public comment_opt(): Comment_optContext | undefined {
		return this.tryGetRuleContext(0, Comment_optContext);
	}
	public br(): BrContext | undefined {
		return this.tryGetRuleContext(0, BrContext);
	}
	public ws(): WsContext | undefined {
		return this.tryGetRuleContext(0, WsContext);
	}
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.ELSE, 0); }
	public conditional(): ConditionalContext | undefined {
		return this.tryGetRuleContext(0, ConditionalContext);
	}
	public if_def_kw(): If_def_kwContext | undefined {
		return this.tryGetRuleContext(0, If_def_kwContext);
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_conditional; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterConditional) {
			listener.enterConditional(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitConditional) {
			listener.exitConditional(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitConditional) {
			return visitor.visitConditional(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Conditional_in_recipeContext extends ParserRuleContext {
	public if_eq_kw(): If_eq_kwContext | undefined {
		return this.tryGetRuleContext(0, If_eq_kwContext);
	}
	public condition(): ConditionContext | undefined {
		return this.tryGetRuleContext(0, ConditionContext);
	}
	public NL(): TerminalNode[];
	public NL(i: number): TerminalNode;
	public NL(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(cbuildParser.NL);
		} else {
			return this.getToken(cbuildParser.NL, i);
		}
	}
	public recipes_opt(): Recipes_optContext[];
	public recipes_opt(i: number): Recipes_optContext;
	public recipes_opt(i?: number): Recipes_optContext | Recipes_optContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Recipes_optContext);
		} else {
			return this.getRuleContext(i, Recipes_optContext);
		}
	}
	public ENDIF(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.ENDIF, 0); }
	public comment_opt(): Comment_optContext | undefined {
		return this.tryGetRuleContext(0, Comment_optContext);
	}
	public ws(): WsContext | undefined {
		return this.tryGetRuleContext(0, WsContext);
	}
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.ELSE, 0); }
	public conditional_in_recipe(): Conditional_in_recipeContext | undefined {
		return this.tryGetRuleContext(0, Conditional_in_recipeContext);
	}
	public if_def_kw(): If_def_kwContext | undefined {
		return this.tryGetRuleContext(0, If_def_kwContext);
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_conditional_in_recipe; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterConditional_in_recipe) {
			listener.enterConditional_in_recipe(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitConditional_in_recipe) {
			listener.exitConditional_in_recipe(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitConditional_in_recipe) {
			return visitor.visitConditional_in_recipe(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Statements_optContext extends ParserRuleContext {
	public comment_opt(): Comment_optContext {
		return this.getRuleContext(0, Comment_optContext);
	}
	public br(): BrContext {
		return this.getRuleContext(0, BrContext);
	}
	public statements(): StatementsContext {
		return this.getRuleContext(0, StatementsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_statements_opt; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterStatements_opt) {
			listener.enterStatements_opt(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitStatements_opt) {
			listener.exitStatements_opt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitStatements_opt) {
			return visitor.visitStatements_opt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public COMMENT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.COMMENT, 0); }
	public ws(): WsContext | undefined {
		return this.tryGetRuleContext(0, WsContext);
	}
	public conditional(): ConditionalContext | undefined {
		return this.tryGetRuleContext(0, ConditionalContext);
	}
	public define(): DefineContext | undefined {
		return this.tryGetRuleContext(0, DefineContext);
	}
	public include(): IncludeContext | undefined {
		return this.tryGetRuleContext(0, IncludeContext);
	}
	public export(): ExportContext | undefined {
		return this.tryGetRuleContext(0, ExportContext);
	}
	public br(): BrContext | undefined {
		return this.tryGetRuleContext(0, BrContext);
	}
	public vpath(): VpathContext | undefined {
		return this.tryGetRuleContext(0, VpathContext);
	}
	public assignment(): AssignmentContext | undefined {
		return this.tryGetRuleContext(0, AssignmentContext);
	}
	public function(): FunctionContext | undefined {
		return this.tryGetRuleContext(0, FunctionContext);
	}
	public rule(): RuleContext | undefined {
		return this.tryGetRuleContext(0, RuleContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_statement; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DefineContext extends ParserRuleContext {
	public DEFINE(): TerminalNode { return this.getToken(cbuildParser.DEFINE, 0); }
	public ws(): WsContext[];
	public ws(i: number): WsContext;
	public ws(i?: number): WsContext | WsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WsContext);
		} else {
			return this.getRuleContext(i, WsContext);
		}
	}
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	public definition(): DefinitionContext {
		return this.getRuleContext(0, DefinitionContext);
	}
	public ENDEF(): TerminalNode { return this.getToken(cbuildParser.ENDEF, 0); }
	public br(): BrContext {
		return this.getRuleContext(0, BrContext);
	}
	public specifiers(): SpecifiersContext | undefined {
		return this.tryGetRuleContext(0, SpecifiersContext);
	}
	public ASSIGN_OP(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.ASSIGN_OP, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_define; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterDefine) {
			listener.enterDefine(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitDefine) {
			listener.exitDefine(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitDefine) {
			return visitor.visitDefine(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DefinitionContext extends ParserRuleContext {
	public comment_opt(): Comment_optContext {
		return this.getRuleContext(0, Comment_optContext);
	}
	public br(): BrContext[];
	public br(i: number): BrContext;
	public br(i?: number): BrContext | BrContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BrContext);
		} else {
			return this.getRuleContext(i, BrContext);
		}
	}
	public exprs_in_def(): Exprs_in_defContext | undefined {
		return this.tryGetRuleContext(0, Exprs_in_defContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_definition; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterDefinition) {
			listener.enterDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitDefinition) {
			listener.exitDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitDefinition) {
			return visitor.visitDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IncludeContext extends ParserRuleContext {
	public include_kw(): Include_kwContext {
		return this.getRuleContext(0, Include_kwContext);
	}
	public expressions(): ExpressionsContext {
		return this.getRuleContext(0, ExpressionsContext);
	}
	public br(): BrContext {
		return this.getRuleContext(0, BrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_include; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterInclude) {
			listener.enterInclude(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitInclude) {
			listener.exitInclude(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitInclude) {
			return visitor.visitInclude(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExportContext extends ParserRuleContext {
	public EXPORT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.EXPORT, 0); }
	public UNEXPORT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.UNEXPORT, 0); }
	public assignment_prefix(): Assignment_prefixContext | undefined {
		return this.tryGetRuleContext(0, Assignment_prefixContext);
	}
	public ws(): WsContext | undefined {
		return this.tryGetRuleContext(0, WsContext);
	}
	public targets(): TargetsContext | undefined {
		return this.tryGetRuleContext(0, TargetsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_export; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExport) {
			listener.enterExport(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExport) {
			listener.exitExport(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExport) {
			return visitor.visitExport(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VpathContext extends ParserRuleContext {
	public VPATH(): TerminalNode { return this.getToken(cbuildParser.VPATH, 0); }
	public comment_opt(): Comment_optContext {
		return this.getRuleContext(0, Comment_optContext);
	}
	public br(): BrContext {
		return this.getRuleContext(0, BrContext);
	}
	public vpath_args(): Vpath_argsContext | undefined {
		return this.tryGetRuleContext(0, Vpath_argsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_vpath; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterVpath) {
			listener.enterVpath(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitVpath) {
			listener.exitVpath(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitVpath) {
			return visitor.visitVpath(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Vpath_argsContext extends ParserRuleContext {
	public ws(): WsContext[];
	public ws(i: number): WsContext;
	public ws(i?: number): WsContext | WsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WsContext);
		} else {
			return this.getRuleContext(i, WsContext);
		}
	}
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	public expressions(): ExpressionsContext | undefined {
		return this.tryGetRuleContext(0, ExpressionsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_vpath_args; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterVpath_args) {
			listener.enterVpath_args(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitVpath_args) {
			listener.exitVpath_args(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitVpath_args) {
			return visitor.visitVpath_args(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentContext extends ParserRuleContext {
	public pattern(): PatternContext | undefined {
		return this.tryGetRuleContext(0, PatternContext);
	}
	public ASSIGN_OP(): TerminalNode { return this.getToken(cbuildParser.ASSIGN_OP, 0); }
	public comment_opt(): Comment_optContext {
		return this.getRuleContext(0, Comment_optContext);
	}
	public ws(): WsContext | undefined {
		return this.tryGetRuleContext(0, WsContext);
	}
	public exprs_in_assign(): Exprs_in_assignContext | undefined {
		return this.tryGetRuleContext(0, Exprs_in_assignContext);
	}
	public assignment_prefix(): Assignment_prefixContext | undefined {
		return this.tryGetRuleContext(0, Assignment_prefixContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_assignment; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterAssignment) {
			listener.enterAssignment(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitAssignment) {
			listener.exitAssignment(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitAssignment) {
			return visitor.visitAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assignment_prefixContext extends ParserRuleContext {
	public specifiers(): SpecifiersContext {
		return this.getRuleContext(0, SpecifiersContext);
	}
	public ws(): WsContext {
		return this.getRuleContext(0, WsContext);
	}
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_assignment_prefix; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterAssignment_prefix) {
			listener.enterAssignment_prefix(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitAssignment_prefix) {
			listener.exitAssignment_prefix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitAssignment_prefix) {
			return visitor.visitAssignment_prefix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class If_eq_kwContext extends ParserRuleContext {
	public IFEQ(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.IFEQ, 0); }
	public IFNEQ(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.IFNEQ, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_if_eq_kw; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterIf_eq_kw) {
			listener.enterIf_eq_kw(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitIf_eq_kw) {
			listener.exitIf_eq_kw(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitIf_eq_kw) {
			return visitor.visitIf_eq_kw(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class If_def_kwContext extends ParserRuleContext {
	public IFDEF(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.IFDEF, 0); }
	public IFNDEF(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.IFNDEF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_if_def_kw; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterIf_def_kw) {
			listener.enterIf_def_kw(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitIf_def_kw) {
			listener.exitIf_def_kw(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitIf_def_kw) {
			return visitor.visitIf_def_kw(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Include_kwContext extends ParserRuleContext {
	public INCLUDE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.INCLUDE, 0); }
	public DASH_INCLUDE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.DASH_INCLUDE, 0); }
	public SINCLUDE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.SINCLUDE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_include_kw; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterInclude_kw) {
			listener.enterInclude_kw(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitInclude_kw) {
			listener.exitInclude_kw(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitInclude_kw) {
			return visitor.visitInclude_kw(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionContext extends ParserRuleContext {
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.LPAREN, 0); }
	public expressions_opt(): Expressions_optContext[];
	public expressions_opt(i: number): Expressions_optContext;
	public expressions_opt(i?: number): Expressions_optContext | Expressions_optContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Expressions_optContext);
		} else {
			return this.getRuleContext(i, Expressions_optContext);
		}
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.COMMA, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.RPAREN, 0); }
	public SLIT(): TerminalNode[];
	public SLIT(i: number): TerminalNode;
	public SLIT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(cbuildParser.SLIT);
		} else {
			return this.getToken(cbuildParser.SLIT, i);
		}
	}
	public ws(): WsContext | undefined {
		return this.tryGetRuleContext(0, WsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_condition; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterCondition) {
			listener.enterCondition(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitCondition) {
			listener.exitCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitCondition) {
			return visitor.visitCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expressions_optContext extends ParserRuleContext {
	public expressions(): ExpressionsContext | undefined {
		return this.tryGetRuleContext(0, ExpressionsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_expressions_opt; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExpressions_opt) {
			listener.enterExpressions_opt(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExpressions_opt) {
			listener.exitExpressions_opt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExpressions_opt) {
			return visitor.visitExpressions_opt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionsContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public ws(): WsContext[];
	public ws(i: number): WsContext;
	public ws(i?: number): WsContext | WsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WsContext);
		} else {
			return this.getRuleContext(i, WsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_expressions; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExpressions) {
			listener.enterExpressions(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExpressions) {
			listener.exitExpressions(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExpressions) {
			return visitor.visitExpressions(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Exprs_nestedContext extends ParserRuleContext {
	public expr_nested(): Expr_nestedContext[];
	public expr_nested(i: number): Expr_nestedContext;
	public expr_nested(i?: number): Expr_nestedContext | Expr_nestedContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Expr_nestedContext);
		} else {
			return this.getRuleContext(i, Expr_nestedContext);
		}
	}
	public ws(): WsContext[];
	public ws(i: number): WsContext;
	public ws(i?: number): WsContext | WsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WsContext);
		} else {
			return this.getRuleContext(i, WsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_exprs_nested; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExprs_nested) {
			listener.enterExprs_nested(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExprs_nested) {
			listener.exitExprs_nested(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExprs_nested) {
			return visitor.visitExprs_nested(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Exprs_in_assignContext extends ParserRuleContext {
	public expr_in_assign(): Expr_in_assignContext[];
	public expr_in_assign(i: number): Expr_in_assignContext;
	public expr_in_assign(i?: number): Expr_in_assignContext | Expr_in_assignContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Expr_in_assignContext);
		} else {
			return this.getRuleContext(i, Expr_in_assignContext);
		}
	}
	public ws(): WsContext[];
	public ws(i: number): WsContext;
	public ws(i?: number): WsContext | WsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WsContext);
		} else {
			return this.getRuleContext(i, WsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_exprs_in_assign; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExprs_in_assign) {
			listener.enterExprs_in_assign(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExprs_in_assign) {
			listener.exitExprs_in_assign(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExprs_in_assign) {
			return visitor.visitExprs_in_assign(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Exprs_in_recipeContext extends ParserRuleContext {
	public expr_in_recipe(): Expr_in_recipeContext[];
	public expr_in_recipe(i: number): Expr_in_recipeContext;
	public expr_in_recipe(i?: number): Expr_in_recipeContext | Expr_in_recipeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Expr_in_recipeContext);
		} else {
			return this.getRuleContext(i, Expr_in_recipeContext);
		}
	}
	public ws(): WsContext[];
	public ws(i: number): WsContext;
	public ws(i?: number): WsContext | WsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WsContext);
		} else {
			return this.getRuleContext(i, WsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_exprs_in_recipe; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExprs_in_recipe) {
			listener.enterExprs_in_recipe(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExprs_in_recipe) {
			listener.exitExprs_in_recipe(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExprs_in_recipe) {
			return visitor.visitExprs_in_recipe(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Exprs_in_defContext extends ParserRuleContext {
	public br(): BrContext[];
	public br(i: number): BrContext;
	public br(i?: number): BrContext | BrContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BrContext);
		} else {
			return this.getRuleContext(i, BrContext);
		}
	}
	public first_expr_in_def(): First_expr_in_defContext[];
	public first_expr_in_def(i: number): First_expr_in_defContext;
	public first_expr_in_def(i?: number): First_expr_in_defContext | First_expr_in_defContext[] {
		if (i === undefined) {
			return this.getRuleContexts(First_expr_in_defContext);
		} else {
			return this.getRuleContext(i, First_expr_in_defContext);
		}
	}
	public ws(): WsContext[];
	public ws(i: number): WsContext;
	public ws(i?: number): WsContext | WsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WsContext);
		} else {
			return this.getRuleContext(i, WsContext);
		}
	}
	public expr_in_recipe(): Expr_in_recipeContext[];
	public expr_in_recipe(i: number): Expr_in_recipeContext;
	public expr_in_recipe(i?: number): Expr_in_recipeContext | Expr_in_recipeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Expr_in_recipeContext);
		} else {
			return this.getRuleContext(i, Expr_in_recipeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_exprs_in_def; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExprs_in_def) {
			listener.enterExprs_in_def(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExprs_in_def) {
			listener.exitExprs_in_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExprs_in_def) {
			return visitor.visitExprs_in_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class First_expr_in_defContext extends ParserRuleContext {
	public char_in_def(): Char_in_defContext | undefined {
		return this.tryGetRuleContext(0, Char_in_defContext);
	}
	public function(): FunctionContext | undefined {
		return this.tryGetRuleContext(0, FunctionContext);
	}
	public expr_in_recipe(): Expr_in_recipeContext | undefined {
		return this.tryGetRuleContext(0, Expr_in_recipeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_first_expr_in_def; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterFirst_expr_in_def) {
			listener.enterFirst_expr_in_def(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitFirst_expr_in_def) {
			listener.exitFirst_expr_in_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitFirst_expr_in_def) {
			return visitor.visitFirst_expr_in_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public expression_atom(): Expression_atomContext[];
	public expression_atom(i: number): Expression_atomContext;
	public expression_atom(i?: number): Expression_atomContext | Expression_atomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Expression_atomContext);
		} else {
			return this.getRuleContext(i, Expression_atomContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_expression; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expression_atomContext extends ParserRuleContext {
	public text(): TextContext | undefined {
		return this.tryGetRuleContext(0, TextContext);
	}
	public function(): FunctionContext | undefined {
		return this.tryGetRuleContext(0, FunctionContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.LPAREN, 0); }
	public exprs_nested(): Exprs_nestedContext | undefined {
		return this.tryGetRuleContext(0, Exprs_nestedContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_expression_atom; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExpression_atom) {
			listener.enterExpression_atom(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExpression_atom) {
			listener.exitExpression_atom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExpression_atom) {
			return visitor.visitExpression_atom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr_nestedContext extends ParserRuleContext {
	public expr_nested_atom(): Expr_nested_atomContext[];
	public expr_nested_atom(i: number): Expr_nested_atomContext;
	public expr_nested_atom(i?: number): Expr_nested_atomContext | Expr_nested_atomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Expr_nested_atomContext);
		} else {
			return this.getRuleContext(i, Expr_nested_atomContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_expr_nested; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExpr_nested) {
			listener.enterExpr_nested(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExpr_nested) {
			listener.exitExpr_nested(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExpr_nested) {
			return visitor.visitExpr_nested(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr_nested_atomContext extends ParserRuleContext {
	public text_nested(): Text_nestedContext | undefined {
		return this.tryGetRuleContext(0, Text_nestedContext);
	}
	public function(): FunctionContext | undefined {
		return this.tryGetRuleContext(0, FunctionContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.LPAREN, 0); }
	public exprs_nested(): Exprs_nestedContext | undefined {
		return this.tryGetRuleContext(0, Exprs_nestedContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_expr_nested_atom; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExpr_nested_atom) {
			listener.enterExpr_nested_atom(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExpr_nested_atom) {
			listener.exitExpr_nested_atom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExpr_nested_atom) {
			return visitor.visitExpr_nested_atom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr_in_assignContext extends ParserRuleContext {
	public expr_in_assign_atom(): Expr_in_assign_atomContext[];
	public expr_in_assign_atom(i: number): Expr_in_assign_atomContext;
	public expr_in_assign_atom(i?: number): Expr_in_assign_atomContext | Expr_in_assign_atomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Expr_in_assign_atomContext);
		} else {
			return this.getRuleContext(i, Expr_in_assign_atomContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_expr_in_assign; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExpr_in_assign) {
			listener.enterExpr_in_assign(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExpr_in_assign) {
			listener.exitExpr_in_assign(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExpr_in_assign) {
			return visitor.visitExpr_in_assign(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr_in_assign_atomContext extends ParserRuleContext {
	public text_in_assign(): Text_in_assignContext | undefined {
		return this.tryGetRuleContext(0, Text_in_assignContext);
	}
	public function(): FunctionContext | undefined {
		return this.tryGetRuleContext(0, FunctionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_expr_in_assign_atom; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExpr_in_assign_atom) {
			listener.enterExpr_in_assign_atom(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExpr_in_assign_atom) {
			listener.exitExpr_in_assign_atom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExpr_in_assign_atom) {
			return visitor.visitExpr_in_assign_atom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr_in_recipeContext extends ParserRuleContext {
	public expr_in_recipe_atom(): Expr_in_recipe_atomContext[];
	public expr_in_recipe_atom(i: number): Expr_in_recipe_atomContext;
	public expr_in_recipe_atom(i?: number): Expr_in_recipe_atomContext | Expr_in_recipe_atomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Expr_in_recipe_atomContext);
		} else {
			return this.getRuleContext(i, Expr_in_recipe_atomContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_expr_in_recipe; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExpr_in_recipe) {
			listener.enterExpr_in_recipe(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExpr_in_recipe) {
			listener.exitExpr_in_recipe(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExpr_in_recipe) {
			return visitor.visitExpr_in_recipe(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Expr_in_recipe_atomContext extends ParserRuleContext {
	public text_in_recipe(): Text_in_recipeContext | undefined {
		return this.tryGetRuleContext(0, Text_in_recipeContext);
	}
	public function(): FunctionContext | undefined {
		return this.tryGetRuleContext(0, FunctionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_expr_in_recipe_atom; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterExpr_in_recipe_atom) {
			listener.enterExpr_in_recipe_atom(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitExpr_in_recipe_atom) {
			listener.exitExpr_in_recipe_atom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitExpr_in_recipe_atom) {
			return visitor.visitExpr_in_recipe_atom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionContext extends ParserRuleContext {
	public VAR(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.VAR, 0); }
	public DOLLAR_LPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.DOLLAR_LPAREN, 0); }
	public function_name(): Function_nameContext | undefined {
		return this.tryGetRuleContext(0, Function_nameContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.RPAREN, 0); }
	public ws(): WsContext | undefined {
		return this.tryGetRuleContext(0, WsContext);
	}
	public arguments(): ArgumentsContext | undefined {
		return this.tryGetRuleContext(0, ArgumentsContext);
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.COMMA, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.COLON, 0); }
	public expressions(): ExpressionsContext | undefined {
		return this.tryGetRuleContext(0, ExpressionsContext);
	}
	public ASSIGN_OP(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.ASSIGN_OP, 0); }
	public DOLLAR_L_CURLY_BRACE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.DOLLAR_L_CURLY_BRACE, 0); }
	public R_CURLY_BRACE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.R_CURLY_BRACE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_function; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterFunction) {
			listener.enterFunction(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitFunction) {
			listener.exitFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitFunction) {
			return visitor.visitFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_nameContext extends ParserRuleContext {
	public function_name_atom(): Function_name_atomContext[];
	public function_name_atom(i: number): Function_name_atomContext;
	public function_name_atom(i?: number): Function_name_atomContext | Function_name_atomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Function_name_atomContext);
		} else {
			return this.getRuleContext(i, Function_name_atomContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_function_name; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterFunction_name) {
			listener.enterFunction_name(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitFunction_name) {
			listener.exitFunction_name(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitFunction_name) {
			return visitor.visitFunction_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Function_name_atomContext extends ParserRuleContext {
	public CHARS(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.CHARS, 0); }
	public function(): FunctionContext | undefined {
		return this.tryGetRuleContext(0, FunctionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_function_name_atom; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterFunction_name_atom) {
			listener.enterFunction_name_atom(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitFunction_name_atom) {
			listener.exitFunction_name_atom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitFunction_name_atom) {
			return visitor.visitFunction_name_atom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentsContext extends ParserRuleContext {
	public argument(): ArgumentContext[];
	public argument(i: number): ArgumentContext;
	public argument(i?: number): ArgumentContext | ArgumentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ArgumentContext);
		} else {
			return this.getRuleContext(i, ArgumentContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(cbuildParser.COMMA);
		} else {
			return this.getToken(cbuildParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_arguments; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterArguments) {
			listener.enterArguments(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitArguments) {
			listener.exitArguments(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitArguments) {
			return visitor.visitArguments(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentContext extends ParserRuleContext {
	public expressions(): ExpressionsContext {
		return this.getRuleContext(0, ExpressionsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_argument; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterArgument) {
			listener.enterArgument(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitArgument) {
			listener.exitArgument(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitArgument) {
			return visitor.visitArgument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RuleContext extends ParserRuleContext {
	public static_pattern_rule(): Static_pattern_ruleContext | undefined {
		return this.tryGetRuleContext(0, Static_pattern_ruleContext);
	}
	public targets(): TargetsContext | undefined {
		return this.tryGetRuleContext(0, TargetsContext);
	}
	public colon(): ColonContext | undefined {
		return this.tryGetRuleContext(0, ColonContext);
	}
	public prerequisites(): PrerequisitesContext | undefined {
		return this.tryGetRuleContext(0, PrerequisitesContext);
	}
	public NL(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.NL, 0); }
	public ws(): WsContext[];
	public ws(i: number): WsContext;
	public ws(i?: number): WsContext | WsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WsContext);
		} else {
			return this.getRuleContext(i, WsContext);
		}
	}
	public PIPE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.PIPE, 0); }
	public orderonlyprerequisites(): OrderonlyprerequisitesContext | undefined {
		return this.tryGetRuleContext(0, OrderonlyprerequisitesContext);
	}
	public recipes(): RecipesContext | undefined {
		return this.tryGetRuleContext(0, RecipesContext);
	}
	public assignment(): AssignmentContext | undefined {
		return this.tryGetRuleContext(0, AssignmentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_rule; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterRule) {
			listener.enterRule(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitRule) {
			listener.exitRule(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitRule) {
			return visitor.visitRule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Static_pattern_ruleContext extends ParserRuleContext {
	public targets(): TargetsContext {
		return this.getRuleContext(0, TargetsContext);
	}
	public colon(): ColonContext[];
	public colon(i: number): ColonContext;
	public colon(i?: number): ColonContext | ColonContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColonContext);
		} else {
			return this.getRuleContext(i, ColonContext);
		}
	}
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	public prerequisites(): PrerequisitesContext {
		return this.getRuleContext(0, PrerequisitesContext);
	}
	public NL(): TerminalNode { return this.getToken(cbuildParser.NL, 0); }
	public ws(): WsContext[];
	public ws(i: number): WsContext;
	public ws(i?: number): WsContext | WsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WsContext);
		} else {
			return this.getRuleContext(i, WsContext);
		}
	}
	public PIPE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.PIPE, 0); }
	public orderonlyprerequisites(): OrderonlyprerequisitesContext | undefined {
		return this.tryGetRuleContext(0, OrderonlyprerequisitesContext);
	}
	public recipes(): RecipesContext | undefined {
		return this.tryGetRuleContext(0, RecipesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_static_pattern_rule; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterStatic_pattern_rule) {
			listener.enterStatic_pattern_rule(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitStatic_pattern_rule) {
			listener.exitStatic_pattern_rule(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitStatic_pattern_rule) {
			return visitor.visitStatic_pattern_rule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TargetContext extends ParserRuleContext {
	public pattern(): PatternContext {
		return this.getRuleContext(0, PatternContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_target; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterTarget) {
			listener.enterTarget(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitTarget) {
			listener.exitTarget(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitTarget) {
			return visitor.visitTarget(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PatternContext extends ParserRuleContext {
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public function(): FunctionContext[];
	public function(i: number): FunctionContext;
	public function(i?: number): FunctionContext | FunctionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FunctionContext);
		} else {
			return this.getRuleContext(i, FunctionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_pattern; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterPattern) {
			listener.enterPattern(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitPattern) {
			listener.exitPattern(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitPattern) {
			return visitor.visitPattern(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrerequisitesContext extends ParserRuleContext {
	public targets(): TargetsContext | undefined {
		return this.tryGetRuleContext(0, TargetsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_prerequisites; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterPrerequisites) {
			listener.enterPrerequisites(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitPrerequisites) {
			listener.exitPrerequisites(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitPrerequisites) {
			return visitor.visitPrerequisites(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OrderonlyprerequisitesContext extends ParserRuleContext {
	public targets(): TargetsContext | undefined {
		return this.tryGetRuleContext(0, TargetsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_orderonlyprerequisites; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterOrderonlyprerequisites) {
			listener.enterOrderonlyprerequisites(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitOrderonlyprerequisites) {
			listener.exitOrderonlyprerequisites(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitOrderonlyprerequisites) {
			return visitor.visitOrderonlyprerequisites(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TargetsContext extends ParserRuleContext {
	public target(): TargetContext[];
	public target(i: number): TargetContext;
	public target(i?: number): TargetContext | TargetContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TargetContext);
		} else {
			return this.getRuleContext(i, TargetContext);
		}
	}
	public ws(): WsContext[];
	public ws(i: number): WsContext;
	public ws(i?: number): WsContext | WsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WsContext);
		} else {
			return this.getRuleContext(i, WsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_targets; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterTargets) {
			listener.enterTargets(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitTargets) {
			listener.exitTargets(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitTargets) {
			return visitor.visitTargets(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RecipesContext extends ParserRuleContext {
	public recipe(): RecipeContext[];
	public recipe(i: number): RecipeContext;
	public recipe(i?: number): RecipeContext | RecipeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RecipeContext);
		} else {
			return this.getRuleContext(i, RecipeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_recipes; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterRecipes) {
			listener.enterRecipes(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitRecipes) {
			listener.exitRecipes(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitRecipes) {
			return visitor.visitRecipes(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Recipes_optContext extends ParserRuleContext {
	public comment_opt(): Comment_optContext {
		return this.getRuleContext(0, Comment_optContext);
	}
	public recipes(): RecipesContext | undefined {
		return this.tryGetRuleContext(0, RecipesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_recipes_opt; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterRecipes_opt) {
			listener.enterRecipes_opt(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitRecipes_opt) {
			listener.exitRecipes_opt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitRecipes_opt) {
			return visitor.visitRecipes_opt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RecipeContext extends ParserRuleContext {
	public LEADING_TAB(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.LEADING_TAB, 0); }
	public exprs_in_recipe(): Exprs_in_recipeContext | undefined {
		return this.tryGetRuleContext(0, Exprs_in_recipeContext);
	}
	public NL(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.NL, 0); }
	public ws(): WsContext | undefined {
		return this.tryGetRuleContext(0, WsContext);
	}
	public COMMENT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.COMMENT, 0); }
	public conditional_in_recipe(): Conditional_in_recipeContext | undefined {
		return this.tryGetRuleContext(0, Conditional_in_recipeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_recipe; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterRecipe) {
			listener.enterRecipe(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitRecipe) {
			listener.exitRecipe(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitRecipe) {
			return visitor.visitRecipe(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SpecifiersContext extends ParserRuleContext {
	public OVERRIDE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.OVERRIDE, 0); }
	public EXPORT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.EXPORT, 0); }
	public UNEXPORT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.UNEXPORT, 0); }
	public ws(): WsContext | undefined {
		return this.tryGetRuleContext(0, WsContext);
	}
	public UNDEFINE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.UNDEFINE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_specifiers; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterSpecifiers) {
			listener.enterSpecifiers(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitSpecifiers) {
			listener.exitSpecifiers(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitSpecifiers) {
			return visitor.visitSpecifiers(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public identifier_atom(): Identifier_atomContext[];
	public identifier_atom(i: number): Identifier_atomContext;
	public identifier_atom(i?: number): Identifier_atomContext | Identifier_atomContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Identifier_atomContext);
		} else {
			return this.getRuleContext(i, Identifier_atomContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_identifier; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterIdentifier) {
			listener.enterIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitIdentifier) {
			listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Identifier_atomContext extends ParserRuleContext {
	public CHARS(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.CHARS, 0); }
	public keywords(): KeywordsContext | undefined {
		return this.tryGetRuleContext(0, KeywordsContext);
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.COMMA, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_identifier_atom; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterIdentifier_atom) {
			listener.enterIdentifier_atom(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitIdentifier_atom) {
			listener.exitIdentifier_atom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitIdentifier_atom) {
			return visitor.visitIdentifier_atom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BrContext extends ParserRuleContext {
	public NL(): TerminalNode { return this.getToken(cbuildParser.NL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_br; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterBr) {
			listener.enterBr(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitBr) {
			listener.exitBr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitBr) {
			return visitor.visitBr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CharContext extends ParserRuleContext {
	public CHARS(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.CHARS, 0); }
	public SLIT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.SLIT, 0); }
	public ASSIGN_OP(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.ASSIGN_OP, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.COLON, 0); }
	public DOUBLE_DOLLAR(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.DOUBLE_DOLLAR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_char; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterChar) {
			listener.enterChar(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitChar) {
			listener.exitChar(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitChar) {
			return visitor.visitChar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Char_nestedContext extends ParserRuleContext {
	public char(): CharContext | undefined {
		return this.tryGetRuleContext(0, CharContext);
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.COMMA, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_char_nested; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterChar_nested) {
			listener.enterChar_nested(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitChar_nested) {
			listener.exitChar_nested(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitChar_nested) {
			return visitor.visitChar_nested(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Char_in_assignContext extends ParserRuleContext {
	public char_nested(): Char_nestedContext | undefined {
		return this.tryGetRuleContext(0, Char_nestedContext);
	}
	public DOUBLE_DOLLAR(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.DOUBLE_DOLLAR, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.RPAREN, 0); }
	public keywords(): KeywordsContext | undefined {
		return this.tryGetRuleContext(0, KeywordsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_char_in_assign; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterChar_in_assign) {
			listener.enterChar_in_assign(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitChar_in_assign) {
			listener.exitChar_in_assign(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitChar_in_assign) {
			return visitor.visitChar_in_assign(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Char_in_defContext extends ParserRuleContext {
	public char(): CharContext | undefined {
		return this.tryGetRuleContext(0, CharContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.RPAREN, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.COMMA, 0); }
	public COMMENT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.COMMENT, 0); }
	public INCLUDE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.INCLUDE, 0); }
	public OVERRIDE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.OVERRIDE, 0); }
	public EXPORT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.EXPORT, 0); }
	public UNEXPORT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.UNEXPORT, 0); }
	public IFDEF(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.IFDEF, 0); }
	public IFNDEF(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.IFNDEF, 0); }
	public IFEQ(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.IFEQ, 0); }
	public IFNEQ(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.IFNEQ, 0); }
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.ELSE, 0); }
	public ENDIF(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.ENDIF, 0); }
	public DEFINE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.DEFINE, 0); }
	public UNDEFINE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.UNDEFINE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_char_in_def; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterChar_in_def) {
			listener.enterChar_in_def(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitChar_in_def) {
			listener.exitChar_in_def(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitChar_in_def) {
			return visitor.visitChar_in_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Char_in_recipeContext extends ParserRuleContext {
	public char_in_assign(): Char_in_assignContext | undefined {
		return this.tryGetRuleContext(0, Char_in_assignContext);
	}
	public DOUBLE_DOLLAR(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.DOUBLE_DOLLAR, 0); }
	public COMMENT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.COMMENT, 0); }
	public PIPE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.PIPE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_char_in_recipe; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterChar_in_recipe) {
			listener.enterChar_in_recipe(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitChar_in_recipe) {
			listener.exitChar_in_recipe(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitChar_in_recipe) {
			return visitor.visitChar_in_recipe(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TextContext extends ParserRuleContext {
	public char(): CharContext[];
	public char(i: number): CharContext;
	public char(i?: number): CharContext | CharContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CharContext);
		} else {
			return this.getRuleContext(i, CharContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_text; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterText) {
			listener.enterText(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitText) {
			listener.exitText(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitText) {
			return visitor.visitText(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Text_nestedContext extends ParserRuleContext {
	public char_nested(): Char_nestedContext[];
	public char_nested(i: number): Char_nestedContext;
	public char_nested(i?: number): Char_nestedContext | Char_nestedContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Char_nestedContext);
		} else {
			return this.getRuleContext(i, Char_nestedContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_text_nested; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterText_nested) {
			listener.enterText_nested(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitText_nested) {
			listener.exitText_nested(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitText_nested) {
			return visitor.visitText_nested(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Text_in_assignContext extends ParserRuleContext {
	public char_in_assign(): Char_in_assignContext[];
	public char_in_assign(i: number): Char_in_assignContext;
	public char_in_assign(i?: number): Char_in_assignContext | Char_in_assignContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Char_in_assignContext);
		} else {
			return this.getRuleContext(i, Char_in_assignContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_text_in_assign; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterText_in_assign) {
			listener.enterText_in_assign(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitText_in_assign) {
			listener.exitText_in_assign(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitText_in_assign) {
			return visitor.visitText_in_assign(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Text_in_recipeContext extends ParserRuleContext {
	public char_in_recipe(): Char_in_recipeContext[];
	public char_in_recipe(i: number): Char_in_recipeContext;
	public char_in_recipe(i?: number): Char_in_recipeContext | Char_in_recipeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(Char_in_recipeContext);
		} else {
			return this.getRuleContext(i, Char_in_recipeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_text_in_recipe; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterText_in_recipe) {
			listener.enterText_in_recipe(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitText_in_recipe) {
			listener.exitText_in_recipe(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitText_in_recipe) {
			return visitor.visitText_in_recipe(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KeywordsContext extends ParserRuleContext {
	public INCLUDE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.INCLUDE, 0); }
	public OVERRIDE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.OVERRIDE, 0); }
	public EXPORT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.EXPORT, 0); }
	public UNEXPORT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.UNEXPORT, 0); }
	public IFDEF(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.IFDEF, 0); }
	public IFNDEF(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.IFNDEF, 0); }
	public IFEQ(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.IFEQ, 0); }
	public IFNEQ(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.IFNEQ, 0); }
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.ELSE, 0); }
	public ENDIF(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.ENDIF, 0); }
	public DEFINE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.DEFINE, 0); }
	public ENDEF(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.ENDEF, 0); }
	public UNDEFINE(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.UNDEFINE, 0); }
	public VPATH(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.VPATH, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_keywords; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterKeywords) {
			listener.enterKeywords(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitKeywords) {
			listener.exitKeywords(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitKeywords) {
			return visitor.visitKeywords(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColonContext extends ParserRuleContext {
	public COLON(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.COLON, 0); }
	public DOUBLE_COLON(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.DOUBLE_COLON, 0); }
	public GROUPED_COLON(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.GROUPED_COLON, 0); }
	public GROUPED_DOUBLE_COLON(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.GROUPED_DOUBLE_COLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_colon; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterColon) {
			listener.enterColon(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitColon) {
			listener.exitColon(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitColon) {
			return visitor.visitColon(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Comment_optContext extends ParserRuleContext {
	public COMMENT(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.COMMENT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_comment_opt; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterComment_opt) {
			listener.enterComment_opt(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitComment_opt) {
			listener.exitComment_opt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitComment_opt) {
			return visitor.visitComment_opt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WsContext extends ParserRuleContext {
	public WS(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.WS, 0); }
	public TAB(): TerminalNode | undefined { return this.tryGetToken(cbuildParser.TAB, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return cbuildParser.RULE_ws; }
	// @Override
	public enterRule(listener: cbuildListener): void {
		if (listener.enterWs) {
			listener.enterWs(this);
		}
	}
	// @Override
	public exitRule(listener: cbuildListener): void {
		if (listener.exitWs) {
			listener.exitWs(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cbuildVisitor<Result>): Result {
		if (visitor.visitWs) {
			return visitor.visitWs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


