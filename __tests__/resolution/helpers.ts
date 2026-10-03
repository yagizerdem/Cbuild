import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { vi } from "vitest";
import type { CBuildOptions } from "@src/cli.js";
import { Env } from "@src/cbuild-backend/env.js";
import BuildFileEvaluator from "@src/cbuild-backend/evaluator/core/buildfile-evaluator.js";
import { NormalRule, ImplicitPatterRule } from "@src/cbuild-backend/model.js";
import { NormalizeModels } from "@src/cbuild-backend/normalize-models.js";
import { NormalRuleIR, RecipeIR, ValueIR } from "@src/compiler/ir.js";
import { RecipeExpansionEngine, ValueExpansionEngine } from "@src/cbuild-backend/expansion.js";
import { compile } from "@src/test-util/compile.js";

export function environment(options: Partial<CBuildOptions> = {}, parent?: Env): Env {
  const env = new Env({ oldFile: [], assumeOld: [], newFile: [], assumeNew: [], whatIf: [], includeDir: [], ...options } as CBuildOptions);
  env.enclosing = parent;
  return env;
}

// Use the real parser/compiler, rejecting syntax errors rather than manufacturing IR.
export async function evaluate(source: string, env = environment()) {
  const irs = compile(source.endsWith("\n") ? source : `${source}\n`);
  const state = { resolvedModels: [], vpaths: [] };
  const models = await new BuildFileEvaluator(env, irs, state).evaluateAsync();
  const rules = models.filter((model): model is NormalRule => model instanceof NormalRule);
  const patterns = models.filter((model): model is ImplicitPatterRule => model instanceof ImplicitPatterRule);
  return { env, irs, state, models, rules, patterns };
}

export async function normalized(source: string, env = environment()) {
  const result = await evaluate(source, env);
  return { ...result, rules: new NormalizeModels(result.rules).normalize() };
}

export function recipe(expression: string): RecipeIR {
  const [rule] = compile(`probe:\n\t${expression}\n`);
  if (!(rule instanceof NormalRuleIR)) throw new Error("Expected normal rule");
  return rule.recipes[0]!;
}

export function value(expression: string): ValueIR {
  const ir = recipe(expression);
  if (ir.recipe.kind !== "command") throw new Error("Expected command recipe");
  return ir.recipe.command;
}

export function expand(expression: string, env: Env): string {
  return new ValueExpansionEngine(env).expand(value(expression));
}

export function commands(rule: NormalRule, env: Env): string[] {
  return rule.evaluatedRecipeIRs.map((ir) => ir.exec<string>(new RecipeExpansionEngine(env)));
}

export function target(rules: NormalRule[], name: string): NormalRule {
  const found = rules.find((rule) => rule.target === name);
  if (!found) throw new Error(`Test fixture is missing target ${name}`);
  return found;
}

const resolutionRoot = path.dirname(fileURLToPath(import.meta.url));
const activeFixtures = new Set<string>();

export function fixture() {
  const root = mkdtempSync(path.join(resolutionRoot, ".fixture-"));
  activeFixtures.add(root);
  return {
    root,
    path(name: string) {
      const absolute = path.resolve(root, name);
      const relative = path.relative(root, absolute);
      if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("Fixture path escapes test root");
      return absolute;
    },
    write(name: string, content = "fixture", mtimeSeconds?: number) {
      const absolute = this.path(name);
      mkdirSync(path.dirname(absolute), { recursive: true });
      writeFileSync(absolute, content);
      if (mtimeSeconds !== undefined) utimesSync(absolute, mtimeSeconds, mtimeSeconds);
      return absolute;
    },
    directory(name: string) {
      const absolute = this.path(name);
      mkdirSync(absolute, { recursive: true });
      return absolute;
    },
    useAsCwd() {
      // Vitest workers do not support chdir; keep the real cwd untouched.
      vi.spyOn(process, "cwd").mockReturnValue(root);
    },
  };
}

export function cleanupFixtures() {
  vi.restoreAllMocks();
  for (const root of activeFixtures) {
    const relative = path.relative(resolutionRoot, path.resolve(root));
    if (relative.startsWith("..") || path.isAbsolute(relative) || !relative.startsWith(".fixture-")) {
      throw new Error("Refusing to remove a directory outside test/resolution fixtures");
    }
    rmSync(root, { recursive: true, force: true });
    activeFixtures.delete(root);
  }
}
