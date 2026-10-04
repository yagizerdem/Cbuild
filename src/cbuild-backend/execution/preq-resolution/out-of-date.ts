import {
  fileExistbyAbsolutePath,
  fileExistbyAbsolutePathAsync,
  getModifiedTimeNs,
  getModifiedTimeNsAsync,
  resolveAndGetAbsolutePath,
} from "@src/file-utils.js";
import {
  OutOfDateResolution,
  PreqResolution,
  TargetResolution,
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

  public isOutOfDateSync(
    target: TargetResolution,
    preqResolutions: PreqResolution | PreqResolution[],
  ): boolean {
    if (Array.isArray(preqResolutions) === false) {
      return this.isOutOfDateSync(target, [preqResolutions]);
    }

    if (target.origin.type === "not-found") return true;
    const targetAbsolutePath: string = target.origin.absolutePath;

    if (!fileExistbyAbsolutePath(targetAbsolutePath)) return true;

    const lastModifiedDateOfTarget: bigint | undefined =
      getModifiedTimeNs(targetAbsolutePath);

    if (lastModifiedDateOfTarget === undefined) return true;

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
                    message: `cbuild: No rule to make target '${preq.preqName}', needed by '${target.targetName}'. Stop.`,
                    column: -1,
                    row: -1,
                  });
                })();

      const exist: boolean = fileExistbyAbsolutePath(preqAbsolutePath);
      if (!exist) {
        throw CbuildException.from({
          errorType: ErrorType.PROCESS,
          machineCode: MachineCode.DEPQ_NOT_FOUND,
          message: `cbuild: No rule to make target '${preq.preqName}', needed by '${target.targetName}'. Stop.`,
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

      if (lastModifiedDateOfPreq === undefined) return true;
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

  public async isOutOfDateAsync(
    target: TargetResolution,
    preqResolutions: PreqResolution | PreqResolution[],
  ): Promise<boolean> {
    if (Array.isArray(preqResolutions) === false) {
      return this.isOutOfDateAsync(target, [preqResolutions]);
    }

    if (target.origin.type === "not-found") return true;
    const targetAbsolutePath: string = target.origin.absolutePath;

    if (!fileExistbyAbsolutePath(targetAbsolutePath)) return true;

    const lastModifiedDateOfTarget: bigint | undefined =
      await getModifiedTimeNsAsync(targetAbsolutePath);

    if (lastModifiedDateOfTarget === undefined) return true;

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
                    message: `cbuild: No rule to make target '${preq.preqName}', needed by '${target.targetName}'. Stop.`,
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
          message: `cbuild: No rule to make target '${preq.preqName}', needed by '${target.targetName}'. Stop.`,
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

      if (lastModifiedDateOfPreq === undefined) return true;
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
    targetResolution: TargetResolution,
    preqResolutions: PreqResolution[],
  ): Promise<OutOfDateResolution> {
    let isTargetOutOfDate = false;
    const outOfDatePreqs: PreqResolution[] = [];

    if (targetResolution.origin.type === "not-found") {
      isTargetOutOfDate = true;
    }

    if (targetResolution.origin.type !== "not-found") {
      const absPath = targetResolution.origin.absolutePath;
      if (!fileExistbyAbsolutePath(absPath)) {
        isTargetOutOfDate = true;
      }
    }

    for (let i = 0; i < preqResolutions.length; i++) {
      const preq = preqResolutions[i];
      const isPreqOutOfDate = await this.isOutOfDateAsync(targetResolution, [
        preq,
      ]);
      if (isPreqOutOfDate) {
        isTargetOutOfDate = true;
        outOfDatePreqs.push(preq);
      }
    }

    return {
      isTargetOutOfDate,
      resolvedPreqs: preqResolutions,
      resolvedTarget: targetResolution,
      outOfDatePreqs,
    } as OutOfDateResolution;
  }

  public resolveOutOfDateSync(
    targetResolution: TargetResolution,
    preqResolutions: PreqResolution[],
  ): OutOfDateResolution {
    let isTargetOutOfDate = false;

    if (targetResolution.origin.type === "not-found") {
      isTargetOutOfDate = true;
    }

    if (targetResolution.origin.type !== "not-found") {
      const absPath = targetResolution.origin.absolutePath;
      if (!fileExistbyAbsolutePath(absPath)) {
        isTargetOutOfDate = true;
      }
    }

    const outOfDatePreqs: PreqResolution[] = [];
    for (let i = 0; i < preqResolutions.length; i++) {
      const preq = preqResolutions[i];
      const isPreqOutOfDate = this.isOutOfDateSync(targetResolution, [preq]);
      if (isPreqOutOfDate) {
        isTargetOutOfDate = true;
        outOfDatePreqs.push(preq);
      }
    }

    return {
      isTargetOutOfDate,
      resolvedPreqs: preqResolutions,
      resolvedTarget: targetResolution,
      outOfDatePreqs,
    } as OutOfDateResolution;
  }
}
