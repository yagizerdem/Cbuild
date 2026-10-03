import { Env } from "@cbuild-backend/env.js";
import { NormalRule } from "@cbuild-backend/model.js";
import {
  OutOfDateResolution,
  PreqResolution,
  TargetResolution,
} from "@cbuild-backend/execution/preq-resolution/type.js";
import { BuildFileMeta } from "@src/type/buildfile-meta.js";

export default class AutomaticVariableEnv {
  private readonly rule: NormalRule;
  private readonly enclosing: Env;
  private readonly resolvedPreqs: PreqResolution[];
  private readonly resolvedOrderOnlyPreqs: PreqResolution[];
  private readonly resolvedTarget: TargetResolution | null = null;
  private readonly outOfDateResolution: OutOfDateResolution | null = null;
  private readonly buildFileMeta?: BuildFileMeta;

  constructor(
    rule: NormalRule,
    enclosing: Env,
    resolvedTarget: TargetResolution | null,
    resolvedPreqs: PreqResolution[],
    resolvedOrderOnlyPreqs: PreqResolution[],
    outOfDateResolution: OutOfDateResolution | null,
    buildFileMeta?: BuildFileMeta,
  ) {
    this.rule = rule;
    this.enclosing = enclosing;
    this.resolvedTarget = resolvedTarget;
    this.resolvedPreqs = resolvedPreqs;
    this.resolvedOrderOnlyPreqs = resolvedOrderOnlyPreqs;
    this.outOfDateResolution = outOfDateResolution;
    this.buildFileMeta = buildFileMeta;
  }

  // can accept more spesific enclosing
  public generate(enclosing: Env | undefined = undefined): Env {
    const env: Env = new Env(this.enclosing.cliOptions);
    env.enclosing = enclosing ?? this.enclosing;

    env.setRawVariable("@", this.generateAtVar(), "automatic", false);
    env.setRawVariable("%", this.generatePercentVar(), "automatic", false);
    env.setRawVariable("<", this.generateLessThanVar(), "automatic", false);
    env.setRawVariable("?", this.generateQuestionMarkVar(), "automatic", false);
    env.setRawVariable("^", this.generateCaretVar(), "automatic", false);
    env.setRawVariable("+", this.generatePlusVar(), "automatic", false);
    env.setRawVariable("|", this.generatePipeVar(), "automatic", false);
    env.setRawVariable("@D", this.generateAtDVar(), "automatic", false);
    env.setRawVariable("@F", this.generateAtFVar(), "automatic", false);
    env.setRawVariable("<D", this.generateLessThanDVar(), "automatic", false);
    env.setRawVariable("<F", this.generateLessThanFVar(), "automatic", false);
    env.setRawVariable("^D", this.generateCaretDVar(), "automatic", false);
    env.setRawVariable("^F", this.generateCaretFVar(), "automatic", false);
    env.setRawVariable("+D", this.generatePlusDVar(), "automatic", false);
    env.setRawVariable("+F", this.generatePlusFVar(), "automatic", false);
    env.setRawVariable("?D", this.generateQuestionDVar(), "automatic", false);
    env.setRawVariable("?F", this.generateQuestionFVar(), "automatic", false);

    return env;
  }

  public generateAtVar() {
    return this.resolvedTarget?.targetName ?? "";
  }

  // $%
  public generatePercentVar() {
    // cbuild does not support archive target
    return "";
  }
  // $<
  public generateLessThanVar() {
    const firstPreq = this.resolvedPreqs[0];
    return firstPreq?.preqName ?? "";
  }

  // $?
  public generateQuestionMarkVar() {
    const outOfDatePreqNames = this.outOfDateResolution?.outOfDatePreqs.map(
      (preq) => preq.preqName,
    );

    // filter duplicates
    const uniqueOutOfDatePreqNames = Array.from(new Set(outOfDatePreqNames));
    return uniqueOutOfDatePreqNames.join(" ");
  }

  // $^
  public generateCaretVar() {
    const allPreqNames = this.resolvedPreqs.map((preq) => preq.preqName ?? "");
    // filter duplicates
    const uniqueAllPreqNames = Array.from(new Set(allPreqNames));
    return uniqueAllPreqNames.join(" ");
  }

  // $+
  public generatePlusVar() {
    const allPreqNames = this.resolvedPreqs.map((preq) => preq.preqName ?? "");
    return allPreqNames.join(" ");
  }

  // $|
  public generatePipeVar() {
    const allOrderOnlyPreqNames = this.resolvedOrderOnlyPreqs.map(
      (preq) => preq.preqName ?? "",
    );
    // filter duplicates
    const uniqueAllOrderOnlyPreqNames = Array.from(
      new Set(allOrderOnlyPreqNames),
    );
    return uniqueAllOrderOnlyPreqNames.join(" ");
  }

  // @D
  public generateAtDVar() {
    const target = this.rule.target;
    const dir = this.dirPart(target);
    return dir;
  }

  // @F
  public generateAtFVar() {
    const target = this.rule.target;
    const file = this.filePart(target);
    return file;
  }

  // $(<D)
  public generateLessThanDVar() {
    const firstPreq = this.generateLessThanVar();
    return firstPreq === "" ? "" : this.dirPart(firstPreq);
  }

  // $(<F)
  public generateLessThanFVar() {
    const firstPreq = this.generateLessThanVar();
    return firstPreq === "" ? "" : this.filePart(firstPreq);
  }

  // $(^D)
  public generateCaretDVar() {
    const allPreqNames = this.resolvedPreqs.map((preq) => preq.preqName ?? "");
    // filter duplicates
    const uniqueAllPreqNames = Array.from(new Set(allPreqNames));
    return uniqueAllPreqNames.map((preq) => this.dirPart(preq)).join(" ");
  }

  // $(^F)
  public generateCaretFVar() {
    const allPreqNames = this.resolvedPreqs.map((preq) => preq.preqName ?? "");
    // filter duplicates
    const uniqueAllPreqNames = Array.from(new Set(allPreqNames));
    return uniqueAllPreqNames.map((preq) => this.filePart(preq)).join(" ");
  }

  // $(+D)
  public generatePlusDVar() {
    const allPreqNames = this.resolvedPreqs.map((preq) => preq.preqName ?? "");
    return allPreqNames.map((preq) => this.dirPart(preq)).join(" ");
  }

  // $(+F)
  public generatePlusFVar() {
    const allPreqNames = this.resolvedPreqs.map((preq) => preq.preqName ?? "");
    return allPreqNames.map((preq) => this.filePart(preq)).join(" ");
  }

  // ?D
  public generateQuestionDVar() {
    const outOfDatePreqNames = this.outOfDateResolution?.outOfDatePreqs.map(
      (preq) => preq.preqName,
    );

    // filter duplicates
    const uniqueOutOfDatePreqNames = Array.from(new Set(outOfDatePreqNames));
    return uniqueOutOfDatePreqNames.map((preq) => this.dirPart(preq)).join(" ");
  }

  // ?F
  public generateQuestionFVar() {
    const outOfDatePreqNames = this.outOfDateResolution?.outOfDatePreqs.map(
      (preq) => preq.preqName,
    );

    // filter duplicates
    const uniqueOutOfDatePreqNames = Array.from(new Set(outOfDatePreqNames));
    return uniqueOutOfDatePreqNames
      .map((preq) => this.filePart(preq))
      .join(" ");
  }

  // gnu make compatible independent from underlying OS path conventions

  private dirPart(fileName: string): string {
    const lastSlash = fileName.lastIndexOf("/");

    if (lastSlash === -1) {
      return ".";
    }

    return fileName.slice(0, lastSlash);
  }

  // gnu make compatible independent from underlying OS path conventions
  private filePart(fileName: string): string {
    const lastSlash = fileName.lastIndexOf("/");

    if (lastSlash === -1) {
      return fileName;
    }

    return fileName.slice(lastSlash + 1);
  }
}
