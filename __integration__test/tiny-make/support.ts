import { spawn, spawnSync } from "node:child_process";
import {
  copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync,
  rmSync, statSync, unlinkSync, utimesSync, writeFileSync,
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
  target: string;
  cwd: string;
  pid: number;
}

function checked(root: string, filename: string) {
  const absolute = path.resolve(root, filename);
  const relative = path.relative(root, absolute);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative))
    throw new Error("Path escapes tinyMake integration fixture");
  return absolute;
}

export function execute(executable: string, args: string[], cwd: string, timeout = 15000): Promise<ProcessResult> {
  return new Promise((resolve, reject) => {
    const compilerDirs = [cc, cxx].filter((value): value is string => Boolean(value))
      .filter(path.isAbsolute).map((value) => path.dirname(value));
    const child = spawn(executable, args, {
      cwd,
      env: { ...process.env, DEV_MODE: undefined,
        PATH: [path.dirname(process.execPath), ...compilerDirs, process.env.PATH ?? ""].join(path.delimiter) },
      shell: false, windowsHide: true, detached: process.platform !== "win32",
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      // Stop the entire tree, including shells/compilers, before fixture cleanup.
      if (process.platform === "win32" && child.pid) {
        spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true });
      } else if (child.pid) {
        try { process.kill(-child.pid, "SIGKILL"); } catch { child.kill("SIGKILL"); }
      }
    }, timeout);
    child.stdout.on("data", (chunk) => { stdout += String(chunk); });
    child.stderr.on("data", (chunk) => { stderr += String(chunk); });
    child.on("error", (error) => { clearTimeout(timer); reject(error); });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (timedOut) reject(new Error(`Build timed out after ${timeout} ms\n${stdout}\n${stderr}`));
      else resolve({ code, stdout, stderr });
    });
  });
}

function compiler(variable: string, candidates: string[]) {
  const configured = process.env[variable];
  for (const candidate of configured ? [configured] : candidates) {
    const result = spawnSync(candidate, ["--version"], { encoding: "utf8", windowsHide: true, timeout: 5000 });
    if (!result.error && result.status === 0) return candidate;
  }
  if (configured) throw new Error(`${variable} is not executable: ${configured}`);
  return undefined;
}

export const cc = compiler("TINYMAKE_TEST_CC", ["gcc", "clang", "cc", ...(process.platform === "win32"
  ? ["C:/msys64/ucrt64/bin/gcc.exe", "C:/msys64/mingw64/bin/gcc.exe"] : [])]);
export const cxx = compiler("TINYMAKE_TEST_CXX", ["g++", "clang++", "c++", ...(process.platform === "win32"
  ? ["C:/msys64/ucrt64/bin/g++.exe", "C:/msys64/mingw64/bin/g++.exe"] : [])]);
export const executableName = (name: string) => name + (process.platform === "win32" ? ".exe" : "");
export const OLD = Math.floor(Date.now() / 1000) - 10000;
const portable = (value: string) => value.replaceAll("\\", "/");
const quote = (value: string) => /[\s"'|&<>]/.test(value) ? `"${portable(value)}"` : portable(value);
// PATH starts with this test's Node directory. Dedicated path/pipe tests
// exercise shell quoting independently of the dependency graph tests.
export const action = (...args: string[]) => ["node", "actions.cjs", ...args.map(quote)].join(" ");

export async function prepareRuntime() {
  // Compile today's sources in isolation; tests never depend on stale dist files.
  runtimeRoot = mkdtempSync(path.join(testRoot, ".runtime-"));
  const config = checked(runtimeRoot, "tsconfig.json");
  writeFileSync(config, JSON.stringify({
    extends: path.join(repoRoot, "tsconfig.prod.json"),
    compilerOptions: { rootDir: repoRoot, outDir: runtimeRoot, declaration: false,
      sourceMap: false, inlineSources: false, incremental: false, noEmitOnError: true },
    include: [portable(repoRoot) + "/src/**/*.ts"],
    exclude: [path.join(repoRoot, "node_modules"), "**/*.spec.ts"],
  }, null, 2));
  copyFileSync(path.join(repoRoot, "package.json"), checked(runtimeRoot, "package.json"));
  for (const [tool, args] of [
    ["typescript/bin/tsc", ["-p", config]],
    ["tsc-alias/dist/bin/index.js", ["-p", path.join(repoRoot, "tsconfig.json"), "--outDir", runtimeRoot]],
  ] as const) {
    successful(await execute(process.execPath, [path.join(repoRoot, "node_modules", tool), ...args], repoRoot, 30000));
  }
  cliEntry = checked(runtimeRoot, "src/main.js");
  if (!existsSync(cliEntry)) throw new Error("Compiled CLI entry is missing");
  if (!cc || !cxx) console.warn("Native integration cases require gcc/clang and g++/clang++; set TINYMAKE_TEST_CC and TINYMAKE_TEST_CXX. Unavailable compiler cases are skipped.");
}

function removeCreatedDirectory(root: string, prefix: string) {
  const absolute = checked(testRoot, root);
  if (path.dirname(absolute) !== testRoot || !path.basename(absolute).startsWith(prefix))
    throw new Error("Refusing to remove a non-test directory");
  rmSync(absolute, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
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

export function fixture(label = "project") {
  const root = mkdtempSync(path.join(testRoot, `.fixture-${label}-`));
  fixtures.add(root);
  copyFileSync(path.join(testRoot, "actions.cjs"), checked(root, "actions.cjs"));
  return {
    root,
    path(name: string) { return checked(root, name); },
    write(name: string, content: string, time?: number) {
      const filename = this.path(name);
      mkdirSync(path.dirname(filename), { recursive: true });
      writeFileSync(filename, content);
      if (time !== undefined) utimesSync(filename, time, time);
    },
    native(name: string) {
      copyFileSync(checked(testRoot, `fixtures/${name}`), this.path(name));
      this.time(name, OLD);
    },
    buildfile(source: string, name = "Makefile") { this.write(name, source); },
    read(name: string) { return readFileSync(this.path(name), "utf8"); },
    exists(name: string) { return existsSync(this.path(name)); },
    remove(name: string) { unlinkSync(this.path(name)); },
    time(name: string, time: number) { utimesSync(this.path(name), time, time); },
    mtime(name: string) { return statSync(this.path(name), { bigint: true }).mtimeNs; },
    events(): Event[] {
      return this.exists("events.jsonl") ? this.read("events.jsonl").trim().split("\n")
        .filter(Boolean).map((line) => JSON.parse(line) as Event) : [];
    },
    completed() { return this.events().filter((event) => event.event === "end").map((event) => event.target); },
    run(targets: string[] = [], flags: string[] = [], file: string | null = "Makefile") {
      if (!cliEntry) throw new Error("Test runtime is not ready");
      return execute(process.execPath, [cliEntry, "--backend", "tinymake",
        ...(file === null ? [] : ["-f", file]), ...flags, ...targets], root);
    },
    runProgram(name: string) { return execute(this.path(name), [], root); },
  };
}
export type Fixture = ReturnType<typeof fixture>;

export function successful(result: ProcessResult) {
  if (result.code !== 0) throw new Error(`Process exited ${result.code}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
}

export function peakConcurrency(events: Event[]) {
  let active = 0;
  let peak = 0;
  for (const event of events) {
    active += event.event === "start" ? 1 : -1;
    peak = Math.max(peak, active);
    if (active < 0) throw new Error("Recipe event log contains an unmatched end");
  }
  if (active !== 0) throw new Error("Recipe event log contains unfinished actions");
  return peak;
}
