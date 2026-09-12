import { FunctionIR } from "@compiler/ir.js";
import { FunctionContext } from "@parser/cbuildParser.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import type { MakeFunction } from "@gnu-make-functions/type.js";
import { compile_fn } from "@gnu-make-functions/compiler/compile_fn.js";

export class compile_filter_out extends compile_fn {
  public override compile(
    ctx: FunctionContext,
    func: MakeFunction,
  ): FunctionIR {
    const ir = super.compile(ctx, func);

    if (ir.args.length !== 2) {
      throw CbuildException.from({
        column: ctx.start?.column || 0,
        row: ctx.start?.line || 0,
        errorType: ErrorType.SEMANTIC,
        machineCode: MachineCode.FUNCTION_COMPILATION_ERROR,
        message:
          "buildFile: filter-out: expected exactly 2 arguments: pattern..., text",
      });
    }

    return ir;
  }
}
