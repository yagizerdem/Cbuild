package io.Cbuild;

import java.util.ArrayList;
import java.util.List;

public class Preprocessor {

    public static boolean isHookContext(Cursor.Pchar.Context context) {
        return context == Cursor.Pchar.Context.LUA_HOOK ||
                context == Cursor.Pchar.Context.YSHARP_HOOK ||
                context == Cursor.Pchar.Context.CBUILD_HOOK;
    }

    public static List<Cursor.Pchar> removeComments(
            List<Cursor.Pchar> program
    ) {
        List<Cursor.Pchar> processed = new ArrayList<>();

        boolean atLineStart = true;
        boolean recipeLine = false;

        int i = 0;

        while (i < program.size()) {
            Cursor.Pchar current = program.get(i);

            /*
             * A recipe line starts with a tab character in the
             * first column. The whole line belongs to the shell.
             */
            if (atLineStart) {
                recipeLine =
                        current.context
                                == Cursor.Pchar.Context.NORMAL
                                && current.c == '\t';

                atLineStart = false;
            }

            /*
             * Comments inside hook bodies must not be processed
             * by the outer CBuild preprocessor.
             */
            if (isHookContext(current.context)) {
                processed.add(current);

                if (Cursor.stopSet(
                        current.c,
                        Cursor.CharMask.Newline
                )) {
                    atLineStart = true;
                    recipeLine = false;
                }

                i++;
                continue;
            }

            /*
             * Preserve recipe lines completely. Hash characters
             * in these lines are interpreted by the shell.
             */
            if (recipeLine) {
                processed.add(current);

                if (Cursor.stopSet(
                        current.c,
                        Cursor.CharMask.Newline
                )) {
                    atLineStart = true;
                    recipeLine = false;
                }

                i++;
                continue;
            }

            /*
             * Outside recipe and hook contexts, a hash character
             * starts a CBuild comment.
             */
            if (Cursor.stopSet(
                    current.c,
                    Cursor.COMMENT_START
            )) {
                /*
                 * Skip the comment text but preserve the newline.
                 */
                while (i < program.size()
                        && !Cursor.stopSet(
                        program.get(i).c,
                        Cursor.CharMask.Newline
                )) {
                    i++;
                }

                continue;
            }

            processed.add(current);

            if (Cursor.stopSet(
                    current.c,
                    Cursor.CharMask.Newline
            )) {
                atLineStart = true;
                recipeLine = false;
            }

            i++;
        }

        return processed;
    }

    public static List<Cursor.Pchar> mergeContinuation(
            List<Cursor.Pchar> program
    ) {
        List<Cursor.Pchar> processed = new ArrayList<>();

        for (int i = 0; i < program.size(); i++) {
            Cursor.Pchar current = program.get(i);

            /*
             * Hook bodies must be copied without preprocessing.
             */
            if (isHookContext(current.context)) {
                processed.add(current);
                continue;
            }

            if (Cursor.stopSet(
                    current.c,
                    Cursor.CharMask.BackSlash
            )
                    && i + 1 < program.size()) {

                Cursor.Pchar next = program.get(i + 1);

                boolean isContinuation =
                        next.context
                                == Cursor.Pchar.Context.NORMAL
                                && Cursor.stopSet(
                                next.c,
                                Cursor.CharMask.Newline
                        )
                                && next.isEscaped
                                && next.escapeType
                                == Cursor.Pchar.EscapeType.BackSlash;

                if (isContinuation) {
                    /*
                     * Skip the backslash.
                     *
                     * Incrementing i also skips the escaped newline.
                     */
                    i++;

                    /*
                     * Handle Windows CRLF. If the escaped character
                     * was '\r', skip the following '\n' as well.
                     */
                    if (next.c == '\r'
                            && i + 1 < program.size()
                            && program.get(i + 1).c == '\n') {
                        i++;
                    }

                    continue;
                }
            }

            processed.add(current);
        }

        return processed;
    }

    public static List<Cursor.Pchar> convertPchar(String program) {
        Cursor.CursorState cursor =
                new Cursor.CursorState(0, 1, 1);

        List<Cursor.Pchar> processed = new ArrayList<>();

        Cursor.Pchar.Context context =
                Cursor.Pchar.Context.NORMAL;

        boolean insideHook = false;
        int hookBraceDepth = 0;

        char activeQuote = '\0';
        boolean escapedInString = false;

        while (!Cursor.stopSet(
                Cursor.peek(program, cursor),
                Cursor.CharMask.End
        )) {
            char current = Cursor.peek(program, cursor);

            /*
             * Detect the opening brace of a supported hook.
             *
             * Supported forms:
             *
             * ysharp { ... }
             * lua    { ... }
             * cbuild { ... }
             */
            if (!insideHook && current == '{') {
                Cursor.Pchar.Context detectedContext =
                        detectHookOpeningContext(
                                program,
                                cursor.current
                        );

                if (detectedContext != null) {
                    context = detectedContext;
                    insideHook = true;
                    hookBraceDepth = 1;

                    activeQuote = '\0';
                    escapedInString = false;

                    addCharacter(
                            processed,
                            cursor,
                            current,
                            false,
                            null,
                            context
                    );

                    advanceCursor(program, cursor, current);
                    continue;
                }
            }

            /*
             * Hook bodies are copied without applying CBuild
             * continuation or dollar escaping rules.
             */
            if (insideHook) {
                addCharacter(
                        processed,
                        cursor,
                        current,
                        false,
                        null,
                        context
                );

                /*
                 * Ignore braces that appear inside quoted strings.
                 */
                if (activeQuote != '\0') {
                    if (escapedInString) {
                        escapedInString = false;
                    } else if (current == '\\') {
                        escapedInString = true;
                    } else if (current == activeQuote) {
                        activeQuote = '\0';
                    }
                } else {
                    if (current == '"' || current == '\'') {
                        activeQuote = current;
                    } else if (current == '{') {
                        hookBraceDepth++;
                    } else if (current == '}') {
                        hookBraceDepth--;

                        /*
                         * Return to the root CBuild context only after
                         * the outermost hook brace has been closed.
                         */
                        if (hookBraceDepth == 0) {
                            insideHook = false;
                            context = Cursor.Pchar.Context.NORMAL;

                            activeQuote = '\0';
                            escapedInString = false;
                        }
                    }
                }

                advanceCursor(program, cursor, current);
                continue;
            }

            /*
             * The code below runs only in the root CBuild document.
             */
            boolean isEscaped = false;
            Cursor.Pchar.EscapeType escapeType = null;

            if (!processed.isEmpty()) {
                /*
                 * cursor.current belongs to the input string.
                 * getLast() must be used to access the previous
                 * character in the processed output.
                 */
                Cursor.Pchar previous = processed.getLast();

                /*
                 * A backslash escapes only a following newline.
                 */
                if (Cursor.stopSet(
                        current,
                        Cursor.CharMask.Newline
                )
                        && Cursor.stopSet(
                        previous.c,
                        Cursor.CharMask.BackSlash
                )
                        && previous.context
                        == Cursor.Pchar.Context.NORMAL) {

                    isEscaped = true;
                    escapeType =
                            Cursor.Pchar.EscapeType.BackSlash;
                }

                /*
                 * Only the second dollar character in $$ is escaped.
                 */
                else if (current == '$'
                        && previous.c == '$'
                        && !previous.isEscaped
                        && previous.context
                        == Cursor.Pchar.Context.NORMAL) {

                    isEscaped = true;
                    escapeType =
                            Cursor.Pchar.EscapeType.Dollar;
                }
            }

            addCharacter(
                    processed,
                    cursor,
                    current,
                    isEscaped,
                    escapeType,
                    Cursor.Pchar.Context.NORMAL
            );

            advanceCursor(program, cursor, current);
        }

        return processed;
    }

    private static Cursor.Pchar.Context detectHookOpeningContext(
            String program,
            int openingBraceIndex
    ) {
        int index = openingBraceIndex - 1;

        /*
         * Skip spaces between the hook keyword and its opening brace.
         */
        while (index >= 0 && isHorizontalWhitespace(
                program.charAt(index)
        )) {
            index--;
        }

        int keywordEnd = index;

        /*
         * Read the hook keyword backwards.
         */
        while (index >= 0
                && Character.isJavaIdentifierPart(
                program.charAt(index)
        )) {
            index--;
        }

        int keywordStart = index + 1;

        if (keywordStart > keywordEnd) {
            return null;
        }

        String keyword = program.substring(
                keywordStart,
                keywordEnd + 1
        );

        Cursor.Pchar.Context detectedContext =
                switch (keyword) {
                    case "ysharp" ->
                            Cursor.Pchar.Context.YSHARP_HOOK;

                    case "lua" ->
                            Cursor.Pchar.Context.LUA_HOOK;

                    case "cbuild" ->
                            Cursor.Pchar.Context.CBUILD_HOOK;

                    default -> null;
                };

        if (detectedContext == null) {
            return null;
        }

        /*
         * A hook keyword must appear at the beginning of a line.
         * Leading spaces and tabs are allowed.
         */
        index = keywordStart - 1;

        while (index >= 0 && isHorizontalWhitespace(
                program.charAt(index)
        )) {
            index--;
        }

        boolean startsAtLineBeginning =
                index < 0
                        || program.charAt(index) == '\n'
                        || program.charAt(index) == '\r';

        return startsAtLineBeginning
                ? detectedContext
                : null;
    }

    private static boolean isHorizontalWhitespace(char character) {
        return character == ' ' || character == '\t';
    }

    private static void addCharacter(
            List<Cursor.Pchar> target,
            Cursor.CursorState cursor,
            char character,
            boolean isEscaped,
            Cursor.Pchar.EscapeType escapeType,
            Cursor.Pchar.Context context
    ) {
        target.add(new Cursor.Pchar(
                cursor.row,
                cursor.col,
                character,
                isEscaped,
                escapeType,
                context
        ));
    }

    private static void advanceCursor(
            String program,
            Cursor.CursorState cursor,
            char current
    ) {
        Cursor.advance(program, cursor);

        if (current == '\n') {
            cursor.row++;
            cursor.col = 1;
        } else {
            cursor.col++;
        }
    }

    public static String programToString(List<Cursor.Pchar> program) {
        StringBuilder builder = new StringBuilder();
        program.forEach(pc -> builder.append(pc.c));
        return builder.toString();
    }

    public static String EndOfFile(String cbuildProgram) {
        boolean exist = false;
        for(char c : cbuildProgram.toCharArray()) {
            if(c == Cursor.END) {
                exist = true;
                break;
            }
        }

        if(!exist) {
            cbuildProgram += Cursor.END;
        }

        return cbuildProgram;
    }

    public static void printPcharList(List<Cursor.Pchar> processed) {
        for(int i = 0; i < processed.size(); i++) {
            System.out.println(processed.get(i));
            System.out.println("-".repeat(20));
        }
    }



}
