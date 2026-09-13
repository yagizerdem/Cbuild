import { Cursor } from "@src/cursor.js";

function consumePchar(
  program: string,
  state: Cursor.CursorState,
  context: Context,
): Cursor.Pchar<Context> {
  const ch = Cursor.peek(program, state);

  const pch = new Cursor.Pchar<Context>(ch);
  pch.row = state.row;
  pch.col = state.col;
  pch.meta = context;

  Cursor.advance(program, state);

  if (Cursor.stopSet(ch, Cursor.CharMask.Newline)) {
    state.row++;
    state.col = 0;
  } else {
    state.col++;
  }

  return pch;
}

function consumeHook(
  program: string,
  state: Cursor.CursorState,
): Cursor.Pchar<Context>[] {
  const result: Cursor.Pchar<Context>[] = [];
  const startRow = state.row;
  const startCol = state.col;

  let depth = 0;
  let opened = false;
  let quote: string | null = null;
  let escaped = false;

  while (Cursor.peek(program, state) !== Cursor.END) {
    const ch = Cursor.peek(program, state);
    result.push(consumePchar(program, state, "HOOK"));

    if (quote !== null) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === quote) {
        quote = null;
      }

      continue;
    }

    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }

    if (ch === "{") {
      opened = true;
      depth++;
    } else if (ch === "}" && opened) {
      depth--;

      if (depth === 0) {
        return result;
      }
    }
  }

  throw new Error(`Unclosed hook block at ${startRow}:${startCol + 1}`);
}

type Context = "HOOK" | "NORMAL";

export function mapToPchar(program: string): Cursor.Pchar<Context>[] {
  const state = new Cursor.CursorState();

  state.row = 1;
  state.col = 0;

  const result: Cursor.Pchar<Context>[] = [];
  const hookPattern = /^hook[ \t]*\{/;

  let offset = 0;
  let atStatementStart = true;

  while (Cursor.peek(program, state) !== Cursor.END) {
    const ch = Cursor.peek(program, state);

    if (atStatementStart && hookPattern.test(program.slice(offset))) {
      const hook = consumeHook(program, state);
      result.push(...hook);

      offset += hook.length;
      atStatementStart = false;
      continue;
    }

    result.push(consumePchar(program, state, "NORMAL"));
    offset++;

    if (Cursor.stopSet(ch, Cursor.CharMask.Newline)) {
      atStatementStart = true;
    } else if (ch !== " " && ch !== "\t") {
      atStatementStart = false;
    }
  }

  return result;
}

function deepCopyPchar<Context>(
  pch: Cursor.Pchar<Context>,
): Cursor.Pchar<Context> {
  return JSON.parse(JSON.stringify(pch));
}

export function mergeContinuation(
  pchars: Cursor.Pchar<Context>[],
): Cursor.Pchar<Context>[] {
  const result: Cursor.Pchar<Context>[] = [];
  const state = new Cursor.CursorState();
  state.processedRow = 1; // antlr line  number starts with 1
  state.processedCol = 0; // antlr column number starts with 0

  while (Cursor.peekChar(pchars, state.current) !== Cursor.END) {
    const pch = Cursor.peek(pchars, state.current);
    if (Cursor.stopSet(pch, Cursor.CharMask.BackSlash)) {
      if (
        Cursor.stopSet(
          Cursor.peekNext(pchars, state.current),
          Cursor.CharMask.Newline,
        )
      ) {
        state.current += 2; // consume contiunation and merge lines
        state.processedCol = 0; // reset column after merging lines
        state.processedRow++; // increment row after merging lines
        continue;
      }
    }

    const deepCopy = deepCopyPchar(pch);
    deepCopy.processedCol = state.processedCol;
    deepCopy.processedRow = state.processedRow;
    result.push(deepCopy as Cursor.Pchar<Context>);

    if (Cursor.stopSet(pch, Cursor.CharMask.Newline)) {
      state.processedCol = 0;
      state.processedRow++;
    } else {
      state.processedCol++;
    }
    state.current++;
  }

  return result;
}

export function preprocess(program: string): Cursor.Pchar<Context>[] {
  if (!program.trim().endsWith(Cursor.END)) {
    program += Cursor.END;
  }

  const mapped = mapToPchar(program);
  const result = mergeContinuation(mapped);

  if (result.at(result.length - 1)?.c == Cursor.END) {
    result.pop();
  }
  return result;
}

export function pCharBufferToString(pchars: Cursor.Pchar<Context>[]): string {
  return pchars.map((pch) => pch.c).join("");
}
