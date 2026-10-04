import { afterEach, describe, expect, test } from "vitest";
import { PreqResolver } from "@src/cbuild-backend/execution/preq-resolution/preq-resolver.js";
import { cleanup, automatic, evaluate, expand, fixture, target } from "./case-support.js";

afterEach(cleanup);

describe("V01-V06 declaration snapshots, clear and redefinition", () => {
  test("V01 later declarations affect only subsequent rules under the snapshot contract", async () => {
    const { rules } = await evaluate("before:\nvpath %.c sources\nafter:\n");
    expect(target(rules, "before").vpathRules).toEqual([]);
    expect(target(rules, "after").vpathRules.map((rule) => [rule.pattern, rule.dirs])).toEqual([["%.c", ["sources"]]]);
  });

  test("V02 pattern clear removes only the chosen pattern from subsequent rules", async () => {
    const { rules } = await evaluate("vpath %.c sources\nvpath %.h headers\nbefore:\nvpath %.c\nafter:\n");
    expect(target(rules, "before").vpathRules.map((rule) => rule.pattern)).toEqual(["%.c", "%.h"]);
    expect(target(rules, "after").vpathRules.map((rule) => rule.pattern)).toEqual(["%.h"]);
  });

  test("V03 bare vpath clears every active pattern for subsequent rules", async () => {
    const { rules, state } = await evaluate("vpath %.c sources\nvpath %.h headers\nbefore:\nvpath\nafter:\n");
    expect(target(rules, "before").vpathRules).toHaveLength(2);
    expect(target(rules, "after").vpathRules).toEqual([]);
    expect(state.vpaths).toEqual([]);
  });

  test("V04 overlapping matching declarations preserve order", async () => {
    const disk = fixture();
    disk.cwd();
    const first = disk.write("general/source.c");
    disk.write("specific/source.c");
    const { rules } = await evaluate("vpath % general\nvpath %.c specific\nall: source.c\n");
    expect(new PreqResolver(rules, rules[0]!.vpathRules).resolve("source.c").origin).toEqual({ type: "vpath", absolutePath: first });
  });

  test("V05 repeated patterns retain directory search order", async () => {
    const disk = fixture();
    disk.cwd();
    const first = disk.write("second/source.c");
    disk.write("third/source.c");
    const { rules } = await evaluate("vpath %.c missing second\nvpath %.c third\nall: source.c\n");
    expect(new PreqResolver(rules, rules[0]!.vpathRules).resolve("source.c").origin).toEqual({ type: "vpath", absolutePath: first });
  });

  test("V06 pattern can be cleared then redefined without resurrecting old directories", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("old/source.c");
    const expected = disk.write("new/source.c");
    const { rules } = await evaluate("vpath %.c old\nvpath %.c\nvpath %.c new\nall: source.c\n");
    expect(rules[0]!.vpathRules.map((rule) => rule.dirs)).toEqual([["new"]]);
    expect(new PreqResolver(rules, rules[0]!.vpathRules).resolve("source.c").origin).toEqual({ type: "vpath", absolutePath: expected });
  });
});

describe("V07-V10 file lookup and original automatic names", () => {
  test("V07 a nonmatching pattern has no effect on lookup", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("headers/source.c");
    const { rules } = await evaluate("vpath %.h headers\nall: source.c\n");
    expect(new PreqResolver(rules, rules[0]!.vpathRules).resolve("source.c").origin.type).toBe("not-found");
  });

  test("V08 cwd wins over vpath", async () => {
    const disk = fixture();
    disk.cwd();
    const expected = disk.write("source.c");
    disk.write("sources/source.c");
    const { rules } = await evaluate("vpath %.c sources\nall: source.c\n");
    expect(new PreqResolver(rules, rules[0]!.vpathRules).resolve("source.c").origin).toEqual({ type: "cwd", absolutePath: expected });
  });

  test("V09 missing absolute prerequisite never falls back to vpath", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("sources/source.c");
    const { rules } = await evaluate("vpath %.c sources\nall:\n");
    expect(new PreqResolver(rules, rules[0]!.vpathRules).resolve(disk.path("missing/source.c")).origin.type).toBe("not-found");
  });

  test("V10 vpath lookup preserves original prerequisite names in automatic variables", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("sources/input.c");
    const { rules, env } = await evaluate("vpath %.c sources\nall: input.c\n");
    const { scope, preqs } = automatic(rules, rules[0]!, env);
    expect(preqs.first[0]!.origin.type).toBe("vpath");
    expect(preqs.first[0]!.preqName).toBe("input.c");
    expect(expand("$(<)|$(^)|$(+)|$(?)", scope)).toBe("input.c|input.c|input.c|input.c");
  });
});
