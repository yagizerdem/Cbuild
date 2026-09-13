import { expect, test } from "vitest";
import { LuaFactory } from "wasmoon";
import registerMath, { math } from "@cbuild-backend/interpreter/natives/math.js";

test("aggregates handle empty inputs, cancellation and large means", () => {
  expect(math.sum()).toBe(0);
  expect(math.sum(1e16, 1, -1e16)).toBe(1);
  expect(math.mean(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
  expect(() => math.min()).toThrow();
  expect(() => math.max()).toThrow();
  expect(() => math.mean()).toThrow();
});

test("invalid types, domains and overflow produce explicit errors", () => {
  expect(() => math.abs("2" as unknown as number)).toThrow(TypeError);
  expect(() => math.sum(1, NaN)).toThrow(TypeError);
  expect(() => math.sqrt(-1)).toThrow(RangeError);
  expect(() => math.pow(10, 1000)).toThrow(RangeError);
  expect(() => math.log(1, 1)).toThrow(RangeError);
  expect(() => math.fmod(1, 0)).toThrow(RangeError);
  expect(() => math.clamp(1, 2, 0)).toThrow(RangeError);
  expect(() => math.round(1, 1.5)).toThrow(RangeError);
});

test("rounding, signed remainder and interpolation have explicit semantics", () => {
  expect(math.round(-1.5)).toBe(-2);
  expect(math.round(1.25, 1)).toBe(1.3);
  expect(math.fmod(-7, 3)).toBe(-1);
  expect(math.lerp(-Number.MAX_VALUE, Number.MAX_VALUE, 0.5)).toBe(0);
  expect(math.lerp(10, 20, 2)).toBe(30);
  expect(math.clamp(20, 0, 10)).toBe(10);
});

test("native math works through Lua with standard libraries disabled", async () => {
  const engine = await new LuaFactory().createEngine({ openStandardLibs: false });
  try {
    registerMath(engine);
    expect(await engine.doString("return math.sum(1, 2, math.pow(3, 2))")).toBe(12);
    expect(await engine.doString("return math.min(3, -1, 2) + math.max(3, -1, 2)")).toBe(2);
    expect(await engine.doString("return math.sin(math.rad(90))")).toBeCloseTo(1);
    expect(await engine.doString("return math.log(8, 2)")).toBeCloseTo(3);
    expect(await engine.doString("return math.atan(1, 0)")).toBeCloseTo(Math.PI / 2);
    await expect(engine.doString('return math.sum(1, "2")')).rejects.toThrow();
    await expect(engine.doString("return math.sqrt(-1)")).rejects.toThrow();
  } finally {
    engine.global.close();
  }
});
