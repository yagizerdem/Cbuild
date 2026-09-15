import { AssignmentIR, AssignmentType, HookIR, IR } from "@src/compiler/ir.js";
import { Env } from "./env.js";
import { ValueExpansionEngine } from "./expansion.js";
import Interpreter from "./interpreter/interpreter.js";

// filter based on cbuild backend
export function filterFirstPassIr(irs: IR[]): IR[] {
  const result: IR[] = [];
  for (const ir of irs) {
    if (ir instanceof AssignmentIR) result.push(ir);
    else if (ir instanceof HookIR) result.push(ir);
  }

  return result;
}

export function unsupported(ir: IR) {
  // programmatic error should never send invalid irtype to cbuild backend
  throw new Error("Unsupported IR type");
}

export default async function firstPass(irs: IR[], context: Env) {
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
    } else {
      unsupported(ir);
    }
  }
}
