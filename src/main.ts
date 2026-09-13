import { compile } from "@tests/util/compile.js";
import { Env } from "@cbuild-backend/env.js";
import { Core } from "@cbuild-backend/core.js";

const buildFile = `
NAME = yagiz
MESSAGE = \\\\"hello $(NAME)"

app:
\t echo $(MESSAGE)

hook {
  println(("hello WORLD"):length());
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

await core.runAsync(ir);
