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
import ErrorRunner from "@cbuild-backend/gnu-make-functions/runner/error-runner.js";
import FileRunner from "@cbuild-backend/gnu-make-functions/runner/file-runner.js";
import FilterOutRunner from "@cbuild-backend/gnu-make-functions/runner/filter-out-runner.js";
import FilterRunner from "@cbuild-backend/gnu-make-functions/runner/filter-runner.js";
import FindStringRunner from "@cbuild-backend/gnu-make-functions/runner/findstring-runner.js";
import FirstWordRunner from "@cbuild-backend/gnu-make-functions/runner/firstword-runner.js";
import FlavorRunner from "@cbuild-backend/gnu-make-functions/runner/flavor-runner.js";
import IfRunner from "@cbuild-backend/gnu-make-functions/runner/if-runner.js";
import JoinRunner from "@cbuild-backend/gnu-make-functions/runner/join-runner.js";
import ForeachRunner from "@cbuild-backend/gnu-make-functions/runner/foreach-runner.js";
import LastWordRunner from "@cbuild-backend/gnu-make-functions/runner/last-word-runner.js";
import NotDirRunner from "@cbuild-backend/gnu-make-functions/runner/not-dir-runner.js";
import OrRunner from "@cbuild-backend/gnu-make-functions/runner/or-runner.js";
import OriginRunner from "@cbuild-backend/gnu-make-functions/runner/origin-runner.js";

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

  errorFn(ir: FunctionIR): string {
    const errorRunner = new ErrorRunner(this.context, this.activeLookups);
    return errorRunner.run(ir);
  }

  fileFn(ir: FunctionIR): string {
    const fileRunner = new FileRunner(this.context, this.activeLookups);
    return fileRunner.run(ir);
  }

  filterOutFn(ir: FunctionIR): string {
    const filterOutRunner = new FilterOutRunner(
      this.context,
      this.activeLookups,
    );
    return filterOutRunner.run(ir);
  }

  filterFn(ir: FunctionIR): string {
    const filterRunner = new FilterRunner(this.context, this.activeLookups);
    return filterRunner.run(ir);
  }

  findstringFn(ir: FunctionIR): string {
    const findStringRunner = new FindStringRunner(
      this.context,
      this.activeLookups,
    );
    return findStringRunner.run(ir);
  }

  firstwordFn(ir: FunctionIR): string {
    const firstWordRunner = new FirstWordRunner(
      this.context,
      this.activeLookups,
    );
    return firstWordRunner.run(ir);
  }

  flavorFn(ir: FunctionIR): string {
    const flavorRunner = new FlavorRunner(this.context, this.activeLookups);
    return flavorRunner.run(ir);
  }

  foreachFn(ir: FunctionIR): string {
    const foreachRunner = new ForeachRunner(this.context, this.activeLookups);
    return foreachRunner.run(ir);
  }

  ifFn(ir: FunctionIR): string {
    const ifRunner = new IfRunner(this.context, this.activeLookups);
    return ifRunner.run(ir);
  }

  joinFn(ir: FunctionIR): string {
    const joinRunner = new JoinRunner(this.context, this.activeLookups);
    return joinRunner.run(ir);
  }

  lastwordFn(ir: FunctionIR): string {
    const lastWordRunner = new LastWordRunner(this.context, this.activeLookups);
    return lastWordRunner.run(ir);
  }

  notDirFn(ir: FunctionIR): string {
    const notDirRunner = new NotDirRunner(this.context, this.activeLookups);
    return notDirRunner.run(ir);
  }

  orFn(ir: FunctionIR): string {
    const orRunner = new OrRunner(this.context, this.activeLookups);
    return orRunner.run(ir);
  }

  originFn(ir: FunctionIR): string {
    const originRunner = new OriginRunner(this.context, this.activeLookups);
    return originRunner.run(ir);
  }
}
