import { compile } from "@tests/util/compile.js";
import { Env } from "@cbuild-backend/env.js";
import { Core } from "@cbuild-backend/core.js";

const buildFile = `
app : a b
\t echo test

a: c
\t echo a
b : 
\t echo b

hook {
  hook program body
}
`;

const ir = compile(buildFile);

const context = new Env({
  buildSequential: true,
  cwd: process.cwd(),
  isMinimalApi: true,
  parallelJobCount: 2,
  silent: false,
});

const core = new Core(context);

core.run(ir);
