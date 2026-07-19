package io.Cbuild;

import java.util.ArrayList;
import java.util.List;

public class Preprocessor {

    public static List<Cursor.Pchar> mergeContinuation(List<Cursor.Pchar> program) {
        List<Cursor.Pchar> processed = new ArrayList<>();

        for(int i = 0; i < program.size(); i++) {
            if(Cursor.stopSet(program.get(i).c, Cursor.CharMask.Newline)) {
                if(program.get(i).isEscaped  && program.get(i).escapeType == Cursor.Pchar.EscapeType.BackSlash) {
                    continue;
                }
            }

            processed.add(program.get(i));
        }

        return processed;
    }

    public static List<Cursor.Pchar> convertPchar(String program) {
        Cursor.CursorState cursorState = new Cursor.CursorState(0,1, 1);

        List<Cursor.Pchar> processed = new ArrayList<>();
        while (!Cursor.stopSet(Cursor.peek(program, cursorState), Cursor.CharMask.End)){
            if(!processed.isEmpty() &&
                    Cursor.stopSet(Cursor.prev(processed, cursorState), Cursor.CharMask.BackSlash)) {

                /**
                 * Backslash escape only used for escaping new line
                 * in other conditions it has no effect
                 */

                if(!Cursor.stopSet(Cursor.peek(program, cursorState), Cursor.CharMask.Newline)
                        || Cursor.prev(processed, cursorState).isEscaped) {
                    processed.add(new Cursor.Pchar(
                            cursorState.row,
                            cursorState.col,
                            Cursor.peek(program, cursorState),
                            false,
                            null
                    ));
                    Cursor.advance(program, cursorState);
                    continue;
                }

                // new line char and not escaped
                processed.add(new Cursor.Pchar(
                        cursorState.row,
                        cursorState.col,
                        Cursor.peek(program, cursorState),
                        true,
                        Cursor.Pchar.EscapeType.BackSlash
                ));

            }
            else if(!processed.isEmpty() &&
                    Cursor.stopSet(Cursor.prev(processed, cursorState), Cursor.CharMask.Dollar)) {


                if(!Cursor.prev(processed, cursorState).isEscaped) {
                    processed.add(new Cursor.Pchar(
                            cursorState.row,
                            cursorState.col,
                            Cursor.peek(program, cursorState),
                            true,
                            Cursor.Pchar.EscapeType.Dollar
                    ));
                }
                else {
                    processed.add(new Cursor.Pchar(
                            cursorState.row,
                            cursorState.col,
                            Cursor.peek(program, cursorState),
                            false,
                            null
                    ));
                }

            }
            else {
                processed.add(new Cursor.Pchar(
                        cursorState.row,
                        cursorState.col,
                        Cursor.peek(program, cursorState),
                        false,
                        null
                ));
            }
            Cursor.advance(program, cursorState);
        }

        return processed;
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
}
