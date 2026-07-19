package io.Cbuild;

import java.util.*;

public class Cursor {

    public static class CursorState {
        public int current;
        public int row;
        public int col;

        public CursorState() {}

        public CursorState(int current) {
            this.current = current;
        }

        public CursorState(int current, int row, int col) {
            this.current = current;
            this.row = row;
            this.col = col;
        }
    }

    public static class Floc {
        public int line;
        public Floc() { this.line = 0; }
        public Floc(int line) { this.line = line; }
    }



    public static final char END = '\0';


    public enum CharMask {
        End             (1L << 0),  // \0
        Blank           (1L << 1),  // space, tab
        Newline         (1L << 2),  // \n, \r
        Dollar          (1L << 3),  // $
        Semi            (1L << 4),  // ;
        Equals          (1L << 5),  // =
        Colon           (1L << 6),  // :
        Percent         (1L << 7),  // %
        Pipe            (1L << 8),  // |
        Dot             (1L << 9),  // .
        Comma           (1L << 10), // ,
        Escape          (1L << 11), // \
        Plus            (1L << 12), // +
        Minus           (1L << 13), // -
        Asterisk        (1L << 14), // *
        Slash           (1L << 15), // /
        DoubleQuote     (1L << 16), // "
        SingleQuote     (1L << 17), // '
        LeftBracket     (1L << 18), // [
        RightBracket    (1L << 19), // ]
        LeftParen       (1L << 20), // (
        RightParen      (1L << 21), // )
        LeftCurlyBrace  (1L << 22), // {
        RightCurlyBrace (1L << 23), // }
        UnderScore      (1L << 24), // _
        Hash            (1L << 25), // #
        Greater         (1L << 26), // >
        Less            (1L << 27), // <
        Bang            (1L << 28), // !
        Ampersand       (1L << 29), // &
        Caret           (1L << 30), // ^
        Question        (1L << 31), // ?
        Tilde           (1L << 32), // ~
        BackTick        (1L << 33), // `
        BackSlash       (1L << 34); // \

        public final long value;

        CharMask(long value) {
            this.value = value;
        }
    }


    private static final Map<Character, Long> STOPCHAR_MAP = new HashMap<>();

    static {
        STOPCHAR_MAP.put('\0', CharMask.End.value);

        STOPCHAR_MAP.put(' ',  CharMask.Blank.value);
        STOPCHAR_MAP.put('\t', CharMask.Blank.value);

        STOPCHAR_MAP.put('\n', CharMask.Newline.value);
        STOPCHAR_MAP.put('\r', CharMask.Newline.value);

        STOPCHAR_MAP.put('$',  CharMask.Escape.value | CharMask.Dollar.value);
        STOPCHAR_MAP.put(';',  CharMask.Semi.value);
        STOPCHAR_MAP.put('=',  CharMask.Equals.value);
        STOPCHAR_MAP.put(':',  CharMask.Colon.value);
        STOPCHAR_MAP.put('%',  CharMask.Percent.value);
        STOPCHAR_MAP.put('|',  CharMask.Pipe.value);
        STOPCHAR_MAP.put('.',  CharMask.Dot.value);
        STOPCHAR_MAP.put(',',  CharMask.Comma.value);
        STOPCHAR_MAP.put('\\', CharMask.Escape.value | CharMask.BackSlash.value);
        STOPCHAR_MAP.put('+',  CharMask.Plus.value);
        STOPCHAR_MAP.put('-',  CharMask.Minus.value);
        STOPCHAR_MAP.put('*',  CharMask.Asterisk.value);
        STOPCHAR_MAP.put('/',  CharMask.Slash.value);
        STOPCHAR_MAP.put('"',  CharMask.DoubleQuote.value);
        STOPCHAR_MAP.put('\'', CharMask.SingleQuote.value);

        STOPCHAR_MAP.put('[',  CharMask.LeftBracket.value);
        STOPCHAR_MAP.put(']',  CharMask.RightBracket.value);
        STOPCHAR_MAP.put('(',  CharMask.LeftParen.value);
        STOPCHAR_MAP.put(')',  CharMask.RightParen.value);
        STOPCHAR_MAP.put('{',  CharMask.LeftCurlyBrace.value);
        STOPCHAR_MAP.put('}',  CharMask.RightCurlyBrace.value);

        STOPCHAR_MAP.put('_',  CharMask.UnderScore.value);
        STOPCHAR_MAP.put('#',  CharMask.Hash.value);
        STOPCHAR_MAP.put('>',  CharMask.Greater.value);
        STOPCHAR_MAP.put('<',  CharMask.Less.value);
        STOPCHAR_MAP.put('!',  CharMask.Bang.value);
        STOPCHAR_MAP.put('&',  CharMask.Ampersand.value);
        STOPCHAR_MAP.put('^',  CharMask.Caret.value);
        STOPCHAR_MAP.put('?',  CharMask.Question.value);
        STOPCHAR_MAP.put('~',  CharMask.Tilde.value);
        STOPCHAR_MAP.put('`',  CharMask.BackTick.value);
    }

    public static final long EXPR_STOP =
            maskOf(
                    CharMask.End,
                    CharMask.Blank,
                    CharMask.Newline,
                    CharMask.Dollar,
                    CharMask.LeftParen,
                    CharMask.RightParen,
                    CharMask.LeftCurlyBrace,
                    CharMask.RightCurlyBrace,
                    CharMask.Colon,
                    CharMask.Comma,
                    CharMask.Equals,
                    CharMask.Hash,
                    CharMask.Pipe
            );

    public static final long RECIPE_STOP =
            maskOf(
                    CharMask.End,
                    CharMask.Newline,
                    CharMask.Dollar
            );

    public static final long ASSIGNMENT_LHS_STOP =
            maskOf(
                    CharMask.End,
                    CharMask.Blank,
                    CharMask.Newline,
                    CharMask.Equals,
                    CharMask.Colon,
                    CharMask.Plus,
                    CharMask.Question,
                    CharMask.Bang
            );

    public static final long COMMENT_START =
            CharMask.Hash.value;

    public static long getStopcharMask(char key) {
        return STOPCHAR_MAP.getOrDefault(key, (long)0);
    }


    public static long maskOr(CharMask a, CharMask b) {
        return a.value | b.value;
    }

    public static boolean anySet(long v, CharMask m) {
        return (v & m.value) != 0;
    }

    public static boolean anySet(long v, long mask) {
        return (v & mask) != 0;
    }

    public static boolean noneSet(long v, CharMask m) {
        return !anySet(v, m);
    }

    public static long maskOf(CharMask... masks) {
        long result = 0L;
        for (CharMask mask : masks) {
            result |= mask.value;
        }
        return result;
    }

    public static boolean noneSet(long v, long mask) {
        return !anySet(v, mask);
    }

    public static boolean stopSet(char c, CharMask m) {
        return anySet(getStopcharMask(c), m);
    }

    public static boolean stopSet(char c, long mask) {
        return anySet(getStopcharMask(c), mask);
    }

    public static boolean isBlank(char c) {
        return stopSet(c, CharMask.Blank);
    }

    public static boolean isSpace(char c) {
        return stopSet(c, maskOr(CharMask.Newline, CharMask.Blank));
    }


    public static char peek(String text, CursorState cursor) {
        if (cursor.current >= text.length()) return END;
        return text.charAt(cursor.current);
    }

    public static char advance(String text, CursorState cursor) {
        if (cursor.current >= text.length()) return END;
        return text.charAt(cursor.current++);
    }

    public static char peekNext(String text, CursorState cursor) {
        if (cursor.current + 1 >= text.length()) return END;
        return text.charAt(cursor.current + 1);
    }

    public static boolean match(String text, CursorState cursor, char expected) {
        if (cursor.current >= text.length()) return false;
        if (text.charAt(cursor.current) == expected) {
            cursor.current++;
            return true;
        }
        return false;
    }

    public static void consumeBlank(String text, CursorState cursor) {
        while (isBlank(peek(text, cursor))) cursor.current++;
    }

    public static void consumeSpace(String text, CursorState cursor) {
        while (isSpace(peek(text, cursor))) cursor.current++;
    }

    public static class Pchar {
        public enum EscapeType {
            BackSlash,
            Dollar
        }

        public int row;
        public int col;
        public char c;
        public boolean isEscaped;
        public EscapeType escapeType;

        public Pchar(char c) {
            this(0, 0, c, false);
        }

        public Pchar(char c, boolean isEscaped) {
            this(0, 0, c, isEscaped);
        }

        public Pchar(int row, int col, char c) {
            this(row, col, c, false);
        }

        public Pchar(int row, int col, char c, boolean isEscaped) {
            this.row = row;
            this.col = col;
            this.c = c;
            this.isEscaped = isEscaped;
        }

        public Pchar(int row,
                     int col,
                     char c,
                     boolean isEscaped,
                     EscapeType escapeType) {
            this.row = row;
            this.col = col;
            this.c = c;
            this.isEscaped = isEscaped;
            this.escapeType = escapeType;
        }
    }

    private static final Pchar EOF_PCHAR = new Pchar(END);

    public static boolean stopSet(Pchar p, CharMask m) {
        return stopSet(p.c, m);
    }

    public static boolean isBlank(Pchar p) {
        return isBlank(p.c);
    }

    public static boolean isSpace(Pchar p) {
        return isSpace(p.c);
    }

    public static Pchar peek(List<Pchar> buf, int current) {
        if (current >= buf.size()) return EOF_PCHAR;
        return buf.get(current);
    }

    public static Pchar peekNext(List<Pchar> buf, int current) {
        if (current + 1 >= buf.size()) return EOF_PCHAR;
        return buf.get(current + 1);
    }

    public static Pchar advance(List<Pchar> buf, CursorState cursor) {
        Pchar p = peek(buf, cursor.current);
        if (cursor.current < buf.size()) cursor.current++;
        return p;
    }

    public static Pchar prev(List<Pchar> buf, int current) {
        if (current - 1 < 0) return EOF_PCHAR;
        return buf.get(current - 1);
    }

    public static Pchar prev(List<Pchar> buf, CursorState cursorState) {
        return prev(buf, cursorState.current);
    }

    public static char prevChar(List<Pchar> buf, int current) {
        return prev(buf, current).c;
    }

    public static char prev(String text, CursorState cursor) {
        if (cursor.current - 1 < 0) return END;
        return text.charAt(cursor.current - 1);
    }

    public static char peekChar(List<Pchar> buf, int current) {
        return peek(buf, current).c;
    }

    public static char peekNextChar(List<Pchar> buf, int current) {
        return peekNext(buf, current).c;
    }

    public static char advanceChar(List<Pchar> buf, CursorState cursor) {
        return advance(buf, cursor).c;
    }

    public static boolean match(List<Pchar> buf, CursorState cursor, char expected) {
        if (peek(buf, cursor.current).c == expected) {
            cursor.current++;
            return true;
        }
        return false;
    }

    public static void consumeBlank(List<Pchar> buf, CursorState cursor) {
        while (isBlank(peek(buf, cursor.current))) cursor.current++;
    }

    public static void consumeSpace(List<Pchar> buf, CursorState cursor) {
        while (isSpace(peek(buf, cursor.current))) cursor.current++;
    }


    public static List<Pchar> mergePBuffer(List<Pchar> buf1, List<Pchar> buf2) {
        if (buf1.isEmpty()) return new ArrayList<>(buf2);
        if (buf2.isEmpty()) return new ArrayList<>(buf1);
        List<Pchar> result = new ArrayList<>(buf1.size() + buf2.size());
        result.addAll(buf1);
        result.addAll(buf2);
        return result;
    }

    public static List<Pchar> toPBuffer(String str, int line) {
        List<Pchar> buf = new ArrayList<>(str.length());
        for (int i = 0; i < str.length(); i++) {
            buf.add(new Pchar(line, i + 1, str.charAt(i)));
        }
        return buf;
    }

    public static String pBufferToString(List<Pchar> buf) {
        StringBuilder sb = new StringBuilder(buf.size());
        for (Pchar p : buf) sb.append(p.c);
        return sb.toString();
    }

    public static void printPBuffer(List<Pchar> buf) {
        for (Pchar p : buf) System.out.print(p.c);
    }

    public static boolean isEscaped(String text, int charIndex, char escapeCharacter) {
        int i = charIndex - 1;
        int counter = 0;
        while (i >= 0 && text.charAt(i) == escapeCharacter) {
            i--;
            counter++;
        }
        return counter % 2 == 1;
    }

    public static boolean isEscapedBackslash(String text, int charIndex) {
        return isEscaped(text, charIndex, '\\');
    }

    public static boolean isEscaped(List<Cursor.Pchar> buf, int charIndex, char escapeCharacter) {
        int i = charIndex - 1;
        int counter = 0;
        while (i >= 0 && buf.get(i).c == escapeCharacter) {
            i--;
            counter++;
        }
        return counter % 2 == 1;
    }

    public static boolean isEscapedBackslash(List<Cursor.Pchar> buf, int charIndex) {
        return isEscaped(buf, charIndex, '\\');
    }

}