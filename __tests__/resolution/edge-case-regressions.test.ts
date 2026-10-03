import { afterEach, describe, expect, test } from "vitest";
import {
  cleanupFixtures,
  commands,
  environment,
  evaluate,
  expand,
  fixture,
  target,
} from "./helpers.js";

afterEach(cleanupFixtures);

// These assert intended resolution contracts. Do not weaken assertions to match
// a defect, or mark them skipped/expected-to-fail merely to make the suite green.
describe("resolution edge-case regression contracts", () => {
  test("inactive conditional branches do not assign or resolve rules, and active rules appear once", async () => {
    const { env, rules } = await evaluate(
      "MODE = debug\nifeq ($(MODE),debug)\nCHOSEN := yes\nselected: $(CHOSEN)\nelse\nBAD := $(error inactive)\nwrong: missing\nendif\n",
    );
    expect(env.hasVariable("BAD")).toBe(false);
    expect(rules.map((rule) => rule.target)).toEqual(["selected"]);
    expect(rules[0]!.prerequisites).toEqual(["yes"]);
  });

  test("firstword preserves the word boundary when compiled in an assignment", async () => {
    const { env } = await evaluate("RESULT := $(firstword a b)\n");
    expect(env.requireRawVariable("RESULT")).toBe("a");
    expect(expand("$(RESULT)", env)).toBe("a");
  });

  test("append to a simple variable immediately expands its RHS", async () => {
    const { env } = await evaluate(
      "BASE = old\nLIST := initial\nLIST += $(BASE)\nBASE = new\n",
    );
    expect(env.requireVariable("LIST").flavor).toBe("raw");
    expect(expand("$(LIST)", env)).toBe("initial old");
    expect(env.requireRawVariable("LIST")).toBe("initial old");
  });

  test("multi-word target-specific assignment creates one environment per target", async () => {
    const { env } = await evaluate(
      "TARGETS = one two\n$(TARGETS): FLAGS = local\none two:\n",
    );
    expect(Object.keys(env.targetEnvs).sort()).toEqual(["one", "two"]);
    expect(expand("$(FLAGS)", env.targetEnvs.one!)).toBe("local");
    expect(expand("$(FLAGS)", env.targetEnvs.two!)).toBe("local");
  });

  test("multi-word static targets and inputs split after variable expansion", async () => {
    const { rules } = await evaluate(
      "OBJECTS = a.o b.o\nINPUTS = %.c common.h\n$(OBJECTS): %.o: $(INPUTS)\n",
    );
    expect(rules.map((rule) => [rule.target, rule.prerequisites])).toEqual([
      ["a.o", ["a.c", "common.h"]],
      ["b.o", ["b.c", "common.h"]],
    ]);
  });

  test("later vpath declarations do not retroactively change an earlier rule", async () => {
    // Contract: a rule captures the evaluation state's vpaths at its position,
    // as implicit pattern models already do. See README for this scope assumption.
    const { rules } = await evaluate(
      "first: a.c\nvpath %.c sources\nsecond: a.c\n",
    );
    expect(target(rules, "first").vpathRules).toEqual([]);
    expect(
      target(rules, "second").vpathRules.map((rule) => rule.pattern),
    ).toEqual(["%.c"]);
  });

  test("conditional assignment respects a defined symbol in the enclosing scope", async () => {
    const parent = environment();
    parent.setRawVariable("FLAGS", "parent");
    const env = environment({}, parent);
    await evaluate("FLAGS ?= fallback\n", env);
    expect(env.hasVariable("FLAGS")).toBe(false);
    expect(expand("$(FLAGS)", env)).toBe("parent");
  });

  test("included rules appear once, and following assignments remain visible", async () => {
    const disk = fixture();
    disk.useAsCwd();
    disk.write(
      "part.mk",
      "VALUE = included\nincluded: $(VALUE)\n\techo $(VALUE)\n",
    );
    const { env, rules } = await evaluate(
      "before:\ninclude part.mk\nVALUE = after\nafter: $(VALUE)\n",
    );
    expect(rules.map((rule) => rule.target)).toEqual([
      "before",
      "included",
      "after",
    ]);
    expect(target(rules, "included").prerequisites).toEqual(["included"]);
    expect(commands(target(rules, "included"), env)).toEqual(["echo after"]);
  });
});
