import { afterEach, describe, expect, test, vi } from "vitest";
import path from "node:path";
import { defaultShell, ProcessRunner, type ProcessOptions } from "@src/cbuild-backend/process.js";
import { ErrorType, MachineCode } from "@src/cbuild-exception.js";

// Node's -e accepts a complete script as one argument on every supported OS.
const nodeShell = { executable: process.execPath, args: ["-e"] };
const failure = {
  errorType: ErrorType.PROCESS,
  machineCode: MachineCode.SHELL_COMMAND_FAILED,
  row: -1,
  column: -1,
};

afterEach(() => vi.unstubAllEnvs());

describe.each(["sync", "async"] as const)("ProcessRunner %s", (mode) => {
  function run(command: string, options: ProcessOptions = {}, defaults: ProcessOptions = {}) {
    const runner = new ProcessRunner({ shell: nodeShell, output: "capture", ...defaults });
    // Wrapping sync calls also lets rejection assertions cover both interfaces.
    return Promise.resolve().then(() => mode === "sync"
      ? runner.runSync(command, options)
      : runner.runAsync(command, options));
  }

  test("captures stdout and stderr separately and preserves the command", async () => {
    const command = 'process.stdout.write("hello 世界"); process.stderr.write("warning")';
    expect(await run(command)).toEqual({ command, exitCode: 0, signal: null, stdout: "hello 世界", stderr: "warning" });
  });

  test("returns empty output for a command that writes nothing", async () => {
    expect(await run("")).toMatchObject({ exitCode: 0, stdout: "", stderr: "" });
  });

  test("collects multiple output chunks", async () => {
    expect(await run('process.stdout.write("first"); setTimeout(() => process.stdout.write("second"), 10)'))
      .toMatchObject({ stdout: "firstsecond", exitCode: 0 });
  });

  test("rejects nonzero exit codes with process diagnostics", async () => {
    await expect(run("process.exit(7)")).rejects.toMatchObject({ ...failure, message: expect.stringContaining("(7)") });
  });

  test("returns captured output and nonzero status when errors are ignored", async () => {
    expect(await run('process.stderr.write("failed"); process.exit(7)', { ignoreErrors: true }))
      .toMatchObject({ exitCode: 7, stderr: "failed" });
  });

  test("per-call options override default error handling", async () => {
    await expect(run("process.exit(7)", { ignoreErrors: false }, { ignoreErrors: true }))
      .rejects.toMatchObject(failure);
  });

  test("merges inherited, default and per-call environment values", async () => {
    vi.stubEnv("CBUILD_PROCESS_INHERITED", "parent");
    const command = 'process.stdout.write(JSON.stringify([process.env.CBUILD_PROCESS_INHERITED, process.env.CBUILD_PROCESS_DEFAULT, process.env.CBUILD_PROCESS_OVERRIDE]))';
    const result = await run(command,
      { env: { CBUILD_PROCESS_OVERRIDE: "call" } },
      { env: { CBUILD_PROCESS_DEFAULT: "default", CBUILD_PROCESS_OVERRIDE: "default" } });
    expect(JSON.parse(result.stdout)).toEqual(["parent", "default", "call"]);
  });

  test("undefined environment overrides remove inherited and default values", async () => {
    vi.stubEnv("CBUILD_PROCESS_REMOVED", "parent");
    expect(await run('process.stdout.write(String(process.env.CBUILD_PROCESS_REMOVED))',
      { env: { CBUILD_PROCESS_REMOVED: undefined } },
      { env: { CBUILD_PROCESS_REMOVED: "default" } }))
      .toMatchObject({ stdout: "undefined" });
  });

  test("uses the requested working directory", async () => {
    const cwd = path.resolve("__tests__", "process");
    const result = await run("process.stdout.write(process.cwd())", { cwd }, { cwd: process.cwd() });
    expect(result.stdout.toLowerCase()).toBe(cwd.toLowerCase());
  });

  test("rejects an invalid working directory even when errors are ignored", async () => {
    await expect(run("", { cwd: `${process.cwd()}/__cbuild_missing_directory__`, ignoreErrors: true }))
      .rejects.toMatchObject(failure);
  });

  test("rejects missing executables even when errors are ignored", async () => {
    await expect(run("", { shell: { executable: "__cbuild_missing_shell__", args: [] }, ignoreErrors: true }))
      .rejects.toMatchObject(failure);
  });

  test("rejects cancellation before launching the command", async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(run("process.exit(7)", { signal: controller.signal, ignoreErrors: true }))
      .rejects.toMatchObject({ errorType: ErrorType.PROCESS, machineCode: MachineCode.SHELL_COMMAND_ABORTED });
  });

  test("inherit mode does not return captured output", async () => {
    expect(await run("", { output: "inherit" })).toMatchObject({ stdout: "", stderr: "", exitCode: 0 });
  });

  test("constructor snapshots shell arguments and environment defaults", async () => {
    const shell = { executable: process.execPath, args: ["-e"] };
    const env = { CBUILD_PROCESS_SNAPSHOT: "original" };
    const runner = new ProcessRunner({ shell, env, output: "capture" });
    shell.args[0] = "--invalid-option";
    env.CBUILD_PROCESS_SNAPSHOT = "changed";
    const command = "process.stdout.write(process.env.CBUILD_PROCESS_SNAPSHOT)";
    const result = mode === "sync" ? runner.runSync(command) : await runner.runAsync(command);
    expect(result.stdout).toBe("original");
  });
});

describe("shell validation and default shell", () => {
  test("selects the platform shell", () => {
    if (process.platform === "win32") {
      vi.stubEnv("ComSpec", "C:\\custom\\cmd.exe");
      expect(defaultShell()).toEqual({ executable: "C:\\custom\\cmd.exe", args: ["/d", "/s", "/c"] });
      vi.stubEnv("ComSpec", "");
      expect(defaultShell().executable).toBe("cmd.exe");
    } else {
      expect(defaultShell()).toEqual({ executable: "/bin/sh", args: ["-c"] });
    }
  });

  test("executes a command through the default shell", async () => {
    const runner = new ProcessRunner({ output: "capture" });
    expect(runner.runSync("echo cbuild-process-test").stdout.trim()).toBe("cbuild-process-test");
    expect((await runner.runAsync("echo cbuild-process-test")).stdout.trim()).toBe("cbuild-process-test");
  });

  test("sync rejects an empty executable with INVALID_SHELL_PATH", () => {
    expect(() => new ProcessRunner({ shell: { executable: "  ", args: [] } }).runSync(""))
      .toThrow(expect.objectContaining({ machineCode: MachineCode.INVALID_SHELL_PATH }));
  });

  test("async rejects an empty executable with TypeError", async () => {
    await expect(new ProcessRunner({ shell: { executable: "  ", args: [] } }).runAsync(""))
      .rejects.toThrow(TypeError);
  });
});
