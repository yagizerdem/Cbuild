package io.Cbuild;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;

public class Main {
    public static void main(String[] args) {
        String program =
"""
thing_wrong := *.o # Don't do this! '*' will not get expanded

""";

        CharStream charStream = CharStreams.fromString(program);
        cbuildLexer lexer = new cbuildLexer(charStream);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        cbuildParser parser = new cbuildParser(tokens);
        var t =  parser.cbuildfile();

    }
}