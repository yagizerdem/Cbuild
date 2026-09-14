import { compile } from "@tests/util/compile.js";
import { Env } from "@cbuild-backend/env.js";
import { Core } from "@cbuild-backend/core.js";
import { pCharBufferToString, preprocess } from "@src/preprocessor.js";

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

`.trim();

  const pCharBuffer = preprocess(buildFile);
  const preprocessedProgram = pCharBufferToString(pCharBuffer);
  console.log(preprocessedProgram);

  const ir = compile(preprocessedProgram);

  const context = new Env({
    buildSequential: true,
    cwd: process.cwd(),
    isMinimalApi: true,
    parallelJobCount: 2,
    silent: false,
  });

  const core = new Core(context);

  await core.runAsync(ir);
} catch (error) {
  console.error(error);
}
