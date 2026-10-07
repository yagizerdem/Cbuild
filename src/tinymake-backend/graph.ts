import { ResolvedRule } from "@tinymake-backend/resolution.js";

export interface DeqpGraph {
  rules: ResolvedRule[];
  targetRuleMap: Record<string, ResolvedRule>; // stores target and corresponding target evaluated rule
  reverseTargetRuleMap: Record<string, ResolvedRule[]>; // stors target list that depends on target key
  targetDepqMap: Record<string, ResolvedRule[]>; // stores target and corresponding preqs as evaluated rule
}

export function createDepqGraph(rules: ResolvedRule[]): DeqpGraph {
  const targetRuleMap: Record<string, ResolvedRule> = {};
  for (const rule of rules) {
    targetRuleMap[rule.target.name] = rule;
  }

  const reverseTargetRuleMap: Record<string, ResolvedRule[]> = {};
  for (const rule of rules) {
    reverseTargetRuleMap[rule.target.name] =
      reverseTargetRuleMap[rule.target.name] ?? [];
    for (const preq of rule.preqs) {
      reverseTargetRuleMap[preq.name] = reverseTargetRuleMap[preq.name] ?? [];
      reverseTargetRuleMap[preq.name].push(rule);
    }
  }

  const targetDepqMap: Record<string, ResolvedRule[]> = {};
  for (const rule of rules) {
    targetDepqMap[rule.target.name] = targetDepqMap[rule.target.name] ?? [];
    for (const preq of rule.preqs) {
      if (!targetDepqMap[rule.target.name].includes(targetRuleMap[preq.name])) {
        targetDepqMap[rule.target.name].push(targetRuleMap[preq.name]);
      }
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
  const preqs: ResolvedRule[] = defaultRule.preqs
    .map((p) => graph.targetRuleMap[p.name])
    .filter((p) => p !== undefined)
    .flat(1);

  if (occured.has(goal) && activePath.has(goal)) {
    return true;
  }

  occured.add(goal);
  activePath.add(goal);

  for (const p of preqs) {
    var flag = hasCycle(graph, p.target.name, occured, activePath);
    if (flag) return true;
  }
  activePath.delete(goal);

  return false;
}

export function deadRuleElemination(graph: DeqpGraph, goal: string) {
  const resolution: ResolvedRule[] = [];
  const resolvedTargets = new Set<string>();

  const addResolution = (evaluatedRule: ResolvedRule) => {
    if (!resolvedTargets.has(evaluatedRule.target.name)) {
      resolvedTargets.add(evaluatedRule.target.name);
      resolution.push(evaluatedRule);
    }
  };

  const deadCdoeEleminationRecursive = (currentGoal: string) => {
    const goalRule = graph.targetRuleMap[currentGoal];
    if (goalRule) {
      addResolution(goalRule);
      goalRule.preqs.forEach((preq) => {
        deadCdoeEleminationRecursive(preq.name);
      });
    }
  };

  const defaultGoal = graph.targetRuleMap[goal];
  addResolution(defaultGoal);

  defaultGoal.preqs.forEach((preq) => {
    deadCdoeEleminationRecursive(preq.name);
  });

  return resolution;
}
