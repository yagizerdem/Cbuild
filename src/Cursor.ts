declare const process: { stdout: { write(value: string): void } };

export class Cursor {
  public static readonly END: string = "\0";

  private static get STOPCHAR_MAP(): Map<string, bigint> {
    return new Map<string, bigint>([
      ["\0", Cursor.CharMask.End],

      [" ", Cursor.CharMask.Blank],
      ["\t", Cursor.CharMask.Blank],

      ["\n", Cursor.CharMask.Newline],
      ["\r", Cursor.CharMask.Newline],

      ["$", Cursor.CharMask.Escape | Cursor.CharMask.Dollar],
      [";", Cursor.CharMask.Semi],
      ["=", Cursor.CharMask.Equals],
      [":", Cursor.CharMask.Colon],
      ["%", Cursor.CharMask.Percent],
      ["|", Cursor.CharMask.Pipe],
      [".", Cursor.CharMask.Dot],
      [",", Cursor.CharMask.Comma],
      ["\\", Cursor.CharMask.Escape | Cursor.CharMask.BackSlash],
      ["+", Cursor.CharMask.Plus],
      ["-", Cursor.CharMask.Minus],
      ["*", Cursor.CharMask.Asterisk],
      ["/", Cursor.CharMask.Slash],
      ['"', Cursor.CharMask.DoubleQuote],
      ["'", Cursor.CharMask.SingleQuote],

      ["[", Cursor.CharMask.LeftBracket],
      ["]", Cursor.CharMask.RightBracket],
      ["(", Cursor.CharMask.LeftParen],
      [")", Cursor.CharMask.RightParen],
      ["{", Cursor.CharMask.LeftCurlyBrace],
      ["}", Cursor.CharMask.RightCurlyBrace],

      ["_", Cursor.CharMask.UnderScore],
      ["#", Cursor.CharMask.Hash],
      [">", Cursor.CharMask.Greater],
      ["<", Cursor.CharMask.Less],
      ["!", Cursor.CharMask.Bang],
      ["&", Cursor.CharMask.Ampersand],
      ["^", Cursor.CharMask.Caret],
      ["?", Cursor.CharMask.Question],
      ["~", Cursor.CharMask.Tilde],
      ["`", Cursor.CharMask.BackTick],
    ]);
  }

  public static get EXPR_STOP(): bigint {
    return Cursor.maskOf(
      Cursor.CharMask.End,
      Cursor.CharMask.Blank,
      Cursor.CharMask.Newline,
      Cursor.CharMask.Dollar,
      Cursor.CharMask.LeftParen,
      Cursor.CharMask.RightParen,
      Cursor.CharMask.LeftCurlyBrace,
      Cursor.CharMask.RightCurlyBrace,
      Cursor.CharMask.Colon,
      Cursor.CharMask.Comma,
      Cursor.CharMask.Equals,
      Cursor.CharMask.Hash,
      Cursor.CharMask.Pipe,
    );
  }

  public static get RECIPE_STOP(): bigint {
    return Cursor.maskOf(
      Cursor.CharMask.End,
      Cursor.CharMask.Newline,
      Cursor.CharMask.Dollar,
    );
  }

  public static get ASSIGNMENT_LHS_STOP(): bigint {
    return Cursor.maskOf(
      Cursor.CharMask.End,
      Cursor.CharMask.Blank,
      Cursor.CharMask.Newline,
      Cursor.CharMask.Equals,
      Cursor.CharMask.Colon,
      Cursor.CharMask.Plus,
      Cursor.CharMask.Question,
      Cursor.CharMask.Bang,
    );
  }

  public static get COMMENT_START(): bigint {
    return Cursor.CharMask.Hash;
  }

  private static get EOF_PCHAR(): Cursor.Pchar {
    return EOF_PCHAR_VALUE;
  }

  public static getStopcharMask(key: string): bigint {
    return Cursor.STOPCHAR_MAP.get(key) ?? 0n;
  }

  public static maskOr(a: Cursor.CharMask, b: Cursor.CharMask): bigint {
    return a | b;
  }

  public static anySet(v: bigint, m: Cursor.CharMask): boolean;
  public static anySet(v: bigint, mask: bigint): boolean;
  public static anySet(v: bigint, mask: bigint): boolean {
    return (v & mask) !== 0n;
  }

  public static noneSet(v: bigint, m: Cursor.CharMask): boolean;
  public static noneSet(v: bigint, mask: bigint): boolean;
  public static noneSet(v: bigint, mask: bigint): boolean {
    return !Cursor.anySet(v, mask);
  }

  public static maskOf(...masks: Cursor.CharMask[]): bigint {
    let result = 0n;
    for (const mask of masks) {
      result |= mask;
    }
    return result;
  }

  public static stopSet(c: string, m: Cursor.CharMask): boolean;
  public static stopSet(c: string, mask: bigint): boolean;
  public static stopSet(p: Cursor.Pchar, m: Cursor.CharMask): boolean;
  public static stopSet(cOrP: string | Cursor.Pchar, mask: bigint): boolean {
    const c = typeof cOrP === "string" ? cOrP : cOrP.c;
    return Cursor.anySet(Cursor.getStopcharMask(c), mask);
  }

  public static isBlank(c: string): boolean;
  public static isBlank(p: Cursor.Pchar): boolean;
  public static isBlank(cOrP: string | Cursor.Pchar): boolean {
    const c = typeof cOrP === "string" ? cOrP : cOrP.c;
    return Cursor.stopSet(c, Cursor.CharMask.Blank);
  }

  public static isSpace(c: string): boolean;
  public static isSpace(p: Cursor.Pchar): boolean;
  public static isSpace(cOrP: string | Cursor.Pchar): boolean {
    const c = typeof cOrP === "string" ? cOrP : cOrP.c;
    return Cursor.stopSet(
      c,
      Cursor.maskOr(Cursor.CharMask.Newline, Cursor.CharMask.Blank),
    );
  }

  public static peek(text: string, cursor: Cursor.CursorState): string;
  public static peek(buf: Cursor.Pchar[], current: number): Cursor.Pchar;
  public static peek(
    textOrBuf: string | Cursor.Pchar[],
    cursorOrCurrent: Cursor.CursorState | number,
  ): string | Cursor.Pchar {
    if (typeof textOrBuf === "string") {
      const cursor = cursorOrCurrent as Cursor.CursorState;
      if (cursor.current >= textOrBuf.length) return Cursor.END;
      return textOrBuf.charAt(cursor.current);
    }
    const current = cursorOrCurrent as number;
    if (current >= textOrBuf.length) return Cursor.EOF_PCHAR;
    return textOrBuf[current];
  }

  public static advance(text: string, cursor: Cursor.CursorState): string;
  public static advance(
    buf: Cursor.Pchar[],
    cursor: Cursor.CursorState,
  ): Cursor.Pchar;
  public static advance(
    textOrBuf: string | Cursor.Pchar[],
    cursor: Cursor.CursorState,
  ): string | Cursor.Pchar {
    if (typeof textOrBuf === "string") {
      if (cursor.current >= textOrBuf.length) return Cursor.END;
      return textOrBuf.charAt(cursor.current++);
    }
    const p = Cursor.peek(textOrBuf, cursor.current);
    if (cursor.current < textOrBuf.length) cursor.current++;
    return p;
  }

  public static peekNext(text: string, cursor: Cursor.CursorState): string;
  public static peekNext(buf: Cursor.Pchar[], current: number): Cursor.Pchar;
  public static peekNext(
    textOrBuf: string | Cursor.Pchar[],
    cursorOrCurrent: Cursor.CursorState | number,
  ): string | Cursor.Pchar {
    if (typeof textOrBuf === "string") {
      const cursor = cursorOrCurrent as Cursor.CursorState;
      if (cursor.current + 1 >= textOrBuf.length) return Cursor.END;
      return textOrBuf.charAt(cursor.current + 1);
    }
    const current = cursorOrCurrent as number;
    if (current + 1 >= textOrBuf.length) return Cursor.EOF_PCHAR;
    return textOrBuf[current + 1];
  }

  public static match(
    text: string,
    cursor: Cursor.CursorState,
    expected: string,
  ): boolean;
  public static match(
    buf: Cursor.Pchar[],
    cursor: Cursor.CursorState,
    expected: string,
  ): boolean;
  public static match(
    textOrBuf: string | Cursor.Pchar[],
    cursor: Cursor.CursorState,
    expected: string,
  ): boolean {
    if (typeof textOrBuf === "string") {
      if (cursor.current >= textOrBuf.length) return false;
      if (textOrBuf.charAt(cursor.current) === expected) {
        cursor.current++;
        return true;
      }
      return false;
    }
    if (Cursor.peek(textOrBuf, cursor.current).c === expected) {
      cursor.current++;
      return true;
    }
    return false;
  }

  public static consumeBlank(text: string, cursor: Cursor.CursorState): void;
  public static consumeBlank(
    buf: Cursor.Pchar[],
    cursor: Cursor.CursorState,
  ): void;
  public static consumeBlank(
    textOrBuf: string | Cursor.Pchar[],
    cursor: Cursor.CursorState,
  ): void {
    if (typeof textOrBuf === "string") {
      while (Cursor.isBlank(Cursor.peek(textOrBuf, cursor))) cursor.current++;
    } else {
      while (Cursor.isBlank(Cursor.peek(textOrBuf, cursor.current)))
        cursor.current++;
    }
  }

  public static consumeSpace(text: string, cursor: Cursor.CursorState): void;
  public static consumeSpace(
    buf: Cursor.Pchar[],
    cursor: Cursor.CursorState,
  ): void;
  public static consumeSpace(
    textOrBuf: string | Cursor.Pchar[],
    cursor: Cursor.CursorState,
  ): void {
    if (typeof textOrBuf === "string") {
      while (Cursor.isSpace(Cursor.peek(textOrBuf, cursor))) cursor.current++;
    } else {
      while (Cursor.isSpace(Cursor.peek(textOrBuf, cursor.current)))
        cursor.current++;
    }
  }

  public static prev(buf: Cursor.Pchar[], current: number): Cursor.Pchar;
  public static prev(
    buf: Cursor.Pchar[],
    cursorState: Cursor.CursorState,
  ): Cursor.Pchar;
  public static prev(text: string, cursor: Cursor.CursorState): string;
  public static prev(
    bufOrText: Cursor.Pchar[] | string,
    currentOrCursor: number | Cursor.CursorState,
  ): Cursor.Pchar | string {
    if (typeof bufOrText === "string") {
      const cursor = currentOrCursor as Cursor.CursorState;
      if (cursor.current - 1 < 0) return Cursor.END;
      return bufOrText.charAt(cursor.current - 1);
    }
    const current =
      typeof currentOrCursor === "number"
        ? currentOrCursor
        : currentOrCursor.current;
    if (current - 1 < 0) return Cursor.EOF_PCHAR;
    return bufOrText[current - 1];
  }

  public static prevChar(buf: Cursor.Pchar[], current: number): string {
    return Cursor.prev(buf, current).c;
  }

  public static peekChar(buf: Cursor.Pchar[], current: number): string {
    return Cursor.peek(buf, current).c;
  }

  public static peekNextChar(buf: Cursor.Pchar[], current: number): string {
    return Cursor.peekNext(buf, current).c;
  }

  public static advanceChar(
    buf: Cursor.Pchar[],
    cursor: Cursor.CursorState,
  ): string {
    return Cursor.advance(buf, cursor).c;
  }

  public static mergePBuffer(
    buf1: Cursor.Pchar[],
    buf2: Cursor.Pchar[],
  ): Cursor.Pchar[] {
    if (buf1.length === 0) return [...buf2];
    if (buf2.length === 0) return [...buf1];
    return [...buf1, ...buf2];
  }

  public static toPBuffer(str: string, line: number): Cursor.Pchar[] {
    const buf: Cursor.Pchar[] = [];
    for (let i = 0; i < str.length; i++) {
      buf.push(new Cursor.Pchar(line, i + 1, str.charAt(i)));
    }
    return buf;
  }

  public static pBufferToString(buf: Cursor.Pchar[]): string {
    let result = "";
    for (const p of buf) result += p.c;
    return result;
  }

  public static printPBuffer(buf: Cursor.Pchar[]): void {
    for (const p of buf) process.stdout.write(p.c);
  }

  public static isEscaped(
    text: string,
    charIndex: number,
    escapeCharacter: string,
  ): boolean;
  public static isEscaped(
    buf: Cursor.Pchar[],
    charIndex: number,
    escapeCharacter: string,
  ): boolean;
  public static isEscaped(
    textOrBuf: string | Cursor.Pchar[],
    charIndex: number,
    escapeCharacter: string,
  ): boolean {
    let i = charIndex - 1;
    let counter = 0;
    while (
      i >= 0 &&
      (typeof textOrBuf === "string" ? textOrBuf.charAt(i) : textOrBuf[i].c) ===
        escapeCharacter
    ) {
      i--;
      counter++;
    }
    return counter % 2 === 1;
  }

  public static isEscapedBackslash(text: string, charIndex: number): boolean;
  public static isEscapedBackslash(
    buf: Cursor.Pchar[],
    charIndex: number,
  ): boolean;
  public static isEscapedBackslash(
    textOrBuf: string | Cursor.Pchar[],
    charIndex: number,
  ): boolean {
    if (typeof textOrBuf === "string")
      return Cursor.isEscaped(textOrBuf, charIndex, "\\");
    return Cursor.isEscaped(textOrBuf, charIndex, "\\");
  }
}

export namespace Cursor {
  export class CursorState {
    public current: number;
    public row: number;
    public col: number;
    public processedRow: number;
    public processedCol: number;

    public constructor();
    public constructor(current: number);
    public constructor(current: number, row: number, col: number);
    public constructor(current = 0, row = 0, col = 0) {
      this.current = current;
      this.row = row;
      this.col = col;
      this.processedRow = 0;
      this.processedCol = 0;
    }
  }

  export class Floc {
    public line: number;

    public constructor();
    public constructor(line: number);
    public constructor(line = 0) {
      this.line = line;
    }
  }

  export const CharMask = {
    End: 1n << 0n,
    Blank: 1n << 1n,
    Newline: 1n << 2n,
    Dollar: 1n << 3n,
    Semi: 1n << 4n,
    Equals: 1n << 5n,
    Colon: 1n << 6n,
    Percent: 1n << 7n,
    Pipe: 1n << 8n,
    Dot: 1n << 9n,
    Comma: 1n << 10n,
    Escape: 1n << 11n,
    Plus: 1n << 12n,
    Minus: 1n << 13n,
    Asterisk: 1n << 14n,
    Slash: 1n << 15n,
    DoubleQuote: 1n << 16n,
    SingleQuote: 1n << 17n,
    LeftBracket: 1n << 18n,
    RightBracket: 1n << 19n,
    LeftParen: 1n << 20n,
    RightParen: 1n << 21n,
    LeftCurlyBrace: 1n << 22n,
    RightCurlyBrace: 1n << 23n,
    UnderScore: 1n << 24n,
    Hash: 1n << 25n,
    Greater: 1n << 26n,
    Less: 1n << 27n,
    Bang: 1n << 28n,
    Ampersand: 1n << 29n,
    Caret: 1n << 30n,
    Question: 1n << 31n,
    Tilde: 1n << 32n,
    BackTick: 1n << 33n,
    BackSlash: 1n << 34n,
  } as const;

  export type CharMask = (typeof CharMask)[keyof typeof CharMask];

  export class Pchar {
    public row: number;
    public col: number;
    public processedRow: number;
    public processedCol: number;
    public c: string;
    public isEscaped: boolean;
    public escapeType: Pchar.EscapeType | undefined;
    public context: Pchar.Context | undefined;

    public constructor(c: string);
    public constructor(c: string, isEscaped: boolean);
    public constructor(row: number, col: number, c: string);
    public constructor(row: number, col: number, c: string, isEscaped: boolean);
    public constructor(
      row: number,
      col: number,
      c: string,
      isEscaped: boolean,
      escapeType: Pchar.EscapeType,
      context: Pchar.Context,
    );
    public constructor(
      rowOrC: number | string,
      colOrEscaped: number | boolean = 0,
      c = Cursor.END,
      isEscaped = false,
      escapeType?: Pchar.EscapeType,
      context?: Pchar.Context,
    ) {
      if (typeof rowOrC === "string") {
        this.row = 0;
        this.col = 0;
        this.c = rowOrC;
        this.isEscaped =
          typeof colOrEscaped === "boolean" ? colOrEscaped : false;
      } else {
        this.row = rowOrC;
        this.col = colOrEscaped as number;
        this.c = c;
        this.isEscaped = isEscaped;
      }
      this.processedRow = this.row;
      this.processedCol = this.col;
      this.escapeType = escapeType;
      this.context = context;
    }

    public toString(): string {
      return `row=${this.row}, col=${this.col}, processedRow=${this.processedRow}, processedCol=${this.processedCol}, c='${this.c}', isEscaped=${this.isEscaped}, escapeType=${Pchar.EscapeType[this.escapeType as Pchar.EscapeType]}, context=${Pchar.Context[this.context as Pchar.Context]}`;
    }
  }

  export namespace Pchar {
    export enum Context {
      YSHARP_HOOK,
      LUA_HOOK,
      CBUILD_HOOK,
      NORMAL,
    }

    export enum EscapeType {
      BackSlash,
      Dollar,
    }
  }
}

const EOF_PCHAR_VALUE = new Cursor.Pchar(Cursor.END);
