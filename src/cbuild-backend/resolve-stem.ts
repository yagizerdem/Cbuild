export function resolveStem(pattern: string, candidate: string): string | null {
  const percentIndex = pattern.indexOf("%");

  if (percentIndex === -1) {
    return pattern === candidate ? "" : null;
  }

  const prefix = pattern.slice(0, percentIndex);
  const suffix = pattern.slice(percentIndex + 1);

  if (!candidate.startsWith(prefix)) {
    return null;
  }

  if (!candidate.endsWith(suffix)) {
    return null;
  }

  if (candidate.length < prefix.length + suffix.length) {
    return null;
  }

  return candidate.slice(prefix.length, candidate.length - suffix.length);
}
