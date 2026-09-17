import { expect, test } from "vitest";
import { compile } from "@tests/util/compile.js";
import { Env, Settings } from "@src/cbuild-backend/env.js";
import { evaluateBuildFile } from "@src/cbuild-backend/buildfile-evaluator.js";
import { expandRecipe } from "@src/cbuild-backend/expansion.js";
import { NormalRuleIR } from "@src/compiler/ir.js";

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
  const context = new Env(new Settings(true, 1, ".", "cbuild", true));
  await evaluateBuildFile(program.slice(0, 3), context);
  expect(program[3]).toBeInstanceOf(NormalRuleIR);
  const rule = program[3] as NormalRuleIR;
  expect(expandRecipe(rule.recipes[0]!, context)).toBe(expected);
});
