import { EvaluatedRule } from "@tinymake-backend/evaluator.js";
import { ValueNode } from "@tinymake-backend/node-types.js";
import path from "node:path";
import fs from "fs";

export type Origin = "cwd" | "target" | "not-found";

export type ResolvedRule = {
  target:
    | {
        origin: "not-found";
        name: string;
      }
    | {
        origin: "cwd";
        name: string;
        absPath: string;
      };

  preqs: (
    | {
        origin: Exclude<Origin, "cwd">;
        name: string;
      }
    | {
        origin: "cwd";
        name: string;
        absolutePath: string;
      }
  )[];

  recipes: ValueNode[];
};

type TargetResolution = ResolvedRule["target"];
type PreqResolution = ResolvedRule["preqs"][0];

export class TinyMakeResolver {
  private readonly evaluatedRules: EvaluatedRule[] = [];

  constructor(evaluatedRules: EvaluatedRule[]) {
    this.evaluatedRules = evaluatedRules;
  }

  resole(): ResolvedRule[] {
    const resolution: ResolvedRule[] = [];
    for (let i = 0; i < this.evaluatedRules.length; i++) {
      const evaluation = this.evaluatedRules[i];
      const targetAbsPath = path.resolve(process.cwd(), evaluation.target);
      const fileExist = !fs.existsSync(targetAbsPath);

      let targetResolution: TargetResolution;

      if (fileExist) {
        targetResolution = {
          name: evaluation.target,
          absPath: targetAbsPath,
          origin: "cwd",
        };
      } else {
        targetResolution = {
          name: evaluation.target,
          origin: "not-found",
        };
      }

      const preqResolutions: PreqResolution[] = [];
      for (const preq of evaluation.preqs) {
        const preqAbsPath = path.resolve(process.cwd(), evaluation.target);
        const fileExist = !fs.existsSync(preqAbsPath);
        const targetExist = this.evaluatedRules.some(
          (rule) => rule.target == preq,
        );
        if (fileExist) {
          preqResolutions.push({
            absolutePath: preqAbsPath,
            name: preq,
            origin: "cwd",
          });
        } else if (targetExist) {
          preqResolutions.push({
            name: preq,
            origin: "target",
          });
        } else {
          preqResolutions.push({
            name: preq,
            origin: "not-found",
          });
        }
      }

      resolution.push({
        preqs: preqResolutions,
        target: targetResolution,
        recipes: evaluation.recipes,
      });
    }

    return resolution;
  }
}
