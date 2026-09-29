import { EnvVar } from "@cbuild-backend/core.js";

export function collectEnvVars() {
  const envVars: EnvVar[] = [];

  for (const key in process.env) {
    const value = process.env[key];
    if (value) {
      envVars.push({
        key,
        value,
      });
    }
  }

  return envVars;
}
