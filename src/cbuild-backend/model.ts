import { randomUUID } from "node:crypto";
import type {
  RecipeIR,
  NormalRuleIR,
  StaticPatternRuleIR,
  RuleSeparator,
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
  recipeIRs: RecipeIR[];
  ruleIR: NormalRuleIR | StaticPatternRuleIR;
  evaluatedRecipeIRs: RecipeIR[];
  ruleSeperator: RuleSeparator;
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
  public recipeIRs: RecipeIR[];
  public evaluatedRecipeIRs: RecipeIR[];
  public ruleIR: NormalRuleIR | StaticPatternRuleIR;
  public vpathRules: VpathRule[];
  public ruleSeperator: RuleSeparator;
  public stem?: string;

  public constructor(options: NormalRuleOptions) {
    super();

    this.target = options.target;
    this.prerequisites = options.prerequisites;
    this.orderOnlyPrerequisites = options.orderOnlyPrerequisites ?? [];
    this.shellCommands = options.shellCommands;
    this.recipeIRs = options.recipeIRs;
    this.evaluatedRecipeIRs = options.evaluatedRecipeIRs;
    this.ruleIR = options.ruleIR;

    this.vpathRules = options.vpathRules ?? [];
    this.ruleSeperator = options.ruleSeperator;
    this.stem = options.stem;
  }

  public override toString(): string {
    return `NormalRule {
  target=${this.target},
  prerequisites=${JSON.stringify(this.prerequisites)},
  orderOnlyPrerequisites=${JSON.stringify(this.orderOnlyPrerequisites)},
  shellCommands=${JSON.stringify(this.shellCommands)},
  recipeIRS=${JSON.stringify(this.recipeIRs)},
  evaluatedRecipeIRs=${JSON.stringify(this.evaluatedRecipeIRs)},
  ruleIR=${JSON.stringify(this.ruleIR)}
}`;
  }
}

export interface ImplicitPatternRuleOptions {
  targetPattern: string;
  prerequisites: string[];
  orderOnlyPrerequisites: string[];
  recipeIRs: RecipeIR[];
  ruleIR: NormalRuleIR;
  vpathRules: VpathRule[];
  evaluatedRecipeIRs: RecipeIR[];
}

// implicit pattern rule
export class ImplicitPatterRule extends BaseModel {
  public targetPattern: string;
  public prerequisites: string[];
  public orderOnlyPrerequisites: string[];
  public recipeIRs: RecipeIR[];
  public ruleIR: NormalRuleIR;
  public vpathRules: VpathRule[];
  public evaluatedRecipeIRs: RecipeIR[];

  public constructor(options: ImplicitPatternRuleOptions) {
    super();

    this.targetPattern = options.targetPattern;
    this.prerequisites = options.prerequisites;
    this.orderOnlyPrerequisites = options.orderOnlyPrerequisites;
    this.recipeIRs = options.recipeIRs;
    this.ruleIR = options.ruleIR;
    this.vpathRules = options.vpathRules;
    this.evaluatedRecipeIRs = options.evaluatedRecipeIRs;
  }
}
