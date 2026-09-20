import { FunctionIR } from "@src/compiler/ir.js";
import { BaseFnRunner } from "@src/gnu-make-functions/runner.js";
import { Env } from "@cbuild-backend/env.js";
import AbspathRunner from "@cbuild-backend/gnu-make-functions/runner/abspath-runner.js";
import AddprefixRunner from "@cbuild-backend/gnu-make-functions/runner/addprefix-runner.js";
import AddsuffixRunner from "@cbuild-backend/gnu-make-functions/runner/addsuffix-runner.js";
import AndRunner from "@cbuild-backend/gnu-make-functions/runner/and-runner.js";
import BasenameRunner from "@cbuild-backend/gnu-make-functions/runner/basname-runner.js";
import WildcardRunner from "@cbuild-backend/gnu-make-functions/runner/wildcard-runner.js";
import CallRunner from "@cbuild-backend/gnu-make-functions/runner/call-runner.js";
import DirRunner from "@cbuild-backend/gnu-make-functions/runner/dir-runner.js";

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

  addprefixFn(ir: FunctionIR): string {
    const addprefixRunner = new AddprefixRunner(
      this.context,
      this.activeLookups,
    );
    return addprefixRunner.run(ir);
  }

  addsuffixFn(ir: FunctionIR): string {
    const addsuffixRunner = new AddsuffixRunner(
      this.context,
      this.activeLookups,
    );
    return addsuffixRunner.run(ir);
  }

  andFn(ir: FunctionIR): string {
    const andRunner = new AndRunner(this.context, this.activeLookups);
    return andRunner.run(ir);
  }

  basenameFn(ir: FunctionIR): string {
    const basenameRunner = new BasenameRunner(this.context, this.activeLookups);
    return basenameRunner.run(ir);
  }

  wildcardFn(ir: FunctionIR): string {
    const wildcardRunner = new WildcardRunner(this.context, this.activeLookups);
    return wildcardRunner.run(ir);
  }

  callFn(ir: FunctionIR): string {
    const callRunner = new CallRunner(this.context, this.activeLookups);
    return callRunner.run(ir);
  }

  dirFn(ir: FunctionIR): string {
    const dirRunner = new DirRunner(this.context, this.activeLookups);
    return dirRunner.run(ir);
  }
}
