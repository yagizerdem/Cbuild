package io.Cbuild;

import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import ysharp.treewalk.evaluator.Interpreter;

import java.util.List;

public class Main {
    public static void main(String[] args) {

//        Interpreter ySharpInterpreter = new Interpreter();
//        ySharpInterpreter.cwd = System.getProperty("user.dir");
//        try {
//            ySharpRegistery.register(ySharpInterpreter);
//        }catch (Exception ex) {
//            System.err.println(ex.getMessage());
//            System.exit(1);
//        }

        try {
            String cBuildProgram = """
a=$(filter-out a, b)
""";

            CharStream charStream = CharStreams.fromString(cBuildProgram);
            cbuildLexer lexer = new cbuildLexer(charStream);
            CommonTokenStream tokens = new CommonTokenStream(lexer);
            cbuildParser parser = new cbuildParser(tokens);
            parser.removeErrorListeners();
            parser.addErrorListener(ThrowingErrorListener.INSTANCE);
            cbuildParser.CbuildfileContext context = parser.cbuildfile();

            cBuildCompiler cBuildCompiler = new cBuildCompiler();
            List<cBuildIR.IR> ir = cBuildCompiler.compile(context);
            int a = 10;

        }catch (Exception ex) {
            System.out.println(ex.getMessage());
        }


    }
}