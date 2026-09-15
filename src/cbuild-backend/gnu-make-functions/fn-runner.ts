import { FunctionIR } from "@src/compiler/ir.js";
import { BaseFnRunner } from "@src/gnu-make-functions/runner.js";
import { Env } from "@cbuild-backend/env.js";
import AbspathRunner from "@cbuild-backend/gnu-make-functions/runner/abspath-runner.js";

export default class CbuildFnRunner extends BaseFnRunner {
  private readonly context: Env;
  private readonly activeLookups: Set<string>;

  public constructor(context: Env, activeLookups: Set<string>) {
    super();
    this.context = context;
    this.activeLookups = activeLookups;
  }

  abspathFn(ir: FunctionIR): string {
    const absPathRunner = new AbspathRunner(this.context, this.activeLookups);
    return absPathRunner.run(ir);
  }
}
