// Generated from c:/Users/yagiz/Desktop/Cbuild/cbuild.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class cbuildParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		ASSIGN_OP=1, DOLLAR_LPAREN=2, DOLLAR_L_CURLY_BRACE=3, VAR=4, DOUBLE_DOLLAR=5, 
		GROUPED_DOUBLE_COLON=6, GROUPED_COLON=7, DOUBLE_COLON=8, COLON=9, LPAREN=10, 
		RPAREN=11, L_CURLY_BRACE=12, R_CURLY_BRACE=13, COMMA=14, PIPE=15, BACKSLASH=16, 
		PLUS=17, QUESTION=18, BANG=19, INCLUDE=20, DASH_INCLUDE=21, SINCLUDE=22, 
		ENDEF=23, IFDEF=24, IFNDEF=25, IFEQ=26, IFNEQ=27, ELSE=28, ENDIF=29, OVERRIDE=30, 
		EXPORT=31, UNEXPORT=32, UNDEFINE=33, DEFINE=34, VPATH=35, HOOK=36, CHARS=37, 
		NL=38, LEADING_TAB=39, WS=40, TAB=41, COMMENT=42;
	public static final int
		RULE_cbuildfile = 0, RULE_statements = 1, RULE_conditional = 2, RULE_conditional_in_recipe = 3, 
		RULE_statements_opt = 4, RULE_statement = 5, RULE_define = 6, RULE_define_body = 7, 
		RULE_definition = 8, RULE_include = 9, RULE_export = 10, RULE_vpath = 11, 
		RULE_vpath_args = 12, RULE_assignment = 13, RULE_assignment_prefix = 14, 
		RULE_if_eq_kw = 15, RULE_if_def_kw = 16, RULE_include_kw = 17, RULE_condition = 18, 
		RULE_expressions_opt = 19, RULE_expressions = 20, RULE_exprs_nested = 21, 
		RULE_exprs_in_assign = 22, RULE_exprs_in_recipe = 23, RULE_exprs_in_def = 24, 
		RULE_first_expr_in_def = 25, RULE_expression = 26, RULE_expression_atom = 27, 
		RULE_expr_nested = 28, RULE_expr_nested_atom = 29, RULE_expr_in_assign = 30, 
		RULE_expr_in_assign_atom = 31, RULE_expr_in_recipe = 32, RULE_expr_in_recipe_atom = 33, 
		RULE_function = 34, RULE_function_name = 35, RULE_function_name_atom = 36, 
		RULE_arguments = 37, RULE_argument = 38, RULE_rule = 39, RULE_static_pattern_rule = 40, 
		RULE_target = 41, RULE_pattern = 42, RULE_prerequisites = 43, RULE_orderonlyprerequisites = 44, 
		RULE_targets = 45, RULE_recipes = 46, RULE_recipes_opt = 47, RULE_recipe = 48, 
		RULE_empty_recipe_line = 49, RULE_undefine = 50, RULE_specifiers = 51, 
		RULE_identifier = 52, RULE_identifier_atom = 53, RULE_br = 54, RULE_char = 55, 
		RULE_char_nested = 56, RULE_char_in_assign = 57, RULE_char_in_def = 58, 
		RULE_char_in_recipe = 59, RULE_text = 60, RULE_text_nested = 61, RULE_text_in_assign = 62, 
		RULE_text_in_recipe = 63, RULE_keywords = 64, RULE_colon = 65, RULE_comment_opt = 66, 
		RULE_ws = 67, RULE_hook = 68, RULE_hook_program = 69;
	private static String[] makeRuleNames() {
		return new String[] {
			"cbuildfile", "statements", "conditional", "conditional_in_recipe", "statements_opt", 
			"statement", "define", "define_body", "definition", "include", "export", 
			"vpath", "vpath_args", "assignment", "assignment_prefix", "if_eq_kw", 
			"if_def_kw", "include_kw", "condition", "expressions_opt", "expressions", 
			"exprs_nested", "exprs_in_assign", "exprs_in_recipe", "exprs_in_def", 
			"first_expr_in_def", "expression", "expression_atom", "expr_nested", 
			"expr_nested_atom", "expr_in_assign", "expr_in_assign_atom", "expr_in_recipe", 
			"expr_in_recipe_atom", "function", "function_name", "function_name_atom", 
			"arguments", "argument", "rule", "static_pattern_rule", "target", "pattern", 
			"prerequisites", "orderonlyprerequisites", "targets", "recipes", "recipes_opt", 
			"recipe", "empty_recipe_line", "undefine", "specifiers", "identifier", 
			"identifier_atom", "br", "char", "char_nested", "char_in_assign", "char_in_def", 
			"char_in_recipe", "text", "text_nested", "text_in_assign", "text_in_recipe", 
			"keywords", "colon", "comment_opt", "ws", "hook", "hook_program"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, "'$('", "'${'", null, "'$$'", "'&::'", "'&:'", "'::'", "':'", 
			"'('", "')'", "'{'", "'}'", "','", "'|'", "'\\'", "'+'", "'?'", "'!'", 
			"'include'", "'-include'", "'sinclude'", "'endef'", "'ifdef'", "'ifndef'", 
			"'ifeq'", "'ifneq'", "'else'", "'endif'", "'override'", "'export'", "'unexport'", 
			"'undefine'", "'define'", "'vpath'", "'hook'", null, null, null, null, 
			"'\\t'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "ASSIGN_OP", "DOLLAR_LPAREN", "DOLLAR_L_CURLY_BRACE", "VAR", "DOUBLE_DOLLAR", 
			"GROUPED_DOUBLE_COLON", "GROUPED_COLON", "DOUBLE_COLON", "COLON", "LPAREN", 
			"RPAREN", "L_CURLY_BRACE", "R_CURLY_BRACE", "COMMA", "PIPE", "BACKSLASH", 
			"PLUS", "QUESTION", "BANG", "INCLUDE", "DASH_INCLUDE", "SINCLUDE", "ENDEF", 
			"IFDEF", "IFNDEF", "IFEQ", "IFNEQ", "ELSE", "ENDIF", "OVERRIDE", "EXPORT", 
			"UNEXPORT", "UNDEFINE", "DEFINE", "VPATH", "HOOK", "CHARS", "NL", "LEADING_TAB", 
			"WS", "TAB", "COMMENT"
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
	}

	public final CbuildfileContext cbuildfile() throws RecognitionException {
		CbuildfileContext _localctx = new CbuildfileContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_cbuildfile);
		try {
			setState(144);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(140);
				statements();
				setState(141);
				match(EOF);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(143);
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
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public StatementsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statements; }
	}

	public final StatementsContext statements() throws RecognitionException {
		StatementsContext _localctx = new StatementsContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_statements);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(151);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(149);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
					case 1:
						{
						setState(146);
						statement();
						}
						break;
					case 2:
						{
						setState(147);
						br();
						}
						break;
					case 3:
						{
						setState(148);
						ws();
						}
						break;
					}
					} 
				}
				setState(153);
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
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public TerminalNode ELSE() { return getToken(cbuildParser.ELSE, 0); }
		public ConditionalContext conditional() {
			return getRuleContext(ConditionalContext.class,0);
		}
		public If_def_kwContext if_def_kw() {
			return getRuleContext(If_def_kwContext.class,0);
		}
		public PatternContext pattern() {
			return getRuleContext(PatternContext.class,0);
		}
		public ConditionalContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_conditional; }
	}

	public final ConditionalContext conditional() throws RecognitionException {
		ConditionalContext _localctx = new ConditionalContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_conditional);
		int _la;
		try {
			setState(276);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,29,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(154);
				if_eq_kw();
				setState(156);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(155);
					ws();
					}
				}

				setState(158);
				condition();
				setState(160);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(159);
					ws();
					}
				}

				setState(162);
				statements_opt();
				setState(164);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(163);
					ws();
					}
				}

				setState(166);
				match(ENDIF);
				setState(168);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(167);
					ws();
					}
				}

				setState(170);
				comment_opt();
				setState(171);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(173);
				if_eq_kw();
				setState(175);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(174);
					ws();
					}
				}

				setState(177);
				condition();
				setState(179);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(178);
					ws();
					}
				}

				setState(181);
				statements_opt();
				setState(183);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(182);
					ws();
					}
				}

				setState(185);
				match(ELSE);
				setState(187);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(186);
					ws();
					}
				}

				setState(189);
				statements_opt();
				setState(191);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(190);
					ws();
					}
				}

				setState(193);
				match(ENDIF);
				setState(194);
				comment_opt();
				setState(195);
				br();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(197);
				if_eq_kw();
				setState(199);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(198);
					ws();
					}
				}

				setState(201);
				condition();
				setState(203);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(202);
					ws();
					}
				}

				setState(205);
				statements_opt();
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
				match(ELSE);
				setState(211);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(210);
					ws();
					}
				}

				setState(213);
				conditional();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(215);
				if_def_kw();
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
				pattern();
				setState(221);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(220);
					ws();
					}
				}

				setState(223);
				statements_opt();
				setState(225);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(224);
					ws();
					}
				}

				setState(227);
				match(ENDIF);
				setState(229);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(228);
					ws();
					}
				}

				setState(231);
				comment_opt();
				setState(232);
				br();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(234);
				if_def_kw();
				setState(236);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(235);
					ws();
					}
				}

				setState(238);
				pattern();
				setState(240);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(239);
					ws();
					}
				}

				setState(242);
				statements_opt();
				setState(244);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(243);
					ws();
					}
				}

				setState(246);
				match(ELSE);
				setState(248);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(247);
					ws();
					}
				}

				setState(250);
				statements_opt();
				setState(252);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(251);
					ws();
					}
				}

				setState(254);
				match(ENDIF);
				setState(255);
				comment_opt();
				setState(256);
				br();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(258);
				if_def_kw();
				setState(260);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(259);
					ws();
					}
				}

				setState(262);
				pattern();
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
				statements_opt();
				setState(268);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(267);
					ws();
					}
				}

				setState(270);
				match(ELSE);
				setState(272);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(271);
					ws();
					}
				}

				setState(274);
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
		public PatternContext pattern() {
			return getRuleContext(PatternContext.class,0);
		}
		public Conditional_in_recipeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_conditional_in_recipe; }
	}

	public final Conditional_in_recipeContext conditional_in_recipe() throws RecognitionException {
		Conditional_in_recipeContext _localctx = new Conditional_in_recipeContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_conditional_in_recipe);
		int _la;
		try {
			setState(346);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,36,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(278);
				if_eq_kw();
				setState(280);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(279);
					ws();
					}
				}

				setState(282);
				condition();
				setState(283);
				match(NL);
				setState(284);
				recipes_opt();
				setState(285);
				match(ENDIF);
				setState(286);
				comment_opt();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(288);
				if_eq_kw();
				setState(290);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(289);
					ws();
					}
				}

				setState(292);
				condition();
				setState(293);
				match(NL);
				setState(294);
				recipes_opt();
				setState(295);
				match(ELSE);
				setState(296);
				match(NL);
				setState(297);
				recipes_opt();
				setState(298);
				match(ENDIF);
				setState(299);
				comment_opt();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(301);
				if_eq_kw();
				setState(303);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(302);
					ws();
					}
				}

				setState(305);
				condition();
				setState(306);
				match(NL);
				setState(307);
				recipes_opt();
				setState(308);
				match(ELSE);
				setState(309);
				match(NL);
				setState(310);
				conditional_in_recipe();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(312);
				if_def_kw();
				setState(314);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(313);
					ws();
					}
				}

				setState(316);
				pattern();
				setState(317);
				match(NL);
				setState(318);
				recipes_opt();
				setState(319);
				match(ENDIF);
				setState(320);
				comment_opt();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(322);
				if_def_kw();
				setState(324);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(323);
					ws();
					}
				}

				setState(326);
				pattern();
				setState(327);
				match(NL);
				setState(328);
				recipes_opt();
				setState(329);
				match(ELSE);
				setState(330);
				match(NL);
				setState(331);
				recipes_opt();
				setState(332);
				match(ENDIF);
				setState(333);
				comment_opt();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(335);
				if_def_kw();
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
				pattern();
				setState(340);
				match(NL);
				setState(341);
				recipes_opt();
				setState(342);
				match(ELSE);
				setState(343);
				match(NL);
				setState(344);
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
	}

	public final Statements_optContext statements_opt() throws RecognitionException {
		Statements_optContext _localctx = new Statements_optContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_statements_opt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(348);
			comment_opt();
			setState(349);
			br();
			setState(350);
			statements();
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
		public BrContext br() {
			return getRuleContext(BrContext.class,0);
		}
		public VpathContext vpath() {
			return getRuleContext(VpathContext.class,0);
		}
		public AssignmentContext assignment() {
			return getRuleContext(AssignmentContext.class,0);
		}
		public FunctionContext function() {
			return getRuleContext(FunctionContext.class,0);
		}
		public RuleContext rule_() {
			return getRuleContext(RuleContext.class,0);
		}
		public HookContext hook() {
			return getRuleContext(HookContext.class,0);
		}
		public UndefineContext undefine() {
			return getRuleContext(UndefineContext.class,0);
		}
		public StatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statement; }
	}

	public final StatementContext statement() throws RecognitionException {
		StatementContext _localctx = new StatementContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_statement);
		int _la;
		try {
			setState(402);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,48,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(353);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(352);
					ws();
					}
				}

				setState(355);
				match(COMMENT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(357);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(356);
					ws();
					}
				}

				setState(359);
				conditional();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(361);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(360);
					ws();
					}
				}

				setState(363);
				define();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(365);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(364);
					ws();
					}
				}

				setState(367);
				include();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(369);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,41,_ctx) ) {
				case 1:
					{
					setState(368);
					ws();
					}
					break;
				}
				setState(371);
				export();
				setState(372);
				br();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(375);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(374);
					ws();
					}
				}

				setState(377);
				vpath();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(379);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(378);
					ws();
					}
				}

				setState(381);
				assignment();
				setState(382);
				br();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(385);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(384);
					ws();
					}
				}

				setState(387);
				function();
				setState(388);
				br();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(391);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(390);
					ws();
					}
				}

				setState(393);
				rule_();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(395);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(394);
					ws();
					}
				}

				setState(397);
				hook();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(399);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(398);
					ws();
					}
				}

				setState(401);
				undefine();
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
		public Define_bodyContext define_body() {
			return getRuleContext(Define_bodyContext.class,0);
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
	}

	public final DefineContext define() throws RecognitionException {
		DefineContext _localctx = new DefineContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_define);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(405);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 7516192768L) != 0)) {
				{
				setState(404);
				specifiers();
				}
			}

			setState(407);
			match(DEFINE);
			setState(408);
			ws();
			setState(409);
			pattern();
			setState(411);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,50,_ctx) ) {
			case 1:
				{
				setState(410);
				ws();
				}
				break;
			}
			setState(414);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ASSIGN_OP) {
				{
				setState(413);
				match(ASSIGN_OP);
				}
			}

			setState(417);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(416);
				ws();
				}
			}

			setState(419);
			define_body();
			setState(420);
			match(ENDEF);
			setState(421);
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
	public static class Define_bodyContext extends ParserRuleContext {
		public List<DefineContext> define() {
			return getRuleContexts(DefineContext.class);
		}
		public DefineContext define(int i) {
			return getRuleContext(DefineContext.class,i);
		}
		public List<DefinitionContext> definition() {
			return getRuleContexts(DefinitionContext.class);
		}
		public DefinitionContext definition(int i) {
			return getRuleContext(DefinitionContext.class,i);
		}
		public Define_bodyContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_define_body; }
	}

	public final Define_bodyContext define_body() throws RecognitionException {
		Define_bodyContext _localctx = new Define_bodyContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_define_body);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(427);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4697620480000L) != 0)) {
				{
				setState(425);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case OVERRIDE:
				case EXPORT:
				case UNEXPORT:
				case DEFINE:
					{
					setState(423);
					define();
					}
					break;
				case NL:
				case COMMENT:
					{
					setState(424);
					definition();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(429);
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
	}

	public final DefinitionContext definition() throws RecognitionException {
		DefinitionContext _localctx = new DefinitionContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_definition);
		try {
			setState(438);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,55,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(430);
				comment_opt();
				setState(431);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(433);
				comment_opt();
				setState(434);
				br();
				setState(435);
				exprs_in_def();
				setState(436);
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
	}

	public final IncludeContext include() throws RecognitionException {
		IncludeContext _localctx = new IncludeContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_include);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(440);
			include_kw();
			setState(441);
			expressions();
			setState(442);
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
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public TerminalNode UNEXPORT() { return getToken(cbuildParser.UNEXPORT, 0); }
		public Assignment_prefixContext assignment_prefix() {
			return getRuleContext(Assignment_prefixContext.class,0);
		}
		public ExportContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_export; }
	}

	public final ExportContext export() throws RecognitionException {
		ExportContext _localctx = new ExportContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_export);
		int _la;
		try {
			setState(465);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,62,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(445);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(444);
					ws();
					}
				}

				setState(447);
				match(EXPORT);
				setState(449);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(448);
					ws();
					}
				}

				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(452);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(451);
					ws();
					}
				}

				setState(454);
				match(UNEXPORT);
				setState(456);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(455);
					ws();
					}
				}

				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(459);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(458);
					ws();
					}
				}

				setState(461);
				assignment_prefix();
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
	}

	public final VpathContext vpath() throws RecognitionException {
		VpathContext _localctx = new VpathContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_vpath);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(467);
			match(VPATH);
			setState(469);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(468);
				vpath_args();
				}
			}

			setState(471);
			comment_opt();
			setState(472);
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
	}

	public final Vpath_argsContext vpath_args() throws RecognitionException {
		Vpath_argsContext _localctx = new Vpath_argsContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_vpath_args);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(474);
			ws();
			setState(475);
			pattern();
			setState(479);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(476);
				ws();
				setState(477);
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
	}

	public final AssignmentContext assignment() throws RecognitionException {
		AssignmentContext _localctx = new AssignmentContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_assignment);
		int _la;
		try {
			setState(501);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
			case LPAREN:
			case RPAREN:
			case L_CURLY_BRACE:
			case R_CURLY_BRACE:
			case COMMA:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(481);
				pattern();
				setState(483);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(482);
					ws();
					}
				}

				setState(485);
				match(ASSIGN_OP);
				setState(487);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,66,_ctx) ) {
				case 1:
					{
					setState(486);
					exprs_in_assign();
					}
					break;
				}
				setState(489);
				comment_opt();
				}
				break;
			case OVERRIDE:
			case EXPORT:
			case UNEXPORT:
				enterOuterAlt(_localctx, 2);
				{
				setState(491);
				assignment_prefix();
				setState(493);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(492);
					ws();
					}
				}

				setState(495);
				match(ASSIGN_OP);
				setState(497);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,68,_ctx) ) {
				case 1:
					{
					setState(496);
					exprs_in_assign();
					}
					break;
				}
				setState(499);
				comment_opt();
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
	}

	public final Assignment_prefixContext assignment_prefix() throws RecognitionException {
		Assignment_prefixContext _localctx = new Assignment_prefixContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_assignment_prefix);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(503);
			specifiers();
			setState(504);
			ws();
			setState(505);
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
	}

	public final If_eq_kwContext if_eq_kw() throws RecognitionException {
		If_eq_kwContext _localctx = new If_eq_kwContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_if_eq_kw);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(507);
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
	}

	public final If_def_kwContext if_def_kw() throws RecognitionException {
		If_def_kwContext _localctx = new If_def_kwContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_if_def_kw);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(509);
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
	}

	public final Include_kwContext include_kw() throws RecognitionException {
		Include_kwContext _localctx = new Include_kwContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_include_kw);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(511);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 7340032L) != 0)) ) {
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
		public ConditionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_condition; }
	}

	public final ConditionContext condition() throws RecognitionException {
		ConditionContext _localctx = new ConditionContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_condition);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(513);
			match(LPAREN);
			setState(514);
			expressions_opt();
			setState(515);
			match(COMMA);
			setState(516);
			expressions_opt();
			setState(517);
			match(RPAREN);
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
	}

	public final Expressions_optContext expressions_opt() throws RecognitionException {
		Expressions_optContext _localctx = new Expressions_optContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_expressions_opt);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(520);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 3504686958142L) != 0)) {
				{
				setState(519);
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
	}

	public final ExpressionsContext expressions() throws RecognitionException {
		ExpressionsContext _localctx = new ExpressionsContext(_ctx, getState());
		enterRule(_localctx, 40, RULE_expressions);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(523);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(522);
				ws();
				}
			}

			setState(525);
			expression();
			setState(527);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,72,_ctx) ) {
			case 1:
				{
				setState(526);
				ws();
				}
				break;
			}
			setState(534);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,73,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(529);
					ws();
					setState(530);
					expression();
					}
					} 
				}
				setState(536);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,73,_ctx);
			}
			setState(538);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(537);
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
	}

	public final Exprs_nestedContext exprs_nested() throws RecognitionException {
		Exprs_nestedContext _localctx = new Exprs_nestedContext(_ctx, getState());
		enterRule(_localctx, 42, RULE_exprs_nested);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(541);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(540);
				ws();
				}
			}

			setState(543);
			expr_nested();
			setState(545);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,76,_ctx) ) {
			case 1:
				{
				setState(544);
				ws();
				}
				break;
			}
			setState(552);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,77,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(547);
					ws();
					setState(548);
					expr_nested();
					}
					} 
				}
				setState(554);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,77,_ctx);
			}
			setState(556);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(555);
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
	}

	public final Exprs_in_assignContext exprs_in_assign() throws RecognitionException {
		Exprs_in_assignContext _localctx = new Exprs_in_assignContext(_ctx, getState());
		enterRule(_localctx, 44, RULE_exprs_in_assign);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(559);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(558);
				ws();
				}
			}

			setState(561);
			expr_in_assign();
			setState(563);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,80,_ctx) ) {
			case 1:
				{
				setState(562);
				ws();
				}
				break;
			}
			setState(570);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,81,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(565);
					ws();
					setState(566);
					expr_in_assign();
					}
					} 
				}
				setState(572);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,81,_ctx);
			}
			setState(574);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,82,_ctx) ) {
			case 1:
				{
				setState(573);
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
	}

	public final Exprs_in_recipeContext exprs_in_recipe() throws RecognitionException {
		Exprs_in_recipeContext _localctx = new Exprs_in_recipeContext(_ctx, getState());
		enterRule(_localctx, 46, RULE_exprs_in_recipe);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(577);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(576);
				ws();
				}
			}

			setState(579);
			expr_in_recipe();
			setState(581);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,84,_ctx) ) {
			case 1:
				{
				setState(580);
				ws();
				}
				break;
			}
			setState(588);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,85,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(583);
					ws();
					setState(584);
					expr_in_recipe();
					}
					} 
				}
				setState(590);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,85,_ctx);
			}
			setState(592);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(591);
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
	}

	public final Exprs_in_defContext exprs_in_def() throws RecognitionException {
		Exprs_in_defContext _localctx = new Exprs_in_defContext(_ctx, getState());
		enterRule(_localctx, 48, RULE_exprs_in_def);
		int _la;
		try {
			int _alt;
			setState(611);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,90,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(594);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(596);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==NL) {
					{
					setState(595);
					br();
					}
				}

				setState(598);
				first_expr_in_def();
				setState(608);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,89,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						setState(606);
						_errHandler.sync(this);
						switch ( getInterpreter().adaptivePredict(_input,88,_ctx) ) {
						case 1:
							{
							{
							setState(599);
							br();
							setState(600);
							first_expr_in_def();
							}
							}
							break;
						case 2:
							{
							{
							setState(602);
							br();
							}
							}
							break;
						case 3:
							{
							{
							setState(603);
							ws();
							setState(604);
							expr_in_recipe();
							}
							}
							break;
						}
						} 
					}
					setState(610);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,89,_ctx);
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
	}

	public final First_expr_in_defContext first_expr_in_def() throws RecognitionException {
		First_expr_in_defContext _localctx = new First_expr_in_defContext(_ctx, getState());
		enterRule(_localctx, 50, RULE_first_expr_in_def);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(615);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case LPAREN:
			case RPAREN:
			case L_CURLY_BRACE:
			case R_CURLY_BRACE:
			case COMMA:
			case BACKSLASH:
			case PLUS:
			case QUESTION:
			case BANG:
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
			case COMMENT:
				{
				setState(613);
				char_in_def();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				{
				setState(614);
				function();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(618);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4604198649406L) != 0)) {
				{
				setState(617);
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
	}

	public final ExpressionContext expression() throws RecognitionException {
		ExpressionContext _localctx = new ExpressionContext(_ctx, getState());
		enterRule(_localctx, 52, RULE_expression);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(621); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(620);
				expression_atom();
				}
				}
				setState(623); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 206152074814L) != 0) );
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
	}

	public final Expression_atomContext expression_atom() throws RecognitionException {
		Expression_atomContext _localctx = new Expression_atomContext(_ctx, getState());
		enterRule(_localctx, 54, RULE_expression_atom);
		try {
			setState(631);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case BACKSLASH:
			case PLUS:
			case QUESTION:
			case BANG:
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
				enterOuterAlt(_localctx, 1);
				{
				setState(625);
				text();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(626);
				function();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(627);
				match(LPAREN);
				setState(628);
				exprs_nested();
				setState(629);
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
	}

	public final Expr_nestedContext expr_nested() throws RecognitionException {
		Expr_nestedContext _localctx = new Expr_nestedContext(_ctx, getState());
		enterRule(_localctx, 56, RULE_expr_nested);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(634); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(633);
				expr_nested_atom();
				}
				}
				setState(636); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 206152091198L) != 0) );
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
	}

	public final Expr_nested_atomContext expr_nested_atom() throws RecognitionException {
		Expr_nested_atomContext _localctx = new Expr_nested_atomContext(_ctx, getState());
		enterRule(_localctx, 58, RULE_expr_nested_atom);
		try {
			setState(644);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case COMMA:
			case BACKSLASH:
			case PLUS:
			case QUESTION:
			case BANG:
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
				enterOuterAlt(_localctx, 1);
				{
				setState(638);
				text_nested();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(639);
				function();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(640);
				match(LPAREN);
				setState(641);
				exprs_nested();
				setState(642);
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
	}

	public final Expr_in_assignContext expr_in_assign() throws RecognitionException {
		Expr_in_assignContext _localctx = new Expr_in_assignContext(_ctx, getState());
		enterRule(_localctx, 60, RULE_expr_in_assign);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(647); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(646);
				expr_in_assign_atom();
				}
				}
				setState(649); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 206152138302L) != 0) );
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
	}

	public final Expr_in_assign_atomContext expr_in_assign_atom() throws RecognitionException {
		Expr_in_assign_atomContext _localctx = new Expr_in_assign_atomContext(_ctx, getState());
		enterRule(_localctx, 62, RULE_expr_in_assign_atom);
		try {
			setState(653);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case LPAREN:
			case RPAREN:
			case L_CURLY_BRACE:
			case R_CURLY_BRACE:
			case COMMA:
			case PIPE:
			case BACKSLASH:
			case PLUS:
			case QUESTION:
			case BANG:
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
				enterOuterAlt(_localctx, 1);
				{
				setState(651);
				text_in_assign();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(652);
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
	}

	public final Expr_in_recipeContext expr_in_recipe() throws RecognitionException {
		Expr_in_recipeContext _localctx = new Expr_in_recipeContext(_ctx, getState());
		enterRule(_localctx, 64, RULE_expr_in_recipe);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(656); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(655);
				expr_in_recipe_atom();
				}
				}
				setState(658); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 4604198649406L) != 0) );
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
	}

	public final Expr_in_recipe_atomContext expr_in_recipe_atom() throws RecognitionException {
		Expr_in_recipe_atomContext _localctx = new Expr_in_recipe_atomContext(_ctx, getState());
		enterRule(_localctx, 66, RULE_expr_in_recipe_atom);
		try {
			setState(662);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case LPAREN:
			case RPAREN:
			case L_CURLY_BRACE:
			case R_CURLY_BRACE:
			case COMMA:
			case PIPE:
			case BACKSLASH:
			case PLUS:
			case QUESTION:
			case BANG:
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
			case COMMENT:
				enterOuterAlt(_localctx, 1);
				{
				setState(660);
				text_in_recipe();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(661);
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
	}

	public final FunctionContext function() throws RecognitionException {
		FunctionContext _localctx = new FunctionContext(_ctx, getState());
		enterRule(_localctx, 68, RULE_function);
		try {
			setState(721);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,101,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(664);
				match(VAR);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(665);
				match(DOLLAR_LPAREN);
				setState(666);
				function_name();
				setState(667);
				match(RPAREN);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(669);
				match(DOLLAR_LPAREN);
				setState(670);
				function_name();
				setState(671);
				ws();
				setState(672);
				arguments();
				setState(673);
				match(RPAREN);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(675);
				match(DOLLAR_LPAREN);
				setState(676);
				function_name();
				setState(677);
				match(COMMA);
				setState(678);
				arguments();
				setState(679);
				match(RPAREN);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(681);
				match(DOLLAR_LPAREN);
				setState(682);
				function_name();
				setState(683);
				match(COLON);
				setState(684);
				expressions();
				setState(685);
				match(RPAREN);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(687);
				match(DOLLAR_LPAREN);
				setState(688);
				function_name();
				setState(689);
				match(ASSIGN_OP);
				setState(690);
				expressions();
				setState(691);
				match(RPAREN);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(693);
				match(DOLLAR_L_CURLY_BRACE);
				setState(694);
				function_name();
				setState(695);
				match(R_CURLY_BRACE);
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(697);
				match(DOLLAR_L_CURLY_BRACE);
				setState(698);
				function_name();
				setState(699);
				ws();
				setState(700);
				arguments();
				setState(701);
				match(R_CURLY_BRACE);
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(703);
				match(DOLLAR_L_CURLY_BRACE);
				setState(704);
				function_name();
				setState(705);
				match(COMMA);
				setState(706);
				arguments();
				setState(707);
				match(R_CURLY_BRACE);
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(709);
				match(DOLLAR_L_CURLY_BRACE);
				setState(710);
				function_name();
				setState(711);
				match(COLON);
				setState(712);
				expressions();
				setState(713);
				match(R_CURLY_BRACE);
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(715);
				match(DOLLAR_L_CURLY_BRACE);
				setState(716);
				function_name();
				setState(717);
				match(ASSIGN_OP);
				setState(718);
				expressions();
				setState(719);
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
	}

	public final Function_nameContext function_name() throws RecognitionException {
		Function_nameContext _localctx = new Function_nameContext(_ctx, getState());
		enterRule(_localctx, 70, RULE_function_name);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(724); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(723);
				function_name_atom();
				}
				}
				setState(726); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 137439903772L) != 0) );
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
		public TerminalNode PLUS() { return getToken(cbuildParser.PLUS, 0); }
		public TerminalNode QUESTION() { return getToken(cbuildParser.QUESTION, 0); }
		public TerminalNode PIPE() { return getToken(cbuildParser.PIPE, 0); }
		public TerminalNode BANG() { return getToken(cbuildParser.BANG, 0); }
		public FunctionContext function() {
			return getRuleContext(FunctionContext.class,0);
		}
		public Function_name_atomContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_function_name_atom; }
	}

	public final Function_name_atomContext function_name_atom() throws RecognitionException {
		Function_name_atomContext _localctx = new Function_name_atomContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_function_name_atom);
		try {
			setState(734);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(728);
				match(CHARS);
				}
				break;
			case PLUS:
				enterOuterAlt(_localctx, 2);
				{
				setState(729);
				match(PLUS);
				}
				break;
			case QUESTION:
				enterOuterAlt(_localctx, 3);
				{
				setState(730);
				match(QUESTION);
				}
				break;
			case PIPE:
				enterOuterAlt(_localctx, 4);
				{
				setState(731);
				match(PIPE);
				}
				break;
			case BANG:
				enterOuterAlt(_localctx, 5);
				{
				setState(732);
				match(BANG);
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 6);
				{
				setState(733);
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
	}

	public final ArgumentsContext arguments() throws RecognitionException {
		ArgumentsContext _localctx = new ArgumentsContext(_ctx, getState());
		enterRule(_localctx, 74, RULE_arguments);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(737);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 3504686958142L) != 0)) {
				{
				setState(736);
				argument();
				}
			}

			setState(745);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(739);
				match(COMMA);
				setState(741);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 3504686958142L) != 0)) {
					{
					setState(740);
					argument();
					}
				}

				}
				}
				setState(747);
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
	}

	public final ArgumentContext argument() throws RecognitionException {
		ArgumentContext _localctx = new ArgumentContext(_ctx, getState());
		enterRule(_localctx, 76, RULE_argument);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(748);
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
		public TerminalNode PIPE() { return getToken(cbuildParser.PIPE, 0); }
		public OrderonlyprerequisitesContext orderonlyprerequisites() {
			return getRuleContext(OrderonlyprerequisitesContext.class,0);
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
	}

	public final RuleContext rule_() throws RecognitionException {
		RuleContext _localctx = new RuleContext(_ctx, getState());
		enterRule(_localctx, 78, RULE_rule);
		int _la;
		try {
			setState(791);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,117,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(750);
				static_pattern_rule();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(751);
				targets();
				setState(753);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(752);
					ws();
					}
				}

				setState(755);
				colon();
				setState(757);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,108,_ctx) ) {
				case 1:
					{
					setState(756);
					ws();
					}
					break;
				}
				setState(759);
				prerequisites();
				setState(768);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,111,_ctx) ) {
				case 1:
					{
					setState(761);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==WS || _la==TAB) {
						{
						setState(760);
						ws();
						}
					}

					setState(763);
					match(PIPE);
					setState(765);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,110,_ctx) ) {
					case 1:
						{
						setState(764);
						ws();
						}
						break;
					}
					setState(767);
					orderonlyprerequisites();
					}
					break;
				}
				setState(771);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(770);
					ws();
					}
				}

				setState(773);
				match(NL);
				setState(775);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,113,_ctx) ) {
				case 1:
					{
					setState(774);
					recipes();
					}
					break;
				}
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(777);
				targets();
				setState(779);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(778);
					ws();
					}
				}

				setState(781);
				colon();
				setState(783);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(782);
					ws();
					}
				}

				setState(785);
				assignment();
				setState(787);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(786);
					ws();
					}
				}

				setState(789);
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
		public TerminalNode PIPE() { return getToken(cbuildParser.PIPE, 0); }
		public OrderonlyprerequisitesContext orderonlyprerequisites() {
			return getRuleContext(OrderonlyprerequisitesContext.class,0);
		}
		public RecipesContext recipes() {
			return getRuleContext(RecipesContext.class,0);
		}
		public Static_pattern_ruleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_static_pattern_rule; }
	}

	public final Static_pattern_ruleContext static_pattern_rule() throws RecognitionException {
		Static_pattern_ruleContext _localctx = new Static_pattern_ruleContext(_ctx, getState());
		enterRule(_localctx, 80, RULE_static_pattern_rule);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(793);
			targets();
			setState(795);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(794);
				ws();
				}
			}

			setState(797);
			colon();
			setState(799);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(798);
				ws();
				}
			}

			setState(801);
			pattern();
			setState(803);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(802);
				ws();
				}
			}

			setState(805);
			colon();
			setState(807);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,121,_ctx) ) {
			case 1:
				{
				setState(806);
				ws();
				}
				break;
			}
			setState(809);
			prerequisites();
			setState(818);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,124,_ctx) ) {
			case 1:
				{
				setState(811);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(810);
					ws();
					}
				}

				setState(813);
				match(PIPE);
				setState(815);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,123,_ctx) ) {
				case 1:
					{
					setState(814);
					ws();
					}
					break;
				}
				setState(817);
				orderonlyprerequisites();
				}
				break;
			}
			setState(821);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(820);
				ws();
				}
			}

			setState(823);
			match(NL);
			setState(825);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,126,_ctx) ) {
			case 1:
				{
				setState(824);
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
	}

	public final TargetContext target() throws RecognitionException {
		TargetContext _localctx = new TargetContext(_ctx, getState());
		enterRule(_localctx, 82, RULE_target);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(827);
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
	}

	public final PatternContext pattern() throws RecognitionException {
		PatternContext _localctx = new PatternContext(_ctx, getState());
		enterRule(_localctx, 84, RULE_pattern);
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
					setState(831);
					_errHandler.sync(this);
					switch (_input.LA(1)) {
					case LPAREN:
					case RPAREN:
					case L_CURLY_BRACE:
					case R_CURLY_BRACE:
					case COMMA:
					case CHARS:
						{
						setState(829);
						identifier();
						}
						break;
					case DOLLAR_LPAREN:
					case DOLLAR_L_CURLY_BRACE:
					case VAR:
						{
						setState(830);
						function();
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
				setState(833); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,128,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
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
	}

	public final PrerequisitesContext prerequisites() throws RecognitionException {
		PrerequisitesContext _localctx = new PrerequisitesContext(_ctx, getState());
		enterRule(_localctx, 86, RULE_prerequisites);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(836);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 137438985244L) != 0)) {
				{
				setState(835);
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
	public static class OrderonlyprerequisitesContext extends ParserRuleContext {
		public TargetsContext targets() {
			return getRuleContext(TargetsContext.class,0);
		}
		public OrderonlyprerequisitesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_orderonlyprerequisites; }
	}

	public final OrderonlyprerequisitesContext orderonlyprerequisites() throws RecognitionException {
		OrderonlyprerequisitesContext _localctx = new OrderonlyprerequisitesContext(_ctx, getState());
		enterRule(_localctx, 88, RULE_orderonlyprerequisites);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(839);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 137438985244L) != 0)) {
				{
				setState(838);
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
	}

	public final TargetsContext targets() throws RecognitionException {
		TargetsContext _localctx = new TargetsContext(_ctx, getState());
		enterRule(_localctx, 90, RULE_targets);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(841);
			target();
			setState(847);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,131,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(842);
					ws();
					setState(843);
					target();
					}
					} 
				}
				setState(849);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,131,_ctx);
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
		public List<Empty_recipe_lineContext> empty_recipe_line() {
			return getRuleContexts(Empty_recipe_lineContext.class);
		}
		public Empty_recipe_lineContext empty_recipe_line(int i) {
			return getRuleContext(Empty_recipe_lineContext.class,i);
		}
		public RecipesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_recipes; }
	}

	public final RecipesContext recipes() throws RecognitionException {
		RecipesContext _localctx = new RecipesContext(_ctx, getState());
		enterRule(_localctx, 92, RULE_recipes);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(852); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					setState(852);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,132,_ctx) ) {
					case 1:
						{
						setState(850);
						recipe();
						}
						break;
					case 2:
						{
						setState(851);
						empty_recipe_line();
						}
						break;
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(854); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,133,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
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
	}

	public final Recipes_optContext recipes_opt() throws RecognitionException {
		Recipes_optContext _localctx = new Recipes_optContext(_ctx, getState());
		enterRule(_localctx, 94, RULE_recipes_opt);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(856);
			comment_opt();
			setState(858);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 8521466773504L) != 0)) {
				{
				setState(857);
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
	}

	public final RecipeContext recipe() throws RecognitionException {
		RecipeContext _localctx = new RecipeContext(_ctx, getState());
		enterRule(_localctx, 96, RULE_recipe);
		int _la;
		try {
			setState(880);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,138,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(860);
				match(LEADING_TAB);
				setState(862);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,135,_ctx) ) {
				case 1:
					{
					setState(861);
					ws();
					}
					break;
				}
				setState(864);
				exprs_in_recipe();
				setState(865);
				match(NL);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(867);
				match(LEADING_TAB);
				setState(869);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(868);
					ws();
					}
				}

				setState(871);
				match(COMMENT);
				setState(872);
				match(NL);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(874);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(873);
					ws();
					}
				}

				setState(876);
				match(COMMENT);
				setState(877);
				match(NL);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(878);
				conditional_in_recipe();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(879);
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
	public static class Empty_recipe_lineContext extends ParserRuleContext {
		public TerminalNode LEADING_TAB() { return getToken(cbuildParser.LEADING_TAB, 0); }
		public TerminalNode NL() { return getToken(cbuildParser.NL, 0); }
		public WsContext ws() {
			return getRuleContext(WsContext.class,0);
		}
		public Empty_recipe_lineContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_empty_recipe_line; }
	}

	public final Empty_recipe_lineContext empty_recipe_line() throws RecognitionException {
		Empty_recipe_lineContext _localctx = new Empty_recipe_lineContext(_ctx, getState());
		enterRule(_localctx, 98, RULE_empty_recipe_line);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(882);
			match(LEADING_TAB);
			setState(884);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(883);
				ws();
				}
			}

			setState(886);
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
	public static class UndefineContext extends ParserRuleContext {
		public TerminalNode UNDEFINE() { return getToken(cbuildParser.UNDEFINE, 0); }
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public PatternContext pattern() {
			return getRuleContext(PatternContext.class,0);
		}
		public TerminalNode OVERRIDE() { return getToken(cbuildParser.OVERRIDE, 0); }
		public UndefineContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_undefine; }
	}

	public final UndefineContext undefine() throws RecognitionException {
		UndefineContext _localctx = new UndefineContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_undefine);
		try {
			setState(898);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case UNDEFINE:
				enterOuterAlt(_localctx, 1);
				{
				setState(888);
				match(UNDEFINE);
				setState(889);
				ws();
				setState(890);
				pattern();
				}
				break;
			case OVERRIDE:
				enterOuterAlt(_localctx, 2);
				{
				setState(892);
				match(OVERRIDE);
				setState(893);
				ws();
				setState(894);
				match(UNDEFINE);
				setState(895);
				ws();
				setState(896);
				pattern();
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
	public static class SpecifiersContext extends ParserRuleContext {
		public TerminalNode OVERRIDE() { return getToken(cbuildParser.OVERRIDE, 0); }
		public TerminalNode EXPORT() { return getToken(cbuildParser.EXPORT, 0); }
		public TerminalNode UNEXPORT() { return getToken(cbuildParser.UNEXPORT, 0); }
		public WsContext ws() {
			return getRuleContext(WsContext.class,0);
		}
		public SpecifiersContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_specifiers; }
	}

	public final SpecifiersContext specifiers() throws RecognitionException {
		SpecifiersContext _localctx = new SpecifiersContext(_ctx, getState());
		enterRule(_localctx, 102, RULE_specifiers);
		try {
			setState(911);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,141,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(900);
				match(OVERRIDE);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(901);
				match(EXPORT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(902);
				match(UNEXPORT);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(903);
				match(OVERRIDE);
				setState(904);
				ws();
				setState(905);
				match(EXPORT);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(907);
				match(EXPORT);
				setState(908);
				ws();
				setState(909);
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
	}

	public final IdentifierContext identifier() throws RecognitionException {
		IdentifierContext _localctx = new IdentifierContext(_ctx, getState());
		enterRule(_localctx, 104, RULE_identifier);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(914); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(913);
					identifier_atom();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(916); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,142,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
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
		public TerminalNode COMMA() { return getToken(cbuildParser.COMMA, 0); }
		public TerminalNode LPAREN() { return getToken(cbuildParser.LPAREN, 0); }
		public TerminalNode RPAREN() { return getToken(cbuildParser.RPAREN, 0); }
		public TerminalNode L_CURLY_BRACE() { return getToken(cbuildParser.L_CURLY_BRACE, 0); }
		public TerminalNode R_CURLY_BRACE() { return getToken(cbuildParser.R_CURLY_BRACE, 0); }
		public Identifier_atomContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifier_atom; }
	}

	public final Identifier_atomContext identifier_atom() throws RecognitionException {
		Identifier_atomContext _localctx = new Identifier_atomContext(_ctx, getState());
		enterRule(_localctx, 106, RULE_identifier_atom);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(918);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 137438985216L) != 0)) ) {
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
	public static class BrContext extends ParserRuleContext {
		public TerminalNode NL() { return getToken(cbuildParser.NL, 0); }
		public BrContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_br; }
	}

	public final BrContext br() throws RecognitionException {
		BrContext _localctx = new BrContext(_ctx, getState());
		enterRule(_localctx, 108, RULE_br);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(920);
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
		public TerminalNode BACKSLASH() { return getToken(cbuildParser.BACKSLASH, 0); }
		public TerminalNode ASSIGN_OP() { return getToken(cbuildParser.ASSIGN_OP, 0); }
		public TerminalNode COLON() { return getToken(cbuildParser.COLON, 0); }
		public TerminalNode DOUBLE_DOLLAR() { return getToken(cbuildParser.DOUBLE_DOLLAR, 0); }
		public TerminalNode PLUS() { return getToken(cbuildParser.PLUS, 0); }
		public TerminalNode QUESTION() { return getToken(cbuildParser.QUESTION, 0); }
		public TerminalNode BANG() { return getToken(cbuildParser.BANG, 0); }
		public KeywordsContext keywords() {
			return getRuleContext(KeywordsContext.class,0);
		}
		public CharContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_char; }
	}

	public final CharContext char_() throws RecognitionException {
		CharContext _localctx = new CharContext(_ctx, getState());
		enterRule(_localctx, 110, RULE_char);
		try {
			setState(931);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(922);
				match(CHARS);
				}
				break;
			case BACKSLASH:
				enterOuterAlt(_localctx, 2);
				{
				setState(923);
				match(BACKSLASH);
				}
				break;
			case ASSIGN_OP:
				enterOuterAlt(_localctx, 3);
				{
				setState(924);
				match(ASSIGN_OP);
				}
				break;
			case COLON:
				enterOuterAlt(_localctx, 4);
				{
				setState(925);
				match(COLON);
				}
				break;
			case DOUBLE_DOLLAR:
				enterOuterAlt(_localctx, 5);
				{
				setState(926);
				match(DOUBLE_DOLLAR);
				}
				break;
			case PLUS:
				enterOuterAlt(_localctx, 6);
				{
				setState(927);
				match(PLUS);
				}
				break;
			case QUESTION:
				enterOuterAlt(_localctx, 7);
				{
				setState(928);
				match(QUESTION);
				}
				break;
			case BANG:
				enterOuterAlt(_localctx, 8);
				{
				setState(929);
				match(BANG);
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
				enterOuterAlt(_localctx, 9);
				{
				setState(930);
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
	public static class Char_nestedContext extends ParserRuleContext {
		public CharContext char_() {
			return getRuleContext(CharContext.class,0);
		}
		public TerminalNode COMMA() { return getToken(cbuildParser.COMMA, 0); }
		public Char_nestedContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_char_nested; }
	}

	public final Char_nestedContext char_nested() throws RecognitionException {
		Char_nestedContext _localctx = new Char_nestedContext(_ctx, getState());
		enterRule(_localctx, 112, RULE_char_nested);
		try {
			setState(935);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case BACKSLASH:
			case PLUS:
			case QUESTION:
			case BANG:
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
				enterOuterAlt(_localctx, 1);
				{
				setState(933);
				char_();
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 2);
				{
				setState(934);
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
		public TerminalNode L_CURLY_BRACE() { return getToken(cbuildParser.L_CURLY_BRACE, 0); }
		public TerminalNode R_CURLY_BRACE() { return getToken(cbuildParser.R_CURLY_BRACE, 0); }
		public TerminalNode PIPE() { return getToken(cbuildParser.PIPE, 0); }
		public KeywordsContext keywords() {
			return getRuleContext(KeywordsContext.class,0);
		}
		public Char_in_assignContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_char_in_assign; }
	}

	public final Char_in_assignContext char_in_assign() throws RecognitionException {
		Char_in_assignContext _localctx = new Char_in_assignContext(_ctx, getState());
		enterRule(_localctx, 114, RULE_char_in_assign);
		try {
			setState(944);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,145,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(937);
				char_nested();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(938);
				match(LPAREN);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(939);
				match(RPAREN);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(940);
				match(L_CURLY_BRACE);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(941);
				match(R_CURLY_BRACE);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(942);
				match(PIPE);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(943);
				keywords();
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
	public static class Char_in_defContext extends ParserRuleContext {
		public CharContext char_() {
			return getRuleContext(CharContext.class,0);
		}
		public TerminalNode LPAREN() { return getToken(cbuildParser.LPAREN, 0); }
		public TerminalNode RPAREN() { return getToken(cbuildParser.RPAREN, 0); }
		public TerminalNode L_CURLY_BRACE() { return getToken(cbuildParser.L_CURLY_BRACE, 0); }
		public TerminalNode R_CURLY_BRACE() { return getToken(cbuildParser.R_CURLY_BRACE, 0); }
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
	}

	public final Char_in_defContext char_in_def() throws RecognitionException {
		Char_in_defContext _localctx = new Char_in_defContext(_ctx, getState());
		enterRule(_localctx, 116, RULE_char_in_def);
		try {
			setState(965);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,146,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(946);
				char_();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(947);
				match(LPAREN);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(948);
				match(RPAREN);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(949);
				match(L_CURLY_BRACE);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(950);
				match(R_CURLY_BRACE);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(951);
				match(COMMA);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(952);
				match(COMMENT);
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(953);
				match(INCLUDE);
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(954);
				match(OVERRIDE);
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(955);
				match(EXPORT);
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(956);
				match(UNEXPORT);
				}
				break;
			case 12:
				enterOuterAlt(_localctx, 12);
				{
				setState(957);
				match(IFDEF);
				}
				break;
			case 13:
				enterOuterAlt(_localctx, 13);
				{
				setState(958);
				match(IFNDEF);
				}
				break;
			case 14:
				enterOuterAlt(_localctx, 14);
				{
				setState(959);
				match(IFEQ);
				}
				break;
			case 15:
				enterOuterAlt(_localctx, 15);
				{
				setState(960);
				match(IFNEQ);
				}
				break;
			case 16:
				enterOuterAlt(_localctx, 16);
				{
				setState(961);
				match(ELSE);
				}
				break;
			case 17:
				enterOuterAlt(_localctx, 17);
				{
				setState(962);
				match(ENDIF);
				}
				break;
			case 18:
				enterOuterAlt(_localctx, 18);
				{
				setState(963);
				match(DEFINE);
				}
				break;
			case 19:
				enterOuterAlt(_localctx, 19);
				{
				setState(964);
				match(UNDEFINE);
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
	public static class Char_in_recipeContext extends ParserRuleContext {
		public Char_in_assignContext char_in_assign() {
			return getRuleContext(Char_in_assignContext.class,0);
		}
		public TerminalNode COMMENT() { return getToken(cbuildParser.COMMENT, 0); }
		public TerminalNode PIPE() { return getToken(cbuildParser.PIPE, 0); }
		public Char_in_recipeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_char_in_recipe; }
	}

	public final Char_in_recipeContext char_in_recipe() throws RecognitionException {
		Char_in_recipeContext _localctx = new Char_in_recipeContext(_ctx, getState());
		enterRule(_localctx, 118, RULE_char_in_recipe);
		try {
			setState(970);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,147,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(967);
				char_in_assign();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(968);
				match(COMMENT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(969);
				match(PIPE);
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
	}

	public final TextContext text() throws RecognitionException {
		TextContext _localctx = new TextContext(_ctx, getState());
		enterRule(_localctx, 120, RULE_text);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(973); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(972);
					char_();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(975); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,148,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
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
	}

	public final Text_nestedContext text_nested() throws RecognitionException {
		Text_nestedContext _localctx = new Text_nestedContext(_ctx, getState());
		enterRule(_localctx, 122, RULE_text_nested);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(978); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(977);
					char_nested();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(980); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,149,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
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
	}

	public final Text_in_assignContext text_in_assign() throws RecognitionException {
		Text_in_assignContext _localctx = new Text_in_assignContext(_ctx, getState());
		enterRule(_localctx, 124, RULE_text_in_assign);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(983); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(982);
					char_in_assign();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(985); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,150,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
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
	}

	public final Text_in_recipeContext text_in_recipe() throws RecognitionException {
		Text_in_recipeContext _localctx = new Text_in_recipeContext(_ctx, getState());
		enterRule(_localctx, 126, RULE_text_in_recipe);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(988); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(987);
					char_in_recipe();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(990); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,151,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
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
	}

	public final KeywordsContext keywords() throws RecognitionException {
		KeywordsContext _localctx = new KeywordsContext(_ctx, getState());
		enterRule(_localctx, 128, RULE_keywords);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(992);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 68712136704L) != 0)) ) {
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
		public TerminalNode GROUPED_COLON() { return getToken(cbuildParser.GROUPED_COLON, 0); }
		public TerminalNode GROUPED_DOUBLE_COLON() { return getToken(cbuildParser.GROUPED_DOUBLE_COLON, 0); }
		public ColonContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_colon; }
	}

	public final ColonContext colon() throws RecognitionException {
		ColonContext _localctx = new ColonContext(_ctx, getState());
		enterRule(_localctx, 130, RULE_colon);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(994);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 960L) != 0)) ) {
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
	}

	public final Comment_optContext comment_opt() throws RecognitionException {
		Comment_optContext _localctx = new Comment_optContext(_ctx, getState());
		enterRule(_localctx, 132, RULE_comment_opt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(997);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,152,_ctx) ) {
			case 1:
				{
				setState(996);
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
	}

	public final WsContext ws() throws RecognitionException {
		WsContext _localctx = new WsContext(_ctx, getState());
		enterRule(_localctx, 134, RULE_ws);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(999);
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

	@SuppressWarnings("CheckReturnValue")
	public static class HookContext extends ParserRuleContext {
		public TerminalNode HOOK() { return getToken(cbuildParser.HOOK, 0); }
		public TerminalNode L_CURLY_BRACE() { return getToken(cbuildParser.L_CURLY_BRACE, 0); }
		public Hook_programContext hook_program() {
			return getRuleContext(Hook_programContext.class,0);
		}
		public TerminalNode R_CURLY_BRACE() { return getToken(cbuildParser.R_CURLY_BRACE, 0); }
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
		}
		public HookContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hook; }
	}

	public final HookContext hook() throws RecognitionException {
		HookContext _localctx = new HookContext(_ctx, getState());
		enterRule(_localctx, 136, RULE_hook);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(1001);
			match(HOOK);
			setState(1003);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(1002);
				ws();
				}
			}

			setState(1005);
			match(L_CURLY_BRACE);
			setState(1006);
			hook_program();
			setState(1007);
			match(R_CURLY_BRACE);
			setState(1009);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,154,_ctx) ) {
			case 1:
				{
				setState(1008);
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
	public static class Hook_programContext extends ParserRuleContext {
		public Hook_programContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_hook_program; }
	}

	public final Hook_programContext hook_program() throws RecognitionException {
		Hook_programContext _localctx = new Hook_programContext(_ctx, getState());
		enterRule(_localctx, 138, RULE_hook_program);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(1014);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,155,_ctx);
			while ( _alt!=1 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1+1 ) {
					{
					{
					setState(1011);
					matchWildcard();
					}
					} 
				}
				setState(1016);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,155,_ctx);
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
		"\u0004\u0001*\u03fa\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
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
		"<\u0007<\u0002=\u0007=\u0002>\u0007>\u0002?\u0007?\u0002@\u0007@\u0002"+
		"A\u0007A\u0002B\u0007B\u0002C\u0007C\u0002D\u0007D\u0002E\u0007E\u0001"+
		"\u0000\u0001\u0000\u0001\u0000\u0001\u0000\u0003\u0000\u0091\b\u0000\u0001"+
		"\u0001\u0001\u0001\u0001\u0001\u0005\u0001\u0096\b\u0001\n\u0001\f\u0001"+
		"\u0099\t\u0001\u0001\u0002\u0001\u0002\u0003\u0002\u009d\b\u0002\u0001"+
		"\u0002\u0001\u0002\u0003\u0002\u00a1\b\u0002\u0001\u0002\u0001\u0002\u0003"+
		"\u0002\u00a5\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00a9\b\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0003\u0002"+
		"\u00b0\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00b4\b\u0002\u0001"+
		"\u0002\u0001\u0002\u0003\u0002\u00b8\b\u0002\u0001\u0002\u0001\u0002\u0003"+
		"\u0002\u00bc\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00c0\b\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0003\u0002\u00c8\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00cc\b"+
		"\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00d0\b\u0002\u0001\u0002\u0001"+
		"\u0002\u0003\u0002\u00d4\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0003\u0002\u00da\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00de"+
		"\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00e2\b\u0002\u0001\u0002"+
		"\u0001\u0002\u0003\u0002\u00e6\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0003\u0002\u00ed\b\u0002\u0001\u0002\u0001\u0002"+
		"\u0003\u0002\u00f1\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00f5\b"+
		"\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00f9\b\u0002\u0001\u0002\u0001"+
		"\u0002\u0003\u0002\u00fd\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u0105\b\u0002\u0001\u0002\u0001"+
		"\u0002\u0003\u0002\u0109\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u010d"+
		"\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u0111\b\u0002\u0001\u0002"+
		"\u0001\u0002\u0003\u0002\u0115\b\u0002\u0001\u0003\u0001\u0003\u0003\u0003"+
		"\u0119\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u0123\b\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u0130\b\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u013b\b\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0003\u0003\u0145\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0003\u0003\u0152\b\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003"+
		"\u015b\b\u0003\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0005"+
		"\u0003\u0005\u0162\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0166\b"+
		"\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u016a\b\u0005\u0001\u0005\u0001"+
		"\u0005\u0003\u0005\u016e\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0172"+
		"\b\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0178"+
		"\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u017c\b\u0005\u0001\u0005"+
		"\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0182\b\u0005\u0001\u0005"+
		"\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0188\b\u0005\u0001\u0005"+
		"\u0001\u0005\u0003\u0005\u018c\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005"+
		"\u0190\b\u0005\u0001\u0005\u0003\u0005\u0193\b\u0005\u0001\u0006\u0003"+
		"\u0006\u0196\b\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0003"+
		"\u0006\u019c\b\u0006\u0001\u0006\u0003\u0006\u019f\b\u0006\u0001\u0006"+
		"\u0003\u0006\u01a2\b\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006"+
		"\u0001\u0007\u0001\u0007\u0005\u0007\u01aa\b\u0007\n\u0007\f\u0007\u01ad"+
		"\t\u0007\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001"+
		"\b\u0003\b\u01b7\b\b\u0001\t\u0001\t\u0001\t\u0001\t\u0001\n\u0003\n\u01be"+
		"\b\n\u0001\n\u0001\n\u0003\n\u01c2\b\n\u0001\n\u0003\n\u01c5\b\n\u0001"+
		"\n\u0001\n\u0003\n\u01c9\b\n\u0001\n\u0003\n\u01cc\b\n\u0001\n\u0001\n"+
		"\u0003\n\u01d0\b\n\u0003\n\u01d2\b\n\u0001\u000b\u0001\u000b\u0003\u000b"+
		"\u01d6\b\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\f\u0001\f\u0001"+
		"\f\u0001\f\u0001\f\u0003\f\u01e0\b\f\u0001\r\u0001\r\u0003\r\u01e4\b\r"+
		"\u0001\r\u0001\r\u0003\r\u01e8\b\r\u0001\r\u0001\r\u0001\r\u0001\r\u0003"+
		"\r\u01ee\b\r\u0001\r\u0001\r\u0003\r\u01f2\b\r\u0001\r\u0001\r\u0003\r"+
		"\u01f6\b\r\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000f"+
		"\u0001\u000f\u0001\u0010\u0001\u0010\u0001\u0011\u0001\u0011\u0001\u0012"+
		"\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0013"+
		"\u0003\u0013\u0209\b\u0013\u0001\u0014\u0003\u0014\u020c\b\u0014\u0001"+
		"\u0014\u0001\u0014\u0003\u0014\u0210\b\u0014\u0001\u0014\u0001\u0014\u0001"+
		"\u0014\u0005\u0014\u0215\b\u0014\n\u0014\f\u0014\u0218\t\u0014\u0001\u0014"+
		"\u0003\u0014\u021b\b\u0014\u0001\u0015\u0003\u0015\u021e\b\u0015\u0001"+
		"\u0015\u0001\u0015\u0003\u0015\u0222\b\u0015\u0001\u0015\u0001\u0015\u0001"+
		"\u0015\u0005\u0015\u0227\b\u0015\n\u0015\f\u0015\u022a\t\u0015\u0001\u0015"+
		"\u0003\u0015\u022d\b\u0015\u0001\u0016\u0003\u0016\u0230\b\u0016\u0001"+
		"\u0016\u0001\u0016\u0003\u0016\u0234\b\u0016\u0001\u0016\u0001\u0016\u0001"+
		"\u0016\u0005\u0016\u0239\b\u0016\n\u0016\f\u0016\u023c\t\u0016\u0001\u0016"+
		"\u0003\u0016\u023f\b\u0016\u0001\u0017\u0003\u0017\u0242\b\u0017\u0001"+
		"\u0017\u0001\u0017\u0003\u0017\u0246\b\u0017\u0001\u0017\u0001\u0017\u0001"+
		"\u0017\u0005\u0017\u024b\b\u0017\n\u0017\f\u0017\u024e\t\u0017\u0001\u0017"+
		"\u0003\u0017\u0251\b\u0017\u0001\u0018\u0001\u0018\u0003\u0018\u0255\b"+
		"\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001"+
		"\u0018\u0001\u0018\u0001\u0018\u0005\u0018\u025f\b\u0018\n\u0018\f\u0018"+
		"\u0262\t\u0018\u0003\u0018\u0264\b\u0018\u0001\u0019\u0001\u0019\u0003"+
		"\u0019\u0268\b\u0019\u0001\u0019\u0003\u0019\u026b\b\u0019\u0001\u001a"+
		"\u0004\u001a\u026e\b\u001a\u000b\u001a\f\u001a\u026f\u0001\u001b\u0001"+
		"\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0003\u001b\u0278"+
		"\b\u001b\u0001\u001c\u0004\u001c\u027b\b\u001c\u000b\u001c\f\u001c\u027c"+
		"\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d"+
		"\u0003\u001d\u0285\b\u001d\u0001\u001e\u0004\u001e\u0288\b\u001e\u000b"+
		"\u001e\f\u001e\u0289\u0001\u001f\u0001\u001f\u0003\u001f\u028e\b\u001f"+
		"\u0001 \u0004 \u0291\b \u000b \f \u0292\u0001!\u0001!\u0003!\u0297\b!"+
		"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0003\"\u02d2\b\"\u0001#\u0004#\u02d5\b#\u000b"+
		"#\f#\u02d6\u0001$\u0001$\u0001$\u0001$\u0001$\u0001$\u0003$\u02df\b$\u0001"+
		"%\u0003%\u02e2\b%\u0001%\u0001%\u0003%\u02e6\b%\u0005%\u02e8\b%\n%\f%"+
		"\u02eb\t%\u0001&\u0001&\u0001\'\u0001\'\u0001\'\u0003\'\u02f2\b\'\u0001"+
		"\'\u0001\'\u0003\'\u02f6\b\'\u0001\'\u0001\'\u0003\'\u02fa\b\'\u0001\'"+
		"\u0001\'\u0003\'\u02fe\b\'\u0001\'\u0003\'\u0301\b\'\u0001\'\u0003\'\u0304"+
		"\b\'\u0001\'\u0001\'\u0003\'\u0308\b\'\u0001\'\u0001\'\u0003\'\u030c\b"+
		"\'\u0001\'\u0001\'\u0003\'\u0310\b\'\u0001\'\u0001\'\u0003\'\u0314\b\'"+
		"\u0001\'\u0001\'\u0003\'\u0318\b\'\u0001(\u0001(\u0003(\u031c\b(\u0001"+
		"(\u0001(\u0003(\u0320\b(\u0001(\u0001(\u0003(\u0324\b(\u0001(\u0001(\u0003"+
		"(\u0328\b(\u0001(\u0001(\u0003(\u032c\b(\u0001(\u0001(\u0003(\u0330\b"+
		"(\u0001(\u0003(\u0333\b(\u0001(\u0003(\u0336\b(\u0001(\u0001(\u0003(\u033a"+
		"\b(\u0001)\u0001)\u0001*\u0001*\u0004*\u0340\b*\u000b*\f*\u0341\u0001"+
		"+\u0003+\u0345\b+\u0001,\u0003,\u0348\b,\u0001-\u0001-\u0001-\u0001-\u0005"+
		"-\u034e\b-\n-\f-\u0351\t-\u0001.\u0001.\u0004.\u0355\b.\u000b.\f.\u0356"+
		"\u0001/\u0001/\u0003/\u035b\b/\u00010\u00010\u00030\u035f\b0\u00010\u0001"+
		"0\u00010\u00010\u00010\u00030\u0366\b0\u00010\u00010\u00010\u00030\u036b"+
		"\b0\u00010\u00010\u00010\u00010\u00030\u0371\b0\u00011\u00011\u00031\u0375"+
		"\b1\u00011\u00011\u00012\u00012\u00012\u00012\u00012\u00012\u00012\u0001"+
		"2\u00012\u00012\u00032\u0383\b2\u00013\u00013\u00013\u00013\u00013\u0001"+
		"3\u00013\u00013\u00013\u00013\u00013\u00033\u0390\b3\u00014\u00044\u0393"+
		"\b4\u000b4\f4\u0394\u00015\u00015\u00016\u00016\u00017\u00017\u00017\u0001"+
		"7\u00017\u00017\u00017\u00017\u00017\u00037\u03a4\b7\u00018\u00018\u0003"+
		"8\u03a8\b8\u00019\u00019\u00019\u00019\u00019\u00019\u00019\u00039\u03b1"+
		"\b9\u0001:\u0001:\u0001:\u0001:\u0001:\u0001:\u0001:\u0001:\u0001:\u0001"+
		":\u0001:\u0001:\u0001:\u0001:\u0001:\u0001:\u0001:\u0001:\u0001:\u0003"+
		":\u03c6\b:\u0001;\u0001;\u0001;\u0003;\u03cb\b;\u0001<\u0004<\u03ce\b"+
		"<\u000b<\f<\u03cf\u0001=\u0004=\u03d3\b=\u000b=\f=\u03d4\u0001>\u0004"+
		">\u03d8\b>\u000b>\f>\u03d9\u0001?\u0004?\u03dd\b?\u000b?\f?\u03de\u0001"+
		"@\u0001@\u0001A\u0001A\u0001B\u0003B\u03e6\bB\u0001C\u0001C\u0001D\u0001"+
		"D\u0003D\u03ec\bD\u0001D\u0001D\u0001D\u0001D\u0003D\u03f2\bD\u0001E\u0005"+
		"E\u03f5\bE\nE\fE\u03f8\tE\u0001E\u0001\u03f6\u0000F\u0000\u0002\u0004"+
		"\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \""+
		"$&(*,.02468:<>@BDFHJLNPRTVXZ\\^`bdfhjlnprtvxz|~\u0080\u0082\u0084\u0086"+
		"\u0088\u008a\u0000\u0007\u0001\u0000\u001a\u001b\u0001\u0000\u0018\u0019"+
		"\u0001\u0000\u0014\u0016\u0002\u0000\n\u000e%%\u0002\u0000\u0014\u0014"+
		"\u0017#\u0001\u0000\u0006\t\u0001\u0000()\u0497\u0000\u0090\u0001\u0000"+
		"\u0000\u0000\u0002\u0097\u0001\u0000\u0000\u0000\u0004\u0114\u0001\u0000"+
		"\u0000\u0000\u0006\u015a\u0001\u0000\u0000\u0000\b\u015c\u0001\u0000\u0000"+
		"\u0000\n\u0192\u0001\u0000\u0000\u0000\f\u0195\u0001\u0000\u0000\u0000"+
		"\u000e\u01ab\u0001\u0000\u0000\u0000\u0010\u01b6\u0001\u0000\u0000\u0000"+
		"\u0012\u01b8\u0001\u0000\u0000\u0000\u0014\u01d1\u0001\u0000\u0000\u0000"+
		"\u0016\u01d3\u0001\u0000\u0000\u0000\u0018\u01da\u0001\u0000\u0000\u0000"+
		"\u001a\u01f5\u0001\u0000\u0000\u0000\u001c\u01f7\u0001\u0000\u0000\u0000"+
		"\u001e\u01fb\u0001\u0000\u0000\u0000 \u01fd\u0001\u0000\u0000\u0000\""+
		"\u01ff\u0001\u0000\u0000\u0000$\u0201\u0001\u0000\u0000\u0000&\u0208\u0001"+
		"\u0000\u0000\u0000(\u020b\u0001\u0000\u0000\u0000*\u021d\u0001\u0000\u0000"+
		"\u0000,\u022f\u0001\u0000\u0000\u0000.\u0241\u0001\u0000\u0000\u00000"+
		"\u0263\u0001\u0000\u0000\u00002\u0267\u0001\u0000\u0000\u00004\u026d\u0001"+
		"\u0000\u0000\u00006\u0277\u0001\u0000\u0000\u00008\u027a\u0001\u0000\u0000"+
		"\u0000:\u0284\u0001\u0000\u0000\u0000<\u0287\u0001\u0000\u0000\u0000>"+
		"\u028d\u0001\u0000\u0000\u0000@\u0290\u0001\u0000\u0000\u0000B\u0296\u0001"+
		"\u0000\u0000\u0000D\u02d1\u0001\u0000\u0000\u0000F\u02d4\u0001\u0000\u0000"+
		"\u0000H\u02de\u0001\u0000\u0000\u0000J\u02e1\u0001\u0000\u0000\u0000L"+
		"\u02ec\u0001\u0000\u0000\u0000N\u0317\u0001\u0000\u0000\u0000P\u0319\u0001"+
		"\u0000\u0000\u0000R\u033b\u0001\u0000\u0000\u0000T\u033f\u0001\u0000\u0000"+
		"\u0000V\u0344\u0001\u0000\u0000\u0000X\u0347\u0001\u0000\u0000\u0000Z"+
		"\u0349\u0001\u0000\u0000\u0000\\\u0354\u0001\u0000\u0000\u0000^\u0358"+
		"\u0001\u0000\u0000\u0000`\u0370\u0001\u0000\u0000\u0000b\u0372\u0001\u0000"+
		"\u0000\u0000d\u0382\u0001\u0000\u0000\u0000f\u038f\u0001\u0000\u0000\u0000"+
		"h\u0392\u0001\u0000\u0000\u0000j\u0396\u0001\u0000\u0000\u0000l\u0398"+
		"\u0001\u0000\u0000\u0000n\u03a3\u0001\u0000\u0000\u0000p\u03a7\u0001\u0000"+
		"\u0000\u0000r\u03b0\u0001\u0000\u0000\u0000t\u03c5\u0001\u0000\u0000\u0000"+
		"v\u03ca\u0001\u0000\u0000\u0000x\u03cd\u0001\u0000\u0000\u0000z\u03d2"+
		"\u0001\u0000\u0000\u0000|\u03d7\u0001\u0000\u0000\u0000~\u03dc\u0001\u0000"+
		"\u0000\u0000\u0080\u03e0\u0001\u0000\u0000\u0000\u0082\u03e2\u0001\u0000"+
		"\u0000\u0000\u0084\u03e5\u0001\u0000\u0000\u0000\u0086\u03e7\u0001\u0000"+
		"\u0000\u0000\u0088\u03e9\u0001\u0000\u0000\u0000\u008a\u03f6\u0001\u0000"+
		"\u0000\u0000\u008c\u008d\u0003\u0002\u0001\u0000\u008d\u008e\u0005\u0000"+
		"\u0000\u0001\u008e\u0091\u0001\u0000\u0000\u0000\u008f\u0091\u0005\u0000"+
		"\u0000\u0001\u0090\u008c\u0001\u0000\u0000\u0000\u0090\u008f\u0001\u0000"+
		"\u0000\u0000\u0091\u0001\u0001\u0000\u0000\u0000\u0092\u0096\u0003\n\u0005"+
		"\u0000\u0093\u0096\u0003l6\u0000\u0094\u0096\u0003\u0086C\u0000\u0095"+
		"\u0092\u0001\u0000\u0000\u0000\u0095\u0093\u0001\u0000\u0000\u0000\u0095"+
		"\u0094\u0001\u0000\u0000\u0000\u0096\u0099\u0001\u0000\u0000\u0000\u0097"+
		"\u0095\u0001\u0000\u0000\u0000\u0097\u0098\u0001\u0000\u0000\u0000\u0098"+
		"\u0003\u0001\u0000\u0000\u0000\u0099\u0097\u0001\u0000\u0000\u0000\u009a"+
		"\u009c\u0003\u001e\u000f\u0000\u009b\u009d\u0003\u0086C\u0000\u009c\u009b"+
		"\u0001\u0000\u0000\u0000\u009c\u009d\u0001\u0000\u0000\u0000\u009d\u009e"+
		"\u0001\u0000\u0000\u0000\u009e\u00a0\u0003$\u0012\u0000\u009f\u00a1\u0003"+
		"\u0086C\u0000\u00a0\u009f\u0001\u0000\u0000\u0000\u00a0\u00a1\u0001\u0000"+
		"\u0000\u0000\u00a1\u00a2\u0001\u0000\u0000\u0000\u00a2\u00a4\u0003\b\u0004"+
		"\u0000\u00a3\u00a5\u0003\u0086C\u0000\u00a4\u00a3\u0001\u0000\u0000\u0000"+
		"\u00a4\u00a5\u0001\u0000\u0000\u0000\u00a5\u00a6\u0001\u0000\u0000\u0000"+
		"\u00a6\u00a8\u0005\u001d\u0000\u0000\u00a7\u00a9\u0003\u0086C\u0000\u00a8"+
		"\u00a7\u0001\u0000\u0000\u0000\u00a8\u00a9\u0001\u0000\u0000\u0000\u00a9"+
		"\u00aa\u0001\u0000\u0000\u0000\u00aa\u00ab\u0003\u0084B\u0000\u00ab\u00ac"+
		"\u0003l6\u0000\u00ac\u0115\u0001\u0000\u0000\u0000\u00ad\u00af\u0003\u001e"+
		"\u000f\u0000\u00ae\u00b0\u0003\u0086C\u0000\u00af\u00ae\u0001\u0000\u0000"+
		"\u0000\u00af\u00b0\u0001\u0000\u0000\u0000\u00b0\u00b1\u0001\u0000\u0000"+
		"\u0000\u00b1\u00b3\u0003$\u0012\u0000\u00b2\u00b4\u0003\u0086C\u0000\u00b3"+
		"\u00b2\u0001\u0000\u0000\u0000\u00b3\u00b4\u0001\u0000\u0000\u0000\u00b4"+
		"\u00b5\u0001\u0000\u0000\u0000\u00b5\u00b7\u0003\b\u0004\u0000\u00b6\u00b8"+
		"\u0003\u0086C\u0000\u00b7\u00b6\u0001\u0000\u0000\u0000\u00b7\u00b8\u0001"+
		"\u0000\u0000\u0000\u00b8\u00b9\u0001\u0000\u0000\u0000\u00b9\u00bb\u0005"+
		"\u001c\u0000\u0000\u00ba\u00bc\u0003\u0086C\u0000\u00bb\u00ba\u0001\u0000"+
		"\u0000\u0000\u00bb\u00bc\u0001\u0000\u0000\u0000\u00bc\u00bd\u0001\u0000"+
		"\u0000\u0000\u00bd\u00bf\u0003\b\u0004\u0000\u00be\u00c0\u0003\u0086C"+
		"\u0000\u00bf\u00be\u0001\u0000\u0000\u0000\u00bf\u00c0\u0001\u0000\u0000"+
		"\u0000\u00c0\u00c1\u0001\u0000\u0000\u0000\u00c1\u00c2\u0005\u001d\u0000"+
		"\u0000\u00c2\u00c3\u0003\u0084B\u0000\u00c3\u00c4\u0003l6\u0000\u00c4"+
		"\u0115\u0001\u0000\u0000\u0000\u00c5\u00c7\u0003\u001e\u000f\u0000\u00c6"+
		"\u00c8\u0003\u0086C\u0000\u00c7\u00c6\u0001\u0000\u0000\u0000\u00c7\u00c8"+
		"\u0001\u0000\u0000\u0000\u00c8\u00c9\u0001\u0000\u0000\u0000\u00c9\u00cb"+
		"\u0003$\u0012\u0000\u00ca\u00cc\u0003\u0086C\u0000\u00cb\u00ca\u0001\u0000"+
		"\u0000\u0000\u00cb\u00cc\u0001\u0000\u0000\u0000\u00cc\u00cd\u0001\u0000"+
		"\u0000\u0000\u00cd\u00cf\u0003\b\u0004\u0000\u00ce\u00d0\u0003\u0086C"+
		"\u0000\u00cf\u00ce\u0001\u0000\u0000\u0000\u00cf\u00d0\u0001\u0000\u0000"+
		"\u0000\u00d0\u00d1\u0001\u0000\u0000\u0000\u00d1\u00d3\u0005\u001c\u0000"+
		"\u0000\u00d2\u00d4\u0003\u0086C\u0000\u00d3\u00d2\u0001\u0000\u0000\u0000"+
		"\u00d3\u00d4\u0001\u0000\u0000\u0000\u00d4\u00d5\u0001\u0000\u0000\u0000"+
		"\u00d5\u00d6\u0003\u0004\u0002\u0000\u00d6\u0115\u0001\u0000\u0000\u0000"+
		"\u00d7\u00d9\u0003 \u0010\u0000\u00d8\u00da\u0003\u0086C\u0000\u00d9\u00d8"+
		"\u0001\u0000\u0000\u0000\u00d9\u00da\u0001\u0000\u0000\u0000\u00da\u00db"+
		"\u0001\u0000\u0000\u0000\u00db\u00dd\u0003T*\u0000\u00dc\u00de\u0003\u0086"+
		"C\u0000\u00dd\u00dc\u0001\u0000\u0000\u0000\u00dd\u00de\u0001\u0000\u0000"+
		"\u0000\u00de\u00df\u0001\u0000\u0000\u0000\u00df\u00e1\u0003\b\u0004\u0000"+
		"\u00e0\u00e2\u0003\u0086C\u0000\u00e1\u00e0\u0001\u0000\u0000\u0000\u00e1"+
		"\u00e2\u0001\u0000\u0000\u0000\u00e2\u00e3\u0001\u0000\u0000\u0000\u00e3"+
		"\u00e5\u0005\u001d\u0000\u0000\u00e4\u00e6\u0003\u0086C\u0000\u00e5\u00e4"+
		"\u0001\u0000\u0000\u0000\u00e5\u00e6\u0001\u0000\u0000\u0000\u00e6\u00e7"+
		"\u0001\u0000\u0000\u0000\u00e7\u00e8\u0003\u0084B\u0000\u00e8\u00e9\u0003"+
		"l6\u0000\u00e9\u0115\u0001\u0000\u0000\u0000\u00ea\u00ec\u0003 \u0010"+
		"\u0000\u00eb\u00ed\u0003\u0086C\u0000\u00ec\u00eb\u0001\u0000\u0000\u0000"+
		"\u00ec\u00ed\u0001\u0000\u0000\u0000\u00ed\u00ee\u0001\u0000\u0000\u0000"+
		"\u00ee\u00f0\u0003T*\u0000\u00ef\u00f1\u0003\u0086C\u0000\u00f0\u00ef"+
		"\u0001\u0000\u0000\u0000\u00f0\u00f1\u0001\u0000\u0000\u0000\u00f1\u00f2"+
		"\u0001\u0000\u0000\u0000\u00f2\u00f4\u0003\b\u0004\u0000\u00f3\u00f5\u0003"+
		"\u0086C\u0000\u00f4\u00f3\u0001\u0000\u0000\u0000\u00f4\u00f5\u0001\u0000"+
		"\u0000\u0000\u00f5\u00f6\u0001\u0000\u0000\u0000\u00f6\u00f8\u0005\u001c"+
		"\u0000\u0000\u00f7\u00f9\u0003\u0086C\u0000\u00f8\u00f7\u0001\u0000\u0000"+
		"\u0000\u00f8\u00f9\u0001\u0000\u0000\u0000\u00f9\u00fa\u0001\u0000\u0000"+
		"\u0000\u00fa\u00fc\u0003\b\u0004\u0000\u00fb\u00fd\u0003\u0086C\u0000"+
		"\u00fc\u00fb\u0001\u0000\u0000\u0000\u00fc\u00fd\u0001\u0000\u0000\u0000"+
		"\u00fd\u00fe\u0001\u0000\u0000\u0000\u00fe\u00ff\u0005\u001d\u0000\u0000"+
		"\u00ff\u0100\u0003\u0084B\u0000\u0100\u0101\u0003l6\u0000\u0101\u0115"+
		"\u0001\u0000\u0000\u0000\u0102\u0104\u0003 \u0010\u0000\u0103\u0105\u0003"+
		"\u0086C\u0000\u0104\u0103\u0001\u0000\u0000\u0000\u0104\u0105\u0001\u0000"+
		"\u0000\u0000\u0105\u0106\u0001\u0000\u0000\u0000\u0106\u0108\u0003T*\u0000"+
		"\u0107\u0109\u0003\u0086C\u0000\u0108\u0107\u0001\u0000\u0000\u0000\u0108"+
		"\u0109\u0001\u0000\u0000\u0000\u0109\u010a\u0001\u0000\u0000\u0000\u010a"+
		"\u010c\u0003\b\u0004\u0000\u010b\u010d\u0003\u0086C\u0000\u010c\u010b"+
		"\u0001\u0000\u0000\u0000\u010c\u010d\u0001\u0000\u0000\u0000\u010d\u010e"+
		"\u0001\u0000\u0000\u0000\u010e\u0110\u0005\u001c\u0000\u0000\u010f\u0111"+
		"\u0003\u0086C\u0000\u0110\u010f\u0001\u0000\u0000\u0000\u0110\u0111\u0001"+
		"\u0000\u0000\u0000\u0111\u0112\u0001\u0000\u0000\u0000\u0112\u0113\u0003"+
		"\u0004\u0002\u0000\u0113\u0115\u0001\u0000\u0000\u0000\u0114\u009a\u0001"+
		"\u0000\u0000\u0000\u0114\u00ad\u0001\u0000\u0000\u0000\u0114\u00c5\u0001"+
		"\u0000\u0000\u0000\u0114\u00d7\u0001\u0000\u0000\u0000\u0114\u00ea\u0001"+
		"\u0000\u0000\u0000\u0114\u0102\u0001\u0000\u0000\u0000\u0115\u0005\u0001"+
		"\u0000\u0000\u0000\u0116\u0118\u0003\u001e\u000f\u0000\u0117\u0119\u0003"+
		"\u0086C\u0000\u0118\u0117\u0001\u0000\u0000\u0000\u0118\u0119\u0001\u0000"+
		"\u0000\u0000\u0119\u011a\u0001\u0000\u0000\u0000\u011a\u011b\u0003$\u0012"+
		"\u0000\u011b\u011c\u0005&\u0000\u0000\u011c\u011d\u0003^/\u0000\u011d"+
		"\u011e\u0005\u001d\u0000\u0000\u011e\u011f\u0003\u0084B\u0000\u011f\u015b"+
		"\u0001\u0000\u0000\u0000\u0120\u0122\u0003\u001e\u000f\u0000\u0121\u0123"+
		"\u0003\u0086C\u0000\u0122\u0121\u0001\u0000\u0000\u0000\u0122\u0123\u0001"+
		"\u0000\u0000\u0000\u0123\u0124\u0001\u0000\u0000\u0000\u0124\u0125\u0003"+
		"$\u0012\u0000\u0125\u0126\u0005&\u0000\u0000\u0126\u0127\u0003^/\u0000"+
		"\u0127\u0128\u0005\u001c\u0000\u0000\u0128\u0129\u0005&\u0000\u0000\u0129"+
		"\u012a\u0003^/\u0000\u012a\u012b\u0005\u001d\u0000\u0000\u012b\u012c\u0003"+
		"\u0084B\u0000\u012c\u015b\u0001\u0000\u0000\u0000\u012d\u012f\u0003\u001e"+
		"\u000f\u0000\u012e\u0130\u0003\u0086C\u0000\u012f\u012e\u0001\u0000\u0000"+
		"\u0000\u012f\u0130\u0001\u0000\u0000\u0000\u0130\u0131\u0001\u0000\u0000"+
		"\u0000\u0131\u0132\u0003$\u0012\u0000\u0132\u0133\u0005&\u0000\u0000\u0133"+
		"\u0134\u0003^/\u0000\u0134\u0135\u0005\u001c\u0000\u0000\u0135\u0136\u0005"+
		"&\u0000\u0000\u0136\u0137\u0003\u0006\u0003\u0000\u0137\u015b\u0001\u0000"+
		"\u0000\u0000\u0138\u013a\u0003 \u0010\u0000\u0139\u013b\u0003\u0086C\u0000"+
		"\u013a\u0139\u0001\u0000\u0000\u0000\u013a\u013b\u0001\u0000\u0000\u0000"+
		"\u013b\u013c\u0001\u0000\u0000\u0000\u013c\u013d\u0003T*\u0000\u013d\u013e"+
		"\u0005&\u0000\u0000\u013e\u013f\u0003^/\u0000\u013f\u0140\u0005\u001d"+
		"\u0000\u0000\u0140\u0141\u0003\u0084B\u0000\u0141\u015b\u0001\u0000\u0000"+
		"\u0000\u0142\u0144\u0003 \u0010\u0000\u0143\u0145\u0003\u0086C\u0000\u0144"+
		"\u0143\u0001\u0000\u0000\u0000\u0144\u0145\u0001\u0000\u0000\u0000\u0145"+
		"\u0146\u0001\u0000\u0000\u0000\u0146\u0147\u0003T*\u0000\u0147\u0148\u0005"+
		"&\u0000\u0000\u0148\u0149\u0003^/\u0000\u0149\u014a\u0005\u001c\u0000"+
		"\u0000\u014a\u014b\u0005&\u0000\u0000\u014b\u014c\u0003^/\u0000\u014c"+
		"\u014d\u0005\u001d\u0000\u0000\u014d\u014e\u0003\u0084B\u0000\u014e\u015b"+
		"\u0001\u0000\u0000\u0000\u014f\u0151\u0003 \u0010\u0000\u0150\u0152\u0003"+
		"\u0086C\u0000\u0151\u0150\u0001\u0000\u0000\u0000\u0151\u0152\u0001\u0000"+
		"\u0000\u0000\u0152\u0153\u0001\u0000\u0000\u0000\u0153\u0154\u0003T*\u0000"+
		"\u0154\u0155\u0005&\u0000\u0000\u0155\u0156\u0003^/\u0000\u0156\u0157"+
		"\u0005\u001c\u0000\u0000\u0157\u0158\u0005&\u0000\u0000\u0158\u0159\u0003"+
		"\u0006\u0003\u0000\u0159\u015b\u0001\u0000\u0000\u0000\u015a\u0116\u0001"+
		"\u0000\u0000\u0000\u015a\u0120\u0001\u0000\u0000\u0000\u015a\u012d\u0001"+
		"\u0000\u0000\u0000\u015a\u0138\u0001\u0000\u0000\u0000\u015a\u0142\u0001"+
		"\u0000\u0000\u0000\u015a\u014f\u0001\u0000\u0000\u0000\u015b\u0007\u0001"+
		"\u0000\u0000\u0000\u015c\u015d\u0003\u0084B\u0000\u015d\u015e\u0003l6"+
		"\u0000\u015e\u015f\u0003\u0002\u0001\u0000\u015f\t\u0001\u0000\u0000\u0000"+
		"\u0160\u0162\u0003\u0086C\u0000\u0161\u0160\u0001\u0000\u0000\u0000\u0161"+
		"\u0162\u0001\u0000\u0000\u0000\u0162\u0163\u0001\u0000\u0000\u0000\u0163"+
		"\u0193\u0005*\u0000\u0000\u0164\u0166\u0003\u0086C\u0000\u0165\u0164\u0001"+
		"\u0000\u0000\u0000\u0165\u0166\u0001\u0000\u0000\u0000\u0166\u0167\u0001"+
		"\u0000\u0000\u0000\u0167\u0193\u0003\u0004\u0002\u0000\u0168\u016a\u0003"+
		"\u0086C\u0000\u0169\u0168\u0001\u0000\u0000\u0000\u0169\u016a\u0001\u0000"+
		"\u0000\u0000\u016a\u016b\u0001\u0000\u0000\u0000\u016b\u0193\u0003\f\u0006"+
		"\u0000\u016c\u016e\u0003\u0086C\u0000\u016d\u016c\u0001\u0000\u0000\u0000"+
		"\u016d\u016e\u0001\u0000\u0000\u0000\u016e\u016f\u0001\u0000\u0000\u0000"+
		"\u016f\u0193\u0003\u0012\t\u0000\u0170\u0172\u0003\u0086C\u0000\u0171"+
		"\u0170\u0001\u0000\u0000\u0000\u0171\u0172\u0001\u0000\u0000\u0000\u0172"+
		"\u0173\u0001\u0000\u0000\u0000\u0173\u0174\u0003\u0014\n\u0000\u0174\u0175"+
		"\u0003l6\u0000\u0175\u0193\u0001\u0000\u0000\u0000\u0176\u0178\u0003\u0086"+
		"C\u0000\u0177\u0176\u0001\u0000\u0000\u0000\u0177\u0178\u0001\u0000\u0000"+
		"\u0000\u0178\u0179\u0001\u0000\u0000\u0000\u0179\u0193\u0003\u0016\u000b"+
		"\u0000\u017a\u017c\u0003\u0086C\u0000\u017b\u017a\u0001\u0000\u0000\u0000"+
		"\u017b\u017c\u0001\u0000\u0000\u0000\u017c\u017d\u0001\u0000\u0000\u0000"+
		"\u017d\u017e\u0003\u001a\r\u0000\u017e\u017f\u0003l6\u0000\u017f\u0193"+
		"\u0001\u0000\u0000\u0000\u0180\u0182\u0003\u0086C\u0000\u0181\u0180\u0001"+
		"\u0000\u0000\u0000\u0181\u0182\u0001\u0000\u0000\u0000\u0182\u0183\u0001"+
		"\u0000\u0000\u0000\u0183\u0184\u0003D\"\u0000\u0184\u0185\u0003l6\u0000"+
		"\u0185\u0193\u0001\u0000\u0000\u0000\u0186\u0188\u0003\u0086C\u0000\u0187"+
		"\u0186\u0001\u0000\u0000\u0000\u0187\u0188\u0001\u0000\u0000\u0000\u0188"+
		"\u0189\u0001\u0000\u0000\u0000\u0189\u0193\u0003N\'\u0000\u018a\u018c"+
		"\u0003\u0086C\u0000\u018b\u018a\u0001\u0000\u0000\u0000\u018b\u018c\u0001"+
		"\u0000\u0000\u0000\u018c\u018d\u0001\u0000\u0000\u0000\u018d\u0193\u0003"+
		"\u0088D\u0000\u018e\u0190\u0003\u0086C\u0000\u018f\u018e\u0001\u0000\u0000"+
		"\u0000\u018f\u0190\u0001\u0000\u0000\u0000\u0190\u0191\u0001\u0000\u0000"+
		"\u0000\u0191\u0193\u0003d2\u0000\u0192\u0161\u0001\u0000\u0000\u0000\u0192"+
		"\u0165\u0001\u0000\u0000\u0000\u0192\u0169\u0001\u0000\u0000\u0000\u0192"+
		"\u016d\u0001\u0000\u0000\u0000\u0192\u0171\u0001\u0000\u0000\u0000\u0192"+
		"\u0177\u0001\u0000\u0000\u0000\u0192\u017b\u0001\u0000\u0000\u0000\u0192"+
		"\u0181\u0001\u0000\u0000\u0000\u0192\u0187\u0001\u0000\u0000\u0000\u0192"+
		"\u018b\u0001\u0000\u0000\u0000\u0192\u018f\u0001\u0000\u0000\u0000\u0193"+
		"\u000b\u0001\u0000\u0000\u0000\u0194\u0196\u0003f3\u0000\u0195\u0194\u0001"+
		"\u0000\u0000\u0000\u0195\u0196\u0001\u0000\u0000\u0000\u0196\u0197\u0001"+
		"\u0000\u0000\u0000\u0197\u0198\u0005\"\u0000\u0000\u0198\u0199\u0003\u0086"+
		"C\u0000\u0199\u019b\u0003T*\u0000\u019a\u019c\u0003\u0086C\u0000\u019b"+
		"\u019a\u0001\u0000\u0000\u0000\u019b\u019c\u0001\u0000\u0000\u0000\u019c"+
		"\u019e\u0001\u0000\u0000\u0000\u019d\u019f\u0005\u0001\u0000\u0000\u019e"+
		"\u019d\u0001\u0000\u0000\u0000\u019e\u019f\u0001\u0000\u0000\u0000\u019f"+
		"\u01a1\u0001\u0000\u0000\u0000\u01a0\u01a2\u0003\u0086C\u0000\u01a1\u01a0"+
		"\u0001\u0000\u0000\u0000\u01a1\u01a2\u0001\u0000\u0000\u0000\u01a2\u01a3"+
		"\u0001\u0000\u0000\u0000\u01a3\u01a4\u0003\u000e\u0007\u0000\u01a4\u01a5"+
		"\u0005\u0017\u0000\u0000\u01a5\u01a6\u0003l6\u0000\u01a6\r\u0001\u0000"+
		"\u0000\u0000\u01a7\u01aa\u0003\f\u0006\u0000\u01a8\u01aa\u0003\u0010\b"+
		"\u0000\u01a9\u01a7\u0001\u0000\u0000\u0000\u01a9\u01a8\u0001\u0000\u0000"+
		"\u0000\u01aa\u01ad\u0001\u0000\u0000\u0000\u01ab\u01a9\u0001\u0000\u0000"+
		"\u0000\u01ab\u01ac\u0001\u0000\u0000\u0000\u01ac\u000f\u0001\u0000\u0000"+
		"\u0000\u01ad\u01ab\u0001\u0000\u0000\u0000\u01ae\u01af\u0003\u0084B\u0000"+
		"\u01af\u01b0\u0003l6\u0000\u01b0\u01b7\u0001\u0000\u0000\u0000\u01b1\u01b2"+
		"\u0003\u0084B\u0000\u01b2\u01b3\u0003l6\u0000\u01b3\u01b4\u00030\u0018"+
		"\u0000\u01b4\u01b5\u0003l6\u0000\u01b5\u01b7\u0001\u0000\u0000\u0000\u01b6"+
		"\u01ae\u0001\u0000\u0000\u0000\u01b6\u01b1\u0001\u0000\u0000\u0000\u01b7"+
		"\u0011\u0001\u0000\u0000\u0000\u01b8\u01b9\u0003\"\u0011\u0000\u01b9\u01ba"+
		"\u0003(\u0014\u0000\u01ba\u01bb\u0003l6\u0000\u01bb\u0013\u0001\u0000"+
		"\u0000\u0000\u01bc\u01be\u0003\u0086C\u0000\u01bd\u01bc\u0001\u0000\u0000"+
		"\u0000\u01bd\u01be\u0001\u0000\u0000\u0000\u01be\u01bf\u0001\u0000\u0000"+
		"\u0000\u01bf\u01c1\u0005\u001f\u0000\u0000\u01c0\u01c2\u0003\u0086C\u0000"+
		"\u01c1\u01c0\u0001\u0000\u0000\u0000\u01c1\u01c2\u0001\u0000\u0000\u0000"+
		"\u01c2\u01d2\u0001\u0000\u0000\u0000\u01c3\u01c5\u0003\u0086C\u0000\u01c4"+
		"\u01c3\u0001\u0000\u0000\u0000\u01c4\u01c5\u0001\u0000\u0000\u0000\u01c5"+
		"\u01c6\u0001\u0000\u0000\u0000\u01c6\u01c8\u0005 \u0000\u0000\u01c7\u01c9"+
		"\u0003\u0086C\u0000\u01c8\u01c7\u0001\u0000\u0000\u0000\u01c8\u01c9\u0001"+
		"\u0000\u0000\u0000\u01c9\u01d2\u0001\u0000\u0000\u0000\u01ca\u01cc\u0003"+
		"\u0086C\u0000\u01cb\u01ca\u0001\u0000\u0000\u0000\u01cb\u01cc\u0001\u0000"+
		"\u0000\u0000\u01cc\u01cd\u0001\u0000\u0000\u0000\u01cd\u01cf\u0003\u001c"+
		"\u000e\u0000\u01ce\u01d0\u0003\u0086C\u0000\u01cf\u01ce\u0001\u0000\u0000"+
		"\u0000\u01cf\u01d0\u0001\u0000\u0000\u0000\u01d0\u01d2\u0001\u0000\u0000"+
		"\u0000\u01d1\u01bd\u0001\u0000\u0000\u0000\u01d1\u01c4\u0001\u0000\u0000"+
		"\u0000\u01d1\u01cb\u0001\u0000\u0000\u0000\u01d2\u0015\u0001\u0000\u0000"+
		"\u0000\u01d3\u01d5\u0005#\u0000\u0000\u01d4\u01d6\u0003\u0018\f\u0000"+
		"\u01d5\u01d4\u0001\u0000\u0000\u0000\u01d5\u01d6\u0001\u0000\u0000\u0000"+
		"\u01d6\u01d7\u0001\u0000\u0000\u0000\u01d7\u01d8\u0003\u0084B\u0000\u01d8"+
		"\u01d9\u0003l6\u0000\u01d9\u0017\u0001\u0000\u0000\u0000\u01da\u01db\u0003"+
		"\u0086C\u0000\u01db\u01df\u0003T*\u0000\u01dc\u01dd\u0003\u0086C\u0000"+
		"\u01dd\u01de\u0003(\u0014\u0000\u01de\u01e0\u0001\u0000\u0000\u0000\u01df"+
		"\u01dc\u0001\u0000\u0000\u0000\u01df\u01e0\u0001\u0000\u0000\u0000\u01e0"+
		"\u0019\u0001\u0000\u0000\u0000\u01e1\u01e3\u0003T*\u0000\u01e2\u01e4\u0003"+
		"\u0086C\u0000\u01e3\u01e2\u0001\u0000\u0000\u0000\u01e3\u01e4\u0001\u0000"+
		"\u0000\u0000\u01e4\u01e5\u0001\u0000\u0000\u0000\u01e5\u01e7\u0005\u0001"+
		"\u0000\u0000\u01e6\u01e8\u0003,\u0016\u0000\u01e7\u01e6\u0001\u0000\u0000"+
		"\u0000\u01e7\u01e8\u0001\u0000\u0000\u0000\u01e8\u01e9\u0001\u0000\u0000"+
		"\u0000\u01e9\u01ea\u0003\u0084B\u0000\u01ea\u01f6\u0001\u0000\u0000\u0000"+
		"\u01eb\u01ed\u0003\u001c\u000e\u0000\u01ec\u01ee\u0003\u0086C\u0000\u01ed"+
		"\u01ec\u0001\u0000\u0000\u0000\u01ed\u01ee\u0001\u0000\u0000\u0000\u01ee"+
		"\u01ef\u0001\u0000\u0000\u0000\u01ef\u01f1\u0005\u0001\u0000\u0000\u01f0"+
		"\u01f2\u0003,\u0016\u0000\u01f1\u01f0\u0001\u0000\u0000\u0000\u01f1\u01f2"+
		"\u0001\u0000\u0000\u0000\u01f2\u01f3\u0001\u0000\u0000\u0000\u01f3\u01f4"+
		"\u0003\u0084B\u0000\u01f4\u01f6\u0001\u0000\u0000\u0000\u01f5\u01e1\u0001"+
		"\u0000\u0000\u0000\u01f5\u01eb\u0001\u0000\u0000\u0000\u01f6\u001b\u0001"+
		"\u0000\u0000\u0000\u01f7\u01f8\u0003f3\u0000\u01f8\u01f9\u0003\u0086C"+
		"\u0000\u01f9\u01fa\u0003T*\u0000\u01fa\u001d\u0001\u0000\u0000\u0000\u01fb"+
		"\u01fc\u0007\u0000\u0000\u0000\u01fc\u001f\u0001\u0000\u0000\u0000\u01fd"+
		"\u01fe\u0007\u0001\u0000\u0000\u01fe!\u0001\u0000\u0000\u0000\u01ff\u0200"+
		"\u0007\u0002\u0000\u0000\u0200#\u0001\u0000\u0000\u0000\u0201\u0202\u0005"+
		"\n\u0000\u0000\u0202\u0203\u0003&\u0013\u0000\u0203\u0204\u0005\u000e"+
		"\u0000\u0000\u0204\u0205\u0003&\u0013\u0000\u0205\u0206\u0005\u000b\u0000"+
		"\u0000\u0206%\u0001\u0000\u0000\u0000\u0207\u0209\u0003(\u0014\u0000\u0208"+
		"\u0207\u0001\u0000\u0000\u0000\u0208\u0209\u0001\u0000\u0000\u0000\u0209"+
		"\'\u0001\u0000\u0000\u0000\u020a\u020c\u0003\u0086C\u0000\u020b\u020a"+
		"\u0001\u0000\u0000\u0000\u020b\u020c\u0001\u0000\u0000\u0000\u020c\u020d"+
		"\u0001\u0000\u0000\u0000\u020d\u020f\u00034\u001a\u0000\u020e\u0210\u0003"+
		"\u0086C\u0000\u020f\u020e\u0001\u0000\u0000\u0000\u020f\u0210\u0001\u0000"+
		"\u0000\u0000\u0210\u0216\u0001\u0000\u0000\u0000\u0211\u0212\u0003\u0086"+
		"C\u0000\u0212\u0213\u00034\u001a\u0000\u0213\u0215\u0001\u0000\u0000\u0000"+
		"\u0214\u0211\u0001\u0000\u0000\u0000\u0215\u0218\u0001\u0000\u0000\u0000"+
		"\u0216\u0214\u0001\u0000\u0000\u0000\u0216\u0217\u0001\u0000\u0000\u0000"+
		"\u0217\u021a\u0001\u0000\u0000\u0000\u0218\u0216\u0001\u0000\u0000\u0000"+
		"\u0219\u021b\u0003\u0086C\u0000\u021a\u0219\u0001\u0000\u0000\u0000\u021a"+
		"\u021b\u0001\u0000\u0000\u0000\u021b)\u0001\u0000\u0000\u0000\u021c\u021e"+
		"\u0003\u0086C\u0000\u021d\u021c\u0001\u0000\u0000\u0000\u021d\u021e\u0001"+
		"\u0000\u0000\u0000\u021e\u021f\u0001\u0000\u0000\u0000\u021f\u0221\u0003"+
		"8\u001c\u0000\u0220\u0222\u0003\u0086C\u0000\u0221\u0220\u0001\u0000\u0000"+
		"\u0000\u0221\u0222\u0001\u0000\u0000\u0000\u0222\u0228\u0001\u0000\u0000"+
		"\u0000\u0223\u0224\u0003\u0086C\u0000\u0224\u0225\u00038\u001c\u0000\u0225"+
		"\u0227\u0001\u0000\u0000\u0000\u0226\u0223\u0001\u0000\u0000\u0000\u0227"+
		"\u022a\u0001\u0000\u0000\u0000\u0228\u0226\u0001\u0000\u0000\u0000\u0228"+
		"\u0229\u0001\u0000\u0000\u0000\u0229\u022c\u0001\u0000\u0000\u0000\u022a"+
		"\u0228\u0001\u0000\u0000\u0000\u022b\u022d\u0003\u0086C\u0000\u022c\u022b"+
		"\u0001\u0000\u0000\u0000\u022c\u022d\u0001\u0000\u0000\u0000\u022d+\u0001"+
		"\u0000\u0000\u0000\u022e\u0230\u0003\u0086C\u0000\u022f\u022e\u0001\u0000"+
		"\u0000\u0000\u022f\u0230\u0001\u0000\u0000\u0000\u0230\u0231\u0001\u0000"+
		"\u0000\u0000\u0231\u0233\u0003<\u001e\u0000\u0232\u0234\u0003\u0086C\u0000"+
		"\u0233\u0232\u0001\u0000\u0000\u0000\u0233\u0234\u0001\u0000\u0000\u0000"+
		"\u0234\u023a\u0001\u0000\u0000\u0000\u0235\u0236\u0003\u0086C\u0000\u0236"+
		"\u0237\u0003<\u001e\u0000\u0237\u0239\u0001\u0000\u0000\u0000\u0238\u0235"+
		"\u0001\u0000\u0000\u0000\u0239\u023c\u0001\u0000\u0000\u0000\u023a\u0238"+
		"\u0001\u0000\u0000\u0000\u023a\u023b\u0001\u0000\u0000\u0000\u023b\u023e"+
		"\u0001\u0000\u0000\u0000\u023c\u023a\u0001\u0000\u0000\u0000\u023d\u023f"+
		"\u0003\u0086C\u0000\u023e\u023d\u0001\u0000\u0000\u0000\u023e\u023f\u0001"+
		"\u0000\u0000\u0000\u023f-\u0001\u0000\u0000\u0000\u0240\u0242\u0003\u0086"+
		"C\u0000\u0241\u0240\u0001\u0000\u0000\u0000\u0241\u0242\u0001\u0000\u0000"+
		"\u0000\u0242\u0243\u0001\u0000\u0000\u0000\u0243\u0245\u0003@ \u0000\u0244"+
		"\u0246\u0003\u0086C\u0000\u0245\u0244\u0001\u0000\u0000\u0000\u0245\u0246"+
		"\u0001\u0000\u0000\u0000\u0246\u024c\u0001\u0000\u0000\u0000\u0247\u0248"+
		"\u0003\u0086C\u0000\u0248\u0249\u0003@ \u0000\u0249\u024b\u0001\u0000"+
		"\u0000\u0000\u024a\u0247\u0001\u0000\u0000\u0000\u024b\u024e\u0001\u0000"+
		"\u0000\u0000\u024c\u024a\u0001\u0000\u0000\u0000\u024c\u024d\u0001\u0000"+
		"\u0000\u0000\u024d\u0250\u0001\u0000\u0000\u0000\u024e\u024c\u0001\u0000"+
		"\u0000\u0000\u024f\u0251\u0003\u0086C\u0000\u0250\u024f\u0001\u0000\u0000"+
		"\u0000\u0250\u0251\u0001\u0000\u0000\u0000\u0251/\u0001\u0000\u0000\u0000"+
		"\u0252\u0264\u0003l6\u0000\u0253\u0255\u0003l6\u0000\u0254\u0253\u0001"+
		"\u0000\u0000\u0000\u0254\u0255\u0001\u0000\u0000\u0000\u0255\u0256\u0001"+
		"\u0000\u0000\u0000\u0256\u0260\u00032\u0019\u0000\u0257\u0258\u0003l6"+
		"\u0000\u0258\u0259\u00032\u0019\u0000\u0259\u025f\u0001\u0000\u0000\u0000"+
		"\u025a\u025f\u0003l6\u0000\u025b\u025c\u0003\u0086C\u0000\u025c\u025d"+
		"\u0003@ \u0000\u025d\u025f\u0001\u0000\u0000\u0000\u025e\u0257\u0001\u0000"+
		"\u0000\u0000\u025e\u025a\u0001\u0000\u0000\u0000\u025e\u025b\u0001\u0000"+
		"\u0000\u0000\u025f\u0262\u0001\u0000\u0000\u0000\u0260\u025e\u0001\u0000"+
		"\u0000\u0000\u0260\u0261\u0001\u0000\u0000\u0000\u0261\u0264\u0001\u0000"+
		"\u0000\u0000\u0262\u0260\u0001\u0000\u0000\u0000\u0263\u0252\u0001\u0000"+
		"\u0000\u0000\u0263\u0254\u0001\u0000\u0000\u0000\u02641\u0001\u0000\u0000"+
		"\u0000\u0265\u0268\u0003t:\u0000\u0266\u0268\u0003D\"\u0000\u0267\u0265"+
		"\u0001\u0000\u0000\u0000\u0267\u0266\u0001\u0000\u0000\u0000\u0268\u026a"+
		"\u0001\u0000\u0000\u0000\u0269\u026b\u0003@ \u0000\u026a\u0269\u0001\u0000"+
		"\u0000\u0000\u026a\u026b\u0001\u0000\u0000\u0000\u026b3\u0001\u0000\u0000"+
		"\u0000\u026c\u026e\u00036\u001b\u0000\u026d\u026c\u0001\u0000\u0000\u0000"+
		"\u026e\u026f\u0001\u0000\u0000\u0000\u026f\u026d\u0001\u0000\u0000\u0000"+
		"\u026f\u0270\u0001\u0000\u0000\u0000\u02705\u0001\u0000\u0000\u0000\u0271"+
		"\u0278\u0003x<\u0000\u0272\u0278\u0003D\"\u0000\u0273\u0274\u0005\n\u0000"+
		"\u0000\u0274\u0275\u0003*\u0015\u0000\u0275\u0276\u0005\u000b\u0000\u0000"+
		"\u0276\u0278\u0001\u0000\u0000\u0000\u0277\u0271\u0001\u0000\u0000\u0000"+
		"\u0277\u0272\u0001\u0000\u0000\u0000\u0277\u0273\u0001\u0000\u0000\u0000"+
		"\u02787\u0001\u0000\u0000\u0000\u0279\u027b\u0003:\u001d\u0000\u027a\u0279"+
		"\u0001\u0000\u0000\u0000\u027b\u027c\u0001\u0000\u0000\u0000\u027c\u027a"+
		"\u0001\u0000\u0000\u0000\u027c\u027d\u0001\u0000\u0000\u0000\u027d9\u0001"+
		"\u0000\u0000\u0000\u027e\u0285\u0003z=\u0000\u027f\u0285\u0003D\"\u0000"+
		"\u0280\u0281\u0005\n\u0000\u0000\u0281\u0282\u0003*\u0015\u0000\u0282"+
		"\u0283\u0005\u000b\u0000\u0000\u0283\u0285\u0001\u0000\u0000\u0000\u0284"+
		"\u027e\u0001\u0000\u0000\u0000\u0284\u027f\u0001\u0000\u0000\u0000\u0284"+
		"\u0280\u0001\u0000\u0000\u0000\u0285;\u0001\u0000\u0000\u0000\u0286\u0288"+
		"\u0003>\u001f\u0000\u0287\u0286\u0001\u0000\u0000\u0000\u0288\u0289\u0001"+
		"\u0000\u0000\u0000\u0289\u0287\u0001\u0000\u0000\u0000\u0289\u028a\u0001"+
		"\u0000\u0000\u0000\u028a=\u0001\u0000\u0000\u0000\u028b\u028e\u0003|>"+
		"\u0000\u028c\u028e\u0003D\"\u0000\u028d\u028b\u0001\u0000\u0000\u0000"+
		"\u028d\u028c\u0001\u0000\u0000\u0000\u028e?\u0001\u0000\u0000\u0000\u028f"+
		"\u0291\u0003B!\u0000\u0290\u028f\u0001\u0000\u0000\u0000\u0291\u0292\u0001"+
		"\u0000\u0000\u0000\u0292\u0290\u0001\u0000\u0000\u0000\u0292\u0293\u0001"+
		"\u0000\u0000\u0000\u0293A\u0001\u0000\u0000\u0000\u0294\u0297\u0003~?"+
		"\u0000\u0295\u0297\u0003D\"\u0000\u0296\u0294\u0001\u0000\u0000\u0000"+
		"\u0296\u0295\u0001\u0000\u0000\u0000\u0297C\u0001\u0000\u0000\u0000\u0298"+
		"\u02d2\u0005\u0004\u0000\u0000\u0299\u029a\u0005\u0002\u0000\u0000\u029a"+
		"\u029b\u0003F#\u0000\u029b\u029c\u0005\u000b\u0000\u0000\u029c\u02d2\u0001"+
		"\u0000\u0000\u0000\u029d\u029e\u0005\u0002\u0000\u0000\u029e\u029f\u0003"+
		"F#\u0000\u029f\u02a0\u0003\u0086C\u0000\u02a0\u02a1\u0003J%\u0000\u02a1"+
		"\u02a2\u0005\u000b\u0000\u0000\u02a2\u02d2\u0001\u0000\u0000\u0000\u02a3"+
		"\u02a4\u0005\u0002\u0000\u0000\u02a4\u02a5\u0003F#\u0000\u02a5\u02a6\u0005"+
		"\u000e\u0000\u0000\u02a6\u02a7\u0003J%\u0000\u02a7\u02a8\u0005\u000b\u0000"+
		"\u0000\u02a8\u02d2\u0001\u0000\u0000\u0000\u02a9\u02aa\u0005\u0002\u0000"+
		"\u0000\u02aa\u02ab\u0003F#\u0000\u02ab\u02ac\u0005\t\u0000\u0000\u02ac"+
		"\u02ad\u0003(\u0014\u0000\u02ad\u02ae\u0005\u000b\u0000\u0000\u02ae\u02d2"+
		"\u0001\u0000\u0000\u0000\u02af\u02b0\u0005\u0002\u0000\u0000\u02b0\u02b1"+
		"\u0003F#\u0000\u02b1\u02b2\u0005\u0001\u0000\u0000\u02b2\u02b3\u0003("+
		"\u0014\u0000\u02b3\u02b4\u0005\u000b\u0000\u0000\u02b4\u02d2\u0001\u0000"+
		"\u0000\u0000\u02b5\u02b6\u0005\u0003\u0000\u0000\u02b6\u02b7\u0003F#\u0000"+
		"\u02b7\u02b8\u0005\r\u0000\u0000\u02b8\u02d2\u0001\u0000\u0000\u0000\u02b9"+
		"\u02ba\u0005\u0003\u0000\u0000\u02ba\u02bb\u0003F#\u0000\u02bb\u02bc\u0003"+
		"\u0086C\u0000\u02bc\u02bd\u0003J%\u0000\u02bd\u02be\u0005\r\u0000\u0000"+
		"\u02be\u02d2\u0001\u0000\u0000\u0000\u02bf\u02c0\u0005\u0003\u0000\u0000"+
		"\u02c0\u02c1\u0003F#\u0000\u02c1\u02c2\u0005\u000e\u0000\u0000\u02c2\u02c3"+
		"\u0003J%\u0000\u02c3\u02c4\u0005\r\u0000\u0000\u02c4\u02d2\u0001\u0000"+
		"\u0000\u0000\u02c5\u02c6\u0005\u0003\u0000\u0000\u02c6\u02c7\u0003F#\u0000"+
		"\u02c7\u02c8\u0005\t\u0000\u0000\u02c8\u02c9\u0003(\u0014\u0000\u02c9"+
		"\u02ca\u0005\r\u0000\u0000\u02ca\u02d2\u0001\u0000\u0000\u0000\u02cb\u02cc"+
		"\u0005\u0003\u0000\u0000\u02cc\u02cd\u0003F#\u0000\u02cd\u02ce\u0005\u0001"+
		"\u0000\u0000\u02ce\u02cf\u0003(\u0014\u0000\u02cf\u02d0\u0005\r\u0000"+
		"\u0000\u02d0\u02d2\u0001\u0000\u0000\u0000\u02d1\u0298\u0001\u0000\u0000"+
		"\u0000\u02d1\u0299\u0001\u0000\u0000\u0000\u02d1\u029d\u0001\u0000\u0000"+
		"\u0000\u02d1\u02a3\u0001\u0000\u0000\u0000\u02d1\u02a9\u0001\u0000\u0000"+
		"\u0000\u02d1\u02af\u0001\u0000\u0000\u0000\u02d1\u02b5\u0001\u0000\u0000"+
		"\u0000\u02d1\u02b9\u0001\u0000\u0000\u0000\u02d1\u02bf\u0001\u0000\u0000"+
		"\u0000\u02d1\u02c5\u0001\u0000\u0000\u0000\u02d1\u02cb\u0001\u0000\u0000"+
		"\u0000\u02d2E\u0001\u0000\u0000\u0000\u02d3\u02d5\u0003H$\u0000\u02d4"+
		"\u02d3\u0001\u0000\u0000\u0000\u02d5\u02d6\u0001\u0000\u0000\u0000\u02d6"+
		"\u02d4\u0001\u0000\u0000\u0000\u02d6\u02d7\u0001\u0000\u0000\u0000\u02d7"+
		"G\u0001\u0000\u0000\u0000\u02d8\u02df\u0005%\u0000\u0000\u02d9\u02df\u0005"+
		"\u0011\u0000\u0000\u02da\u02df\u0005\u0012\u0000\u0000\u02db\u02df\u0005"+
		"\u000f\u0000\u0000\u02dc\u02df\u0005\u0013\u0000\u0000\u02dd\u02df\u0003"+
		"D\"\u0000\u02de\u02d8\u0001\u0000\u0000\u0000\u02de\u02d9\u0001\u0000"+
		"\u0000\u0000\u02de\u02da\u0001\u0000\u0000\u0000\u02de\u02db\u0001\u0000"+
		"\u0000\u0000\u02de\u02dc\u0001\u0000\u0000\u0000\u02de\u02dd\u0001\u0000"+
		"\u0000\u0000\u02dfI\u0001\u0000\u0000\u0000\u02e0\u02e2\u0003L&\u0000"+
		"\u02e1\u02e0\u0001\u0000\u0000\u0000\u02e1\u02e2\u0001\u0000\u0000\u0000"+
		"\u02e2\u02e9\u0001\u0000\u0000\u0000\u02e3\u02e5\u0005\u000e\u0000\u0000"+
		"\u02e4\u02e6\u0003L&\u0000\u02e5\u02e4\u0001\u0000\u0000\u0000\u02e5\u02e6"+
		"\u0001\u0000\u0000\u0000\u02e6\u02e8\u0001\u0000\u0000\u0000\u02e7\u02e3"+
		"\u0001\u0000\u0000\u0000\u02e8\u02eb\u0001\u0000\u0000\u0000\u02e9\u02e7"+
		"\u0001\u0000\u0000\u0000\u02e9\u02ea\u0001\u0000\u0000\u0000\u02eaK\u0001"+
		"\u0000\u0000\u0000\u02eb\u02e9\u0001\u0000\u0000\u0000\u02ec\u02ed\u0003"+
		"(\u0014\u0000\u02edM\u0001\u0000\u0000\u0000\u02ee\u0318\u0003P(\u0000"+
		"\u02ef\u02f1\u0003Z-\u0000\u02f0\u02f2\u0003\u0086C\u0000\u02f1\u02f0"+
		"\u0001\u0000\u0000\u0000\u02f1\u02f2\u0001\u0000\u0000\u0000\u02f2\u02f3"+
		"\u0001\u0000\u0000\u0000\u02f3\u02f5\u0003\u0082A\u0000\u02f4\u02f6\u0003"+
		"\u0086C\u0000\u02f5\u02f4\u0001\u0000\u0000\u0000\u02f5\u02f6\u0001\u0000"+
		"\u0000\u0000\u02f6\u02f7\u0001\u0000\u0000\u0000\u02f7\u0300\u0003V+\u0000"+
		"\u02f8\u02fa\u0003\u0086C\u0000\u02f9\u02f8\u0001\u0000\u0000\u0000\u02f9"+
		"\u02fa\u0001\u0000\u0000\u0000\u02fa\u02fb\u0001\u0000\u0000\u0000\u02fb"+
		"\u02fd\u0005\u000f\u0000\u0000\u02fc\u02fe\u0003\u0086C\u0000\u02fd\u02fc"+
		"\u0001\u0000\u0000\u0000\u02fd\u02fe\u0001\u0000\u0000\u0000\u02fe\u02ff"+
		"\u0001\u0000\u0000\u0000\u02ff\u0301\u0003X,\u0000\u0300\u02f9\u0001\u0000"+
		"\u0000\u0000\u0300\u0301\u0001\u0000\u0000\u0000\u0301\u0303\u0001\u0000"+
		"\u0000\u0000\u0302\u0304\u0003\u0086C\u0000\u0303\u0302\u0001\u0000\u0000"+
		"\u0000\u0303\u0304\u0001\u0000\u0000\u0000\u0304\u0305\u0001\u0000\u0000"+
		"\u0000\u0305\u0307\u0005&\u0000\u0000\u0306\u0308\u0003\\.\u0000\u0307"+
		"\u0306\u0001\u0000\u0000\u0000\u0307\u0308\u0001\u0000\u0000\u0000\u0308"+
		"\u0318\u0001\u0000\u0000\u0000\u0309\u030b\u0003Z-\u0000\u030a\u030c\u0003"+
		"\u0086C\u0000\u030b\u030a\u0001\u0000\u0000\u0000\u030b\u030c\u0001\u0000"+
		"\u0000\u0000\u030c\u030d\u0001\u0000\u0000\u0000\u030d\u030f\u0003\u0082"+
		"A\u0000\u030e\u0310\u0003\u0086C\u0000\u030f\u030e\u0001\u0000\u0000\u0000"+
		"\u030f\u0310\u0001\u0000\u0000\u0000\u0310\u0311\u0001\u0000\u0000\u0000"+
		"\u0311\u0313\u0003\u001a\r\u0000\u0312\u0314\u0003\u0086C\u0000\u0313"+
		"\u0312\u0001\u0000\u0000\u0000\u0313\u0314\u0001\u0000\u0000\u0000\u0314"+
		"\u0315\u0001\u0000\u0000\u0000\u0315\u0316\u0005&\u0000\u0000\u0316\u0318"+
		"\u0001\u0000\u0000\u0000\u0317\u02ee\u0001\u0000\u0000\u0000\u0317\u02ef"+
		"\u0001\u0000\u0000\u0000\u0317\u0309\u0001\u0000\u0000\u0000\u0318O\u0001"+
		"\u0000\u0000\u0000\u0319\u031b\u0003Z-\u0000\u031a\u031c\u0003\u0086C"+
		"\u0000\u031b\u031a\u0001\u0000\u0000\u0000\u031b\u031c\u0001\u0000\u0000"+
		"\u0000\u031c\u031d\u0001\u0000\u0000\u0000\u031d\u031f\u0003\u0082A\u0000"+
		"\u031e\u0320\u0003\u0086C\u0000\u031f\u031e\u0001\u0000\u0000\u0000\u031f"+
		"\u0320\u0001\u0000\u0000\u0000\u0320\u0321\u0001\u0000\u0000\u0000\u0321"+
		"\u0323\u0003T*\u0000\u0322\u0324\u0003\u0086C\u0000\u0323\u0322\u0001"+
		"\u0000\u0000\u0000\u0323\u0324\u0001\u0000\u0000\u0000\u0324\u0325\u0001"+
		"\u0000\u0000\u0000\u0325\u0327\u0003\u0082A\u0000\u0326\u0328\u0003\u0086"+
		"C\u0000\u0327\u0326\u0001\u0000\u0000\u0000\u0327\u0328\u0001\u0000\u0000"+
		"\u0000\u0328\u0329\u0001\u0000\u0000\u0000\u0329\u0332\u0003V+\u0000\u032a"+
		"\u032c\u0003\u0086C\u0000\u032b\u032a\u0001\u0000\u0000\u0000\u032b\u032c"+
		"\u0001\u0000\u0000\u0000\u032c\u032d\u0001\u0000\u0000\u0000\u032d\u032f"+
		"\u0005\u000f\u0000\u0000\u032e\u0330\u0003\u0086C\u0000\u032f\u032e\u0001"+
		"\u0000\u0000\u0000\u032f\u0330\u0001\u0000\u0000\u0000\u0330\u0331\u0001"+
		"\u0000\u0000\u0000\u0331\u0333\u0003X,\u0000\u0332\u032b\u0001\u0000\u0000"+
		"\u0000\u0332\u0333\u0001\u0000\u0000\u0000\u0333\u0335\u0001\u0000\u0000"+
		"\u0000\u0334\u0336\u0003\u0086C\u0000\u0335\u0334\u0001\u0000\u0000\u0000"+
		"\u0335\u0336\u0001\u0000\u0000\u0000\u0336\u0337\u0001\u0000\u0000\u0000"+
		"\u0337\u0339\u0005&\u0000\u0000\u0338\u033a\u0003\\.\u0000\u0339\u0338"+
		"\u0001\u0000\u0000\u0000\u0339\u033a\u0001\u0000\u0000\u0000\u033aQ\u0001"+
		"\u0000\u0000\u0000\u033b\u033c\u0003T*\u0000\u033cS\u0001\u0000\u0000"+
		"\u0000\u033d\u0340\u0003h4\u0000\u033e\u0340\u0003D\"\u0000\u033f\u033d"+
		"\u0001\u0000\u0000\u0000\u033f\u033e\u0001\u0000\u0000\u0000\u0340\u0341"+
		"\u0001\u0000\u0000\u0000\u0341\u033f\u0001\u0000\u0000\u0000\u0341\u0342"+
		"\u0001\u0000\u0000\u0000\u0342U\u0001\u0000\u0000\u0000\u0343\u0345\u0003"+
		"Z-\u0000\u0344\u0343\u0001\u0000\u0000\u0000\u0344\u0345\u0001\u0000\u0000"+
		"\u0000\u0345W\u0001\u0000\u0000\u0000\u0346\u0348\u0003Z-\u0000\u0347"+
		"\u0346\u0001\u0000\u0000\u0000\u0347\u0348\u0001\u0000\u0000\u0000\u0348"+
		"Y\u0001\u0000\u0000\u0000\u0349\u034f\u0003R)\u0000\u034a\u034b\u0003"+
		"\u0086C\u0000\u034b\u034c\u0003R)\u0000\u034c\u034e\u0001\u0000\u0000"+
		"\u0000\u034d\u034a\u0001\u0000\u0000\u0000\u034e\u0351\u0001\u0000\u0000"+
		"\u0000\u034f\u034d\u0001\u0000\u0000\u0000\u034f\u0350\u0001\u0000\u0000"+
		"\u0000\u0350[\u0001\u0000\u0000\u0000\u0351\u034f\u0001\u0000\u0000\u0000"+
		"\u0352\u0355\u0003`0\u0000\u0353\u0355\u0003b1\u0000\u0354\u0352\u0001"+
		"\u0000\u0000\u0000\u0354\u0353\u0001\u0000\u0000\u0000\u0355\u0356\u0001"+
		"\u0000\u0000\u0000\u0356\u0354\u0001\u0000\u0000\u0000\u0356\u0357\u0001"+
		"\u0000\u0000\u0000\u0357]\u0001\u0000\u0000\u0000\u0358\u035a\u0003\u0084"+
		"B\u0000\u0359\u035b\u0003\\.\u0000\u035a\u0359\u0001\u0000\u0000\u0000"+
		"\u035a\u035b\u0001\u0000\u0000\u0000\u035b_\u0001\u0000\u0000\u0000\u035c"+
		"\u035e\u0005\'\u0000\u0000\u035d\u035f\u0003\u0086C\u0000\u035e\u035d"+
		"\u0001\u0000\u0000\u0000\u035e\u035f\u0001\u0000\u0000\u0000\u035f\u0360"+
		"\u0001\u0000\u0000\u0000\u0360\u0361\u0003.\u0017\u0000\u0361\u0362\u0005"+
		"&\u0000\u0000\u0362\u0371\u0001\u0000\u0000\u0000\u0363\u0365\u0005\'"+
		"\u0000\u0000\u0364\u0366\u0003\u0086C\u0000\u0365\u0364\u0001\u0000\u0000"+
		"\u0000\u0365\u0366\u0001\u0000\u0000\u0000\u0366\u0367\u0001\u0000\u0000"+
		"\u0000\u0367\u0368\u0005*\u0000\u0000\u0368\u0371\u0005&\u0000\u0000\u0369"+
		"\u036b\u0003\u0086C\u0000\u036a\u0369\u0001\u0000\u0000\u0000\u036a\u036b"+
		"\u0001\u0000\u0000\u0000\u036b\u036c\u0001\u0000\u0000\u0000\u036c\u036d"+
		"\u0005*\u0000\u0000\u036d\u0371\u0005&\u0000\u0000\u036e\u0371\u0003\u0006"+
		"\u0003\u0000\u036f\u0371\u0005&\u0000\u0000\u0370\u035c\u0001\u0000\u0000"+
		"\u0000\u0370\u0363\u0001\u0000\u0000\u0000\u0370\u036a\u0001\u0000\u0000"+
		"\u0000\u0370\u036e\u0001\u0000\u0000\u0000\u0370\u036f\u0001\u0000\u0000"+
		"\u0000\u0371a\u0001\u0000\u0000\u0000\u0372\u0374\u0005\'\u0000\u0000"+
		"\u0373\u0375\u0003\u0086C\u0000\u0374\u0373\u0001\u0000\u0000\u0000\u0374"+
		"\u0375\u0001\u0000\u0000\u0000\u0375\u0376\u0001\u0000\u0000\u0000\u0376"+
		"\u0377\u0005&\u0000\u0000\u0377c\u0001\u0000\u0000\u0000\u0378\u0379\u0005"+
		"!\u0000\u0000\u0379\u037a\u0003\u0086C\u0000\u037a\u037b\u0003T*\u0000"+
		"\u037b\u0383\u0001\u0000\u0000\u0000\u037c\u037d\u0005\u001e\u0000\u0000"+
		"\u037d\u037e\u0003\u0086C\u0000\u037e\u037f\u0005!\u0000\u0000\u037f\u0380"+
		"\u0003\u0086C\u0000\u0380\u0381\u0003T*\u0000\u0381\u0383\u0001\u0000"+
		"\u0000\u0000\u0382\u0378\u0001\u0000\u0000\u0000\u0382\u037c\u0001\u0000"+
		"\u0000\u0000\u0383e\u0001\u0000\u0000\u0000\u0384\u0390\u0005\u001e\u0000"+
		"\u0000\u0385\u0390\u0005\u001f\u0000\u0000\u0386\u0390\u0005 \u0000\u0000"+
		"\u0387\u0388\u0005\u001e\u0000\u0000\u0388\u0389\u0003\u0086C\u0000\u0389"+
		"\u038a\u0005\u001f\u0000\u0000\u038a\u0390\u0001\u0000\u0000\u0000\u038b"+
		"\u038c\u0005\u001f\u0000\u0000\u038c\u038d\u0003\u0086C\u0000\u038d\u038e"+
		"\u0005\u001e\u0000\u0000\u038e\u0390\u0001\u0000\u0000\u0000\u038f\u0384"+
		"\u0001\u0000\u0000\u0000\u038f\u0385\u0001\u0000\u0000\u0000\u038f\u0386"+
		"\u0001\u0000\u0000\u0000\u038f\u0387\u0001\u0000\u0000\u0000\u038f\u038b"+
		"\u0001\u0000\u0000\u0000\u0390g\u0001\u0000\u0000\u0000\u0391\u0393\u0003"+
		"j5\u0000\u0392\u0391\u0001\u0000\u0000\u0000\u0393\u0394\u0001\u0000\u0000"+
		"\u0000\u0394\u0392\u0001\u0000\u0000\u0000\u0394\u0395\u0001\u0000\u0000"+
		"\u0000\u0395i\u0001\u0000\u0000\u0000\u0396\u0397\u0007\u0003\u0000\u0000"+
		"\u0397k\u0001\u0000\u0000\u0000\u0398\u0399\u0005&\u0000\u0000\u0399m"+
		"\u0001\u0000\u0000\u0000\u039a\u03a4\u0005%\u0000\u0000\u039b\u03a4\u0005"+
		"\u0010\u0000\u0000\u039c\u03a4\u0005\u0001\u0000\u0000\u039d\u03a4\u0005"+
		"\t\u0000\u0000\u039e\u03a4\u0005\u0005\u0000\u0000\u039f\u03a4\u0005\u0011"+
		"\u0000\u0000\u03a0\u03a4\u0005\u0012\u0000\u0000\u03a1\u03a4\u0005\u0013"+
		"\u0000\u0000\u03a2\u03a4\u0003\u0080@\u0000\u03a3\u039a\u0001\u0000\u0000"+
		"\u0000\u03a3\u039b\u0001\u0000\u0000\u0000\u03a3\u039c\u0001\u0000\u0000"+
		"\u0000\u03a3\u039d\u0001\u0000\u0000\u0000\u03a3\u039e\u0001\u0000\u0000"+
		"\u0000\u03a3\u039f\u0001\u0000\u0000\u0000\u03a3\u03a0\u0001\u0000\u0000"+
		"\u0000\u03a3\u03a1\u0001\u0000\u0000\u0000\u03a3\u03a2\u0001\u0000\u0000"+
		"\u0000\u03a4o\u0001\u0000\u0000\u0000\u03a5\u03a8\u0003n7\u0000\u03a6"+
		"\u03a8\u0005\u000e\u0000\u0000\u03a7\u03a5\u0001\u0000\u0000\u0000\u03a7"+
		"\u03a6\u0001\u0000\u0000\u0000\u03a8q\u0001\u0000\u0000\u0000\u03a9\u03b1"+
		"\u0003p8\u0000\u03aa\u03b1\u0005\n\u0000\u0000\u03ab\u03b1\u0005\u000b"+
		"\u0000\u0000\u03ac\u03b1\u0005\f\u0000\u0000\u03ad\u03b1\u0005\r\u0000"+
		"\u0000\u03ae\u03b1\u0005\u000f\u0000\u0000\u03af\u03b1\u0003\u0080@\u0000"+
		"\u03b0\u03a9\u0001\u0000\u0000\u0000\u03b0\u03aa\u0001\u0000\u0000\u0000"+
		"\u03b0\u03ab\u0001\u0000\u0000\u0000\u03b0\u03ac\u0001\u0000\u0000\u0000"+
		"\u03b0\u03ad\u0001\u0000\u0000\u0000\u03b0\u03ae\u0001\u0000\u0000\u0000"+
		"\u03b0\u03af\u0001\u0000\u0000\u0000\u03b1s\u0001\u0000\u0000\u0000\u03b2"+
		"\u03c6\u0003n7\u0000\u03b3\u03c6\u0005\n\u0000\u0000\u03b4\u03c6\u0005"+
		"\u000b\u0000\u0000\u03b5\u03c6\u0005\f\u0000\u0000\u03b6\u03c6\u0005\r"+
		"\u0000\u0000\u03b7\u03c6\u0005\u000e\u0000\u0000\u03b8\u03c6\u0005*\u0000"+
		"\u0000\u03b9\u03c6\u0005\u0014\u0000\u0000\u03ba\u03c6\u0005\u001e\u0000"+
		"\u0000\u03bb\u03c6\u0005\u001f\u0000\u0000\u03bc\u03c6\u0005 \u0000\u0000"+
		"\u03bd\u03c6\u0005\u0018\u0000\u0000\u03be\u03c6\u0005\u0019\u0000\u0000"+
		"\u03bf\u03c6\u0005\u001a\u0000\u0000\u03c0\u03c6\u0005\u001b\u0000\u0000"+
		"\u03c1\u03c6\u0005\u001c\u0000\u0000\u03c2\u03c6\u0005\u001d\u0000\u0000"+
		"\u03c3\u03c6\u0005\"\u0000\u0000\u03c4\u03c6\u0005!\u0000\u0000\u03c5"+
		"\u03b2\u0001\u0000\u0000\u0000\u03c5\u03b3\u0001\u0000\u0000\u0000\u03c5"+
		"\u03b4\u0001\u0000\u0000\u0000\u03c5\u03b5\u0001\u0000\u0000\u0000\u03c5"+
		"\u03b6\u0001\u0000\u0000\u0000\u03c5\u03b7\u0001\u0000\u0000\u0000\u03c5"+
		"\u03b8\u0001\u0000\u0000\u0000\u03c5\u03b9\u0001\u0000\u0000\u0000\u03c5"+
		"\u03ba\u0001\u0000\u0000\u0000\u03c5\u03bb\u0001\u0000\u0000\u0000\u03c5"+
		"\u03bc\u0001\u0000\u0000\u0000\u03c5\u03bd\u0001\u0000\u0000\u0000\u03c5"+
		"\u03be\u0001\u0000\u0000\u0000\u03c5\u03bf\u0001\u0000\u0000\u0000\u03c5"+
		"\u03c0\u0001\u0000\u0000\u0000\u03c5\u03c1\u0001\u0000\u0000\u0000\u03c5"+
		"\u03c2\u0001\u0000\u0000\u0000\u03c5\u03c3\u0001\u0000\u0000\u0000\u03c5"+
		"\u03c4\u0001\u0000\u0000\u0000\u03c6u\u0001\u0000\u0000\u0000\u03c7\u03cb"+
		"\u0003r9\u0000\u03c8\u03cb\u0005*\u0000\u0000\u03c9\u03cb\u0005\u000f"+
		"\u0000\u0000\u03ca\u03c7\u0001\u0000\u0000\u0000\u03ca\u03c8\u0001\u0000"+
		"\u0000\u0000\u03ca\u03c9\u0001\u0000\u0000\u0000\u03cbw\u0001\u0000\u0000"+
		"\u0000\u03cc\u03ce\u0003n7\u0000\u03cd\u03cc\u0001\u0000\u0000\u0000\u03ce"+
		"\u03cf\u0001\u0000\u0000\u0000\u03cf\u03cd\u0001\u0000\u0000\u0000\u03cf"+
		"\u03d0\u0001\u0000\u0000\u0000\u03d0y\u0001\u0000\u0000\u0000\u03d1\u03d3"+
		"\u0003p8\u0000\u03d2\u03d1\u0001\u0000\u0000\u0000\u03d3\u03d4\u0001\u0000"+
		"\u0000\u0000\u03d4\u03d2\u0001\u0000\u0000\u0000\u03d4\u03d5\u0001\u0000"+
		"\u0000\u0000\u03d5{\u0001\u0000\u0000\u0000\u03d6\u03d8\u0003r9\u0000"+
		"\u03d7\u03d6\u0001\u0000\u0000\u0000\u03d8\u03d9\u0001\u0000\u0000\u0000"+
		"\u03d9\u03d7\u0001\u0000\u0000\u0000\u03d9\u03da\u0001\u0000\u0000\u0000"+
		"\u03da}\u0001\u0000\u0000\u0000\u03db\u03dd\u0003v;\u0000\u03dc\u03db"+
		"\u0001\u0000\u0000\u0000\u03dd\u03de\u0001\u0000\u0000\u0000\u03de\u03dc"+
		"\u0001\u0000\u0000\u0000\u03de\u03df\u0001\u0000\u0000\u0000\u03df\u007f"+
		"\u0001\u0000\u0000\u0000\u03e0\u03e1\u0007\u0004\u0000\u0000\u03e1\u0081"+
		"\u0001\u0000\u0000\u0000\u03e2\u03e3\u0007\u0005\u0000\u0000\u03e3\u0083"+
		"\u0001\u0000\u0000\u0000\u03e4\u03e6\u0005*\u0000\u0000\u03e5\u03e4\u0001"+
		"\u0000\u0000\u0000\u03e5\u03e6\u0001\u0000\u0000\u0000\u03e6\u0085\u0001"+
		"\u0000\u0000\u0000\u03e7\u03e8\u0007\u0006\u0000\u0000\u03e8\u0087\u0001"+
		"\u0000\u0000\u0000\u03e9\u03eb\u0005$\u0000\u0000\u03ea\u03ec\u0003\u0086"+
		"C\u0000\u03eb\u03ea\u0001\u0000\u0000\u0000\u03eb\u03ec\u0001\u0000\u0000"+
		"\u0000\u03ec\u03ed\u0001\u0000\u0000\u0000\u03ed\u03ee\u0005\f\u0000\u0000"+
		"\u03ee\u03ef\u0003\u008aE\u0000\u03ef\u03f1\u0005\r\u0000\u0000\u03f0"+
		"\u03f2\u0003\u0086C\u0000\u03f1\u03f0\u0001\u0000\u0000\u0000\u03f1\u03f2"+
		"\u0001\u0000\u0000\u0000\u03f2\u0089\u0001\u0000\u0000\u0000\u03f3\u03f5"+
		"\t\u0000\u0000\u0000\u03f4\u03f3\u0001\u0000\u0000\u0000\u03f5\u03f8\u0001"+
		"\u0000\u0000\u0000\u03f6\u03f7\u0001\u0000\u0000\u0000\u03f6\u03f4\u0001"+
		"\u0000\u0000\u0000\u03f7\u008b\u0001\u0000\u0000\u0000\u03f8\u03f6\u0001"+
		"\u0000\u0000\u0000\u009c\u0090\u0095\u0097\u009c\u00a0\u00a4\u00a8\u00af"+
		"\u00b3\u00b7\u00bb\u00bf\u00c7\u00cb\u00cf\u00d3\u00d9\u00dd\u00e1\u00e5"+
		"\u00ec\u00f0\u00f4\u00f8\u00fc\u0104\u0108\u010c\u0110\u0114\u0118\u0122"+
		"\u012f\u013a\u0144\u0151\u015a\u0161\u0165\u0169\u016d\u0171\u0177\u017b"+
		"\u0181\u0187\u018b\u018f\u0192\u0195\u019b\u019e\u01a1\u01a9\u01ab\u01b6"+
		"\u01bd\u01c1\u01c4\u01c8\u01cb\u01cf\u01d1\u01d5\u01df\u01e3\u01e7\u01ed"+
		"\u01f1\u01f5\u0208\u020b\u020f\u0216\u021a\u021d\u0221\u0228\u022c\u022f"+
		"\u0233\u023a\u023e\u0241\u0245\u024c\u0250\u0254\u025e\u0260\u0263\u0267"+
		"\u026a\u026f\u0277\u027c\u0284\u0289\u028d\u0292\u0296\u02d1\u02d6\u02de"+
		"\u02e1\u02e5\u02e9\u02f1\u02f5\u02f9\u02fd\u0300\u0303\u0307\u030b\u030f"+
		"\u0313\u0317\u031b\u031f\u0323\u0327\u032b\u032f\u0332\u0335\u0339\u033f"+
		"\u0341\u0344\u0347\u034f\u0354\u0356\u035a\u035e\u0365\u036a\u0370\u0374"+
		"\u0382\u038f\u0394\u03a3\u03a7\u03b0\u03c5\u03ca\u03cf\u03d4\u03d9\u03de"+
		"\u03e5\u03eb\u03f1\u03f6";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}