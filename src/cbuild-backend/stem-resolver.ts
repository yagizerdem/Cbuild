import { Cursor } from "@src/cursor.js";

type ParsedStemPattern = {
  prefix: string;
  suffix: string;
  hasStem: boolean;
};

function parsePattern(pattern: string): ParsedStemPattern {
  const state = new Cursor.CursorState();

  let prefix = "";
  let suffix = "";
  let hasStem = false;

  const append = (value: string): void => {
    if (hasStem) {
      suffix += value;
    } else {
      prefix += value;
    }
  };

  while (!Cursor.stopSet(Cursor.peek(pattern, state), Cursor.CharMask.End)) {
    const current = Cursor.peek(pattern, state);

    if (Cursor.stopSet(current, Cursor.CharMask.BackSlash)) {
      let backslashCount = 0;

      while (
        Cursor.stopSet(Cursor.peek(pattern, state), Cursor.CharMask.BackSlash)
      ) {
        Cursor.advance(pattern, state);
        backslashCount++;
      }

      const next = Cursor.peek(pattern, state);

      if (!Cursor.stopSet(next, Cursor.CharMask.Percent)) {
        append("\\".repeat(backslashCount));
        continue;
      }

      append("\\".repeat(Math.floor(backslashCount / 2)));

      if (backslashCount % 2 === 1) {
        Cursor.advance(pattern, state);
        append("%");
        continue;
      }

      Cursor.advance(pattern, state);

      if (!hasStem) {
        hasStem = true;
      } else {
        suffix += "%";
      }

      continue;
    }

    if (Cursor.stopSet(current, Cursor.CharMask.Percent)) {
      Cursor.advance(pattern, state);

      if (!hasStem) {
        hasStem = true;
      } else {
        suffix += "%";
      }

      continue;
    }

    append(Cursor.advance(pattern, state));
  }

  return {
    prefix,
    suffix,
    hasStem,
  };
}

export class StemResolver {
  public resolveStem(pattern: string, candidate: string): string | null {
    const parsed = parsePattern(pattern);

    if (!parsed.hasStem) {
      return parsed.prefix === candidate ? "" : null;
    }

    if (!candidate.startsWith(parsed.prefix)) {
      return null;
    }

    if (!candidate.endsWith(parsed.suffix)) {
      return null;
    }

    const stemLength =
      candidate.length - parsed.prefix.length - parsed.suffix.length;

    if (stemLength < 0) {
      return null;
    }

    return candidate.slice(
      parsed.prefix.length,
      parsed.prefix.length + stemLength,
    );
  }

  public hasStem(pattern: string): boolean {
    return parsePattern(pattern).hasStem;
  }

  public match(pattern: string, candidate: string): boolean {
    return this.resolveStem(pattern, candidate) !== null;
  }
}
