import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import {
  action, cc, cleanupFixtures, cleanupRuntime, cxx, executableName,
  fixture, OLD, peakConcurrency, prepareRuntime, successful,
  type Event, type Fixture,
} from "./support.js";

beforeAll(prepareRuntime, 60000);
afterEach(cleanupFixtures);
afterAll(cleanupRuntime);

function before(events: Event[], prerequisite: string, consumer: string) {
  const end = events.findIndex((event) => event.event === "end" && event.target === prerequisite);
  const start = events.findIndex((event) => event.event === "start" && event.target === consumer);
  expect(end, `${prerequisite} must finish`).toBeGreaterThanOrEqual(0);
  expect(start, `${consumer} must start after ${prerequisite}`).toBeGreaterThan(end);
}

function textChain(disk: Fixture) {
  disk.write("input.txt", "hello dünya\n", OLD);
  disk.buildfile(
    `final.txt: middle.txt\n\t${action("copy", "final.txt", "middle.txt")}\n` +
    `middle.txt: input.txt\n\t${action("upper", "middle.txt", "input.txt")}\n`,
  );
}

function nativeProject(disk: Fixture, cpp = false) {
  for (const name of [cpp ? "main.cpp" : "main.c", "math.c", "math.h"]) disk.native(name);
  const app = executableName("app");
  disk.buildfile(
    `CC = ${cc}\nCXX = ${cxx}\nOBJS = main.o math.o\n` +
    `${app}: $(OBJS)\n\t${action("exec", app, cpp ? "$(CXX)" : "$(CC)", "main.o", "math.o", "-o", app)}\n` +
    `main.o: ${cpp ? "main.cpp" : "main.c"} math.h\n\t${action("exec", "main.o", cpp ? "$(CXX)" : "$(CC)", ...(cpp ? ["-std=c++17"] : ["-std=c11"]), "-Wall", "-Werror", "-c", cpp ? "main.cpp" : "main.c", "-o", "main.o")}\n` +
    `math.o: math.c math.h\n\t${action("exec", "math.o", "$(CC)", "-std=c11", "-Wall", "-Werror", "-c", "math.c", "-o", "math.o")}\n`,
  );
  return app;
}

describe("tinyMake: real text files through the entire CLI pipeline", { timeout: 30000 }, () => {
  test.each([1, 3])("builds a text dependency chain with -j %i", async (jobs) => {
    const disk = fixture();
    textChain(disk);
    successful(await disk.run([], ["-j", String(jobs)]));
    expect(disk.read("middle.txt")).toBe("HELLO DÜNYA\n");
    expect(disk.read("final.txt")).toBe("HELLO DÜNYA\n");
    expect(disk.completed()).toEqual(["middle.txt", "final.txt"]);
    before(disk.events(), "middle.txt", "final.txt");
    expect(disk.events().every((event) => event.cwd === disk.root)).toBe(true);
  });

  test("uses the first goal and never executes unreachable recipes or cycles", async () => {
    const disk = fixture();
    disk.buildfile(
      `wanted.txt:\n\t${action("write", "wanted.txt", "wanted")}\n` +
      `unrelated.txt:\n\t${action("fail", "unrelated.txt", "9")}\n` +
      "cycle-a: cycle-b\ncycle-b: cycle-a\n",
    );
    successful(await disk.run());
    expect(disk.read("wanted.txt")).toBe("wanted");
    expect(disk.completed()).toEqual(["wanted.txt"]);
    expect(disk.exists("unrelated.txt")).toBe(false);
  });

  test("a positional goal overrides the first target", async () => {
    const disk = fixture();
    disk.buildfile(
      `first.txt:\n\t${action("write", "first.txt", "first")}\n` +
      `selected.txt:\n\t${action("write", "selected.txt", "selected")}\n`,
    );
    successful(await disk.run(["selected.txt"]));
    expect(disk.read("selected.txt")).toBe("selected");
    expect(disk.exists("first.txt")).toBe(false);
  });

  test("builds both independent positional goals", async () => {
    const disk = fixture();
    disk.buildfile(
      `a.txt:\n\t${action("write", "a.txt", "a")}\n` +
      `b.txt:\n\t${action("write", "b.txt", "b")}\n`,
    );
    successful(await disk.run(["a.txt", "b.txt"], ["-j", "2"]));
    expect(disk.read("a.txt")).toBe("a");
    expect(disk.read("b.txt")).toBe("b");
    expect(disk.completed().sort()).toEqual(["a.txt", "b.txt"]);
  });

  test("-f selects a custom filename and handles a working directory with spaces", async () => {
    const disk = fixture("project with spaces");
    disk.write("source with spaces.txt", "quoted input", OLD);
    disk.buildfile(`wrong.txt:\n\t${action("fail", "wrong.txt", "7")}\n`);
    // Names in a rule cannot contain spaces; a quoted recipe path can.
    disk.buildfile(`result.txt:\n\t${action("copy", "result.txt", "source with spaces.txt")}\n`, "custom build.mk");
    successful(await disk.run([], [], "custom build.mk"));
    expect(disk.read("result.txt")).toBe("quoted input");
    expect(disk.exists("wrong.txt")).toBe(false);
    expect(disk.events()[0]?.cwd).toBe(disk.root);
  });

  test("discovers Makefile without -f", async () => {
    const disk = fixture();
    disk.buildfile(`output.txt:\n\t${action("write", "output.txt", "default-makefile")}\n`);
    successful(await disk.run([], [], null));
    expect(disk.read("output.txt")).toBe("default-makefile");
  });

  test("an empty buildfile runs no recipes", async () => {
    const disk = fixture();
    disk.buildfile("\nMESSAGE = nothing\n");
    successful(await disk.run());
    expect(disk.events()).toEqual([]);
  });

  test("reads assignments and rules from multiple -f files", async () => {
    const disk = fixture();
    disk.buildfile("WORD = combined\n", "vars.mk");
    disk.buildfile(`output.txt:\n\t${action("write", "output.txt", "$(WORD)")}\n`, "rules.mk");
    successful(await disk.run([], ["-f", "rules.mk"], "vars.mk"));
    expect(disk.read("output.txt")).toBe("combined");
  });

  test("expanded multiple targets and prerequisites build a shared file once", async () => {
    const disk = fixture();
    disk.write("a.txt", "a", OLD);
    disk.write("b.txt", "b", OLD);
    disk.buildfile(
      "ALIASES = alias-a alias-b\nINPUTS = a.txt b.txt\n" +
      "all: $(ALIASES)\n$(ALIASES): shared.txt\n" +
      `shared.txt: $(INPUTS)\n\t${action("join", "shared.txt", "a.txt", "b.txt")}\n`,
    );
    successful(await disk.run([], ["-j", "3"]));
    expect(disk.read("shared.txt")).toBe("a|b");
    expect(disk.completed()).toEqual(["shared.txt"]);
  });

  test("merges repeated target rules and waits for their combined prerequisites", async () => {
    const disk = fixture();
    disk.buildfile(
      "combined.txt: a.txt\n" +
      `combined.txt: b.txt\n\t${action("join", "combined.txt", "a.txt", "b.txt")}\n` +
      `a.txt:\n\t${action("delay-write", "a.txt", "A", "250")}\n` +
      `b.txt:\n\t${action("write", "b.txt", "B")}\n`,
    );
    successful(await disk.run([], ["-j", "2"]));
    expect(disk.read("combined.txt")).toBe("A|B");
    before(disk.events(), "a.txt", "combined.txt");
    before(disk.events(), "b.txt", "combined.txt");
    expect(disk.completed().filter((name) => name === "combined.txt")).toHaveLength(1);
  });

  test("expands generated variable names, nested values, late recipes, undefined variables and $$", async () => {
    const disk = fixture();
    disk.buildfile(
      "PREFIX = RESULT\n$(PREFIX)_NAME = output.txt\n" +
      `$(RESULT_NAME):\n\t${action("write", "$(RESULT_NAME)", "$(MESSAGE)$(UNDEFINED)$$")}\n` +
      "WORD = later\nMESSAGE = $(WORD)-value\n",
    );
    successful(await disk.run());
    expect(disk.read("output.txt")).toBe("later-value$");
  });

  test("each recipe starts in a separate shell working directory", async () => {
    const disk = fixture();
    disk.write("sub/keep.txt", "subdirectory");
    disk.buildfile(`cwd.txt:\n\tcd sub\n\t${action("cwd", "cwd.txt")}\n`);
    successful(await disk.run());
    expect(disk.read("cwd.txt")).toBe(disk.root);
    expect(disk.exists("sub/cwd.txt")).toBe(false);
  });

  test("shell piping and redirection produce an actual txt artifact", async () => {
    const disk = fixture();
    disk.buildfile(`output.txt:\n\t${action("stdout", "hello world")} | ${action("upper-stdin")} > output.txt\n`);
    successful(await disk.run());
    expect(disk.read("output.txt")).toBe("HELLO WORLD");
  });

  test("executes Bash arithmetic after dollar escaping", async () => {
    const disk = fixture();
    disk.buildfile("output.txt:\n\tprintf '%s' \"$$((6 * 7))\" > output.txt\n");
    successful(await disk.run());
    expect(disk.read("output.txt")).toBe("42");
  });
});

describe("tinyMake: real scheduler ordering and concurrency", { timeout: 30000 }, () => {
  test.each([
    { name: "default one job", flags: [], jobs: 1 },
    { name: "-j 1", flags: ["-j", "1"], jobs: 1 },
    { name: "-j 2", flags: ["-j", "2"], jobs: 2 },
    { name: "-j 3", flags: ["-j", "3"], jobs: 3 },
  ])("respects $name and waits before building the consumer", async ({ flags, jobs }) => {
    const disk = fixture();
    const leaves = ["a.txt", "b.txt", "c.txt", "d.txt", "e.txt", "f.txt"];
    disk.buildfile(
      `bundle.txt: ${leaves.join(" ")}\n\t${action("join", "bundle.txt", ...leaves)}\n` +
      leaves.map((name) => `${name}:\n\t${action("delay-write", name, name, "700")}\n`).join(""),
    );
    successful(await disk.run([], flags));
    expect(disk.read("bundle.txt")).toBe(leaves.join("|"));
    const events = disk.events();
    expect(peakConcurrency(events)).toBeLessThanOrEqual(jobs);
    if (jobs > 1) expect(peakConcurrency(events)).toBeGreaterThan(1);
    for (const name of leaves) before(events, name, "bundle.txt");
    expect(disk.completed()).toHaveLength(7);
  });

  test("recipes belonging to the same target stay sequential under -j 3", async () => {
    const disk = fixture();
    disk.buildfile(
      `output.txt:\n\t${action("delay-write", "output.txt", "first", "300")}\n` +
      `\t${action("append", "output.txt", "-second")}\n\t${action("append", "output.txt", "-third")}\n`,
    );
    successful(await disk.run([], ["-j", "3"]));
    expect(disk.read("output.txt")).toBe("first-second-third");
    expect(disk.events().map((event) => event.event)).toEqual(["start", "end", "start", "end", "start", "end"]);
    expect(peakConcurrency(disk.events())).toBe(1);
    expect(new Set(disk.events().map((event) => event.pid)).size).toBe(3);
  });

  test("a diamond and repeated prerequisite names execute the shared target once", async () => {
    const disk = fixture();
    disk.buildfile(
      `bundle.txt: left.txt right.txt\n\t${action("join", "bundle.txt", "left.txt", "right.txt")}\n` +
      `left.txt: shared.txt shared.txt\n\t${action("copy", "left.txt", "shared.txt")}\n` +
      `right.txt: shared.txt\n\t${action("upper", "right.txt", "shared.txt")}\n` +
      `shared.txt:\n\t${action("delay-write", "shared.txt", "shared", "250")}\n`,
    );
    successful(await disk.run([], ["-j", "3"]));
    expect(disk.read("bundle.txt")).toBe("shared|SHARED");
    expect(disk.completed().filter((name) => name === "shared.txt")).toHaveLength(1);
    for (const branch of ["left.txt", "right.txt"]) {
      before(disk.events(), "shared.txt", branch);
      before(disk.events(), branch, "bundle.txt");
    }
  });

  test("multiple requested goals share one build of their common prerequisite", async () => {
    const disk = fixture();
    disk.buildfile(
      `a.txt: shared.txt\n\t${action("copy", "a.txt", "shared.txt")}\n` +
      `b.txt: shared.txt\n\t${action("copy", "b.txt", "shared.txt")}\n` +
      `shared.txt:\n\t${action("delay-write", "shared.txt", "shared", "700")}\n`,
    );
    successful(await disk.run(["a.txt", "b.txt"], ["-j", "2"]));
    expect(disk.read("a.txt")).toBe("shared");
    expect(disk.read("b.txt")).toBe("shared");
    expect(disk.completed().filter((name) => name === "shared.txt")).toHaveLength(1);
  });

  test("the -j limit applies globally across multiple positional goals", async () => {
    const disk = fixture();
    disk.buildfile(
      `a.txt:\n\t${action("delay-write", "a.txt", "a", "700")}\n` +
      `b.txt:\n\t${action("delay-write", "b.txt", "b", "700")}\n`,
    );
    successful(await disk.run(["a.txt", "b.txt"], ["-j", "1"]));
    expect(disk.completed().sort()).toEqual(["a.txt", "b.txt"]);
    expect(peakConcurrency(disk.events())).toBe(1);
  });
});

describe("tinyMake: incremental builds with real filesystem timestamps", { timeout: 30000 }, () => {
  test("repeated builds leave newer outputs, timestamps and recipe log unchanged", async () => {
    const disk = fixture();
    textChain(disk);
    successful(await disk.run());
    disk.time("middle.txt", OLD + 100);
    disk.time("final.txt", OLD + 200);
    const times = [disk.mtime("middle.txt"), disk.mtime("final.txt")];
    for (let i = 0; i < 2; i++) successful(await disk.run([], ["-j", "3"]));
    expect(disk.completed()).toEqual(["middle.txt", "final.txt"]);
    expect([disk.mtime("middle.txt"), disk.mtime("final.txt")]).toEqual(times);
    expect(disk.read("final.txt")).toBe("HELLO DÜNYA\n");
  });

  test("a strictly newer source rebuilds a direct consumer", async () => {
    const disk = fixture();
    disk.write("input.txt", "new", OLD + 100);
    disk.write("output.txt", "old", OLD);
    disk.buildfile(`output.txt: input.txt\n\t${action("copy", "output.txt", "input.txt")}\n`);
    successful(await disk.run());
    expect(disk.read("output.txt")).toBe("new");
    expect(disk.completed()).toEqual(["output.txt"]);
  });

  test("equal prerequisite and target timestamps do not trigger rebuilding", async () => {
    const disk = fixture();
    disk.write("input.txt", "input", OLD);
    disk.write("output.txt", "keep", OLD);
    const time = disk.mtime("output.txt");
    expect(disk.mtime("input.txt")).toBe(time);
    disk.buildfile(`output.txt: input.txt\n\t${action("copy", "output.txt", "input.txt")}\n`);
    successful(await disk.run());
    expect(disk.read("output.txt")).toBe("keep");
    expect(disk.mtime("output.txt")).toBe(time);
    expect(disk.events()).toEqual([]);
  });

  test.each([1, 3])("changed transitive input rebuilds prerequisites before the parent with -j %i", async (jobs) => {
    const disk = fixture();
    textChain(disk);
    successful(await disk.run());
    disk.time("middle.txt", OLD + 100);
    disk.time("final.txt", OLD + 200);
    disk.write("input.txt", "changed\n", OLD + 300);
    const count = disk.events().length;
    successful(await disk.run([], ["-j", String(jobs)]));
    expect(disk.read("middle.txt")).toBe("CHANGED\n");
    expect(disk.read("final.txt")).toBe("CHANGED\n");
    before(disk.events().slice(count), "middle.txt", "final.txt");
  });

  test("deleting a generated prerequisite rebuilds it and its existing consumer", async () => {
    const disk = fixture();
    textChain(disk);
    successful(await disk.run());
    disk.time("final.txt", OLD + 200);
    disk.remove("middle.txt");
    const count = disk.events().length;
    successful(await disk.run([], ["-j", "2"]));
    expect(disk.completed()).toEqual(["middle.txt", "final.txt", "middle.txt", "final.txt"]);
    before(disk.events().slice(count), "middle.txt", "final.txt");
  });

  test("deleting only the final output rebuilds only that output", async () => {
    const disk = fixture();
    textChain(disk);
    successful(await disk.run());
    disk.time("middle.txt", OLD + 100);
    disk.remove("final.txt");
    successful(await disk.run());
    expect(disk.read("final.txt")).toBe("HELLO DÜNYA\n");
    expect(disk.completed()).toEqual(["middle.txt", "final.txt", "final.txt"]);
  });

  test("a prerequisite rule that creates no file makes an existing consumer out of date", async () => {
    const disk = fixture();
    disk.write("output.txt", "old", OLD);
    disk.buildfile(`output.txt: always\n\t${action("write", "output.txt", "rebuilt")}\nalways:\n`);
    successful(await disk.run());
    expect(disk.read("output.txt")).toBe("rebuilt");
    expect(disk.completed()).toEqual(["output.txt"]);
  });
});

describe("tinyMake: failures stop real builds", { timeout: 30000 }, () => {
  test("a nonzero recipe blocks subsequent lines and dependent targets", async () => {
    const disk = fixture();
    disk.buildfile(
      `final.txt: failed.txt\n\t${action("write", "final.txt", "must-not-run")}\n` +
      `failed.txt:\n\t${action("fail", "failed.txt", "7")}\n\t${action("write", "failed.txt", "must-not-run")}\n`,
    );
    const result = await disk.run();
    expect.soft(result.code).not.toBe(0);
    expect.soft(result.stderr).toMatch(/7/);
    expect.soft(disk.exists("failed.txt")).toBe(false);
    expect.soft(disk.exists("final.txt")).toBe(false);
    expect(disk.events().map((event) => event.event)).toEqual(["start", "failure"]);
  });

  test.each([false, true])("missing prerequisite without a rule fails (target already exists: %s)", async (exists) => {
    const disk = fixture();
    if (exists) disk.write("output.txt", "keep", OLD);
    disk.buildfile(`output.txt: missing.txt\n\t${action("write", "output.txt", "must-not-run")}\n`);
    const result = await disk.run();
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/missing\.txt/);
    expect(disk.events()).toEqual([]);
    if (exists) expect(disk.read("output.txt")).toBe("keep");
    else expect(disk.exists("output.txt")).toBe(false);
  });

  test.each(["self", "indirect"])("rejects a reachable %s cycle before executing recipes", async (kind) => {
    const disk = fixture();
    disk.buildfile(kind === "self"
      ? `a.txt: a.txt\n\t${action("write", "a.txt", "must-not-run")}\n`
      : `a.txt: b.txt\n\t${action("write", "a.txt", "must-not-run")}\nb.txt: c.txt\nc.txt: a.txt\n`);
    const result = await disk.run();
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/cycle|cir[cu]+lar|dependecy/i);
    expect(disk.events()).toEqual([]);
  });

  test("reports a nonexistent positional target before running recipes", async () => {
    const disk = fixture();
    disk.buildfile(`valid.txt:\n\t${action("write", "valid.txt", "valid")}\n`);
    const result = await disk.run(["missing-goal"]);
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/No rule.*missing-goal/);
    expect(disk.events()).toEqual([]);
  });

  test("reports a missing -f file", async () => {
    const disk = fixture();
    const result = await disk.run([], [], "missing.mk");
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/missing\.mk/);
    expect(disk.events()).toEqual([]);
  });

  test("invalid syntax reports the file and one-based line number", async () => {
    const disk = fixture();
    disk.buildfile("\nVALUE = ok\ninvalid separator\n", "broken.mk");
    const result = await disk.run([], [], "broken.mk");
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/broken\.mk:3/);
    expect(disk.events()).toEqual([]);
  });

  test("rejects multiple recipe definitions before creating artifacts", async () => {
    const disk = fixture();
    disk.buildfile(
      `output.txt:\n\t${action("write", "output.txt", "one")}\n` +
      `output.txt:\n\t${action("write", "output.txt", "two")}\n`,
    );
    const result = await disk.run();
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/Multiple recipe definitions.*output\.txt/);
    expect(disk.exists("output.txt")).toBe(false);
  });

  test("recursive recipe variables fail before invoking their command", async () => {
    const disk = fixture();
    disk.buildfile(`A = $(B)\nB = $(A)\noutput.txt:\n\t${action("write", "output.txt", "$(A)")}\n`);
    const result = await disk.run();
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/Recursive variable reference/);
    expect(disk.events()).toEqual([]);
  });
});

describe("tinyMake: native C/C++ compilation, linking and execution", { timeout: 30000 }, () => {
  test.skipIf(!cc)("compiles two C translation units, links an executable and runs it", async () => {
    const disk = fixture();
    const app = nativeProject(disk);
    disk.buildfile(`report.txt: ${app}\n\t${action("capture", "report.txt", app)}\n` + disk.read("Makefile"));
    successful(await disk.run([], ["-j", "2"]));
    for (const name of ["main.o", "math.o", app]) expect(disk.exists(name)).toBe(true);
    expect(disk.read("report.txt").replaceAll("\r\n", "\n")).toBe("c-result:42\n");
    const result = await disk.runProgram(app);
    successful(result);
    expect(result.stdout.replaceAll("\r\n", "\n")).toBe("c-result:42\n");
    for (const name of ["main.o", "math.o"]) before(disk.events(), name, app);
    before(disk.events(), app, "report.txt");
    expect(disk.completed()).toHaveLength(4);
  });

  test.skipIf(!cc || !cxx)("compiles C and C++ objects together and runs the C++ executable", async () => {
    const disk = fixture("cpp with spaces");
    const app = nativeProject(disk, true);
    disk.buildfile(`report.txt: ${app}\n\t${action("capture", "report.txt", app)}\n` + disk.read("Makefile"));
    successful(await disk.run([], ["-j", "2"]));
    expect(disk.read("report.txt").replaceAll("\r\n", "\n")).toBe("cpp-result:42\n");
    const result = await disk.runProgram(app);
    successful(result);
    expect(result.stdout.replaceAll("\r\n", "\n")).toBe("cpp-result:42\n");
    for (const name of ["main.o", "math.o"]) before(disk.events(), name, app);
    before(disk.events(), app, "report.txt");
    expect(disk.completed()).toHaveLength(4);
  });

  test.skipIf(!cc)("a second native build leaves object files and executable untouched", async () => {
    const disk = fixture();
    const app = nativeProject(disk);
    successful(await disk.run([], ["-j", "2"]));
    disk.time("main.o", OLD + 100);
    disk.time("math.o", OLD + 100);
    disk.time(app, OLD + 200);
    const times = ["main.o", "math.o", app].map((name) => disk.mtime(name));
    const log = disk.read("events.jsonl");
    successful(await disk.run([], ["-j", "2"]));
    expect(["main.o", "math.o", app].map((name) => disk.mtime(name))).toEqual(times);
    expect(disk.read("events.jsonl")).toBe(log);
    const result = await disk.runProgram(app);
    successful(result);
    expect(result.stdout).toContain("c-result:42");
  });

  test.skipIf(!cc)("a changed C source recompiles only its object, then relinks before running", async () => {
    const disk = fixture();
    const app = nativeProject(disk);
    successful(await disk.run([], ["-j", "2"]));
    disk.time("main.o", OLD + 100);
    disk.time("math.o", OLD + 100);
    disk.time(app, OLD + 200);
    const mainTime = disk.mtime("main.o");
    disk.write("math.c", '#include "math.h"\nint calculate(int value) { return value + OFFSET + 1; }\n', OLD + 300);
    const count = disk.events().length;
    successful(await disk.run([], ["-j", "2"]));
    const result = await disk.runProgram(app);
    successful(result);
    expect(result.stdout).toContain("c-result:43");
    expect(disk.mtime("main.o")).toBe(mainTime);
    expect(disk.events().slice(count).filter((event) => event.event === "end").map((event) => event.target)).toEqual(["math.o", app]);
    before(disk.events().slice(count), "math.o", app);
  });

  test.skipIf(!cc)("a changed shared header rebuilds both C objects and relinks", async () => {
    const disk = fixture();
    const app = nativeProject(disk);
    successful(await disk.run([], ["-j", "2"]));
    for (const name of ["main.o", "math.o"]) disk.time(name, OLD + 100);
    disk.time(app, OLD + 200);
    disk.write("math.h", disk.read("math.h").replace("#define OFFSET 2", "#define OFFSET 4"), OLD + 300);
    const count = disk.events().length;
    successful(await disk.run([], ["-j", "2"]));
    const result = await disk.runProgram(app);
    successful(result);
    expect(result.stdout).toContain("c-result:44");
    for (const name of ["main.o", "math.o"]) before(disk.events().slice(count), name, app);
    expect(disk.completed()).toHaveLength(6);
  });

  test.skipIf(!cc)("a real compiler error fails the build and prevents the link recipe", async () => {
    const disk = fixture();
    const app = nativeProject(disk);
    disk.write("main.c", "this is invalid C syntax;\n", OLD);
    const result = await disk.run([], ["-j", "1"]);
    expect.soft(result.code).not.toBe(0);
    expect.soft(result.stderr).toMatch(/error:/i);
    expect.soft(disk.exists(app)).toBe(false);
    expect(disk.events().filter((event) => event.target === app)).toEqual([]);
  });
});
