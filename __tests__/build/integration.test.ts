import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import {
  cleanupFixtures,
  cleanupRuntime,
  command,
  fixture,
  MODES,
  OLD,
  prepareRuntime,
  successful,
} from "./support.js";
import "./rebuild.cases.js";
import "./shell.cases.js";

beforeAll(prepareRuntime, 60000);
afterEach(cleanupFixtures);
afterAll(cleanupRuntime);

describe.each(MODES)("real CLI build pipeline: $name", ({ flags }) => {
  test("reads a disk buildfile and builds a dependency chain in order", async () => {
    const disk = fixture();
    disk.write("input.txt", "hello 世界\n", OLD);
    disk.buildfile(
      `final.txt: middle.txt\n\t${command('copy "$@" "$<"')}\n` +
        `middle.txt: input.txt\n\t${command('upper "$@" "$<"')}\n`,
    );
    successful(await disk.run(flags));
    expect(disk.read("middle.txt")).toBe("HELLO 世界\n");
    expect(disk.read("final.txt")).toBe("HELLO 世界\n");
    expect(disk.completed()).toEqual(["middle.txt", "final.txt"]);
    expect(disk.events().map((event) => [event.event, event.target])).toEqual([
      ["start", "middle.txt"],
      ["end", "middle.txt"],
      ["start", "final.txt"],
      ["end", "final.txt"],
    ]);
    expect(disk.events().every((event) => event.cwd === disk.root)).toBe(true);
    const times = [disk.mtime("middle.txt"), disk.mtime("final.txt")];
    for (let attempt = 0; attempt < 3; attempt++)
      successful(await disk.run(flags));
    expect(disk.completed()).toEqual(["middle.txt", "final.txt"]);
    expect([disk.mtime("middle.txt"), disk.mtime("final.txt")]).toEqual(times);
    expect(disk.read("final.txt")).toBe("HELLO 世界\n");
  });

  test("a diamond builds its shared input once and waits for both branches", async () => {
    const disk = fixture();
    disk.write("seed.txt", "seed", OLD);
    disk.buildfile(
      `bundle.txt: left.txt right.txt\n\t${command('join "$@" left.txt right.txt')}\n` +
        `left.txt: shared.txt\n\t${command('copy "$@" "$<"')}\n` +
        `right.txt: shared.txt\n\t${command('upper "$@" "$<"')}\n` +
        `shared.txt: seed.txt\n\t${command('copy "$@" "$<"')}\n`,
    );
    successful(await disk.run(flags));
    expect(disk.read("bundle.txt")).toBe("seed|SEED");
    const events = disk.events();
    const end = (name: string) =>
      events.findIndex(
        (event) => event.event === "end" && event.target === name,
      );
    const start = (name: string) =>
      events.findIndex(
        (event) => event.event === "start" && event.target === name,
      );
    expect(
      disk.completed().filter((name) => name === "shared.txt"),
    ).toHaveLength(1);
    for (const name of ["left.txt", "right.txt"]) {
      expect(end("shared.txt")).toBeLessThan(start(name));
      expect(end(name)).toBeLessThan(start("bundle.txt"));
    }
    expect(disk.completed()).toHaveLength(4);
  });

  test("included assignments, conditionals and an implicit recipe produce real files", async () => {
    const disk = fixture();
    disk.write("app.src", "source-v1", OLD);
    disk.write(
      "rules.mk",
      "MODE = release\n" +
        `%.obj: %.src\nifeq ($(MODE),release)\n\t${command('upper "$@" "$<"')}\nelse\n` +
        `\t${command('write "$@" incorrect-debug-branch')}\nendif\n`,
    );
    disk.buildfile(
      "include rules.mk\n" +
        `result.txt: app.obj\n\t${command('copy "$@" "$<"')}\n`,
    );
    successful(await disk.run(flags));
    expect(disk.read("app.obj")).toBe("SOURCE-V1");
    expect(disk.read("result.txt")).toBe("SOURCE-V1");
    expect(disk.completed()).toEqual(["app.obj", "result.txt"]);
    successful(await disk.run(flags));
    expect(disk.completed()).toEqual(["app.obj", "result.txt"]);
  });

  test("order-only prerequisites finish before recipe and never enter the normal input list", async () => {
    const disk = fixture();
    disk.write("input.txt", "input", OLD);
    disk.buildfile(
      `result.json: input.txt input.txt | prepare.stamp\n\t${command('inspect "$@" "$<" "$^" "$+" "$|" "$?"')}\n` +
        `prepare.stamp:\n\t${command('write "$@" ready')}\n`,
    );
    successful(await disk.run(flags));
    expect(disk.completed()).toEqual(["prepare.stamp", "result.json"]);
    expect(JSON.parse(disk.read("result.json")).args).toEqual([
      "input.txt",
      "input.txt",
      "input.txt input.txt",
      "prepare.stamp",
      "input.txt",
    ]);
    const time = disk.mtime("result.json");
    disk.time("prepare.stamp", Math.floor(Date.now() / 1000) + 100);
    successful(await disk.run(flags));
    expect(disk.completed()).toEqual(["prepare.stamp", "result.json"]);
    expect(disk.mtime("result.json")).toBe(time);
  });

  test("a failed recipe stops later recipe lines and blocks consumers", async () => {
    const disk = fixture();
    disk.buildfile(
      `final.txt: failed.txt\n\t${command('write "$@" must-not-run')}\n` +
        `failed.txt:\n\t${command('fail "$@" 7')}\n\t${command('write "$@" must-not-run')}\n`,
    );
    const result = await disk.run(flags);
    expect(result.code).not.toBe(0);
    expect(result.stderr).toMatch(/failed|7/i);
    expect(disk.exists("final.txt")).toBe(false);
    expect(disk.exists("failed.txt")).toBe(false);
    expect(disk.events().map((event) => [event.event, event.target])).toEqual([
      ["start", "failed.txt"],
      ["failure", "failed.txt"],
    ]);
    // Repair a failed recipe and rerun a fresh CLI process using the same files.
    disk.buildfile(
      `final.txt: failed.txt\n\t${command('copy "$@" "$<"')}\n` +
        `failed.txt:\n\t${command('write "$@" recovered')}\n`,
    );
    successful(await disk.run(flags));
    expect(disk.read("final.txt")).toBe("recovered");
    expect(disk.completed()).toEqual(["failed.txt", "final.txt"]);
  });
});

describe("CLI entry, paths and runnable artifacts", () => {
  test("-f and -C read a custom buildfile and execute inside a directory with spaces", async () => {
    const disk = fixture();
    disk.write("project with spaces/input.txt", "quoted-content", OLD);
    disk.write("project with spaces/actions.cjs", disk.read("actions.cjs"));
    disk.buildfile(
      `output.txt: input.txt\n\t${command('copy "$@" "$<"')}\n`,
      "project with spaces/custom.mk",
    );
    successful(
      await disk.run([
        "--sequential",
        "-C",
        "project with spaces",
        "-f",
        "custom.mk",
      ]),
    );
    expect(disk.read("project with spaces/output.txt")).toBe("quoted-content");
    const event = JSON.parse(
      disk.read("project with spaces/execution.jsonl").split("\n")[0]!,
    );
    expect(event.cwd).toBe(disk.path("project with spaces"));
    expect(disk.exists("output.txt")).toBe(false);
  });

  test("builds a JavaScript artifact, then runs it through a real redirected shell command", async () => {
    const disk = fixture();
    disk.write(
      "program.src",
      'process.stdout.write("built-program:42");\n',
      OLD,
    );
    disk.buildfile(
      `result.txt: program.js\n\t"$(NODE)" program.js > result.txt\n` +
        `\t${command('inspect execution-proof.json "$@"')}\n` +
        `program.js: program.src\n\t${command('copy "$@" "$<"')}\n`,
    );
    successful(await disk.run());
    expect(disk.read("program.js")).toBe(disk.read("program.src"));
    expect(disk.read("result.txt")).toBe("built-program:42");
    expect(disk.completed()).toEqual(["program.js", "execution-proof.json"]);
    const standalone = await disk.runNode("program.js");
    successful(standalone);
    expect(standalone.stdout).toBe("built-program:42");
    successful(await disk.run());
    expect(disk.completed()).toEqual(["program.js", "execution-proof.json"]);
  });

  test("unreachable targets do not execute when building the default goal", async () => {
    const disk = fixture();
    disk.buildfile(
      `wanted.txt:\n\t${command('write "$@" wanted')}\n` +
        `unrelated.txt:\n\t${command('write "$@" must-not-run')}\n`,
    );
    successful(await disk.run(["-j", "3"]));
    expect(disk.read("wanted.txt")).toBe("wanted");
    expect(disk.exists("unrelated.txt")).toBe(false);
    expect(disk.completed()).toEqual(["wanted.txt"]);
  });
});
