import {
  RecipeExpansionEngine,
  ValueExpansionEngine,
} from "@cbuild-backend/expansion.js";
import { NormalRule } from "@cbuild-backend/model.js";
import { Env } from "@cbuild-backend/env.js";
import { resolvePreqs } from "@src/cbuild-backend/execution/preq-resolution/preq-resolver.js";
import { createProcessEnv } from "@src/cbuild-backend/execution/create-process-env.js";
import AutomaticVariableEnv from "@src/cbuild-backend/execution/auto-variable.js";
import { defaultShell, ProcessResult } from "@src/cbuild-backend/process.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { ProcessRunner } from "@cbuild-backend/process.js";
import {
  resolveAndGetAbsolutePath,
  touchFileAsync,
  touchFileSync,
} from "@src/file-utils.js";
import { TargetResolution } from "@cbuild-backend/execution/preq-resolution/type.js";
import { OutOfDateChecker } from "./preq-resolution/out-of-date.js";
import { resolveTarget } from "./preq-resolution/target-resolver.js";

interface CommandRunnerOptions {
  shellPath: string | null;
  command: string;
  processEnv: NodeJS.ProcessEnv;
  srcRule: NormalRule;
  args: string[] | null;
}

export class Build {
  private readonly context: Env;
  private readonly explicitRules: NormalRule[];
  public constructor(context: Env, explicitRules: NormalRule[]) {
    this.context = context;
    this.explicitRules = explicitRules;
  }

  public buildTargetSync(rule: NormalRule) {
    const targetResolution: TargetResolution = resolveTarget(
      this.explicitRules,
      rule,
      this.context,
    );

    const preqResolutions = resolvePreqs(
      this.explicitRules,
      rule,
      this.context,
    );

    const outOfDateChecker = new OutOfDateChecker(this.context);
    const outOfDateResolution = outOfDateChecker.resolveOutOfDateSync(
      targetResolution,
      preqResolutions.first,
    );

    if (!outOfDateResolution.isTargetOutOfDate) {
      return;
    }

    if (this.context.cliOptions.touch) {
      if (targetResolution.origin.type === "not-found") {
        const targetAbsPath = resolveAndGetAbsolutePath(
          process.cwd(),
          targetResolution.targetName,
        );

        touchFileSync(targetAbsPath);
      } else {
        touchFileSync(targetResolution.origin.absolutePath);
      }
      return;
    }

    // build required
    if (this.context.cliOptions.question) {
      throw CbuildException.from({
        column: -1,
        row: -1,
        errorType: ErrorType.PROCESS,
        machineCode: MachineCode.REBUILD_REQUIRED,
        message: `cbuild: Rebuild required for target ${rule.target}`,
        exitCode: 1,
      });
    }

    const automaticVariableEnv = new AutomaticVariableEnv(
      rule,
      this.context,
      targetResolution,
      preqResolutions.first, // normal preq resolultions
      preqResolutions.second, // order-only preq resolutions
      outOfDateResolution,
      rule.ruleIR.buildFileMeta,
    );
    const automaticEnv = automaticVariableEnv.generate(
      this.context.targetEnvs[rule.target] ?? undefined,
    );

    const recipeExpansionEngine = new RecipeExpansionEngine(automaticEnv);
    const valueExpansionEngine = new ValueExpansionEngine(this.context);

    for (const recipeIR of rule.evaluatedRecipeIRs) {
      const shellVar = this.context.getVariable("SHELL");
      let shellPath: string | null = null;
      if (shellVar != undefined) {
        shellPath = valueExpansionEngine.expand(shellVar.value);
      }

      const shellFlagsVar = this.context.getVariable(".SHELLFLAGS");
      let shellArgs: string[] | null = null;
      if (shellFlagsVar != undefined) {
        shellArgs = valueExpansionEngine
          .expand(shellFlagsVar.value)
          .split(/\s+/)
          .filter(Boolean);
      }

      // send variables that marked as exported to child processes
      const processEnv = createProcessEnv(this.context, valueExpansionEngine);

      // expand recipe before executing
      const command: string = recipeIR.exec(recipeExpansionEngine);
      const startWithAtSymbol = command.startsWith("@");
      const normalizeCommand = startWithAtSymbol
        ? command.slice(1).trim()
        : command;

      if (
        !(
          this.context.cliOptions.dryRun ||
          this.context.cliOptions.justPrint ||
          this.context.cliOptions.recon
        )
      ) {
        const commandRunnerOptions: CommandRunnerOptions = {
          command: normalizeCommand,
          processEnv,
          shellPath,
          srcRule: rule,
          args: shellArgs,
        };
        const result: ProcessResult = this.runCommandSync(commandRunnerOptions);

        if (
          !(this.context.cliOptions.silent || this.context.cliOptions.quiet)
        ) {
          console.log(`${normalizeCommand}`);
        }

        this.handleProcessResult(commandRunnerOptions, result);
      } else {
        // just print the command that would be executed in a dry run
        console.log(`${normalizeCommand}`);
      }
    }
  }

  public async buildTargetAsync(rule: NormalRule) {
    const targetResolution: TargetResolution = resolveTarget(
      this.explicitRules,
      rule,
      this.context,
    );

    const preqResolutions = resolvePreqs(
      this.explicitRules,
      rule,
      this.context,
    );

    const outOfDateChecker = new OutOfDateChecker(this.context);
    const outOfDateResolution = await outOfDateChecker.resolveOutOfDateAsync(
      targetResolution,
      preqResolutions.first,
    );

    if (!outOfDateResolution.isTargetOutOfDate) {
      return;
    }

    if (this.context.cliOptions.touch) {
      if (targetResolution.origin.type === "not-found") {
        const targetAbsPath = resolveAndGetAbsolutePath(
          process.cwd(),
          targetResolution.targetName,
        );
        await touchFileAsync(targetAbsPath);
      } else {
        await touchFileAsync(targetResolution.origin.absolutePath);
      }
      return;
    }

    // build required
    if (this.context.cliOptions.question) {
      throw CbuildException.from({
        column: -1,
        row: -1,
        errorType: ErrorType.PROCESS,
        machineCode: MachineCode.REBUILD_REQUIRED,
        message: `cbuild: Rebuild required for target ${rule.target}`,
        exitCode: 1,
      });
    }

    const automaticVariableEnv = new AutomaticVariableEnv(
      rule,
      this.context,
      targetResolution,
      preqResolutions.first, // normal preq resolutions
      preqResolutions.second, // order-only preq resolutions
      outOfDateResolution,
      rule.ruleIR.buildFileMeta,
    );
    const automaticEnv = automaticVariableEnv.generate(
      this.context.targetEnvs[rule.target] ?? undefined,
    );

    const recipeExpansionEngine = new RecipeExpansionEngine(automaticEnv);
    const valueExpansionEngine = new ValueExpansionEngine(this.context);

    for (const recipeIR of rule.evaluatedRecipeIRs) {
      // expand recipe before executing
      const command: string = recipeIR.exec(recipeExpansionEngine);

      const shellVar = this.context.getVariable("SHELL");
      let shellPath: string | null = null;
      if (shellVar != undefined) {
        shellPath = valueExpansionEngine.expand(shellVar.value);
      }

      const shellFlagsVar = this.context.getVariable(".SHELLFLAGS");
      let shellArgs: string[] | null = null;
      if (shellFlagsVar) {
        shellArgs = valueExpansionEngine
          .expand(shellFlagsVar.value)
          .split(/\s+/)
          .filter(Boolean);
      }

      // send variables that marked as exported to child processes
      const processEnv = createProcessEnv(this.context, valueExpansionEngine);

      const startWithAtSymbol = command.startsWith("@");
      const normalizeCommand = startWithAtSymbol
        ? command.slice(1).trim()
        : command;

      if (!this.context.cliOptions.dryRun) {
        const commandRunnerOptions: CommandRunnerOptions = {
          command: normalizeCommand,
          processEnv,
          shellPath,
          srcRule: rule,
          args: shellArgs,
        };
        const result: ProcessResult =
          await this.runCommandAsync(commandRunnerOptions);

        if (
          !(
            this.context.cliOptions.silent ||
            this.context.cliOptions.quiet ||
            startWithAtSymbol
          )
        ) {
          console.log(`${normalizeCommand}`);
        }

        this.handleProcessResult(commandRunnerOptions, result);
      } else {
        // just print the command that would be executed in a dry run
        console.log(`${normalizeCommand}`);
      }
    }
  }

  private handleProcessResult(
    options: CommandRunnerOptions,
    result: ProcessResult,
  ) {
    if (result.stdout) {
      process.stdout.write(result.stdout);
    }

    if (result.stderr) {
      process.stderr.write(result.stderr);
    }

    if (result.exitCode == null || result.exitCode !== 0) {
      if (!this.context.cliOptions.ignoreErrors) {
        throw CbuildException.from({
          column: -1,
          row: -1,
          errorType: ErrorType.PROCESS,
          machineCode: MachineCode.SHELL_COMMAND_FAILED,
          message: `cbuild: *** [${options.srcRule.target}] Error ${result.exitCode}`,
        });
      }
    }
  }

  async runCommandAsync(options: CommandRunnerOptions): Promise<ProcessResult> {
    const processRunner = new ProcessRunner();

    const result = await (options.shellPath != null
      ? processRunner.runAsync(options.command, {
          shell: {
            executable: options.shellPath,
            args: options.args ?? [],
          },
          cwd: process.cwd(),
          env: options.processEnv,
          output: "capture",
        })
      : processRunner.runAsync(options.command, {
          cwd: process.cwd(),
          env: options.processEnv,
          output: "capture",
          shell: options.args
            ? {
                ...defaultShell(),
                args: options.args ?? [],
              }
            : defaultShell(),
        }));

    return result;
  }

  runCommandSync(options: CommandRunnerOptions): ProcessResult {
    const processRunner = new ProcessRunner();

    const result =
      options.shellPath != null
        ? processRunner.runSync(options.command, {
            shell: {
              executable: options.shellPath,
              args: options.args ?? [],
            },
            cwd: process.cwd(),
            env: options.processEnv,
            output: "capture",
          })
        : processRunner.runSync(options.command, {
            cwd: process.cwd(),
            env: options.processEnv,
            output: "capture",
            shell: options.args
              ? {
                  ...defaultShell(),
                  args: options.args ?? [],
                }
              : defaultShell(),
          });

    return result;
  }
}
