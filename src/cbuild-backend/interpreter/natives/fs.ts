import { LuaEngine } from "wasmoon";
import * as fs from "node:fs";

export function exists(path: string) {
  return fs.existsSync(path);
}

export function readFile(path: string, encoding: BufferEncoding = "utf8") {
  return fs.readFileSync(path, encoding);
}

export function writeFile(
  path: string,
  data: string,
  encoding: BufferEncoding = "utf8",
) {
  fs.writeFileSync(path, data, encoding);
}

export function appendFile(
  path: string,
  data: string,
  encoding: BufferEncoding = "utf8",
) {
  fs.appendFileSync(path, data, encoding);
}

export function readdir(path: string) {
  return fs.readdirSync(path);
}

export function mkdir(path: string, recursive = false) {
  return fs.mkdirSync(path, { recursive });
}

export function mkdtemp(prefix: string) {
  return fs.mkdtempSync(prefix);
}

export function rmdir(path: string) {
  fs.rmdirSync(path);
}

export function rm(path: string, recursive = false, force = false) {
  fs.rmSync(path, { recursive, force });
}

export function unlink(path: string) {
  fs.unlinkSync(path);
}

export function rename(oldPath: string, newPath: string) {
  fs.renameSync(oldPath, newPath);
}

export function copyFile(source: string, destination: string) {
  fs.copyFileSync(source, destination);
}

export function stat(path: string) {
  return fs.statSync(path);
}

export function lstat(path: string) {
  return fs.lstatSync(path);
}

export function isFile(path: string) {
  return fs.statSync(path).isFile();
}

export function isDirectory(path: string) {
  return fs.statSync(path).isDirectory();
}

export function realpath(path: string) {
  return fs.realpathSync(path);
}

export function readlink(path: string) {
  return fs.readlinkSync(path);
}

export function truncate(path: string, length = 0) {
  fs.truncateSync(path, length);
}

export function chmod(path: string, mode: number) {
  fs.chmodSync(path, mode);
}

export default function register(engine: LuaEngine) {
  const fsModule = Object.freeze({
    exists,
    readFile,
    writeFile,
    appendFile,
    readdir,
    mkdir,
    mkdtemp,
    rmdir,
    rm,
    unlink,
    rename,
    copyFile,
    stat,
    lstat,
    isFile,
    isDirectory,
    realpath,
    readlink,
    truncate,
    chmod,
  });

  // fs namespace
  engine.global.set("fs", { ...fsModule });
}
