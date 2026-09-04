import { CharStreams, CommonTokenStream } from "antlr4ts";
import { cbuildLexer } from "./parser/cbuildLexer";
import { cbuildParser } from "./parser/cbuildParser";

var program: string = `
SRCS     = $(wildcard *.c)
OBJS     = $(SRCS:.c=.o)
DEPS     = $(SRCS:.c=.d)
`.trim();

const charStream = CharStreams.fromString(program);
const lexer = new cbuildLexer(charStream);

const tokenStream = new CommonTokenStream(lexer);
const parser = new cbuildParser(tokenStream);

const root = parser.cbuildfile();
