import { spawn, spawnSync } from "node:child_process";
import { cbuildException, ErrorType } from "@src/cbuild-exception.js";
import { getOsInfo } from "@cbuild-backend/os.js";

export interface ShellOptions {
  /** Executable path only, without arguments. */
  executable: string;
  /** Arguments placed before the complete, unmodified command string. */
  args: readonly string[];
}

export interface ProcessOptions {
  shell?: ShellOptions;
  cwd?: string;
  /** Overrides inherited environment variables; undefined removes a variable. */
  env?: NodeJS.ProcessEnv;
  output?: "inherit" | "capture";
  signal?: AbortSignal;
  /** Accept nonzero exit codes; launch errors and cancellation still reject. */
  ignoreErrors?: boolean;
}

export interface ProcessResult {
  command: string;
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  /** Empty when output is inherited. Capture mode buffers output in memory. */
  stdout: string;
  stderr: string;
}

export interface RecipeOptions extends ProcessOptions {
  silent?: boolean;
  echo?: (command: string) => void;
}

export class ProcessError extends cbuildException {
  public constructor(
    message: string,
    public readonly result: ProcessResult | null = null,
    cause?: unknown,
  ) {
    super(ErrorType.PROCESS, message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "ProcessError";
    this.cause = cause;
  }
}

/** Explicit shell configuration also supports bash, PowerShell and custom shells. */
export function defaultShell(): ShellOptions {
  const info = getOsInfo();
  return info.isWindows
    ? { executable: process.env.ComSpec || "cmd.exe", args: ["/d", "/s", "/c"] }
    : { executable: "/bin/sh", args: ["-c"] };
}

export class ProcessRunner {
  private readonly defaults: ProcessOptions;

  public constructor(options: ProcessOptions = {}) {
    const shell = options.shell ?? defaultShell();
    this.defaults = {
      ...options,
      env: { ...options.env },
      shell: { executable: shell.executable, args: [...shell.args] },
    };
  }

  /** Runs an already-expanded command. No variable expansion or prefix parsing. */
  public async runAsync(
    command: string,
    options: ProcessOptions = {},
  ): Promise<ProcessResult> {
    const settings = { ...this.defaults, ...options };
    const shell = settings.shell ?? defaultShell();
    if (settings.signal?.aborted) {
      throw new ProcessError(
        "Command cancelled before launch",
        null,
        settings.signal.reason,
      );
    }
    if (!shell.executable.trim()) {
      throw new TypeError("Shell executable must not be empty");
    }
    const capture = settings.output === "capture";
    const env = { ...process.env, ...this.defaults.env, ...options.env };

    return new Promise<ProcessResult>((resolve, reject) => {
      let failure: Error | undefined;
      const stdout: Buffer[] = [];
      const stderr: Buffer[] = [];
      // Node handles the special quoting required by cmd.exe via shell mode.
      const isCmd =
        process.platform === "win32" &&
        /(?:^|[\\/])cmd(?:\.exe)?$/i.test(shell.executable);
      const standardCmd =
        isCmd && shell.args.join(" ").toLowerCase() === "/d /s /c";
      try {
        const child = standardCmd
          ? spawn(command, {
              shell: shell.executable,
              cwd: settings.cwd,
              env,
              stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
              signal: settings.signal,
              windowsHide: true,
            })
          : spawn(shell.executable, [...shell.args, command], {
              shell: false,
              cwd: settings.cwd,
              env,
              stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
              signal: settings.signal,
              windowsHide: true,
            });

        child.stdout?.on("data", (chunk: Buffer) => stdout.push(chunk));
        child.stderr?.on("data", (chunk: Buffer) => stderr.push(chunk));
        child.on("error", (error) => {
          failure = error;
        });
        child.on("close", (exitCode, signal) => {
          const result: ProcessResult = {
            command,
            exitCode,
            signal,
            stdout: Buffer.concat(stdout).toString("utf8"),
            stderr: Buffer.concat(stderr).toString("utf8"),
          };
          if (failure) {
            reject(
              new ProcessError(
                `Command could not complete: ${command}: ${failure.message}`,
                result,
                failure,
              ),
            );
          } else if (
            signal !== null ||
            (exitCode !== 0 && !settings.ignoreErrors)
          ) {
            reject(
              new ProcessError(
                `Command failed (${signal ?? exitCode}): ${command}`,
                result,
              ),
            );
          } else {
            resolve(result);
          }
        });
      } catch (error) {
        reject(
          new ProcessError(
            `Could not start shell: ${shell.executable}`,
            null,
            error,
          ),
        );
      }
    });
  }

  /** Each logical recipe line gets a separate shell; stops at the first failure.
   * Expansion and continuation joining belong to the caller. This is not a
   * make parser: '+' / recursive make and .ONESHELL are not implemented.
   */
  public async runRecipeAsync(
    lines: readonly string[],
    options: RecipeOptions = {},
  ): Promise<ProcessResult[]> {
    const results: ProcessResult[] = [];
    for (const line of lines) {
      const prefix = /^[\t ]*[@-]*/.exec(line)![0];
      const command = line.slice(prefix.length);
      if (!command.trim()) continue;
      if (!options.silent && !prefix.includes("@")) {
        (options.echo ?? console.log)(command);
      }
      results.push(
        await this.runAsync(command, {
          ...options,
          ignoreErrors:
            prefix.includes("-") ||
            (options.ignoreErrors ?? this.defaults.ignoreErrors),
        }),
      );
    }
    return results;
  }

  public runSync(command: string, options: ProcessOptions = {}): ProcessResult {
    const settings = { ...this.defaults, ...options };
    const shell = settings.shell ?? defaultShell();

    if (settings.signal?.aborted) {
      throw new ProcessError(
        "Command cancelled before launch",
        null,
        settings.signal.reason,
      );
    }

    if (!shell.executable.trim()) {
      throw new TypeError("Shell executable must not be empty");
    }

    const capture = settings.output === "capture";
    const env = { ...process.env, ...this.defaults.env, ...options.env };

    const isCmd =
      process.platform === "win32" &&
      /(?:^|[\\/])cmd(?:\.exe)?$/i.test(shell.executable);

    const standardCmd =
      isCmd && shell.args.join(" ").toLowerCase() === "/d /s /c";

    let child: ReturnType<typeof spawnSync>;

    try {
      child = standardCmd
        ? spawnSync(command, {
            shell: shell.executable,
            cwd: settings.cwd,
            env,
            stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
            windowsHide: true,
            maxBuffer: Infinity,
          })
        : spawnSync(shell.executable, [...shell.args, command], {
            shell: false,
            cwd: settings.cwd,
            env,
            stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
            windowsHide: true,
            maxBuffer: Infinity,
          });
    } catch (error) {
      throw new ProcessError(
        `Could not start shell: ${shell.executable}`,
        null,
        error,
      );
    }

    const result: ProcessResult = {
      command,
      exitCode: child.status,
      signal: child.signal,
      stdout: child.stdout?.toString("utf8") ?? "",
      stderr: child.stderr?.toString("utf8") ?? "",
    };

    if (child.error) {
      throw new ProcessError(
        `Command could not complete: ${command}: ${child.error.message}`,
        result,
        child.error,
      );
    }

    if (
      child.signal !== null ||
      (child.status !== 0 && !settings.ignoreErrors)
    ) {
      throw new ProcessError(
        `Command failed (${child.signal ?? child.status}): ${command}`,
        result,
      );
    }

    return result;
  }

  public runRecipeSync(
    lines: readonly string[],
    options: RecipeOptions = {},
  ): ProcessResult[] {
    const results: ProcessResult[] = [];

    for (const line of lines) {
      const prefix = /^[\t ]*[@-]*/.exec(line)![0];
      const command = line.slice(prefix.length);

      if (!command.trim()) continue;

      if (!options.silent && !prefix.includes("@")) {
        (options.echo ?? console.log)(command);
      }

      results.push(
        this.runSync(command, {
          ...options,
          ignoreErrors:
            prefix.includes("-") ||
            (options.ignoreErrors ?? this.defaults.ignoreErrors),
        }),
      );
    }

    return results;
  }
}
