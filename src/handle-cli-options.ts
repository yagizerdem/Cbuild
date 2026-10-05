import { CBuildOptions } from "@src/cli.js";
import packageJson from "../package.json" with { type: "json" };
import {
  fileExistbyAbsolutePath,
  resolveAndGetAbsolutePath,
} from "@src/file-utils.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { Tbackend } from "@src/type/tBackend.js";

export function handleCliOptions(options: CBuildOptions) {
  handleVersionCliOption(options);
  handleDirectoryCliOption(options);
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

export function resolveBuildFilePath(options: CBuildOptions): string[] {
  const buildFiles = [...(options.file || []), ...(options.buildfile || [])];
  const resolvedBuildFilePaths: string[] = [];

  // use default buildFile path
  if (buildFiles.length === 0) {
    const defaultFileNames = ["CBuildfile", "cbuildfile", "Buildfile"];
    for (const buildFile of defaultFileNames) {
      const resolvedBuildFilePath = resolveAndGetAbsolutePath(
        process.cwd(),
        buildFile,
      );

      if (fileExistbyAbsolutePath(resolvedBuildFilePath)) {
        return [resolvedBuildFilePath];
      }
    }
    throw CbuildException.from({
      row: -1,
      column: -1,
      errorType: ErrorType.PROCESS,
      machineCode: MachineCode.BUILD_FILE_NOT_FOUND,
      message: "cbuild: *** No targets specified and no makefile found.  Stop.",
    });
  } else {
    for (const buildFile of buildFiles) {
      const resolvedBuildFilePath = resolveAndGetAbsolutePath(
        process.cwd(),
        buildFile,
      );

      if (!fileExistbyAbsolutePath(resolvedBuildFilePath)) {
        throw CbuildException.from({
          message: `cbuild: ${buildFile}: No such file or directory`,
          column: -1,
          row: -1,
          errorType: ErrorType.PROCESS,
          machineCode: MachineCode.BUILD_FILE_NOT_FOUND,
        });
      }

      resolvedBuildFilePaths.push(resolvedBuildFilePath);
    }
  }

  return resolvedBuildFilePaths;
}

export function normalizeOptions(options: CBuildOptions) {
  if (!options.sequential && options.jobs == 0) {
    options.jobs = 1;
  }

  if (!options.backend) {
    options.backend = "cbuild" as Tbackend;
  }
}
