package io.Cbuild;

import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import ysharp.treewalk.evaluator.Interpreter;
import io.Cbuild.ySharpBackend.ySharpBackend;

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

SRC = $(CORE) $(UTILS)
CORE := main.c main.h
UTILS = utils.c utils.h


ALL = $(SRC) $(EXTRA)


SNAPSHOT := $(SRC) $(EXTRA)

EXTRA = config.h

app1 app2 : $(ALL)
\t	echo build app

main.c : $(UTILS)
\t	echo build main.c

main.h : common.h
\t echo build main.h

utils.c : generated.h
\t echo build utils.c

utils.h : common.h
\t echo build utils.h

config.h : settings.h
\t echo build config.h

generated.h : schema.txt
\t echo generate generated.h

common.h :
\t echo build common.h

settings.h :
\t echo build settings.h

schema.txt :
\t echo build schema.txt
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
            backend.printModel(models);
            var a = 10;
        }catch (Exception ex) {
            System.out.println(ex.getMessage());
        }


    }
}