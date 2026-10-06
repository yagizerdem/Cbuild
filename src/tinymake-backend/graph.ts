import { EvaluatedRule } from "@tinymake-backend/evaluator.js";

export interface DeqpGraph {
  rules: EvaluatedRule[];
  targetRuleMap: Record<string, EvaluatedRule>; // stores target and corresponding target evaluated rule
  reverseTargetRuleMap: Record<string, EvaluatedRule[]>; // stors target list that depends on target key
  targetDepqMap: Record<string, EvaluatedRule[]>; // stores target and corresponding preqs as evaluated rule
}

export function createDepqGraph(rules: EvaluatedRule[]): DeqpGraph {
  const targetRuleMap: Record<string, EvaluatedRule> = {};
  for (const rule of rules) {
    targetRuleMap[rule.target] = rule;
  }

  const reverseTargetRuleMap: Record<string, EvaluatedRule[]> = {};
  for (const rule of rules) {
    reverseTargetRuleMap[rule.target] = reverseTargetRuleMap[rule.target] ?? [];
    for (const preq of rule.preqs) {
      reverseTargetRuleMap[preq] = reverseTargetRuleMap[preq] ?? [];
      reverseTargetRuleMap[preq].push(rule);
    }
  }

  const targetDepqMap: Record<string, EvaluatedRule[]> = {};
  for (const rule of rules) {
    targetDepqMap[rule.target] = [];
    for (const preq of rule.preqs) {
      targetDepqMap[rule.target].push(targetRuleMap[preq]);
    }
  }

  return {
    reverseTargetRuleMap,
    targetRuleMap,
    rules,
    targetDepqMap,
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
    if (goalRule) {
      addResolution(goalRule);
      goalRule.preqs.forEach((preq) => {
        deadCdoeEleminationRecursive(preq);
      });
    }
  };

  const defaultGoal = graph.targetRuleMap[goal];
  addResolution(defaultGoal);

  defaultGoal.preqs.forEach((preq) => {
    deadCdoeEleminationRecursive(preq);
  });

  return resolution;
}
