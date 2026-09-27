import { expect, test } from "vitest";
import { Env } from "@src/cbuild-backend/env.js";
import BuildFileEvaluator from "@src/cbuild-backend/evaluator/core/buildfile-evaluator.js";
import { NormalRule } from "@src/cbuild-backend/model.js";
import { compile } from "@tests/util/compile.js";
import { CBuildOptions } from "@src/cli.js";

test("static pattern rule expands target lists into separate models", async () => {
  const program = compile(`objects = foo.o bar.o
$(objects): %.o: %.c | %.stamp
	 echo target=$@ first=$< order=$|
`);
  const context = new Env({} as CBuildOptions);

  const evaluator = new BuildFileEvaluator(context, program, {
    resolvedModels: [],
    vpaths: [],
  });

  const models = await evaluator.evaluateAsync();
  const rules = models.filter(
    (model): model is NormalRule => model instanceof NormalRule,
  );

  expect(rules.map((rule) => rule.target)).toEqual(["foo.o", "bar.o"]);
  expect(rules.map((rule) => rule.prerequisites)).toEqual([
    ["foo.c"],
    ["bar.c"],
  ]);
  expect(rules.map((rule) => rule.orderOnlyPrerequisites)).toEqual([
    ["foo.stamp"],
    ["bar.stamp"],
  ]);
});
