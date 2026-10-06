import { EvaluatedRule } from "@tinymake-backend/evaluator.js";

export interface DeqpGraph {
  rules: EvaluatedRule[];
  targetRuleMap: Record<string, EvaluatedRule>;
  reverseTargetRuleMap: Record<string, EvaluatedRule[]>; // stors target list that depends on target key
}

export function createDepqGraph(rules: EvaluatedRule[]): DeqpGraph {
  const targetRuleMap: Record<string, EvaluatedRule> = {};
  for (const rule of rules) {
    targetRuleMap[rule.target] = rule;
  }

  const reverseTargetRuleMap: Record<string, EvaluatedRule[]> = {};
  for (const rule of rules) {
    reverseTargetRuleMap[rule.target] = [];
    rule.preqs.forEach((preq) => {
      reverseTargetRuleMap[rule.target].push(targetRuleMap[preq]);
    });
  }

  return {
    reverseTargetRuleMap,
    targetRuleMap,
    rules,
  };
}

export function hasCycle(
  graph: DeqpGraph,
  goal: string,
  occured = new Set<string>(),
  activePath = new Set<string>(),
) {
  const defaultRule = graph.targetRuleMap[goal];
  const preqs: EvaluatedRule[] = defaultRule.preqs
    .map((p) => graph.targetRuleMap[p])
    .filter((p) => p !== undefined)
    .flat(1);

  if (occured.has(goal) && activePath.has(goal)) {
    return true;
  }

  occured.add(goal);
  activePath.add(goal);

  for (const p of preqs) {
    var flag = hasCycle(graph, p.target, occured, activePath);
    if (flag) return true;
  }
  activePath.delete(goal);

  return false;
}

export function deadRuleElemination(graph: DeqpGraph, goal: string) {
  const resolution: EvaluatedRule[] = [];
  const resolvedTargets = new Set<string>();

  const addResolution = (evaluatedRule: EvaluatedRule) => {
    if (!resolvedTargets.has(evaluatedRule.target)) {
      resolvedTargets.add(evaluatedRule.target);
      resolution.push(evaluatedRule);
    }
  };

  const deadCdoeEleminationRecursive = (currentGoal: string) => {
    const goalRule = graph.targetRuleMap[currentGoal];
    addResolution(goalRule);
    goalRule.preqs.forEach((preq) => {
      deadCdoeEleminationRecursive(preq);
    });
  };

  const defaultGoal = graph.targetRuleMap[goal];
  addResolution(defaultGoal);

  defaultGoal.preqs.forEach((preq) => {
    deadCdoeEleminationRecursive(preq);
  });

  return resolution;
}
