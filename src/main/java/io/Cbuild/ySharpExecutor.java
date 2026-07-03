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
                System.err.println(preprocess.errors);
                return;
            }

            Lexer lexer = new Lexer(buf);
            var stream = lexer.scanTokens();
            if(lexer.hadErrors()) {
                System.err.println(lexer.errors);
                return;
            }

            Parser parser = new Parser(stream);
            Parser.Program program = parser.parse();
            if(parser.hadErrors()) {
                System.err.println(parser.errors);
                return;
            }

            Resolver resolver = new Resolver(interpreter);
            resolver.resolve(program.program);

            if(resolver.hadErrors()) {
                System.err.println(resolver.errors);
                return;
            }




            interpreter.interpret(program.program);
            if(interpreter.hadErrors()) {
                System.err.println(interpreter.errors);
                return;
            }
        }
        catch (YsharpException err) {
            if(err.getPrintMessage()) {
                System.err.println("Runtime error:");
                System.err.println(err.toString());
            }
        }
        catch (Signal.ThrowSignal ex) {
            System.err.println("Uncaught throw:");
            System.err.println(ex.value.toString());
        }
        catch (Exception ex) {
            System.err.println("Process failed.");
            System.err.println("Internal error: " + ex.getClass().getSimpleName());
            System.err.println(ex.getMessage());
        }
    }
}
