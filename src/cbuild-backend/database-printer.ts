// codex generated

import type { Env, SymbolTableVariable } from "@cbuild-backend/env.js";
import type {
  ImplicitPatterRule,
  NormalRule,
  VpathRule,
} from "@cbuild-backend/model.js";
import type {
  ConditionalIR,
  IR,
  RecipeIR,
  ValueIR,
  ValuePart,
} from "@compiler/ir.js";

export interface DatabasePrinterData {
  context: Env;
  /** Supply all normalized rules, not only the selected target's subgraph. */
  explicitRules: readonly NormalRule[];
  implicitRules?: readonly ImplicitPatterRule[];
  vpaths?: readonly VpathRule[];
}

export type DatabaseWriter = (text: string) => void;

/**
 * Formats the evaluated build database without expanding values, executing IR,
 * or changing build state. This is diagnostic output, not a lossless buildfile.
 * Call after evaluation and normalization; printing does not stop the build.
 * Source filenames and variable definition locations are not stored by the
 * current models, so only known rule locations are included.
 */
export class DatabasePrinter {
  public constructor(
    private readonly write: DatabaseWriter = (text) => {
      process.stdout.write(text);
    },
  ) {}

  /** Checks --print-data-base. Returns whether a database was printed. */
  public printIfEnabled(data: DatabasePrinterData): boolean {
    if (!data.context.cliOptions.printDataBase) return false;
    this.print(data);
    return true;
  }

  /** Writes the complete database once, including its trailing newline. */
  public print(data: DatabasePrinterData): void {
    this.write(this.format(data));
  }

  /** Returns a stable textual snapshot without writing to stdout. */
  public format(data: DatabasePrinterData): string {
    return [
      "# CBuild database",
      this.formatVariables(data.context),
      this.formatImplicitRules(data.implicitRules ?? []),
      this.formatExplicitRules(data.explicitRules),
      this.formatVpaths(data.vpaths ?? []),
      "# End of database\n",
    ].join("\n\n");
  }

  public formatVariables(context: Env): string {
    // Sort a copy; never reorder the environment's symbol table.
    const entries = Array.from(context.variableEntries()).sort(([a], [b]) =>
      a < b ? -1 : a > b ? 1 : 0,
    );
    return this.formatSection(
      "Variables",
      entries.map(([name, variable]) => this.formatVariable(name, variable)),
    );
  }

  public formatExplicitRules(rules: readonly NormalRule[]): string {
    return this.formatSection(
      "Explicit Rules",
      rules.map((rule) =>
        this.formatRule(
          rule.target,
          rule.ruleSeperator,
          rule.prerequisites,
          rule.orderOnlyPrerequisites,
          rule.evaluatedRecipeIRs,
          rule.ruleIR,
          rule.stem,
        ),
      ),
    );
  }

  public formatImplicitRules(rules: readonly ImplicitPatterRule[]): string {
    // Declaration order can affect implicit rule selection: preserve it.
    return this.formatSection(
      "Implicit Rules",
      rules.map((rule) =>
        this.formatRule(
          rule.targetPattern,
          rule.ruleIR.separator,
          rule.prerequisites,
          rule.orderOnlyPrerequisites,
          rule.evaluatedRecipeIRs,
          rule.ruleIR,
        ),
      ),
    );
  }

  public formatVpaths(rules: readonly VpathRule[]): string {
    return this.formatSection(
      "VPATH Search Paths",
      rules.map((rule) => [`vpath ${rule.pattern}`, ...rule.dirs].join(" ")),
    );
  }

  private formatSection(title: string, entries: readonly string[]): string {
    return `# ${title}\n\n${entries.length ? entries.join("\n\n") : "# (none)"}`;
  }

  private formatVariable(name: string, variable: SymbolTableVariable): string {
    const metadata = `# origin: ${variable.origin}, flavor: ${variable.flavor}, exported: ${variable.isExported}`;
    const operator = variable.flavor === "recursive" ? "=" : ":=";
    const prefix = variable.isExported ? "export " : "";
    const value = this.formatValue(variable.value);

    if (/[\r\n]/.test(value)) {
      return `${metadata}\n${prefix}define ${name} ${operator}\n${value}\nendef`;
    }

    return `${metadata}\n${prefix}${name} ${operator} ${value}`;
  }

  private formatRule(
    target: string,
    separator: string,
    prerequisites: readonly string[],
    orderOnlyPrerequisites: readonly string[],
    recipes: readonly RecipeIR[],
    source: IR,
    stem?: string,
  ): string {
    const lines: string[] = [];
    if (source.row > 0) {
      lines.push(`# definition line: ${source.row}, column: ${source.col}`);
    }
    if (stem !== undefined) lines.push(`# stem: ${stem}`);

    let header = `${target}${separator}`;
    if (prerequisites.length) header += ` ${prerequisites.join(" ")}`;
    if (orderOnlyPrerequisites.length) {
      header += ` | ${orderOnlyPrerequisites.join(" ")}`;
    }
    lines.push(header);
    for (const recipe of recipes) lines.push(...this.formatRecipe(recipe));
    return lines.join("\n");
  }

  private formatValue(value: ValueIR): string {
    return value.parts.map((part) => this.formatValuePart(part)).join("");
  }

  private formatValuePart(part: ValuePart): string {
    switch (part.kind) {
      case "text":
        return part.lexeme;
      case "variable-reference": {
        const name = this.formatValue(part.nameExpr);
        if (part.parenType === "{") return `\${${name}}`;
        if (part.parenType === "(") return `$(${name})`;
        return name.length === 1 ? `$${name}` : `$(${name})`;
      }
      case "function-call": {
        const args = part.function.args.map((arg) => this.formatValue(arg));
        return `$(${part.function.name}${args.length ? ` ${args.join(",")}` : ""})`;
      }
    }
  }

  private formatRecipe(ir: RecipeIR): string[] {
    const recipe = ir.recipe;
    switch (recipe.kind) {
      case "command":
        return this.formatValue(recipe.command)
          .split(/\r\n|\n|\r/)
          .map((line) => `\t${line}`);
      case "comment":
        return recipe.comment
          .split(/\r\n|\n|\r/)
          .map(
            (line) =>
              `\t${line.trimStart().startsWith("#") ? line : `# ${line}`}`,
          );
      case "empty-line":
        return [""];
      case "conditional":
        return this.formatConditional(recipe.conditional);
    }
  }

  private formatConditional(ir: ConditionalIR): string[] {
    if (!ir.condition) {
      throw new TypeError(
        "Cannot print a conditional recipe without a condition",
      );
    }
    const left = this.formatValue(ir.condition.left);
    const right = ir.condition.right
      ? this.formatValue(ir.condition.right)
      : "";
    const condition =
      ir.kind === "ifeq" || ir.kind === "ifneq" ? `(${left},${right})` : left;
    const lines = [
      `${ir.kind} ${condition}`,
      ...this.formatRecipeBranch(ir.thenBranch),
    ];
    if (ir.elseBranch.length) {
      lines.push("else", ...this.formatRecipeBranch(ir.elseBranch));
    }
    lines.push("endif");
    return lines;
  }

  private formatRecipeBranch(branch: readonly IR[]): string[] {
    return branch.flatMap((node) => {
      if (!("recipe" in node)) {
        throw new TypeError("Expected RecipeIR in a conditional recipe branch");
      }
      return this.formatRecipe(node as RecipeIR);
    });
  }
}

export default DatabasePrinter;
