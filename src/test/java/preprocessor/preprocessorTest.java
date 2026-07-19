package preprocessor;

import io.Cbuild.Cursor;
import io.Cbuild.Preprocessor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

public class preprocessorTest {

    @Test
    public void PcharConverterBasic1() {
        String cBuildProgram = """
a\\
b
""";
        cBuildProgram = Preprocessor.EndOfFile(cBuildProgram);
        List<Cursor.Pchar> processed = Preprocessor.convertPchar(cBuildProgram);

        Assertions.assertEquals(5, processed.size());
        Assertions.assertTrue(processed.get(2).isEscaped);
        Assertions.assertEquals(Cursor.Pchar.EscapeType.BackSlash, processed.get(2).escapeType);
    }

    @Test
    public void PcharConverterBasic2() {
        String cBuildProgram = """
a $\\
b
""";
        cBuildProgram = Preprocessor.EndOfFile(cBuildProgram);
        List<Cursor.Pchar> processed = Preprocessor.convertPchar(cBuildProgram);

        Assertions.assertEquals(7, processed.size());
        Assertions.assertFalse(processed.get(5).isEscaped);
    }

    @Test
    void hookBodyShouldNotApplyEscaping() {
        String hookContinuation =
                "    hookValue = first "
                        + '\\'
                        + "\nsecond\n";

        String normalContinuation =
                "normalValue = first "
                        + '\\'
                        + "\nsecond\n";

        String program =
                "ysharp " + " {\n"
                        + hookContinuation
                        + "    value = $$\n"
                        + "}\n"
                        + normalContinuation;

        List<Cursor.Pchar> processed =
                Preprocessor.convertPchar(
                        Preprocessor.EndOfFile(program)
                );

        int hookBackslash =
                program.indexOf('\\');

        int normalBackslash =
                program.lastIndexOf('\\');

        Cursor.Pchar hookNewline =
                processed.get(hookBackslash + 1);

        Cursor.Pchar normalNewline =
                processed.get(normalBackslash + 1);

        Assertions.assertEquals(
                Cursor.Pchar.Context.YSHARP_HOOK,
                hookNewline.context
        );

        Assertions.assertFalse(
                hookNewline.isEscaped,
                "Hook newline must not be escaped"
        );

        /*
         * Backslash-newline in the normal document must be escaped.
         */
        Assertions.assertEquals(
                Cursor.Pchar.Context.NORMAL,
                normalNewline.context
        );

        Assertions.assertTrue(
                normalNewline.isEscaped,
                "Normal CBuild newline must be escaped"
        );

        Assertions.assertEquals(
                Cursor.Pchar.EscapeType.BackSlash,
                normalNewline.escapeType
        );

        var merged = Preprocessor.mergeContinuation(processed);
        System.out.println(Preprocessor.programToString(merged));
    }

}
