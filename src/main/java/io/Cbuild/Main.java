package io.Cbuild;

import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import picocli.CommandLine;
import io.Cbuild.minimal_api.minimalApi;

import java.io.File;
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

a : b c
\t echo hit a

b : x
\t echo hit b

c : x y b
\t echo hit c

x : 
\t echo hit x

y : 
\t echo hit y


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

            backend.buildTargetsParallel(rules);

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }

    }

    public static class CLI_OPTIONS {

        @CommandLine.Command(name = "--", description = "Prints a greeting")
        public static class ySharpBackend {
            @CommandLine.Option(names = "-c", description = "create a new archive")
            boolean create;

            @CommandLine.Option(names = { "-f", "--file" }, paramLabel = "ARCHIVE", description = "the archive file")
            File archive;

            @CommandLine.Parameters(paramLabel = "FILE",  description = "one or more files to archive")
            File[] files;

            @CommandLine.Option(names = { "-h", "--help" }, usageHelp = true, description = "display a help message")
            private boolean helpRequested = false;
        }
    }



}