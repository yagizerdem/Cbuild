import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { NormalRule } from "@cbuild-backend/model.js";

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
