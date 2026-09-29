#!/usr/bin/env node

import { frontend } from "@src/frontend.js";
import { Env } from "@cbuild-backend/env.js";
import { Core } from "@cbuild-backend/core.js";
import cli from "@src/cli.js";
import handleError from "@src/error-handler.js";
import type { CBuildOptions } from "@src/cli.js";
import { handleCliOptions } from "@src/handle-cli-options.js";
import { collectEnvVars } from "./collect-vars.js";

async function main() {
  cli.parse();
  const options: CBuildOptions = cli.opts<CBuildOptions>();

  handleCliOptions(options);

  try {
    const buildFile = `

app : 
\t echo $(NAME)


`;

    const envVars = collectEnvVars();

    const irs = frontend(buildFile);

    const context = new Env(options);

    const core = new Core(context);

    await core.runAsync(irs, {
      envVars,
      cliVars: [],
    });
  } catch (error) {
    handleError(error);
  }
}

await main();
