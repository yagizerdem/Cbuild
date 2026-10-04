import { EnvVar, CliVar } from "@cbuild-backend/core.js";
import { CBuildOptions } from "@src/cli.js";

export function collectEnvVars(options: CBuildOptions) {
  const avoid = ["SHELL", ".SHELLFLAGS"];

  const envVars: EnvVar[] = [];

  for (const key in process.env) {
    const value = process.env[key];
    if (value) {
      // avoid env SHELL var for better UX
      if (avoid.includes(key) && !options.environmentOverrides) {
        continue;
      }

      envVars.push({
        key,
        value,
      });
    }
  }

  return envVars;
}

export function getAssignmentArgs(args: string[]) {
  return args.filter((arg) => arg.includes("="));
}

export function getTargetArgs(args: string[]) {
  return args.filter((arg) => !arg.includes("="));
}

export function collectCliVars(args: string[]) {
  const cliVars: CliVar[] = [];

  const assignmentArgs = getAssignmentArgs(args);
  for (const arg of assignmentArgs) {
    const [key, value] = [
      arg.substring(0, arg.indexOf("=")),
      arg.substring(arg.indexOf("=") + 1),
    ];
    cliVars.push({
      key,
      value,
    });
  }

  return cliVars;
}
