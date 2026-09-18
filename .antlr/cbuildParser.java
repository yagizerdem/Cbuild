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
		RULE_undefine = 49, RULE_specifiers = 50, RULE_identifier = 51, RULE_identifier_atom = 52, 
		RULE_br = 53, RULE_char = 54, RULE_char_nested = 55, RULE_char_in_assign = 56, 
		RULE_char_in_def = 57, RULE_char_in_recipe = 58, RULE_text = 59, RULE_text_nested = 60, 
		RULE_text_in_assign = 61, RULE_text_in_recipe = 62, RULE_keywords = 63, 
		RULE_colon = 64, RULE_comment_opt = 65, RULE_ws = 66, RULE_hook = 67, 
		RULE_hook_program = 68;
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
			"recipe", "undefine", "specifiers", "identifier", "identifier_atom", 
			"br", "char", "char_nested", "char_in_assign", "char_in_def", "char_in_recipe", 
			"text", "text_nested", "text_in_assign", "text_in_recipe", "keywords", 
			"colon", "comment_opt", "ws", "hook", "hook_program"
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
			setState(142);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(138);
				statements();
				setState(139);
				match(EOF);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(141);
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
			setState(149);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(147);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
					case 1:
						{
						setState(144);
						statement();
						}
						break;
					case 2:
						{
						setState(145);
						br();
						}
						break;
					case 3:
						{
						setState(146);
						ws();
						}
						break;
					}
					} 
				}
				setState(151);
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
			setState(274);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,29,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(152);
				if_eq_kw();
				setState(154);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(153);
					ws();
					}
				}

				setState(156);
				condition();
				setState(158);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(157);
					ws();
					}
				}

				setState(160);
				statements_opt();
				setState(162);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(161);
					ws();
					}
				}

				setState(164);
				match(ENDIF);
				setState(166);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(165);
					ws();
					}
				}

				setState(168);
				comment_opt();
				setState(169);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(171);
				if_eq_kw();
				setState(173);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(172);
					ws();
					}
				}

				setState(175);
				condition();
				setState(177);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(176);
					ws();
					}
				}

				setState(179);
				statements_opt();
				setState(181);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(180);
					ws();
					}
				}

				setState(183);
				match(ELSE);
				setState(185);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(184);
					ws();
					}
				}

				setState(187);
				statements_opt();
				setState(189);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(188);
					ws();
					}
				}

				setState(191);
				match(ENDIF);
				setState(192);
				comment_opt();
				setState(193);
				br();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(195);
				if_eq_kw();
				setState(197);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(196);
					ws();
					}
				}

				setState(199);
				condition();
				setState(201);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(200);
					ws();
					}
				}

				setState(203);
				statements_opt();
				setState(205);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(204);
					ws();
					}
				}

				setState(207);
				match(ELSE);
				setState(209);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(208);
					ws();
					}
				}

				setState(211);
				conditional();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(213);
				if_def_kw();
				setState(215);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(214);
					ws();
					}
				}

				setState(217);
				pattern();
				setState(219);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(218);
					ws();
					}
				}

				setState(221);
				statements_opt();
				setState(223);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(222);
					ws();
					}
				}

				setState(225);
				match(ENDIF);
				setState(227);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(226);
					ws();
					}
				}

				setState(229);
				comment_opt();
				setState(230);
				br();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(232);
				if_def_kw();
				setState(234);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(233);
					ws();
					}
				}

				setState(236);
				pattern();
				setState(238);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(237);
					ws();
					}
				}

				setState(240);
				statements_opt();
				setState(242);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(241);
					ws();
					}
				}

				setState(244);
				match(ELSE);
				setState(246);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(245);
					ws();
					}
				}

				setState(248);
				statements_opt();
				setState(250);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(249);
					ws();
					}
				}

				setState(252);
				match(ENDIF);
				setState(253);
				comment_opt();
				setState(254);
				br();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(256);
				if_def_kw();
				setState(258);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(257);
					ws();
					}
				}

				setState(260);
				pattern();
				setState(262);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(261);
					ws();
					}
				}

				setState(264);
				statements_opt();
				setState(266);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(265);
					ws();
					}
				}

				setState(268);
				match(ELSE);
				setState(270);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(269);
					ws();
					}
				}

				setState(272);
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
			setState(344);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,36,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(276);
				if_eq_kw();
				setState(278);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(277);
					ws();
					}
				}

				setState(280);
				condition();
				setState(281);
				match(NL);
				setState(282);
				recipes_opt();
				setState(283);
				match(ENDIF);
				setState(284);
				comment_opt();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(286);
				if_eq_kw();
				setState(288);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(287);
					ws();
					}
				}

				setState(290);
				condition();
				setState(291);
				match(NL);
				setState(292);
				recipes_opt();
				setState(293);
				match(ELSE);
				setState(294);
				match(NL);
				setState(295);
				recipes_opt();
				setState(296);
				match(ENDIF);
				setState(297);
				comment_opt();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(299);
				if_eq_kw();
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
				condition();
				setState(304);
				match(NL);
				setState(305);
				recipes_opt();
				setState(306);
				match(ELSE);
				setState(307);
				match(NL);
				setState(308);
				conditional_in_recipe();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(310);
				if_def_kw();
				setState(312);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(311);
					ws();
					}
				}

				setState(314);
				pattern();
				setState(315);
				match(NL);
				setState(316);
				recipes_opt();
				setState(317);
				match(ENDIF);
				setState(318);
				comment_opt();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(320);
				if_def_kw();
				setState(322);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(321);
					ws();
					}
				}

				setState(324);
				pattern();
				setState(325);
				match(NL);
				setState(326);
				recipes_opt();
				setState(327);
				match(ELSE);
				setState(328);
				match(NL);
				setState(329);
				recipes_opt();
				setState(330);
				match(ENDIF);
				setState(331);
				comment_opt();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(333);
				if_def_kw();
				setState(335);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(334);
					ws();
					}
				}

				setState(337);
				pattern();
				setState(338);
				match(NL);
				setState(339);
				recipes_opt();
				setState(340);
				match(ELSE);
				setState(341);
				match(NL);
				setState(342);
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
			setState(346);
			comment_opt();
			setState(347);
			br();
			setState(348);
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
			setState(400);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,48,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(351);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(350);
					ws();
					}
				}

				setState(353);
				match(COMMENT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(355);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(354);
					ws();
					}
				}

				setState(357);
				conditional();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(359);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(358);
					ws();
					}
				}

				setState(361);
				define();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(363);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(362);
					ws();
					}
				}

				setState(365);
				include();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(367);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(366);
					ws();
					}
				}

				setState(369);
				export();
				setState(370);
				br();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(373);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(372);
					ws();
					}
				}

				setState(375);
				vpath();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(377);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(376);
					ws();
					}
				}

				setState(379);
				assignment();
				setState(380);
				br();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
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
				function();
				setState(386);
				br();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(389);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(388);
					ws();
					}
				}

				setState(391);
				rule_();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
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
				hook();
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(397);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(396);
					ws();
					}
				}

				setState(399);
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
			setState(403);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 7516192768L) != 0)) {
				{
				setState(402);
				specifiers();
				}
			}

			setState(405);
			match(DEFINE);
			setState(406);
			ws();
			setState(407);
			pattern();
			setState(409);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,50,_ctx) ) {
			case 1:
				{
				setState(408);
				ws();
				}
				break;
			}
			setState(412);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ASSIGN_OP) {
				{
				setState(411);
				match(ASSIGN_OP);
				}
			}

			setState(415);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(414);
				ws();
				}
			}

			setState(417);
			define_body();
			setState(418);
			match(ENDEF);
			setState(419);
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
			setState(425);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4697620480000L) != 0)) {
				{
				setState(423);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case OVERRIDE:
				case EXPORT:
				case UNEXPORT:
				case DEFINE:
					{
					setState(421);
					define();
					}
					break;
				case NL:
				case COMMENT:
					{
					setState(422);
					definition();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(427);
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
			setState(436);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,55,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(428);
				comment_opt();
				setState(429);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(431);
				comment_opt();
				setState(432);
				br();
				setState(433);
				exprs_in_def();
				setState(434);
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
			setState(438);
			include_kw();
			setState(439);
			expressions();
			setState(440);
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
	}

	public final ExportContext export() throws RecognitionException {
		ExportContext _localctx = new ExportContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_export);
		int _la;
		try {
			setState(450);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,57,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(442);
				match(EXPORT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(443);
				match(UNEXPORT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(444);
				assignment_prefix();
				setState(448);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(445);
					ws();
					setState(446);
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
	}

	public final VpathContext vpath() throws RecognitionException {
		VpathContext _localctx = new VpathContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_vpath);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(452);
			match(VPATH);
			setState(454);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(453);
				vpath_args();
				}
			}

			setState(456);
			comment_opt();
			setState(457);
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
			setState(459);
			ws();
			setState(460);
			pattern();
			setState(464);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(461);
				ws();
				setState(462);
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
			setState(486);
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
				setState(466);
				pattern();
				setState(468);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(467);
					ws();
					}
				}

				setState(470);
				match(ASSIGN_OP);
				setState(472);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,61,_ctx) ) {
				case 1:
					{
					setState(471);
					exprs_in_assign();
					}
					break;
				}
				setState(474);
				comment_opt();
				}
				break;
			case OVERRIDE:
			case EXPORT:
			case UNEXPORT:
				enterOuterAlt(_localctx, 2);
				{
				setState(476);
				assignment_prefix();
				setState(478);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(477);
					ws();
					}
				}

				setState(480);
				match(ASSIGN_OP);
				setState(482);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,63,_ctx) ) {
				case 1:
					{
					setState(481);
					exprs_in_assign();
					}
					break;
				}
				setState(484);
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
			setState(488);
			specifiers();
			setState(489);
			ws();
			setState(490);
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
			setState(492);
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
			setState(494);
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
			setState(496);
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
			setState(498);
			match(LPAREN);
			setState(499);
			expressions_opt();
			setState(500);
			match(COMMA);
			setState(501);
			expressions_opt();
			setState(502);
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
			setState(505);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 3504686958142L) != 0)) {
				{
				setState(504);
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
			setState(508);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(507);
				ws();
				}
			}

			setState(510);
			expression();
			setState(512);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,67,_ctx) ) {
			case 1:
				{
				setState(511);
				ws();
				}
				break;
			}
			setState(519);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,68,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(514);
					ws();
					setState(515);
					expression();
					}
					} 
				}
				setState(521);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,68,_ctx);
			}
			setState(523);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(522);
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
			setState(526);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(525);
				ws();
				}
			}

			setState(528);
			expr_nested();
			setState(530);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,71,_ctx) ) {
			case 1:
				{
				setState(529);
				ws();
				}
				break;
			}
			setState(537);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,72,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(532);
					ws();
					setState(533);
					expr_nested();
					}
					} 
				}
				setState(539);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,72,_ctx);
			}
			setState(541);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(540);
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
			setState(544);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(543);
				ws();
				}
			}

			setState(546);
			expr_in_assign();
			setState(548);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,75,_ctx) ) {
			case 1:
				{
				setState(547);
				ws();
				}
				break;
			}
			setState(555);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,76,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(550);
					ws();
					setState(551);
					expr_in_assign();
					}
					} 
				}
				setState(557);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,76,_ctx);
			}
			setState(559);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,77,_ctx) ) {
			case 1:
				{
				setState(558);
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
			setState(562);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(561);
				ws();
				}
			}

			setState(564);
			expr_in_recipe();
			setState(566);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,79,_ctx) ) {
			case 1:
				{
				setState(565);
				ws();
				}
				break;
			}
			setState(573);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,80,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(568);
					ws();
					setState(569);
					expr_in_recipe();
					}
					} 
				}
				setState(575);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,80,_ctx);
			}
			setState(577);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(576);
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
			setState(596);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,85,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(579);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(581);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==NL) {
					{
					setState(580);
					br();
					}
				}

				setState(583);
				first_expr_in_def();
				setState(593);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,84,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						setState(591);
						_errHandler.sync(this);
						switch ( getInterpreter().adaptivePredict(_input,83,_ctx) ) {
						case 1:
							{
							{
							setState(584);
							br();
							setState(585);
							first_expr_in_def();
							}
							}
							break;
						case 2:
							{
							{
							setState(587);
							br();
							}
							}
							break;
						case 3:
							{
							{
							setState(588);
							ws();
							setState(589);
							expr_in_recipe();
							}
							}
							break;
						}
						} 
					}
					setState(595);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,84,_ctx);
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
			setState(600);
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
				setState(598);
				char_in_def();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				{
				setState(599);
				function();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(603);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4604198649406L) != 0)) {
				{
				setState(602);
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
			setState(606); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(605);
				expression_atom();
				}
				}
				setState(608); 
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
			setState(616);
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
				setState(610);
				text();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(611);
				function();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(612);
				match(LPAREN);
				setState(613);
				exprs_nested();
				setState(614);
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
			setState(619); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(618);
				expr_nested_atom();
				}
				}
				setState(621); 
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
			setState(629);
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
				setState(623);
				text_nested();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(624);
				function();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(625);
				match(LPAREN);
				setState(626);
				exprs_nested();
				setState(627);
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
			setState(632); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(631);
				expr_in_assign_atom();
				}
				}
				setState(634); 
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
			setState(638);
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
				setState(636);
				text_in_assign();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(637);
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
			setState(641); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(640);
				expr_in_recipe_atom();
				}
				}
				setState(643); 
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
			setState(647);
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
				setState(645);
				text_in_recipe();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(646);
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
			setState(706);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,96,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(649);
				match(VAR);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(650);
				match(DOLLAR_LPAREN);
				setState(651);
				function_name();
				setState(652);
				match(RPAREN);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(654);
				match(DOLLAR_LPAREN);
				setState(655);
				function_name();
				setState(656);
				ws();
				setState(657);
				arguments();
				setState(658);
				match(RPAREN);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(660);
				match(DOLLAR_LPAREN);
				setState(661);
				function_name();
				setState(662);
				match(COMMA);
				setState(663);
				arguments();
				setState(664);
				match(RPAREN);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(666);
				match(DOLLAR_LPAREN);
				setState(667);
				function_name();
				setState(668);
				match(COLON);
				setState(669);
				expressions();
				setState(670);
				match(RPAREN);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(672);
				match(DOLLAR_LPAREN);
				setState(673);
				function_name();
				setState(674);
				match(ASSIGN_OP);
				setState(675);
				expressions();
				setState(676);
				match(RPAREN);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(678);
				match(DOLLAR_L_CURLY_BRACE);
				setState(679);
				function_name();
				setState(680);
				match(R_CURLY_BRACE);
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(682);
				match(DOLLAR_L_CURLY_BRACE);
				setState(683);
				function_name();
				setState(684);
				ws();
				setState(685);
				arguments();
				setState(686);
				match(R_CURLY_BRACE);
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(688);
				match(DOLLAR_L_CURLY_BRACE);
				setState(689);
				function_name();
				setState(690);
				match(COMMA);
				setState(691);
				arguments();
				setState(692);
				match(R_CURLY_BRACE);
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(694);
				match(DOLLAR_L_CURLY_BRACE);
				setState(695);
				function_name();
				setState(696);
				match(COLON);
				setState(697);
				expressions();
				setState(698);
				match(R_CURLY_BRACE);
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(700);
				match(DOLLAR_L_CURLY_BRACE);
				setState(701);
				function_name();
				setState(702);
				match(ASSIGN_OP);
				setState(703);
				expressions();
				setState(704);
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
			setState(709); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(708);
				function_name_atom();
				}
				}
				setState(711); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 137438953500L) != 0) );
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
	}

	public final Function_name_atomContext function_name_atom() throws RecognitionException {
		Function_name_atomContext _localctx = new Function_name_atomContext(_ctx, getState());
		enterRule(_localctx, 72, RULE_function_name_atom);
		try {
			setState(715);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(713);
				match(CHARS);
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(714);
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
			setState(718);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 3504686958142L) != 0)) {
				{
				setState(717);
				argument();
				}
			}

			setState(726);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(720);
				match(COMMA);
				setState(722);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 3504686958142L) != 0)) {
					{
					setState(721);
					argument();
					}
				}

				}
				}
				setState(728);
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
			setState(729);
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
			setState(772);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,112,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(731);
				static_pattern_rule();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(732);
				targets();
				setState(734);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(733);
					ws();
					}
				}

				setState(736);
				colon();
				setState(738);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,103,_ctx) ) {
				case 1:
					{
					setState(737);
					ws();
					}
					break;
				}
				setState(740);
				prerequisites();
				setState(749);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,106,_ctx) ) {
				case 1:
					{
					setState(742);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==WS || _la==TAB) {
						{
						setState(741);
						ws();
						}
					}

					setState(744);
					match(PIPE);
					setState(746);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,105,_ctx) ) {
					case 1:
						{
						setState(745);
						ws();
						}
						break;
					}
					setState(748);
					orderonlyprerequisites();
					}
					break;
				}
				setState(752);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(751);
					ws();
					}
				}

				setState(754);
				match(NL);
				setState(756);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,108,_ctx) ) {
				case 1:
					{
					setState(755);
					recipes();
					}
					break;
				}
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(758);
				targets();
				setState(760);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(759);
					ws();
					}
				}

				setState(762);
				colon();
				setState(764);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(763);
					ws();
					}
				}

				setState(766);
				assignment();
				setState(768);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(767);
					ws();
					}
				}

				setState(770);
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
			setState(774);
			targets();
			setState(776);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(775);
				ws();
				}
			}

			setState(778);
			colon();
			setState(780);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(779);
				ws();
				}
			}

			setState(782);
			pattern();
			setState(784);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(783);
				ws();
				}
			}

			setState(786);
			colon();
			setState(788);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,116,_ctx) ) {
			case 1:
				{
				setState(787);
				ws();
				}
				break;
			}
			setState(790);
			prerequisites();
			setState(799);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,119,_ctx) ) {
			case 1:
				{
				setState(792);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(791);
					ws();
					}
				}

				setState(794);
				match(PIPE);
				setState(796);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,118,_ctx) ) {
				case 1:
					{
					setState(795);
					ws();
					}
					break;
				}
				setState(798);
				orderonlyprerequisites();
				}
				break;
			}
			setState(802);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(801);
				ws();
				}
			}

			setState(804);
			match(NL);
			setState(806);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,121,_ctx) ) {
			case 1:
				{
				setState(805);
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
			setState(808);
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
			setState(812); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					setState(812);
					_errHandler.sync(this);
					switch (_input.LA(1)) {
					case LPAREN:
					case RPAREN:
					case L_CURLY_BRACE:
					case R_CURLY_BRACE:
					case COMMA:
					case CHARS:
						{
						setState(810);
						identifier();
						}
						break;
					case DOLLAR_LPAREN:
					case DOLLAR_L_CURLY_BRACE:
					case VAR:
						{
						setState(811);
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
				setState(814); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,123,_ctx);
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
			setState(817);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 137438985244L) != 0)) {
				{
				setState(816);
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
			setState(820);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 137438985244L) != 0)) {
				{
				setState(819);
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
			setState(822);
			target();
			setState(828);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,126,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(823);
					ws();
					setState(824);
					target();
					}
					} 
				}
				setState(830);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,126,_ctx);
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
	}

	public final RecipesContext recipes() throws RecognitionException {
		RecipesContext _localctx = new RecipesContext(_ctx, getState());
		enterRule(_localctx, 92, RULE_recipes);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(832); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(831);
					recipe();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(834); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,127,_ctx);
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
			setState(836);
			comment_opt();
			setState(838);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 8521466773504L) != 0)) {
				{
				setState(837);
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
			setState(860);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,132,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(840);
				match(LEADING_TAB);
				setState(842);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,129,_ctx) ) {
				case 1:
					{
					setState(841);
					ws();
					}
					break;
				}
				setState(844);
				exprs_in_recipe();
				setState(845);
				match(NL);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(847);
				match(LEADING_TAB);
				setState(849);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(848);
					ws();
					}
				}

				setState(851);
				match(COMMENT);
				setState(852);
				match(NL);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(854);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(853);
					ws();
					}
				}

				setState(856);
				match(COMMENT);
				setState(857);
				match(NL);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(858);
				conditional_in_recipe();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(859);
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
		enterRule(_localctx, 98, RULE_undefine);
		try {
			setState(872);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case UNDEFINE:
				enterOuterAlt(_localctx, 1);
				{
				setState(862);
				match(UNDEFINE);
				setState(863);
				ws();
				setState(864);
				pattern();
				}
				break;
			case OVERRIDE:
				enterOuterAlt(_localctx, 2);
				{
				setState(866);
				match(OVERRIDE);
				setState(867);
				ws();
				setState(868);
				match(UNDEFINE);
				setState(869);
				ws();
				setState(870);
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
		enterRule(_localctx, 100, RULE_specifiers);
		try {
			setState(885);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,134,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(874);
				match(OVERRIDE);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(875);
				match(EXPORT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(876);
				match(UNEXPORT);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(877);
				match(OVERRIDE);
				setState(878);
				ws();
				setState(879);
				match(EXPORT);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(881);
				match(EXPORT);
				setState(882);
				ws();
				setState(883);
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
		enterRule(_localctx, 102, RULE_identifier);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(888); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(887);
					identifier_atom();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(890); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,135,_ctx);
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
		enterRule(_localctx, 104, RULE_identifier_atom);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(892);
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
		enterRule(_localctx, 106, RULE_br);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(894);
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
		enterRule(_localctx, 108, RULE_char);
		try {
			setState(905);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(896);
				match(CHARS);
				}
				break;
			case BACKSLASH:
				enterOuterAlt(_localctx, 2);
				{
				setState(897);
				match(BACKSLASH);
				}
				break;
			case ASSIGN_OP:
				enterOuterAlt(_localctx, 3);
				{
				setState(898);
				match(ASSIGN_OP);
				}
				break;
			case COLON:
				enterOuterAlt(_localctx, 4);
				{
				setState(899);
				match(COLON);
				}
				break;
			case DOUBLE_DOLLAR:
				enterOuterAlt(_localctx, 5);
				{
				setState(900);
				match(DOUBLE_DOLLAR);
				}
				break;
			case PLUS:
				enterOuterAlt(_localctx, 6);
				{
				setState(901);
				match(PLUS);
				}
				break;
			case QUESTION:
				enterOuterAlt(_localctx, 7);
				{
				setState(902);
				match(QUESTION);
				}
				break;
			case BANG:
				enterOuterAlt(_localctx, 8);
				{
				setState(903);
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
				setState(904);
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
		enterRule(_localctx, 110, RULE_char_nested);
		try {
			setState(909);
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
				setState(907);
				char_();
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 2);
				{
				setState(908);
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
		enterRule(_localctx, 112, RULE_char_in_assign);
		try {
			setState(918);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,138,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(911);
				char_nested();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(912);
				match(LPAREN);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(913);
				match(RPAREN);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(914);
				match(L_CURLY_BRACE);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(915);
				match(R_CURLY_BRACE);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(916);
				match(PIPE);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(917);
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
		enterRule(_localctx, 114, RULE_char_in_def);
		try {
			setState(939);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,139,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(920);
				char_();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(921);
				match(LPAREN);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(922);
				match(RPAREN);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(923);
				match(L_CURLY_BRACE);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(924);
				match(R_CURLY_BRACE);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(925);
				match(COMMA);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(926);
				match(COMMENT);
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(927);
				match(INCLUDE);
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(928);
				match(OVERRIDE);
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(929);
				match(EXPORT);
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(930);
				match(UNEXPORT);
				}
				break;
			case 12:
				enterOuterAlt(_localctx, 12);
				{
				setState(931);
				match(IFDEF);
				}
				break;
			case 13:
				enterOuterAlt(_localctx, 13);
				{
				setState(932);
				match(IFNDEF);
				}
				break;
			case 14:
				enterOuterAlt(_localctx, 14);
				{
				setState(933);
				match(IFEQ);
				}
				break;
			case 15:
				enterOuterAlt(_localctx, 15);
				{
				setState(934);
				match(IFNEQ);
				}
				break;
			case 16:
				enterOuterAlt(_localctx, 16);
				{
				setState(935);
				match(ELSE);
				}
				break;
			case 17:
				enterOuterAlt(_localctx, 17);
				{
				setState(936);
				match(ENDIF);
				}
				break;
			case 18:
				enterOuterAlt(_localctx, 18);
				{
				setState(937);
				match(DEFINE);
				}
				break;
			case 19:
				enterOuterAlt(_localctx, 19);
				{
				setState(938);
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
		enterRule(_localctx, 116, RULE_char_in_recipe);
		try {
			setState(944);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,140,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(941);
				char_in_assign();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(942);
				match(COMMENT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(943);
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
		enterRule(_localctx, 118, RULE_text);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(947); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(946);
					char_();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(949); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,141,_ctx);
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
		enterRule(_localctx, 120, RULE_text_nested);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(952); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(951);
					char_nested();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(954); 
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
		enterRule(_localctx, 122, RULE_text_in_assign);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(957); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(956);
					char_in_assign();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(959); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,143,_ctx);
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
		enterRule(_localctx, 124, RULE_text_in_recipe);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(962); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(961);
					char_in_recipe();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(964); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,144,_ctx);
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
		enterRule(_localctx, 126, RULE_keywords);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(966);
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
		enterRule(_localctx, 128, RULE_colon);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(968);
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
		enterRule(_localctx, 130, RULE_comment_opt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(971);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,145,_ctx) ) {
			case 1:
				{
				setState(970);
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
		enterRule(_localctx, 132, RULE_ws);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(973);
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
		enterRule(_localctx, 134, RULE_hook);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(975);
			match(HOOK);
			setState(977);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(976);
				ws();
				}
			}

			setState(979);
			match(L_CURLY_BRACE);
			setState(980);
			hook_program();
			setState(981);
			match(R_CURLY_BRACE);
			setState(983);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,147,_ctx) ) {
			case 1:
				{
				setState(982);
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
		enterRule(_localctx, 136, RULE_hook_program);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(988);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,148,_ctx);
			while ( _alt!=1 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1+1 ) {
					{
					{
					setState(985);
					matchWildcard();
					}
					} 
				}
				setState(990);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,148,_ctx);
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
		"\u0004\u0001*\u03e0\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
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
		"A\u0007A\u0002B\u0007B\u0002C\u0007C\u0002D\u0007D\u0001\u0000\u0001\u0000"+
		"\u0001\u0000\u0001\u0000\u0003\u0000\u008f\b\u0000\u0001\u0001\u0001\u0001"+
		"\u0001\u0001\u0005\u0001\u0094\b\u0001\n\u0001\f\u0001\u0097\t\u0001\u0001"+
		"\u0002\u0001\u0002\u0003\u0002\u009b\b\u0002\u0001\u0002\u0001\u0002\u0003"+
		"\u0002\u009f\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00a3\b\u0002"+
		"\u0001\u0002\u0001\u0002\u0003\u0002\u00a7\b\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00ae\b\u0002\u0001\u0002"+
		"\u0001\u0002\u0003\u0002\u00b2\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002"+
		"\u00b6\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00ba\b\u0002\u0001"+
		"\u0002\u0001\u0002\u0003\u0002\u00be\b\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00c6\b\u0002\u0001"+
		"\u0002\u0001\u0002\u0003\u0002\u00ca\b\u0002\u0001\u0002\u0001\u0002\u0003"+
		"\u0002\u00ce\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00d2\b\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00d8\b\u0002"+
		"\u0001\u0002\u0001\u0002\u0003\u0002\u00dc\b\u0002\u0001\u0002\u0001\u0002"+
		"\u0003\u0002\u00e0\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00e4\b"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0003"+
		"\u0002\u00eb\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00ef\b\u0002"+
		"\u0001\u0002\u0001\u0002\u0003\u0002\u00f3\b\u0002\u0001\u0002\u0001\u0002"+
		"\u0003\u0002\u00f7\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00fb\b"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0003\u0002\u0103\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u0107"+
		"\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u010b\b\u0002\u0001\u0002"+
		"\u0001\u0002\u0003\u0002\u010f\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002"+
		"\u0113\b\u0002\u0001\u0003\u0001\u0003\u0003\u0003\u0117\b\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0003\u0003\u0121\b\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u012e\b\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0003\u0003\u0139\b\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003"+
		"\u0003\u0143\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0003\u0003\u0150\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u0159\b\u0003\u0001"+
		"\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0005\u0003\u0005\u0160"+
		"\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0164\b\u0005\u0001\u0005"+
		"\u0001\u0005\u0003\u0005\u0168\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005"+
		"\u016c\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0170\b\u0005\u0001"+
		"\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0176\b\u0005\u0001"+
		"\u0005\u0001\u0005\u0003\u0005\u017a\b\u0005\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0001\u0005\u0003\u0005\u0180\b\u0005\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0001\u0005\u0003\u0005\u0186\b\u0005\u0001\u0005\u0001\u0005\u0003"+
		"\u0005\u018a\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u018e\b\u0005"+
		"\u0001\u0005\u0003\u0005\u0191\b\u0005\u0001\u0006\u0003\u0006\u0194\b"+
		"\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0003\u0006\u019a"+
		"\b\u0006\u0001\u0006\u0003\u0006\u019d\b\u0006\u0001\u0006\u0003\u0006"+
		"\u01a0\b\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0007"+
		"\u0001\u0007\u0005\u0007\u01a8\b\u0007\n\u0007\f\u0007\u01ab\t\u0007\u0001"+
		"\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0003\b\u01b5"+
		"\b\b\u0001\t\u0001\t\u0001\t\u0001\t\u0001\n\u0001\n\u0001\n\u0001\n\u0001"+
		"\n\u0001\n\u0003\n\u01c1\b\n\u0003\n\u01c3\b\n\u0001\u000b\u0001\u000b"+
		"\u0003\u000b\u01c7\b\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\f"+
		"\u0001\f\u0001\f\u0001\f\u0001\f\u0003\f\u01d1\b\f\u0001\r\u0001\r\u0003"+
		"\r\u01d5\b\r\u0001\r\u0001\r\u0003\r\u01d9\b\r\u0001\r\u0001\r\u0001\r"+
		"\u0001\r\u0003\r\u01df\b\r\u0001\r\u0001\r\u0003\r\u01e3\b\r\u0001\r\u0001"+
		"\r\u0003\r\u01e7\b\r\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0001"+
		"\u000f\u0001\u000f\u0001\u0010\u0001\u0010\u0001\u0011\u0001\u0011\u0001"+
		"\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001"+
		"\u0013\u0003\u0013\u01fa\b\u0013\u0001\u0014\u0003\u0014\u01fd\b\u0014"+
		"\u0001\u0014\u0001\u0014\u0003\u0014\u0201\b\u0014\u0001\u0014\u0001\u0014"+
		"\u0001\u0014\u0005\u0014\u0206\b\u0014\n\u0014\f\u0014\u0209\t\u0014\u0001"+
		"\u0014\u0003\u0014\u020c\b\u0014\u0001\u0015\u0003\u0015\u020f\b\u0015"+
		"\u0001\u0015\u0001\u0015\u0003\u0015\u0213\b\u0015\u0001\u0015\u0001\u0015"+
		"\u0001\u0015\u0005\u0015\u0218\b\u0015\n\u0015\f\u0015\u021b\t\u0015\u0001"+
		"\u0015\u0003\u0015\u021e\b\u0015\u0001\u0016\u0003\u0016\u0221\b\u0016"+
		"\u0001\u0016\u0001\u0016\u0003\u0016\u0225\b\u0016\u0001\u0016\u0001\u0016"+
		"\u0001\u0016\u0005\u0016\u022a\b\u0016\n\u0016\f\u0016\u022d\t\u0016\u0001"+
		"\u0016\u0003\u0016\u0230\b\u0016\u0001\u0017\u0003\u0017\u0233\b\u0017"+
		"\u0001\u0017\u0001\u0017\u0003\u0017\u0237\b\u0017\u0001\u0017\u0001\u0017"+
		"\u0001\u0017\u0005\u0017\u023c\b\u0017\n\u0017\f\u0017\u023f\t\u0017\u0001"+
		"\u0017\u0003\u0017\u0242\b\u0017\u0001\u0018\u0001\u0018\u0003\u0018\u0246"+
		"\b\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001\u0018\u0001"+
		"\u0018\u0001\u0018\u0001\u0018\u0005\u0018\u0250\b\u0018\n\u0018\f\u0018"+
		"\u0253\t\u0018\u0003\u0018\u0255\b\u0018\u0001\u0019\u0001\u0019\u0003"+
		"\u0019\u0259\b\u0019\u0001\u0019\u0003\u0019\u025c\b\u0019\u0001\u001a"+
		"\u0004\u001a\u025f\b\u001a\u000b\u001a\f\u001a\u0260\u0001\u001b\u0001"+
		"\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0001\u001b\u0003\u001b\u0269"+
		"\b\u001b\u0001\u001c\u0004\u001c\u026c\b\u001c\u000b\u001c\f\u001c\u026d"+
		"\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d\u0001\u001d"+
		"\u0003\u001d\u0276\b\u001d\u0001\u001e\u0004\u001e\u0279\b\u001e\u000b"+
		"\u001e\f\u001e\u027a\u0001\u001f\u0001\u001f\u0003\u001f\u027f\b\u001f"+
		"\u0001 \u0004 \u0282\b \u000b \f \u0283\u0001!\u0001!\u0003!\u0288\b!"+
		"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001\"\u0001"+
		"\"\u0001\"\u0001\"\u0001\"\u0003\"\u02c3\b\"\u0001#\u0004#\u02c6\b#\u000b"+
		"#\f#\u02c7\u0001$\u0001$\u0003$\u02cc\b$\u0001%\u0003%\u02cf\b%\u0001"+
		"%\u0001%\u0003%\u02d3\b%\u0005%\u02d5\b%\n%\f%\u02d8\t%\u0001&\u0001&"+
		"\u0001\'\u0001\'\u0001\'\u0003\'\u02df\b\'\u0001\'\u0001\'\u0003\'\u02e3"+
		"\b\'\u0001\'\u0001\'\u0003\'\u02e7\b\'\u0001\'\u0001\'\u0003\'\u02eb\b"+
		"\'\u0001\'\u0003\'\u02ee\b\'\u0001\'\u0003\'\u02f1\b\'\u0001\'\u0001\'"+
		"\u0003\'\u02f5\b\'\u0001\'\u0001\'\u0003\'\u02f9\b\'\u0001\'\u0001\'\u0003"+
		"\'\u02fd\b\'\u0001\'\u0001\'\u0003\'\u0301\b\'\u0001\'\u0001\'\u0003\'"+
		"\u0305\b\'\u0001(\u0001(\u0003(\u0309\b(\u0001(\u0001(\u0003(\u030d\b"+
		"(\u0001(\u0001(\u0003(\u0311\b(\u0001(\u0001(\u0003(\u0315\b(\u0001(\u0001"+
		"(\u0003(\u0319\b(\u0001(\u0001(\u0003(\u031d\b(\u0001(\u0003(\u0320\b"+
		"(\u0001(\u0003(\u0323\b(\u0001(\u0001(\u0003(\u0327\b(\u0001)\u0001)\u0001"+
		"*\u0001*\u0004*\u032d\b*\u000b*\f*\u032e\u0001+\u0003+\u0332\b+\u0001"+
		",\u0003,\u0335\b,\u0001-\u0001-\u0001-\u0001-\u0005-\u033b\b-\n-\f-\u033e"+
		"\t-\u0001.\u0004.\u0341\b.\u000b.\f.\u0342\u0001/\u0001/\u0003/\u0347"+
		"\b/\u00010\u00010\u00030\u034b\b0\u00010\u00010\u00010\u00010\u00010\u0003"+
		"0\u0352\b0\u00010\u00010\u00010\u00030\u0357\b0\u00010\u00010\u00010\u0001"+
		"0\u00030\u035d\b0\u00011\u00011\u00011\u00011\u00011\u00011\u00011\u0001"+
		"1\u00011\u00011\u00031\u0369\b1\u00012\u00012\u00012\u00012\u00012\u0001"+
		"2\u00012\u00012\u00012\u00012\u00012\u00032\u0376\b2\u00013\u00043\u0379"+
		"\b3\u000b3\f3\u037a\u00014\u00014\u00015\u00015\u00016\u00016\u00016\u0001"+
		"6\u00016\u00016\u00016\u00016\u00016\u00036\u038a\b6\u00017\u00017\u0003"+
		"7\u038e\b7\u00018\u00018\u00018\u00018\u00018\u00018\u00018\u00038\u0397"+
		"\b8\u00019\u00019\u00019\u00019\u00019\u00019\u00019\u00019\u00019\u0001"+
		"9\u00019\u00019\u00019\u00019\u00019\u00019\u00019\u00019\u00019\u0003"+
		"9\u03ac\b9\u0001:\u0001:\u0001:\u0003:\u03b1\b:\u0001;\u0004;\u03b4\b"+
		";\u000b;\f;\u03b5\u0001<\u0004<\u03b9\b<\u000b<\f<\u03ba\u0001=\u0004"+
		"=\u03be\b=\u000b=\f=\u03bf\u0001>\u0004>\u03c3\b>\u000b>\f>\u03c4\u0001"+
		"?\u0001?\u0001@\u0001@\u0001A\u0003A\u03cc\bA\u0001B\u0001B\u0001C\u0001"+
		"C\u0003C\u03d2\bC\u0001C\u0001C\u0001C\u0001C\u0003C\u03d8\bC\u0001D\u0005"+
		"D\u03db\bD\nD\fD\u03de\tD\u0001D\u0001\u03dc\u0000E\u0000\u0002\u0004"+
		"\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \""+
		"$&(*,.02468:<>@BDFHJLNPRTVXZ\\^`bdfhjlnprtvxz|~\u0080\u0082\u0084\u0086"+
		"\u0088\u0000\u0007\u0001\u0000\u001a\u001b\u0001\u0000\u0018\u0019\u0001"+
		"\u0000\u0014\u0016\u0002\u0000\n\u000e%%\u0002\u0000\u0014\u0014\u0017"+
		"#\u0001\u0000\u0006\t\u0001\u0000()\u0473\u0000\u008e\u0001\u0000\u0000"+
		"\u0000\u0002\u0095\u0001\u0000\u0000\u0000\u0004\u0112\u0001\u0000\u0000"+
		"\u0000\u0006\u0158\u0001\u0000\u0000\u0000\b\u015a\u0001\u0000\u0000\u0000"+
		"\n\u0190\u0001\u0000\u0000\u0000\f\u0193\u0001\u0000\u0000\u0000\u000e"+
		"\u01a9\u0001\u0000\u0000\u0000\u0010\u01b4\u0001\u0000\u0000\u0000\u0012"+
		"\u01b6\u0001\u0000\u0000\u0000\u0014\u01c2\u0001\u0000\u0000\u0000\u0016"+
		"\u01c4\u0001\u0000\u0000\u0000\u0018\u01cb\u0001\u0000\u0000\u0000\u001a"+
		"\u01e6\u0001\u0000\u0000\u0000\u001c\u01e8\u0001\u0000\u0000\u0000\u001e"+
		"\u01ec\u0001\u0000\u0000\u0000 \u01ee\u0001\u0000\u0000\u0000\"\u01f0"+
		"\u0001\u0000\u0000\u0000$\u01f2\u0001\u0000\u0000\u0000&\u01f9\u0001\u0000"+
		"\u0000\u0000(\u01fc\u0001\u0000\u0000\u0000*\u020e\u0001\u0000\u0000\u0000"+
		",\u0220\u0001\u0000\u0000\u0000.\u0232\u0001\u0000\u0000\u00000\u0254"+
		"\u0001\u0000\u0000\u00002\u0258\u0001\u0000\u0000\u00004\u025e\u0001\u0000"+
		"\u0000\u00006\u0268\u0001\u0000\u0000\u00008\u026b\u0001\u0000\u0000\u0000"+
		":\u0275\u0001\u0000\u0000\u0000<\u0278\u0001\u0000\u0000\u0000>\u027e"+
		"\u0001\u0000\u0000\u0000@\u0281\u0001\u0000\u0000\u0000B\u0287\u0001\u0000"+
		"\u0000\u0000D\u02c2\u0001\u0000\u0000\u0000F\u02c5\u0001\u0000\u0000\u0000"+
		"H\u02cb\u0001\u0000\u0000\u0000J\u02ce\u0001\u0000\u0000\u0000L\u02d9"+
		"\u0001\u0000\u0000\u0000N\u0304\u0001\u0000\u0000\u0000P\u0306\u0001\u0000"+
		"\u0000\u0000R\u0328\u0001\u0000\u0000\u0000T\u032c\u0001\u0000\u0000\u0000"+
		"V\u0331\u0001\u0000\u0000\u0000X\u0334\u0001\u0000\u0000\u0000Z\u0336"+
		"\u0001\u0000\u0000\u0000\\\u0340\u0001\u0000\u0000\u0000^\u0344\u0001"+
		"\u0000\u0000\u0000`\u035c\u0001\u0000\u0000\u0000b\u0368\u0001\u0000\u0000"+
		"\u0000d\u0375\u0001\u0000\u0000\u0000f\u0378\u0001\u0000\u0000\u0000h"+
		"\u037c\u0001\u0000\u0000\u0000j\u037e\u0001\u0000\u0000\u0000l\u0389\u0001"+
		"\u0000\u0000\u0000n\u038d\u0001\u0000\u0000\u0000p\u0396\u0001\u0000\u0000"+
		"\u0000r\u03ab\u0001\u0000\u0000\u0000t\u03b0\u0001\u0000\u0000\u0000v"+
		"\u03b3\u0001\u0000\u0000\u0000x\u03b8\u0001\u0000\u0000\u0000z\u03bd\u0001"+
		"\u0000\u0000\u0000|\u03c2\u0001\u0000\u0000\u0000~\u03c6\u0001\u0000\u0000"+
		"\u0000\u0080\u03c8\u0001\u0000\u0000\u0000\u0082\u03cb\u0001\u0000\u0000"+
		"\u0000\u0084\u03cd\u0001\u0000\u0000\u0000\u0086\u03cf\u0001\u0000\u0000"+
		"\u0000\u0088\u03dc\u0001\u0000\u0000\u0000\u008a\u008b\u0003\u0002\u0001"+
		"\u0000\u008b\u008c\u0005\u0000\u0000\u0001\u008c\u008f\u0001\u0000\u0000"+
		"\u0000\u008d\u008f\u0005\u0000\u0000\u0001\u008e\u008a\u0001\u0000\u0000"+
		"\u0000\u008e\u008d\u0001\u0000\u0000\u0000\u008f\u0001\u0001\u0000\u0000"+
		"\u0000\u0090\u0094\u0003\n\u0005\u0000\u0091\u0094\u0003j5\u0000\u0092"+
		"\u0094\u0003\u0084B\u0000\u0093\u0090\u0001\u0000\u0000\u0000\u0093\u0091"+
		"\u0001\u0000\u0000\u0000\u0093\u0092\u0001\u0000\u0000\u0000\u0094\u0097"+
		"\u0001\u0000\u0000\u0000\u0095\u0093\u0001\u0000\u0000\u0000\u0095\u0096"+
		"\u0001\u0000\u0000\u0000\u0096\u0003\u0001\u0000\u0000\u0000\u0097\u0095"+
		"\u0001\u0000\u0000\u0000\u0098\u009a\u0003\u001e\u000f\u0000\u0099\u009b"+
		"\u0003\u0084B\u0000\u009a\u0099\u0001\u0000\u0000\u0000\u009a\u009b\u0001"+
		"\u0000\u0000\u0000\u009b\u009c\u0001\u0000\u0000\u0000\u009c\u009e\u0003"+
		"$\u0012\u0000\u009d\u009f\u0003\u0084B\u0000\u009e\u009d\u0001\u0000\u0000"+
		"\u0000\u009e\u009f\u0001\u0000\u0000\u0000\u009f\u00a0\u0001\u0000\u0000"+
		"\u0000\u00a0\u00a2\u0003\b\u0004\u0000\u00a1\u00a3\u0003\u0084B\u0000"+
		"\u00a2\u00a1\u0001\u0000\u0000\u0000\u00a2\u00a3\u0001\u0000\u0000\u0000"+
		"\u00a3\u00a4\u0001\u0000\u0000\u0000\u00a4\u00a6\u0005\u001d\u0000\u0000"+
		"\u00a5\u00a7\u0003\u0084B\u0000\u00a6\u00a5\u0001\u0000\u0000\u0000\u00a6"+
		"\u00a7\u0001\u0000\u0000\u0000\u00a7\u00a8\u0001\u0000\u0000\u0000\u00a8"+
		"\u00a9\u0003\u0082A\u0000\u00a9\u00aa\u0003j5\u0000\u00aa\u0113\u0001"+
		"\u0000\u0000\u0000\u00ab\u00ad\u0003\u001e\u000f\u0000\u00ac\u00ae\u0003"+
		"\u0084B\u0000\u00ad\u00ac\u0001\u0000\u0000\u0000\u00ad\u00ae\u0001\u0000"+
		"\u0000\u0000\u00ae\u00af\u0001\u0000\u0000\u0000\u00af\u00b1\u0003$\u0012"+
		"\u0000\u00b0\u00b2\u0003\u0084B\u0000\u00b1\u00b0\u0001\u0000\u0000\u0000"+
		"\u00b1\u00b2\u0001\u0000\u0000\u0000\u00b2\u00b3\u0001\u0000\u0000\u0000"+
		"\u00b3\u00b5\u0003\b\u0004\u0000\u00b4\u00b6\u0003\u0084B\u0000\u00b5"+
		"\u00b4\u0001\u0000\u0000\u0000\u00b5\u00b6\u0001\u0000\u0000\u0000\u00b6"+
		"\u00b7\u0001\u0000\u0000\u0000\u00b7\u00b9\u0005\u001c\u0000\u0000\u00b8"+
		"\u00ba\u0003\u0084B\u0000\u00b9\u00b8\u0001\u0000\u0000\u0000\u00b9\u00ba"+
		"\u0001\u0000\u0000\u0000\u00ba\u00bb\u0001\u0000\u0000\u0000\u00bb\u00bd"+
		"\u0003\b\u0004\u0000\u00bc\u00be\u0003\u0084B\u0000\u00bd\u00bc\u0001"+
		"\u0000\u0000\u0000\u00bd\u00be\u0001\u0000\u0000\u0000\u00be\u00bf\u0001"+
		"\u0000\u0000\u0000\u00bf\u00c0\u0005\u001d\u0000\u0000\u00c0\u00c1\u0003"+
		"\u0082A\u0000\u00c1\u00c2\u0003j5\u0000\u00c2\u0113\u0001\u0000\u0000"+
		"\u0000\u00c3\u00c5\u0003\u001e\u000f\u0000\u00c4\u00c6\u0003\u0084B\u0000"+
		"\u00c5\u00c4\u0001\u0000\u0000\u0000\u00c5\u00c6\u0001\u0000\u0000\u0000"+
		"\u00c6\u00c7\u0001\u0000\u0000\u0000\u00c7\u00c9\u0003$\u0012\u0000\u00c8"+
		"\u00ca\u0003\u0084B\u0000\u00c9\u00c8\u0001\u0000\u0000\u0000\u00c9\u00ca"+
		"\u0001\u0000\u0000\u0000\u00ca\u00cb\u0001\u0000\u0000\u0000\u00cb\u00cd"+
		"\u0003\b\u0004\u0000\u00cc\u00ce\u0003\u0084B\u0000\u00cd\u00cc\u0001"+
		"\u0000\u0000\u0000\u00cd\u00ce\u0001\u0000\u0000\u0000\u00ce\u00cf\u0001"+
		"\u0000\u0000\u0000\u00cf\u00d1\u0005\u001c\u0000\u0000\u00d0\u00d2\u0003"+
		"\u0084B\u0000\u00d1\u00d0\u0001\u0000\u0000\u0000\u00d1\u00d2\u0001\u0000"+
		"\u0000\u0000\u00d2\u00d3\u0001\u0000\u0000\u0000\u00d3\u00d4\u0003\u0004"+
		"\u0002\u0000\u00d4\u0113\u0001\u0000\u0000\u0000\u00d5\u00d7\u0003 \u0010"+
		"\u0000\u00d6\u00d8\u0003\u0084B\u0000\u00d7\u00d6\u0001\u0000\u0000\u0000"+
		"\u00d7\u00d8\u0001\u0000\u0000\u0000\u00d8\u00d9\u0001\u0000\u0000\u0000"+
		"\u00d9\u00db\u0003T*\u0000\u00da\u00dc\u0003\u0084B\u0000\u00db\u00da"+
		"\u0001\u0000\u0000\u0000\u00db\u00dc\u0001\u0000\u0000\u0000\u00dc\u00dd"+
		"\u0001\u0000\u0000\u0000\u00dd\u00df\u0003\b\u0004\u0000\u00de\u00e0\u0003"+
		"\u0084B\u0000\u00df\u00de\u0001\u0000\u0000\u0000\u00df\u00e0\u0001\u0000"+
		"\u0000\u0000\u00e0\u00e1\u0001\u0000\u0000\u0000\u00e1\u00e3\u0005\u001d"+
		"\u0000\u0000\u00e2\u00e4\u0003\u0084B\u0000\u00e3\u00e2\u0001\u0000\u0000"+
		"\u0000\u00e3\u00e4\u0001\u0000\u0000\u0000\u00e4\u00e5\u0001\u0000\u0000"+
		"\u0000\u00e5\u00e6\u0003\u0082A\u0000\u00e6\u00e7\u0003j5\u0000\u00e7"+
		"\u0113\u0001\u0000\u0000\u0000\u00e8\u00ea\u0003 \u0010\u0000\u00e9\u00eb"+
		"\u0003\u0084B\u0000\u00ea\u00e9\u0001\u0000\u0000\u0000\u00ea\u00eb\u0001"+
		"\u0000\u0000\u0000\u00eb\u00ec\u0001\u0000\u0000\u0000\u00ec\u00ee\u0003"+
		"T*\u0000\u00ed\u00ef\u0003\u0084B\u0000\u00ee\u00ed\u0001\u0000\u0000"+
		"\u0000\u00ee\u00ef\u0001\u0000\u0000\u0000\u00ef\u00f0\u0001\u0000\u0000"+
		"\u0000\u00f0\u00f2\u0003\b\u0004\u0000\u00f1\u00f3\u0003\u0084B\u0000"+
		"\u00f2\u00f1\u0001\u0000\u0000\u0000\u00f2\u00f3\u0001\u0000\u0000\u0000"+
		"\u00f3\u00f4\u0001\u0000\u0000\u0000\u00f4\u00f6\u0005\u001c\u0000\u0000"+
		"\u00f5\u00f7\u0003\u0084B\u0000\u00f6\u00f5\u0001\u0000\u0000\u0000\u00f6"+
		"\u00f7\u0001\u0000\u0000\u0000\u00f7\u00f8\u0001\u0000\u0000\u0000\u00f8"+
		"\u00fa\u0003\b\u0004\u0000\u00f9\u00fb\u0003\u0084B\u0000\u00fa\u00f9"+
		"\u0001\u0000\u0000\u0000\u00fa\u00fb\u0001\u0000\u0000\u0000\u00fb\u00fc"+
		"\u0001\u0000\u0000\u0000\u00fc\u00fd\u0005\u001d\u0000\u0000\u00fd\u00fe"+
		"\u0003\u0082A\u0000\u00fe\u00ff\u0003j5\u0000\u00ff\u0113\u0001\u0000"+
		"\u0000\u0000\u0100\u0102\u0003 \u0010\u0000\u0101\u0103\u0003\u0084B\u0000"+
		"\u0102\u0101\u0001\u0000\u0000\u0000\u0102\u0103\u0001\u0000\u0000\u0000"+
		"\u0103\u0104\u0001\u0000\u0000\u0000\u0104\u0106\u0003T*\u0000\u0105\u0107"+
		"\u0003\u0084B\u0000\u0106\u0105\u0001\u0000\u0000\u0000\u0106\u0107\u0001"+
		"\u0000\u0000\u0000\u0107\u0108\u0001\u0000\u0000\u0000\u0108\u010a\u0003"+
		"\b\u0004\u0000\u0109\u010b\u0003\u0084B\u0000\u010a\u0109\u0001\u0000"+
		"\u0000\u0000\u010a\u010b\u0001\u0000\u0000\u0000\u010b\u010c\u0001\u0000"+
		"\u0000\u0000\u010c\u010e\u0005\u001c\u0000\u0000\u010d\u010f\u0003\u0084"+
		"B\u0000\u010e\u010d\u0001\u0000\u0000\u0000\u010e\u010f\u0001\u0000\u0000"+
		"\u0000\u010f\u0110\u0001\u0000\u0000\u0000\u0110\u0111\u0003\u0004\u0002"+
		"\u0000\u0111\u0113\u0001\u0000\u0000\u0000\u0112\u0098\u0001\u0000\u0000"+
		"\u0000\u0112\u00ab\u0001\u0000\u0000\u0000\u0112\u00c3\u0001\u0000\u0000"+
		"\u0000\u0112\u00d5\u0001\u0000\u0000\u0000\u0112\u00e8\u0001\u0000\u0000"+
		"\u0000\u0112\u0100\u0001\u0000\u0000\u0000\u0113\u0005\u0001\u0000\u0000"+
		"\u0000\u0114\u0116\u0003\u001e\u000f\u0000\u0115\u0117\u0003\u0084B\u0000"+
		"\u0116\u0115\u0001\u0000\u0000\u0000\u0116\u0117\u0001\u0000\u0000\u0000"+
		"\u0117\u0118\u0001\u0000\u0000\u0000\u0118\u0119\u0003$\u0012\u0000\u0119"+
		"\u011a\u0005&\u0000\u0000\u011a\u011b\u0003^/\u0000\u011b\u011c\u0005"+
		"\u001d\u0000\u0000\u011c\u011d\u0003\u0082A\u0000\u011d\u0159\u0001\u0000"+
		"\u0000\u0000\u011e\u0120\u0003\u001e\u000f\u0000\u011f\u0121\u0003\u0084"+
		"B\u0000\u0120\u011f\u0001\u0000\u0000\u0000\u0120\u0121\u0001\u0000\u0000"+
		"\u0000\u0121\u0122\u0001\u0000\u0000\u0000\u0122\u0123\u0003$\u0012\u0000"+
		"\u0123\u0124\u0005&\u0000\u0000\u0124\u0125\u0003^/\u0000\u0125\u0126"+
		"\u0005\u001c\u0000\u0000\u0126\u0127\u0005&\u0000\u0000\u0127\u0128\u0003"+
		"^/\u0000\u0128\u0129\u0005\u001d\u0000\u0000\u0129\u012a\u0003\u0082A"+
		"\u0000\u012a\u0159\u0001\u0000\u0000\u0000\u012b\u012d\u0003\u001e\u000f"+
		"\u0000\u012c\u012e\u0003\u0084B\u0000\u012d\u012c\u0001\u0000\u0000\u0000"+
		"\u012d\u012e\u0001\u0000\u0000\u0000\u012e\u012f\u0001\u0000\u0000\u0000"+
		"\u012f\u0130\u0003$\u0012\u0000\u0130\u0131\u0005&\u0000\u0000\u0131\u0132"+
		"\u0003^/\u0000\u0132\u0133\u0005\u001c\u0000\u0000\u0133\u0134\u0005&"+
		"\u0000\u0000\u0134\u0135\u0003\u0006\u0003\u0000\u0135\u0159\u0001\u0000"+
		"\u0000\u0000\u0136\u0138\u0003 \u0010\u0000\u0137\u0139\u0003\u0084B\u0000"+
		"\u0138\u0137\u0001\u0000\u0000\u0000\u0138\u0139\u0001\u0000\u0000\u0000"+
		"\u0139\u013a\u0001\u0000\u0000\u0000\u013a\u013b\u0003T*\u0000\u013b\u013c"+
		"\u0005&\u0000\u0000\u013c\u013d\u0003^/\u0000\u013d\u013e\u0005\u001d"+
		"\u0000\u0000\u013e\u013f\u0003\u0082A\u0000\u013f\u0159\u0001\u0000\u0000"+
		"\u0000\u0140\u0142\u0003 \u0010\u0000\u0141\u0143\u0003\u0084B\u0000\u0142"+
		"\u0141\u0001\u0000\u0000\u0000\u0142\u0143\u0001\u0000\u0000\u0000\u0143"+
		"\u0144\u0001\u0000\u0000\u0000\u0144\u0145\u0003T*\u0000\u0145\u0146\u0005"+
		"&\u0000\u0000\u0146\u0147\u0003^/\u0000\u0147\u0148\u0005\u001c\u0000"+
		"\u0000\u0148\u0149\u0005&\u0000\u0000\u0149\u014a\u0003^/\u0000\u014a"+
		"\u014b\u0005\u001d\u0000\u0000\u014b\u014c\u0003\u0082A\u0000\u014c\u0159"+
		"\u0001\u0000\u0000\u0000\u014d\u014f\u0003 \u0010\u0000\u014e\u0150\u0003"+
		"\u0084B\u0000\u014f\u014e\u0001\u0000\u0000\u0000\u014f\u0150\u0001\u0000"+
		"\u0000\u0000\u0150\u0151\u0001\u0000\u0000\u0000\u0151\u0152\u0003T*\u0000"+
		"\u0152\u0153\u0005&\u0000\u0000\u0153\u0154\u0003^/\u0000\u0154\u0155"+
		"\u0005\u001c\u0000\u0000\u0155\u0156\u0005&\u0000\u0000\u0156\u0157\u0003"+
		"\u0006\u0003\u0000\u0157\u0159\u0001\u0000\u0000\u0000\u0158\u0114\u0001"+
		"\u0000\u0000\u0000\u0158\u011e\u0001\u0000\u0000\u0000\u0158\u012b\u0001"+
		"\u0000\u0000\u0000\u0158\u0136\u0001\u0000\u0000\u0000\u0158\u0140\u0001"+
		"\u0000\u0000\u0000\u0158\u014d\u0001\u0000\u0000\u0000\u0159\u0007\u0001"+
		"\u0000\u0000\u0000\u015a\u015b\u0003\u0082A\u0000\u015b\u015c\u0003j5"+
		"\u0000\u015c\u015d\u0003\u0002\u0001\u0000\u015d\t\u0001\u0000\u0000\u0000"+
		"\u015e\u0160\u0003\u0084B\u0000\u015f\u015e\u0001\u0000\u0000\u0000\u015f"+
		"\u0160\u0001\u0000\u0000\u0000\u0160\u0161\u0001\u0000\u0000\u0000\u0161"+
		"\u0191\u0005*\u0000\u0000\u0162\u0164\u0003\u0084B\u0000\u0163\u0162\u0001"+
		"\u0000\u0000\u0000\u0163\u0164\u0001\u0000\u0000\u0000\u0164\u0165\u0001"+
		"\u0000\u0000\u0000\u0165\u0191\u0003\u0004\u0002\u0000\u0166\u0168\u0003"+
		"\u0084B\u0000\u0167\u0166\u0001\u0000\u0000\u0000\u0167\u0168\u0001\u0000"+
		"\u0000\u0000\u0168\u0169\u0001\u0000\u0000\u0000\u0169\u0191\u0003\f\u0006"+
		"\u0000\u016a\u016c\u0003\u0084B\u0000\u016b\u016a\u0001\u0000\u0000\u0000"+
		"\u016b\u016c\u0001\u0000\u0000\u0000\u016c\u016d\u0001\u0000\u0000\u0000"+
		"\u016d\u0191\u0003\u0012\t\u0000\u016e\u0170\u0003\u0084B\u0000\u016f"+
		"\u016e\u0001\u0000\u0000\u0000\u016f\u0170\u0001\u0000\u0000\u0000\u0170"+
		"\u0171\u0001\u0000\u0000\u0000\u0171\u0172\u0003\u0014\n\u0000\u0172\u0173"+
		"\u0003j5\u0000\u0173\u0191\u0001\u0000\u0000\u0000\u0174\u0176\u0003\u0084"+
		"B\u0000\u0175\u0174\u0001\u0000\u0000\u0000\u0175\u0176\u0001\u0000\u0000"+
		"\u0000\u0176\u0177\u0001\u0000\u0000\u0000\u0177\u0191\u0003\u0016\u000b"+
		"\u0000\u0178\u017a\u0003\u0084B\u0000\u0179\u0178\u0001\u0000\u0000\u0000"+
		"\u0179\u017a\u0001\u0000\u0000\u0000\u017a\u017b\u0001\u0000\u0000\u0000"+
		"\u017b\u017c\u0003\u001a\r\u0000\u017c\u017d\u0003j5\u0000\u017d\u0191"+
		"\u0001\u0000\u0000\u0000\u017e\u0180\u0003\u0084B\u0000\u017f\u017e\u0001"+
		"\u0000\u0000\u0000\u017f\u0180\u0001\u0000\u0000\u0000\u0180\u0181\u0001"+
		"\u0000\u0000\u0000\u0181\u0182\u0003D\"\u0000\u0182\u0183\u0003j5\u0000"+
		"\u0183\u0191\u0001\u0000\u0000\u0000\u0184\u0186\u0003\u0084B\u0000\u0185"+
		"\u0184\u0001\u0000\u0000\u0000\u0185\u0186\u0001\u0000\u0000\u0000\u0186"+
		"\u0187\u0001\u0000\u0000\u0000\u0187\u0191\u0003N\'\u0000\u0188\u018a"+
		"\u0003\u0084B\u0000\u0189\u0188\u0001\u0000\u0000\u0000\u0189\u018a\u0001"+
		"\u0000\u0000\u0000\u018a\u018b\u0001\u0000\u0000\u0000\u018b\u0191\u0003"+
		"\u0086C\u0000\u018c\u018e\u0003\u0084B\u0000\u018d\u018c\u0001\u0000\u0000"+
		"\u0000\u018d\u018e\u0001\u0000\u0000\u0000\u018e\u018f\u0001\u0000\u0000"+
		"\u0000\u018f\u0191\u0003b1\u0000\u0190\u015f\u0001\u0000\u0000\u0000\u0190"+
		"\u0163\u0001\u0000\u0000\u0000\u0190\u0167\u0001\u0000\u0000\u0000\u0190"+
		"\u016b\u0001\u0000\u0000\u0000\u0190\u016f\u0001\u0000\u0000\u0000\u0190"+
		"\u0175\u0001\u0000\u0000\u0000\u0190\u0179\u0001\u0000\u0000\u0000\u0190"+
		"\u017f\u0001\u0000\u0000\u0000\u0190\u0185\u0001\u0000\u0000\u0000\u0190"+
		"\u0189\u0001\u0000\u0000\u0000\u0190\u018d\u0001\u0000\u0000\u0000\u0191"+
		"\u000b\u0001\u0000\u0000\u0000\u0192\u0194\u0003d2\u0000\u0193\u0192\u0001"+
		"\u0000\u0000\u0000\u0193\u0194\u0001\u0000\u0000\u0000\u0194\u0195\u0001"+
		"\u0000\u0000\u0000\u0195\u0196\u0005\"\u0000\u0000\u0196\u0197\u0003\u0084"+
		"B\u0000\u0197\u0199\u0003T*\u0000\u0198\u019a\u0003\u0084B\u0000\u0199"+
		"\u0198\u0001\u0000\u0000\u0000\u0199\u019a\u0001\u0000\u0000\u0000\u019a"+
		"\u019c\u0001\u0000\u0000\u0000\u019b\u019d\u0005\u0001\u0000\u0000\u019c"+
		"\u019b\u0001\u0000\u0000\u0000\u019c\u019d\u0001\u0000\u0000\u0000\u019d"+
		"\u019f\u0001\u0000\u0000\u0000\u019e\u01a0\u0003\u0084B\u0000\u019f\u019e"+
		"\u0001\u0000\u0000\u0000\u019f\u01a0\u0001\u0000\u0000\u0000\u01a0\u01a1"+
		"\u0001\u0000\u0000\u0000\u01a1\u01a2\u0003\u000e\u0007\u0000\u01a2\u01a3"+
		"\u0005\u0017\u0000\u0000\u01a3\u01a4\u0003j5\u0000\u01a4\r\u0001\u0000"+
		"\u0000\u0000\u01a5\u01a8\u0003\f\u0006\u0000\u01a6\u01a8\u0003\u0010\b"+
		"\u0000\u01a7\u01a5\u0001\u0000\u0000\u0000\u01a7\u01a6\u0001\u0000\u0000"+
		"\u0000\u01a8\u01ab\u0001\u0000\u0000\u0000\u01a9\u01a7\u0001\u0000\u0000"+
		"\u0000\u01a9\u01aa\u0001\u0000\u0000\u0000\u01aa\u000f\u0001\u0000\u0000"+
		"\u0000\u01ab\u01a9\u0001\u0000\u0000\u0000\u01ac\u01ad\u0003\u0082A\u0000"+
		"\u01ad\u01ae\u0003j5\u0000\u01ae\u01b5\u0001\u0000\u0000\u0000\u01af\u01b0"+
		"\u0003\u0082A\u0000\u01b0\u01b1\u0003j5\u0000\u01b1\u01b2\u00030\u0018"+
		"\u0000\u01b2\u01b3\u0003j5\u0000\u01b3\u01b5\u0001\u0000\u0000\u0000\u01b4"+
		"\u01ac\u0001\u0000\u0000\u0000\u01b4\u01af\u0001\u0000\u0000\u0000\u01b5"+
		"\u0011\u0001\u0000\u0000\u0000\u01b6\u01b7\u0003\"\u0011\u0000\u01b7\u01b8"+
		"\u0003(\u0014\u0000\u01b8\u01b9\u0003j5\u0000\u01b9\u0013\u0001\u0000"+
		"\u0000\u0000\u01ba\u01c3\u0005\u001f\u0000\u0000\u01bb\u01c3\u0005 \u0000"+
		"\u0000\u01bc\u01c0\u0003\u001c\u000e\u0000\u01bd\u01be\u0003\u0084B\u0000"+
		"\u01be\u01bf\u0003Z-\u0000\u01bf\u01c1\u0001\u0000\u0000\u0000\u01c0\u01bd"+
		"\u0001\u0000\u0000\u0000\u01c0\u01c1\u0001\u0000\u0000\u0000\u01c1\u01c3"+
		"\u0001\u0000\u0000\u0000\u01c2\u01ba\u0001\u0000\u0000\u0000\u01c2\u01bb"+
		"\u0001\u0000\u0000\u0000\u01c2\u01bc\u0001\u0000\u0000\u0000\u01c3\u0015"+
		"\u0001\u0000\u0000\u0000\u01c4\u01c6\u0005#\u0000\u0000\u01c5\u01c7\u0003"+
		"\u0018\f\u0000\u01c6\u01c5\u0001\u0000\u0000\u0000\u01c6\u01c7\u0001\u0000"+
		"\u0000\u0000\u01c7\u01c8\u0001\u0000\u0000\u0000\u01c8\u01c9\u0003\u0082"+
		"A\u0000\u01c9\u01ca\u0003j5\u0000\u01ca\u0017\u0001\u0000\u0000\u0000"+
		"\u01cb\u01cc\u0003\u0084B\u0000\u01cc\u01d0\u0003T*\u0000\u01cd\u01ce"+
		"\u0003\u0084B\u0000\u01ce\u01cf\u0003(\u0014\u0000\u01cf\u01d1\u0001\u0000"+
		"\u0000\u0000\u01d0\u01cd\u0001\u0000\u0000\u0000\u01d0\u01d1\u0001\u0000"+
		"\u0000\u0000\u01d1\u0019\u0001\u0000\u0000\u0000\u01d2\u01d4\u0003T*\u0000"+
		"\u01d3\u01d5\u0003\u0084B\u0000\u01d4\u01d3\u0001\u0000\u0000\u0000\u01d4"+
		"\u01d5\u0001\u0000\u0000\u0000\u01d5\u01d6\u0001\u0000\u0000\u0000\u01d6"+
		"\u01d8\u0005\u0001\u0000\u0000\u01d7\u01d9\u0003,\u0016\u0000\u01d8\u01d7"+
		"\u0001\u0000\u0000\u0000\u01d8\u01d9\u0001\u0000\u0000\u0000\u01d9\u01da"+
		"\u0001\u0000\u0000\u0000\u01da\u01db\u0003\u0082A\u0000\u01db\u01e7\u0001"+
		"\u0000\u0000\u0000\u01dc\u01de\u0003\u001c\u000e\u0000\u01dd\u01df\u0003"+
		"\u0084B\u0000\u01de\u01dd\u0001\u0000\u0000\u0000\u01de\u01df\u0001\u0000"+
		"\u0000\u0000\u01df\u01e0\u0001\u0000\u0000\u0000\u01e0\u01e2\u0005\u0001"+
		"\u0000\u0000\u01e1\u01e3\u0003,\u0016\u0000\u01e2\u01e1\u0001\u0000\u0000"+
		"\u0000\u01e2\u01e3\u0001\u0000\u0000\u0000\u01e3\u01e4\u0001\u0000\u0000"+
		"\u0000\u01e4\u01e5\u0003\u0082A\u0000\u01e5\u01e7\u0001\u0000\u0000\u0000"+
		"\u01e6\u01d2\u0001\u0000\u0000\u0000\u01e6\u01dc\u0001\u0000\u0000\u0000"+
		"\u01e7\u001b\u0001\u0000\u0000\u0000\u01e8\u01e9\u0003d2\u0000\u01e9\u01ea"+
		"\u0003\u0084B\u0000\u01ea\u01eb\u0003T*\u0000\u01eb\u001d\u0001\u0000"+
		"\u0000\u0000\u01ec\u01ed\u0007\u0000\u0000\u0000\u01ed\u001f\u0001\u0000"+
		"\u0000\u0000\u01ee\u01ef\u0007\u0001\u0000\u0000\u01ef!\u0001\u0000\u0000"+
		"\u0000\u01f0\u01f1\u0007\u0002\u0000\u0000\u01f1#\u0001\u0000\u0000\u0000"+
		"\u01f2\u01f3\u0005\n\u0000\u0000\u01f3\u01f4\u0003&\u0013\u0000\u01f4"+
		"\u01f5\u0005\u000e\u0000\u0000\u01f5\u01f6\u0003&\u0013\u0000\u01f6\u01f7"+
		"\u0005\u000b\u0000\u0000\u01f7%\u0001\u0000\u0000\u0000\u01f8\u01fa\u0003"+
		"(\u0014\u0000\u01f9\u01f8\u0001\u0000\u0000\u0000\u01f9\u01fa\u0001\u0000"+
		"\u0000\u0000\u01fa\'\u0001\u0000\u0000\u0000\u01fb\u01fd\u0003\u0084B"+
		"\u0000\u01fc\u01fb\u0001\u0000\u0000\u0000\u01fc\u01fd\u0001\u0000\u0000"+
		"\u0000\u01fd\u01fe\u0001\u0000\u0000\u0000\u01fe\u0200\u00034\u001a\u0000"+
		"\u01ff\u0201\u0003\u0084B\u0000\u0200\u01ff\u0001\u0000\u0000\u0000\u0200"+
		"\u0201\u0001\u0000\u0000\u0000\u0201\u0207\u0001\u0000\u0000\u0000\u0202"+
		"\u0203\u0003\u0084B\u0000\u0203\u0204\u00034\u001a\u0000\u0204\u0206\u0001"+
		"\u0000\u0000\u0000\u0205\u0202\u0001\u0000\u0000\u0000\u0206\u0209\u0001"+
		"\u0000\u0000\u0000\u0207\u0205\u0001\u0000\u0000\u0000\u0207\u0208\u0001"+
		"\u0000\u0000\u0000\u0208\u020b\u0001\u0000\u0000\u0000\u0209\u0207\u0001"+
		"\u0000\u0000\u0000\u020a\u020c\u0003\u0084B\u0000\u020b\u020a\u0001\u0000"+
		"\u0000\u0000\u020b\u020c\u0001\u0000\u0000\u0000\u020c)\u0001\u0000\u0000"+
		"\u0000\u020d\u020f\u0003\u0084B\u0000\u020e\u020d\u0001\u0000\u0000\u0000"+
		"\u020e\u020f\u0001\u0000\u0000\u0000\u020f\u0210\u0001\u0000\u0000\u0000"+
		"\u0210\u0212\u00038\u001c\u0000\u0211\u0213\u0003\u0084B\u0000\u0212\u0211"+
		"\u0001\u0000\u0000\u0000\u0212\u0213\u0001\u0000\u0000\u0000\u0213\u0219"+
		"\u0001\u0000\u0000\u0000\u0214\u0215\u0003\u0084B\u0000\u0215\u0216\u0003"+
		"8\u001c\u0000\u0216\u0218\u0001\u0000\u0000\u0000\u0217\u0214\u0001\u0000"+
		"\u0000\u0000\u0218\u021b\u0001\u0000\u0000\u0000\u0219\u0217\u0001\u0000"+
		"\u0000\u0000\u0219\u021a\u0001\u0000\u0000\u0000\u021a\u021d\u0001\u0000"+
		"\u0000\u0000\u021b\u0219\u0001\u0000\u0000\u0000\u021c\u021e\u0003\u0084"+
		"B\u0000\u021d\u021c\u0001\u0000\u0000\u0000\u021d\u021e\u0001\u0000\u0000"+
		"\u0000\u021e+\u0001\u0000\u0000\u0000\u021f\u0221\u0003\u0084B\u0000\u0220"+
		"\u021f\u0001\u0000\u0000\u0000\u0220\u0221\u0001\u0000\u0000\u0000\u0221"+
		"\u0222\u0001\u0000\u0000\u0000\u0222\u0224\u0003<\u001e\u0000\u0223\u0225"+
		"\u0003\u0084B\u0000\u0224\u0223\u0001\u0000\u0000\u0000\u0224\u0225\u0001"+
		"\u0000\u0000\u0000\u0225\u022b\u0001\u0000\u0000\u0000\u0226\u0227\u0003"+
		"\u0084B\u0000\u0227\u0228\u0003<\u001e\u0000\u0228\u022a\u0001\u0000\u0000"+
		"\u0000\u0229\u0226\u0001\u0000\u0000\u0000\u022a\u022d\u0001\u0000\u0000"+
		"\u0000\u022b\u0229\u0001\u0000\u0000\u0000\u022b\u022c\u0001\u0000\u0000"+
		"\u0000\u022c\u022f\u0001\u0000\u0000\u0000\u022d\u022b\u0001\u0000\u0000"+
		"\u0000\u022e\u0230\u0003\u0084B\u0000\u022f\u022e\u0001\u0000\u0000\u0000"+
		"\u022f\u0230\u0001\u0000\u0000\u0000\u0230-\u0001\u0000\u0000\u0000\u0231"+
		"\u0233\u0003\u0084B\u0000\u0232\u0231\u0001\u0000\u0000\u0000\u0232\u0233"+
		"\u0001\u0000\u0000\u0000\u0233\u0234\u0001\u0000\u0000\u0000\u0234\u0236"+
		"\u0003@ \u0000\u0235\u0237\u0003\u0084B\u0000\u0236\u0235\u0001\u0000"+
		"\u0000\u0000\u0236\u0237\u0001\u0000\u0000\u0000\u0237\u023d\u0001\u0000"+
		"\u0000\u0000\u0238\u0239\u0003\u0084B\u0000\u0239\u023a\u0003@ \u0000"+
		"\u023a\u023c\u0001\u0000\u0000\u0000\u023b\u0238\u0001\u0000\u0000\u0000"+
		"\u023c\u023f\u0001\u0000\u0000\u0000\u023d\u023b\u0001\u0000\u0000\u0000"+
		"\u023d\u023e\u0001\u0000\u0000\u0000\u023e\u0241\u0001\u0000\u0000\u0000"+
		"\u023f\u023d\u0001\u0000\u0000\u0000\u0240\u0242\u0003\u0084B\u0000\u0241"+
		"\u0240\u0001\u0000\u0000\u0000\u0241\u0242\u0001\u0000\u0000\u0000\u0242"+
		"/\u0001\u0000\u0000\u0000\u0243\u0255\u0003j5\u0000\u0244\u0246\u0003"+
		"j5\u0000\u0245\u0244\u0001\u0000\u0000\u0000\u0245\u0246\u0001\u0000\u0000"+
		"\u0000\u0246\u0247\u0001\u0000\u0000\u0000\u0247\u0251\u00032\u0019\u0000"+
		"\u0248\u0249\u0003j5\u0000\u0249\u024a\u00032\u0019\u0000\u024a\u0250"+
		"\u0001\u0000\u0000\u0000\u024b\u0250\u0003j5\u0000\u024c\u024d\u0003\u0084"+
		"B\u0000\u024d\u024e\u0003@ \u0000\u024e\u0250\u0001\u0000\u0000\u0000"+
		"\u024f\u0248\u0001\u0000\u0000\u0000\u024f\u024b\u0001\u0000\u0000\u0000"+
		"\u024f\u024c\u0001\u0000\u0000\u0000\u0250\u0253\u0001\u0000\u0000\u0000"+
		"\u0251\u024f\u0001\u0000\u0000\u0000\u0251\u0252\u0001\u0000\u0000\u0000"+
		"\u0252\u0255\u0001\u0000\u0000\u0000\u0253\u0251\u0001\u0000\u0000\u0000"+
		"\u0254\u0243\u0001\u0000\u0000\u0000\u0254\u0245\u0001\u0000\u0000\u0000"+
		"\u02551\u0001\u0000\u0000\u0000\u0256\u0259\u0003r9\u0000\u0257\u0259"+
		"\u0003D\"\u0000\u0258\u0256\u0001\u0000\u0000\u0000\u0258\u0257\u0001"+
		"\u0000\u0000\u0000\u0259\u025b\u0001\u0000\u0000\u0000\u025a\u025c\u0003"+
		"@ \u0000\u025b\u025a\u0001\u0000\u0000\u0000\u025b\u025c\u0001\u0000\u0000"+
		"\u0000\u025c3\u0001\u0000\u0000\u0000\u025d\u025f\u00036\u001b\u0000\u025e"+
		"\u025d\u0001\u0000\u0000\u0000\u025f\u0260\u0001\u0000\u0000\u0000\u0260"+
		"\u025e\u0001\u0000\u0000\u0000\u0260\u0261\u0001\u0000\u0000\u0000\u0261"+
		"5\u0001\u0000\u0000\u0000\u0262\u0269\u0003v;\u0000\u0263\u0269\u0003"+
		"D\"\u0000\u0264\u0265\u0005\n\u0000\u0000\u0265\u0266\u0003*\u0015\u0000"+
		"\u0266\u0267\u0005\u000b\u0000\u0000\u0267\u0269\u0001\u0000\u0000\u0000"+
		"\u0268\u0262\u0001\u0000\u0000\u0000\u0268\u0263\u0001\u0000\u0000\u0000"+
		"\u0268\u0264\u0001\u0000\u0000\u0000\u02697\u0001\u0000\u0000\u0000\u026a"+
		"\u026c\u0003:\u001d\u0000\u026b\u026a\u0001\u0000\u0000\u0000\u026c\u026d"+
		"\u0001\u0000\u0000\u0000\u026d\u026b\u0001\u0000\u0000\u0000\u026d\u026e"+
		"\u0001\u0000\u0000\u0000\u026e9\u0001\u0000\u0000\u0000\u026f\u0276\u0003"+
		"x<\u0000\u0270\u0276\u0003D\"\u0000\u0271\u0272\u0005\n\u0000\u0000\u0272"+
		"\u0273\u0003*\u0015\u0000\u0273\u0274\u0005\u000b\u0000\u0000\u0274\u0276"+
		"\u0001\u0000\u0000\u0000\u0275\u026f\u0001\u0000\u0000\u0000\u0275\u0270"+
		"\u0001\u0000\u0000\u0000\u0275\u0271\u0001\u0000\u0000\u0000\u0276;\u0001"+
		"\u0000\u0000\u0000\u0277\u0279\u0003>\u001f\u0000\u0278\u0277\u0001\u0000"+
		"\u0000\u0000\u0279\u027a\u0001\u0000\u0000\u0000\u027a\u0278\u0001\u0000"+
		"\u0000\u0000\u027a\u027b\u0001\u0000\u0000\u0000\u027b=\u0001\u0000\u0000"+
		"\u0000\u027c\u027f\u0003z=\u0000\u027d\u027f\u0003D\"\u0000\u027e\u027c"+
		"\u0001\u0000\u0000\u0000\u027e\u027d\u0001\u0000\u0000\u0000\u027f?\u0001"+
		"\u0000\u0000\u0000\u0280\u0282\u0003B!\u0000\u0281\u0280\u0001\u0000\u0000"+
		"\u0000\u0282\u0283\u0001\u0000\u0000\u0000\u0283\u0281\u0001\u0000\u0000"+
		"\u0000\u0283\u0284\u0001\u0000\u0000\u0000\u0284A\u0001\u0000\u0000\u0000"+
		"\u0285\u0288\u0003|>\u0000\u0286\u0288\u0003D\"\u0000\u0287\u0285\u0001"+
		"\u0000\u0000\u0000\u0287\u0286\u0001\u0000\u0000\u0000\u0288C\u0001\u0000"+
		"\u0000\u0000\u0289\u02c3\u0005\u0004\u0000\u0000\u028a\u028b\u0005\u0002"+
		"\u0000\u0000\u028b\u028c\u0003F#\u0000\u028c\u028d\u0005\u000b\u0000\u0000"+
		"\u028d\u02c3\u0001\u0000\u0000\u0000\u028e\u028f\u0005\u0002\u0000\u0000"+
		"\u028f\u0290\u0003F#\u0000\u0290\u0291\u0003\u0084B\u0000\u0291\u0292"+
		"\u0003J%\u0000\u0292\u0293\u0005\u000b\u0000\u0000\u0293\u02c3\u0001\u0000"+
		"\u0000\u0000\u0294\u0295\u0005\u0002\u0000\u0000\u0295\u0296\u0003F#\u0000"+
		"\u0296\u0297\u0005\u000e\u0000\u0000\u0297\u0298\u0003J%\u0000\u0298\u0299"+
		"\u0005\u000b\u0000\u0000\u0299\u02c3\u0001\u0000\u0000\u0000\u029a\u029b"+
		"\u0005\u0002\u0000\u0000\u029b\u029c\u0003F#\u0000\u029c\u029d\u0005\t"+
		"\u0000\u0000\u029d\u029e\u0003(\u0014\u0000\u029e\u029f\u0005\u000b\u0000"+
		"\u0000\u029f\u02c3\u0001\u0000\u0000\u0000\u02a0\u02a1\u0005\u0002\u0000"+
		"\u0000\u02a1\u02a2\u0003F#\u0000\u02a2\u02a3\u0005\u0001\u0000\u0000\u02a3"+
		"\u02a4\u0003(\u0014\u0000\u02a4\u02a5\u0005\u000b\u0000\u0000\u02a5\u02c3"+
		"\u0001\u0000\u0000\u0000\u02a6\u02a7\u0005\u0003\u0000\u0000\u02a7\u02a8"+
		"\u0003F#\u0000\u02a8\u02a9\u0005\r\u0000\u0000\u02a9\u02c3\u0001\u0000"+
		"\u0000\u0000\u02aa\u02ab\u0005\u0003\u0000\u0000\u02ab\u02ac\u0003F#\u0000"+
		"\u02ac\u02ad\u0003\u0084B\u0000\u02ad\u02ae\u0003J%\u0000\u02ae\u02af"+
		"\u0005\r\u0000\u0000\u02af\u02c3\u0001\u0000\u0000\u0000\u02b0\u02b1\u0005"+
		"\u0003\u0000\u0000\u02b1\u02b2\u0003F#\u0000\u02b2\u02b3\u0005\u000e\u0000"+
		"\u0000\u02b3\u02b4\u0003J%\u0000\u02b4\u02b5\u0005\r\u0000\u0000\u02b5"+
		"\u02c3\u0001\u0000\u0000\u0000\u02b6\u02b7\u0005\u0003\u0000\u0000\u02b7"+
		"\u02b8\u0003F#\u0000\u02b8\u02b9\u0005\t\u0000\u0000\u02b9\u02ba\u0003"+
		"(\u0014\u0000\u02ba\u02bb\u0005\r\u0000\u0000\u02bb\u02c3\u0001\u0000"+
		"\u0000\u0000\u02bc\u02bd\u0005\u0003\u0000\u0000\u02bd\u02be\u0003F#\u0000"+
		"\u02be\u02bf\u0005\u0001\u0000\u0000\u02bf\u02c0\u0003(\u0014\u0000\u02c0"+
		"\u02c1\u0005\r\u0000\u0000\u02c1\u02c3\u0001\u0000\u0000\u0000\u02c2\u0289"+
		"\u0001\u0000\u0000\u0000\u02c2\u028a\u0001\u0000\u0000\u0000\u02c2\u028e"+
		"\u0001\u0000\u0000\u0000\u02c2\u0294\u0001\u0000\u0000\u0000\u02c2\u029a"+
		"\u0001\u0000\u0000\u0000\u02c2\u02a0\u0001\u0000\u0000\u0000\u02c2\u02a6"+
		"\u0001\u0000\u0000\u0000\u02c2\u02aa\u0001\u0000\u0000\u0000\u02c2\u02b0"+
		"\u0001\u0000\u0000\u0000\u02c2\u02b6\u0001\u0000\u0000\u0000\u02c2\u02bc"+
		"\u0001\u0000\u0000\u0000\u02c3E\u0001\u0000\u0000\u0000\u02c4\u02c6\u0003"+
		"H$\u0000\u02c5\u02c4\u0001\u0000\u0000\u0000\u02c6\u02c7\u0001\u0000\u0000"+
		"\u0000\u02c7\u02c5\u0001\u0000\u0000\u0000\u02c7\u02c8\u0001\u0000\u0000"+
		"\u0000\u02c8G\u0001\u0000\u0000\u0000\u02c9\u02cc\u0005%\u0000\u0000\u02ca"+
		"\u02cc\u0003D\"\u0000\u02cb\u02c9\u0001\u0000\u0000\u0000\u02cb\u02ca"+
		"\u0001\u0000\u0000\u0000\u02ccI\u0001\u0000\u0000\u0000\u02cd\u02cf\u0003"+
		"L&\u0000\u02ce\u02cd\u0001\u0000\u0000\u0000\u02ce\u02cf\u0001\u0000\u0000"+
		"\u0000\u02cf\u02d6\u0001\u0000\u0000\u0000\u02d0\u02d2\u0005\u000e\u0000"+
		"\u0000\u02d1\u02d3\u0003L&\u0000\u02d2\u02d1\u0001\u0000\u0000\u0000\u02d2"+
		"\u02d3\u0001\u0000\u0000\u0000\u02d3\u02d5\u0001\u0000\u0000\u0000\u02d4"+
		"\u02d0\u0001\u0000\u0000\u0000\u02d5\u02d8\u0001\u0000\u0000\u0000\u02d6"+
		"\u02d4\u0001\u0000\u0000\u0000\u02d6\u02d7\u0001\u0000\u0000\u0000\u02d7"+
		"K\u0001\u0000\u0000\u0000\u02d8\u02d6\u0001\u0000\u0000\u0000\u02d9\u02da"+
		"\u0003(\u0014\u0000\u02daM\u0001\u0000\u0000\u0000\u02db\u0305\u0003P"+
		"(\u0000\u02dc\u02de\u0003Z-\u0000\u02dd\u02df\u0003\u0084B\u0000\u02de"+
		"\u02dd\u0001\u0000\u0000\u0000\u02de\u02df\u0001\u0000\u0000\u0000\u02df"+
		"\u02e0\u0001\u0000\u0000\u0000\u02e0\u02e2\u0003\u0080@\u0000\u02e1\u02e3"+
		"\u0003\u0084B\u0000\u02e2\u02e1\u0001\u0000\u0000\u0000\u02e2\u02e3\u0001"+
		"\u0000\u0000\u0000\u02e3\u02e4\u0001\u0000\u0000\u0000\u02e4\u02ed\u0003"+
		"V+\u0000\u02e5\u02e7\u0003\u0084B\u0000\u02e6\u02e5\u0001\u0000\u0000"+
		"\u0000\u02e6\u02e7\u0001\u0000\u0000\u0000\u02e7\u02e8\u0001\u0000\u0000"+
		"\u0000\u02e8\u02ea\u0005\u000f\u0000\u0000\u02e9\u02eb\u0003\u0084B\u0000"+
		"\u02ea\u02e9\u0001\u0000\u0000\u0000\u02ea\u02eb\u0001\u0000\u0000\u0000"+
		"\u02eb\u02ec\u0001\u0000\u0000\u0000\u02ec\u02ee\u0003X,\u0000\u02ed\u02e6"+
		"\u0001\u0000\u0000\u0000\u02ed\u02ee\u0001\u0000\u0000\u0000\u02ee\u02f0"+
		"\u0001\u0000\u0000\u0000\u02ef\u02f1\u0003\u0084B\u0000\u02f0\u02ef\u0001"+
		"\u0000\u0000\u0000\u02f0\u02f1\u0001\u0000\u0000\u0000\u02f1\u02f2\u0001"+
		"\u0000\u0000\u0000\u02f2\u02f4\u0005&\u0000\u0000\u02f3\u02f5\u0003\\"+
		".\u0000\u02f4\u02f3\u0001\u0000\u0000\u0000\u02f4\u02f5\u0001\u0000\u0000"+
		"\u0000\u02f5\u0305\u0001\u0000\u0000\u0000\u02f6\u02f8\u0003Z-\u0000\u02f7"+
		"\u02f9\u0003\u0084B\u0000\u02f8\u02f7\u0001\u0000\u0000\u0000\u02f8\u02f9"+
		"\u0001\u0000\u0000\u0000\u02f9\u02fa\u0001\u0000\u0000\u0000\u02fa\u02fc"+
		"\u0003\u0080@\u0000\u02fb\u02fd\u0003\u0084B\u0000\u02fc\u02fb\u0001\u0000"+
		"\u0000\u0000\u02fc\u02fd\u0001\u0000\u0000\u0000\u02fd\u02fe\u0001\u0000"+
		"\u0000\u0000\u02fe\u0300\u0003\u001a\r\u0000\u02ff\u0301\u0003\u0084B"+
		"\u0000\u0300\u02ff\u0001\u0000\u0000\u0000\u0300\u0301\u0001\u0000\u0000"+
		"\u0000\u0301\u0302\u0001\u0000\u0000\u0000\u0302\u0303\u0005&\u0000\u0000"+
		"\u0303\u0305\u0001\u0000\u0000\u0000\u0304\u02db\u0001\u0000\u0000\u0000"+
		"\u0304\u02dc\u0001\u0000\u0000\u0000\u0304\u02f6\u0001\u0000\u0000\u0000"+
		"\u0305O\u0001\u0000\u0000\u0000\u0306\u0308\u0003Z-\u0000\u0307\u0309"+
		"\u0003\u0084B\u0000\u0308\u0307\u0001\u0000\u0000\u0000\u0308\u0309\u0001"+
		"\u0000\u0000\u0000\u0309\u030a\u0001\u0000\u0000\u0000\u030a\u030c\u0003"+
		"\u0080@\u0000\u030b\u030d\u0003\u0084B\u0000\u030c\u030b\u0001\u0000\u0000"+
		"\u0000\u030c\u030d\u0001\u0000\u0000\u0000\u030d\u030e\u0001\u0000\u0000"+
		"\u0000\u030e\u0310\u0003T*\u0000\u030f\u0311\u0003\u0084B\u0000\u0310"+
		"\u030f\u0001\u0000\u0000\u0000\u0310\u0311\u0001\u0000\u0000\u0000\u0311"+
		"\u0312\u0001\u0000\u0000\u0000\u0312\u0314\u0003\u0080@\u0000\u0313\u0315"+
		"\u0003\u0084B\u0000\u0314\u0313\u0001\u0000\u0000\u0000\u0314\u0315\u0001"+
		"\u0000\u0000\u0000\u0315\u0316\u0001\u0000\u0000\u0000\u0316\u031f\u0003"+
		"V+\u0000\u0317\u0319\u0003\u0084B\u0000\u0318\u0317\u0001\u0000\u0000"+
		"\u0000\u0318\u0319\u0001\u0000\u0000\u0000\u0319\u031a\u0001\u0000\u0000"+
		"\u0000\u031a\u031c\u0005\u000f\u0000\u0000\u031b\u031d\u0003\u0084B\u0000"+
		"\u031c\u031b\u0001\u0000\u0000\u0000\u031c\u031d\u0001\u0000\u0000\u0000"+
		"\u031d\u031e\u0001\u0000\u0000\u0000\u031e\u0320\u0003X,\u0000\u031f\u0318"+
		"\u0001\u0000\u0000\u0000\u031f\u0320\u0001\u0000\u0000\u0000\u0320\u0322"+
		"\u0001\u0000\u0000\u0000\u0321\u0323\u0003\u0084B\u0000\u0322\u0321\u0001"+
		"\u0000\u0000\u0000\u0322\u0323\u0001\u0000\u0000\u0000\u0323\u0324\u0001"+
		"\u0000\u0000\u0000\u0324\u0326\u0005&\u0000\u0000\u0325\u0327\u0003\\"+
		".\u0000\u0326\u0325\u0001\u0000\u0000\u0000\u0326\u0327\u0001\u0000\u0000"+
		"\u0000\u0327Q\u0001\u0000\u0000\u0000\u0328\u0329\u0003T*\u0000\u0329"+
		"S\u0001\u0000\u0000\u0000\u032a\u032d\u0003f3\u0000\u032b\u032d\u0003"+
		"D\"\u0000\u032c\u032a\u0001\u0000\u0000\u0000\u032c\u032b\u0001\u0000"+
		"\u0000\u0000\u032d\u032e\u0001\u0000\u0000\u0000\u032e\u032c\u0001\u0000"+
		"\u0000\u0000\u032e\u032f\u0001\u0000\u0000\u0000\u032fU\u0001\u0000\u0000"+
		"\u0000\u0330\u0332\u0003Z-\u0000\u0331\u0330\u0001\u0000\u0000\u0000\u0331"+
		"\u0332\u0001\u0000\u0000\u0000\u0332W\u0001\u0000\u0000\u0000\u0333\u0335"+
		"\u0003Z-\u0000\u0334\u0333\u0001\u0000\u0000\u0000\u0334\u0335\u0001\u0000"+
		"\u0000\u0000\u0335Y\u0001\u0000\u0000\u0000\u0336\u033c\u0003R)\u0000"+
		"\u0337\u0338\u0003\u0084B\u0000\u0338\u0339\u0003R)\u0000\u0339\u033b"+
		"\u0001\u0000\u0000\u0000\u033a\u0337\u0001\u0000\u0000\u0000\u033b\u033e"+
		"\u0001\u0000\u0000\u0000\u033c\u033a\u0001\u0000\u0000\u0000\u033c\u033d"+
		"\u0001\u0000\u0000\u0000\u033d[\u0001\u0000\u0000\u0000\u033e\u033c\u0001"+
		"\u0000\u0000\u0000\u033f\u0341\u0003`0\u0000\u0340\u033f\u0001\u0000\u0000"+
		"\u0000\u0341\u0342\u0001\u0000\u0000\u0000\u0342\u0340\u0001\u0000\u0000"+
		"\u0000\u0342\u0343\u0001\u0000\u0000\u0000\u0343]\u0001\u0000\u0000\u0000"+
		"\u0344\u0346\u0003\u0082A\u0000\u0345\u0347\u0003\\.\u0000\u0346\u0345"+
		"\u0001\u0000\u0000\u0000\u0346\u0347\u0001\u0000\u0000\u0000\u0347_\u0001"+
		"\u0000\u0000\u0000\u0348\u034a\u0005\'\u0000\u0000\u0349\u034b\u0003\u0084"+
		"B\u0000\u034a\u0349\u0001\u0000\u0000\u0000\u034a\u034b\u0001\u0000\u0000"+
		"\u0000\u034b\u034c\u0001\u0000\u0000\u0000\u034c\u034d\u0003.\u0017\u0000"+
		"\u034d\u034e\u0005&\u0000\u0000\u034e\u035d\u0001\u0000\u0000\u0000\u034f"+
		"\u0351\u0005\'\u0000\u0000\u0350\u0352\u0003\u0084B\u0000\u0351\u0350"+
		"\u0001\u0000\u0000\u0000\u0351\u0352\u0001\u0000\u0000\u0000\u0352\u0353"+
		"\u0001\u0000\u0000\u0000\u0353\u0354\u0005*\u0000\u0000\u0354\u035d\u0005"+
		"&\u0000\u0000\u0355\u0357\u0003\u0084B\u0000\u0356\u0355\u0001\u0000\u0000"+
		"\u0000\u0356\u0357\u0001\u0000\u0000\u0000\u0357\u0358\u0001\u0000\u0000"+
		"\u0000\u0358\u0359\u0005*\u0000\u0000\u0359\u035d\u0005&\u0000\u0000\u035a"+
		"\u035d\u0003\u0006\u0003\u0000\u035b\u035d\u0005&\u0000\u0000\u035c\u0348"+
		"\u0001\u0000\u0000\u0000\u035c\u034f\u0001\u0000\u0000\u0000\u035c\u0356"+
		"\u0001\u0000\u0000\u0000\u035c\u035a\u0001\u0000\u0000\u0000\u035c\u035b"+
		"\u0001\u0000\u0000\u0000\u035da\u0001\u0000\u0000\u0000\u035e\u035f\u0005"+
		"!\u0000\u0000\u035f\u0360\u0003\u0084B\u0000\u0360\u0361\u0003T*\u0000"+
		"\u0361\u0369\u0001\u0000\u0000\u0000\u0362\u0363\u0005\u001e\u0000\u0000"+
		"\u0363\u0364\u0003\u0084B\u0000\u0364\u0365\u0005!\u0000\u0000\u0365\u0366"+
		"\u0003\u0084B\u0000\u0366\u0367\u0003T*\u0000\u0367\u0369\u0001\u0000"+
		"\u0000\u0000\u0368\u035e\u0001\u0000\u0000\u0000\u0368\u0362\u0001\u0000"+
		"\u0000\u0000\u0369c\u0001\u0000\u0000\u0000\u036a\u0376\u0005\u001e\u0000"+
		"\u0000\u036b\u0376\u0005\u001f\u0000\u0000\u036c\u0376\u0005 \u0000\u0000"+
		"\u036d\u036e\u0005\u001e\u0000\u0000\u036e\u036f\u0003\u0084B\u0000\u036f"+
		"\u0370\u0005\u001f\u0000\u0000\u0370\u0376\u0001\u0000\u0000\u0000\u0371"+
		"\u0372\u0005\u001f\u0000\u0000\u0372\u0373\u0003\u0084B\u0000\u0373\u0374"+
		"\u0005\u001e\u0000\u0000\u0374\u0376\u0001\u0000\u0000\u0000\u0375\u036a"+
		"\u0001\u0000\u0000\u0000\u0375\u036b\u0001\u0000\u0000\u0000\u0375\u036c"+
		"\u0001\u0000\u0000\u0000\u0375\u036d\u0001\u0000\u0000\u0000\u0375\u0371"+
		"\u0001\u0000\u0000\u0000\u0376e\u0001\u0000\u0000\u0000\u0377\u0379\u0003"+
		"h4\u0000\u0378\u0377\u0001\u0000\u0000\u0000\u0379\u037a\u0001\u0000\u0000"+
		"\u0000\u037a\u0378\u0001\u0000\u0000\u0000\u037a\u037b\u0001\u0000\u0000"+
		"\u0000\u037bg\u0001\u0000\u0000\u0000\u037c\u037d\u0007\u0003\u0000\u0000"+
		"\u037di\u0001\u0000\u0000\u0000\u037e\u037f\u0005&\u0000\u0000\u037fk"+
		"\u0001\u0000\u0000\u0000\u0380\u038a\u0005%\u0000\u0000\u0381\u038a\u0005"+
		"\u0010\u0000\u0000\u0382\u038a\u0005\u0001\u0000\u0000\u0383\u038a\u0005"+
		"\t\u0000\u0000\u0384\u038a\u0005\u0005\u0000\u0000\u0385\u038a\u0005\u0011"+
		"\u0000\u0000\u0386\u038a\u0005\u0012\u0000\u0000\u0387\u038a\u0005\u0013"+
		"\u0000\u0000\u0388\u038a\u0003~?\u0000\u0389\u0380\u0001\u0000\u0000\u0000"+
		"\u0389\u0381\u0001\u0000\u0000\u0000\u0389\u0382\u0001\u0000\u0000\u0000"+
		"\u0389\u0383\u0001\u0000\u0000\u0000\u0389\u0384\u0001\u0000\u0000\u0000"+
		"\u0389\u0385\u0001\u0000\u0000\u0000\u0389\u0386\u0001\u0000\u0000\u0000"+
		"\u0389\u0387\u0001\u0000\u0000\u0000\u0389\u0388\u0001\u0000\u0000\u0000"+
		"\u038am\u0001\u0000\u0000\u0000\u038b\u038e\u0003l6\u0000\u038c\u038e"+
		"\u0005\u000e\u0000\u0000\u038d\u038b\u0001\u0000\u0000\u0000\u038d\u038c"+
		"\u0001\u0000\u0000\u0000\u038eo\u0001\u0000\u0000\u0000\u038f\u0397\u0003"+
		"n7\u0000\u0390\u0397\u0005\n\u0000\u0000\u0391\u0397\u0005\u000b\u0000"+
		"\u0000\u0392\u0397\u0005\f\u0000\u0000\u0393\u0397\u0005\r\u0000\u0000"+
		"\u0394\u0397\u0005\u000f\u0000\u0000\u0395\u0397\u0003~?\u0000\u0396\u038f"+
		"\u0001\u0000\u0000\u0000\u0396\u0390\u0001\u0000\u0000\u0000\u0396\u0391"+
		"\u0001\u0000\u0000\u0000\u0396\u0392\u0001\u0000\u0000\u0000\u0396\u0393"+
		"\u0001\u0000\u0000\u0000\u0396\u0394\u0001\u0000\u0000\u0000\u0396\u0395"+
		"\u0001\u0000\u0000\u0000\u0397q\u0001\u0000\u0000\u0000\u0398\u03ac\u0003"+
		"l6\u0000\u0399\u03ac\u0005\n\u0000\u0000\u039a\u03ac\u0005\u000b\u0000"+
		"\u0000\u039b\u03ac\u0005\f\u0000\u0000\u039c\u03ac\u0005\r\u0000\u0000"+
		"\u039d\u03ac\u0005\u000e\u0000\u0000\u039e\u03ac\u0005*\u0000\u0000\u039f"+
		"\u03ac\u0005\u0014\u0000\u0000\u03a0\u03ac\u0005\u001e\u0000\u0000\u03a1"+
		"\u03ac\u0005\u001f\u0000\u0000\u03a2\u03ac\u0005 \u0000\u0000\u03a3\u03ac"+
		"\u0005\u0018\u0000\u0000\u03a4\u03ac\u0005\u0019\u0000\u0000\u03a5\u03ac"+
		"\u0005\u001a\u0000\u0000\u03a6\u03ac\u0005\u001b\u0000\u0000\u03a7\u03ac"+
		"\u0005\u001c\u0000\u0000\u03a8\u03ac\u0005\u001d\u0000\u0000\u03a9\u03ac"+
		"\u0005\"\u0000\u0000\u03aa\u03ac\u0005!\u0000\u0000\u03ab\u0398\u0001"+
		"\u0000\u0000\u0000\u03ab\u0399\u0001\u0000\u0000\u0000\u03ab\u039a\u0001"+
		"\u0000\u0000\u0000\u03ab\u039b\u0001\u0000\u0000\u0000\u03ab\u039c\u0001"+
		"\u0000\u0000\u0000\u03ab\u039d\u0001\u0000\u0000\u0000\u03ab\u039e\u0001"+
		"\u0000\u0000\u0000\u03ab\u039f\u0001\u0000\u0000\u0000\u03ab\u03a0\u0001"+
		"\u0000\u0000\u0000\u03ab\u03a1\u0001\u0000\u0000\u0000\u03ab\u03a2\u0001"+
		"\u0000\u0000\u0000\u03ab\u03a3\u0001\u0000\u0000\u0000\u03ab\u03a4\u0001"+
		"\u0000\u0000\u0000\u03ab\u03a5\u0001\u0000\u0000\u0000\u03ab\u03a6\u0001"+
		"\u0000\u0000\u0000\u03ab\u03a7\u0001\u0000\u0000\u0000\u03ab\u03a8\u0001"+
		"\u0000\u0000\u0000\u03ab\u03a9\u0001\u0000\u0000\u0000\u03ab\u03aa\u0001"+
		"\u0000\u0000\u0000\u03acs\u0001\u0000\u0000\u0000\u03ad\u03b1\u0003p8"+
		"\u0000\u03ae\u03b1\u0005*\u0000\u0000\u03af\u03b1\u0005\u000f\u0000\u0000"+
		"\u03b0\u03ad\u0001\u0000\u0000\u0000\u03b0\u03ae\u0001\u0000\u0000\u0000"+
		"\u03b0\u03af\u0001\u0000\u0000\u0000\u03b1u\u0001\u0000\u0000\u0000\u03b2"+
		"\u03b4\u0003l6\u0000\u03b3\u03b2\u0001\u0000\u0000\u0000\u03b4\u03b5\u0001"+
		"\u0000\u0000\u0000\u03b5\u03b3\u0001\u0000\u0000\u0000\u03b5\u03b6\u0001"+
		"\u0000\u0000\u0000\u03b6w\u0001\u0000\u0000\u0000\u03b7\u03b9\u0003n7"+
		"\u0000\u03b8\u03b7\u0001\u0000\u0000\u0000\u03b9\u03ba\u0001\u0000\u0000"+
		"\u0000\u03ba\u03b8\u0001\u0000\u0000\u0000\u03ba\u03bb\u0001\u0000\u0000"+
		"\u0000\u03bby\u0001\u0000\u0000\u0000\u03bc\u03be\u0003p8\u0000\u03bd"+
		"\u03bc\u0001\u0000\u0000\u0000\u03be\u03bf\u0001\u0000\u0000\u0000\u03bf"+
		"\u03bd\u0001\u0000\u0000\u0000\u03bf\u03c0\u0001\u0000\u0000\u0000\u03c0"+
		"{\u0001\u0000\u0000\u0000\u03c1\u03c3\u0003t:\u0000\u03c2\u03c1\u0001"+
		"\u0000\u0000\u0000\u03c3\u03c4\u0001\u0000\u0000\u0000\u03c4\u03c2\u0001"+
		"\u0000\u0000\u0000\u03c4\u03c5\u0001\u0000\u0000\u0000\u03c5}\u0001\u0000"+
		"\u0000\u0000\u03c6\u03c7\u0007\u0004\u0000\u0000\u03c7\u007f\u0001\u0000"+
		"\u0000\u0000\u03c8\u03c9\u0007\u0005\u0000\u0000\u03c9\u0081\u0001\u0000"+
		"\u0000\u0000\u03ca\u03cc\u0005*\u0000\u0000\u03cb\u03ca\u0001\u0000\u0000"+
		"\u0000\u03cb\u03cc\u0001\u0000\u0000\u0000\u03cc\u0083\u0001\u0000\u0000"+
		"\u0000\u03cd\u03ce\u0007\u0006\u0000\u0000\u03ce\u0085\u0001\u0000\u0000"+
		"\u0000\u03cf\u03d1\u0005$\u0000\u0000\u03d0\u03d2\u0003\u0084B\u0000\u03d1"+
		"\u03d0\u0001\u0000\u0000\u0000\u03d1\u03d2\u0001\u0000\u0000\u0000\u03d2"+
		"\u03d3\u0001\u0000\u0000\u0000\u03d3\u03d4\u0005\f\u0000\u0000\u03d4\u03d5"+
		"\u0003\u0088D\u0000\u03d5\u03d7\u0005\r\u0000\u0000\u03d6\u03d8\u0003"+
		"\u0084B\u0000\u03d7\u03d6\u0001\u0000\u0000\u0000\u03d7\u03d8\u0001\u0000"+
		"\u0000\u0000\u03d8\u0087\u0001\u0000\u0000\u0000\u03d9\u03db\t\u0000\u0000"+
		"\u0000\u03da\u03d9\u0001\u0000\u0000\u0000\u03db\u03de\u0001\u0000\u0000"+
		"\u0000\u03dc\u03dd\u0001\u0000\u0000\u0000\u03dc\u03da\u0001\u0000\u0000"+
		"\u0000\u03dd\u0089\u0001\u0000\u0000\u0000\u03de\u03dc\u0001\u0000\u0000"+
		"\u0000\u0095\u008e\u0093\u0095\u009a\u009e\u00a2\u00a6\u00ad\u00b1\u00b5"+
		"\u00b9\u00bd\u00c5\u00c9\u00cd\u00d1\u00d7\u00db\u00df\u00e3\u00ea\u00ee"+
		"\u00f2\u00f6\u00fa\u0102\u0106\u010a\u010e\u0112\u0116\u0120\u012d\u0138"+
		"\u0142\u014f\u0158\u015f\u0163\u0167\u016b\u016f\u0175\u0179\u017f\u0185"+
		"\u0189\u018d\u0190\u0193\u0199\u019c\u019f\u01a7\u01a9\u01b4\u01c0\u01c2"+
		"\u01c6\u01d0\u01d4\u01d8\u01de\u01e2\u01e6\u01f9\u01fc\u0200\u0207\u020b"+
		"\u020e\u0212\u0219\u021d\u0220\u0224\u022b\u022f\u0232\u0236\u023d\u0241"+
		"\u0245\u024f\u0251\u0254\u0258\u025b\u0260\u0268\u026d\u0275\u027a\u027e"+
		"\u0283\u0287\u02c2\u02c7\u02cb\u02ce\u02d2\u02d6\u02de\u02e2\u02e6\u02ea"+
		"\u02ed\u02f0\u02f4\u02f8\u02fc\u0300\u0304\u0308\u030c\u0310\u0314\u0318"+
		"\u031c\u031f\u0322\u0326\u032c\u032e\u0331\u0334\u033c\u0342\u0346\u034a"+
		"\u0351\u0356\u035c\u0368\u0375\u037a\u0389\u038d\u0396\u03ab\u03b0\u03b5"+
		"\u03ba\u03bf\u03c4\u03cb\u03d1\u03d7\u03dc";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}