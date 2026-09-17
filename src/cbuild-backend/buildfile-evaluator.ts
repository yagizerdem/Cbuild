import { AssignmentIR, AssignmentType, HookIR, IR } from "@src/compiler/ir.js";
import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import Interpreter from "@cbuild-backend/interpreter/interpreter.js";
import { allowedIR } from "@cbuild-backend/semantic.js";

export function unsupported(ir: IR) {
  // programmatic error should never send invalid irtype to cbuild backend
  throw new Error("Unsupported IR type");
}

export async function evaluateBuildFile(
  irs: IR[],
  context: Env,
): Promise<IR[]> {
  const evaluatedIRs: IR[] = [];

  const valueExpansionEngine = new ValueExpansionEngine(context);

  for (const ir of irs) {
    if (ir instanceof AssignmentIR) {
      const identifier = ir.left!.exec<string>(valueExpansionEngine);
      if (ir.type == AssignmentType.SIMPLE) {
        const value = ir.right!.exec<string>(valueExpansionEngine);
        context.setRawVariable(identifier, value);
      }
      if (ir.type == AssignmentType.RECURSIVE) {
        context.setDeferredVariable(identifier, ir.right!);
      }
    } else if (ir instanceof HookIR) {
      const interpreter = new Interpreter();
      interpreter.init(context);
      await interpreter.runAsync(ir.hookProgram);
    } else if (allowedIR(ir)) {
      evaluatedIRs.push(ir);
    } else {
      unsupported(ir);
    }
  }
  return evaluatedIRs;
}
