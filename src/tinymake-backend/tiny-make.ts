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
import { TinyMakeResolver } from "./resolution.js";
import { resolveBuildFilePath } from "@src/handle-cli-options.js";
import { readBuildFile } from "@src/readBuildFile.js";
import { BuildFileMeta } from "@src/type/buildfile-meta.js";
import fs from "fs/promises";
import path from "path";

export class TinyMake {
  private readonly context: TinyMakeEnv;
  private readonly defaultTarget: string | undefined;

  constructor(context: TinyMakeEnv, defaultTarget: string | undefined) {
    this.context = context;
    this.defaultTarget = defaultTarget;
  }

  async run() {
    const buildFileAbsolutePaths: string[] = resolveBuildFilePath(
      this.context.cliOptions,
    );
    const parsedNodes: BaseNode[] = [];
    for (const buildFilePath of buildFileAbsolutePaths) {
      const buildFileContent = await readBuildFile(buildFilePath);
      const buildFileMeta: BuildFileMeta = {
        absolutePath: buildFilePath,
        rawContent: buildFileContent,
        size: (await fs.stat(buildFilePath)).size,
        relativePath: path.relative(process.cwd(), buildFilePath),
        name: path.basename(buildFilePath),
      };

      const lineReader = new LineReader(
        buildFileMeta.rawContent,
        buildFileMeta,
      );
      const classifiedLines = lineReader.read();
      const lineParser = new LineParser(classifiedLines, buildFileMeta);
      const AST = lineParser.parse();
      parsedNodes.push(...AST);
    }

    // const  = this.collectRulesNodes(AST);
    // for (const rule of rules) {
    //   debugPrintValue(rule.targets);
    //   debugPrintValue(rule.prerequisites);
    // }

    // evaluation
    const evaluation = new TinyMakeEvaluator(parsedNodes, this.context);
    const evaluatedRules: EvaluatedRule[] = evaluation.evaluate();
    // resolution
    const resolver = new TinyMakeResolver(evaluatedRules);
    const resolution = resolver.resole();
    // normalize
    const normalzied = resolver.normalize(resolution);

    // DEFAULT_GOAL
    const defaultGoal: string | undefined =
      this.defaultTarget ?? normalzied.at(0)?.target.name;
    if (!defaultGoal) {
      console.log("not targets found");
      return;
    }

    const graph: DeqpGraph = createDepqGraph(
      deadRuleElemination(createDepqGraph(normalzied), defaultGoal),
    );

    // there should not be cycle
    if (hasCycle(graph, defaultGoal)) {
      throw new Error("ciruclar dependecy !!!");
    }

    const schedular = new TinyMakeSchedular({
      depqGraph: graph,
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
