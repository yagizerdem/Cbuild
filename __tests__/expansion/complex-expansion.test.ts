import { expect, test } from "vitest";
import { FunctionIR, RecipeIR, ValueIR } from "@src/compiler/ir.js";
import {
  ExpansionEngine,
  RecursiveVariableExpansionException,
} from "@src/cbuild-backend/expansion.js";
import { Env, SymbolTableVariable } from "@src/cbuild-backend/env.js";
import { CBuildOptions } from "@src/cli.js";

test("computed var-ref expansion with deferred name parts", () => {
  const command: ValueIR = new ValueIR([
    { kind: "text", lexeme: "c++ " },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([
        { kind: "text", lexeme: "flags_" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "mode" }]),
        },
        { kind: "text", lexeme: "_" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "language" }]),
        },
      ]),
    },
    { kind: "text", lexeme: " main.cpp" },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "selected_mode",
    SymbolTableVariable.rawVariable("debug"),
  );
  context.setVariable("language", SymbolTableVariable.rawVariable("cpp"));
  context.setVariable("flags_debug_cpp", SymbolTableVariable.rawVariable("-g"));
  context.setVariable(
    "flags_release_cpp",
    SymbolTableVariable.rawVariable("-O2"),
  );
  context.setVariable(
    "mode",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "selected_mode" }]),
        },
      ]),
    ),
  );

  const engine = new ExpansionEngine(context);
  const expanded_debug_command = engine.expand(command);

  context.setVariable(
    "selected_mode",
    SymbolTableVariable.rawVariable("release"),
  );
  const expanded_release_command = engine.expand(command);

  expect(expanded_debug_command).toEqual("c++ -g main.cpp");
  expect(expanded_release_command).toEqual("c++ -O2 main.cpp");
  expect(context.getVariable("mode")?.isDeferred()).toEqual(true);
  expect(context.getRawVariable("mode")).toEqual(null);
});

test("shared deferred dependencies do not trigger recursive cycles", () => {
  const dependencies: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "left" }]),
    },
    { kind: "text", lexeme: " / " },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "right" }]),
    },
    { kind: "text", lexeme: " / " },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "left" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("root", SymbolTableVariable.rawVariable("core"));
  context.setVariable(
    "shared",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "root" }]),
        },
        { kind: "text", lexeme: ".o" },
      ]),
    ),
  );
  context.setVariable(
    "left",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        { kind: "text", lexeme: "left:" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "shared" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "right",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        { kind: "text", lexeme: "right:" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "shared" }]),
        },
      ]),
    ),
  );

  const engine = new ExpansionEngine(context);
  const expanded_dependencies = engine.expand(dependencies);

  context.setVariable("root", SymbolTableVariable.rawVariable("utils"));
  const updated_dependencies = engine.expand(dependencies);

  expect(expanded_dependencies).toEqual(
    "left:core.o / right:core.o / left:core.o",
  );
  expect(updated_dependencies).toEqual(
    "left:utils.o / right:utils.o / left:utils.o",
  );
  expect(context.getRawVariable("shared")).toEqual(null);
  expect(context.getRawVariable("left")).toEqual(null);
  expect(context.getRawVariable("right")).toEqual(null);
  expect(context.getVariable("shared")?.isDeferred()).toEqual(true);
  expect(context.getVariable("left")?.isDeferred()).toEqual(true);
  expect(context.getVariable("right")?.isDeferred()).toEqual(true);
});

test("deferred expansion preserves raw values containing make syntax", () => {
  const message: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "message" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "literal",
    SymbolTableVariable.rawVariable("$(literal) ${name} $$HOME"),
  );
  context.setVariable("name", SymbolTableVariable.rawVariable("yagiz"));
  context.setVariable(
    "message",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        { kind: "text", lexeme: "[" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "literal" }]),
        },
        { kind: "text", lexeme: "] " },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "name" }]),
        },
      ]),
    ),
  );

  const engine = new ExpansionEngine(context);
  const expanded_message = engine.expand(message);

  expect(expanded_message).toEqual("[$(literal) ${name} $$HOME] yagiz");
  expect(context.getRawVariable("literal")).toEqual(
    "$(literal) ${name} $$HOME",
  );
  expect(context.getVariable("message")?.isDeferred()).toEqual(true);
});

test("missing computed references are reevaluated after definition", () => {
  const message: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "message" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "selected_key",
    SymbolTableVariable.rawVariable("nickname"),
  );
  context.setVariable("empty", SymbolTableVariable.rawVariable(""));
  context.setVariable(
    "message",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        { kind: "text", lexeme: "<" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([
            {
              kind: "variable-reference",
              nameExpr: new ValueIR([{ kind: "text", lexeme: "selected_key" }]),
            },
          ]),
        },
        { kind: "text", lexeme: ">[" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "empty" }]),
        },
        { kind: "text", lexeme: "]" },
      ]),
    ),
  );

  const engine = new ExpansionEngine(context);
  const expanded_missing_message = engine.expand(message);

  expect(context.hasVariable("nickname")).toEqual(false);

  context.setVariable("nickname", SymbolTableVariable.rawVariable("yagiz"));
  const expanded_defined_message = engine.expand(message);

  expect(expanded_missing_message).toEqual("<>[]");
  expect(expanded_defined_message).toEqual("<yagiz>[]");
  expect(context.getRawVariable("message")).toEqual(null);
});

test("inherited deferred values expand with local overrides", () => {
  const profile: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "profile" }]),
    },
  ]);

  const parent_context = new Env({} as CBuildOptions);
  parent_context.setVariable("name", SymbolTableVariable.rawVariable("parent"));
  parent_context.setVariable("flags", SymbolTableVariable.rawVariable("-O2"));
  parent_context.setVariable(
    "profile",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "name" }]),
        },
        { kind: "text", lexeme: ":[" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "flags" }]),
        },
        { kind: "text", lexeme: "]" },
      ]),
    ),
  );

  const middle_context = new Env({} as CBuildOptions);
  middle_context.enclosing = parent_context;
  middle_context.setVariable("name", SymbolTableVariable.rawVariable("child"));

  const context = new Env({} as CBuildOptions);
  context.enclosing = middle_context;
  context.setVariable("flags", SymbolTableVariable.rawVariable(""));

  const engine = new ExpansionEngine(context);
  const parent_engine = new ExpansionEngine(parent_context);
  const expanded_child_profile = engine.expand(profile);
  const expanded_parent_profile = parent_engine.expand(profile);

  expect(expanded_child_profile).toEqual("child:[]");
  expect(expanded_parent_profile).toEqual("parent:[-O2]");
  expect(context.hasVariable("profile")).toEqual(false);
  expect(context.hasVariable("name")).toEqual(false);
  expect(parent_context.getVariable("profile")?.isDeferred()).toEqual(true);
  expect(parent_context.getRawVariable("profile")).toEqual(null);
});

test("function calls can compute a variable name with surrounding text", () => {
  const strip: FunctionIR = new FunctionIR("strip");
  strip.args.push(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "selected_mode" }]),
      },
    ]),
  );

  const flags: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([
        { kind: "text", lexeme: "flags_" },
        { kind: "function-call", function: strip },
        { kind: "text", lexeme: "_cpp" },
      ]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "selected_mode",
    SymbolTableVariable.rawVariable("  debug\t"),
  );
  context.setVariable("flags_debug_cpp", SymbolTableVariable.rawVariable("-g"));
  context.setVariable(
    "flags_release_cpp",
    SymbolTableVariable.rawVariable("-O2"),
  );

  const engine = new ExpansionEngine(context);
  const expanded_debug_flags = engine.expand(flags);

  context.setVariable(
    "selected_mode",
    SymbolTableVariable.rawVariable("\trelease  "),
  );
  const expanded_release_flags = engine.expand(flags);

  expect(expanded_debug_flags).toEqual("-g");
  expect(expanded_release_flags).toEqual("-O2");
});

test("nested functions reevaluate deferred sources and prefixes", () => {
  const strip: FunctionIR = new FunctionIR("strip");
  strip.args.push(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "sources" }]),
      },
    ]),
  );

  const patsubst: FunctionIR = new FunctionIR("patsubst");
  patsubst.args.push(
    new ValueIR([{ kind: "text", lexeme: "%.c" }]),
    new ValueIR([{ kind: "text", lexeme: "%.o" }]),
    new ValueIR([{ kind: "function-call", function: strip }]),
  );

  const addprefix: FunctionIR = new FunctionIR("addprefix");
  addprefix.args.push(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "build_dir" }]),
      },
      { kind: "text", lexeme: "/" },
    ]),
    new ValueIR([{ kind: "function-call", function: patsubst }]),
  );

  const objects: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "objects" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "sources",
    SymbolTableVariable.rawVariable("  main.c\tutil.c\nREADME  "),
  );
  context.setVariable("build_dir", SymbolTableVariable.rawVariable("build"));
  context.setVariable(
    "objects",
    SymbolTableVariable.deferredVariable(
      new ValueIR([{ kind: "function-call", function: addprefix }]),
    ),
  );

  const engine = new ExpansionEngine(context);
  const expanded_objects = engine.expand(objects);

  context.setVariable(
    "sources",
    SymbolTableVariable.rawVariable(" next.c  notes.txt "),
  );
  context.setVariable("build_dir", SymbolTableVariable.rawVariable("release"));
  const updated_objects = engine.expand(objects);

  expect(expanded_objects).toEqual("build/main.o build/util.o build/README");
  expect(updated_objects).toEqual("release/next.o release/notes.txt");
  expect(context.getVariable("objects")?.isDeferred()).toEqual(true);
  expect(context.getRawVariable("objects")).toEqual(null);
});

test("if expansion skips recursive references in unselected branches", () => {
  const debug_choice: FunctionIR = new FunctionIR("if");
  debug_choice.args.push(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "enabled" }]),
      },
    ]),
    new ValueIR([{ kind: "text", lexeme: "debug" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "recursive_branch" }]),
      },
    ]),
  );

  const release_choice: FunctionIR = new FunctionIR("if");
  release_choice.args.push(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "disabled" }]),
      },
    ]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "recursive_branch" }]),
      },
    ]),
    new ValueIR([{ kind: "text", lexeme: "release" }]),
  );

  const choices: ValueIR = new ValueIR([
    { kind: "function-call", function: debug_choice },
    { kind: "text", lexeme: " / " },
    { kind: "function-call", function: release_choice },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable("enabled", SymbolTableVariable.rawVariable("yes"));
  context.setVariable("disabled", SymbolTableVariable.rawVariable(""));
  context.setVariable(
    "recursive_branch",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "recursive_branch" }]),
        },
      ]),
    ),
  );

  const engine = new ExpansionEngine(context);
  const expanded_choices = engine.expand(choices);

  expect(expanded_choices).toEqual("debug / release");
  expect(context.getVariable("recursive_branch")?.isDeferred()).toEqual(true);
});

test("foreach reevaluates its body and restores deferred bindings", () => {
  const foreach: FunctionIR = new FunctionIR("foreach");
  foreach.args.push(
    new ValueIR([{ kind: "text", lexeme: "item" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "sources" }]),
      },
    ]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "object" }]),
      },
    ]),
  );
  const objects: ValueIR = new ValueIR([
    { kind: "function-call", function: foreach },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "sources",
    SymbolTableVariable.rawVariable(" main\tutil "),
  );
  context.setVariable(
    "original_item",
    SymbolTableVariable.rawVariable("saved"),
  );
  const original_item = SymbolTableVariable.deferredVariable(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "original_item" }]),
      },
    ]),
    "override",
    true,
  );
  context.setVariable("item", original_item);
  context.setVariable(
    "object",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        { kind: "text", lexeme: "build/" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
        },
        { kind: "text", lexeme: ".o" },
      ]),
    ),
  );

  const engine = new ExpansionEngine(context);
  const expanded_objects = engine.expand(objects);
  const expanded_restored_item = engine.expand(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
    ]),
  );

  expect(expanded_objects).toEqual("build/main.o build/util.o");
  expect(expanded_restored_item).toEqual("saved");
  expect(context.getVariable("item")).toBe(original_item);
  expect(context.getRawVariable("item")).toEqual(null);
  expect(context.getVariable("item")?.origin).toEqual("override");
  expect(context.getVariable("item")?.isExported).toEqual(true);
  expect(context.getVariable("object")?.isDeferred()).toEqual(true);
});

test("nested foreach restores outer bindings and cleans up variables", () => {
  const inner_foreach: FunctionIR = new FunctionIR("foreach");
  inner_foreach.args.push(
    new ValueIR([{ kind: "text", lexeme: "item" }]),
    new ValueIR([{ kind: "text", lexeme: "x y" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
    ]),
  );

  const outer_foreach: FunctionIR = new FunctionIR("foreach");
  outer_foreach.args.push(
    new ValueIR([{ kind: "text", lexeme: "item" }]),
    new ValueIR([{ kind: "text", lexeme: "main util" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
      { kind: "text", lexeme: ":" },
      { kind: "function-call", function: inner_foreach },
      { kind: "text", lexeme: ":" },
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "item" }]),
      },
    ]),
  );

  const values: ValueIR = new ValueIR([
    { kind: "function-call", function: outer_foreach },
  ]);
  const context = new Env({} as CBuildOptions);
  const engine = new ExpansionEngine(context);
  const expanded_values = engine.expand(values);

  expect(expanded_values).toEqual("main:x y:main util:x y:util");
  expect(context.hasVariable("item")).toEqual(false);
  expect(context.variableCount).toEqual(0);
});

test("call expands computed names with local positional arguments", () => {
  const strip: FunctionIR = new FunctionIR("strip");
  strip.args.push(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "name" }]),
      },
    ]),
  );

  const call: FunctionIR = new FunctionIR("call");
  call.args.push(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "formatter_name" }]),
      },
    ]),
    new ValueIR([{ kind: "function-call", function: strip }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "role" }]),
      },
    ]),
  );

  const profile: ValueIR = new ValueIR([
    { kind: "function-call", function: call },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "formatter_name",
    SymbolTableVariable.rawVariable("format_profile"),
  );
  context.setVariable("name", SymbolTableVariable.rawVariable("  yagiz\t"));
  context.setVariable("role", SymbolTableVariable.rawVariable("developer"));
  context.setVariable("separator", SymbolTableVariable.rawVariable(" / "));
  context.setVariable("1", SymbolTableVariable.rawVariable("global argument"));
  context.setVariable(
    "format_profile",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "1" }]),
        },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "separator" }]),
        },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "2" }]),
        },
      ]),
    ),
  );

  const engine = new ExpansionEngine(context);
  const expanded_profile = engine.expand(profile);

  context.setVariable("name", SymbolTableVariable.rawVariable(" erdem "));
  const updated_profile = engine.expand(profile);

  expect(expanded_profile).toEqual("yagiz / developer");
  expect(updated_profile).toEqual("erdem / developer");
  expect(context.getRawVariable("1")).toEqual("global argument");
  expect(context.hasVariable("2")).toEqual(false);
  expect(context.getVariable("format_profile")?.isDeferred()).toEqual(true);
});

test("recipe expands flags, functions and automatic variables", () => {
  const addprefix: FunctionIR = new FunctionIR("addprefix");
  addprefix.args.push(
    new ValueIR([{ kind: "text", lexeme: "build/" }]),
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "^" }]),
      },
    ]),
  );

  const recipe: RecipeIR = RecipeIR.command(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "compiler" }]),
      },
      { kind: "text", lexeme: " " },
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "flags" }]),
      },
      { kind: "text", lexeme: " -o " },
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "@" }]),
      },
      { kind: "text", lexeme: " " },
      { kind: "function-call", function: addprefix },
    ]),
  );

  const context = new Env({} as CBuildOptions);
  context.setVariable("compiler", SymbolTableVariable.rawVariable("cc"));
  context.setVariable("optimization", SymbolTableVariable.rawVariable("-O2"));
  context.setVariable("@", SymbolTableVariable.rawVariable("app"));
  context.setVariable("^", SymbolTableVariable.rawVariable("main.o util.o"));
  context.setVariable(
    "flags",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "optimization" }]),
        },
        { kind: "text", lexeme: " -Wall" },
      ]),
    ),
  );

  const engine = new ExpansionEngine(context);
  const expanded_recipe = engine.expand(recipe);

  context.setVariable("optimization", SymbolTableVariable.rawVariable("-g"));
  context.setVariable("@", SymbolTableVariable.rawVariable("app-debug"));
  const updated_recipe = engine.expand(recipe);

  expect(expanded_recipe).toEqual(
    "cc -O2 -Wall -o app build/main.o build/util.o",
  );
  expect(updated_recipe).toEqual(
    "cc -g -Wall -o app-debug build/main.o build/util.o",
  );
  expect(context.getRawVariable("flags")).toEqual(null);
  expect(context.getVariable("flags")?.isDeferred()).toEqual(true);
});

test("direct deferred recursion throws an expansion exception", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "recursive_value" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "recursive_value",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        { kind: "text", lexeme: "prefix:" },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "recursive_value" }]),
        },
      ]),
    ),
  );

  const engine = new ExpansionEngine(context);

  expect(() => engine.expand(value)).toThrowError(
    new RecursiveVariableExpansionException("recursive_value"),
  );
  expect(context.getVariable("recursive_value")?.isDeferred()).toEqual(true);
  expect(context.getRawVariable("recursive_value")).toEqual(null);
});

test("indirect deferred recursion detects multi-variable cycles", () => {
  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "first" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "first",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "second" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "second",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "third" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "third",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "first" }]),
        },
      ]),
    ),
  );

  const engine = new ExpansionEngine(context);

  expect(() => engine.expand(value)).toThrowError(
    new RecursiveVariableExpansionException("first"),
  );
  expect(context.getRawVariable("first")).toEqual(null);
  expect(context.getRawVariable("second")).toEqual(null);
  expect(context.getRawVariable("third")).toEqual(null);
});

test("function arguments share recursive variable cycle detection", () => {
  const strip: FunctionIR = new FunctionIR("strip");
  strip.args.push(
    new ValueIR([
      {
        kind: "variable-reference",
        nameExpr: new ValueIR([{ kind: "text", lexeme: "alias" }]),
      },
    ]),
  );

  const value: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "recursive_value" }]),
    },
  ]);

  const context = new Env({} as CBuildOptions);
  context.setVariable(
    "recursive_value",
    SymbolTableVariable.deferredVariable(
      new ValueIR([{ kind: "function-call", function: strip }]),
    ),
  );
  context.setVariable(
    "alias",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "recursive_value" }]),
        },
      ]),
    ),
  );

  const engine = new ExpansionEngine(context);

  expect(() => engine.expand(value)).toThrowError(
    new RecursiveVariableExpansionException("recursive_value"),
  );
  expect(context.getVariable("recursive_value")?.isDeferred()).toEqual(true);
  expect(context.getVariable("alias")?.isDeferred()).toEqual(true);
});
