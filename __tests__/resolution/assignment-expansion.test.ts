import { afterEach, describe, expect, test, vi } from "vitest";
import { Core } from "@src/cbuild-backend/core.js";
import { RecursiveVariableExpansionException, ValueExpansionEngine } from "@src/cbuild-backend/expansion.js";
import { MachineCode } from "@src/cbuild-exception.js";
import { commands, environment, evaluate, expand, target, value } from "./helpers.js";

afterEach(() => vi.restoreAllMocks());

describe("assignment lifetime through parser/compiler/evaluator/expansion", () => {
  test.each([
    ["=", "after", "recursive"],
    [":=", "before", "raw"],
    ["::=", "before", "raw"],
    ["?=", "after", "recursive"],
    [":::=", "before", "recursive"],
  ])("%s captures or defers its RHS at the correct time", async (operator, expected, flavor) => {
    const { env } = await evaluate(`BASE = before\nRESULT ${operator} $(BASE)\nBASE = after\n`);
    expect(expand("$(RESULT)", env)).toBe(expected);
    expect(env.requireVariable("RESULT")).toMatchObject({ flavor, origin: "file", isExported: false });
  });

  test("recursive assignment can reference a later declaration", async () => {
    const { env, rules } = await evaluate("FILES = $(addsuffix .c,$(NAMES))\nNAMES = a b\nall: $(FILES)\n");
    expect(expand("$(FILES)", env)).toBe("a.c b.c");
    expect(target(rules, "all").prerequisites).toEqual(["a.c", "b.c"]);
  });

  test("immediate assignment sees undefined variables as empty", async () => {
    const { env } = await evaluate("SNAPSHOT := before[$(LATER)]after\nLATER = value\n");
    expect(env.requireRawVariable("SNAPSHOT")).toBe("before[]after");
  });

  test("recursive append expands both pieces using the final environment", async () => {
    const { env } = await evaluate("BASE = old\nLIST = $(BASE)\nLIST += $(BASE)\nBASE = new\n");
    expect(expand("$(LIST)", env)).toBe("new new");
    expect(env.requireVariable("LIST").flavor).toBe("recursive");
  });

  test("append to an undefined symbol creates a recursive variable", async () => {
    const { env } = await evaluate("LIST += $(BASE)\nBASE = later\n");
    expect(expand("$(LIST)", env)).toBe("later");
    expect(env.variableCount).toBe(2);
  });

  test("literal append preserves order and separates words", async () => {
    const { env } = await evaluate("LIST := a\nLIST += b\nLIST += c\n");
    expect(expand("$(LIST)", env)).toBe("a b c");
    expect(env.requireVariable("LIST").flavor).toBe("raw");
  });

  test.each(["", "existing"])("conditional assignment preserves an existing '%s' value", async (initial) => {
    const env = environment();
    env.setRawVariable("A", initial);
    await evaluate("A ?= $(error must-not-evaluate)\n", env);
    expect(env.requireRawVariable("A")).toBe(initial);
  });

  test("computed assignment names and computed references agree", async () => {
    const { env } = await evaluate("MODE = debug\nFLAGS_$(MODE) := -g\nKEY := FLAGS_debug\nRESULT = $($(KEY))\n");
    expect(expand("$(RESULT)", env)).toBe("-g");
    expect([...env.variableEntries()].map(([name]) => name)).toEqual(["MODE", "FLAGS_debug", "KEY", "RESULT"]);
  });

  test("nested expansion drives target and prerequisite word lists", async () => {
    const { rules } = await evaluate("NAMES = b a b\nTARGETS := $(addprefix obj/,$(addsuffix .o,$(sort $(NAMES))))\n$(TARGETS): $(addsuffix .h,$(sort $(NAMES))) | $(strip cache   stamp)\n");
    expect(rules.map((rule) => rule.target)).toEqual(["obj/a.o", "obj/b.o"]);
    for (const rule of rules) {
      expect(rule.prerequisites).toEqual(["a.h", "b.h"]);
      expect(rule.orderOnlyPrerequisites).toEqual(["cache", "stamp"]);
    }
  });

  test("rule headers resolve immediately while recipes see later assignments", async () => {
    const { env, rules } = await evaluate("NAME = early\nPREQ = first\n$(NAME): $(PREQ)\n\techo $(NAME) $(PREQ)\nNAME = late\nPREQ = second\n");
    expect(rules[0]!.target).toBe("early");
    expect(rules[0]!.prerequisites).toEqual(["first"]);
    expect(commands(rules[0]!, env)).toEqual(["echo late second"]);
  });

  test("a recursive variable reused by two rules resolves at each rule's position", async () => {
    const { rules } = await evaluate("BASE = first\nFILES = $(BASE).c\none: $(FILES)\nBASE = second\ntwo: $(FILES)\n");
    expect(rules.map((rule) => rule.prerequisites)).toEqual([["first.c"], ["second.c"]]);
  });

  test.each(["A = $(A)", "A = $(B)\nB = $(A)", "A = $(B)\nB = $(C)\nC = $(A)"])("rejects recursive lookup: %s", async (source) => {
    const { env } = await evaluate(source);
    expect(() => expand("$(A)", env)).toThrow(RecursiveVariableExpansionException);
  });

  test("recursive lookup failure releases lookup state for later expansions", async () => {
    const { env } = await evaluate("A = $(B)\nB = $(A)\nGOOD = usable\n");
    const active = new Set<string>();
    const engine = new ValueExpansionEngine(env, active);
    expect(() => engine.expand(value("$(A)"))).toThrow(RecursiveVariableExpansionException);
    expect(active.size).toBe(0);
    env.setRawVariable("B", "recovered");
    expect(engine.expand(value("$(A)|$(GOOD)"))).toBe("recovered|usable");
  });

  test("failed immediate expansion leaves an existing symbol untouched", async () => {
    const env = environment();
    env.setRawVariable("A", "original");
    const original = env.requireVariable("A");
    await expect(evaluate("A := $(error assignment-failed)\n", env)).rejects.toMatchObject({ machineCode: MachineCode.ERROR_FN });
    expect(env.requireVariable("A")).toBe(original);
  });

  test.each([
    ["$(strip   a   b  )", "a b"],
    ["$(sort b a b c)", "a b c"],
    ["$(patsubst %.c,obj/%.o,a.c b.c note.h)", "obj/a.o obj/b.o note.h"],
    ["$(filter %.c,a.c b.h c.c)", "a.c c.c"],
    ["$(filter-out %.h,a.c b.h c.c)", "a.c c.c"],
    ["$(subst src/,obj/,src/a src/b)", "obj/a obj/b"],
    ["$(foreach n,a b,$(addsuffix .o,$(n)))", "a.o b.o"],
    ["$(if yes,chosen,$(error unused))", "chosen"],
    ["$(or ,chosen,$(error unused))", "chosen"],
    ["$(and yes,,$(error unused))", ""],
    ["$(join a b,1 2)", "a1 b2"],
    ["$(word 2,a b c)", "b"],
    ["$(wordlist 2,3,a b c d)", "b c"],
    ["$(lastword a b)", "b"],
  ])("assignment and expansion integrate function %s", async (expression, expected) => {
    const { env } = await evaluate(`RESULT := ${expression}\n`);
    expect(env.requireRawVariable("RESULT")).toBe(expected);
    expect(expand("$(RESULT)", env)).toBe(expected);
  });

  test("call parameters and foreach iteration symbols do not leak into the root table", async () => {
    const { env } = await evaluate("pair = $(1):$(2)\n1 = global\nitem = parent\nRESULT := $(foreach item,a b,$(call pair,$(item),x))\n");
    expect(expand("$(RESULT)", env)).toBe("a:x b:x");
    expect(expand("$(1)|$(item)", env)).toBe("global|parent");
    expect(env.hasVariable("2")).toBe(false);
  });

  test.each(["=", ":=", "+="])("command-line priority survives ordinary %s assignments", async (operator) => {
    const env = environment();
    new Core(env).mergeCliVars([{ key: "FLAGS", value: "cli" }]);
    await evaluate(`FLAGS ${operator} file\nall: $(FLAGS)\n`, env);
    expect(expand("$(FLAGS)", env)).toBe("cli");
    expect(env.requireVariable("FLAGS").origin).toBe("command-line");
  });

  test("override assignment wins over command-line values", async () => {
    const env = environment();
    new Core(env).mergeCliVars([{ key: "FLAGS", value: "cli" }]);
    await evaluate("override FLAGS := file\n", env);
    expect(env.requireVariable("FLAGS")).toMatchObject({ origin: "override", flavor: "raw" });
    expect(expand("$(FLAGS)", env)).toBe("file");
  });

  test.each([false, true])("environment override flag %s controls assignment precedence", async (environmentOverrides) => {
    const env = environment({ environmentOverrides });
    new Core(env).mergeEnvVars([{ key: "FLAGS", value: "environment" }]);
    await evaluate("FLAGS := file\n", env);
    expect(expand("$(FLAGS)", env)).toBe(environmentOverrides ? "environment" : "file");
  });

  test("export and unexport statements change metadata without replacing the symbol", async () => {
    const { env } = await evaluate("FLAGS = value\nexport FLAGS\n");
    const symbol = env.requireVariable("FLAGS");
    expect(env.getExportedVariables().get("FLAGS")).toBe(symbol);
    await evaluate("unexport FLAGS\n", env);
    expect(env.requireVariable("FLAGS")).toBe(symbol);
    expect(env.getExportedVariables().size).toBe(0);
  });

  test("undefine removes a symbol and allows conditional reassignment", async () => {
    const { env } = await evaluate("A = old\nundefine A\nA ?= new\nundefine MISSING\n");
    expect(expand("$(A)", env)).toBe("new");
    expect(env.variableCount).toBe(1);
  });

  test("ordinary undefine protects command-line variables; override undefine removes them", async () => {
    const env = environment();
    env.setRawVariable("A", "cli", "command-line");
    await evaluate("undefine A\n", env);
    expect(env.hasVariable("A")).toBe(true);
    await evaluate("override undefine A\n", env);
    expect(env.hasVariable("A")).toBe(false);
  });

  test("target-specific assignments isolate symbols and inherit the global table", async () => {
    const { env } = await evaluate("FLAGS = global\nSHARED = shared\none: FLAGS = first\none: EXTRA = local\ntwo: FLAGS := second\none:\n\techo $(FLAGS) $(EXTRA) $(SHARED)\ntwo:\n\techo $(FLAGS) $(EXTRA) $(SHARED)\n");
    expect(expand("$(FLAGS)", env)).toBe("global");
    expect(expand("$(FLAGS)|$(EXTRA)|$(SHARED)", env.targetEnvs.one!)).toBe("first|local|shared");
    expect(expand("$(FLAGS)|$(EXTRA)|$(SHARED)", env.targetEnvs.two!)).toBe("second||shared");
    expect(env.targetEnvs.one!.enclosing).toBe(env);
    expect(env.targetEnvs.one!.variableCount).toBe(2);
    expect(env.hasVariable("EXTRA")).toBe(false);
  });
});
