import { BaseModel, NormalRule } from "@cbuild-backend/model.js";
import {
  fileExistbyAbsolutePathAsync,
  getModifiedTimeNsAsync,
  resolveAndGetAbsolutePath,
} from "@cbuild-backend/file-utils.js";
import { Env } from "@cbuild-backend/env.js";
import { AssignmentIR, IR, NormalRuleIR } from "@src/compiler/ir.js";
import { isCompatible } from "@cbuild-backend/semantic.js";
import { cbuildException, ErrorType } from "@src/cbuild-exception.js";
import {
  findDefaultTarget,
  getTargetSubgraph,
  GraphBuilder,
} from "./graph-builder.js";
import { ExpansionEngine } from "./expansion.js";

export async function shouldRebuild(
  rule: NormalRule,
  baseDir: string,
): Promise<boolean> {
  const targetEntryPath: string = resolveAndGetAbsolutePath(
    baseDir,
    rule.target,
  );

  if (!(await fileExistbyAbsolutePathAsync(targetEntryPath))) return true;

  const lastModifiedDateOfTarget: bigint | undefined =
    await getModifiedTimeNsAsync(targetEntryPath);

  if (!lastModifiedDateOfTarget) return true;

  for (const preq of rule.prerequisites) {
    const preqAbsolutePath = resolveAndGetAbsolutePath(baseDir, preq);
    const exist: boolean = await fileExistbyAbsolutePathAsync(preqAbsolutePath);
    if (!exist) return true;

    const lastModifiedDateOfPreq: bigint | undefined =
      await getModifiedTimeNsAsync(preqAbsolutePath);

    if (!lastModifiedDateOfPreq) return true;
    if (lastModifiedDateOfPreq > lastModifiedDateOfTarget) return true;
  }

  return false;
}

interface RunnerOptions {
  context?: Env;
}

export class Core {
  private context: Env;
  constructor(context: Env) {
    this.context = context;
  }

  public run(rules: IR[], options?: RunnerOptions) {
    const currentContext =
      options?.context ??
      this.context ??
      (() => {
        throw new Error("No context available");
      })();

    if (!isCompatible(rules)) {
      throw cbuildException.from({
        errorType: ErrorType.SEMANTIC,
        message: "Incompatible rules",
        line: -1,
        column: -1,
      });
    }

    const graphBuilder = new GraphBuilder(currentContext);

    // contains type of relations in under single interface. ex. hooks
    const graph: BaseModel[] = graphBuilder.build(rules);
    // contains relation only needed for build
    const normalRulesGraph = this.collectNormalRuleModels(graph);

    const target = findDefaultTarget(normalRulesGraph);
    if (!target) {
      throw cbuildException.from({
        errorType: ErrorType.SEMANTIC,
        message: "No target found",
        line: -1,
        column: -1,
      });
    }

    // contains only the rules relevant to the target
    const rulesSubGraph = getTargetSubgraph(normalRulesGraph, target);
  }

  private collectNormalRuleModels(baseModesl: BaseModel[]): NormalRule[] {
    return baseModesl.filter((model) => model instanceof NormalRule);
  }
}
