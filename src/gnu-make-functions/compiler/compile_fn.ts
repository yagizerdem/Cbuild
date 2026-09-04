import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import { cbuildVisitor } from "@parser/cbuildVisitor";
import {
  ArgumentContext,
  Expr_nested_atomContext,
  Expr_nestedContext,
  Expression_atomContext,
  ExpressionContext,
  ExpressionsContext,
  Exprs_nestedContext,
  FunctionContext,
  WsContext,
} from "@parser/cbuildParser";
import {
  FunctionIR,
  ValueIR,
  functionCallPart,
  textPart,
  varRefPart,
} from "@compiler/ir";
import { cbuildException, ErrorType } from "@src/cbuild-exception";
import { make_function_dispatcher } from "@gnu-make-functions/make_function_dispatcher";
import type { MakeFunction } from "@gnu-make-functions/type";
import { I_compiler_base } from "@src/gnu-make-functions/compiler/Icompiler-base";

export class compile_fn
  extends AbstractParseTreeVisitor<ValueIR>
  implements I_compiler_base, cbuildVisitor<ValueIR>
{
  private readonly dispatcher: make_function_dispatcher;

  public constructor() {
    super();
    this.dispatcher = new make_function_dispatcher();
  }

  protected defaultResult(): ValueIR {
    return new ValueIR();
  }

  public compile(ctx: FunctionContext, func: MakeFunction): FunctionIR {
    const given =
      ctx.arguments() == null ? 0 : ctx.arguments()!.argument().length;
    const expected = func.arity();

    if (given !== expected) {
      throw new cbuildException(
        ErrorType.SEMANTIC,
        "function '" +
          func.getFnName() +
          "' expects " +
          expected +
          " argument(s), but got " +
          given,
        ctx.start.line,
        ctx.start.charPositionInLine + 1,
      );
    }

    const fn = new FunctionIR(func.getFnName());

    for (const argCtx of ctx.arguments()!.argument()) {
      fn.args.push(this.visitArgument(argCtx));
    }

    return fn;
  }

  public visitArgument(ctx: ArgumentContext): ValueIR {
    return this.visitExpressions(ctx.expressions());
  }

  public visitExpressions(ctx: ExpressionsContext): ValueIR {
    const value = new ValueIR();

    for (const ast_node of ctx.children ?? []) {
      const partValue = ast_node.accept(this);
      value.parts.push(...partValue.parts);
    }

    return value;
  }

  public visitExpression(ctx: ExpressionContext): ValueIR {
    const value = new ValueIR();

    for (const atomCtx of ctx.expression_atom()) {
      const atomValue = this.visitExpression_atom(atomCtx);
      value.parts.push(...atomValue.parts);
    }

    return value;
  }

  public visitExpression_atom(ctx: Expression_atomContext): ValueIR {
    const value = new ValueIR();

    if (ctx.text() != null) {
      value.parts.push(textPart(ctx.text()!.text));
      return value;
    }

    if (ctx.exprs_nested() != null) {
      const nameExpr = this.visitExprs_nested(ctx.exprs_nested()!);
      value.parts.push(varRefPart(nameExpr));
      return value;
    }

    if (ctx.function() != null) {
      if (this.dispatcher.has(ctx.function()!.function_name()!.text)) {
        const handler = this.dispatcher.getHandler(
          ctx.function()!.function_name()!.text,
        );
        const functionIR = handler.compile(ctx.function()!);
        value.parts.push(functionCallPart(functionIR));
      } else {
        const varName = new ValueIR();
        varName.parts.push(textPart(ctx.function()!.function_name()!.text));
        value.parts.push(varRefPart(varName));
      }

      return value;
    }

    return value;
  }

  public visitExprs_nested(ctx: Exprs_nestedContext): ValueIR {
    const value = new ValueIR();

    for (const nestedCtx of ctx.expr_nested()) {
      const nestedValue = this.visitExpr_nested(nestedCtx);
      value.parts.push(...nestedValue.parts);
    }

    return value;
  }

  public visitExpr_nested(ctx: Expr_nestedContext): ValueIR {
    const value = new ValueIR();

    for (const atomCtx of ctx.expr_nested_atom()) {
      const atomValue = this.visitExpr_nested_atom(atomCtx);
      value.parts.push(...atomValue.parts);
    }

    return value;
  }

  public visitExpr_nested_atom(ctx: Expr_nested_atomContext): ValueIR {
    const value = new ValueIR();

    if (ctx.text_nested() != null) {
      value.parts.push(textPart(ctx.text_nested()!.text));
      return value;
    }

    if (ctx.exprs_nested() != null) {
      const nameExpr = this.visitExprs_nested(ctx.exprs_nested()!);
      value.parts.push(varRefPart(nameExpr));
      return value;
    }

    if (ctx.function() != null) {
      if (this.dispatcher.has(ctx.function()!.function_name()!.text)) {
        const handler = this.dispatcher.getHandler(
          ctx.function()!.function_name()!.text,
        );
        const functionIR = handler.compile(ctx.function()!);
        value.parts.push(functionCallPart(functionIR));
      } else {
        const varName = new ValueIR();
        varName.parts.push(textPart(ctx.function()!.function_name()!.text));
        value.parts.push(varRefPart(varName));
      }

      return value;
    }

    return value;
  }

  public visitWs(ctx: WsContext): ValueIR {
    const part = textPart(ctx.text);
    const val = new ValueIR();
    val.parts.push(part);
    return val;
  }
}
