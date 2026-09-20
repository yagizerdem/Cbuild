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
import { pCharBufferToString, preprocess } from "@src/preprocessor.js";
import fsPromises from "fs/promises";
import { compile } from "@src/test-util/compile.js";
import BuildFileEvaluator from "./core/buildfile-evaluator.js";

export default class IncludeIREvaluator {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly ir: IncludeIR;
  private readonly vpaths: VpathRule[];
  constructor(context: Env, ir: IncludeIR, vpaths: VpathRule[]) {
    this.context = context;
    this.ir = ir;
    this.vpaths = vpaths;
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

    for (const filePath of filePaths) {
      const resolvedBuildFilePath = resolveAndGetAbsolutePath(
        process.cwd(),
        filePath,
      );

      if (!fileExistbyAbsolutePath(resolvedBuildFilePath)) {
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

      const buildFile = await fsPromises.readFile(
        resolvedBuildFilePath,
        "utf-8",
      );

      const pCharBuffer = preprocess(buildFile);
      const preprocessedProgram = pCharBufferToString(pCharBuffer);
      const ir = compile(preprocessedProgram);

      const buildFileEvaluator = new BuildFileEvaluator(
        this.context,
        ir,
        this.vpaths,
      );

      const resolvedModels = await buildFileEvaluator.evaluateAsync();

      models.push(...resolvedModels);
    }

    return models;
  }
}
