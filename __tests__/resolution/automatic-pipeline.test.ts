import { afterEach, describe, expect, test } from "vitest";
import AutomaticVariableEnv from "@src/cbuild-backend/execution/auto-variable.js";
import { OutOfDateChecker } from "@src/cbuild-backend/execution/preq-resolution/out-of-date.js";
import { resolvePreqs } from "@src/cbuild-backend/execution/preq-resolution/preq-resolver.js";
import { resolveTarget } from "@src/cbuild-backend/execution/preq-resolution/target-resolver.js";
import { ImplicitRuleResolver } from "@src/cbuild-backend/implicit-rule-resolver.js";
import { getTargetSubgraph, topologicalSort } from "@src/cbuild-backend/depq-graph.js";
import { createProcessEnv } from "@src/cbuild-backend/execution/create-process-env.js";
import { ValueExpansionEngine } from "@src/cbuild-backend/expansion.js";
import { cleanupFixtures, commands, evaluate, expand, fixture, normalized, target } from "./helpers.js";

afterEach(cleanupFixtures);

describe("automatic variables from actual resolved names and timestamps", () => {
  async function setup() {
    const disk = fixture();
    disk.useAsCwd();
    disk.write("obj/app.o", "object", 1_700_000_100);
    disk.write("src/a.c", "old", 1_700_000_000);
    disk.write("lib/b.c", "new", 1_700_000_200);
    disk.write("src/c.c", "new", 1_700_000_200);
    disk.directory("cache");
    disk.write("stamp");
    const { rules, env } = await normalized("TOOL = compiler\nobj/app.o: src/a.c lib/b.c src/a.c src/c.c lib/b.c | cache stamp cache\n\t$(TOOL) $(@) $(<) $(^) $(+) $(?) $(|)\n");
    const rule = rules[0]!;
    const resolvedTarget = resolveTarget(rules, rule, env);
    const preqs = resolvePreqs(rules, rule, env);
    const age = new OutOfDateChecker(env).resolveOutOfDateSync(resolvedTarget, preqs.first);
    const automatic = new AutomaticVariableEnv(rule, env, resolvedTarget, preqs.first, preqs.second, age).generate();
    return { rule, env, automatic, age };
  }

  test.each([
    ["@", "obj/app.o"],
    ["<", "src/a.c"],
    ["^", "src/a.c lib/b.c src/c.c"],
    ["+", "src/a.c lib/b.c src/a.c src/c.c lib/b.c"],
    ["?", "lib/b.c src/c.c"],
    ["|", "cache stamp"],
    ["%", ""],
    ["@D", "obj"],
    ["@F", "app.o"],
    ["<D", "src"],
    ["<F", "a.c"],
    ["^D", "src lib src"],
    ["^F", "a.c b.c c.c"],
    ["+D", "src lib src src lib"],
    ["+F", "a.c b.c a.c c.c b.c"],
    ["?D", "lib src"],
    ["?F", "b.c c.c"],
  ])("$(%s) resolves to %s", async (name, expected) => {
    const { automatic, env } = await setup();
    expect(expand(`$(${name})`, automatic)).toBe(expected);
    expect(expand(`\${${name}}`, automatic)).toBe(expected);
    expect(automatic.requireVariable(name)).toMatchObject({ origin: "automatic", flavor: "raw", isExported: false });
    expect(env.hasVariable(name)).toBe(false);
  });

  test("recipe expansion combines automatic variables with inherited file variables", async () => {
    const { automatic, rule } = await setup();
    expect(commands(rule, automatic)).toEqual(["compiler obj/app.o src/a.c src/a.c lib/b.c src/c.c src/a.c lib/b.c src/a.c src/c.c lib/b.c lib/b.c src/c.c cache stamp"]);
  });

  test("leaf rules use empty prerequisite variables and dot for the target directory", async () => {
    const disk = fixture();
    disk.useAsCwd();
    const { rules, env } = await normalized("leaf:\n");
    const rule = rules[0]!;
    const automatic = new AutomaticVariableEnv(rule, env, resolveTarget(rules, rule, env), [], [], null).generate();
    expect(expand("$(@)|$(@D)|$(@F)|$(<)|$(<D)|$(<F)|$(^)|$(+)|$(?)|$(|)", automatic))
      .toBe("leaf|.|leaf|||||||");
  });

  test("automatic symbols shadow parent entries without overwriting them", async () => {
    const { automatic, env } = await setup();
    env.setRawVariable("@", "global");
    expect(expand("$(@)", automatic)).toBe("obj/app.o");
    expect(env.requireRawVariable("@")).toBe("global");
  });

  test("an explicit target environment is used as the parent of automatic scope", async () => {
    const { rule, env } = await setup();
    await evaluate("obj/app.o: TOOL = local-compiler\n", env);
    const preqs = resolvePreqs([rule], rule, env);
    const automatic = new AutomaticVariableEnv(rule, env, resolveTarget([rule], rule, env), preqs.first, preqs.second, null)
      .generate(env.targetEnvs[rule.target]);
    expect(expand("$(TOOL)|$(@)", automatic)).toBe("local-compiler|obj/app.o");
    expect(expand("$(TOOL)", env)).toBe("compiler");
  });
});

describe("complete resolution pipeline without executing recipes", () => {
  test("assignment -> expansion -> normalization -> implicit graph -> file lookup -> age -> recipe", async () => {
    const disk = fixture();
    disk.useAsCwd();
    disk.write("src/a.c", "a", 1_700_000_000);
    disk.write("src/b.c", "b", 1_700_000_200);
    disk.write("obj/a.o", "a-object", 1_700_000_100);
    disk.directory("cache");
    const source = [
      "NAMES = b a b",
      "OBJECTS := $(addprefix obj/,$(addsuffix .o,$(sort $(NAMES))))",
      "FLAGS = global",
      "all: $(OBJECTS)",
      "obj/b.o: FLAGS = local",
      "obj/%.o: src/%.c | cache",
      "\tcompiler $(FLAGS) $(<) -o $(@)",
      "",
    ].join("\n");
    const { env, rules: explicit, patterns } = await normalized(source);
    expect(expand("$(OBJECTS)", env)).toBe("obj/a.o obj/b.o");
    const rules = new ImplicitRuleResolver(explicit, patterns, disk.root).resolve();
    const graph = getTargetSubgraph(rules, "all");
    expect(graph.map((rule) => rule.target).sort()).toEqual(["all", "obj/a.o", "obj/b.o"]);
    expect(topologicalSort(graph, target(graph, "all")).map((rule) => rule.target)).toEqual(["obj/a.o", "obj/b.o", "all"]);
    for (const name of ["obj/a.o", "obj/b.o"]) {
      const rule = target(rules, name);
      const resolvedTarget = resolveTarget(rules, rule, env);
      const preqs = resolvePreqs(rules, rule, env);
      const age = await new OutOfDateChecker(env).resolveOutOfDateAsync(resolvedTarget, preqs.first);
      expect(preqs.first[0]!.origin.type).toBe("cwd");
      expect(preqs.second[0]!.preqName).toBe("cache");
      expect(age.isTargetOutOfDate).toBe(name === "obj/b.o");
      const automatic = new AutomaticVariableEnv(rule, env, resolvedTarget, preqs.first, preqs.second, age)
        .generate(env.targetEnvs[name]);
      const letter = name === "obj/a.o" ? "a" : "b";
      expect(commands(rule, automatic)).toEqual([`compiler ${letter === "a" ? "global" : "local"} src/${letter}.c -o obj/${letter}.o`]);
    }
    expect(env.requireRawVariable("OBJECTS")).toBe("obj/a.o obj/b.o");
    expect(env.hasVariable("@")).toBe(false);
  });

  test("newer order-only files resolve but do not affect age when checking normal inputs", async () => {
    const disk = fixture();
    disk.useAsCwd();
    disk.write("target", "target", 1_700_000_100);
    disk.write("source", "source", 1_700_000_000);
    disk.write("stamp", "stamp", 1_700_000_200);
    const { rules, env } = await normalized("target: source | stamp\n");
    const rule = rules[0]!;
    const preqs = resolvePreqs(rules, rule, env);
    expect(preqs.second[0]!.origin.type).toBe("cwd");
    const age = await new OutOfDateChecker(env).resolveOutOfDateAsync(resolveTarget(rules, rule, env), preqs.first);
    expect(age.isTargetOutOfDate).toBe(false);
    expect(age.outOfDatePreqs).toEqual([]);
  });

  test("exported recursive symbols use their latest expansion in process environment", async () => {
    const { env } = await evaluate("BASE = before\nexport CBUILD_RESOLUTION_EXPORTED = $(BASE)\nBASE = after\nPRIVATE = hidden\n");
    const processEnv = createProcessEnv(env, new ValueExpansionEngine(env));
    expect(processEnv.CBUILD_RESOLUTION_EXPORTED).toBe("after");
    expect(processEnv).toMatchObject({ ...process.env });
    expect(env.requireVariable("PRIVATE").isExported).toBe(false);
  });
});
