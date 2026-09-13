import type { LuaEngine } from "wasmoon";

/** Native math uses finite JavaScript doubles, not Lua's 64-bit integers. */
function finite(value: number, name: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(`${name}: expected a finite number`);
  }
  return value;
}

function result(value: number, name: string): number {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${name}: result is outside the finite real-number domain`);
  }
  return value;
}

function unary(name: string, operation: (value: number) => number) {
  return (value: number): number => result(operation(finite(value, name)), name);
}

function valuesChecked(values: number[], name: string, required = true): void {
  if (required && values.length === 0) {
    throw new RangeError(`${name}: expected at least one number`);
  }
  values.forEach((value) => finite(value, name));
}

export const abs = unary("abs", Math.abs);
export const floor = unary("floor", Math.floor);
export const ceil = unary("ceil", Math.ceil);
export const trunc = unary("trunc", Math.trunc);
export const sign = unary("sign", Math.sign);
export const sqrt = unary("sqrt", Math.sqrt);
export const cbrt = unary("cbrt", Math.cbrt);
export const exp = unary("exp", Math.exp);
export const sin = unary("sin", Math.sin);
export const cos = unary("cos", Math.cos);
export const tan = unary("tan", Math.tan);
export const asin = unary("asin", Math.asin);
export const acos = unary("acos", Math.acos);
export const deg = unary("deg", (value) => value * (180 / Math.PI));
export const rad = unary("rad", (value) => value * (Math.PI / 180));

/** Lua-style atan(y [, x]); angles are in radians. */
export function atan(y: number, x = 1): number {
  return Math.atan2(finite(y, "atan"), finite(x, "atan"));
}

export function pow(base: number, exponent: number): number {
  return result(finite(base, "pow") ** finite(exponent, "pow"), "pow");
}

/** Natural logarithm by default; the optional base must be positive and != 1. */
export function log(value: number, base = Math.E): number {
  finite(value, "log");
  finite(base, "log");
  if (value <= 0 || base <= 0 || base === 1) {
    throw new RangeError("log: value and base must be positive; base must not be 1");
  }
  return result(Math.log(value) / Math.log(base), "log");
}

export function min(...values: number[]): number {
  valuesChecked(values, "min");
  return values.reduce((a, b) => Math.min(a, b));
}

export function max(...values: number[]): number {
  valuesChecked(values, "max");
  return values.reduce((a, b) => Math.max(a, b));
}

/** Compensated summation reduces cancellation error. The empty sum is zero. */
export function sum(...values: number[]): number {
  valuesChecked(values, "sum", false);
  let total = 0;
  let correction = 0;
  for (const value of values) {
    const next = result(total + value, "sum");
    correction += Math.abs(total) >= Math.abs(value)
      ? (total - next) + value
      : (value - next) + total;
    total = next;
  }
  return result(total + correction, "sum");
}

export function mean(...values: number[]): number {
  valuesChecked(values, "mean");
  return sum(...values.map((value) => value / values.length));
}

/** Round to 0–15 decimal places; halfway values round away from zero. */
export function round(value: number, digits = 0): number {
  finite(value, "round");
  if (!Number.isInteger(digits) || digits < 0 || digits > 15) {
    throw new RangeError("round: digits must be an integer between 0 and 15");
  }
  const factor = 10 ** digits;
  const scaled = Math.abs(value) * factor;
  // Scaling cannot improve precision beyond the safe integer range.
  if (scaled >= Number.MAX_SAFE_INTEGER) return value;
  return Math.sign(value) * Math.round(scaled) / factor;
}

export function clamp(value: number, lower: number, upper: number): number {
  finite(value, "clamp");
  finite(lower, "clamp");
  finite(upper, "clamp");
  if (lower > upper) throw new RangeError("clamp: lower must not exceed upper");
  return Math.min(upper, Math.max(lower, value));
}

/** Linear interpolation; t outside [0, 1] extrapolates. */
export function lerp(start: number, end: number, t: number): number {
  finite(start, "lerp");
  finite(end, "lerp");
  finite(t, "lerp");
  if (t === 0) return start;
  if (t === 1) return end;
  return result((1 - t) * start + t * end, "lerp");
}

/** Remainder with the dividend's sign, matching Lua math.fmod. */
export function fmod(value: number, divisor: number): number {
  finite(value, "fmod");
  finite(divisor, "fmod");
  if (divisor === 0) throw new RangeError("fmod: divisor must not be zero");
  return value % divisor;
}

/** Arguments to aggregates are variadic numbers: math.sum(1, 2, 3). */
export const math = Object.freeze({
  pi: Math.PI, e: Math.E,
  abs, floor, ceil, trunc, sign, round,
  min, max, sum, mean, pow, sqrt, cbrt, exp, log,
  sin, cos, tan, asin, acos, atan, deg, rad,
  clamp, lerp, fmod,
});

/** Installs a fresh math table in engines without standard libraries. */
export default function register(engine: LuaEngine): void {
  engine.global.set("math", { ...math });
}
