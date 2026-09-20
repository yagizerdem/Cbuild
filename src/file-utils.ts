import * as path from "path";
import * as fsPromises from "fs/promises";
import * as fs from "fs";

export function resolveAndGetAbsolutePath(
  baseDir: string,
  relativePath: string,
): string {
  const absolutePath = path.resolve(baseDir, relativePath);
  return absolutePath;
}

export async function fileExistbyAbsolutePathAsync(
  absolutePath: string,
): Promise<boolean> {
  try {
    await fsPromises.access(absolutePath);
    return true;
  } catch {
    return false;
  }
}

export function fileExistbyAbsolutePath(absolutePath: string): boolean {
  return fs.existsSync(absolutePath);
}

export async function getModifiedDateAsync(
  fileAbsolutePath: string,
): Promise<Date | undefined> {
  try {
    const stats = await fsPromises.stat(fileAbsolutePath);
    return stats.mtime;
  } catch (error) {
    return undefined;
  }
}

function isMissingPath(error: unknown): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    (error.code === "ENOENT" || error.code === "ENOTDIR")
  );
}

export async function getFileStatsAsync(
  filePath: string,
): Promise<fs.BigIntStats | undefined> {
  try {
    return await fsPromises.stat(filePath, { bigint: true });
  } catch (error) {
    if (isMissingPath(error)) return undefined;
    throw error;
  }
}

export function getFileStats(filePath: string): fs.BigIntStats | undefined {
  try {
    return fs.statSync(filePath, { bigint: true });
  } catch (error) {
    if (isMissingPath(error)) return undefined;

    throw error;
  }
}

export function getModifiedTimeNs(filePath: string): bigint | undefined {
  return getFileStats(filePath)?.mtimeNs;
}

export async function getModifiedTimeNsAsync(
  filePath: string,
): Promise<bigint | undefined> {
  return (await getFileStatsAsync(filePath))?.mtimeNs;
}

export async function isFileAsync(filePath: string): Promise<boolean> {
  return (await getFileStatsAsync(filePath))?.isFile() ?? false;
}

export async function isDirectoryAsync(filePath: string): Promise<boolean> {
  return (await getFileStatsAsync(filePath))?.isDirectory() ?? false;
}

export interface RebuildOptions {
  baseDir?: string;
  phony?: boolean;
  /** Pass only normal prerequisites; order-only prerequisites do not affect age. */
  prerequisites: readonly string[];
  phonyPrerequisites?: readonly string[];
}

export interface RebuildStatus {
  needsRebuild: boolean;
  reason:
    | "phony-target"
    | "missing-target"
    | "phony-prerequisite"
    | "missing-prerequisite"
    | "newer-prerequisite"
    | "up-to-date";
  prerequisite?: string;
}

/** Check after prerequisite builds complete. A missing prerequisite still needs
 * rule resolution by the build scheduler; this helper cannot decide buildability.
 */
export async function getRebuildStatusAsync(
  target: string,
  options: RebuildOptions,
): Promise<RebuildStatus> {
  if (options.phony) return { needsRebuild: true, reason: "phony-target" };
  const baseDir = options.baseDir ?? process.cwd();
  const targetTime = await getModifiedTimeNsAsync(
    path.resolve(baseDir, target),
  );
  if (targetTime === undefined)
    return { needsRebuild: true, reason: "missing-target" };
  const phony = new Set(options.phonyPrerequisites);
  for (const prerequisite of options.prerequisites) {
    if (phony.has(prerequisite)) {
      return { needsRebuild: true, reason: "phony-prerequisite", prerequisite };
    }
    const time = await getModifiedTimeNsAsync(
      path.resolve(baseDir, prerequisite),
    );
    if (time === undefined) {
      return {
        needsRebuild: true,
        reason: "missing-prerequisite",
        prerequisite,
      };
    }
    if (time > targetTime) {
      return { needsRebuild: true, reason: "newer-prerequisite", prerequisite };
    }
  }
  return { needsRebuild: false, reason: "up-to-date" };
}

export async function ensureDirectoryAsync(directory: string): Promise<void> {
  await fsPromises.mkdir(directory, { recursive: true });
}

export async function ensureParentDirectoryAsync(
  filePath: string,
): Promise<void> {
  await ensureDirectoryAsync(path.dirname(filePath));
}

/** Creates a missing file without truncating existing contents. Parent must exist. */
export async function touchFileAsync(
  filePath: string,
  time = new Date(),
): Promise<void> {
  const handle = await fsPromises.open(filePath, "a");
  try {
    await handle.utimes(time, time);
  } finally {
    await handle.close();
  }
}

/** Preserves mtime if generated contents have not changed. Returns true on write.
 * Parent must exist. Writes are not atomic; serialize writers for the same path.
 */
export async function writeFileIfChangedAsync(
  filePath: string,
  content: string | Uint8Array,
): Promise<boolean> {
  const next = Buffer.from(content);
  try {
    if ((await fsPromises.readFile(filePath)).equals(next)) return false;
  } catch (error) {
    if (!isMissingPath(error)) throw error;
  }
  await fsPromises.writeFile(filePath, next);
  return true;
}

/** Unlinks a file or symlink, never recursively removes a directory. */
export async function removeFileIfExistsAsync(
  filePath: string,
): Promise<boolean> {
  try {
    await fsPromises.unlink(filePath);
    return true;
  } catch (error) {
    if (isMissingPath(error)) return false;
    throw error;
  }
}

/** Searches directories in order, useful for prerequisite lookup via VPATH.
 * This only performs filesystem lookup, not make pattern/rule resolution.
 */
export async function findFileInDirectoriesAsync(
  fileName: string,
  directories: readonly string[],
  baseDir = process.cwd(),
): Promise<string | undefined> {
  if (path.isAbsolute(fileName)) {
    return (await isFileAsync(fileName)) ? path.normalize(fileName) : undefined;
  }
  for (const directory of directories) {
    const candidate = path.resolve(baseDir, directory, fileName);
    if (await isFileAsync(candidate)) return candidate;
  }
  return undefined;
}
