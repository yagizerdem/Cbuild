import { test } from "vitest";
import { compile } from "@tests/util/compile.js";

test("SimpleHelloWorld", () => {
  const buildFile = `hello:
\t echo "Hello, World"
`;

  const ir = compile(buildFile);
});
