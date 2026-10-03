import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { NormalRule } from "@cbuild-backend/model.js";
import { RuleSeparator } from "@src/compiler/ir.js";

export class NormalizeModels {
  public explicitRules: NormalRule[];
  public targetNameRuleMap: Map<string, NormalRule[]> = new Map();

  constructor(explicitRules: NormalRule[]) {
    this.explicitRules = explicitRules;
  }

  public normalize(): NormalRule[] {
    this.createTargetNameRuleMap();
    this.validateRuleSeperators();
    this.explicitRules = this.normalizeRule();
    return this.explicitRules;
  }

  private validateRuleSeperators() {
    for (const [target, rules] of this.targetNameRuleMap.entries()) {
      for (let i = 0; i < rules.length - 1; i++) {
        const curRule = rules[i];
        const nextRule = rules[i + 1];

        if (curRule.ruleSeperator != nextRule.ruleSeperator) {
          throw CbuildException.from({
            column: curRule.ruleIR.col,
            row: curRule.ruleIR.row,
            errorType: ErrorType.PROCESS,
            machineCode: MachineCode.INVALID_RULE_SEPERATOR,
            message: `buildfile:${curRule.ruleIR.row}: *** target file '${target}' has both : and :: entries.  Stop.`,
          });
        }
      }
    }
  }

  private createTargetNameRuleMap() {
    for (const rule of this.explicitRules) {
      if (this.targetNameRuleMap.has(rule.target)) {
        this.targetNameRuleMap.get(rule.target)!.push(rule);
      } else {
        this.targetNameRuleMap.set(rule.target, [rule]);
      }
    }
  }

  private normalizeRule(): NormalRule[] {
    const normalizedRules: NormalRule[] = [];

    for (const [, rules] of this.targetNameRuleMap.entries()) {
      if (rules.length === 0) {
        continue;
      }

      const firstRule = rules[0];

      if (firstRule.ruleSeperator === RuleSeparator.DOUBLE_COLON) {
        normalizedRules.push(...rules);
        continue;
      }

      const prerequisites: string[] = [];
      const orderOnlyPrerequisites: string[] = [];

      let recipeRule: NormalRule | undefined;

      for (const rule of rules) {
        prerequisites.push(...rule.prerequisites);
        orderOnlyPrerequisites.push(...rule.orderOnlyPrerequisites);

        if (rule.recipeIRs.length > 0) {
          recipeRule = rule;
        }
      }

      const sourceRule = recipeRule ?? firstRule;

      normalizedRules.push(
        new NormalRule({
          target: firstRule.target,

          prerequisites,
          orderOnlyPrerequisites,

          shellCommands: sourceRule.shellCommands,
          recipeIRs: sourceRule.recipeIRs,
          evaluatedRecipeIRs: sourceRule.evaluatedRecipeIRs,

          ruleIR: sourceRule.ruleIR,
          vpathRules: sourceRule.vpathRules,

          ruleSeperator: firstRule.ruleSeperator,

          stem: sourceRule.stem,
        }),
      );
    }

    return normalizedRules;
  }
}
