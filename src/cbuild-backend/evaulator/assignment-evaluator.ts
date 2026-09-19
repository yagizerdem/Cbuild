import {
  AssignmentIR,
  AssignmentPrefix,
  AssignmentType,
  ValueIR,
} from "@src/compiler/ir.js";
import {
  Env,
  VariableOrigin,
  variableOriginPriorityMap,
} from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { ProcessRunner } from "@cbuild-backend/process.js";

export default class AssignmentIREvaluator {
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

    const prefix: AssignmentPrefix | undefined =
      this.assignmentIR.prefix ?? undefined;

    if (this.assignmentIR.type == AssignmentType.SIMPLE) {
      const value = this.assignmentIR.right!.exec<string>(
        this.valueExpansionEngine,
      );

      this.setRawVariable(identifier, value, this.shouldExport(prefix));
    } else if (this.assignmentIR.type === AssignmentType.POSIX_SIMPLE) {
      const value = this.assignmentIR.right!.exec<string>(
        this.valueExpansionEngine,
      );
      this.setRawVariable(identifier, value, this.shouldExport(prefix));
    } else if (this.assignmentIR.type === AssignmentType.CONDITIONAL) {
      if (!this.context.hasVariable(identifier)) {
        this.setDeferredVariable(
          identifier,
          this.assignmentIR.right ??
            new ValueIR([{ kind: "text", lexeme: "" }]),
          this.shouldExport(prefix),
        );
      }
    } else if (this.assignmentIR.type === AssignmentType.APPEND) {
      const right =
        this.assignmentIR.right ?? new ValueIR([{ kind: "text", lexeme: "" }]);
      this.appendVariable(identifier, right);

      this.context.setVariableExported(identifier, this.shouldExport(prefix));
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
        this.shouldExport(prefix),
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
        this.shouldExport(prefix),
      );
    } else if (this.assignmentIR.type == AssignmentType.RECURSIVE) {
      this.setDeferredVariable(
        identifier,
        this.assignmentIR.right!,
        this.shouldExport(prefix),
      );
    }
  }

  private setRawVariable(
    identifier: string,
    value: string,
    isExported: boolean = false,
  ) {
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
        isExported,
      );
      return;
    }

    if (prefixPriority >= variablePriority) {
      this.context.setRawVariable(
        identifier,
        value,
        this.assignmentPrefixToVariableOrigin(prefix),
        isExported,
      );
    }
  }

  private setDeferredVariable(
    identifier: string,
    value: ValueIR,
    isExported: boolean = false,
  ) {
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
        isExported,
      );
      return;
    }

    if (prefixPriority >= variablePriority) {
      this.context.setDeferredVariable(
        identifier,
        value,
        this.assignmentPrefixToVariableOrigin(prefix),
        isExported,
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
        this.shouldExport(prefix),
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

  private shouldExport(prefix: AssignmentPrefix | undefined): boolean {
    if (prefix === undefined) return false;
    if (prefix === "unexport") return false;
    return (
      prefix === "export override" ||
      prefix === "export" ||
      prefix === "override export"
    );
  }
}
