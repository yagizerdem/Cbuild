import {
  fileExistbyAbsolutePath,
  fileExistbyAbsolutePathAsync,
  getModifiedTimeNs,
  getModifiedTimeNsAsync,
  resolveAndGetAbsolutePath,
} from "@src/file-utils.js";
import { NormalRule } from "@cbuild-backend/model.js";
import {
  PreqMeta,
  PreqResolution,
} from "@src/cbuild-backend/execution/preq-resolution/type.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { Env } from "@src/cbuild-backend/env.js";

export class OutOfDateChecker {
  private readonly context: Env;

  constructor(context: Env) {
    this.context = context;
  }

  private isOutOfDateSync(
    rule: NormalRule,
    preqResolutions: PreqResolution<PreqMeta> | PreqResolution<PreqMeta>[],
  ): boolean {
    const targetEntryPath: string = resolveAndGetAbsolutePath(
      process.cwd(),
      rule.target,
    );

    if (Array.isArray(preqResolutions) === false) {
      return this.isOutOfDateSync(rule, [preqResolutions]);
    }

    if (!fileExistbyAbsolutePath(targetEntryPath)) return true;

    const lastModifiedDateOfTarget: bigint | undefined =
      getModifiedTimeNs(targetEntryPath);

    if (!lastModifiedDateOfTarget) return true;

    const oldFilesFromCli: string[] = [
      ...this.context.cliOptions.oldFile,
      ...this.context.cliOptions.assumeOld,
    ];

    const newFilesFromCli: string[] = [
      ...this.context.cliOptions.newFile,
      ...this.context.cliOptions.assumeNew,
      ...this.context.cliOptions.whatIf,
    ];

    for (const preq of preqResolutions) {
      if (preq.origin.type === "target-rule") return true;
      const preqAbsolutePath =
        preq.origin.type === "cwd"
          ? preq.origin.absolutePath
          : preq.origin.type === "vpath"
            ? preq.origin.absolutePath
            : preq.origin.type === "absolute"
              ? preq.origin.absolutePath
              : (() => {
                  throw CbuildException.from({
                    errorType: ErrorType.PROCESS,
                    machineCode: MachineCode.DEPQ_NOT_FOUND,
                    message: `cbuild: No rule to make target '${preq.preqName}', needed by '${rule.target}'. Stop.`,
                    column: -1,
                    row: -1,
                  });
                })();

      const exist: boolean = fileExistbyAbsolutePath(preqAbsolutePath);
      if (!exist) {
        throw CbuildException.from({
          errorType: ErrorType.PROCESS,
          machineCode: MachineCode.DEPQ_NOT_FOUND,
          message: `cbuild: No rule to make target '${preq.preqName}', needed by '${rule.target}'. Stop.`,
          column: -1,
          row: -1,
        });
      }

      const isVeryOldFile = oldFilesFromCli.some(
        (oldFile) =>
          resolveAndGetAbsolutePath(process.cwd(), oldFile) ===
          preqAbsolutePath,
      );

      if (isVeryOldFile) continue;

      const lastModifiedDateOfPreq: bigint | undefined =
        getModifiedTimeNs(preqAbsolutePath);

      if (!lastModifiedDateOfPreq) return true;
      if (lastModifiedDateOfPreq > lastModifiedDateOfTarget) return true;

      // chedk if file is assumed as new file or not
      for (const newFile of newFilesFromCli) {
        const absPathOfNewFile = resolveAndGetAbsolutePath(
          process.cwd(),
          newFile,
        );

        if (absPathOfNewFile === preqAbsolutePath) return true;
      }
    }

    return false;
  }

  private async isOutOfDateAsync(
    rule: NormalRule,
    preqResolutions: PreqResolution<PreqMeta> | PreqResolution<PreqMeta>[],
  ): Promise<boolean> {
    if (Array.isArray(preqResolutions) === false) {
      return this.isOutOfDateAsync(rule, [preqResolutions]);
    }

    const targetEntryAbsolutePath: string = resolveAndGetAbsolutePath(
      process.cwd(),
      rule.target,
    );

    if (!(await fileExistbyAbsolutePathAsync(targetEntryAbsolutePath)))
      return true;

    const lastModifiedDateOfTarget: bigint | undefined =
      await getModifiedTimeNsAsync(targetEntryAbsolutePath);

    if (!lastModifiedDateOfTarget) return true;

    const oldFilesFromCli: string[] = [
      ...this.context.cliOptions.oldFile,
      ...this.context.cliOptions.assumeOld,
    ];

    const newFilesFromCli: string[] = [
      ...this.context.cliOptions.newFile,
      ...this.context.cliOptions.assumeNew,
      ...this.context.cliOptions.whatIf,
    ];

    for (const preq of preqResolutions) {
      if (preq.origin.type === "target-rule") return true;
      const preqAbsolutePath =
        preq.origin.type === "cwd"
          ? preq.origin.absolutePath
          : preq.origin.type === "vpath"
            ? preq.origin.absolutePath
            : preq.origin.type === "absolute"
              ? preq.origin.absolutePath
              : (() => {
                  throw CbuildException.from({
                    errorType: ErrorType.PROCESS,
                    machineCode: MachineCode.DEPQ_NOT_FOUND,
                    message: `cbuild: No rule to make target '${preq.preqName}', needed by '${rule.target}'. Stop.`,
                    column: -1,
                    row: -1,
                  });
                })();

      const exist: boolean =
        await fileExistbyAbsolutePathAsync(preqAbsolutePath);
      if (!exist) {
        throw CbuildException.from({
          errorType: ErrorType.PROCESS,
          machineCode: MachineCode.DEPQ_NOT_FOUND,
          message: `cbuild: No rule to make target '${preq.preqName}', needed by '${rule.target}'. Stop.`,
          column: -1,
          row: -1,
        });
      }

      const isVeryOldFile = oldFilesFromCli.some(
        (oldFile) =>
          resolveAndGetAbsolutePath(process.cwd(), oldFile) ===
          preqAbsolutePath,
      );

      if (isVeryOldFile) continue;

      const lastModifiedDateOfPreq: bigint | undefined =
        await getModifiedTimeNsAsync(preqAbsolutePath);

      if (!lastModifiedDateOfPreq) return true;
      if (lastModifiedDateOfPreq > lastModifiedDateOfTarget) return true;

      // chedk if file is assumed as new file or not
      for (const newFile of newFilesFromCli) {
        const absPathOfNewFile = resolveAndGetAbsolutePath(
          process.cwd(),
          newFile,
        );

        if (absPathOfNewFile === preqAbsolutePath) return true;
      }
    }
    return false;
  }

  public async resolveOutOfDateAsync(
    rule: NormalRule,
    preqs: PreqResolution<PreqMeta> | PreqResolution<PreqMeta>[],
  ) {
    if (Array.isArray(preqs)) {
      for (const preq of preqs) {
        if (await this.isOutOfDateAsync(rule, preq)) {
          preq.meta = {
            outOfDate: true,
          };
        } else {
          preq.meta = {
            outOfDate: false,
          };
        }
      }
    } else {
      if (await this.isOutOfDateAsync(rule, preqs)) {
        preqs.meta = {
          outOfDate: true,
        };
      } else {
        preqs.meta = {
          outOfDate: false,
        };
      }
    }
  }

  public resolveOutOfDateSync(
    rule: NormalRule,
    preqs: PreqResolution<PreqMeta> | PreqResolution<PreqMeta>[],
  ) {
    if (Array.isArray(preqs)) {
      for (const preq of preqs) {
        if (this.isOutOfDateSync(rule, preq)) {
          preq.meta = {
            outOfDate: true,
          };
        } else {
          preq.meta = {
            outOfDate: false,
          };
        }
      }
    } else {
      if (this.isOutOfDateSync(rule, preqs)) {
        preqs.meta = {
          outOfDate: true,
        };
      } else {
        preqs.meta = {
          outOfDate: false,
        };
      }
    }
  }
}
