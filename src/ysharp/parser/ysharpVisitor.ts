
import { AbstractParseTreeVisitor } from "antlr4ng";


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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ysharpParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class ysharpVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `ysharpParser.program`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProgram?: (ctx: ProgramContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.declaration`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDeclaration?: (ctx: DeclarationContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.funDecl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunDecl?: (ctx: FunDeclContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.varDecl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVarDecl?: (ctx: VarDeclContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.constDecl`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitConstDecl?: (ctx: ConstDeclContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.statement`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStatement?: (ctx: StatementContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlock?: (ctx: BlockContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.exprStmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExprStmt?: (ctx: ExprStmtContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.forStmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitForStmt?: (ctx: ForStmtContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.whileStmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWhileStmt?: (ctx: WhileStmtContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.tryStmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTryStmt?: (ctx: TryStmtContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.ifStmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIfStmt?: (ctx: IfStmtContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.printStmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrintStmt?: (ctx: PrintStmtContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.printlnStmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrintlnStmt?: (ctx: PrintlnStmtContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.returnStmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReturnStmt?: (ctx: ReturnStmtContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.breakStmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBreakStmt?: (ctx: BreakStmtContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.continueStmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitContinueStmt?: (ctx: ContinueStmtContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.expression`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExpression?: (ctx: ExpressionContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.assignment`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAssignment?: (ctx: AssignmentContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.ternaryConditional`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTernaryConditional?: (ctx: TernaryConditionalContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.equality`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitEquality?: (ctx: EqualityContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.comparison`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitComparison?: (ctx: ComparisonContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.term`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitTerm?: (ctx: TermContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.factor`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFactor?: (ctx: FactorContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.unary`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitUnary?: (ctx: UnaryContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.postfix`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPostfix?: (ctx: PostfixContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.call`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCall?: (ctx: CallContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.primary`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitPrimary?: (ctx: PrimaryContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.atom`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAtom?: (ctx: AtomContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.array`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArray?: (ctx: ArrayContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.map`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMap?: (ctx: MapContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.assignmentOp`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAssignmentOp?: (ctx: AssignmentOpContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.lvalue`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitLvalue?: (ctx: LvalueContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.function`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFunction?: (ctx: FunctionContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.parameters`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParameters?: (ctx: ParametersContext) => Result;
    /**
     * Visit a parse tree produced by `ysharpParser.arguments`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArguments?: (ctx: ArgumentsContext) => Result;
}

