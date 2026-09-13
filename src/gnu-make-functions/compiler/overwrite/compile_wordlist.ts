import { FunctionIR } from "@compiler/ir.js";
import { FunctionContext } from "@parser/cbuildParser.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import type { MakeFunction } from "@gnu-make-functions/type.js";
import { compile_fn } from "@gnu-make-functions/compiler/compile_fn.js";
import { util } from "@gnu-make-functions/compiler/util.js";

export class compile_wordlist extends compile_fn {
  public override compile(
    ctx: FunctionContext,
    func: MakeFunction,
  ): FunctionIR {
    const ir = super.compile(ctx, func);
    util.cleanWS(ir);

    if (ir.args[0].parts.length !== 1) {
      throw CbuildException.from({
        errorType: ErrorType.SEMANTIC,
        message:
          "buildFile: wordlist: expected exactly one expression as the first argument",
        row: ctx.start?.line || 0,
        column: (ctx.start?.column || 0) + 1,
        machineCode: MachineCode.FUNCTION_COMPILATION_ERROR,
      });
    }

    if (ir.args[1].parts.length !== 1) {
      throw CbuildException.from({
        errorType: ErrorType.SEMANTIC,
        message:
          "buildFile: wordlist: expected exactly one expression as the second argument",
        row: ctx.start?.line || 0,
        column: (ctx.start?.column || 0) + 1,
        machineCode: MachineCode.FUNCTION_COMPILATION_ERROR,
      });
    }

    return ir;
  }
}
