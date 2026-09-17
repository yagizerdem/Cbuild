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
  const buildFile = `
FEATURE_NAME = FEATURE_ENABLED
FEATURE_ENABLED = yes

DEBUG_VAR = 1
PROFILE = dev

ifdef $(FEATURE_NAME)

  ifdef DEBUG_VAR
    BUILD_MODE = debug
  else
    BUILD_MODE = release
  endif

  ifeq ($(PROFILE),dev)
    BUILD_TARGET = development
  else
    BUILD_TARGET = production
  endif

else ifdef FALLBACK_FEATURE

  BUILD_MODE = fallback
  BUILD_TARGET = fallback

else

  BUILD_MODE = disabled
  BUILD_TARGET = unavailable

endif


ifdef BUILD_MODE

all: build info

build:
\t echo \\"build target\\"
\t echo \\"mode: $(BUILD_MODE)\\"
\t echo \\"target: $(BUILD_TARGET)\\"

info:
\t echo \\"feature name: $(FEATURE_NAME)\\"
\t echo \\"feature value: $(FEATURE_ENABLED)\\"
\t echo \\"profile: $(PROFILE)\\"

else

all:
\t echo "BUILD_MODE is not defined"

endif
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
