import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { compile } from "@src/test-util/compile.js";
import {
  AssignmentIR,
  ConditionalIR,
  NormalRuleIR,
  RecipeIR,
  ValueIR,
} from "@src/compiler/ir.js";
import {
  RecipeExpansionEngine,
  RecursiveVariableExpansionException,
  ValueExpansionEngine,
} from "@src/cbuild-backend/expansion.js";
import { Env } from "@src/cbuild-backend/env.js";
import type { CBuildOptions } from "@src/cli.js";
import { NormalRule } from "@src/cbuild-backend/model.js";
import AutomaticVariableEnv from "@src/cbuild-backend/execution/auto-variable.js";
import type {
  PreqResolution,
  TargetResolution,
} from "@src/cbuild-backend/execution/preq-resolution/type.js";
import AssignmentIREvaluator from "@src/cbuild-backend/evaluator/assignment-evaluator.js";
import ConditionalIREvaluator from "@src/cbuild-backend/evaluator/conditional-evaluator.js";
import { CbuildException, MachineCode } from "@src/cbuild-exception.js";

// Test numbers correspond to the requested 101-case coverage list.
// Every expression below is parsed and compiled; no hand-built expression IR.
function environment(parent?: Env): Env {
  const env = new Env({} as CBuildOptions);
  env.enclosing = parent;
  return env;
}

function compiledRule(command: string, prerequisites = ""): NormalRuleIR {
  const [rule] = compile(`build/app: ${prerequisites}\n\t${command}\n`);
  expect(rule).toBeInstanceOf(NormalRuleIR);
  return rule as NormalRuleIR;
}

function recipe(command: string): RecipeIR {
  return compiledRule(command).recipes[0]!;
}

function value(expression: string): ValueIR {
  const ir = recipe(expression);
  if (ir.recipe.kind !== "command") throw new Error("Expected command recipe");
  return ir.recipe.command;
}

function expand(expression: string, env = environment()): string {
  return recipe(expression).exec<string>(new RecipeExpansionEngine(env));
}

function deferred(env: Env, name: string, expression: string): void {
  env.setDeferredVariable(name, value(expression));
}

function automatic(
  command: string,
  parent = environment(),
  names = ["src/a.ts", "lib/b.ts", "src/a.ts", "src/c.ts", "other/a.ts"],
  orderOnly = ["cache", "build/stamp", "cache"],
  stale = [0, 2, 4],
) {
  const header = `${names.join(" ")}${orderOnly.length ? ` | ${orderOnly.join(" ")}` : ""}`;
  const ir = compiledRule(command, header);
  const engine = new ValueExpansionEngine(parent);
  const rule = new NormalRule({
    target: engine.expand(ir.targets[0]!),
    prerequisites: ir.prerequisites.map((item) => engine.expand(item)),
    orderOnlyPrerequisites: ir.orderOnlyPrerequisites.map((item) => engine.expand(item)),
    shellCommands: [],
    recipeIRs: ir.recipes,
    evaluatedRecipeIRs: ir.recipes,
    ruleIR: ir,
    ruleSeperator: ir.separator,
  });
  const resolve = (preqName: string): PreqResolution => ({
    preqName,
    vpathRules: [],
    origin: { type: "cwd", absolutePath: path.resolve(preqName) },
  });
  const preqs = rule.prerequisites.map(resolve);
  const target: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "cwd", absolutePath: path.resolve(rule.target) },
  };
  // Supply a deterministic freshness result: timestamp resolution is not under test.
  const env = new AutomaticVariableEnv(
    rule, parent, target, preqs, rule.orderOnlyPrerequisites.map(resolve),
    {
      resolvedTarget: target,
      resolvedPreqs: preqs,
      isTargetOutOfDate: stale.length > 0,
      outOfDatePreqs: stale.map((index) => preqs[index]!),
    },
  ).generate();
  return { env, ir, run: () => ir.recipes[0]!.exec<string>(new RecipeExpansionEngine(env)) };
}

function expectError(action: () => unknown, message: string): void {
  let caught: unknown;
  try {
    action();
  } catch (error) {
    caught = error;
  }
  expect(caught).toBeInstanceOf(CbuildException);
  expect(caught).toMatchObject({ machineCode: MachineCode.ERROR_FN, message });
}

afterEach(() => vi.restoreAllMocks());

describe("recipe automatic variables: parser -> compiler -> expansion", () => {
  test.each([
    [1, "$(+F)", "a.ts b.ts a.ts c.ts a.ts"],
    [2, "$(+D)", "src lib src src other"],
    [3, "$(?F)", "a.ts a.ts"],
    [4, "$(?D)", "src other"],
    [5, "$(|)", "cache build/stamp"],
    [6, "${+F}", "a.ts b.ts a.ts c.ts a.ts"],
    [7, "${+D}", "src lib src src other"],
    [8, "${?F}", "a.ts a.ts"],
    [9, "${?D}", "src other"],
    [10, "${|}", "cache build/stamp"],
  ])("%i. recipe reference %s", (_id, expression, expected) => {
    expect(automatic(`echo [${expression}]`).run()).toBe(`echo [${expected}]`);
  });

  test("11. prerequisite automatic variables are empty without prerequisites", () => {
    expect(automatic("echo [$<][$^][$+][$?][$|]", environment(), [], [], []).run())
      .toBe("echo [][][][][]");
  });

  test("12. prerequisite D/F variants are empty, target D/F remain available", () => {
    expect(automatic(
      "echo [$(<D)][$(<F)][$(^D)][$(^F)][$(+D)][$(+F)][$(?D)][$(?F)]|$(@D)|$(@F)",
      environment(), [], [], [],
    ).run()).toBe("echo [][][][][][][][]|build|app");
  });

  test.each([
    [13, "$+", "src/a.ts lib/b.ts src/a.ts src/c.ts other/a.ts"],
    [14, "$(+D)", "src lib src src other"],
    [15, "$(+F)", "a.ts b.ts a.ts c.ts a.ts"],
    [16, "$^", "src/a.ts lib/b.ts src/c.ts other/a.ts"],
    [17, "$(^D)", "src lib src other"],
    [18, "$(^F)", "a.ts b.ts c.ts a.ts"],
    [19, "$?", "src/a.ts other/a.ts"],
    [20, "$(?D)", "src other"],
    [21, "$(?F)", "a.ts a.ts"],
    [22, "$|", "cache build/stamp"],
  ])("%i. duplicate behavior of %s", (_id, expression, expected) => {
    // Distinct files sharing a basename/directory must survive D/F projection.
    expect(automatic(`echo ${expression}`).run()).toBe(`echo ${expected}`);
  });

  test("23. automatic variables shadow values through nested environments", () => {
    const global = environment();
    global.setRawVariable("+F", "global");
    const local = environment(global);
    local.setRawVariable("+F", "local");
    const auto = automatic("echo $(+F)", local);
    const child = environment(auto.env);
    expect(expand("echo $(+F)", child)).toBe("echo a.ts b.ts a.ts c.ts a.ts");
    expect(local.requireRawVariable("+F")).toBe("local");
    expect(global.requireRawVariable("+F")).toBe("global");
  });

  test("24. automatic bindings win locally without overwriting global variables", () => {
    const global = environment();
    global.setRawVariable("+", "global-list", "command-line");
    global.setRawVariable("MODE", "debug");
    const original = global.requireVariable("+");
    const auto = automatic("echo $+|$(MODE)", global, ["input.ts"], [], []);
    expect(auto.run()).toBe("echo input.ts|debug");
    expect(auto.env.requireVariable("+").origin).toBe("automatic");
    expect(global.requireVariable("+")).toBe(original);
    expect(global.requireRawVariable("+")).toBe("global-list");
  });
});

describe("call scope", () => {
  test("25. call binds $(0) to the function name", () => {
    const env = environment();
    deferred(env, "label", "$(0):$(1)");
    expect(expand("$(call label,arg)", env)).toBe("label:arg");
  });
  test("26. nested call restores the outer $(0)", () => {
    const env = environment();
    deferred(env, "inner", "$(0)");
    deferred(env, "outer", "$(0)|$(call inner)|$(0)");
    expect(expand("$(call outer)", env)).toBe("outer|inner|outer");
  });
  test("27. missing inner positional arguments shadow outer arguments", () => {
    const env = environment();
    deferred(env, "inner", "[$(1)][$(2)][$(9)]");
    deferred(env, "outer", "$(call inner,x)|$(2)|$(9)");
    expect(expand("$(call outer,a,b,c,d,e,f,g,h,i)", env)).toBe("[x][][]|b|i");
  });
  test("28. nested calls isolate arguments beyond position nine", () => {
    const env = environment();
    const args = Array.from({ length: 12 }, (_, i) => `a${i + 1}`).join(",");
    deferred(env, "inner", "[$(1)][$(10)][$(12)]");
    deferred(env, "outer", `$(call inner,${args})|$(call inner,x)|$(10)|$(12)`);
    expect(expand(`$(call outer,${args})`, env))
      .toBe("[a1][a10][a12]|[x][][]|a10|a12");
  });
  test("29. call leaves existing positional bindings intact and adds none", () => {
    const env = environment();
    env.setRawVariable("0", "root");
    env.setRawVariable("1", "saved");
    deferred(env, "fn", "$(0):$(1):$(2)");
    const entries = [...env.variableEntries()];
    expect(expand("$(call fn,x,y)|$(0)|$(1)|$(2)", env)).toBe("fn:x:y|root|saved|");
    expect([...env.variableEntries()]).toEqual(entries);
  });
  test("30. call exception leaves positional bindings intact", () => {
    const env = environment();
    env.setRawVariable("1", "saved");
    deferred(env, "fail", "$(error failed-$(1))");
    const entries = [...env.variableEntries()];
    expectError(() => expand("$(call fail,x)", env), "failed-x");
    expect([...env.variableEntries()]).toEqual(entries);
    expect(expand("[$(0)][$(1)][$(2)]", env)).toBe("[][saved][]");
  });
  test("31. nested call exception cleans every call scope", () => {
    const env = environment();
    deferred(env, "inner", "$(error $(0)-$(1))");
    deferred(env, "outer", "$(call inner,$(1))");
    const entries = [...env.variableEntries()];
    expectError(() => expand("$(call outer,x)", env), "inner-x");
    expect([...env.variableEntries()]).toEqual(entries);
    deferred(env, "inner", "$(0):$(1)");
    expect(expand("$(call outer,recovered)", env)).toBe("inner:recovered");
    expect(env.hasVariable("0")).toBe(false);
    expect(env.hasVariable("1")).toBe(false);
  });
  test("32. call finds global variables", () => {
    const global = environment();
    global.setRawVariable("GLOBAL", "root");
    deferred(global, "fn", "$(GLOBAL)-$(1)");
    expect(expand("$(call fn,x)", environment(global))).toBe("root-x");
  });
  test("33. call resolves enclosing variables before global variables", () => {
    const global = environment();
    global.setRawVariable("NAME", "global");
    deferred(global, "fn", "$(NAME)");
    const local = environment(global);
    local.setRawVariable("NAME", "local");
    expect(expand("$(call fn)", local)).toBe("local");
  });
  test("34. nested deferred variables see the current call arguments", () => {
    const env = environment();
    deferred(env, "leaf", "$(1)-$(SUFFIX)");
    deferred(env, "middle", "$(leaf)");
    deferred(env, "fn", "$(middle)");
    env.setRawVariable("SUFFIX", "tail");
    expect(expand("$(call fn,head)", env)).toBe("head-tail");
  });
  test("35. call expands its function name", () => {
    const env = environment();
    env.setRawVariable("SELECT", "fn");
    deferred(env, "fn", "$(0):$(1)");
    expect(expand("$(call $(SELECT),x)", env)).toBe("fn:x");
  });
});

describe("foreach scope", () => {
  test("36. foreach restores the exact previous iterator variable", () => {
    const env = environment();
    deferred(env, "item", "$(BASE)");
    env.setRawVariable("BASE", "saved");
    const original = env.requireVariable("item");
    expect(expand("$(foreach item,a b,[$(item)])|$(item)", env)).toBe("[a] [b]|saved");
    expect(env.requireVariable("item")).toBe(original);
  });
  test("37. nested foreach iterators shadow enclosing values", () => {
    const global = environment();
    global.setRawVariable("i", "global-i");
    global.setRawVariable("j", "global-j");
    const env = environment(global);
    expect(expand("$(foreach i,a b,$(foreach j,1 2,$(i)$(j)))|$(i)|$(j)", env))
      .toBe("a1 a2 b1 b2|global-i|global-j");
    expect(env.variableCount).toBe(0);
  });
  test("38. nested foreach with the same iterator restores the outer iteration", () => {
    expect(expand("$(foreach x,a b,$(x):$(foreach x,1 2,$(x)):$(x))"))
      .toBe("a:1 2:a b:1 2:b");
  });
  test("39. foreach exception removes new iterators and restores old ones", () => {
    for (const existing of [false, true]) {
      const env = environment();
      if (existing) env.setRawVariable("x", "saved");
      const entries = [...env.variableEntries()];
      expectError(() => expand("$(foreach x,a b,$(error fail-$(x)))", env), "fail-a");
      expect([...env.variableEntries()]).toEqual(entries);
    }
  });
  test("40. foreach containing call cleans scopes on success and failure", () => {
    const env = environment();
    deferred(env, "fn", "$(1)-$(x)");
    expect(expand("$(foreach x,a b,$(call fn,$(x)))", env)).toBe("a-a b-b");
    deferred(env, "fn", "$(error fail-$(1))");
    const entries = [...env.variableEntries()];
    expectError(() => expand("$(foreach x,a b,$(call fn,$(x)))", env), "fail-a");
    expect([...env.variableEntries()]).toEqual(entries);
  });
  test("41. call containing foreach cleans scopes on success and failure", () => {
    const env = environment();
    env.setRawVariable("x", "saved");
    deferred(env, "fn", "$(foreach x,a b,$(1)-$(x))");
    expect(expand("$(call fn,arg)|$(x)", env)).toBe("arg-a arg-b|saved");
    deferred(env, "fn", "$(foreach x,a b,$(error $(1)-$(x)))");
    const entries = [...env.variableEntries()];
    expectError(() => expand("$(call fn,arg)", env), "arg-a");
    expect([...env.variableEntries()]).toEqual(entries);
  });
  test("42. foreach body looks up enclosing variables", () => {
    const parent = environment();
    parent.setRawVariable("PREFIX", "root");
    expect(expand("$(foreach x,a b,$(PREFIX)-$(x))", environment(parent)))
      .toBe("root-a root-b");
  });
});

describe("recursion and reusable engine exception cleanup", () => {
  test.each([
    [43, "direct self recursion", { A: "$(A)" }],
    [44, "indirect recursion", { A: "$(B)", B: "$(A)" }],
    [45, "four-variable cycle", { A: "$(B)", B: "$(C)", C: "$(D)", D: "$(A)" }],
    [46, "recursion inside nested functions", { A: "$(strip $(if yes,$(B),ok))", B: "$(A)" }],
  ])("%i. %s", (_id, _name, definitions) => {
    const env = environment();
    for (const [name, expression] of Object.entries(definitions)) deferred(env, name, expression!);
    expect(() => expand("$(A)", env)).toThrowError(new RecursiveVariableExpansionException("A"));
  });

  test.each([
    [47, "recursion exception", { A: "$(B)", B: "$(A)" }, "recursive"],
    [48, "function exception", { A: "$(error boom)" }, "function"],
    [49, "nested exception", { A: "$(strip $(B))", B: "$(if yes,$(error boom),ok)" }, "function"],
  ])("%i. active lookups are cleared after %s", (_id, _name, definitions, kind) => {
    const env = environment();
    for (const [name, expression] of Object.entries(definitions)) deferred(env, name, expression!);
    const active = new Set<string>();
    const engine = new ValueExpansionEngine(env, active);
    const expression = value("$(A)");
    if (kind === "recursive") expect(() => engine.expand(expression)).toThrow(RecursiveVariableExpansionException);
    else expectError(() => engine.expand(expression), "boom");
    expect([...active]).toEqual([]);
    deferred(env, "A", "recovered");
    expect(engine.expand(expression)).toBe("recovered");
    expect([...active]).toEqual([]);
  });
  test("50. the same recipe engine works again after an exception", () => {
    const env = environment();
    deferred(env, "A", "$(error boom)");
    const engine = new RecipeExpansionEngine(env);
    const ir = recipe("echo $(A)");
    expectError(() => ir.exec(engine), "boom");
    deferred(env, "A", "ok");
    expect(ir.exec(engine)).toBe("echo ok");
    expect(ir.exec(engine)).toBe("echo ok");
  });
});

describe("wildcard expansion against isolated real files", () => {
  let directory: string;
  let relative: string;
  const slash = (input: string) => input.replaceAll("\\", "/");
  const words = (output: string) => output === "" ? [] : output.split(/\s+/).map(slash);
  beforeEach(() => {
    // Unique directory under cwd permits relative tests without process.chdir.
    directory = mkdtempSync(path.join(process.cwd(), ".recipe-expansion-"));
    relative = slash(path.relative(process.cwd(), directory));
    mkdirSync(path.join(directory, "nested"));
    for (const name of ["a.ts", "b.txt", ".hidden.ts", "nested/c.ts"]) {
      writeFileSync(path.join(directory, name), "fixture");
    }
  });
  afterEach(() => {
    if (!directory) return;
    const inside = path.relative(process.cwd(), directory);
    if (path.isAbsolute(inside) || !inside.startsWith(".recipe-expansion-") || inside.includes(path.sep)) {
      throw new Error("Refusing to remove a directory outside the test fixture");
    }
    rmSync(directory, { recursive: true, force: true });
  });
  const wildcard = (patterns: string, env = environment()) => {
    env.setRawVariable("PATTERNS", patterns);
    return words(expand("$(wildcard $(PATTERNS))", env));
  };
  test("51. unmatched wildcard produces no words", () => {
    expect(wildcard(`${relative}/*.missing`)).toEqual([]);
  });
  test("52. a literal existing filename is returned", () => {
    expect(wildcard(`${relative}/a.ts`)).toEqual([`${relative}/a.ts`]);
  });
  test.each([
    [53, "leading whitespace", "  \t", " ", ""],
    [54, "trailing whitespace", "", " ", " \t "],
    [55, "consecutive spaces", "", "    ", ""],
    [56, "tab-separated patterns", "", "\t", ""],
    [57, "mixed whitespace", "\t ", " \t\n  ", "\n\t"],
  ])("%i. wildcard handles %s", (_id, _name, leading, separator, trailing) => {
    expect(wildcard(`${leading}${relative}/a.ts${separator}${relative}/b.txt${trailing}`))
      .toEqual([`${relative}/a.ts`, `${relative}/b.txt`]);
  });
  test("58. duplicate patterns preserve duplicate results", () => {
    expect(wildcard(`${relative}/a.ts ${relative}/a.ts`))
      .toEqual([`${relative}/a.ts`, `${relative}/a.ts`]);
  });
  test("59. relative directory patterns find nested files", () => {
    expect(wildcard(`${relative}/nested/*.ts`)).toEqual([`${relative}/nested/c.ts`]);
  });
  test("60. absolute path patterns return absolute paths", () => {
    expect(wildcard(`${slash(directory)}/*.ts`)).toEqual([`${slash(directory)}/a.ts`]);
  });
  test("61. hidden files require an explicitly matching dot pattern", () => {
    expect(wildcard(`${relative}/*.ts`)).toEqual([`${relative}/a.ts`]);
    expect(wildcard(`${relative}/.*.ts`)).toEqual([`${relative}/.hidden.ts`]);
  });
  test("62. wildcard expands nested variables", () => {
    const env = environment();
    env.setRawVariable("DIR", relative);
    deferred(env, "PATTERN", "$(DIR)/nested/*.ts");
    expect(words(expand("$(wildcard $(PATTERN))", env))).toEqual([`${relative}/nested/c.ts`]);
  });
  test("63. wildcard expands nested functions", () => {
    const env = environment();
    env.setRawVariable("DIR", relative);
    expect(words(expand("$(wildcard $(addsuffix /a.ts,$(strip $(DIR))))", env)))
      .toEqual([`${relative}/a.ts`]);
  });
  test("64. an empty expanded wildcard argument produces no words", () => {
    expect(expand("$(wildcard $(MISSING))")).toBe("");
  });
});

describe("computed variable names and recipe integration", () => {
  test("65. nested variable references construct a variable name", () => {
    const env = environment();
    env.setRawVariable("KEY", "NAME");
    env.setRawVariable("NAME", "value");
    expect(expand("$($(KEY))", env)).toBe("value");
  });
  test("66. a nested function constructs a variable name", () => {
    const env = environment();
    env.setRawVariable("NAME", "value");
    expect(expand("$($(strip NAME))", env)).toBe("value");
  });
  test("67. dynamic names combine literal and expanded components", () => {
    const env = environment();
    env.setRawVariable("MODE", "debug");
    env.setRawVariable("flags_debug", "-g");
    expect(expand("$(flags_$(MODE))", env)).toBe("-g");
  });
  test("68. the parser and compiler preserve complete automatic variable names", () => {
    for (const name of ["+F", "+D", "?F", "?D", "|", "^F", "^D", "<F", "<D", "@F", "@D"]) {
      for (const expression of [`$(${name})`, `\${${name}}`]) {
        const parts = value(expression).parts;
        expect(parts).toHaveLength(1);
        const part = parts[0]!;
        expect(part.kind).toBe("variable-reference");
        if (part.kind !== "variable-reference") throw new Error("Expected reference");
        // Lexer tokens may compile to separate text parts; their complete name
        // must be preserved, without requiring a particular IR chunk layout.
        expect(part.nameExpr.parts.every((item) => item.kind === "text")).toBe(true);
        expect(part.nameExpr.parts.map((item) => item.kind === "text" ? item.lexeme : "").join(""))
          .toBe(name);
      }
    }
  });
  test("69. lexer punctuation tokens survive inside variable names", () => {
    const env = environment();
    for (const name of ["+F", "?D", "|", "@F", "^D", "<F", "a-b", "a.b", "a/b"]) {
      env.setRawVariable(name, `value:${name}`);
      expect(expand(`$(${name})`, env)).toBe(`value:${name}`);
      expect(expand(`\${${name}}`, env)).toBe(`value:${name}`);
    }
  });
  test("70. parentheses and braces are equivalent for computed references", () => {
    const env = environment();
    env.setRawVariable("KEY", "NAME");
    env.setRawVariable("NAME", "value");
    expect(expand("$(NAME)|${NAME}|$($(KEY))|${${KEY}}", env)).toBe("value|value|value|value");
  });
  test("71. a variable named after a function remains distinct from its invocation", () => {
    const env = environment();
    env.setRawVariable("strip", "variable");
    expect(expand("$(strip)|${strip}|$(strip   a   b  )", env)).toBe("variable|variable|a b");
  });
  test("72. undefined dynamic variable names expand to empty", () => {
    const env = environment();
    env.setRawVariable("KEY", "absent");
    expect(expand("before$($(KEY))after", env)).toBe("beforeafter");
  });
  test("73. an empty dynamic variable name expands to empty", () => {
    expect(expand("before$($(MISSING))after")).toBe("beforeafter");
  });
  test("74. recipes expand raw variables without interpreting their contents", () => {
    const env = environment();
    env.setRawVariable("RAW", "$(error must-not-run)");
    expect(expand("echo $(RAW)", env)).toBe("echo $(error must-not-run)");
  });
  test("75. recipes evaluate deferred variables", () => {
    const env = environment();
    env.setRawVariable("NAME", "world");
    deferred(env, "GREETING", "hello $(NAME)");
    expect(expand("echo $(GREETING)", env)).toBe("echo hello world");
  });
  test("76. recipes expand nested functions", () => {
    expect(expand("echo $(addprefix obj/,$(addsuffix .o,$(strip a   b)))"))
      .toBe("echo obj/a.o obj/b.o");
  });
  test("77. recipes combine automatic and normal variables", () => {
    const env = environment();
    env.setRawVariable("TOOL", "compiler");
    expect(automatic("$(TOOL) $(+F)", env, ["src/a.ts"], [], []).run())
      .toBe("compiler a.ts");
  });
  test("78. recipe expansion propagates function errors", () => {
    expectError(() => expand("echo $(error recipe-failed)"), "recipe-failed");
  });
  test("79. immediate assignment expansion rejects without installing a value", async () => {
    const env = environment();
    const [ir] = compile("RESULT := $(error assignment-failed)\n");
    expect(ir).toBeInstanceOf(AssignmentIR);
    await expect(new AssignmentIREvaluator(env, ir as AssignmentIR).evaluate())
      .rejects.toMatchObject({ machineCode: MachineCode.ERROR_FN, message: "assignment-failed" });
    expect(env.hasVariable("RESULT")).toBe(false);
  });
  test("80. conditional expansion propagates errors before selecting a branch", () => {
    const env = environment();
    const [ir] = compile("ifeq ($(error condition-failed),yes)\nRESULT = yes\nelse\nRESULT = no\nendif\n");
    expect(ir).toBeInstanceOf(ConditionalIR);
    expectError(() => new ConditionalIREvaluator(env, ir as ConditionalIR).execute(), "condition-failed");
    expect(env.variableCount).toBe(0);
  });
});

describe("evaluation order, laziness and diagnostics", () => {
  test("81. ordinary function arguments evaluate from left to right", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(expand("$(subst $(warning first)a,$(warning second)b,$(warning third)a)"))
      .toBe("b");
    expect(warn.mock.calls).toEqual([["first"], ["second"], ["third"]]);
  });
  test("82. foreach does not evaluate its body for an empty list", () => {
    expect(expand("$(foreach x,$(MISSING),$(error unused))")).toBe("");
  });
  test("83. if expands only the selected branch", () => {
    expect(expand("$(if yes,chosen,$(error unused))")).toBe("chosen");
    expect(expand("$(if $(MISSING),$(error unused),fallback)")).toBe("fallback");
  });
  test("84. or stops at the first nonempty argument", () => {
    expect(expand("$(or $(MISSING),chosen,$(error unused))")).toBe("chosen");
  });
  test("85. and stops at the first empty argument", () => {
    expect(expand("$(and yes,$(MISSING),$(error unused))")).toBe("");
    expect(expand("$(and first,last)")).toBe("last");
  });
  test("86. call evaluates arguments before its body, in caller scope", () => {
    const env = environment();
    env.setRawVariable("1", "caller");
    deferred(env, "fn", "$(warning body)$(1)-$(2)");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(expand("$(call fn,$(warning first)a,$(warning second)$(1))", env))
      .toBe("a-caller");
    expect(warn.mock.calls).toEqual([["first"], ["second"], ["body"]]);
  });
  test("87. foreach evaluates name and list once, then body in word order", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(expand("$(foreach $(warning name)x,$(warning list)a b,$(warning body-$(x))[$(x)])"))
      .toBe("[a] [b]");
    expect(warn.mock.calls).toEqual([["name"], ["list"], ["body-a"], ["body-b"]]);
  });
  test("88. error expands its message argument", () => {
    const env = environment();
    env.setRawVariable("MESSAGE", "expanded-message");
    expectError(() => expand("$(error $(MESSAGE))", env), "expanded-message");
  });
  test("89. warning expands its message argument and returns empty", () => {
    const env = environment();
    env.setRawVariable("MESSAGE", "expanded-message");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(expand("before$(warning $(MESSAGE))after", env)).toBe("beforeafter");
    expect(warn.mock.calls).toEqual([["expanded-message"]]);
  });
  test("90. error evaluates nested message functions", () => {
    expectError(() => expand("$(error $(strip $(addprefix failed-,x)))"), "failed-x");
  });
  test("91. warning evaluates nested message functions", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(expand("$(warning $(strip $(addprefix warn-,x)))")).toBe("");
    expect(warn.mock.calls).toEqual([["warn-x"]]);
  });
  test("92. undefined warnings respect lookup through nested environments", () => {
    const root = environment();
    root.setRawVariable("KNOWN", "found");
    const env = environment(environment(root));
    env.cliOptions.warnUndefinedVariables = true;
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(expand("$(KNOWN)|$(MISSING)", env)).toBe("found|");
    expect(warn.mock.calls).toEqual([["cbuild: warning: undefined variable 'MISSING'"]]);
  });
  test("93. undefined warnings use the expanded dynamic name", () => {
    const env = environment();
    env.cliOptions.warnUndefinedVariables = true;
    env.setRawVariable("KEY", "missing_dynamic");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(expand("$($(KEY))", env)).toBe("");
    expect(warn.mock.calls).toEqual([["cbuild: warning: undefined variable 'missing_dynamic'"]]);
  });
});

describe("variable lifetime, empty results and deep expansion", () => {
  test("94. raw contents stay literal through nested deferred, call and foreach expansion", () => {
    const env = environment();
    env.setRawVariable("RAW", "$(error must-not-run)");
    deferred(env, "ALIAS", "$(RAW)");
    deferred(env, "identity", "$(1)");
    expect(expand("$(strip $(ALIAS))|$(call identity,$(ALIAS))|$(foreach x,a,$(ALIAS))", env))
      .toBe("$(error must-not-run)|$(error must-not-run)|$(error must-not-run)");
  });
  test("95. deferred variables evaluate on every access", () => {
    const env = environment();
    deferred(env, "A", "$(warning evaluated)value");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(expand("$(A)|$(A)", env)).toBe("value|value");
    expect(warn.mock.calls).toEqual([["evaluated"], ["evaluated"]]);
    expect(env.requireVariable("A").isDeferred()).toBe(true);
  });
  test("96. deferred assignment sees later environment changes", async () => {
    const env = environment();
    env.setRawVariable("BASE", "before");
    const [ir] = compile("RESULT = $(BASE)\n");
    await new AssignmentIREvaluator(env, ir as AssignmentIR).evaluate();
    const engine = new RecipeExpansionEngine(env);
    const command = recipe("$(RESULT)");
    expect(command.exec(engine)).toBe("before");
    env.setRawVariable("BASE", "after");
    expect(command.exec(engine)).toBe("after");
  });
  test("97. immediate assignment retains its value after environment changes", async () => {
    const env = environment();
    env.setRawVariable("BASE", "before");
    const [ir] = compile("RESULT := $(BASE)\n");
    await new AssignmentIREvaluator(env, ir as AssignmentIR).evaluate();
    env.setRawVariable("BASE", "after");
    expect(expand("$(RESULT)|$(BASE)", env)).toBe("before|after");
    expect(env.requireVariable("RESULT").isDeferred()).toBe(false);
  });
  test("98. empty expansions preserve surrounding text exactly", () => {
    expect(expand("echo before[$(MISSING)]$(if $(MISSING),unused,$(MISSING))after"))
      .toBe("echo before[]after");
  });
  test("99. a deep deferred chain expands and leaves no active lookups", () => {
    const env = environment();
    const depth = 200;
    env.setRawVariable(`V${depth}`, "leaf");
    for (let i = depth - 1; i >= 0; i--) deferred(env, `V${i}`, `[$(V${i + 1})]`);
    const active = new Set<string>();
    const engine = new ValueExpansionEngine(env, active);
    expect(engine.expand(value("$(V0)"))).toBe("[".repeat(depth) + "leaf" + "]".repeat(depth));
    expect(active.size).toBe(0);
  });
  test("100. deeply nested functions survive parsing, compilation and expansion", () => {
    let expression = "leaf";
    for (let i = 0; i < 64; i++) expression = `$(strip ${expression})`;
    expect(expand(`before[${expression}]after`)).toBe("before[leaf]after");
  });
  test("101. deeply nested variable names survive the complete recipe pipeline", () => {
    const env = environment();
    const depth = 64;
    for (let i = 0; i < depth; i++) env.setRawVariable(`K${i}`, `K${i + 1}`);
    env.setRawVariable(`K${depth}`, "leaf");
    let expression = "$(K0)";
    for (let i = 0; i < depth; i++) expression = `$(${expression})`;
    expect(expand(expression, env)).toBe("leaf");
  });
});
