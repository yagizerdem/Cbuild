import {
  AssignmentNode,
  BaseNode,
  ValueNode,
  RuleNode,
} from "@tinymake-backend/node-types.js";
import { TinyMakeExpansionEngine } from "@tinymake-backend/expansion.js";
import { TinyMakeEnv } from "@tinymake-backend/env.js";

export type EvaluatedRule = {
  target: string;
  preqs: string[];
  recipes: ValueNode[];
};

export class TinyMakeEvaluator {
  private readonly nodes: BaseNode[] = [];
  private readonly context: TinyMakeEnv;

  constructor(nodes: BaseNode[], context: TinyMakeEnv) {
    this.nodes = nodes;
    this.context = context;
  }

  public evaluate(): EvaluatedRule[] {
    const evaluationResult: EvaluatedRule[] = [];
    for (const node of this.nodes) {
      if (node.type === "assignment") {
        this.evaluateAssignmentNode(node as AssignmentNode);
      } else if (node.type === "rule") {
        evaluationResult.push(...this.evaluatRule(node as RuleNode));
      }
    }
    return evaluationResult;
  }

  private evaluateAssignmentNode(assignment: AssignmentNode) {
    const expansion = new TinyMakeExpansionEngine(this.context);
    const lValue: string = expansion.expand(assignment.identifier).trim();
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
      const rValue: string = expansion.expand(assignment.value).trim();
      this.context.setVariable({
        identifier: lValue,
        value: {
          kind: "raw",
          value: rValue,
        },
      });
    }
  }

  private evaluatRule(rule: RuleNode): EvaluatedRule[] {
    const evaluationResult: EvaluatedRule[] = [];
    const expansion = new TinyMakeExpansionEngine(this.context);
    const expandedTarget = expansion
      .expand(rule.targets)
      .split(/\s+/)
      .map((t) => t.trim())
      .filter(Boolean);

    const d = expansion.expand(rule.prerequisites);

    const expandedPreq = expansion
      .expand(rule.prerequisites)
      .split(/\s+/)
      .map((t) => t.trim())
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
