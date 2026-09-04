import { FunctionContext } from "@parser/cbuildParser.js";
import { FunctionIR } from "@compiler/ir.js";
import type { MakeFunction } from "@gnu-make-functions/type.js";

export interface I_compiler_base {
  compile(ctx: FunctionContext, func: MakeFunction): FunctionIR;
}
