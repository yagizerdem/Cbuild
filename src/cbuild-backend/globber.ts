import { globSync } from "glob";

export function resolveGlobPattern(pattern: string): string[] {
  return globSync(pattern, {
    cwd: process.cwd(),
    noglobstar: true,
    nobrace: true,
    noext: true,
    nodir: false,
    windowsPathsNoEscape: false,
  });
}
