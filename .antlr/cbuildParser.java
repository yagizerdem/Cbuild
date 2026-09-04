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
		DEFINE=30, VPATH=31, SLIT=32, YSHARP=33, LUA=34, CHARS=35, NL=36, LEADING_TAB=37, 
		WS=38, TAB=39, COMMENT=40;
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
		RULE_colon = 62, RULE_comment_opt = 63, RULE_ws = 64;
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
			"keywords", "colon", "comment_opt", "ws"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, "'$('", "'${'", null, "'$$'", "'&::'", "'&:'", "'::'", "':'", 
			"'('", "')'", "'{'", "'}'", "','", "'|'", "'include'", "'-include'", 
			"'sinclude'", "'endef'", "'ifdef'", "'ifndef'", "'ifeq'", "'ifneq'", 
			"'else'", "'endif'", "'override'", "'export'", "'unexport'", "'undefine'", 
			"'define'", "'vpath'", null, "'ysharp'", "'lua'", null, null, null, null, 
			"'\\t'"
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
			"VPATH", "SLIT", "YSHARP", "LUA", "CHARS", "NL", "LEADING_TAB", "WS", 
			"TAB", "COMMENT"
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
			setState(134);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(130);
				statements();
				setState(131);
				match(EOF);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(133);
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
			setState(140);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(138);
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
						setState(136);
						statement();
						}
						break;
					case NL:
						{
						setState(137);
						br();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					} 
				}
				setState(142);
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
	}

	public final ConditionalContext conditional() throws RecognitionException {
		ConditionalContext _localctx = new ConditionalContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_conditional);
		int _la;
		try {
			setState(205);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(143);
				if_eq_kw();
				setState(145);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(144);
					ws();
					}
				}

				setState(147);
				condition();
				setState(148);
				statements_opt();
				setState(149);
				match(ENDIF);
				setState(150);
				comment_opt();
				setState(151);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(153);
				if_eq_kw();
				setState(155);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(154);
					ws();
					}
				}

				setState(157);
				condition();
				setState(158);
				statements_opt();
				setState(159);
				match(ELSE);
				setState(160);
				statements_opt();
				setState(161);
				match(ENDIF);
				setState(162);
				comment_opt();
				setState(163);
				br();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(165);
				if_eq_kw();
				setState(167);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(166);
					ws();
					}
				}

				setState(169);
				condition();
				setState(170);
				statements_opt();
				setState(171);
				match(ELSE);
				setState(172);
				conditional();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(174);
				if_def_kw();
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
				identifier();
				setState(179);
				statements_opt();
				setState(180);
				match(ENDIF);
				setState(181);
				comment_opt();
				setState(182);
				br();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(184);
				if_def_kw();
				setState(186);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(185);
					ws();
					}
				}

				setState(188);
				identifier();
				setState(189);
				statements_opt();
				setState(190);
				match(ELSE);
				setState(191);
				statements_opt();
				setState(192);
				match(ENDIF);
				setState(193);
				comment_opt();
				setState(194);
				br();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(196);
				if_def_kw();
				setState(198);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(197);
					ws();
					}
				}

				setState(200);
				identifier();
				setState(201);
				statements_opt();
				setState(202);
				match(ELSE);
				setState(203);
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
	}

	public final Conditional_in_recipeContext conditional_in_recipe() throws RecognitionException {
		Conditional_in_recipeContext _localctx = new Conditional_in_recipeContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_conditional_in_recipe);
		int _la;
		try {
			setState(275);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,16,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(207);
				if_eq_kw();
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
				condition();
				setState(212);
				match(NL);
				setState(213);
				recipes_opt();
				setState(214);
				match(ENDIF);
				setState(215);
				comment_opt();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(217);
				if_eq_kw();
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
				condition();
				setState(222);
				match(NL);
				setState(223);
				recipes_opt();
				setState(224);
				match(ELSE);
				setState(225);
				match(NL);
				setState(226);
				recipes_opt();
				setState(227);
				match(ENDIF);
				setState(228);
				comment_opt();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(230);
				if_eq_kw();
				setState(232);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(231);
					ws();
					}
				}

				setState(234);
				condition();
				setState(235);
				match(NL);
				setState(236);
				recipes_opt();
				setState(237);
				match(ELSE);
				setState(238);
				match(NL);
				setState(239);
				conditional_in_recipe();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(241);
				if_def_kw();
				setState(243);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(242);
					ws();
					}
				}

				setState(245);
				identifier();
				setState(246);
				match(NL);
				setState(247);
				recipes_opt();
				setState(248);
				match(ENDIF);
				setState(249);
				comment_opt();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
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
				identifier();
				setState(256);
				match(NL);
				setState(257);
				recipes_opt();
				setState(258);
				match(ELSE);
				setState(259);
				match(NL);
				setState(260);
				recipes_opt();
				setState(261);
				match(ENDIF);
				setState(262);
				comment_opt();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(264);
				if_def_kw();
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
				identifier();
				setState(269);
				match(NL);
				setState(270);
				recipes_opt();
				setState(271);
				match(ELSE);
				setState(272);
				match(NL);
				setState(273);
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
			setState(277);
			comment_opt();
			setState(278);
			br();
			setState(279);
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
			setState(323);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,26,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(282);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(281);
					ws();
					}
				}

				setState(284);
				match(COMMENT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(286);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(285);
					ws();
					}
				}

				setState(288);
				conditional();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
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
				define();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(294);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(293);
					ws();
					}
				}

				setState(296);
				include();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(298);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(297);
					ws();
					}
				}

				setState(300);
				export();
				setState(301);
				br();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(304);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(303);
					ws();
					}
				}

				setState(306);
				vpath();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(308);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(307);
					ws();
					}
				}

				setState(310);
				assignment();
				setState(311);
				br();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
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
				function();
				setState(317);
				br();
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(320);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(319);
					ws();
					}
				}

				setState(322);
				rule_();
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
			setState(326);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 1006632960L) != 0)) {
				{
				setState(325);
				specifiers();
				}
			}

			setState(328);
			match(DEFINE);
			setState(329);
			ws();
			setState(330);
			pattern();
			setState(332);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,28,_ctx) ) {
			case 1:
				{
				setState(331);
				ws();
				}
				break;
			}
			setState(335);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ASSIGN_OP) {
				{
				setState(334);
				match(ASSIGN_OP);
				}
			}

			setState(338);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(337);
				ws();
				}
			}

			setState(340);
			definition();
			setState(341);
			match(ENDEF);
			setState(342);
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
			setState(352);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,31,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(344);
				comment_opt();
				setState(345);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(347);
				comment_opt();
				setState(348);
				br();
				setState(349);
				exprs_in_def();
				setState(350);
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
			setState(354);
			include_kw();
			setState(355);
			expressions();
			setState(356);
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
			setState(366);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,33,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(358);
				match(EXPORT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(359);
				match(UNEXPORT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(360);
				assignment_prefix();
				setState(364);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(361);
					ws();
					setState(362);
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
			setState(368);
			match(VPATH);
			setState(370);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(369);
				vpath_args();
				}
			}

			setState(372);
			comment_opt();
			setState(373);
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
			setState(375);
			ws();
			setState(376);
			pattern();
			setState(380);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(377);
				ws();
				setState(378);
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
			setState(402);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,40,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(382);
				pattern();
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
				match(ASSIGN_OP);
				setState(388);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,37,_ctx) ) {
				case 1:
					{
					setState(387);
					exprs_in_assign();
					}
					break;
				}
				setState(390);
				comment_opt();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(392);
				assignment_prefix();
				setState(394);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(393);
					ws();
					}
				}

				setState(396);
				match(ASSIGN_OP);
				setState(398);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,39,_ctx) ) {
				case 1:
					{
					setState(397);
					exprs_in_assign();
					}
					break;
				}
				setState(400);
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
			setState(404);
			specifiers();
			setState(405);
			ws();
			setState(406);
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
			setState(408);
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
			setState(410);
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
			setState(412);
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
			setState(425);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LPAREN:
				enterOuterAlt(_localctx, 1);
				{
				setState(414);
				match(LPAREN);
				setState(415);
				expressions_opt();
				setState(416);
				match(COMMA);
				setState(417);
				expressions_opt();
				setState(418);
				match(RPAREN);
				}
				break;
			case SLIT:
				enterOuterAlt(_localctx, 2);
				{
				setState(420);
				match(SLIT);
				setState(422);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(421);
					ws();
					}
				}

				setState(424);
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
			setState(428);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 863288428094L) != 0)) {
				{
				setState(427);
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
			setState(431);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(430);
				ws();
				}
			}

			setState(433);
			expression();
			setState(435);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,45,_ctx) ) {
			case 1:
				{
				setState(434);
				ws();
				}
				break;
			}
			setState(442);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,46,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(437);
					ws();
					setState(438);
					expression();
					}
					} 
				}
				setState(444);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,46,_ctx);
			}
			setState(446);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(445);
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
			setState(449);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(448);
				ws();
				}
			}

			setState(451);
			expr_nested();
			setState(453);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,49,_ctx) ) {
			case 1:
				{
				setState(452);
				ws();
				}
				break;
			}
			setState(460);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,50,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(455);
					ws();
					setState(456);
					expr_nested();
					}
					} 
				}
				setState(462);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,50,_ctx);
			}
			setState(464);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(463);
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
			setState(467);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(466);
				ws();
				}
			}

			setState(469);
			expr_in_assign();
			setState(471);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,53,_ctx) ) {
			case 1:
				{
				setState(470);
				ws();
				}
				break;
			}
			setState(478);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,54,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(473);
					ws();
					setState(474);
					expr_in_assign();
					}
					} 
				}
				setState(480);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,54,_ctx);
			}
			setState(482);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,55,_ctx) ) {
			case 1:
				{
				setState(481);
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
			setState(485);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(484);
				ws();
				}
			}

			setState(487);
			expr_in_recipe();
			setState(489);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,57,_ctx) ) {
			case 1:
				{
				setState(488);
				ws();
				}
				break;
			}
			setState(496);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,58,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(491);
					ws();
					setState(492);
					expr_in_recipe();
					}
					} 
				}
				setState(498);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,58,_ctx);
			}
			setState(500);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(499);
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
			setState(519);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,63,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(502);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(504);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==NL) {
					{
					setState(503);
					br();
					}
				}

				setState(506);
				first_expr_in_def();
				setState(516);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,62,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						setState(514);
						_errHandler.sync(this);
						switch ( getInterpreter().adaptivePredict(_input,61,_ctx) ) {
						case 1:
							{
							{
							setState(507);
							br();
							setState(508);
							first_expr_in_def();
							}
							}
							break;
						case 2:
							{
							{
							setState(510);
							br();
							}
							}
							break;
						case 3:
							{
							{
							setState(511);
							ws();
							setState(512);
							expr_in_recipe();
							}
							}
							break;
						}
						} 
					}
					setState(518);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,62,_ctx);
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
			setState(523);
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
				setState(521);
				char_in_def();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				{
				setState(522);
				function();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(526);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 1142460894782L) != 0)) {
				{
				setState(525);
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
			setState(529); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(528);
				expression_atom();
				}
				}
				setState(531); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 38654707262L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
			setState(539);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(533);
				text();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(534);
				function();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(535);
				match(LPAREN);
				setState(536);
				exprs_nested();
				setState(537);
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
			setState(542); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(541);
				expr_nested_atom();
				}
				}
				setState(544); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 38654723646L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
			setState(552);
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
				setState(546);
				text_nested();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(547);
				function();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(548);
				match(LPAREN);
				setState(549);
				exprs_nested();
				setState(550);
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
			setState(555); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(554);
				expr_in_assign_atom();
				}
				}
				setState(557); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 42949234238L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
			setState(561);
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
				setState(559);
				text_in_assign();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(560);
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
			setState(564); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(563);
				expr_in_recipe_atom();
				}
				}
				setState(566); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 1142460894782L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
			setState(570);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case LPAREN:
			case RPAREN:
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
			case SLIT:
			case CHARS:
			case COMMENT:
				enterOuterAlt(_localctx, 1);
				{
				setState(568);
				text_in_recipe();
				}
				break;
			case DOLLAR_LPAREN:
			case DOLLAR_L_CURLY_BRACE:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(569);
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
			setState(629);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,74,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(572);
				match(VAR);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(573);
				match(DOLLAR_LPAREN);
				setState(574);
				function_name();
				setState(575);
				match(RPAREN);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(577);
				match(DOLLAR_LPAREN);
				setState(578);
				function_name();
				setState(579);
				ws();
				setState(580);
				arguments();
				setState(581);
				match(RPAREN);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(583);
				match(DOLLAR_LPAREN);
				setState(584);
				function_name();
				setState(585);
				match(COMMA);
				setState(586);
				arguments();
				setState(587);
				match(RPAREN);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(589);
				match(DOLLAR_LPAREN);
				setState(590);
				function_name();
				setState(591);
				match(COLON);
				setState(592);
				expressions();
				setState(593);
				match(RPAREN);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(595);
				match(DOLLAR_LPAREN);
				setState(596);
				function_name();
				setState(597);
				match(ASSIGN_OP);
				setState(598);
				expressions();
				setState(599);
				match(RPAREN);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(601);
				match(DOLLAR_L_CURLY_BRACE);
				setState(602);
				function_name();
				setState(603);
				match(R_CURLY_BRACE);
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(605);
				match(DOLLAR_L_CURLY_BRACE);
				setState(606);
				function_name();
				setState(607);
				ws();
				setState(608);
				arguments();
				setState(609);
				match(R_CURLY_BRACE);
				}
				break;
			case 9:
				enterOuterAlt(_localctx, 9);
				{
				setState(611);
				match(DOLLAR_L_CURLY_BRACE);
				setState(612);
				function_name();
				setState(613);
				match(COMMA);
				setState(614);
				arguments();
				setState(615);
				match(R_CURLY_BRACE);
				}
				break;
			case 10:
				enterOuterAlt(_localctx, 10);
				{
				setState(617);
				match(DOLLAR_L_CURLY_BRACE);
				setState(618);
				function_name();
				setState(619);
				match(COLON);
				setState(620);
				expressions();
				setState(621);
				match(R_CURLY_BRACE);
				}
				break;
			case 11:
				enterOuterAlt(_localctx, 11);
				{
				setState(623);
				match(DOLLAR_L_CURLY_BRACE);
				setState(624);
				function_name();
				setState(625);
				match(ASSIGN_OP);
				setState(626);
				expressions();
				setState(627);
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
			setState(632); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(631);
				function_name_atom();
				}
				}
				setState(634); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 34359738396L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
			setState(638);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(636);
				match(CHARS);
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
			setState(641);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 863288428094L) != 0)) {
				{
				setState(640);
				argument();
				}
			}

			setState(649);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(643);
				match(COMMA);
				setState(645);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 863288428094L) != 0)) {
					{
					setState(644);
					argument();
					}
				}

				}
				}
				setState(651);
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
			setState(652);
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
			setState(695);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,90,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(654);
				static_pattern_rule();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(655);
				targets();
				setState(657);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(656);
					ws();
					}
				}

				setState(659);
				colon();
				setState(661);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,81,_ctx) ) {
				case 1:
					{
					setState(660);
					ws();
					}
					break;
				}
				setState(663);
				prerequisites();
				setState(672);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,84,_ctx) ) {
				case 1:
					{
					setState(665);
					_errHandler.sync(this);
					_la = _input.LA(1);
					if (_la==WS || _la==TAB) {
						{
						setState(664);
						ws();
						}
					}

					setState(667);
					match(PIPE);
					setState(669);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,83,_ctx) ) {
					case 1:
						{
						setState(668);
						ws();
						}
						break;
					}
					setState(671);
					orderonlyprerequisites();
					}
					break;
				}
				setState(675);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(674);
					ws();
					}
				}

				setState(677);
				match(NL);
				setState(679);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,86,_ctx) ) {
				case 1:
					{
					setState(678);
					recipes();
					}
					break;
				}
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(681);
				targets();
				setState(683);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(682);
					ws();
					}
				}

				setState(685);
				colon();
				setState(687);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(686);
					ws();
					}
				}

				setState(689);
				assignment();
				setState(691);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(690);
					ws();
					}
				}

				setState(693);
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
			setState(697);
			targets();
			setState(699);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(698);
				ws();
				}
			}

			setState(701);
			colon();
			setState(703);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(702);
				ws();
				}
			}

			setState(705);
			pattern();
			setState(707);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==WS || _la==TAB) {
				{
				setState(706);
				ws();
				}
			}

			setState(709);
			colon();
			setState(711);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,94,_ctx) ) {
			case 1:
				{
				setState(710);
				ws();
				}
				break;
			}
			setState(713);
			prerequisites();
			setState(722);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,97,_ctx) ) {
			case 1:
				{
				setState(715);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(714);
					ws();
					}
				}

				setState(717);
				match(PIPE);
				setState(719);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,96,_ctx) ) {
				case 1:
					{
					setState(718);
					ws();
					}
					break;
				}
				setState(721);
				orderonlyprerequisites();
				}
				break;
			}
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
			match(NL);
			setState(729);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,99,_ctx) ) {
			case 1:
				{
				setState(728);
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
			setState(731);
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
			setState(735); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				setState(735);
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
					setState(733);
					identifier();
					}
					break;
				case DOLLAR_LPAREN:
				case DOLLAR_L_CURLY_BRACE:
				case VAR:
					{
					setState(734);
					function();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(737); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 38654266396L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
			setState(740);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 38654266396L) != 0)) {
				{
				setState(739);
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
			setState(743);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 38654266396L) != 0)) {
				{
				setState(742);
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
			setState(745);
			target();
			setState(751);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,104,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(746);
					ws();
					setState(747);
					target();
					}
					} 
				}
				setState(753);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,104,_ctx);
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
			setState(755); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(754);
					recipe();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(757); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,105,_ctx);
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
			setState(759);
			comment_opt();
			setState(761);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 2130319507456L) != 0)) {
				{
				setState(760);
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
			setState(783);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,110,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(763);
				match(LEADING_TAB);
				setState(765);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,107,_ctx) ) {
				case 1:
					{
					setState(764);
					ws();
					}
					break;
				}
				setState(767);
				exprs_in_recipe();
				setState(768);
				match(NL);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(770);
				match(LEADING_TAB);
				setState(772);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(771);
					ws();
					}
				}

				setState(774);
				match(COMMENT);
				setState(775);
				match(NL);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(777);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(776);
					ws();
					}
				}

				setState(779);
				match(COMMENT);
				setState(780);
				match(NL);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(781);
				conditional_in_recipe();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(782);
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
			setState(805);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,111,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(785);
				match(OVERRIDE);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(786);
				match(EXPORT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(787);
				match(UNEXPORT);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(788);
				match(OVERRIDE);
				setState(789);
				ws();
				setState(790);
				match(EXPORT);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(792);
				match(EXPORT);
				setState(793);
				ws();
				setState(794);
				match(OVERRIDE);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(796);
				match(UNDEFINE);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(797);
				match(OVERRIDE);
				setState(798);
				ws();
				setState(799);
				match(UNDEFINE);
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(801);
				match(UNDEFINE);
				setState(802);
				ws();
				setState(803);
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
			setState(808); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(807);
					identifier_atom();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(810); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,112,_ctx);
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
		public Identifier_atomContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifier_atom; }
	}

	public final Identifier_atomContext identifier_atom() throws RecognitionException {
		Identifier_atomContext _localctx = new Identifier_atomContext(_ctx, getState());
		enterRule(_localctx, 100, RULE_identifier_atom);
		try {
			setState(817);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(812);
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
				setState(813);
				keywords();
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 3);
				{
				setState(814);
				match(COMMA);
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 4);
				{
				setState(815);
				match(LPAREN);
				}
				break;
			case RPAREN:
				enterOuterAlt(_localctx, 5);
				{
				setState(816);
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
	}

	public final BrContext br() throws RecognitionException {
		BrContext _localctx = new BrContext(_ctx, getState());
		enterRule(_localctx, 102, RULE_br);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(819);
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
	}

	public final CharContext char_() throws RecognitionException {
		CharContext _localctx = new CharContext(_ctx, getState());
		enterRule(_localctx, 104, RULE_char);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(821);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 38654706210L) != 0)) ) {
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
			setState(825);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(823);
				char_();
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 2);
				{
				setState(824);
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
		public TerminalNode DOUBLE_DOLLAR() { return getToken(cbuildParser.DOUBLE_DOLLAR, 0); }
		public TerminalNode LPAREN() { return getToken(cbuildParser.LPAREN, 0); }
		public TerminalNode RPAREN() { return getToken(cbuildParser.RPAREN, 0); }
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
			setState(832);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,115,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(827);
				char_nested();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(828);
				match(DOUBLE_DOLLAR);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(829);
				match(LPAREN);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(830);
				match(RPAREN);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(831);
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
			setState(851);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case DOUBLE_DOLLAR:
			case COLON:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(834);
				char_();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 2);
				{
				setState(835);
				match(LPAREN);
				}
				break;
			case RPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(836);
				match(RPAREN);
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 4);
				{
				setState(837);
				match(COMMA);
				}
				break;
			case COMMENT:
				enterOuterAlt(_localctx, 5);
				{
				setState(838);
				match(COMMENT);
				}
				break;
			case INCLUDE:
				enterOuterAlt(_localctx, 6);
				{
				setState(839);
				match(INCLUDE);
				}
				break;
			case OVERRIDE:
				enterOuterAlt(_localctx, 7);
				{
				setState(840);
				match(OVERRIDE);
				}
				break;
			case EXPORT:
				enterOuterAlt(_localctx, 8);
				{
				setState(841);
				match(EXPORT);
				}
				break;
			case UNEXPORT:
				enterOuterAlt(_localctx, 9);
				{
				setState(842);
				match(UNEXPORT);
				}
				break;
			case IFDEF:
				enterOuterAlt(_localctx, 10);
				{
				setState(843);
				match(IFDEF);
				}
				break;
			case IFNDEF:
				enterOuterAlt(_localctx, 11);
				{
				setState(844);
				match(IFNDEF);
				}
				break;
			case IFEQ:
				enterOuterAlt(_localctx, 12);
				{
				setState(845);
				match(IFEQ);
				}
				break;
			case IFNEQ:
				enterOuterAlt(_localctx, 13);
				{
				setState(846);
				match(IFNEQ);
				}
				break;
			case ELSE:
				enterOuterAlt(_localctx, 14);
				{
				setState(847);
				match(ELSE);
				}
				break;
			case ENDIF:
				enterOuterAlt(_localctx, 15);
				{
				setState(848);
				match(ENDIF);
				}
				break;
			case DEFINE:
				enterOuterAlt(_localctx, 16);
				{
				setState(849);
				match(DEFINE);
				}
				break;
			case UNDEFINE:
				enterOuterAlt(_localctx, 17);
				{
				setState(850);
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
			setState(857);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,117,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(853);
				char_in_assign();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(854);
				match(DOUBLE_DOLLAR);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(855);
				match(COMMENT);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(856);
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
		enterRule(_localctx, 114, RULE_text);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(860); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(859);
					char_();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(862); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,118,_ctx);
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
			setState(865); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(864);
					char_nested();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(867); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,119,_ctx);
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
			setState(870); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(869);
					char_in_assign();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(872); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,120,_ctx);
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
			setState(875); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(874);
					char_in_recipe();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(877); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,121,_ctx);
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
			setState(879);
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
			setState(881);
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
			setState(884);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,122,_ctx) ) {
			case 1:
				{
				setState(883);
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
			setState(886);
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
		"\u0004\u0001(\u0379\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
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
		"<\u0007<\u0002=\u0007=\u0002>\u0007>\u0002?\u0007?\u0002@\u0007@\u0001"+
		"\u0000\u0001\u0000\u0001\u0000\u0001\u0000\u0003\u0000\u0087\b\u0000\u0001"+
		"\u0001\u0001\u0001\u0005\u0001\u008b\b\u0001\n\u0001\f\u0001\u008e\t\u0001"+
		"\u0001\u0002\u0001\u0002\u0003\u0002\u0092\b\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0003\u0002\u009c\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0003\u0002\u00a8\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00b1\b\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0003\u0002\u00bb\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0003\u0002\u00c7\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0003\u0002\u00ce\b\u0002\u0001\u0003\u0001\u0003"+
		"\u0003\u0003\u00d2\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u00dc\b\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003"+
		"\u00e9\b\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u00f4\b\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0003\u0003\u00fe\b\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u010b\b\u0003\u0001\u0003"+
		"\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003"+
		"\u0003\u0003\u0114\b\u0003\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004"+
		"\u0001\u0005\u0003\u0005\u011b\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005"+
		"\u011f\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0123\b\u0005\u0001"+
		"\u0005\u0001\u0005\u0003\u0005\u0127\b\u0005\u0001\u0005\u0001\u0005\u0003"+
		"\u0005\u012b\b\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003"+
		"\u0005\u0131\b\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0135\b\u0005"+
		"\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u013b\b\u0005"+
		"\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003\u0005\u0141\b\u0005"+
		"\u0001\u0005\u0003\u0005\u0144\b\u0005\u0001\u0006\u0003\u0006\u0147\b"+
		"\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0003\u0006\u014d"+
		"\b\u0006\u0001\u0006\u0003\u0006\u0150\b\u0006\u0001\u0006\u0003\u0006"+
		"\u0153\b\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007"+
		"\u0001\u0007\u0003\u0007\u0161\b\u0007\u0001\b\u0001\b\u0001\b\u0001\b"+
		"\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0001\t\u0003\t\u016d\b\t\u0003"+
		"\t\u016f\b\t\u0001\n\u0001\n\u0003\n\u0173\b\n\u0001\n\u0001\n\u0001\n"+
		"\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0001\u000b\u0003\u000b"+
		"\u017d\b\u000b\u0001\f\u0001\f\u0003\f\u0181\b\f\u0001\f\u0001\f\u0003"+
		"\f\u0185\b\f\u0001\f\u0001\f\u0001\f\u0001\f\u0003\f\u018b\b\f\u0001\f"+
		"\u0001\f\u0003\f\u018f\b\f\u0001\f\u0001\f\u0003\f\u0193\b\f\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0001\u000e\u0001\u000e\u0001\u000f\u0001\u000f\u0001"+
		"\u0010\u0001\u0010\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001"+
		"\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0003\u0011\u01a7\b\u0011\u0001"+
		"\u0011\u0003\u0011\u01aa\b\u0011\u0001\u0012\u0003\u0012\u01ad\b\u0012"+
		"\u0001\u0013\u0003\u0013\u01b0\b\u0013\u0001\u0013\u0001\u0013\u0003\u0013"+
		"\u01b4\b\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0005\u0013\u01b9\b"+
		"\u0013\n\u0013\f\u0013\u01bc\t\u0013\u0001\u0013\u0003\u0013\u01bf\b\u0013"+
		"\u0001\u0014\u0003\u0014\u01c2\b\u0014\u0001\u0014\u0001\u0014\u0003\u0014"+
		"\u01c6\b\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0005\u0014\u01cb\b"+
		"\u0014\n\u0014\f\u0014\u01ce\t\u0014\u0001\u0014\u0003\u0014\u01d1\b\u0014"+
		"\u0001\u0015\u0003\u0015\u01d4\b\u0015\u0001\u0015\u0001\u0015\u0003\u0015"+
		"\u01d8\b\u0015\u0001\u0015\u0001\u0015\u0001\u0015\u0005\u0015\u01dd\b"+
		"\u0015\n\u0015\f\u0015\u01e0\t\u0015\u0001\u0015\u0003\u0015\u01e3\b\u0015"+
		"\u0001\u0016\u0003\u0016\u01e6\b\u0016\u0001\u0016\u0001\u0016\u0003\u0016"+
		"\u01ea\b\u0016\u0001\u0016\u0001\u0016\u0001\u0016\u0005\u0016\u01ef\b"+
		"\u0016\n\u0016\f\u0016\u01f2\t\u0016\u0001\u0016\u0003\u0016\u01f5\b\u0016"+
		"\u0001\u0017\u0001\u0017\u0003\u0017\u01f9\b\u0017\u0001\u0017\u0001\u0017"+
		"\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017"+
		"\u0005\u0017\u0203\b\u0017\n\u0017\f\u0017\u0206\t\u0017\u0003\u0017\u0208"+
		"\b\u0017\u0001\u0018\u0001\u0018\u0003\u0018\u020c\b\u0018\u0001\u0018"+
		"\u0003\u0018\u020f\b\u0018\u0001\u0019\u0004\u0019\u0212\b\u0019\u000b"+
		"\u0019\f\u0019\u0213\u0001\u001a\u0001\u001a\u0001\u001a\u0001\u001a\u0001"+
		"\u001a\u0001\u001a\u0003\u001a\u021c\b\u001a\u0001\u001b\u0004\u001b\u021f"+
		"\b\u001b\u000b\u001b\f\u001b\u0220\u0001\u001c\u0001\u001c\u0001\u001c"+
		"\u0001\u001c\u0001\u001c\u0001\u001c\u0003\u001c\u0229\b\u001c\u0001\u001d"+
		"\u0004\u001d\u022c\b\u001d\u000b\u001d\f\u001d\u022d\u0001\u001e\u0001"+
		"\u001e\u0003\u001e\u0232\b\u001e\u0001\u001f\u0004\u001f\u0235\b\u001f"+
		"\u000b\u001f\f\u001f\u0236\u0001 \u0001 \u0003 \u023b\b \u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001!\u0001"+
		"!\u0001!\u0001!\u0001!\u0001!\u0001!\u0003!\u0276\b!\u0001\"\u0004\"\u0279"+
		"\b\"\u000b\"\f\"\u027a\u0001#\u0001#\u0003#\u027f\b#\u0001$\u0003$\u0282"+
		"\b$\u0001$\u0001$\u0003$\u0286\b$\u0005$\u0288\b$\n$\f$\u028b\t$\u0001"+
		"%\u0001%\u0001&\u0001&\u0001&\u0003&\u0292\b&\u0001&\u0001&\u0003&\u0296"+
		"\b&\u0001&\u0001&\u0003&\u029a\b&\u0001&\u0001&\u0003&\u029e\b&\u0001"+
		"&\u0003&\u02a1\b&\u0001&\u0003&\u02a4\b&\u0001&\u0001&\u0003&\u02a8\b"+
		"&\u0001&\u0001&\u0003&\u02ac\b&\u0001&\u0001&\u0003&\u02b0\b&\u0001&\u0001"+
		"&\u0003&\u02b4\b&\u0001&\u0001&\u0003&\u02b8\b&\u0001\'\u0001\'\u0003"+
		"\'\u02bc\b\'\u0001\'\u0001\'\u0003\'\u02c0\b\'\u0001\'\u0001\'\u0003\'"+
		"\u02c4\b\'\u0001\'\u0001\'\u0003\'\u02c8\b\'\u0001\'\u0001\'\u0003\'\u02cc"+
		"\b\'\u0001\'\u0001\'\u0003\'\u02d0\b\'\u0001\'\u0003\'\u02d3\b\'\u0001"+
		"\'\u0003\'\u02d6\b\'\u0001\'\u0001\'\u0003\'\u02da\b\'\u0001(\u0001(\u0001"+
		")\u0001)\u0004)\u02e0\b)\u000b)\f)\u02e1\u0001*\u0003*\u02e5\b*\u0001"+
		"+\u0003+\u02e8\b+\u0001,\u0001,\u0001,\u0001,\u0005,\u02ee\b,\n,\f,\u02f1"+
		"\t,\u0001-\u0004-\u02f4\b-\u000b-\f-\u02f5\u0001.\u0001.\u0003.\u02fa"+
		"\b.\u0001/\u0001/\u0003/\u02fe\b/\u0001/\u0001/\u0001/\u0001/\u0001/\u0003"+
		"/\u0305\b/\u0001/\u0001/\u0001/\u0003/\u030a\b/\u0001/\u0001/\u0001/\u0001"+
		"/\u0003/\u0310\b/\u00010\u00010\u00010\u00010\u00010\u00010\u00010\u0001"+
		"0\u00010\u00010\u00010\u00010\u00010\u00010\u00010\u00010\u00010\u0001"+
		"0\u00010\u00010\u00030\u0326\b0\u00011\u00041\u0329\b1\u000b1\f1\u032a"+
		"\u00012\u00012\u00012\u00012\u00012\u00032\u0332\b2\u00013\u00013\u0001"+
		"4\u00014\u00015\u00015\u00035\u033a\b5\u00016\u00016\u00016\u00016\u0001"+
		"6\u00036\u0341\b6\u00017\u00017\u00017\u00017\u00017\u00017\u00017\u0001"+
		"7\u00017\u00017\u00017\u00017\u00017\u00017\u00017\u00017\u00017\u0003"+
		"7\u0354\b7\u00018\u00018\u00018\u00018\u00038\u035a\b8\u00019\u00049\u035d"+
		"\b9\u000b9\f9\u035e\u0001:\u0004:\u0362\b:\u000b:\f:\u0363\u0001;\u0004"+
		";\u0367\b;\u000b;\f;\u0368\u0001<\u0004<\u036c\b<\u000b<\f<\u036d\u0001"+
		"=\u0001=\u0001>\u0001>\u0001?\u0003?\u0375\b?\u0001@\u0001@\u0001@\u0000"+
		"\u0000A\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018"+
		"\u001a\u001c\u001e \"$&(*,.02468:<>@BDFHJLNPRTVXZ\\^`bdfhjlnprtvxz|~\u0080"+
		"\u0000\u0007\u0001\u0000\u0016\u0017\u0001\u0000\u0014\u0015\u0001\u0000"+
		"\u0010\u0012\u0005\u0000\u0001\u0001\u0005\u0005\t\t  ##\u0002\u0000\u0010"+
		"\u0010\u0013\u001f\u0001\u0000\u0006\t\u0001\u0000&\'\u03ef\u0000\u0086"+
		"\u0001\u0000\u0000\u0000\u0002\u008c\u0001\u0000\u0000\u0000\u0004\u00cd"+
		"\u0001\u0000\u0000\u0000\u0006\u0113\u0001\u0000\u0000\u0000\b\u0115\u0001"+
		"\u0000\u0000\u0000\n\u0143\u0001\u0000\u0000\u0000\f\u0146\u0001\u0000"+
		"\u0000\u0000\u000e\u0160\u0001\u0000\u0000\u0000\u0010\u0162\u0001\u0000"+
		"\u0000\u0000\u0012\u016e\u0001\u0000\u0000\u0000\u0014\u0170\u0001\u0000"+
		"\u0000\u0000\u0016\u0177\u0001\u0000\u0000\u0000\u0018\u0192\u0001\u0000"+
		"\u0000\u0000\u001a\u0194\u0001\u0000\u0000\u0000\u001c\u0198\u0001\u0000"+
		"\u0000\u0000\u001e\u019a\u0001\u0000\u0000\u0000 \u019c\u0001\u0000\u0000"+
		"\u0000\"\u01a9\u0001\u0000\u0000\u0000$\u01ac\u0001\u0000\u0000\u0000"+
		"&\u01af\u0001\u0000\u0000\u0000(\u01c1\u0001\u0000\u0000\u0000*\u01d3"+
		"\u0001\u0000\u0000\u0000,\u01e5\u0001\u0000\u0000\u0000.\u0207\u0001\u0000"+
		"\u0000\u00000\u020b\u0001\u0000\u0000\u00002\u0211\u0001\u0000\u0000\u0000"+
		"4\u021b\u0001\u0000\u0000\u00006\u021e\u0001\u0000\u0000\u00008\u0228"+
		"\u0001\u0000\u0000\u0000:\u022b\u0001\u0000\u0000\u0000<\u0231\u0001\u0000"+
		"\u0000\u0000>\u0234\u0001\u0000\u0000\u0000@\u023a\u0001\u0000\u0000\u0000"+
		"B\u0275\u0001\u0000\u0000\u0000D\u0278\u0001\u0000\u0000\u0000F\u027e"+
		"\u0001\u0000\u0000\u0000H\u0281\u0001\u0000\u0000\u0000J\u028c\u0001\u0000"+
		"\u0000\u0000L\u02b7\u0001\u0000\u0000\u0000N\u02b9\u0001\u0000\u0000\u0000"+
		"P\u02db\u0001\u0000\u0000\u0000R\u02df\u0001\u0000\u0000\u0000T\u02e4"+
		"\u0001\u0000\u0000\u0000V\u02e7\u0001\u0000\u0000\u0000X\u02e9\u0001\u0000"+
		"\u0000\u0000Z\u02f3\u0001\u0000\u0000\u0000\\\u02f7\u0001\u0000\u0000"+
		"\u0000^\u030f\u0001\u0000\u0000\u0000`\u0325\u0001\u0000\u0000\u0000b"+
		"\u0328\u0001\u0000\u0000\u0000d\u0331\u0001\u0000\u0000\u0000f\u0333\u0001"+
		"\u0000\u0000\u0000h\u0335\u0001\u0000\u0000\u0000j\u0339\u0001\u0000\u0000"+
		"\u0000l\u0340\u0001\u0000\u0000\u0000n\u0353\u0001\u0000\u0000\u0000p"+
		"\u0359\u0001\u0000\u0000\u0000r\u035c\u0001\u0000\u0000\u0000t\u0361\u0001"+
		"\u0000\u0000\u0000v\u0366\u0001\u0000\u0000\u0000x\u036b\u0001\u0000\u0000"+
		"\u0000z\u036f\u0001\u0000\u0000\u0000|\u0371\u0001\u0000\u0000\u0000~"+
		"\u0374\u0001\u0000\u0000\u0000\u0080\u0376\u0001\u0000\u0000\u0000\u0082"+
		"\u0083\u0003\u0002\u0001\u0000\u0083\u0084\u0005\u0000\u0000\u0001\u0084"+
		"\u0087\u0001\u0000\u0000\u0000\u0085\u0087\u0005\u0000\u0000\u0001\u0086"+
		"\u0082\u0001\u0000\u0000\u0000\u0086\u0085\u0001\u0000\u0000\u0000\u0087"+
		"\u0001\u0001\u0000\u0000\u0000\u0088\u008b\u0003\n\u0005\u0000\u0089\u008b"+
		"\u0003f3\u0000\u008a\u0088\u0001\u0000\u0000\u0000\u008a\u0089\u0001\u0000"+
		"\u0000\u0000\u008b\u008e\u0001\u0000\u0000\u0000\u008c\u008a\u0001\u0000"+
		"\u0000\u0000\u008c\u008d\u0001\u0000\u0000\u0000\u008d\u0003\u0001\u0000"+
		"\u0000\u0000\u008e\u008c\u0001\u0000\u0000\u0000\u008f\u0091\u0003\u001c"+
		"\u000e\u0000\u0090\u0092\u0003\u0080@\u0000\u0091\u0090\u0001\u0000\u0000"+
		"\u0000\u0091\u0092\u0001\u0000\u0000\u0000\u0092\u0093\u0001\u0000\u0000"+
		"\u0000\u0093\u0094\u0003\"\u0011\u0000\u0094\u0095\u0003\b\u0004\u0000"+
		"\u0095\u0096\u0005\u0019\u0000\u0000\u0096\u0097\u0003~?\u0000\u0097\u0098"+
		"\u0003f3\u0000\u0098\u00ce\u0001\u0000\u0000\u0000\u0099\u009b\u0003\u001c"+
		"\u000e\u0000\u009a\u009c\u0003\u0080@\u0000\u009b\u009a\u0001\u0000\u0000"+
		"\u0000\u009b\u009c\u0001\u0000\u0000\u0000\u009c\u009d\u0001\u0000\u0000"+
		"\u0000\u009d\u009e\u0003\"\u0011\u0000\u009e\u009f\u0003\b\u0004\u0000"+
		"\u009f\u00a0\u0005\u0018\u0000\u0000\u00a0\u00a1\u0003\b\u0004\u0000\u00a1"+
		"\u00a2\u0005\u0019\u0000\u0000\u00a2\u00a3\u0003~?\u0000\u00a3\u00a4\u0003"+
		"f3\u0000\u00a4\u00ce\u0001\u0000\u0000\u0000\u00a5\u00a7\u0003\u001c\u000e"+
		"\u0000\u00a6\u00a8\u0003\u0080@\u0000\u00a7\u00a6\u0001\u0000\u0000\u0000"+
		"\u00a7\u00a8\u0001\u0000\u0000\u0000\u00a8\u00a9\u0001\u0000\u0000\u0000"+
		"\u00a9\u00aa\u0003\"\u0011\u0000\u00aa\u00ab\u0003\b\u0004\u0000\u00ab"+
		"\u00ac\u0005\u0018\u0000\u0000\u00ac\u00ad\u0003\u0004\u0002\u0000\u00ad"+
		"\u00ce\u0001\u0000\u0000\u0000\u00ae\u00b0\u0003\u001e\u000f\u0000\u00af"+
		"\u00b1\u0003\u0080@\u0000\u00b0\u00af\u0001\u0000\u0000\u0000\u00b0\u00b1"+
		"\u0001\u0000\u0000\u0000\u00b1\u00b2\u0001\u0000\u0000\u0000\u00b2\u00b3"+
		"\u0003b1\u0000\u00b3\u00b4\u0003\b\u0004\u0000\u00b4\u00b5\u0005\u0019"+
		"\u0000\u0000\u00b5\u00b6\u0003~?\u0000\u00b6\u00b7\u0003f3\u0000\u00b7"+
		"\u00ce\u0001\u0000\u0000\u0000\u00b8\u00ba\u0003\u001e\u000f\u0000\u00b9"+
		"\u00bb\u0003\u0080@\u0000\u00ba\u00b9\u0001\u0000\u0000\u0000\u00ba\u00bb"+
		"\u0001\u0000\u0000\u0000\u00bb\u00bc\u0001\u0000\u0000\u0000\u00bc\u00bd"+
		"\u0003b1\u0000\u00bd\u00be\u0003\b\u0004\u0000\u00be\u00bf\u0005\u0018"+
		"\u0000\u0000\u00bf\u00c0\u0003\b\u0004\u0000\u00c0\u00c1\u0005\u0019\u0000"+
		"\u0000\u00c1\u00c2\u0003~?\u0000\u00c2\u00c3\u0003f3\u0000\u00c3\u00ce"+
		"\u0001\u0000\u0000\u0000\u00c4\u00c6\u0003\u001e\u000f\u0000\u00c5\u00c7"+
		"\u0003\u0080@\u0000\u00c6\u00c5\u0001\u0000\u0000\u0000\u00c6\u00c7\u0001"+
		"\u0000\u0000\u0000\u00c7\u00c8\u0001\u0000\u0000\u0000\u00c8\u00c9\u0003"+
		"b1\u0000\u00c9\u00ca\u0003\b\u0004\u0000\u00ca\u00cb\u0005\u0018\u0000"+
		"\u0000\u00cb\u00cc\u0003\u0004\u0002\u0000\u00cc\u00ce\u0001\u0000\u0000"+
		"\u0000\u00cd\u008f\u0001\u0000\u0000\u0000\u00cd\u0099\u0001\u0000\u0000"+
		"\u0000\u00cd\u00a5\u0001\u0000\u0000\u0000\u00cd\u00ae\u0001\u0000\u0000"+
		"\u0000\u00cd\u00b8\u0001\u0000\u0000\u0000\u00cd\u00c4\u0001\u0000\u0000"+
		"\u0000\u00ce\u0005\u0001\u0000\u0000\u0000\u00cf\u00d1\u0003\u001c\u000e"+
		"\u0000\u00d0\u00d2\u0003\u0080@\u0000\u00d1\u00d0\u0001\u0000\u0000\u0000"+
		"\u00d1\u00d2\u0001\u0000\u0000\u0000\u00d2\u00d3\u0001\u0000\u0000\u0000"+
		"\u00d3\u00d4\u0003\"\u0011\u0000\u00d4\u00d5\u0005$\u0000\u0000\u00d5"+
		"\u00d6\u0003\\.\u0000\u00d6\u00d7\u0005\u0019\u0000\u0000\u00d7\u00d8"+
		"\u0003~?\u0000\u00d8\u0114\u0001\u0000\u0000\u0000\u00d9\u00db\u0003\u001c"+
		"\u000e\u0000\u00da\u00dc\u0003\u0080@\u0000\u00db\u00da\u0001\u0000\u0000"+
		"\u0000\u00db\u00dc\u0001\u0000\u0000\u0000\u00dc\u00dd\u0001\u0000\u0000"+
		"\u0000\u00dd\u00de\u0003\"\u0011\u0000\u00de\u00df\u0005$\u0000\u0000"+
		"\u00df\u00e0\u0003\\.\u0000\u00e0\u00e1\u0005\u0018\u0000\u0000\u00e1"+
		"\u00e2\u0005$\u0000\u0000\u00e2\u00e3\u0003\\.\u0000\u00e3\u00e4\u0005"+
		"\u0019\u0000\u0000\u00e4\u00e5\u0003~?\u0000\u00e5\u0114\u0001\u0000\u0000"+
		"\u0000\u00e6\u00e8\u0003\u001c\u000e\u0000\u00e7\u00e9\u0003\u0080@\u0000"+
		"\u00e8\u00e7\u0001\u0000\u0000\u0000\u00e8\u00e9\u0001\u0000\u0000\u0000"+
		"\u00e9\u00ea\u0001\u0000\u0000\u0000\u00ea\u00eb\u0003\"\u0011\u0000\u00eb"+
		"\u00ec\u0005$\u0000\u0000\u00ec\u00ed\u0003\\.\u0000\u00ed\u00ee\u0005"+
		"\u0018\u0000\u0000\u00ee\u00ef\u0005$\u0000\u0000\u00ef\u00f0\u0003\u0006"+
		"\u0003\u0000\u00f0\u0114\u0001\u0000\u0000\u0000\u00f1\u00f3\u0003\u001e"+
		"\u000f\u0000\u00f2\u00f4\u0003\u0080@\u0000\u00f3\u00f2\u0001\u0000\u0000"+
		"\u0000\u00f3\u00f4\u0001\u0000\u0000\u0000\u00f4\u00f5\u0001\u0000\u0000"+
		"\u0000\u00f5\u00f6\u0003b1\u0000\u00f6\u00f7\u0005$\u0000\u0000\u00f7"+
		"\u00f8\u0003\\.\u0000\u00f8\u00f9\u0005\u0019\u0000\u0000\u00f9\u00fa"+
		"\u0003~?\u0000\u00fa\u0114\u0001\u0000\u0000\u0000\u00fb\u00fd\u0003\u001e"+
		"\u000f\u0000\u00fc\u00fe\u0003\u0080@\u0000\u00fd\u00fc\u0001\u0000\u0000"+
		"\u0000\u00fd\u00fe\u0001\u0000\u0000\u0000\u00fe\u00ff\u0001\u0000\u0000"+
		"\u0000\u00ff\u0100\u0003b1\u0000\u0100\u0101\u0005$\u0000\u0000\u0101"+
		"\u0102\u0003\\.\u0000\u0102\u0103\u0005\u0018\u0000\u0000\u0103\u0104"+
		"\u0005$\u0000\u0000\u0104\u0105\u0003\\.\u0000\u0105\u0106\u0005\u0019"+
		"\u0000\u0000\u0106\u0107\u0003~?\u0000\u0107\u0114\u0001\u0000\u0000\u0000"+
		"\u0108\u010a\u0003\u001e\u000f\u0000\u0109\u010b\u0003\u0080@\u0000\u010a"+
		"\u0109\u0001\u0000\u0000\u0000\u010a\u010b\u0001\u0000\u0000\u0000\u010b"+
		"\u010c\u0001\u0000\u0000\u0000\u010c\u010d\u0003b1\u0000\u010d\u010e\u0005"+
		"$\u0000\u0000\u010e\u010f\u0003\\.\u0000\u010f\u0110\u0005\u0018\u0000"+
		"\u0000\u0110\u0111\u0005$\u0000\u0000\u0111\u0112\u0003\u0006\u0003\u0000"+
		"\u0112\u0114\u0001\u0000\u0000\u0000\u0113\u00cf\u0001\u0000\u0000\u0000"+
		"\u0113\u00d9\u0001\u0000\u0000\u0000\u0113\u00e6\u0001\u0000\u0000\u0000"+
		"\u0113\u00f1\u0001\u0000\u0000\u0000\u0113\u00fb\u0001\u0000\u0000\u0000"+
		"\u0113\u0108\u0001\u0000\u0000\u0000\u0114\u0007\u0001\u0000\u0000\u0000"+
		"\u0115\u0116\u0003~?\u0000\u0116\u0117\u0003f3\u0000\u0117\u0118\u0003"+
		"\u0002\u0001\u0000\u0118\t\u0001\u0000\u0000\u0000\u0119\u011b\u0003\u0080"+
		"@\u0000\u011a\u0119\u0001\u0000\u0000\u0000\u011a\u011b\u0001\u0000\u0000"+
		"\u0000\u011b\u011c\u0001\u0000\u0000\u0000\u011c\u0144\u0005(\u0000\u0000"+
		"\u011d\u011f\u0003\u0080@\u0000\u011e\u011d\u0001\u0000\u0000\u0000\u011e"+
		"\u011f\u0001\u0000\u0000\u0000\u011f\u0120\u0001\u0000\u0000\u0000\u0120"+
		"\u0144\u0003\u0004\u0002\u0000\u0121\u0123\u0003\u0080@\u0000\u0122\u0121"+
		"\u0001\u0000\u0000\u0000\u0122\u0123\u0001\u0000\u0000\u0000\u0123\u0124"+
		"\u0001\u0000\u0000\u0000\u0124\u0144\u0003\f\u0006\u0000\u0125\u0127\u0003"+
		"\u0080@\u0000\u0126\u0125\u0001\u0000\u0000\u0000\u0126\u0127\u0001\u0000"+
		"\u0000\u0000\u0127\u0128\u0001\u0000\u0000\u0000\u0128\u0144\u0003\u0010"+
		"\b\u0000\u0129\u012b\u0003\u0080@\u0000\u012a\u0129\u0001\u0000\u0000"+
		"\u0000\u012a\u012b\u0001\u0000\u0000\u0000\u012b\u012c\u0001\u0000\u0000"+
		"\u0000\u012c\u012d\u0003\u0012\t\u0000\u012d\u012e\u0003f3\u0000\u012e"+
		"\u0144\u0001\u0000\u0000\u0000\u012f\u0131\u0003\u0080@\u0000\u0130\u012f"+
		"\u0001\u0000\u0000\u0000\u0130\u0131\u0001\u0000\u0000\u0000\u0131\u0132"+
		"\u0001\u0000\u0000\u0000\u0132\u0144\u0003\u0014\n\u0000\u0133\u0135\u0003"+
		"\u0080@\u0000\u0134\u0133\u0001\u0000\u0000\u0000\u0134\u0135\u0001\u0000"+
		"\u0000\u0000\u0135\u0136\u0001\u0000\u0000\u0000\u0136\u0137\u0003\u0018"+
		"\f\u0000\u0137\u0138\u0003f3\u0000\u0138\u0144\u0001\u0000\u0000\u0000"+
		"\u0139\u013b\u0003\u0080@\u0000\u013a\u0139\u0001\u0000\u0000\u0000\u013a"+
		"\u013b\u0001\u0000\u0000\u0000\u013b\u013c\u0001\u0000\u0000\u0000\u013c"+
		"\u013d\u0003B!\u0000\u013d\u013e\u0003f3\u0000\u013e\u0144\u0001\u0000"+
		"\u0000\u0000\u013f\u0141\u0003\u0080@\u0000\u0140\u013f\u0001\u0000\u0000"+
		"\u0000\u0140\u0141\u0001\u0000\u0000\u0000\u0141\u0142\u0001\u0000\u0000"+
		"\u0000\u0142\u0144\u0003L&\u0000\u0143\u011a\u0001\u0000\u0000\u0000\u0143"+
		"\u011e\u0001\u0000\u0000\u0000\u0143\u0122\u0001\u0000\u0000\u0000\u0143"+
		"\u0126\u0001\u0000\u0000\u0000\u0143\u012a\u0001\u0000\u0000\u0000\u0143"+
		"\u0130\u0001\u0000\u0000\u0000\u0143\u0134\u0001\u0000\u0000\u0000\u0143"+
		"\u013a\u0001\u0000\u0000\u0000\u0143\u0140\u0001\u0000\u0000\u0000\u0144"+
		"\u000b\u0001\u0000\u0000\u0000\u0145\u0147\u0003`0\u0000\u0146\u0145\u0001"+
		"\u0000\u0000\u0000\u0146\u0147\u0001\u0000\u0000\u0000\u0147\u0148\u0001"+
		"\u0000\u0000\u0000\u0148\u0149\u0005\u001e\u0000\u0000\u0149\u014a\u0003"+
		"\u0080@\u0000\u014a\u014c\u0003R)\u0000\u014b\u014d\u0003\u0080@\u0000"+
		"\u014c\u014b\u0001\u0000\u0000\u0000\u014c\u014d\u0001\u0000\u0000\u0000"+
		"\u014d\u014f\u0001\u0000\u0000\u0000\u014e\u0150\u0005\u0001\u0000\u0000"+
		"\u014f\u014e\u0001\u0000\u0000\u0000\u014f\u0150\u0001\u0000\u0000\u0000"+
		"\u0150\u0152\u0001\u0000\u0000\u0000\u0151\u0153\u0003\u0080@\u0000\u0152"+
		"\u0151\u0001\u0000\u0000\u0000\u0152\u0153\u0001\u0000\u0000\u0000\u0153"+
		"\u0154\u0001\u0000\u0000\u0000\u0154\u0155\u0003\u000e\u0007\u0000\u0155"+
		"\u0156\u0005\u0013\u0000\u0000\u0156\u0157\u0003f3\u0000\u0157\r\u0001"+
		"\u0000\u0000\u0000\u0158\u0159\u0003~?\u0000\u0159\u015a\u0003f3\u0000"+
		"\u015a\u0161\u0001\u0000\u0000\u0000\u015b\u015c\u0003~?\u0000\u015c\u015d"+
		"\u0003f3\u0000\u015d\u015e\u0003.\u0017\u0000\u015e\u015f\u0003f3\u0000"+
		"\u015f\u0161\u0001\u0000\u0000\u0000\u0160\u0158\u0001\u0000\u0000\u0000"+
		"\u0160\u015b\u0001\u0000\u0000\u0000\u0161\u000f\u0001\u0000\u0000\u0000"+
		"\u0162\u0163\u0003 \u0010\u0000\u0163\u0164\u0003&\u0013\u0000\u0164\u0165"+
		"\u0003f3\u0000\u0165\u0011\u0001\u0000\u0000\u0000\u0166\u016f\u0005\u001b"+
		"\u0000\u0000\u0167\u016f\u0005\u001c\u0000\u0000\u0168\u016c\u0003\u001a"+
		"\r\u0000\u0169\u016a\u0003\u0080@\u0000\u016a\u016b\u0003X,\u0000\u016b"+
		"\u016d\u0001\u0000\u0000\u0000\u016c\u0169\u0001\u0000\u0000\u0000\u016c"+
		"\u016d\u0001\u0000\u0000\u0000\u016d\u016f\u0001\u0000\u0000\u0000\u016e"+
		"\u0166\u0001\u0000\u0000\u0000\u016e\u0167\u0001\u0000\u0000\u0000\u016e"+
		"\u0168\u0001\u0000\u0000\u0000\u016f\u0013\u0001\u0000\u0000\u0000\u0170"+
		"\u0172\u0005\u001f\u0000\u0000\u0171\u0173\u0003\u0016\u000b\u0000\u0172"+
		"\u0171\u0001\u0000\u0000\u0000\u0172\u0173\u0001\u0000\u0000\u0000\u0173"+
		"\u0174\u0001\u0000\u0000\u0000\u0174\u0175\u0003~?\u0000\u0175\u0176\u0003"+
		"f3\u0000\u0176\u0015\u0001\u0000\u0000\u0000\u0177\u0178\u0003\u0080@"+
		"\u0000\u0178\u017c\u0003R)\u0000\u0179\u017a\u0003\u0080@\u0000\u017a"+
		"\u017b\u0003&\u0013\u0000\u017b\u017d\u0001\u0000\u0000\u0000\u017c\u0179"+
		"\u0001\u0000\u0000\u0000\u017c\u017d\u0001\u0000\u0000\u0000\u017d\u0017"+
		"\u0001\u0000\u0000\u0000\u017e\u0180\u0003R)\u0000\u017f\u0181\u0003\u0080"+
		"@\u0000\u0180\u017f\u0001\u0000\u0000\u0000\u0180\u0181\u0001\u0000\u0000"+
		"\u0000\u0181\u0182\u0001\u0000\u0000\u0000\u0182\u0184\u0005\u0001\u0000"+
		"\u0000\u0183\u0185\u0003*\u0015\u0000\u0184\u0183\u0001\u0000\u0000\u0000"+
		"\u0184\u0185\u0001\u0000\u0000\u0000\u0185\u0186\u0001\u0000\u0000\u0000"+
		"\u0186\u0187\u0003~?\u0000\u0187\u0193\u0001\u0000\u0000\u0000\u0188\u018a"+
		"\u0003\u001a\r\u0000\u0189\u018b\u0003\u0080@\u0000\u018a\u0189\u0001"+
		"\u0000\u0000\u0000\u018a\u018b\u0001\u0000\u0000\u0000\u018b\u018c\u0001"+
		"\u0000\u0000\u0000\u018c\u018e\u0005\u0001\u0000\u0000\u018d\u018f\u0003"+
		"*\u0015\u0000\u018e\u018d\u0001\u0000\u0000\u0000\u018e\u018f\u0001\u0000"+
		"\u0000\u0000\u018f\u0190\u0001\u0000\u0000\u0000\u0190\u0191\u0003~?\u0000"+
		"\u0191\u0193\u0001\u0000\u0000\u0000\u0192\u017e\u0001\u0000\u0000\u0000"+
		"\u0192\u0188\u0001\u0000\u0000\u0000\u0193\u0019\u0001\u0000\u0000\u0000"+
		"\u0194\u0195\u0003`0\u0000\u0195\u0196\u0003\u0080@\u0000\u0196\u0197"+
		"\u0003R)\u0000\u0197\u001b\u0001\u0000\u0000\u0000\u0198\u0199\u0007\u0000"+
		"\u0000\u0000\u0199\u001d\u0001\u0000\u0000\u0000\u019a\u019b\u0007\u0001"+
		"\u0000\u0000\u019b\u001f\u0001\u0000\u0000\u0000\u019c\u019d\u0007\u0002"+
		"\u0000\u0000\u019d!\u0001\u0000\u0000\u0000\u019e\u019f\u0005\n\u0000"+
		"\u0000\u019f\u01a0\u0003$\u0012\u0000\u01a0\u01a1\u0005\u000e\u0000\u0000"+
		"\u01a1\u01a2\u0003$\u0012\u0000\u01a2\u01a3\u0005\u000b\u0000\u0000\u01a3"+
		"\u01aa\u0001\u0000\u0000\u0000\u01a4\u01a6\u0005 \u0000\u0000\u01a5\u01a7"+
		"\u0003\u0080@\u0000\u01a6\u01a5\u0001\u0000\u0000\u0000\u01a6\u01a7\u0001"+
		"\u0000\u0000\u0000\u01a7\u01a8\u0001\u0000\u0000\u0000\u01a8\u01aa\u0005"+
		" \u0000\u0000\u01a9\u019e\u0001\u0000\u0000\u0000\u01a9\u01a4\u0001\u0000"+
		"\u0000\u0000\u01aa#\u0001\u0000\u0000\u0000\u01ab\u01ad\u0003&\u0013\u0000"+
		"\u01ac\u01ab\u0001\u0000\u0000\u0000\u01ac\u01ad\u0001\u0000\u0000\u0000"+
		"\u01ad%\u0001\u0000\u0000\u0000\u01ae\u01b0\u0003\u0080@\u0000\u01af\u01ae"+
		"\u0001\u0000\u0000\u0000\u01af\u01b0\u0001\u0000\u0000\u0000\u01b0\u01b1"+
		"\u0001\u0000\u0000\u0000\u01b1\u01b3\u00032\u0019\u0000\u01b2\u01b4\u0003"+
		"\u0080@\u0000\u01b3\u01b2\u0001\u0000\u0000\u0000\u01b3\u01b4\u0001\u0000"+
		"\u0000\u0000\u01b4\u01ba\u0001\u0000\u0000\u0000\u01b5\u01b6\u0003\u0080"+
		"@\u0000\u01b6\u01b7\u00032\u0019\u0000\u01b7\u01b9\u0001\u0000\u0000\u0000"+
		"\u01b8\u01b5\u0001\u0000\u0000\u0000\u01b9\u01bc\u0001\u0000\u0000\u0000"+
		"\u01ba\u01b8\u0001\u0000\u0000\u0000\u01ba\u01bb\u0001\u0000\u0000\u0000"+
		"\u01bb\u01be\u0001\u0000\u0000\u0000\u01bc\u01ba\u0001\u0000\u0000\u0000"+
		"\u01bd\u01bf\u0003\u0080@\u0000\u01be\u01bd\u0001\u0000\u0000\u0000\u01be"+
		"\u01bf\u0001\u0000\u0000\u0000\u01bf\'\u0001\u0000\u0000\u0000\u01c0\u01c2"+
		"\u0003\u0080@\u0000\u01c1\u01c0\u0001\u0000\u0000\u0000\u01c1\u01c2\u0001"+
		"\u0000\u0000\u0000\u01c2\u01c3\u0001\u0000\u0000\u0000\u01c3\u01c5\u0003"+
		"6\u001b\u0000\u01c4\u01c6\u0003\u0080@\u0000\u01c5\u01c4\u0001\u0000\u0000"+
		"\u0000\u01c5\u01c6\u0001\u0000\u0000\u0000\u01c6\u01cc\u0001\u0000\u0000"+
		"\u0000\u01c7\u01c8\u0003\u0080@\u0000\u01c8\u01c9\u00036\u001b\u0000\u01c9"+
		"\u01cb\u0001\u0000\u0000\u0000\u01ca\u01c7\u0001\u0000\u0000\u0000\u01cb"+
		"\u01ce\u0001\u0000\u0000\u0000\u01cc\u01ca\u0001\u0000\u0000\u0000\u01cc"+
		"\u01cd\u0001\u0000\u0000\u0000\u01cd\u01d0\u0001\u0000\u0000\u0000\u01ce"+
		"\u01cc\u0001\u0000\u0000\u0000\u01cf\u01d1\u0003\u0080@\u0000\u01d0\u01cf"+
		"\u0001\u0000\u0000\u0000\u01d0\u01d1\u0001\u0000\u0000\u0000\u01d1)\u0001"+
		"\u0000\u0000\u0000\u01d2\u01d4\u0003\u0080@\u0000\u01d3\u01d2\u0001\u0000"+
		"\u0000\u0000\u01d3\u01d4\u0001\u0000\u0000\u0000\u01d4\u01d5\u0001\u0000"+
		"\u0000\u0000\u01d5\u01d7\u0003:\u001d\u0000\u01d6\u01d8\u0003\u0080@\u0000"+
		"\u01d7\u01d6\u0001\u0000\u0000\u0000\u01d7\u01d8\u0001\u0000\u0000\u0000"+
		"\u01d8\u01de\u0001\u0000\u0000\u0000\u01d9\u01da\u0003\u0080@\u0000\u01da"+
		"\u01db\u0003:\u001d\u0000\u01db\u01dd\u0001\u0000\u0000\u0000\u01dc\u01d9"+
		"\u0001\u0000\u0000\u0000\u01dd\u01e0\u0001\u0000\u0000\u0000\u01de\u01dc"+
		"\u0001\u0000\u0000\u0000\u01de\u01df\u0001\u0000\u0000\u0000\u01df\u01e2"+
		"\u0001\u0000\u0000\u0000\u01e0\u01de\u0001\u0000\u0000\u0000\u01e1\u01e3"+
		"\u0003\u0080@\u0000\u01e2\u01e1\u0001\u0000\u0000\u0000\u01e2\u01e3\u0001"+
		"\u0000\u0000\u0000\u01e3+\u0001\u0000\u0000\u0000\u01e4\u01e6\u0003\u0080"+
		"@\u0000\u01e5\u01e4\u0001\u0000\u0000\u0000\u01e5\u01e6\u0001\u0000\u0000"+
		"\u0000\u01e6\u01e7\u0001\u0000\u0000\u0000\u01e7\u01e9\u0003>\u001f\u0000"+
		"\u01e8\u01ea\u0003\u0080@\u0000\u01e9\u01e8\u0001\u0000\u0000\u0000\u01e9"+
		"\u01ea\u0001\u0000\u0000\u0000\u01ea\u01f0\u0001\u0000\u0000\u0000\u01eb"+
		"\u01ec\u0003\u0080@\u0000\u01ec\u01ed\u0003>\u001f\u0000\u01ed\u01ef\u0001"+
		"\u0000\u0000\u0000\u01ee\u01eb\u0001\u0000\u0000\u0000\u01ef\u01f2\u0001"+
		"\u0000\u0000\u0000\u01f0\u01ee\u0001\u0000\u0000\u0000\u01f0\u01f1\u0001"+
		"\u0000\u0000\u0000\u01f1\u01f4\u0001\u0000\u0000\u0000\u01f2\u01f0\u0001"+
		"\u0000\u0000\u0000\u01f3\u01f5\u0003\u0080@\u0000\u01f4\u01f3\u0001\u0000"+
		"\u0000\u0000\u01f4\u01f5\u0001\u0000\u0000\u0000\u01f5-\u0001\u0000\u0000"+
		"\u0000\u01f6\u0208\u0003f3\u0000\u01f7\u01f9\u0003f3\u0000\u01f8\u01f7"+
		"\u0001\u0000\u0000\u0000\u01f8\u01f9\u0001\u0000\u0000\u0000\u01f9\u01fa"+
		"\u0001\u0000\u0000\u0000\u01fa\u0204\u00030\u0018\u0000\u01fb\u01fc\u0003"+
		"f3\u0000\u01fc\u01fd\u00030\u0018\u0000\u01fd\u0203\u0001\u0000\u0000"+
		"\u0000\u01fe\u0203\u0003f3\u0000\u01ff\u0200\u0003\u0080@\u0000\u0200"+
		"\u0201\u0003>\u001f\u0000\u0201\u0203\u0001\u0000\u0000\u0000\u0202\u01fb"+
		"\u0001\u0000\u0000\u0000\u0202\u01fe\u0001\u0000\u0000\u0000\u0202\u01ff"+
		"\u0001\u0000\u0000\u0000\u0203\u0206\u0001\u0000\u0000\u0000\u0204\u0202"+
		"\u0001\u0000\u0000\u0000\u0204\u0205\u0001\u0000\u0000\u0000\u0205\u0208"+
		"\u0001\u0000\u0000\u0000\u0206\u0204\u0001\u0000\u0000\u0000\u0207\u01f6"+
		"\u0001\u0000\u0000\u0000\u0207\u01f8\u0001\u0000\u0000\u0000\u0208/\u0001"+
		"\u0000\u0000\u0000\u0209\u020c\u0003n7\u0000\u020a\u020c\u0003B!\u0000"+
		"\u020b\u0209\u0001\u0000\u0000\u0000\u020b\u020a\u0001\u0000\u0000\u0000"+
		"\u020c\u020e\u0001\u0000\u0000\u0000\u020d\u020f\u0003>\u001f\u0000\u020e"+
		"\u020d\u0001\u0000\u0000\u0000\u020e\u020f\u0001\u0000\u0000\u0000\u020f"+
		"1\u0001\u0000\u0000\u0000\u0210\u0212\u00034\u001a\u0000\u0211\u0210\u0001"+
		"\u0000\u0000\u0000\u0212\u0213\u0001\u0000\u0000\u0000\u0213\u0211\u0001"+
		"\u0000\u0000\u0000\u0213\u0214\u0001\u0000\u0000\u0000\u02143\u0001\u0000"+
		"\u0000\u0000\u0215\u021c\u0003r9\u0000\u0216\u021c\u0003B!\u0000\u0217"+
		"\u0218\u0005\n\u0000\u0000\u0218\u0219\u0003(\u0014\u0000\u0219\u021a"+
		"\u0005\u000b\u0000\u0000\u021a\u021c\u0001\u0000\u0000\u0000\u021b\u0215"+
		"\u0001\u0000\u0000\u0000\u021b\u0216\u0001\u0000\u0000\u0000\u021b\u0217"+
		"\u0001\u0000\u0000\u0000\u021c5\u0001\u0000\u0000\u0000\u021d\u021f\u0003"+
		"8\u001c\u0000\u021e\u021d\u0001\u0000\u0000\u0000\u021f\u0220\u0001\u0000"+
		"\u0000\u0000\u0220\u021e\u0001\u0000\u0000\u0000\u0220\u0221\u0001\u0000"+
		"\u0000\u0000\u02217\u0001\u0000\u0000\u0000\u0222\u0229\u0003t:\u0000"+
		"\u0223\u0229\u0003B!\u0000\u0224\u0225\u0005\n\u0000\u0000\u0225\u0226"+
		"\u0003(\u0014\u0000\u0226\u0227\u0005\u000b\u0000\u0000\u0227\u0229\u0001"+
		"\u0000\u0000\u0000\u0228\u0222\u0001\u0000\u0000\u0000\u0228\u0223\u0001"+
		"\u0000\u0000\u0000\u0228\u0224\u0001\u0000\u0000\u0000\u02299\u0001\u0000"+
		"\u0000\u0000\u022a\u022c\u0003<\u001e\u0000\u022b\u022a\u0001\u0000\u0000"+
		"\u0000\u022c\u022d\u0001\u0000\u0000\u0000\u022d\u022b\u0001\u0000\u0000"+
		"\u0000\u022d\u022e\u0001\u0000\u0000\u0000\u022e;\u0001\u0000\u0000\u0000"+
		"\u022f\u0232\u0003v;\u0000\u0230\u0232\u0003B!\u0000\u0231\u022f\u0001"+
		"\u0000\u0000\u0000\u0231\u0230\u0001\u0000\u0000\u0000\u0232=\u0001\u0000"+
		"\u0000\u0000\u0233\u0235\u0003@ \u0000\u0234\u0233\u0001\u0000\u0000\u0000"+
		"\u0235\u0236\u0001\u0000\u0000\u0000\u0236\u0234\u0001\u0000\u0000\u0000"+
		"\u0236\u0237\u0001\u0000\u0000\u0000\u0237?\u0001\u0000\u0000\u0000\u0238"+
		"\u023b\u0003x<\u0000\u0239\u023b\u0003B!\u0000\u023a\u0238\u0001\u0000"+
		"\u0000\u0000\u023a\u0239\u0001\u0000\u0000\u0000\u023bA\u0001\u0000\u0000"+
		"\u0000\u023c\u0276\u0005\u0004\u0000\u0000\u023d\u023e\u0005\u0002\u0000"+
		"\u0000\u023e\u023f\u0003D\"\u0000\u023f\u0240\u0005\u000b\u0000\u0000"+
		"\u0240\u0276\u0001\u0000\u0000\u0000\u0241\u0242\u0005\u0002\u0000\u0000"+
		"\u0242\u0243\u0003D\"\u0000\u0243\u0244\u0003\u0080@\u0000\u0244\u0245"+
		"\u0003H$\u0000\u0245\u0246\u0005\u000b\u0000\u0000\u0246\u0276\u0001\u0000"+
		"\u0000\u0000\u0247\u0248\u0005\u0002\u0000\u0000\u0248\u0249\u0003D\""+
		"\u0000\u0249\u024a\u0005\u000e\u0000\u0000\u024a\u024b\u0003H$\u0000\u024b"+
		"\u024c\u0005\u000b\u0000\u0000\u024c\u0276\u0001\u0000\u0000\u0000\u024d"+
		"\u024e\u0005\u0002\u0000\u0000\u024e\u024f\u0003D\"\u0000\u024f\u0250"+
		"\u0005\t\u0000\u0000\u0250\u0251\u0003&\u0013\u0000\u0251\u0252\u0005"+
		"\u000b\u0000\u0000\u0252\u0276\u0001\u0000\u0000\u0000\u0253\u0254\u0005"+
		"\u0002\u0000\u0000\u0254\u0255\u0003D\"\u0000\u0255\u0256\u0005\u0001"+
		"\u0000\u0000\u0256\u0257\u0003&\u0013\u0000\u0257\u0258\u0005\u000b\u0000"+
		"\u0000\u0258\u0276\u0001\u0000\u0000\u0000\u0259\u025a\u0005\u0003\u0000"+
		"\u0000\u025a\u025b\u0003D\"\u0000\u025b\u025c\u0005\r\u0000\u0000\u025c"+
		"\u0276\u0001\u0000\u0000\u0000\u025d\u025e\u0005\u0003\u0000\u0000\u025e"+
		"\u025f\u0003D\"\u0000\u025f\u0260\u0003\u0080@\u0000\u0260\u0261\u0003"+
		"H$\u0000\u0261\u0262\u0005\r\u0000\u0000\u0262\u0276\u0001\u0000\u0000"+
		"\u0000\u0263\u0264\u0005\u0003\u0000\u0000\u0264\u0265\u0003D\"\u0000"+
		"\u0265\u0266\u0005\u000e\u0000\u0000\u0266\u0267\u0003H$\u0000\u0267\u0268"+
		"\u0005\r\u0000\u0000\u0268\u0276\u0001\u0000\u0000\u0000\u0269\u026a\u0005"+
		"\u0003\u0000\u0000\u026a\u026b\u0003D\"\u0000\u026b\u026c\u0005\t\u0000"+
		"\u0000\u026c\u026d\u0003&\u0013\u0000\u026d\u026e\u0005\r\u0000\u0000"+
		"\u026e\u0276\u0001\u0000\u0000\u0000\u026f\u0270\u0005\u0003\u0000\u0000"+
		"\u0270\u0271\u0003D\"\u0000\u0271\u0272\u0005\u0001\u0000\u0000\u0272"+
		"\u0273\u0003&\u0013\u0000\u0273\u0274\u0005\r\u0000\u0000\u0274\u0276"+
		"\u0001\u0000\u0000\u0000\u0275\u023c\u0001\u0000\u0000\u0000\u0275\u023d"+
		"\u0001\u0000\u0000\u0000\u0275\u0241\u0001\u0000\u0000\u0000\u0275\u0247"+
		"\u0001\u0000\u0000\u0000\u0275\u024d\u0001\u0000\u0000\u0000\u0275\u0253"+
		"\u0001\u0000\u0000\u0000\u0275\u0259\u0001\u0000\u0000\u0000\u0275\u025d"+
		"\u0001\u0000\u0000\u0000\u0275\u0263\u0001\u0000\u0000\u0000\u0275\u0269"+
		"\u0001\u0000\u0000\u0000\u0275\u026f\u0001\u0000\u0000\u0000\u0276C\u0001"+
		"\u0000\u0000\u0000\u0277\u0279\u0003F#\u0000\u0278\u0277\u0001\u0000\u0000"+
		"\u0000\u0279\u027a\u0001\u0000\u0000\u0000\u027a\u0278\u0001\u0000\u0000"+
		"\u0000\u027a\u027b\u0001\u0000\u0000\u0000\u027bE\u0001\u0000\u0000\u0000"+
		"\u027c\u027f\u0005#\u0000\u0000\u027d\u027f\u0003B!\u0000\u027e\u027c"+
		"\u0001\u0000\u0000\u0000\u027e\u027d\u0001\u0000\u0000\u0000\u027fG\u0001"+
		"\u0000\u0000\u0000\u0280\u0282\u0003J%\u0000\u0281\u0280\u0001\u0000\u0000"+
		"\u0000\u0281\u0282\u0001\u0000\u0000\u0000\u0282\u0289\u0001\u0000\u0000"+
		"\u0000\u0283\u0285\u0005\u000e\u0000\u0000\u0284\u0286\u0003J%\u0000\u0285"+
		"\u0284\u0001\u0000\u0000\u0000\u0285\u0286\u0001\u0000\u0000\u0000\u0286"+
		"\u0288\u0001\u0000\u0000\u0000\u0287\u0283\u0001\u0000\u0000\u0000\u0288"+
		"\u028b\u0001\u0000\u0000\u0000\u0289\u0287\u0001\u0000\u0000\u0000\u0289"+
		"\u028a\u0001\u0000\u0000\u0000\u028aI\u0001\u0000\u0000\u0000\u028b\u0289"+
		"\u0001\u0000\u0000\u0000\u028c\u028d\u0003&\u0013\u0000\u028dK\u0001\u0000"+
		"\u0000\u0000\u028e\u02b8\u0003N\'\u0000\u028f\u0291\u0003X,\u0000\u0290"+
		"\u0292\u0003\u0080@\u0000\u0291\u0290\u0001\u0000\u0000\u0000\u0291\u0292"+
		"\u0001\u0000\u0000\u0000\u0292\u0293\u0001\u0000\u0000\u0000\u0293\u0295"+
		"\u0003|>\u0000\u0294\u0296\u0003\u0080@\u0000\u0295\u0294\u0001\u0000"+
		"\u0000\u0000\u0295\u0296\u0001\u0000\u0000\u0000\u0296\u0297\u0001\u0000"+
		"\u0000\u0000\u0297\u02a0\u0003T*\u0000\u0298\u029a\u0003\u0080@\u0000"+
		"\u0299\u0298\u0001\u0000\u0000\u0000\u0299\u029a\u0001\u0000\u0000\u0000"+
		"\u029a\u029b\u0001\u0000\u0000\u0000\u029b\u029d\u0005\u000f\u0000\u0000"+
		"\u029c\u029e\u0003\u0080@\u0000\u029d\u029c\u0001\u0000\u0000\u0000\u029d"+
		"\u029e\u0001\u0000\u0000\u0000\u029e\u029f\u0001\u0000\u0000\u0000\u029f"+
		"\u02a1\u0003V+\u0000\u02a0\u0299\u0001\u0000\u0000\u0000\u02a0\u02a1\u0001"+
		"\u0000\u0000\u0000\u02a1\u02a3\u0001\u0000\u0000\u0000\u02a2\u02a4\u0003"+
		"\u0080@\u0000\u02a3\u02a2\u0001\u0000\u0000\u0000\u02a3\u02a4\u0001\u0000"+
		"\u0000\u0000\u02a4\u02a5\u0001\u0000\u0000\u0000\u02a5\u02a7\u0005$\u0000"+
		"\u0000\u02a6\u02a8\u0003Z-\u0000\u02a7\u02a6\u0001\u0000\u0000\u0000\u02a7"+
		"\u02a8\u0001\u0000\u0000\u0000\u02a8\u02b8\u0001\u0000\u0000\u0000\u02a9"+
		"\u02ab\u0003X,\u0000\u02aa\u02ac\u0003\u0080@\u0000\u02ab\u02aa\u0001"+
		"\u0000\u0000\u0000\u02ab\u02ac\u0001\u0000\u0000\u0000\u02ac\u02ad\u0001"+
		"\u0000\u0000\u0000\u02ad\u02af\u0003|>\u0000\u02ae\u02b0\u0003\u0080@"+
		"\u0000\u02af\u02ae\u0001\u0000\u0000\u0000\u02af\u02b0\u0001\u0000\u0000"+
		"\u0000\u02b0\u02b1\u0001\u0000\u0000\u0000\u02b1\u02b3\u0003\u0018\f\u0000"+
		"\u02b2\u02b4\u0003\u0080@\u0000\u02b3\u02b2\u0001\u0000\u0000\u0000\u02b3"+
		"\u02b4\u0001\u0000\u0000\u0000\u02b4\u02b5\u0001\u0000\u0000\u0000\u02b5"+
		"\u02b6\u0005$\u0000\u0000\u02b6\u02b8\u0001\u0000\u0000\u0000\u02b7\u028e"+
		"\u0001\u0000\u0000\u0000\u02b7\u028f\u0001\u0000\u0000\u0000\u02b7\u02a9"+
		"\u0001\u0000\u0000\u0000\u02b8M\u0001\u0000\u0000\u0000\u02b9\u02bb\u0003"+
		"X,\u0000\u02ba\u02bc\u0003\u0080@\u0000\u02bb\u02ba\u0001\u0000\u0000"+
		"\u0000\u02bb\u02bc\u0001\u0000\u0000\u0000\u02bc\u02bd\u0001\u0000\u0000"+
		"\u0000\u02bd\u02bf\u0003|>\u0000\u02be\u02c0\u0003\u0080@\u0000\u02bf"+
		"\u02be\u0001\u0000\u0000\u0000\u02bf\u02c0\u0001\u0000\u0000\u0000\u02c0"+
		"\u02c1\u0001\u0000\u0000\u0000\u02c1\u02c3\u0003R)\u0000\u02c2\u02c4\u0003"+
		"\u0080@\u0000\u02c3\u02c2\u0001\u0000\u0000\u0000\u02c3\u02c4\u0001\u0000"+
		"\u0000\u0000\u02c4\u02c5\u0001\u0000\u0000\u0000\u02c5\u02c7\u0003|>\u0000"+
		"\u02c6\u02c8\u0003\u0080@\u0000\u02c7\u02c6\u0001\u0000\u0000\u0000\u02c7"+
		"\u02c8\u0001\u0000\u0000\u0000\u02c8\u02c9\u0001\u0000\u0000\u0000\u02c9"+
		"\u02d2\u0003T*\u0000\u02ca\u02cc\u0003\u0080@\u0000\u02cb\u02ca\u0001"+
		"\u0000\u0000\u0000\u02cb\u02cc\u0001\u0000\u0000\u0000\u02cc\u02cd\u0001"+
		"\u0000\u0000\u0000\u02cd\u02cf\u0005\u000f\u0000\u0000\u02ce\u02d0\u0003"+
		"\u0080@\u0000\u02cf\u02ce\u0001\u0000\u0000\u0000\u02cf\u02d0\u0001\u0000"+
		"\u0000\u0000\u02d0\u02d1\u0001\u0000\u0000\u0000\u02d1\u02d3\u0003V+\u0000"+
		"\u02d2\u02cb\u0001\u0000\u0000\u0000\u02d2\u02d3\u0001\u0000\u0000\u0000"+
		"\u02d3\u02d5\u0001\u0000\u0000\u0000\u02d4\u02d6\u0003\u0080@\u0000\u02d5"+
		"\u02d4\u0001\u0000\u0000\u0000\u02d5\u02d6\u0001\u0000\u0000\u0000\u02d6"+
		"\u02d7\u0001\u0000\u0000\u0000\u02d7\u02d9\u0005$\u0000\u0000\u02d8\u02da"+
		"\u0003Z-\u0000\u02d9\u02d8\u0001\u0000\u0000\u0000\u02d9\u02da\u0001\u0000"+
		"\u0000\u0000\u02daO\u0001\u0000\u0000\u0000\u02db\u02dc\u0003R)\u0000"+
		"\u02dcQ\u0001\u0000\u0000\u0000\u02dd\u02e0\u0003b1\u0000\u02de\u02e0"+
		"\u0003B!\u0000\u02df\u02dd\u0001\u0000\u0000\u0000\u02df\u02de\u0001\u0000"+
		"\u0000\u0000\u02e0\u02e1\u0001\u0000\u0000\u0000\u02e1\u02df\u0001\u0000"+
		"\u0000\u0000\u02e1\u02e2\u0001\u0000\u0000\u0000\u02e2S\u0001\u0000\u0000"+
		"\u0000\u02e3\u02e5\u0003X,\u0000\u02e4\u02e3\u0001\u0000\u0000\u0000\u02e4"+
		"\u02e5\u0001\u0000\u0000\u0000\u02e5U\u0001\u0000\u0000\u0000\u02e6\u02e8"+
		"\u0003X,\u0000\u02e7\u02e6\u0001\u0000\u0000\u0000\u02e7\u02e8\u0001\u0000"+
		"\u0000\u0000\u02e8W\u0001\u0000\u0000\u0000\u02e9\u02ef\u0003P(\u0000"+
		"\u02ea\u02eb\u0003\u0080@\u0000\u02eb\u02ec\u0003P(\u0000\u02ec\u02ee"+
		"\u0001\u0000\u0000\u0000\u02ed\u02ea\u0001\u0000\u0000\u0000\u02ee\u02f1"+
		"\u0001\u0000\u0000\u0000\u02ef\u02ed\u0001\u0000\u0000\u0000\u02ef\u02f0"+
		"\u0001\u0000\u0000\u0000\u02f0Y\u0001\u0000\u0000\u0000\u02f1\u02ef\u0001"+
		"\u0000\u0000\u0000\u02f2\u02f4\u0003^/\u0000\u02f3\u02f2\u0001\u0000\u0000"+
		"\u0000\u02f4\u02f5\u0001\u0000\u0000\u0000\u02f5\u02f3\u0001\u0000\u0000"+
		"\u0000\u02f5\u02f6\u0001\u0000\u0000\u0000\u02f6[\u0001\u0000\u0000\u0000"+
		"\u02f7\u02f9\u0003~?\u0000\u02f8\u02fa\u0003Z-\u0000\u02f9\u02f8\u0001"+
		"\u0000\u0000\u0000\u02f9\u02fa\u0001\u0000\u0000\u0000\u02fa]\u0001\u0000"+
		"\u0000\u0000\u02fb\u02fd\u0005%\u0000\u0000\u02fc\u02fe\u0003\u0080@\u0000"+
		"\u02fd\u02fc\u0001\u0000\u0000\u0000\u02fd\u02fe\u0001\u0000\u0000\u0000"+
		"\u02fe\u02ff\u0001\u0000\u0000\u0000\u02ff\u0300\u0003,\u0016\u0000\u0300"+
		"\u0301\u0005$\u0000\u0000\u0301\u0310\u0001\u0000\u0000\u0000\u0302\u0304"+
		"\u0005%\u0000\u0000\u0303\u0305\u0003\u0080@\u0000\u0304\u0303\u0001\u0000"+
		"\u0000\u0000\u0304\u0305\u0001\u0000\u0000\u0000\u0305\u0306\u0001\u0000"+
		"\u0000\u0000\u0306\u0307\u0005(\u0000\u0000\u0307\u0310\u0005$\u0000\u0000"+
		"\u0308\u030a\u0003\u0080@\u0000\u0309\u0308\u0001\u0000\u0000\u0000\u0309"+
		"\u030a\u0001\u0000\u0000\u0000\u030a\u030b\u0001\u0000\u0000\u0000\u030b"+
		"\u030c\u0005(\u0000\u0000\u030c\u0310\u0005$\u0000\u0000\u030d\u0310\u0003"+
		"\u0006\u0003\u0000\u030e\u0310\u0005$\u0000\u0000\u030f\u02fb\u0001\u0000"+
		"\u0000\u0000\u030f\u0302\u0001\u0000\u0000\u0000\u030f\u0309\u0001\u0000"+
		"\u0000\u0000\u030f\u030d\u0001\u0000\u0000\u0000\u030f\u030e\u0001\u0000"+
		"\u0000\u0000\u0310_\u0001\u0000\u0000\u0000\u0311\u0326\u0005\u001a\u0000"+
		"\u0000\u0312\u0326\u0005\u001b\u0000\u0000\u0313\u0326\u0005\u001c\u0000"+
		"\u0000\u0314\u0315\u0005\u001a\u0000\u0000\u0315\u0316\u0003\u0080@\u0000"+
		"\u0316\u0317\u0005\u001b\u0000\u0000\u0317\u0326\u0001\u0000\u0000\u0000"+
		"\u0318\u0319\u0005\u001b\u0000\u0000\u0319\u031a\u0003\u0080@\u0000\u031a"+
		"\u031b\u0005\u001a\u0000\u0000\u031b\u0326\u0001\u0000\u0000\u0000\u031c"+
		"\u0326\u0005\u001d\u0000\u0000\u031d\u031e\u0005\u001a\u0000\u0000\u031e"+
		"\u031f\u0003\u0080@\u0000\u031f\u0320\u0005\u001d\u0000\u0000\u0320\u0326"+
		"\u0001\u0000\u0000\u0000\u0321\u0322\u0005\u001d\u0000\u0000\u0322\u0323"+
		"\u0003\u0080@\u0000\u0323\u0324\u0005\u001a\u0000\u0000\u0324\u0326\u0001"+
		"\u0000\u0000\u0000\u0325\u0311\u0001\u0000\u0000\u0000\u0325\u0312\u0001"+
		"\u0000\u0000\u0000\u0325\u0313\u0001\u0000\u0000\u0000\u0325\u0314\u0001"+
		"\u0000\u0000\u0000\u0325\u0318\u0001\u0000\u0000\u0000\u0325\u031c\u0001"+
		"\u0000\u0000\u0000\u0325\u031d\u0001\u0000\u0000\u0000\u0325\u0321\u0001"+
		"\u0000\u0000\u0000\u0326a\u0001\u0000\u0000\u0000\u0327\u0329\u0003d2"+
		"\u0000\u0328\u0327\u0001\u0000\u0000\u0000\u0329\u032a\u0001\u0000\u0000"+
		"\u0000\u032a\u0328\u0001\u0000\u0000\u0000\u032a\u032b\u0001\u0000\u0000"+
		"\u0000\u032bc\u0001\u0000\u0000\u0000\u032c\u0332\u0005#\u0000\u0000\u032d"+
		"\u0332\u0003z=\u0000\u032e\u0332\u0005\u000e\u0000\u0000\u032f\u0332\u0005"+
		"\n\u0000\u0000\u0330\u0332\u0005\u000b\u0000\u0000\u0331\u032c\u0001\u0000"+
		"\u0000\u0000\u0331\u032d\u0001\u0000\u0000\u0000\u0331\u032e\u0001\u0000"+
		"\u0000\u0000\u0331\u032f\u0001\u0000\u0000\u0000\u0331\u0330\u0001\u0000"+
		"\u0000\u0000\u0332e\u0001\u0000\u0000\u0000\u0333\u0334\u0005$\u0000\u0000"+
		"\u0334g\u0001\u0000\u0000\u0000\u0335\u0336\u0007\u0003\u0000\u0000\u0336"+
		"i\u0001\u0000\u0000\u0000\u0337\u033a\u0003h4\u0000\u0338\u033a\u0005"+
		"\u000e\u0000\u0000\u0339\u0337\u0001\u0000\u0000\u0000\u0339\u0338\u0001"+
		"\u0000\u0000\u0000\u033ak\u0001\u0000\u0000\u0000\u033b\u0341\u0003j5"+
		"\u0000\u033c\u0341\u0005\u0005\u0000\u0000\u033d\u0341\u0005\n\u0000\u0000"+
		"\u033e\u0341\u0005\u000b\u0000\u0000\u033f\u0341\u0003z=\u0000\u0340\u033b"+
		"\u0001\u0000\u0000\u0000\u0340\u033c\u0001\u0000\u0000\u0000\u0340\u033d"+
		"\u0001\u0000\u0000\u0000\u0340\u033e\u0001\u0000\u0000\u0000\u0340\u033f"+
		"\u0001\u0000\u0000\u0000\u0341m\u0001\u0000\u0000\u0000\u0342\u0354\u0003"+
		"h4\u0000\u0343\u0354\u0005\n\u0000\u0000\u0344\u0354\u0005\u000b\u0000"+
		"\u0000\u0345\u0354\u0005\u000e\u0000\u0000\u0346\u0354\u0005(\u0000\u0000"+
		"\u0347\u0354\u0005\u0010\u0000\u0000\u0348\u0354\u0005\u001a\u0000\u0000"+
		"\u0349\u0354\u0005\u001b\u0000\u0000\u034a\u0354\u0005\u001c\u0000\u0000"+
		"\u034b\u0354\u0005\u0014\u0000\u0000\u034c\u0354\u0005\u0015\u0000\u0000"+
		"\u034d\u0354\u0005\u0016\u0000\u0000\u034e\u0354\u0005\u0017\u0000\u0000"+
		"\u034f\u0354\u0005\u0018\u0000\u0000\u0350\u0354\u0005\u0019\u0000\u0000"+
		"\u0351\u0354\u0005\u001e\u0000\u0000\u0352\u0354\u0005\u001d\u0000\u0000"+
		"\u0353\u0342\u0001\u0000\u0000\u0000\u0353\u0343\u0001\u0000\u0000\u0000"+
		"\u0353\u0344\u0001\u0000\u0000\u0000\u0353\u0345\u0001\u0000\u0000\u0000"+
		"\u0353\u0346\u0001\u0000\u0000\u0000\u0353\u0347\u0001\u0000\u0000\u0000"+
		"\u0353\u0348\u0001\u0000\u0000\u0000\u0353\u0349\u0001\u0000\u0000\u0000"+
		"\u0353\u034a\u0001\u0000\u0000\u0000\u0353\u034b\u0001\u0000\u0000\u0000"+
		"\u0353\u034c\u0001\u0000\u0000\u0000\u0353\u034d\u0001\u0000\u0000\u0000"+
		"\u0353\u034e\u0001\u0000\u0000\u0000\u0353\u034f\u0001\u0000\u0000\u0000"+
		"\u0353\u0350\u0001\u0000\u0000\u0000\u0353\u0351\u0001\u0000\u0000\u0000"+
		"\u0353\u0352\u0001\u0000\u0000\u0000\u0354o\u0001\u0000\u0000\u0000\u0355"+
		"\u035a\u0003l6\u0000\u0356\u035a\u0005\u0005\u0000\u0000\u0357\u035a\u0005"+
		"(\u0000\u0000\u0358\u035a\u0005\u000f\u0000\u0000\u0359\u0355\u0001\u0000"+
		"\u0000\u0000\u0359\u0356\u0001\u0000\u0000\u0000\u0359\u0357\u0001\u0000"+
		"\u0000\u0000\u0359\u0358\u0001\u0000\u0000\u0000\u035aq\u0001\u0000\u0000"+
		"\u0000\u035b\u035d\u0003h4\u0000\u035c\u035b\u0001\u0000\u0000\u0000\u035d"+
		"\u035e\u0001\u0000\u0000\u0000\u035e\u035c\u0001\u0000\u0000\u0000\u035e"+
		"\u035f\u0001\u0000\u0000\u0000\u035fs\u0001\u0000\u0000\u0000\u0360\u0362"+
		"\u0003j5\u0000\u0361\u0360\u0001\u0000\u0000\u0000\u0362\u0363\u0001\u0000"+
		"\u0000\u0000\u0363\u0361\u0001\u0000\u0000\u0000\u0363\u0364\u0001\u0000"+
		"\u0000\u0000\u0364u\u0001\u0000\u0000\u0000\u0365\u0367\u0003l6\u0000"+
		"\u0366\u0365\u0001\u0000\u0000\u0000\u0367\u0368\u0001\u0000\u0000\u0000"+
		"\u0368\u0366\u0001\u0000\u0000\u0000\u0368\u0369\u0001\u0000\u0000\u0000"+
		"\u0369w\u0001\u0000\u0000\u0000\u036a\u036c\u0003p8\u0000\u036b\u036a"+
		"\u0001\u0000\u0000\u0000\u036c\u036d\u0001\u0000\u0000\u0000\u036d\u036b"+
		"\u0001\u0000\u0000\u0000\u036d\u036e\u0001\u0000\u0000\u0000\u036ey\u0001"+
		"\u0000\u0000\u0000\u036f\u0370\u0007\u0004\u0000\u0000\u0370{\u0001\u0000"+
		"\u0000\u0000\u0371\u0372\u0007\u0005\u0000\u0000\u0372}\u0001\u0000\u0000"+
		"\u0000\u0373\u0375\u0005(\u0000\u0000\u0374\u0373\u0001\u0000\u0000\u0000"+
		"\u0374\u0375\u0001\u0000\u0000\u0000\u0375\u007f\u0001\u0000\u0000\u0000"+
		"\u0376\u0377\u0007\u0006\u0000\u0000\u0377\u0081\u0001\u0000\u0000\u0000"+
		"{\u0086\u008a\u008c\u0091\u009b\u00a7\u00b0\u00ba\u00c6\u00cd\u00d1\u00db"+
		"\u00e8\u00f3\u00fd\u010a\u0113\u011a\u011e\u0122\u0126\u012a\u0130\u0134"+
		"\u013a\u0140\u0143\u0146\u014c\u014f\u0152\u0160\u016c\u016e\u0172\u017c"+
		"\u0180\u0184\u018a\u018e\u0192\u01a6\u01a9\u01ac\u01af\u01b3\u01ba\u01be"+
		"\u01c1\u01c5\u01cc\u01d0\u01d3\u01d7\u01de\u01e2\u01e5\u01e9\u01f0\u01f4"+
		"\u01f8\u0202\u0204\u0207\u020b\u020e\u0213\u021b\u0220\u0228\u022d\u0231"+
		"\u0236\u023a\u0275\u027a\u027e\u0281\u0285\u0289\u0291\u0295\u0299\u029d"+
		"\u02a0\u02a3\u02a7\u02ab\u02af\u02b3\u02b7\u02bb\u02bf\u02c3\u02c7\u02cb"+
		"\u02cf\u02d2\u02d5\u02d9\u02df\u02e1\u02e4\u02e7\u02ef\u02f5\u02f9\u02fd"+
		"\u0304\u0309\u030f\u0325\u032a\u0331\u0339\u0340\u0353\u0359\u035e\u0363"+
		"\u0368\u036d\u0374";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}