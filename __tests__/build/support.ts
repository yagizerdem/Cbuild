import { spawn } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  unlinkSync,
  utimesSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testRoot, "../..");
const fixtures = new Set<string>();
let runtimeRoot: string | undefined;
let cliEntry: string | undefined;

export interface ProcessResult {
  code: number | null;
  stdout: string;
  stderr: string;
}
export interface Event {
  event: "start" | "end" | "failure";
  action: string;
  target: string;
  args: string[];
  cwd: string;
  pid: number;
}

function checked(root: string, filename: string) {
  const absolute = path.resolve(root, filename);
  const relative = path.relative(root, absolute);
  if (
    relative === ".." ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  )
    throw new Error("Path escapes tests/build fixture");
  return absolute;
}

function execute(
  args: string[],
  cwd: string,
  env: NodeJS.ProcessEnv = {},
  timeout = 15000,
): Promise<ProcessResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd,
      env: { ...process.env, ...env },
      shell: false,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, timeout);
    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (timedOut)
        reject(
          new Error(
            `Child process timed out: ${args[0]}\n${stdout}\n${stderr}`,
          ),
        );
      else resolve({ code, stdout, stderr });
    });
  });
}

export async function prepareRuntime() {
  // Compile current production sources once, exclusively into this test folder.
  // Never run npm build: it would overwrite the repository's existing dist.
  runtimeRoot = mkdtempSync(path.join(testRoot, ".runtime-"));
  const config = checked(runtimeRoot, "tsconfig.json");
  writeFileSync(
    config,
    JSON.stringify(
      {
        extends: path.join(repoRoot, "tsconfig.prod.json"),
        compilerOptions: {
          rootDir: repoRoot,
          outDir: runtimeRoot,
          declaration: false,
          sourceMap: false,
          inlineSources: false,
          incremental: false,
          noEmitOnError: true,
        },
        include: [repoRoot.replaceAll("\\", "/") + "/src/**/*.ts"],
        exclude: [path.join(repoRoot, "node_modules"), "**/*.spec.ts"],
      },
      null,
      2,
    ),
  );
  copyFileSync(
    path.join(repoRoot, "package.json"),
    checked(runtimeRoot, "package.json"),
  );
  for (const compiler of [
    "typescript/bin/tsc",
    "tsc-alias/dist/bin/index.js",
  ]) {
    // Resolve alias paths relative to the original root tsconfig; its paths
    // describe the source tree, whereas the temporary config lives elsewhere.
    const args = compiler.startsWith("typescript")
      ? ["-p", config]
      : ["-p", path.join(repoRoot, "tsconfig.json"), "--outDir", runtimeRoot];
    const result = await execute(
      [path.join(repoRoot, "node_modules", compiler), ...args],
      repoRoot,
      {},
      30000,
    );
    if (result.code !== 0)
      throw new Error(
        `Test runtime compilation failed: ${compiler}\n${result.stdout}\n${result.stderr}`,
      );
  }
  cliEntry = checked(runtimeRoot, "src/main.js");
  if (!existsSync(cliEntry)) throw new Error("Compiled CLI entry is missing");
  const smoke = await execute([cliEntry, "--version"], testRoot);
  if (smoke.code !== 0 || !smoke.stdout.includes("CBuild"))
    throw new Error(
      `Compiled CLI cannot start\n${smoke.stdout}\n${smoke.stderr}`,
    );
}

function removeCreatedDirectory(root: string, prefix: string) {
  const absolute = checked(testRoot, root);
  if (!path.basename(absolute).startsWith(prefix))
    throw new Error("Refusing to remove a non-test directory");
  rmSync(absolute, { recursive: true, force: true });
}

export function cleanupFixtures() {
  for (const root of fixtures) {
    removeCreatedDirectory(root, ".fixture-");
    fixtures.delete(root);
  }
}

export function cleanupRuntime() {
  cleanupFixtures();
  if (runtimeRoot) removeCreatedDirectory(runtimeRoot, ".runtime-");
  runtimeRoot = undefined;
  cliEntry = undefined;
}

export const OLD = Math.floor(Date.now() / 1000) - 10000;
export const MODES = [
  { name: "sequential", flags: ["--sequential"] },
  { name: "parallel scheduler, one job", flags: ["-j", "1"] },
  { name: "parallel scheduler, three jobs", flags: ["-j", "3"] },
];
export const HEADER = "NODE = $(CBUILD_E2E_NODE)\n";
export const command = (args: string) => `"$(NODE)" actions.cjs ${args}`;

export function fixture() {
  const root = mkdtempSync(path.join(testRoot, ".fixture-"));
  fixtures.add(root);
  copyFileSync(
    path.join(testRoot, "actions.cjs"),
    checked(root, "actions.cjs"),
  );
  return {
    root,
    path(name: string) {
      return checked(root, name);
    },
    write(name: string, content: string, time?: number) {
      const filename = this.path(name);
      mkdirSync(path.dirname(filename), { recursive: true });
      writeFileSync(filename, content);
      if (time !== undefined) utimesSync(filename, time, time);
    },
    buildfile(source: string, name = "CBuildfile") {
      this.write(name, HEADER + source);
    },
    read(name: string) {
      return readFileSync(this.path(name), "utf8");
    },
    exists(name: string) {
      return existsSync(this.path(name));
    },
    remove(name: string) {
      unlinkSync(this.path(name));
    },
    time(name: string, value: number) {
      utimesSync(this.path(name), value, value);
    },
    mtime(name: string) {
      return statSync(this.path(name), { bigint: true }).mtimeNs;
    },
    events(): Event[] {
      return this.exists("execution.jsonl")
        ? this.read("execution.jsonl")
            .trim()
            .split("\n")
            .filter(Boolean)
            .map((line) => JSON.parse(line) as Event)
        : [];
    },
    completed() {
      return this.events()
        .filter((event) => event.event === "end")
        .map((event) => event.target);
    },
    async run(
      flags: string[] = ["--sequential"],
      extra: {
        args?: string[];
        cwd?: string;
        env?: NodeJS.ProcessEnv;
      } = {},
    ) {
      if (!cliEntry)
        throw new Error("prepareRuntime must complete before a build");
      return execute(
        [cliEntry, ...flags, ...(extra.args ?? [])],
        extra.cwd ?? root,
        {
          DEV_MODE: undefined,
          CBUILD_E2E_EXPORTED: undefined,
          CBUILD_E2E_PRIVATE: undefined,
          CBUILD_E2E_NODE: process.execPath,
          ...extra.env,
        },
      );
    },
    async runNode(name: string) {
      return execute([this.path(name)], root);
    },
  };
}

export type Fixture = ReturnType<typeof fixture>;

export function successful(result: ProcessResult) {
  if (result.code !== 0)
    throw new Error(
      `cbuild exited ${result.code}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );
}
