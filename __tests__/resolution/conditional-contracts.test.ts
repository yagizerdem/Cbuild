import { afterEach, describe, expect, test, vi } from "vitest";
import { cleanup, commands, environment, evaluate, expand, fixture } from "./case-support.js";

afterEach(cleanup);

describe("C01-C14 ifdef/ifndef stored-definition contracts", () => {
  const cases = [
    { name: "C01/C02 recursive expression expanding to empty", source: "EMPTY =\nFLAG = $(EMPTY)\n", defined: true },
    { name: "C03/C04 raw empty value", source: "FLAG :=\n", defined: false },
    { name: "C05/C06 undefined name", source: "OTHER = yes\n", defined: false },
    { name: "C07/C08 deferred reference to an undefined symbol", source: "FLAG = $(UNDEFINED)\n", defined: true },
    { name: "recursive literal empty definition", source: "FLAG =\n", defined: false },
    { name: "raw nonempty definition", source: "FLAG := yes\n", defined: true },
    { name: "immediate-escaped recursive storage containing only empty text", source: "FLAG :::= $(UNDEFINED)\n", defined: false },
    { name: "recursive self-reference is defined without expansion", source: "FLAG = $(FLAG)\n", defined: true },
    { name: "deferred error expression is defined without executing error", source: "FLAG = $(error must-not-run)\n", defined: true },
    { name: "empty-expanding function is still a nonempty definition", source: "FLAG = $(strip $(MISSING))\n", defined: true },
  ];
  for (const directive of ["ifdef", "ifndef"] as const) {
    test.each(cases)(`${directive}: $name`, async ({ source, defined }) => {
      const { env } = await evaluate(`${source}${directive} FLAG\nRESULT := then\nelse\nRESULT := else\nendif\n`);
      expect(expand("$(RESULT)", env)).toBe((directive === "ifdef" ? defined : !defined) ? "then" : "else");
    });

    test.each([true, false])(`C09/C10 ${directive} computed name, present=%s`, async (present) => {
      const { env } = await evaluate(`KEY = FLAG\n${present ? "FLAG = yes\n" : ""}${directive} $($(strip KEY))\nRESULT := then\nelse\nRESULT := else\nendif\n`);
      expect(expand("$(RESULT)", env)).toBe((directive === "ifdef" ? present : !present) ? "then" : "else");
    });

    test.each(["raw", "recursive"])(`C11/C12 ${directive} sees a %s parent definition`, async (flavor) => {
      const { env: parent } = await evaluate(flavor === "raw" ? "FLAG := parent\n" : "FLAG = $(MISSING)\n");
      const child = environment({}, parent);
      await evaluate(`${directive} FLAG\nRESULT := then\nelse\nRESULT := else\nendif\n`, child);
      expect(child.hasVariable("FLAG")).toBe(false);
      expect(expand("$(RESULT)", child)).toBe(directive === "ifdef" ? "then" : "else");
    });

    test.each([{ local: "", parent: "parent", defined: false }, { local: "local", parent: "", defined: true }])(
      `C13/C14 ${directive} local '$local' shadows parent '$parent'`, async ({ local, parent: parentValue, defined }) => {
        const parent = environment();
        parent.setRawVariable("FLAG", parentValue);
        const child = environment({}, parent);
        child.setRawVariable("FLAG", local);
        await evaluate(`${directive} FLAG\nRESULT := then\nelse\nRESULT := else\nendif\n`, child);
        expect(expand("$(RESULT)", child)).toBe((directive === "ifdef" ? defined : !defined) ? "then" : "else");
        expect(parent.requireRawVariable("FLAG")).toBe(parentValue);
      });
  }
});

describe("C15-C18 string comparison and expansion", () => {
  test.each(["ifeq", "ifneq"])("C15/C16 %s compares two empty expansions", async (directive) => {
    const { env } = await evaluate(`${directive} ($(MISSING),$(ALSO_MISSING))\nRESULT := then\nelse\nRESULT := else\nendif\n`);
    expect(expand("$(RESULT)", env)).toBe(directive === "ifeq" ? "then" : "else");
  });

  test.each(["ifeq", "ifneq"])("literal empty operands for %s", async (directive) => {
    const { env } = await evaluate(`${directive} (,)\nRESULT := then\nelse\nRESULT := else\nendif\n`);
    expect(expand("$(RESULT)", env)).toBe(directive === "ifeq" ? "then" : "else");
  });

  test("C17 nested functions compare their final strings", async () => {
    const { env } = await evaluate("NAMES = b a b\nifeq ($(strip $(addprefix obj/,$(sort $(NAMES)))),obj/a obj/b)\nRESULT := equal\nelse\nRESULT := unequal\nendif\n");
    expect(expand("$(RESULT)", env)).toBe("equal");
  });

  test.each(["same", "different"])("C18 nested computed variable comparison: %s", async (rhs) => {
    const { env } = await evaluate(`LEFT_KEY = LEFT\nRIGHT_KEY = RIGHT\nLEFT = same\nRIGHT = ${rhs}\nifneq ($($(LEFT_KEY)),$($(RIGHT_KEY)))\nRESULT := unequal\nelse\nRESULT := equal\nendif\n`);
    expect(expand("$(RESULT)", env)).toBe(rhs === "same" ? "equal" : "unequal");
  });

  test("comparison strings are never looked up again as variable names", async () => {
    const { env } = await evaluate("release = $(error second-lookup)\ndebug = $(error second-lookup)\nMODE = release\nifeq ($(MODE),debug)\nRESULT := wrong\nelse\nRESULT := right\nendif\n");
    expect(expand("$(RESULT)", env)).toBe("right");
  });
});

describe("C19-C24 inactive branches and state changes", () => {
  test("C19/C20/C21 inactive error, assignment and rule produce no effect", async () => {
    const { env, rules } = await evaluate("ifeq (yes,no)\nBAD := $(error inactive)\ninactive: $(error inactive-header)\nelse\nGOOD := selected\nactive:\nendif\n");
    expect(env.hasVariable("BAD")).toBe(false);
    expect(env.requireRawVariable("GOOD")).toBe("selected");
    expect(rules.map((rule) => rule.target)).toEqual(["active"]);
  });

  test("C22 only the active path of nested conditionals is evaluated", async () => {
    const { env, rules } = await evaluate("ifeq (yes,yes)\nifneq (x,y)\nGOOD := nested\nactive:\nelse\nBAD := $(error inactive-inner)\nendif\nelse\nBAD := $(error inactive-outer)\nendif\n");
    expect(env.requireRawVariable("GOOD")).toBe("nested");
    expect(env.hasVariable("BAD")).toBe(false);
    expect(rules.map((rule) => rule.target)).toEqual(["active"]);
  });

  test.each([true, false])("C23 conditional include is evaluated only for active=%s", async (active) => {
    const disk = fixture();
    disk.cwd();
    disk.write("branch.mk", "FROM_INCLUDE := included\nincluded:\n");
    const { env, rules } = await evaluate(`ifeq (yes,${active ? "yes" : "no"})\ninclude branch.mk\nelse\nOTHER := other\nendif\n`);
    expect(env.hasVariable("FROM_INCLUDE")).toBe(active);
    expect(rules.map((rule) => rule.target)).toEqual(active ? ["included"] : []);
  });

  test("inactive missing mandatory include never attempts a read", async () => {
    const disk = fixture();
    disk.cwd();
    await expect(evaluate("ifeq (yes,no)\ninclude missing.mk\nendif\n")).resolves.toMatchObject({ rules: [] });
  });

  test.each([true, false])("C24 conditional vpath changes state only for active=%s", async (active) => {
    const { state, rules } = await evaluate(`ifeq (yes,${active ? "yes" : "no"})\nvpath %.c sources\nendif\nall:\n`);
    expect(state.vpaths.map((rule) => rule.pattern)).toEqual(active ? ["%.c"] : []);
    expect(rules[0]!.vpathRules.map((rule) => rule.pattern)).toEqual(active ? ["%.c"] : []);
  });

  test("conditional recipe never expands the inactive error command", async () => {
    const { env, rules } = await evaluate("MODE = release\nall:\nifeq ($(MODE),debug)\n\t$(error inactive-recipe)\nelse\n\techo release\nendif\n");
    expect(commands(rules[0]!, env)).toEqual(["echo release"]);
    expect(rules[0]!.evaluatedRecipeIRs).toHaveLength(1);
  });

  test("ifdef does not execute deferred warning side effects", async () => {
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { env } = await evaluate("FLAG = $(warning must-not-run)\nifdef FLAG\nRESULT := defined\nendif\n");
    expect(env.requireRawVariable("RESULT")).toBe("defined");
    expect(warning).not.toHaveBeenCalled();
  });
});
