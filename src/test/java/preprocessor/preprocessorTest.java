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

}
