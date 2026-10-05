import {
  AssignmentNode,
  BaseNode,
  RuleNode,
} from "@tinymake-backend/node-types.js";
import { LineParser, LineReader } from "@tinymake-backend/read-line.js";
import { debugPrintValue } from "./debug-util.js";

export class TinyMake {
  private rawBuildFile: string;
  constructor(rawBuildFile: string) {
    this.rawBuildFile = rawBuildFile;
  }

  async run() {
    const lineReader = new LineReader(this.rawBuildFile);
    const classifiedLines = lineReader.read();

    const lineParser = new LineParser(classifiedLines);
    const models = lineParser.parse();

    const ruleNodes: RuleNode[] = this.collectRulesNodes(models);

    for (const n of ruleNodes) {
      debugPrintValue(n.targets);
      console.log("\n");
      debugPrintValue(n.prerequisites);
    }
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
