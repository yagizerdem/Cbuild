import { FunctionIR } from "@compiler/ir.js";
import { FunctionContext } from "@parser/cbuildParser.js";
import type { MakeFunction } from "@gnu-make-functions/type.js";
import { compile_fn } from "@gnu-make-functions/compiler/compile_fn.js";

export class compile_findstring extends compile_fn {
  public override compile(
    ctx: FunctionContext,
    func: MakeFunction,
  ): FunctionIR {
    const ir = super.compile(ctx, func);

    return ir;
  }
}
