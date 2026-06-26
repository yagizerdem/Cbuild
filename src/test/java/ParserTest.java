import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import org.junit.jupiter.api.Test;

public class ParserTest {

    @Test
    public void SimpleHelloWorl() {
        String buildFile =
"""
hello:
	echo "Hello, World"
""";

        CharStream charStream = CharStreams.fromString(buildFile);
        cbuildLexer lexer = new cbuildLexer(charStream);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        cbuildParser parser = new cbuildParser(tokens);
        var t =  parser.cbuildfile();

    }


    @Test
    public void SimpleCommandPreq() {
        String buildFile =
                """
targets: prerequisites
\t command
\t command
\t command
""";

        CharStream charStream = CharStreams.fromString(buildFile);
        cbuildLexer lexer = new cbuildLexer(charStream);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        cbuildParser parser = new cbuildParser(tokens);
        var t =  parser.cbuildfile();

    }

    @Test
    public void SimpleCommandPreq2() {
        String buildFile =
                """
blah: blah.o
	cc blah.o -o blah # Runs third

blah.o: blah.c
	cc -c blah.c -o blah.o # Runs second

# Typically blah.c would already exist, but I want to limit any additional required files
blah.c:
	echo "int main() { return 0; }" > blah.c # Runs first
""";

        CharStream charStream = CharStreams.fromString(buildFile);
        cbuildLexer lexer = new cbuildLexer(charStream);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        cbuildParser parser = new cbuildParser(tokens);
        var t =  parser.cbuildfile();

    }

    @Test
    public void ComplexMakefileLikeBuild() {
        String buildFile =
                """
    # Compiler settings
    CC := gcc
    CFLAGS := -Wall -Wextra -O2
    LDFLAGS :=
    
    # Objects
    objects = main.o kbd.o command.o display.o insert.o search.o files.o utils.o
    
    # Conditional flags
    ifeq ($(MODE), debug)
    CFLAGS += -g
    else
    CFLAGS += -DNDEBUG
    endif
    
    # Default target
    edit: $(objects)
    \t$(CC) $(objects) -o edit $(LDFLAGS)
    
    # Shared header dependencies
    $(objects): defs.h
    kbd.o command.o files.o: command.h
    display.o insert.o search.o files.o: buffer.h
    
    # Explicit object rules
    main.o: main.c defs.h
    \t$(CC) $(CFLAGS) -c main.c -o main.o
    
    kbd.o: kbd.c defs.h command.h
    \t$(CC) $(CFLAGS) -c kbd.c -o kbd.o
    
    command.o: command.c defs.h command.h
    \t$(CC) $(CFLAGS) -c command.c -o command.o
    
    display.o: display.c defs.h buffer.h
    \t$(CC) $(CFLAGS) -c display.c -o display.o
    
    insert.o: insert.c defs.h buffer.h
    \t$(CC) $(CFLAGS) -c insert.c -o insert.o
    
    search.o: search.c defs.h buffer.h
    \t$(CC) $(CFLAGS) -c search.c -o search.o
    
    files.o: files.c defs.h command.h buffer.h
    \t$(CC) $(CFLAGS) -c files.c -o files.o
    
    utils.o: utils.c defs.h
    \t$(CC) $(CFLAGS) -c utils.c -o utils.o
    
    # Utility target
    clean:
    \trm -f edit $(objects)
    
    # Install target
    install: edit
    \tmkdir -p /usr/local/bin
    \tcp edit /usr/local/bin/edit
    """;

        CharStream charStream = CharStreams.fromString(buildFile);
        cbuildLexer lexer = new cbuildLexer(charStream);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        cbuildParser parser = new cbuildParser(tokens);

        var t = parser.cbuildfile();
    }
}
