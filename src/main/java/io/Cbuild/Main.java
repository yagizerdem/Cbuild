package io.Cbuild;

import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import ysharp.treewalk.evaluator.Interpreter;
import io.Cbuild.ySharpBackend.ySharpBackend;

import java.util.List;
import java.util.Objects;

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

a : b
\t echo 

b : k
\t echo

x : y

y : b

""";
//            cBuildProgram += Cursor.END;
//            List<Cursor.Pchar> processed = Preprocessor.mergeContinuation(cBuildProgram);

            Env env = new Env();

            CharStream charStream = CharStreams.fromString(cBuildProgram);
            cbuildLexer lexer = new cbuildLexer(charStream);
            CommonTokenStream tokens = new CommonTokenStream(lexer);
            cbuildParser parser = new cbuildParser(tokens);
            parser.removeErrorListeners();
            parser.addErrorListener(ThrowingErrorListener.INSTANCE);
            cbuildParser.CbuildfileContext context = parser.cbuildfile();

            cBuildCompiler cBuildCompiler = new cBuildCompiler();
            List<cBuildIR.IR> ir = cBuildCompiler.compile(context);


            ySharpBackend backend = new ySharpBackend(env);
            List<ySharpBackend.yModel.yBaseModel> models = backend.build(ir);
            // backend.printModel(models);

            List<ySharpBackend.yModel.NormalRule> rules = models.stream().map(x -> {
                if(x instanceof ySharpBackend.yModel.NormalRule rule) return rule;
                return null;
            }).filter(Objects::nonNull).toList();

//            List<ySharpBackend.yModel.NormalRule> depGraph =  backend.getTargetSubgraph(rules);
//            backend.printModel(depGraph);
//            System.out.println("-".repeat(50));
//
//            List<ySharpBackend.yModel.NormalRule> depGraph2 =  backend.getTargetSubgraph(rules, "x");
//            backend.printModel(depGraph2);

            System.out.println(backend.getAllSubgraphs(rules));

        }catch (Exception ex) {
            System.out.println(ex.getMessage());
        }

    }



}