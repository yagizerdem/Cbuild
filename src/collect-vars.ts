import { EnvVar } from "@cbuild-backend/core.js";
import { CBuildOptions } from "@src/cli.js";

export function collectEnvVars(options: CBuildOptions) {
  const avoid = ["SHELL"];

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
