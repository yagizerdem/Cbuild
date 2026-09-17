import {
  AssignmentIR,
  AssignmentPrefix,
  AssignmentType,
  ConditionalIR,
  DefineIR,
  HookIR,
  IR,
  ValueIR,
} from "@src/compiler/ir.js";
import {
  Env,
  VariableOrigin,
  variableOriginPriorityMap,
} from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import Interpreter from "@cbuild-backend/interpreter/interpreter.js";
import { allowedIR } from "@cbuild-backend/semantic.js";
import { ProcessRunner } from "./process.js";

export function unsupported(ir: IR) {
  // programmatic error should never send invalid irtype to cbuild backend
  throw new Error("Unsupported IR type");
}

export async function evaluateBuildFile(
  irs: IR[],
  context: Env,
): Promise<IR[]> {
  const evaluatedIRs: IR[] = [];

  for (const ir of irs) {
    const valueExpansionEngine = new ValueExpansionEngine(context);

    if (ir instanceof AssignmentIR) {
      const assignmentIREvaluator = new AssignmentIREvaluator(context, ir);
      await assignmentIREvaluator.evaluate();
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
    if (symbolTableVar?.isDeferred() && symbolTableVar.value) {
      leftValue = valueExpansionEngine.exec(symbolTableVar.value);
    } else {
      leftValue = context.getRawVariable(expandedLeftCondition) ?? "";
    }
  }

  let rightValue = "";
  if (expandedRightCondition && context.hasVariable(expandedRightCondition)) {
    const symbolTableVar = context.getVariable(expandedRightCondition);
    if (symbolTableVar?.isDeferred() && symbolTableVar.value) {
      rightValue = valueExpansionEngine.exec(symbolTableVar.value);
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

class AssignmentIREvaluator {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly assignmentIR: AssignmentIR;
  constructor(context: Env, assignmentIR: AssignmentIR) {
    this.context = context;
    this.valueExpansionEngine = new ValueExpansionEngine(this.context);
    this.assignmentIR = assignmentIR;
  }

  public async evaluate() {
    const identifier = this.assignmentIR.left!.exec<string>(
      this.valueExpansionEngine,
    );

    if (this.assignmentIR.type == AssignmentType.SIMPLE) {
      const value = this.assignmentIR.right!.exec<string>(
        this.valueExpansionEngine,
      );

      this.setRawVariable(identifier, value);
    } else if (this.assignmentIR.type === AssignmentType.POSIX_SIMPLE) {
      const value = this.assignmentIR.right!.exec<string>(
        this.valueExpansionEngine,
      );
      this.setRawVariable(identifier, value);
    } else if (this.assignmentIR.type === AssignmentType.CONDITIONAL) {
      if (!this.context.hasVariable(identifier)) {
        this.context.setDeferredVariable(
          identifier,
          this.assignmentIR.right ??
            new ValueIR([{ kind: "text", lexeme: "" }]),
        );
      }
    } else if (this.assignmentIR.type === AssignmentType.APPEND) {
      const right =
        this.assignmentIR.right ?? new ValueIR([{ kind: "text", lexeme: "" }]);
      this.appendVariable(identifier, right);
    } else if (this.assignmentIR.type === AssignmentType.IMMEDIATE_ESCAPED) {
      const value =
        this.assignmentIR.right?.exec<string>(this.valueExpansionEngine) ?? "";
      this.setDeferredVariable(
        identifier,
        new ValueIR([
          {
            kind: "text",
            lexeme: value,
          },
        ]),
      );
    } else if (this.assignmentIR.type === AssignmentType.SHELL) {
      const command =
        this.assignmentIR.right?.exec<string>(this.valueExpansionEngine) ?? "";

      const runner = new ProcessRunner();
      const result = await runner.runAsync(command, {
        output: "capture",
      });

      const value = result.stdout
        .replace(/\r\n/g, "\n")
        .replace(/\n+$/, "")
        .replace(/\n/g, " ");

      this.setDeferredVariable(
        identifier,
        new ValueIR([
          {
            kind: "text",
            lexeme: value,
          },
        ]),
      );
    } else if (this.assignmentIR.type == AssignmentType.RECURSIVE) {
      this.setDeferredVariable(identifier, this.assignmentIR.right!);
    }
  }

  private setRawVariable(identifier: string, value: string) {
    const hasVariable = this.context.hasVariable(identifier);
    const prefix: AssignmentPrefix | undefined =
      this.assignmentIR.prefix ?? undefined;
    const variablePriority = hasVariable
      ? this.context.getVariablePriority(identifier)
      : -1;
    const prefixPriority = this.getPrefixPriority(prefix);

    if (!hasVariable) {
      this.context.setRawVariable(
        identifier,
        value,
        this.assignmentPrefixToVariableOrigin(prefix),
      );
      return;
    }

    if (prefixPriority >= variablePriority) {
      this.context.setRawVariable(
        identifier,
        value,
        this.assignmentPrefixToVariableOrigin(prefix),
      );
    }
  }

  private setDeferredVariable(identifier: string, value: ValueIR) {
    const hasVariable = this.context.hasVariable(identifier);
    const prefix: AssignmentPrefix | undefined =
      this.assignmentIR.prefix ?? undefined;
    const variablePriority = hasVariable
      ? this.context.getVariablePriority(identifier)
      : -1;
    const prefixPriority = this.getPrefixPriority(prefix);

    if (!hasVariable) {
      this.context.setDeferredVariable(
        identifier,
        value,
        this.assignmentPrefixToVariableOrigin(prefix),
      );
      return;
    }

    if (prefixPriority >= variablePriority) {
      this.context.setDeferredVariable(
        identifier,
        value,
        this.assignmentPrefixToVariableOrigin(prefix),
      );
    }
  }

  private appendVariable(identifier: string, right: ValueIR) {
    const hasVariable = this.context.hasVariable(identifier);
    const prefix: AssignmentPrefix | undefined =
      this.assignmentIR.prefix ?? undefined;
    const variablePriority = hasVariable
      ? this.context.getVariablePriority(identifier)
      : -1;
    const prefixPriority = this.getPrefixPriority(prefix);

    if (!hasVariable) {
      this.context.setDeferredVariable(
        identifier,
        right,
        this.assignmentPrefixToVariableOrigin(prefix),
      );
      return;
    }

    if (prefixPriority >= variablePriority) {
      if (this.context.getVariable(identifier)!.isDeferred()) {
        this.context
          .getVariable(identifier)!
          .appendValues(new ValueIR([{ kind: "text", lexeme: " " }]));
        this.context.getVariable(identifier)!.appendValues(right);
      } else {
        this.context
          .getVariable(identifier)!
          .appendValues(new ValueIR([{ kind: "text", lexeme: " " }]));
        this.context.getVariable(identifier)!.appendValues(right);
      }

      this.context.setVariableOrigin(
        this.context.getVariable(identifier)!,
        this.assignmentPrefixToVariableOrigin(prefix),
      );
    }
  }

  private assignmentPrefixToVariableOrigin(
    prefix: AssignmentPrefix | undefined,
  ): VariableOrigin {
    switch (prefix) {
      case "export override":
      case "override":
        return "override";
      default:
        return "file";
    }
  }

  private getPrefixPriority(prefix: AssignmentPrefix | undefined): number {
    switch (prefix) {
      case "export override":
      case "override":
        return variableOriginPriorityMap["override"];
      default:
        return variableOriginPriorityMap["file"];
    }
  }
}
