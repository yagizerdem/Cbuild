import { ysharpVisitor } from "@ysharp/parser/ysharpVisitor.js";

class yExprEvaluator extends ysharpVisitor<number> {}

class yInterpreter extends ysharpVisitor<void> {}
