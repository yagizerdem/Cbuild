#!/usr/bin/env node

import { frontend } from "@src/frontend.js";
import { Env } from "@cbuild-backend/env.js";
import { Core } from "@cbuild-backend/core.js";
import cli from "@src/cli.js";
import handleError from "@src/error-handler.js";
import type { CBuildOptions } from "@src/cli.js";
import {
  handleCliOptions,
  resolveBuildFilePath,
} from "@src/handle-cli-options.js";
import { collectEnvVars } from "./collect-vars.js";
import fs from "fs/promises";
import { IR } from "@compiler/ir.js";

export async function readBuildFile(buildFilePath: string): Promise<string> {
  return await fs.readFile(buildFilePath, "utf-8");
}

async function main() {
  try {
    cli.parse();
    const options: CBuildOptions = cli.opts<CBuildOptions>();
    handleCliOptions(options);
    const buildFileAbsolutePaths: string[] = resolveBuildFilePath(options);
    const intermediateRepresentation: IR[] = [];
    for (const buildFilePath of buildFileAbsolutePaths) {
      const buildFileContent = await readBuildFile(buildFilePath);
      const ir = frontend(buildFileContent);
      intermediateRepresentation.push(...ir);
    }

    const envVars = collectEnvVars(options);
    const context = new Env(options);
    const core = new Core(context);
    await core.runAsync(intermediateRepresentation, {
      envVars,
      cliVars: [],
    });
  } catch (error) {
    handleError(error);
  }
}

await main();
