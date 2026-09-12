import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import {
  AssignmentIR,
  AssignmentType,
  HookIR,
  IR,
  NormalRuleIR,
  ValuePart,
} from "@src/compiler/ir.js";

export function isCompatible(instructions: IR[]): boolean {
  try {
    validateCompatibility(instructions);
    return true;
  } catch (error: unknown) {
    if (error instanceof CbuildException) {
      // maybe log in the future idk
      throw error;
    }
    throw error;
  }
}

function validateCompatibility(instructions: IR[]): void {
  for (const ir of instructions) {
    validateIR(ir);
  }
}

function validateIR(ir: IR): void {
  if (!allowedIR(ir)) {
    throw CbuildException.from({
      column: ir.col,
      row: ir.row,
      errorType: ErrorType.SEMANTIC,
      machineCode: MachineCode.UNSUPPORTED_IR,
      message: `buildFile: Unsupported IR type for cbuild backend: ${ir}. Stop.`,
    });
  }

  if (ir instanceof AssignmentIR) {
    validateAssignment(ir);
    return;
  }

  if (ir instanceof NormalRuleIR) {
    validateNormalRule(ir);
  }

  if (ir instanceof HookIR) {
    // do not need to validate hookIR parser already handles it
  }
}

function validateAssignment(assignmentIR: AssignmentIR): void {
  validateParts(
    assignmentIR.left?.parts || [],
    assignmentIR,
    "Assignment left-hand side",
  );

  validateParts(
    assignmentIR.right?.parts || [],
    assignmentIR,
    "Assignment right-hand side",
  );

  const prefix = assignmentIR.prefix?.trim() || null;

  if (prefix != null && prefix.trim().length > 0) {
    throw CbuildException.from({
      column: assignmentIR.col,
      row: assignmentIR.row,
      errorType: ErrorType.SEMANTIC,
      machineCode: MachineCode.UNSUPPORTED_IR,
      message: `Assignment prefixes are not supported by the cbuild backend: ${prefix}`,
    });
  }

  if (!validateAssignmentFlavor(assignmentIR.type)) {
    throw CbuildException.from({
      column: assignmentIR.col,
      row: assignmentIR.row,
      errorType: ErrorType.SEMANTIC,
      machineCode: MachineCode.UNSUPPORTED_IR,
      message: `Unsupported assignment type for cbuild backend: ${assignmentIR.type}`,
    });
  }
}

function validateNormalRule(normalRuleIR: NormalRuleIR): void {
  if (normalRuleIR.orderOnlyPrerequisites.length > 0) {
    throw CbuildException.from({
      column: normalRuleIR.col,
      row: normalRuleIR.row,
      errorType: ErrorType.SEMANTIC,
      machineCode: MachineCode.UNSUPPORTED_IR,
      message:
        "Order-only prerequisites are not supported by the cbuild backend",
    });
  }

  for (const target of normalRuleIR.targets) {
    validateParts(target.parts, normalRuleIR, "Rule target");
  }

  for (const prerequisite of normalRuleIR.prerequisites) {
    validateParts(prerequisite.parts, normalRuleIR, "Rule prerequisite");
  }

  for (const recipe of normalRuleIR.recipes) {
    // conditionals are  not supported in cbuild backend
    if ("kind" in recipe && recipe.kind === "conditional") {
      throw CbuildException.from({
        column: normalRuleIR.col,
        row: normalRuleIR.row,
        errorType: ErrorType.SEMANTIC,
        machineCode: MachineCode.UNSUPPORTED_IR,
        message: "Conditional recipes are not supported by the cbuild backend",
      });
    }
  }
}

function validateParts(parts: ValuePart[], owner: IR, context: string): void {
  for (const part of parts) {
    if ("kind" in part && part.kind === "function-call") {
      throw CbuildException.from({
        column: owner.col,
        row: owner.row,
        errorType: ErrorType.SEMANTIC,
        machineCode: MachineCode.UNSUPPORTED_IR,
        message: `${context} contains an unsupported function call: ${part}`,
      });
    }
  }
}

function validateAssignmentFlavor(type: AssignmentType): boolean {
  return type === AssignmentType.RECURSIVE || type === AssignmentType.SIMPLE;
}

function allowedIR(ir: IR): boolean {
  return (
    ir instanceof AssignmentIR ||
    ir instanceof NormalRuleIR ||
    ir instanceof HookIR
  );
}
