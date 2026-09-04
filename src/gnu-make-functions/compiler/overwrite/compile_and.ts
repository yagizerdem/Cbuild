import { FunctionIR } from "@compiler/ir.js";
import { FunctionContext } from "@parser/cbuildParser.js";
import { cbuildException, ErrorType } from "@src/cbuild-exception.js";
import type { MakeFunction } from "@gnu-make-functions/type.js";
import { compile_fn } from "@gnu-make-functions/compiler/compile_fn.js";
import { util } from "@gnu-make-functions/compiler/util.js";

export class compile_and extends compile_fn {
  public override compile(
    ctx: FunctionContext,
    func: MakeFunction,
  ): FunctionIR {
    const ir = super.compile(ctx, func);
    util.cleanWS(ir);

    if (ir.args.length === 0) {
      throw new cbuildException(
        ErrorType.SEMANTIC,
        "and: expected at least 1 argument: cond1[, cond2...]",
        ctx.start?.line || 0,
        (ctx.start?.column || 0) + 1,
      );
    }

    return ir;
  }
}
