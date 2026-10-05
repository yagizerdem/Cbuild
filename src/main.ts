#!/usr/bin/env node

import { frontend } from "@src/frontend.js";
import { Env } from "@cbuild-backend/env.js";
import { Core } from "@cbuild-backend/core.js";
import cli from "@src/cli.js";
import { getTargetArgs } from "@src/collect-vars.js";
import ErrorHandler from "@src/error-handler.js";
import type { CBuildOptions } from "@src/cli.js";
import {
  handleCliOptions,
  resolveBuildFilePath,
} from "@src/handle-cli-options.js";
import { collectCliVars, collectEnvVars } from "@src/collect-vars.js";
import fs from "fs/promises";
import { IR } from "@compiler/ir.js";
import { BuildFileMeta } from "@src/type/buildfile-meta.js";
import path from "path";

export async function readBuildFile(buildFilePath: string): Promise<string> {
  return await fs.readFile(buildFilePath, "utf-8");
}

async function main() {
  let context: Env | null = null;

  try {
    cli.parse();
    const options: CBuildOptions = cli.opts<CBuildOptions>();
    const args = cli.args;

    handleCliOptions(options);
    const buildFileAbsolutePaths: string[] = resolveBuildFilePath(options);
    const intermediateRepresentation: IR[] = [];
    for (const buildFilePath of buildFileAbsolutePaths) {
      const buildFileContent = await readBuildFile(buildFilePath);
      const buildFileMeta: BuildFileMeta = {
        absolutePath: buildFilePath,
        rawContent: buildFileContent,
        size: (await fs.stat(buildFilePath)).size,
        relativePath: path.relative(process.cwd(), buildFilePath),
        name: path.basename(buildFilePath),
      };

      const ir = frontend(buildFileMeta);
      intermediateRepresentation.push(...ir);
    }

    const targetArgs = getTargetArgs(args);

    if (targetArgs.length === 0) {
      // auto detect default target by core module

      const envVars = collectEnvVars(options);
      const cliVars = collectCliVars(args);
      context = new Env(options);
      const core = new Core(context);
      await core.runAsync(intermediateRepresentation, {
        envVars,
        cliVars,
      });
    } else {
      for (const targetArg of targetArgs) {
        const envVars = collectEnvVars(options);
        const cliVars = collectCliVars(args);
        context = new Env(options);

        const core = new Core(context);
        await core.runAsync(intermediateRepresentation, {
          envVars,
          cliVars,
          defaultTargetName: targetArg,
        });
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const errorHandler = new ErrorHandler();
      errorHandler.handleError(error);
    } else {
      console.error("cbuild: *** Unknown error.");
      process.exit(1);
    }
  }
}

await main();
