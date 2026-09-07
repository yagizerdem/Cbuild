import { cbuildException, ErrorType } from "@src/cbuild-exception.js";
import {
  AssignmentIR,
  AssignmentType,
  functionCallPart,
  IR,
  NormalRuleIR,
  ValuePart,
} from "@src/compiler/ir.js";

export function isCompatible(instructions: IR[]): boolean {
  try {
    validateCompatibility(instructions);
    return true;
  } catch (error: unknown) {
    if (error instanceof cbuildException) {
      return false;
    }

    throw error;
  }
}

function incompatible(ir: IR, message: string): cbuildException {
  return new cbuildException(ErrorType.SEMANTIC, message, ir.row, ir.col);
}

function validateCompatibility(instructions: IR[]): void {
  for (const ir of instructions) {
    validateIR(ir);
  }
}

function validateIR(ir: IR): void {
  if (!allowedIR(ir)) {
    throw incompatible(
      ir,
      `Unsupported IR type for minimal-backend: ${ir.constructor.name}. Stop.`,
    );
  }

  if (ir instanceof AssignmentIR) {
    validateAssignment(ir);
    return;
  }

  if (ir instanceof NormalRuleIR) {
    validateNormalRule(ir);
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
    throw incompatible(
      assignmentIR,
      `Assignment prefixes are not supported by the ySharp backend: ${prefix}`,
    );
  }

  if (!validateAssignmentFlavor(assignmentIR.type)) {
    incompatible(
      assignmentIR,
      `Unsupported assignment type for minimal-backend: ${assignmentIR.type}`,
    );
  }
}

function validateNormalRule(normalRuleIR: NormalRuleIR): void {
  if (normalRuleIR.orderOnlyPrerequisites.length > 0) {
    throw incompatible(
      normalRuleIR,
      "Order-only prerequisites are not supported by the ySharp backend",
    );
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
      throw incompatible(
        normalRuleIR,
        "Conditional recipes are not supported by the cbuild backend",
      );
    }
  }
}

function validateParts(parts: ValuePart[], owner: IR, context: string): void {
  for (const part of parts) {
    if ("kind" in part && part.kind === "function-call") {
      throw incompatible(
        owner,
        `${context} contains an unsupported function call: ${part}`,
      );
    }
  }
}

function validateAssignmentFlavor(type: AssignmentType): boolean {
  return type === AssignmentType.RECURSIVE || type === AssignmentType.SIMPLE;
}

function allowedIR(ir: IR): boolean {
  return ir instanceof AssignmentIR || ir instanceof NormalRuleIR;
}
