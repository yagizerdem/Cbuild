import { Command, OptionValues, program } from "commander";
import { Tbackend } from "./type/tBackend.js";

function collect(value: string, previous: string[]) {
  return previous.concat(value);
}

const cli: Command = program.enablePositionalOptions(true);

cli.option("--sequential");
cli.option("--backend <string>");
cli.option(
  "-j , --jobs <number>",
  "Number of jobs to run concurrently",
  parseInt,
);
cli.option("-C, --directory <dir>", "Change directory", collect, []);
cli.option("-d", "Print all debugging information");
cli.option("--debug [options]", "Print debugging information");
cli.option(
  "-e, --environment-overrides",
  "Give environment variables precedence over variables from build files",
);

cli
  .option(
    "-f, --file <file>",
    "Read the specified file as a build file",
    collect,
    [],
  )
  .option(
    "--buildfile <file>",
    "Read the specified file as a build file",
    collect,
    [],
  );

cli.option(
  "-i, --ignore-errors",
  "Ignore all errors in commands executed to rebuild targets",
);
cli.option(
  "-I, --include-dir <dir>",
  "Specify a directory to search for included build files",
  collect,
  [],
);
cli.option("-k, --keep-going", "Continue as much as possible after an error");

cli
  .option(
    "-l, --load-average [load]",
    "Do not start new jobs if the system load average is at least the specified value",
    parseInt,
  )
  .option(
    "--max-load [load]",
    "Do not start new jobs if the system load average is at least the specified value",
    parseInt,
  );

cli
  .option(
    "-n, --dry-run",
    "Print commands that would be executed without executing them",
  )
  .option(
    "--just-print",
    "Print commands that would be executed without executing them",
  )
  .option(
    "--recon",
    "Print commands that would be executed without executing them",
  );

cli
  .option(
    "-o, --old-file <file>",
    "Do not rebuild the specified file and treat it as very old",
    collect,
    [],
  )
  .option(
    "--assume-old <file>",
    "Do not rebuild the specified file and treat it as very old",
    collect,
    [],
  );

cli.option(
  "-p, --print-data-base",
  "Print the database of rules and variable values after reading the build files",
);

cli.option(
  "-q, --question",
  "Do not run commands; exit with status 0 if targets are up to date, 1 if rebuilding is required, or 2 on error",
);

cli.option("-r, --no-builtin-rules", "Disable the built-in implicit rules");

cli.option(
  "-R, --no-builtin-variables",
  "Disable the built-in variables and built-in implicit rules",
);

cli
  .option("-s, --silent", "Do not print commands as they are executed")
  .option("--quiet", "Do not print commands as they are executed");

cli
  .option(
    "-S, --no-keep-going",
    "Cancel the effect of --keep-going and stop after an error",
  )
  .option(
    "--stop",
    "Cancel the effect of --keep-going and stop after an error",
  );

cli.option("-t, --touch", "Touch targets instead of running their commands");

cli.option("-v, --version", "Print version information and exit");

cli.option(
  "-w, --print-directory",
  "Print the working directory before and after processing",
);

cli.option("--no-print-directory", "Disable printing of the working directory");

cli
  .option(
    "-W, --what-if <file>",
    "Pretend that the specified file has just been modified",
    collect,
    [],
  )
  .option(
    "--new-file <file>",
    "Pretend that the specified file has just been modified",
    collect,
    [],
  )
  .option(
    "--assume-new <file>",
    "Pretend that the specified file has just been modified",
    collect,
    [],
  );

cli.option(
  "--warn-undefined-variables",
  "Warn when an undefined variable is referenced",
);

cli.argument("[args...]");

export default cli;

export interface CBuildOptions extends OptionValues {
  sequential?: boolean;
  backend?: Tbackend;
  jobs?: number;

  directory: string[];

  d?: boolean;
  debug?: string | boolean;

  environmentOverrides?: boolean;

  file?: string[];
  buildfile?: string[];

  ignoreErrors?: boolean;

  includeDir: string[];

  loadAverage?: number;
  maxLoad?: number;

  dryRun?: boolean;
  justPrint?: boolean;
  recon?: boolean;

  oldFile: string[];
  assumeOld: string[];

  printDataBase?: boolean;
  question?: boolean;

  builtinRules?: boolean;
  builtinVariables?: boolean;

  silent?: boolean;
  quiet?: boolean;

  keepGoing?: boolean;
  stop?: boolean;

  touch?: boolean;
  version?: boolean;

  printDirectory?: boolean;

  whatIf: string[];
  newFile: string[];
  assumeNew: string[];

  warnUndefinedVariables?: boolean;
}

export function normalizeOptions(options: CBuildOptions) {
  if (!options.sequential && options.jobs == 0) {
    options.jobs = 1;
  }

  if (!options.backend) {
    options.backend = "cbuild" as Tbackend;
  }
}
