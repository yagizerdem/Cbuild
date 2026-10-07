
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { ysharpListener } from "./ysharpListener.js";
import { ysharpVisitor } from "./ysharpVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class ysharpParser extends antlr.Parser {
    public static readonly FUNCTION = 1;
    public static readonly VAR = 2;
    public static readonly CONST = 3;
    public static readonly DO = 4;
    public static readonly END = 5;
    public static readonly FOR = 6;
    public static readonly IN = 7;
    public static readonly WHILE = 8;
    public static readonly TRY = 9;
    public static readonly CATCH = 10;
    public static readonly FINALLY = 11;
    public static readonly IF = 12;
    public static readonly THEN = 13;
    public static readonly ELIF = 14;
    public static readonly ELSE = 15;
    public static readonly PRINT = 16;
    public static readonly PRINTLN = 17;
    public static readonly RETURN = 18;
    public static readonly BREAK = 19;
    public static readonly CONTINUE = 20;
    public static readonly TRUE = 21;
    public static readonly FALSE = 22;
    public static readonly NULL = 23;
    public static readonly INC = 24;
    public static readonly DEC = 25;
    public static readonly PLUS_ASSIGN = 26;
    public static readonly MINUS_ASSIGN = 27;
    public static readonly MUL_ASSIGN = 28;
    public static readonly DIV_ASSIGN = 29;
    public static readonly MOD_ASSIGN = 30;
    public static readonly EQUAL = 31;
    public static readonly NOT_EQUAL = 32;
    public static readonly GTE = 33;
    public static readonly LTE = 34;
    public static readonly GT = 35;
    public static readonly LT = 36;
    public static readonly SAFE_DOT = 37;
    public static readonly ASSIGN = 38;
    public static readonly PLUS = 39;
    public static readonly MINUS = 40;
    public static readonly MUL = 41;
    public static readonly DIV = 42;
    public static readonly MOD = 43;
    public static readonly NOT = 44;
    public static readonly QUESTION = 45;
    public static readonly COLON = 46;
    public static readonly LPAREN = 47;
    public static readonly RPAREN = 48;
    public static readonly LBRACKET = 49;
    public static readonly RBRACKET = 50;
    public static readonly LBRACE = 51;
    public static readonly RBRACE = 52;
    public static readonly COMMA = 53;
    public static readonly DOT = 54;
    public static readonly SEMI = 55;
    public static readonly HEX_NUMBER = 56;
    public static readonly DOUBLE = 57;
    public static readonly DECIMAL_NUMBER = 58;
    public static readonly STRING = 59;
    public static readonly CHAR = 60;
    public static readonly IDENTIFIER = 61;
    public static readonly WS = 62;
    public static readonly LINE_COMMENT = 63;
    public static readonly BLOCK_COMMENT = 64;
    public static readonly RULE_program = 0;
    public static readonly RULE_declaration = 1;
    public static readonly RULE_funDecl = 2;
    public static readonly RULE_varDecl = 3;
    public static readonly RULE_constDecl = 4;
    public static readonly RULE_statement = 5;
    public static readonly RULE_block = 6;
    public static readonly RULE_exprStmt = 7;
    public static readonly RULE_forStmt = 8;
    public static readonly RULE_whileStmt = 9;
    public static readonly RULE_tryStmt = 10;
    public static readonly RULE_ifStmt = 11;
    public static readonly RULE_printStmt = 12;
    public static readonly RULE_printlnStmt = 13;
    public static readonly RULE_returnStmt = 14;
    public static readonly RULE_breakStmt = 15;
    public static readonly RULE_continueStmt = 16;
    public static readonly RULE_expression = 17;
    public static readonly RULE_assignment = 18;
    public static readonly RULE_ternaryConditional = 19;
    public static readonly RULE_equality = 20;
    public static readonly RULE_comparison = 21;
    public static readonly RULE_term = 22;
    public static readonly RULE_factor = 23;
    public static readonly RULE_unary = 24;
    public static readonly RULE_postfix = 25;
    public static readonly RULE_call = 26;
    public static readonly RULE_primary = 27;
    public static readonly RULE_atom = 28;
    public static readonly RULE_array = 29;
    public static readonly RULE_map = 30;
    public static readonly RULE_assignmentOp = 31;
    public static readonly RULE_lvalue = 32;
    public static readonly RULE_function = 33;
    public static readonly RULE_parameters = 34;
    public static readonly RULE_arguments = 35;

    public static readonly literalNames = [
        null, "'function'", "'var'", "'const'", "'do'", "'end'", "'for'", 
        "'in'", "'while'", "'try'", "'catch'", "'finally'", "'if'", "'then'", 
        "'elif'", "'else'", "'print'", "'println'", "'return'", "'break'", 
        "'continue'", "'true'", "'false'", "'null'", "'++'", "'--'", "'+='", 
        "'-='", "'*='", "'/='", "'%='", "'=='", "'!='", "'>='", "'<='", 
        "'>'", "'<'", "'?.'", "'='", "'+'", "'-'", "'*'", "'/'", "'%'", 
        "'!'", "'?'", "':'", "'('", "')'", "'['", "']'", "'{'", "'}'", "','", 
        "'.'", "';'"
    ];

    public static readonly symbolicNames = [
        null, "FUNCTION", "VAR", "CONST", "DO", "END", "FOR", "IN", "WHILE", 
        "TRY", "CATCH", "FINALLY", "IF", "THEN", "ELIF", "ELSE", "PRINT", 
        "PRINTLN", "RETURN", "BREAK", "CONTINUE", "TRUE", "FALSE", "NULL", 
        "INC", "DEC", "PLUS_ASSIGN", "MINUS_ASSIGN", "MUL_ASSIGN", "DIV_ASSIGN", 
        "MOD_ASSIGN", "EQUAL", "NOT_EQUAL", "GTE", "LTE", "GT", "LT", "SAFE_DOT", 
        "ASSIGN", "PLUS", "MINUS", "MUL", "DIV", "MOD", "NOT", "QUESTION", 
        "COLON", "LPAREN", "RPAREN", "LBRACKET", "RBRACKET", "LBRACE", "RBRACE", 
        "COMMA", "DOT", "SEMI", "HEX_NUMBER", "DOUBLE", "DECIMAL_NUMBER", 
        "STRING", "CHAR", "IDENTIFIER", "WS", "LINE_COMMENT", "BLOCK_COMMENT"
    ];
    public static readonly ruleNames = [
        "program", "declaration", "funDecl", "varDecl", "constDecl", "statement", 
        "block", "exprStmt", "forStmt", "whileStmt", "tryStmt", "ifStmt", 
        "printStmt", "printlnStmt", "returnStmt", "breakStmt", "continueStmt", 
        "expression", "assignment", "ternaryConditional", "equality", "comparison", 
        "term", "factor", "unary", "postfix", "call", "primary", "atom", 
        "array", "map", "assignmentOp", "lvalue", "function", "parameters", 
        "arguments",
    ];

    public get grammarFileName(): string { return "ysharp.g4"; }
    public get literalNames(): (string | null)[] { return ysharpParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return ysharpParser.symbolicNames; }
    public get ruleNames(): string[] { return ysharpParser.ruleNames; }
    public get serializedATN(): number[] { return ysharpParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, ysharpParser._ATN, ysharpParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, ysharpParser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 75;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 67048286) !== 0) || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 8262947) !== 0)) {
                {
                {
                this.state = 72;
                this.declaration();
                }
                }
                this.state = 77;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 78;
            this.match(ysharpParser.EOF);
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
    public declaration(): DeclarationContext {
        let localContext = new DeclarationContext(this.context, this.state);
        this.enterRule(localContext, 2, ysharpParser.RULE_declaration);
        try {
            this.state = 84;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ysharpParser.FUNCTION:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 80;
                this.funDecl();
                }
                break;
            case ysharpParser.VAR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 81;
                this.varDecl();
                }
                break;
            case ysharpParser.CONST:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 82;
                this.constDecl();
                }
                break;
            case ysharpParser.DO:
            case ysharpParser.FOR:
            case ysharpParser.WHILE:
            case ysharpParser.TRY:
            case ysharpParser.IF:
            case ysharpParser.PRINT:
            case ysharpParser.PRINTLN:
            case ysharpParser.RETURN:
            case ysharpParser.BREAK:
            case ysharpParser.CONTINUE:
            case ysharpParser.TRUE:
            case ysharpParser.FALSE:
            case ysharpParser.NULL:
            case ysharpParser.INC:
            case ysharpParser.DEC:
            case ysharpParser.PLUS:
            case ysharpParser.MINUS:
            case ysharpParser.NOT:
            case ysharpParser.LPAREN:
            case ysharpParser.LBRACKET:
            case ysharpParser.LBRACE:
            case ysharpParser.HEX_NUMBER:
            case ysharpParser.DOUBLE:
            case ysharpParser.DECIMAL_NUMBER:
            case ysharpParser.STRING:
            case ysharpParser.CHAR:
            case ysharpParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 83;
                this.statement();
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
    public funDecl(): FunDeclContext {
        let localContext = new FunDeclContext(this.context, this.state);
        this.enterRule(localContext, 4, ysharpParser.RULE_funDecl);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 86;
            this.match(ysharpParser.FUNCTION);
            this.state = 87;
            this.function_();
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
    public varDecl(): VarDeclContext {
        let localContext = new VarDeclContext(this.context, this.state);
        this.enterRule(localContext, 6, ysharpParser.RULE_varDecl);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 89;
            this.match(ysharpParser.VAR);
            this.state = 90;
            this.match(ysharpParser.IDENTIFIER);
            this.state = 93;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 38) {
                {
                this.state = 91;
                this.match(ysharpParser.ASSIGN);
                this.state = 92;
                this.expression();
                }
            }

            this.state = 95;
            this.match(ysharpParser.SEMI);
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
    public constDecl(): ConstDeclContext {
        let localContext = new ConstDeclContext(this.context, this.state);
        this.enterRule(localContext, 8, ysharpParser.RULE_constDecl);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 97;
            this.match(ysharpParser.CONST);
            this.state = 98;
            this.match(ysharpParser.IDENTIFIER);
            this.state = 99;
            this.match(ysharpParser.ASSIGN);
            this.state = 100;
            this.expression();
            this.state = 101;
            this.match(ysharpParser.SEMI);
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
        this.enterRule(localContext, 10, ysharpParser.RULE_statement);
        try {
            this.state = 114;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ysharpParser.TRUE:
            case ysharpParser.FALSE:
            case ysharpParser.NULL:
            case ysharpParser.INC:
            case ysharpParser.DEC:
            case ysharpParser.PLUS:
            case ysharpParser.MINUS:
            case ysharpParser.NOT:
            case ysharpParser.LPAREN:
            case ysharpParser.LBRACKET:
            case ysharpParser.LBRACE:
            case ysharpParser.HEX_NUMBER:
            case ysharpParser.DOUBLE:
            case ysharpParser.DECIMAL_NUMBER:
            case ysharpParser.STRING:
            case ysharpParser.CHAR:
            case ysharpParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 103;
                this.exprStmt();
                }
                break;
            case ysharpParser.FOR:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 104;
                this.forStmt();
                }
                break;
            case ysharpParser.WHILE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 105;
                this.whileStmt();
                }
                break;
            case ysharpParser.TRY:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 106;
                this.tryStmt();
                }
                break;
            case ysharpParser.IF:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 107;
                this.ifStmt();
                }
                break;
            case ysharpParser.PRINT:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 108;
                this.printStmt();
                }
                break;
            case ysharpParser.PRINTLN:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 109;
                this.printlnStmt();
                }
                break;
            case ysharpParser.RETURN:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 110;
                this.returnStmt();
                }
                break;
            case ysharpParser.BREAK:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 111;
                this.breakStmt();
                }
                break;
            case ysharpParser.CONTINUE:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 112;
                this.continueStmt();
                }
                break;
            case ysharpParser.DO:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 113;
                this.block();
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
    public block(): BlockContext {
        let localContext = new BlockContext(this.context, this.state);
        this.enterRule(localContext, 12, ysharpParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 116;
            this.match(ysharpParser.DO);
            this.state = 120;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 67048286) !== 0) || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 8262947) !== 0)) {
                {
                {
                this.state = 117;
                this.declaration();
                }
                }
                this.state = 122;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 123;
            this.match(ysharpParser.END);
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
    public exprStmt(): ExprStmtContext {
        let localContext = new ExprStmtContext(this.context, this.state);
        this.enterRule(localContext, 14, ysharpParser.RULE_exprStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 125;
            this.expression();
            this.state = 126;
            this.match(ysharpParser.SEMI);
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
    public forStmt(): ForStmtContext {
        let localContext = new ForStmtContext(this.context, this.state);
        this.enterRule(localContext, 16, ysharpParser.RULE_forStmt);
        let _la: number;
        try {
            this.state = 148;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 128;
                this.match(ysharpParser.FOR);
                this.state = 132;
                this.errorHandler.sync(this);
                switch (this.tokenStream.LA(1)) {
                case ysharpParser.VAR:
                    {
                    this.state = 129;
                    this.varDecl();
                    }
                    break;
                case ysharpParser.TRUE:
                case ysharpParser.FALSE:
                case ysharpParser.NULL:
                case ysharpParser.INC:
                case ysharpParser.DEC:
                case ysharpParser.PLUS:
                case ysharpParser.MINUS:
                case ysharpParser.NOT:
                case ysharpParser.LPAREN:
                case ysharpParser.LBRACKET:
                case ysharpParser.LBRACE:
                case ysharpParser.HEX_NUMBER:
                case ysharpParser.DOUBLE:
                case ysharpParser.DECIMAL_NUMBER:
                case ysharpParser.STRING:
                case ysharpParser.CHAR:
                case ysharpParser.IDENTIFIER:
                    {
                    this.state = 130;
                    this.expression();
                    }
                    break;
                case ysharpParser.SEMI:
                    {
                    this.state = 131;
                    this.match(ysharpParser.SEMI);
                    }
                    break;
                default:
                    throw new antlr.NoViableAltException(this);
                }
                this.state = 135;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 65011712) !== 0) || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 8262947) !== 0)) {
                    {
                    this.state = 134;
                    this.expression();
                    }
                }

                this.state = 137;
                this.match(ysharpParser.SEMI);
                this.state = 139;
                this.errorHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this.tokenStream, 7, this.context) ) {
                case 1:
                    {
                    this.state = 138;
                    this.expression();
                    }
                    break;
                }
                this.state = 141;
                this.statement();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 142;
                this.match(ysharpParser.FOR);
                this.state = 143;
                this.varDecl();
                this.state = 144;
                this.match(ysharpParser.IN);
                this.state = 145;
                this.expression();
                this.state = 146;
                this.statement();
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
    public whileStmt(): WhileStmtContext {
        let localContext = new WhileStmtContext(this.context, this.state);
        this.enterRule(localContext, 18, ysharpParser.RULE_whileStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 150;
            this.match(ysharpParser.WHILE);
            this.state = 151;
            this.expression();
            this.state = 152;
            this.statement();
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
    public tryStmt(): TryStmtContext {
        let localContext = new TryStmtContext(this.context, this.state);
        this.enterRule(localContext, 20, ysharpParser.RULE_tryStmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 154;
            this.match(ysharpParser.TRY);
            this.state = 155;
            this.block();
            this.state = 156;
            this.match(ysharpParser.CATCH);
            this.state = 157;
            this.match(ysharpParser.LPAREN);
            this.state = 158;
            this.match(ysharpParser.IDENTIFIER);
            this.state = 159;
            this.match(ysharpParser.RPAREN);
            this.state = 160;
            this.block();
            this.state = 163;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 11) {
                {
                this.state = 161;
                this.match(ysharpParser.FINALLY);
                this.state = 162;
                this.block();
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
    public ifStmt(): IfStmtContext {
        let localContext = new IfStmtContext(this.context, this.state);
        this.enterRule(localContext, 22, ysharpParser.RULE_ifStmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 165;
            this.match(ysharpParser.IF);
            this.state = 166;
            this.expression();
            this.state = 167;
            this.match(ysharpParser.THEN);
            this.state = 168;
            this.block();
            this.state = 176;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 14) {
                {
                {
                this.state = 169;
                this.match(ysharpParser.ELIF);
                this.state = 170;
                this.expression();
                this.state = 171;
                this.match(ysharpParser.THEN);
                this.state = 172;
                this.block();
                }
                }
                this.state = 178;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 181;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 15) {
                {
                this.state = 179;
                this.match(ysharpParser.ELSE);
                this.state = 180;
                this.block();
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
    public printStmt(): PrintStmtContext {
        let localContext = new PrintStmtContext(this.context, this.state);
        this.enterRule(localContext, 24, ysharpParser.RULE_printStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 183;
            this.match(ysharpParser.PRINT);
            this.state = 184;
            this.expression();
            this.state = 185;
            this.match(ysharpParser.SEMI);
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
    public printlnStmt(): PrintlnStmtContext {
        let localContext = new PrintlnStmtContext(this.context, this.state);
        this.enterRule(localContext, 26, ysharpParser.RULE_printlnStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 187;
            this.match(ysharpParser.PRINTLN);
            this.state = 188;
            this.expression();
            this.state = 189;
            this.match(ysharpParser.SEMI);
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
    public returnStmt(): ReturnStmtContext {
        let localContext = new ReturnStmtContext(this.context, this.state);
        this.enterRule(localContext, 28, ysharpParser.RULE_returnStmt);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 191;
            this.match(ysharpParser.RETURN);
            this.state = 193;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 65011712) !== 0) || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 8262947) !== 0)) {
                {
                this.state = 192;
                this.expression();
                }
            }

            this.state = 195;
            this.match(ysharpParser.SEMI);
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
    public breakStmt(): BreakStmtContext {
        let localContext = new BreakStmtContext(this.context, this.state);
        this.enterRule(localContext, 30, ysharpParser.RULE_breakStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 197;
            this.match(ysharpParser.BREAK);
            this.state = 198;
            this.match(ysharpParser.SEMI);
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
    public continueStmt(): ContinueStmtContext {
        let localContext = new ContinueStmtContext(this.context, this.state);
        this.enterRule(localContext, 32, ysharpParser.RULE_continueStmt);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 200;
            this.match(ysharpParser.CONTINUE);
            this.state = 201;
            this.match(ysharpParser.SEMI);
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
        this.enterRule(localContext, 34, ysharpParser.RULE_expression);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 203;
            this.assignment();
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
        this.enterRule(localContext, 36, ysharpParser.RULE_assignment);
        try {
            this.state = 210;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 13, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 205;
                this.lvalue();
                this.state = 206;
                this.assignmentOp();
                this.state = 207;
                this.assignment();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 209;
                this.ternaryConditional();
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
    public ternaryConditional(): TernaryConditionalContext {
        let localContext = new TernaryConditionalContext(this.context, this.state);
        this.enterRule(localContext, 38, ysharpParser.RULE_ternaryConditional);
        try {
            this.state = 219;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 14, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 212;
                this.equality();
                this.state = 213;
                this.match(ysharpParser.QUESTION);
                this.state = 214;
                this.expression();
                this.state = 215;
                this.match(ysharpParser.COLON);
                this.state = 216;
                this.ternaryConditional();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 218;
                this.equality();
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
    public equality(): EqualityContext {
        let localContext = new EqualityContext(this.context, this.state);
        this.enterRule(localContext, 40, ysharpParser.RULE_equality);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 221;
            this.comparison();
            this.state = 226;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 31 || _la === 32) {
                {
                {
                this.state = 222;
                _la = this.tokenStream.LA(1);
                if(!(_la === 31 || _la === 32)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 223;
                this.comparison();
                }
                }
                this.state = 228;
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
    public comparison(): ComparisonContext {
        let localContext = new ComparisonContext(this.context, this.state);
        this.enterRule(localContext, 42, ysharpParser.RULE_comparison);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 229;
            this.term();
            this.state = 234;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 15) !== 0)) {
                {
                {
                this.state = 230;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 15) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 231;
                this.term();
                }
                }
                this.state = 236;
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
    public term(): TermContext {
        let localContext = new TermContext(this.context, this.state);
        this.enterRule(localContext, 44, ysharpParser.RULE_term);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 237;
            this.factor();
            this.state = 242;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 238;
                    _la = this.tokenStream.LA(1);
                    if(!(_la === 39 || _la === 40)) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 239;
                    this.factor();
                    }
                    }
                }
                this.state = 244;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 17, this.context);
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
    public factor(): FactorContext {
        let localContext = new FactorContext(this.context, this.state);
        this.enterRule(localContext, 46, ysharpParser.RULE_factor);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 245;
            this.unary();
            this.state = 250;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 7) !== 0)) {
                {
                {
                this.state = 246;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 7) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 247;
                this.unary();
                }
                }
                this.state = 252;
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
    public unary(): UnaryContext {
        let localContext = new UnaryContext(this.context, this.state);
        this.enterRule(localContext, 48, ysharpParser.RULE_unary);
        let _la: number;
        try {
            this.state = 256;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ysharpParser.INC:
            case ysharpParser.DEC:
            case ysharpParser.PLUS:
            case ysharpParser.MINUS:
            case ysharpParser.NOT:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 253;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 24)) & ~0x1F) === 0 && ((1 << (_la - 24)) & 1146883) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 254;
                this.unary();
                }
                break;
            case ysharpParser.TRUE:
            case ysharpParser.FALSE:
            case ysharpParser.NULL:
            case ysharpParser.LPAREN:
            case ysharpParser.LBRACKET:
            case ysharpParser.LBRACE:
            case ysharpParser.HEX_NUMBER:
            case ysharpParser.DOUBLE:
            case ysharpParser.DECIMAL_NUMBER:
            case ysharpParser.STRING:
            case ysharpParser.CHAR:
            case ysharpParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 255;
                this.postfix();
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
    public postfix(): PostfixContext {
        let localContext = new PostfixContext(this.context, this.state);
        this.enterRule(localContext, 50, ysharpParser.RULE_postfix);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 258;
            this.call();
            this.state = 262;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 259;
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
                }
                this.state = 264;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 20, this.context);
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
    public call(): CallContext {
        let localContext = new CallContext(this.context, this.state);
        this.enterRule(localContext, 52, ysharpParser.RULE_call);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 265;
            this.primary();
            this.state = 277;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    this.state = 275;
                    this.errorHandler.sync(this);
                    switch (this.tokenStream.LA(1)) {
                    case ysharpParser.LPAREN:
                        {
                        this.state = 266;
                        this.match(ysharpParser.LPAREN);
                        this.state = 268;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                        if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 65011712) !== 0) || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 8262947) !== 0)) {
                            {
                            this.state = 267;
                            this.arguments();
                            }
                        }

                        this.state = 270;
                        this.match(ysharpParser.RPAREN);
                        }
                        break;
                    case ysharpParser.DOT:
                        {
                        this.state = 271;
                        this.match(ysharpParser.DOT);
                        this.state = 272;
                        this.match(ysharpParser.IDENTIFIER);
                        }
                        break;
                    case ysharpParser.SAFE_DOT:
                        {
                        this.state = 273;
                        this.match(ysharpParser.SAFE_DOT);
                        this.state = 274;
                        this.match(ysharpParser.IDENTIFIER);
                        }
                        break;
                    default:
                        throw new antlr.NoViableAltException(this);
                    }
                    }
                }
                this.state = 279;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 23, this.context);
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
    public primary(): PrimaryContext {
        let localContext = new PrimaryContext(this.context, this.state);
        this.enterRule(localContext, 54, ysharpParser.RULE_primary);
        try {
            this.state = 283;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ysharpParser.LBRACKET:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 280;
                this.array();
                }
                break;
            case ysharpParser.LBRACE:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 281;
                this.map();
                }
                break;
            case ysharpParser.TRUE:
            case ysharpParser.FALSE:
            case ysharpParser.NULL:
            case ysharpParser.LPAREN:
            case ysharpParser.HEX_NUMBER:
            case ysharpParser.DOUBLE:
            case ysharpParser.DECIMAL_NUMBER:
            case ysharpParser.STRING:
            case ysharpParser.CHAR:
            case ysharpParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 282;
                this.atom();
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
    public atom(): AtomContext {
        let localContext = new AtomContext(this.context, this.state);
        this.enterRule(localContext, 56, ysharpParser.RULE_atom);
        try {
            this.state = 298;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case ysharpParser.IDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 285;
                this.match(ysharpParser.IDENTIFIER);
                }
                break;
            case ysharpParser.DECIMAL_NUMBER:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 286;
                this.match(ysharpParser.DECIMAL_NUMBER);
                }
                break;
            case ysharpParser.DOUBLE:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 287;
                this.match(ysharpParser.DOUBLE);
                }
                break;
            case ysharpParser.HEX_NUMBER:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 288;
                this.match(ysharpParser.HEX_NUMBER);
                }
                break;
            case ysharpParser.STRING:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 289;
                this.match(ysharpParser.STRING);
                }
                break;
            case ysharpParser.CHAR:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 290;
                this.match(ysharpParser.CHAR);
                }
                break;
            case ysharpParser.TRUE:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 291;
                this.match(ysharpParser.TRUE);
                }
                break;
            case ysharpParser.FALSE:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 292;
                this.match(ysharpParser.FALSE);
                }
                break;
            case ysharpParser.NULL:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 293;
                this.match(ysharpParser.NULL);
                }
                break;
            case ysharpParser.LPAREN:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 294;
                this.match(ysharpParser.LPAREN);
                this.state = 295;
                this.expression();
                this.state = 296;
                this.match(ysharpParser.RPAREN);
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
    public array(): ArrayContext {
        let localContext = new ArrayContext(this.context, this.state);
        this.enterRule(localContext, 58, ysharpParser.RULE_array);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 300;
            this.match(ysharpParser.LBRACKET);
            this.state = 309;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 65011712) !== 0) || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 8262947) !== 0)) {
                {
                this.state = 301;
                this.expression();
                this.state = 306;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 53) {
                    {
                    {
                    this.state = 302;
                    this.match(ysharpParser.COMMA);
                    this.state = 303;
                    this.expression();
                    }
                    }
                    this.state = 308;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 311;
            this.match(ysharpParser.RBRACKET);
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
    public map(): MapContext {
        let localContext = new MapContext(this.context, this.state);
        this.enterRule(localContext, 60, ysharpParser.RULE_map);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 313;
            this.match(ysharpParser.LBRACE);
            this.state = 326;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 59) {
                {
                this.state = 314;
                this.match(ysharpParser.STRING);
                this.state = 315;
                this.match(ysharpParser.COLON);
                this.state = 316;
                this.expression();
                this.state = 323;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 53) {
                    {
                    {
                    this.state = 317;
                    this.match(ysharpParser.COMMA);
                    this.state = 318;
                    this.match(ysharpParser.STRING);
                    this.state = 319;
                    this.match(ysharpParser.COLON);
                    this.state = 320;
                    this.expression();
                    }
                    }
                    this.state = 325;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                }
            }

            this.state = 328;
            this.match(ysharpParser.RBRACE);
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
    public assignmentOp(): AssignmentOpContext {
        let localContext = new AssignmentOpContext(this.context, this.state);
        this.enterRule(localContext, 62, ysharpParser.RULE_assignmentOp);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 330;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 26)) & ~0x1F) === 0 && ((1 << (_la - 26)) & 4127) !== 0))) {
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
    public lvalue(): LvalueContext {
        let localContext = new LvalueContext(this.context, this.state);
        this.enterRule(localContext, 64, ysharpParser.RULE_lvalue);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 332;
            this.postfix();
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
        this.enterRule(localContext, 66, ysharpParser.RULE_function);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 334;
            this.match(ysharpParser.IDENTIFIER);
            this.state = 335;
            this.match(ysharpParser.LPAREN);
            this.state = 337;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 61) {
                {
                this.state = 336;
                this.parameters();
                }
            }

            this.state = 339;
            this.match(ysharpParser.RPAREN);
            this.state = 340;
            this.block();
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
    public parameters(): ParametersContext {
        let localContext = new ParametersContext(this.context, this.state);
        this.enterRule(localContext, 68, ysharpParser.RULE_parameters);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 342;
            this.match(ysharpParser.IDENTIFIER);
            this.state = 347;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 53) {
                {
                {
                this.state = 343;
                this.match(ysharpParser.COMMA);
                this.state = 344;
                this.match(ysharpParser.IDENTIFIER);
                }
                }
                this.state = 349;
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
    public arguments(): ArgumentsContext {
        let localContext = new ArgumentsContext(this.context, this.state);
        this.enterRule(localContext, 70, ysharpParser.RULE_arguments);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 350;
            this.expression();
            this.state = 355;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 53) {
                {
                {
                this.state = 351;
                this.match(ysharpParser.COMMA);
                this.state = 352;
                this.expression();
                }
                }
                this.state = 357;
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

    public static readonly _serializedATN: number[] = [
        4,1,64,359,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,
        2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,
        7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,26,
        2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,33,
        7,33,2,34,7,34,2,35,7,35,1,0,5,0,74,8,0,10,0,12,0,77,9,0,1,0,1,0,
        1,1,1,1,1,1,1,1,3,1,85,8,1,1,2,1,2,1,2,1,3,1,3,1,3,1,3,3,3,94,8,
        3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,
        5,1,5,1,5,1,5,3,5,115,8,5,1,6,1,6,5,6,119,8,6,10,6,12,6,122,9,6,
        1,6,1,6,1,7,1,7,1,7,1,8,1,8,1,8,1,8,3,8,133,8,8,1,8,3,8,136,8,8,
        1,8,1,8,3,8,140,8,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,3,8,149,8,8,1,9,
        1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,3,10,164,
        8,10,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,1,11,5,11,175,8,11,
        10,11,12,11,178,9,11,1,11,1,11,3,11,182,8,11,1,12,1,12,1,12,1,12,
        1,13,1,13,1,13,1,13,1,14,1,14,3,14,194,8,14,1,14,1,14,1,15,1,15,
        1,15,1,16,1,16,1,16,1,17,1,17,1,18,1,18,1,18,1,18,1,18,3,18,211,
        8,18,1,19,1,19,1,19,1,19,1,19,1,19,1,19,3,19,220,8,19,1,20,1,20,
        1,20,5,20,225,8,20,10,20,12,20,228,9,20,1,21,1,21,1,21,5,21,233,
        8,21,10,21,12,21,236,9,21,1,22,1,22,1,22,5,22,241,8,22,10,22,12,
        22,244,9,22,1,23,1,23,1,23,5,23,249,8,23,10,23,12,23,252,9,23,1,
        24,1,24,1,24,3,24,257,8,24,1,25,1,25,5,25,261,8,25,10,25,12,25,264,
        9,25,1,26,1,26,1,26,3,26,269,8,26,1,26,1,26,1,26,1,26,1,26,5,26,
        276,8,26,10,26,12,26,279,9,26,1,27,1,27,1,27,3,27,284,8,27,1,28,
        1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,3,28,
        299,8,28,1,29,1,29,1,29,1,29,5,29,305,8,29,10,29,12,29,308,9,29,
        3,29,310,8,29,1,29,1,29,1,30,1,30,1,30,1,30,1,30,1,30,1,30,1,30,
        5,30,322,8,30,10,30,12,30,325,9,30,3,30,327,8,30,1,30,1,30,1,31,
        1,31,1,32,1,32,1,33,1,33,1,33,3,33,338,8,33,1,33,1,33,1,33,1,34,
        1,34,1,34,5,34,346,8,34,10,34,12,34,349,9,34,1,35,1,35,1,35,5,35,
        354,8,35,10,35,12,35,357,9,35,1,35,0,0,36,0,2,4,6,8,10,12,14,16,
        18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,
        62,64,66,68,70,0,7,1,0,31,32,1,0,33,36,1,0,39,40,1,0,41,43,3,0,24,
        25,39,40,44,44,1,0,24,25,2,0,26,30,38,38,377,0,75,1,0,0,0,2,84,1,
        0,0,0,4,86,1,0,0,0,6,89,1,0,0,0,8,97,1,0,0,0,10,114,1,0,0,0,12,116,
        1,0,0,0,14,125,1,0,0,0,16,148,1,0,0,0,18,150,1,0,0,0,20,154,1,0,
        0,0,22,165,1,0,0,0,24,183,1,0,0,0,26,187,1,0,0,0,28,191,1,0,0,0,
        30,197,1,0,0,0,32,200,1,0,0,0,34,203,1,0,0,0,36,210,1,0,0,0,38,219,
        1,0,0,0,40,221,1,0,0,0,42,229,1,0,0,0,44,237,1,0,0,0,46,245,1,0,
        0,0,48,256,1,0,0,0,50,258,1,0,0,0,52,265,1,0,0,0,54,283,1,0,0,0,
        56,298,1,0,0,0,58,300,1,0,0,0,60,313,1,0,0,0,62,330,1,0,0,0,64,332,
        1,0,0,0,66,334,1,0,0,0,68,342,1,0,0,0,70,350,1,0,0,0,72,74,3,2,1,
        0,73,72,1,0,0,0,74,77,1,0,0,0,75,73,1,0,0,0,75,76,1,0,0,0,76,78,
        1,0,0,0,77,75,1,0,0,0,78,79,5,0,0,1,79,1,1,0,0,0,80,85,3,4,2,0,81,
        85,3,6,3,0,82,85,3,8,4,0,83,85,3,10,5,0,84,80,1,0,0,0,84,81,1,0,
        0,0,84,82,1,0,0,0,84,83,1,0,0,0,85,3,1,0,0,0,86,87,5,1,0,0,87,88,
        3,66,33,0,88,5,1,0,0,0,89,90,5,2,0,0,90,93,5,61,0,0,91,92,5,38,0,
        0,92,94,3,34,17,0,93,91,1,0,0,0,93,94,1,0,0,0,94,95,1,0,0,0,95,96,
        5,55,0,0,96,7,1,0,0,0,97,98,5,3,0,0,98,99,5,61,0,0,99,100,5,38,0,
        0,100,101,3,34,17,0,101,102,5,55,0,0,102,9,1,0,0,0,103,115,3,14,
        7,0,104,115,3,16,8,0,105,115,3,18,9,0,106,115,3,20,10,0,107,115,
        3,22,11,0,108,115,3,24,12,0,109,115,3,26,13,0,110,115,3,28,14,0,
        111,115,3,30,15,0,112,115,3,32,16,0,113,115,3,12,6,0,114,103,1,0,
        0,0,114,104,1,0,0,0,114,105,1,0,0,0,114,106,1,0,0,0,114,107,1,0,
        0,0,114,108,1,0,0,0,114,109,1,0,0,0,114,110,1,0,0,0,114,111,1,0,
        0,0,114,112,1,0,0,0,114,113,1,0,0,0,115,11,1,0,0,0,116,120,5,4,0,
        0,117,119,3,2,1,0,118,117,1,0,0,0,119,122,1,0,0,0,120,118,1,0,0,
        0,120,121,1,0,0,0,121,123,1,0,0,0,122,120,1,0,0,0,123,124,5,5,0,
        0,124,13,1,0,0,0,125,126,3,34,17,0,126,127,5,55,0,0,127,15,1,0,0,
        0,128,132,5,6,0,0,129,133,3,6,3,0,130,133,3,34,17,0,131,133,5,55,
        0,0,132,129,1,0,0,0,132,130,1,0,0,0,132,131,1,0,0,0,133,135,1,0,
        0,0,134,136,3,34,17,0,135,134,1,0,0,0,135,136,1,0,0,0,136,137,1,
        0,0,0,137,139,5,55,0,0,138,140,3,34,17,0,139,138,1,0,0,0,139,140,
        1,0,0,0,140,141,1,0,0,0,141,149,3,10,5,0,142,143,5,6,0,0,143,144,
        3,6,3,0,144,145,5,7,0,0,145,146,3,34,17,0,146,147,3,10,5,0,147,149,
        1,0,0,0,148,128,1,0,0,0,148,142,1,0,0,0,149,17,1,0,0,0,150,151,5,
        8,0,0,151,152,3,34,17,0,152,153,3,10,5,0,153,19,1,0,0,0,154,155,
        5,9,0,0,155,156,3,12,6,0,156,157,5,10,0,0,157,158,5,47,0,0,158,159,
        5,61,0,0,159,160,5,48,0,0,160,163,3,12,6,0,161,162,5,11,0,0,162,
        164,3,12,6,0,163,161,1,0,0,0,163,164,1,0,0,0,164,21,1,0,0,0,165,
        166,5,12,0,0,166,167,3,34,17,0,167,168,5,13,0,0,168,176,3,12,6,0,
        169,170,5,14,0,0,170,171,3,34,17,0,171,172,5,13,0,0,172,173,3,12,
        6,0,173,175,1,0,0,0,174,169,1,0,0,0,175,178,1,0,0,0,176,174,1,0,
        0,0,176,177,1,0,0,0,177,181,1,0,0,0,178,176,1,0,0,0,179,180,5,15,
        0,0,180,182,3,12,6,0,181,179,1,0,0,0,181,182,1,0,0,0,182,23,1,0,
        0,0,183,184,5,16,0,0,184,185,3,34,17,0,185,186,5,55,0,0,186,25,1,
        0,0,0,187,188,5,17,0,0,188,189,3,34,17,0,189,190,5,55,0,0,190,27,
        1,0,0,0,191,193,5,18,0,0,192,194,3,34,17,0,193,192,1,0,0,0,193,194,
        1,0,0,0,194,195,1,0,0,0,195,196,5,55,0,0,196,29,1,0,0,0,197,198,
        5,19,0,0,198,199,5,55,0,0,199,31,1,0,0,0,200,201,5,20,0,0,201,202,
        5,55,0,0,202,33,1,0,0,0,203,204,3,36,18,0,204,35,1,0,0,0,205,206,
        3,64,32,0,206,207,3,62,31,0,207,208,3,36,18,0,208,211,1,0,0,0,209,
        211,3,38,19,0,210,205,1,0,0,0,210,209,1,0,0,0,211,37,1,0,0,0,212,
        213,3,40,20,0,213,214,5,45,0,0,214,215,3,34,17,0,215,216,5,46,0,
        0,216,217,3,38,19,0,217,220,1,0,0,0,218,220,3,40,20,0,219,212,1,
        0,0,0,219,218,1,0,0,0,220,39,1,0,0,0,221,226,3,42,21,0,222,223,7,
        0,0,0,223,225,3,42,21,0,224,222,1,0,0,0,225,228,1,0,0,0,226,224,
        1,0,0,0,226,227,1,0,0,0,227,41,1,0,0,0,228,226,1,0,0,0,229,234,3,
        44,22,0,230,231,7,1,0,0,231,233,3,44,22,0,232,230,1,0,0,0,233,236,
        1,0,0,0,234,232,1,0,0,0,234,235,1,0,0,0,235,43,1,0,0,0,236,234,1,
        0,0,0,237,242,3,46,23,0,238,239,7,2,0,0,239,241,3,46,23,0,240,238,
        1,0,0,0,241,244,1,0,0,0,242,240,1,0,0,0,242,243,1,0,0,0,243,45,1,
        0,0,0,244,242,1,0,0,0,245,250,3,48,24,0,246,247,7,3,0,0,247,249,
        3,48,24,0,248,246,1,0,0,0,249,252,1,0,0,0,250,248,1,0,0,0,250,251,
        1,0,0,0,251,47,1,0,0,0,252,250,1,0,0,0,253,254,7,4,0,0,254,257,3,
        48,24,0,255,257,3,50,25,0,256,253,1,0,0,0,256,255,1,0,0,0,257,49,
        1,0,0,0,258,262,3,52,26,0,259,261,7,5,0,0,260,259,1,0,0,0,261,264,
        1,0,0,0,262,260,1,0,0,0,262,263,1,0,0,0,263,51,1,0,0,0,264,262,1,
        0,0,0,265,277,3,54,27,0,266,268,5,47,0,0,267,269,3,70,35,0,268,267,
        1,0,0,0,268,269,1,0,0,0,269,270,1,0,0,0,270,276,5,48,0,0,271,272,
        5,54,0,0,272,276,5,61,0,0,273,274,5,37,0,0,274,276,5,61,0,0,275,
        266,1,0,0,0,275,271,1,0,0,0,275,273,1,0,0,0,276,279,1,0,0,0,277,
        275,1,0,0,0,277,278,1,0,0,0,278,53,1,0,0,0,279,277,1,0,0,0,280,284,
        3,58,29,0,281,284,3,60,30,0,282,284,3,56,28,0,283,280,1,0,0,0,283,
        281,1,0,0,0,283,282,1,0,0,0,284,55,1,0,0,0,285,299,5,61,0,0,286,
        299,5,58,0,0,287,299,5,57,0,0,288,299,5,56,0,0,289,299,5,59,0,0,
        290,299,5,60,0,0,291,299,5,21,0,0,292,299,5,22,0,0,293,299,5,23,
        0,0,294,295,5,47,0,0,295,296,3,34,17,0,296,297,5,48,0,0,297,299,
        1,0,0,0,298,285,1,0,0,0,298,286,1,0,0,0,298,287,1,0,0,0,298,288,
        1,0,0,0,298,289,1,0,0,0,298,290,1,0,0,0,298,291,1,0,0,0,298,292,
        1,0,0,0,298,293,1,0,0,0,298,294,1,0,0,0,299,57,1,0,0,0,300,309,5,
        49,0,0,301,306,3,34,17,0,302,303,5,53,0,0,303,305,3,34,17,0,304,
        302,1,0,0,0,305,308,1,0,0,0,306,304,1,0,0,0,306,307,1,0,0,0,307,
        310,1,0,0,0,308,306,1,0,0,0,309,301,1,0,0,0,309,310,1,0,0,0,310,
        311,1,0,0,0,311,312,5,50,0,0,312,59,1,0,0,0,313,326,5,51,0,0,314,
        315,5,59,0,0,315,316,5,46,0,0,316,323,3,34,17,0,317,318,5,53,0,0,
        318,319,5,59,0,0,319,320,5,46,0,0,320,322,3,34,17,0,321,317,1,0,
        0,0,322,325,1,0,0,0,323,321,1,0,0,0,323,324,1,0,0,0,324,327,1,0,
        0,0,325,323,1,0,0,0,326,314,1,0,0,0,326,327,1,0,0,0,327,328,1,0,
        0,0,328,329,5,52,0,0,329,61,1,0,0,0,330,331,7,6,0,0,331,63,1,0,0,
        0,332,333,3,50,25,0,333,65,1,0,0,0,334,335,5,61,0,0,335,337,5,47,
        0,0,336,338,3,68,34,0,337,336,1,0,0,0,337,338,1,0,0,0,338,339,1,
        0,0,0,339,340,5,48,0,0,340,341,3,12,6,0,341,67,1,0,0,0,342,347,5,
        61,0,0,343,344,5,53,0,0,344,346,5,61,0,0,345,343,1,0,0,0,346,349,
        1,0,0,0,347,345,1,0,0,0,347,348,1,0,0,0,348,69,1,0,0,0,349,347,1,
        0,0,0,350,355,3,34,17,0,351,352,5,53,0,0,352,354,3,34,17,0,353,351,
        1,0,0,0,354,357,1,0,0,0,355,353,1,0,0,0,355,356,1,0,0,0,356,71,1,
        0,0,0,357,355,1,0,0,0,33,75,84,93,114,120,132,135,139,148,163,176,
        181,193,210,219,226,234,242,250,256,262,268,275,277,283,298,306,
        309,323,326,337,347,355
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!ysharpParser.__ATN) {
            ysharpParser.__ATN = new antlr.ATNDeserializer().deserialize(ysharpParser._serializedATN);
        }

        return ysharpParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(ysharpParser.literalNames, ysharpParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return ysharpParser.vocabulary;
    }

    private static readonly decisionsToDFA = ysharpParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(ysharpParser.EOF, 0)!;
    }
    public declaration(): DeclarationContext[];
    public declaration(i: number): DeclarationContext | null;
    public declaration(i?: number): DeclarationContext[] | DeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DeclarationContext);
        }

        return this.getRuleContext(i, DeclarationContext);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_program;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitProgram) {
             listener.exitProgram(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitProgram) {
            return visitor.visitProgram(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class DeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public funDecl(): FunDeclContext | null {
        return this.getRuleContext(0, FunDeclContext);
    }
    public varDecl(): VarDeclContext | null {
        return this.getRuleContext(0, VarDeclContext);
    }
    public constDecl(): ConstDeclContext | null {
        return this.getRuleContext(0, ConstDeclContext);
    }
    public statement(): StatementContext | null {
        return this.getRuleContext(0, StatementContext);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_declaration;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterDeclaration) {
             listener.enterDeclaration(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitDeclaration) {
             listener.exitDeclaration(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitDeclaration) {
            return visitor.visitDeclaration(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FUNCTION(): antlr.TerminalNode {
        return this.getToken(ysharpParser.FUNCTION, 0)!;
    }
    public function(): FunctionContext {
        return this.getRuleContext(0, FunctionContext)!;
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_funDecl;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterFunDecl) {
             listener.enterFunDecl(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitFunDecl) {
             listener.exitFunDecl(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitFunDecl) {
            return visitor.visitFunDecl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class VarDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public VAR(): antlr.TerminalNode {
        return this.getToken(ysharpParser.VAR, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(ysharpParser.IDENTIFIER, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(ysharpParser.SEMI, 0)!;
    }
    public ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.ASSIGN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_varDecl;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterVarDecl) {
             listener.enterVarDecl(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitVarDecl) {
             listener.exitVarDecl(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitVarDecl) {
            return visitor.visitVarDecl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ConstDeclContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CONST(): antlr.TerminalNode {
        return this.getToken(ysharpParser.CONST, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(ysharpParser.IDENTIFIER, 0)!;
    }
    public ASSIGN(): antlr.TerminalNode {
        return this.getToken(ysharpParser.ASSIGN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(ysharpParser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_constDecl;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterConstDecl) {
             listener.enterConstDecl(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitConstDecl) {
             listener.exitConstDecl(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitConstDecl) {
            return visitor.visitConstDecl(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StatementContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public exprStmt(): ExprStmtContext | null {
        return this.getRuleContext(0, ExprStmtContext);
    }
    public forStmt(): ForStmtContext | null {
        return this.getRuleContext(0, ForStmtContext);
    }
    public whileStmt(): WhileStmtContext | null {
        return this.getRuleContext(0, WhileStmtContext);
    }
    public tryStmt(): TryStmtContext | null {
        return this.getRuleContext(0, TryStmtContext);
    }
    public ifStmt(): IfStmtContext | null {
        return this.getRuleContext(0, IfStmtContext);
    }
    public printStmt(): PrintStmtContext | null {
        return this.getRuleContext(0, PrintStmtContext);
    }
    public printlnStmt(): PrintlnStmtContext | null {
        return this.getRuleContext(0, PrintlnStmtContext);
    }
    public returnStmt(): ReturnStmtContext | null {
        return this.getRuleContext(0, ReturnStmtContext);
    }
    public breakStmt(): BreakStmtContext | null {
        return this.getRuleContext(0, BreakStmtContext);
    }
    public continueStmt(): ContinueStmtContext | null {
        return this.getRuleContext(0, ContinueStmtContext);
    }
    public block(): BlockContext | null {
        return this.getRuleContext(0, BlockContext);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_statement;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterStatement) {
             listener.enterStatement(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitStatement) {
             listener.exitStatement(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitStatement) {
            return visitor.visitStatement(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DO(): antlr.TerminalNode {
        return this.getToken(ysharpParser.DO, 0)!;
    }
    public END(): antlr.TerminalNode {
        return this.getToken(ysharpParser.END, 0)!;
    }
    public declaration(): DeclarationContext[];
    public declaration(i: number): DeclarationContext | null;
    public declaration(i?: number): DeclarationContext[] | DeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(DeclarationContext);
        }

        return this.getRuleContext(i, DeclarationContext);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_block;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitBlock) {
            return visitor.visitBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExprStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(ysharpParser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_exprStmt;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterExprStmt) {
             listener.enterExprStmt(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitExprStmt) {
             listener.exitExprStmt(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitExprStmt) {
            return visitor.visitExprStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ForStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public FOR(): antlr.TerminalNode {
        return this.getToken(ysharpParser.FOR, 0)!;
    }
    public SEMI(): antlr.TerminalNode[];
    public SEMI(i: number): antlr.TerminalNode | null;
    public SEMI(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.SEMI);
    	} else {
    		return this.getToken(ysharpParser.SEMI, i);
    	}
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public varDecl(): VarDeclContext | null {
        return this.getRuleContext(0, VarDeclContext);
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public IN(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.IN, 0);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_forStmt;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterForStmt) {
             listener.enterForStmt(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitForStmt) {
             listener.exitForStmt(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitForStmt) {
            return visitor.visitForStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class WhileStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public WHILE(): antlr.TerminalNode {
        return this.getToken(ysharpParser.WHILE, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public statement(): StatementContext {
        return this.getRuleContext(0, StatementContext)!;
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_whileStmt;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterWhileStmt) {
             listener.enterWhileStmt(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitWhileStmt) {
             listener.exitWhileStmt(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitWhileStmt) {
            return visitor.visitWhileStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TryStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TRY(): antlr.TerminalNode {
        return this.getToken(ysharpParser.TRY, 0)!;
    }
    public block(): BlockContext[];
    public block(i: number): BlockContext | null;
    public block(i?: number): BlockContext[] | BlockContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BlockContext);
        }

        return this.getRuleContext(i, BlockContext);
    }
    public CATCH(): antlr.TerminalNode {
        return this.getToken(ysharpParser.CATCH, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(ysharpParser.LPAREN, 0)!;
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(ysharpParser.IDENTIFIER, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(ysharpParser.RPAREN, 0)!;
    }
    public FINALLY(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.FINALLY, 0);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_tryStmt;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterTryStmt) {
             listener.enterTryStmt(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitTryStmt) {
             listener.exitTryStmt(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitTryStmt) {
            return visitor.visitTryStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class IfStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IF(): antlr.TerminalNode {
        return this.getToken(ysharpParser.IF, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public THEN(): antlr.TerminalNode[];
    public THEN(i: number): antlr.TerminalNode | null;
    public THEN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.THEN);
    	} else {
    		return this.getToken(ysharpParser.THEN, i);
    	}
    }
    public block(): BlockContext[];
    public block(i: number): BlockContext | null;
    public block(i?: number): BlockContext[] | BlockContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BlockContext);
        }

        return this.getRuleContext(i, BlockContext);
    }
    public ELIF(): antlr.TerminalNode[];
    public ELIF(i: number): antlr.TerminalNode | null;
    public ELIF(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.ELIF);
    	} else {
    		return this.getToken(ysharpParser.ELIF, i);
    	}
    }
    public ELSE(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.ELSE, 0);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_ifStmt;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterIfStmt) {
             listener.enterIfStmt(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitIfStmt) {
             listener.exitIfStmt(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitIfStmt) {
            return visitor.visitIfStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PrintStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PRINT(): antlr.TerminalNode {
        return this.getToken(ysharpParser.PRINT, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(ysharpParser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_printStmt;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterPrintStmt) {
             listener.enterPrintStmt(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitPrintStmt) {
             listener.exitPrintStmt(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitPrintStmt) {
            return visitor.visitPrintStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PrintlnStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public PRINTLN(): antlr.TerminalNode {
        return this.getToken(ysharpParser.PRINTLN, 0)!;
    }
    public expression(): ExpressionContext {
        return this.getRuleContext(0, ExpressionContext)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(ysharpParser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_printlnStmt;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterPrintlnStmt) {
             listener.enterPrintlnStmt(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitPrintlnStmt) {
             listener.exitPrintlnStmt(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitPrintlnStmt) {
            return visitor.visitPrintlnStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ReturnStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public RETURN(): antlr.TerminalNode {
        return this.getToken(ysharpParser.RETURN, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(ysharpParser.SEMI, 0)!;
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_returnStmt;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterReturnStmt) {
             listener.enterReturnStmt(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitReturnStmt) {
             listener.exitReturnStmt(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitReturnStmt) {
            return visitor.visitReturnStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BreakStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public BREAK(): antlr.TerminalNode {
        return this.getToken(ysharpParser.BREAK, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(ysharpParser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_breakStmt;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterBreakStmt) {
             listener.enterBreakStmt(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitBreakStmt) {
             listener.exitBreakStmt(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitBreakStmt) {
            return visitor.visitBreakStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ContinueStmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public CONTINUE(): antlr.TerminalNode {
        return this.getToken(ysharpParser.CONTINUE, 0)!;
    }
    public SEMI(): antlr.TerminalNode {
        return this.getToken(ysharpParser.SEMI, 0)!;
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_continueStmt;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterContinueStmt) {
             listener.enterContinueStmt(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitContinueStmt) {
             listener.exitContinueStmt(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitContinueStmt) {
            return visitor.visitContinueStmt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public assignment(): AssignmentContext {
        return this.getRuleContext(0, AssignmentContext)!;
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_expression;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterExpression) {
             listener.enterExpression(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitExpression) {
             listener.exitExpression(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AssignmentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public lvalue(): LvalueContext | null {
        return this.getRuleContext(0, LvalueContext);
    }
    public assignmentOp(): AssignmentOpContext | null {
        return this.getRuleContext(0, AssignmentOpContext);
    }
    public assignment(): AssignmentContext | null {
        return this.getRuleContext(0, AssignmentContext);
    }
    public ternaryConditional(): TernaryConditionalContext | null {
        return this.getRuleContext(0, TernaryConditionalContext);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_assignment;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterAssignment) {
             listener.enterAssignment(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitAssignment) {
             listener.exitAssignment(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitAssignment) {
            return visitor.visitAssignment(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TernaryConditionalContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public equality(): EqualityContext {
        return this.getRuleContext(0, EqualityContext)!;
    }
    public QUESTION(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.QUESTION, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public COLON(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.COLON, 0);
    }
    public ternaryConditional(): TernaryConditionalContext | null {
        return this.getRuleContext(0, TernaryConditionalContext);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_ternaryConditional;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterTernaryConditional) {
             listener.enterTernaryConditional(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitTernaryConditional) {
             listener.exitTernaryConditional(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitTernaryConditional) {
            return visitor.visitTernaryConditional(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class EqualityContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public comparison(): ComparisonContext[];
    public comparison(i: number): ComparisonContext | null;
    public comparison(i?: number): ComparisonContext[] | ComparisonContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ComparisonContext);
        }

        return this.getRuleContext(i, ComparisonContext);
    }
    public NOT_EQUAL(): antlr.TerminalNode[];
    public NOT_EQUAL(i: number): antlr.TerminalNode | null;
    public NOT_EQUAL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.NOT_EQUAL);
    	} else {
    		return this.getToken(ysharpParser.NOT_EQUAL, i);
    	}
    }
    public EQUAL(): antlr.TerminalNode[];
    public EQUAL(i: number): antlr.TerminalNode | null;
    public EQUAL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.EQUAL);
    	} else {
    		return this.getToken(ysharpParser.EQUAL, i);
    	}
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_equality;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterEquality) {
             listener.enterEquality(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitEquality) {
             listener.exitEquality(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitEquality) {
            return visitor.visitEquality(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ComparisonContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public term(): TermContext[];
    public term(i: number): TermContext | null;
    public term(i?: number): TermContext[] | TermContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TermContext);
        }

        return this.getRuleContext(i, TermContext);
    }
    public GT(): antlr.TerminalNode[];
    public GT(i: number): antlr.TerminalNode | null;
    public GT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.GT);
    	} else {
    		return this.getToken(ysharpParser.GT, i);
    	}
    }
    public GTE(): antlr.TerminalNode[];
    public GTE(i: number): antlr.TerminalNode | null;
    public GTE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.GTE);
    	} else {
    		return this.getToken(ysharpParser.GTE, i);
    	}
    }
    public LT(): antlr.TerminalNode[];
    public LT(i: number): antlr.TerminalNode | null;
    public LT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.LT);
    	} else {
    		return this.getToken(ysharpParser.LT, i);
    	}
    }
    public LTE(): antlr.TerminalNode[];
    public LTE(i: number): antlr.TerminalNode | null;
    public LTE(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.LTE);
    	} else {
    		return this.getToken(ysharpParser.LTE, i);
    	}
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_comparison;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterComparison) {
             listener.enterComparison(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitComparison) {
             listener.exitComparison(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitComparison) {
            return visitor.visitComparison(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class TermContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public factor(): FactorContext[];
    public factor(i: number): FactorContext | null;
    public factor(i?: number): FactorContext[] | FactorContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FactorContext);
        }

        return this.getRuleContext(i, FactorContext);
    }
    public MINUS(): antlr.TerminalNode[];
    public MINUS(i: number): antlr.TerminalNode | null;
    public MINUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.MINUS);
    	} else {
    		return this.getToken(ysharpParser.MINUS, i);
    	}
    }
    public PLUS(): antlr.TerminalNode[];
    public PLUS(i: number): antlr.TerminalNode | null;
    public PLUS(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.PLUS);
    	} else {
    		return this.getToken(ysharpParser.PLUS, i);
    	}
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_term;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterTerm) {
             listener.enterTerm(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitTerm) {
             listener.exitTerm(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitTerm) {
            return visitor.visitTerm(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FactorContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unary(): UnaryContext[];
    public unary(i: number): UnaryContext | null;
    public unary(i?: number): UnaryContext[] | UnaryContext | null {
        if (i === undefined) {
            return this.getRuleContexts(UnaryContext);
        }

        return this.getRuleContext(i, UnaryContext);
    }
    public DIV(): antlr.TerminalNode[];
    public DIV(i: number): antlr.TerminalNode | null;
    public DIV(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.DIV);
    	} else {
    		return this.getToken(ysharpParser.DIV, i);
    	}
    }
    public MUL(): antlr.TerminalNode[];
    public MUL(i: number): antlr.TerminalNode | null;
    public MUL(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.MUL);
    	} else {
    		return this.getToken(ysharpParser.MUL, i);
    	}
    }
    public MOD(): antlr.TerminalNode[];
    public MOD(i: number): antlr.TerminalNode | null;
    public MOD(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.MOD);
    	} else {
    		return this.getToken(ysharpParser.MOD, i);
    	}
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_factor;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterFactor) {
             listener.enterFactor(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitFactor) {
             listener.exitFactor(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitFactor) {
            return visitor.visitFactor(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class UnaryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public unary(): UnaryContext | null {
        return this.getRuleContext(0, UnaryContext);
    }
    public NOT(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.NOT, 0);
    }
    public MINUS(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.MINUS, 0);
    }
    public PLUS(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.PLUS, 0);
    }
    public INC(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.INC, 0);
    }
    public DEC(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.DEC, 0);
    }
    public postfix(): PostfixContext | null {
        return this.getRuleContext(0, PostfixContext);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_unary;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterUnary) {
             listener.enterUnary(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitUnary) {
             listener.exitUnary(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitUnary) {
            return visitor.visitUnary(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PostfixContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public call(): CallContext {
        return this.getRuleContext(0, CallContext)!;
    }
    public INC(): antlr.TerminalNode[];
    public INC(i: number): antlr.TerminalNode | null;
    public INC(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.INC);
    	} else {
    		return this.getToken(ysharpParser.INC, i);
    	}
    }
    public DEC(): antlr.TerminalNode[];
    public DEC(i: number): antlr.TerminalNode | null;
    public DEC(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.DEC);
    	} else {
    		return this.getToken(ysharpParser.DEC, i);
    	}
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_postfix;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterPostfix) {
             listener.enterPostfix(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitPostfix) {
             listener.exitPostfix(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitPostfix) {
            return visitor.visitPostfix(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CallContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public primary(): PrimaryContext {
        return this.getRuleContext(0, PrimaryContext)!;
    }
    public LPAREN(): antlr.TerminalNode[];
    public LPAREN(i: number): antlr.TerminalNode | null;
    public LPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.LPAREN);
    	} else {
    		return this.getToken(ysharpParser.LPAREN, i);
    	}
    }
    public RPAREN(): antlr.TerminalNode[];
    public RPAREN(i: number): antlr.TerminalNode | null;
    public RPAREN(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.RPAREN);
    	} else {
    		return this.getToken(ysharpParser.RPAREN, i);
    	}
    }
    public DOT(): antlr.TerminalNode[];
    public DOT(i: number): antlr.TerminalNode | null;
    public DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.DOT);
    	} else {
    		return this.getToken(ysharpParser.DOT, i);
    	}
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.IDENTIFIER);
    	} else {
    		return this.getToken(ysharpParser.IDENTIFIER, i);
    	}
    }
    public SAFE_DOT(): antlr.TerminalNode[];
    public SAFE_DOT(i: number): antlr.TerminalNode | null;
    public SAFE_DOT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.SAFE_DOT);
    	} else {
    		return this.getToken(ysharpParser.SAFE_DOT, i);
    	}
    }
    public arguments(): ArgumentsContext[];
    public arguments(i: number): ArgumentsContext | null;
    public arguments(i?: number): ArgumentsContext[] | ArgumentsContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ArgumentsContext);
        }

        return this.getRuleContext(i, ArgumentsContext);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_call;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterCall) {
             listener.enterCall(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitCall) {
             listener.exitCall(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitCall) {
            return visitor.visitCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class PrimaryContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public array(): ArrayContext | null {
        return this.getRuleContext(0, ArrayContext);
    }
    public map(): MapContext | null {
        return this.getRuleContext(0, MapContext);
    }
    public atom(): AtomContext | null {
        return this.getRuleContext(0, AtomContext);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_primary;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterPrimary) {
             listener.enterPrimary(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitPrimary) {
             listener.exitPrimary(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitPrimary) {
            return visitor.visitPrimary(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AtomContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.IDENTIFIER, 0);
    }
    public DECIMAL_NUMBER(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.DECIMAL_NUMBER, 0);
    }
    public DOUBLE(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.DOUBLE, 0);
    }
    public HEX_NUMBER(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.HEX_NUMBER, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.STRING, 0);
    }
    public CHAR(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.CHAR, 0);
    }
    public TRUE(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.TRUE, 0);
    }
    public FALSE(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.FALSE, 0);
    }
    public NULL(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.NULL, 0);
    }
    public LPAREN(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.LPAREN, 0);
    }
    public expression(): ExpressionContext | null {
        return this.getRuleContext(0, ExpressionContext);
    }
    public RPAREN(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.RPAREN, 0);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_atom;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterAtom) {
             listener.enterAtom(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitAtom) {
             listener.exitAtom(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitAtom) {
            return visitor.visitAtom(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArrayContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACKET(): antlr.TerminalNode {
        return this.getToken(ysharpParser.LBRACKET, 0)!;
    }
    public RBRACKET(): antlr.TerminalNode {
        return this.getToken(ysharpParser.RBRACKET, 0)!;
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.COMMA);
    	} else {
    		return this.getToken(ysharpParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_array;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterArray) {
             listener.enterArray(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitArray) {
             listener.exitArray(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitArray) {
            return visitor.visitArray(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class MapContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public LBRACE(): antlr.TerminalNode {
        return this.getToken(ysharpParser.LBRACE, 0)!;
    }
    public RBRACE(): antlr.TerminalNode {
        return this.getToken(ysharpParser.RBRACE, 0)!;
    }
    public STRING(): antlr.TerminalNode[];
    public STRING(i: number): antlr.TerminalNode | null;
    public STRING(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.STRING);
    	} else {
    		return this.getToken(ysharpParser.STRING, i);
    	}
    }
    public COLON(): antlr.TerminalNode[];
    public COLON(i: number): antlr.TerminalNode | null;
    public COLON(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.COLON);
    	} else {
    		return this.getToken(ysharpParser.COLON, i);
    	}
    }
    public expression(): ExpressionContext[];
    public expression(i: number): ExpressionContext | null;
    public expression(i?: number): ExpressionContext[] | ExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExpressionContext);
        }

        return this.getRuleContext(i, ExpressionContext);
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.COMMA);
    	} else {
    		return this.getToken(ysharpParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_map;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterMap) {
             listener.enterMap(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitMap) {
             listener.exitMap(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitMap) {
            return visitor.visitMap(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class AssignmentOpContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.ASSIGN, 0);
    }
    public PLUS_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.PLUS_ASSIGN, 0);
    }
    public MINUS_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.MINUS_ASSIGN, 0);
    }
    public MUL_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.MUL_ASSIGN, 0);
    }
    public DIV_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.DIV_ASSIGN, 0);
    }
    public MOD_ASSIGN(): antlr.TerminalNode | null {
        return this.getToken(ysharpParser.MOD_ASSIGN, 0);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_assignmentOp;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterAssignmentOp) {
             listener.enterAssignmentOp(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitAssignmentOp) {
             listener.exitAssignmentOp(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitAssignmentOp) {
            return visitor.visitAssignmentOp(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class LvalueContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public postfix(): PostfixContext {
        return this.getRuleContext(0, PostfixContext)!;
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_lvalue;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterLvalue) {
             listener.enterLvalue(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitLvalue) {
             listener.exitLvalue(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitLvalue) {
            return visitor.visitLvalue(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FunctionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode {
        return this.getToken(ysharpParser.IDENTIFIER, 0)!;
    }
    public LPAREN(): antlr.TerminalNode {
        return this.getToken(ysharpParser.LPAREN, 0)!;
    }
    public RPAREN(): antlr.TerminalNode {
        return this.getToken(ysharpParser.RPAREN, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public parameters(): ParametersContext | null {
        return this.getRuleContext(0, ParametersContext);
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_function;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterFunction) {
             listener.enterFunction(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitFunction) {
             listener.exitFunction(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitFunction) {
            return visitor.visitFunction(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParametersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.IDENTIFIER);
    	} else {
    		return this.getToken(ysharpParser.IDENTIFIER, i);
    	}
    }
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.COMMA);
    	} else {
    		return this.getToken(ysharpParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_parameters;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterParameters) {
             listener.enterParameters(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitParameters) {
             listener.exitParameters(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitParameters) {
            return visitor.visitParameters(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArgumentsContext extends antlr.ParserRuleContext {
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
    public COMMA(): antlr.TerminalNode[];
    public COMMA(i: number): antlr.TerminalNode | null;
    public COMMA(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(ysharpParser.COMMA);
    	} else {
    		return this.getToken(ysharpParser.COMMA, i);
    	}
    }
    public override get ruleIndex(): number {
        return ysharpParser.RULE_arguments;
    }
    public override enterRule(listener: ysharpListener): void {
        if(listener.enterArguments) {
             listener.enterArguments(this);
        }
    }
    public override exitRule(listener: ysharpListener): void {
        if(listener.exitArguments) {
             listener.exitArguments(this);
        }
    }
    public override accept<Result>(visitor: ysharpVisitor<Result>): Result | null {
        if (visitor.visitArguments) {
            return visitor.visitArguments(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
