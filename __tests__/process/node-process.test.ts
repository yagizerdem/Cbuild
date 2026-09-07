import { expect, test, vi } from "vitest";
import { ProcessError, ProcessRunner } from "@cbuild-backend/process.js";

const runner = new ProcessRunner({
  shell: { executable: process.execPath, args: ["-e"] },
  output: "capture",
});

test("custom executable receives the complete command and environment", async () => {
  const result = await runner.run(
    'process.stdout.write(process.env.CBUILD_TEST_VALUE); process.stderr.write("err")',
    { env: { CBUILD_TEST_VALUE: "spaces & Unicode: ş" } },
  );

  expect(result).toMatchObject({
    exitCode: 0,
    stdout: "spaces & Unicode: ş",
    stderr: "err",
  });
});

test("default shell executes shell syntax", async () => {
  const result = await new ProcessRunner({ output: "capture" }).run(
    "echo first && echo second",
  );
  expect(result.stdout).toContain("first");
  expect(result.stdout).toContain("second");
});

test("failures retain output and can be explicitly ignored", async () => {
  await expect(
    runner.run('process.stderr.write("failed"); process.exit(7)'),
  ).rejects.toMatchObject({ result: { exitCode: 7, stderr: "failed" } });
  expect(
    (await runner.run("process.exit(7)", { ignoreErrors: true })).exitCode,
  ).toBe(7);
});

test("missing executable rejects even with ignoreErrors", async () => {
  await expect(
    runner.run("", {
      shell: { executable: "cbuild-nonexistent-shell-82764", args: [] },
      ignoreErrors: true,
    }),
  ).rejects.toBeInstanceOf(ProcessError);
});

test("recipe prefixes control echo and failure handling", async () => {
  const echo = vi.fn();
  const results = await runner.runRecipe(
    [
      '@process.stdout.write("hidden")',
      "-process.exit(3)",
      'process.stdout.write("done")',
    ],
    { echo },
  );
  expect(results.map((result) => result.exitCode)).toEqual([0, 3, 0]);
  expect(echo.mock.calls.flat()).toEqual([
    "process.exit(3)",
    'process.stdout.write("done")',
  ]);
  await expect(
    runner.runRecipe(["process.exit(2)", "process.exit(0)"], { echo }),
  ).rejects.toMatchObject({ result: { exitCode: 2 } });
});

test("pre-aborted command rejects", async () => {
  const controller = new AbortController();
  controller.abort();
  await expect(
    runner.run("setInterval(() => {}, 1000)", { signal: controller.signal }),
  ).rejects.toBeInstanceOf(ProcessError);
});
