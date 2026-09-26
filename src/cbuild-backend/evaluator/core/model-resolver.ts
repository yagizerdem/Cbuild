import {
  NormalRuleIR,
  RecipeIR,
  type Executor,
  type IR,
  type ValueIR,
} from "@compiler/ir.js";
import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import {
  BaseModel,
  ImplicitPatterRule,
  NormalRule,
  VpathRule,
} from "@cbuild-backend/model.js";
import { StemResolver } from "@cbuild-backend/stem-resolver.js";
import ConditionalRecipeIREvaluator from "@cbuild-backend/evaluator/conditional-recipe-evaluator.js";
import { BuildFileEvaluationState } from "./type.js";

export function filterModelResolverPassIr(irs: IR[]): IR[] {
  const result: IR[] = [];
  for (const ir of irs) {
    if (ir instanceof NormalRuleIR) result.push(ir);
  }

  return result;
}

export default class ModelResolver implements Executor {
  public readonly ruleModels: BaseModel[] = [];
  public readonly evaluationState: BuildFileEvaluationState;
  public readonly context: Env;

  public constructor(context: Env, evaluationState: BuildFileEvaluationState) {
    this.context = context;
    this.evaluationState = evaluationState;
  }

  public async buildAsync(instructions: readonly IR[]): Promise<BaseModel[]> {
    for (const instruction of instructions) {
      this.collectModels(
        this.ruleModels,
        await instruction.execAsync<BaseModel>(this),
      );
    }
    return this.ruleModels;
  }

  public collectModels(target: BaseModel[], resources: unknown): BaseModel[] {
    if (Array.isArray(resources)) {
      for (const item of resources) {
        if (item instanceof BaseModel) target.push(item);
      }
    } else if (resources instanceof BaseModel) {
      target.push(resources);
    }
    return target;
  }

  exec<T>(node: IR): T {
    throw new Error("Use execAsync instead");
  }

  public async execAsync<T>(ir: NormalRuleIR): Promise<T> {
    return this.resolveNormalRule(ir) as T;
  }

  private resolveNormalRule(ir: NormalRuleIR): BaseModel[] {
    const expansion = new ValueExpansionEngine(this.context);
    const expandWords = (values: readonly ValueIR[]): string[] =>
      values.flatMap((value) =>
        expansion.expand(value).split(/\s+/).filter(Boolean),
      );

    const targets = expandWords(ir.targets);
    const prerequisites = expandWords(ir.prerequisites);
    const orderOnlyPrerequisites = expandWords(ir.orderOnlyPrerequisites ?? []);
    const stemResolver = new StemResolver();

    // resolve recipes
    const recipeIRresolutions: RecipeIR[] = [];
    for (const recipeIR of ir.recipes) {
      if (recipeIR.recipe.kind === "conditional") {
        const conditionalRecipeIREvaluator = new ConditionalRecipeIREvaluator(
          this.context,
          recipeIR,
        );
        const activeRecipeIRs: RecipeIR[] =
          conditionalRecipeIREvaluator.execute();
        recipeIRresolutions.push(...activeRecipeIRs);
      } else {
        recipeIRresolutions.push(recipeIR);
      }
    }

    return targets.map((target) =>
      stemResolver.hasStem(target)
        ? new ImplicitPatterRule({
            targetPattern: target,
            prerequisites: [...prerequisites],
            orderOnlyPrerequisites: [...orderOnlyPrerequisites],
            recipeIRs: [...ir.recipes],
            evaluatedRecipeIRs: [...recipeIRresolutions],
            ruleIR: ir,
            vpathRules: [...this.evaluationState.vpaths],
          })
        : new NormalRule({
            target,
            prerequisites: [...prerequisites],
            orderOnlyPrerequisites: [...orderOnlyPrerequisites],
            ruleIR: ir,
            recipeIRs: [...ir.recipes],
            evaluatedRecipeIRs: [...recipeIRresolutions],
            shellCommands: [], // do not use raw shell commands, expand from recipeIR before execution
            vpathRules: this.evaluationState.vpaths ?? [],
          }),
    );
  }
}
