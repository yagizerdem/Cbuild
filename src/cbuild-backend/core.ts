import { NormalRule } from "@cbuild-backend/model.js";
import {
  fileExistbyAbsolutePathAsync,
  getModifiedTimeNsAsync,
  resolveAndGetAbsolutePath,
} from "@cbuild-backend/file-utils.js";

export async function shouldRebuild(
  rule: NormalRule,
  baseDir: string,
): Promise<boolean> {
  const targetEntryPath: string = resolveAndGetAbsolutePath(
    baseDir,
    rule.target,
  );

  if (!(await fileExistbyAbsolutePathAsync(targetEntryPath))) return true;

  const lastModifiedDateOfTarget: bigint | undefined =
    await getModifiedTimeNsAsync(targetEntryPath);

  if (!lastModifiedDateOfTarget) return true;

  for (const preq of rule.prerequisites) {
    const preqAbsolutePath = resolveAndGetAbsolutePath(baseDir, preq);
    const exist: boolean = await fileExistbyAbsolutePathAsync(preqAbsolutePath);
    if (!exist) return true;

    const lastModifiedDateOfPreq: bigint | undefined =
      await getModifiedTimeNsAsync(preqAbsolutePath);

    if (!lastModifiedDateOfPreq) return true;
    if (lastModifiedDateOfPreq > lastModifiedDateOfTarget) return true;
  }

  return false;
}
