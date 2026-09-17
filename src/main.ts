#!/usr/bin/env node

import { compile } from "@src/test-util/compile.js";
import { Env } from "@cbuild-backend/env.js";
import { Core } from "@cbuild-backend/core.js";
import { pCharBufferToString, preprocess } from "@src/preprocessor.js";
import cli from "@src/cli.js";

cli.parse();
const options = cli.opts();
// console.log(options);

try {
  const buildFile = String.raw`
foo := $(if this-is-not-empty,then!,else!)
empty :=
bar := $(if $(empty),then!,else!)

all:
	@echo $(foo)
	@echo $(bar)
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
  if (error instanceof Error) {
    console.error(error);
  } else {
    console.error(error);
  }
}
