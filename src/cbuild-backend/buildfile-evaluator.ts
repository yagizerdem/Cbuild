import {
  AssignmentIR,
  AssignmentType,
  ConditionalIR,
  DefineIR,
  HookIR,
  IR,
} from "@src/compiler/ir.js";
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
    } else if (ir instanceof ConditionalIR) {
      const activeBranch: IR[] = evaluateActiveBranch(
        ir,
        valueExpansionEngine,
        context,
      );
      const evaluatedIR = await evaluateBuildFile(activeBranch, context);
      evaluatedIRs.push(...evaluatedIR);
    } else if (ir instanceof DefineIR) {
      const expandedValue = ir.value?.exec<string>(valueExpansionEngine) ?? "";
      const identifier = ir.name?.exec<string>(valueExpansionEngine) ?? "";
      context.setRawVariable(identifier, expandedValue);
    } else if (allowedIR(ir)) {
      evaluatedIRs.push(ir);
    } else {
      unsupported(ir);
    }
  }
  return evaluatedIRs;
}

function evaluateActiveBranch(
  ir: ConditionalIR,
  valueExpansionEngine: ValueExpansionEngine,
  context: Env,
): IR[] {
  // identififer names
  const expandedLeftCondition =
    ir.condition?.left?.exec<string>(valueExpansionEngine) ?? "";
  const expandedRightCondition =
    ir.condition?.right?.exec<string>(valueExpansionEngine) ?? undefined;
  // if right condition is undefined it must be ifdef kw

  let leftValue = "";
  if (context.hasVariable(expandedLeftCondition)) {
    const symbolTableVar = context.getVariable(expandedLeftCondition);
    if (symbolTableVar?.isDeferred() && symbolTableVar.deferredValue) {
      leftValue = valueExpansionEngine.exec(symbolTableVar.deferredValue);
    } else {
      leftValue = context.getRawVariable(expandedLeftCondition) ?? "";
    }
  }

  let rightValue = "";
  if (expandedRightCondition && context.hasVariable(expandedRightCondition)) {
    const symbolTableVar = context.getVariable(expandedRightCondition);
    if (symbolTableVar?.isDeferred() && symbolTableVar.deferredValue) {
      rightValue = valueExpansionEngine.exec(symbolTableVar.deferredValue);
    } else {
      rightValue = context.getRawVariable(expandedRightCondition) ?? "";
    }
  }

  if (ir.kind == "ifeq") {
    if (leftValue === rightValue) {
      return ir.thenBranch;
    } else {
      return ir.elseBranch;
    }
  }

  if (ir.kind == "ifneq") {
    if (leftValue !== rightValue) {
      return ir.thenBranch;
    } else {
      return ir.elseBranch;
    }
  }

  if (ir.kind == "ifdef") {
    if (leftValue) {
      return ir.thenBranch;
    } else {
      return ir.elseBranch;
    }
  }

  if (ir.kind == "ifndef") {
    if (!leftValue) {
      return ir.thenBranch;
    } else {
      return ir.elseBranch;
    }
  }

  return [];
}
