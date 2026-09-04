import { FunctionIR } from "@compiler/ir";
import { FunctionContext } from "@parser/cbuildParser";
import { cbuildException, ErrorType } from "@src/cbuild-exception";
import type { MakeFunction } from "@gnu-make-functions/type";
import { compile_fn } from "@gnu-make-functions/compiler/compile_fn";
import { util } from "@gnu-make-functions/compiler/util";

export class compile_wildcard extends compile_fn {
  public override compile(
    ctx: FunctionContext,
    func: MakeFunction,
  ): FunctionIR {
    const ir = super.compile(ctx, func);
    util.cleanWS(ir);

    if (ir.args.length !== 1) {
      throw new cbuildException(
        ErrorType.SEMANTIC,
        "wildcard: expected exactly 1 argument: pattern",
        ctx.start.line,
        ctx.start.charPositionInLine + 1,
      );
    }

    return ir;
  }
}
