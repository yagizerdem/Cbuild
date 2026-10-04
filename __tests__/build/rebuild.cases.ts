import { describe, expect, test } from "vitest";
import { command, fixture, MODES, OLD, successful } from "./support.js";

describe.each(MODES)("incremental rebuilds: $name", ({ flags }) => {
  test("only the changed branch and its consumer rebuild; repeated unchanged builds do nothing", async () => {
    const disk = fixture();
    disk.write("left.src", "left-v1", OLD);
    disk.write("right.src", "right-v1", OLD);
    disk.buildfile(
      `bundle.txt: left.txt right.txt\n\t${command('join "$@" left.txt right.txt')}\n` +
      `left.txt: left.src\n\t${command('upper "$@" "$<"')}\n` +
      `right.txt: right.src\n\t${command('upper "$@" "$<"')}\n`,
    );
    successful(await disk.run(flags));
    expect(disk.read("bundle.txt")).toBe("LEFT-V1|RIGHT-V1");
    disk.time("left.txt", OLD + 20);
    disk.time("right.txt", OLD + 20);
    disk.time("bundle.txt", OLD + 40);
    const untouchedTime = disk.mtime("right.txt");
    const baseline = disk.completed().length;
    disk.write("left.src", "left-v2", OLD + 60);
    successful(await disk.run(flags));
    expect(disk.completed().slice(baseline)).toEqual(["left.txt", "bundle.txt"]);
    expect(disk.read("bundle.txt")).toBe("LEFT-V2|RIGHT-V1");
    expect(disk.mtime("right.txt")).toBe(untouchedTime);
    for (let attempt = 0; attempt < 3; attempt++) successful(await disk.run(flags));
    expect(disk.completed().slice(baseline)).toEqual(["left.txt", "bundle.txt"]);
    expect(disk.read("bundle.txt")).toBe("LEFT-V2|RIGHT-V1");
  });

  test("deleting an intermediate rebuilds it before rebuilding its consumer", async () => {
    const disk = fixture();
    disk.write("source.txt", "source", OLD);
    disk.buildfile(
      `final.txt: mid.txt\n\t${command('copy "$@" "$<"')}\n` +
      `mid.txt: source.txt\n\t${command('upper "$@" "$<"')}\n`,
    );
    successful(await disk.run(flags));
    disk.time("final.txt", OLD + 20);
    disk.remove("mid.txt");
    const baseline = disk.completed().length;
    successful(await disk.run(flags));
    expect(disk.completed().slice(baseline)).toEqual(["mid.txt", "final.txt"]);
    expect(disk.read("mid.txt")).toBe("SOURCE");
    expect(disk.read("final.txt")).toBe("SOURCE");
  });

  test("deleting only the final artifact reruns only its recipe", async () => {
    const disk = fixture();
    disk.write("source.txt", "data", OLD);
    disk.buildfile(
      `final.txt: mid.txt\n\t${command('copy "$@" "$<"')}\n` +
      `mid.txt: source.txt\n\t${command('upper "$@" "$<"')}\n`,
    );
    successful(await disk.run(flags));
    const time = disk.mtime("mid.txt");
    disk.remove("final.txt");
    const baseline = disk.completed().length;
    successful(await disk.run(flags));
    expect(disk.completed().slice(baseline)).toEqual(["final.txt"]);
    expect(disk.mtime("mid.txt")).toBe(time);
    expect(disk.read("final.txt")).toBe("DATA");
  });

  test("equal timestamps skip the recipe, a strictly newer input rebuilds, an older input does not", async () => {
    const disk = fixture();
    disk.write("source.txt", "equal", OLD);
    disk.write("output.txt", "equal", OLD);
    disk.buildfile(`output.txt: source.txt\n\t${command('copy "$@" "$<"')}\n`);
    expect(disk.mtime("source.txt")).toBe(disk.mtime("output.txt"));
    successful(await disk.run(flags));
    expect(disk.events()).toEqual([]);
    disk.write("source.txt", "newer", OLD + 10);
    successful(await disk.run(flags));
    expect(disk.read("output.txt")).toBe("newer");
    expect(disk.completed()).toEqual(["output.txt"]);
    disk.write("source.txt", "older-content", OLD - 10);
    const time = disk.mtime("output.txt");
    successful(await disk.run(flags));
    expect(disk.read("output.txt")).toBe("newer");
    expect(disk.mtime("output.txt")).toBe(time);
    expect(disk.completed()).toEqual(["output.txt"]);
  });

  test("a missing order-only artifact rebuilds without rebuilding a current consumer", async () => {
    const disk = fixture();
    disk.write("source.txt", "data", OLD);
    disk.buildfile(
      `output.txt: source.txt | ready.stamp\n\t${command('copy "$@" "$<"')}\n` +
      `ready.stamp:\n\t${command('write "$@" ready')}\n`,
    );
    successful(await disk.run(flags));
    const time = disk.mtime("output.txt");
    disk.remove("ready.stamp");
    const baseline = disk.completed().length;
    successful(await disk.run(flags));
    expect(disk.completed().slice(baseline)).toEqual(["ready.stamp"]);
    expect(disk.mtime("output.txt")).toBe(time);
    expect(disk.read("output.txt")).toBe("data");
    expect(disk.read("ready.stamp")).toBe("ready");
  });
});

describe("CLI freshness controls", () => {
  test("--what-if rebuilds without modifying the input file", async () => {
    const disk = fixture();
    disk.write("source.txt", "source", OLD);
    disk.write("output.txt", "obsolete", OLD + 20);
    disk.buildfile(`output.txt: source.txt\n\t${command('copy "$@" "$<"')}\n`);
    const inputTime = disk.mtime("source.txt");
    successful(await disk.run(["--sequential", "--what-if", "source.txt"]));
    expect(disk.read("output.txt")).toBe("source");
    expect(disk.mtime("source.txt")).toBe(inputTime);
    expect(disk.completed()).toEqual(["output.txt"]);
  });

  test("--old-file prevents a newer input from triggering a rebuild", async () => {
    const disk = fixture();
    disk.write("source.txt", "new", OLD + 20);
    disk.write("output.txt", "kept", OLD);
    disk.buildfile(`output.txt: source.txt\n\t${command('copy "$@" "$<"')}\n`);
    successful(await disk.run(["--sequential", "--old-file", "source.txt"]));
    expect(disk.read("output.txt")).toBe("kept");
    expect(disk.events()).toEqual([]);
  });

  test("--touch creates the target without executing its recipe or truncating it later", async () => {
    const disk = fixture();
    disk.write("source.txt", "source", OLD);
    disk.buildfile(`output.txt: source.txt\n\t${command('copy "$@" "$<"')}\n`);
    successful(await disk.run(["--sequential", "--touch"]));
    expect(disk.read("output.txt")).toBe("");
    expect(disk.events()).toEqual([]);
    disk.write("output.txt", "preserve", OLD);
    const time = disk.mtime("output.txt");
    disk.time("source.txt", OLD + 20);
    successful(await disk.run(["--sequential", "--touch"]));
    expect(disk.read("output.txt")).toBe("preserve");
    expect(disk.mtime("output.txt")).toBeGreaterThan(time);
    expect(disk.events()).toEqual([]);
  });
});
