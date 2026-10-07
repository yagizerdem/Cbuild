
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgramContext } from "./ysharpParser.js";
import { DeclarationContext } from "./ysharpParser.js";
import { FunDeclContext } from "./ysharpParser.js";
import { VarDeclContext } from "./ysharpParser.js";
import { ConstDeclContext } from "./ysharpParser.js";
import { StatementContext } from "./ysharpParser.js";
import { BlockContext } from "./ysharpParser.js";
import { ExprStmtContext } from "./ysharpParser.js";
import { ForStmtContext } from "./ysharpParser.js";
import { WhileStmtContext } from "./ysharpParser.js";
import { TryStmtContext } from "./ysharpParser.js";
import { IfStmtContext } from "./ysharpParser.js";
import { PrintStmtContext } from "./ysharpParser.js";
import { PrintlnStmtContext } from "./ysharpParser.js";
import { ReturnStmtContext } from "./ysharpParser.js";
import { BreakStmtContext } from "./ysharpParser.js";
import { ContinueStmtContext } from "./ysharpParser.js";
import { ExpressionContext } from "./ysharpParser.js";
import { AssignmentContext } from "./ysharpParser.js";
import { TernaryConditionalContext } from "./ysharpParser.js";
import { EqualityContext } from "./ysharpParser.js";
import { ComparisonContext } from "./ysharpParser.js";
import { TermContext } from "./ysharpParser.js";
import { FactorContext } from "./ysharpParser.js";
import { UnaryContext } from "./ysharpParser.js";
import { PostfixContext } from "./ysharpParser.js";
import { CallContext } from "./ysharpParser.js";
import { PrimaryContext } from "./ysharpParser.js";
import { AtomContext } from "./ysharpParser.js";
import { ArrayContext } from "./ysharpParser.js";
import { MapContext } from "./ysharpParser.js";
import { AssignmentOpContext } from "./ysharpParser.js";
import { LvalueContext } from "./ysharpParser.js";
import { FunctionContext } from "./ysharpParser.js";
import { ParametersContext } from "./ysharpParser.js";
import { ArgumentsContext } from "./ysharpParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ysharpParser`.
 */
export class ysharpListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `ysharpParser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.declaration`.
     * @param ctx the parse tree
     */
    enterDeclaration?: (ctx: DeclarationContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.declaration`.
     * @param ctx the parse tree
     */
    exitDeclaration?: (ctx: DeclarationContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.funDecl`.
     * @param ctx the parse tree
     */
    enterFunDecl?: (ctx: FunDeclContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.funDecl`.
     * @param ctx the parse tree
     */
    exitFunDecl?: (ctx: FunDeclContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.varDecl`.
     * @param ctx the parse tree
     */
    enterVarDecl?: (ctx: VarDeclContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.varDecl`.
     * @param ctx the parse tree
     */
    exitVarDecl?: (ctx: VarDeclContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.constDecl`.
     * @param ctx the parse tree
     */
    enterConstDecl?: (ctx: ConstDeclContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.constDecl`.
     * @param ctx the parse tree
     */
    exitConstDecl?: (ctx: ConstDeclContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.exprStmt`.
     * @param ctx the parse tree
     */
    enterExprStmt?: (ctx: ExprStmtContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.exprStmt`.
     * @param ctx the parse tree
     */
    exitExprStmt?: (ctx: ExprStmtContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.forStmt`.
     * @param ctx the parse tree
     */
    enterForStmt?: (ctx: ForStmtContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.forStmt`.
     * @param ctx the parse tree
     */
    exitForStmt?: (ctx: ForStmtContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.whileStmt`.
     * @param ctx the parse tree
     */
    enterWhileStmt?: (ctx: WhileStmtContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.whileStmt`.
     * @param ctx the parse tree
     */
    exitWhileStmt?: (ctx: WhileStmtContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.tryStmt`.
     * @param ctx the parse tree
     */
    enterTryStmt?: (ctx: TryStmtContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.tryStmt`.
     * @param ctx the parse tree
     */
    exitTryStmt?: (ctx: TryStmtContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.ifStmt`.
     * @param ctx the parse tree
     */
    enterIfStmt?: (ctx: IfStmtContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.ifStmt`.
     * @param ctx the parse tree
     */
    exitIfStmt?: (ctx: IfStmtContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.printStmt`.
     * @param ctx the parse tree
     */
    enterPrintStmt?: (ctx: PrintStmtContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.printStmt`.
     * @param ctx the parse tree
     */
    exitPrintStmt?: (ctx: PrintStmtContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.printlnStmt`.
     * @param ctx the parse tree
     */
    enterPrintlnStmt?: (ctx: PrintlnStmtContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.printlnStmt`.
     * @param ctx the parse tree
     */
    exitPrintlnStmt?: (ctx: PrintlnStmtContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.returnStmt`.
     * @param ctx the parse tree
     */
    enterReturnStmt?: (ctx: ReturnStmtContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.returnStmt`.
     * @param ctx the parse tree
     */
    exitReturnStmt?: (ctx: ReturnStmtContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.breakStmt`.
     * @param ctx the parse tree
     */
    enterBreakStmt?: (ctx: BreakStmtContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.breakStmt`.
     * @param ctx the parse tree
     */
    exitBreakStmt?: (ctx: BreakStmtContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.continueStmt`.
     * @param ctx the parse tree
     */
    enterContinueStmt?: (ctx: ContinueStmtContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.continueStmt`.
     * @param ctx the parse tree
     */
    exitContinueStmt?: (ctx: ContinueStmtContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.expression`.
     * @param ctx the parse tree
     */
    enterExpression?: (ctx: ExpressionContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.expression`.
     * @param ctx the parse tree
     */
    exitExpression?: (ctx: ExpressionContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.assignment`.
     * @param ctx the parse tree
     */
    enterAssignment?: (ctx: AssignmentContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.assignment`.
     * @param ctx the parse tree
     */
    exitAssignment?: (ctx: AssignmentContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.ternaryConditional`.
     * @param ctx the parse tree
     */
    enterTernaryConditional?: (ctx: TernaryConditionalContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.ternaryConditional`.
     * @param ctx the parse tree
     */
    exitTernaryConditional?: (ctx: TernaryConditionalContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.equality`.
     * @param ctx the parse tree
     */
    enterEquality?: (ctx: EqualityContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.equality`.
     * @param ctx the parse tree
     */
    exitEquality?: (ctx: EqualityContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.comparison`.
     * @param ctx the parse tree
     */
    enterComparison?: (ctx: ComparisonContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.comparison`.
     * @param ctx the parse tree
     */
    exitComparison?: (ctx: ComparisonContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.term`.
     * @param ctx the parse tree
     */
    enterTerm?: (ctx: TermContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.term`.
     * @param ctx the parse tree
     */
    exitTerm?: (ctx: TermContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.factor`.
     * @param ctx the parse tree
     */
    enterFactor?: (ctx: FactorContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.factor`.
     * @param ctx the parse tree
     */
    exitFactor?: (ctx: FactorContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.unary`.
     * @param ctx the parse tree
     */
    enterUnary?: (ctx: UnaryContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.unary`.
     * @param ctx the parse tree
     */
    exitUnary?: (ctx: UnaryContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.postfix`.
     * @param ctx the parse tree
     */
    enterPostfix?: (ctx: PostfixContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.postfix`.
     * @param ctx the parse tree
     */
    exitPostfix?: (ctx: PostfixContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.call`.
     * @param ctx the parse tree
     */
    enterCall?: (ctx: CallContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.call`.
     * @param ctx the parse tree
     */
    exitCall?: (ctx: CallContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.primary`.
     * @param ctx the parse tree
     */
    enterPrimary?: (ctx: PrimaryContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.primary`.
     * @param ctx the parse tree
     */
    exitPrimary?: (ctx: PrimaryContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.atom`.
     * @param ctx the parse tree
     */
    enterAtom?: (ctx: AtomContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.atom`.
     * @param ctx the parse tree
     */
    exitAtom?: (ctx: AtomContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.array`.
     * @param ctx the parse tree
     */
    enterArray?: (ctx: ArrayContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.array`.
     * @param ctx the parse tree
     */
    exitArray?: (ctx: ArrayContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.map`.
     * @param ctx the parse tree
     */
    enterMap?: (ctx: MapContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.map`.
     * @param ctx the parse tree
     */
    exitMap?: (ctx: MapContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.assignmentOp`.
     * @param ctx the parse tree
     */
    enterAssignmentOp?: (ctx: AssignmentOpContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.assignmentOp`.
     * @param ctx the parse tree
     */
    exitAssignmentOp?: (ctx: AssignmentOpContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.lvalue`.
     * @param ctx the parse tree
     */
    enterLvalue?: (ctx: LvalueContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.lvalue`.
     * @param ctx the parse tree
     */
    exitLvalue?: (ctx: LvalueContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.function`.
     * @param ctx the parse tree
     */
    enterFunction?: (ctx: FunctionContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.function`.
     * @param ctx the parse tree
     */
    exitFunction?: (ctx: FunctionContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.parameters`.
     * @param ctx the parse tree
     */
    enterParameters?: (ctx: ParametersContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.parameters`.
     * @param ctx the parse tree
     */
    exitParameters?: (ctx: ParametersContext) => void;
    /**
     * Enter a parse tree produced by `ysharpParser.arguments`.
     * @param ctx the parse tree
     */
    enterArguments?: (ctx: ArgumentsContext) => void;
    /**
     * Exit a parse tree produced by `ysharpParser.arguments`.
     * @param ctx the parse tree
     */
    exitArguments?: (ctx: ArgumentsContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

