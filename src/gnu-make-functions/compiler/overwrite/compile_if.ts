import { FunctionIR } from "@compiler/ir.js";
import { FunctionContext } from "@parser/cbuildParser.js";
import { cbuildException, ErrorType } from "@src/cbuild-exception.js";
import type { MakeFunction } from "@gnu-make-functions/type.js";
import { compile_fn } from "@gnu-make-functions/compiler/compile_fn.js";
import { util } from "@gnu-make-functions/compiler/util.js";

export class compile_if extends compile_fn {
  public override compile(
    ctx: FunctionContext,
    func: MakeFunction,
  ): FunctionIR {
    const ir = super.compile(ctx, func);
    util.cleanWS(ir);

    if (ir.args.length !== 2 && ir.args.length !== 3) {
      throw new cbuildException(
        ErrorType.SEMANTIC,
        "if: expected 2 or 3 arguments: cond, then-part[, else-part]",
        ctx.start?.line || 0,
        (ctx.start?.column || 0) + 1,
      );
    }

    return ir;
  }
}
