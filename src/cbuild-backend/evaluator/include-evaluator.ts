import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { Include, IncludeIR } from "@src/compiler/ir.js";
import { VpathRule } from "@cbuild-backend/model.js";
import {
  fileExistbyAbsolutePath,
  resolveAndGetAbsolutePath,
} from "@src/file-utils.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { BaseModel } from "@cbuild-backend/model.js";
import fsPromises from "fs/promises";
import { frontend } from "@src/frontend.js";
import BuildFileEvaluator from "@cbuild-backend/evaluator/core/buildfile-evaluator.js";
import { BuildFileEvaluationState } from "@cbuild-backend/evaluator/core/type.js";
import { BuildFileMeta } from "@src/type/buildfile-meta.js";
import path from "path";

export default class IncludeIREvaluator {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly ir: IncludeIR;
  private readonly evaluationState: BuildFileEvaluationState;
  constructor(
    context: Env,
    ir: IncludeIR,
    evaluationState: BuildFileEvaluationState,
  ) {
    this.context = context;
    this.ir = ir;
    this.evaluationState = evaluationState;
    this.valueExpansionEngine = new ValueExpansionEngine(context);
  }

  public async executeAsync(): Promise<BaseModel[]> {
    const include: Include = this.ir.include;
    const silent = include === "-include" || include === "sinclude";

    const expandedFilePaths = this.valueExpansionEngine.expand(
      this.ir.includepath,
    );

    const filePaths = expandedFilePaths.trim().split(/\s+/).filter(Boolean);

    const models: BaseModel[] = [];
    const loopUpDests = [process.cwd()];
    for (const includedDest of this.context.cliOptions.includeDir) {
      loopUpDests.push(resolveAndGetAbsolutePath(process.cwd(), includedDest));
    }

    for (const filePath of filePaths) {
      const resolvedBuildFilePaths: string[] = loopUpDests.map((dest) =>
        resolveAndGetAbsolutePath(dest, filePath),
      );
      const resolvedBuildFilePath = resolvedBuildFilePaths.find(
        fileExistbyAbsolutePath,
      );

      if (!resolvedBuildFilePath) {
        if (silent) {
          continue;
        }

        throw CbuildException.from({
          column: this.ir.col,
          row: this.ir.row,
          errorType: ErrorType.PROCESS,
          machineCode: MachineCode.INCLUDE_FILE_NOT_FOUND,
          message: `Include file not found: ${resolvedBuildFilePath}`,
        });
      }

      const buildFileContent = await fsPromises.readFile(
        resolvedBuildFilePath,
        "utf-8",
      );

      const buildFile: BuildFileMeta = {
        absolutePath: resolvedBuildFilePath,
        rawContent: buildFileContent,
        size: (await fsPromises.stat(resolvedBuildFilePath)).size,
        relativePath: path.relative(process.cwd(), resolvedBuildFilePath),
        name: path.basename(resolvedBuildFilePath),
      };

      const ir = frontend(buildFile);

      const buildFileEvaluator = new BuildFileEvaluator(
        this.context,
        ir,
        this.evaluationState,
      );

      const resolvedModels = await buildFileEvaluator.evaluateAsync();

      models.push(...resolvedModels);
    }

    return models;
  }
}
