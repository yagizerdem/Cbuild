import {
  RecipeExpansionEngine,
  ValueExpansionEngine,
} from "@cbuild-backend/expansion.js";
import { NormalRule } from "@cbuild-backend/model.js";
import { Env } from "@cbuild-backend/env.js";
import { resolvePreqs } from "@src/cbuild-backend/execution/preq-resolution/preq-resolver.js";
import { createProcessEnv } from "@src/cbuild-backend/execution/create-process-env.js";
import AutomaticVariableEnv from "@src/cbuild-backend/execution/auto-variable.js";
import { ProcessResult } from "@src/cbuild-backend/process.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { ProcessRunner } from "@cbuild-backend/process.js";
import {
  fileExistbyAbsolutePath,
  resolveAndGetAbsolutePath,
} from "@src/file-utils.js";
import {
  PreqMeta,
  PreqResolution,
} from "@cbuild-backend/execution/preq-resolution/type.js";

interface CommandRunnerOptions {
  shellPath: string | null;
  command: string;
  processEnv: NodeJS.ProcessEnv;
  srcRule: NormalRule;
}

export class Build {
  private readonly context: Env;
  private readonly explicitRules: NormalRule[];
  public constructor(context: Env, explicitRules: NormalRule[]) {
    this.context = context;
    this.explicitRules = explicitRules;
  }

  public buildTargetSync(rule: NormalRule) {
    const preqResolutions = resolvePreqs(
      this.explicitRules,
      rule,
      this.context,
    );

    if (!this.shouldBuildRule(rule, preqResolutions.first)) {
      return;
    }

    const automaticVariableEnv = new AutomaticVariableEnv(
      rule,
      this.context,
      preqResolutions.first, // normal preq resolultions
      preqResolutions.second, // order-only preq resolutions
    );
    const automaticEnv = automaticVariableEnv.generate();

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

      // send variables that marked as exported to child processes
      const processEnv = createProcessEnv(this.context, valueExpansionEngine);

      if (
        !(
          this.context.cliOptions.dryRun ||
          this.context.cliOptions.justPrint ||
          this.context.cliOptions.recon
        )
      ) {
        const commandRunnerOptions: CommandRunnerOptions = {
          command,
          processEnv,
          shellPath,
          srcRule: rule,
        };
        const result: ProcessResult = this.runCommandSync(commandRunnerOptions);

        if (
          !(this.context.cliOptions.silent || this.context.cliOptions.quiet)
        ) {
          console.log(`${command}`);
        }

        this.handleProcessResult(commandRunnerOptions, result);
      } else {
        // just print the command that would be executed in a dry run
        console.log(`${command}`);
      }
    }
  }

  public async buildTargetAsync(rule: NormalRule) {
    const preqResolutions = resolvePreqs(
      this.explicitRules,
      rule,
      this.context,
    );

    if (!this.shouldBuildRule(rule, preqResolutions.first)) {
      return;
    }

    const automaticVariableEnv = new AutomaticVariableEnv(
      rule,
      this.context,
      preqResolutions.first, // normal preq resolutions
      preqResolutions.second, // order-only preq resolutions
    );
    const automaticEnv = automaticVariableEnv.generate();

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

      // send variables that marked as exported to child processes
      const processEnv = createProcessEnv(this.context, valueExpansionEngine);

      if (!this.context.cliOptions.dryRun) {
        const commandRunnerOptions: CommandRunnerOptions = {
          command,
          processEnv,
          shellPath,
          srcRule: rule,
        };
        const result: ProcessResult =
          await this.runCommandAsync(commandRunnerOptions);

        if (
          !(this.context.cliOptions.silent || this.context.cliOptions.quiet)
        ) {
          console.log(`${command}`);
        }

        this.handleProcessResult(commandRunnerOptions, result);
      } else {
        // just print the command that would be executed in a dry run
        console.log(`${command}`);
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

  private shouldBuildRule(
    rule: NormalRule,
    preqResolutions: PreqResolution<PreqMeta>[],
  ): boolean {
    const targetPath = resolveAndGetAbsolutePath(process.cwd(), rule.target);

    if (!fileExistbyAbsolutePath(targetPath)) {
      return true;
    }

    return preqResolutions.some((preq) => preq.meta?.outOfDate);
  }

  async runCommandAsync(options: CommandRunnerOptions): Promise<ProcessResult> {
    const processRunner = new ProcessRunner();

    const result = await (options.shellPath != null
      ? processRunner.runAsync(options.command, {
          shell: {
            executable: options.shellPath,
            args: [],
          },
          cwd: process.cwd(),
          env: options.processEnv,
          output: "capture",
        })
      : processRunner.runAsync(options.command, {
          cwd: process.cwd(),
          env: options.processEnv,
          output: "capture",
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
              args: [],
            },
            cwd: process.cwd(),
            env: options.processEnv,
            output: "capture",
          })
        : processRunner.runSync(options.command, {
            cwd: process.cwd(),
            env: options.processEnv,
            output: "capture",
          });

    return result;
  }
}
