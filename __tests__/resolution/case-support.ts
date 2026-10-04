import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  utimesSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { vi } from "vitest";
import type { CBuildOptions } from "@src/cli.js";
import { Env } from "@src/cbuild-backend/env.js";
import BuildFileEvaluator from "@src/cbuild-backend/evaluator/core/buildfile-evaluator.js";
import type { BuildFileEvaluationState } from "@src/cbuild-backend/evaluator/core/type.js";
import { NormalRule, ImplicitPatterRule } from "@src/cbuild-backend/model.js";
import { NormalizeModels } from "@src/cbuild-backend/normalize-models.js";
import { NormalRuleIR, type RecipeIR } from "@src/compiler/ir.js";
import {
  RecipeExpansionEngine,
  ValueExpansionEngine,
} from "@src/cbuild-backend/expansion.js";
import { compile } from "@src/test-util/compile.js";
import { ImplicitRuleResolver } from "@src/cbuild-backend/implicit-rule-resolver.js";
import AutomaticVariableEnv from "@src/cbuild-backend/execution/auto-variable.js";
import { resolveTarget } from "@src/cbuild-backend/execution/preq-resolution/target-resolver.js";
import { resolvePreqs } from "@src/cbuild-backend/execution/preq-resolution/preq-resolver.js";
import { OutOfDateChecker } from "@src/cbuild-backend/execution/preq-resolution/out-of-date.js";

export function environment(
  options: Partial<CBuildOptions> = {},
  parent?: Env,
) {
  const env = new Env({
    oldFile: [],
    assumeOld: [],
    newFile: [],
    assumeNew: [],
    whatIf: [],
    includeDir: [],
    ...options,
  } as CBuildOptions);
  env.enclosing = parent;
  return env;
}

export async function evaluate(
  source: string,
  env = environment(),
  state: BuildFileEvaluationState = {
    resolvedModels: [],
    vpaths: [],
    includeGuard: [],
  },
) {
  const irs = compile(source.endsWith("\n") ? source : `${source}\n`);
  const models = await new BuildFileEvaluator(env, irs, state).evaluateAsync();
  const rules = models.filter(
    (model): model is NormalRule => model instanceof NormalRule,
  );
  const patterns = models.filter(
    (model): model is ImplicitPatterRule => model instanceof ImplicitPatterRule,
  );
  return { env, state, irs, models, rules, patterns };
}

export async function normalized(source: string, env = environment()) {
  const result = await evaluate(source, env);
  return { ...result, rules: new NormalizeModels(result.rules).normalize() };
}

export function recipe(expression: string): RecipeIR {
  const [ir] = compile(`probe:\n\t${expression}\n`);
  if (!(ir instanceof NormalRuleIR))
    throw new Error("Fixture must compile to a normal rule");
  return ir.recipes[0]!;
}

export function value(expression: string) {
  const ir = recipe(expression);
  if (ir.recipe.kind !== "command")
    throw new Error("Expected a command recipe");
  return ir.recipe.command;
}

export function expand(expression: string, env: Env) {
  return new ValueExpansionEngine(env).expand(value(expression));
}

export function commands(rule: NormalRule, env: Env) {
  return rule.evaluatedRecipeIRs.map((ir) =>
    ir.exec<string>(new RecipeExpansionEngine(env)),
  );
}

export function target(rules: NormalRule[], name: string) {
  const rule = rules.find((candidate) => candidate.target === name);
  if (!rule) throw new Error(`Test fixture missing target: ${name}`);
  return rule;
}

export async function implicit(
  source: string,
  cwd: string,
  env = environment(),
) {
  const result = await normalized(source, env);
  return {
    ...result,
    original: result.rules,
    rules: new ImplicitRuleResolver(
      result.rules,
      result.patterns,
      cwd,
    ).resolve(),
  };
}

export function automatic(rules: NormalRule[], rule: NormalRule, env: Env) {
  const resolvedTarget = resolveTarget(rules, rule, env);
  const preqs = resolvePreqs(rules, rule, env);
  const age = new OutOfDateChecker(env).resolveOutOfDateSync(
    resolvedTarget,
    preqs.first,
  );
  const scope = new AutomaticVariableEnv(
    rule,
    env,
    resolvedTarget,
    preqs.first,
    preqs.second,
    age,
  ).generate(env.targetEnvs[rule.target]);
  return { scope, age, preqs, resolvedTarget };
}

const testRoot = path.dirname(fileURLToPath(import.meta.url));
const created = new Set<string>();

function within(root: string, candidate: string) {
  const relative = path.relative(root, candidate);
  if (
    relative === ".." ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    throw new Error("Fixture path must remain in test/resolution");
  }
  return candidate;
}

export function fixture() {
  const root = mkdtempSync(path.join(testRoot, ".case-fixture-"));
  created.add(root);
  return {
    root,
    path(name: string) {
      return within(root, path.resolve(root, name));
    },
    write(name: string, contents = "fixture", mtime?: number) {
      const absolute = this.path(name);
      mkdirSync(path.dirname(absolute), { recursive: true });
      writeFileSync(absolute, contents);
      if (mtime !== undefined) utimesSync(absolute, mtime, mtime);
      return absolute;
    },
    cwd() {
      vi.spyOn(process, "cwd").mockReturnValue(root);
    },
  };
}

export function cleanup() {
  vi.restoreAllMocks();
  for (const root of created) {
    const checked = within(testRoot, path.resolve(root));
    if (!path.basename(checked).startsWith(".case-fixture-"))
      throw new Error("Refusing to delete a non-fixture directory");
    rmSync(checked, { recursive: true, force: true });
    created.delete(root);
  }
}

export const OLD = 1_700_000_000;
export const NOW = OLD + 100;
export const NEW = NOW + 100;
