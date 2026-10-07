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
import { yValue } from "@ysharp/evaluator/yValue.js";

class yExprEvaluator extends ysharpVisitor<yValue> {
  private readonly env: yEnv;
  public constructor(env: yEnv) {
    super();
    this.env = env;
  }

  visitExpression = (ctx: ExpressionContext): yValue => {
    return ctx.accept(this) as yValue;
  };

  visitAssignment = (ctx: AssignmentContext): yValue => {
    if (ctx.lvalue() != null) {
      const yValue: yValue = this.visit(ctx.lvalue()!) as yValue;
      const op = ctx.assignmentOp()?.getText();
    }
    return this.visit(ctx.ternaryConditional()!) as yValue;
  };

  visitTernaryConditional = (ctx: TernaryConditionalContext): yValue => {
    const equality: yValue = this.visit(ctx.equality()!) as yValue;
    if (ctx.QUESTION()) {
      const expr: yValue = this.visit(ctx.expression()!) as yValue;
      const option: yValue = this.visit(ctx.ternaryConditional()!) as yValue;

      if (equality.isTruthy()) return expr;
      return option;
    } else {
      return equality;
    }
  };

  visitEquality = (ctx: EqualityContext): yValue => {
    let left: yValue = this.visit(ctx.children.at(0)!) as yValue;
    if (ctx.children.length == 0) return left;

    let flag = true;
    for (let i = 1; i < ctx.children.length; i++) {
      const right: yValue = this.visit(ctx.children.at(i)!) as yValue;
      if (!left.equals(right)) {
        flag = false;
        break;
      }

      left = right;
    }

    return new yValue("boolean", flag);
  };

  visitComparison = (ctx: ComparisonContext): yValue => {
    throw new Error("Not implemented");
  };

  visitTerm = (ctx: TermContext): yValue => {
    throw new Error("Not implemented");
  };

  visitFactor = (ctx: FactorContext): yValue => {
    throw new Error("Not implemented");
  };

  visitUnary = (ctx: UnaryContext): yValue => {
    throw new Error("Not implemented");
  };

  visitPostfix = (ctx: PostfixContext): yValue => {
    throw new Error("Not implemented");
  };

  visitCall = (ctx: CallContext): yValue => {
    throw new Error("Not implemented");
  };

  visitPrimary = (ctx: PrimaryContext): yValue => {
    throw new Error("Not implemented");
  };

  visitAtom = (ctx: AtomContext): yValue => {
    throw new Error("Not implemented");
  };

  visitArray = (ctx: ArrayContext): yValue => {
    throw new Error("Not implemented");
  };

  visitMap = (ctx: MapContext): yValue => {
    throw new Error("Not implemented");
  };

  visitAssignmentOp = (ctx: AssignmentOpContext): yValue => {
    throw new Error("Not implemented");
  };

  visitLvalue = (ctx: LvalueContext): yValue => {
    return ctx.postfix().accept(this) as yValue;
  };

  visitArguments = (ctx: ArgumentsContext): yValue => {
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
    // const evaluator = new yExprEvaluator(this.env);
    // const evaluation: number | null = ctx.accept(evaluator);
    throw new Error("Not implemented");
  };
}
