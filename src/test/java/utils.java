import io.Cbuild.ThrowingErrorListener;
import io.Cbuild.cBuildIR;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class utils {

    public static void runBuildFile(String buildFile) {
        CharStream charStream = CharStreams.fromString(buildFile);
        cbuildLexer lexer = new cbuildLexer(charStream);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        cbuildParser parser = new cbuildParser(tokens);
        parser.removeErrorListeners();
        parser.addErrorListener(ThrowingErrorListener.INSTANCE);
        parser.cbuildfile();
    }


    public static cBuildIR.VarRefPart createVarRefPart(cBuildIR.TextPart... parts) {
        cBuildIR.ValueIR nameExpr = new cBuildIR.ValueIR(Arrays.stream(parts).map(x -> (cBuildIR.ValuePart) x).toList());
        cBuildIR.VarRefPart varRefPart = new cBuildIR.VarRefPart(nameExpr);
        return varRefPart;
    }

    public static cBuildIR.VarRefPart createVarRefPart(String... parts) {
        List<cBuildIR.ValuePart> textParts = new ArrayList<>();
        for(String part : parts) {
            textParts.add(createTextPart(part));
        }
        cBuildIR.ValueIR nameExpr = new cBuildIR.ValueIR(textParts);
        cBuildIR.VarRefPart varRefPart = new cBuildIR.VarRefPart(nameExpr);
        return varRefPart;
    }

    public static cBuildIR.VarRefPart createVarRefPart(cBuildIR.VarRefPart... parts) {
        cBuildIR.ValueIR nameExpr = new cBuildIR.ValueIR(List.of(parts));
        cBuildIR.VarRefPart varRefPart = new cBuildIR.VarRefPart(nameExpr);
        return varRefPart;
    }

    public static cBuildIR.VarRefPart createVarRefPart(cBuildIR.ValuePart... parts) {
        cBuildIR.ValueIR nameExpr = new cBuildIR.ValueIR(List.of(parts));
        cBuildIR.VarRefPart varRefPart = new cBuildIR.VarRefPart(nameExpr);
        return varRefPart;
    }

    public static cBuildIR.TextPart createTextPart(String part) {
        return new cBuildIR.TextPart(part);
    }


    public static cBuildIR.ValueIR createValueIR(cBuildIR.ValuePart... parts) {
        return new cBuildIR.ValueIR(List.of(parts));
    }
}
