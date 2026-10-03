import { afterEach, describe, expect, test } from "vitest";
import { cleanup, automatic, evaluate, expand, fixture, NEW, NOW, OLD } from "./case-support.js";

afterEach(cleanup);

describe("A01-A15 automatic values and scope precedence", () => {
  async function setup() {
    const disk = fixture();
    disk.cwd();
    disk.write("build/app.o", "target", NOW);
    disk.write("src/a.c", "old", OLD);
    disk.write("other/a.c", "new", NEW);
    disk.write("lib/b.c", "new", NEW);
    disk.write("stamp", "new-order-only", NEW);
    disk.write("cache", "cache", NEW);
    const { env, rules } = await evaluate("build/app.o: src/a.c other/a.c src/a.c lib/b.c other/a.c | stamp cache stamp\n");
    const rule = rules[0]!;
    return { disk, env, rules, rule, ...automatic(rules, rule, env) };
  }

  test.each([
    ["A01", "@", "build/app.o"],
    ["A02", "@F", "app.o"],
    ["A03", "@D", "build"],
    ["A05", "<", "src/a.c"],
    ["A06", "^", "src/a.c other/a.c lib/b.c"],
    ["A07", "+", "src/a.c other/a.c src/a.c lib/b.c other/a.c"],
    ["A08", "?", "other/a.c lib/b.c"],
    ["A09", "|", "stamp cache"],
    ["A10", "^D", "src other lib"],
    ["A10/A11", "^F", "a.c a.c b.c"],
    ["A10", "+D", "src other src lib other"],
    ["A10", "+F", "a.c a.c a.c b.c a.c"],
    ["A10", "?D", "other lib"],
    ["A10", "?F", "a.c b.c"],
    ["A10", "<D", "src"],
    ["A10", "<F", "a.c"],
    ["A14", "%", ""],
  ])("%s $(%s) preserves the correct name/order/projection", async (_id, name, expected) => {
    const { scope } = await setup();
    expect(expand(`$(${name})`, scope)).toBe(expected);
    expect(expand(`\${${name}}`, scope)).toBe(expected);
    expect(scope.requireVariable(name)).toMatchObject({ flavor: "raw", origin: "automatic", isExported: false });
  });

  test("A04 target without a directory has dot as @D", async () => {
    const disk = fixture();
    disk.cwd();
    const { env, rules } = await evaluate("leaf:\n");
    expect(expand("$(@)|$(@D)|$(@F)", automatic(rules, rules[0]!, env).scope)).toBe("leaf|.|leaf");
  });

  test("A11 stale inputs with the same basename preserve duplicate basenames in ?F", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("target", "target", NOW);
    disk.write("one/same.c", "one", NEW);
    disk.write("two/same.c", "two", NEW);
    const { rules, env } = await evaluate("target: one/same.c two/same.c one/same.c\n");
    const { scope } = automatic(rules, rules[0]!, env);
    expect(expand("$(^F)|$(?F)", scope)).toBe("same.c same.c|same.c same.c");
    expect(expand("$(^)|$(?)", scope)).toBe("one/same.c two/same.c|one/same.c two/same.c");
  });

  test("A12 automatic scope shadows parent symbols without replacing or mutating them", async () => {
    const { rules, rule, env } = await setup();
    const names = ["@", "<", "^", "+", "?", "|", "@D", "@F"];
    for (const name of names) env.setRawVariable(name, `parent-${name}`, "command-line", true);
    const before = names.map((name) => env.requireVariable(name));
    const { scope } = automatic(rules, rule, env);
    expect(expand("$(@)|$(<)", scope)).toBe("build/app.o|src/a.c");
    names.forEach((name, index) => {
      expect(env.requireVariable(name)).toBe(before[index]);
      expect(env.requireRawVariable(name)).toBe(`parent-${name}`);
      expect(scope.requireVariable(name).origin).toBe("automatic");
    });
  });

  test("A13 automatic -> target-specific -> global lookup precedence", async () => {
    const { rules, rule, env } = await setup();
    env.setRawVariable("FLAGS", "global");
    env.setRawVariable("SHARED", "shared");
    await evaluate("build/app.o: FLAGS = local\n", env);
    env.targetEnvs[rule.target]!.setRawVariable("@", "target-local");
    const { scope } = automatic(rules, rule, env);
    expect(scope.enclosing).toBe(env.targetEnvs[rule.target]);
    expect(expand("$(@)|$(FLAGS)|$(SHARED)", scope)).toBe("build/app.o|local|shared");
    expect(env.targetEnvs[rule.target]!.requireRawVariable("@")).toBe("target-local");
    expect(env.requireRawVariable("FLAGS")).toBe("global");
  });

  test("A15 star is an explicit unsupported limitation in a fresh automatic environment", async () => {
    const { scope } = await setup();
    expect(scope.hasVariable("*")).toBe(false);
    expect(expand("$(*)", scope)).toBe("");
  });
});
