import {
  fileExistbyAbsolutePath,
  fileExistbyAbsolutePathAsync,
  getModifiedTimeNs,
  getModifiedTimeNsAsync,
  resolveAndGetAbsolutePath,
} from "@src/file-utils.js";
import { NormalRule } from "@cbuild-backend/model.js";
import { PreqResolution } from "@src/cbuild-backend/execution/preq-resolver.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";

export async function isOutOfDateAsync(
  rule: NormalRule,
  preqResolutions: PreqResolution[],
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
  preqResolutions: PreqResolution[],
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
