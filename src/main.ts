#!/usr/bin/env node

import { frontend } from "@src/frontend.js";
import { Env } from "@cbuild-backend/env.js";
import { Core, type EnvVar, type CliVar } from "@cbuild-backend/core.js";
import cli from "@src/cli.js";
import handleError from "@src/error-handler.js";

cli.parse();
const options = cli.opts();
// console.log(options);

try {
  const buildFile = `

c = 100
a = $\{c}
b = $(value $(k))
k = a

app: 
\t echo '$(b)' 


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
