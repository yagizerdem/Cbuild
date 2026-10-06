import {
  AssignmentNode,
  BaseNode,
  RuleNode,
} from "@tinymake-backend/node-types.js";
import { LineParser, LineReader } from "@tinymake-backend/read-line.js";
import {
  TinyMakeEvaluator,
  EvaluatedRule,
} from "@tinymake-backend/evaluator.js";
import { TinyMakeEnv } from "@tinymake-backend/env.js";
import { debugPrintValue } from "@tinymake-backend/debug-util.js";
import {
  createDepqGraph,
  deadRuleElemination,
  DeqpGraph,
  hasCycle,
} from "@tinymake-backend/graph.js";
import { TinyMakeSchedular } from "@tinymake-backend/schedular.js";

export class TinyMake {
  private readonly rawBuildFile: string;
  private readonly context: TinyMakeEnv;
  constructor(rawBuildFile: string, context: TinyMakeEnv) {
    this.rawBuildFile = rawBuildFile;
    this.context = context;
  }

  async run() {
    const lineReader = new LineReader(this.rawBuildFile);
    const classifiedLines = lineReader.read();

    const lineParser = new LineParser(classifiedLines);
    const AST = lineParser.parse();

    // const rules = this.collectRulesNodes(AST);
    // for (const rule of rules) {
    //   debugPrintValue(rule.targets);
    //   debugPrintValue(rule.prerequisites);
    // }

    const evaluation = new TinyMakeEvaluator(AST, this.context);
    const evaluatedRules: EvaluatedRule[] = evaluation.evaluate();
    console.log(evaluatedRules);

    const graph: DeqpGraph = createDepqGraph(evaluatedRules);
    const defaultGoal = graph.rules.at(0);
    if (!defaultGoal) {
      console.log("not targets found");
      return;
    }

    // there should not be cycle
    const cycle = hasCycle(graph, defaultGoal.target);
    console.log(cycle);

    // eleminate unused rules
    const resolved: DeqpGraph = createDepqGraph(
      deadRuleElemination(graph, defaultGoal.target),
    );

    console.log(resolved.rules);

    const schedular = new TinyMakeSchedular({
      depqGraph: resolved,
      context: this.context,
    });
    await schedular.schedule();
  }

  collectRulesNodes(models: BaseNode[]): RuleNode[] {
    return models.filter((m) => {
      if (m.type === "rule") return true;
    }) as RuleNode[];
  }

  collectAssignmentNodes(models: BaseNode[]): AssignmentNode[] {
    return models.filter((m) => {
      if (m.type === "assignment") return true;
    }) as AssignmentNode[];
  }
}
