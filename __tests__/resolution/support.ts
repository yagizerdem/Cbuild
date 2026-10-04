import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { vi } from "vitest";
import type { CBuildOptions } from "@src/cli.js";
import { Env } from "@src/cbuild-backend/env.js";
import BuildFileEvaluator from "@src/cbuild-backend/evaluator/core/buildfile-evaluator.js";
import type { BuildFileEvaluationState } from "@src/cbuild-backend/evaluator/core/type.js";
import { ImplicitPatterRule, NormalRule } from "@src/cbuild-backend/model.js";
import { NormalizeModels } from "@src/cbuild-backend/normalize-models.js";
import { ImplicitRuleResolver } from "@src/cbuild-backend/implicit-rule-resolver.js";
import { RecipeExpansionEngine } from "@src/cbuild-backend/expansion.js";
import { compile } from "@src/test-util/compile.js";

export function environment() {
  return new Env({ oldFile: [], assumeOld: [], newFile: [], assumeNew: [],
    whatIf: [], includeDir: [], directory: [] } as CBuildOptions);
}

export function evaluationState(): BuildFileEvaluationState {
  return { resolvedModels: [], vpaths: [], includeGuard: [] };
}

export async function evaluate(source: string, env = environment(), state = evaluationState()) {
  const models = await new BuildFileEvaluator(env, compile(source), state).evaluateAsync();
  return { env, state, models,
    rules: models.filter((model): model is NormalRule => model instanceof NormalRule),
    patterns: models.filter((model): model is ImplicitPatterRule => model instanceof ImplicitPatterRule) };
}

export async function implicit(source: string, cwd: string, env = environment()) {
  const result = await evaluate(source, env);
  const original = new NormalizeModels(result.rules).normalize();
  const resolver = new ImplicitRuleResolver(original, result.patterns, cwd);
  return { ...result, original, resolver, rules: resolver.resolve() };
}

export function commands(rule: NormalRule, env: Env) {
  return rule.evaluatedRecipeIRs.map((ir) => ir.exec<string>(new RecipeExpansionEngine(env)));
}

export function target(rules: NormalRule[], name: string) {
  const found = rules.find((rule) => rule.target === name);
  if (!found) throw new Error(`Expected resolved target: ${name}`);
  return found;
}

const testRoot = path.dirname(fileURLToPath(import.meta.url));
const fixtures = new Set<string>();

function within(root: string, candidate: string) {
  const relative = path.relative(root, candidate);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative))
    throw new Error("Fixture path escapes the new test directory");
  return candidate;
}

export function fixture() {
  const root = mkdtempSync(path.join(testRoot, ".fixture-"));
  fixtures.add(root);
  return { root,
    path(name: string) { return within(root, path.resolve(root, name)); },
    write(name: string, content = "fixture") {
      const filename = this.path(name);
      mkdirSync(path.dirname(filename), { recursive: true });
      writeFileSync(filename, content);
      return filename;
    },
    cwd() { vi.spyOn(process, "cwd").mockReturnValue(root); },
  };
}

export function cleanup() {
  vi.restoreAllMocks();
  for (const root of fixtures) {
    const absolute = within(testRoot, path.resolve(root));
    if (!path.basename(absolute).startsWith(".fixture-"))
      throw new Error("Refusing to remove a non-fixture directory");
    rmSync(absolute, { recursive: true, force: true });
    fixtures.delete(root);
  }
}
