import { Env } from "@cbuild-backend/env.js";
import { textPart, ValueIR, varRefPart } from "./compiler/ir.js";

export function registerBuiltInVariables(context: Env) {
  registerBuiltInImplicitVariables(context);
}

function registerBuiltInImplicitVariables(context: Env) {
  // GNU Make 10.3 - Variables Used by Implicit Rules
  // https://www.gnu.org/software/make/manual/html_node/Implicit-Variables.html

  // Programs
  context.setRawVariable("AR", "ar");
  context.setRawVariable("AS", "as");
  context.setRawVariable("CC", "cc");
  context.setRawVariable("CXX", "g++");
  context.setDeferredVariable(
    "CPP",
    new ValueIR([
      varRefPart(new ValueIR([textPart("CC")])),
      textPart(" "),
      textPart("-E"),
    ]),
  );
  context.setRawVariable("FC", "f77");
  context.setRawVariable("M2C", "m2c");
  context.setRawVariable("PC", "pc");
  context.setRawVariable("CO", "co");
  context.setRawVariable("GET", "get");
  context.setRawVariable("LEX", "lex");
  context.setRawVariable("YACC", "yacc");
  context.setRawVariable("LINT", "lint");
  context.setRawVariable("MAKEINFO", "makeinfo");
  context.setRawVariable("TEX", "tex");
  context.setRawVariable("TEXI2DVI", "texi2dvi");
  context.setRawVariable("WEAVE", "weave");
  context.setRawVariable("CWEAVE", "cweave");
  context.setRawVariable("TANGLE", "tangle");
  context.setRawVariable("CTANGLE", "ctangle");
  context.setRawVariable("RM", "rm -f");

  // Flags
  context.setRawVariable("ARFLAGS", "rv");
  context.setRawVariable("ASFLAGS", "");
  context.setRawVariable("CFLAGS", "");
  context.setRawVariable("CXXFLAGS", "");
  context.setRawVariable("COFLAGS", "");
  context.setRawVariable("CPPFLAGS", "");
  context.setRawVariable("FFLAGS", "");
  context.setRawVariable("GFLAGS", "");
  context.setRawVariable("LDFLAGS", "");
  context.setRawVariable("LDLIBS", "");
  context.setRawVariable("LOADLIBES", ""); // Deprecated alias, still supported
  context.setRawVariable("LFLAGS", "");
  context.setRawVariable("YFLAGS", "");
  context.setRawVariable("PFLAGS", "");
  context.setRawVariable("RFLAGS", "");
  context.setRawVariable("LINTFLAGS", "");
}
