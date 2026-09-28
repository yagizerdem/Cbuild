import { NormalRule } from "@cbuild-backend/model.js";

export type RuleUUID = string;
export type TargetName = string;

// maps rule uuid to preq rules
export function createTargetMap(
  rules: NormalRule[],
): Map<RuleUUID, NormalRule[]> {
  const rulesByTarget = new Map<TargetName, NormalRule[]>();

  // merges rules with same target names into array
  for (const rule of rules) {
    const existing = rulesByTarget.get(rule.target);

    if (existing) {
      existing.push(rule);
    } else {
      rulesByTarget.set(rule.target, [rule]);
    }
  }

  const targetMap = new Map<RuleUUID, NormalRule[]>();

  for (const rule of rules) {
    const dependencies: NormalRule[] = [];

    for (const prerequisite of [
      ...rule.prerequisites,
      ...rule.orderOnlyPrerequisites,
    ]) {
      const matches = rulesByTarget.get(prerequisite);

      if (matches) {
        dependencies.push(...matches);
      }
    }

    targetMap.set(rule.uuid, dependencies);
  }

  return targetMap;
}

export function createReverseTargetMap(
  rules: NormalRule[],
): Map<RuleUUID, NormalRule[]> {
  const rulesByTarget = new Map<TargetName, NormalRule[]>();

  // merges rules with same target names into array
  for (const rule of rules) {
    const existing = rulesByTarget.get(rule.target);

    if (existing) {
      existing.push(rule);
    } else {
      rulesByTarget.set(rule.target, [rule]);
    }
  }

  const reverseTargetMap = new Map<RuleUUID, NormalRule[]>();

  for (const rule of rules) {
    for (const preq of [
      ...rule.prerequisites,
      ...rule.orderOnlyPrerequisites,
    ]) {
      const preqRules = rulesByTarget.get(preq);
      if (!preqRules) continue; // No rule produces this prerequisite; it may be a filesystem or external dependency.

      for (const preqRule of preqRules) {
        const existing = reverseTargetMap.get(preqRule.uuid);
        if (existing) {
          existing.push(rule);
        } else {
          reverseTargetMap.set(preqRule.uuid, [rule]);
        }
      }
    }
  }

  return reverseTargetMap;
}
