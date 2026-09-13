/// <reference lib="es2024.string" />
import { LuaEngine } from "wasmoon";

export function length(value: string) {
  return value.length;
}

export function at(value: string, index: number) {
  return value.at(index);
}

export function charAt(value: string, index: number) {
  return value.charAt(index);
}

export function charCodeAt(value: string, index: number) {
  return value.charCodeAt(index);
}

export function codePointAt(value: string, index: number) {
  return value.codePointAt(index);
}

export function concat(value: string, ...values: string[]) {
  return value.concat(...values);
}

export function includes(value: string, search: string, position?: number) {
  return value.includes(search, position);
}

export function indexOf(value: string, search: string, position?: number) {
  return value.indexOf(search, position);
}

export function lastIndexOf(value: string, search: string, position?: number) {
  return value.lastIndexOf(search, position);
}

export function startsWith(value: string, search: string, position?: number) {
  return value.startsWith(search, position);
}

export function endsWith(value: string, search: string, position?: number) {
  return value.endsWith(search, position);
}

export function slice(value: string, start: number, end?: number) {
  return value.slice(start, end);
}

export function substring(value: string, start: number, length?: number) {
  return value.substring(start, length);
}

export function padStart(value: string, length: number, fill?: string) {
  return value.padStart(length, fill);
}

export function padEnd(value: string, length: number, fill?: string) {
  return value.padEnd(length, fill);
}

export function repeat(value: string, count: number) {
  return value.repeat(count);
}

export function trim(value: string) {
  return value.trim();
}

export function trimStart(value: string) {
  return value.trimStart();
}

export function trimEnd(value: string) {
  return value.trimEnd();
}

export function toLowerCase(value: string) {
  return value.toLowerCase();
}

export function toUpperCase(value: string) {
  return value.toUpperCase();
}

export function toString(value: string) {
  return value.toString();
}

export function valueOf(value: string) {
  return value.valueOf();
}

export function isWellFormed(value: string) {
  return value.isWellFormed();
}

export function toWellFormed(value: string) {
  return value.toWellFormed();
}

export function toLocaleLowerCase(value: string, locales?: string) {
  return value.toLocaleLowerCase(locales);
}

export function toLocaleUpperCase(value: string, locales?: string) {
  return value.toLocaleUpperCase(locales);
}

export function localeCompare(
  value: string,
  other: string,
  locales?: string,
  options?: Intl.CollatorOptions,
) {
  return value.localeCompare(other, locales, options);
}

export function normalize(
  value: string,
  form?: "NFC" | "NFD" | "NFKC" | "NFKD",
) {
  return value.normalize(form);
}

export function split(value: string, separator?: string, limit?: number) {
  return separator === undefined ? [value] : value.split(separator, limit);
}

export function replace(
  value: string,
  search: string,
  replacement: string,
  flags?: string,
) {
  return value.replace(
    flags === undefined ? search : new RegExp(search, flags),
    replacement,
  );
}

export function replaceAll(
  value: string,
  search: string,
  replacement: string,
  flags?: string,
) {
  return value.replaceAll(
    flags === undefined ? search : new RegExp(search, flags),
    replacement,
  );
}

export function match(value: string, pattern: string, flags = "") {
  return value.match(new RegExp(pattern, flags));
}

export function matchAll(value: string, pattern: string, flags = "g") {
  return Array.from(value.matchAll(new RegExp(pattern, flags)));
}

export function search(value: string, pattern: string, flags = "") {
  return value.search(new RegExp(pattern, flags));
}

export function fromCharCode(...codes: number[]) {
  return String.fromCharCode(...codes);
}

export function fromCodePoint(...codes: number[]) {
  return String.fromCodePoint(...codes);
}

export function raw(segments: string[], ...substitutions: string[]) {
  return String.raw({ raw: segments }, ...substitutions);
}

export function codePoints(value: string) {
  return Array.from(value);
}

export default function register(engine: LuaEngine) {
  // string namespace
  // contains instnace and static methods for string manipulation
  engine.global.set(
    "string",
    Object.freeze({
      length,
      at,
      charAt,
      charCodeAt,
      codePointAt,
      concat,
      includes,
      indexOf,
      lastIndexOf,
      startsWith,
      endsWith,
      slice,
      substring,
      padStart,
      padEnd,
      repeat,
      trim,
      trimStart,
      trimEnd,
      toLowerCase,
      toUpperCase,
      toString,
      valueOf,
      isWellFormed,
      toWellFormed,
      toLocaleLowerCase,
      toLocaleUpperCase,
      localeCompare,
      normalize,
      split,
      replace,
      replaceAll,
      match,
      matchAll,
      search,
      fromCharCode,
      fromCodePoint,
      raw,
      codePoints,
    }),
  );

  // AI generated code, i am not sure this ll bind my custom string methods to lua string table
  const global = engine.global;
  const lua = global.lua;
  const state = global.address;
  const stackTop = global.getTop();

  try {
    global.pushValue("");

    lua.lua_createtable(state, 0, 1);

    lua.lua_getglobal(state, "string");
    lua.lua_setfield(state, -2, "__index");

    lua.lua_setmetatable(state, -2);
  } finally {
    global.setTop(stackTop);
  }
}
