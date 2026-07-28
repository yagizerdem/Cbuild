package io.Cbuild;

import io.Cbuild.MakeParseException;
import org.antlr.v4.runtime.*;

import java.util.ArrayList;
import java.util.List;

public final class ThrowingErrorListener extends BaseErrorListener {

    private final String fileName;
    private final List<String> sourceLines;
    private final List<Cursor.Pchar> preprocessed;

    public ThrowingErrorListener(String fileName, String sourceText, List<Cursor.Pchar> preprocessed) {
        this.fileName = fileName;
        this.sourceLines = sourceText.lines().toList();
        this.preprocessed = preprocessed;
    }

    public ThrowingErrorListener(String fileName, List<String> sourceLines, List<Cursor.Pchar> preprocessed) {
        this.fileName = fileName;
        this.sourceLines = sourceLines;
        this.preprocessed = preprocessed;
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
        // line given in antlr is preprocessed char line/col , map to actual line/col of src-fil
        Cursor.Pchar pch = this.preprocessed.stream()
                .filter(x -> x.processedRow == line && x.processedCol == charPositionInLine)
                .toList()
                .getFirst();

        int srcLineNo = pch.row;
        int srcColNo = pch.col;

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
                srcLineNo >= 1 && srcLineNo <= sourceLines.size()
                        ? sourceLines.get(srcLineNo - 1)
                        : "";

        Diagnostic.ParseDiagnostic diagnostic = new Diagnostic.ParseDiagnostic(
                fileName,
                srcLineNo,
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