import { FunctionContext } from "@parser/cbuildParser";
import { FunctionIR } from "@compiler/ir";
import type { MakeFunction } from "@gnu-make-functions/type";

export interface I_compiler_base {
  compile(ctx: FunctionContext, func: MakeFunction): FunctionIR;
}
