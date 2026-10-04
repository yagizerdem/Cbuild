import { afterEach, describe, expect, test } from "vitest";
import { getTargetSubgraph, topologicalSort } from "@src/cbuild-backend/depq-graph.js";
import { cleanup, commands, environment, expand, fixture, implicit, automatic, target } from "./case-support.js";

afterEach(cleanup);

describe("P01-P12 implicit candidate and chain contracts", () => {
  async function resolve(source: string, files: string[] = []) {
    const disk = fixture();
    disk.cwd();
    files.forEach((name) => disk.write(name));
    return { ...await implicit(source, disk.root), disk };
  }

  test("P01 shorter stem is preferred among applicable candidates", async () => {
    const { rules, env } = await resolve("all: libapp.o\n%.o: %.c\n\techo general\nlib%.o: %.src\n\techo specific\n", ["libapp.c", "app.src"]);
    expect(target(rules, "libapp.o").prerequisites).toEqual(["app.src"]);
    expect(commands(target(rules, "libapp.o"), env)).toEqual(["echo specific"]);
  });

  test.each([false, true])("P01 equal specificity follows declaration order, reverse=%s", async (reverse) => {
    const patterns = reverse ? "%.o: %.cc\n\techo cc\n%.o: %.c\n\techo c\n" : "%.o: %.c\n\techo c\n%.o: %.cc\n\techo cc\n";
    const { rules, env } = await resolve(`all: app.o\n${patterns}`, ["app.c", "app.cc"]);
    expect(commands(target(rules, "app.o"), env)).toEqual([reverse ? "echo cc" : "echo c"]);
  });

  test("P02 missing first candidate input falls back to the next candidate", async () => {
    const { rules } = await resolve("all: app.o\n%.o: %.missing\n\techo missing\n%.o: %.c\n\techo found\n", ["app.c"]);
    expect(target(rules, "app.o").prerequisites).toEqual(["app.c"]);
  });

  test("P03 a three-level implicit chain commits every successful intermediate", async () => {
    const { rules } = await resolve("all: app.o\n%.o: %.asm\n\techo object\n%.asm: %.ir\n\techo assembly\n%.ir: %.src\n\techo ir\n", ["app.src"]);
    expect(target(rules, "app.o").prerequisites).toEqual(["app.asm"]);
    expect(target(rules, "app.asm").prerequisites).toEqual(["app.ir"]);
    expect(target(rules, "app.ir").prerequisites).toEqual(["app.src"]);
    expect(topologicalSort(getTargetSubgraph(rules, "all"), rules[0]!).map((rule) => rule.target)).toEqual(["app.ir", "app.asm", "app.o", "all"]);
  });

  test("P04 a cyclic implicit candidate chain is rejected without partial models", async () => {
    const { rules } = await resolve("all: app.o\n%.o: %.mid\n\techo object\n%.mid: %.last\n\techo middle\n%.last: %.o\n\techo last\n");
    expect(rules.map((rule) => rule.target)).toEqual(["all"]);
  });

  test("P05 explicit recipe takes precedence over applicable implicit recipes", async () => {
    const { rules, env } = await resolve("app.o: explicit\n\techo explicit\nexplicit:\n%.o: %.c\n\techo implicit\n", ["app.c"]);
    expect(target(rules, "app.o").prerequisites).toEqual(["explicit"]);
    expect(commands(target(rules, "app.o"), env)).toEqual(["echo explicit"]);
  });

  test("P06 recipe-less explicit target gains recipe while preserving its inputs and UUID", async () => {
    const { original, rules, env } = await resolve("app.o: config.h | stamp\nconfig.h:\nstamp:\n%.o: %.c\n\techo compile\n", ["app.c"]);
    const rule = target(rules, "app.o");
    expect(rule.prerequisites).toEqual(["app.c", "config.h"]);
    expect(rule.orderOnlyPrerequisites).toEqual(["stamp"]);
    expect(rule.uuid).toBe(target(original, "app.o").uuid);
    expect(commands(rule, env)).toEqual(["echo compile"]);
  });

  test("P07 implicit normal input beats explicit order-only input", async () => {
    const { rules } = await resolve("app.o: | app.c\n%.o: %.c\n\techo compile\n", ["app.c"]);
    expect(target(rules, "app.o").prerequisites).toEqual(["app.c"]);
    expect(target(rules, "app.o").orderOnlyPrerequisites).toEqual([]);
  });

  test("P08 explicit normal input beats implicit order-only input", async () => {
    const { rules } = await resolve("app.o: cache\ncache:\n%.o: %.c | cache\n\techo compile\n", ["app.c"]);
    expect(target(rules, "app.o").prerequisites).toEqual(["app.c", "cache"]);
    expect(target(rules, "app.o").orderOnlyPrerequisites).toEqual([]);
  });

  test("P09 vpath makes an implicit prerequisite candidate applicable", async () => {
    const { rules } = await resolve("vpath %.c sources\nall: app.o\n%.o: %.c\n\techo compile\n", ["sources/app.c"]);
    expect(target(rules, "app.o").prerequisites).toEqual(["app.c"]);
    expect(target(rules, "app.o").vpathRules.map((rule) => rule.pattern)).toEqual(["%.c"]);
  });

  test("P10 a stem containing slashes is substituted without losing its directory", async () => {
    const { rules } = await resolve("all: build/nested/app.o\nbuild/%.o: source/%.c\n\techo compile\n", ["source/nested/app.c"]);
    expect(target(rules, "build/nested/app.o").stem).toBe("nested/app");
    expect(target(rules, "build/nested/app.o").prerequisites).toEqual(["source/nested/app.c"]);
  });

  test("slash-free pattern restores the target directory to prerequisite substitution", async () => {
    const { rules } = await resolve("all: nested/app.o\n%.o: %.c\n\techo compile\n", ["nested/app.c"]);
    expect(target(rules, "nested/app.o").prerequisites).toEqual(["nested/app.c"]);
  });

  test("P11 escaped percent is literal while a later percent provides the stem", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("app.c");
    const env = environment();
    // Supply the escaped pattern through a variable, so this exercises pattern
    // expansion -> model classification -> implicit search, not lexer escaping.
    env.setRawVariable("PATTERN", String.raw`literal\%-%.o`);
    const { rules } = await implicit("all: literal%-app.o\n$(PATTERN): %.c\n\techo escaped\n", disk.root, env);
    expect(target(rules, "literal%-app.o").stem).toBe("app");
    expect(target(rules, "literal%-app.o").prerequisites).toEqual(["app.c"]);
  });

  test("P12 current limitation: implicit star automatic variable is unsupported", async () => {
    const { rules, env } = await resolve("all: app.o\n%.o: %.c\n\techo compile\n", ["app.c"]);
    const rule = target(rules, "app.o");
    expect(rule.stem).toBe("app");
    const { scope } = automatic(rules, rule, env);
    expect(scope.hasVariable("*")).toBe(false);
    expect(expand("$(*)", scope)).toBe("");
  });
});
