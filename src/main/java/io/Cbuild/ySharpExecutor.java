package io.Cbuild;

import ysharp.treewalk.YsharpException;
import ysharp.treewalk.evaluator.Interpreter;
import ysharp.treewalk.evaluator.Resolver;
import ysharp.treewalk.evaluator.Signal;
import ysharp.treewalk.lexer.Cursor;
import ysharp.treewalk.lexer.Lexer;
import ysharp.treewalk.lexer.Preprocess;

import ysharp.treewalk.parser.Parser;

import java.util.List;

public class ySharpExecutor {

    public static void exec(Interpreter interpreter, String rawProgram){
        try {

            Preprocess preprocess = new Preprocess();
            List<Cursor.Pchar> buf = preprocess.process(rawProgram);
            if(preprocess.hadErrors()){
                throw toYsharpException(preprocess.errors);
            }

            Lexer lexer = new Lexer(buf);
            var stream = lexer.scanTokens();
            if(lexer.hadErrors()) {
                throw toYsharpException(lexer.errors);
            }

            Parser parser = new Parser(stream);
            Parser.Program program = parser.parse();
            if(parser.hadErrors()) {
                throw toYsharpException(parser.errors);
            }

            // check valid subset of  ysharp is used
            ySharpSemanticAnalysis.restrictFeatures(program);

            Resolver resolver = new Resolver(interpreter);
            resolver.resolve(program.program);

            if(resolver.hadErrors()) {
                throw toYsharpException(resolver.errors);
            }

            interpreter.interpret(program.program);
            if(interpreter.hadErrors()) {
                throw toYsharpException(interpreter.errors);
            }
        }
        catch (YsharpException err) {
            throw err;
        }
        catch (Signal.ThrowSignal ex) {
            throw new YsharpException(
                    YsharpException.YsharpErrorType.PROCESS,
                    -1,
                    "Uncaught throw: " + ex.value
            );
        }
        catch (Exception ex) {
            String message = ex.getMessage() == null ? "" : ": " + ex.getMessage();
            throw new YsharpException(
                    YsharpException.YsharpErrorType.PROCESS,
                    -1,
                    "Internal error (" + ex.getClass().getSimpleName() + ")" + message
            );
        }
    }

    private static YsharpException toYsharpException(List<YsharpException> errors) {
        if (errors == null || errors.isEmpty()) {
            return new YsharpException(
                    YsharpException.YsharpErrorType.PROCESS,
                    -1,
                    "YSharp processing failed"
            );
        }

        YsharpException firstError = errors.getFirst();
        String message = String.join(
                "\n",
                errors.stream().map(ySharpExecutor::formatYsharpError).toList()
        );
        return new YsharpException(firstError.getType(), -1, message);
    }

    private static String formatYsharpError(YsharpException error) {
        if (error.getLine() < 1) {
            return error.getMessage();
        }
        return "line " + error.getLine() + ": " + error.getMessage();
    }
}
