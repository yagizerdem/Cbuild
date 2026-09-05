import { expect, test } from "vitest";
import { ValueIR } from "@src/compiler/ir.js";
import { ExpansionEngine } from "@src/cbuild-backend/expansion.js";
import { Env, Settings, SymbolTableVariable } from "@src/cbuild-backend/env.js";

test("simple-text-expansion", () => {
  const f_name: ValueIR = new ValueIR([{ kind: "text", lexeme: "jhon" }]);
  const l_name: ValueIR = new ValueIR([{ kind: "text", lexeme: "doe" }]);
  const full_name: ValueIR = new ValueIR([
    { kind: "text", lexeme: "jhon" },
    { kind: "text", lexeme: " " },
    { kind: "text", lexeme: "doe" },
  ]);

  const context = new Env({} as Settings);

  const engine = new ExpansionEngine(context);
  const expanded_f_name = engine.expand(f_name);
  const expanded_l_name = engine.expand(l_name);
  const expanded_full_name = engine.expand(full_name);

  expect(expanded_f_name).toEqual("jhon");
  expect(expanded_l_name).toEqual("doe");
  expect(expanded_full_name).toEqual("jhon doe");
});

test("var-ref expansion", () => {
  const full_name: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "f_name" }]),
    },
    {
      kind: "text",
      lexeme: " ",
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "l_name" }]),
    },
  ]);

  const context = new Env({} as Settings);

  context.setVariable("f_name", SymbolTableVariable.rawVariable("yagiz"));
  context.setVariable("l_name", SymbolTableVariable.rawVariable("erdem"));

  const engine = new ExpansionEngine(context);
  const expanded_full_name = engine.expand(full_name);

  expect(expanded_full_name).toEqual("yagiz erdem");
});

test("deep recursive var-ref expansion", () => {
  const full_name: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([
            {
              kind: "variable-reference",
              nameExpr: new ValueIR([
                {
                  kind: "variable-reference",
                  nameExpr: new ValueIR([
                    { kind: "text", lexeme: "f_name_ref" },
                  ]),
                },
              ]),
            },
          ]),
        },
      ]),
    },
    {
      kind: "text",
      lexeme: " ",
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([
            {
              kind: "variable-reference",
              nameExpr: new ValueIR([
                {
                  kind: "variable-reference",
                  nameExpr: new ValueIR([
                    { kind: "text", lexeme: "l_name_ref" },
                  ]),
                },
              ]),
            },
          ]),
        },
      ]),
    },
  ]);
  const context = new Env({} as Settings);
  context.setVariable(
    "f_name_ref",
    SymbolTableVariable.rawVariable("f_name_alias"),
  );
  context.setVariable(
    "f_name_alias",
    SymbolTableVariable.rawVariable("f_name_key"),
  );
  context.setVariable("f_name_key", SymbolTableVariable.rawVariable("f_name"));
  context.setVariable("f_name", SymbolTableVariable.rawVariable("yagiz"));
  context.setVariable(
    "l_name_ref",
    SymbolTableVariable.rawVariable("l_name_alias"),
  );
  context.setVariable(
    "l_name_alias",
    SymbolTableVariable.rawVariable("l_name_key"),
  );
  context.setVariable("l_name_key", SymbolTableVariable.rawVariable("l_name"));
  context.setVariable("l_name", SymbolTableVariable.rawVariable("erdem"));
  const engine = new ExpansionEngine(context);
  const expanded_full_name = engine.expand(full_name);
  expect(expanded_full_name).toEqual("yagiz erdem");
});

test("deferred var-ref expansion simple", () => {
  const full_name: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "f_name" }]),
    },
    {
      kind: "text",
      lexeme: " ",
    },
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "l_name" }]),
    },
  ]);

  const context = new Env({} as Settings);

  context.setVariable(
    "f_name",
    SymbolTableVariable.deferredVariable(
      new ValueIR([{ kind: "text", lexeme: "yagiz" }]),
    ),
  );
  context.setVariable(
    "l_name",
    SymbolTableVariable.deferredVariable(
      new ValueIR([{ kind: "text", lexeme: "erdem" }]),
    ),
  );

  const engine = new ExpansionEngine(context);

  // before expansion
  expect(context.getRawVariable("f_name")).toEqual(null);
  expect(context.getRawVariable("l_name")).toEqual(null);
  expect(context.getVariable("f_name")?.isDeferred()).toEqual(true);
  expect(context.getVariable("f_name")?.getRawValue()).toEqual(null);

  const expanded_full_name = engine.expand(full_name);

  // after expansion
  expect(context.hasVariable("f_name")).toEqual(true);
  expect(context.getVariable("f_name")?.isDeferred()).toEqual(true);
  expect(expanded_full_name).toEqual("yagiz erdem");
  expect(context.getRawVariable("f_name")).toEqual("yagiz");
  expect(context.getRawVariable("l_name")).toEqual("erdem");
});

test("deep recursive deferred var-ref expansion", () => {
  const full_name: ValueIR = new ValueIR([
    {
      kind: "variable-reference",
      nameExpr: new ValueIR([{ kind: "text", lexeme: "full_name" }]),
    },
  ]);
  const context = new Env({} as Settings);
  context.setVariable("f_name", SymbolTableVariable.rawVariable("yagiz"));
  context.setVariable("l_name", SymbolTableVariable.rawVariable("erdem"));
  context.setVariable(
    "first_name",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "f_name" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "last_name",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "l_name" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "display_name",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "first_name" }]),
        },
        {
          kind: "text",
          lexeme: " ",
        },
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "last_name" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "profile_name",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "display_name" }]),
        },
      ]),
    ),
  );
  context.setVariable(
    "full_name",
    SymbolTableVariable.deferredVariable(
      new ValueIR([
        {
          kind: "variable-reference",
          nameExpr: new ValueIR([{ kind: "text", lexeme: "profile_name" }]),
        },
      ]),
    ),
  );
  const engine = new ExpansionEngine(context);

  // before expansion
  expect(context.getRawVariable("first_name")).toEqual(null);
  expect(context.getRawVariable("last_name")).toEqual(null);
  expect(context.getRawVariable("display_name")).toEqual(null);
  expect(context.getRawVariable("profile_name")).toEqual(null);
  expect(context.getRawVariable("full_name")).toEqual(null);

  const expanded_full_name = engine.expand(full_name);

  // after expansion
  expect(expanded_full_name).toEqual("yagiz erdem");
  expect(context.getRawVariable("first_name")).toEqual("yagiz");
  expect(context.getRawVariable("last_name")).toEqual("erdem");
  expect(context.getRawVariable("display_name")).toEqual("yagiz erdem");
  expect(context.getRawVariable("profile_name")).toEqual("yagiz erdem");
  expect(context.getRawVariable("full_name")).toEqual("yagiz erdem");
  expect(context.getVariable("first_name")?.isDeferred()).toEqual(true);
  expect(context.getVariable("last_name")?.isDeferred()).toEqual(true);
  expect(context.getVariable("display_name")?.isDeferred()).toEqual(true);
  expect(context.getVariable("profile_name")?.isDeferred()).toEqual(true);
  expect(context.getVariable("full_name")?.isDeferred()).toEqual(true);
});
