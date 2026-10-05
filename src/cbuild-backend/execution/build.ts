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
import {
  OutOfDateResolution,
  PreqResolution,
  TargetResolution,
} from "@cbuild-backend/execution/preq-resolution/type.js";
import { OutOfDateChecker } from "@cbuild-backend/execution/preq-resolution/out-of-date.js";
import { resolveTarget } from "@cbuild-backend/execution/preq-resolution/target-resolver.js";
import { RecipeIR } from "@src/compiler/ir.js";

export class Build {
  private readonly context: Env;
  private readonly explicitRules: NormalRule[];
  public constructor(context: Env, explicitRules: NormalRule[]) {
    this.context = context;
    this.explicitRules = explicitRules;
  }

  public async buildTargetAsync(rule: NormalRule) {
    // resolution
    const {
      targetResolution,
      preqResolutions,
      isPhonyTarget,
      outOfDateResolution,
    } = await this.resolution(rule);

    // phony targets do not need to be checked for out-of-date status
    if (!isPhonyTarget) {
      if (!outOfDateResolution.isTargetOutOfDate) {
        return;
      }
    }

    // if touch cli option is enabled do not need to exexute shell commands.
    if (this.context.cliOptions.touch) {
      await this.touch(targetResolution);
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

    const executionEnv = await this.prepareExecutionEnv({
      preqResolutions: preqResolutions.first,
      orderOnlyPreqResolutions: preqResolutions.second,
      targetResolution: targetResolution,
      outOfDateResolution: outOfDateResolution,
      rule: rule,
    });

    if (rule.evaluatedRecipeIRs.length > 0) {
      // execute user defined recipes
      this.executeRuleRecipesSequentially(
        rule,
        rule.evaluatedRecipeIRs,
        executionEnv,
      );
    } else {
      // execute default recipes if exist
      this.executeRuleRecipesSequentially(
        rule,
        this.context.defaultRecipes,
        executionEnv,
      );
    }
  }

  // first resolution phase is required
  private async resolution(rule: NormalRule) {
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

    // check is target is phony
    const isPhonyTarget = this.context.phonyTargets.has(rule.target);

    // resolve out of date
    const outOfDateChecker = new OutOfDateChecker(this.context);
    const outOfDateResolution = await outOfDateChecker.resolveOutOfDateAsync(
      targetResolution,
      preqResolutions.first,
    );

    return {
      targetResolution,
      preqResolutions,
      isPhonyTarget,
      outOfDateResolution,
    };
  }

  private async touch(targetResolution: TargetResolution) {
    if (targetResolution.origin.type === "not-found") {
      const targetAbsPath = resolveAndGetAbsolutePath(
        process.cwd(),
        targetResolution.targetName,
      );
      await touchFileAsync(targetAbsPath);
    } else {
      await touchFileAsync(targetResolution.origin.absolutePath);
    }
  }

  private async executeRuleRecipesSequentially(
    rule: NormalRule,
    recipes: RecipeIR[] | string[],
    executionEnv: Env,
  ): Promise<void> {
    const recipeExpansionEngine = new RecipeExpansionEngine(executionEnv);
    for (const recipe of recipes) {
      // expand recipe before executing
      const command: string =
        recipe instanceof RecipeIR
          ? recipe.exec(recipeExpansionEngine)
          : recipe;

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
        const result: ProcessResult =
          await this.runCommandAsync(normalizeCommand);

        if (
          !(
            this.context.cliOptions.silent ||
            this.context.cliOptions.quiet ||
            startWithAtSymbol
          )
        ) {
          console.log(`${normalizeCommand}`);
        }

        this.handleProcessResult(rule, result);
      } else {
        // just print the command that would be executed in a dry run
        console.log(`${normalizeCommand}`);
      }
    }
  }

  private async prepareExecutionEnv({
    rule,
    targetResolution,
    preqResolutions,
    orderOnlyPreqResolutions,
    outOfDateResolution,
  }: {
    rule: NormalRule;
    targetResolution: TargetResolution;
    preqResolutions: PreqResolution[];
    orderOnlyPreqResolutions: PreqResolution[];
    outOfDateResolution: OutOfDateResolution;
  }): Promise<Env> {
    const automaticVariableEnv = new AutomaticVariableEnv(
      rule,
      this.context,
      targetResolution,
      preqResolutions, // normal preq resolutions
      orderOnlyPreqResolutions, // order-only preq resolutions
      outOfDateResolution,
      rule.ruleIR.buildFileMeta,
    );

    // add target only env to enclosing of automatic vars env creat chain of env
    const automaticEnv = automaticVariableEnv.generate(
      this.context.targetEnvs[rule.target] ?? undefined,
    );

    return automaticEnv;
  }

  private handleProcessResult(srcRule: NormalRule, result: ProcessResult) {
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
          message: `cbuild: *** [${srcRule.target}] Error ${result.exitCode}`,
        });
      }
    }
  }

  private async runCommandAsync(command: string): Promise<ProcessResult> {
    const valueExpansionEngine = new ValueExpansionEngine(this.context);
    const processRunner = new ProcessRunner();

    // determine the shell executable and its arguments
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
    //

    // send variables that marked as exported to child processes
    const processEnv = createProcessEnv(this.context, valueExpansionEngine);

    const result = await (shellPath != null
      ? processRunner.runAsync(command, {
          shell: {
            executable: shellPath,
            args: shellArgs ?? [],
          },
          cwd: process.cwd(),
          env: processEnv,
          output: "capture",
          ignoreErrors: this.context.cliOptions.ignoreErrors,
        })
      : processRunner.runAsync(command, {
          cwd: process.cwd(),
          env: processEnv,
          output: "capture",
          shell: shellArgs
            ? {
                ...defaultShell(),
                args: shellArgs ?? [],
              }
            : defaultShell(),
          ignoreErrors: this.context.cliOptions.ignoreErrors,
        }));

    return result;
  }
}
