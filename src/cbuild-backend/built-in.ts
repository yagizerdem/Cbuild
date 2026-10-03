import { Env } from "@cbuild-backend/env.js";
import {
  NormalRuleIR,
  RecipeIR,
  RuleSeparator,
  textPart,
  ValueIR,
  varRefPart,
} from "@compiler/ir.js";
import { ImplicitPatterRule } from "@cbuild-backend/model.js";

export function registerBuiltInImplicitVariables(context: Env) {
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

export function registerBuiltInImplicitRules() {
  // GNU Make 10.2 - Catalogue of Built-In Rules
  // https://www.gnu.org/software/make/manual/html_node/Catalogue-of-Rules.html
  // Exact recipes: https://github.com/mirror/make/blob/master/src/default.c
  const implicitPatterRules: ImplicitPatterRule[] = [];
  implicitPatterRules.push(createCObjectImplicitRule());
  implicitPatterRules.push(createCppObjectImplicitRule());
  implicitPatterRules.push(createCapitalCObjectImplicitRule());
  implicitPatterRules.push(createCppExtensionObjectImplicitRule());
  implicitPatterRules.push(createPascalObjectImplicitRule());
  implicitPatterRules.push(createFortranObjectImplicitRule());
  implicitPatterRules.push(createPreprocessedFortranObjectImplicitRule());
  implicitPatterRules.push(createObjectiveCObjectImplicitRule());
  implicitPatterRules.push(createRatforObjectImplicitRule());
  implicitPatterRules.push(createAssemblyObjectImplicitRule());
  implicitPatterRules.push(createPreprocessedAssemblyObjectImplicitRule());
  implicitPatterRules.push(createModulaObjectImplicitRule());
  implicitPatterRules.push(createObjectExecutableImplicitRule());
  implicitPatterRules.push(createCExecutableImplicitRule());
  implicitPatterRules.push(createCppExecutableImplicitRule());
  implicitPatterRules.push(createCapitalCExecutableImplicitRule());
  implicitPatterRules.push(createCppExtensionExecutableImplicitRule());
  implicitPatterRules.push(createPascalExecutableImplicitRule());
  implicitPatterRules.push(createFortranExecutableImplicitRule());
  implicitPatterRules.push(createPreprocessedFortranExecutableImplicitRule());
  implicitPatterRules.push(createObjectiveCExecutableImplicitRule());
  implicitPatterRules.push(createRatforExecutableImplicitRule());
  implicitPatterRules.push(createModulaExecutableImplicitRule());
  implicitPatterRules.push(createCwebCImplicitRule());
  implicitPatterRules.push(createCwebWithChangeCImplicitRule());
  implicitPatterRules.push(createCwebTexImplicitRule());
  implicitPatterRules.push(createLexCImplicitRule());
  implicitPatterRules.push(createLexRatforImplicitRule());
  implicitPatterRules.push(createYaccCImplicitRule());
  implicitPatterRules.push(createTexDviImplicitRule());
  implicitPatterRules.push(createTexinfoDviImplicitRule());
  implicitPatterRules.push(createTexiDviImplicitRule());
  implicitPatterRules.push(createTxinfoDviImplicitRule());
  implicitPatterRules.push(createTexinfoInfoImplicitRule());
  implicitPatterRules.push(createTexiInfoImplicitRule());
  implicitPatterRules.push(createTxinfoInfoImplicitRule());
  implicitPatterRules.push(createAssemblyPreprocessImplicitRule());
  implicitPatterRules.push(createRcsCheckoutImplicitRule());
  implicitPatterRules.push(createRcsDirectoryCheckoutImplicitRule());
  implicitPatterRules.push(createRcsDirectoryFileCheckoutImplicitRule());
  implicitPatterRules.push(createSccsCheckoutImplicitRule());
  implicitPatterRules.push(createSccsDirectoryCheckoutImplicitRule());

  return implicitPatterRules;
}

function createCObjectImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("COMPILE.c")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("OUTPUT_OPTION")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.o",
    prerequisites: ["%.c"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createCppObjectImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("COMPILE.cc")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("OUTPUT_OPTION")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.o",
    prerequisites: ["%.cc"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createCapitalCObjectImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("COMPILE.C")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("OUTPUT_OPTION")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.o",
    prerequisites: ["%.C"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createCppExtensionObjectImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("COMPILE.cpp")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("OUTPUT_OPTION")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.o",
    prerequisites: ["%.cpp"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createPascalObjectImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("COMPILE.p")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("OUTPUT_OPTION")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.o",
    prerequisites: ["%.p"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createFortranObjectImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("COMPILE.f")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("OUTPUT_OPTION")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.o",
    prerequisites: ["%.f"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createPreprocessedFortranObjectImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("COMPILE.F")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("OUTPUT_OPTION")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.o",
    prerequisites: ["%.F"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createObjectiveCObjectImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("COMPILE.m")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("OUTPUT_OPTION")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.o",
    prerequisites: ["%.m"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createRatforObjectImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("COMPILE.r")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("OUTPUT_OPTION")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.o",
    prerequisites: ["%.r"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createAssemblyObjectImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("COMPILE.s")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.o",
    prerequisites: ["%.s"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createPreprocessedAssemblyObjectImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("COMPILE.S")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.o",
    prerequisites: ["%.S"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createModulaObjectImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("COMPILE.mod")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.o",
    prerequisites: ["%.mod"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createObjectExecutableImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("LINK.o")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("^")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LOADLIBES")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LDLIBS")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["%.o"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createCExecutableImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("LINK.c")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("^")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LOADLIBES")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LDLIBS")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["%.c"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createCppExecutableImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("LINK.cc")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("^")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LOADLIBES")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LDLIBS")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["%.cc"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createCapitalCExecutableImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("LINK.C")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("^")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LOADLIBES")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LDLIBS")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["%.C"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createCppExtensionExecutableImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("LINK.cpp")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("^")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LOADLIBES")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LDLIBS")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["%.cpp"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createPascalExecutableImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("LINK.p")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("^")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LOADLIBES")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LDLIBS")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["%.p"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createFortranExecutableImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("LINK.f")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("^")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LOADLIBES")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LDLIBS")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["%.f"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createPreprocessedFortranExecutableImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("LINK.F")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("^")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LOADLIBES")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LDLIBS")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["%.F"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createObjectiveCExecutableImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("LINK.m")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("^")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LOADLIBES")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LDLIBS")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["%.m"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createRatforExecutableImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("LINK.r")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("^")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LOADLIBES")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("LDLIBS")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["%.r"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createModulaExecutableImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("COMPILE.mod")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
      textPart(" -e "),
      varRefPart(new ValueIR([textPart("@")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("^")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["%.mod"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createCwebCImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("CTANGLE")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
      textPart(" - "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.c",
    prerequisites: ["%.w"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createCwebWithChangeCImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("CTANGLE")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("^")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.c",
    prerequisites: ["%.w", "%.ch"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createCwebTexImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("CWEAVE")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
      textPart(" - "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.tex",
    prerequisites: ["%.w"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createLexCImplicitRule(): ImplicitPatterRule {
  const cleanupRecipe = RecipeIR.command(
    new ValueIR([
      textPart("@"),
      varRefPart(new ValueIR([textPart("RM")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("LEX.l")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
      textPart(" > "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [cleanupRecipe, recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.c",
    prerequisites: ["%.l"],
    recipeIRs: [cleanupRecipe, recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createLexRatforImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("LEX.l")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
      textPart(" > "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );
  const moveRecipe = RecipeIR.command(
    new ValueIR([
      textPart("mv -f lex.yy.r "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe, moveRecipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.r",
    prerequisites: ["%.l"],
    recipeIRs: [recipe, moveRecipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createYaccCImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("YACC.y")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );
  const moveRecipe = RecipeIR.command(
    new ValueIR([
      textPart("mv -f y.tab.c "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe, moveRecipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.c",
    prerequisites: ["%.y"],
    recipeIRs: [recipe, moveRecipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createTexDviImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("TEX")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.dvi",
    prerequisites: ["%.tex"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createTexinfoDviImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("TEXI2DVI")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("TEXI2DVI_FLAGS")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.dvi",
    prerequisites: ["%.texinfo"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createTexiDviImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("TEXI2DVI")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("TEXI2DVI_FLAGS")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.dvi",
    prerequisites: ["%.texi"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createTxinfoDviImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("TEXI2DVI")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("TEXI2DVI_FLAGS")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.dvi",
    prerequisites: ["%.txinfo"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createTexinfoInfoImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("MAKEINFO")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("MAKEINFO_FLAGS")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.info",
    prerequisites: ["%.texinfo"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createTexiInfoImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("MAKEINFO")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("MAKEINFO_FLAGS")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.info",
    prerequisites: ["%.texi"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createTxinfoInfoImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("MAKEINFO")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("MAKEINFO_FLAGS")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
      textPart(" -o "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.info",
    prerequisites: ["%.txinfo"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createAssemblyPreprocessImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("PREPROCESS.S")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
      textPart(" > "),
      varRefPart(new ValueIR([textPart("@")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%.s",
    prerequisites: ["%.S"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR(),
    vpathRules: [],
  });
}

function createRcsCheckoutImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([varRefPart(new ValueIR([textPart("CHECKOUT,v")]))]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["%,v"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR({ separator: RuleSeparator.DOUBLE_COLON }),
    vpathRules: [],
  });
}

function createRcsDirectoryCheckoutImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([varRefPart(new ValueIR([textPart("CHECKOUT,v")]))]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["RCS/%,v"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR({ separator: RuleSeparator.DOUBLE_COLON }),
    vpathRules: [],
  });
}

function createRcsDirectoryFileCheckoutImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([varRefPart(new ValueIR([textPart("CHECKOUT,v")]))]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["RCS/%"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR({ separator: RuleSeparator.DOUBLE_COLON }),
    vpathRules: [],
  });
}

function createSccsCheckoutImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("GET")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("GFLAGS")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("SCCS_OUTPUT_OPTION")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["s.%"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR({ separator: RuleSeparator.DOUBLE_COLON }),
    vpathRules: [],
  });
}

function createSccsDirectoryCheckoutImplicitRule(): ImplicitPatterRule {
  const recipe = RecipeIR.command(
    new ValueIR([
      varRefPart(new ValueIR([textPart("GET")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("GFLAGS")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("SCCS_OUTPUT_OPTION")])),
      textPart(" "),
      varRefPart(new ValueIR([textPart("<")])),
    ]),
  );

  return new ImplicitPatterRule({
    evaluatedRecipeIRs: [recipe],
    orderOnlyPrerequisites: [],
    targetPattern: "%",
    prerequisites: ["SCCS/s.%"],
    recipeIRs: [recipe],
    ruleIR: new NormalRuleIR({ separator: RuleSeparator.DOUBLE_COLON }),
    vpathRules: [],
  });
}
