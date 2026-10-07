import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { TinyMakeEnv } from "@tinymake-backend/env.js";
import { TinyMakeExpansionEngine } from "@tinymake-backend/expansion.js";
import { TinyMakeEvaluator } from "@tinymake-backend/evaluator.js";
import type { EvaluatedRule } from "@tinymake-backend/evaluator.js";
import {
  createDepqGraph,
  deadRuleElemination,
  hasCycle,
} from "@tinymake-backend/graph.js";
import { TinyMakeResolver } from "@tinymake-backend/resolution.js";
import type { ResolvedRule } from "@tinymake-backend/resolution.js";
import type { RuleNode, ValueNode, VarRefPart } from "@tinymake-backend/node-types.js";
import { parseTinyMake } from "./util.js";

// Only filesystem existence is mocked. Expansion, evaluation, resolution and
// graph construction always use the real implementations; no recipes run.
const existingPaths = new Set<string>();

beforeEach(() => {
  existingPaths.clear();
  vi.spyOn(fs, "existsSync").mockImplementation((candidate) =>
    existingPaths.has(String(candidate)),
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

function existingFiles(...names: string[]) {
  for (const name of names) existingPaths.add(path.resolve(process.cwd(), name));
}

function value(...parts: (string | VarRefPart)[]): ValueNode {
  return {
    parts: parts.map((part) =>
      typeof part === "string" ? { name: "text-part", lexeme: part } : part,
    ),
  };
}

function reference(...parts: (string | VarRefPart)[]): VarRefPart {
  return { name: "varref-part", value: value(...parts) };
}

function environment(variables: Record<string, string | ValueNode> = {}) {
  const env = new TinyMakeEnv({
    directory: [],
    includeDir: [],
    oldFile: [],
    assumeOld: [],
    whatIf: [],
    newFile: [],
    assumeNew: [],
  });
  for (const [identifier, contents] of Object.entries(variables)) {
    env.setVariable({
      identifier,
      value: typeof contents === "string"
        ? { kind: "raw", value: contents }
        : { kind: "deffered", value: contents },
    });
  }
  return env;
}

function evaluateMakefile(program: string) {
  const env = environment();
  const nodes = parseTinyMake(program);
  const evaluated = new TinyMakeEvaluator(nodes, env).evaluate();
  return { env, nodes, evaluated };
}

function resolveMakefile(program: string) {
  const evaluation = evaluateMakefile(program);
  const resolver = new TinyMakeResolver(evaluation.evaluated);
  const resolved = resolver.resole();
  return { ...evaluation, resolver, resolved, normalized: resolver.normalize(resolved) };
}

function evaluatedRule(
  target: string,
  preqs: string[] = [],
  recipes: ValueNode[] = [],
): EvaluatedRule {
  return { target, preqs, recipes };
}

function resolvedRule(
  name: string,
  dependencies: string[] = [],
  recipes: ValueNode[] = [],
): ResolvedRule {
  return {
    target: { name, origin: "not-found" },
    preqs: dependencies.map((name) => ({ name, origin: "target" })),
    recipes,
  };
}

function graphFrom(adjacency: Record<string, readonly string[]>) {
  return createDepqGraph(Object.entries(adjacency).map(([name, dependencies]) => ({
    ...resolvedRule(name),
    preqs: dependencies.map((name) => ({
      name,
      origin: Object.hasOwn(adjacency, name) ? "target" as const : "not-found" as const,
    })),
  })));
}

function names(rules: EvaluatedRule[]) {
  return rules.map(({ target, preqs }) => ({ target, preqs }));
}

function ruleNames(rules: ResolvedRule[]) {
  return rules.map((rule) => rule.target.name);
}

// An independent cycle oracle: find the goal's reachable subgraph, then use
// Kahn's topological removal instead of the implementation's recursive DFS.
function cycleByTopologicalRemoval(adjacency: Record<string, string[]>, goal: string) {
  const reachable = new Set<string>();
  const pending = [goal];
  while (pending.length > 0) {
    const name = pending.pop()!;
    if (reachable.has(name) || !Object.hasOwn(adjacency, name)) continue;
    reachable.add(name);
    pending.push(...adjacency[name]);
  }

  const remaining = new Map([...reachable].map((name) => [name, 0]));
  for (const name of reachable) {
    for (const dependency of adjacency[name]) {
      if (reachable.has(dependency)) {
        remaining.set(dependency, remaining.get(dependency)! + 1);
      }
    }
  }

  const ready = [...reachable].filter((name) => remaining.get(name) === 0);
  let removed = 0;
  while (ready.length > 0) {
    const name = ready.pop()!;
    removed++;
    for (const dependency of adjacency[name]) {
      if (!remaining.has(dependency)) continue;
      const count = remaining.get(dependency)! - 1;
      remaining.set(dependency, count);
      if (count === 0) ready.push(dependency);
    }
  }
  return removed !== reachable.size;
}

describe("tinyMake resolution phase", () => {
  describe("variable expansion", () => {
    test.each<{
      name: string;
      variables: Record<string, string | ValueNode>;
      expression: ValueNode;
      expected: string;
    }>([
      { name: "empty expression", variables: {}, expression: value(), expected: "" },
      { name: "literal whitespace", variables: {}, expression: value("  a\tb  "), expected: "  a\tb  " },
      { name: "undefined reference", variables: {}, expression: value(reference("MISSING")), expected: "" },
      { name: "undefined embedded reference", variables: {}, expression: value("pre", reference("MISSING"), "post"), expected: "prepost" },
      { name: "multiple references", variables: { A: "hello", B: "world" }, expression: value(reference("A"), " ", reference("B")), expected: "hello world" },
      { name: "adjacent references", variables: { A: "main", B: ".o" }, expression: value(reference("A"), reference("B")), expected: "main.o" },
      { name: "raw lists before splitting", variables: { TARGETS: " app\tdebug  " }, expression: value(reference("TARGETS")), expected: " app\tdebug  " },
      { name: "deferred reference chain", variables: { A: value(reference("B")), B: value(reference("C")), C: "main.o" }, expression: value(reference("A")), expected: "main.o" },
      { name: "generated variable name", variables: { MODE: "release", FLAGS_release: "-O2" }, expression: value(reference("FLAGS_", reference("MODE"))), expected: "-O2" },
      { name: "several references in a generated name", variables: { PREFIX: "FLAGS", MODE: "debug", FLAGS_debug: "-g" }, expression: value(reference(reference("PREFIX"), "_", reference("MODE"))), expected: "-g" },
      { name: "undefined generated name", variables: { KEY: "missing" }, expression: value(reference(reference("KEY"))), expected: "" },
      { name: "case-sensitive variable names", variables: { A: "upper", a: "lower" }, expression: value(reference("A"), "/", reference("a")), expected: "upper/lower" },
      { name: "raw values are not expanded again", variables: { RAW: "$(OTHER)", OTHER: "replacement" }, expression: value(reference("RAW")), expected: "$(OTHER)" },
      { name: "literal dollars are preserved", variables: {}, expression: value("$PATH/$10"), expected: "$PATH/$10" },
    ])("expands $name", ({ variables, expression, expected }) => {
      const engine = new TinyMakeExpansionEngine(environment(variables));
      expect(engine.expand(expression)).toBe(expected);
    });

    test("uses the updated value of a deferred dependency without mutating its AST", () => {
      const deferred = value("build/", reference("NAME"), ".o");
      const env = environment({ NAME: "first", OBJECT: deferred });
      const engine = new TinyMakeExpansionEngine(env);
      const before = structuredClone(deferred);

      expect(engine.expand(value(reference("OBJECT")))).toBe("build/first.o");
      env.setVariable({ identifier: "NAME", value: { kind: "raw", value: "second" } });
      expect(engine.expand(value(reference("OBJECT")))).toBe("build/second.o");
      expect(deferred).toEqual(before);
    });

    test("expands a variable from an enclosing environment", () => {
      const env = environment();
      env.enclosing = environment({ ROOT: "build" });
      expect(new TinyMakeExpansionEngine(env).expand(value(reference("ROOT"), "/app"))).toBe("build/app");
    });

    test("lets a local variable shadow an enclosing variable during expansion", () => {
      const env = environment({ ROOT: "local" });
      env.enclosing = environment({ ROOT: "parent" });
      expect(new TinyMakeExpansionEngine(env).expand(value(reference("ROOT")))).toBe("local");
    });

    test.each(["__proto__", "constructor", "toString", "hasOwnProperty"])(
      "expands an undefined object-property name to empty text: %s",
      (name) => {
        expect(new TinyMakeExpansionEngine(environment()).expand(value(reference(name)))).toBe("");
      },
    );

    test.each<{
      name: string;
      variables: Record<string, string | ValueNode>;
    }>([
      { name: "direct self-reference", variables: { A: value(reference("A")) } },
      { name: "two-variable loop", variables: { A: value(reference("B")), B: value(reference("A")) } },
      { name: "three-variable loop", variables: { A: value(reference("B")), B: value(reference("C")), C: value(reference("A")) } },
      { name: "cycle through a generated variable name", variables: { NAME: "A", A: value(reference(reference("NAME"))) } },
    ])("reports $name as a variable cycle", ({ variables }) => {
      const engine = new TinyMakeExpansionEngine(environment(variables));
      // A JavaScript stack overflow is not a valid variable-cycle diagnostic.
      expect(() => engine.expand(value(reference("A")))).toThrow(/recursive|circular|cycle/i);
    });
  });

  describe("expanded target and prerequisite names", () => {
    test.each<{
      name: string;
      program: string;
      expected: { target: string; preqs: string[] }[];
    }>([
      {
        name: "the requirements' multi-target example",
        program: "TARGETS = a b\nPREREQS = d e\n$(TARGETS) c: $(PREREQS) f",
        expected: ["a", "b", "c"].map((target) => ({ target, preqs: ["d", "e", "f"] })),
      },
      {
        name: "mixed whitespace and empty words",
        program: "TARGETS =  app\t debug  \nPREQS =  main.o\t utils.o  \n $(TARGETS)  :  $(PREQS)  ",
        expected: ["app", "debug"].map((target) => ({ target, preqs: ["main.o", "utils.o"] })),
      },
      {
        name: "undefined and empty prerequisites",
        program: "EMPTY =\napp: $(MISSING) main.o $(EMPTY) utils.o $(OTHER)",
        expected: [{ target: "app", preqs: ["main.o", "utils.o"] }],
      },
      {
        name: "an entirely empty prerequisite expression",
        program: "app: $(MISSING)",
        expected: [{ target: "app", preqs: [] }],
      },
      {
        name: "undefined references embedded in names",
        program: "app$(MISSING): src/$(MISSING)main.c",
        expected: [{ target: "app", preqs: ["src/main.c"] }],
      },
      {
        name: "concatenation before splitting",
        program: "LEFT = a b\nRIGHT = c d\n$(LEFT)$(RIGHT): $(LEFT)$(RIGHT)",
        expected: ["a", "bc", "d"].map((target) => ({ target, preqs: ["a", "bc", "d"] })),
      },
      {
        name: "prefixes and suffixes around a multi-word expansion",
        program: "NAMES = app debug\nbuild/$(NAMES).out: src/$(NAMES).c",
        expected: ["build/app", "debug.out"].map((target) => ({ target, preqs: ["src/app", "debug.c"] })),
      },
      {
        name: "nested variable names in both sides of a rule",
        program: "MODE = debug\nTARGETS_debug = app tests\nPREQS_debug = main.o test.o\n$(TARGETS_$(MODE)): $(PREQS_$(MODE))",
        expected: ["app", "tests"].map((target) => ({ target, preqs: ["main.o", "test.o"] })),
      },
      {
        name: "variable-generated assignment names",
        program: "PREFIX = APP\n$(PREFIX)_TARGETS = app debug\n$(APP_TARGETS): common.o",
        expected: ["app", "debug"].map((target) => ({ target, preqs: ["common.o"] })),
      },
      {
        name: "forward references in deferred values",
        program: "OBJECTS = $(BASE) extra.o\nBASE = main.o utils.o\napp: $(OBJECTS)",
        expected: [{ target: "app", preqs: ["main.o", "utils.o", "extra.o"] }],
      },
      {
        name: "rule-header expansion at the point of each definition",
        program: "NAME = first\n$(NAME): $(NAME).o\nNAME = second\n$(NAME): $(NAME).o",
        expected: [{ target: "first", preqs: ["first.o"] }, { target: "second", preqs: ["second.o"] }],
      },
      {
        name: "simple assignments versus deferred assignments",
        program: "NAME = first\nFROZEN := $(NAME)\nLIVE = $(NAME)\nNAME = second\n$(FROZEN) $(LIVE):",
        expected: [{ target: "first", preqs: [] }, { target: "second", preqs: [] }],
      },
      {
        name: "escaped dollars in names",
        program: "TARGET = cash$$app\nPREQ = price$$input\n$(TARGET): $(PREQ)",
        expected: [{ target: "cash$app", preqs: ["price$input"] }],
      },
      {
        name: "case-sensitive and path-containing names",
        program: "App app build/app-v2.out: Main.o main.o ../include/config.h",
        expected: ["App", "app", "build/app-v2.out"].map((target) => ({ target, preqs: ["Main.o", "main.o", "../include/config.h"] })),
      },
    ])("handles $name", ({ program, expected }) => {
      expect(names(evaluateMakefile(program).evaluated)).toEqual(expected);
    });

    test("gives each expanded target its own prerequisite array", () => {
      const { evaluated } = evaluateMakefile("TARGETS = a b\n$(TARGETS): common.o");
      expect(evaluated[0].preqs).not.toBe(evaluated[1].preqs);
      evaluated[0].preqs.push("extra.o");
      expect(evaluated[1].preqs).toEqual(["common.o"]);
    });

    test("keeps recipe expressions unchanged throughout resolution", () => {
      const nodes = parseTinyMake("app:\n\techo $(MESSAGE) $$PATH\nMESSAGE = hello");
      const parsedRule = nodes.find((node) => node.type === "rule") as RuleNode;
      const before = structuredClone(parsedRule.recipes);
      const evaluated = new TinyMakeEvaluator(nodes, environment()).evaluate();
      const resolver = new TinyMakeResolver(evaluated);
      const resolved = resolver.resole();
      const normalized = resolver.normalize(resolved);
      expect(evaluated[0].recipes).toBe(parsedRule.recipes);
      expect(resolved[0].recipes).toBe(parsedRule.recipes);
      expect(parsedRule.recipes).toEqual(before);
      expect(normalized[0].recipes).toEqual(before);
      expect(normalized[0].recipes[0]).toBe(parsedRule.recipes[0]);
    });

    test("keeps duplicate expanded targets as one normalized rule", () => {
      const { evaluated, normalized } = resolveMakefile("TARGETS = a a b\n$(TARGETS): common.o");
      expect(evaluated.map((rule) => rule.target)).toEqual(["a", "a", "b"]);
      expect(ruleNames(normalized)).toEqual(["a", "b"]);
      expect(createDepqGraph(normalized).targetRuleMap.a).toBe(normalized[0]);
    });

    test.each(["$(MISSING): main.o", "EMPTY =\n$(EMPTY): main.o", "EMPTY =   \n$(EMPTY):"])(
      "rejects a rule whose targets all disappear after expansion: %j",
      (program) => {
        expect(() => evaluateMakefile(program)).toThrow(/target|empty/i);
      },
    );
  });

  describe("target and prerequisite origin resolution", () => {
    test("resolves an empty rule list", () => {
      expect(new TinyMakeResolver([]).resole()).toEqual([]);
    });

    test("marks a target without a file as not-found while preserving its name", () => {
      expect(new TinyMakeResolver([evaluatedRule("build/app")]).resole()).toEqual([
        { target: { name: "build/app", origin: "not-found" }, preqs: [], recipes: [] },
      ]);
    });

    test("records the actual absolute path of an existing target", () => {
      existingFiles("build/app");
      expect(new TinyMakeResolver([evaluatedRule("build/app")]).resole()[0].target).toEqual({
        name: "build/app", origin: "cwd", absPath: path.resolve(process.cwd(), "build/app"),
      });
    });

    test("finds an existing prerequisite even when its target does not exist", () => {
      existingFiles("src/main.c");
      expect(new TinyMakeResolver([evaluatedRule("app", ["src/main.c"])]).resole()[0].preqs).toEqual([
        { name: "src/main.c", origin: "cwd", absolutePath: path.resolve(process.cwd(), "src/main.c") },
      ]);
    });

    test("does not classify a missing prerequisite as a file because its target exists", () => {
      existingFiles("app");
      expect(new TinyMakeResolver([evaluatedRule("app", ["missing.h"])]).resole()[0].preqs).toEqual([
        { name: "missing.h", origin: "not-found" },
      ]);
    });

    test("recognizes prerequisite rules declared later in the input", () => {
      const resolved = new TinyMakeResolver([
        evaluatedRule("app", ["main.o"]), evaluatedRule("main.o"),
      ]).resole();
      expect(resolved[0].preqs).toEqual([{ name: "main.o", origin: "target" }]);
    });

    test("resolves existing files, declared targets and missing names independently", () => {
      existingFiles("src/main.c");
      const resolved = new TinyMakeResolver([
        evaluatedRule("app", ["src/main.c", "generated.h", "missing.h"]),
        evaluatedRule("generated.h"),
      ]).resole();

      expect(resolved[0].preqs).toEqual([
        { name: "src/main.c", origin: "cwd", absolutePath: path.resolve(process.cwd(), "src/main.c") },
        { name: "generated.h", origin: "target" },
        { name: "missing.h", origin: "not-found" },
      ]);
    });

    test("looks up each prerequisite's own path", () => {
      new TinyMakeResolver([evaluatedRule("app", ["one.h", "two.h"])]).resole();
      expect(fs.existsSync).toHaveBeenCalledWith(path.resolve(process.cwd(), "one.h"));
      expect(fs.existsSync).toHaveBeenCalledWith(path.resolve(process.cwd(), "two.h"));
    });

    test("records different absolute paths for different existing prerequisites", () => {
      existingFiles("app", "src/main.c", "include/config.h");
      const resolved = new TinyMakeResolver([
        evaluatedRule("app", ["src/main.c", "include/config.h"]),
      ]).resole();
      expect(resolved[0].preqs).toEqual([
        { name: "src/main.c", origin: "cwd", absolutePath: path.resolve(process.cwd(), "src/main.c") },
        { name: "include/config.h", origin: "cwd", absolutePath: path.resolve(process.cwd(), "include/config.h") },
      ]);
    });

    test("preserves missing prerequisite order for later build-time diagnostics", () => {
      expect(new TinyMakeResolver([evaluatedRule("app", ["z.h", "a.h"])]).resole()[0].preqs).toEqual([
        { name: "z.h", origin: "not-found" }, { name: "a.h", origin: "not-found" },
      ]);
    });

    test("uses case-sensitive rule names independently of filesystem existence", () => {
      expect(new TinyMakeResolver([
        evaluatedRule("app", ["Main.o", "main.o"]), evaluatedRule("main.o"),
      ]).resole()[0].preqs).toEqual([
        { name: "Main.o", origin: "not-found" }, { name: "main.o", origin: "target" },
      ]);
    });

    test("normalizes parent-directory segments only in the filesystem path", () => {
      existingFiles("../shared/input.h");
      expect(new TinyMakeResolver([evaluatedRule("app", ["../shared/input.h"])]).resole()[0].preqs).toEqual([
        { name: "../shared/input.h", origin: "cwd", absolutePath: path.resolve(process.cwd(), "../shared/input.h") },
      ]);
    });

    test("accepts an already absolute target path", () => {
      const target = path.resolve(process.cwd(), "build", "app");
      existingFiles(target);
      expect(new TinyMakeResolver([evaluatedRule(target)]).resole()[0].target).toEqual({
        name: target, origin: "cwd", absPath: target,
      });
    });

    test("accepts an already absolute prerequisite path", () => {
      const prerequisite = path.resolve(process.cwd(), "src", "main.c");
      existingFiles(prerequisite);
      expect(new TinyMakeResolver([evaluatedRule("app", [prerequisite])]).resole()[0].preqs).toEqual([
        { name: prerequisite, origin: "cwd", absolutePath: prerequisite },
      ]);
    });

    test("does not mutate evaluated names or accumulate results across calls", () => {
      const input = [evaluatedRule("app", ["main.o"]), evaluatedRule("main.o")];
      const before = structuredClone(input);
      const resolver = new TinyMakeResolver(input);
      expect(resolver.resole()).toEqual(resolver.resole());
      expect(input).toEqual(before);
    });
  });

  describe("duplicate-rule normalization", () => {
    const normalize = (rules: ResolvedRule[]) => new TinyMakeResolver([]).normalize(rules);

    test("normalizes an empty list", () => {
      expect(normalize([])).toEqual([]);
    });

    test("combines prerequisites of repeated targets in source order", () => {
      const normalized = normalize([
        resolvedRule("app", ["main.o"]), resolvedRule("app", ["utils.o", "config.h"]),
      ]);
      expect(normalized).toEqual([resolvedRule("app", ["main.o", "utils.o", "config.h"])]);
    });

    test.each([0, 1, 2])("retains a recipe block defined by duplicate rule %i", (index) => {
      const recipes = [value("echo first"), value("echo second")];
      const input = ["main.o", "utils.o", "config.h"].map((dependency, position) =>
        resolvedRule("app", [dependency], position === index ? recipes : []),
      );
      expect(normalize(input)).toEqual([
        resolvedRule("app", ["main.o", "utils.o", "config.h"], recipes),
      ]);
    });

    test("preserves first target occurrence order, including integer-like names", () => {
      const normalized = normalize([
        resolvedRule("10"), resolvedRule("2"), resolvedRule("app"),
        resolvedRule("10", ["config.h"]), resolvedRule("clean"),
      ]);
      expect(ruleNames(normalized)).toEqual(["10", "2", "app", "clean"]);
    });

    test("keeps distinct case-sensitive names separate", () => {
      expect(ruleNames(normalize([resolvedRule("App"), resolvedRule("app")]))).toEqual(["App", "app"]);
    });

    test("merges overlapping expanded target lists by individual target name", () => {
      const { normalized } = resolveMakefile("a b: common\nb c: extra");
      expect(normalized).toEqual([
        {
          target: { name: "a", origin: "not-found" },
          preqs: [{ name: "common", origin: "not-found" }], recipes: [],
        },
        { target: { name: "b", origin: "not-found" }, preqs: [{ name: "common", origin: "not-found" }, { name: "extra", origin: "not-found" }], recipes: [] },
        { target: { name: "c", origin: "not-found" }, preqs: [{ name: "extra", origin: "not-found" }], recipes: [] },
      ]);
    });

    test("preserves prerequisite origin metadata while merging", () => {
      const file = { name: "src/main.c", origin: "cwd" as const, absolutePath: path.resolve(process.cwd(), "src/main.c") };
      const first = resolvedRule("app", ["main.o"]);
      const second = resolvedRule("app");
      second.preqs = [file, { name: "missing.h", origin: "not-found" }];
      expect(normalize([first, second])[0].preqs).toEqual([
        { name: "main.o", origin: "target" }, file, { name: "missing.h", origin: "not-found" },
      ]);
    });

    test("upgrades a missing target to an existing file resolution", () => {
      const found = resolvedRule("app", ["utils.o"]);
      found.target = { name: "app", origin: "cwd", absPath: path.resolve(process.cwd(), "app") };
      const normalized = normalize([resolvedRule("app", ["main.o"]), found]);
      expect(normalized[0].target).toEqual(found.target);
      expect(normalized[0].preqs.map((preq) => preq.name)).toEqual(["main.o", "utils.o"]);
    });

    test("does not downgrade an existing target when a later duplicate is missing", () => {
      const found = resolvedRule("app");
      found.target = { name: "app", origin: "cwd", absPath: path.resolve(process.cwd(), "app") };
      expect(normalize([found, resolvedRule("app")])[0].target).toEqual(found.target);
    });

    test("does not mutate the original rule arrays when merging", () => {
      const input = [resolvedRule("app", ["main.o"], [value("echo app")]), resolvedRule("app", ["utils.o"])];
      const before = structuredClone(input);
      const normalized = normalize(input);
      expect(input).toEqual(before);
      expect(normalized[0].preqs).not.toBe(input[0].preqs);
      expect(normalized[0].recipes).not.toBe(input[0].recipes);
    });

    test.each(["different", "identical"])(
      "rejects %s recipe blocks defined by two rules for the same target",
      (kind) => {
        const first = resolvedRule("app", [], [value("echo first")]);
        const second = resolvedRule("app", [], [value(kind === "identical" ? "echo first" : "echo second")]);
        expect(() => normalize([first, second])).toThrow(/recipe|duplicate|multiple|already/i);
      },
    );

    test("detects duplicate recipes caused by overlapping expanded target lists", () => {
      expect(() => resolveMakefile("a b:\n\techo first\nb c:\n\techo second")).toThrow(/recipe|duplicate|multiple|already/i);
    });
  });

  describe("dependency graph tables", () => {
    test("creates empty tables for an empty graph", () => {
      expect(createDepqGraph([])).toEqual({
        rules: [], targetRuleMap: {}, reverseTargetRuleMap: {}, targetDepqMap: {},
      });
    });

    test("builds all three tables for a diamond with a shared dependency", () => {
      const app = resolvedRule("app", ["main.o", "utils.o"]);
      const main = resolvedRule("main.o", ["common"]);
      const utils = resolvedRule("utils.o", ["common"]);
      const common = resolvedRule("common");
      const input = [app, main, utils, common];
      const graph = createDepqGraph(input);

      expect(graph.rules).toEqual(input);
      expect(graph.targetRuleMap).toEqual({ app, "main.o": main, "utils.o": utils, common });
      expect(graph.targetDepqMap).toEqual({ app: [main, utils], "main.o": [common], "utils.o": [common], common: [] });
      expect(graph.reverseTargetRuleMap).toEqual({ app: [], "main.o": [app], "utils.o": [app], common: [main, utils] });
      expect(graph.targetDepqMap.app[0]).toBe(graph.targetRuleMap["main.o"]);
      expect(graph.reverseTargetRuleMap.common[0]).toBe(graph.targetRuleMap["main.o"]);
      for (const name of ["app", "main.o", "utils.o", "common"]) {
        expect(Object.hasOwn(graph.targetRuleMap, name)).toBe(true);
        expect(Object.hasOwn(graph.targetDepqMap, name)).toBe(true);
        expect(Object.hasOwn(graph.reverseTargetRuleMap, name)).toBe(true);
      }
    });

    test("creates empty forward and reverse lists for isolated targets", () => {
      const first = resolvedRule("first");
      const second = resolvedRule("second");
      const graph = createDepqGraph([first, second]);
      expect(graph.targetDepqMap).toEqual({ first: [], second: [] });
      expect(graph.reverseTargetRuleMap).toEqual({ first: [], second: [] });
    });

    test("resolves edges independently of rule declaration order", () => {
      const dependency = resolvedRule("dependency");
      const app = resolvedRule("app", ["dependency"]);
      for (const input of [[app, dependency], [dependency, app]]) {
        const graph = createDepqGraph(input);
        expect(graph.targetDepqMap.app).toEqual([dependency]);
        expect(graph.reverseTargetRuleMap.dependency).toEqual([app]);
      }
    });

    test("keeps files and missing prerequisites out of the forward rule list", () => {
      const main = resolvedRule("main.o");
      const app = resolvedRule("app", ["main.o"]);
      app.preqs.push(
        { name: "source.c", origin: "cwd", absolutePath: path.resolve(process.cwd(), "source.c") },
        { name: "missing.h", origin: "not-found" },
      );
      const graph = createDepqGraph([app, main]);

      expect(graph.targetDepqMap.app).toEqual([main]);
      expect(graph.targetRuleMap["source.c"]).toBeUndefined();
      expect(graph.targetRuleMap["missing.h"]).toBeUndefined();
      expect(graph.reverseTargetRuleMap["source.c"]).toEqual([app]);
      expect(graph.reverseTargetRuleMap["missing.h"]).toEqual([app]);
    });

    test("keeps an edge to a declared rule even if its prerequisite file exists", () => {
      const dependency = resolvedRule("config.h");
      const app = resolvedRule("app");
      app.preqs = [{ name: "config.h", origin: "cwd", absolutePath: path.resolve(process.cwd(), "config.h") }];
      const graph = createDepqGraph([app, dependency]);
      expect(graph.targetDepqMap.app).toEqual([dependency]);
      expect(graph.reverseTargetRuleMap["config.h"]).toEqual([app]);
    });

    test("represents a self-dependency in both directions", () => {
      const app = resolvedRule("app", ["app"]);
      const graph = createDepqGraph([app]);
      expect(graph.targetDepqMap.app).toEqual([app]);
      expect(graph.reverseTargetRuleMap.app).toEqual([app]);
    });

    test("uses expanded names as hash keys and creates no variable-name entries", () => {
      const { normalized } = resolveMakefile("TARGETS = app debug\nPREQS = common\n$(TARGETS): $(PREQS)\ncommon:");
      const graph = createDepqGraph(normalized);
      expect(Object.keys(graph.targetRuleMap).sort()).toEqual(["app", "common", "debug"]);
      expect(graph.targetRuleMap.TARGETS).toBeUndefined();
      expect(graph.targetRuleMap["$(TARGETS)"]).toBeUndefined();
      expect(ruleNames(graph.reverseTargetRuleMap.common)).toEqual(["app", "debug"]);
    });

    test("does not lose graph edges when duplicate target rules are normalized", () => {
      const { normalized } = resolveMakefile("app: one\napp: two\none:\ntwo:");
      const graph = createDepqGraph(normalized);
      expect(Object.keys(graph.targetRuleMap)).toHaveLength(3);
      expect(ruleNames(graph.targetDepqMap.app)).toEqual(["one", "two"]);
      expect(ruleNames(graph.reverseTargetRuleMap.one)).toEqual(["app"]);
      expect(ruleNames(graph.reverseTargetRuleMap.two)).toEqual(["app"]);
    });

    test("does not leak table entries between separate graph constructions", () => {
      createDepqGraph([resolvedRule("old", ["dependency"]), resolvedRule("dependency")]);
      const graph = createDepqGraph([resolvedRule("new")]);
      expect(Object.keys(graph.targetRuleMap)).toEqual(["new"]);
      expect(graph.targetDepqMap).toEqual({ new: [] });
      expect(graph.reverseTargetRuleMap).toEqual({ new: [] });
    });

    test("preserves graph inputs without modifying prerequisite arrays", () => {
      const input = [resolvedRule("app", ["main.o"]), resolvedRule("main.o")];
      const before = structuredClone(input);
      createDepqGraph(input);
      expect(input).toEqual(before);
    });

    test.each(["__proto__", "constructor", "toString", "hasOwnProperty", "valueOf"])(
      "stores the special target name %s as an own entry in every table",
      (name) => {
        const rule = resolvedRule(name);
        const graph = createDepqGraph([rule]);
        expect(Object.hasOwn(graph.targetRuleMap, name)).toBe(true);
        expect(graph.targetRuleMap[name]).toBe(rule);
        expect(Object.hasOwn(graph.targetDepqMap, name)).toBe(true);
        expect(graph.targetDepqMap[name]).toEqual([]);
        expect(Object.hasOwn(graph.reverseTargetRuleMap, name)).toBe(true);
        expect(graph.reverseTargetRuleMap[name]).toEqual([]);
      },
    );

    test.each(["__proto__", "constructor", "toString"])(
      "supports edges to a special target name: %s",
      (name) => {
        const dependency = resolvedRule(name);
        const app = resolvedRule("app", [name]);
        const graph = createDepqGraph([app, dependency]);
        expect(graph.targetDepqMap.app).toEqual([dependency]);
        expect(graph.reverseTargetRuleMap[name]).toEqual([app]);
        expect(hasCycle(graph, "app")).toBe(false);
      },
    );

    test.each(["__proto__", "constructor", "toString"])(
      "does not resolve an inherited object property as a target: %s",
      (name) => {
        expect(createDepqGraph([resolvedRule("app")]).targetRuleMap[name]).toBeUndefined();
      },
    );
  });

  describe("dependency-cycle detection", () => {
    test.each<{
      name: string;
      adjacency: Record<string, string[]>;
      goal: string;
      expected: boolean;
    }>([
      { name: "a leaf", adjacency: { app: [] }, goal: "app", expected: false },
      { name: "a chain", adjacency: { app: ["a"], a: ["b"], b: [] }, goal: "app", expected: false },
      { name: "a diamond", adjacency: { app: ["a", "b"], a: ["common"], b: ["common"], common: [] }, goal: "app", expected: false },
      { name: "a cross-edge to an already completed branch", adjacency: { app: ["a", "b"], a: ["common"], b: ["a", "common"], common: [] }, goal: "app", expected: false },
      { name: "repeated prerequisites", adjacency: { app: ["a", "a"], a: [] }, goal: "app", expected: false },
      { name: "a missing prerequisite without a rule", adjacency: { app: ["source.c"] }, goal: "app", expected: false },
      { name: "disconnected acyclic components", adjacency: { app: ["a"], a: [], other: ["b"], b: [] }, goal: "app", expected: false },
      { name: "an unreachable cycle", adjacency: { app: [], a: ["b"], b: ["a"] }, goal: "app", expected: false },
      { name: "a self-loop", adjacency: { app: ["app"] }, goal: "app", expected: true },
      { name: "a two-node cycle", adjacency: { app: ["a"], a: ["app"] }, goal: "app", expected: true },
      { name: "a three-node cycle", adjacency: { app: ["a"], a: ["b"], b: ["app"] }, goal: "app", expected: true },
      { name: "a cycle below the requested goal", adjacency: { app: ["a"], a: ["b"], b: ["a"] }, goal: "app", expected: true },
      { name: "a cycle in a later branch", adjacency: { app: ["leaf", "a"], leaf: [], a: ["b"], b: ["a"] }, goal: "app", expected: true },
      { name: "a cycle between two branches", adjacency: { app: ["a", "b"], a: ["b"], b: ["a"] }, goal: "app", expected: true },
      { name: "the cyclic component when explicitly selected", adjacency: { app: [], a: ["b"], b: ["a"] }, goal: "a", expected: true },
    ])("handles $name", ({ adjacency, goal, expected }) => {
      expect(hasCycle(graphFrom(adjacency), goal)).toBe(expected);
    });

    test("detects cycles introduced by variable expansion", () => {
      const { normalized } = resolveMakefile("A = first\nB = second\n$(A): $(B)\n$(B): $(A)");
      expect(hasCycle(createDepqGraph(normalized), "first")).toBe(true);
    });

    test("detects a cycle contributed by a later duplicate target rule", () => {
      const { normalized } = resolveMakefile("app: leaf\napp: branch\nleaf:\nbranch: app");
      expect(hasCycle(createDepqGraph(normalized), "app")).toBe(true);
    });

    test("keeps traversal state isolated between calls and goals", () => {
      const graph = graphFrom({ safe: ["leaf"], leaf: [], a: ["b"], b: ["a"] });
      expect(hasCycle(graph, "safe")).toBe(false);
      expect(hasCycle(graph, "a")).toBe(true);
      expect(hasCycle(graph, "safe")).toBe(false);
      expect(hasCycle(graph, "b")).toBe(true);
    });

    test("matches a topological oracle for all 512 directed graphs with three targets", () => {
      const targets = ["a", "b", "c"];
      for (let mask = 0; mask < (1 << 9); mask++) {
        const adjacency: Record<string, string[]> = { a: [], b: [], c: [] };
        for (let from = 0; from < targets.length; from++) {
          for (let to = 0; to < targets.length; to++) {
            if (mask & (1 << (from * targets.length + to))) {
              adjacency[targets[from]].push(targets[to]);
            }
          }
        }
        const graph = graphFrom(adjacency);
        for (const goal of targets) {
          expect(hasCycle(graph, goal), `edge mask ${mask}, goal ${goal}`).toBe(
            cycleByTopologicalRemoval(adjacency, goal),
          );
        }
      }
    });

    test.each([false, true])("handles a 64-target chain with closing cycle %s", (cyclic) => {
      const input = Array.from({ length: 64 }, (_, index) =>
        resolvedRule(`node-${index}`, index < 63 ? [`node-${index + 1}`] : cyclic ? ["node-0"] : []),
      );
      expect(hasCycle(createDepqGraph(input), "node-0")).toBe(cyclic);
    });
  });

  describe("reachable-rule elimination and graph rebuilding", () => {
    test("retains the requested goal and its transitive dependencies exactly once", () => {
      const graph = graphFrom({ app: ["a", "b"], a: ["common"], b: ["common"], common: [], unused: [] });
      const retained = deadRuleElemination(graph, "app");
      expect(ruleNames(retained)).toEqual(expect.arrayContaining(["app", "a", "b", "common"]));
      expect(retained).toHaveLength(4);
      expect(retained[0]).toBe(graph.targetRuleMap.app);
      expect(new Set(ruleNames(retained)).size).toBe(retained.length);
    });

    test("drops reverse dependents of a selected leaf", () => {
      const graph = graphFrom({ app: ["common"], tests: ["common"], common: [] });
      expect(deadRuleElemination(graph, "common")).toEqual([graph.targetRuleMap.common]);
    });

    test("does not synthesize rule nodes for file-only or missing prerequisites", () => {
      const app = resolvedRule("app");
      app.preqs = [
        { name: "source.c", origin: "cwd", absolutePath: path.resolve(process.cwd(), "source.c") },
        { name: "missing.h", origin: "not-found" },
      ];
      const graph = createDepqGraph([app, resolvedRule("unused")]);
      expect(deadRuleElemination(graph, "app")).toEqual([graph.targetRuleMap.app]);
    });

    test("does not retain the same target twice for repeated prerequisites", () => {
      const graph = graphFrom({ app: ["common", "common"], common: [] });
      expect(ruleNames(deadRuleElemination(graph, "app"))).toEqual(["app", "common"]);
    });

    test("does not mutate the original graph or share traversal state between goals", () => {
      const graph = graphFrom({ app: ["common"], tests: ["common"], common: [], unused: [] });
      const before = structuredClone(graph);
      expect(ruleNames(deadRuleElemination(graph, "app"))).toEqual(["app", "common"]);
      expect(ruleNames(deadRuleElemination(graph, "tests"))).toEqual(["tests", "common"]);
      expect(graph).toEqual(before);
    });

    test("rebuilds all tables without entries from eliminated rules", () => {
      const original = graphFrom({ app: ["common"], common: [], unused: ["other"], other: [] });
      const retained = deadRuleElemination(original, "app");
      const graph = createDepqGraph(retained);
      const [app, common] = retained;
      expect(graph.targetRuleMap).toEqual({ app, common });
      expect(graph.targetDepqMap).toEqual({ app: [common], common: [] });
      expect(graph.reverseTargetRuleMap).toEqual({ app: [], common: [app] });
    });

    test.each<{
      name: string;
      adjacency: Record<string, string[]>;
      expected: string[];
    }>([
      { name: "a self-loop", adjacency: { app: ["app"] }, expected: ["app"] },
      { name: "a two-node cycle", adjacency: { app: ["a"], a: ["app"] }, expected: ["app", "a"] },
      { name: "a cycle below the goal", adjacency: { app: ["a"], a: ["b"], b: ["a"], unused: [] }, expected: ["app", "a", "b"] },
    ])("terminates on $name so cycle detection can run afterwards", ({ adjacency, expected }) => {
      // tinyMake prunes before it calls hasCycle, so pruning must terminate even
      // for cyclic input and leave the cycle intact for the subsequent check.
      const retained = deadRuleElemination(graphFrom(adjacency), "app");
      expect(ruleNames(retained)).toEqual(expect.arrayContaining(expected));
      expect(retained).toHaveLength(expected.length);
      expect(hasCycle(createDepqGraph(retained), "app")).toBe(true);
    });

    test("drops an unreachable cyclic component without following it", () => {
      const graph = graphFrom({ app: ["leaf"], leaf: [], a: ["b"], b: ["a"] });
      const retained = deadRuleElemination(graph, "app");
      expect(ruleNames(retained)).toEqual(["app", "leaf"]);
      expect(hasCycle(createDepqGraph(retained), "app")).toBe(false);
    });
  });

  test("resolves a multi-target project through expansion, normalization and graph pruning", () => {
    const program = [
      "MODE = debug",
      "TARGETS_debug = app tests",
      "OBJECTS = main.o utils.o",
      "$(TARGETS_$(MODE)): $(OBJECTS)",
      "\t$(LINK) $(OBJECTS)",
      "app: generated.h",
      "main.o: shared.o",
      "utils.o: shared.o",
      "shared.o:",
      "generated.h:",
      "unused: missing.h",
      "LINK = gcc",
    ].join("\n");

    const { evaluated, normalized } = resolveMakefile(program);
    expect(evaluated.map((rule) => rule.target)).toEqual([
      "app", "tests", "app", "main.o", "utils.o", "shared.o", "generated.h", "unused",
    ]);
    expect(ruleNames(normalized)).toEqual([
      "app", "tests", "main.o", "utils.o", "shared.o", "generated.h", "unused",
    ]);
    expect(normalized[0].preqs).toEqual([
      { name: "main.o", origin: "target" },
      { name: "utils.o", origin: "target" },
      { name: "generated.h", origin: "target" },
    ]);
    expect(normalized[0].recipes).toHaveLength(1);

    const retained = deadRuleElemination(createDepqGraph(normalized), "app");
    const graph = createDepqGraph(retained);
    expect(ruleNames(retained)).toEqual(expect.arrayContaining([
      "app", "main.o", "utils.o", "shared.o", "generated.h",
    ]));
    expect(retained).toHaveLength(5);
    expect(graph.targetRuleMap.tests).toBeUndefined();
    expect(graph.targetRuleMap.unused).toBeUndefined();
    expect(ruleNames(graph.targetDepqMap.app)).toEqual(["main.o", "utils.o", "generated.h"]);
    expect(ruleNames(graph.reverseTargetRuleMap["shared.o"])).toEqual(["main.o", "utils.o"]);
    expect(graph.reverseTargetRuleMap.app).toEqual([]);
    expect(hasCycle(graph, "app")).toBe(false);
  });
});
