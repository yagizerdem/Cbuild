import fs from "fs/promises";

export async function readBuildFile(buildFilePath: string): Promise<string> {
  return await fs.readFile(buildFilePath, "utf-8");
}
