import {
  AssignmentNode,
  BaseNode,
  ValueNode,
  RuleNode,
} from "@tinymake-backend/node-types.js";
import { TinyMakeExpansionEngine } from "@tinymake-backend/expansion.js";
import { TinyMakeEnv } from "@tinymake-backend/env.js";

export type EvaluatedRules = {
  target: string;
  preqs: string[];
  recipes: ValueNode[];
};

class TinyMakeEvaluator {
  private readonly nodes: BaseNode[] = [];
  private readonly context: TinyMakeEnv;

  constructor(nodes: BaseNode[], context: TinyMakeEnv) {
    this.nodes = nodes;
    this.context = context;
  }

  public evaluate(): EvaluatedRules[] {
    const evaluationResult: EvaluatedRules[] = [];
    for (const node of this.nodes) {
      if (node.type === "assignment") {
        this.evaluateAssignmentNode(node as AssignmentNode);
      } else if (node.type === "rule") {
      }
    }
    return evaluationResult;
  }

  public evaluateAssignmentNode(assignment: AssignmentNode) {
    const expansion = new TinyMakeExpansionEngine(this.context);
    const lValue: string = expansion.expand(assignment.identifier);
    if (assignment.flavour === "deffered") {
      const rValue = assignment.value; // do not expand immediately
      this.context.setVariable({
        identifier: lValue,
        value: {
          kind: "deffered",
          value: rValue,
        },
      });
    } else {
      // simple
      const rValue: string = expansion.expand(assignment.value);
      this.context.setVariable({
        identifier: lValue,
        value: {
          kind: "raw",
          value: rValue,
        },
      });
    }
  }

  public evaluatRule(rule: RuleNode): EvaluatedRules[] {
    const evaluationResult: EvaluatedRules[] = [];
    const expansion = new TinyMakeExpansionEngine(this.context);
    const expandedTarget = expansion
      .expand(rule.targets)
      .split(/s+/)
      .filter(Boolean);

    const expandedPreq = expansion
      .expand(rule.prerequisites)
      .split(/s+/)
      .filter(Boolean);

    for (const target of expandedTarget) {
      evaluationResult.push({
        preqs: [...expandedPreq],
        recipes: rule.recipes,
        target: target,
      });
    }

    return evaluationResult;
  }
}
