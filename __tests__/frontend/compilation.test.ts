import { test } from "vitest";
import { compileBuildFile } from "@tests/util/compile.js";

test("SimpleHelloWorld", () => {
  const buildFile = `hello:
\t echo "Hello, World"
`;

  const ir = compileBuildFile(buildFile);
});
