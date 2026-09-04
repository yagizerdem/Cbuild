import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

(async () => {
  const generatedDirectory = "src/parser";
  const generatedFiles = await readdir(generatedDirectory);

  for (const fileName of generatedFiles) {
    if (!fileName.endsWith(".ts")) {
      continue;
    }

    const filePath = join(generatedDirectory, fileName);
    const source = await readFile(filePath, "utf8");

    if (source.startsWith("// @ts-nocheck")) {
      continue;
    }

    await writeFile(filePath, `// @ts-nocheck\n${source}`);
  }
})();
