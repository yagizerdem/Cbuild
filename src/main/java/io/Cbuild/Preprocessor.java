package io.Cbuild;

import java.util.ArrayList;
import java.util.List;

public class Preprocessor {

    public static List<Cursor.Pchar> mergeContinuation(String program) {
        Cursor.CursorState cursorState = new Cursor.CursorState(0,1, 1);

        List<Cursor.Pchar> processed = new ArrayList<>();
        int row = 1;
        int col = 1;

        boolean isDollarEscaped = false;
        boolean isBackSlashEscaped = false;

        while (!Cursor.stopSet(Cursor.peek(program, cursorState), Cursor.CharMask.End)){
            if(Cursor.stopSet(Cursor.peek(program, cursorState), Cursor.CharMask.Newline)) {
                if(isBackSlashEscaped) {
                    Cursor.advance(program, cursorState);// consume new line
                    continue;
                }
                col = 1;
                row += 1;
                isBackSlashEscaped = false;
                isDollarEscaped = false;

                char c = Cursor.advance(program, cursorState);
                Cursor.Pchar newPchar = new Cursor.Pchar(row, col, c);
                processed.add(newPchar);
                continue;
            }

            if(Cursor.stopSet(Cursor.prev(processed, cursorState).c, Cursor.CharMask.BackSlash)) {
                char c = Cursor.peek(program, cursorState);
                Cursor.Pchar newPchar = new Cursor.Pchar(row, col, c);
                processed.add(newPchar);
                isBackSlashEscaped = !isBackSlashEscaped;
                isDollarEscaped = false;
            }
           else  if(Cursor.stopSet(Cursor.prev(processed, cursorState).c, Cursor.CharMask.Dollar)) {
                char c = Cursor.peek(program, cursorState);
                Cursor.Pchar newPchar = new Cursor.Pchar(row, col, c);
                processed.add(newPchar);
                isDollarEscaped = !isDollarEscaped;
                isBackSlashEscaped = false;
            }
           else {
                char c = Cursor.peek(program, cursorState);
                Cursor.Pchar newPchar = new Cursor.Pchar(row, col, c);
                processed.add(newPchar);
               isDollarEscaped = false;
               isBackSlashEscaped = false;
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
}
