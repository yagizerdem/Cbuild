import { expect, test } from "vitest";
import { AssignmentIR, AssignmentType, NormalRuleIR, RecipeIR, ValueIR, textPart, varRefPart } from "@compiler/ir.js";
import { Env, Settings } from "@src/cbuild-backend/env.js";
import { ModelBuilder } from "@src/cbuild-backend/model-builder.js";
import { NormalRule } from "@src/cbuild-backend/model.js";

const value = (text: string) => new ValueIR([textPart(text)]);
const ref = (name: string) => new ValueIR([varRefPart(value(name))]);
const builder = () => new ModelBuilder(new Env(new Settings(true, 1, process.cwd(), true, false)));

test("assignments expand subsequent rule targets and prerequisites", () => {
  const subject = builder();
  const recipe = RecipeIR.command(value("echo build"));
  const rule = new NormalRuleIR({
    targets: [ref("TARGETS")], prerequisites: [value(" a\t b\n ")], recipes: [recipe],
  });
  const models = subject.build([
    new AssignmentIR(AssignmentType.SIMPLE, value("TARGETS"), value("one two")), rule,
  ]) as NormalRule[];
  expect(models.map(model => model.target)).toEqual(["one", "two"]);
  expect(models[0].prerequisites).toEqual(["a", "b"]);
  expect(models[0].normalRuleIR).toBe(rule);
  expect(models[0].recipeIRS).toEqual([recipe]);
  expect(models[0].recipeIRS).not.toBe(rule.recipes);
  expect(models[0].prerequisites).not.toBe(models[1].prerequisites);
});

test("recursive assignments resolve when rules are visited", () => {
  const subject = builder();
  const models = subject.build([
    new AssignmentIR(AssignmentType.RECURSIVE, value("TARGET"), ref("NAME")),
    new AssignmentIR(AssignmentType.SIMPLE, value("NAME"), value("later")),
    new NormalRuleIR({ targets: [ref("TARGET")] }),
  ]) as NormalRule[];
  expect(models[0].target).toBe("later");
});

test("collectModels accepts only model instances and build preserves accumulation", () => {
  const subject = builder();
  const model = new NormalRule({ target: "a" });
  subject.collectModels(subject.ruleModels, [null, "ignored", model]);
  subject.collectModels(subject.ruleModels, null);
  expect(subject.build([])).toEqual([model]);
  subject.collectModels(subject.ruleModels, model);
  expect(subject.ruleModels).toHaveLength(2);
});
