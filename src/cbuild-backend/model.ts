import { randomUUID } from "node:crypto";
import type { RecipeIR, NormalRuleIR } from "@compiler/ir.js";

export abstract class BaseModel {
  public readonly uuid: string = randomUUID();

  public toString(): string {
    return "<BaseModel>";
  }
}

export interface NormalRuleOptions {
  target: string;
  prerequisites: string[];
  shellCommands: string[];
  recipeIRS: RecipeIR[];
  normalRuleIR: NormalRuleIR;
  vpathRules?: VpathRule[];
}

export class VpathRule extends BaseModel {
  public pattern: string;
  public dirs: string[];

  constructor(pattern: string, dirs: string[]) {
    super();
    this.pattern = pattern;
    this.dirs = dirs;
  }
}

// pattern rule
export class NormalRule extends BaseModel {
  public target: string;
  public prerequisites: string[];
  public shellCommands: string[];
  public recipeIRS: RecipeIR[];
  public normalRuleIR: NormalRuleIR;
  public vpathRules: VpathRule[];

  public constructor(options: NormalRuleOptions) {
    super();

    this.target = options.target;
    this.prerequisites = options.prerequisites;
    this.shellCommands = options.shellCommands;
    this.recipeIRS = options.recipeIRS;
    this.normalRuleIR = options.normalRuleIR;
    this.vpathRules = options.vpathRules ?? [];
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

export interface ImplicitPatternRuleOptions {
  recipeIRS: RecipeIR[];
}

// implicit pattern rule
export class ImplicitPatterRule extends BaseModel {
  public recipeIRS: RecipeIR[];

  public constructor(options: ImplicitPatternRuleOptions) {
    super();

    this.recipeIRS = options.recipeIRS;
  }
}
