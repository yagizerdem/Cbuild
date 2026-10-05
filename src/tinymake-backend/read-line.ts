import {
  BaseNode,
  TextPart,
  ValueNode,
  VarRefPart,
  RuleNode,
  createRuleNode,
  createValueNode,
  createTextPart,
  createVarRefPart,
} from "@tinymake-backend/node-types.js";

export type Pair<A, T> = {
  first: A;
  second: T;
};

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

export type ClassifiedLine = {
  line: string;
  row: number;
  processed: Pchar[];
  processedRaw: string;

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
};

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

    const cursor: Cursor = { current: 0 };
    while (!end(line.line, cursor)) {
      const ch = peek(line.line, cursor);
      const nextCh = next(line.line, cursor);

      if (ch == "$" && (nextCh == "(" || nextCh == "{") && !escaped) {
        processed.push({
          char: "$",
          col: cursor.current,
          escaped: false,
          row: line.row,
        });
        processed.push({
          char: nextCh,
          col: cursor.current,
          escaped: false,
          row: line.row,
        });
        // consume $( or ${
        advance(line.line, cursor);
        advance(line.line, cursor);
        continue;
      }

      if (ch == "$" && !escaped) {
        processed.push({
          char: ch,
          col: cursor.current,
          escaped,
          row: line.row,
        });
        escaped = true;
        advance(line.line, cursor);
        continue;
      }

      processed.push({
        char: ch,
        col: cursor.current,
        escaped,
        row: line.row,
      });
      escaped = false;
      advance(line.line, cursor);
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
        line: srcLine.line,
        row: srcLine.row,
        processed,
        processedRaw: processed.map((p) => p.char).join(""),
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
        processedRaw: pCharToRaw(processed),
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
        processedRaw: pCharToRaw(processed),
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
        processedRaw: pCharToRaw(processed),
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
        processedRaw: pCharToRaw(processed),
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
      processedRaw: pCharToRaw(processed),
      parsed: {
        type: "target-preq",
        targets: processed.slice(0, columnIndex),
        preqs: processed.slice(columnIndex + 1, processed.length),
      },
    };
  }
}

type Cursor = { current: number };

const EOF = "\0";

function toRawString(data: string | Pchar[]): string {
  if (Array.isArray(data) && data.length > 0 && typeof data == "object") {
    return data.map((pc) => pc.char).join("");
  } else {
    return data as string;
  }
}

function peek(data: string | Pchar[], cursor: Cursor): string {
  const raw = toRawString(data);

  if (cursor.current >= raw.length) {
    return EOF;
  }

  const ch = raw[cursor.current];
  return ch;
}

function next(data: string | Pchar[], cursor: Cursor): string {
  const raw = toRawString(data);

  if (cursor.current + 1 >= raw.length) {
    return EOF;
  }

  const ch = raw[cursor.current + 1];
  return ch;
}

function advance(data: string | Pchar[], cursor: Cursor): string {
  cursor.current = cursor.current + 1;
  return peek(data, cursor);
}

function end(data: string | Pchar[], cursor: Cursor): boolean {
  if (typeof data == "object") {
    return peekPchar(data, cursor).char === EOF;
  } else {
    return peek(data, cursor) === EOF;
  }
}

function peekPchar(data: Pchar[], cursor: Cursor): Pchar {
  if (cursor.current >= data.length) {
    return {
      char: EOF,
      col: -1,
      escaped: false,
      row: -1,
    };
  }

  const ch = data[cursor.current];
  return ch;
}

function nextPchar(data: Pchar[], cursor: Cursor): Pchar {
  if (cursor.current + 1 >= data.length) {
    return {
      char: EOF,
      col: -1,
      escaped: false,
      row: -1,
    };
  }

  const ch = data[cursor.current + 1];
  return ch;
}

function advancePchar(data: Pchar[], cursor: Cursor): Pchar {
  cursor.current = cursor.current + 1;
  return peekPchar(data, cursor);
}

type ParseContext = "rule" | "normal";

export class LineParser {
  private readonly classifiedLines: ClassifiedLine[] = [];
  public constructor(classifiedLines: ClassifiedLine[]) {
    this.classifiedLines = classifiedLines;
  }

  public parse(): BaseNode[] {
    const models: BaseNode[] = [];
    let context: ParseContext = "normal";
    let recentRuleHeader: Pair<ValueNode, ValueNode> | undefined;
    let recipesUnderRule: ValueNode[] = [];

    for (const line of this.classifiedLines) {
      if (line.parsed.type === "target-preq") {
        if (context === "normal") {
          recentRuleHeader = this.parseRuleHeader(line);
          context = "rule";
        } else {
          if (recentRuleHeader) {
            models.push(
              createRuleNode(
                recentRuleHeader.first,
                recentRuleHeader.second,
                recipesUnderRule,
              ),
            );
          }
          recentRuleHeader = undefined;
          recipesUnderRule = [];
          recentRuleHeader = this.parseRuleHeader(line);
          context = "rule";
        }
      }
    }

    if (context === "rule" && recentRuleHeader) {
      models.push(
        createRuleNode(
          recentRuleHeader.first,
          recentRuleHeader.second,
          recipesUnderRule,
        ),
      );
    }

    return models;
  }

  private parseRuleHeader(line: ClassifiedLine): Pair<ValueNode, ValueNode> {
    if (line.parsed.type !== "target-preq") {
      throw Error(
        "parseRuleHeader fucntion only parse lines classified as rule-header type",
      );
    }

    const targetValue = this.valueParser(
      line.parsed.targets,
      { current: 0 },
      0,
    );

    const preqValue = this.valueParser(line.parsed.preqs, { current: 0 }, 0);

    return {
      first: targetValue,
      second: preqValue,
    };
  }

  private valueParser(
    processed: Pchar[],
    cursor: { current: number },
    depth: number,
  ): ValueNode {
    const parts: (VarRefPart | TextPart)[] = [];

    while (!end(processed, cursor)) {
      const pch: Pchar = peekPchar(processed, cursor);

      // dispatch parse method
      if (pch.char == "$" && !pch.escaped) {
        const nextPch = nextPchar(processed, cursor);
        if (!nextPch.escaped) {
          depth++;
          parts.push(this.varRefParser(processed, cursor, depth));
        } else {
          if (
            nextPch.char === "$" ||
            nextPch.char === "{" ||
            nextPch.char === "("
          ) {
            parts.push(this.textPartParser(processed, cursor, depth));
          } else {
            depth++;
            parts.push(this.varRefParser(processed, cursor, depth));
          }
        }
      } else {
        parts.push(this.textPartParser(processed, cursor, depth));
      }

      if (depth > 0) break;
    }

    return {
      parts,
    };
  }

  private varRefParser(
    processed: Pchar[],
    cursor: { current: number },
    depth: number,
  ): VarRefPart {
    advance(processed, cursor); // consume $
    const pch = peekPchar(processed, cursor);

    // single char variable
    if (pch.char !== "{" && pch.char !== "(") {
      const valueWithTextPart = createVarRefPart(
        createValueNode([createTextPart(pch.char)]),
      );
      advance(processed, cursor); // consume char
      return valueWithTextPart;
    }

    advance(processed, cursor); // consume Lparen ( {}
    const value: ValueNode = this.valueParser(processed, cursor, depth);

    const closingParen = peekPchar(processed, cursor);
    if (closingParen.char != "}" && closingParen.char != ")") {
      throw new Error("shoudl close with paren");
    }

    if (pch.char == "(" && closingParen.char != ")") {
      throw new Error("shoudl close with )");
    }

    if (pch.char == "{" && closingParen.char != "}") {
      throw new Error("shoudl close with }");
    }

    advance(processed, cursor); // consume Rparen ) }

    return createVarRefPart(value);
  }

  private textPartParser(
    process: Pchar[],
    cursor: Cursor,
    depth: number,
  ): TextPart {
    let text = "";
    while (!end(process, cursor)) {
      const pch = peekPchar(process, cursor);
      if (pch.escaped) {
        text += pch.char;
        advance(process, cursor);
      } else if (pch.char === "$") {
        break;
      } else if (pch.char === ")" || (pch.char == "}" && depth > 0)) {
        break;
      } else {
        text += pch.char;
        advance(process, cursor);
      }
    }

    return createTextPart(text);
  }
}
