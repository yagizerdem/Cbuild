import { BaseNode } from "@tinymake-backend/node-types.js";

export type Pchar = {
  char: string;
  escaped: boolean;
  row: number;
  col: number;
};

type Line = {
  line: string;
  row: number;
};

export type LineType =
  | "recipe"
  | "target-preq"
  | "immediate-assignment"
  | "recursive-assignment";

export type ClassifiedLine =
  | {
      processed: Pchar[];
      processedLine: string; // raw version after escape handling

      parsed:
        | {
            type: Extract<LineType, "recipe">;
          }
        | {
            type: Extract<
              LineType,
              "immediate-assignment" | "recursive-assignment"
            >;
            left: Pchar[];
            right: Pchar[];
          }
        | {
            type: Extract<LineType, "target-preq">;
            targets: Pchar[];
            preqs: Pchar[];
          };
    }
  | Line;

function isSpace(str: string): boolean {
  return /^\s+$/.test(str);
}

function isBlank(str: string): boolean {
  return /^(\s|\n)+$/.test(str);
}

function isEmpty(str: string) {
  return str.length == 0;
}

function isAlphabetic(ch: string): boolean {
  return /[a-zA-Z]/.test(ch);
}

function isAlphanumeric(ch: string): boolean {
  return /[a-zA-Z0-9]/.test(ch);
}

export class LineReader {
  private readonly program: string;
  constructor(program: string) {
    this.program = program;
  }

  public read(): ClassifiedLine[] {
    const classifiedLines: ClassifiedLine[] = [];
    const lines = this.splitLines();

    for (const line of lines) {
      classifiedLines.push(this.classifyLines(line));
    }

    return classifiedLines;
  }

  private splitLines(): Line[] {
    const lines: Line[] = [];
    let row = 1;
    let cursor = 0;
    for (let i = 0; i < this.program.length; i++) {
      const char = this.program[i];
      if (char === "\n") {
        lines.push({ line: this.program.slice(cursor, i), row });
        row++;
        cursor = i + 1;
      }
    }

    // normalize lines
    const normalized = lines.filter(
      (line) => !isBlank(line.line) && !isEmpty(line.line),
    );

    return normalized;
  }

  private processLine(line: Line): Pchar[] {
    const processed: Pchar[] = [];
    let escaped = false;
    for (let i = 0; i < line.line.length; i++) {
      if (line.line[i] == "$") {
        escaped = true;
        continue;
      }

      processed.push({
        char: line.line[i],
        col: i,
        escaped,
        row: line.row,
      });

      escaped = false;
    }

    return processed;
  }

  // find index of pattern
  private findPattern(
    line: Pchar[],
    pattern: string,
    ignoreEscape = false,
  ): number {
    const cursor = { current: 0 };
    type Cursor = typeof cursor;

    const peek = (cursor: Cursor) => {
      if (cursor.current >= line.length) {
        return "\0";
      }
      return line.at(cursor.current);
    };

    const advance = (cursor: Cursor) => {
      const next = cursor.current + 1;
      cursor.current = next;
      if (next >= line.length) {
        return "\0";
      }

      const p = peek(cursor);
      return p;
    };

    const end = (cursor: Cursor) => {
      return peek(cursor) == "\0";
    };

    while (!end(cursor)) {
      let cursorPosition = cursor.current;
      while (
        !end({ current: cursorPosition }) &&
        cursorPosition - cursor.current < pattern.length
      ) {
        if (
          line[cursorPosition].char != pattern[cursorPosition - cursor.current]
        ) {
          break;
        }

        if (line[cursorPosition].escaped && !ignoreEscape) {
          break;
        }
        cursorPosition++;
      }

      if (cursorPosition - cursor.current == pattern.length) {
        return cursor.current;
      }

      advance(cursor);
    }

    return -1;
  }

  private classifyLines(srcLine: Line): ClassifiedLine {
    const processed = this.processLine(srcLine); // handle escapes

    const pCharToRaw = (pChar: Pchar[]) => {
      return pChar.map((p) => p.char).join("");
    };

    if (processed.length == 0) {
      throw Error("cannot classify empyt line");
    }

    // recipe
    if (processed[0].char == "\t" && !processed[0].escaped) {
      return {
        ...srcLine,
        processed,
        parsed: {
          type: "recipe",
        },
      };
    }

    const columnIndex = this.findPattern(processed, ":");
    const simpleAssignmentIndex = this.findPattern(processed, ":=");
    const recursiveAssignmentIndex = this.findPattern(processed, "=");

    if (
      columnIndex == -1 &&
      simpleAssignmentIndex == -1 &&
      recursiveAssignmentIndex == -1
    ) {
      throw Error("invalid rule");
    }

    const assignmentIndex = Math.min(
      simpleAssignmentIndex,
      recursiveAssignmentIndex,
    );

    // target-preq
    if (simpleAssignmentIndex == -1 && recursiveAssignmentIndex == -1) {
      return {
        ...srcLine,
        processed,
        processedLine: pCharToRaw(processed),
        parsed: {
          type: "target-preq",
          targets: processed.slice(0, columnIndex),
          preqs: processed.slice(columnIndex + 1, processed.length),
        },
      };
    }

    // assignment
    if (columnIndex == -1) {
      return {
        ...srcLine,
        processed,
        processedLine: pCharToRaw(processed),
        parsed: {
          type:
            recursiveAssignmentIndex != -1
              ? "recursive-assignment"
              : "immediate-assignment",
          left: processed.slice(
            0,
            recursiveAssignmentIndex != -1
              ? recursiveAssignmentIndex
              : simpleAssignmentIndex,
          ),
          right: processed.slice(
            (recursiveAssignmentIndex != -1
              ? recursiveAssignmentIndex
              : simpleAssignmentIndex) +
              (recursiveAssignmentIndex != -1 ? 1 : 2),
            processed.length,
          ),
        },
      };
    }

    // assignment
    if (assignmentIndex < columnIndex) {
      return {
        ...srcLine,
        processed,
        processedLine: pCharToRaw(processed),
        parsed: {
          type:
            recursiveAssignmentIndex != -1
              ? "recursive-assignment"
              : "immediate-assignment",
          left: processed.slice(
            0,
            recursiveAssignmentIndex != -1
              ? recursiveAssignmentIndex
              : simpleAssignmentIndex,
          ),
          right: processed.slice(
            (recursiveAssignmentIndex != -1
              ? recursiveAssignmentIndex
              : simpleAssignmentIndex) +
              +(recursiveAssignmentIndex != -1 ? 1 : 2),
            processed.length,
          ),
        },
      };
    }

    // := and : has same starting idnex so := has more piority bcs it is longest common substring
    if (simpleAssignmentIndex <= columnIndex) {
      return {
        ...srcLine,
        processed,
        processedLine: pCharToRaw(processed),
        parsed: {
          type: "immediate-assignment",
          left: processed.slice(0, simpleAssignmentIndex),
          right: processed.slice(simpleAssignmentIndex + 2, processed.length),
        },
      };
    }

    // target preq
    return {
      ...srcLine,
      processed,
      processedLine: pCharToRaw(processed),
      parsed: {
        type: "target-preq",
        targets: processed.slice(0, columnIndex),
        preqs: processed.slice(columnIndex + 1, processed.length),
      },
    };
  }
}

type Cursor = { current: number };

export class LineParser {
  private readonly classifiedLines: ClassifiedLine[] = [];
  public constructor(classifiedLines: ClassifiedLine[]) {
    this.classifiedLines = classifiedLines;
  }

  public parse(): BaseNode[] {
    const models: BaseNode[] = [];

    return models;
  }

  private valueParser() {}
}
