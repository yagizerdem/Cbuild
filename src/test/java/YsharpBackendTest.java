import com.ibm.icu.impl.Assert;
import io.Cbuild.ThrowingErrorListener;
import io.Cbuild.cBuildIR;
import io.Cbuild.ySharpBackend.*;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.stringtemplate.v4.ST;

import java.util.List;

public class YsharpBackendTest {

    private void parseBuildFile(String buildFile) {
        CharStream charStream = CharStreams.fromString(buildFile);
        cbuildLexer lexer = new cbuildLexer(charStream);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        cbuildParser parser = new cbuildParser(tokens);
        parser.removeErrorListeners();
        parser.addErrorListener(ThrowingErrorListener.INSTANCE);
        parser.cbuildfile();
    }


    @Test
    public void ExpansionBasicTest() {
        cBuildIR.ValueIR identifier = utils.createValueIR(utils.createVarRefPart(utils.createTextPart("name")));
//        cBuildIR.ValueIR value = utils.createValueIR(utils.createTextPart("foo bar"));
        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("name", "foo bar");
        String expanded = backend.expand(identifier);
        Assertions.assertEquals("foo bar", expanded);
    }

    @Test
    public void ExpansionBasicTest2() {
        cBuildIR.ValueIR identifier = utils.createValueIR(utils.createVarRefPart(
                utils.createTextPart("full "), utils.createVarRefPart(utils.createTextPart("postfix"))
        ));
//        cBuildIR.ValueIR value = utils.createValueIR(utils.createTextPart("foo bar"));
        ySharpBackend backend = new ySharpBackend();
        ySharpBackend.symbolTable.put("postfix", "name");
        ySharpBackend.symbolTable.put("full name", "yagiz erdem");
        String expanded = backend.expand(identifier);
        Assertions.assertEquals("yagiz erdem", expanded);
    }

}
