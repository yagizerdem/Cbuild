import { FunctionIR } from "@compiler/ir";
import { FunctionContext } from "@parser/cbuildParser";
import { cbuildException, ErrorType } from "@src/cbuild-exception";
import type { MakeFunction } from "@gnu-make-functions/type";
import { compile_fn } from "@gnu-make-functions/compiler/compile_fn";
import { util } from "@gnu-make-functions/compiler/util";

export class compile_wordlist extends compile_fn {
  public override compile(
    ctx: FunctionContext,
    func: MakeFunction,
  ): FunctionIR {
    const ir = super.compile(ctx, func);
    util.cleanWS(ir);

    if (ir.args[0].parts.length !== 1) {
      throw new cbuildException(
        ErrorType.SEMANTIC,
        "wordlist: expected exactly one expression as the first argument",
        ctx.start.line,
        ctx.start.charPositionInLine + 1,
      );
    }

    if (ir.args[1].parts.length !== 1) {
      throw new cbuildException(
        ErrorType.SEMANTIC,
        "wordlist: expected exactly one expression as the second argument",
        ctx.start.line,
        ctx.start.charPositionInLine + 1,
      );
    }

    return ir;
  }
}
