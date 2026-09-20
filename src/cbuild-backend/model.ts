import { randomUUID } from "node:crypto";
import type {
  RecipeIR,
  NormalRuleIR,
  StaticPatternRuleIR,
} from "@compiler/ir.js";

export abstract class BaseModel {
  public readonly uuid: string = randomUUID();

  public toString(): string {
    return "<BaseModel>";
  }
}

export interface NormalRuleOptions {
  target: string;
  prerequisites: string[];
  orderOnlyPrerequisites?: string[];
  shellCommands: string[];
  recipeIRS: RecipeIR[];
  ruleIR: NormalRuleIR | StaticPatternRuleIR;
  vpathRules?: VpathRule[];
  stem?: string;
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
  public orderOnlyPrerequisites: string[];
  public shellCommands: string[];
  public recipeIRS: RecipeIR[];
  public ruleIR: NormalRuleIR | StaticPatternRuleIR;
  public vpathRules: VpathRule[];
  public stem?: string;

  public constructor(options: NormalRuleOptions) {
    super();

    this.target = options.target;
    this.prerequisites = options.prerequisites;
    this.orderOnlyPrerequisites = options.orderOnlyPrerequisites ?? [];
    this.shellCommands = options.shellCommands;
    this.recipeIRS = options.recipeIRS;
    this.ruleIR = options.ruleIR;

    this.vpathRules = options.vpathRules ?? [];
    this.stem = options.stem;
  }

  public override toString(): string {
    return `NormalRule {
  target=${this.target},
  prerequisites=${JSON.stringify(this.prerequisites)},
  orderOnlyPrerequisites=${JSON.stringify(this.orderOnlyPrerequisites)},
  shellCommands=${JSON.stringify(this.shellCommands)},
  recipeIRS=${JSON.stringify(this.recipeIRS)},
  ruleIR=${JSON.stringify(this.ruleIR)}
}`;
  }
}

export interface ImplicitPatternRuleOptions {
  targetPattern: string;
  prerequisites: string[];
  orderOnlyPrerequisites: string[];
  recipeIRS: RecipeIR[];
  ruleIR: NormalRuleIR;
  vpathRules: VpathRule[];
}

// implicit pattern rule
export class ImplicitPatterRule extends BaseModel {
  public targetPattern: string;
  public prerequisites: string[];
  public orderOnlyPrerequisites: string[];
  public recipeIRS: RecipeIR[];
  public ruleIR: NormalRuleIR;
  public vpathRules: VpathRule[];

  public constructor(options: ImplicitPatternRuleOptions) {
    super();

    this.targetPattern = options.targetPattern;
    this.prerequisites = options.prerequisites;
    this.orderOnlyPrerequisites = options.orderOnlyPrerequisites;
    this.recipeIRS = options.recipeIRS;
    this.ruleIR = options.ruleIR;
    this.vpathRules = options.vpathRules;
  }
}
