export interface Executor {
  exec<T>(node: IR): T;
}

export interface IR {
  row: number;
  col: number;
  exec<T>(executor: Executor): T;
}

export abstract class BaseIR implements IR {
  constructor(
    public row = 0,
    public col = 0,
  ) {
    this.row = row;
    this.col = col;
  }

  abstract exec<T>(executor: Executor): T;
}

export type ValuePart =
  | { kind: "text"; lexeme: string }
  | { kind: "variable-reference"; nameExpr: ValueIR }
  | { kind: "function-call"; function: FunctionIR };

export const textPart = (lexeme: string): ValuePart => ({
  kind: "text",
  lexeme,
});

export const varRefPart = (nameExpr: ValueIR): ValuePart => ({
  kind: "variable-reference",
  nameExpr,
});

export const functionCallPart = (func: FunctionIR): ValuePart => ({
  kind: "function-call",
  function: func,
});

export class ValueIR extends BaseIR {
  constructor(public readonly parts: ValuePart[] = []) {
    super();
  }

  exec<T>(executor: Executor): T {
    return executor.exec(this);
  }
}

export class FunctionIR extends BaseIR {
  public readonly args: ValueIR[] = [];

  constructor(public name: string) {
    super();
  }

  exec<T>(executor: Executor): T {
    return executor.exec(this);
  }
}

export const AssignmentType = {
  RECURSIVE: "=",
  SIMPLE: ":=",
  POSIX_SIMPLE: "::=",
  IMMEDIATE_ESCAPED: ":::=",
  CONDITIONAL: "?=",
  APPEND: "+=",
  SHELL: "!=",
} as const;

export type AssignmentType =
  (typeof AssignmentType)[keyof typeof AssignmentType];

export function assignmentTypeFromSymbol(symbol: string): AssignmentType {
  const normalized = normalizeSymbol(symbol, "Assignment type");
  const result = Object.values(AssignmentType).find(
    (value) => value === normalized,
  );

  if (!result) {
    throw new Error(`Unknown assignment type: ${symbol}`);
  }

  return result;
}

export const AssignmentPrefix = {
  OVERRIDE: "override",
  EXPORT: "export",
  UNEXPORT: "unexport",
  OVERRIDE_EXPORT: "override export",
  EXPORT_OVERRIDE: "export override",
  UNDEFINE: "undefine",
  OVERRIDE_UNDEFINE: "override undefine",
  UNDEFINE_OVERRIDE: "undefine override",
} as const;

export type AssignmentPrefix =
  (typeof AssignmentPrefix)[keyof typeof AssignmentPrefix];

export function assignmentPrefixFromSymbol(symbol: string): AssignmentPrefix {
  const normalized = normalizeSymbol(symbol, "Assignment prefix");
  const result = Object.values(AssignmentPrefix).find(
    (value) => value === normalized,
  );

  if (!result) {
    throw new Error(`Unknown assignment prefix: ${symbol}`);
  }

  return result;
}

function normalizeSymbol(symbol: string, name: string): string {
  if (symbol == null) {
    throw new Error(`${name} cannot be null`);
  }

  return symbol.trim().replace(/\s+/g, " ");
}

export class AssignmentIR extends BaseIR {
  constructor(
    public left?: ValueIR,
    public right?: ValueIR,
    public prefix?: AssignmentPrefix,
    public type?: AssignmentType,
    row?: number,
    col?: number,
  ) {
    super(row, col);
  }

  exec<T>(executor: Executor): T {
    return executor.exec(this);
  }
}

export const ConditionKind = {
  IFEQ: "ifeq",
  IFNEQ: "ifneq",
  IFDEF: "ifdef",
  IFNDEF: "ifndef",
} as const;

export type ConditionKind = (typeof ConditionKind)[keyof typeof ConditionKind];

export function conditionKindFromKeyword(keyword: string): ConditionKind {
  if (keyword == null || keyword.trim() === "") {
    throw new Error("Condition keyword cannot be null or blank");
  }

  const normalized = keyword.trim().toLowerCase();
  const result = Object.values(ConditionKind).find(
    (value) => value === normalized,
  );

  if (!result) {
    throw new Error(`Unknown condition keyword: ${keyword}`);
  }

  return result;
}

export interface Condition {
  left?: ValueIR;
  right?: ValueIR;
}

export class ConditionalIR extends BaseIR {
  public thenBranch: IR[] = [];
  public elseBranch: IR[] = [];

  constructor(
    public kind?: ConditionKind,
    public condition?: Condition,
    row?: number,
    col?: number,
  ) {
    super(row, col);
  }

  exec<T>(executor: Executor): T {
    return executor.exec(this);
  }
}

export interface Rule extends IR {
  targets: ValueIR[];
  recipes: RecipeIR[];
}

export const RuleSeparator = {
  SINGLE_COLON: ":",
  DOUBLE_COLON: "::",
  GROUPED_COLON: "&:",
  GROUPED_DOUBLE_COLON: "&::",
} as const;

export type RuleSeparator = (typeof RuleSeparator)[keyof typeof RuleSeparator];

export function ruleSeparatorFromSymbol(symbol: string): RuleSeparator {
  if (symbol == null || symbol.trim() === "") {
    throw new Error("Rule separator cannot be null or blank");
  }

  const normalized = symbol.trim();
  const result = Object.values(RuleSeparator).find(
    (value) => value === normalized,
  );

  if (!result) {
    throw new Error(`Unknown rule separator: ${symbol}`);
  }

  return result;
}

export interface NormalRuleOptions {
  targets?: ValueIR[];
  prerequisites?: ValueIR[];
  orderOnlyPrerequisites?: ValueIR[];
  separator?: RuleSeparator;
  recipes?: RecipeIR[];
}

export class NormalRuleIR extends BaseIR implements Rule {
  public readonly targets: ValueIR[];
  public readonly prerequisites: ValueIR[];
  public readonly orderOnlyPrerequisites: ValueIR[];
  public separator: RuleSeparator;
  public readonly recipes: RecipeIR[];

  constructor(options: NormalRuleOptions = {}, row?: number, col?: number) {
    super(row, col);
    this.targets = options.targets ?? [];
    this.prerequisites = options.prerequisites ?? [];
    this.orderOnlyPrerequisites = options.orderOnlyPrerequisites ?? [];
    this.separator = options.separator ?? RuleSeparator.SINGLE_COLON;
    this.recipes = options.recipes ?? [];
  }

  exec<T>(executor: Executor): T {
    return executor.exec(this);
  }
}

export interface TargetRuleOptions {
  targets?: ValueIR[];
  assignment?: AssignmentIR;
  separator?: RuleSeparator;
}

export class TargetRuleIR extends BaseIR implements Rule {
  public readonly targets: ValueIR[];
  public assignment?: AssignmentIR;
  public separator?: RuleSeparator;
  public readonly recipes: RecipeIR[] = [];

  constructor(options: TargetRuleOptions = {}, row?: number, col?: number) {
    super(row, col);
    this.targets = options.targets ?? [];
    this.assignment = options.assignment;
    this.separator = options.separator;
  }

  exec<T>(executor: Executor): T {
    return executor.exec(this);
  }
}

export interface StaticPatternRuleOptions {
  targets?: ValueIR[];
  targetPattern?: ValueIR;
  prerequisites?: ValueIR[];
  orderOnlyPrerequisites?: ValueIR[];
  recipes?: RecipeIR[];
  separator?: RuleSeparator;
}

export class StaticPatternRuleIR extends BaseIR implements Rule {
  public readonly targets: ValueIR[];
  public targetPattern?: ValueIR;
  public readonly prerequisites: ValueIR[];
  public readonly orderOnlyPrerequisites: ValueIR[];
  public readonly recipes: RecipeIR[];
  public separator?: RuleSeparator;

  constructor(
    options: StaticPatternRuleOptions = {},
    row?: number,
    col?: number,
  ) {
    super(row, col);
    this.targets = options.targets ?? [];
    this.targetPattern = options.targetPattern;
    this.prerequisites = options.prerequisites ?? [];
    this.orderOnlyPrerequisites = options.orderOnlyPrerequisites ?? [];
    this.recipes = options.recipes ?? [];
    this.separator = options.separator;
  }

  exec<T>(executor: Executor): T {
    return executor.exec(this);
  }
}

export type Recipe =
  | { kind: "command"; command: ValueIR }
  | { kind: "comment"; comment: string }
  | { kind: "empty-line" }
  | { kind: "conditional"; conditional: ConditionalIR };

export class RecipeIR extends BaseIR {
  private constructor(
    public readonly recipe: Recipe,
    row?: number,
    col?: number,
  ) {
    super(row, col);
  }

  static command(command: ValueIR): RecipeIR {
    return new RecipeIR({ kind: "command", command });
  }

  static comment(comment: string): RecipeIR {
    return new RecipeIR({ kind: "comment", comment });
  }

  static emptyLine(): RecipeIR {
    return new RecipeIR({ kind: "empty-line" });
  }

  static conditional(conditional: ConditionalIR): RecipeIR {
    return new RecipeIR({ kind: "conditional", conditional });
  }

  exec<T>(executor: Executor): T {
    return executor.exec(this);
  }
}

export class DefineIR extends BaseIR {
  constructor(
    public specifiers?: AssignmentPrefix,
    public name?: ValueIR,
    public assignmentType?: AssignmentType,
    public value?: ValueIR,
    row?: number,
    col?: number,
  ) {
    super(row, col);
  }

  exec<T>(executor: Executor): T {
    return executor.exec(this);
  }
}

export type Vpath =
  | { type: "clear-all" }
  | { type: "clear-pattern"; pattern: ValueIR }
  | { type: "set-pattern"; pattern: ValueIR; directories: ValueIR[] };

export class VpathIR extends BaseIR {
  private constructor(
    public readonly vpath: Vpath,
    row?: number,
    col?: number,
  ) {
    super(row, col);
  }

  static clearAll(): VpathIR {
    return new VpathIR({ type: "clear-all" });
  }

  static clearPattern(pattern: ValueIR): VpathIR {
    return new VpathIR({ type: "clear-pattern", pattern });
  }

  static setPattern(pattern: ValueIR, directories: ValueIR[]): VpathIR {
    return new VpathIR({ type: "set-pattern", pattern, directories });
  }

  exec<T>(executor: Executor): T {
    return executor.exec(this);
  }
}

export type Include = "include" | "sinclude" | "-include";

export class IncludeIR extends BaseIR {
  constructor(
    public readonly includepath: ValueIR,
    public readonly include: Include,
    row?: number,
    col?: number,
  ) {
    super(row, col);
  }

  static include(includepath: ValueIR, row?: number, col?: number): IncludeIR {
    return new IncludeIR(includepath, "include", row, col);
  }

  static sinclude(includepath: ValueIR, row?: number, col?: number): IncludeIR {
    return new IncludeIR(includepath, "sinclude", row, col);
  }

  static dashInclude(
    includepath: ValueIR,
    row?: number,
    col?: number,
  ): IncludeIR {
    return new IncludeIR(includepath, "-include", row, col);
  }

  exec<T>(executor: Executor): T {
    return executor.exec(this);
  }
}
