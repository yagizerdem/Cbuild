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
import {
  PreqMeta,
  PreqResolution,
} from "@src/cbuild-backend/execution/preq-resolution/type.js";

export class PreqResolver {
  private readonly normalRules: NormalRule[];
  private readonly vpathRules: VpathRule[];

  constructor(normalRules: NormalRule[], vpathRules: VpathRule[]) {
    this.normalRules = normalRules;
    this.vpathRules = vpathRules;
  }

  public resolve(preqName: string): PreqResolution<PreqMeta> {
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

export function resolvePreqs(
  explicitRules: NormalRule[],
  rule: NormalRule,
): Pair<PreqResolution<PreqMeta>[], PreqResolution<PreqMeta>[]> {
  const preqResolver = new PreqResolver(explicitRules, rule.vpathRules ?? []);

  const preqResolutions = rule.prerequisites.map((preq) =>
    preqResolver.resolve(preq),
  );

  const orderOnlyPreqResolutions = rule.orderOnlyPrerequisites.map((preq) =>
    preqResolver.resolve(preq),
  );

  const notFound = [...preqResolutions, ...orderOnlyPreqResolutions].find(
    (resolution) => resolution.origin.type === "not-found",
  );

  if (notFound) {
    throw CbuildException.from({
      errorType: ErrorType.PROCESS,
      machineCode: MachineCode.DEPQ_NOT_FOUND,
      message: `cbuild: No rule to make target '${notFound.preqName}', needed by '${rule.target}'. Stop.`,
      column: -1,
      row: -1,
    });
  }

  const outOfDateChecker = new OutOfDateChecker(rule, preqResolutions);
  outOfDateChecker.resolveOutOfDateSync(rule, preqResolutions);

  return {
    first: preqResolutions,
    second: orderOnlyPreqResolutions,
  };
}
