import { describe, expect, test } from "vitest";
import { command, fixture, MODES, OLD, successful } from "./support.js";

describe("real shell execution and process boundaries", () => {
  test.each(MODES)("$name preserves the order of multiple commands in one recipe", async ({ flags }) => {
    const disk = fixture();
    disk.buildfile(`output.txt:\n\t${command('write "$@" first')}\n` +
      `\t${command('append "$@" -second')}\n\t${command('append "$@" -third')}\n`);
    successful(await disk.run(flags));
    expect(disk.read("output.txt")).toBe("first-second-third");
    expect(disk.events().map((event) => [event.event, event.action]))
      .toEqual([["start", "write"], ["end", "write"], ["start", "append"],
        ["end", "append"], ["start", "append"], ["end", "append"]]);
    successful(await disk.run(flags));
    expect(disk.completed()).toHaveLength(3);
    expect(disk.read("output.txt")).toBe("first-second-third");
  });

  test("shell && executes the second command only after the first succeeds", async () => {
    const disk = fixture();
    disk.buildfile(`output.txt:\n\t${command('write first.txt first')} && ${command('copy "$@" first.txt')}\n`);
    successful(await disk.run());
    expect(disk.read("output.txt")).toBe("first");
    expect(disk.completed()).toEqual(["first.txt", "output.txt"]);
    const events = disk.events();
    expect(events[1]).toMatchObject({ event: "end", target: "first.txt" });
    expect(events[2]).toMatchObject({ event: "start", target: "output.txt" });
  });

  test("shell && skips the second command when the first fails", async () => {
    const disk = fixture();
    disk.buildfile(`output.txt:\n\t${command('fail failed-step 13')} && ${command('write "$@" forbidden')}\n`);
    const result = await disk.run();
    expect(result.code).not.toBe(0);
    expect(disk.exists("output.txt")).toBe(false);
    expect(disk.events().map((event) => event.target)).toEqual(["failed-step", "failed-step"]);
  });

  test("quotes preserve spaces and Unicode inside recipe arguments", async () => {
    const disk = fixture();
    disk.buildfile(`output.txt:\n\t${command('write "$@" "hello world — merhaba 世界"')}\n`);
    successful(await disk.run());
    expect(disk.read("output.txt")).toBe("hello world — merhaba 世界");
    expect(disk.events()[0]!.args).toEqual(["hello world — merhaba 世界"]);
  });

  test("exported variables reach the child process and private build variables do not", async () => {
    const disk = fixture();
    disk.buildfile("BASE = expanded\nexport CBUILD_E2E_EXPORTED = $(BASE)-value\n" +
      "CBUILD_E2E_PRIVATE = must-not-export\n" +
      `output.json:\n\t${command('inspect "$@"')}\n`);
    successful(await disk.run());
    expect(JSON.parse(disk.read("output.json")))
      .toEqual({ args: [], cwd: disk.root, exported: "expanded-value", private: null });
    expect(disk.completed()).toEqual(["output.json"]);
  });

  test("captured stdout and stderr are forwarded while the artifact is produced", async () => {
    const disk = fixture();
    disk.buildfile(`output.txt:\n\t${command('stream "$@"')}\n`);
    const result = await disk.run();
    successful(result);
    expect(result.stdout).toContain("STDOUT_SENTINEL");
    expect(result.stderr).toContain("STDERR_SENTINEL");
    expect(disk.read("output.txt")).toBe("stream-complete");
    expect(disk.completed()).toEqual(["output.txt"]);
  });

  test("-j 2 actually overlaps independent jobs and waits before consuming their outputs", async () => {
    const disk = fixture();
    disk.buildfile(
      `bundle.txt: left.txt right.txt\n\t${command('join "$@" left.txt right.txt')}\n` +
      `left.txt:\n\t${command('overlap "$@" right.txt')}\n` +
      `right.txt:\n\t${command('overlap "$@" left.txt')}\n`,
    );
    successful(await disk.run(["-j", "2"]));
    expect(disk.read("bundle.txt")).toBe("left.txt|right.txt");
    const events = disk.events();
    const start = (target: string) => events.findIndex((event) => event.event === "start" && event.target === target);
    const end = (target: string) => events.findIndex((event) => event.event === "end" && event.target === target);
    expect(start("left.txt")).toBeLessThan(end("right.txt"));
    expect(start("right.txt")).toBeLessThan(end("left.txt"));
    expect(end("left.txt")).toBeLessThan(start("bundle.txt"));
    expect(end("right.txt")).toBeLessThan(start("bundle.txt"));
    expect(disk.completed()).toHaveLength(3);
  }, 20000);

  test("--keep-going finishes an independent branch, blocks failed consumers and returns failure", async () => {
    const disk = fixture();
    disk.buildfile(
      `all.txt: bad.txt good.txt\n\t${command('join "$@" bad.txt good.txt')}\n` +
      `good.txt:\n\t${command('write "$@" independent-success')}\n` +
      `bad.txt:\n\t${command('fail "$@" 7')}\n`,
    );
    const result = await disk.run(["-j", "1", "--keep-going"]);
    expect(result.code).not.toBe(0);
    expect(disk.read("good.txt")).toBe("independent-success");
    expect(disk.exists("bad.txt")).toBe(false);
    expect(disk.exists("all.txt")).toBe(false);
    expect(disk.completed()).toEqual(["good.txt"]);
    expect(disk.events().filter((event) => event.event === "failure").map((event) => event.target)).toEqual(["bad.txt"]);
  });

  test("--ignore-errors continues to the next recipe line after a nonzero shell exit", async () => {
    const disk = fixture();
    disk.buildfile(`output.txt:\n\t${command('fail ignored-step 7')}\n\t${command('write "$@" recovered')}\n`);
    const result = await disk.run(["--sequential", "--ignore-errors"]);
    expect.soft(result.code, result.stderr).toBe(0);
    expect.soft(disk.exists("output.txt")).toBe(true);
    if (disk.exists("output.txt")) expect(disk.read("output.txt")).toBe("recovered");
    expect(disk.completed()).toEqual(["output.txt"]);
  });
});

describe("non-executing modes and pre-execution errors", () => {
  test.each(["--dry-run", "--just-print", "--recon"])("%s prints recipes without creating files or starting recipe programs", async (flag) => {
    const disk = fixture();
    disk.write("source.txt", "source", OLD);
    disk.buildfile(`output.txt: source.txt\n\t${command('copy "$@" "$<"')}\n`);
    const result = await disk.run(["--sequential", flag]);
    successful(result);
    expect(result.stdout).toContain("actions.cjs");
    expect(disk.exists("output.txt")).toBe(false);
    expect(disk.events()).toEqual([]);
  });

  test("--question reports stale/current status without executing any recipe", async () => {
    const disk = fixture();
    disk.write("source.txt", "source", OLD);
    disk.buildfile(`output.txt: source.txt\n\t${command('copy "$@" "$<"')}\n`);
    const stale = await disk.run(["--sequential", "--question"]);
    expect(stale.code).toBe(1);
    expect(disk.exists("output.txt")).toBe(false);
    expect(disk.events()).toEqual([]);
    disk.write("output.txt", "source", OLD + 20);
    const current = await disk.run(["--sequential", "--question"]);
    expect(current.code).toBe(0);
    expect(disk.events()).toEqual([]);
    expect(disk.read("output.txt")).toBe("source");
  });

  test.each([
    { label: "missing prerequisite", diagnostic: /No rule to make target.*missing\.txt/i,
      source: `output.txt: missing.txt\n\t${command('write "$@" forbidden')}\n` },
    { label: "dependency cycle", diagnostic: /circular|cycle/i,
      source: `output.txt: other.txt\n\t${command('write "$@" forbidden')}\nother.txt: output.txt\n` },
    { label: "mandatory missing include", diagnostic: /include file not found/i,
      source: `include missing.mk\noutput.txt:\n\t${command('write "$@" forbidden')}\n` },
    { label: "compile error", diagnostic: /missing separator|syntax|mismatched|extraneous/i,
      source: "this is not a valid rule or assignment\n" },
  ])("$label fails before recipe execution", async ({ source, diagnostic }) => {
    const disk = fixture();
    disk.buildfile(source);
    const result = await disk.run();
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(diagnostic);
    expect(disk.exists("output.txt")).toBe(false);
    expect(disk.events()).toEqual([]);
  });

  test("a missing buildfile returns failure without executing any command", async () => {
    const disk = fixture();
    const result = await disk.run();
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/no makefile|no targets/i);
    expect(disk.events()).toEqual([]);
  });
});
