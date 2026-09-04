import { FunctionIR } from "@compiler/ir.js";

export class util {
  public static cleanWS(ir: FunctionIR): void {
    for (const val_ir of ir.args) {
      for (let i = val_ir.parts.length - 1; i >= 0; i--) {
        const x = val_ir.parts[i];
        if (x.kind === "text") {
          if (x.lexeme.trim().length === 0) {
            val_ir.parts.splice(i, 1);
          }
        }
      }
    }
  }
}
