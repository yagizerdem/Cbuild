import { randomUUID } from "node:crypto";
import type { RecipeIR, NormalRuleIR } from "@compiler/ir.js";

export abstract class BaseModel {
  public readonly uuid: string = randomUUID();

  public toString(): string {
    return "<BaseModel>";
  }
}

export interface NormalRuleOptions {
  target?: string;
  prerequisites?: string[];
  shellCommands?: string[];
  recipeIRS?: RecipeIR[];
  normalRuleIR?: NormalRuleIR;
}

export class NormalRule extends BaseModel {
  public target: string | undefined;
  public prerequisites: string[] | undefined;
  public shellCommands: string[] | undefined;
  public recipeIRS: RecipeIR[] | undefined;
  public normalRuleIR: NormalRuleIR | undefined;

  public constructor(options: NormalRuleOptions = {}) {
    super();

    this.target = options.target;
    this.prerequisites = options.prerequisites;
    this.shellCommands = options.shellCommands;
    this.recipeIRS = options.recipeIRS;
    this.normalRuleIR = options.normalRuleIR;
  }

  public override toString(): string {
    return `NormalRule {
  target=${this.target},
  prerequisites=${JSON.stringify(this.prerequisites)},
  shellCommands=${JSON.stringify(this.shellCommands)},
  recipeIRS=${JSON.stringify(this.recipeIRS)},
  normalRuleIR=${JSON.stringify(this.normalRuleIR)}
}`;
  }
}
