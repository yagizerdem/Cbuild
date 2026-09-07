import {
  AssignmentIR,
  NormalRuleIR,
  type Executor,
  type IR,
  type ValueIR,
} from "@compiler/ir.js";
import { cbuildException, ErrorType } from "@src/cbuild-exception.js";
import { Env } from "./env.js";
import {
  ExpansionEngine,
  ValueExpansionEngine,
} from "@cbuild-backend/expansion.js";
import { BaseModel, NormalRule } from "@cbuild-backend/model.js";

export class GraphBuilder implements Executor {
  public readonly ruleModels: BaseModel[] = [];

  public constructor(public readonly context: Env) {}

  public build(instructions: readonly IR[]): BaseModel[] {
    for (const instruction of instructions) {
      this.collectModels(this.ruleModels, instruction.exec<BaseModel>(this));
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

  public exec<T>(ir: IR): T {
    if (ir instanceof NormalRuleIR) {
      return this.buildNormalRule(ir) as T;
    }
    if (ir instanceof AssignmentIR) {
      ir.exec(new ExpansionEngine(this.context));
      return null as T;
    }
    throw new cbuildException(
      ErrorType.SEMANTIC,
      `Unsupported IR type for model builder: ${ir.constructor.name}`,
      ir.row,
      ir.col,
    );
  }

  private buildNormalRule(ir: NormalRuleIR): BaseModel[] {
    const expansion = new ValueExpansionEngine(this.context);
    const expandWords = (values: readonly ValueIR[]): string[] =>
      values.flatMap((value) =>
        expansion.expand(value).split(/\s+/).filter(Boolean),
      );

    const targets = expandWords(ir.targets);
    const prerequisites = expandWords(ir.prerequisites);

    return targets.map(
      (target) =>
        new NormalRule({
          target,
          prerequisites: [...prerequisites],
          normalRuleIR: ir,
          recipeIRS: [...ir.recipes],
        }),
    );
  }
}
