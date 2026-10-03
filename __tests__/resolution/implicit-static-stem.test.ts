import { afterEach, describe, expect, test } from "vitest";
import { ImplicitRuleResolver } from "@src/cbuild-backend/implicit-rule-resolver.js";
import { StemResolver } from "@src/cbuild-backend/stem-resolver.js";
import { getTargetSubgraph, topologicalSort } from "@src/cbuild-backend/depq-graph.js";
import { cleanupFixtures, commands, evaluate, fixture, normalized, target } from "./helpers.js";

afterEach(cleanupFixtures);

describe("stem matching and substitution boundaries", () => {
  test.each([
    ["%.o", "app.o", "app"],
    ["src/%.o", "src/app.o", "app"],
    ["pre%suf", "preMIDsuf", "MID"],
    ["%.o", ".o", ""],
    ["%", "anything", "anything"],
    ["literal", "literal", ""],
    ["literal", "other", null],
    ["pre%suf", "presuf", ""],
    ["pre%suf", "pre", null],
    ["%.o", "app.c", null],
    ["ab%bc", "abc", null],
    ["%.o", "nested/app.o", "nested/app"],
    ["%-%", "one-%", "one"],
    ["\\%.o", "%.o", ""],
    ["\\%.o", "app.o", null],
    ["literal\\%-%", "literal%-name", "name"],
  ])("pattern %s matches %s with stem %s", (pattern, candidate, expected) => {
    const resolver = new StemResolver();
    expect(resolver.resolveStem(pattern, candidate)).toBe(expected);
    expect(resolver.match(pattern, candidate)).toBe(expected !== null);
  });

  test.each([
    ["%.c", "foo", "foo.c"],
    ["src/%.c", "foo", "src/foo.c"],
    ["fixed.h", "foo", "fixed.h"],
    ["%-%", "foo", "foo-%"],
    ["pre%suf", "", "presuf"],
  ])("replaces the stem in %s", (pattern, stem, expected) => {
    expect(new StemResolver().replaceStem(pattern, stem)).toBe(expected);
  });
});

describe("implicit search using real files and compiled rules", () => {
  async function resolve(source: string, files: string[] = []) {
    const disk = fixture();
    files.forEach((name) => disk.write(name));
    const result = await normalized(source);
    const rules = new ImplicitRuleResolver(result.rules, result.patterns, disk.root).resolve();
    return { ...result, original: result.rules, rules, disk };
  }

  test("creates a concrete rule with substituted inputs and copied recipes", async () => {
    const { rules, env } = await resolve("all: app.o\n%.o: %.c | cache\n\techo compile\ncache:\n", ["app.c"]);
    const object = target(rules, "app.o");
    expect(object.prerequisites).toEqual(["app.c"]);
    expect(object.orderOnlyPrerequisites).toEqual(["cache"]);
    expect(object.stem).toBe("app");
    expect(commands(object, env)).toEqual(["echo compile"]);
    expect(rules[0]!.target).toBe("all");
  });

  test("explicit recipes take precedence over implicit recipes", async () => {
    const { rules, env } = await resolve("all: app.o\napp.o: custom\n\techo explicit\ncustom:\n%.o: %.c\n\techo implicit\n", ["app.c"]);
    expect(target(rules, "app.o").prerequisites).toEqual(["custom"]);
    expect(commands(target(rules, "app.o"), env)).toEqual(["echo explicit"]);
  });

  test("recipe-less explicit target gains an implicit recipe while retaining identity and inputs", async () => {
    const { original, rules } = await resolve("app.o: config.h | stamp\n%.o: %.c | cache\n\techo compile\nconfig.h:\nstamp:\ncache:\n", ["app.c"]);
    const object = target(rules, "app.o");
    expect(object.uuid).toBe(target(original, "app.o").uuid);
    expect(object.prerequisites).toEqual(["app.c", "config.h"]);
    expect(object.orderOnlyPrerequisites).toEqual(["cache", "stamp"]);
    expect(target(original, "app.o").recipeIRs).toEqual([]);
  });

  test("normal dependencies remove overlapping implicit order-only dependencies", async () => {
    const { rules } = await resolve("app.o: cache\n%.o: %.c | cache\n\techo compile\ncache:\n", ["app.c"]);
    expect(target(rules, "app.o").prerequisites).toEqual(["app.c", "cache"]);
    expect(target(rules, "app.o").orderOnlyPrerequisites).toEqual([]);
  });

  test("shorter-stem pattern wins when both candidates apply", async () => {
    const { rules, env } = await resolve("all: libfoo.o\n%.o: %.c\n\techo general\nlib%.o: %.c\n\techo specific\n", ["libfoo.c", "foo.c"]);
    expect(target(rules, "libfoo.o").prerequisites).toEqual(["foo.c"]);
    expect(commands(target(rules, "libfoo.o"), env)).toEqual(["echo specific"]);
  });

  test("equally specific applicable candidates preserve declaration order", async () => {
    const { rules, env } = await resolve("all: app.o\n%.o: %.c\n\techo first\n%.o: %.cc\n\techo second\n", ["app.c", "app.cc"]);
    expect(commands(target(rules, "app.o"), env)).toEqual(["echo first"]);
  });

  test("inapplicable first candidate falls back to a later candidate", async () => {
    const { rules } = await resolve("all: app.o\n%.o: %.missing\n\techo unavailable\n%.o: %.c\n\techo fallback\n", ["app.c"]);
    expect(target(rules, "app.o").prerequisites).toEqual(["app.c"]);
  });

  test("directly applicable candidate wins before a more specific chained candidate", async () => {
    const { rules, env } = await resolve("all: libfoo.o\nlib%.o: %.mid\n\techo chained\n%.o: %.c\n\techo direct\n%.mid: %.src\n\techo intermediate\n", ["foo.src", "libfoo.c"]);
    expect(commands(target(rules, "libfoo.o"), env)).toEqual(["echo direct"]);
    expect(rules.some((rule) => rule.target === "foo.mid")).toBe(false);
  });

  test("chained patterns add intermediates in a valid dependency graph", async () => {
    const { rules } = await resolve("all: app.o\n%.o: %.mid\n\techo object\n%.mid: %.src\n\techo intermediate\n", ["app.src"]);
    expect(target(rules, "app.o").prerequisites).toEqual(["app.mid"]);
    expect(target(rules, "app.mid").prerequisites).toEqual(["app.src"]);
    expect(topologicalSort(getTargetSubgraph(rules, "all"), rules[0]!).map((rule) => rule.target))
      .toEqual(["app.mid", "app.o", "all"]);
  });

  test("failed candidate does not leave partial intermediates behind", async () => {
    const { rules } = await resolve("all: app.o\n%.o: %.mid %.missing\n\techo bad\n%.mid: %.src\n\techo intermediate\n%.o: %.c\n\techo good\n", ["app.src", "app.c"]);
    expect(target(rules, "app.o").prerequisites).toEqual(["app.c"]);
    expect(rules.some((rule) => rule.target === "app.mid")).toBe(false);
  });

  test("shared implicit prerequisite is generated once", async () => {
    const { rules } = await resolve("all: left right\nleft: app.o\nright: app.o\n%.o: %.c\n\techo compile\n", ["app.c"]);
    expect(rules.filter((rule) => rule.target === "app.o")).toHaveLength(1);
  });

  test("missing inputs leave the target unresolved without inventing rules", async () => {
    const { rules } = await resolve("all: app.o\n%.o: %.missing\n\techo compile\n");
    expect(rules.map((rule) => rule.target)).toEqual(["all"]);
  });

  test("order-only inputs must also be buildable for candidate selection", async () => {
    const { rules } = await resolve("all: app.o\n%.o: %.c | missing\n\techo compile\n", ["app.c"]);
    expect(rules.map((rule) => rule.target)).toEqual(["all"]);
  });

  test("explicit prerequisite rules count as buildable inputs without disk files", async () => {
    const { rules } = await resolve("all: app.o\napp.c:\n\techo generate\n%.o: %.c\n\techo compile\n");
    expect(target(rules, "app.o").prerequisites).toEqual(["app.c"]);
  });

  test("terminal double-colon pattern does not chain implicit inputs", async () => {
    const { rules } = await resolve("all: app.o\n%.o:: %.mid\n\techo terminal\n%.mid: %.src\n\techo intermediate\n", ["app.src"]);
    expect(rules.map((rule) => rule.target)).toEqual(["all"]);
  });

  test("terminal double-colon pattern accepts inputs already on disk", async () => {
    const { rules } = await resolve("all: app.o\n%.o:: %.c\n\techo terminal\n", ["app.c"]);
    expect(target(rules, "app.o").prerequisites).toEqual(["app.c"]);
  });

  test("implicit cycles terminate without generating partial graph nodes", async () => {
    const { rules } = await resolve("all: app.o\n%.o: %.mid\n\techo object\n%.mid: %.o\n\techo middle\n");
    expect(rules.map((rule) => rule.target)).toEqual(["all"]);
  });

  test("patterns without a recipe are not candidates", async () => {
    const { rules } = await resolve("all: app.o\n%.o: %.c\n", ["app.c"]);
    expect(rules.map((rule) => rule.target)).toEqual(["all"]);
  });

  test("an empty stem is not eligible for implicit rule generation", async () => {
    const { rules } = await resolve("all: .o\n%.o: %.c\n\techo compile\n", [".c"]);
    expect(rules.map((rule) => rule.target)).toEqual(["all"]);
  });

  test("slash-free target pattern restores the directory on substituted prerequisites", async () => {
    const { rules } = await resolve("all: obj/app.o\n%.o: %.c common.h\n\techo compile\n", ["obj/app.c", "common.h"]);
    expect(target(rules, "obj/app.o").prerequisites).toEqual(["obj/app.c", "common.h"]);
    expect(target(rules, "obj/app.o").stem).toBe("obj/app");
  });

  test("pattern with a slash matches the complete target path", async () => {
    const { rules } = await resolve("all: obj/app.o\nobj/%.o: src/%.c\n\techo compile\n", ["src/app.c"]);
    expect(target(rules, "obj/app.o").prerequisites).toEqual(["src/app.c"]);
    expect(target(rules, "obj/app.o").stem).toBe("app");
  });

  test("vpath files make an otherwise missing implicit input applicable", async () => {
    const disk = fixture();
    disk.write("sources/app.c");
    const { rules, patterns } = await normalized("vpath %.c sources\nall: app.o\n%.o: %.c\n\techo compile\n");
    const resolved = new ImplicitRuleResolver(rules, patterns, disk.root).resolve();
    expect(target(resolved, "app.o").prerequisites).toEqual(["app.c"]);
    expect(target(resolved, "app.o").vpathRules[0]!.pattern).toBe("%.c");
  });

  test("specific target patterns suppress a nonterminal match-anything rule", async () => {
    const { rules, env } = await resolve("all: app.o\n%: fallback\n\techo anything\n%.o: %.c\n\techo specific\nfallback:\n\techo fallback\n", ["app.c"]);
    expect(commands(target(rules, "app.o"), env)).toEqual(["echo specific"]);
  });
});

describe("static pattern resolution", () => {
  test("separate literal targets receive separate substituted prerequisites", async () => {
    const { rules } = await evaluate("a.o b.o: %.o: src/%.c common.h | cache/%.stamp\n\techo compile\n");
    expect(rules.map((rule) => [rule.target, rule.prerequisites, rule.orderOnlyPrerequisites]))
      .toEqual([["a.o", ["src/a.c", "common.h"], ["cache/a.stamp"]], ["b.o", ["src/b.c", "common.h"], ["cache/b.stamp"]]]);
  });

  test("only matching targets become static pattern models", async () => {
    const { rules } = await evaluate("a.o README: %.o: %.c\n");
    expect(rules.map((rule) => rule.target)).toEqual(["a.o"]);
  });

  test("expanded static pattern and prerequisite pattern use assigned values", async () => {
    const { rules } = await evaluate("PATTERN = %.o\nSOURCE = src/%.c\nfile.o: $(PATTERN): $(SOURCE)\n");
    expect(rules[0]!.prerequisites).toEqual(["src/file.c"]);
  });
});
