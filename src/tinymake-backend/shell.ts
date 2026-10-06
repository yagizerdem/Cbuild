import { spawn } from "child_process";
import os from "os";

interface ShellOptions {
  executable?: string;
  args?: string[];
  captureStdout: boolean;
  captureStderr: boolean;
  abortController: AbortController;
  env: NodeJS.ProcessEnv;
}

export interface ExecResult {
  stdout: string;
  stderr: string;
  exitcode: number | -1;
}

export function getDefaultShell(): {
  executable: string;
  args: string[];
} {
  const isWindows = os.platform().startsWith("win");
  if (isWindows) {
    return {
      executable: "cmd.exe",
      args: ["/e", "/v", "/q", "/c"],
    };
  }

  return {
    executable: "/bin/bash",
    args: ["-c"],
  };
}

export class TinyMakeShell {
  private readonly options: ShellOptions;
  constructor(options: ShellOptions) {
    this.options = options;
  }

  async exec(command: string): Promise<ExecResult> {
    const result: ExecResult = {
      stderr: "",
      stdout: "",
      exitcode: 0,
    };

    const defaultShell = getDefaultShell();
    const useDefault = !this.options.executable;

    const child = spawn(
      useDefault ? defaultShell.executable : this.options.executable!,
      useDefault
        ? [...defaultShell.args, command]
        : [...(this.options.args ?? []), command],
      {
        cwd: process.cwd(),
        signal: this.options.abortController.signal,
        stdio: ["inherit", "pipe", "pipe"],
        env: this.options.env,
      },
    );

    return new Promise((resolve, reject) => {
      try {
        child.stdout.on("data", (data) => {
          if (this.options.captureStdout) {
            result.stdout += data;
          } else {
            process.stdout.write(data);
          }
        });

        child.stderr.on("data", (data) => {
          if (this.options.captureStderr) {
            result.stderr += data;
          } else {
            process.stderr.write(data);
          }
        });

        child.on("exit", (code: number | null) => {
          result.exitcode = code ?? -1;
        });

        child.on("close", () => {
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
