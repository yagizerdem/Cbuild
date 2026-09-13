import {
  AssignmentIR,
  HookIR,
  NormalRuleIR,
  type Executor,
  type IR,
  type ValueIR,
} from "@compiler/ir.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { Env } from "@cbuild-backend/env.js";
import {
  ExpansionEngine,
  ValueExpansionEngine,
} from "@cbuild-backend/expansion.js";
import { BaseModel, NormalRule } from "@cbuild-backend/model.js";
import globalInterpreter from "@cbuild-backend/interpreter/interpreter.js";

export class GraphBuilder implements Executor {
  public readonly ruleModels: BaseModel[] = [];

  public constructor(public readonly context: Env) {}

  public async buildAsync(instructions: readonly IR[]): Promise<BaseModel[]> {
    for (const instruction of instructions) {
      this.collectModels(
        this.ruleModels,
        await instruction.execAsync<BaseModel>(this),
      );
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

  exec<T>(node: IR): T {
    throw new Error("Use execAsync instead");
  }

  public async execAsync<T>(ir: IR): Promise<T> {
    if (ir instanceof NormalRuleIR) {
      return this.buildNormalRule(ir) as T;
    }
    if (ir instanceof AssignmentIR) {
      ir.exec(new ExpansionEngine(this.context));
      return null as T;
    }

    if (ir instanceof HookIR) {
      await globalInterpreter.runAsync(ir.hookProgram);
      return null as T;
    }

    throw CbuildException.from({
      column: ir.col,
      row: ir.row,
      errorType: ErrorType.SEMANTIC,
      machineCode: MachineCode.UNSUPPORTED_IR,
      message: `buildFile: Unsupported IR type for cbuild backend. Stop`,
    });
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
    throw CbuildException.from({
      column: -1,
      row: -1,
      errorType: ErrorType.SEMANTIC,
      machineCode: MachineCode.CIRCULAR_DEPQ,
      message: `cbuild: Circular dependency detected while resolving target '${activeTarget}'. Stop.`,
    });
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
  throw CbuildException.from({
    column: -1,
    row: -1,
    errorType: ErrorType.PROCESS,
    machineCode: MachineCode.FILE_NOT_FOUND,
    message: `cbuild: Target not found: ${target}. Stop.`,
  });
}

export function findTargetList(
  rules: NormalRule[],
  target: string,
): NormalRule[] {
  const targetRules: NormalRule[] = rules.filter((r) => r.target === target);

  if (targetRules.length === 0) {
    throw CbuildException.from({
      column: -1,
      row: -1,
      errorType: ErrorType.PROCESS,
      machineCode: MachineCode.FILE_NOT_FOUND,
      message: `cbuild: Target not found: ${target}. Stop.`,
    });
  }
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

export function getAllSubgraphs(rules: NormalRule[]): NormalRule[][] {
  const subGraphs: NormalRule[][] = [];
  const topLevelTargets: string[] = findTopLevelTargets(rules);
  topLevelTargets.forEach((target) => {
    subGraphs.push(getTargetSubgraph(rules, target));
  });
  return subGraphs;
}

export function topologicalSort(
  graph: NormalRule[],
  startNode: NormalRule,
): NormalRule[] {
  const rulesByTarget: Map<string, NormalRule[]> = new Map<
    string,
    NormalRule[]
  >();

  for (const rule of graph) {
    if (!rulesByTarget.has(rule.target)) {
      rulesByTarget.set(rule.target, []);
    }

    rulesByTarget.get(rule.target)!.push(rule);
  }

  const sorted: NormalRule[] = [];
  const visitingTargets = new Set<string>();
  const visitedTargets = new Set<string>();

  topologicalSortRecursive(
    startNode.target,
    rulesByTarget,
    visitingTargets,
    visitedTargets,
    sorted,
  );

  return sorted;
}

function topologicalSortRecursive(
  target: string,
  rulesByTarget: Map<string, NormalRule[]>,
  visitingTargets: Set<string>,
  visitedTargets: Set<string>,
  sorted: NormalRule[],
): void {
  if (visitedTargets.has(target)) {
    return;
  }

  if (visitingTargets.has(target)) {
    throw CbuildException.from({
      column: -1,
      row: -1,
      errorType: ErrorType.SEMANTIC,
      machineCode: MachineCode.CIRCULAR_DEPQ,
      message: `cbuild: Circular dependency detected while sorting target '${target}'. Stop.`,
    });
  }

  visitingTargets.add(target);

  const targetRules: NormalRule[] = rulesByTarget.get(target) ?? [];

  for (const rule of targetRules) {
    for (const prerequisite of rule.prerequisites) {
      if (rulesByTarget.has(prerequisite)) {
        topologicalSortRecursive(
          prerequisite,
          rulesByTarget,
          visitingTargets,
          visitedTargets,
          sorted,
        );
      }
    }
  }

  visitingTargets.delete(target);
  visitedTargets.add(target);
  sorted.push(...targetRules);
}
