import {
  BaseNode,
  TextPart,
  ValueNode,
  VarRefPart,
  createRuleNode,
  createValueNode,
  createTextPart,
  createVarRefPart,
  AssignmentNode,
  createAssignmentNode,
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
        assignmentOp: string;
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

    if (cursor < this.program.length) {
      lines.push({
        line: this.program.slice(cursor, this.program.length),
        row,
      });
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

    const createTargetPreqLine = (): ClassifiedLine => {
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
    };

    const createAssignmentLine = (): ClassifiedLine => {
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
          assignmentOp: recursiveAssignmentIndex != -1 ? "=" : ":=",
        },
      };
    };

    // target-preq
    if (simpleAssignmentIndex == -1 && recursiveAssignmentIndex == -1) {
      return createTargetPreqLine();
    }

    // assignment
    if (columnIndex == -1) {
      return createAssignmentLine();
    }

    // assignment
    if (assignmentIndex < columnIndex) {
      return createAssignmentLine();
    }

    // := and : has same starting idnex so := has more piority bcs it is longest common substring
    if (simpleAssignmentIndex <= columnIndex) {
      return createAssignmentLine();
    }

    // target preq
    return createTargetPreqLine();
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
      } else if (
        line.parsed.type === "immediate-assignment" ||
        line.parsed.type === "recursive-assignment"
      ) {
        context = "normal";
        // collect recent rule header
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
        // collect assginment
        models.push(this.parseAssignment(line));
      } else {
        // collect recipe
        recipesUnderRule.push(this.parseRecipe(line));
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

    // normalize assignment nodes, clear first and last WS
    const normalizedModels: BaseNode[] = [];
    models.forEach((m) => {
      if (m.type === "assignment") {
        const m_ = m as AssignmentNode;

        // lvalue
        if (m_.identifier.parts.length > 0) {
          // remove first blank from identifier
          const firstPart: VarRefPart | TextPart | undefined =
            m_.identifier.parts.at(0);
          if (
            firstPart &&
            firstPart.name === "text-part" &&
            firstPart.lexeme.trim().length === 0
          ) {
            m_.identifier.parts = m_.identifier.parts.slice(1);
          }

          // remove last blank from identifier
          const lastPart: VarRefPart | TextPart | undefined =
            m_.identifier.parts.at(-1);
          if (
            lastPart &&
            lastPart.name === "text-part" &&
            lastPart.lexeme.trim().length === 0
          ) {
            m_.identifier.parts.pop();
          }
        }

        // rvalue
        if (m_.value.parts.length > 0) {
          // remove first blank from identifier
          const firstPart: VarRefPart | TextPart | undefined =
            m_.value.parts.at(0);
          if (
            firstPart &&
            firstPart.name === "text-part" &&
            firstPart.lexeme.trim().length === 0
          ) {
            m_.value.parts = m_.value.parts.slice(1);
          }

          // remove last blank from identifier
          const lastPart: VarRefPart | TextPart | undefined =
            m_.value.parts.at(-1);
          if (
            lastPart &&
            lastPart.name === "text-part" &&
            lastPart.lexeme.trim().length === 0
          ) {
            m_.value.parts.pop();
          }
        }

        normalizedModels.push(m);
      } else if (m.type === "rule") {
        normalizedModels.push(m);
      }
    });

    return normalizedModels;
  }

  private parseRecipe(line: ClassifiedLine): ValueNode {
    if (line.parsed.type !== "recipe") {
      throw Error(
        "parseRecipe fucntion only parse lines classified as recipe type",
      );
    }

    const recipeNode = this.valueParser(line.processed, { current: 0 }, 0, 0);

    return recipeNode;
  }

  private parseAssignment(line: ClassifiedLine): AssignmentNode {
    if (
      line.parsed.type !== "recursive-assignment" &&
      line.parsed.type !== "immediate-assignment"
    ) {
      throw Error(
        "parseReparseAssignmentcipe fucntion only parse lines classified as (recursive-assignment | immediate-assignment) type",
      );
    }

    const identifier = this.valueParser(line.parsed.left, { current: 0 }, 0, 0);
    const value = this.valueParser(line.parsed.right, { current: 0 }, 0, 0);

    return createAssignmentNode(
      identifier,
      value,
      line.parsed.assignmentOp == "=" ? "deffered" : "simple",
    );
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
      0,
    );

    const preqValue = this.valueParser(line.parsed.preqs, { current: 0 }, 0, 0);

    return {
      first: targetValue,
      second: preqValue,
    };
  }

  private valueParser(
    processed: Pchar[],
    cursor: { current: number },
    depth: number,
    valueParserInvokationCount: number,
  ): ValueNode {
    const isVarRefPart = () => {
      const pch = peekPchar(processed, cursor);
      const nextPch = nextPchar(processed, cursor);
      if (pch.char == "$" && !pch.escaped) return true;

      if (
        pch.escaped &&
        !(nextPch.char === "$" || nextPch.char === "{" || nextPch.char === "(")
      ) {
        return true;
      }

      return false;
    };

    const parts: (VarRefPart | TextPart)[] = [];

    while (!end(processed, cursor)) {
      // dispatch parse method
      if (isVarRefPart()) {
        parts.push(
          this.varRefParser(
            processed,
            cursor,
            depth,
            valueParserInvokationCount,
          ),
        );
      } else {
        if (/\s+/.test(peek(processed, cursor))) {
          parts.push(this.collectWs(processed, cursor));
        } else {
          parts.push(this.textPartParser(processed, cursor, depth));
        }
      }

      if (
        (peekPchar(processed, cursor).char === ")" ||
          peekPchar(processed, cursor).char === "}") &&
        !peekPchar(processed, cursor).escaped
      ) {
        depth--;
      }

      if (
        depth == 0 &&
        !(valueParserInvokationCount == 0 && !end(processed, cursor))
      ) {
        break;
      }
    }

    return {
      parts,
    };
  }

  private varRefParser(
    processed: Pchar[],
    cursor: { current: number },
    depth: number,
    valueParserInvokationCount: number,
  ): VarRefPart {
    advance(processed, cursor); // consume $
    const pch = peekPchar(processed, cursor);

    const closeVarRef = () => {
      const pch = peekPchar(processed, cursor);

      const closingParen = peekPchar(processed, cursor);
      if (closingParen.char != "}" && closingParen.char != ")" && depth == 0) {
        throw new Error("shoudl close with paren");
      }

      if (pch.char == "(" && closingParen.char != ")" && depth == 0) {
        throw new Error("shoudl close with )");
      }

      if (pch.char == "{" && closingParen.char != "}" && depth == 0) {
        throw new Error("shoudl close with }");
      }

      advance(processed, cursor); // consume Rparen ) }
    };

    // single char variable
    if (pch.char !== "{" && pch.char !== "(") {
      const valueWithTextPart = createVarRefPart(
        createValueNode([createTextPart(pch.char)]),
      );
      advance(processed, cursor); // consume char
      return valueWithTextPart;
    }

    // multi char var-ref
    advance(processed, cursor); // consume Lparen ( {}
    const value: ValueNode = this.valueParser(
      processed,
      cursor,
      depth + 1,
      valueParserInvokationCount + 1,
    );

    closeVarRef();

    return createVarRefPart(value);
  }

  private collectWs(process: Pchar[], cursor: Cursor) {
    let text = "";
    // collect WS as seperate text part
    while (!end(process, cursor) && /\s+/.test(peek(process, cursor))) {
      text += peek(process, cursor);
      advance(process, cursor);
    }
    return createTextPart(text);
  }

  private textPartParser(
    process: Pchar[],
    cursor: Cursor,
    depth: number,
  ): TextPart {
    let text = "";
    while (!end(process, cursor)) {
      const pch = peekPchar(process, cursor);

      if (/\s+/.test(pch.char)) {
        break;
      }

      if (pch.escaped) {
        text += pch.char;
        advance(process, cursor);
      } else if (pch.char === "$") {
        break;
      } else if (pch.char === ")" || pch.char == "}") {
        if (depth > 0) {
          break;
        } else {
          text += pch.char;
          advance(process, cursor);
        }
      } else {
        text += pch.char;
        advance(process, cursor);
      }
    }

    return createTextPart(text);
  }
}
