import { Env } from "@cbuild-backend/env.js";
import { textPart, ValueIR, varRefPart } from "@compiler/ir.js";

export function registerBuiltInVariables(context: Env) {
  registerBuiltInImplicitVariables(context);
}

function registerBuiltInImplicitVariables(context: Env) {
  // GNU Make 10.3 - Variables Used by Implicit Rules
  // https://www.gnu.org/software/make/manual/html_node/Implicit-Variables.html

  // Programs
  context.setRawVariable("AR", "ar", "default", false);
  context.setRawVariable("AS", "as", "default", false);
  context.setRawVariable("CC", "cc", "default", false);
  context.setRawVariable("CXX", "g++", "default", false);
  context.setDeferredVariable(
    "CPP",
    new ValueIR([
      varRefPart(new ValueIR([textPart("CC")])),
      textPart(" "),
      textPart("-E"),
    ]),
    "default",
    false,
  );
  context.setRawVariable("FC", "f77", "default", false);
  context.setRawVariable("M2C", "m2c", "default", false);
  context.setRawVariable("PC", "pc", "default", false);
  context.setRawVariable("CO", "co", "default", false);
  context.setRawVariable("GET", "get", "default", false);
  context.setRawVariable("LEX", "lex", "default", false);
  context.setRawVariable("YACC", "yacc", "default", false);
  context.setRawVariable("LINT", "lint", "default", false);
  context.setRawVariable("MAKEINFO", "makeinfo", "default", false);
  context.setRawVariable("TEX", "tex", "default", false);
  context.setRawVariable("TEXI2DVI", "texi2dvi", "default", false);
  context.setRawVariable("WEAVE", "weave", "default", false);
  context.setRawVariable("CWEAVE", "cweave", "default", false);
  context.setRawVariable("TANGLE", "tangle", "default", false);
  context.setRawVariable("CTANGLE", "ctangle", "default", false);
  context.setRawVariable("RM", "rm -f", "default", false);

  // Flags
  context.setRawVariable("ARFLAGS", "rv", "default", false);
  context.setRawVariable("ASFLAGS", "", "default", false);
  context.setRawVariable("CFLAGS", "", "default", false);
  context.setRawVariable("CXXFLAGS", "", "default", false);
  context.setRawVariable("COFLAGS", "", "default", false);
  context.setRawVariable("CPPFLAGS", "", "default", false);
  context.setRawVariable("FFLAGS", "", "default", false);
  context.setRawVariable("GFLAGS", "", "default", false);
  context.setRawVariable("LDFLAGS", "", "default", false);
  context.setRawVariable("LDLIBS", "", "default", false);
  context.setRawVariable("LOADLIBES", "", "default", false); // Deprecated alias, still supported
  context.setRawVariable("LFLAGS", "", "default", false);
  context.setRawVariable("YFLAGS", "", "default", false);
  context.setRawVariable("PFLAGS", "", "default", false);
  context.setRawVariable("RFLAGS", "", "default", false);
  context.setRawVariable("LINTFLAGS", "", "default", false);
}
