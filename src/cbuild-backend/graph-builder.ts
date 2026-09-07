import {
  AssignmentIR,
  NormalRuleIR,
  type Executor,
  type IR,
  type ValueIR,
} from "@compiler/ir.js";
import { cbuildException, ErrorType } from "@src/cbuild-exception.js";
import { Env } from "./env.js";
import {
  ExpansionEngine,
  ValueExpansionEngine,
} from "@cbuild-backend/expansion.js";
import { BaseModel, NormalRule } from "@cbuild-backend/model.js";

export class GraphBuilder implements Executor {
  public readonly ruleModels: BaseModel[] = [];

  public constructor(public readonly context: Env) {}

  public build(instructions: readonly IR[]): BaseModel[] {
    for (const instruction of instructions) {
      this.collectModels(this.ruleModels, instruction.exec<BaseModel>(this));
    }
    return this.ruleModels;
  }

  public collectModels(target: BaseModel[], resources: unknown): BaseModel[] {
    if (Array.isArray(resources)) {
      for (const item of resources) {
        if (item instanceof BaseModel) target.push(item);
      }
    } else if (resources instanceof BaseModel) {
      target.push(resources);
    }
    return target;
  }

  public exec<T>(ir: IR): T {
    if (ir instanceof NormalRuleIR) {
      return this.buildNormalRule(ir) as T;
    }
    if (ir instanceof AssignmentIR) {
      ir.exec(new ExpansionEngine(this.context));
      return null as T;
    }
    throw new cbuildException(
      ErrorType.SEMANTIC,
      `Unsupported IR type for model builder: ${ir.constructor.name}`,
      ir.row,
      ir.col,
    );
  }

  private buildNormalRule(ir: NormalRuleIR): BaseModel[] {
    const expansion = new ValueExpansionEngine(this.context);
    const expandWords = (values: readonly ValueIR[]): string[] =>
      values.flatMap((value) =>
        expansion.expand(value).split(/\s+/).filter(Boolean),
      );

    const targets = expandWords(ir.targets);
    const prerequisites = expandWords(ir.prerequisites);

    return targets.map(
      (target) =>
        new NormalRule({
          target,
          prerequisites: [...prerequisites],
          normalRuleIR: ir,
          recipeIRS: [...ir.recipes],
          shellCommands: [], // do not use raw shell commands, expand from recipeIR before execution
        }),
    );
  }
}

export function hasCircularDependency(rules: NormalRule[]): boolean {
  const graph = new Map<string, string[]>();

  for (const rule of rules) {
    const prerequisites = graph.get(rule.target) ?? [];
    prerequisites.push(...rule.prerequisites);
    graph.set(rule.target, prerequisites);
  }

  const visited = new Set<string>();
  const activePath = new Set<string>();

  for (const target of graph.keys()) {
    if (hasCircularDependencyRecursive(target, graph, visited, activePath)) {
      return true;
    }
  }

  return false;
}

function hasCircularDependencyRecursive(
  target: string,
  graph: Map<string, string[]>,
  visited: Set<string>,
  activePath: Set<string>,
): boolean {
  if (activePath.has(target)) {
    return true;
  }

  if (visited.has(target)) {
    return false;
  }

  activePath.add(target);

  for (const prerequisite of graph.get(target) ?? []) {
    if (
      graph.has(prerequisite) &&
      hasCircularDependencyRecursive(prerequisite, graph, visited, activePath)
    ) {
      return true;
    }
  }

  activePath.delete(target);
  visited.add(target);

  return false;
}

export function getTargetSubgraph(
  rules: NormalRule[],
  activeTarget: string | null,
): NormalRule[];

export function getTargetSubgraph(rules: NormalRule[]): NormalRule[];

export function getTargetSubgraph(
  rules: NormalRule[],
  activeTarget?: string | null,
): NormalRule[] {
  if (arguments.length === 1) {
    return getTargetSubgraph(rules, findDefaultTarget(rules));
  }

  const subGraph: NormalRule[] = [];
  const stack: (string | null | undefined)[] = [];
  const visitedTargets = new Set<string | null | undefined>();

  stack.push(activeTarget);

  while (stack.length > 0) {
    const currentTarget = stack.pop();

    if (visitedTargets.has(currentTarget)) {
      continue;
    }

    visitedTargets.add(currentTarget);

    for (const rule of rules) {
      if (rule.target === currentTarget) {
        subGraph.push(rule);
        stack.push(...rule.prerequisites);
      }
    }
  }

  if (hasCircularDependency(subGraph)) {
    throw new cbuildException(
      ErrorType.SEMANTIC,
      "Circular dependency detected while resolving target '" +
        activeTarget +
        "'. Stop.",
    );
  }

  return subGraph;
}

export function findDefaultTarget(rules: NormalRule[]): string | null {
  if (rules.length === 0) return null;
  return rules[0]!.target;
}

export function findTarget(rules: NormalRule[], target: string): NormalRule {
  for (const rule of rules) {
    if (rule.target === target) return rule;
  }
  throw new cbuildException(ErrorType.PROCESS, "Target not found: " + target);
}

export function findTargetList(
  rules: NormalRule[],
  target: string,
): NormalRule[] {
  const targetRules: NormalRule[] = rules.filter((r) => r.target === target);

  if (targetRules.length === 0)
    throw new cbuildException(ErrorType.PROCESS, "Target not found: " + target);
  return targetRules;
}

export function findRuleByUUID(rules: NormalRule[], uuid: string): NormalRule {
  for (const rule of rules) {
    if (rule.uuid === uuid) return rule;
  }

  // programmatic error
  throw new Error(`rule with uuid ${uuid} not found`);
}

// preserve order of targets
export function findTopLevelTargets(rules: NormalRule[]): string[] {
  const prerequisiteTargets: Set<string> = new Set(
    rules.flatMap((rule) => rule.prerequisites),
  );

  return Array.from(new Set(rules.map((rule) => rule.target))).filter(
    (target) => !prerequisiteTargets.has(target),
  );
}
