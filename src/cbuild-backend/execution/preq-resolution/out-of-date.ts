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

export class OutOfDateChecker {
  private readonly rule: NormalRule;
  private readonly preqResolutions: PreqResolution<PreqMeta>[];

  constructor(rule: NormalRule, preqResolutions: PreqResolution<PreqMeta>[]) {
    this.rule = rule;
    this.preqResolutions = preqResolutions;
  }

  public isOutOfDate(): boolean {
    return isOutOfDateSync(this.rule, this.preqResolutions);
  }

  public async isOutOfDateAsync(): Promise<boolean> {
    return await isOutOfDateAsync(this.rule, this.preqResolutions);
  }

  public isTargetOutOfDate(): boolean {
    return isOutOfDateSync(this.rule, this.preqResolutions);
  }

  public async isTargetOutOfDateAsync(): Promise<boolean> {
    return await isOutOfDateAsync(this.rule, this.preqResolutions);
  }

  public async resolveOutOfDateAsync(
    rule: NormalRule,
    preqs: PreqResolution<PreqMeta> | PreqResolution<PreqMeta>[],
  ) {
    if (Array.isArray(preqs)) {
      for (const preq of preqs) {
        if (await isTargetOutOfDateAsync(rule, preq)) {
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
      if (await isTargetOutOfDateAsync(rule, preqs)) {
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
        if (isTargetOutOfDateSync(rule, preq)) {
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
      if (isTargetOutOfDateSync(rule, preqs)) {
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

export async function isOutOfDateAsync(
  rule: NormalRule,
  preqResolutions: PreqResolution<PreqMeta>[],
): Promise<boolean> {
  const targetEntryAbsolutePath: string = resolveAndGetAbsolutePath(
    process.cwd(),
    rule.target,
  );

  if (!(await fileExistbyAbsolutePathAsync(targetEntryAbsolutePath)))
    return true;

  const lastModifiedDateOfTarget: bigint | undefined =
    await getModifiedTimeNsAsync(targetEntryAbsolutePath);

  if (!lastModifiedDateOfTarget) return true;

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

    const exist: boolean = await fileExistbyAbsolutePathAsync(preqAbsolutePath);
    if (!exist) {
      throw CbuildException.from({
        errorType: ErrorType.PROCESS,
        machineCode: MachineCode.DEPQ_NOT_FOUND,
        message: `cbuild: No rule to make target '${preq.preqName}', needed by '${rule.target}'. Stop.`,
        column: -1,
        row: -1,
      });
    }

    const lastModifiedDateOfPreq: bigint | undefined =
      await getModifiedTimeNsAsync(preqAbsolutePath);

    if (!lastModifiedDateOfPreq) return true;
    if (lastModifiedDateOfPreq > lastModifiedDateOfTarget) return true;
  }
  return false;
}

export function isOutOfDateSync(
  rule: NormalRule,
  preqResolutions: PreqResolution<PreqMeta>[],
): boolean {
  const targetEntryPath: string = resolveAndGetAbsolutePath(
    process.cwd(),
    rule.target,
  );

  if (!fileExistbyAbsolutePath(targetEntryPath)) return true;

  const lastModifiedDateOfTarget: bigint | undefined =
    getModifiedTimeNs(targetEntryPath);

  if (!lastModifiedDateOfTarget) return true;

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

    const lastModifiedDateOfPreq: bigint | undefined =
      getModifiedTimeNs(preqAbsolutePath);

    if (!lastModifiedDateOfPreq) return true;
    if (lastModifiedDateOfPreq > lastModifiedDateOfTarget) return true;
  }

  return false;
}

export async function isTargetOutOfDateAsync(
  rule: NormalRule,
  preq: PreqResolution<PreqMeta>,
): Promise<boolean> {
  const targetAbsolutePath = resolveAndGetAbsolutePath(
    process.cwd(),
    rule.target,
  );

  if (!(await fileExistbyAbsolutePathAsync(targetAbsolutePath))) {
    return true;
  }

  const targetModifiedTime = await getModifiedTimeNsAsync(targetAbsolutePath);

  if (!targetModifiedTime) {
    return true;
  }

  if (preq.origin.type === "target-rule") {
    return true;
  }

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

  if (!(await fileExistbyAbsolutePathAsync(preqAbsolutePath))) {
    throw CbuildException.from({
      errorType: ErrorType.PROCESS,
      machineCode: MachineCode.DEPQ_NOT_FOUND,
      message: `cbuild: No rule to make target '${preq.preqName}', needed by '${rule.target}'. Stop.`,
      column: -1,
      row: -1,
    });
  }

  const preqModifiedTime = await getModifiedTimeNsAsync(preqAbsolutePath);

  if (!preqModifiedTime) {
    return true;
  }

  return preqModifiedTime > targetModifiedTime;
}

export function isTargetOutOfDateSync(
  rule: NormalRule,
  preq: PreqResolution<PreqMeta>,
): boolean {
  const targetAbsolutePath = resolveAndGetAbsolutePath(
    process.cwd(),
    rule.target,
  );

  if (!fileExistbyAbsolutePath(targetAbsolutePath)) {
    return true;
  }

  const targetModifiedTime = getModifiedTimeNs(targetAbsolutePath);

  if (!targetModifiedTime) {
    return true;
  }

  if (preq.origin.type === "target-rule") {
    return true;
  }

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

  if (!fileExistbyAbsolutePath(preqAbsolutePath)) {
    throw CbuildException.from({
      errorType: ErrorType.PROCESS,
      machineCode: MachineCode.DEPQ_NOT_FOUND,
      message: `cbuild: No rule to make target '${preq.preqName}', needed by '${rule.target}'. Stop.`,
      column: -1,
      row: -1,
    });
  }

  const preqModifiedTime = getModifiedTimeNs(preqAbsolutePath);

  if (!preqModifiedTime) {
    return true;
  }

  return preqModifiedTime > targetModifiedTime;
}
