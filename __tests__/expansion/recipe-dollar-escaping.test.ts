import { expect, test } from "vitest";
import { compile } from "@tests/util/compile.js";
import { Env } from "@src/cbuild-backend/env.js";
import BuildFileEvaluator from "@src/cbuild-backend/evaluator/core/buildfile-evaluator.js";
import { expandRecipe } from "@src/cbuild-backend/expansion.js";
import { NormalRuleIR } from "@src/compiler/ir.js";
import { CBuildOptions } from "@src/cli.js";

test.each([
  ["echo $$(RESULT)", "echo $(RESULT)"],
  ["echo $(RESULT)", "echo okok"],
  ["echo $$$$(RESULT)", "echo $$(RESULT)"],
  ["echo $$$ (RESULT)", "echo $$ (RESULT)"],
  ["echo $$$(RESULT)", "echo $okok"],
  ["echo $$HOME", "echo $HOME"],
  ['echo "$$(RESULT)"', 'echo "$(RESULT)"'],
  ["echo $(DOLLARS)", "echo $$"],
])("recipe dollar escaping: %s", async (command, expected) => {
  const program = compile(
    `A = ok\nRESULT = $(A)$(A)\nDOLLARS := $$$$\napp:\n\t ${command}\n`,
  );
  const context = new Env({} as CBuildOptions);
  const evaluationState = {
    resolvedModels: [],
    vpaths: [],
  };
  const evaluator = new BuildFileEvaluator(
    context,
    program.slice(0, 3),
    evaluationState,
  );
  await evaluator.evaluateAsync();
  expect(program[3]).toBeInstanceOf(NormalRuleIR);
  const rule = program[3] as NormalRuleIR;
  expect(expandRecipe(rule.recipes[0]!, context)).toBe(expected);
});
