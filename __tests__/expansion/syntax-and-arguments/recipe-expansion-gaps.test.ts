import { describe, expect, test } from "vitest";
import path from "node:path";
import { compile } from "@src/test-util/compile.js";
import { NormalRuleIR, RecipeIR, ValueIR } from "@src/compiler/ir.js";
import { Env } from "@src/cbuild-backend/env.js";
import type { CBuildOptions } from "@src/cli.js";
import {
  RecipeExpansionEngine,
  ValueExpansionEngine,
} from "@src/cbuild-backend/expansion.js";
import { NormalRule } from "@src/cbuild-backend/model.js";
import AutomaticVariableEnv from "@src/cbuild-backend/execution/auto-variable.js";
import type {
  PreqResolution,
  TargetResolution,
} from "@src/cbuild-backend/execution/preq-resolution/type.js";
import { CbuildException, ErrorType, MachineCode } from "@src/cbuild-exception.js";

// Only the eight requested gaps: every expression uses the real parser,
// compiler and expansion engine. No shell execution or filesystem fixtures.
function environment(): Env {
  return new Env({} as CBuildOptions);
}

function compiledRule(command: string, target = "app", prerequisites = ""): NormalRuleIR {
  const [ir] = compile(`${target}: ${prerequisites}\n\t${command}\n`);
  expect(ir).toBeInstanceOf(NormalRuleIR);
  return ir as NormalRuleIR;
}

function recipe(expression: string): RecipeIR {
  return compiledRule(expression).recipes[0]!;
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

const syntaxes = ["parentheses", "braces"] as const;
type Syntax = (typeof syntaxes)[number];
function invocation(body: string, syntax: Syntax): string {
  return syntax === "parentheses" ? `$(${body})` : "${" + body + "}";
}

function automatic(command: string, target = "app", stem?: string) {
  const parent = environment();
  const ir = compiledRule(command, target, "foo.o bar.o foo.o | stamp stamp");
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
    stem,
  });
  const resolve = (preqName: string): PreqResolution => ({
    preqName,
    vpathRules: [],
    origin: { type: "cwd", absolutePath: path.resolve(preqName) },
  });
  const preqs = rule.prerequisites.map(resolve);
  const resolvedTarget: TargetResolution = {
    targetName: rule.target,
    vpathRules: [],
    origin: { type: "cwd", absolutePath: path.resolve(rule.target) },
  };
  // Freshness is deterministic; only automatic bindings and expansion are tested.
  const env = new AutomaticVariableEnv(
    rule, parent, resolvedTarget, preqs, rule.orderOnlyPrerequisites.map(resolve),
    {
      resolvedTarget,
      resolvedPreqs: preqs,
      isTargetOutOfDate: true,
      outOfDatePreqs: [preqs[0]!, preqs[2]!],
    },
  ).generate();
  return {
    env,
    rule,
    run: () => ir.recipes[0]!.exec<string>(new RecipeExpansionEngine(env)),
  };
}

describe("1. direct target automatic variable", () => {
  // Active regression tests: AutomaticVariableEnv currently omits the @ binding.
  test.each(["$@", "$(@)", "${@}"])("%s expands to the actual target", (reference) => {
    expect(automatic(`echo [${reference}]`, "build/app").run()).toBe("echo [build/app]");
  });
});

describe("2. stem automatic variable: explicitly unsupported", () => {
  test("a resolved rule stem is currently not exposed as $*", () => {
    // Model support for stem does not imply an automatic-variable binding.
    // This documents the limitation, rather than claiming successful stem expansion.
    const auto = automatic("echo [$*][$(*)][${*}]", "foo.o", "foo");
    expect(auto.rule.stem).toBe("foo");
    expect(auto.env.hasVariable("*")).toBe(false);
    expect(auto.run()).toBe("echo [][][]");
  });
});

describe("3. single-character variable references", () => {
  test.each([
    ["A", "uppercase"], ["x", "lowercase"], ["1", "positional"],
  ])("$%s agrees with both delimited references", (name, expected) => {
    const env = environment();
    env.setRawVariable(name, expected);
    expect(expand(`[$${name}][$(${name})][\${${name}}]`, env))
      .toBe(`[${expected}][${expected}][${expected}]`);
  });

  test("a short reference consumes exactly one character", () => {
    const env = environment();
    env.setRawVariable("A", "alpha");
    env.setRawVariable("AB", "long-name");
    env.setRawVariable("1", "one");
    env.setRawVariable("10", "ten");
    expect(expand("$AB|$(AB)|$10|$(10)", env)).toBe("alphaB|long-name|one0|ten");
  });

  test.each(syntaxes)("$1 reads a call parameter using %s invocation", (syntax) => {
    const env = environment();
    deferred(env, "short", "$0:[$1][$2]");
    expect(expand(invocation("call short,first,second", syntax), env))
      .toBe("short:[first][second]");
  });
});

describe("4. brace function invocation", () => {
  test.each([
    ["strip   a   b  ", "a b"],
    ["subst a,z,banana", "bznznz"],
    ["word 2,one two three", "two"],
    ["if yes,chosen,unused", "chosen"],
    ["foreach x,a b,[$x]", "[a] [b]"],
    ["strip ${subst a,z, a   b }", "z b"],
    ["subst a,z,$(strip a   b)", "z b"],
  ])("${%s} compiles as a function and expands", (body, expected) => {
    const expression = invocation(body, "braces");
    expect(value(expression).parts[0]?.kind).toBe("function-call");
    expect(expand(expression)).toBe(expected);
    expect(expand(invocation(body, "parentheses"))).toBe(expected);
  });

  test("brace call evaluates a deferred body containing brace functions", () => {
    const env = environment();
    deferred(env, "decorate", "${strip ${subst a,z,$1}}");
    expect(expand("${call decorate, a   b }", env)).toBe("z b");
  });
});

describe.each(syntaxes)("5. excess arguments (%s)", (syntax) => {
  // CBuild currently rejects excess arguments for fixed-arity functions;
  // these tests pin that policy without asserting GNU Make compatibility.
  test.each([
    ["subst", "subst a,b,a,extra"],
    ["word", "word 1,one two,extra"],
    ["if", "if yes,then,else,extra"],
    ["foreach", "foreach x,a b,[$x],extra"],
  ])("%s rejects excess arguments during compilation", (name, body) => {
    let caught: unknown;
    try {
      recipe(invocation(body, syntax));
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(CbuildException);
    expect(caught).toMatchObject({
      errorType: ErrorType.SEMANTIC,
      machineCode: MachineCode.FUNCTION_COMPILATION_ERROR,
      message: expect.stringContaining(name),
    });
  });

  test("call accepts additional parameters beyond those read by its body", () => {
    const env = environment();
    deferred(env, "first", "$1");
    expect(expand(invocation("call first,a,b,c,d", syntax), env)).toBe("a");
  });

  test("call exposes every supplied argument, including positions above nine", () => {
    const env = environment();
    deferred(env, "many", "[$(1)][$(9)][$(10)][$(12)]");
    const args = Array.from({ length: 12 }, (_, i) => `a${i + 1}`).join(",");
    expect(expand(invocation(`call many,${args}`, syntax), env))
      .toBe("[a1][a9][a10][a12]");
  });
});

describe.each(syntaxes)("6. empty and comma-heavy arguments (%s)", (syntax) => {
  test.each([
    ["subst a,,banana", "bnn"],
    ["subst a,b,", ""],
    ["word 1,", ""],
    ["if ,then,else", "else"],
    ["if yes,,else", ""],
    ["if yes,then,", "then"],
    ["foreach x,,[$x]", ""],
    ["foreach x,a b,", " "],
    ["or ,,chosen,", "chosen"],
    ["and first,,last", ""],
  ])("%s preserves syntactically empty arguments", (body, expected) => {
    expect(expand(invocation(body, syntax))).toBe(expected);
  });

  test("commas produced by a variable remain inside one argument", () => {
    const env = environment();
    env.setRawVariable("PAIR", "a,b");
    expect(expand(invocation("subst $(PAIR),Z,$(PAIR)", syntax), env)).toBe("Z");
  });

  test("commas produced by a nested function do not change outer arity", () => {
    const env = environment();
    env.setRawVariable("COMMA", ",");
    const nested = invocation("subst x,$(COMMA),axb", syntax);
    expect(expand(invocation(`subst ${nested},Z,${nested}`, syntax), env)).toBe("Z");
  });

  test("nested function separator commas do not split enclosing call parameters", () => {
    const env = environment();
    deferred(env, "pair", "[$1][$2]");
    const nested = invocation("subst a,z,banana", syntax);
    expect(expand(invocation(`call pair,${nested},tail`, syntax), env))
      .toBe("[bznznz][tail]");
  });
});

describe.each(syntaxes)("7. empty call positional slots (%s)", (syntax) => {
  test.each([
    ["first,,third", "[first][][third][]", ["first", "", "third"]],
    [",second,third", "[][second][third][]", ["", "second", "third"]],
    ["first,second,", "[first][second][][]", ["first", "second", ""]],
    ["first,,,fourth", "[first][][][fourth]", ["first", "", "", "fourth"]],
    [",,", "[][][][]", ["", "", ""]],
  ] as const)("call slots,%s retains parameter indices", (args, expected, slots) => {
    const env = environment();
    deferred(env, "slots", "[$1][$2][$3][$4]");
    const expression = invocation(`call slots,${args}`, syntax);
    expect(expand(expression, env)).toBe(expected);
    const part = value(expression).parts[0]!;
    expect(part.kind).toBe("function-call");
    if (part.kind !== "function-call") throw new Error("Expected call function");
    // Check trailing slots in compiled IR too: a missing slot also expands empty.
    expect(part.function.args.map((arg) => new ValueExpansionEngine(env).expand(arg)))
      .toEqual(["slots", ...slots]);
  });

  test("arguments that expand to empty retain their slots", () => {
    const env = environment();
    deferred(env, "slots", "[$1][$2][$3]");
    expect(expand(invocation("call slots,first,$(MISSING),third", syntax), env))
      .toBe("[first][][third]");
  });

  test("a comma-bearing expansion remains a single positional argument", () => {
    const env = environment();
    env.setRawVariable("PAIR", "a,b");
    deferred(env, "slots", "[$1][$2][$3]");
    expect(expand(invocation("call slots,$(PAIR),,tail", syntax), env))
      .toBe("[a,b][][tail]");
  });
});

describe("8. directory-free automatic D/F variables", () => {
  test.each([
    ["@D", "."], ["@F", "app"],
    ["<D", "."], ["<F", "foo.o"],
    ["^D", ". ."], ["^F", "foo.o bar.o"],
    ["+D", ". . ."], ["+F", "foo.o bar.o foo.o"],
    ["?D", "."], ["?F", "foo.o"],
  ])("%s projects directory-free filenames with both syntaxes", (name, expected) => {
    for (const syntax of syntaxes) {
      expect(automatic(`echo [${invocation(name, syntax)}]`).run())
        .toBe(`echo [${expected}]`);
    }
  });

  test.each([
    ["<", "foo.o"], ["^", "foo.o bar.o"],
    ["+", "foo.o bar.o foo.o"], ["?", "foo.o"], ["|", "stamp"],
  ])("$%s agrees with parentheses and braces", (name, expected) => {
    const references = [`$${name}`, invocation(name, "parentheses"), invocation(name, "braces")];
    expect(automatic("echo " + references.map((reference) => `[${reference}]`).join("|")).run())
      .toBe(`echo [${expected}]|[${expected}]|[${expected}]`);
  });
});
