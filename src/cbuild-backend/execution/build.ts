import {
  RecipeExpansionEngine,
  ValueExpansionEngine,
} from "@cbuild-backend/expansion.js";
import { topologicalSort } from "@cbuild-backend/depq-graph.js";
import { NormalRule } from "@cbuild-backend/model.js";
import { Env } from "@cbuild-backend/env.js";
import { resolvePreqs } from "@src/cbuild-backend/execution/preq-resolution/preq-resolver.js";
import { createProcessEnv } from "@src/cbuild-backend/execution/create-process-env.js";
import CommandRunner from "@src/cbuild-backend/execution/command-runner.js";
import AutomaticVariableEnv from "@src/cbuild-backend/execution/auto-variable.js";

export class Build {
  private readonly context: Env;
  private readonly explicitRules: NormalRule[];
  public constructor(context: Env, explicitRules: NormalRule[]) {
    this.context = context;
    this.explicitRules = explicitRules;
  }

  public buildTargetSync(rule: NormalRule) {
    const preqResolutions = resolvePreqs(this.explicitRules, rule);

    if (!preqResolutions.first.some((preq) => preq.meta?.outOfDate)) {
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

      const commandRunner = new CommandRunner({
        command,
        processEnv,
        srcRule: rule,
        context: this.context,
        shellPath,
      });
      commandRunner.runCommandSync();
    }
  }

  public async buildTargetAsync(rule: NormalRule) {
    const preqResolutions = resolvePreqs(this.explicitRules, rule);

    if (!preqResolutions.first.some((preq) => preq.meta?.outOfDate)) {
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

      const commandRunner = new CommandRunner({
        command,
        processEnv,
        srcRule: rule,
        context: this.context,
        shellPath,
      });
      await commandRunner.runCommandAsync();
    }
  }
}
