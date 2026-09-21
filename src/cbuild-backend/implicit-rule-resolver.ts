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

type Candidate = {
  pattern: ImplicitPatterRule;
  stem: string;
  prerequisites: string[];
  orderOnlyPrerequisites: string[];
};

/** Materializes user-defined pattern rules only for reachable targets. */
export class ImplicitRuleResolver {
  private readonly rules: NormalRule[];
  private readonly patterns: ImplicitPatterRule[];
  private readonly rulesByTarget = new Map<string, NormalRule[]>();
  private readonly resolvedTargets = new Set<string>();
  private readonly stemResolver = new StemResolver();
  private readonly cwd: string;

  public constructor(
    rules: NormalRule[],
    patterns: ImplicitPatterRule[],
    cwd: string = process.cwd(),
  ) {
    this.rules = [...rules];
    this.patterns = patterns;
    this.cwd = cwd;
    for (const rule of rules) {
      const targetRules = this.rulesByTarget.get(rule.target) ?? [];
      targetRules.push(rule);
      this.rulesByTarget.set(rule.target, targetRules);
    }
  }

  public resolve(target: string): NormalRule[] {
    this.materialize(target, new Set<string>());
    return this.rules;
  }

  private materialize(target: string, active: Set<string>): void {
    if (this.resolvedTargets.has(target) || active.has(target)) return;
    active.add(target);

    let explicit = this.rulesByTarget.get(target) ?? [];
    if (!explicit.some((rule) => rule.evaluatedRecipeIRs.length > 0)) {
      const candidate = this.findCandidate(target, active);
      if (candidate) {
        const merged = new NormalRule({
          target,
          prerequisites: [
            ...explicit.flatMap((rule) => rule.prerequisites),
            ...candidate.prerequisites,
          ],
          orderOnlyPrerequisites: [
            ...explicit.flatMap((rule) => rule.orderOnlyPrerequisites),
            ...candidate.orderOnlyPrerequisites,
          ],
          evaluatedRecipeIRs: [...candidate.pattern.recipeIRs],
          recipeIRs: [...candidate.pattern.recipeIRs],
          ruleIR: candidate.pattern.ruleIR,
          shellCommands: [],
          vpathRules: candidate.pattern.vpathRules,
          stem: candidate.stem,
        });
        if (explicit.length > 0) {
          const firstIndex = this.rules.indexOf(explicit[0]!);
          this.rules.splice(firstIndex, 1, merged);
          for (const oldRule of explicit.slice(1)) {
            this.rules.splice(this.rules.indexOf(oldRule), 1);
          }
        } else {
          this.rules.push(merged);
        }
        explicit = [merged];
        this.rulesByTarget.set(target, explicit);
      }
    }

    for (const rule of explicit) {
      for (const prerequisite of [
        ...rule.prerequisites,
        ...rule.orderOnlyPrerequisites,
      ]) {
        this.materialize(prerequisite, active);
      }
    }
    active.delete(target);
    this.resolvedTargets.add(target);
  }

  private findCandidate(target: string, active: Set<string>): Candidate | null {
    const candidates: Candidate[] = [];
    for (const pattern of this.patterns) {
      if (pattern.recipeIRs.length === 0) continue;
      const stem = this.stemResolver.resolveStem(pattern.targetPattern, target);
      if (stem === null || stem.length === 0) continue;
      candidates.push({
        pattern,
        stem,
        prerequisites: pattern.prerequisites.map((name) =>
          this.stemResolver.replaceStem(name, stem),
        ),
        orderOnlyPrerequisites: pattern.orderOnlyPrerequisites.map((name) =>
          this.stemResolver.replaceStem(name, stem),
        ),
      });
    }

    // A rule whose inputs already exist (or are explicit targets) wins over
    // one requiring another implicit rule. Preserve declaration order on ties.
    candidates.sort((left, right) => left.stem.length - right.stem.length);
    for (const candidate of candidates) {
      if (
        this.inputs(candidate).every((name) =>
          this.isDirectInput(name, candidate.pattern.vpathRules),
        )
      )
        return candidate;
    }
    for (const candidate of candidates) {
      if (
        this.inputs(candidate).every((name) =>
          this.canMake(name, active, candidate.pattern.vpathRules),
        )
      )
        return candidate;
    }
    return null;
  }

  private inputs(candidate: Candidate): string[] {
    return [...candidate.prerequisites, ...candidate.orderOnlyPrerequisites];
  }

  private isDirectInput(name: string, vpaths: VpathRule[]): boolean {
    if (this.rulesByTarget.has(name)) return true;
    if (fileExistbyAbsolutePath(resolveAndGetAbsolutePath(this.cwd, name))) {
      return true;
    }
    return vpaths.some(
      (vpath) =>
        this.stemResolver.match(vpath.pattern, name) &&
        vpath.dirs.some((dir) =>
          fileExistbyAbsolutePath(
            resolveAndGetAbsolutePath(
              resolveAndGetAbsolutePath(this.cwd, dir),
              name,
            ),
          ),
        ),
    );
  }

  private canMake(
    name: string,
    active: Set<string>,
    vpaths: VpathRule[],
  ): boolean {
    if (this.isDirectInput(name, vpaths)) return true;
    if (active.has(name)) return false;
    active.add(name);
    const candidate = this.findCandidate(name, active);
    active.delete(name);
    return candidate !== null;
  }
}
