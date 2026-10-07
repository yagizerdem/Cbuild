import { ysharpVisitor } from "@ysharp/parser/ysharpVisitor.js";
import { ysharpLexer } from "@ysharp/parser/ysharpLexer.js";
import { CharStream, CommonTokenStream } from "antlr4ng";
import {
  ExprStmtContext,
  ProgramContext,
  ysharpParser,
} from "@ysharp/parser/ysharpParser.js";

import {
  ExpressionContext,
  AssignmentContext,
  TernaryConditionalContext,
  EqualityContext,
  ComparisonContext,
  TermContext,
  FactorContext,
  UnaryContext,
  PostfixContext,
  CallContext,
  PrimaryContext,
  AtomContext,
  ArrayContext,
  MapContext,
  AssignmentOpContext,
  LvalueContext,
  ArgumentsContext,
} from "@ysharp/parser/ysharpParser.js";
import { yEnv } from "@ysharp/evaluator/yEnv.js";

class yExprEvaluator extends ysharpVisitor<number> {
  private readonly env: yEnv;
  public constructor(env: yEnv) {
    super();
    this.env = env;
  }

  visitExpression = (ctx: ExpressionContext): number => {
    return ctx.accept(this) as number;
  };

  visitAssignment = (ctx: AssignmentContext): number => {
    if (ctx.lvalue() != null) {
      const lvalue: number = this.visit(ctx.lvalue()!) as number;
    }
  };

  visitTernaryConditional = (ctx: TernaryConditionalContext): number => {
    throw new Error("Not implemented");
  };

  visitEquality = (ctx: EqualityContext): number => {
    throw new Error("Not implemented");
  };

  visitComparison = (ctx: ComparisonContext): number => {
    throw new Error("Not implemented");
  };

  visitTerm = (ctx: TermContext): number => {
    throw new Error("Not implemented");
  };

  visitFactor = (ctx: FactorContext): number => {
    throw new Error("Not implemented");
  };

  visitUnary = (ctx: UnaryContext): number => {
    throw new Error("Not implemented");
  };

  visitPostfix = (ctx: PostfixContext): number => {
    throw new Error("Not implemented");
  };

  visitCall = (ctx: CallContext): number => {
    throw new Error("Not implemented");
  };

  visitPrimary = (ctx: PrimaryContext): number => {
    throw new Error("Not implemented");
  };

  visitAtom = (ctx: AtomContext): number => {
    throw new Error("Not implemented");
  };

  visitArray = (ctx: ArrayContext): number => {
    throw new Error("Not implemented");
  };

  visitMap = (ctx: MapContext): number => {
    throw new Error("Not implemented");
  };

  visitAssignmentOp = (ctx: AssignmentOpContext): number => {
    throw new Error("Not implemented");
  };

  visitLvalue = (ctx: LvalueContext): number => {
    return ctx.postfix().accept(this) as number;
  };

  visitArguments = (ctx: ArgumentsContext): number => {
    throw new Error("Not implemented");
  };
}
export class yInterpreter extends ysharpVisitor<void> {
  private readonly program: string;
  private readonly env: yEnv;

  public constructor(program: string) {
    super();
    this.program = program;
    this.env = new yEnv();
  }

  public parse(): ProgramContext {
    const charStream = CharStream.fromString(this.program);
    const lexer = new ysharpLexer(charStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ysharpParser(tokenStream);
    const programCtx = parser.program();
    return programCtx;
  }

  public interpret(programCtx: ProgramContext) {
    for (const child of programCtx.children) {
      child.accept(this);
    }
  }

  visitExprStmt: (ctx: ExprStmtContext) => void = (ctx: ExprStmtContext) => {
    const evaluator = new yExprEvaluator(this.env);
    const evaluation: number | null = ctx.accept(evaluator);
  };
}
