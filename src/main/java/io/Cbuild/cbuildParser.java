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
		ASSIGN_OP=1, DOLLAR_LPAREN=2, VAR=3, DOUBLE_COLON=4, COLON=5, LPAREN=6, 
		RPAREN=7, COMMA=8, INCLUDE=9, ENDEF=10, IFDEF=11, IFNDEF=12, IFEQ=13, 
		IFNEQ=14, ELSE=15, ENDIF=16, OVERRIDE=17, EXPORT=18, UNEXPORT=19, UNDEFINE=20, 
		DEFINE=21, SLIT=22, CHARS=23, NL=24, LEADING_TAB=25, WS=26, TAB=27, COMMENT=28;
	public static final int
		RULE_cbuildfile = 0, RULE_statements = 1, RULE_conditional = 2, RULE_conditional_in_recipe = 3, 
		RULE_statements_opt = 4, RULE_statement = 5, RULE_define = 6, RULE_definition = 7, 
		RULE_include = 8, RULE_export = 9, RULE_assignment = 10, RULE_assignment_prefix = 11, 
		RULE_if_eq_kw = 12, RULE_if_def_kw = 13, RULE_condition = 14, RULE_expressions_opt = 15, 
		RULE_expressions = 16, RULE_exprs_nested = 17, RULE_exprs_in_assign = 18, 
		RULE_exprs_in_recipe = 19, RULE_exprs_in_def = 20, RULE_first_expr_in_def = 21, 
		RULE_expression = 22, RULE_expression_atom = 23, RULE_expr_nested = 24, 
		RULE_expr_nested_atom = 25, RULE_expr_in_assign = 26, RULE_expr_in_assign_atom = 27, 
		RULE_expr_in_recipe = 28, RULE_expr_in_recipe_atom = 29, RULE_function = 30, 
		RULE_function_name = 31, RULE_function_name_atom = 32, RULE_arguments = 33, 
		RULE_argument = 34, RULE_rule = 35, RULE_target = 36, RULE_pattern = 37, 
		RULE_prerequisites = 38, RULE_targets = 39, RULE_recipes = 40, RULE_recipes_opt = 41, 
		RULE_recipe = 42, RULE_specifiers = 43, RULE_identifier = 44, RULE_identifier_atom = 45, 
		RULE_br = 46, RULE_char = 47, RULE_char_nested = 48, RULE_char_in_assign = 49, 
		RULE_char_in_def = 50, RULE_char_in_recipe = 51, RULE_text = 52, RULE_text_nested = 53, 
		RULE_text_in_assign = 54, RULE_text_in_recipe = 55, RULE_keywords = 56, 
		RULE_colon = 57, RULE_comment_opt = 58, RULE_ws = 59;
	private static String[] makeRuleNames() {
		return new String[] {
			"cbuildfile", "statements", "conditional", "conditional_in_recipe", "statements_opt", 
			"statement", "define", "definition", "include", "export", "assignment", 
			"assignment_prefix", "if_eq_kw", "if_def_kw", "condition", "expressions_opt", 
			"expressions", "exprs_nested", "exprs_in_assign", "exprs_in_recipe", 
			"exprs_in_def", "first_expr_in_def", "expression", "expression_atom", 
			"expr_nested", "expr_nested_atom", "expr_in_assign", "expr_in_assign_atom", 
			"expr_in_recipe", "expr_in_recipe_atom", "function", "function_name", 
			"function_name_atom", "arguments", "argument", "rule", "target", "pattern", 
			"prerequisites", "targets", "recipes", "recipes_opt", "recipe", "specifiers", 
			"identifier", "identifier_atom", "br", "char", "char_nested", "char_in_assign", 
			"char_in_def", "char_in_recipe", "text", "text_nested", "text_in_assign", 
			"text_in_recipe", "keywords", "colon", "comment_opt", "ws"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, "'$('", null, "'::'", "':'", "'('", "')'", "','", "'include'", 
			"'endef'", "'ifdef'", "'ifndef'", "'ifeq'", "'ifneq'", "'else'", "'endif'", 
			"'override'", "'export'", "'unexport'", "'undefine'", "'define'", null, 
			null, null, null, null, "'\\t'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "ASSIGN_OP", "DOLLAR_LPAREN", "VAR", "DOUBLE_COLON", "COLON", "LPAREN", 
			"RPAREN", "COMMA", "INCLUDE", "ENDEF", "IFDEF", "IFNDEF", "IFEQ", "IFNEQ", 
			"ELSE", "ENDIF", "OVERRIDE", "EXPORT", "UNEXPORT", "UNDEFINE", "DEFINE", 
			"SLIT", "CHARS", "NL", "LEADING_TAB", "WS", "TAB", "COMMENT"
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
			setState(124);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(120);
				statements();
				setState(121);
				match(EOF);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(123);
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
			setState(130);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					setState(128);
					_errHandler.sync(this);
					switch (_input.LA(1)) {
					case DOLLAR_LPAREN:
					case VAR:
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
					case CHARS:
					case COMMENT:
						{
						setState(126);
						statement();
						}
						break;
					case NL:
					case LEADING_TAB:
						{
						setState(127);
						br();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					} 
				}
				setState(132);
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
		try {
			setState(177);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(133);
				if_eq_kw();
				setState(134);
				condition();
				setState(135);
				statements_opt();
				setState(136);
				match(ENDIF);
				setState(137);
				comment_opt();
				setState(138);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(140);
				if_eq_kw();
				setState(141);
				condition();
				setState(142);
				statements_opt();
				setState(143);
				match(ELSE);
				setState(144);
				statements_opt();
				setState(145);
				match(ENDIF);
				setState(146);
				comment_opt();
				setState(147);
				br();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(149);
				if_eq_kw();
				setState(150);
				condition();
				setState(151);
				statements_opt();
				setState(152);
				match(ELSE);
				setState(153);
				conditional();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(155);
				if_def_kw();
				setState(156);
				identifier();
				setState(157);
				statements_opt();
				setState(158);
				match(ENDIF);
				setState(159);
				comment_opt();
				setState(160);
				br();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(162);
				if_def_kw();
				setState(163);
				identifier();
				setState(164);
				statements_opt();
				setState(165);
				match(ELSE);
				setState(166);
				statements_opt();
				setState(167);
				match(ENDIF);
				setState(168);
				comment_opt();
				setState(169);
				br();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(171);
				if_def_kw();
				setState(172);
				identifier();
				setState(173);
				statements_opt();
				setState(174);
				match(ELSE);
				setState(175);
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
		try {
			setState(219);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,4,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(179);
				if_eq_kw();
				setState(180);
				condition();
				setState(181);
				recipes_opt();
				setState(182);
				match(ENDIF);
				setState(183);
				comment_opt();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(185);
				if_eq_kw();
				setState(186);
				condition();
				setState(187);
				recipes_opt();
				setState(188);
				match(ELSE);
				setState(189);
				recipes_opt();
				setState(190);
				match(ENDIF);
				setState(191);
				comment_opt();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(193);
				if_eq_kw();
				setState(194);
				condition();
				setState(195);
				recipes_opt();
				setState(196);
				match(ELSE);
				setState(197);
				conditional_in_recipe();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(199);
				if_def_kw();
				setState(200);
				identifier();
				setState(201);
				recipes_opt();
				setState(202);
				match(ENDIF);
				setState(203);
				comment_opt();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(205);
				if_def_kw();
				setState(206);
				identifier();
				setState(207);
				recipes_opt();
				setState(208);
				match(ELSE);
				setState(209);
				recipes_opt();
				setState(210);
				match(ENDIF);
				setState(211);
				comment_opt();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(213);
				if_def_kw();
				setState(214);
				identifier();
				setState(215);
				recipes_opt();
				setState(216);
				match(ELSE);
				setState(217);
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
			setState(221);
			comment_opt();
			setState(222);
			br();
			setState(224);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,5,_ctx) ) {
			case 1:
				{
				setState(223);
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
		try {
			setState(240);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(226);
				match(COMMENT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(227);
				assignment();
				setState(228);
				br();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(230);
				function();
				setState(231);
				br();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(233);
				rule_();
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(234);
				conditional();
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(235);
				define();
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(236);
				include();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(237);
				export();
				setState(238);
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
	public static class DefineContext extends ParserRuleContext {
		public TerminalNode DEFINE() { return getToken(cbuildParser.DEFINE, 0); }
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
			setState(243);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 1966080L) != 0)) {
				{
				setState(242);
				specifiers();
				}
			}

			setState(245);
			match(DEFINE);
			setState(246);
			pattern();
			setState(248);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==ASSIGN_OP) {
				{
				setState(247);
				match(ASSIGN_OP);
				}
			}

			setState(250);
			definition();
			setState(251);
			match(ENDEF);
			setState(252);
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
			setState(262);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(254);
				comment_opt();
				setState(255);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(257);
				comment_opt();
				setState(258);
				br();
				setState(259);
				exprs_in_def();
				setState(260);
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
		public TerminalNode INCLUDE() { return getToken(cbuildParser.INCLUDE, 0); }
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
			setState(264);
			match(INCLUDE);
			setState(265);
			expressions();
			setState(266);
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
			setState(276);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,11,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(268);
				match(EXPORT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(269);
				match(UNEXPORT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(270);
				assignment_prefix();
				setState(274);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(271);
					ws();
					setState(272);
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
	public static class AssignmentContext extends ParserRuleContext {
		public PatternContext pattern() {
			return getRuleContext(PatternContext.class,0);
		}
		public TerminalNode ASSIGN_OP() { return getToken(cbuildParser.ASSIGN_OP, 0); }
		public Comment_optContext comment_opt() {
			return getRuleContext(Comment_optContext.class,0);
		}
		public List<WsContext> ws() {
			return getRuleContexts(WsContext.class);
		}
		public WsContext ws(int i) {
			return getRuleContext(WsContext.class,i);
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
		enterRule(_localctx, 20, RULE_assignment);
		int _la;
		try {
			setState(304);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,18,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(278);
				pattern();
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
				match(ASSIGN_OP);
				setState(284);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(283);
					ws();
					}
				}

				setState(287);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 16777198L) != 0)) {
					{
					setState(286);
					exprs_in_assign();
					}
				}

				setState(289);
				comment_opt();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(291);
				assignment_prefix();
				setState(293);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(292);
					ws();
					}
				}

				setState(295);
				match(ASSIGN_OP);
				setState(297);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(296);
					ws();
					}
				}

				setState(300);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 16777198L) != 0)) {
					{
					setState(299);
					exprs_in_assign();
					}
				}

				setState(302);
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
		enterRule(_localctx, 22, RULE_assignment_prefix);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(306);
			specifiers();
			setState(307);
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
		enterRule(_localctx, 24, RULE_if_eq_kw);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(309);
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
		enterRule(_localctx, 26, RULE_if_def_kw);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(311);
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
		enterRule(_localctx, 28, RULE_condition);
		try {
			setState(321);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LPAREN:
				enterOuterAlt(_localctx, 1);
				{
				setState(313);
				match(LPAREN);
				setState(314);
				expressions_opt();
				setState(315);
				match(COMMA);
				setState(316);
				expressions_opt();
				setState(317);
				match(RPAREN);
				}
				break;
			case SLIT:
				enterOuterAlt(_localctx, 2);
				{
				setState(319);
				match(SLIT);
				setState(320);
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
		enterRule(_localctx, 30, RULE_expressions_opt);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(324);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 12583022L) != 0)) {
				{
				setState(323);
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
		enterRule(_localctx, 32, RULE_expressions);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(326);
			expression();
			setState(332);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS || _la==TAB) {
				{
				{
				setState(327);
				ws();
				setState(328);
				expression();
				}
				}
				setState(334);
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
		enterRule(_localctx, 34, RULE_exprs_nested);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(335);
			expr_nested();
			setState(341);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS || _la==TAB) {
				{
				{
				setState(336);
				ws();
				setState(337);
				expr_nested();
				}
				}
				setState(343);
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
		enterRule(_localctx, 36, RULE_exprs_in_assign);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(344);
			expr_in_assign();
			setState(350);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS || _la==TAB) {
				{
				{
				setState(345);
				ws();
				setState(346);
				expr_in_assign();
				}
				}
				setState(352);
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
		enterRule(_localctx, 38, RULE_exprs_in_recipe);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(353);
			expr_in_recipe();
			setState(359);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS || _la==TAB) {
				{
				{
				setState(354);
				ws();
				setState(355);
				expr_in_recipe();
				}
				}
				setState(361);
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
		enterRule(_localctx, 40, RULE_exprs_in_def);
		int _la;
		try {
			int _alt;
			setState(379);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,28,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(362);
				br();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(364);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==NL || _la==LEADING_TAB) {
					{
					setState(363);
					br();
					}
				}

				setState(366);
				first_expr_in_def();
				setState(376);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,27,_ctx);
				while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						setState(374);
						_errHandler.sync(this);
						switch ( getInterpreter().adaptivePredict(_input,26,_ctx) ) {
						case 1:
							{
							{
							setState(367);
							br();
							setState(368);
							first_expr_in_def();
							}
							}
							break;
						case 2:
							{
							{
							setState(370);
							br();
							}
							}
							break;
						case 3:
							{
							{
							setState(371);
							ws();
							setState(372);
							expr_in_recipe();
							}
							}
							break;
						}
						} 
					}
					setState(378);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,27,_ctx);
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
		enterRule(_localctx, 42, RULE_first_expr_in_def);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(383);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
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
				setState(381);
				char_in_def();
				}
				break;
			case DOLLAR_LPAREN:
			case VAR:
				{
				setState(382);
				function();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			setState(386);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 285212654L) != 0)) {
				{
				setState(385);
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
		enterRule(_localctx, 44, RULE_expression);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(389); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(388);
				expression_atom();
				}
				}
				setState(391); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 12583022L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
		enterRule(_localctx, 46, RULE_expression_atom);
		try {
			setState(399);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case COLON:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(393);
				text();
				}
				break;
			case DOLLAR_LPAREN:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(394);
				function();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(395);
				match(LPAREN);
				setState(396);
				exprs_nested();
				setState(397);
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
		enterRule(_localctx, 48, RULE_expr_nested);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(402); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(401);
				expr_nested_atom();
				}
				}
				setState(404); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 12583278L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
		enterRule(_localctx, 50, RULE_expr_nested_atom);
		try {
			setState(412);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case COLON:
			case COMMA:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(406);
				text_nested();
				}
				break;
			case DOLLAR_LPAREN:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(407);
				function();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(408);
				match(LPAREN);
				setState(409);
				exprs_nested();
				setState(410);
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
		enterRule(_localctx, 52, RULE_expr_in_assign);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(415); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(414);
				expr_in_assign_atom();
				}
				}
				setState(417); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 16777198L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
		enterRule(_localctx, 54, RULE_expr_in_assign_atom);
		try {
			setState(421);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
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
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(419);
				text_in_assign();
				}
				break;
			case DOLLAR_LPAREN:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(420);
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
		enterRule(_localctx, 56, RULE_expr_in_recipe);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(424); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(423);
					expr_in_recipe_atom();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(426); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,37,_ctx);
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
		enterRule(_localctx, 58, RULE_expr_in_recipe_atom);
		try {
			setState(430);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
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
			case SLIT:
			case CHARS:
			case COMMENT:
				enterOuterAlt(_localctx, 1);
				{
				setState(428);
				text_in_recipe();
				}
				break;
			case DOLLAR_LPAREN:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(429);
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
		enterRule(_localctx, 60, RULE_function);
		try {
			setState(461);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,39,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(432);
				match(VAR);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(433);
				match(DOLLAR_LPAREN);
				setState(434);
				function_name();
				setState(435);
				match(RPAREN);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(437);
				match(DOLLAR_LPAREN);
				setState(438);
				function_name();
				setState(439);
				ws();
				setState(440);
				arguments();
				setState(441);
				match(RPAREN);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(443);
				match(DOLLAR_LPAREN);
				setState(444);
				function_name();
				setState(445);
				match(COMMA);
				setState(446);
				arguments();
				setState(447);
				match(RPAREN);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(449);
				match(DOLLAR_LPAREN);
				setState(450);
				function_name();
				setState(451);
				match(COLON);
				setState(452);
				expressions();
				setState(453);
				match(RPAREN);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(455);
				match(DOLLAR_LPAREN);
				setState(456);
				function_name();
				setState(457);
				match(ASSIGN_OP);
				setState(458);
				expressions();
				setState(459);
				match(RPAREN);
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
		enterRule(_localctx, 62, RULE_function_name);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(464); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(463);
				function_name_atom();
				}
				}
				setState(466); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 8388620L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
		enterRule(_localctx, 64, RULE_function_name_atom);
		try {
			setState(470);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(468);
				match(CHARS);
				}
				break;
			case DOLLAR_LPAREN:
			case VAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(469);
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
		enterRule(_localctx, 66, RULE_arguments);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(473);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 12583022L) != 0)) {
				{
				setState(472);
				argument();
				}
			}

			setState(481);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(475);
				match(COMMA);
				setState(477);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 12583022L) != 0)) {
					{
					setState(476);
					argument();
					}
				}

				}
				}
				setState(483);
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
		enterRule(_localctx, 68, RULE_argument);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(484);
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
		enterRule(_localctx, 70, RULE_rule);
		int _la;
		try {
			setState(510);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,50,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(486);
				targets();
				setState(488);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(487);
					ws();
					}
				}

				setState(490);
				colon();
				setState(492);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(491);
					ws();
					}
				}

				setState(494);
				prerequisites();
				setState(495);
				match(NL);
				setState(497);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,47,_ctx) ) {
				case 1:
					{
					setState(496);
					recipes();
					}
					break;
				}
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(499);
				targets();
				setState(501);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(500);
					ws();
					}
				}

				setState(503);
				colon();
				setState(505);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(504);
					ws();
					}
				}

				setState(507);
				assignment();
				setState(508);
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
		enterRule(_localctx, 72, RULE_target);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(512);
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
		enterRule(_localctx, 74, RULE_pattern);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(516); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				setState(516);
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
				case CHARS:
					{
					setState(514);
					identifier();
					}
					break;
				case DOLLAR_LPAREN:
				case VAR:
					{
					setState(515);
					function();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				setState(518); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & 12582860L) != 0) );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
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
		enterRule(_localctx, 76, RULE_prerequisites);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(521);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 12582860L) != 0)) {
				{
				setState(520);
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
		enterRule(_localctx, 78, RULE_targets);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(523);
			target();
			setState(529);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,54,_ctx);
			while ( _alt!=2 && _alt!= ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(524);
					ws();
					setState(525);
					target();
					}
					} 
				}
				setState(531);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,54,_ctx);
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
		enterRule(_localctx, 80, RULE_recipes);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(533); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(532);
					recipe();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(535); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,55,_ctx);
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
		public TerminalNode NL() { return getToken(cbuildParser.NL, 0); }
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
		enterRule(_localctx, 82, RULE_recipes_opt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(537);
			comment_opt();
			setState(539);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,56,_ctx) ) {
			case 1:
				{
				setState(538);
				recipes();
				}
				break;
			}
			setState(541);
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
	public static class RecipeContext extends ParserRuleContext {
		public TerminalNode LEADING_TAB() { return getToken(cbuildParser.LEADING_TAB, 0); }
		public Exprs_in_recipeContext exprs_in_recipe() {
			return getRuleContext(Exprs_in_recipeContext.class,0);
		}
		public WsContext ws() {
			return getRuleContext(WsContext.class,0);
		}
		public TerminalNode NL() { return getToken(cbuildParser.NL, 0); }
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
		enterRule(_localctx, 84, RULE_recipe);
		int _la;
		try {
			setState(550);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case LEADING_TAB:
				enterOuterAlt(_localctx, 1);
				{
				setState(543);
				match(LEADING_TAB);
				setState(545);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==WS || _la==TAB) {
					{
					setState(544);
					ws();
					}
				}

				setState(547);
				exprs_in_recipe();
				}
				break;
			case NL:
				enterOuterAlt(_localctx, 2);
				{
				setState(548);
				match(NL);
				setState(549);
				conditional_in_recipe();
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
		enterRule(_localctx, 86, RULE_specifiers);
		try {
			setState(564);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,59,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(552);
				match(OVERRIDE);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(553);
				match(EXPORT);
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(554);
				match(UNEXPORT);
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(555);
				match(OVERRIDE);
				setState(556);
				match(EXPORT);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(557);
				match(EXPORT);
				setState(558);
				match(OVERRIDE);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(559);
				match(UNDEFINE);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(560);
				match(OVERRIDE);
				setState(561);
				match(UNDEFINE);
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(562);
				match(UNDEFINE);
				setState(563);
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
		enterRule(_localctx, 88, RULE_identifier);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(567); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(566);
					identifier_atom();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(569); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,60,_ctx);
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
		enterRule(_localctx, 90, RULE_identifier_atom);
		try {
			setState(576);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(571);
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
				enterOuterAlt(_localctx, 2);
				{
				setState(572);
				keywords();
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 3);
				{
				setState(573);
				match(COMMA);
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 4);
				{
				setState(574);
				match(LPAREN);
				}
				break;
			case RPAREN:
				enterOuterAlt(_localctx, 5);
				{
				setState(575);
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
		public TerminalNode LEADING_TAB() { return getToken(cbuildParser.LEADING_TAB, 0); }
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
		enterRule(_localctx, 92, RULE_br);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(578);
			_la = _input.LA(1);
			if ( !(_la==NL || _la==LEADING_TAB) ) {
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
	public static class CharContext extends ParserRuleContext {
		public TerminalNode CHARS() { return getToken(cbuildParser.CHARS, 0); }
		public TerminalNode SLIT() { return getToken(cbuildParser.SLIT, 0); }
		public TerminalNode ASSIGN_OP() { return getToken(cbuildParser.ASSIGN_OP, 0); }
		public TerminalNode COLON() { return getToken(cbuildParser.COLON, 0); }
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
		enterRule(_localctx, 94, RULE_char);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(580);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 12582946L) != 0)) ) {
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
		enterRule(_localctx, 96, RULE_char_nested);
		try {
			setState(584);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case COLON:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(582);
				char_();
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 2);
				{
				setState(583);
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
		enterRule(_localctx, 98, RULE_char_in_assign);
		try {
			setState(590);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case COLON:
			case COMMA:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(586);
				char_nested();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 2);
				{
				setState(587);
				match(LPAREN);
				}
				break;
			case RPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(588);
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
				enterOuterAlt(_localctx, 4);
				{
				setState(589);
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
		enterRule(_localctx, 100, RULE_char_in_def);
		try {
			setState(609);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
			case COLON:
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(592);
				char_();
				}
				break;
			case LPAREN:
				enterOuterAlt(_localctx, 2);
				{
				setState(593);
				match(LPAREN);
				}
				break;
			case RPAREN:
				enterOuterAlt(_localctx, 3);
				{
				setState(594);
				match(RPAREN);
				}
				break;
			case COMMA:
				enterOuterAlt(_localctx, 4);
				{
				setState(595);
				match(COMMA);
				}
				break;
			case COMMENT:
				enterOuterAlt(_localctx, 5);
				{
				setState(596);
				match(COMMENT);
				}
				break;
			case INCLUDE:
				enterOuterAlt(_localctx, 6);
				{
				setState(597);
				match(INCLUDE);
				}
				break;
			case OVERRIDE:
				enterOuterAlt(_localctx, 7);
				{
				setState(598);
				match(OVERRIDE);
				}
				break;
			case EXPORT:
				enterOuterAlt(_localctx, 8);
				{
				setState(599);
				match(EXPORT);
				}
				break;
			case UNEXPORT:
				enterOuterAlt(_localctx, 9);
				{
				setState(600);
				match(UNEXPORT);
				}
				break;
			case IFDEF:
				enterOuterAlt(_localctx, 10);
				{
				setState(601);
				match(IFDEF);
				}
				break;
			case IFNDEF:
				enterOuterAlt(_localctx, 11);
				{
				setState(602);
				match(IFNDEF);
				}
				break;
			case IFEQ:
				enterOuterAlt(_localctx, 12);
				{
				setState(603);
				match(IFEQ);
				}
				break;
			case IFNEQ:
				enterOuterAlt(_localctx, 13);
				{
				setState(604);
				match(IFNEQ);
				}
				break;
			case ELSE:
				enterOuterAlt(_localctx, 14);
				{
				setState(605);
				match(ELSE);
				}
				break;
			case ENDIF:
				enterOuterAlt(_localctx, 15);
				{
				setState(606);
				match(ENDIF);
				}
				break;
			case DEFINE:
				enterOuterAlt(_localctx, 16);
				{
				setState(607);
				match(DEFINE);
				}
				break;
			case UNDEFINE:
				enterOuterAlt(_localctx, 17);
				{
				setState(608);
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
		enterRule(_localctx, 102, RULE_char_in_recipe);
		try {
			setState(613);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case ASSIGN_OP:
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
			case SLIT:
			case CHARS:
				enterOuterAlt(_localctx, 1);
				{
				setState(611);
				char_in_assign();
				}
				break;
			case COMMENT:
				enterOuterAlt(_localctx, 2);
				{
				setState(612);
				match(COMMENT);
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
		enterRule(_localctx, 104, RULE_text);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(616); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(615);
					char_();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(618); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,66,_ctx);
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
		enterRule(_localctx, 106, RULE_text_nested);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(621); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(620);
					char_nested();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(623); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,67,_ctx);
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
		enterRule(_localctx, 108, RULE_text_in_assign);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(626); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(625);
					char_in_assign();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(628); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,68,_ctx);
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
		enterRule(_localctx, 110, RULE_text_in_recipe);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(631); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(630);
					char_in_recipe();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(633); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,69,_ctx);
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
		enterRule(_localctx, 112, RULE_keywords);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(635);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 4193792L) != 0)) ) {
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
		enterRule(_localctx, 114, RULE_colon);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(637);
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
		enterRule(_localctx, 116, RULE_comment_opt);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(640);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,70,_ctx) ) {
			case 1:
				{
				setState(639);
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
		enterRule(_localctx, 118, RULE_ws);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(642);
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
		"\u0004\u0001\u001c\u0285\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001"+
		"\u0002\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004"+
		"\u0002\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007"+
		"\u0002\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b"+
		"\u0002\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007"+
		"\u000f\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002\u0012\u0007"+
		"\u0012\u0002\u0013\u0007\u0013\u0002\u0014\u0007\u0014\u0002\u0015\u0007"+
		"\u0015\u0002\u0016\u0007\u0016\u0002\u0017\u0007\u0017\u0002\u0018\u0007"+
		"\u0018\u0002\u0019\u0007\u0019\u0002\u001a\u0007\u001a\u0002\u001b\u0007"+
		"\u001b\u0002\u001c\u0007\u001c\u0002\u001d\u0007\u001d\u0002\u001e\u0007"+
		"\u001e\u0002\u001f\u0007\u001f\u0002 \u0007 \u0002!\u0007!\u0002\"\u0007"+
		"\"\u0002#\u0007#\u0002$\u0007$\u0002%\u0007%\u0002&\u0007&\u0002\'\u0007"+
		"\'\u0002(\u0007(\u0002)\u0007)\u0002*\u0007*\u0002+\u0007+\u0002,\u0007"+
		",\u0002-\u0007-\u0002.\u0007.\u0002/\u0007/\u00020\u00070\u00021\u0007"+
		"1\u00022\u00072\u00023\u00073\u00024\u00074\u00025\u00075\u00026\u0007"+
		"6\u00027\u00077\u00028\u00078\u00029\u00079\u0002:\u0007:\u0002;\u0007"+
		";\u0001\u0000\u0001\u0000\u0001\u0000\u0001\u0000\u0003\u0000}\b\u0000"+
		"\u0001\u0001\u0001\u0001\u0005\u0001\u0081\b\u0001\n\u0001\f\u0001\u0084"+
		"\t\u0001\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0003\u0002\u00b2\b\u0002\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0003\u0003\u00dc\b\u0003\u0001\u0004\u0001"+
		"\u0004\u0001\u0004\u0003\u0004\u00e1\b\u0004\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001"+
		"\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0001\u0005\u0003"+
		"\u0005\u00f1\b\u0005\u0001\u0006\u0003\u0006\u00f4\b\u0006\u0001\u0006"+
		"\u0001\u0006\u0001\u0006\u0003\u0006\u00f9\b\u0006\u0001\u0006\u0001\u0006"+
		"\u0001\u0006\u0001\u0006\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0003\u0007\u0107\b\u0007"+
		"\u0001\b\u0001\b\u0001\b\u0001\b\u0001\t\u0001\t\u0001\t\u0001\t\u0001"+
		"\t\u0001\t\u0003\t\u0113\b\t\u0003\t\u0115\b\t\u0001\n\u0001\n\u0003\n"+
		"\u0119\b\n\u0001\n\u0001\n\u0003\n\u011d\b\n\u0001\n\u0003\n\u0120\b\n"+
		"\u0001\n\u0001\n\u0001\n\u0001\n\u0003\n\u0126\b\n\u0001\n\u0001\n\u0003"+
		"\n\u012a\b\n\u0001\n\u0003\n\u012d\b\n\u0001\n\u0001\n\u0003\n\u0131\b"+
		"\n\u0001\u000b\u0001\u000b\u0001\u000b\u0001\f\u0001\f\u0001\r\u0001\r"+
		"\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e\u0001\u000e"+
		"\u0001\u000e\u0001\u000e\u0003\u000e\u0142\b\u000e\u0001\u000f\u0003\u000f"+
		"\u0145\b\u000f\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0005\u0010"+
		"\u014b\b\u0010\n\u0010\f\u0010\u014e\t\u0010\u0001\u0011\u0001\u0011\u0001"+
		"\u0011\u0001\u0011\u0005\u0011\u0154\b\u0011\n\u0011\f\u0011\u0157\t\u0011"+
		"\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0005\u0012\u015d\b\u0012"+
		"\n\u0012\f\u0012\u0160\t\u0012\u0001\u0013\u0001\u0013\u0001\u0013\u0001"+
		"\u0013\u0005\u0013\u0166\b\u0013\n\u0013\f\u0013\u0169\t\u0013\u0001\u0014"+
		"\u0001\u0014\u0003\u0014\u016d\b\u0014\u0001\u0014\u0001\u0014\u0001\u0014"+
		"\u0001\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0001\u0014\u0005\u0014"+
		"\u0177\b\u0014\n\u0014\f\u0014\u017a\t\u0014\u0003\u0014\u017c\b\u0014"+
		"\u0001\u0015\u0001\u0015\u0003\u0015\u0180\b\u0015\u0001\u0015\u0003\u0015"+
		"\u0183\b\u0015\u0001\u0016\u0004\u0016\u0186\b\u0016\u000b\u0016\f\u0016"+
		"\u0187\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001\u0017\u0001"+
		"\u0017\u0003\u0017\u0190\b\u0017\u0001\u0018\u0004\u0018\u0193\b\u0018"+
		"\u000b\u0018\f\u0018\u0194\u0001\u0019\u0001\u0019\u0001\u0019\u0001\u0019"+
		"\u0001\u0019\u0001\u0019\u0003\u0019\u019d\b\u0019\u0001\u001a\u0004\u001a"+
		"\u01a0\b\u001a\u000b\u001a\f\u001a\u01a1\u0001\u001b\u0001\u001b\u0003"+
		"\u001b\u01a6\b\u001b\u0001\u001c\u0004\u001c\u01a9\b\u001c\u000b\u001c"+
		"\f\u001c\u01aa\u0001\u001d\u0001\u001d\u0003\u001d\u01af\b\u001d\u0001"+
		"\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001"+
		"\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001"+
		"\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001"+
		"\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001"+
		"\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0001\u001e\u0003\u001e\u01ce"+
		"\b\u001e\u0001\u001f\u0004\u001f\u01d1\b\u001f\u000b\u001f\f\u001f\u01d2"+
		"\u0001 \u0001 \u0003 \u01d7\b \u0001!\u0003!\u01da\b!\u0001!\u0001!\u0003"+
		"!\u01de\b!\u0005!\u01e0\b!\n!\f!\u01e3\t!\u0001\"\u0001\"\u0001#\u0001"+
		"#\u0003#\u01e9\b#\u0001#\u0001#\u0003#\u01ed\b#\u0001#\u0001#\u0001#\u0003"+
		"#\u01f2\b#\u0001#\u0001#\u0003#\u01f6\b#\u0001#\u0001#\u0003#\u01fa\b"+
		"#\u0001#\u0001#\u0001#\u0003#\u01ff\b#\u0001$\u0001$\u0001%\u0001%\u0004"+
		"%\u0205\b%\u000b%\f%\u0206\u0001&\u0003&\u020a\b&\u0001\'\u0001\'\u0001"+
		"\'\u0001\'\u0005\'\u0210\b\'\n\'\f\'\u0213\t\'\u0001(\u0004(\u0216\b("+
		"\u000b(\f(\u0217\u0001)\u0001)\u0003)\u021c\b)\u0001)\u0001)\u0001*\u0001"+
		"*\u0003*\u0222\b*\u0001*\u0001*\u0001*\u0003*\u0227\b*\u0001+\u0001+\u0001"+
		"+\u0001+\u0001+\u0001+\u0001+\u0001+\u0001+\u0001+\u0001+\u0001+\u0003"+
		"+\u0235\b+\u0001,\u0004,\u0238\b,\u000b,\f,\u0239\u0001-\u0001-\u0001"+
		"-\u0001-\u0001-\u0003-\u0241\b-\u0001.\u0001.\u0001/\u0001/\u00010\u0001"+
		"0\u00030\u0249\b0\u00011\u00011\u00011\u00011\u00031\u024f\b1\u00012\u0001"+
		"2\u00012\u00012\u00012\u00012\u00012\u00012\u00012\u00012\u00012\u0001"+
		"2\u00012\u00012\u00012\u00012\u00012\u00032\u0262\b2\u00013\u00013\u0003"+
		"3\u0266\b3\u00014\u00044\u0269\b4\u000b4\f4\u026a\u00015\u00045\u026e"+
		"\b5\u000b5\f5\u026f\u00016\u00046\u0273\b6\u000b6\f6\u0274\u00017\u0004"+
		"7\u0278\b7\u000b7\f7\u0279\u00018\u00018\u00019\u00019\u0001:\u0003:\u0281"+
		"\b:\u0001;\u0001;\u0001;\u0000\u0000<\u0000\u0002\u0004\u0006\b\n\f\u000e"+
		"\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*,.02468:<>@BDF"+
		"HJLNPRTVXZ\\^`bdfhjlnprtv\u0000\u0007\u0001\u0000\r\u000e\u0001\u0000"+
		"\u000b\f\u0001\u0000\u0018\u0019\u0003\u0000\u0001\u0001\u0005\u0005\u0016"+
		"\u0017\u0001\u0000\t\u0015\u0001\u0000\u0004\u0005\u0001\u0000\u001a\u001b"+
		"\u02bf\u0000|\u0001\u0000\u0000\u0000\u0002\u0082\u0001\u0000\u0000\u0000"+
		"\u0004\u00b1\u0001\u0000\u0000\u0000\u0006\u00db\u0001\u0000\u0000\u0000"+
		"\b\u00dd\u0001\u0000\u0000\u0000\n\u00f0\u0001\u0000\u0000\u0000\f\u00f3"+
		"\u0001\u0000\u0000\u0000\u000e\u0106\u0001\u0000\u0000\u0000\u0010\u0108"+
		"\u0001\u0000\u0000\u0000\u0012\u0114\u0001\u0000\u0000\u0000\u0014\u0130"+
		"\u0001\u0000\u0000\u0000\u0016\u0132\u0001\u0000\u0000\u0000\u0018\u0135"+
		"\u0001\u0000\u0000\u0000\u001a\u0137\u0001\u0000\u0000\u0000\u001c\u0141"+
		"\u0001\u0000\u0000\u0000\u001e\u0144\u0001\u0000\u0000\u0000 \u0146\u0001"+
		"\u0000\u0000\u0000\"\u014f\u0001\u0000\u0000\u0000$\u0158\u0001\u0000"+
		"\u0000\u0000&\u0161\u0001\u0000\u0000\u0000(\u017b\u0001\u0000\u0000\u0000"+
		"*\u017f\u0001\u0000\u0000\u0000,\u0185\u0001\u0000\u0000\u0000.\u018f"+
		"\u0001\u0000\u0000\u00000\u0192\u0001\u0000\u0000\u00002\u019c\u0001\u0000"+
		"\u0000\u00004\u019f\u0001\u0000\u0000\u00006\u01a5\u0001\u0000\u0000\u0000"+
		"8\u01a8\u0001\u0000\u0000\u0000:\u01ae\u0001\u0000\u0000\u0000<\u01cd"+
		"\u0001\u0000\u0000\u0000>\u01d0\u0001\u0000\u0000\u0000@\u01d6\u0001\u0000"+
		"\u0000\u0000B\u01d9\u0001\u0000\u0000\u0000D\u01e4\u0001\u0000\u0000\u0000"+
		"F\u01fe\u0001\u0000\u0000\u0000H\u0200\u0001\u0000\u0000\u0000J\u0204"+
		"\u0001\u0000\u0000\u0000L\u0209\u0001\u0000\u0000\u0000N\u020b\u0001\u0000"+
		"\u0000\u0000P\u0215\u0001\u0000\u0000\u0000R\u0219\u0001\u0000\u0000\u0000"+
		"T\u0226\u0001\u0000\u0000\u0000V\u0234\u0001\u0000\u0000\u0000X\u0237"+
		"\u0001\u0000\u0000\u0000Z\u0240\u0001\u0000\u0000\u0000\\\u0242\u0001"+
		"\u0000\u0000\u0000^\u0244\u0001\u0000\u0000\u0000`\u0248\u0001\u0000\u0000"+
		"\u0000b\u024e\u0001\u0000\u0000\u0000d\u0261\u0001\u0000\u0000\u0000f"+
		"\u0265\u0001\u0000\u0000\u0000h\u0268\u0001\u0000\u0000\u0000j\u026d\u0001"+
		"\u0000\u0000\u0000l\u0272\u0001\u0000\u0000\u0000n\u0277\u0001\u0000\u0000"+
		"\u0000p\u027b\u0001\u0000\u0000\u0000r\u027d\u0001\u0000\u0000\u0000t"+
		"\u0280\u0001\u0000\u0000\u0000v\u0282\u0001\u0000\u0000\u0000xy\u0003"+
		"\u0002\u0001\u0000yz\u0005\u0000\u0000\u0001z}\u0001\u0000\u0000\u0000"+
		"{}\u0005\u0000\u0000\u0001|x\u0001\u0000\u0000\u0000|{\u0001\u0000\u0000"+
		"\u0000}\u0001\u0001\u0000\u0000\u0000~\u0081\u0003\n\u0005\u0000\u007f"+
		"\u0081\u0003\\.\u0000\u0080~\u0001\u0000\u0000\u0000\u0080\u007f\u0001"+
		"\u0000\u0000\u0000\u0081\u0084\u0001\u0000\u0000\u0000\u0082\u0080\u0001"+
		"\u0000\u0000\u0000\u0082\u0083\u0001\u0000\u0000\u0000\u0083\u0003\u0001"+
		"\u0000\u0000\u0000\u0084\u0082\u0001\u0000\u0000\u0000\u0085\u0086\u0003"+
		"\u0018\f\u0000\u0086\u0087\u0003\u001c\u000e\u0000\u0087\u0088\u0003\b"+
		"\u0004\u0000\u0088\u0089\u0005\u0010\u0000\u0000\u0089\u008a\u0003t:\u0000"+
		"\u008a\u008b\u0003\\.\u0000\u008b\u00b2\u0001\u0000\u0000\u0000\u008c"+
		"\u008d\u0003\u0018\f\u0000\u008d\u008e\u0003\u001c\u000e\u0000\u008e\u008f"+
		"\u0003\b\u0004\u0000\u008f\u0090\u0005\u000f\u0000\u0000\u0090\u0091\u0003"+
		"\b\u0004\u0000\u0091\u0092\u0005\u0010\u0000\u0000\u0092\u0093\u0003t"+
		":\u0000\u0093\u0094\u0003\\.\u0000\u0094\u00b2\u0001\u0000\u0000\u0000"+
		"\u0095\u0096\u0003\u0018\f\u0000\u0096\u0097\u0003\u001c\u000e\u0000\u0097"+
		"\u0098\u0003\b\u0004\u0000\u0098\u0099\u0005\u000f\u0000\u0000\u0099\u009a"+
		"\u0003\u0004\u0002\u0000\u009a\u00b2\u0001\u0000\u0000\u0000\u009b\u009c"+
		"\u0003\u001a\r\u0000\u009c\u009d\u0003X,\u0000\u009d\u009e\u0003\b\u0004"+
		"\u0000\u009e\u009f\u0005\u0010\u0000\u0000\u009f\u00a0\u0003t:\u0000\u00a0"+
		"\u00a1\u0003\\.\u0000\u00a1\u00b2\u0001\u0000\u0000\u0000\u00a2\u00a3"+
		"\u0003\u001a\r\u0000\u00a3\u00a4\u0003X,\u0000\u00a4\u00a5\u0003\b\u0004"+
		"\u0000\u00a5\u00a6\u0005\u000f\u0000\u0000\u00a6\u00a7\u0003\b\u0004\u0000"+
		"\u00a7\u00a8\u0005\u0010\u0000\u0000\u00a8\u00a9\u0003t:\u0000\u00a9\u00aa"+
		"\u0003\\.\u0000\u00aa\u00b2\u0001\u0000\u0000\u0000\u00ab\u00ac\u0003"+
		"\u001a\r\u0000\u00ac\u00ad\u0003X,\u0000\u00ad\u00ae\u0003\b\u0004\u0000"+
		"\u00ae\u00af\u0005\u000f\u0000\u0000\u00af\u00b0\u0003\u0004\u0002\u0000"+
		"\u00b0\u00b2\u0001\u0000\u0000\u0000\u00b1\u0085\u0001\u0000\u0000\u0000"+
		"\u00b1\u008c\u0001\u0000\u0000\u0000\u00b1\u0095\u0001\u0000\u0000\u0000"+
		"\u00b1\u009b\u0001\u0000\u0000\u0000\u00b1\u00a2\u0001\u0000\u0000\u0000"+
		"\u00b1\u00ab\u0001\u0000\u0000\u0000\u00b2\u0005\u0001\u0000\u0000\u0000"+
		"\u00b3\u00b4\u0003\u0018\f\u0000\u00b4\u00b5\u0003\u001c\u000e\u0000\u00b5"+
		"\u00b6\u0003R)\u0000\u00b6\u00b7\u0005\u0010\u0000\u0000\u00b7\u00b8\u0003"+
		"t:\u0000\u00b8\u00dc\u0001\u0000\u0000\u0000\u00b9\u00ba\u0003\u0018\f"+
		"\u0000\u00ba\u00bb\u0003\u001c\u000e\u0000\u00bb\u00bc\u0003R)\u0000\u00bc"+
		"\u00bd\u0005\u000f\u0000\u0000\u00bd\u00be\u0003R)\u0000\u00be\u00bf\u0005"+
		"\u0010\u0000\u0000\u00bf\u00c0\u0003t:\u0000\u00c0\u00dc\u0001\u0000\u0000"+
		"\u0000\u00c1\u00c2\u0003\u0018\f\u0000\u00c2\u00c3\u0003\u001c\u000e\u0000"+
		"\u00c3\u00c4\u0003R)\u0000\u00c4\u00c5\u0005\u000f\u0000\u0000\u00c5\u00c6"+
		"\u0003\u0006\u0003\u0000\u00c6\u00dc\u0001\u0000\u0000\u0000\u00c7\u00c8"+
		"\u0003\u001a\r\u0000\u00c8\u00c9\u0003X,\u0000\u00c9\u00ca\u0003R)\u0000"+
		"\u00ca\u00cb\u0005\u0010\u0000\u0000\u00cb\u00cc\u0003t:\u0000\u00cc\u00dc"+
		"\u0001\u0000\u0000\u0000\u00cd\u00ce\u0003\u001a\r\u0000\u00ce\u00cf\u0003"+
		"X,\u0000\u00cf\u00d0\u0003R)\u0000\u00d0\u00d1\u0005\u000f\u0000\u0000"+
		"\u00d1\u00d2\u0003R)\u0000\u00d2\u00d3\u0005\u0010\u0000\u0000\u00d3\u00d4"+
		"\u0003t:\u0000\u00d4\u00dc\u0001\u0000\u0000\u0000\u00d5\u00d6\u0003\u001a"+
		"\r\u0000\u00d6\u00d7\u0003X,\u0000\u00d7\u00d8\u0003R)\u0000\u00d8\u00d9"+
		"\u0005\u000f\u0000\u0000\u00d9\u00da\u0003\u0006\u0003\u0000\u00da\u00dc"+
		"\u0001\u0000\u0000\u0000\u00db\u00b3\u0001\u0000\u0000\u0000\u00db\u00b9"+
		"\u0001\u0000\u0000\u0000\u00db\u00c1\u0001\u0000\u0000\u0000\u00db\u00c7"+
		"\u0001\u0000\u0000\u0000\u00db\u00cd\u0001\u0000\u0000\u0000\u00db\u00d5"+
		"\u0001\u0000\u0000\u0000\u00dc\u0007\u0001\u0000\u0000\u0000\u00dd\u00de"+
		"\u0003t:\u0000\u00de\u00e0\u0003\\.\u0000\u00df\u00e1\u0003\u0002\u0001"+
		"\u0000\u00e0\u00df\u0001\u0000\u0000\u0000\u00e0\u00e1\u0001\u0000\u0000"+
		"\u0000\u00e1\t\u0001\u0000\u0000\u0000\u00e2\u00f1\u0005\u001c\u0000\u0000"+
		"\u00e3\u00e4\u0003\u0014\n\u0000\u00e4\u00e5\u0003\\.\u0000\u00e5\u00f1"+
		"\u0001\u0000\u0000\u0000\u00e6\u00e7\u0003<\u001e\u0000\u00e7\u00e8\u0003"+
		"\\.\u0000\u00e8\u00f1\u0001\u0000\u0000\u0000\u00e9\u00f1\u0003F#\u0000"+
		"\u00ea\u00f1\u0003\u0004\u0002\u0000\u00eb\u00f1\u0003\f\u0006\u0000\u00ec"+
		"\u00f1\u0003\u0010\b\u0000\u00ed\u00ee\u0003\u0012\t\u0000\u00ee\u00ef"+
		"\u0003\\.\u0000\u00ef\u00f1\u0001\u0000\u0000\u0000\u00f0\u00e2\u0001"+
		"\u0000\u0000\u0000\u00f0\u00e3\u0001\u0000\u0000\u0000\u00f0\u00e6\u0001"+
		"\u0000\u0000\u0000\u00f0\u00e9\u0001\u0000\u0000\u0000\u00f0\u00ea\u0001"+
		"\u0000\u0000\u0000\u00f0\u00eb\u0001\u0000\u0000\u0000\u00f0\u00ec\u0001"+
		"\u0000\u0000\u0000\u00f0\u00ed\u0001\u0000\u0000\u0000\u00f1\u000b\u0001"+
		"\u0000\u0000\u0000\u00f2\u00f4\u0003V+\u0000\u00f3\u00f2\u0001\u0000\u0000"+
		"\u0000\u00f3\u00f4\u0001\u0000\u0000\u0000\u00f4\u00f5\u0001\u0000\u0000"+
		"\u0000\u00f5\u00f6\u0005\u0015\u0000\u0000\u00f6\u00f8\u0003J%\u0000\u00f7"+
		"\u00f9\u0005\u0001\u0000\u0000\u00f8\u00f7\u0001\u0000\u0000\u0000\u00f8"+
		"\u00f9\u0001\u0000\u0000\u0000\u00f9\u00fa\u0001\u0000\u0000\u0000\u00fa"+
		"\u00fb\u0003\u000e\u0007\u0000\u00fb\u00fc\u0005\n\u0000\u0000\u00fc\u00fd"+
		"\u0003\\.\u0000\u00fd\r\u0001\u0000\u0000\u0000\u00fe\u00ff\u0003t:\u0000"+
		"\u00ff\u0100\u0003\\.\u0000\u0100\u0107\u0001\u0000\u0000\u0000\u0101"+
		"\u0102\u0003t:\u0000\u0102\u0103\u0003\\.\u0000\u0103\u0104\u0003(\u0014"+
		"\u0000\u0104\u0105\u0003\\.\u0000\u0105\u0107\u0001\u0000\u0000\u0000"+
		"\u0106\u00fe\u0001\u0000\u0000\u0000\u0106\u0101\u0001\u0000\u0000\u0000"+
		"\u0107\u000f\u0001\u0000\u0000\u0000\u0108\u0109\u0005\t\u0000\u0000\u0109"+
		"\u010a\u0003 \u0010\u0000\u010a\u010b\u0003\\.\u0000\u010b\u0011\u0001"+
		"\u0000\u0000\u0000\u010c\u0115\u0005\u0012\u0000\u0000\u010d\u0115\u0005"+
		"\u0013\u0000\u0000\u010e\u0112\u0003\u0016\u000b\u0000\u010f\u0110\u0003"+
		"v;\u0000\u0110\u0111\u0003N\'\u0000\u0111\u0113\u0001\u0000\u0000\u0000"+
		"\u0112\u010f\u0001\u0000\u0000\u0000\u0112\u0113\u0001\u0000\u0000\u0000"+
		"\u0113\u0115\u0001\u0000\u0000\u0000\u0114\u010c\u0001\u0000\u0000\u0000"+
		"\u0114\u010d\u0001\u0000\u0000\u0000\u0114\u010e\u0001\u0000\u0000\u0000"+
		"\u0115\u0013\u0001\u0000\u0000\u0000\u0116\u0118\u0003J%\u0000\u0117\u0119"+
		"\u0003v;\u0000\u0118\u0117\u0001\u0000\u0000\u0000\u0118\u0119\u0001\u0000"+
		"\u0000\u0000\u0119\u011a\u0001\u0000\u0000\u0000\u011a\u011c\u0005\u0001"+
		"\u0000\u0000\u011b\u011d\u0003v;\u0000\u011c\u011b\u0001\u0000\u0000\u0000"+
		"\u011c\u011d\u0001\u0000\u0000\u0000\u011d\u011f\u0001\u0000\u0000\u0000"+
		"\u011e\u0120\u0003$\u0012\u0000\u011f\u011e\u0001\u0000\u0000\u0000\u011f"+
		"\u0120\u0001\u0000\u0000\u0000\u0120\u0121\u0001\u0000\u0000\u0000\u0121"+
		"\u0122\u0003t:\u0000\u0122\u0131\u0001\u0000\u0000\u0000\u0123\u0125\u0003"+
		"\u0016\u000b\u0000\u0124\u0126\u0003v;\u0000\u0125\u0124\u0001\u0000\u0000"+
		"\u0000\u0125\u0126\u0001\u0000\u0000\u0000\u0126\u0127\u0001\u0000\u0000"+
		"\u0000\u0127\u0129\u0005\u0001\u0000\u0000\u0128\u012a\u0003v;\u0000\u0129"+
		"\u0128\u0001\u0000\u0000\u0000\u0129\u012a\u0001\u0000\u0000\u0000\u012a"+
		"\u012c\u0001\u0000\u0000\u0000\u012b\u012d\u0003$\u0012\u0000\u012c\u012b"+
		"\u0001\u0000\u0000\u0000\u012c\u012d\u0001\u0000\u0000\u0000\u012d\u012e"+
		"\u0001\u0000\u0000\u0000\u012e\u012f\u0003t:\u0000\u012f\u0131\u0001\u0000"+
		"\u0000\u0000\u0130\u0116\u0001\u0000\u0000\u0000\u0130\u0123\u0001\u0000"+
		"\u0000\u0000\u0131\u0015\u0001\u0000\u0000\u0000\u0132\u0133\u0003V+\u0000"+
		"\u0133\u0134\u0003J%\u0000\u0134\u0017\u0001\u0000\u0000\u0000\u0135\u0136"+
		"\u0007\u0000\u0000\u0000\u0136\u0019\u0001\u0000\u0000\u0000\u0137\u0138"+
		"\u0007\u0001\u0000\u0000\u0138\u001b\u0001\u0000\u0000\u0000\u0139\u013a"+
		"\u0005\u0006\u0000\u0000\u013a\u013b\u0003\u001e\u000f\u0000\u013b\u013c"+
		"\u0005\b\u0000\u0000\u013c\u013d\u0003\u001e\u000f\u0000\u013d\u013e\u0005"+
		"\u0007\u0000\u0000\u013e\u0142\u0001\u0000\u0000\u0000\u013f\u0140\u0005"+
		"\u0016\u0000\u0000\u0140\u0142\u0005\u0016\u0000\u0000\u0141\u0139\u0001"+
		"\u0000\u0000\u0000\u0141\u013f\u0001\u0000\u0000\u0000\u0142\u001d\u0001"+
		"\u0000\u0000\u0000\u0143\u0145\u0003 \u0010\u0000\u0144\u0143\u0001\u0000"+
		"\u0000\u0000\u0144\u0145\u0001\u0000\u0000\u0000\u0145\u001f\u0001\u0000"+
		"\u0000\u0000\u0146\u014c\u0003,\u0016\u0000\u0147\u0148\u0003v;\u0000"+
		"\u0148\u0149\u0003,\u0016\u0000\u0149\u014b\u0001\u0000\u0000\u0000\u014a"+
		"\u0147\u0001\u0000\u0000\u0000\u014b\u014e\u0001\u0000\u0000\u0000\u014c"+
		"\u014a\u0001\u0000\u0000\u0000\u014c\u014d\u0001\u0000\u0000\u0000\u014d"+
		"!\u0001\u0000\u0000\u0000\u014e\u014c\u0001\u0000\u0000\u0000\u014f\u0155"+
		"\u00030\u0018\u0000\u0150\u0151\u0003v;\u0000\u0151\u0152\u00030\u0018"+
		"\u0000\u0152\u0154\u0001\u0000\u0000\u0000\u0153\u0150\u0001\u0000\u0000"+
		"\u0000\u0154\u0157\u0001\u0000\u0000\u0000\u0155\u0153\u0001\u0000\u0000"+
		"\u0000\u0155\u0156\u0001\u0000\u0000\u0000\u0156#\u0001\u0000\u0000\u0000"+
		"\u0157\u0155\u0001\u0000\u0000\u0000\u0158\u015e\u00034\u001a\u0000\u0159"+
		"\u015a\u0003v;\u0000\u015a\u015b\u00034\u001a\u0000\u015b\u015d\u0001"+
		"\u0000\u0000\u0000\u015c\u0159\u0001\u0000\u0000\u0000\u015d\u0160\u0001"+
		"\u0000\u0000\u0000\u015e\u015c\u0001\u0000\u0000\u0000\u015e\u015f\u0001"+
		"\u0000\u0000\u0000\u015f%\u0001\u0000\u0000\u0000\u0160\u015e\u0001\u0000"+
		"\u0000\u0000\u0161\u0167\u00038\u001c\u0000\u0162\u0163\u0003v;\u0000"+
		"\u0163\u0164\u00038\u001c\u0000\u0164\u0166\u0001\u0000\u0000\u0000\u0165"+
		"\u0162\u0001\u0000\u0000\u0000\u0166\u0169\u0001\u0000\u0000\u0000\u0167"+
		"\u0165\u0001\u0000\u0000\u0000\u0167\u0168\u0001\u0000\u0000\u0000\u0168"+
		"\'\u0001\u0000\u0000\u0000\u0169\u0167\u0001\u0000\u0000\u0000\u016a\u017c"+
		"\u0003\\.\u0000\u016b\u016d\u0003\\.\u0000\u016c\u016b\u0001\u0000\u0000"+
		"\u0000\u016c\u016d\u0001\u0000\u0000\u0000\u016d\u016e\u0001\u0000\u0000"+
		"\u0000\u016e\u0178\u0003*\u0015\u0000\u016f\u0170\u0003\\.\u0000\u0170"+
		"\u0171\u0003*\u0015\u0000\u0171\u0177\u0001\u0000\u0000\u0000\u0172\u0177"+
		"\u0003\\.\u0000\u0173\u0174\u0003v;\u0000\u0174\u0175\u00038\u001c\u0000"+
		"\u0175\u0177\u0001\u0000\u0000\u0000\u0176\u016f\u0001\u0000\u0000\u0000"+
		"\u0176\u0172\u0001\u0000\u0000\u0000\u0176\u0173\u0001\u0000\u0000\u0000"+
		"\u0177\u017a\u0001\u0000\u0000\u0000\u0178\u0176\u0001\u0000\u0000\u0000"+
		"\u0178\u0179\u0001\u0000\u0000\u0000\u0179\u017c\u0001\u0000\u0000\u0000"+
		"\u017a\u0178\u0001\u0000\u0000\u0000\u017b\u016a\u0001\u0000\u0000\u0000"+
		"\u017b\u016c\u0001\u0000\u0000\u0000\u017c)\u0001\u0000\u0000\u0000\u017d"+
		"\u0180\u0003d2\u0000\u017e\u0180\u0003<\u001e\u0000\u017f\u017d\u0001"+
		"\u0000\u0000\u0000\u017f\u017e\u0001\u0000\u0000\u0000\u0180\u0182\u0001"+
		"\u0000\u0000\u0000\u0181\u0183\u00038\u001c\u0000\u0182\u0181\u0001\u0000"+
		"\u0000\u0000\u0182\u0183\u0001\u0000\u0000\u0000\u0183+\u0001\u0000\u0000"+
		"\u0000\u0184\u0186\u0003.\u0017\u0000\u0185\u0184\u0001\u0000\u0000\u0000"+
		"\u0186\u0187\u0001\u0000\u0000\u0000\u0187\u0185\u0001\u0000\u0000\u0000"+
		"\u0187\u0188\u0001\u0000\u0000\u0000\u0188-\u0001\u0000\u0000\u0000\u0189"+
		"\u0190\u0003h4\u0000\u018a\u0190\u0003<\u001e\u0000\u018b\u018c\u0005"+
		"\u0006\u0000\u0000\u018c\u018d\u0003\"\u0011\u0000\u018d\u018e\u0005\u0007"+
		"\u0000\u0000\u018e\u0190\u0001\u0000\u0000\u0000\u018f\u0189\u0001\u0000"+
		"\u0000\u0000\u018f\u018a\u0001\u0000\u0000\u0000\u018f\u018b\u0001\u0000"+
		"\u0000\u0000\u0190/\u0001\u0000\u0000\u0000\u0191\u0193\u00032\u0019\u0000"+
		"\u0192\u0191\u0001\u0000\u0000\u0000\u0193\u0194\u0001\u0000\u0000\u0000"+
		"\u0194\u0192\u0001\u0000\u0000\u0000\u0194\u0195\u0001\u0000\u0000\u0000"+
		"\u01951\u0001\u0000\u0000\u0000\u0196\u019d\u0003j5\u0000\u0197\u019d"+
		"\u0003<\u001e\u0000\u0198\u0199\u0005\u0006\u0000\u0000\u0199\u019a\u0003"+
		"\"\u0011\u0000\u019a\u019b\u0005\u0007\u0000\u0000\u019b\u019d\u0001\u0000"+
		"\u0000\u0000\u019c\u0196\u0001\u0000\u0000\u0000\u019c\u0197\u0001\u0000"+
		"\u0000\u0000\u019c\u0198\u0001\u0000\u0000\u0000\u019d3\u0001\u0000\u0000"+
		"\u0000\u019e\u01a0\u00036\u001b\u0000\u019f\u019e\u0001\u0000\u0000\u0000"+
		"\u01a0\u01a1\u0001\u0000\u0000\u0000\u01a1\u019f\u0001\u0000\u0000\u0000"+
		"\u01a1\u01a2\u0001\u0000\u0000\u0000\u01a25\u0001\u0000\u0000\u0000\u01a3"+
		"\u01a6\u0003l6\u0000\u01a4\u01a6\u0003<\u001e\u0000\u01a5\u01a3\u0001"+
		"\u0000\u0000\u0000\u01a5\u01a4\u0001\u0000\u0000\u0000\u01a67\u0001\u0000"+
		"\u0000\u0000\u01a7\u01a9\u0003:\u001d\u0000\u01a8\u01a7\u0001\u0000\u0000"+
		"\u0000\u01a9\u01aa\u0001\u0000\u0000\u0000\u01aa\u01a8\u0001\u0000\u0000"+
		"\u0000\u01aa\u01ab\u0001\u0000\u0000\u0000\u01ab9\u0001\u0000\u0000\u0000"+
		"\u01ac\u01af\u0003n7\u0000\u01ad\u01af\u0003<\u001e\u0000\u01ae\u01ac"+
		"\u0001\u0000\u0000\u0000\u01ae\u01ad\u0001\u0000\u0000\u0000\u01af;\u0001"+
		"\u0000\u0000\u0000\u01b0\u01ce\u0005\u0003\u0000\u0000\u01b1\u01b2\u0005"+
		"\u0002\u0000\u0000\u01b2\u01b3\u0003>\u001f\u0000\u01b3\u01b4\u0005\u0007"+
		"\u0000\u0000\u01b4\u01ce\u0001\u0000\u0000\u0000\u01b5\u01b6\u0005\u0002"+
		"\u0000\u0000\u01b6\u01b7\u0003>\u001f\u0000\u01b7\u01b8\u0003v;\u0000"+
		"\u01b8\u01b9\u0003B!\u0000\u01b9\u01ba\u0005\u0007\u0000\u0000\u01ba\u01ce"+
		"\u0001\u0000\u0000\u0000\u01bb\u01bc\u0005\u0002\u0000\u0000\u01bc\u01bd"+
		"\u0003>\u001f\u0000\u01bd\u01be\u0005\b\u0000\u0000\u01be\u01bf\u0003"+
		"B!\u0000\u01bf\u01c0\u0005\u0007\u0000\u0000\u01c0\u01ce\u0001\u0000\u0000"+
		"\u0000\u01c1\u01c2\u0005\u0002\u0000\u0000\u01c2\u01c3\u0003>\u001f\u0000"+
		"\u01c3\u01c4\u0005\u0005\u0000\u0000\u01c4\u01c5\u0003 \u0010\u0000\u01c5"+
		"\u01c6\u0005\u0007\u0000\u0000\u01c6\u01ce\u0001\u0000\u0000\u0000\u01c7"+
		"\u01c8\u0005\u0002\u0000\u0000\u01c8\u01c9\u0003>\u001f\u0000\u01c9\u01ca"+
		"\u0005\u0001\u0000\u0000\u01ca\u01cb\u0003 \u0010\u0000\u01cb\u01cc\u0005"+
		"\u0007\u0000\u0000\u01cc\u01ce\u0001\u0000\u0000\u0000\u01cd\u01b0\u0001"+
		"\u0000\u0000\u0000\u01cd\u01b1\u0001\u0000\u0000\u0000\u01cd\u01b5\u0001"+
		"\u0000\u0000\u0000\u01cd\u01bb\u0001\u0000\u0000\u0000\u01cd\u01c1\u0001"+
		"\u0000\u0000\u0000\u01cd\u01c7\u0001\u0000\u0000\u0000\u01ce=\u0001\u0000"+
		"\u0000\u0000\u01cf\u01d1\u0003@ \u0000\u01d0\u01cf\u0001\u0000\u0000\u0000"+
		"\u01d1\u01d2\u0001\u0000\u0000\u0000\u01d2\u01d0\u0001\u0000\u0000\u0000"+
		"\u01d2\u01d3\u0001\u0000\u0000\u0000\u01d3?\u0001\u0000\u0000\u0000\u01d4"+
		"\u01d7\u0005\u0017\u0000\u0000\u01d5\u01d7\u0003<\u001e\u0000\u01d6\u01d4"+
		"\u0001\u0000\u0000\u0000\u01d6\u01d5\u0001\u0000\u0000\u0000\u01d7A\u0001"+
		"\u0000\u0000\u0000\u01d8\u01da\u0003D\"\u0000\u01d9\u01d8\u0001\u0000"+
		"\u0000\u0000\u01d9\u01da\u0001\u0000\u0000\u0000\u01da\u01e1\u0001\u0000"+
		"\u0000\u0000\u01db\u01dd\u0005\b\u0000\u0000\u01dc\u01de\u0003D\"\u0000"+
		"\u01dd\u01dc\u0001\u0000\u0000\u0000\u01dd\u01de\u0001\u0000\u0000\u0000"+
		"\u01de\u01e0\u0001\u0000\u0000\u0000\u01df\u01db\u0001\u0000\u0000\u0000"+
		"\u01e0\u01e3\u0001\u0000\u0000\u0000\u01e1\u01df\u0001\u0000\u0000\u0000"+
		"\u01e1\u01e2\u0001\u0000\u0000\u0000\u01e2C\u0001\u0000\u0000\u0000\u01e3"+
		"\u01e1\u0001\u0000\u0000\u0000\u01e4\u01e5\u0003 \u0010\u0000\u01e5E\u0001"+
		"\u0000\u0000\u0000\u01e6\u01e8\u0003N\'\u0000\u01e7\u01e9\u0003v;\u0000"+
		"\u01e8\u01e7\u0001\u0000\u0000\u0000\u01e8\u01e9\u0001\u0000\u0000\u0000"+
		"\u01e9\u01ea\u0001\u0000\u0000\u0000\u01ea\u01ec\u0003r9\u0000\u01eb\u01ed"+
		"\u0003v;\u0000\u01ec\u01eb\u0001\u0000\u0000\u0000\u01ec\u01ed\u0001\u0000"+
		"\u0000\u0000\u01ed\u01ee\u0001\u0000\u0000\u0000\u01ee\u01ef\u0003L&\u0000"+
		"\u01ef\u01f1\u0005\u0018\u0000\u0000\u01f0\u01f2\u0003P(\u0000\u01f1\u01f0"+
		"\u0001\u0000\u0000\u0000\u01f1\u01f2\u0001\u0000\u0000\u0000\u01f2\u01ff"+
		"\u0001\u0000\u0000\u0000\u01f3\u01f5\u0003N\'\u0000\u01f4\u01f6\u0003"+
		"v;\u0000\u01f5\u01f4\u0001\u0000\u0000\u0000\u01f5\u01f6\u0001\u0000\u0000"+
		"\u0000\u01f6\u01f7\u0001\u0000\u0000\u0000\u01f7\u01f9\u0003r9\u0000\u01f8"+
		"\u01fa\u0003v;\u0000\u01f9\u01f8\u0001\u0000\u0000\u0000\u01f9\u01fa\u0001"+
		"\u0000\u0000\u0000\u01fa\u01fb\u0001\u0000\u0000\u0000\u01fb\u01fc\u0003"+
		"\u0014\n\u0000\u01fc\u01fd\u0005\u0018\u0000\u0000\u01fd\u01ff\u0001\u0000"+
		"\u0000\u0000\u01fe\u01e6\u0001\u0000\u0000\u0000\u01fe\u01f3\u0001\u0000"+
		"\u0000\u0000\u01ffG\u0001\u0000\u0000\u0000\u0200\u0201\u0003J%\u0000"+
		"\u0201I\u0001\u0000\u0000\u0000\u0202\u0205\u0003X,\u0000\u0203\u0205"+
		"\u0003<\u001e\u0000\u0204\u0202\u0001\u0000\u0000\u0000\u0204\u0203\u0001"+
		"\u0000\u0000\u0000\u0205\u0206\u0001\u0000\u0000\u0000\u0206\u0204\u0001"+
		"\u0000\u0000\u0000\u0206\u0207\u0001\u0000\u0000\u0000\u0207K\u0001\u0000"+
		"\u0000\u0000\u0208\u020a\u0003N\'\u0000\u0209\u0208\u0001\u0000\u0000"+
		"\u0000\u0209\u020a\u0001\u0000\u0000\u0000\u020aM\u0001\u0000\u0000\u0000"+
		"\u020b\u0211\u0003H$\u0000\u020c\u020d\u0003v;\u0000\u020d\u020e\u0003"+
		"H$\u0000\u020e\u0210\u0001\u0000\u0000\u0000\u020f\u020c\u0001\u0000\u0000"+
		"\u0000\u0210\u0213\u0001\u0000\u0000\u0000\u0211\u020f\u0001\u0000\u0000"+
		"\u0000\u0211\u0212\u0001\u0000\u0000\u0000\u0212O\u0001\u0000\u0000\u0000"+
		"\u0213\u0211\u0001\u0000\u0000\u0000\u0214\u0216\u0003T*\u0000\u0215\u0214"+
		"\u0001\u0000\u0000\u0000\u0216\u0217\u0001\u0000\u0000\u0000\u0217\u0215"+
		"\u0001\u0000\u0000\u0000\u0217\u0218\u0001\u0000\u0000\u0000\u0218Q\u0001"+
		"\u0000\u0000\u0000\u0219\u021b\u0003t:\u0000\u021a\u021c\u0003P(\u0000"+
		"\u021b\u021a\u0001\u0000\u0000\u0000\u021b\u021c\u0001\u0000\u0000\u0000"+
		"\u021c\u021d\u0001\u0000\u0000\u0000\u021d\u021e\u0005\u0018\u0000\u0000"+
		"\u021eS\u0001\u0000\u0000\u0000\u021f\u0221\u0005\u0019\u0000\u0000\u0220"+
		"\u0222\u0003v;\u0000\u0221\u0220\u0001\u0000\u0000\u0000\u0221\u0222\u0001"+
		"\u0000\u0000\u0000\u0222\u0223\u0001\u0000\u0000\u0000\u0223\u0227\u0003"+
		"&\u0013\u0000\u0224\u0225\u0005\u0018\u0000\u0000\u0225\u0227\u0003\u0006"+
		"\u0003\u0000\u0226\u021f\u0001\u0000\u0000\u0000\u0226\u0224\u0001\u0000"+
		"\u0000\u0000\u0227U\u0001\u0000\u0000\u0000\u0228\u0235\u0005\u0011\u0000"+
		"\u0000\u0229\u0235\u0005\u0012\u0000\u0000\u022a\u0235\u0005\u0013\u0000"+
		"\u0000\u022b\u022c\u0005\u0011\u0000\u0000\u022c\u0235\u0005\u0012\u0000"+
		"\u0000\u022d\u022e\u0005\u0012\u0000\u0000\u022e\u0235\u0005\u0011\u0000"+
		"\u0000\u022f\u0235\u0005\u0014\u0000\u0000\u0230\u0231\u0005\u0011\u0000"+
		"\u0000\u0231\u0235\u0005\u0014\u0000\u0000\u0232\u0233\u0005\u0014\u0000"+
		"\u0000\u0233\u0235\u0005\u0011\u0000\u0000\u0234\u0228\u0001\u0000\u0000"+
		"\u0000\u0234\u0229\u0001\u0000\u0000\u0000\u0234\u022a\u0001\u0000\u0000"+
		"\u0000\u0234\u022b\u0001\u0000\u0000\u0000\u0234\u022d\u0001\u0000\u0000"+
		"\u0000\u0234\u022f\u0001\u0000\u0000\u0000\u0234\u0230\u0001\u0000\u0000"+
		"\u0000\u0234\u0232\u0001\u0000\u0000\u0000\u0235W\u0001\u0000\u0000\u0000"+
		"\u0236\u0238\u0003Z-\u0000\u0237\u0236\u0001\u0000\u0000\u0000\u0238\u0239"+
		"\u0001\u0000\u0000\u0000\u0239\u0237\u0001\u0000\u0000\u0000\u0239\u023a"+
		"\u0001\u0000\u0000\u0000\u023aY\u0001\u0000\u0000\u0000\u023b\u0241\u0005"+
		"\u0017\u0000\u0000\u023c\u0241\u0003p8\u0000\u023d\u0241\u0005\b\u0000"+
		"\u0000\u023e\u0241\u0005\u0006\u0000\u0000\u023f\u0241\u0005\u0007\u0000"+
		"\u0000\u0240\u023b\u0001\u0000\u0000\u0000\u0240\u023c\u0001\u0000\u0000"+
		"\u0000\u0240\u023d\u0001\u0000\u0000\u0000\u0240\u023e\u0001\u0000\u0000"+
		"\u0000\u0240\u023f\u0001\u0000\u0000\u0000\u0241[\u0001\u0000\u0000\u0000"+
		"\u0242\u0243\u0007\u0002\u0000\u0000\u0243]\u0001\u0000\u0000\u0000\u0244"+
		"\u0245\u0007\u0003\u0000\u0000\u0245_\u0001\u0000\u0000\u0000\u0246\u0249"+
		"\u0003^/\u0000\u0247\u0249\u0005\b\u0000\u0000\u0248\u0246\u0001\u0000"+
		"\u0000\u0000\u0248\u0247\u0001\u0000\u0000\u0000\u0249a\u0001\u0000\u0000"+
		"\u0000\u024a\u024f\u0003`0\u0000\u024b\u024f\u0005\u0006\u0000\u0000\u024c"+
		"\u024f\u0005\u0007\u0000\u0000\u024d\u024f\u0003p8\u0000\u024e\u024a\u0001"+
		"\u0000\u0000\u0000\u024e\u024b\u0001\u0000\u0000\u0000\u024e\u024c\u0001"+
		"\u0000\u0000\u0000\u024e\u024d\u0001\u0000\u0000\u0000\u024fc\u0001\u0000"+
		"\u0000\u0000\u0250\u0262\u0003^/\u0000\u0251\u0262\u0005\u0006\u0000\u0000"+
		"\u0252\u0262\u0005\u0007\u0000\u0000\u0253\u0262\u0005\b\u0000\u0000\u0254"+
		"\u0262\u0005\u001c\u0000\u0000\u0255\u0262\u0005\t\u0000\u0000\u0256\u0262"+
		"\u0005\u0011\u0000\u0000\u0257\u0262\u0005\u0012\u0000\u0000\u0258\u0262"+
		"\u0005\u0013\u0000\u0000\u0259\u0262\u0005\u000b\u0000\u0000\u025a\u0262"+
		"\u0005\f\u0000\u0000\u025b\u0262\u0005\r\u0000\u0000\u025c\u0262\u0005"+
		"\u000e\u0000\u0000\u025d\u0262\u0005\u000f\u0000\u0000\u025e\u0262\u0005"+
		"\u0010\u0000\u0000\u025f\u0262\u0005\u0015\u0000\u0000\u0260\u0262\u0005"+
		"\u0014\u0000\u0000\u0261\u0250\u0001\u0000\u0000\u0000\u0261\u0251\u0001"+
		"\u0000\u0000\u0000\u0261\u0252\u0001\u0000\u0000\u0000\u0261\u0253\u0001"+
		"\u0000\u0000\u0000\u0261\u0254\u0001\u0000\u0000\u0000\u0261\u0255\u0001"+
		"\u0000\u0000\u0000\u0261\u0256\u0001\u0000\u0000\u0000\u0261\u0257\u0001"+
		"\u0000\u0000\u0000\u0261\u0258\u0001\u0000\u0000\u0000\u0261\u0259\u0001"+
		"\u0000\u0000\u0000\u0261\u025a\u0001\u0000\u0000\u0000\u0261\u025b\u0001"+
		"\u0000\u0000\u0000\u0261\u025c\u0001\u0000\u0000\u0000\u0261\u025d\u0001"+
		"\u0000\u0000\u0000\u0261\u025e\u0001\u0000\u0000\u0000\u0261\u025f\u0001"+
		"\u0000\u0000\u0000\u0261\u0260\u0001\u0000\u0000\u0000\u0262e\u0001\u0000"+
		"\u0000\u0000\u0263\u0266\u0003b1\u0000\u0264\u0266\u0005\u001c\u0000\u0000"+
		"\u0265\u0263\u0001\u0000\u0000\u0000\u0265\u0264\u0001\u0000\u0000\u0000"+
		"\u0266g\u0001\u0000\u0000\u0000\u0267\u0269\u0003^/\u0000\u0268\u0267"+
		"\u0001\u0000\u0000\u0000\u0269\u026a\u0001\u0000\u0000\u0000\u026a\u0268"+
		"\u0001\u0000\u0000\u0000\u026a\u026b\u0001\u0000\u0000\u0000\u026bi\u0001"+
		"\u0000\u0000\u0000\u026c\u026e\u0003`0\u0000\u026d\u026c\u0001\u0000\u0000"+
		"\u0000\u026e\u026f\u0001\u0000\u0000\u0000\u026f\u026d\u0001\u0000\u0000"+
		"\u0000\u026f\u0270\u0001\u0000\u0000\u0000\u0270k\u0001\u0000\u0000\u0000"+
		"\u0271\u0273\u0003b1\u0000\u0272\u0271\u0001\u0000\u0000\u0000\u0273\u0274"+
		"\u0001\u0000\u0000\u0000\u0274\u0272\u0001\u0000\u0000\u0000\u0274\u0275"+
		"\u0001\u0000\u0000\u0000\u0275m\u0001\u0000\u0000\u0000\u0276\u0278\u0003"+
		"f3\u0000\u0277\u0276\u0001\u0000\u0000\u0000\u0278\u0279\u0001\u0000\u0000"+
		"\u0000\u0279\u0277\u0001\u0000\u0000\u0000\u0279\u027a\u0001\u0000\u0000"+
		"\u0000\u027ao\u0001\u0000\u0000\u0000\u027b\u027c\u0007\u0004\u0000\u0000"+
		"\u027cq\u0001\u0000\u0000\u0000\u027d\u027e\u0007\u0005\u0000\u0000\u027e"+
		"s\u0001\u0000\u0000\u0000\u027f\u0281\u0005\u001c\u0000\u0000\u0280\u027f"+
		"\u0001\u0000\u0000\u0000\u0280\u0281\u0001\u0000\u0000\u0000\u0281u\u0001"+
		"\u0000\u0000\u0000\u0282\u0283\u0007\u0006\u0000\u0000\u0283w\u0001\u0000"+
		"\u0000\u0000G|\u0080\u0082\u00b1\u00db\u00e0\u00f0\u00f3\u00f8\u0106\u0112"+
		"\u0114\u0118\u011c\u011f\u0125\u0129\u012c\u0130\u0141\u0144\u014c\u0155"+
		"\u015e\u0167\u016c\u0176\u0178\u017b\u017f\u0182\u0187\u018f\u0194\u019c"+
		"\u01a1\u01a5\u01aa\u01ae\u01cd\u01d2\u01d6\u01d9\u01dd\u01e1\u01e8\u01ec"+
		"\u01f1\u01f5\u01f9\u01fe\u0204\u0206\u0209\u0211\u0217\u021b\u0221\u0226"+
		"\u0234\u0239\u0240\u0248\u024e\u0261\u0265\u026a\u026f\u0274\u0279\u0280";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}