import { FunctionIR } from "@compiler/ir";
import { FunctionContext } from "@parser/cbuildParser";
import { cbuildException, ErrorType } from "@src/cbuild-exception";
import type { MakeFunction } from "@gnu-make-functions/type";
import { compile_fn } from "@gnu-make-functions/compiler/compile_fn";
import { util } from "@gnu-make-functions/compiler/util";

export class compile_call extends compile_fn {
  public override compile(
    ctx: FunctionContext,
    func: MakeFunction,
  ): FunctionIR {
    const ir = super.compile(ctx, func);
    util.cleanWS(ir);

    if (ir.args.length === 0) {
      throw new cbuildException(
        ErrorType.SEMANTIC,
        "call: expected at least 1 argument: var[, param...]",
        ctx.start.line,
        ctx.start.charPositionInLine + 1,
      );
    }

    return ir;
  }
}
