package io.Cbuild;

import io.Cbuild.MakeParseException;
import org.antlr.v4.runtime.*;

import java.util.List;

public final class ThrowingErrorListener extends BaseErrorListener {

    private final String fileName;
    private final List<String> sourceLines;

    public ThrowingErrorListener(String fileName, String sourceText) {
        this.fileName = fileName;
        this.sourceLines = sourceText.lines().toList();
    }

    public ThrowingErrorListener(String fileName, List<String> sourceLines) {
        this.fileName = fileName;
        this.sourceLines = sourceLines;
    }

    @Override
    public void syntaxError(
            Recognizer<?, ?> recognizer,
            Object offendingSymbol,
            int line,
            int charPositionInLine,
            String msg,
            RecognitionException exception
    ) {
        Token offendingToken =
                offendingSymbol instanceof Token token ? token : null;

        List<String> ruleStack =
                recognizer instanceof Parser parser
                        ? parser.getRuleInvocationStack()
                        : List.of();

        List<String> expectedTokens =
                recognizer instanceof Parser parser
                        ? parser.getExpectedTokens()
                        .toList()
                        .stream()
                        .map(tokenType ->
                                parser.getVocabulary()
                                        .getDisplayName(tokenType))
                        .toList()
                        : List.of();

        String sourceLine =
                line >= 1 && line <= sourceLines.size()
                        ? sourceLines.get(line - 1)
                        : "";

        Diagnostic.ParseDiagnostic diagnostic = new Diagnostic.ParseDiagnostic(
                fileName,
                line,
                charPositionInLine,
                offendingToken != null ? offendingToken.getText() : "",
                offendingToken != null ? offendingToken.getType() : Token.INVALID_TYPE,
                ruleStack,
                expectedTokens,
                msg,
                sourceLine
        );

        throw new MakeParseException(diagnostic);
    }
}