package io.Cbuild;// Generated from cbuild.g4 by ANTLR 4.13.2

import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.ATN;
import org.antlr.v4.runtime.atn.ATNDeserializer;
import org.antlr.v4.runtime.atn.ParserATNSimulator;
import org.antlr.v4.runtime.atn.PredictionContextCache;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.tree.ParseTreeListener;
import org.antlr.v4.runtime.tree.ParseTreeVisitor;
import org.antlr.v4.runtime.tree.TerminalNode;

import java.util.List;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue", "this-escape"})
public class cbuildParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		ASSIGN_OP=1, DOLLAR_LPAREN=2, DOLLAR_L_CURLY_BRACE=3, VAR=4, DOUBLE_DOLLAR=5, 
		DOUBLE_COLON=6, COLON=7, LPAREN=8, RPAREN=9, L_CURLY_BRACE=10, R_CURLY_BRACE=11, 
		COMMA=12, INCLUDE=13, DASH_INCLUDE=14, SINCLUDE=15, ENDEF=16, IFDEF=17, 
		IFNDEF=18, IFEQ=19, IFNEQ=20, ELSE=21, ENDIF=22, OVERRIDE=23, EXPORT=24, 
		UNEXPORT=25, UNDEFINE=26, DEFINE=27, VPATH=28, SLIT=29, CHARS=30, NL=31, 
		LEADING_TAB=32, WS=33, TAB=34, COMMENT=35;
	public static final int
		RULE_cbuildfile = 0, RULE_statements = 1, RULE_conditional = 2, RULE_conditional_in_recipe = 3, 
		RULE_statements_opt = 4, RULE_statement = 5, RULE_define = 6, RULE_definition = 7, 
		RULE_include = 8, RULE_export = 9, RULE_vpath = 10, RULE_vpath_args = 11, 
		RULE_assignment = 12, RULE_assignment_prefix = 13, RULE_if_eq_kw = 14, 
		RULE_if_def_kw = 15, RULE_include_kw = 16, RULE_condition = 17, RULE_expressions_opt = 18, 
		RULE_expressions = 19, RULE_exprs_nested = 20, RULE_exprs_in_assign = 21, 
		RULE_exprs_in_recipe = 22, RULE_exprs_in_def = 23, RULE_first_expr_in_def = 24, 
		RULE_expression = 25, RULE_expression_atom = 26, RULE_expr_nested = 27, 
		RULE_expr_nested_atom = 28, RULE_expr_in_assign = 29, RULE_expr_in_assign_atom = 30, 
		RULE_expr_in_recipe = 31, RULE_expr_in_recipe_atom = 32, RULE_function = 33, 
		RULE_function_name = 34, RULE_function_name_atom = 35, RULE_arguments = 36, 
		RULE_argument = 37, RULE_rule = 38, RULE_static_pattern_rule = 39, RULE_target = 40, 
		RULE_pattern = 41, RULE_prerequisites = 42, RULE_targets = 43, RULE_recipes = 44, 
		RULE_recipes_opt = 45, RULE_recipe = 46, RULE_specifiers = 47, RULE_identifier = 48, 
		RULE_identifier_atom = 49, RULE_br = 50, RULE_char = 51, RULE_char_nested = 52, 
		RULE_char_in_assign = 53, RULE_char_in_def = 54, RULE_char_in_recipe = 55, 
		RULE_text = 56, RULE_text_nested = 57, RULE_text_in_assign = 58, RULE_text_in_recipe = 59, 
		RULE_keywords = 60, RULE_colon = 61, RULE_comment_opt = 62, RULE_ws = 63;
	private static String[] makeRuleNames() {
		return new String[] {
			"cbuildfile", "statements", "conditional", "conditional_in_recipe", "statements_opt", 
			"statement", "define", "definition", "include", "export", "vpath", "vpath_args", 
			"assignment", "assignment_prefix", "if_eq_kw", "if_def_kw", "include_kw", 
			"condition", "expressions_opt", "expressions", "exprs_nested", "exprs_in_assign", 
			"exprs_in_recipe", "exprs_in_def", "first_expr_in_def", "expression", 
			"expression_atom", "expr_nested", "expr_nested_atom", "expr_in_assign", 
			"expr_in_assign_atom", "expr_in_recipe", "expr_in_recipe_atom", "function", 
			"function_name", "function_name_atom", "arguments", "argument", "rule", 
			"static_pattern_rule", "target", "pattern", "prerequisites", "targets", 
			"recipes", "recipes_opt", "recipe", "specifiers", "identifier", "identifier_atom", 
			"br", "char", "char_nested", "char_in_assign", "char_in_def", "char_in_recipe", 
			"text", "text_nested", "text_in_assign", "text_in_recipe", "keywords", 
			"colon", "comment_opt", "ws"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, "'$('", "'${'", null, "'$$'", "'::'", "':'", "'('", "')'", 
			"'{'", "'}'", "','", "'include'", "'-include'", "'sinclude'", "'endef'", 
			"'ifdef'", "'ifndef'", "'ifeq'", "'ifneq'", "'else'", "'endif'", "'override'", 
			"'export'", "'unexport'", "'undefine'", "'define'", "'vpath'", null, 
			null, null, null, null, "'\\t'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "ASSIGN_OP", "DOLLAR_LPAREN", "DOLLAR_L_CURLY_BRACE", "VAR", "DOUBLE_DOLLAR", 
			"DOUBLE_COLON", "COLON", "LPAREN", "RPAREN", "L_CURLY_BRACE", "R_CURLY_BRACE", 
			"COMMA", "INCLUDE", "DASH_INCLUDE", "SINCLUDE", "ENDEF", "IFDEF", "IFNDEF", 
			"IFEQ", "IFNEQ", "ELSE", "ENDIF", "OVERRIDE", "EXPORT", "UNEXPORT", "UNDEFINE", 
			"DEFINE", "VPATH", "SLIT", "CHARS", "NL", "LEADING_TAB", "WS", "TAB", 
			"COMMENT"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "cbuild.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public cbuildParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CbuildfileContext extends ParserRuleContext {
		public StatementsContext statements() {
			return getRuleContext(StatementsContext.class,0);
		}
		public TerminalNode EOF() { return getToken(cbuildParser.EOF, 0); }
		public CbuildfileContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_cbuildfile; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterCbuildfile(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitCbuildfile(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitCbuildfile(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CbuildfileContext cbuildfile() throws RecognitionException {
		CbuildfileContext _localctx = new CbuildfileContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_cbuildfile);
		try {
			setState(132);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(128);
				statements();
				setState(129);
				match(EOF);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(131);
				match(EOF);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class StatementsContext extends ParserRuleContext {
		public List<StatementContext> statement() {
			return getRuleContexts(StatementContext.class);
		}
		public StatementContext statement(int i) {
			return getRuleContext(StatementContext.class,i);
		}
		public List<BrContext> br() {
			return getRuleContexts(BrContext.class);
		}
		public BrContext br(int i) {
			return getRuleContext(BrContext.class,i);
		}
		public StatementsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statements; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterStatements(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitStatements(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitStatements(this);
			else return visitor.visitChildren(this);
		}
	}

	public final StatementsContext statements() throws RecognitionException {
		StatementsContext _localctx = new StatementsContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_statements);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(138);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(136);
					_errHandler.sync(this);
					switch (_input.LA(1)) {
					case DOLLAR_LPAREN:
					case DOLLAR_L_CURLY_BRACE:
					case VAR:
					case LPAREN:
					case RPAREN:
					case COMMA:
					case INCLUDE:
					case DASH_INCLUDE:
					case SINCLUDE:
					case ENDEF:
					case IFDEF:
					case IFNDEF:
					case IFEQ:
					case IFNEQ:
					case ELSE:
					case ENDIF:
					case OVERRIDE:
					case EXPORT:
					case UNEXPORT:
					case UNDEFINE:
					case DEFINE:
					case VPATH:
					case CHARS:
					case WS:
					case TAB:
					case COMMENT:
						{
						setState(134);
						statement();
						}
						break;
					case NL:
						{
						setState(135);
						br();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					} 
				}
				setState(140);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ConditionalContext extends ParserRuleContext {
		public If_eq_kwContext if_eq_kw() {
			return getRuleContext(If_eq_kwContext.class,0);
		}
		public ConditionContext condition() {
			return getRuleContext(ConditionContext.class,0);
		}
		public List<Statements_optContext> statements_opt() {
			return getRuleContexts(Statements_optContext.class);
		}
		public Statements_optContext statements_opt(int i) {
			return getRuleContext(Statements_optContext.class,i);
		}
		public TerminalNode ENDIF() { return getToken(cbuildParser.ENDIF, 0); }
		public Comment_optContext comment_opt() {
			return getRuleContext(Comment_optContext.class,0);
		}
		public BrContext br() {
			return getRuleContext(BrContext.class,0);
		}
		public WsContext ws() {
			return getRuleContext(WsContext.class,0);
		}
		public TerminalNode ELSE() { return getToken(cbuildParser.ELSE, 0); }
		public ConditionalContext conditional() {
			return getRuleContext(ConditionalContext.class,0);
		}
		public If_def_kwContext if_def_kw() {
			return getRuleContext(If_def_kwContext.class,0);
		}
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public ConditionalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_conditional; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterConditional(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitConditional(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitConditional(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ConditionalContext conditional() throws RecognitionException {
		ConditionalContext _localctx = new ConditionalContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_conditional);
		int _la;
		try {
			setState(203);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(141);
				if_eq_kw();
				setState(143);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(142);
					ws();
					}
				}

				setState(145);
				condition();
				setState(146);
				statements_opt();
				setState(147);
				match(ENDIF);
				setState(148);
				comment_opt();
				setState(149);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(151);
				if_eq_kw();
				setState(153);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(152);
					ws();
					}
				}

				setState(155);
				condition();
				setState(156);
				statements_opt();
				setState(157);
				match(ELSE);
				setState(158);
				statements_opt();
				setState(159);
				match(ENDIF);
				setState(160);
				comment_opt();
				setState(161);
				br();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(163);
				if_eq_kw();
				setState(165);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(164);
					ws();
					}
				}

				setState(167);
				condition();
				setState(168);
				statements_opt();
				setState(169);
				match(ELSE);
				setState(170);
				conditional();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(172);
				if_def_kw();
				setState(174);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(173);
					ws();
					}
				}

				setState(176);
				identifier();
				setState(177);
				statements_opt();
				setState(178);
				match(ENDIF);
				setState(179);
				comment_opt();
				setState(180);
				br();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(182);
				if_def_kw();
				setState(184);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(183);
					ws();
					}
				}

				setState(186);
				identifier();
				setState(187);
				statements_opt();
				setState(188);
				match(ELSE);
				setState(189);
				statements_opt();
				setState(190);
				match(ENDIF);
				setState(191);
				comment_opt();
				setState(192);
				br();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(194);
				if_def_kw();
				setState(196);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(195);
					ws();
					}
				}

				setState(198);
				identifier();
				setState(199);
				statements_opt();
				setState(200);
				match(ELSE);
				setState(201);
				conditional();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Conditional_in_recipeContext extends ParserRuleContext {
		public If_eq_kwContext if_eq_kw() {
			return getRuleContext(If_eq_kwContext.class,0);
		}
		public ConditionContext condition() {
			return getRuleContext(ConditionContext.class,0);
		}
		public List<TerminalNode> NL() { return getTokens(cbuildParser.NL); }
		public TerminalNode NL(int i) {
			return getToken(cbuildParser.NL, i);
		}
		public List<Recipes_optContext> recipes_opt() {
			return getRuleContexts(Recipes_optContext.class);
		}
		public Recipes_optContext recipes_opt(int i) {
			return getRuleContext(Recipes_optContext.class,i);
		}
		public TerminalNode ENDIF() { return getToken(cbuildParser.ENDIF, 0); }
		public Comment_optContext comment_opt() {
			return getRuleContext(Comment_optContext.class,0);
		}
		public WsContext ws() {
			return getRuleContext(WsContext.class,0);
		}
		public TerminalNode ELSE() { return getToken(cbuildParser.ELSE, 0); }
		public Conditional_in_recipeContext conditional_in_recipe() {
			return getRuleContext(Conditional_in_recipeContext.class,0);
		}
		public If_def_kwContext if_def_kw() {
			return getRuleContext(If_def_kwContext.class,0);
		}
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public Conditional_in_recipeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_conditional_in_recipe; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterConditional_in_recipe(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitConditional_in_recipe(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitConditional_in_recipe(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Conditional_in_recipeContext conditional_in_recipe() throws RecognitionException {
		Conditional_in_recipeContext _localctx = new Conditional_in_recipeContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_conditional_in_recipe);
		int _la;
		try {
			setState(273);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,16,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(205);
				if_eq_kw();
				setState(207);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(206);
					ws();
					}
				}

				setState(209);
				condition();
				setState(210);
				match(NL);
				setState(211);
				recipes_opt();
				setState(212);
				match(ENDIF);
				setState(213);
				comment_opt();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(215);
				if_eq_kw();
				setState(217);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(216);
					ws();
					}
				}

				setState(219);
				condition();
				setState(220);
				match(NL);
				setState(221);
				recipes_opt();
				setState(222);
				match(ELSE);
				setState(223);
				match(NL);
				setState(224);
				recipes_opt();
				setState(225);
				match(ENDIF);
				setState(226);
				comment_opt();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(228);
				if_eq_kw();
				setState(230);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(229);
					ws();
					}
				}

				setState(232);
				condition();
				setState(233);
				match(NL);
				setState(234);
				recipes_opt();
				setState(235);
				match(ELSE);
				setState(236);
				match(NL);
				setState(237);
				conditional_in_recipe();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(239);
				if_def_kw();
				setState(241);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(240);
					ws();
					}
				}

				setState(243);
				identifier();
				setState(244);
				match(NL);
				setState(245);
				recipes_opt();
				setState(246);
				match(ENDIF);
				setState(247);
				comment_opt();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(249);
				if_def_kw();
				setState(251);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(250);
					ws();
					}
				}

				setState(253);
				identifier();
				setState(254);
				match(NL);
				setState(255);
				recipes_opt();
				setState(256);
				match(ELSE);
				setState(257);
				match(NL);
				setState(258);
				recipes_opt();
				setState(259);
				match(ENDIF);
				setState(260);
				comment_opt();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(262);
				if_def_kw();
				setState(264);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(263);
					ws();
					}
				}

				setState(266);
				identifier();
				setState(267);
				match(NL);
				setState(268);
				recipes_opt();
				setState(269);
				match(ELSE);
				setState(270);
				match(NL);
				setState(271);
				conditional_in_recipe();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Statements_optContext extends ParserRuleContext {
		public Comment_optContext comment_opt() {
			return getRuleContext(Comment_optContext.class,0);
		}
		public BrContext br() {
			return getRuleContext(BrContext.class,0);
		}
		public StatementsContext statements() {
			return getRuleContext(StatementsContext.class,0);
		}
		public Statements_optContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statements_opt; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterStatements_opt(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitStatements_opt(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitStatements_opt(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Statements_optContext statements_opt() throws RecognitionException {
		Statements_optContext _localctx = new Statements_optContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_statements_opt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(275);
			comment_opt();
			setState(276);
			br();
			setState(278);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,17,_ctx) ) {
			case 1:
				{
				setState(277);
				statements();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class StatementContext extends ParserRuleContext {
		public TerminalNode COMMENT() { return getToken(cbuildParser.COMMENT, 0); }
		public WsContext ws() {
			return getRuleContext(WsContext.class,0);
		}
		public AssignmentContext assignment() {
			return getRuleContext(AssignmentContext.class,0);
		}
		public BrContext br() {
			return getRuleContext(BrContext.class,0);
		}
		public FunctionContext function() {
			return getRuleContext(FunctionContext.class,0);
		}
		public RuleContext rule_() {
			return getRuleContext(RuleContext.class,0);
		}
		public ConditionalContext conditional() {
			return getRuleContext(ConditionalContext.class,0);
		}
		public DefineContext define() {
			return getRuleContext(DefineContext.class,0);
		}
		public IncludeContext include() {
			return getRuleContext(IncludeContext.class,0);
		}
		public ExportContext export() {
			return getRuleContext(ExportContext.class,0);
		}
		public VpathContext vpath() {
			return getRuleContext(VpathContext.class,0);
		}
		public StatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statement; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitStatement(this);
			else return visitor.visitChildren(this);
		}
	}

	public final StatementContext statement() throws RecognitionException {
		StatementContext _localctx = new StatementContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_statement);
		int _la;
		try {
			setState(322);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,27,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(281);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(280);
					ws();
					}
				}

				setState(283);
				match(COMMENT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(285);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(284);
					ws();
					}
				}

				setState(287);
				assignment();
				setState(288);
				br();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(291);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(290);
					ws();
					}
				}

				setState(293);
				function();
				setState(294);
				br();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(297);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(296);
					ws();
					}
				}

				setState(299);
				rule_();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(301);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(300);
					ws();
					}
				}

				setState(303);
				conditional();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(305);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(304);
					ws();
					}
				}

				setState(307);
				define();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(309);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(308);
					ws();
					}
				}

				setState(311);
				include();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(313);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(312);
					ws();
					}
				}

				setState(315);
				export();
				setState(316);
				br();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(319);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(318);
					ws();
					}
				}

				setState(321);
				vpath();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DefineContext extends ParserRuleContext {
		public TerminalNode DEFINE() { return getToken(cbuildParser.DEFINE, 0); }
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public PatternContext pattern() {
			return getRuleContext(PatternContext.class,0);
		}
		public DefinitionContext definition() {
			return getRuleContext(DefinitionContext.class,0);
		}
		public TerminalNode ENDEF() { return getToken(cbuildParser.ENDEF, 0); }
		public BrContext br() {
			return getRuleContext(BrContext.class,0);
		}
		public SpecifiersContext specifiers() {
			return getRuleContext(SpecifiersContext.class,0);
		}
		public TerminalNode ASSIGN_OP() { return getToken(cbuildParser.ASSIGN_OP, 0); }
		public DefineContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_define; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterDefine(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitDefine(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitDefine(this);
			else return visitor.visitChildren(this);
		}
	}

	public final DefineContext define() throws RecognitionException {
		DefineContext _localctx = new DefineContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_define);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(325);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 125829120L) != 0)) {
				{
				setState(324);
				specifiers();
				}
			}

			setState(327);
			match(DEFINE);
			setState(328);
			ws();
			setState(329);
			pattern();
			setState(331);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,29,_ctx) ) {
			case 1:
				{
				setState(330);
				ws();
				}
				break;
			}
			setState(334);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ASSIGN_OP) {
				{
				setState(333);
				match(ASSIGN_OP);
				}
			}

			setState(337);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(336);
				ws();
				}
			}

			setState(339);
			definition();
			setState(340);
			match(ENDEF);
			setState(341);
			br();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DefinitionContext extends ParserRuleContext {
		public Comment_optContext comment_opt() {
			return getRuleContext(Comment_optContext.class,0);
		}
		public List<BrContext> br() {
			return getRuleContexts(BrContext.class);
		}
		public BrContext br(int i) {
			return getRuleContext(BrContext.class,i);
		}
		public Exprs_in_defContext exprs_in_def() {
			return getRuleContext(Exprs_in_defContext.class,0);
		}
		public DefinitionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_definition; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterDefinition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitDefinition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitDefinition(this);
			else return visitor.visitChildren(this);
		}
	}

	public final DefinitionContext definition() throws RecognitionException {
		DefinitionContext _localctx = new DefinitionContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_definition);
		try {
			setState(351);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,32,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(343);
				comment_opt();
				setState(344);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(346);
				comment_opt();
				setState(347);
				br();
				setState(348);
				exprs_in_def();
				setState(349);
				br();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IncludeContext extends ParserRuleContext {
		public Include_kwContext include_kw() {
			return getRuleContext(Include_kwContext.class,0);
		}
		public ExpressionsContext expressions() {
			return getRuleContext(ExpressionsContext.class,0);
		}
		public BrContext br() {
			return getRuleContext(BrContext.class,0);
		}
		public IncludeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_include; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterInclude(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitInclude(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitInclude(this);
			else return visitor.visitChildren(this);
		}
	}

	public final IncludeContext include() throws RecognitionException {
		IncludeContext _localctx = new IncludeContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_include);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(353);
			include_kw();
			setState(354);
			expressions();
			setState(355);
			br();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExportContext extends ParserRuleContext {
		public TerminalNode EXPORT() { return getToken(cbuildParser.EXPORT, 0); }
		public TerminalNode UNEXPORT() { return getToken(cbuildParser.UNEXPORT, 0); }
		public Assignment_prefixContext assignment_prefix() {
			return getRuleContext(Assignment_prefixContext.class,0);
		}
		public WsContext ws() {
			return getRuleContext(WsContext.class,0);
		}
		public TargetsContext targets() {
			return getRuleContext(TargetsContext.class,0);
		}
		public ExportContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_export; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExport(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExport(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExport(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExportContext export() throws RecognitionException {
		ExportContext _localctx = new ExportContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_export);
		int _la;
		try {
			setState(365);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,34,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(357);
				match(EXPORT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(358);
				match(UNEXPORT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(359);
				assignment_prefix();
				setState(363);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(360);
					ws();
					setState(361);
					targets();
					}
				}

				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class VpathContext extends ParserRuleContext {
		public TerminalNode VPATH() { return getToken(cbuildParser.VPATH, 0); }
		public Comment_optContext comment_opt() {
			return getRuleContext(Comment_optContext.class,0);
		}
		public BrContext br() {
			return getRuleContext(BrContext.class,0);
		}
		public Vpath_argsContext vpath_args() {
			return getRuleContext(Vpath_argsContext.class,0);
		}
		public VpathContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_vpath; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterVpath(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitVpath(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitVpath(this);
			else return visitor.visitChildren(this);
		}
	}

	public final VpathContext vpath() throws RecognitionException {
		VpathContext _localctx = new VpathContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_vpath);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(367);
			match(VPATH);
			setState(369);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(368);
				vpath_args();
				}
			}

			setState(371);
			comment_opt();
			setState(372);
			br();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Vpath_argsContext extends ParserRuleContext {
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public PatternContext pattern() {
			return getRuleContext(PatternContext.class,0);
		}
		public ExpressionsContext expressions() {
			return getRuleContext(ExpressionsContext.class,0);
		}
		public Vpath_argsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_vpath_args; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterVpath_args(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitVpath_args(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitVpath_args(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Vpath_argsContext vpath_args() throws RecognitionException {
		Vpath_argsContext _localctx = new Vpath_argsContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_vpath_args);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(374);
			ws();
			setState(375);
			pattern();
			setState(379);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(376);
				ws();
				setState(377);
				expressions();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class AssignmentContext extends ParserRuleContext {
		public PatternContext pattern() {
			return getRuleContext(PatternContext.class,0);
		}
		public TerminalNode ASSIGN_OP() { return getToken(cbuildParser.ASSIGN_OP, 0); }
		public Comment_optContext comment_opt() {
			return getRuleContext(Comment_optContext.class,0);
		}
		public WsContext ws() {
			return getRuleContext(WsContext.class,0);
		}
		public Exprs_in_assignContext exprs_in_assign() {
			return getRuleContext(Exprs_in_assignContext.class,0);
		}
		public Assignment_prefixContext assignment_prefix() {
			return getRuleContext(Assignment_prefixContext.class,0);
		}
		public AssignmentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignment; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterAssignment(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitAssignment(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitAssignment(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AssignmentContext assignment() throws RecognitionException {
		AssignmentContext _localctx = new AssignmentContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_assignment);
		int _la;
		try {
			setState(401);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,41,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(381);
				pattern();
				setState(383);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(382);
					ws();
					}
				}

				setState(385);
				match(ASSIGN_OP);
				setState(387);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,38,_ctx) ) {
				case 1:
					{
					setState(386);
					exprs_in_assign();
					}
					break;
				}
				setState(389);
				comment_opt();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(391);
				assignment_prefix();
				setState(393);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(392);
					ws();
					}
				}

				setState(395);
				match(ASSIGN_OP);
				setState(397);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,40,_ctx) ) {
				case 1:
					{
					setState(396);
					exprs_in_assign();
					}
					break;
				}
				setState(399);
				comment_opt();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Assignment_prefixContext extends ParserRuleContext {
		public SpecifiersContext specifiers() {
			return getRuleContext(SpecifiersContext.class,0);
		}
		public WsContext ws() {
			return getRuleContext(WsContext.class,0);
		}
		public PatternContext pattern() {
			return getRuleContext(PatternContext.class,0);
		}
		public Assignment_prefixContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignment_prefix; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterAssignment_prefix(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitAssignment_prefix(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitAssignment_prefix(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Assignment_prefixContext assignment_prefix() throws RecognitionException {
		Assignment_prefixContext _localctx = new Assignment_prefixContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_assignment_prefix);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(403);
			specifiers();
			setState(404);
			ws();
			setState(405);
			pattern();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class If_eq_kwContext extends ParserRuleContext {
		public TerminalNode IFEQ() { return getToken(cbuildParser.IFEQ, 0); }
		public TerminalNode IFNEQ() { return getToken(cbuildParser.IFNEQ, 0); }
		public If_eq_kwContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_if_eq_kw; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterIf_eq_kw(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitIf_eq_kw(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitIf_eq_kw(this);
			else return visitor.visitChildren(this);
		}
	}

	public final If_eq_kwContext if_eq_kw() throws RecognitionException {
		If_eq_kwContext _localctx = new If_eq_kwContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_if_eq_kw);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(407);
			_la = _input.LA(1);
			if ( !(_la==IFEQ || _la==IFNEQ) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class If_def_kwContext extends ParserRuleContext {
		public TerminalNode IFDEF() { return getToken(cbuildParser.IFDEF, 0); }
		public TerminalNode IFNDEF() { return getToken(cbuildParser.IFNDEF, 0); }
		public If_def_kwContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_if_def_kw; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterIf_def_kw(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitIf_def_kw(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitIf_def_kw(this);
			else return visitor.visitChildren(this);
		}
	}

	public final If_def_kwContext if_def_kw() throws RecognitionException {
		If_def_kwContext _localctx = new If_def_kwContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_if_def_kw);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(409);
			_la = _input.LA(1);
			if ( !(_la==IFDEF || _la==IFNDEF) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Include_kwContext extends ParserRuleContext {
		public TerminalNode INCLUDE() { return getToken(cbuildParser.INCLUDE, 0); }
		public TerminalNode DASH_INCLUDE() { return getToken(cbuildParser.DASH_INCLUDE, 0); }
		public TerminalNode SINCLUDE() { return getToken(cbuildParser.SINCLUDE, 0); }
		public Include_kwContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_include_kw; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterInclude_kw(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitInclude_kw(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitInclude_kw(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Include_kwContext include_kw() throws RecognitionException {
		Include_kwContext _localctx = new Include_kwContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_include_kw);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(411);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 57344L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ConditionContext extends ParserRuleContext {
		public TerminalNode LPAREN() { return getToken(cbuildParser.LPAREN, 0); }
		public List<Expressions_optContext> expressions_opt() {
			return getRuleContexts(Expressions_optContext.class);
		}
		public Expressions_optContext expressions_opt(int i) {
			return getRuleContext(Expressions_optContext.class,i);
		}
		public TerminalNode COMMA() { return getToken(cbuildParser.COMMA, 0); }
		public TerminalNode RPAREN() { return getToken(cbuildParser.RPAREN, 0); }
		public List<TerminalNode> SLIT() { return getTokens(cbuildParser.SLIT); }
		public TerminalNode SLIT(int i) {
			return getToken(cbuildParser.SLIT, i);
		}
		public WsContext ws() {
			return getRuleContext(WsContext.class,0);
		}
		public ConditionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_condition; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterCondition(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitCondition(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitCondition(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ConditionContext condition() throws RecognitionException {
		ConditionContext _localctx = new ConditionContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_condition);
		int _la;
		try {
			setState(424);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LPAREN:
				enterOuterAlt(_localctx, 1);
				{
				setState(413);
				match(LPAREN);
				setState(414);
				expressions_opt();
				setState(415);
				match(COMMA);
				setState(416);
				expressions_opt();
				setState(417);
				match(RPAREN);
				}
				break;
			case SLIT:
				enterOuterAlt(_localctx, 2);
				{
				setState(419);
				match(SLIT);
				setState(421);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(420);
					ws();
					}
				}

				setState(423);
				match(SLIT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Expressions_optContext extends ParserRuleContext {
		public ExpressionsContext expressions() {
			return getRuleContext(ExpressionsContext.class,0);
		}
		public Expressions_optContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressions_opt; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExpressions_opt(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExpressions_opt(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExpressions_opt(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Expressions_optContext expressions_opt() throws RecognitionException {
		Expressions_optContext _localctx = new Expressions_optContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_expressions_opt);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(427);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 27380416958L) != 0)) {
				{
				setState(426);
				expressions();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExpressionsContext extends ParserRuleContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public ExpressionsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressions; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExpressions(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExpressions(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExpressions(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExpressionsContext expressions() throws RecognitionException {
		ExpressionsContext _localctx = new ExpressionsContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_expressions);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(430);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(429);
				ws();
				}
			}

			setState(432);
			expression();
			setState(434);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,46,_ctx) ) {
			case 1:
				{
				setState(433);
				ws();
				}
				break;
			}
			setState(441);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,47,_ctx);
			while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(436);
					ws();
					setState(437);
					expression();
					}
					} 
				}
				setState(443);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,47,_ctx);
			}
			setState(445);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(444);
				ws();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Exprs_nestedContext extends ParserRuleContext {
		public List<Expr_nestedContext> expr_nested() {
			return getRuleContexts(Expr_nestedContext.class);
		}
		public Expr_nestedContext expr_nested(int i) {
			return getRuleContext(Expr_nestedContext.class,i);
		}
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public Exprs_nestedContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_exprs_nested; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExprs_nested(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExprs_nested(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExprs_nested(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Exprs_nestedContext exprs_nested() throws RecognitionException {
		Exprs_nestedContext _localctx = new Exprs_nestedContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_exprs_nested);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(448);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(447);
				ws();
				}
			}

			setState(450);
			expr_nested();
			setState(452);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,50,_ctx) ) {
			case 1:
				{
				setState(451);
				ws();
				}
				break;
			}
			setState(459);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,51,_ctx);
			while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(454);
					ws();
					setState(455);
					expr_nested();
					}
					} 
				}
				setState(461);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,51,_ctx);
			}
			setState(463);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(462);
				ws();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Exprs_in_assignContext extends ParserRuleContext {
		public List<Expr_in_assignContext> expr_in_assign() {
			return getRuleContexts(Expr_in_assignContext.class);
		}
		public Expr_in_assignContext expr_in_assign(int i) {
			return getRuleContext(Expr_in_assignContext.class,i);
		}
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public Exprs_in_assignContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_exprs_in_assign; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExprs_in_assign(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExprs_in_assign(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExprs_in_assign(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Exprs_in_assignContext exprs_in_assign() throws RecognitionException {
		Exprs_in_assignContext _localctx = new Exprs_in_assignContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_exprs_in_assign);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(466);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(465);
				ws();
				}
			}

			setState(468);
			expr_in_assign();
			setState(470);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,54,_ctx) ) {
			case 1:
				{
				setState(469);
				ws();
				}
				break;
			}
			setState(477);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,55,_ctx);
			while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(472);
					ws();
					setState(473);
					expr_in_assign();
					}
					} 
				}
				setState(479);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,55,_ctx);
			}
			setState(481);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,56,_ctx) ) {
			case 1:
				{
				setState(480);
				ws();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Exprs_in_recipeContext extends ParserRuleContext {
		public List<Expr_in_recipeContext> expr_in_recipe() {
			return getRuleContexts(Expr_in_recipeContext.class);
		}
		public Expr_in_recipeContext expr_in_recipe(int i) {
			return getRuleContext(Expr_in_recipeContext.class,i);
		}
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public Exprs_in_recipeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_exprs_in_recipe; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExprs_in_recipe(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExprs_in_recipe(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExprs_in_recipe(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Exprs_in_recipeContext exprs_in_recipe() throws RecognitionException {
		Exprs_in_recipeContext _localctx = new Exprs_in_recipeContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_exprs_in_recipe);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(484);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(483);
				ws();
				}
			}

			setState(486);
			expr_in_recipe();
			setState(488);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,58,_ctx) ) {
			case 1:
				{
				setState(487);
				ws();
				}
				break;
			}
			setState(495);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,59,_ctx);
			while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(490);
					ws();
					setState(491);
					expr_in_recipe();
					}
					} 
				}
				setState(497);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,59,_ctx);
			}
			setState(499);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(498);
				ws();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Exprs_in_defContext extends ParserRuleContext {
		public List<BrContext> br() {
			return getRuleContexts(BrContext.class);
		}
		public BrContext br(int i) {
			return getRuleContext(BrContext.class,i);
		}
		public List<First_expr_in_defContext> first_expr_in_def() {
			return getRuleContexts(First_expr_in_defContext.class);
		}
		public First_expr_in_defContext first_expr_in_def(int i) {
			return getRuleContext(First_expr_in_defContext.class,i);
		}
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public List<Expr_in_recipeContext> expr_in_recipe() {
			return getRuleContexts(Expr_in_recipeContext.class);
		}
		public Expr_in_recipeContext expr_in_recipe(int i) {
			return getRuleContext(Expr_in_recipeContext.class,i);
		}
		public Exprs_in_defContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_exprs_in_def; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExprs_in_def(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExprs_in_def(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExprs_in_def(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Exprs_in_defContext exprs_in_def() throws RecognitionException {
		Exprs_in_defContext _localctx = new Exprs_in_defContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_exprs_in_def);
		int _la;
		try {
			int _alt;
			setState(518);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,64,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(501);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(503);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==NL) {
					{
					setState(502);
					br();
					}
				}

				setState(505);
				first_expr_in_def();
				setState(515);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,63,_ctx);
				while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						setState(513);
						_errHandler.sync(this);
						switch ( getInterpreter().adaptivePredict(_input,62,_ctx) ) {
						case 1:
							{
							{
							setState(506);
							br();
							setState(507);
							first_expr_in_def();
							}
							}
							break;
						case 2:
							{
							{
							setState(509);
							br();
							}
							}
							break;
						case 3:
							{
							{
							setState(510);
							ws();
							setState(511);
							expr_in_recipe();
							}
							}
							break;
						}
						} 
					}
					setState(517);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,63,_ctx);
				}
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class First_expr_in_defContext extends ParserRuleContext {
		public Char_in_defContext char_in_def() {
			return getRuleContext(Char_in_defContext.class,0);
		}
		public FunctionContext function() {
			return getRuleContext(FunctionContext.class,0);
		}
		public Expr_in_recipeContext expr_in_recipe() {
			return getRuleContext(Expr_in_recipeContext.class,0);
		}
		public First_expr_in_defContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_first_expr_in_def; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterFirst_expr_in_def(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitFirst_expr_in_def(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitFirst_expr_in_def(this);
			else return visitor.visitChildren(this);
		}
	}

	public final First_expr_in_defContext first_expr_in_def() throws RecognitionException {
		First_expr_in_defContext _localctx = new First_expr_in_defContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_first_expr_in_def);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(522);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case LPAREN:
			case RPAREN:
			case COMMA:
			case INCLUDE:
			case IFDEF:
			case IFNDEF:
			case IFEQ:
			case IFNEQ:
			case ELSE:
			case ENDIF:
			case OVERRIDE:
			case EXPORT:
			case UNEXPORT:
			case UNDEFINE:
			case DEFINE:
			case SLIT:
			case CHARS:
			case COMMENT:
				{
				setState(520);
				char_in_def();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				{
				setState(521);
				function();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(525);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 36507169726L) != 0)) {
				{
				setState(524);
				expr_in_recipe();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExpressionContext extends ParserRuleContext {
		public List<Expression_atomContext> expression_atom() {
			return getRuleContexts(Expression_atomContext.class);
		}
		public Expression_atomContext expression_atom(int i) {
			return getRuleContext(Expression_atomContext.class,i);
		}
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExpressionContext expression() throws RecognitionException {
		ExpressionContext _localctx = new ExpressionContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_expression);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(528); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(527);
				expression_atom();
				}
				}
				setState(530); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 1610613182L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Expression_atomContext extends ParserRuleContext {
		public TextContext text() {
			return getRuleContext(TextContext.class,0);
		}
		public FunctionContext function() {
			return getRuleContext(FunctionContext.class,0);
		}
		public TerminalNode LPAREN() { return getToken(cbuildParser.LPAREN, 0); }
		public Exprs_nestedContext exprs_nested() {
			return getRuleContext(Exprs_nestedContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(cbuildParser.RPAREN, 0); }
		public Expression_atomContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression_atom; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExpression_atom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExpression_atom(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExpression_atom(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Expression_atomContext expression_atom() throws RecognitionException {
		Expression_atomContext _localctx = new Expression_atomContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_expression_atom);
		try {
			setState(538);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(532);
				text();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(533);
				function();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(534);
				match(LPAREN);
				setState(535);
				exprs_nested();
				setState(536);
				match(RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Expr_nestedContext extends ParserRuleContext {
		public List<Expr_nested_atomContext> expr_nested_atom() {
			return getRuleContexts(Expr_nested_atomContext.class);
		}
		public Expr_nested_atomContext expr_nested_atom(int i) {
			return getRuleContext(Expr_nested_atomContext.class,i);
		}
		public Expr_nestedContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr_nested; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExpr_nested(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExpr_nested(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExpr_nested(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Expr_nestedContext expr_nested() throws RecognitionException {
		Expr_nestedContext _localctx = new Expr_nestedContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_expr_nested);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(541); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(540);
				expr_nested_atom();
				}
				}
				setState(543); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 1610617278L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Expr_nested_atomContext extends ParserRuleContext {
		public Text_nestedContext text_nested() {
			return getRuleContext(Text_nestedContext.class,0);
		}
		public FunctionContext function() {
			return getRuleContext(FunctionContext.class,0);
		}
		public TerminalNode LPAREN() { return getToken(cbuildParser.LPAREN, 0); }
		public Exprs_nestedContext exprs_nested() {
			return getRuleContext(Exprs_nestedContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(cbuildParser.RPAREN, 0); }
		public Expr_nested_atomContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr_nested_atom; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExpr_nested_atom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExpr_nested_atom(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExpr_nested_atom(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Expr_nested_atomContext expr_nested_atom() throws RecognitionException {
		Expr_nested_atomContext _localctx = new Expr_nested_atomContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_expr_nested_atom);
		try {
			setState(551);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case COMMA:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(545);
				text_nested();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(546);
				function();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(547);
				match(LPAREN);
				setState(548);
				exprs_nested();
				setState(549);
				match(RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Expr_in_assignContext extends ParserRuleContext {
		public List<Expr_in_assign_atomContext> expr_in_assign_atom() {
			return getRuleContexts(Expr_in_assign_atomContext.class);
		}
		public Expr_in_assign_atomContext expr_in_assign_atom(int i) {
			return getRuleContext(Expr_in_assign_atomContext.class,i);
		}
		public Expr_in_assignContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr_in_assign; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExpr_in_assign(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExpr_in_assign(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExpr_in_assign(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Expr_in_assignContext expr_in_assign() throws RecognitionException {
		Expr_in_assignContext _localctx = new Expr_in_assignContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_expr_in_assign);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(554); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(553);
				expr_in_assign_atom();
				}
				}
				setState(556); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 2147431358L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Expr_in_assign_atomContext extends ParserRuleContext {
		public Text_in_assignContext text_in_assign() {
			return getRuleContext(Text_in_assignContext.class,0);
		}
		public FunctionContext function() {
			return getRuleContext(FunctionContext.class,0);
		}
		public Expr_in_assign_atomContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr_in_assign_atom; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExpr_in_assign_atom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExpr_in_assign_atom(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExpr_in_assign_atom(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Expr_in_assign_atomContext expr_in_assign_atom() throws RecognitionException {
		Expr_in_assign_atomContext _localctx = new Expr_in_assign_atomContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_expr_in_assign_atom);
		try {
			setState(560);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case LPAREN:
			case RPAREN:
			case COMMA:
			case INCLUDE:
			case ENDEF:
			case IFDEF:
			case IFNDEF:
			case IFEQ:
			case IFNEQ:
			case ELSE:
			case ENDIF:
			case OVERRIDE:
			case EXPORT:
			case UNEXPORT:
			case UNDEFINE:
			case DEFINE:
			case VPATH:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(558);
				text_in_assign();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(559);
				function();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Expr_in_recipeContext extends ParserRuleContext {
		public List<Expr_in_recipe_atomContext> expr_in_recipe_atom() {
			return getRuleContexts(Expr_in_recipe_atomContext.class);
		}
		public Expr_in_recipe_atomContext expr_in_recipe_atom(int i) {
			return getRuleContext(Expr_in_recipe_atomContext.class,i);
		}
		public Expr_in_recipeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr_in_recipe; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExpr_in_recipe(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExpr_in_recipe(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExpr_in_recipe(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Expr_in_recipeContext expr_in_recipe() throws RecognitionException {
		Expr_in_recipeContext _localctx = new Expr_in_recipeContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_expr_in_recipe);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(563); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(562);
				expr_in_recipe_atom();
				}
				}
				setState(565); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 36507169726L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Expr_in_recipe_atomContext extends ParserRuleContext {
		public Text_in_recipeContext text_in_recipe() {
			return getRuleContext(Text_in_recipeContext.class,0);
		}
		public FunctionContext function() {
			return getRuleContext(FunctionContext.class,0);
		}
		public Expr_in_recipe_atomContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr_in_recipe_atom; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterExpr_in_recipe_atom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitExpr_in_recipe_atom(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitExpr_in_recipe_atom(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Expr_in_recipe_atomContext expr_in_recipe_atom() throws RecognitionException {
		Expr_in_recipe_atomContext _localctx = new Expr_in_recipe_atomContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_expr_in_recipe_atom);
		try {
			setState(569);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case LPAREN:
			case RPAREN:
			case COMMA:
			case INCLUDE:
			case ENDEF:
			case IFDEF:
			case IFNDEF:
			case IFEQ:
			case IFNEQ:
			case ELSE:
			case ENDIF:
			case OVERRIDE:
			case EXPORT:
			case UNEXPORT:
			case UNDEFINE:
			case DEFINE:
			case VPATH:
			case SLIT:
			case CHARS:
			case COMMENT:
				enterOuterAlt(_localctx, 1);
				{
				setState(567);
				text_in_recipe();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(568);
				function();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FunctionContext extends ParserRuleContext {
		public TerminalNode VAR() { return getToken(cbuildParser.VAR, 0); }
		public TerminalNode DOLLAR_LPAREN() { return getToken(cbuildParser.DOLLAR_LPAREN, 0); }
		public Function_nameContext function_name() {
			return getRuleContext(Function_nameContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(cbuildParser.RPAREN, 0); }
		public WsContext ws() {
			return getRuleContext(WsContext.class,0);
		}
		public ArgumentsContext arguments() {
			return getRuleContext(ArgumentsContext.class,0);
		}
		public TerminalNode COMMA() { return getToken(cbuildParser.COMMA, 0); }
		public TerminalNode COLON() { return getToken(cbuildParser.COLON, 0); }
		public ExpressionsContext expressions() {
			return getRuleContext(ExpressionsContext.class,0);
		}
		public TerminalNode ASSIGN_OP() { return getToken(cbuildParser.ASSIGN_OP, 0); }
		public TerminalNode DOLLAR_L_CURLY_BRACE() { return getToken(cbuildParser.DOLLAR_L_CURLY_BRACE, 0); }
		public TerminalNode R_CURLY_BRACE() { return getToken(cbuildParser.R_CURLY_BRACE, 0); }
		public FunctionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_function; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterFunction(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitFunction(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitFunction(this);
			else return visitor.visitChildren(this);
		}
	}

	public final FunctionContext function() throws RecognitionException {
		FunctionContext _localctx = new FunctionContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_function);
		try {
			setState(628);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,75,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(571);
				match(VAR);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(572);
				match(DOLLAR_LPAREN);
				setState(573);
				function_name();
				setState(574);
				match(RPAREN);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(576);
				match(DOLLAR_LPAREN);
				setState(577);
				function_name();
				setState(578);
				ws();
				setState(579);
				arguments();
				setState(580);
				match(RPAREN);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(582);
				match(DOLLAR_LPAREN);
				setState(583);
				function_name();
				setState(584);
				match(COMMA);
				setState(585);
				arguments();
				setState(586);
				match(RPAREN);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(588);
				match(DOLLAR_LPAREN);
				setState(589);
				function_name();
				setState(590);
				match(COLON);
				setState(591);
				expressions();
				setState(592);
				match(RPAREN);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(594);
				match(DOLLAR_LPAREN);
				setState(595);
				function_name();
				setState(596);
				match(ASSIGN_OP);
				setState(597);
				expressions();
				setState(598);
				match(RPAREN);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(600);
				match(DOLLAR_L_CURLY_BRACE);
				setState(601);
				function_name();
				setState(602);
				match(R_CURLY_BRACE);
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(604);
				match(DOLLAR_L_CURLY_BRACE);
				setState(605);
				function_name();
				setState(606);
				ws();
				setState(607);
				arguments();
				setState(608);
				match(R_CURLY_BRACE);
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(610);
				match(DOLLAR_L_CURLY_BRACE);
				setState(611);
				function_name();
				setState(612);
				match(COMMA);
				setState(613);
				arguments();
				setState(614);
				match(R_CURLY_BRACE);
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(616);
				match(DOLLAR_L_CURLY_BRACE);
				setState(617);
				function_name();
				setState(618);
				match(COLON);
				setState(619);
				expressions();
				setState(620);
				match(R_CURLY_BRACE);
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(622);
				match(DOLLAR_L_CURLY_BRACE);
				setState(623);
				function_name();
				setState(624);
				match(ASSIGN_OP);
				setState(625);
				expressions();
				setState(626);
				match(R_CURLY_BRACE);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Function_nameContext extends ParserRuleContext {
		public List<Function_name_atomContext> function_name_atom() {
			return getRuleContexts(Function_name_atomContext.class);
		}
		public Function_name_atomContext function_name_atom(int i) {
			return getRuleContext(Function_name_atomContext.class,i);
		}
		public Function_nameContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_function_name; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterFunction_name(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitFunction_name(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitFunction_name(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Function_nameContext function_name() throws RecognitionException {
		Function_nameContext _localctx = new Function_nameContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_function_name);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(631); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(630);
				function_name_atom();
				}
				}
				setState(633); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 1073741852L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Function_name_atomContext extends ParserRuleContext {
		public TerminalNode CHARS() { return getToken(cbuildParser.CHARS, 0); }
		public FunctionContext function() {
			return getRuleContext(FunctionContext.class,0);
		}
		public Function_name_atomContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_function_name_atom; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterFunction_name_atom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitFunction_name_atom(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitFunction_name_atom(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Function_name_atomContext function_name_atom() throws RecognitionException {
		Function_name_atomContext _localctx = new Function_name_atomContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_function_name_atom);
		try {
			setState(637);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(635);
				match(CHARS);
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(636);
				function();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArgumentsContext extends ParserRuleContext {
		public List<ArgumentContext> argument() {
			return getRuleContexts(ArgumentContext.class);
		}
		public ArgumentContext argument(int i) {
			return getRuleContext(ArgumentContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(cbuildParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(cbuildParser.COMMA, i);
		}
		public ArgumentsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_arguments; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterArguments(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitArguments(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitArguments(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ArgumentsContext arguments() throws RecognitionException {
		ArgumentsContext _localctx = new ArgumentsContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_arguments);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(640);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 27380416958L) != 0)) {
				{
				setState(639);
				argument();
				}
			}

			setState(648);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(642);
				match(COMMA);
				setState(644);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 27380416958L) != 0)) {
					{
					setState(643);
					argument();
					}
				}

				}
				}
				setState(650);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArgumentContext extends ParserRuleContext {
		public ExpressionsContext expressions() {
			return getRuleContext(ExpressionsContext.class,0);
		}
		public ArgumentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_argument; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterArgument(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitArgument(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitArgument(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ArgumentContext argument() throws RecognitionException {
		ArgumentContext _localctx = new ArgumentContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_argument);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(651);
			expressions();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RuleContext extends ParserRuleContext {
		public Static_pattern_ruleContext static_pattern_rule() {
			return getRuleContext(Static_pattern_ruleContext.class,0);
		}
		public TargetsContext targets() {
			return getRuleContext(TargetsContext.class,0);
		}
		public ColonContext colon() {
			return getRuleContext(ColonContext.class,0);
		}
		public PrerequisitesContext prerequisites() {
			return getRuleContext(PrerequisitesContext.class,0);
		}
		public TerminalNode NL() { return getToken(cbuildParser.NL, 0); }
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public RecipesContext recipes() {
			return getRuleContext(RecipesContext.class,0);
		}
		public AssignmentContext assignment() {
			return getRuleContext(AssignmentContext.class,0);
		}
		public RuleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_rule; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterRule(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitRule(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitRule(this);
			else return visitor.visitChildren(this);
		}
	}

	public final RuleContext rule_() throws RecognitionException {
		RuleContext _localctx = new RuleContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_rule);
		int _la;
		try {
			setState(684);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,88,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(653);
				static_pattern_rule();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(654);
				targets();
				setState(656);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(655);
					ws();
					}
				}

				setState(658);
				colon();
				setState(660);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,82,_ctx) ) {
				case 1:
					{
					setState(659);
					ws();
					}
					break;
				}
				setState(662);
				prerequisites();
				setState(664);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(663);
					ws();
					}
				}

				setState(666);
				match(NL);
				setState(668);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,84,_ctx) ) {
				case 1:
					{
					setState(667);
					recipes();
					}
					break;
				}
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(670);
				targets();
				setState(672);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(671);
					ws();
					}
				}

				setState(674);
				colon();
				setState(676);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(675);
					ws();
					}
				}

				setState(678);
				assignment();
				setState(680);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(679);
					ws();
					}
				}

				setState(682);
				match(NL);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Static_pattern_ruleContext extends ParserRuleContext {
		public TargetsContext targets() {
			return getRuleContext(TargetsContext.class,0);
		}
		public List<ColonContext> colon() {
			return getRuleContexts(ColonContext.class);
		}
		public ColonContext colon(int i) {
			return getRuleContext(ColonContext.class,i);
		}
		public PatternContext pattern() {
			return getRuleContext(PatternContext.class,0);
		}
		public PrerequisitesContext prerequisites() {
			return getRuleContext(PrerequisitesContext.class,0);
		}
		public TerminalNode NL() { return getToken(cbuildParser.NL, 0); }
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public RecipesContext recipes() {
			return getRuleContext(RecipesContext.class,0);
		}
		public Static_pattern_ruleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_static_pattern_rule; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterStatic_pattern_rule(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitStatic_pattern_rule(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitStatic_pattern_rule(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Static_pattern_ruleContext static_pattern_rule() throws RecognitionException {
		Static_pattern_ruleContext _localctx = new Static_pattern_ruleContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_static_pattern_rule);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(686);
			targets();
			setState(688);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(687);
				ws();
				}
			}

			setState(690);
			colon();
			setState(692);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(691);
				ws();
				}
			}

			setState(694);
			pattern();
			setState(696);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(695);
				ws();
				}
			}

			setState(698);
			colon();
			setState(700);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(699);
				ws();
				}
			}

			setState(702);
			prerequisites();
			setState(703);
			match(NL);
			setState(705);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,93,_ctx) ) {
			case 1:
				{
				setState(704);
				recipes();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TargetContext extends ParserRuleContext {
		public PatternContext pattern() {
			return getRuleContext(PatternContext.class,0);
		}
		public TargetContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_target; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterTarget(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitTarget(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitTarget(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TargetContext target() throws RecognitionException {
		TargetContext _localctx = new TargetContext(_ctx, getState());
		enterRule(_localctx, 80, RULE_target);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(707);
			pattern();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PatternContext extends ParserRuleContext {
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public List<FunctionContext> function() {
			return getRuleContexts(FunctionContext.class);
		}
		public FunctionContext function(int i) {
			return getRuleContext(FunctionContext.class,i);
		}
		public PatternContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_pattern; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterPattern(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitPattern(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitPattern(this);
			else return visitor.visitChildren(this);
		}
	}

	public final PatternContext pattern() throws RecognitionException {
		PatternContext _localctx = new PatternContext(_ctx, getState());
		enterRule(_localctx, 82, RULE_pattern);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(711); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				setState(711);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case LPAREN:
				case RPAREN:
				case COMMA:
				case INCLUDE:
				case ENDEF:
				case IFDEF:
				case IFNDEF:
				case IFEQ:
				case IFNEQ:
				case ELSE:
				case ENDIF:
				case OVERRIDE:
				case EXPORT:
				case UNEXPORT:
				case UNDEFINE:
				case DEFINE:
				case VPATH:
				case CHARS:
					{
					setState(709);
					identifier();
					}
					break;
				case DOLLAR_LPAREN:
				case DOLLAR_L_CURLY_BRACE:
				case VAR:
					{
					setState(710);
					function();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(713); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 1610560284L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PrerequisitesContext extends ParserRuleContext {
		public TargetsContext targets() {
			return getRuleContext(TargetsContext.class,0);
		}
		public PrerequisitesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_prerequisites; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterPrerequisites(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitPrerequisites(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitPrerequisites(this);
			else return visitor.visitChildren(this);
		}
	}

	public final PrerequisitesContext prerequisites() throws RecognitionException {
		PrerequisitesContext _localctx = new PrerequisitesContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_prerequisites);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(716);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 1610560284L) != 0)) {
				{
				setState(715);
				targets();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TargetsContext extends ParserRuleContext {
		public List<TargetContext> target() {
			return getRuleContexts(TargetContext.class);
		}
		public TargetContext target(int i) {
			return getRuleContext(TargetContext.class,i);
		}
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public TargetsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_targets; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterTargets(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitTargets(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitTargets(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TargetsContext targets() throws RecognitionException {
		TargetsContext _localctx = new TargetsContext(_ctx, getState());
		enterRule(_localctx, 86, RULE_targets);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(718);
			target();
			setState(724);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,97,_ctx);
			while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(719);
					ws();
					setState(720);
					target();
					}
					} 
				}
				setState(726);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,97,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RecipesContext extends ParserRuleContext {
		public List<RecipeContext> recipe() {
			return getRuleContexts(RecipeContext.class);
		}
		public RecipeContext recipe(int i) {
			return getRuleContext(RecipeContext.class,i);
		}
		public RecipesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_recipes; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterRecipes(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitRecipes(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitRecipes(this);
			else return visitor.visitChildren(this);
		}
	}

	public final RecipesContext recipes() throws RecognitionException {
		RecipesContext _localctx = new RecipesContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_recipes);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(728); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(727);
					recipe();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(730); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,98,_ctx);
			} while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Recipes_optContext extends ParserRuleContext {
		public Comment_optContext comment_opt() {
			return getRuleContext(Comment_optContext.class,0);
		}
		public RecipesContext recipes() {
			return getRuleContext(RecipesContext.class,0);
		}
		public Recipes_optContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_recipes_opt; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterRecipes_opt(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitRecipes_opt(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitRecipes_opt(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Recipes_optContext recipes_opt() throws RecognitionException {
		Recipes_optContext _localctx = new Recipes_optContext(_ctx, getState());
		enterRule(_localctx, 90, RULE_recipes_opt);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(732);
			comment_opt();
			setState(734);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 66573959168L) != 0)) {
				{
				setState(733);
				recipes();
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RecipeContext extends ParserRuleContext {
		public TerminalNode LEADING_TAB() { return getToken(cbuildParser.LEADING_TAB, 0); }
		public Exprs_in_recipeContext exprs_in_recipe() {
			return getRuleContext(Exprs_in_recipeContext.class,0);
		}
		public TerminalNode NL() { return getToken(cbuildParser.NL, 0); }
		public WsContext ws() {
			return getRuleContext(WsContext.class,0);
		}
		public TerminalNode COMMENT() { return getToken(cbuildParser.COMMENT, 0); }
		public Conditional_in_recipeContext conditional_in_recipe() {
			return getRuleContext(Conditional_in_recipeContext.class,0);
		}
		public RecipeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_recipe; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterRecipe(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitRecipe(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitRecipe(this);
			else return visitor.visitChildren(this);
		}
	}

	public final RecipeContext recipe() throws RecognitionException {
		RecipeContext _localctx = new RecipeContext(_ctx, getState());
		enterRule(_localctx, 92, RULE_recipe);
		int _la;
		try {
			setState(756);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,103,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(736);
				match(LEADING_TAB);
				setState(738);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,100,_ctx) ) {
				case 1:
					{
					setState(737);
					ws();
					}
					break;
				}
				setState(740);
				exprs_in_recipe();
				setState(741);
				match(NL);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(743);
				match(LEADING_TAB);
				setState(745);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(744);
					ws();
					}
				}

				setState(747);
				match(COMMENT);
				setState(748);
				match(NL);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(750);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(749);
					ws();
					}
				}

				setState(752);
				match(COMMENT);
				setState(753);
				match(NL);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(754);
				conditional_in_recipe();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(755);
				match(NL);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SpecifiersContext extends ParserRuleContext {
		public TerminalNode OVERRIDE() { return getToken(cbuildParser.OVERRIDE, 0); }
		public TerminalNode EXPORT() { return getToken(cbuildParser.EXPORT, 0); }
		public TerminalNode UNEXPORT() { return getToken(cbuildParser.UNEXPORT, 0); }
		public WsContext ws() {
			return getRuleContext(WsContext.class,0);
		}
		public TerminalNode UNDEFINE() { return getToken(cbuildParser.UNDEFINE, 0); }
		public SpecifiersContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_specifiers; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterSpecifiers(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitSpecifiers(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitSpecifiers(this);
			else return visitor.visitChildren(this);
		}
	}

	public final SpecifiersContext specifiers() throws RecognitionException {
		SpecifiersContext _localctx = new SpecifiersContext(_ctx, getState());
		enterRule(_localctx, 94, RULE_specifiers);
		try {
			setState(778);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,104,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(758);
				match(OVERRIDE);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(759);
				match(EXPORT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(760);
				match(UNEXPORT);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(761);
				match(OVERRIDE);
				setState(762);
				ws();
				setState(763);
				match(EXPORT);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(765);
				match(EXPORT);
				setState(766);
				ws();
				setState(767);
				match(OVERRIDE);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(769);
				match(UNDEFINE);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(770);
				match(OVERRIDE);
				setState(771);
				ws();
				setState(772);
				match(UNDEFINE);
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(774);
				match(UNDEFINE);
				setState(775);
				ws();
				setState(776);
				match(OVERRIDE);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IdentifierContext extends ParserRuleContext {
		public List<Identifier_atomContext> identifier_atom() {
			return getRuleContexts(Identifier_atomContext.class);
		}
		public Identifier_atomContext identifier_atom(int i) {
			return getRuleContext(Identifier_atomContext.class,i);
		}
		public IdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifier; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterIdentifier(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitIdentifier(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitIdentifier(this);
			else return visitor.visitChildren(this);
		}
	}

	public final IdentifierContext identifier() throws RecognitionException {
		IdentifierContext _localctx = new IdentifierContext(_ctx, getState());
		enterRule(_localctx, 96, RULE_identifier);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(781); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(780);
					identifier_atom();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(783); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,105,_ctx);
			} while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Identifier_atomContext extends ParserRuleContext {
		public TerminalNode CHARS() { return getToken(cbuildParser.CHARS, 0); }
		public KeywordsContext keywords() {
			return getRuleContext(KeywordsContext.class,0);
		}
		public TerminalNode COMMA() { return getToken(cbuildParser.COMMA, 0); }
		public TerminalNode LPAREN() { return getToken(cbuildParser.LPAREN, 0); }
		public TerminalNode RPAREN() { return getToken(cbuildParser.RPAREN, 0); }
		public Identifier_atomContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifier_atom; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterIdentifier_atom(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitIdentifier_atom(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitIdentifier_atom(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Identifier_atomContext identifier_atom() throws RecognitionException {
		Identifier_atomContext _localctx = new Identifier_atomContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_identifier_atom);
		try {
			setState(790);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(785);
				match(CHARS);
				}
				break;
			case INCLUDE:
			case ENDEF:
			case IFDEF:
			case IFNDEF:
			case IFEQ:
			case IFNEQ:
			case ELSE:
			case ENDIF:
			case OVERRIDE:
			case EXPORT:
			case UNEXPORT:
			case UNDEFINE:
			case DEFINE:
			case VPATH:
				enterOuterAlt(_localctx, 2);
				{
				setState(786);
				keywords();
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 3);
				{
				setState(787);
				match(COMMA);
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 4);
				{
				setState(788);
				match(LPAREN);
				}
				break;
			case RPAREN:
				enterOuterAlt(_localctx, 5);
				{
				setState(789);
				match(RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BrContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(cbuildParser.NL, 0); }
		public BrContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_br; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterBr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitBr(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitBr(this);
			else return visitor.visitChildren(this);
		}
	}

	public final BrContext br() throws RecognitionException {
		BrContext _localctx = new BrContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_br);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(792);
			match(NL);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CharContext extends ParserRuleContext {
		public TerminalNode CHARS() { return getToken(cbuildParser.CHARS, 0); }
		public TerminalNode SLIT() { return getToken(cbuildParser.SLIT, 0); }
		public TerminalNode ASSIGN_OP() { return getToken(cbuildParser.ASSIGN_OP, 0); }
		public TerminalNode COLON() { return getToken(cbuildParser.COLON, 0); }
		public TerminalNode DOUBLE_DOLLAR() { return getToken(cbuildParser.DOUBLE_DOLLAR, 0); }
		public CharContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_char; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterChar(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitChar(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitChar(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CharContext char_() throws RecognitionException {
		CharContext _localctx = new CharContext(_ctx, getState());
		enterRule(_localctx, 102, RULE_char);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(794);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 1610612898L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Char_nestedContext extends ParserRuleContext {
		public CharContext char_() {
			return getRuleContext(CharContext.class,0);
		}
		public TerminalNode COMMA() { return getToken(cbuildParser.COMMA, 0); }
		public Char_nestedContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_char_nested; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterChar_nested(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitChar_nested(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitChar_nested(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Char_nestedContext char_nested() throws RecognitionException {
		Char_nestedContext _localctx = new Char_nestedContext(_ctx, getState());
		enterRule(_localctx, 104, RULE_char_nested);
		try {
			setState(798);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(796);
				char_();
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 2);
				{
				setState(797);
				match(COMMA);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Char_in_assignContext extends ParserRuleContext {
		public Char_nestedContext char_nested() {
			return getRuleContext(Char_nestedContext.class,0);
		}
		public TerminalNode LPAREN() { return getToken(cbuildParser.LPAREN, 0); }
		public TerminalNode RPAREN() { return getToken(cbuildParser.RPAREN, 0); }
		public KeywordsContext keywords() {
			return getRuleContext(KeywordsContext.class,0);
		}
		public Char_in_assignContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_char_in_assign; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterChar_in_assign(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitChar_in_assign(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitChar_in_assign(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Char_in_assignContext char_in_assign() throws RecognitionException {
		Char_in_assignContext _localctx = new Char_in_assignContext(_ctx, getState());
		enterRule(_localctx, 106, RULE_char_in_assign);
		try {
			setState(804);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case COMMA:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(800);
				char_nested();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 2);
				{
				setState(801);
				match(LPAREN);
				}
				break;
			case RPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(802);
				match(RPAREN);
				}
				break;
			case INCLUDE:
			case ENDEF:
			case IFDEF:
			case IFNDEF:
			case IFEQ:
			case IFNEQ:
			case ELSE:
			case ENDIF:
			case OVERRIDE:
			case EXPORT:
			case UNEXPORT:
			case UNDEFINE:
			case DEFINE:
			case VPATH:
				enterOuterAlt(_localctx, 4);
				{
				setState(803);
				keywords();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Char_in_defContext extends ParserRuleContext {
		public CharContext char_() {
			return getRuleContext(CharContext.class,0);
		}
		public TerminalNode LPAREN() { return getToken(cbuildParser.LPAREN, 0); }
		public TerminalNode RPAREN() { return getToken(cbuildParser.RPAREN, 0); }
		public TerminalNode COMMA() { return getToken(cbuildParser.COMMA, 0); }
		public TerminalNode COMMENT() { return getToken(cbuildParser.COMMENT, 0); }
		public TerminalNode INCLUDE() { return getToken(cbuildParser.INCLUDE, 0); }
		public TerminalNode OVERRIDE() { return getToken(cbuildParser.OVERRIDE, 0); }
		public TerminalNode EXPORT() { return getToken(cbuildParser.EXPORT, 0); }
		public TerminalNode UNEXPORT() { return getToken(cbuildParser.UNEXPORT, 0); }
		public TerminalNode IFDEF() { return getToken(cbuildParser.IFDEF, 0); }
		public TerminalNode IFNDEF() { return getToken(cbuildParser.IFNDEF, 0); }
		public TerminalNode IFEQ() { return getToken(cbuildParser.IFEQ, 0); }
		public TerminalNode IFNEQ() { return getToken(cbuildParser.IFNEQ, 0); }
		public TerminalNode ELSE() { return getToken(cbuildParser.ELSE, 0); }
		public TerminalNode ENDIF() { return getToken(cbuildParser.ENDIF, 0); }
		public TerminalNode DEFINE() { return getToken(cbuildParser.DEFINE, 0); }
		public TerminalNode UNDEFINE() { return getToken(cbuildParser.UNDEFINE, 0); }
		public Char_in_defContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_char_in_def; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterChar_in_def(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitChar_in_def(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitChar_in_def(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Char_in_defContext char_in_def() throws RecognitionException {
		Char_in_defContext _localctx = new Char_in_defContext(_ctx, getState());
		enterRule(_localctx, 108, RULE_char_in_def);
		try {
			setState(823);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(806);
				char_();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 2);
				{
				setState(807);
				match(LPAREN);
				}
				break;
			case RPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(808);
				match(RPAREN);
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 4);
				{
				setState(809);
				match(COMMA);
				}
				break;
			case COMMENT:
				enterOuterAlt(_localctx, 5);
				{
				setState(810);
				match(COMMENT);
				}
				break;
			case INCLUDE:
				enterOuterAlt(_localctx, 6);
				{
				setState(811);
				match(INCLUDE);
				}
				break;
			case OVERRIDE:
				enterOuterAlt(_localctx, 7);
				{
				setState(812);
				match(OVERRIDE);
				}
				break;
			case EXPORT:
				enterOuterAlt(_localctx, 8);
				{
				setState(813);
				match(EXPORT);
				}
				break;
			case UNEXPORT:
				enterOuterAlt(_localctx, 9);
				{
				setState(814);
				match(UNEXPORT);
				}
				break;
			case IFDEF:
				enterOuterAlt(_localctx, 10);
				{
				setState(815);
				match(IFDEF);
				}
				break;
			case IFNDEF:
				enterOuterAlt(_localctx, 11);
				{
				setState(816);
				match(IFNDEF);
				}
				break;
			case IFEQ:
				enterOuterAlt(_localctx, 12);
				{
				setState(817);
				match(IFEQ);
				}
				break;
			case IFNEQ:
				enterOuterAlt(_localctx, 13);
				{
				setState(818);
				match(IFNEQ);
				}
				break;
			case ELSE:
				enterOuterAlt(_localctx, 14);
				{
				setState(819);
				match(ELSE);
				}
				break;
			case ENDIF:
				enterOuterAlt(_localctx, 15);
				{
				setState(820);
				match(ENDIF);
				}
				break;
			case DEFINE:
				enterOuterAlt(_localctx, 16);
				{
				setState(821);
				match(DEFINE);
				}
				break;
			case UNDEFINE:
				enterOuterAlt(_localctx, 17);
				{
				setState(822);
				match(UNDEFINE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Char_in_recipeContext extends ParserRuleContext {
		public Char_in_assignContext char_in_assign() {
			return getRuleContext(Char_in_assignContext.class,0);
		}
		public TerminalNode DOUBLE_DOLLAR() { return getToken(cbuildParser.DOUBLE_DOLLAR, 0); }
		public TerminalNode COMMENT() { return getToken(cbuildParser.COMMENT, 0); }
		public Char_in_recipeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_char_in_recipe; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterChar_in_recipe(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitChar_in_recipe(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitChar_in_recipe(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Char_in_recipeContext char_in_recipe() throws RecognitionException {
		Char_in_recipeContext _localctx = new Char_in_recipeContext(_ctx, getState());
		enterRule(_localctx, 110, RULE_char_in_recipe);
		try {
			setState(828);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,110,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(825);
				char_in_assign();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(826);
				match(DOUBLE_DOLLAR);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(827);
				match(COMMENT);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class TextContext extends ParserRuleContext {
		public List<CharContext> char_() {
			return getRuleContexts(CharContext.class);
		}
		public CharContext char_(int i) {
			return getRuleContext(CharContext.class,i);
		}
		public TextContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_text; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterText(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitText(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitText(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TextContext text() throws RecognitionException {
		TextContext _localctx = new TextContext(_ctx, getState());
		enterRule(_localctx, 112, RULE_text);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(831); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(830);
					char_();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(833); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,111,_ctx);
			} while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Text_nestedContext extends ParserRuleContext {
		public List<Char_nestedContext> char_nested() {
			return getRuleContexts(Char_nestedContext.class);
		}
		public Char_nestedContext char_nested(int i) {
			return getRuleContext(Char_nestedContext.class,i);
		}
		public Text_nestedContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_text_nested; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterText_nested(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitText_nested(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitText_nested(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Text_nestedContext text_nested() throws RecognitionException {
		Text_nestedContext _localctx = new Text_nestedContext(_ctx, getState());
		enterRule(_localctx, 114, RULE_text_nested);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(836); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(835);
					char_nested();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(838); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,112,_ctx);
			} while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Text_in_assignContext extends ParserRuleContext {
		public List<Char_in_assignContext> char_in_assign() {
			return getRuleContexts(Char_in_assignContext.class);
		}
		public Char_in_assignContext char_in_assign(int i) {
			return getRuleContext(Char_in_assignContext.class,i);
		}
		public Text_in_assignContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_text_in_assign; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterText_in_assign(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitText_in_assign(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitText_in_assign(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Text_in_assignContext text_in_assign() throws RecognitionException {
		Text_in_assignContext _localctx = new Text_in_assignContext(_ctx, getState());
		enterRule(_localctx, 116, RULE_text_in_assign);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(841); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(840);
					char_in_assign();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(843); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,113,_ctx);
			} while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Text_in_recipeContext extends ParserRuleContext {
		public List<Char_in_recipeContext> char_in_recipe() {
			return getRuleContexts(Char_in_recipeContext.class);
		}
		public Char_in_recipeContext char_in_recipe(int i) {
			return getRuleContext(Char_in_recipeContext.class,i);
		}
		public Text_in_recipeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_text_in_recipe; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterText_in_recipe(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitText_in_recipe(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitText_in_recipe(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Text_in_recipeContext text_in_recipe() throws RecognitionException {
		Text_in_recipeContext _localctx = new Text_in_recipeContext(_ctx, getState());
		enterRule(_localctx, 118, RULE_text_in_recipe);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(846); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(845);
					char_in_recipe();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(848); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,114,_ctx);
			} while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class KeywordsContext extends ParserRuleContext {
		public TerminalNode INCLUDE() { return getToken(cbuildParser.INCLUDE, 0); }
		public TerminalNode OVERRIDE() { return getToken(cbuildParser.OVERRIDE, 0); }
		public TerminalNode EXPORT() { return getToken(cbuildParser.EXPORT, 0); }
		public TerminalNode UNEXPORT() { return getToken(cbuildParser.UNEXPORT, 0); }
		public TerminalNode IFDEF() { return getToken(cbuildParser.IFDEF, 0); }
		public TerminalNode IFNDEF() { return getToken(cbuildParser.IFNDEF, 0); }
		public TerminalNode IFEQ() { return getToken(cbuildParser.IFEQ, 0); }
		public TerminalNode IFNEQ() { return getToken(cbuildParser.IFNEQ, 0); }
		public TerminalNode ELSE() { return getToken(cbuildParser.ELSE, 0); }
		public TerminalNode ENDIF() { return getToken(cbuildParser.ENDIF, 0); }
		public TerminalNode DEFINE() { return getToken(cbuildParser.DEFINE, 0); }
		public TerminalNode ENDEF() { return getToken(cbuildParser.ENDEF, 0); }
		public TerminalNode UNDEFINE() { return getToken(cbuildParser.UNDEFINE, 0); }
		public TerminalNode VPATH() { return getToken(cbuildParser.VPATH, 0); }
		public KeywordsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_keywords; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterKeywords(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitKeywords(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitKeywords(this);
			else return visitor.visitChildren(this);
		}
	}

	public final KeywordsContext keywords() throws RecognitionException {
		KeywordsContext _localctx = new KeywordsContext(_ctx, getState());
		enterRule(_localctx, 120, RULE_keywords);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(850);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 536813568L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ColonContext extends ParserRuleContext {
		public TerminalNode COLON() { return getToken(cbuildParser.COLON, 0); }
		public TerminalNode DOUBLE_COLON() { return getToken(cbuildParser.DOUBLE_COLON, 0); }
		public ColonContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_colon; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterColon(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitColon(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitColon(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ColonContext colon() throws RecognitionException {
		ColonContext _localctx = new ColonContext(_ctx, getState());
		enterRule(_localctx, 122, RULE_colon);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(852);
			_la = _input.LA(1);
			if ( !(_la==DOUBLE_COLON || _la==COLON) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Comment_optContext extends ParserRuleContext {
		public TerminalNode COMMENT() { return getToken(cbuildParser.COMMENT, 0); }
		public Comment_optContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comment_opt; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterComment_opt(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitComment_opt(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitComment_opt(this);
			else return visitor.visitChildren(this);
		}
	}

	public final Comment_optContext comment_opt() throws RecognitionException {
		Comment_optContext _localctx = new Comment_optContext(_ctx, getState());
		enterRule(_localctx, 124, RULE_comment_opt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(855);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,115,_ctx) ) {
			case 1:
				{
				setState(854);
				match(COMMENT);
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class WsContext extends ParserRuleContext {
		public TerminalNode WS() { return getToken(cbuildParser.WS, 0); }
		public TerminalNode TAB() { return getToken(cbuildParser.TAB, 0); }
		public WsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ws; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).enterWs(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof cbuildListener) ((cbuildListener)listener).exitWs(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof cbuildVisitor) return ((cbuildVisitor<? extends T>)visitor).visitWs(this);
			else return visitor.visitChildren(this);
		}
	}

	public final WsContext ws() throws RecognitionException {
		WsContext _localctx = new WsContext(_ctx, getState());
		enterRule(_localctx, 126, RULE_ws);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(857);
			_la = _input.LA(1);
			if ( !(_la==WS || _la==TAB) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\u0004\u0001#\u035c\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b\u0002"+
		"\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007\u000f"+
		"\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002\u0012\u0007\u0012"+
		"\u0002\u0013\u0007\u0013\u0002\u0014\u0007\u0014\u0002\u0015\u0007\u0015"+
		"\u0002\u0016\u0007\u0016\u0002\u0017\u0007\u0017\u0002\u0018\u0007\u0018"+
		"\u0002\u0019\u0007\u0019\u0002\u001a\u0007\u001a\u0002\u001b\u0007\u001b"+
		"\u0002\u001c\u0007\u001c\u0002\u001d\u0007\u001d\u0002\u001e\u0007\u001e"+
		"\u0002\u001f\u0007\u001f\u0002 \u0007 \u0002!\u0007!\u0002\"\u0007\"\u0002"+
		"#\u0007#\u0002$\u0007$\u0002%\u0007%\u0002&\u0007&\u0002\'\u0007\'\u0002"+
		"(\u0007(\u0002)\u0007)\u0002*\u0007*\u0002+\u0007+\u0002,\u0007,\u0002"+
		"-\u0007-\u0002.\u0007.\u0002/\u0007/\u00020\u00070\u00021\u00071\u0002"+
		"2\u00072\u00023\u00073\u00024\u00074\u00025\u00075\u00026\u00076\u0002"+
		"7\u00077\u00028\u00078\u00029\u00079\u0002:\u0007:\u0002;\u0007;\u0002"+
		"<\u0007<\u0002=\u0007=\u0002>\u0007>\u0002?\u0007?\u0001\u0000\u0001\u0000"+
		"\u0001\u0000\u0001\u0000\u0003\u0000\u0085\b\u0000\u0001\u0001\u0001\u0001"+
		"\u0005\u0001\u0089\b\u0001\n\u0001\f\u0001\u008c\t\u0001\u0001\u0002\u0001"+
		"\u0002\u0003\u0002\u0090\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u009a"+
		"\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00a6"+
		"\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0003\u0002\u00af\b\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0003"+
		"\u0002\u00b9\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0003"+
		"\u0002\u00c5\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0003\u0002\u00cc\b\u0002\u0001\u0003\u0001\u0003\u0003\u0003\u00d0"+
		"\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u00da\b\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u00e7\b\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u00f2\b\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0003\u0003\u00fc\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0003\u0003\u0109\b\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u0112"+
		"\b\u0003\u0001\u0004\u0001\u0004\u0001\u0004\u0003\u0004\u0117\b\u0004"+
		"\u0001\u0005\u0003\u0005\u011a\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005"+
		"\u011e\b\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005"+
		"\u0124\b\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005"+
		"\u012a\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u012e\b\u0005\u0001"+
		"\u0005\u0001\u0005\u0003\u0005\u0132\b\u0005\u0001\u0005\u0001\u0005\u0003"+
		"\u0005\u0136\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u013a\b\u0005"+
		"\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0140\b\u0005"+
		"\u0001\u0005\u0003\u0005\u0143\b\u0005\u0001\u0006\u0003\u0006\u0146\b"+
		"\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0003\u0006\u014c"+
		"\b\u0006\u0001\u0006\u0003\u0006\u014f\b\u0006\u0001\u0006\u0003\u0006"+
		"\u0152\b\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007"+
		"\u0001\u0007\u0003\u0007\u0160\b\u0007\u0001\b\u0001\b\u0001\b\u0001\b"+
		"\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0003\t\u016c\b\t\u0003"+
		"\t\u016e\b\t\u0001\n\u0001\n\u0003\n\u0172\b\n\u0001\n\u0001\n\u0001\n"+
		"\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0003\u000b"+
		"\u017c\b\u000b\u0001\f\u0001\f\u0003\f\u0180\b\f\u0001\f\u0001\f\u0003"+
		"\f\u0184\b\f\u0001\f\u0001\f\u0001\f\u0001\f\u0003\f\u018a\b\f\u0001\f"+
		"\u0001\f\u0003\f\u018e\b\f\u0001\f\u0001\f\u0003\f\u0192\b\f\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0001\u000e\u0001\u000e\u0001\u000f\u0001\u000f\u0001"+
		"\u0010\u0001\u0010\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001"+
		"\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0003\u0011\u01a6\b\u0011\u0001"+
		"\u0011\u0003\u0011\u01a9\b\u0011\u0001\u0012\u0003\u0012\u01ac\b\u0012"+
		"\u0001\u0013\u0003\u0013\u01af\b\u0013\u0001\u0013\u0001\u0013\u0003\u0013"+
		"\u01b3\b\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0005\u0013\u01b8\b"+
		"\u0013\n\u0013\f\u0013\u01bb\t\u0013\u0001\u0013\u0003\u0013\u01be\b\u0013"+
		"\u0001\u0014\u0003\u0014\u01c1\b\u0014\u0001\u0014\u0001\u0014\u0003\u0014"+
		"\u01c5\b\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0005\u0014\u01ca\b"+
		"\u0014\n\u0014\f\u0014\u01cd\t\u0014\u0001\u0014\u0003\u0014\u01d0\b\u0014"+
		"\u0001\u0015\u0003\u0015\u01d3\b\u0015\u0001\u0015\u0001\u0015\u0003\u0015"+
		"\u01d7\b\u0015\u0001\u0015\u0001\u0015\u0001\u0015\u0005\u0015\u01dc\b"+
		"\u0015\n\u0015\f\u0015\u01df\t\u0015\u0001\u0015\u0003\u0015\u01e2\b\u0015"+
		"\u0001\u0016\u0003\u0016\u01e5\b\u0016\u0001\u0016\u0001\u0016\u0003\u0016"+
		"\u01e9\b\u0016\u0001\u0016\u0001\u0016\u0001\u0016\u0005\u0016\u01ee\b"+
		"\u0016\n\u0016\f\u0016\u01f1\t\u0016\u0001\u0016\u0003\u0016\u01f4\b\u0016"+
		"\u0001\u0017\u0001\u0017\u0003\u0017\u01f8\b\u0017\u0001\u0017\u0001\u0017"+
		"\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017"+
		"\u0005\u0017\u0202\b\u0017\n\u0017\f\u0017\u0205\t\u0017\u0003\u0017\u0207"+
		"\b\u0017\u0001\u0018\u0001\u0018\u0003\u0018\u020b\b\u0018\u0001\u0018"+
		"\u0003\u0018\u020e\b\u0018\u0001\u0019\u0004\u0019\u0211\b\u0019\u000b"+
		"\u0019\f\u0019\u0212\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001"+
		"\u001a\u0001\u001a\u0003\u001a\u021b\b\u001a\u0001\u001b\u0004\u001b\u021e"+
		"\b\u001b\u000b\u001b\f\u001b\u021f\u0001\u001c\u0001\u001c\u0001\u001c"+
		"\u0001\u001c\u0001\u001c\u0001\u001c\u0003\u001c\u0228\b\u001c\u0001\u001d"+
		"\u0004\u001d\u022b\b\u001d\u000b\u001d\f\u001d\u022c\u0001\u001e\u0001"+
		"\u001e\u0003\u001e\u0231\b\u001e\u0001\u001f\u0004\u001f\u0234\b\u001f"+
		"\u000b\u001f\f\u001f\u0235\u0001 \u0001 \u0003 \u023a\b \u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0003!\u0275\b!\u0001\"\u0004\"\u0278"+
		"\b\"\u000b\"\f\"\u0279\u0001#\u0001#\u0003#\u027e\b#\u0001$\u0003$\u0281"+
		"\b$\u0001$\u0001$\u0003$\u0285\b$\u0005$\u0287\b$\n$\f$\u028a\t$\u0001"+
		"%\u0001%\u0001&\u0001&\u0001&\u0003&\u0291\b&\u0001&\u0001&\u0003&\u0295"+
		"\b&\u0001&\u0001&\u0003&\u0299\b&\u0001&\u0001&\u0003&\u029d\b&\u0001"+
		"&\u0001&\u0003&\u02a1\b&\u0001&\u0001&\u0003&\u02a5\b&\u0001&\u0001&\u0003"+
		"&\u02a9\b&\u0001&\u0001&\u0003&\u02ad\b&\u0001\'\u0001\'\u0003\'\u02b1"+
		"\b\'\u0001\'\u0001\'\u0003\'\u02b5\b\'\u0001\'\u0001\'\u0003\'\u02b9\b"+
		"\'\u0001\'\u0001\'\u0003\'\u02bd\b\'\u0001\'\u0001\'\u0001\'\u0003\'\u02c2"+
		"\b\'\u0001(\u0001(\u0001)\u0001)\u0004)\u02c8\b)\u000b)\f)\u02c9\u0001"+
		"*\u0003*\u02cd\b*\u0001+\u0001+\u0001+\u0001+\u0005+\u02d3\b+\n+\f+\u02d6"+
		"\t+\u0001,\u0004,\u02d9\b,\u000b,\f,\u02da\u0001-\u0001-\u0003-\u02df"+
		"\b-\u0001.\u0001.\u0003.\u02e3\b.\u0001.\u0001.\u0001.\u0001.\u0001.\u0003"+
		".\u02ea\b.\u0001.\u0001.\u0001.\u0003.\u02ef\b.\u0001.\u0001.\u0001.\u0001"+
		".\u0003.\u02f5\b.\u0001/\u0001/\u0001/\u0001/\u0001/\u0001/\u0001/\u0001"+
		"/\u0001/\u0001/\u0001/\u0001/\u0001/\u0001/\u0001/\u0001/\u0001/\u0001"+
		"/\u0001/\u0001/\u0003/\u030b\b/\u00010\u00040\u030e\b0\u000b0\f0\u030f"+
		"\u00011\u00011\u00011\u00011\u00011\u00031\u0317\b1\u00012\u00012\u0001"+
		"3\u00013\u00014\u00014\u00034\u031f\b4\u00015\u00015\u00015\u00015\u0003"+
		"5\u0325\b5\u00016\u00016\u00016\u00016\u00016\u00016\u00016\u00016\u0001"+
		"6\u00016\u00016\u00016\u00016\u00016\u00016\u00016\u00016\u00036\u0338"+
		"\b6\u00017\u00017\u00017\u00037\u033d\b7\u00018\u00048\u0340\b8\u000b"+
		"8\f8\u0341\u00019\u00049\u0345\b9\u000b9\f9\u0346\u0001:\u0004:\u034a"+
		"\b:\u000b:\f:\u034b\u0001;\u0004;\u034f\b;\u000b;\f;\u0350\u0001<\u0001"+
		"<\u0001=\u0001=\u0001>\u0003>\u0358\b>\u0001?\u0001?\u0001?\u0000\u0000"+
		"@\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a"+
		"\u001c\u001e \"$&(*,.02468:<>@BDFHJLNPRTVXZ\\^`bdfhjlnprtvxz|~\u0000\u0007"+
		"\u0001\u0000\u0013\u0014\u0001\u0000\u0011\u0012\u0001\u0000\r\u000f\u0004"+
		"\u0000\u0001\u0001\u0005\u0005\u0007\u0007\u001d\u001e\u0002\u0000\r\r"+
		"\u0010\u001c\u0001\u0000\u0006\u0007\u0001\u0000!\"\u03ca\u0000\u0084"+
		"\u0001\u0000\u0000\u0000\u0002\u008a\u0001\u0000\u0000\u0000\u0004\u00cb"+
		"\u0001\u0000\u0000\u0000\u0006\u0111\u0001\u0000\u0000\u0000\b\u0113\u0001"+
		"\u0000\u0000\u0000\n\u0142\u0001\u0000\u0000\u0000\f\u0145\u0001\u0000"+
		"\u0000\u0000\u000e\u015f\u0001\u0000\u0000\u0000\u0010\u0161\u0001\u0000"+
		"\u0000\u0000\u0012\u016d\u0001\u0000\u0000\u0000\u0014\u016f\u0001\u0000"+
		"\u0000\u0000\u0016\u0176\u0001\u0000\u0000\u0000\u0018\u0191\u0001\u0000"+
		"\u0000\u0000\u001a\u0193\u0001\u0000\u0000\u0000\u001c\u0197\u0001\u0000"+
		"\u0000\u0000\u001e\u0199\u0001\u0000\u0000\u0000 \u019b\u0001\u0000\u0000"+
		"\u0000\"\u01a8\u0001\u0000\u0000\u0000$\u01ab\u0001\u0000\u0000\u0000"+
		"&\u01ae\u0001\u0000\u0000\u0000(\u01c0\u0001\u0000\u0000\u0000*\u01d2"+
		"\u0001\u0000\u0000\u0000,\u01e4\u0001\u0000\u0000\u0000.\u0206\u0001\u0000"+
		"\u0000\u00000\u020a\u0001\u0000\u0000\u00002\u0210\u0001\u0000\u0000\u0000"+
		"4\u021a\u0001\u0000\u0000\u00006\u021d\u0001\u0000\u0000\u00008\u0227"+
		"\u0001\u0000\u0000\u0000:\u022a\u0001\u0000\u0000\u0000<\u0230\u0001\u0000"+
		"\u0000\u0000>\u0233\u0001\u0000\u0000\u0000@\u0239\u0001\u0000\u0000\u0000"+
		"B\u0274\u0001\u0000\u0000\u0000D\u0277\u0001\u0000\u0000\u0000F\u027d"+
		"\u0001\u0000\u0000\u0000H\u0280\u0001\u0000\u0000\u0000J\u028b\u0001\u0000"+
		"\u0000\u0000L\u02ac\u0001\u0000\u0000\u0000N\u02ae\u0001\u0000\u0000\u0000"+
		"P\u02c3\u0001\u0000\u0000\u0000R\u02c7\u0001\u0000\u0000\u0000T\u02cc"+
		"\u0001\u0000\u0000\u0000V\u02ce\u0001\u0000\u0000\u0000X\u02d8\u0001\u0000"+
		"\u0000\u0000Z\u02dc\u0001\u0000\u0000\u0000\\\u02f4\u0001\u0000\u0000"+
		"\u0000^\u030a\u0001\u0000\u0000\u0000`\u030d\u0001\u0000\u0000\u0000b"+
		"\u0316\u0001\u0000\u0000\u0000d\u0318\u0001\u0000\u0000\u0000f\u031a\u0001"+
		"\u0000\u0000\u0000h\u031e\u0001\u0000\u0000\u0000j\u0324\u0001\u0000\u0000"+
		"\u0000l\u0337\u0001\u0000\u0000\u0000n\u033c\u0001\u0000\u0000\u0000p"+
		"\u033f\u0001\u0000\u0000\u0000r\u0344\u0001\u0000\u0000\u0000t\u0349\u0001"+
		"\u0000\u0000\u0000v\u034e\u0001\u0000\u0000\u0000x\u0352\u0001\u0000\u0000"+
		"\u0000z\u0354\u0001\u0000\u0000\u0000|\u0357\u0001\u0000\u0000\u0000~"+
		"\u0359\u0001\u0000\u0000\u0000\u0080\u0081\u0003\u0002\u0001\u0000\u0081"+
		"\u0082\u0005\u0000\u0000\u0001\u0082\u0085\u0001\u0000\u0000\u0000\u0083"+
		"\u0085\u0005\u0000\u0000\u0001\u0084\u0080\u0001\u0000\u0000\u0000\u0084"+
		"\u0083\u0001\u0000\u0000\u0000\u0085\u0001\u0001\u0000\u0000\u0000\u0086"+
		"\u0089\u0003\n\u0005\u0000\u0087\u0089\u0003d2\u0000\u0088\u0086\u0001"+
		"\u0000\u0000\u0000\u0088\u0087\u0001\u0000\u0000\u0000\u0089\u008c\u0001"+
		"\u0000\u0000\u0000\u008a\u0088\u0001\u0000\u0000\u0000\u008a\u008b\u0001"+
		"\u0000\u0000\u0000\u008b\u0003\u0001\u0000\u0000\u0000\u008c\u008a\u0001"+
		"\u0000\u0000\u0000\u008d\u008f\u0003\u001c\u000e\u0000\u008e\u0090\u0003"+
		"~?\u0000\u008f\u008e\u0001\u0000\u0000\u0000\u008f\u0090\u0001\u0000\u0000"+
		"\u0000\u0090\u0091\u0001\u0000\u0000\u0000\u0091\u0092\u0003\"\u0011\u0000"+
		"\u0092\u0093\u0003\b\u0004\u0000\u0093\u0094\u0005\u0016\u0000\u0000\u0094"+
		"\u0095\u0003|>\u0000\u0095\u0096\u0003d2\u0000\u0096\u00cc\u0001\u0000"+
		"\u0000\u0000\u0097\u0099\u0003\u001c\u000e\u0000\u0098\u009a\u0003~?\u0000"+
		"\u0099\u0098\u0001\u0000\u0000\u0000\u0099\u009a\u0001\u0000\u0000\u0000"+
		"\u009a\u009b\u0001\u0000\u0000\u0000\u009b\u009c\u0003\"\u0011\u0000\u009c"+
		"\u009d\u0003\b\u0004\u0000\u009d\u009e\u0005\u0015\u0000\u0000\u009e\u009f"+
		"\u0003\b\u0004\u0000\u009f\u00a0\u0005\u0016\u0000\u0000\u00a0\u00a1\u0003"+
		"|>\u0000\u00a1\u00a2\u0003d2\u0000\u00a2\u00cc\u0001\u0000\u0000\u0000"+
		"\u00a3\u00a5\u0003\u001c\u000e\u0000\u00a4\u00a6\u0003~?\u0000\u00a5\u00a4"+
		"\u0001\u0000\u0000\u0000\u00a5\u00a6\u0001\u0000\u0000\u0000\u00a6\u00a7"+
		"\u0001\u0000\u0000\u0000\u00a7\u00a8\u0003\"\u0011\u0000\u00a8\u00a9\u0003"+
		"\b\u0004\u0000\u00a9\u00aa\u0005\u0015\u0000\u0000\u00aa\u00ab\u0003\u0004"+
		"\u0002\u0000\u00ab\u00cc\u0001\u0000\u0000\u0000\u00ac\u00ae\u0003\u001e"+
		"\u000f\u0000\u00ad\u00af\u0003~?\u0000\u00ae\u00ad\u0001\u0000\u0000\u0000"+
		"\u00ae\u00af\u0001\u0000\u0000\u0000\u00af\u00b0\u0001\u0000\u0000\u0000"+
		"\u00b0\u00b1\u0003`0\u0000\u00b1\u00b2\u0003\b\u0004\u0000\u00b2\u00b3"+
		"\u0005\u0016\u0000\u0000\u00b3\u00b4\u0003|>\u0000\u00b4\u00b5\u0003d"+
		"2\u0000\u00b5\u00cc\u0001\u0000\u0000\u0000\u00b6\u00b8\u0003\u001e\u000f"+
		"\u0000\u00b7\u00b9\u0003~?\u0000\u00b8\u00b7\u0001\u0000\u0000\u0000\u00b8"+
		"\u00b9\u0001\u0000\u0000\u0000\u00b9\u00ba\u0001\u0000\u0000\u0000\u00ba"+
		"\u00bb\u0003`0\u0000\u00bb\u00bc\u0003\b\u0004\u0000\u00bc\u00bd\u0005"+
		"\u0015\u0000\u0000\u00bd\u00be\u0003\b\u0004\u0000\u00be\u00bf\u0005\u0016"+
		"\u0000\u0000\u00bf\u00c0\u0003|>\u0000\u00c0\u00c1\u0003d2\u0000\u00c1"+
		"\u00cc\u0001\u0000\u0000\u0000\u00c2\u00c4\u0003\u001e\u000f\u0000\u00c3"+
		"\u00c5\u0003~?\u0000\u00c4\u00c3\u0001\u0000\u0000\u0000\u00c4\u00c5\u0001"+
		"\u0000\u0000\u0000\u00c5\u00c6\u0001\u0000\u0000\u0000\u00c6\u00c7\u0003"+
		"`0\u0000\u00c7\u00c8\u0003\b\u0004\u0000\u00c8\u00c9\u0005\u0015\u0000"+
		"\u0000\u00c9\u00ca\u0003\u0004\u0002\u0000\u00ca\u00cc\u0001\u0000\u0000"+
		"\u0000\u00cb\u008d\u0001\u0000\u0000\u0000\u00cb\u0097\u0001\u0000\u0000"+
		"\u0000\u00cb\u00a3\u0001\u0000\u0000\u0000\u00cb\u00ac\u0001\u0000\u0000"+
		"\u0000\u00cb\u00b6\u0001\u0000\u0000\u0000\u00cb\u00c2\u0001\u0000\u0000"+
		"\u0000\u00cc\u0005\u0001\u0000\u0000\u0000\u00cd\u00cf\u0003\u001c\u000e"+
		"\u0000\u00ce\u00d0\u0003~?\u0000\u00cf\u00ce\u0001\u0000\u0000\u0000\u00cf"+
		"\u00d0\u0001\u0000\u0000\u0000\u00d0\u00d1\u0001\u0000\u0000\u0000\u00d1"+
		"\u00d2\u0003\"\u0011\u0000\u00d2\u00d3\u0005\u001f\u0000\u0000\u00d3\u00d4"+
		"\u0003Z-\u0000\u00d4\u00d5\u0005\u0016\u0000\u0000\u00d5\u00d6\u0003|"+
		">\u0000\u00d6\u0112\u0001\u0000\u0000\u0000\u00d7\u00d9\u0003\u001c\u000e"+
		"\u0000\u00d8\u00da\u0003~?\u0000\u00d9\u00d8\u0001\u0000\u0000\u0000\u00d9"+
		"\u00da\u0001\u0000\u0000\u0000\u00da\u00db\u0001\u0000\u0000\u0000\u00db"+
		"\u00dc\u0003\"\u0011\u0000\u00dc\u00dd\u0005\u001f\u0000\u0000\u00dd\u00de"+
		"\u0003Z-\u0000\u00de\u00df\u0005\u0015\u0000\u0000\u00df\u00e0\u0005\u001f"+
		"\u0000\u0000\u00e0\u00e1\u0003Z-\u0000\u00e1\u00e2\u0005\u0016\u0000\u0000"+
		"\u00e2\u00e3\u0003|>\u0000\u00e3\u0112\u0001\u0000\u0000\u0000\u00e4\u00e6"+
		"\u0003\u001c\u000e\u0000\u00e5\u00e7\u0003~?\u0000\u00e6\u00e5\u0001\u0000"+
		"\u0000\u0000\u00e6\u00e7\u0001\u0000\u0000\u0000\u00e7\u00e8\u0001\u0000"+
		"\u0000\u0000\u00e8\u00e9\u0003\"\u0011\u0000\u00e9\u00ea\u0005\u001f\u0000"+
		"\u0000\u00ea\u00eb\u0003Z-\u0000\u00eb\u00ec\u0005\u0015\u0000\u0000\u00ec"+
		"\u00ed\u0005\u001f\u0000\u0000\u00ed\u00ee\u0003\u0006\u0003\u0000\u00ee"+
		"\u0112\u0001\u0000\u0000\u0000\u00ef\u00f1\u0003\u001e\u000f\u0000\u00f0"+
		"\u00f2\u0003~?\u0000\u00f1\u00f0\u0001\u0000\u0000\u0000\u00f1\u00f2\u0001"+
		"\u0000\u0000\u0000\u00f2\u00f3\u0001\u0000\u0000\u0000\u00f3\u00f4\u0003"+
		"`0\u0000\u00f4\u00f5\u0005\u001f\u0000\u0000\u00f5\u00f6\u0003Z-\u0000"+
		"\u00f6\u00f7\u0005\u0016\u0000\u0000\u00f7\u00f8\u0003|>\u0000\u00f8\u0112"+
		"\u0001\u0000\u0000\u0000\u00f9\u00fb\u0003\u001e\u000f\u0000\u00fa\u00fc"+
		"\u0003~?\u0000\u00fb\u00fa\u0001\u0000\u0000\u0000\u00fb\u00fc\u0001\u0000"+
		"\u0000\u0000\u00fc\u00fd\u0001\u0000\u0000\u0000\u00fd\u00fe\u0003`0\u0000"+
		"\u00fe\u00ff\u0005\u001f\u0000\u0000\u00ff\u0100\u0003Z-\u0000\u0100\u0101"+
		"\u0005\u0015\u0000\u0000\u0101\u0102\u0005\u001f\u0000\u0000\u0102\u0103"+
		"\u0003Z-\u0000\u0103\u0104\u0005\u0016\u0000\u0000\u0104\u0105\u0003|"+
		">\u0000\u0105\u0112\u0001\u0000\u0000\u0000\u0106\u0108\u0003\u001e\u000f"+
		"\u0000\u0107\u0109\u0003~?\u0000\u0108\u0107\u0001\u0000\u0000\u0000\u0108"+
		"\u0109\u0001\u0000\u0000\u0000\u0109\u010a\u0001\u0000\u0000\u0000\u010a"+
		"\u010b\u0003`0\u0000\u010b\u010c\u0005\u001f\u0000\u0000\u010c\u010d\u0003"+
		"Z-\u0000\u010d\u010e\u0005\u0015\u0000\u0000\u010e\u010f\u0005\u001f\u0000"+
		"\u0000\u010f\u0110\u0003\u0006\u0003\u0000\u0110\u0112\u0001\u0000\u0000"+
		"\u0000\u0111\u00cd\u0001\u0000\u0000\u0000\u0111\u00d7\u0001\u0000\u0000"+
		"\u0000\u0111\u00e4\u0001\u0000\u0000\u0000\u0111\u00ef\u0001\u0000\u0000"+
		"\u0000\u0111\u00f9\u0001\u0000\u0000\u0000\u0111\u0106\u0001\u0000\u0000"+
		"\u0000\u0112\u0007\u0001\u0000\u0000\u0000\u0113\u0114\u0003|>\u0000\u0114"+
		"\u0116\u0003d2\u0000\u0115\u0117\u0003\u0002\u0001\u0000\u0116\u0115\u0001"+
		"\u0000\u0000\u0000\u0116\u0117\u0001\u0000\u0000\u0000\u0117\t\u0001\u0000"+
		"\u0000\u0000\u0118\u011a\u0003~?\u0000\u0119\u0118\u0001\u0000\u0000\u0000"+
		"\u0119\u011a\u0001\u0000\u0000\u0000\u011a\u011b\u0001\u0000\u0000\u0000"+
		"\u011b\u0143\u0005#\u0000\u0000\u011c\u011e\u0003~?\u0000\u011d\u011c"+
		"\u0001\u0000\u0000\u0000\u011d\u011e\u0001\u0000\u0000\u0000\u011e\u011f"+
		"\u0001\u0000\u0000\u0000\u011f\u0120\u0003\u0018\f\u0000\u0120\u0121\u0003"+
		"d2\u0000\u0121\u0143\u0001\u0000\u0000\u0000\u0122\u0124\u0003~?\u0000"+
		"\u0123\u0122\u0001\u0000\u0000\u0000\u0123\u0124\u0001\u0000\u0000\u0000"+
		"\u0124\u0125\u0001\u0000\u0000\u0000\u0125\u0126\u0003B!\u0000\u0126\u0127"+
		"\u0003d2\u0000\u0127\u0143\u0001\u0000\u0000\u0000\u0128\u012a\u0003~"+
		"?\u0000\u0129\u0128\u0001\u0000\u0000\u0000\u0129\u012a\u0001\u0000\u0000"+
		"\u0000\u012a\u012b\u0001\u0000\u0000\u0000\u012b\u0143\u0003L&\u0000\u012c"+
		"\u012e\u0003~?\u0000\u012d\u012c\u0001\u0000\u0000\u0000\u012d\u012e\u0001"+
		"\u0000\u0000\u0000\u012e\u012f\u0001\u0000\u0000\u0000\u012f\u0143\u0003"+
		"\u0004\u0002\u0000\u0130\u0132\u0003~?\u0000\u0131\u0130\u0001\u0000\u0000"+
		"\u0000\u0131\u0132\u0001\u0000\u0000\u0000\u0132\u0133\u0001\u0000\u0000"+
		"\u0000\u0133\u0143\u0003\f\u0006\u0000\u0134\u0136\u0003~?\u0000\u0135"+
		"\u0134\u0001\u0000\u0000\u0000\u0135\u0136\u0001\u0000\u0000\u0000\u0136"+
		"\u0137\u0001\u0000\u0000\u0000\u0137\u0143\u0003\u0010\b\u0000\u0138\u013a"+
		"\u0003~?\u0000\u0139\u0138\u0001\u0000\u0000\u0000\u0139\u013a\u0001\u0000"+
		"\u0000\u0000\u013a\u013b\u0001\u0000\u0000\u0000\u013b\u013c\u0003\u0012"+
		"\t\u0000\u013c\u013d\u0003d2\u0000\u013d\u0143\u0001\u0000\u0000\u0000"+
		"\u013e\u0140\u0003~?\u0000\u013f\u013e\u0001\u0000\u0000\u0000\u013f\u0140"+
		"\u0001\u0000\u0000\u0000\u0140\u0141\u0001\u0000\u0000\u0000\u0141\u0143"+
		"\u0003\u0014\n\u0000\u0142\u0119\u0001\u0000\u0000\u0000\u0142\u011d\u0001"+
		"\u0000\u0000\u0000\u0142\u0123\u0001\u0000\u0000\u0000\u0142\u0129\u0001"+
		"\u0000\u0000\u0000\u0142\u012d\u0001\u0000\u0000\u0000\u0142\u0131\u0001"+
		"\u0000\u0000\u0000\u0142\u0135\u0001\u0000\u0000\u0000\u0142\u0139\u0001"+
		"\u0000\u0000\u0000\u0142\u013f\u0001\u0000\u0000\u0000\u0143\u000b\u0001"+
		"\u0000\u0000\u0000\u0144\u0146\u0003^/\u0000\u0145\u0144\u0001\u0000\u0000"+
		"\u0000\u0145\u0146\u0001\u0000\u0000\u0000\u0146\u0147\u0001\u0000\u0000"+
		"\u0000\u0147\u0148\u0005\u001b\u0000\u0000\u0148\u0149\u0003~?\u0000\u0149"+
		"\u014b\u0003R)\u0000\u014a\u014c\u0003~?\u0000\u014b\u014a\u0001\u0000"+
		"\u0000\u0000\u014b\u014c\u0001\u0000\u0000\u0000\u014c\u014e\u0001\u0000"+
		"\u0000\u0000\u014d\u014f\u0005\u0001\u0000\u0000\u014e\u014d\u0001\u0000"+
		"\u0000\u0000\u014e\u014f\u0001\u0000\u0000\u0000\u014f\u0151\u0001\u0000"+
		"\u0000\u0000\u0150\u0152\u0003~?\u0000\u0151\u0150\u0001\u0000\u0000\u0000"+
		"\u0151\u0152\u0001\u0000\u0000\u0000\u0152\u0153\u0001\u0000\u0000\u0000"+
		"\u0153\u0154\u0003\u000e\u0007\u0000\u0154\u0155\u0005\u0010\u0000\u0000"+
		"\u0155\u0156\u0003d2\u0000\u0156\r\u0001\u0000\u0000\u0000\u0157\u0158"+
		"\u0003|>\u0000\u0158\u0159\u0003d2\u0000\u0159\u0160\u0001\u0000\u0000"+
		"\u0000\u015a\u015b\u0003|>\u0000\u015b\u015c\u0003d2\u0000\u015c\u015d"+
		"\u0003.\u0017\u0000\u015d\u015e\u0003d2\u0000\u015e\u0160\u0001\u0000"+
		"\u0000\u0000\u015f\u0157\u0001\u0000\u0000\u0000\u015f\u015a\u0001\u0000"+
		"\u0000\u0000\u0160\u000f\u0001\u0000\u0000\u0000\u0161\u0162\u0003 \u0010"+
		"\u0000\u0162\u0163\u0003&\u0013\u0000\u0163\u0164\u0003d2\u0000\u0164"+
		"\u0011\u0001\u0000\u0000\u0000\u0165\u016e\u0005\u0018\u0000\u0000\u0166"+
		"\u016e\u0005\u0019\u0000\u0000\u0167\u016b\u0003\u001a\r\u0000\u0168\u0169"+
		"\u0003~?\u0000\u0169\u016a\u0003V+\u0000\u016a\u016c\u0001\u0000\u0000"+
		"\u0000\u016b\u0168\u0001\u0000\u0000\u0000\u016b\u016c\u0001\u0000\u0000"+
		"\u0000\u016c\u016e\u0001\u0000\u0000\u0000\u016d\u0165\u0001\u0000\u0000"+
		"\u0000\u016d\u0166\u0001\u0000\u0000\u0000\u016d\u0167\u0001\u0000\u0000"+
		"\u0000\u016e\u0013\u0001\u0000\u0000\u0000\u016f\u0171\u0005\u001c\u0000"+
		"\u0000\u0170\u0172\u0003\u0016\u000b\u0000\u0171\u0170\u0001\u0000\u0000"+
		"\u0000\u0171\u0172\u0001\u0000\u0000\u0000\u0172\u0173\u0001\u0000\u0000"+
		"\u0000\u0173\u0174\u0003|>\u0000\u0174\u0175\u0003d2\u0000\u0175\u0015"+
		"\u0001\u0000\u0000\u0000\u0176\u0177\u0003~?\u0000\u0177\u017b\u0003R"+
		")\u0000\u0178\u0179\u0003~?\u0000\u0179\u017a\u0003&\u0013\u0000\u017a"+
		"\u017c\u0001\u0000\u0000\u0000\u017b\u0178\u0001\u0000\u0000\u0000\u017b"+
		"\u017c\u0001\u0000\u0000\u0000\u017c\u0017\u0001\u0000\u0000\u0000\u017d"+
		"\u017f\u0003R)\u0000\u017e\u0180\u0003~?\u0000\u017f\u017e\u0001\u0000"+
		"\u0000\u0000\u017f\u0180\u0001\u0000\u0000\u0000\u0180\u0181\u0001\u0000"+
		"\u0000\u0000\u0181\u0183\u0005\u0001\u0000\u0000\u0182\u0184\u0003*\u0015"+
		"\u0000\u0183\u0182\u0001\u0000\u0000\u0000\u0183\u0184\u0001\u0000\u0000"+
		"\u0000\u0184\u0185\u0001\u0000\u0000\u0000\u0185\u0186\u0003|>\u0000\u0186"+
		"\u0192\u0001\u0000\u0000\u0000\u0187\u0189\u0003\u001a\r\u0000\u0188\u018a"+
		"\u0003~?\u0000\u0189\u0188\u0001\u0000\u0000\u0000\u0189\u018a\u0001\u0000"+
		"\u0000\u0000\u018a\u018b\u0001\u0000\u0000\u0000\u018b\u018d\u0005\u0001"+
		"\u0000\u0000\u018c\u018e\u0003*\u0015\u0000\u018d\u018c\u0001\u0000\u0000"+
		"\u0000\u018d\u018e\u0001\u0000\u0000\u0000\u018e\u018f\u0001\u0000\u0000"+
		"\u0000\u018f\u0190\u0003|>\u0000\u0190\u0192\u0001\u0000\u0000\u0000\u0191"+
		"\u017d\u0001\u0000\u0000\u0000\u0191\u0187\u0001\u0000\u0000\u0000\u0192"+
		"\u0019\u0001\u0000\u0000\u0000\u0193\u0194\u0003^/\u0000\u0194\u0195\u0003"+
		"~?\u0000\u0195\u0196\u0003R)\u0000\u0196\u001b\u0001\u0000\u0000\u0000"+
		"\u0197\u0198\u0007\u0000\u0000\u0000\u0198\u001d\u0001\u0000\u0000\u0000"+
		"\u0199\u019a\u0007\u0001\u0000\u0000\u019a\u001f\u0001\u0000\u0000\u0000"+
		"\u019b\u019c\u0007\u0002\u0000\u0000\u019c!\u0001\u0000\u0000\u0000\u019d"+
		"\u019e\u0005\b\u0000\u0000\u019e\u019f\u0003$\u0012\u0000\u019f\u01a0"+
		"\u0005\f\u0000\u0000\u01a0\u01a1\u0003$\u0012\u0000\u01a1\u01a2\u0005"+
		"\t\u0000\u0000\u01a2\u01a9\u0001\u0000\u0000\u0000\u01a3\u01a5\u0005\u001d"+
		"\u0000\u0000\u01a4\u01a6\u0003~?\u0000\u01a5\u01a4\u0001\u0000\u0000\u0000"+
		"\u01a5\u01a6\u0001\u0000\u0000\u0000\u01a6\u01a7\u0001\u0000\u0000\u0000"+
		"\u01a7\u01a9\u0005\u001d\u0000\u0000\u01a8\u019d\u0001\u0000\u0000\u0000"+
		"\u01a8\u01a3\u0001\u0000\u0000\u0000\u01a9#\u0001\u0000\u0000\u0000\u01aa"+
		"\u01ac\u0003&\u0013\u0000\u01ab\u01aa\u0001\u0000\u0000\u0000\u01ab\u01ac"+
		"\u0001\u0000\u0000\u0000\u01ac%\u0001\u0000\u0000\u0000\u01ad\u01af\u0003"+
		"~?\u0000\u01ae\u01ad\u0001\u0000\u0000\u0000\u01ae\u01af\u0001\u0000\u0000"+
		"\u0000\u01af\u01b0\u0001\u0000\u0000\u0000\u01b0\u01b2\u00032\u0019\u0000"+
		"\u01b1\u01b3\u0003~?\u0000\u01b2\u01b1\u0001\u0000\u0000\u0000\u01b2\u01b3"+
		"\u0001\u0000\u0000\u0000\u01b3\u01b9\u0001\u0000\u0000\u0000\u01b4\u01b5"+
		"\u0003~?\u0000\u01b5\u01b6\u00032\u0019\u0000\u01b6\u01b8\u0001\u0000"+
		"\u0000\u0000\u01b7\u01b4\u0001\u0000\u0000\u0000\u01b8\u01bb\u0001\u0000"+
		"\u0000\u0000\u01b9\u01b7\u0001\u0000\u0000\u0000\u01b9\u01ba\u0001\u0000"+
		"\u0000\u0000\u01ba\u01bd\u0001\u0000\u0000\u0000\u01bb\u01b9\u0001\u0000"+
		"\u0000\u0000\u01bc\u01be\u0003~?\u0000\u01bd\u01bc\u0001\u0000\u0000\u0000"+
		"\u01bd\u01be\u0001\u0000\u0000\u0000\u01be\'\u0001\u0000\u0000\u0000\u01bf"+
		"\u01c1\u0003~?\u0000\u01c0\u01bf\u0001\u0000\u0000\u0000\u01c0\u01c1\u0001"+
		"\u0000\u0000\u0000\u01c1\u01c2\u0001\u0000\u0000\u0000\u01c2\u01c4\u0003"+
		"6\u001b\u0000\u01c3\u01c5\u0003~?\u0000\u01c4\u01c3\u0001\u0000\u0000"+
		"\u0000\u01c4\u01c5\u0001\u0000\u0000\u0000\u01c5\u01cb\u0001\u0000\u0000"+
		"\u0000\u01c6\u01c7\u0003~?\u0000\u01c7\u01c8\u00036\u001b\u0000\u01c8"+
		"\u01ca\u0001\u0000\u0000\u0000\u01c9\u01c6\u0001\u0000\u0000\u0000\u01ca"+
		"\u01cd\u0001\u0000\u0000\u0000\u01cb\u01c9\u0001\u0000\u0000\u0000\u01cb"+
		"\u01cc\u0001\u0000\u0000\u0000\u01cc\u01cf\u0001\u0000\u0000\u0000\u01cd"+
		"\u01cb\u0001\u0000\u0000\u0000\u01ce\u01d0\u0003~?\u0000\u01cf\u01ce\u0001"+
		"\u0000\u0000\u0000\u01cf\u01d0\u0001\u0000\u0000\u0000\u01d0)\u0001\u0000"+
		"\u0000\u0000\u01d1\u01d3\u0003~?\u0000\u01d2\u01d1\u0001\u0000\u0000\u0000"+
		"\u01d2\u01d3\u0001\u0000\u0000\u0000\u01d3\u01d4\u0001\u0000\u0000\u0000"+
		"\u01d4\u01d6\u0003:\u001d\u0000\u01d5\u01d7\u0003~?\u0000\u01d6\u01d5"+
		"\u0001\u0000\u0000\u0000\u01d6\u01d7\u0001\u0000\u0000\u0000\u01d7\u01dd"+
		"\u0001\u0000\u0000\u0000\u01d8\u01d9\u0003~?\u0000\u01d9\u01da\u0003:"+
		"\u001d\u0000\u01da\u01dc\u0001\u0000\u0000\u0000\u01db\u01d8\u0001\u0000"+
		"\u0000\u0000\u01dc\u01df\u0001\u0000\u0000\u0000\u01dd\u01db\u0001\u0000"+
		"\u0000\u0000\u01dd\u01de\u0001\u0000\u0000\u0000\u01de\u01e1\u0001\u0000"+
		"\u0000\u0000\u01df\u01dd\u0001\u0000\u0000\u0000\u01e0\u01e2\u0003~?\u0000"+
		"\u01e1\u01e0\u0001\u0000\u0000\u0000\u01e1\u01e2\u0001\u0000\u0000\u0000"+
		"\u01e2+\u0001\u0000\u0000\u0000\u01e3\u01e5\u0003~?\u0000\u01e4\u01e3"+
		"\u0001\u0000\u0000\u0000\u01e4\u01e5\u0001\u0000\u0000\u0000\u01e5\u01e6"+
		"\u0001\u0000\u0000\u0000\u01e6\u01e8\u0003>\u001f\u0000\u01e7\u01e9\u0003"+
		"~?\u0000\u01e8\u01e7\u0001\u0000\u0000\u0000\u01e8\u01e9\u0001\u0000\u0000"+
		"\u0000\u01e9\u01ef\u0001\u0000\u0000\u0000\u01ea\u01eb\u0003~?\u0000\u01eb"+
		"\u01ec\u0003>\u001f\u0000\u01ec\u01ee\u0001\u0000\u0000\u0000\u01ed\u01ea"+
		"\u0001\u0000\u0000\u0000\u01ee\u01f1\u0001\u0000\u0000\u0000\u01ef\u01ed"+
		"\u0001\u0000\u0000\u0000\u01ef\u01f0\u0001\u0000\u0000\u0000\u01f0\u01f3"+
		"\u0001\u0000\u0000\u0000\u01f1\u01ef\u0001\u0000\u0000\u0000\u01f2\u01f4"+
		"\u0003~?\u0000\u01f3\u01f2\u0001\u0000\u0000\u0000\u01f3\u01f4\u0001\u0000"+
		"\u0000\u0000\u01f4-\u0001\u0000\u0000\u0000\u01f5\u0207\u0003d2\u0000"+
		"\u01f6\u01f8\u0003d2\u0000\u01f7\u01f6\u0001\u0000\u0000\u0000\u01f7\u01f8"+
		"\u0001\u0000\u0000\u0000\u01f8\u01f9\u0001\u0000\u0000\u0000\u01f9\u0203"+
		"\u00030\u0018\u0000\u01fa\u01fb\u0003d2\u0000\u01fb\u01fc\u00030\u0018"+
		"\u0000\u01fc\u0202\u0001\u0000\u0000\u0000\u01fd\u0202\u0003d2\u0000\u01fe"+
		"\u01ff\u0003~?\u0000\u01ff\u0200\u0003>\u001f\u0000\u0200\u0202\u0001"+
		"\u0000\u0000\u0000\u0201\u01fa\u0001\u0000\u0000\u0000\u0201\u01fd\u0001"+
		"\u0000\u0000\u0000\u0201\u01fe\u0001\u0000\u0000\u0000\u0202\u0205\u0001"+
		"\u0000\u0000\u0000\u0203\u0201\u0001\u0000\u0000\u0000\u0203\u0204\u0001"+
		"\u0000\u0000\u0000\u0204\u0207\u0001\u0000\u0000\u0000\u0205\u0203\u0001"+
		"\u0000\u0000\u0000\u0206\u01f5\u0001\u0000\u0000\u0000\u0206\u01f7\u0001"+
		"\u0000\u0000\u0000\u0207/\u0001\u0000\u0000\u0000\u0208\u020b\u0003l6"+
		"\u0000\u0209\u020b\u0003B!\u0000\u020a\u0208\u0001\u0000\u0000\u0000\u020a"+
		"\u0209\u0001\u0000\u0000\u0000\u020b\u020d\u0001\u0000\u0000\u0000\u020c"+
		"\u020e\u0003>\u001f\u0000\u020d\u020c\u0001\u0000\u0000\u0000\u020d\u020e"+
		"\u0001\u0000\u0000\u0000\u020e1\u0001\u0000\u0000\u0000\u020f\u0211\u0003"+
		"4\u001a\u0000\u0210\u020f\u0001\u0000\u0000\u0000\u0211\u0212\u0001\u0000"+
		"\u0000\u0000\u0212\u0210\u0001\u0000\u0000\u0000\u0212\u0213\u0001\u0000"+
		"\u0000\u0000\u02133\u0001\u0000\u0000\u0000\u0214\u021b\u0003p8\u0000"+
		"\u0215\u021b\u0003B!\u0000\u0216\u0217\u0005\b\u0000\u0000\u0217\u0218"+
		"\u0003(\u0014\u0000\u0218\u0219\u0005\t\u0000\u0000\u0219\u021b\u0001"+
		"\u0000\u0000\u0000\u021a\u0214\u0001\u0000\u0000\u0000\u021a\u0215\u0001"+
		"\u0000\u0000\u0000\u021a\u0216\u0001\u0000\u0000\u0000\u021b5\u0001\u0000"+
		"\u0000\u0000\u021c\u021e\u00038\u001c\u0000\u021d\u021c\u0001\u0000\u0000"+
		"\u0000\u021e\u021f\u0001\u0000\u0000\u0000\u021f\u021d\u0001\u0000\u0000"+
		"\u0000\u021f\u0220\u0001\u0000\u0000\u0000\u02207\u0001\u0000\u0000\u0000"+
		"\u0221\u0228\u0003r9\u0000\u0222\u0228\u0003B!\u0000\u0223\u0224\u0005"+
		"\b\u0000\u0000\u0224\u0225\u0003(\u0014\u0000\u0225\u0226\u0005\t\u0000"+
		"\u0000\u0226\u0228\u0001\u0000\u0000\u0000\u0227\u0221\u0001\u0000\u0000"+
		"\u0000\u0227\u0222\u0001\u0000\u0000\u0000\u0227\u0223\u0001\u0000\u0000"+
		"\u0000\u02289\u0001\u0000\u0000\u0000\u0229\u022b\u0003<\u001e\u0000\u022a"+
		"\u0229\u0001\u0000\u0000\u0000\u022b\u022c\u0001\u0000\u0000\u0000\u022c"+
		"\u022a\u0001\u0000\u0000\u0000\u022c\u022d\u0001\u0000\u0000\u0000\u022d"+
		";\u0001\u0000\u0000\u0000\u022e\u0231\u0003t:\u0000\u022f\u0231\u0003"+
		"B!\u0000\u0230\u022e\u0001\u0000\u0000\u0000\u0230\u022f\u0001\u0000\u0000"+
		"\u0000\u0231=\u0001\u0000\u0000\u0000\u0232\u0234\u0003@ \u0000\u0233"+
		"\u0232\u0001\u0000\u0000\u0000\u0234\u0235\u0001\u0000\u0000\u0000\u0235"+
		"\u0233\u0001\u0000\u0000\u0000\u0235\u0236\u0001\u0000\u0000\u0000\u0236"+
		"?\u0001\u0000\u0000\u0000\u0237\u023a\u0003v;\u0000\u0238\u023a\u0003"+
		"B!\u0000\u0239\u0237\u0001\u0000\u0000\u0000\u0239\u0238\u0001\u0000\u0000"+
		"\u0000\u023aA\u0001\u0000\u0000\u0000\u023b\u0275\u0005\u0004\u0000\u0000"+
		"\u023c\u023d\u0005\u0002\u0000\u0000\u023d\u023e\u0003D\"\u0000\u023e"+
		"\u023f\u0005\t\u0000\u0000\u023f\u0275\u0001\u0000\u0000\u0000\u0240\u0241"+
		"\u0005\u0002\u0000\u0000\u0241\u0242\u0003D\"\u0000\u0242\u0243\u0003"+
		"~?\u0000\u0243\u0244\u0003H$\u0000\u0244\u0245\u0005\t\u0000\u0000\u0245"+
		"\u0275\u0001\u0000\u0000\u0000\u0246\u0247\u0005\u0002\u0000\u0000\u0247"+
		"\u0248\u0003D\"\u0000\u0248\u0249\u0005\f\u0000\u0000\u0249\u024a\u0003"+
		"H$\u0000\u024a\u024b\u0005\t\u0000\u0000\u024b\u0275\u0001\u0000\u0000"+
		"\u0000\u024c\u024d\u0005\u0002\u0000\u0000\u024d\u024e\u0003D\"\u0000"+
		"\u024e\u024f\u0005\u0007\u0000\u0000\u024f\u0250\u0003&\u0013\u0000\u0250"+
		"\u0251\u0005\t\u0000\u0000\u0251\u0275\u0001\u0000\u0000\u0000\u0252\u0253"+
		"\u0005\u0002\u0000\u0000\u0253\u0254\u0003D\"\u0000\u0254\u0255\u0005"+
		"\u0001\u0000\u0000\u0255\u0256\u0003&\u0013\u0000\u0256\u0257\u0005\t"+
		"\u0000\u0000\u0257\u0275\u0001\u0000\u0000\u0000\u0258\u0259\u0005\u0003"+
		"\u0000\u0000\u0259\u025a\u0003D\"\u0000\u025a\u025b\u0005\u000b\u0000"+
		"\u0000\u025b\u0275\u0001\u0000\u0000\u0000\u025c\u025d\u0005\u0003\u0000"+
		"\u0000\u025d\u025e\u0003D\"\u0000\u025e\u025f\u0003~?\u0000\u025f\u0260"+
		"\u0003H$\u0000\u0260\u0261\u0005\u000b\u0000\u0000\u0261\u0275\u0001\u0000"+
		"\u0000\u0000\u0262\u0263\u0005\u0003\u0000\u0000\u0263\u0264\u0003D\""+
		"\u0000\u0264\u0265\u0005\f\u0000\u0000\u0265\u0266\u0003H$\u0000\u0266"+
		"\u0267\u0005\u000b\u0000\u0000\u0267\u0275\u0001\u0000\u0000\u0000\u0268"+
		"\u0269\u0005\u0003\u0000\u0000\u0269\u026a\u0003D\"\u0000\u026a\u026b"+
		"\u0005\u0007\u0000\u0000\u026b\u026c\u0003&\u0013\u0000\u026c\u026d\u0005"+
		"\u000b\u0000\u0000\u026d\u0275\u0001\u0000\u0000\u0000\u026e\u026f\u0005"+
		"\u0003\u0000\u0000\u026f\u0270\u0003D\"\u0000\u0270\u0271\u0005\u0001"+
		"\u0000\u0000\u0271\u0272\u0003&\u0013\u0000\u0272\u0273\u0005\u000b\u0000"+
		"\u0000\u0273\u0275\u0001\u0000\u0000\u0000\u0274\u023b\u0001\u0000\u0000"+
		"\u0000\u0274\u023c\u0001\u0000\u0000\u0000\u0274\u0240\u0001\u0000\u0000"+
		"\u0000\u0274\u0246\u0001\u0000\u0000\u0000\u0274\u024c\u0001\u0000\u0000"+
		"\u0000\u0274\u0252\u0001\u0000\u0000\u0000\u0274\u0258\u0001\u0000\u0000"+
		"\u0000\u0274\u025c\u0001\u0000\u0000\u0000\u0274\u0262\u0001\u0000\u0000"+
		"\u0000\u0274\u0268\u0001\u0000\u0000\u0000\u0274\u026e\u0001\u0000\u0000"+
		"\u0000\u0275C\u0001\u0000\u0000\u0000\u0276\u0278\u0003F#\u0000\u0277"+
		"\u0276\u0001\u0000\u0000\u0000\u0278\u0279\u0001\u0000\u0000\u0000\u0279"+
		"\u0277\u0001\u0000\u0000\u0000\u0279\u027a\u0001\u0000\u0000\u0000\u027a"+
		"E\u0001\u0000\u0000\u0000\u027b\u027e\u0005\u001e\u0000\u0000\u027c\u027e"+
		"\u0003B!\u0000\u027d\u027b\u0001\u0000\u0000\u0000\u027d\u027c\u0001\u0000"+
		"\u0000\u0000\u027eG\u0001\u0000\u0000\u0000\u027f\u0281\u0003J%\u0000"+
		"\u0280\u027f\u0001\u0000\u0000\u0000\u0280\u0281\u0001\u0000\u0000\u0000"+
		"\u0281\u0288\u0001\u0000\u0000\u0000\u0282\u0284\u0005\f\u0000\u0000\u0283"+
		"\u0285\u0003J%\u0000\u0284\u0283\u0001\u0000\u0000\u0000\u0284\u0285\u0001"+
		"\u0000\u0000\u0000\u0285\u0287\u0001\u0000\u0000\u0000\u0286\u0282\u0001"+
		"\u0000\u0000\u0000\u0287\u028a\u0001\u0000\u0000\u0000\u0288\u0286\u0001"+
		"\u0000\u0000\u0000\u0288\u0289\u0001\u0000\u0000\u0000\u0289I\u0001\u0000"+
		"\u0000\u0000\u028a\u0288\u0001\u0000\u0000\u0000\u028b\u028c\u0003&\u0013"+
		"\u0000\u028cK\u0001\u0000\u0000\u0000\u028d\u02ad\u0003N\'\u0000\u028e"+
		"\u0290\u0003V+\u0000\u028f\u0291\u0003~?\u0000\u0290\u028f\u0001\u0000"+
		"\u0000\u0000\u0290\u0291\u0001\u0000\u0000\u0000\u0291\u0292\u0001\u0000"+
		"\u0000\u0000\u0292\u0294\u0003z=\u0000\u0293\u0295\u0003~?\u0000\u0294"+
		"\u0293\u0001\u0000\u0000\u0000\u0294\u0295\u0001\u0000\u0000\u0000\u0295"+
		"\u0296\u0001\u0000\u0000\u0000\u0296\u0298\u0003T*\u0000\u0297\u0299\u0003"+
		"~?\u0000\u0298\u0297\u0001\u0000\u0000\u0000\u0298\u0299\u0001\u0000\u0000"+
		"\u0000\u0299\u029a\u0001\u0000\u0000\u0000\u029a\u029c\u0005\u001f\u0000"+
		"\u0000\u029b\u029d\u0003X,\u0000\u029c\u029b\u0001\u0000\u0000\u0000\u029c"+
		"\u029d\u0001\u0000\u0000\u0000\u029d\u02ad\u0001\u0000\u0000\u0000\u029e"+
		"\u02a0\u0003V+\u0000\u029f\u02a1\u0003~?\u0000\u02a0\u029f\u0001\u0000"+
		"\u0000\u0000\u02a0\u02a1\u0001\u0000\u0000\u0000\u02a1\u02a2\u0001\u0000"+
		"\u0000\u0000\u02a2\u02a4\u0003z=\u0000\u02a3\u02a5\u0003~?\u0000\u02a4"+
		"\u02a3\u0001\u0000\u0000\u0000\u02a4\u02a5\u0001\u0000\u0000\u0000\u02a5"+
		"\u02a6\u0001\u0000\u0000\u0000\u02a6\u02a8\u0003\u0018\f\u0000\u02a7\u02a9"+
		"\u0003~?\u0000\u02a8\u02a7\u0001\u0000\u0000\u0000\u02a8\u02a9\u0001\u0000"+
		"\u0000\u0000\u02a9\u02aa\u0001\u0000\u0000\u0000\u02aa\u02ab\u0005\u001f"+
		"\u0000\u0000\u02ab\u02ad\u0001\u0000\u0000\u0000\u02ac\u028d\u0001\u0000"+
		"\u0000\u0000\u02ac\u028e\u0001\u0000\u0000\u0000\u02ac\u029e\u0001\u0000"+
		"\u0000\u0000\u02adM\u0001\u0000\u0000\u0000\u02ae\u02b0\u0003V+\u0000"+
		"\u02af\u02b1\u0003~?\u0000\u02b0\u02af\u0001\u0000\u0000\u0000\u02b0\u02b1"+
		"\u0001\u0000\u0000\u0000\u02b1\u02b2\u0001\u0000\u0000\u0000\u02b2\u02b4"+
		"\u0003z=\u0000\u02b3\u02b5\u0003~?\u0000\u02b4\u02b3\u0001\u0000\u0000"+
		"\u0000\u02b4\u02b5\u0001\u0000\u0000\u0000\u02b5\u02b6\u0001\u0000\u0000"+
		"\u0000\u02b6\u02b8\u0003R)\u0000\u02b7\u02b9\u0003~?\u0000\u02b8\u02b7"+
		"\u0001\u0000\u0000\u0000\u02b8\u02b9\u0001\u0000\u0000\u0000\u02b9\u02ba"+
		"\u0001\u0000\u0000\u0000\u02ba\u02bc\u0003z=\u0000\u02bb\u02bd\u0003~"+
		"?\u0000\u02bc\u02bb\u0001\u0000\u0000\u0000\u02bc\u02bd\u0001\u0000\u0000"+
		"\u0000\u02bd\u02be\u0001\u0000\u0000\u0000\u02be\u02bf\u0003T*\u0000\u02bf"+
		"\u02c1\u0005\u001f\u0000\u0000\u02c0\u02c2\u0003X,\u0000\u02c1\u02c0\u0001"+
		"\u0000\u0000\u0000\u02c1\u02c2\u0001\u0000\u0000\u0000\u02c2O\u0001\u0000"+
		"\u0000\u0000\u02c3\u02c4\u0003R)\u0000\u02c4Q\u0001\u0000\u0000\u0000"+
		"\u02c5\u02c8\u0003`0\u0000\u02c6\u02c8\u0003B!\u0000\u02c7\u02c5\u0001"+
		"\u0000\u0000\u0000\u02c7\u02c6\u0001\u0000\u0000\u0000\u02c8\u02c9\u0001"+
		"\u0000\u0000\u0000\u02c9\u02c7\u0001\u0000\u0000\u0000\u02c9\u02ca\u0001"+
		"\u0000\u0000\u0000\u02caS\u0001\u0000\u0000\u0000\u02cb\u02cd\u0003V+"+
		"\u0000\u02cc\u02cb\u0001\u0000\u0000\u0000\u02cc\u02cd\u0001\u0000\u0000"+
		"\u0000\u02cdU\u0001\u0000\u0000\u0000\u02ce\u02d4\u0003P(\u0000\u02cf"+
		"\u02d0\u0003~?\u0000\u02d0\u02d1\u0003P(\u0000\u02d1\u02d3\u0001\u0000"+
		"\u0000\u0000\u02d2\u02cf\u0001\u0000\u0000\u0000\u02d3\u02d6\u0001\u0000"+
		"\u0000\u0000\u02d4\u02d2\u0001\u0000\u0000\u0000\u02d4\u02d5\u0001\u0000"+
		"\u0000\u0000\u02d5W\u0001\u0000\u0000\u0000\u02d6\u02d4\u0001\u0000\u0000"+
		"\u0000\u02d7\u02d9\u0003\\.\u0000\u02d8\u02d7\u0001\u0000\u0000\u0000"+
		"\u02d9\u02da\u0001\u0000\u0000\u0000\u02da\u02d8\u0001\u0000\u0000\u0000"+
		"\u02da\u02db\u0001\u0000\u0000\u0000\u02dbY\u0001\u0000\u0000\u0000\u02dc"+
		"\u02de\u0003|>\u0000\u02dd\u02df\u0003X,\u0000\u02de\u02dd\u0001\u0000"+
		"\u0000\u0000\u02de\u02df\u0001\u0000\u0000\u0000\u02df[\u0001\u0000\u0000"+
		"\u0000\u02e0\u02e2\u0005 \u0000\u0000\u02e1\u02e3\u0003~?\u0000\u02e2"+
		"\u02e1\u0001\u0000\u0000\u0000\u02e2\u02e3\u0001\u0000\u0000\u0000\u02e3"+
		"\u02e4\u0001\u0000\u0000\u0000\u02e4\u02e5\u0003,\u0016\u0000\u02e5\u02e6"+
		"\u0005\u001f\u0000\u0000\u02e6\u02f5\u0001\u0000\u0000\u0000\u02e7\u02e9"+
		"\u0005 \u0000\u0000\u02e8\u02ea\u0003~?\u0000\u02e9\u02e8\u0001\u0000"+
		"\u0000\u0000\u02e9\u02ea\u0001\u0000\u0000\u0000\u02ea\u02eb\u0001\u0000"+
		"\u0000\u0000\u02eb\u02ec\u0005#\u0000\u0000\u02ec\u02f5\u0005\u001f\u0000"+
		"\u0000\u02ed\u02ef\u0003~?\u0000\u02ee\u02ed\u0001\u0000\u0000\u0000\u02ee"+
		"\u02ef\u0001\u0000\u0000\u0000\u02ef\u02f0\u0001\u0000\u0000\u0000\u02f0"+
		"\u02f1\u0005#\u0000\u0000\u02f1\u02f5\u0005\u001f\u0000\u0000\u02f2\u02f5"+
		"\u0003\u0006\u0003\u0000\u02f3\u02f5\u0005\u001f\u0000\u0000\u02f4\u02e0"+
		"\u0001\u0000\u0000\u0000\u02f4\u02e7\u0001\u0000\u0000\u0000\u02f4\u02ee"+
		"\u0001\u0000\u0000\u0000\u02f4\u02f2\u0001\u0000\u0000\u0000\u02f4\u02f3"+
		"\u0001\u0000\u0000\u0000\u02f5]\u0001\u0000\u0000\u0000\u02f6\u030b\u0005"+
		"\u0017\u0000\u0000\u02f7\u030b\u0005\u0018\u0000\u0000\u02f8\u030b\u0005"+
		"\u0019\u0000\u0000\u02f9\u02fa\u0005\u0017\u0000\u0000\u02fa\u02fb\u0003"+
		"~?\u0000\u02fb\u02fc\u0005\u0018\u0000\u0000\u02fc\u030b\u0001\u0000\u0000"+
		"\u0000\u02fd\u02fe\u0005\u0018\u0000\u0000\u02fe\u02ff\u0003~?\u0000\u02ff"+
		"\u0300\u0005\u0017\u0000\u0000\u0300\u030b\u0001\u0000\u0000\u0000\u0301"+
		"\u030b\u0005\u001a\u0000\u0000\u0302\u0303\u0005\u0017\u0000\u0000\u0303"+
		"\u0304\u0003~?\u0000\u0304\u0305\u0005\u001a\u0000\u0000\u0305\u030b\u0001"+
		"\u0000\u0000\u0000\u0306\u0307\u0005\u001a\u0000\u0000\u0307\u0308\u0003"+
		"~?\u0000\u0308\u0309\u0005\u0017\u0000\u0000\u0309\u030b\u0001\u0000\u0000"+
		"\u0000\u030a\u02f6\u0001\u0000\u0000\u0000\u030a\u02f7\u0001\u0000\u0000"+
		"\u0000\u030a\u02f8\u0001\u0000\u0000\u0000\u030a\u02f9\u0001\u0000\u0000"+
		"\u0000\u030a\u02fd\u0001\u0000\u0000\u0000\u030a\u0301\u0001\u0000\u0000"+
		"\u0000\u030a\u0302\u0001\u0000\u0000\u0000\u030a\u0306\u0001\u0000\u0000"+
		"\u0000\u030b_\u0001\u0000\u0000\u0000\u030c\u030e\u0003b1\u0000\u030d"+
		"\u030c\u0001\u0000\u0000\u0000\u030e\u030f\u0001\u0000\u0000\u0000\u030f"+
		"\u030d\u0001\u0000\u0000\u0000\u030f\u0310\u0001\u0000\u0000\u0000\u0310"+
		"a\u0001\u0000\u0000\u0000\u0311\u0317\u0005\u001e\u0000\u0000\u0312\u0317"+
		"\u0003x<\u0000\u0313\u0317\u0005\f\u0000\u0000\u0314\u0317\u0005\b\u0000"+
		"\u0000\u0315\u0317\u0005\t\u0000\u0000\u0316\u0311\u0001\u0000\u0000\u0000"+
		"\u0316\u0312\u0001\u0000\u0000\u0000\u0316\u0313\u0001\u0000\u0000\u0000"+
		"\u0316\u0314\u0001\u0000\u0000\u0000\u0316\u0315\u0001\u0000\u0000\u0000"+
		"\u0317c\u0001\u0000\u0000\u0000\u0318\u0319\u0005\u001f\u0000\u0000\u0319"+
		"e\u0001\u0000\u0000\u0000\u031a\u031b\u0007\u0003\u0000\u0000\u031bg\u0001"+
		"\u0000\u0000\u0000\u031c\u031f\u0003f3\u0000\u031d\u031f\u0005\f\u0000"+
		"\u0000\u031e\u031c\u0001\u0000\u0000\u0000\u031e\u031d\u0001\u0000\u0000"+
		"\u0000\u031fi\u0001\u0000\u0000\u0000\u0320\u0325\u0003h4\u0000\u0321"+
		"\u0325\u0005\b\u0000\u0000\u0322\u0325\u0005\t\u0000\u0000\u0323\u0325"+
		"\u0003x<\u0000\u0324\u0320\u0001\u0000\u0000\u0000\u0324\u0321\u0001\u0000"+
		"\u0000\u0000\u0324\u0322\u0001\u0000\u0000\u0000\u0324\u0323\u0001\u0000"+
		"\u0000\u0000\u0325k\u0001\u0000\u0000\u0000\u0326\u0338\u0003f3\u0000"+
		"\u0327\u0338\u0005\b\u0000\u0000\u0328\u0338\u0005\t\u0000\u0000\u0329"+
		"\u0338\u0005\f\u0000\u0000\u032a\u0338\u0005#\u0000\u0000\u032b\u0338"+
		"\u0005\r\u0000\u0000\u032c\u0338\u0005\u0017\u0000\u0000\u032d\u0338\u0005"+
		"\u0018\u0000\u0000\u032e\u0338\u0005\u0019\u0000\u0000\u032f\u0338\u0005"+
		"\u0011\u0000\u0000\u0330\u0338\u0005\u0012\u0000\u0000\u0331\u0338\u0005"+
		"\u0013\u0000\u0000\u0332\u0338\u0005\u0014\u0000\u0000\u0333\u0338\u0005"+
		"\u0015\u0000\u0000\u0334\u0338\u0005\u0016\u0000\u0000\u0335\u0338\u0005"+
		"\u001b\u0000\u0000\u0336\u0338\u0005\u001a\u0000\u0000\u0337\u0326\u0001"+
		"\u0000\u0000\u0000\u0337\u0327\u0001\u0000\u0000\u0000\u0337\u0328\u0001"+
		"\u0000\u0000\u0000\u0337\u0329\u0001\u0000\u0000\u0000\u0337\u032a\u0001"+
		"\u0000\u0000\u0000\u0337\u032b\u0001\u0000\u0000\u0000\u0337\u032c\u0001"+
		"\u0000\u0000\u0000\u0337\u032d\u0001\u0000\u0000\u0000\u0337\u032e\u0001"+
		"\u0000\u0000\u0000\u0337\u032f\u0001\u0000\u0000\u0000\u0337\u0330\u0001"+
		"\u0000\u0000\u0000\u0337\u0331\u0001\u0000\u0000\u0000\u0337\u0332\u0001"+
		"\u0000\u0000\u0000\u0337\u0333\u0001\u0000\u0000\u0000\u0337\u0334\u0001"+
		"\u0000\u0000\u0000\u0337\u0335\u0001\u0000\u0000\u0000\u0337\u0336\u0001"+
		"\u0000\u0000\u0000\u0338m\u0001\u0000\u0000\u0000\u0339\u033d\u0003j5"+
		"\u0000\u033a\u033d\u0005\u0005\u0000\u0000\u033b\u033d\u0005#\u0000\u0000"+
		"\u033c\u0339\u0001\u0000\u0000\u0000\u033c\u033a\u0001\u0000\u0000\u0000"+
		"\u033c\u033b\u0001\u0000\u0000\u0000\u033do\u0001\u0000\u0000\u0000\u033e"+
		"\u0340\u0003f3\u0000\u033f\u033e\u0001\u0000\u0000\u0000\u0340\u0341\u0001"+
		"\u0000\u0000\u0000\u0341\u033f\u0001\u0000\u0000\u0000\u0341\u0342\u0001"+
		"\u0000\u0000\u0000\u0342q\u0001\u0000\u0000\u0000\u0343\u0345\u0003h4"+
		"\u0000\u0344\u0343\u0001\u0000\u0000\u0000\u0345\u0346\u0001\u0000\u0000"+
		"\u0000\u0346\u0344\u0001\u0000\u0000\u0000\u0346\u0347\u0001\u0000\u0000"+
		"\u0000\u0347s\u0001\u0000\u0000\u0000\u0348\u034a\u0003j5\u0000\u0349"+
		"\u0348\u0001\u0000\u0000\u0000\u034a\u034b\u0001\u0000\u0000\u0000\u034b"+
		"\u0349\u0001\u0000\u0000\u0000\u034b\u034c\u0001\u0000\u0000\u0000\u034c"+
		"u\u0001\u0000\u0000\u0000\u034d\u034f\u0003n7\u0000\u034e\u034d\u0001"+
		"\u0000\u0000\u0000\u034f\u0350\u0001\u0000\u0000\u0000\u0350\u034e\u0001"+
		"\u0000\u0000\u0000\u0350\u0351\u0001\u0000\u0000\u0000\u0351w\u0001\u0000"+
		"\u0000\u0000\u0352\u0353\u0007\u0004\u0000\u0000\u0353y\u0001\u0000\u0000"+
		"\u0000\u0354\u0355\u0007\u0005\u0000\u0000\u0355{\u0001\u0000\u0000\u0000"+
		"\u0356\u0358\u0005#\u0000\u0000\u0357\u0356\u0001\u0000\u0000\u0000\u0357"+
		"\u0358\u0001\u0000\u0000\u0000\u0358}\u0001\u0000\u0000\u0000\u0359\u035a"+
		"\u0007\u0006\u0000\u0000\u035a\u007f\u0001\u0000\u0000\u0000t\u0084\u0088"+
		"\u008a\u008f\u0099\u00a5\u00ae\u00b8\u00c4\u00cb\u00cf\u00d9\u00e6\u00f1"+
		"\u00fb\u0108\u0111\u0116\u0119\u011d\u0123\u0129\u012d\u0131\u0135\u0139"+
		"\u013f\u0142\u0145\u014b\u014e\u0151\u015f\u016b\u016d\u0171\u017b\u017f"+
		"\u0183\u0189\u018d\u0191\u01a5\u01a8\u01ab\u01ae\u01b2\u01b9\u01bd\u01c0"+
		"\u01c4\u01cb\u01cf\u01d2\u01d6\u01dd\u01e1\u01e4\u01e8\u01ef\u01f3\u01f7"+
		"\u0201\u0203\u0206\u020a\u020d\u0212\u021a\u021f\u0227\u022c\u0230\u0235"+
		"\u0239\u0274\u0279\u027d\u0280\u0284\u0288\u0290\u0294\u0298\u029c\u02a0"+
		"\u02a4\u02a8\u02ac\u02b0\u02b4\u02b8\u02bc\u02c1\u02c7\u02c9\u02cc\u02d4"+
		"\u02da\u02de\u02e2\u02e9\u02ee\u02f4\u030a\u030f\u0316\u031e\u0324\u0337"+
		"\u033c\u0341\u0346\u034b\u0350\u0357";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}