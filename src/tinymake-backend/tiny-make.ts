import {
  AssignmentNode,
  BaseNode,
  RuleNode,
} from "@tinymake-backend/node-types.js";
import { LineParser, LineReader } from "@tinymake-backend/read-line.js";
import {
  TinyMakeEvaluator,
  EvaluatedRules,
} from "@tinymake-backend/evaluator.js";
import { TinyMakeEnv } from "@tinymake-backend/env.js";
import { debugPrintValue } from "./debug-util.js";

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

    const rules = this.collectRulesNodes(AST);
    for (const rule of rules) {
      debugPrintValue(rule.targets);
      debugPrintValue(rule.prerequisites);
    }

    const evaluation = new TinyMakeEvaluator(AST, this.context);
    const evaluatedRules: EvaluatedRules[] = evaluation.evaluate();

    console.log(evaluatedRules);
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
