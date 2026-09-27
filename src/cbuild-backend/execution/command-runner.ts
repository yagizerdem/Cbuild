import { ProcessRunner } from "@cbuild-backend/process.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { NormalRule } from "@cbuild-backend/model.js";
import { Env } from "@cbuild-backend/env.js";

export interface CommandRunnerOptions {
  shellPath: string | null;
  command: string;
  processEnv: NodeJS.ProcessEnv;
  srcRule: NormalRule;
  context: Env;
}

export default class CommandRunner {
  private readonly options: CommandRunnerOptions;
  constructor(options: CommandRunnerOptions) {
    this.options = options;
  }

  async runCommandAsync() {
    const processRunner = new ProcessRunner();

    const result = await (this.options.shellPath != null
      ? processRunner.runAsync(this.options.command, {
          shell: {
            executable: this.options.shellPath,
            args: [],
          },
          cwd: process.cwd(),
          env: this.options.processEnv,
          output: "capture",
        })
      : processRunner.runAsync(this.options.command, {
          cwd: process.cwd(),
          env: this.options.processEnv,
          output: "capture",
        }));

    if (result.exitCode == null || result.exitCode !== 0) {
      throw CbuildException.from({
        column: -1,
        row: -1,
        errorType: ErrorType.PROCESS,
        machineCode: MachineCode.SHELL_COMMAND_FAILED,
        message: `Build failed for target '${this.options.srcRule.target}': ${this.options.command}, message : ${result.stderr}`,
      });
    }

    let normalizedStdout: string = result.stdout.trim();
    if (normalizedStdout.endsWith("\n")) {
      normalizedStdout = normalizedStdout.substring(
        0,
        normalizedStdout.length - 1,
      );
    }

    if (!this.options.context.settings.silent) {
      console.log(`${this.options.command}\n${normalizedStdout}`);
    } else {
      console.log(normalizedStdout);
    }
  }

  runCommandSync() {
    const processRunner = new ProcessRunner();

    const result =
      this.options.shellPath != null
        ? processRunner.runSync(this.options.command, {
            shell: {
              executable: this.options.shellPath,
              args: [],
            },
            cwd: process.cwd(),
            env: this.options.processEnv,
            output: "capture",
          })
        : processRunner.runSync(this.options.command, {
            cwd: process.cwd(),
            env: this.options.processEnv,
            output: "capture",
          });

    if (result.exitCode == null || result.exitCode !== 0) {
      throw CbuildException.from({
        column: -1,
        row: -1,
        errorType: ErrorType.PROCESS,
        machineCode: MachineCode.SHELL_COMMAND_FAILED,
        message: `Build failed for target '${this.options.srcRule.target}': ${this.options.command}, message : ${result.stderr}`,
      });
    }

    let normalizedStdout: string = result.stdout.trim();

    if (!this.options.context.settings.silent) {
      console.log(`${this.options.command}\n${normalizedStdout}`);
    } else {
      console.log(normalizedStdout);
    }
  }
}
