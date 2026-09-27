#!/usr/bin/env node

import { frontend } from "@src/frontend.js";
import { Env } from "@cbuild-backend/env.js";
import { Core, type EnvVar, type CliVar } from "@cbuild-backend/core.js";
import cli from "@src/cli.js";
import handleError from "@src/error-handler.js";
import type { CBuildOptions } from "@src/cli.js";

cli.parse();
const options: CBuildOptions = cli.opts<CBuildOptions>();

console.log(options.jobs);

try {
  const buildFile = `


app : bar.txt foo.txt foo.txt
\t echo $?


`;

  const irs = frontend(buildFile);

  const context = new Env({
    buildSequential: true,
    backend: "cbuild",
    parallelJobCount: 2,
    silent: false,
  });

  const core = new Core(context);

  await core.runAsync(irs, {
    envVars: [],
    cliVars: [],
  });
} catch (error) {
  handleError(error);
}
