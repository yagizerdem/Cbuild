package io.Cbuild;

import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import io.Cbuild.minimal_api.minimalApi;

import java.util.List;
import java.util.Objects;

public class Main {
    public static void main(String[] args) {

//        var args_ = List.of("--minimal", "-j",  "3",  "-f" ,"cBuildFile" ,"app1", "app2").toArray(new String[0]);
//        cli cli_ = new cli(args_);
//        cli.CliParseResponse response =  cli_.parse();
//
//        var a = 10;

        run();
    }

    public static void run() {
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
a\\
b
""";
            cBuildProgram = Preprocessor.EndOfFile(cBuildProgram);
            String processed = Preprocessor.programToString(Preprocessor.mergeContinuation(Preprocessor.convertPchar(cBuildProgram)));

            Env env = new Env();

            CharStream charStream = CharStreams.fromString(processed);
            cbuildLexer lexer = new cbuildLexer(charStream);
            CommonTokenStream tokens = new CommonTokenStream(lexer);
            cbuildParser parser = new cbuildParser(tokens);
            parser.removeErrorListeners();
            parser.addErrorListener(ThrowingErrorListener.INSTANCE);
            cbuildParser.CbuildfileContext context = parser.cbuildfile();

            cBuildCompiler cBuildCompiler = new cBuildCompiler();
            List<cBuildIR.IR> ir = cBuildCompiler.compile(context);


            minimalApi backend = new minimalApi(env);
            List<minimalApi.yModel.yBaseModel> models = backend.build(ir);
            // backend.printModel(models);

            List<minimalApi.yModel.NormalRule> rules = models.stream().map(x -> {
                if(x instanceof minimalApi.yModel.NormalRule rule) return rule;
                return null;
            }).filter(Objects::nonNull).toList();

            List<minimalApi.yModel.NormalRule> depGraph =  backend.getTargetSubgraph(rules);
            backend.printModel(depGraph);
            System.out.println("-".repeat(50));

//            List<ySharpBackend.yModel.NormalRule> depGraph2 =  backend.getTargetSubgraph(rules, "x");
//            backend.printModel(depGraph2);

//            List<ySharpBackend.yModel.NormalRule> sorted = backend.topologicalSort(depGraph, depGraph.getFirst());
//            backend.printModel(sorted);


//            shell shell = new shell();
//            shell.ExecutionResult resul =  shell.runCommandCaptured("echo hit");

            //  backend.buildTargetsSequential(depGraph);

            backend.buildTargetsParallel(rules,  1);


            var a = 10;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

}