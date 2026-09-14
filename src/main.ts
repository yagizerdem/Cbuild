#!/usr/bin/env node

import { compile } from "@src/test-util/compile.js";
import { Env } from "@cbuild-backend/env.js";
import { Core } from "@cbuild-backend/core.js";
import { pCharBufferToString, preprocess } from "@src/preprocessor.js";
import cli from "@src/cli.js";

cli.parse();
const options = cli.opts();
console.log(options);

try {
  const buildFile = `
a : b c
\t echo a

b: x y
\t echo b

c : x k
\t echo c

x:
\t echo x

hook {
  println(os.type());
  }

`.trim();

  const pCharBuffer = preprocess(buildFile);
  const preprocessedProgram = pCharBufferToString(pCharBuffer);

  const ir = compile(preprocessedProgram);

  const context = new Env({
    buildSequential: true,
    cwd: process.cwd(),
    backend: "cbuild",
    parallelJobCount: 2,
    silent: false,
  });

  const core = new Core(context);

  await core.runAsync(ir);
} catch (error) {
  console.error(error);
}
