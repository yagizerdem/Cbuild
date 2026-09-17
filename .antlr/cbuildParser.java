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
		RPAREN=11, L_CURLY_BRACE=12, R_CURLY_BRACE=13, COMMA=14, PIPE=15, INCLUDE=16, 
		DASH_INCLUDE=17, SINCLUDE=18, ENDEF=19, IFDEF=20, IFNDEF=21, IFEQ=22, 
		IFNEQ=23, ELSE=24, ENDIF=25, OVERRIDE=26, EXPORT=27, UNEXPORT=28, UNDEFINE=29, 
		DEFINE=30, VPATH=31, ESCAPED_QUOTE=32, SLIT=33, HOOK=34, BACKSLASH=35, 
		CHARS=36, NL=37, LEADING_TAB=38, WS=39, TAB=40, COMMENT=41;
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
		RULE_pattern = 41, RULE_prerequisites = 42, RULE_orderonlyprerequisites = 43, 
		RULE_targets = 44, RULE_recipes = 45, RULE_recipes_opt = 46, RULE_recipe = 47, 
		RULE_specifiers = 48, RULE_identifier = 49, RULE_identifier_atom = 50, 
		RULE_br = 51, RULE_char = 52, RULE_char_nested = 53, RULE_char_in_assign = 54, 
		RULE_char_in_def = 55, RULE_char_in_recipe = 56, RULE_text = 57, RULE_text_nested = 58, 
		RULE_text_in_assign = 59, RULE_text_in_recipe = 60, RULE_keywords = 61, 
		RULE_colon = 62, RULE_comment_opt = 63, RULE_ws = 64, RULE_hook = 65, 
		RULE_hook_program = 66;
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
			"static_pattern_rule", "target", "pattern", "prerequisites", "orderonlyprerequisites", 
			"targets", "recipes", "recipes_opt", "recipe", "specifiers", "identifier", 
			"identifier_atom", "br", "char", "char_nested", "char_in_assign", "char_in_def", 
			"char_in_recipe", "text", "text_nested", "text_in_assign", "text_in_recipe", 
			"keywords", "colon", "comment_opt", "ws", "hook", "hook_program"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, "'$('", "'${'", null, "'$$'", "'&::'", "'&:'", "'::'", "':'", 
			"'('", "')'", "'{'", "'}'", "','", "'|'", "'include'", "'-include'", 
			"'sinclude'", "'endef'", "'ifdef'", "'ifndef'", "'ifeq'", "'ifneq'", 
			"'else'", "'endif'", "'override'", "'export'", "'unexport'", "'undefine'", 
			"'define'", "'vpath'", null, null, "'hook'", "'\\'", null, null, null, 
			null, "'\\t'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "ASSIGN_OP", "DOLLAR_LPAREN", "DOLLAR_L_CURLY_BRACE", "VAR", "DOUBLE_DOLLAR", 
			"GROUPED_DOUBLE_COLON", "GROUPED_COLON", "DOUBLE_COLON", "COLON", "LPAREN", 
			"RPAREN", "L_CURLY_BRACE", "R_CURLY_BRACE", "COMMA", "PIPE", "INCLUDE", 
			"DASH_INCLUDE", "SINCLUDE", "ENDEF", "IFDEF", "IFNDEF", "IFEQ", "IFNEQ", 
			"ELSE", "ENDIF", "OVERRIDE", "EXPORT", "UNEXPORT", "UNDEFINE", "DEFINE", 
			"VPATH", "ESCAPED_QUOTE", "SLIT", "HOOK", "BACKSLASH", "CHARS", "NL", 
			"LEADING_TAB", "WS", "TAB", "COMMENT"
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
			setState(138);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(134);
				statements();
				setState(135);
				match(EOF);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(137);
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
	}

	public final StatementsContext statements() throws RecognitionException {
		StatementsContext _localctx = new StatementsContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_statements);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(144);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(142);
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
					case HOOK:
					case CHARS:
					case WS:
					case TAB:
					case COMMENT:
						{
						setState(140);
						statement();
						}
						break;
					case NL:
						{
						setState(141);
						br();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					} 
				}
				setState(146);
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
			setState(269);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,29,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(147);
				if_eq_kw();
				setState(149);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(148);
					ws();
					}
				}

				setState(151);
				condition();
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
				statements_opt();
				setState(157);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(156);
					ws();
					}
				}

				setState(159);
				match(ENDIF);
				setState(161);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(160);
					ws();
					}
				}

				setState(163);
				comment_opt();
				setState(164);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(166);
				if_eq_kw();
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
				condition();
				setState(172);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(171);
					ws();
					}
				}

				setState(174);
				statements_opt();
				setState(176);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(175);
					ws();
					}
				}

				setState(178);
				match(ELSE);
				setState(180);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(179);
					ws();
					}
				}

				setState(182);
				statements_opt();
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
				match(ENDIF);
				setState(187);
				comment_opt();
				setState(188);
				br();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(190);
				if_eq_kw();
				setState(192);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(191);
					ws();
					}
				}

				setState(194);
				condition();
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
				statements_opt();
				setState(200);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(199);
					ws();
					}
				}

				setState(202);
				match(ELSE);
				setState(204);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(203);
					ws();
					}
				}

				setState(206);
				conditional();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(208);
				if_def_kw();
				setState(210);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(209);
					ws();
					}
				}

				setState(212);
				pattern();
				setState(214);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(213);
					ws();
					}
				}

				setState(216);
				statements_opt();
				setState(218);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(217);
					ws();
					}
				}

				setState(220);
				match(ENDIF);
				setState(222);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(221);
					ws();
					}
				}

				setState(224);
				comment_opt();
				setState(225);
				br();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(227);
				if_def_kw();
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
				pattern();
				setState(233);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(232);
					ws();
					}
				}

				setState(235);
				statements_opt();
				setState(237);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(236);
					ws();
					}
				}

				setState(239);
				match(ELSE);
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
				statements_opt();
				setState(245);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(244);
					ws();
					}
				}

				setState(247);
				match(ENDIF);
				setState(248);
				comment_opt();
				setState(249);
				br();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(251);
				if_def_kw();
				setState(253);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(252);
					ws();
					}
				}

				setState(255);
				pattern();
				setState(257);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(256);
					ws();
					}
				}

				setState(259);
				statements_opt();
				setState(261);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(260);
					ws();
					}
				}

				setState(263);
				match(ELSE);
				setState(265);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(264);
					ws();
					}
				}

				setState(267);
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
			setState(339);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,36,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(271);
				if_eq_kw();
				setState(273);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(272);
					ws();
					}
				}

				setState(275);
				condition();
				setState(276);
				match(NL);
				setState(277);
				recipes_opt();
				setState(278);
				match(ENDIF);
				setState(279);
				comment_opt();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(281);
				if_eq_kw();
				setState(283);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(282);
					ws();
					}
				}

				setState(285);
				condition();
				setState(286);
				match(NL);
				setState(287);
				recipes_opt();
				setState(288);
				match(ELSE);
				setState(289);
				match(NL);
				setState(290);
				recipes_opt();
				setState(291);
				match(ENDIF);
				setState(292);
				comment_opt();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(294);
				if_eq_kw();
				setState(296);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(295);
					ws();
					}
				}

				setState(298);
				condition();
				setState(299);
				match(NL);
				setState(300);
				recipes_opt();
				setState(301);
				match(ELSE);
				setState(302);
				match(NL);
				setState(303);
				conditional_in_recipe();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(305);
				if_def_kw();
				setState(307);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(306);
					ws();
					}
				}

				setState(309);
				pattern();
				setState(310);
				match(NL);
				setState(311);
				recipes_opt();
				setState(312);
				match(ENDIF);
				setState(313);
				comment_opt();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(315);
				if_def_kw();
				setState(317);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(316);
					ws();
					}
				}

				setState(319);
				pattern();
				setState(320);
				match(NL);
				setState(321);
				recipes_opt();
				setState(322);
				match(ELSE);
				setState(323);
				match(NL);
				setState(324);
				recipes_opt();
				setState(325);
				match(ENDIF);
				setState(326);
				comment_opt();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(328);
				if_def_kw();
				setState(330);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(329);
					ws();
					}
				}

				setState(332);
				pattern();
				setState(333);
				match(NL);
				setState(334);
				recipes_opt();
				setState(335);
				match(ELSE);
				setState(336);
				match(NL);
				setState(337);
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
			setState(341);
			comment_opt();
			setState(342);
			br();
			setState(343);
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
			setState(391);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,47,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(346);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(345);
					ws();
					}
				}

				setState(348);
				match(COMMENT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(350);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(349);
					ws();
					}
				}

				setState(352);
				conditional();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(354);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(353);
					ws();
					}
				}

				setState(356);
				define();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(358);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(357);
					ws();
					}
				}

				setState(360);
				include();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(362);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(361);
					ws();
					}
				}

				setState(364);
				export();
				setState(365);
				br();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(368);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(367);
					ws();
					}
				}

				setState(370);
				vpath();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(372);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(371);
					ws();
					}
				}

				setState(374);
				assignment();
				setState(375);
				br();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(378);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(377);
					ws();
					}
				}

				setState(380);
				function();
				setState(381);
				br();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(384);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(383);
					ws();
					}
				}

				setState(386);
				rule_();
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(388);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(387);
					ws();
					}
				}

				setState(390);
				hook();
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
	}

	public final DefineContext define() throws RecognitionException {
		DefineContext _localctx = new DefineContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_define);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(394);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 1006632960L) != 0)) {
				{
				setState(393);
				specifiers();
				}
			}

			setState(396);
			match(DEFINE);
			setState(397);
			ws();
			setState(398);
			pattern();
			setState(400);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,49,_ctx) ) {
			case 1:
				{
				setState(399);
				ws();
				}
				break;
			}
			setState(403);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ASSIGN_OP) {
				{
				setState(402);
				match(ASSIGN_OP);
				}
			}

			setState(406);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(405);
				ws();
				}
			}

			setState(408);
			definition();
			setState(409);
			match(ENDEF);
			setState(410);
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
	}

	public final DefinitionContext definition() throws RecognitionException {
		DefinitionContext _localctx = new DefinitionContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_definition);
		try {
			setState(420);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,52,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(412);
				comment_opt();
				setState(413);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(415);
				comment_opt();
				setState(416);
				br();
				setState(417);
				exprs_in_def();
				setState(418);
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
		enterRule(_localctx, 16, RULE_include);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(422);
			include_kw();
			setState(423);
			expressions();
			setState(424);
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
		enterRule(_localctx, 18, RULE_export);
		int _la;
		try {
			setState(434);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,54,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(426);
				match(EXPORT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(427);
				match(UNEXPORT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(428);
				assignment_prefix();
				setState(432);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(429);
					ws();
					setState(430);
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
		enterRule(_localctx, 20, RULE_vpath);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(436);
			match(VPATH);
			setState(438);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(437);
				vpath_args();
				}
			}

			setState(440);
			comment_opt();
			setState(441);
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
		enterRule(_localctx, 22, RULE_vpath_args);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(443);
			ws();
			setState(444);
			pattern();
			setState(448);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(445);
				ws();
				setState(446);
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
		enterRule(_localctx, 24, RULE_assignment);
		int _la;
		try {
			setState(470);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,61,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(450);
				pattern();
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
				match(ASSIGN_OP);
				setState(456);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,58,_ctx) ) {
				case 1:
					{
					setState(455);
					exprs_in_assign();
					}
					break;
				}
				setState(458);
				comment_opt();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(460);
				assignment_prefix();
				setState(462);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(461);
					ws();
					}
				}

				setState(464);
				match(ASSIGN_OP);
				setState(466);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,60,_ctx) ) {
				case 1:
					{
					setState(465);
					exprs_in_assign();
					}
					break;
				}
				setState(468);
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
	}

	public final Assignment_prefixContext assignment_prefix() throws RecognitionException {
		Assignment_prefixContext _localctx = new Assignment_prefixContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_assignment_prefix);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(472);
			specifiers();
			setState(473);
			ws();
			setState(474);
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
		enterRule(_localctx, 28, RULE_if_eq_kw);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(476);
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
		enterRule(_localctx, 30, RULE_if_def_kw);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(478);
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
		enterRule(_localctx, 32, RULE_include_kw);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(480);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 458752L) != 0)) ) {
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
	}

	public final ConditionContext condition() throws RecognitionException {
		ConditionContext _localctx = new ConditionContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_condition);
		int _la;
		try {
			setState(493);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LPAREN:
				enterOuterAlt(_localctx, 1);
				{
				setState(482);
				match(LPAREN);
				setState(483);
				expressions_opt();
				setState(484);
				match(COMMA);
				setState(485);
				expressions_opt();
				setState(486);
				match(RPAREN);
				}
				break;
			case SLIT:
				enterOuterAlt(_localctx, 2);
				{
				setState(488);
				match(SLIT);
				setState(490);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(489);
					ws();
					}
				}

				setState(492);
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
	}

	public final Expressions_optContext expressions_opt() throws RecognitionException {
		Expressions_optContext _localctx = new Expressions_optContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_expressions_opt);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(496);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 1765231560254L) != 0)) {
				{
				setState(495);
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
		enterRule(_localctx, 38, RULE_expressions);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(499);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(498);
				ws();
				}
			}

			setState(501);
			expression();
			setState(503);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,66,_ctx) ) {
			case 1:
				{
				setState(502);
				ws();
				}
				break;
			}
			setState(510);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,67,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(505);
					ws();
					setState(506);
					expression();
					}
					} 
				}
				setState(512);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,67,_ctx);
			}
			setState(514);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(513);
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
		enterRule(_localctx, 40, RULE_exprs_nested);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(517);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(516);
				ws();
				}
			}

			setState(519);
			expr_nested();
			setState(521);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,70,_ctx) ) {
			case 1:
				{
				setState(520);
				ws();
				}
				break;
			}
			setState(528);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,71,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(523);
					ws();
					setState(524);
					expr_nested();
					}
					} 
				}
				setState(530);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,71,_ctx);
			}
			setState(532);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(531);
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
		enterRule(_localctx, 42, RULE_exprs_in_assign);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(535);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(534);
				ws();
				}
			}

			setState(537);
			expr_in_assign();
			setState(539);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,74,_ctx) ) {
			case 1:
				{
				setState(538);
				ws();
				}
				break;
			}
			setState(546);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,75,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(541);
					ws();
					setState(542);
					expr_in_assign();
					}
					} 
				}
				setState(548);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,75,_ctx);
			}
			setState(550);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,76,_ctx) ) {
			case 1:
				{
				setState(549);
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
		enterRule(_localctx, 44, RULE_exprs_in_recipe);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(553);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(552);
				ws();
				}
			}

			setState(555);
			expr_in_recipe();
			setState(557);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,78,_ctx) ) {
			case 1:
				{
				setState(556);
				ws();
				}
				break;
			}
			setState(564);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,79,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(559);
					ws();
					setState(560);
					expr_in_recipe();
					}
					} 
				}
				setState(566);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,79,_ctx);
			}
			setState(568);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(567);
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
		enterRule(_localctx, 46, RULE_exprs_in_def);
		int _la;
		try {
			int _alt;
			setState(587);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,84,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(570);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(572);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==NL) {
					{
					setState(571);
					br();
					}
				}

				setState(574);
				first_expr_in_def();
				setState(584);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,83,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						setState(582);
						_errHandler.sync(this);
						switch ( getInterpreter().adaptivePredict(_input,82,_ctx) ) {
						case 1:
							{
							{
							setState(575);
							br();
							setState(576);
							first_expr_in_def();
							}
							}
							break;
						case 2:
							{
							{
							setState(578);
							br();
							}
							}
							break;
						case 3:
							{
							{
							setState(579);
							ws();
							setState(580);
							expr_in_recipe();
							}
							}
							break;
						}
						} 
					}
					setState(586);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,83,_ctx);
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
		enterRule(_localctx, 48, RULE_first_expr_in_def);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(591);
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
			case ESCAPED_QUOTE:
			case SLIT:
			case BACKSLASH:
			case CHARS:
			case COMMENT:
				{
				setState(589);
				char_in_def();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				{
				setState(590);
				function();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(594);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 2319281946174L) != 0)) {
				{
				setState(593);
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
		enterRule(_localctx, 50, RULE_expression);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(597); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(596);
				expression_atom();
				}
				}
				setState(599); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 115964118590L) != 0) );
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
		enterRule(_localctx, 52, RULE_expression_atom);
		try {
			setState(607);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case ESCAPED_QUOTE:
			case SLIT:
			case BACKSLASH:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(601);
				text();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(602);
				function();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(603);
				match(LPAREN);
				setState(604);
				exprs_nested();
				setState(605);
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
		enterRule(_localctx, 54, RULE_expr_nested);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(610); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(609);
				expr_nested_atom();
				}
				}
				setState(612); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 115964134974L) != 0) );
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
		enterRule(_localctx, 56, RULE_expr_nested_atom);
		try {
			setState(620);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case COMMA:
			case ESCAPED_QUOTE:
			case SLIT:
			case BACKSLASH:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(614);
				text_nested();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(615);
				function();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(616);
				match(LPAREN);
				setState(617);
				exprs_nested();
				setState(618);
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
		enterRule(_localctx, 58, RULE_expr_in_assign);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(623); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(622);
				expr_in_assign_atom();
				}
				}
				setState(625); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 120258657854L) != 0) );
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
		enterRule(_localctx, 60, RULE_expr_in_assign_atom);
		try {
			setState(629);
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
			case ESCAPED_QUOTE:
			case SLIT:
			case BACKSLASH:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(627);
				text_in_assign();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(628);
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
		enterRule(_localctx, 62, RULE_expr_in_recipe);
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
				expr_in_recipe_atom();
				}
				}
				setState(634); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 2319281946174L) != 0) );
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
		enterRule(_localctx, 64, RULE_expr_in_recipe_atom);
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
			case ESCAPED_QUOTE:
			case SLIT:
			case BACKSLASH:
			case CHARS:
			case COMMENT:
				enterOuterAlt(_localctx, 1);
				{
				setState(636);
				text_in_recipe();
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
		enterRule(_localctx, 66, RULE_function);
		try {
			setState(697);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,95,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(640);
				match(VAR);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(641);
				match(DOLLAR_LPAREN);
				setState(642);
				function_name();
				setState(643);
				match(RPAREN);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(645);
				match(DOLLAR_LPAREN);
				setState(646);
				function_name();
				setState(647);
				ws();
				setState(648);
				arguments();
				setState(649);
				match(RPAREN);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(651);
				match(DOLLAR_LPAREN);
				setState(652);
				function_name();
				setState(653);
				match(COMMA);
				setState(654);
				arguments();
				setState(655);
				match(RPAREN);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(657);
				match(DOLLAR_LPAREN);
				setState(658);
				function_name();
				setState(659);
				match(COLON);
				setState(660);
				expressions();
				setState(661);
				match(RPAREN);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(663);
				match(DOLLAR_LPAREN);
				setState(664);
				function_name();
				setState(665);
				match(ASSIGN_OP);
				setState(666);
				expressions();
				setState(667);
				match(RPAREN);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(669);
				match(DOLLAR_L_CURLY_BRACE);
				setState(670);
				function_name();
				setState(671);
				match(R_CURLY_BRACE);
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(673);
				match(DOLLAR_L_CURLY_BRACE);
				setState(674);
				function_name();
				setState(675);
				ws();
				setState(676);
				arguments();
				setState(677);
				match(R_CURLY_BRACE);
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(679);
				match(DOLLAR_L_CURLY_BRACE);
				setState(680);
				function_name();
				setState(681);
				match(COMMA);
				setState(682);
				arguments();
				setState(683);
				match(R_CURLY_BRACE);
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(685);
				match(DOLLAR_L_CURLY_BRACE);
				setState(686);
				function_name();
				setState(687);
				match(COLON);
				setState(688);
				expressions();
				setState(689);
				match(R_CURLY_BRACE);
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(691);
				match(DOLLAR_L_CURLY_BRACE);
				setState(692);
				function_name();
				setState(693);
				match(ASSIGN_OP);
				setState(694);
				expressions();
				setState(695);
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
		enterRule(_localctx, 68, RULE_function_name);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(700); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(699);
				function_name_atom();
				}
				}
				setState(702); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 68719476764L) != 0) );
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
		enterRule(_localctx, 70, RULE_function_name_atom);
		try {
			setState(706);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(704);
				match(CHARS);
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(705);
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
		enterRule(_localctx, 72, RULE_arguments);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(709);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 1765231560254L) != 0)) {
				{
				setState(708);
				argument();
				}
			}

			setState(717);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(711);
				match(COMMA);
				setState(713);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 1765231560254L) != 0)) {
					{
					setState(712);
					argument();
					}
				}

				}
				}
				setState(719);
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
		enterRule(_localctx, 74, RULE_argument);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(720);
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
		enterRule(_localctx, 76, RULE_rule);
		int _la;
		try {
			setState(763);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,111,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(722);
				static_pattern_rule();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(723);
				targets();
				setState(725);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(724);
					ws();
					}
				}

				setState(727);
				colon();
				setState(729);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,102,_ctx) ) {
				case 1:
					{
					setState(728);
					ws();
					}
					break;
				}
				setState(731);
				prerequisites();
				setState(740);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,105,_ctx) ) {
				case 1:
					{
					setState(733);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==WS || _la==TAB) {
						{
						setState(732);
						ws();
						}
					}

					setState(735);
					match(PIPE);
					setState(737);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,104,_ctx) ) {
					case 1:
						{
						setState(736);
						ws();
						}
						break;
					}
					setState(739);
					orderonlyprerequisites();
					}
					break;
				}
				setState(743);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(742);
					ws();
					}
				}

				setState(745);
				match(NL);
				setState(747);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,107,_ctx) ) {
				case 1:
					{
					setState(746);
					recipes();
					}
					break;
				}
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(749);
				targets();
				setState(751);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(750);
					ws();
					}
				}

				setState(753);
				colon();
				setState(755);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(754);
					ws();
					}
				}

				setState(757);
				assignment();
				setState(759);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(758);
					ws();
					}
				}

				setState(761);
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
		enterRule(_localctx, 78, RULE_static_pattern_rule);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(765);
			targets();
			setState(767);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(766);
				ws();
				}
			}

			setState(769);
			colon();
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
			pattern();
			setState(775);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(774);
				ws();
				}
			}

			setState(777);
			colon();
			setState(779);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,115,_ctx) ) {
			case 1:
				{
				setState(778);
				ws();
				}
				break;
			}
			setState(781);
			prerequisites();
			setState(790);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,118,_ctx) ) {
			case 1:
				{
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
				match(PIPE);
				setState(787);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,117,_ctx) ) {
				case 1:
					{
					setState(786);
					ws();
					}
					break;
				}
				setState(789);
				orderonlyprerequisites();
				}
				break;
			}
			setState(793);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(792);
				ws();
				}
			}

			setState(795);
			match(NL);
			setState(797);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,120,_ctx) ) {
			case 1:
				{
				setState(796);
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
		enterRule(_localctx, 80, RULE_target);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(799);
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
		enterRule(_localctx, 82, RULE_pattern);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(803); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				setState(803);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case LPAREN:
				case RPAREN:
				case L_CURLY_BRACE:
				case R_CURLY_BRACE:
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
					setState(801);
					identifier();
					}
					break;
				case DOLLAR_LPAREN:
				case DOLLAR_L_CURLY_BRACE:
				case VAR:
					{
					setState(802);
					function();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(805); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 73014017052L) != 0) );
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
		enterRule(_localctx, 84, RULE_prerequisites);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(808);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 73014017052L) != 0)) {
				{
				setState(807);
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
		enterRule(_localctx, 86, RULE_orderonlyprerequisites);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(811);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 73014017052L) != 0)) {
				{
				setState(810);
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
		enterRule(_localctx, 88, RULE_targets);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(813);
			target();
			setState(819);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,125,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(814);
					ws();
					setState(815);
					target();
					}
					} 
				}
				setState(821);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,125,_ctx);
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
		enterRule(_localctx, 90, RULE_recipes);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(823); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(822);
					recipe();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(825); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,126,_ctx);
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
		enterRule(_localctx, 92, RULE_recipes_opt);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(827);
			comment_opt();
			setState(829);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 4260623286272L) != 0)) {
				{
				setState(828);
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
		enterRule(_localctx, 94, RULE_recipe);
		int _la;
		try {
			setState(851);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,131,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(831);
				match(LEADING_TAB);
				setState(833);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,128,_ctx) ) {
				case 1:
					{
					setState(832);
					ws();
					}
					break;
				}
				setState(835);
				exprs_in_recipe();
				setState(836);
				match(NL);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(838);
				match(LEADING_TAB);
				setState(840);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(839);
					ws();
					}
				}

				setState(842);
				match(COMMENT);
				setState(843);
				match(NL);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(845);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(844);
					ws();
					}
				}

				setState(847);
				match(COMMENT);
				setState(848);
				match(NL);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(849);
				conditional_in_recipe();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(850);
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
	}

	public final SpecifiersContext specifiers() throws RecognitionException {
		SpecifiersContext _localctx = new SpecifiersContext(_ctx, getState());
		enterRule(_localctx, 96, RULE_specifiers);
		try {
			setState(873);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,132,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(853);
				match(OVERRIDE);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(854);
				match(EXPORT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(855);
				match(UNEXPORT);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(856);
				match(OVERRIDE);
				setState(857);
				ws();
				setState(858);
				match(EXPORT);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(860);
				match(EXPORT);
				setState(861);
				ws();
				setState(862);
				match(OVERRIDE);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(864);
				match(UNDEFINE);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(865);
				match(OVERRIDE);
				setState(866);
				ws();
				setState(867);
				match(UNDEFINE);
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(869);
				match(UNDEFINE);
				setState(870);
				ws();
				setState(871);
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
		enterRule(_localctx, 98, RULE_identifier);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(876); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(875);
					identifier_atom();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(878); 
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
	public static class Identifier_atomContext extends ParserRuleContext {
		public TerminalNode CHARS() { return getToken(cbuildParser.CHARS, 0); }
		public KeywordsContext keywords() {
			return getRuleContext(KeywordsContext.class,0);
		}
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
		enterRule(_localctx, 100, RULE_identifier_atom);
		try {
			setState(887);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(880);
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
				setState(881);
				keywords();
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 3);
				{
				setState(882);
				match(COMMA);
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 4);
				{
				setState(883);
				match(LPAREN);
				}
				break;
			case RPAREN:
				enterOuterAlt(_localctx, 5);
				{
				setState(884);
				match(RPAREN);
				}
				break;
			case L_CURLY_BRACE:
				enterOuterAlt(_localctx, 6);
				{
				setState(885);
				match(L_CURLY_BRACE);
				}
				break;
			case R_CURLY_BRACE:
				enterOuterAlt(_localctx, 7);
				{
				setState(886);
				match(R_CURLY_BRACE);
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
	}

	public final BrContext br() throws RecognitionException {
		BrContext _localctx = new BrContext(_ctx, getState());
		enterRule(_localctx, 102, RULE_br);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(889);
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
		public TerminalNode ESCAPED_QUOTE() { return getToken(cbuildParser.ESCAPED_QUOTE, 0); }
		public TerminalNode BACKSLASH() { return getToken(cbuildParser.BACKSLASH, 0); }
		public TerminalNode ASSIGN_OP() { return getToken(cbuildParser.ASSIGN_OP, 0); }
		public TerminalNode COLON() { return getToken(cbuildParser.COLON, 0); }
		public TerminalNode DOUBLE_DOLLAR() { return getToken(cbuildParser.DOUBLE_DOLLAR, 0); }
		public CharContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_char; }
	}

	public final CharContext char_() throws RecognitionException {
		CharContext _localctx = new CharContext(_ctx, getState());
		enterRule(_localctx, 104, RULE_char);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(891);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 115964117538L) != 0)) ) {
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
	}

	public final Char_nestedContext char_nested() throws RecognitionException {
		Char_nestedContext _localctx = new Char_nestedContext(_ctx, getState());
		enterRule(_localctx, 106, RULE_char_nested);
		try {
			setState(895);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case ESCAPED_QUOTE:
			case SLIT:
			case BACKSLASH:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(893);
				char_();
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 2);
				{
				setState(894);
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
		enterRule(_localctx, 108, RULE_char_in_assign);
		try {
			setState(903);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case COMMA:
			case ESCAPED_QUOTE:
			case SLIT:
			case BACKSLASH:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(897);
				char_nested();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 2);
				{
				setState(898);
				match(LPAREN);
				}
				break;
			case RPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(899);
				match(RPAREN);
				}
				break;
			case L_CURLY_BRACE:
				enterOuterAlt(_localctx, 4);
				{
				setState(900);
				match(L_CURLY_BRACE);
				}
				break;
			case R_CURLY_BRACE:
				enterOuterAlt(_localctx, 5);
				{
				setState(901);
				match(R_CURLY_BRACE);
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
				enterOuterAlt(_localctx, 6);
				{
				setState(902);
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
		enterRule(_localctx, 110, RULE_char_in_def);
		try {
			setState(924);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case ESCAPED_QUOTE:
			case SLIT:
			case BACKSLASH:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(905);
				char_();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 2);
				{
				setState(906);
				match(LPAREN);
				}
				break;
			case RPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(907);
				match(RPAREN);
				}
				break;
			case L_CURLY_BRACE:
				enterOuterAlt(_localctx, 4);
				{
				setState(908);
				match(L_CURLY_BRACE);
				}
				break;
			case R_CURLY_BRACE:
				enterOuterAlt(_localctx, 5);
				{
				setState(909);
				match(R_CURLY_BRACE);
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 6);
				{
				setState(910);
				match(COMMA);
				}
				break;
			case COMMENT:
				enterOuterAlt(_localctx, 7);
				{
				setState(911);
				match(COMMENT);
				}
				break;
			case INCLUDE:
				enterOuterAlt(_localctx, 8);
				{
				setState(912);
				match(INCLUDE);
				}
				break;
			case OVERRIDE:
				enterOuterAlt(_localctx, 9);
				{
				setState(913);
				match(OVERRIDE);
				}
				break;
			case EXPORT:
				enterOuterAlt(_localctx, 10);
				{
				setState(914);
				match(EXPORT);
				}
				break;
			case UNEXPORT:
				enterOuterAlt(_localctx, 11);
				{
				setState(915);
				match(UNEXPORT);
				}
				break;
			case IFDEF:
				enterOuterAlt(_localctx, 12);
				{
				setState(916);
				match(IFDEF);
				}
				break;
			case IFNDEF:
				enterOuterAlt(_localctx, 13);
				{
				setState(917);
				match(IFNDEF);
				}
				break;
			case IFEQ:
				enterOuterAlt(_localctx, 14);
				{
				setState(918);
				match(IFEQ);
				}
				break;
			case IFNEQ:
				enterOuterAlt(_localctx, 15);
				{
				setState(919);
				match(IFNEQ);
				}
				break;
			case ELSE:
				enterOuterAlt(_localctx, 16);
				{
				setState(920);
				match(ELSE);
				}
				break;
			case ENDIF:
				enterOuterAlt(_localctx, 17);
				{
				setState(921);
				match(ENDIF);
				}
				break;
			case DEFINE:
				enterOuterAlt(_localctx, 18);
				{
				setState(922);
				match(DEFINE);
				}
				break;
			case UNDEFINE:
				enterOuterAlt(_localctx, 19);
				{
				setState(923);
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
		public TerminalNode COMMENT() { return getToken(cbuildParser.COMMENT, 0); }
		public TerminalNode PIPE() { return getToken(cbuildParser.PIPE, 0); }
		public Char_in_recipeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_char_in_recipe; }
	}

	public final Char_in_recipeContext char_in_recipe() throws RecognitionException {
		Char_in_recipeContext _localctx = new Char_in_recipeContext(_ctx, getState());
		enterRule(_localctx, 112, RULE_char_in_recipe);
		try {
			setState(929);
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
			case ESCAPED_QUOTE:
			case SLIT:
			case BACKSLASH:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(926);
				char_in_assign();
				}
				break;
			case COMMENT:
				enterOuterAlt(_localctx, 2);
				{
				setState(927);
				match(COMMENT);
				}
				break;
			case PIPE:
				enterOuterAlt(_localctx, 3);
				{
				setState(928);
				match(PIPE);
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
		enterRule(_localctx, 114, RULE_text);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(932); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(931);
					char_();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(934); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,139,_ctx);
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
		enterRule(_localctx, 116, RULE_text_nested);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(937); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(936);
					char_nested();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(939); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,140,_ctx);
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
		enterRule(_localctx, 118, RULE_text_in_assign);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(942); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(941);
					char_in_assign();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(944); 
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
		enterRule(_localctx, 120, RULE_text_in_recipe);
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
					char_in_recipe();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(949); 
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
		enterRule(_localctx, 122, RULE_keywords);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(951);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 4294508544L) != 0)) ) {
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
		enterRule(_localctx, 124, RULE_colon);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(953);
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
		enterRule(_localctx, 126, RULE_comment_opt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(956);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,143,_ctx) ) {
			case 1:
				{
				setState(955);
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
		enterRule(_localctx, 128, RULE_ws);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(958);
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
		enterRule(_localctx, 130, RULE_hook);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(960);
			match(HOOK);
			setState(962);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(961);
				ws();
				}
			}

			setState(964);
			match(L_CURLY_BRACE);
			setState(965);
			hook_program();
			setState(966);
			match(R_CURLY_BRACE);
			setState(968);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,145,_ctx) ) {
			case 1:
				{
				setState(967);
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
		enterRule(_localctx, 132, RULE_hook_program);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(973);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,146,_ctx);
			while ( _alt!=1 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1+1 ) {
					{
					{
					setState(970);
					matchWildcard();
					}
					} 
				}
				setState(975);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,146,_ctx);
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
		"\u0004\u0001)\u03d1\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
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
		"A\u0007A\u0002B\u0007B\u0001\u0000\u0001\u0000\u0001\u0000\u0001\u0000"+
		"\u0003\u0000\u008b\b\u0000\u0001\u0001\u0001\u0001\u0005\u0001\u008f\b"+
		"\u0001\n\u0001\f\u0001\u0092\t\u0001\u0001\u0002\u0001\u0002\u0003\u0002"+
		"\u0096\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u009a\b\u0002\u0001"+
		"\u0002\u0001\u0002\u0003\u0002\u009e\b\u0002\u0001\u0002\u0001\u0002\u0003"+
		"\u0002\u00a2\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0003\u0002\u00a9\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00ad"+
		"\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00b1\b\u0002\u0001\u0002"+
		"\u0001\u0002\u0003\u0002\u00b5\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002"+
		"\u00b9\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0003\u0002\u00c1\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002"+
		"\u00c5\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00c9\b\u0002\u0001"+
		"\u0002\u0001\u0002\u0003\u0002\u00cd\b\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0003\u0002\u00d3\b\u0002\u0001\u0002\u0001\u0002\u0003"+
		"\u0002\u00d7\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00db\b\u0002"+
		"\u0001\u0002\u0001\u0002\u0003\u0002\u00df\b\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00e6\b\u0002\u0001\u0002"+
		"\u0001\u0002\u0003\u0002\u00ea\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002"+
		"\u00ee\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00f2\b\u0002\u0001"+
		"\u0002\u0001\u0002\u0003\u0002\u00f6\b\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00fe\b\u0002\u0001"+
		"\u0002\u0001\u0002\u0003\u0002\u0102\b\u0002\u0001\u0002\u0001\u0002\u0003"+
		"\u0002\u0106\b\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u010a\b\u0002"+
		"\u0001\u0002\u0001\u0002\u0003\u0002\u010e\b\u0002\u0001\u0003\u0001\u0003"+
		"\u0003\u0003\u0112\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u011c\b\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003"+
		"\u0129\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u0134\b\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0003\u0003\u013e\b\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u014b\b\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0003\u0003\u0154\b\u0003\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004"+
		"\u0001\u0005\u0003\u0005\u015b\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005"+
		"\u015f\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0163\b\u0005\u0001"+
		"\u0005\u0001\u0005\u0003\u0005\u0167\b\u0005\u0001\u0005\u0001\u0005\u0003"+
		"\u0005\u016b\b\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003"+
		"\u0005\u0171\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0175\b\u0005"+
		"\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u017b\b\u0005"+
		"\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0181\b\u0005"+
		"\u0001\u0005\u0001\u0005\u0003\u0005\u0185\b\u0005\u0001\u0005\u0003\u0005"+
		"\u0188\b\u0005\u0001\u0006\u0003\u0006\u018b\b\u0006\u0001\u0006\u0001"+
		"\u0006\u0001\u0006\u0001\u0006\u0003\u0006\u0191\b\u0006\u0001\u0006\u0003"+
		"\u0006\u0194\b\u0006\u0001\u0006\u0003\u0006\u0197\b\u0006\u0001\u0006"+
		"\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0003\u0007"+
		"\u01a5\b\u0007\u0001\b\u0001\b\u0001\b\u0001\b\u0001\t\u0001\t\u0001\t"+
		"\u0001\t\u0001\t\u0001\t\u0003\t\u01b1\b\t\u0003\t\u01b3\b\t\u0001\n\u0001"+
		"\n\u0003\n\u01b7\b\n\u0001\n\u0001\n\u0001\n\u0001\u000b\u0001\u000b\u0001"+
		"\u000b\u0001\u000b\u0001\u000b\u0003\u000b\u01c1\b\u000b\u0001\f\u0001"+
		"\f\u0003\f\u01c5\b\f\u0001\f\u0001\f\u0003\f\u01c9\b\f\u0001\f\u0001\f"+
		"\u0001\f\u0001\f\u0003\f\u01cf\b\f\u0001\f\u0001\f\u0003\f\u01d3\b\f\u0001"+
		"\f\u0001\f\u0003\f\u01d7\b\f\u0001\r\u0001\r\u0001\r\u0001\r\u0001\u000e"+
		"\u0001\u000e\u0001\u000f\u0001\u000f\u0001\u0010\u0001\u0010\u0001\u0011"+
		"\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0011"+
		"\u0001\u0011\u0003\u0011\u01eb\b\u0011\u0001\u0011\u0003\u0011\u01ee\b"+
		"\u0011\u0001\u0012\u0003\u0012\u01f1\b\u0012\u0001\u0013\u0003\u0013\u01f4"+
		"\b\u0013\u0001\u0013\u0001\u0013\u0003\u0013\u01f8\b\u0013\u0001\u0013"+
		"\u0001\u0013\u0001\u0013\u0005\u0013\u01fd\b\u0013\n\u0013\f\u0013\u0200"+
		"\t\u0013\u0001\u0013\u0003\u0013\u0203\b\u0013\u0001\u0014\u0003\u0014"+
		"\u0206\b\u0014\u0001\u0014\u0001\u0014\u0003\u0014\u020a\b\u0014\u0001"+
		"\u0014\u0001\u0014\u0001\u0014\u0005\u0014\u020f\b\u0014\n\u0014\f\u0014"+
		"\u0212\t\u0014\u0001\u0014\u0003\u0014\u0215\b\u0014\u0001\u0015\u0003"+
		"\u0015\u0218\b\u0015\u0001\u0015\u0001\u0015\u0003\u0015\u021c\b\u0015"+
		"\u0001\u0015\u0001\u0015\u0001\u0015\u0005\u0015\u0221\b\u0015\n\u0015"+
		"\f\u0015\u0224\t\u0015\u0001\u0015\u0003\u0015\u0227\b\u0015\u0001\u0016"+
		"\u0003\u0016\u022a\b\u0016\u0001\u0016\u0001\u0016\u0003\u0016\u022e\b"+
		"\u0016\u0001\u0016\u0001\u0016\u0001\u0016\u0005\u0016\u0233\b\u0016\n"+
		"\u0016\f\u0016\u0236\t\u0016\u0001\u0016\u0003\u0016\u0239\b\u0016\u0001"+
		"\u0017\u0001\u0017\u0003\u0017\u023d\b\u0017\u0001\u0017\u0001\u0017\u0001"+
		"\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0005"+
		"\u0017\u0247\b\u0017\n\u0017\f\u0017\u024a\t\u0017\u0003\u0017\u024c\b"+
		"\u0017\u0001\u0018\u0001\u0018\u0003\u0018\u0250\b\u0018\u0001\u0018\u0003"+
		"\u0018\u0253\b\u0018\u0001\u0019\u0004\u0019\u0256\b\u0019\u000b\u0019"+
		"\f\u0019\u0257\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a"+
		"\u0001\u001a\u0003\u001a\u0260\b\u001a\u0001\u001b\u0004\u001b\u0263\b"+
		"\u001b\u000b\u001b\f\u001b\u0264\u0001\u001c\u0001\u001c\u0001\u001c\u0001"+
		"\u001c\u0001\u001c\u0001\u001c\u0003\u001c\u026d\b\u001c\u0001\u001d\u0004"+
		"\u001d\u0270\b\u001d\u000b\u001d\f\u001d\u0271\u0001\u001e\u0001\u001e"+
		"\u0003\u001e\u0276\b\u001e\u0001\u001f\u0004\u001f\u0279\b\u001f\u000b"+
		"\u001f\f\u001f\u027a\u0001 \u0001 \u0003 \u027f\b \u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0003!\u02ba\b!\u0001\"\u0004\"\u02bd\b"+
		"\"\u000b\"\f\"\u02be\u0001#\u0001#\u0003#\u02c3\b#\u0001$\u0003$\u02c6"+
		"\b$\u0001$\u0001$\u0003$\u02ca\b$\u0005$\u02cc\b$\n$\f$\u02cf\t$\u0001"+
		"%\u0001%\u0001&\u0001&\u0001&\u0003&\u02d6\b&\u0001&\u0001&\u0003&\u02da"+
		"\b&\u0001&\u0001&\u0003&\u02de\b&\u0001&\u0001&\u0003&\u02e2\b&\u0001"+
		"&\u0003&\u02e5\b&\u0001&\u0003&\u02e8\b&\u0001&\u0001&\u0003&\u02ec\b"+
		"&\u0001&\u0001&\u0003&\u02f0\b&\u0001&\u0001&\u0003&\u02f4\b&\u0001&\u0001"+
		"&\u0003&\u02f8\b&\u0001&\u0001&\u0003&\u02fc\b&\u0001\'\u0001\'\u0003"+
		"\'\u0300\b\'\u0001\'\u0001\'\u0003\'\u0304\b\'\u0001\'\u0001\'\u0003\'"+
		"\u0308\b\'\u0001\'\u0001\'\u0003\'\u030c\b\'\u0001\'\u0001\'\u0003\'\u0310"+
		"\b\'\u0001\'\u0001\'\u0003\'\u0314\b\'\u0001\'\u0003\'\u0317\b\'\u0001"+
		"\'\u0003\'\u031a\b\'\u0001\'\u0001\'\u0003\'\u031e\b\'\u0001(\u0001(\u0001"+
		")\u0001)\u0004)\u0324\b)\u000b)\f)\u0325\u0001*\u0003*\u0329\b*\u0001"+
		"+\u0003+\u032c\b+\u0001,\u0001,\u0001,\u0001,\u0005,\u0332\b,\n,\f,\u0335"+
		"\t,\u0001-\u0004-\u0338\b-\u000b-\f-\u0339\u0001.\u0001.\u0003.\u033e"+
		"\b.\u0001/\u0001/\u0003/\u0342\b/\u0001/\u0001/\u0001/\u0001/\u0001/\u0003"+
		"/\u0349\b/\u0001/\u0001/\u0001/\u0003/\u034e\b/\u0001/\u0001/\u0001/\u0001"+
		"/\u0003/\u0354\b/\u00010\u00010\u00010\u00010\u00010\u00010\u00010\u0001"+
		"0\u00010\u00010\u00010\u00010\u00010\u00010\u00010\u00010\u00010\u0001"+
		"0\u00010\u00010\u00030\u036a\b0\u00011\u00041\u036d\b1\u000b1\f1\u036e"+
		"\u00012\u00012\u00012\u00012\u00012\u00012\u00012\u00032\u0378\b2\u0001"+
		"3\u00013\u00014\u00014\u00015\u00015\u00035\u0380\b5\u00016\u00016\u0001"+
		"6\u00016\u00016\u00016\u00036\u0388\b6\u00017\u00017\u00017\u00017\u0001"+
		"7\u00017\u00017\u00017\u00017\u00017\u00017\u00017\u00017\u00017\u0001"+
		"7\u00017\u00017\u00017\u00017\u00037\u039d\b7\u00018\u00018\u00018\u0003"+
		"8\u03a2\b8\u00019\u00049\u03a5\b9\u000b9\f9\u03a6\u0001:\u0004:\u03aa"+
		"\b:\u000b:\f:\u03ab\u0001;\u0004;\u03af\b;\u000b;\f;\u03b0\u0001<\u0004"+
		"<\u03b4\b<\u000b<\f<\u03b5\u0001=\u0001=\u0001>\u0001>\u0001?\u0003?\u03bd"+
		"\b?\u0001@\u0001@\u0001A\u0001A\u0003A\u03c3\bA\u0001A\u0001A\u0001A\u0001"+
		"A\u0003A\u03c9\bA\u0001B\u0005B\u03cc\bB\nB\fB\u03cf\tB\u0001B\u0001\u03cd"+
		"\u0000C\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018"+
		"\u001a\u001c\u001e \"$&(*,.02468:<>@BDFHJLNPRTVXZ\\^`bdfhjlnprtvxz|~\u0080"+
		"\u0082\u0084\u0000\u0007\u0001\u0000\u0016\u0017\u0001\u0000\u0014\u0015"+
		"\u0001\u0000\u0010\u0012\u0005\u0000\u0001\u0001\u0005\u0005\t\t !#$\u0002"+
		"\u0000\u0010\u0010\u0013\u001f\u0001\u0000\u0006\t\u0001\u0000\'(\u0462"+
		"\u0000\u008a\u0001\u0000\u0000\u0000\u0002\u0090\u0001\u0000\u0000\u0000"+
		"\u0004\u010d\u0001\u0000\u0000\u0000\u0006\u0153\u0001\u0000\u0000\u0000"+
		"\b\u0155\u0001\u0000\u0000\u0000\n\u0187\u0001\u0000\u0000\u0000\f\u018a"+
		"\u0001\u0000\u0000\u0000\u000e\u01a4\u0001\u0000\u0000\u0000\u0010\u01a6"+
		"\u0001\u0000\u0000\u0000\u0012\u01b2\u0001\u0000\u0000\u0000\u0014\u01b4"+
		"\u0001\u0000\u0000\u0000\u0016\u01bb\u0001\u0000\u0000\u0000\u0018\u01d6"+
		"\u0001\u0000\u0000\u0000\u001a\u01d8\u0001\u0000\u0000\u0000\u001c\u01dc"+
		"\u0001\u0000\u0000\u0000\u001e\u01de\u0001\u0000\u0000\u0000 \u01e0\u0001"+
		"\u0000\u0000\u0000\"\u01ed\u0001\u0000\u0000\u0000$\u01f0\u0001\u0000"+
		"\u0000\u0000&\u01f3\u0001\u0000\u0000\u0000(\u0205\u0001\u0000\u0000\u0000"+
		"*\u0217\u0001\u0000\u0000\u0000,\u0229\u0001\u0000\u0000\u0000.\u024b"+
		"\u0001\u0000\u0000\u00000\u024f\u0001\u0000\u0000\u00002\u0255\u0001\u0000"+
		"\u0000\u00004\u025f\u0001\u0000\u0000\u00006\u0262\u0001\u0000\u0000\u0000"+
		"8\u026c\u0001\u0000\u0000\u0000:\u026f\u0001\u0000\u0000\u0000<\u0275"+
		"\u0001\u0000\u0000\u0000>\u0278\u0001\u0000\u0000\u0000@\u027e\u0001\u0000"+
		"\u0000\u0000B\u02b9\u0001\u0000\u0000\u0000D\u02bc\u0001\u0000\u0000\u0000"+
		"F\u02c2\u0001\u0000\u0000\u0000H\u02c5\u0001\u0000\u0000\u0000J\u02d0"+
		"\u0001\u0000\u0000\u0000L\u02fb\u0001\u0000\u0000\u0000N\u02fd\u0001\u0000"+
		"\u0000\u0000P\u031f\u0001\u0000\u0000\u0000R\u0323\u0001\u0000\u0000\u0000"+
		"T\u0328\u0001\u0000\u0000\u0000V\u032b\u0001\u0000\u0000\u0000X\u032d"+
		"\u0001\u0000\u0000\u0000Z\u0337\u0001\u0000\u0000\u0000\\\u033b\u0001"+
		"\u0000\u0000\u0000^\u0353\u0001\u0000\u0000\u0000`\u0369\u0001\u0000\u0000"+
		"\u0000b\u036c\u0001\u0000\u0000\u0000d\u0377\u0001\u0000\u0000\u0000f"+
		"\u0379\u0001\u0000\u0000\u0000h\u037b\u0001\u0000\u0000\u0000j\u037f\u0001"+
		"\u0000\u0000\u0000l\u0387\u0001\u0000\u0000\u0000n\u039c\u0001\u0000\u0000"+
		"\u0000p\u03a1\u0001\u0000\u0000\u0000r\u03a4\u0001\u0000\u0000\u0000t"+
		"\u03a9\u0001\u0000\u0000\u0000v\u03ae\u0001\u0000\u0000\u0000x\u03b3\u0001"+
		"\u0000\u0000\u0000z\u03b7\u0001\u0000\u0000\u0000|\u03b9\u0001\u0000\u0000"+
		"\u0000~\u03bc\u0001\u0000\u0000\u0000\u0080\u03be\u0001\u0000\u0000\u0000"+
		"\u0082\u03c0\u0001\u0000\u0000\u0000\u0084\u03cd\u0001\u0000\u0000\u0000"+
		"\u0086\u0087\u0003\u0002\u0001\u0000\u0087\u0088\u0005\u0000\u0000\u0001"+
		"\u0088\u008b\u0001\u0000\u0000\u0000\u0089\u008b\u0005\u0000\u0000\u0001"+
		"\u008a\u0086\u0001\u0000\u0000\u0000\u008a\u0089\u0001\u0000\u0000\u0000"+
		"\u008b\u0001\u0001\u0000\u0000\u0000\u008c\u008f\u0003\n\u0005\u0000\u008d"+
		"\u008f\u0003f3\u0000\u008e\u008c\u0001\u0000\u0000\u0000\u008e\u008d\u0001"+
		"\u0000\u0000\u0000\u008f\u0092\u0001\u0000\u0000\u0000\u0090\u008e\u0001"+
		"\u0000\u0000\u0000\u0090\u0091\u0001\u0000\u0000\u0000\u0091\u0003\u0001"+
		"\u0000\u0000\u0000\u0092\u0090\u0001\u0000\u0000\u0000\u0093\u0095\u0003"+
		"\u001c\u000e\u0000\u0094\u0096\u0003\u0080@\u0000\u0095\u0094\u0001\u0000"+
		"\u0000\u0000\u0095\u0096\u0001\u0000\u0000\u0000\u0096\u0097\u0001\u0000"+
		"\u0000\u0000\u0097\u0099\u0003\"\u0011\u0000\u0098\u009a\u0003\u0080@"+
		"\u0000\u0099\u0098\u0001\u0000\u0000\u0000\u0099\u009a\u0001\u0000\u0000"+
		"\u0000\u009a\u009b\u0001\u0000\u0000\u0000\u009b\u009d\u0003\b\u0004\u0000"+
		"\u009c\u009e\u0003\u0080@\u0000\u009d\u009c\u0001\u0000\u0000\u0000\u009d"+
		"\u009e\u0001\u0000\u0000\u0000\u009e\u009f\u0001\u0000\u0000\u0000\u009f"+
		"\u00a1\u0005\u0019\u0000\u0000\u00a0\u00a2\u0003\u0080@\u0000\u00a1\u00a0"+
		"\u0001\u0000\u0000\u0000\u00a1\u00a2\u0001\u0000\u0000\u0000\u00a2\u00a3"+
		"\u0001\u0000\u0000\u0000\u00a3\u00a4\u0003~?\u0000\u00a4\u00a5\u0003f"+
		"3\u0000\u00a5\u010e\u0001\u0000\u0000\u0000\u00a6\u00a8\u0003\u001c\u000e"+
		"\u0000\u00a7\u00a9\u0003\u0080@\u0000\u00a8\u00a7\u0001\u0000\u0000\u0000"+
		"\u00a8\u00a9\u0001\u0000\u0000\u0000\u00a9\u00aa\u0001\u0000\u0000\u0000"+
		"\u00aa\u00ac\u0003\"\u0011\u0000\u00ab\u00ad\u0003\u0080@\u0000\u00ac"+
		"\u00ab\u0001\u0000\u0000\u0000\u00ac\u00ad\u0001\u0000\u0000\u0000\u00ad"+
		"\u00ae\u0001\u0000\u0000\u0000\u00ae\u00b0\u0003\b\u0004\u0000\u00af\u00b1"+
		"\u0003\u0080@\u0000\u00b0\u00af\u0001\u0000\u0000\u0000\u00b0\u00b1\u0001"+
		"\u0000\u0000\u0000\u00b1\u00b2\u0001\u0000\u0000\u0000\u00b2\u00b4\u0005"+
		"\u0018\u0000\u0000\u00b3\u00b5\u0003\u0080@\u0000\u00b4\u00b3\u0001\u0000"+
		"\u0000\u0000\u00b4\u00b5\u0001\u0000\u0000\u0000\u00b5\u00b6\u0001\u0000"+
		"\u0000\u0000\u00b6\u00b8\u0003\b\u0004\u0000\u00b7\u00b9\u0003\u0080@"+
		"\u0000\u00b8\u00b7\u0001\u0000\u0000\u0000\u00b8\u00b9\u0001\u0000\u0000"+
		"\u0000\u00b9\u00ba\u0001\u0000\u0000\u0000\u00ba\u00bb\u0005\u0019\u0000"+
		"\u0000\u00bb\u00bc\u0003~?\u0000\u00bc\u00bd\u0003f3\u0000\u00bd\u010e"+
		"\u0001\u0000\u0000\u0000\u00be\u00c0\u0003\u001c\u000e\u0000\u00bf\u00c1"+
		"\u0003\u0080@\u0000\u00c0\u00bf\u0001\u0000\u0000\u0000\u00c0\u00c1\u0001"+
		"\u0000\u0000\u0000\u00c1\u00c2\u0001\u0000\u0000\u0000\u00c2\u00c4\u0003"+
		"\"\u0011\u0000\u00c3\u00c5\u0003\u0080@\u0000\u00c4\u00c3\u0001\u0000"+
		"\u0000\u0000\u00c4\u00c5\u0001\u0000\u0000\u0000\u00c5\u00c6\u0001\u0000"+
		"\u0000\u0000\u00c6\u00c8\u0003\b\u0004\u0000\u00c7\u00c9\u0003\u0080@"+
		"\u0000\u00c8\u00c7\u0001\u0000\u0000\u0000\u00c8\u00c9\u0001\u0000\u0000"+
		"\u0000\u00c9\u00ca\u0001\u0000\u0000\u0000\u00ca\u00cc\u0005\u0018\u0000"+
		"\u0000\u00cb\u00cd\u0003\u0080@\u0000\u00cc\u00cb\u0001\u0000\u0000\u0000"+
		"\u00cc\u00cd\u0001\u0000\u0000\u0000\u00cd\u00ce\u0001\u0000\u0000\u0000"+
		"\u00ce\u00cf\u0003\u0004\u0002\u0000\u00cf\u010e\u0001\u0000\u0000\u0000"+
		"\u00d0\u00d2\u0003\u001e\u000f\u0000\u00d1\u00d3\u0003\u0080@\u0000\u00d2"+
		"\u00d1\u0001\u0000\u0000\u0000\u00d2\u00d3\u0001\u0000\u0000\u0000\u00d3"+
		"\u00d4\u0001\u0000\u0000\u0000\u00d4\u00d6\u0003R)\u0000\u00d5\u00d7\u0003"+
		"\u0080@\u0000\u00d6\u00d5\u0001\u0000\u0000\u0000\u00d6\u00d7\u0001\u0000"+
		"\u0000\u0000\u00d7\u00d8\u0001\u0000\u0000\u0000\u00d8\u00da\u0003\b\u0004"+
		"\u0000\u00d9\u00db\u0003\u0080@\u0000\u00da\u00d9\u0001\u0000\u0000\u0000"+
		"\u00da\u00db\u0001\u0000\u0000\u0000\u00db\u00dc\u0001\u0000\u0000\u0000"+
		"\u00dc\u00de\u0005\u0019\u0000\u0000\u00dd\u00df\u0003\u0080@\u0000\u00de"+
		"\u00dd\u0001\u0000\u0000\u0000\u00de\u00df\u0001\u0000\u0000\u0000\u00df"+
		"\u00e0\u0001\u0000\u0000\u0000\u00e0\u00e1\u0003~?\u0000\u00e1\u00e2\u0003"+
		"f3\u0000\u00e2\u010e\u0001\u0000\u0000\u0000\u00e3\u00e5\u0003\u001e\u000f"+
		"\u0000\u00e4\u00e6\u0003\u0080@\u0000\u00e5\u00e4\u0001\u0000\u0000\u0000"+
		"\u00e5\u00e6\u0001\u0000\u0000\u0000\u00e6\u00e7\u0001\u0000\u0000\u0000"+
		"\u00e7\u00e9\u0003R)\u0000\u00e8\u00ea\u0003\u0080@\u0000\u00e9\u00e8"+
		"\u0001\u0000\u0000\u0000\u00e9\u00ea\u0001\u0000\u0000\u0000\u00ea\u00eb"+
		"\u0001\u0000\u0000\u0000\u00eb\u00ed\u0003\b\u0004\u0000\u00ec\u00ee\u0003"+
		"\u0080@\u0000\u00ed\u00ec\u0001\u0000\u0000\u0000\u00ed\u00ee\u0001\u0000"+
		"\u0000\u0000\u00ee\u00ef\u0001\u0000\u0000\u0000\u00ef\u00f1\u0005\u0018"+
		"\u0000\u0000\u00f0\u00f2\u0003\u0080@\u0000\u00f1\u00f0\u0001\u0000\u0000"+
		"\u0000\u00f1\u00f2\u0001\u0000\u0000\u0000\u00f2\u00f3\u0001\u0000\u0000"+
		"\u0000\u00f3\u00f5\u0003\b\u0004\u0000\u00f4\u00f6\u0003\u0080@\u0000"+
		"\u00f5\u00f4\u0001\u0000\u0000\u0000\u00f5\u00f6\u0001\u0000\u0000\u0000"+
		"\u00f6\u00f7\u0001\u0000\u0000\u0000\u00f7\u00f8\u0005\u0019\u0000\u0000"+
		"\u00f8\u00f9\u0003~?\u0000\u00f9\u00fa\u0003f3\u0000\u00fa\u010e\u0001"+
		"\u0000\u0000\u0000\u00fb\u00fd\u0003\u001e\u000f\u0000\u00fc\u00fe\u0003"+
		"\u0080@\u0000\u00fd\u00fc\u0001\u0000\u0000\u0000\u00fd\u00fe\u0001\u0000"+
		"\u0000\u0000\u00fe\u00ff\u0001\u0000\u0000\u0000\u00ff\u0101\u0003R)\u0000"+
		"\u0100\u0102\u0003\u0080@\u0000\u0101\u0100\u0001\u0000\u0000\u0000\u0101"+
		"\u0102\u0001\u0000\u0000\u0000\u0102\u0103\u0001\u0000\u0000\u0000\u0103"+
		"\u0105\u0003\b\u0004\u0000\u0104\u0106\u0003\u0080@\u0000\u0105\u0104"+
		"\u0001\u0000\u0000\u0000\u0105\u0106\u0001\u0000\u0000\u0000\u0106\u0107"+
		"\u0001\u0000\u0000\u0000\u0107\u0109\u0005\u0018\u0000\u0000\u0108\u010a"+
		"\u0003\u0080@\u0000\u0109\u0108\u0001\u0000\u0000\u0000\u0109\u010a\u0001"+
		"\u0000\u0000\u0000\u010a\u010b\u0001\u0000\u0000\u0000\u010b\u010c\u0003"+
		"\u0004\u0002\u0000\u010c\u010e\u0001\u0000\u0000\u0000\u010d\u0093\u0001"+
		"\u0000\u0000\u0000\u010d\u00a6\u0001\u0000\u0000\u0000\u010d\u00be\u0001"+
		"\u0000\u0000\u0000\u010d\u00d0\u0001\u0000\u0000\u0000\u010d\u00e3\u0001"+
		"\u0000\u0000\u0000\u010d\u00fb\u0001\u0000\u0000\u0000\u010e\u0005\u0001"+
		"\u0000\u0000\u0000\u010f\u0111\u0003\u001c\u000e\u0000\u0110\u0112\u0003"+
		"\u0080@\u0000\u0111\u0110\u0001\u0000\u0000\u0000\u0111\u0112\u0001\u0000"+
		"\u0000\u0000\u0112\u0113\u0001\u0000\u0000\u0000\u0113\u0114\u0003\"\u0011"+
		"\u0000\u0114\u0115\u0005%\u0000\u0000\u0115\u0116\u0003\\.\u0000\u0116"+
		"\u0117\u0005\u0019\u0000\u0000\u0117\u0118\u0003~?\u0000\u0118\u0154\u0001"+
		"\u0000\u0000\u0000\u0119\u011b\u0003\u001c\u000e\u0000\u011a\u011c\u0003"+
		"\u0080@\u0000\u011b\u011a\u0001\u0000\u0000\u0000\u011b\u011c\u0001\u0000"+
		"\u0000\u0000\u011c\u011d\u0001\u0000\u0000\u0000\u011d\u011e\u0003\"\u0011"+
		"\u0000\u011e\u011f\u0005%\u0000\u0000\u011f\u0120\u0003\\.\u0000\u0120"+
		"\u0121\u0005\u0018\u0000\u0000\u0121\u0122\u0005%\u0000\u0000\u0122\u0123"+
		"\u0003\\.\u0000\u0123\u0124\u0005\u0019\u0000\u0000\u0124\u0125\u0003"+
		"~?\u0000\u0125\u0154\u0001\u0000\u0000\u0000\u0126\u0128\u0003\u001c\u000e"+
		"\u0000\u0127\u0129\u0003\u0080@\u0000\u0128\u0127\u0001\u0000\u0000\u0000"+
		"\u0128\u0129\u0001\u0000\u0000\u0000\u0129\u012a\u0001\u0000\u0000\u0000"+
		"\u012a\u012b\u0003\"\u0011\u0000\u012b\u012c\u0005%\u0000\u0000\u012c"+
		"\u012d\u0003\\.\u0000\u012d\u012e\u0005\u0018\u0000\u0000\u012e\u012f"+
		"\u0005%\u0000\u0000\u012f\u0130\u0003\u0006\u0003\u0000\u0130\u0154\u0001"+
		"\u0000\u0000\u0000\u0131\u0133\u0003\u001e\u000f\u0000\u0132\u0134\u0003"+
		"\u0080@\u0000\u0133\u0132\u0001\u0000\u0000\u0000\u0133\u0134\u0001\u0000"+
		"\u0000\u0000\u0134\u0135\u0001\u0000\u0000\u0000\u0135\u0136\u0003R)\u0000"+
		"\u0136\u0137\u0005%\u0000\u0000\u0137\u0138\u0003\\.\u0000\u0138\u0139"+
		"\u0005\u0019\u0000\u0000\u0139\u013a\u0003~?\u0000\u013a\u0154\u0001\u0000"+
		"\u0000\u0000\u013b\u013d\u0003\u001e\u000f\u0000\u013c\u013e\u0003\u0080"+
		"@\u0000\u013d\u013c\u0001\u0000\u0000\u0000\u013d\u013e\u0001\u0000\u0000"+
		"\u0000\u013e\u013f\u0001\u0000\u0000\u0000\u013f\u0140\u0003R)\u0000\u0140"+
		"\u0141\u0005%\u0000\u0000\u0141\u0142\u0003\\.\u0000\u0142\u0143\u0005"+
		"\u0018\u0000\u0000\u0143\u0144\u0005%\u0000\u0000\u0144\u0145\u0003\\"+
		".\u0000\u0145\u0146\u0005\u0019\u0000\u0000\u0146\u0147\u0003~?\u0000"+
		"\u0147\u0154\u0001\u0000\u0000\u0000\u0148\u014a\u0003\u001e\u000f\u0000"+
		"\u0149\u014b\u0003\u0080@\u0000\u014a\u0149\u0001\u0000\u0000\u0000\u014a"+
		"\u014b\u0001\u0000\u0000\u0000\u014b\u014c\u0001\u0000\u0000\u0000\u014c"+
		"\u014d\u0003R)\u0000\u014d\u014e\u0005%\u0000\u0000\u014e\u014f\u0003"+
		"\\.\u0000\u014f\u0150\u0005\u0018\u0000\u0000\u0150\u0151\u0005%\u0000"+
		"\u0000\u0151\u0152\u0003\u0006\u0003\u0000\u0152\u0154\u0001\u0000\u0000"+
		"\u0000\u0153\u010f\u0001\u0000\u0000\u0000\u0153\u0119\u0001\u0000\u0000"+
		"\u0000\u0153\u0126\u0001\u0000\u0000\u0000\u0153\u0131\u0001\u0000\u0000"+
		"\u0000\u0153\u013b\u0001\u0000\u0000\u0000\u0153\u0148\u0001\u0000\u0000"+
		"\u0000\u0154\u0007\u0001\u0000\u0000\u0000\u0155\u0156\u0003~?\u0000\u0156"+
		"\u0157\u0003f3\u0000\u0157\u0158\u0003\u0002\u0001\u0000\u0158\t\u0001"+
		"\u0000\u0000\u0000\u0159\u015b\u0003\u0080@\u0000\u015a\u0159\u0001\u0000"+
		"\u0000\u0000\u015a\u015b\u0001\u0000\u0000\u0000\u015b\u015c\u0001\u0000"+
		"\u0000\u0000\u015c\u0188\u0005)\u0000\u0000\u015d\u015f\u0003\u0080@\u0000"+
		"\u015e\u015d\u0001\u0000\u0000\u0000\u015e\u015f\u0001\u0000\u0000\u0000"+
		"\u015f\u0160\u0001\u0000\u0000\u0000\u0160\u0188\u0003\u0004\u0002\u0000"+
		"\u0161\u0163\u0003\u0080@\u0000\u0162\u0161\u0001\u0000\u0000\u0000\u0162"+
		"\u0163\u0001\u0000\u0000\u0000\u0163\u0164\u0001\u0000\u0000\u0000\u0164"+
		"\u0188\u0003\f\u0006\u0000\u0165\u0167\u0003\u0080@\u0000\u0166\u0165"+
		"\u0001\u0000\u0000\u0000\u0166\u0167\u0001\u0000\u0000\u0000\u0167\u0168"+
		"\u0001\u0000\u0000\u0000\u0168\u0188\u0003\u0010\b\u0000\u0169\u016b\u0003"+
		"\u0080@\u0000\u016a\u0169\u0001\u0000\u0000\u0000\u016a\u016b\u0001\u0000"+
		"\u0000\u0000\u016b\u016c\u0001\u0000\u0000\u0000\u016c\u016d\u0003\u0012"+
		"\t\u0000\u016d\u016e\u0003f3\u0000\u016e\u0188\u0001\u0000\u0000\u0000"+
		"\u016f\u0171\u0003\u0080@\u0000\u0170\u016f\u0001\u0000\u0000\u0000\u0170"+
		"\u0171\u0001\u0000\u0000\u0000\u0171\u0172\u0001\u0000\u0000\u0000\u0172"+
		"\u0188\u0003\u0014\n\u0000\u0173\u0175\u0003\u0080@\u0000\u0174\u0173"+
		"\u0001\u0000\u0000\u0000\u0174\u0175\u0001\u0000\u0000\u0000\u0175\u0176"+
		"\u0001\u0000\u0000\u0000\u0176\u0177\u0003\u0018\f\u0000\u0177\u0178\u0003"+
		"f3\u0000\u0178\u0188\u0001\u0000\u0000\u0000\u0179\u017b\u0003\u0080@"+
		"\u0000\u017a\u0179\u0001\u0000\u0000\u0000\u017a\u017b\u0001\u0000\u0000"+
		"\u0000\u017b\u017c\u0001\u0000\u0000\u0000\u017c\u017d\u0003B!\u0000\u017d"+
		"\u017e\u0003f3\u0000\u017e\u0188\u0001\u0000\u0000\u0000\u017f\u0181\u0003"+
		"\u0080@\u0000\u0180\u017f\u0001\u0000\u0000\u0000\u0180\u0181\u0001\u0000"+
		"\u0000\u0000\u0181\u0182\u0001\u0000\u0000\u0000\u0182\u0188\u0003L&\u0000"+
		"\u0183\u0185\u0003\u0080@\u0000\u0184\u0183\u0001\u0000\u0000\u0000\u0184"+
		"\u0185\u0001\u0000\u0000\u0000\u0185\u0186\u0001\u0000\u0000\u0000\u0186"+
		"\u0188\u0003\u0082A\u0000\u0187\u015a\u0001\u0000\u0000\u0000\u0187\u015e"+
		"\u0001\u0000\u0000\u0000\u0187\u0162\u0001\u0000\u0000\u0000\u0187\u0166"+
		"\u0001\u0000\u0000\u0000\u0187\u016a\u0001\u0000\u0000\u0000\u0187\u0170"+
		"\u0001\u0000\u0000\u0000\u0187\u0174\u0001\u0000\u0000\u0000\u0187\u017a"+
		"\u0001\u0000\u0000\u0000\u0187\u0180\u0001\u0000\u0000\u0000\u0187\u0184"+
		"\u0001\u0000\u0000\u0000\u0188\u000b\u0001\u0000\u0000\u0000\u0189\u018b"+
		"\u0003`0\u0000\u018a\u0189\u0001\u0000\u0000\u0000\u018a\u018b\u0001\u0000"+
		"\u0000\u0000\u018b\u018c\u0001\u0000\u0000\u0000\u018c\u018d\u0005\u001e"+
		"\u0000\u0000\u018d\u018e\u0003\u0080@\u0000\u018e\u0190\u0003R)\u0000"+
		"\u018f\u0191\u0003\u0080@\u0000\u0190\u018f\u0001\u0000\u0000\u0000\u0190"+
		"\u0191\u0001\u0000\u0000\u0000\u0191\u0193\u0001\u0000\u0000\u0000\u0192"+
		"\u0194\u0005\u0001\u0000\u0000\u0193\u0192\u0001\u0000\u0000\u0000\u0193"+
		"\u0194\u0001\u0000\u0000\u0000\u0194\u0196\u0001\u0000\u0000\u0000\u0195"+
		"\u0197\u0003\u0080@\u0000\u0196\u0195\u0001\u0000\u0000\u0000\u0196\u0197"+
		"\u0001\u0000\u0000\u0000\u0197\u0198\u0001\u0000\u0000\u0000\u0198\u0199"+
		"\u0003\u000e\u0007\u0000\u0199\u019a\u0005\u0013\u0000\u0000\u019a\u019b"+
		"\u0003f3\u0000\u019b\r\u0001\u0000\u0000\u0000\u019c\u019d\u0003~?\u0000"+
		"\u019d\u019e\u0003f3\u0000\u019e\u01a5\u0001\u0000\u0000\u0000\u019f\u01a0"+
		"\u0003~?\u0000\u01a0\u01a1\u0003f3\u0000\u01a1\u01a2\u0003.\u0017\u0000"+
		"\u01a2\u01a3\u0003f3\u0000\u01a3\u01a5\u0001\u0000\u0000\u0000\u01a4\u019c"+
		"\u0001\u0000\u0000\u0000\u01a4\u019f\u0001\u0000\u0000\u0000\u01a5\u000f"+
		"\u0001\u0000\u0000\u0000\u01a6\u01a7\u0003 \u0010\u0000\u01a7\u01a8\u0003"+
		"&\u0013\u0000\u01a8\u01a9\u0003f3\u0000\u01a9\u0011\u0001\u0000\u0000"+
		"\u0000\u01aa\u01b3\u0005\u001b\u0000\u0000\u01ab\u01b3\u0005\u001c\u0000"+
		"\u0000\u01ac\u01b0\u0003\u001a\r\u0000\u01ad\u01ae\u0003\u0080@\u0000"+
		"\u01ae\u01af\u0003X,\u0000\u01af\u01b1\u0001\u0000\u0000\u0000\u01b0\u01ad"+
		"\u0001\u0000\u0000\u0000\u01b0\u01b1\u0001\u0000\u0000\u0000\u01b1\u01b3"+
		"\u0001\u0000\u0000\u0000\u01b2\u01aa\u0001\u0000\u0000\u0000\u01b2\u01ab"+
		"\u0001\u0000\u0000\u0000\u01b2\u01ac\u0001\u0000\u0000\u0000\u01b3\u0013"+
		"\u0001\u0000\u0000\u0000\u01b4\u01b6\u0005\u001f\u0000\u0000\u01b5\u01b7"+
		"\u0003\u0016\u000b\u0000\u01b6\u01b5\u0001\u0000\u0000\u0000\u01b6\u01b7"+
		"\u0001\u0000\u0000\u0000\u01b7\u01b8\u0001\u0000\u0000\u0000\u01b8\u01b9"+
		"\u0003~?\u0000\u01b9\u01ba\u0003f3\u0000\u01ba\u0015\u0001\u0000\u0000"+
		"\u0000\u01bb\u01bc\u0003\u0080@\u0000\u01bc\u01c0\u0003R)\u0000\u01bd"+
		"\u01be\u0003\u0080@\u0000\u01be\u01bf\u0003&\u0013\u0000\u01bf\u01c1\u0001"+
		"\u0000\u0000\u0000\u01c0\u01bd\u0001\u0000\u0000\u0000\u01c0\u01c1\u0001"+
		"\u0000\u0000\u0000\u01c1\u0017\u0001\u0000\u0000\u0000\u01c2\u01c4\u0003"+
		"R)\u0000\u01c3\u01c5\u0003\u0080@\u0000\u01c4\u01c3\u0001\u0000\u0000"+
		"\u0000\u01c4\u01c5\u0001\u0000\u0000\u0000\u01c5\u01c6\u0001\u0000\u0000"+
		"\u0000\u01c6\u01c8\u0005\u0001\u0000\u0000\u01c7\u01c9\u0003*\u0015\u0000"+
		"\u01c8\u01c7\u0001\u0000\u0000\u0000\u01c8\u01c9\u0001\u0000\u0000\u0000"+
		"\u01c9\u01ca\u0001\u0000\u0000\u0000\u01ca\u01cb\u0003~?\u0000\u01cb\u01d7"+
		"\u0001\u0000\u0000\u0000\u01cc\u01ce\u0003\u001a\r\u0000\u01cd\u01cf\u0003"+
		"\u0080@\u0000\u01ce\u01cd\u0001\u0000\u0000\u0000\u01ce\u01cf\u0001\u0000"+
		"\u0000\u0000\u01cf\u01d0\u0001\u0000\u0000\u0000\u01d0\u01d2\u0005\u0001"+
		"\u0000\u0000\u01d1\u01d3\u0003*\u0015\u0000\u01d2\u01d1\u0001\u0000\u0000"+
		"\u0000\u01d2\u01d3\u0001\u0000\u0000\u0000\u01d3\u01d4\u0001\u0000\u0000"+
		"\u0000\u01d4\u01d5\u0003~?\u0000\u01d5\u01d7\u0001\u0000\u0000\u0000\u01d6"+
		"\u01c2\u0001\u0000\u0000\u0000\u01d6\u01cc\u0001\u0000\u0000\u0000\u01d7"+
		"\u0019\u0001\u0000\u0000\u0000\u01d8\u01d9\u0003`0\u0000\u01d9\u01da\u0003"+
		"\u0080@\u0000\u01da\u01db\u0003R)\u0000\u01db\u001b\u0001\u0000\u0000"+
		"\u0000\u01dc\u01dd\u0007\u0000\u0000\u0000\u01dd\u001d\u0001\u0000\u0000"+
		"\u0000\u01de\u01df\u0007\u0001\u0000\u0000\u01df\u001f\u0001\u0000\u0000"+
		"\u0000\u01e0\u01e1\u0007\u0002\u0000\u0000\u01e1!\u0001\u0000\u0000\u0000"+
		"\u01e2\u01e3\u0005\n\u0000\u0000\u01e3\u01e4\u0003$\u0012\u0000\u01e4"+
		"\u01e5\u0005\u000e\u0000\u0000\u01e5\u01e6\u0003$\u0012\u0000\u01e6\u01e7"+
		"\u0005\u000b\u0000\u0000\u01e7\u01ee\u0001\u0000\u0000\u0000\u01e8\u01ea"+
		"\u0005!\u0000\u0000\u01e9\u01eb\u0003\u0080@\u0000\u01ea\u01e9\u0001\u0000"+
		"\u0000\u0000\u01ea\u01eb\u0001\u0000\u0000\u0000\u01eb\u01ec\u0001\u0000"+
		"\u0000\u0000\u01ec\u01ee\u0005!\u0000\u0000\u01ed\u01e2\u0001\u0000\u0000"+
		"\u0000\u01ed\u01e8\u0001\u0000\u0000\u0000\u01ee#\u0001\u0000\u0000\u0000"+
		"\u01ef\u01f1\u0003&\u0013\u0000\u01f0\u01ef\u0001\u0000\u0000\u0000\u01f0"+
		"\u01f1\u0001\u0000\u0000\u0000\u01f1%\u0001\u0000\u0000\u0000\u01f2\u01f4"+
		"\u0003\u0080@\u0000\u01f3\u01f2\u0001\u0000\u0000\u0000\u01f3\u01f4\u0001"+
		"\u0000\u0000\u0000\u01f4\u01f5\u0001\u0000\u0000\u0000\u01f5\u01f7\u0003"+
		"2\u0019\u0000\u01f6\u01f8\u0003\u0080@\u0000\u01f7\u01f6\u0001\u0000\u0000"+
		"\u0000\u01f7\u01f8\u0001\u0000\u0000\u0000\u01f8\u01fe\u0001\u0000\u0000"+
		"\u0000\u01f9\u01fa\u0003\u0080@\u0000\u01fa\u01fb\u00032\u0019\u0000\u01fb"+
		"\u01fd\u0001\u0000\u0000\u0000\u01fc\u01f9\u0001\u0000\u0000\u0000\u01fd"+
		"\u0200\u0001\u0000\u0000\u0000\u01fe\u01fc\u0001\u0000\u0000\u0000\u01fe"+
		"\u01ff\u0001\u0000\u0000\u0000\u01ff\u0202\u0001\u0000\u0000\u0000\u0200"+
		"\u01fe\u0001\u0000\u0000\u0000\u0201\u0203\u0003\u0080@\u0000\u0202\u0201"+
		"\u0001\u0000\u0000\u0000\u0202\u0203\u0001\u0000\u0000\u0000\u0203\'\u0001"+
		"\u0000\u0000\u0000\u0204\u0206\u0003\u0080@\u0000\u0205\u0204\u0001\u0000"+
		"\u0000\u0000\u0205\u0206\u0001\u0000\u0000\u0000\u0206\u0207\u0001\u0000"+
		"\u0000\u0000\u0207\u0209\u00036\u001b\u0000\u0208\u020a\u0003\u0080@\u0000"+
		"\u0209\u0208\u0001\u0000\u0000\u0000\u0209\u020a\u0001\u0000\u0000\u0000"+
		"\u020a\u0210\u0001\u0000\u0000\u0000\u020b\u020c\u0003\u0080@\u0000\u020c"+
		"\u020d\u00036\u001b\u0000\u020d\u020f\u0001\u0000\u0000\u0000\u020e\u020b"+
		"\u0001\u0000\u0000\u0000\u020f\u0212\u0001\u0000\u0000\u0000\u0210\u020e"+
		"\u0001\u0000\u0000\u0000\u0210\u0211\u0001\u0000\u0000\u0000\u0211\u0214"+
		"\u0001\u0000\u0000\u0000\u0212\u0210\u0001\u0000\u0000\u0000\u0213\u0215"+
		"\u0003\u0080@\u0000\u0214\u0213\u0001\u0000\u0000\u0000\u0214\u0215\u0001"+
		"\u0000\u0000\u0000\u0215)\u0001\u0000\u0000\u0000\u0216\u0218\u0003\u0080"+
		"@\u0000\u0217\u0216\u0001\u0000\u0000\u0000\u0217\u0218\u0001\u0000\u0000"+
		"\u0000\u0218\u0219\u0001\u0000\u0000\u0000\u0219\u021b\u0003:\u001d\u0000"+
		"\u021a\u021c\u0003\u0080@\u0000\u021b\u021a\u0001\u0000\u0000\u0000\u021b"+
		"\u021c\u0001\u0000\u0000\u0000\u021c\u0222\u0001\u0000\u0000\u0000\u021d"+
		"\u021e\u0003\u0080@\u0000\u021e\u021f\u0003:\u001d\u0000\u021f\u0221\u0001"+
		"\u0000\u0000\u0000\u0220\u021d\u0001\u0000\u0000\u0000\u0221\u0224\u0001"+
		"\u0000\u0000\u0000\u0222\u0220\u0001\u0000\u0000\u0000\u0222\u0223\u0001"+
		"\u0000\u0000\u0000\u0223\u0226\u0001\u0000\u0000\u0000\u0224\u0222\u0001"+
		"\u0000\u0000\u0000\u0225\u0227\u0003\u0080@\u0000\u0226\u0225\u0001\u0000"+
		"\u0000\u0000\u0226\u0227\u0001\u0000\u0000\u0000\u0227+\u0001\u0000\u0000"+
		"\u0000\u0228\u022a\u0003\u0080@\u0000\u0229\u0228\u0001\u0000\u0000\u0000"+
		"\u0229\u022a\u0001\u0000\u0000\u0000\u022a\u022b\u0001\u0000\u0000\u0000"+
		"\u022b\u022d\u0003>\u001f\u0000\u022c\u022e\u0003\u0080@\u0000\u022d\u022c"+
		"\u0001\u0000\u0000\u0000\u022d\u022e\u0001\u0000\u0000\u0000\u022e\u0234"+
		"\u0001\u0000\u0000\u0000\u022f\u0230\u0003\u0080@\u0000\u0230\u0231\u0003"+
		">\u001f\u0000\u0231\u0233\u0001\u0000\u0000\u0000\u0232\u022f\u0001\u0000"+
		"\u0000\u0000\u0233\u0236\u0001\u0000\u0000\u0000\u0234\u0232\u0001\u0000"+
		"\u0000\u0000\u0234\u0235\u0001\u0000\u0000\u0000\u0235\u0238\u0001\u0000"+
		"\u0000\u0000\u0236\u0234\u0001\u0000\u0000\u0000\u0237\u0239\u0003\u0080"+
		"@\u0000\u0238\u0237\u0001\u0000\u0000\u0000\u0238\u0239\u0001\u0000\u0000"+
		"\u0000\u0239-\u0001\u0000\u0000\u0000\u023a\u024c\u0003f3\u0000\u023b"+
		"\u023d\u0003f3\u0000\u023c\u023b\u0001\u0000\u0000\u0000\u023c\u023d\u0001"+
		"\u0000\u0000\u0000\u023d\u023e\u0001\u0000\u0000\u0000\u023e\u0248\u0003"+
		"0\u0018\u0000\u023f\u0240\u0003f3\u0000\u0240\u0241\u00030\u0018\u0000"+
		"\u0241\u0247\u0001\u0000\u0000\u0000\u0242\u0247\u0003f3\u0000\u0243\u0244"+
		"\u0003\u0080@\u0000\u0244\u0245\u0003>\u001f\u0000\u0245\u0247\u0001\u0000"+
		"\u0000\u0000\u0246\u023f\u0001\u0000\u0000\u0000\u0246\u0242\u0001\u0000"+
		"\u0000\u0000\u0246\u0243\u0001\u0000\u0000\u0000\u0247\u024a\u0001\u0000"+
		"\u0000\u0000\u0248\u0246\u0001\u0000\u0000\u0000\u0248\u0249\u0001\u0000"+
		"\u0000\u0000\u0249\u024c\u0001\u0000\u0000\u0000\u024a\u0248\u0001\u0000"+
		"\u0000\u0000\u024b\u023a\u0001\u0000\u0000\u0000\u024b\u023c\u0001\u0000"+
		"\u0000\u0000\u024c/\u0001\u0000\u0000\u0000\u024d\u0250\u0003n7\u0000"+
		"\u024e\u0250\u0003B!\u0000\u024f\u024d\u0001\u0000\u0000\u0000\u024f\u024e"+
		"\u0001\u0000\u0000\u0000\u0250\u0252\u0001\u0000\u0000\u0000\u0251\u0253"+
		"\u0003>\u001f\u0000\u0252\u0251\u0001\u0000\u0000\u0000\u0252\u0253\u0001"+
		"\u0000\u0000\u0000\u02531\u0001\u0000\u0000\u0000\u0254\u0256\u00034\u001a"+
		"\u0000\u0255\u0254\u0001\u0000\u0000\u0000\u0256\u0257\u0001\u0000\u0000"+
		"\u0000\u0257\u0255\u0001\u0000\u0000\u0000\u0257\u0258\u0001\u0000\u0000"+
		"\u0000\u02583\u0001\u0000\u0000\u0000\u0259\u0260\u0003r9\u0000\u025a"+
		"\u0260\u0003B!\u0000\u025b\u025c\u0005\n\u0000\u0000\u025c\u025d\u0003"+
		"(\u0014\u0000\u025d\u025e\u0005\u000b\u0000\u0000\u025e\u0260\u0001\u0000"+
		"\u0000\u0000\u025f\u0259\u0001\u0000\u0000\u0000\u025f\u025a\u0001\u0000"+
		"\u0000\u0000\u025f\u025b\u0001\u0000\u0000\u0000\u02605\u0001\u0000\u0000"+
		"\u0000\u0261\u0263\u00038\u001c\u0000\u0262\u0261\u0001\u0000\u0000\u0000"+
		"\u0263\u0264\u0001\u0000\u0000\u0000\u0264\u0262\u0001\u0000\u0000\u0000"+
		"\u0264\u0265\u0001\u0000\u0000\u0000\u02657\u0001\u0000\u0000\u0000\u0266"+
		"\u026d\u0003t:\u0000\u0267\u026d\u0003B!\u0000\u0268\u0269\u0005\n\u0000"+
		"\u0000\u0269\u026a\u0003(\u0014\u0000\u026a\u026b\u0005\u000b\u0000\u0000"+
		"\u026b\u026d\u0001\u0000\u0000\u0000\u026c\u0266\u0001\u0000\u0000\u0000"+
		"\u026c\u0267\u0001\u0000\u0000\u0000\u026c\u0268\u0001\u0000\u0000\u0000"+
		"\u026d9\u0001\u0000\u0000\u0000\u026e\u0270\u0003<\u001e\u0000\u026f\u026e"+
		"\u0001\u0000\u0000\u0000\u0270\u0271\u0001\u0000\u0000\u0000\u0271\u026f"+
		"\u0001\u0000\u0000\u0000\u0271\u0272\u0001\u0000\u0000\u0000\u0272;\u0001"+
		"\u0000\u0000\u0000\u0273\u0276\u0003v;\u0000\u0274\u0276\u0003B!\u0000"+
		"\u0275\u0273\u0001\u0000\u0000\u0000\u0275\u0274\u0001\u0000\u0000\u0000"+
		"\u0276=\u0001\u0000\u0000\u0000\u0277\u0279\u0003@ \u0000\u0278\u0277"+
		"\u0001\u0000\u0000\u0000\u0279\u027a\u0001\u0000\u0000\u0000\u027a\u0278"+
		"\u0001\u0000\u0000\u0000\u027a\u027b\u0001\u0000\u0000\u0000\u027b?\u0001"+
		"\u0000\u0000\u0000\u027c\u027f\u0003x<\u0000\u027d\u027f\u0003B!\u0000"+
		"\u027e\u027c\u0001\u0000\u0000\u0000\u027e\u027d\u0001\u0000\u0000\u0000"+
		"\u027fA\u0001\u0000\u0000\u0000\u0280\u02ba\u0005\u0004\u0000\u0000\u0281"+
		"\u0282\u0005\u0002\u0000\u0000\u0282\u0283\u0003D\"\u0000\u0283\u0284"+
		"\u0005\u000b\u0000\u0000\u0284\u02ba\u0001\u0000\u0000\u0000\u0285\u0286"+
		"\u0005\u0002\u0000\u0000\u0286\u0287\u0003D\"\u0000\u0287\u0288\u0003"+
		"\u0080@\u0000\u0288\u0289\u0003H$\u0000\u0289\u028a\u0005\u000b\u0000"+
		"\u0000\u028a\u02ba\u0001\u0000\u0000\u0000\u028b\u028c\u0005\u0002\u0000"+
		"\u0000\u028c\u028d\u0003D\"\u0000\u028d\u028e\u0005\u000e\u0000\u0000"+
		"\u028e\u028f\u0003H$\u0000\u028f\u0290\u0005\u000b\u0000\u0000\u0290\u02ba"+
		"\u0001\u0000\u0000\u0000\u0291\u0292\u0005\u0002\u0000\u0000\u0292\u0293"+
		"\u0003D\"\u0000\u0293\u0294\u0005\t\u0000\u0000\u0294\u0295\u0003&\u0013"+
		"\u0000\u0295\u0296\u0005\u000b\u0000\u0000\u0296\u02ba\u0001\u0000\u0000"+
		"\u0000\u0297\u0298\u0005\u0002\u0000\u0000\u0298\u0299\u0003D\"\u0000"+
		"\u0299\u029a\u0005\u0001\u0000\u0000\u029a\u029b\u0003&\u0013\u0000\u029b"+
		"\u029c\u0005\u000b\u0000\u0000\u029c\u02ba\u0001\u0000\u0000\u0000\u029d"+
		"\u029e\u0005\u0003\u0000\u0000\u029e\u029f\u0003D\"\u0000\u029f\u02a0"+
		"\u0005\r\u0000\u0000\u02a0\u02ba\u0001\u0000\u0000\u0000\u02a1\u02a2\u0005"+
		"\u0003\u0000\u0000\u02a2\u02a3\u0003D\"\u0000\u02a3\u02a4\u0003\u0080"+
		"@\u0000\u02a4\u02a5\u0003H$\u0000\u02a5\u02a6\u0005\r\u0000\u0000\u02a6"+
		"\u02ba\u0001\u0000\u0000\u0000\u02a7\u02a8\u0005\u0003\u0000\u0000\u02a8"+
		"\u02a9\u0003D\"\u0000\u02a9\u02aa\u0005\u000e\u0000\u0000\u02aa\u02ab"+
		"\u0003H$\u0000\u02ab\u02ac\u0005\r\u0000\u0000\u02ac\u02ba\u0001\u0000"+
		"\u0000\u0000\u02ad\u02ae\u0005\u0003\u0000\u0000\u02ae\u02af\u0003D\""+
		"\u0000\u02af\u02b0\u0005\t\u0000\u0000\u02b0\u02b1\u0003&\u0013\u0000"+
		"\u02b1\u02b2\u0005\r\u0000\u0000\u02b2\u02ba\u0001\u0000\u0000\u0000\u02b3"+
		"\u02b4\u0005\u0003\u0000\u0000\u02b4\u02b5\u0003D\"\u0000\u02b5\u02b6"+
		"\u0005\u0001\u0000\u0000\u02b6\u02b7\u0003&\u0013\u0000\u02b7\u02b8\u0005"+
		"\r\u0000\u0000\u02b8\u02ba\u0001\u0000\u0000\u0000\u02b9\u0280\u0001\u0000"+
		"\u0000\u0000\u02b9\u0281\u0001\u0000\u0000\u0000\u02b9\u0285\u0001\u0000"+
		"\u0000\u0000\u02b9\u028b\u0001\u0000\u0000\u0000\u02b9\u0291\u0001\u0000"+
		"\u0000\u0000\u02b9\u0297\u0001\u0000\u0000\u0000\u02b9\u029d\u0001\u0000"+
		"\u0000\u0000\u02b9\u02a1\u0001\u0000\u0000\u0000\u02b9\u02a7\u0001\u0000"+
		"\u0000\u0000\u02b9\u02ad\u0001\u0000\u0000\u0000\u02b9\u02b3\u0001\u0000"+
		"\u0000\u0000\u02baC\u0001\u0000\u0000\u0000\u02bb\u02bd\u0003F#\u0000"+
		"\u02bc\u02bb\u0001\u0000\u0000\u0000\u02bd\u02be\u0001\u0000\u0000\u0000"+
		"\u02be\u02bc\u0001\u0000\u0000\u0000\u02be\u02bf\u0001\u0000\u0000\u0000"+
		"\u02bfE\u0001\u0000\u0000\u0000\u02c0\u02c3\u0005$\u0000\u0000\u02c1\u02c3"+
		"\u0003B!\u0000\u02c2\u02c0\u0001\u0000\u0000\u0000\u02c2\u02c1\u0001\u0000"+
		"\u0000\u0000\u02c3G\u0001\u0000\u0000\u0000\u02c4\u02c6\u0003J%\u0000"+
		"\u02c5\u02c4\u0001\u0000\u0000\u0000\u02c5\u02c6\u0001\u0000\u0000\u0000"+
		"\u02c6\u02cd\u0001\u0000\u0000\u0000\u02c7\u02c9\u0005\u000e\u0000\u0000"+
		"\u02c8\u02ca\u0003J%\u0000\u02c9\u02c8\u0001\u0000\u0000\u0000\u02c9\u02ca"+
		"\u0001\u0000\u0000\u0000\u02ca\u02cc\u0001\u0000\u0000\u0000\u02cb\u02c7"+
		"\u0001\u0000\u0000\u0000\u02cc\u02cf\u0001\u0000\u0000\u0000\u02cd\u02cb"+
		"\u0001\u0000\u0000\u0000\u02cd\u02ce\u0001\u0000\u0000\u0000\u02ceI\u0001"+
		"\u0000\u0000\u0000\u02cf\u02cd\u0001\u0000\u0000\u0000\u02d0\u02d1\u0003"+
		"&\u0013\u0000\u02d1K\u0001\u0000\u0000\u0000\u02d2\u02fc\u0003N\'\u0000"+
		"\u02d3\u02d5\u0003X,\u0000\u02d4\u02d6\u0003\u0080@\u0000\u02d5\u02d4"+
		"\u0001\u0000\u0000\u0000\u02d5\u02d6\u0001\u0000\u0000\u0000\u02d6\u02d7"+
		"\u0001\u0000\u0000\u0000\u02d7\u02d9\u0003|>\u0000\u02d8\u02da\u0003\u0080"+
		"@\u0000\u02d9\u02d8\u0001\u0000\u0000\u0000\u02d9\u02da\u0001\u0000\u0000"+
		"\u0000\u02da\u02db\u0001\u0000\u0000\u0000\u02db\u02e4\u0003T*\u0000\u02dc"+
		"\u02de\u0003\u0080@\u0000\u02dd\u02dc\u0001\u0000\u0000\u0000\u02dd\u02de"+
		"\u0001\u0000\u0000\u0000\u02de\u02df\u0001\u0000\u0000\u0000\u02df\u02e1"+
		"\u0005\u000f\u0000\u0000\u02e0\u02e2\u0003\u0080@\u0000\u02e1\u02e0\u0001"+
		"\u0000\u0000\u0000\u02e1\u02e2\u0001\u0000\u0000\u0000\u02e2\u02e3\u0001"+
		"\u0000\u0000\u0000\u02e3\u02e5\u0003V+\u0000\u02e4\u02dd\u0001\u0000\u0000"+
		"\u0000\u02e4\u02e5\u0001\u0000\u0000\u0000\u02e5\u02e7\u0001\u0000\u0000"+
		"\u0000\u02e6\u02e8\u0003\u0080@\u0000\u02e7\u02e6\u0001\u0000\u0000\u0000"+
		"\u02e7\u02e8\u0001\u0000\u0000\u0000\u02e8\u02e9\u0001\u0000\u0000\u0000"+
		"\u02e9\u02eb\u0005%\u0000\u0000\u02ea\u02ec\u0003Z-\u0000\u02eb\u02ea"+
		"\u0001\u0000\u0000\u0000\u02eb\u02ec\u0001\u0000\u0000\u0000\u02ec\u02fc"+
		"\u0001\u0000\u0000\u0000\u02ed\u02ef\u0003X,\u0000\u02ee\u02f0\u0003\u0080"+
		"@\u0000\u02ef\u02ee\u0001\u0000\u0000\u0000\u02ef\u02f0\u0001\u0000\u0000"+
		"\u0000\u02f0\u02f1\u0001\u0000\u0000\u0000\u02f1\u02f3\u0003|>\u0000\u02f2"+
		"\u02f4\u0003\u0080@\u0000\u02f3\u02f2\u0001\u0000\u0000\u0000\u02f3\u02f4"+
		"\u0001\u0000\u0000\u0000\u02f4\u02f5\u0001\u0000\u0000\u0000\u02f5\u02f7"+
		"\u0003\u0018\f\u0000\u02f6\u02f8\u0003\u0080@\u0000\u02f7\u02f6\u0001"+
		"\u0000\u0000\u0000\u02f7\u02f8\u0001\u0000\u0000\u0000\u02f8\u02f9\u0001"+
		"\u0000\u0000\u0000\u02f9\u02fa\u0005%\u0000\u0000\u02fa\u02fc\u0001\u0000"+
		"\u0000\u0000\u02fb\u02d2\u0001\u0000\u0000\u0000\u02fb\u02d3\u0001\u0000"+
		"\u0000\u0000\u02fb\u02ed\u0001\u0000\u0000\u0000\u02fcM\u0001\u0000\u0000"+
		"\u0000\u02fd\u02ff\u0003X,\u0000\u02fe\u0300\u0003\u0080@\u0000\u02ff"+
		"\u02fe\u0001\u0000\u0000\u0000\u02ff\u0300\u0001\u0000\u0000\u0000\u0300"+
		"\u0301\u0001\u0000\u0000\u0000\u0301\u0303\u0003|>\u0000\u0302\u0304\u0003"+
		"\u0080@\u0000\u0303\u0302\u0001\u0000\u0000\u0000\u0303\u0304\u0001\u0000"+
		"\u0000\u0000\u0304\u0305\u0001\u0000\u0000\u0000\u0305\u0307\u0003R)\u0000"+
		"\u0306\u0308\u0003\u0080@\u0000\u0307\u0306\u0001\u0000\u0000\u0000\u0307"+
		"\u0308\u0001\u0000\u0000\u0000\u0308\u0309\u0001\u0000\u0000\u0000\u0309"+
		"\u030b\u0003|>\u0000\u030a\u030c\u0003\u0080@\u0000\u030b\u030a\u0001"+
		"\u0000\u0000\u0000\u030b\u030c\u0001\u0000\u0000\u0000\u030c\u030d\u0001"+
		"\u0000\u0000\u0000\u030d\u0316\u0003T*\u0000\u030e\u0310\u0003\u0080@"+
		"\u0000\u030f\u030e\u0001\u0000\u0000\u0000\u030f\u0310\u0001\u0000\u0000"+
		"\u0000\u0310\u0311\u0001\u0000\u0000\u0000\u0311\u0313\u0005\u000f\u0000"+
		"\u0000\u0312\u0314\u0003\u0080@\u0000\u0313\u0312\u0001\u0000\u0000\u0000"+
		"\u0313\u0314\u0001\u0000\u0000\u0000\u0314\u0315\u0001\u0000\u0000\u0000"+
		"\u0315\u0317\u0003V+\u0000\u0316\u030f\u0001\u0000\u0000\u0000\u0316\u0317"+
		"\u0001\u0000\u0000\u0000\u0317\u0319\u0001\u0000\u0000\u0000\u0318\u031a"+
		"\u0003\u0080@\u0000\u0319\u0318\u0001\u0000\u0000\u0000\u0319\u031a\u0001"+
		"\u0000\u0000\u0000\u031a\u031b\u0001\u0000\u0000\u0000\u031b\u031d\u0005"+
		"%\u0000\u0000\u031c\u031e\u0003Z-\u0000\u031d\u031c\u0001\u0000\u0000"+
		"\u0000\u031d\u031e\u0001\u0000\u0000\u0000\u031eO\u0001\u0000\u0000\u0000"+
		"\u031f\u0320\u0003R)\u0000\u0320Q\u0001\u0000\u0000\u0000\u0321\u0324"+
		"\u0003b1\u0000\u0322\u0324\u0003B!\u0000\u0323\u0321\u0001\u0000\u0000"+
		"\u0000\u0323\u0322\u0001\u0000\u0000\u0000\u0324\u0325\u0001\u0000\u0000"+
		"\u0000\u0325\u0323\u0001\u0000\u0000\u0000\u0325\u0326\u0001\u0000\u0000"+
		"\u0000\u0326S\u0001\u0000\u0000\u0000\u0327\u0329\u0003X,\u0000\u0328"+
		"\u0327\u0001\u0000\u0000\u0000\u0328\u0329\u0001\u0000\u0000\u0000\u0329"+
		"U\u0001\u0000\u0000\u0000\u032a\u032c\u0003X,\u0000\u032b\u032a\u0001"+
		"\u0000\u0000\u0000\u032b\u032c\u0001\u0000\u0000\u0000\u032cW\u0001\u0000"+
		"\u0000\u0000\u032d\u0333\u0003P(\u0000\u032e\u032f\u0003\u0080@\u0000"+
		"\u032f\u0330\u0003P(\u0000\u0330\u0332\u0001\u0000\u0000\u0000\u0331\u032e"+
		"\u0001\u0000\u0000\u0000\u0332\u0335\u0001\u0000\u0000\u0000\u0333\u0331"+
		"\u0001\u0000\u0000\u0000\u0333\u0334\u0001\u0000\u0000\u0000\u0334Y\u0001"+
		"\u0000\u0000\u0000\u0335\u0333\u0001\u0000\u0000\u0000\u0336\u0338\u0003"+
		"^/\u0000\u0337\u0336\u0001\u0000\u0000\u0000\u0338\u0339\u0001\u0000\u0000"+
		"\u0000\u0339\u0337\u0001\u0000\u0000\u0000\u0339\u033a\u0001\u0000\u0000"+
		"\u0000\u033a[\u0001\u0000\u0000\u0000\u033b\u033d\u0003~?\u0000\u033c"+
		"\u033e\u0003Z-\u0000\u033d\u033c\u0001\u0000\u0000\u0000\u033d\u033e\u0001"+
		"\u0000\u0000\u0000\u033e]\u0001\u0000\u0000\u0000\u033f\u0341\u0005&\u0000"+
		"\u0000\u0340\u0342\u0003\u0080@\u0000\u0341\u0340\u0001\u0000\u0000\u0000"+
		"\u0341\u0342\u0001\u0000\u0000\u0000\u0342\u0343\u0001\u0000\u0000\u0000"+
		"\u0343\u0344\u0003,\u0016\u0000\u0344\u0345\u0005%\u0000\u0000\u0345\u0354"+
		"\u0001\u0000\u0000\u0000\u0346\u0348\u0005&\u0000\u0000\u0347\u0349\u0003"+
		"\u0080@\u0000\u0348\u0347\u0001\u0000\u0000\u0000\u0348\u0349\u0001\u0000"+
		"\u0000\u0000\u0349\u034a\u0001\u0000\u0000\u0000\u034a\u034b\u0005)\u0000"+
		"\u0000\u034b\u0354\u0005%\u0000\u0000\u034c\u034e\u0003\u0080@\u0000\u034d"+
		"\u034c\u0001\u0000\u0000\u0000\u034d\u034e\u0001\u0000\u0000\u0000\u034e"+
		"\u034f\u0001\u0000\u0000\u0000\u034f\u0350\u0005)\u0000\u0000\u0350\u0354"+
		"\u0005%\u0000\u0000\u0351\u0354\u0003\u0006\u0003\u0000\u0352\u0354\u0005"+
		"%\u0000\u0000\u0353\u033f\u0001\u0000\u0000\u0000\u0353\u0346\u0001\u0000"+
		"\u0000\u0000\u0353\u034d\u0001\u0000\u0000\u0000\u0353\u0351\u0001\u0000"+
		"\u0000\u0000\u0353\u0352\u0001\u0000\u0000\u0000\u0354_\u0001\u0000\u0000"+
		"\u0000\u0355\u036a\u0005\u001a\u0000\u0000\u0356\u036a\u0005\u001b\u0000"+
		"\u0000\u0357\u036a\u0005\u001c\u0000\u0000\u0358\u0359\u0005\u001a\u0000"+
		"\u0000\u0359\u035a\u0003\u0080@\u0000\u035a\u035b\u0005\u001b\u0000\u0000"+
		"\u035b\u036a\u0001\u0000\u0000\u0000\u035c\u035d\u0005\u001b\u0000\u0000"+
		"\u035d\u035e\u0003\u0080@\u0000\u035e\u035f\u0005\u001a\u0000\u0000\u035f"+
		"\u036a\u0001\u0000\u0000\u0000\u0360\u036a\u0005\u001d\u0000\u0000\u0361"+
		"\u0362\u0005\u001a\u0000\u0000\u0362\u0363\u0003\u0080@\u0000\u0363\u0364"+
		"\u0005\u001d\u0000\u0000\u0364\u036a\u0001\u0000\u0000\u0000\u0365\u0366"+
		"\u0005\u001d\u0000\u0000\u0366\u0367\u0003\u0080@\u0000\u0367\u0368\u0005"+
		"\u001a\u0000\u0000\u0368\u036a\u0001\u0000\u0000\u0000\u0369\u0355\u0001"+
		"\u0000\u0000\u0000\u0369\u0356\u0001\u0000\u0000\u0000\u0369\u0357\u0001"+
		"\u0000\u0000\u0000\u0369\u0358\u0001\u0000\u0000\u0000\u0369\u035c\u0001"+
		"\u0000\u0000\u0000\u0369\u0360\u0001\u0000\u0000\u0000\u0369\u0361\u0001"+
		"\u0000\u0000\u0000\u0369\u0365\u0001\u0000\u0000\u0000\u036aa\u0001\u0000"+
		"\u0000\u0000\u036b\u036d\u0003d2\u0000\u036c\u036b\u0001\u0000\u0000\u0000"+
		"\u036d\u036e\u0001\u0000\u0000\u0000\u036e\u036c\u0001\u0000\u0000\u0000"+
		"\u036e\u036f\u0001\u0000\u0000\u0000\u036fc\u0001\u0000\u0000\u0000\u0370"+
		"\u0378\u0005$\u0000\u0000\u0371\u0378\u0003z=\u0000\u0372\u0378\u0005"+
		"\u000e\u0000\u0000\u0373\u0378\u0005\n\u0000\u0000\u0374\u0378\u0005\u000b"+
		"\u0000\u0000\u0375\u0378\u0005\f\u0000\u0000\u0376\u0378\u0005\r\u0000"+
		"\u0000\u0377\u0370\u0001\u0000\u0000\u0000\u0377\u0371\u0001\u0000\u0000"+
		"\u0000\u0377\u0372\u0001\u0000\u0000\u0000\u0377\u0373\u0001\u0000\u0000"+
		"\u0000\u0377\u0374\u0001\u0000\u0000\u0000\u0377\u0375\u0001\u0000\u0000"+
		"\u0000\u0377\u0376\u0001\u0000\u0000\u0000\u0378e\u0001\u0000\u0000\u0000"+
		"\u0379\u037a\u0005%\u0000\u0000\u037ag\u0001\u0000\u0000\u0000\u037b\u037c"+
		"\u0007\u0003\u0000\u0000\u037ci\u0001\u0000\u0000\u0000\u037d\u0380\u0003"+
		"h4\u0000\u037e\u0380\u0005\u000e\u0000\u0000\u037f\u037d\u0001\u0000\u0000"+
		"\u0000\u037f\u037e\u0001\u0000\u0000\u0000\u0380k\u0001\u0000\u0000\u0000"+
		"\u0381\u0388\u0003j5\u0000\u0382\u0388\u0005\n\u0000\u0000\u0383\u0388"+
		"\u0005\u000b\u0000\u0000\u0384\u0388\u0005\f\u0000\u0000\u0385\u0388\u0005"+
		"\r\u0000\u0000\u0386\u0388\u0003z=\u0000\u0387\u0381\u0001\u0000\u0000"+
		"\u0000\u0387\u0382\u0001\u0000\u0000\u0000\u0387\u0383\u0001\u0000\u0000"+
		"\u0000\u0387\u0384\u0001\u0000\u0000\u0000\u0387\u0385\u0001\u0000\u0000"+
		"\u0000\u0387\u0386\u0001\u0000\u0000\u0000\u0388m\u0001\u0000\u0000\u0000"+
		"\u0389\u039d\u0003h4\u0000\u038a\u039d\u0005\n\u0000\u0000\u038b\u039d"+
		"\u0005\u000b\u0000\u0000\u038c\u039d\u0005\f\u0000\u0000\u038d\u039d\u0005"+
		"\r\u0000\u0000\u038e\u039d\u0005\u000e\u0000\u0000\u038f\u039d\u0005)"+
		"\u0000\u0000\u0390\u039d\u0005\u0010\u0000\u0000\u0391\u039d\u0005\u001a"+
		"\u0000\u0000\u0392\u039d\u0005\u001b\u0000\u0000\u0393\u039d\u0005\u001c"+
		"\u0000\u0000\u0394\u039d\u0005\u0014\u0000\u0000\u0395\u039d\u0005\u0015"+
		"\u0000\u0000\u0396\u039d\u0005\u0016\u0000\u0000\u0397\u039d\u0005\u0017"+
		"\u0000\u0000\u0398\u039d\u0005\u0018\u0000\u0000\u0399\u039d\u0005\u0019"+
		"\u0000\u0000\u039a\u039d\u0005\u001e\u0000\u0000\u039b\u039d\u0005\u001d"+
		"\u0000\u0000\u039c\u0389\u0001\u0000\u0000\u0000\u039c\u038a\u0001\u0000"+
		"\u0000\u0000\u039c\u038b\u0001\u0000\u0000\u0000\u039c\u038c\u0001\u0000"+
		"\u0000\u0000\u039c\u038d\u0001\u0000\u0000\u0000\u039c\u038e\u0001\u0000"+
		"\u0000\u0000\u039c\u038f\u0001\u0000\u0000\u0000\u039c\u0390\u0001\u0000"+
		"\u0000\u0000\u039c\u0391\u0001\u0000\u0000\u0000\u039c\u0392\u0001\u0000"+
		"\u0000\u0000\u039c\u0393\u0001\u0000\u0000\u0000\u039c\u0394\u0001\u0000"+
		"\u0000\u0000\u039c\u0395\u0001\u0000\u0000\u0000\u039c\u0396\u0001\u0000"+
		"\u0000\u0000\u039c\u0397\u0001\u0000\u0000\u0000\u039c\u0398\u0001\u0000"+
		"\u0000\u0000\u039c\u0399\u0001\u0000\u0000\u0000\u039c\u039a\u0001\u0000"+
		"\u0000\u0000\u039c\u039b\u0001\u0000\u0000\u0000\u039do\u0001\u0000\u0000"+
		"\u0000\u039e\u03a2\u0003l6\u0000\u039f\u03a2\u0005)\u0000\u0000\u03a0"+
		"\u03a2\u0005\u000f\u0000\u0000\u03a1\u039e\u0001\u0000\u0000\u0000\u03a1"+
		"\u039f\u0001\u0000\u0000\u0000\u03a1\u03a0\u0001\u0000\u0000\u0000\u03a2"+
		"q\u0001\u0000\u0000\u0000\u03a3\u03a5\u0003h4\u0000\u03a4\u03a3\u0001"+
		"\u0000\u0000\u0000\u03a5\u03a6\u0001\u0000\u0000\u0000\u03a6\u03a4\u0001"+
		"\u0000\u0000\u0000\u03a6\u03a7\u0001\u0000\u0000\u0000\u03a7s\u0001\u0000"+
		"\u0000\u0000\u03a8\u03aa\u0003j5\u0000\u03a9\u03a8\u0001\u0000\u0000\u0000"+
		"\u03aa\u03ab\u0001\u0000\u0000\u0000\u03ab\u03a9\u0001\u0000\u0000\u0000"+
		"\u03ab\u03ac\u0001\u0000\u0000\u0000\u03acu\u0001\u0000\u0000\u0000\u03ad"+
		"\u03af\u0003l6\u0000\u03ae\u03ad\u0001\u0000\u0000\u0000\u03af\u03b0\u0001"+
		"\u0000\u0000\u0000\u03b0\u03ae\u0001\u0000\u0000\u0000\u03b0\u03b1\u0001"+
		"\u0000\u0000\u0000\u03b1w\u0001\u0000\u0000\u0000\u03b2\u03b4\u0003p8"+
		"\u0000\u03b3\u03b2\u0001\u0000\u0000\u0000\u03b4\u03b5\u0001\u0000\u0000"+
		"\u0000\u03b5\u03b3\u0001\u0000\u0000\u0000\u03b5\u03b6\u0001\u0000\u0000"+
		"\u0000\u03b6y\u0001\u0000\u0000\u0000\u03b7\u03b8\u0007\u0004\u0000\u0000"+
		"\u03b8{\u0001\u0000\u0000\u0000\u03b9\u03ba\u0007\u0005\u0000\u0000\u03ba"+
		"}\u0001\u0000\u0000\u0000\u03bb\u03bd\u0005)\u0000\u0000\u03bc\u03bb\u0001"+
		"\u0000\u0000\u0000\u03bc\u03bd\u0001\u0000\u0000\u0000\u03bd\u007f\u0001"+
		"\u0000\u0000\u0000\u03be\u03bf\u0007\u0006\u0000\u0000\u03bf\u0081\u0001"+
		"\u0000\u0000\u0000\u03c0\u03c2\u0005\"\u0000\u0000\u03c1\u03c3\u0003\u0080"+
		"@\u0000\u03c2\u03c1\u0001\u0000\u0000\u0000\u03c2\u03c3\u0001\u0000\u0000"+
		"\u0000\u03c3\u03c4\u0001\u0000\u0000\u0000\u03c4\u03c5\u0005\f\u0000\u0000"+
		"\u03c5\u03c6\u0003\u0084B\u0000\u03c6\u03c8\u0005\r\u0000\u0000\u03c7"+
		"\u03c9\u0003\u0080@\u0000\u03c8\u03c7\u0001\u0000\u0000\u0000\u03c8\u03c9"+
		"\u0001\u0000\u0000\u0000\u03c9\u0083\u0001\u0000\u0000\u0000\u03ca\u03cc"+
		"\t\u0000\u0000\u0000\u03cb\u03ca\u0001\u0000\u0000\u0000\u03cc\u03cf\u0001"+
		"\u0000\u0000\u0000\u03cd\u03ce\u0001\u0000\u0000\u0000\u03cd\u03cb\u0001"+
		"\u0000\u0000\u0000\u03ce\u0085\u0001\u0000\u0000\u0000\u03cf\u03cd\u0001"+
		"\u0000\u0000\u0000\u0093\u008a\u008e\u0090\u0095\u0099\u009d\u00a1\u00a8"+
		"\u00ac\u00b0\u00b4\u00b8\u00c0\u00c4\u00c8\u00cc\u00d2\u00d6\u00da\u00de"+
		"\u00e5\u00e9\u00ed\u00f1\u00f5\u00fd\u0101\u0105\u0109\u010d\u0111\u011b"+
		"\u0128\u0133\u013d\u014a\u0153\u015a\u015e\u0162\u0166\u016a\u0170\u0174"+
		"\u017a\u0180\u0184\u0187\u018a\u0190\u0193\u0196\u01a4\u01b0\u01b2\u01b6"+
		"\u01c0\u01c4\u01c8\u01ce\u01d2\u01d6\u01ea\u01ed\u01f0\u01f3\u01f7\u01fe"+
		"\u0202\u0205\u0209\u0210\u0214\u0217\u021b\u0222\u0226\u0229\u022d\u0234"+
		"\u0238\u023c\u0246\u0248\u024b\u024f\u0252\u0257\u025f\u0264\u026c\u0271"+
		"\u0275\u027a\u027e\u02b9\u02be\u02c2\u02c5\u02c9\u02cd\u02d5\u02d9\u02dd"+
		"\u02e1\u02e4\u02e7\u02eb\u02ef\u02f3\u02f7\u02fb\u02ff\u0303\u0307\u030b"+
		"\u030f\u0313\u0316\u0319\u031d\u0323\u0325\u0328\u032b\u0333\u0339\u033d"+
		"\u0341\u0348\u034d\u0353\u0369\u036e\u0377\u037f\u0387\u039c\u03a1\u03a6"+
		"\u03ab\u03b0\u03b5\u03bc\u03c2\u03c8\u03cd";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}