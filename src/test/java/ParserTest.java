import io.Cbuild.frontend.HelloLexer;
import io.Cbuild.frontend.HelloParser;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;
import org.junit.jupiter.api.Test;

public class ParserTest {

    @Test
    public void HelloWorld() {

        String program = "hello world";
        CharStream input = CharStreams.fromString(program);
        HelloLexer lexer = new HelloLexer(input);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        HelloParser parser = new HelloParser(tokens);
        HelloParser.RContext context =   parser.r();
        context.
    }
}
