import { EvaluatedRules } from "@tinymake-backend/evaluator.js";

export interface DeqpGraph {
  rules: EvaluatedRules[];
  targetRuleMap: Record<string, EvaluatedRules>;
  reverseTargetRuleMap: Record<string, EvaluatedRules[]>; // stors target list that depends on target key
}

export function createDepqGraph(rules: EvaluatedRules[]): DeqpGraph {
  const targetRuleMap: Record<string, EvaluatedRules> = {};
  for (const rule of rules) {
    targetRuleMap[rule.target] = rule;
  }

  const reverseTargetRuleMap: Record<string, EvaluatedRules[]> = {};
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
  const preqs: EvaluatedRules[] = defaultRule.preqs
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
