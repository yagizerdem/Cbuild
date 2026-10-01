import {
  ImplicitPatterRule,
  NormalRule,
  VpathRule,
} from "@cbuild-backend/model.js";
import { StemResolver } from "@cbuild-backend/stem-resolver.js";
import {
  fileExistbyAbsolutePath,
  resolveAndGetAbsolutePath,
} from "@src/file-utils.js";

interface Candidate {
  rule: ImplicitPatterRule;
  stem: string;
  directory: string;
  prerequisites: string[];
  orderOnlyPrerequisites: string[];
}

interface ResolutionPlan {
  candidate: Candidate;
  dependencies: Map<string, ResolutionPlan>;
}

export class ImplicitRuleResolver {
  private readonly rules: NormalRule[];
  private readonly patterns: ImplicitPatterRule[];
  private readonly stemResolver = new StemResolver();
  private readonly cwd: string;
  private readonly rulesByTarget = new Map<string, NormalRule[]>();

  public constructor(
    rules: NormalRule[],
    patterns: ImplicitPatterRule[],
    cwd: string = process.cwd(),
  ) {
    this.rules = [...rules];
    this.patterns = patterns;
    this.cwd = cwd;
    for (const rule of rules) {
      const entries = this.rulesByTarget.get(rule.target) ?? [];
      entries.push(rule);
      this.rulesByTarget.set(rule.target, entries);
    }
  }

  public resolve(): NormalRule[] {
    // Keep original order (and the default goal), including recipe-less rules.
    const resolved = [...this.rules];
    const visited = new Set<string>();
    for (const rule of this.rules) {
      this.resolveTarget(rule.target, resolved, visited);
    }

    return resolved;
  }

  private resolveTarget(
    target: string,
    resolved: NormalRule[],
    visited: Set<string>,
    selectedPlan?: ResolutionPlan,
  ): void {
    if (visited.has(target)) return;
    visited.add(target);

    const explicit = this.rulesByTarget.get(target) ?? [];
    // Each double-colon entry is independent; normal rules arrive normalized.
    const entries: (NormalRule | undefined)[] = explicit.length
      ? explicit
      : [undefined];
    for (const rule of entries) {
      const hasRecipe =
        rule !== undefined &&
        (rule.recipeIRs.length > 0 || rule.evaluatedRecipeIRs.length > 0);
      const plan = hasRecipe
        ? null
        : selectedPlan ??
          this.findPlan(target, new Set(), new Set(), false, rule);
      let result = rule;
      if (plan) {
        result = this.createRule(target, plan.candidate, rule);
        if (rule) resolved[resolved.indexOf(rule)] = result;
        else resolved.push(result);

        // Only commit dependencies of the successful candidate. Failed searches
        // must not leave generated rules behind in the build graph.
        for (const [name, dependency] of plan.dependencies) {
          this.resolveTarget(name, resolved, visited, dependency);
        }
      }
      if (!result) continue;
      for (const name of [
        ...result.prerequisites,
        ...result.orderOnlyPrerequisites,
      ]) {
        // Terminal pattern rules do not start implicit searches for their inputs.
        if (
          plan &&
          this.isTerminal(plan.candidate.rule) &&
          !this.rulesByTarget.has(name) &&
          !(rule?.prerequisites.includes(name) ||
            rule?.orderOnlyPrerequisites.includes(name))
        ) {
          continue;
        }
        this.resolveTarget(name, resolved, visited);
      }
    }
  }

  private findPlan(
    target: string,
    activeTargets: Set<string>,
    activePatterns: Set<ImplicitPatterRule>,
    recursive = false,
    explicit?: NormalRule,
  ): ResolutionPlan | null {
    if (activeTargets.has(target)) return null;
    const nextTargets = new Set(activeTargets).add(target);
    const candidates = this.findCandidates(target, recursive).filter(
      (candidate) => !activePatterns.has(candidate.rule),
    );
    const ordered: Candidate[] = [];
    while (candidates.length) {
      const mostSpecific = this.mostSpesificCandidate(candidates)!;
      ordered.push(mostSpecific);
      candidates.splice(candidates.indexOf(mostSpecific), 1);
    }

    // GNU make first tries every candidate without chaining, then allows
    // intermediate implicit rules. A shorter stem wins within each pass.
    for (const chaining of [false, true]) {
      for (const candidate of ordered) {
        if (chaining && this.isTerminal(candidate.rule)) continue;
        const dependencies = new Map<string, ResolutionPlan>();
        const nextPatterns = new Set(activePatterns).add(candidate.rule);
        const vpaths = [
          ...(explicit?.vpathRules ?? []),
          ...candidate.rule.vpathRules,
        ];
        const applicable = [
          ...candidate.prerequisites,
          ...candidate.orderOnlyPrerequisites,
        ].every((name) => {
          if (this.isDirectInput(name, vpaths, explicit)) return true;
          if (!chaining) return false;
          const dependency = this.findPlan(name, nextTargets, nextPatterns, true);
          if (!dependency) return false;
          dependencies.set(name, dependency);
          return true;
        });
        if (applicable) return { candidate, dependencies };
      }
    }
    return null;
  }

  private createRule(
    target: string,
    candidate: Candidate,
    explicit?: NormalRule,
  ): NormalRule {
    const patternRule = candidate.rule;
    // The implicit source must come first for the existing $< implementation.
    const prerequisites = [
      ...candidate.prerequisites,
      ...(explicit?.prerequisites ?? []),
    ];
    const orderOnlyPrerequisites = [
      ...candidate.orderOnlyPrerequisites,
      ...(explicit?.orderOnlyPrerequisites ?? []),
    ].filter((name) => !prerequisites.includes(name));
    const newRule = new NormalRule({
      target,
      prerequisites,
      orderOnlyPrerequisites,
      evaluatedRecipeIRs: [...patternRule.evaluatedRecipeIRs],
      recipeIRs: [...patternRule.recipeIRs],
      shellCommands: [],
      ruleIR: patternRule.ruleIR,
      ruleSeperator: explicit?.ruleSeperator ?? ":",
      vpathRules: Array.from(
        new Set([...(explicit?.vpathRules ?? []), ...patternRule.vpathRules]),
      ),
      stem: candidate.directory + candidate.stem,
    });
    // Keep a real NormalRule instance and preserve an existing rule's identity.
    if (explicit) Object.defineProperty(newRule, "uuid", { value: explicit.uuid });
    return newRule;
  }

  private isDirectInput(
    name: string,
    vpaths: VpathRule[],
    explicit?: NormalRule,
  ): boolean {
    if (
      this.rulesByTarget.has(name) ||
      explicit?.prerequisites.includes(name) ||
      explicit?.orderOnlyPrerequisites.includes(name)
    ) return true;
    if (fileExistbyAbsolutePath(resolveAndGetAbsolutePath(this.cwd, name))) {
      return true;
    }
    return vpaths.some(
      (vpath) => this.stemResolver.match(vpath.pattern, name) &&
        vpath.dirs.some((directory) => fileExistbyAbsolutePath(
          resolveAndGetAbsolutePath(
            resolveAndGetAbsolutePath(this.cwd, directory), name,
          ),
        )),
    );
  }

  private isTerminal(rule: ImplicitPatterRule): boolean {
    return rule.ruleIR.separator === "::" || rule.ruleIR.separator === "&::";
  }

  private findCandidates(target: string, recursive = false): Candidate[] {
    const candidates: Candidate[] = [];
    const lastSlash = target.lastIndexOf("/");
    let specificMatch = false;
    for (const pattern of this.patterns) {
      if (!this.stemResolver.hasStem(pattern.targetPattern)) continue;
      const directory = pattern.targetPattern.includes("/")
        ? ""
        : target.slice(0, lastSlash + 1);
      const targetName = directory ? target.slice(lastSlash + 1) : target;
      if (this.stemResolver.match(pattern.targetPattern, targetName)) {
        const stem = this.stemResolver.resolveStem(
          pattern.targetPattern,
          targetName,
        );
        if (stem !== null && stem.length > 0) {
          if (pattern.targetPattern !== "%") specificMatch = true;
          if (
            pattern.recipeIRs.length === 0 &&
            pattern.evaluatedRecipeIRs.length === 0
          ) continue;
          const replace = (name: string): string =>
            this.stemResolver.hasStem(name)
              ? directory + this.stemResolver.replaceStem(name, stem)
              : name;
          candidates.push({
            rule: pattern,
            stem,
            directory,
            prerequisites: pattern.prerequisites.map(replace),
            orderOnlyPrerequisites: pattern.orderOnlyPrerequisites.map(replace),
          });
        }
      }
    }
    return candidates.filter(
      (candidate) => candidate.rule.targetPattern !== "%" ||
        this.isTerminal(candidate.rule) || !(specificMatch || recursive),
    );
  }

  private mostSpesificCandidate(candidates: Candidate[]): Candidate | null {
    if (candidates.length === 0) {
      return null;
    }
    let mostSpecific = candidates[0];
    for (const candidate of candidates) {
      if (
        candidate.directory.length + candidate.stem.length <
        mostSpecific.directory.length + mostSpecific.stem.length
      ) {
        mostSpecific = candidate;
      }
    }
    return mostSpecific;
  }
}
