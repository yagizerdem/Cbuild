import { NormalRule, VpathRule } from "@cbuild-backend/model.js";
import path from "path";
import {
  fileExistbyAbsolutePath,
  resolveAndGetAbsolutePath,
} from "@src/file-utils.js";
import { StemResolver } from "@src/cbuild-backend/stem-resolver.js";

export type PreqType =
  | "cwd"
  | "absolute"
  | "vpath"
  | "target-rule" // does not has file but has target rule
  | "not-found";

export type PreqResolution = {
  preqName: string;
  vpathRules: VpathRule[];
} & (
  | {
      origin: {
        type: "target-rule" | "not-found";
      };
    }
  | {
      origin: {
        type: Exclude<PreqType, "target-rule" | "not-found">;
        absolutePath: string;
      };
    }
);

export class PreqResolver {
  private readonly normalRules: NormalRule[];
  private readonly vpathRules: VpathRule[];

  constructor(normalRules: NormalRule[], vpathRules: VpathRule[]) {
    this.normalRules = normalRules;
    this.vpathRules = vpathRules;
  }

  public resolve(preqName: string): PreqResolution {
    const isAbsolute = path.isAbsolute(preqName);

    if (isAbsolute) {
      if (fileExistbyAbsolutePath(preqName)) {
        return {
          preqName,
          vpathRules: this.vpathRules,
          origin: {
            type: "absolute",
            absolutePath: preqName,
          },
        };
      } else {
        return {
          preqName,
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
      preqName,
    );

    if (fileExistbyAbsolutePath(resolvedAbsolutePath)) {
      return {
        preqName,
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
      if (!vpathStemResolver.match(vpathRule.pattern, preqName)) {
        continue;
      }
      for (const vpathBaseDir of vpathRule.dirs) {
        const resolvedAbsolutePathByVpath = resolveAndGetAbsolutePath(
          vpathBaseDir,
          preqName,
        );

        if (fileExistbyAbsolutePath(resolvedAbsolutePathByVpath)) {
          return {
            preqName,
            vpathRules: this.vpathRules,
            origin: {
              type: "vpath",
              absolutePath: resolvedAbsolutePathByVpath,
            },
          };
        }
      }
    }

    // chekc for target-rule names
    // does not exist in file system but mathes a target-rule pattern

    for (const normalRule of this.normalRules) {
      if (normalRule.target === preqName) {
        return {
          preqName,
          vpathRules: this.vpathRules,
          origin: {
            type: "target-rule",
          },
        };
      }
    }

    return {
      preqName,
      vpathRules: this.vpathRules,
      origin: {
        type: "not-found",
      },
    };
  }
}
