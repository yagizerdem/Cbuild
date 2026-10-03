import { NormalRule, VpathRule } from "@cbuild-backend/model.js";
import path from "path";
import {
  fileExistbyAbsolutePath,
  resolveAndGetAbsolutePath,
} from "@src/file-utils.js";
import { StemResolver } from "@src/cbuild-backend/stem-resolver.js";
import { Pair } from "@cbuild-backend/execution/type.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { OutOfDateChecker } from "@src/cbuild-backend/execution/preq-resolution/out-of-date.js";
import { TargetResolution } from "@src/cbuild-backend/execution/preq-resolution/type.js";
import { Env } from "@src/cbuild-backend/env.js";

export class TargetResolver {
  private readonly normalRules: NormalRule[];
  private readonly vpathRules: VpathRule[];

  constructor(normalRules: NormalRule[], vpathRules: VpathRule[]) {
    this.normalRules = normalRules;
    this.vpathRules = vpathRules;
  }

  public resolve(targetName: string): TargetResolution {
    const isAbsolute = path.isAbsolute(targetName);

    if (isAbsolute) {
      if (fileExistbyAbsolutePath(targetName)) {
        return {
          targetName,
          vpathRules: this.vpathRules,
          origin: {
            type: "absolute",
            absolutePath: targetName,
          },
        };
      } else {
        return {
          targetName,
          vpathRules: this.vpathRules,
          origin: {
            type: "not-found",
          },
        };
      }
    }

    // relative paths

    // 1 check by cwd
    const resolvedAbsolutePath = resolveAndGetAbsolutePath(
      process.cwd(),
      targetName,
    );

    if (fileExistbyAbsolutePath(resolvedAbsolutePath)) {
      return {
        targetName,
        vpathRules: this.vpathRules,
        origin: {
          type: "cwd",
          absolutePath: resolvedAbsolutePath,
        },
      };
    }

    const vpathStemResolver = new StemResolver();
    // check by vpath rules
    for (const vpathRule of this.vpathRules) {
      if (!vpathStemResolver.match(vpathRule.pattern, targetName)) {
        continue;
      }
      for (const vpathBaseDir of vpathRule.dirs) {
        const resolvedAbsolutePathByVpath = resolveAndGetAbsolutePath(
          vpathBaseDir,
          targetName,
        );

        if (fileExistbyAbsolutePath(resolvedAbsolutePathByVpath)) {
          return {
            targetName,
            vpathRules: this.vpathRules,
            origin: {
              type: "vpath",
              absolutePath: resolvedAbsolutePathByVpath,
            },
          };
        }
      }
    }

    return {
      targetName,
      vpathRules: this.vpathRules,
      origin: {
        type: "not-found",
      },
    };
  }
}

export function resolveTarget(
  explicitRules: NormalRule[],
  rule: NormalRule,
  context: Env,
): TargetResolution {
  const targetResolver = new TargetResolver(
    explicitRules,
    rule.vpathRules ?? [],
  );

  const targetResolution = targetResolver.resolve(rule.target);

  return targetResolution;
}
