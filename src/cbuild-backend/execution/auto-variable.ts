import { Env } from "@cbuild-backend/env.js";
import { NormalRule } from "@cbuild-backend/model.js";
import {
  PreqMeta,
  PreqResolution,
} from "@cbuild-backend/execution/preq-resolution/type.js";

export default class AutomaticVariableEnv {
  private readonly rule: NormalRule;
  private readonly enclosing: Env;
  private readonly resolvedPreqs: PreqResolution<PreqMeta>[];

  constructor(
    rule: NormalRule,
    enclosing: Env,
    resolvedPreqs: PreqResolution<PreqMeta>[],
  ) {
    this.rule = rule;
    this.enclosing = enclosing;
    this.resolvedPreqs = resolvedPreqs;
  }

  public generate(): Env {
    const env: Env = new Env(this.enclosing.settings);
    env.enclosing = this.enclosing;

    env.setRawVariable("%", this.generatePercentVar(), "automatic", false);

    return env;
  }

  // $%
  public generatePercentVar() {
    const targetName: string = this.rule.target;
    return targetName;
  }
}
