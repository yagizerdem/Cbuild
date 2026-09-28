import { CBuildOptions } from "@src/cli.js";
import packageJson from "../package.json" with { type: "json" };
import { resolveAndGetAbsolutePath } from "@src/file-utils.js";

export function handleCliOptions(options: CBuildOptions) {
  handleVersionCliOption(options);
}

function handleVersionCliOption(options: CBuildOptions) {
  if (options.version) {
    console.log(`CBuild ${packageJson.version}
Built for ${process.platform}-${process.arch}
Copyright (C) 2026 Yagiz Erdem
License MIT: MIT License
This is free software: you are free to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.`);
    process.exit(0);
  }

  handleDirectoryCliOption(options);
}

function handleDirectoryCliOption(options: CBuildOptions) {
  if (options.directory && options.directory.length > 0) {
    for (const dir of options.directory) {
      // resolve dir to an absolute path
      const cwdAbsPath = resolveAndGetAbsolutePath(process.cwd(), dir);
      process.chdir(cwdAbsPath);
    }
  }
}
