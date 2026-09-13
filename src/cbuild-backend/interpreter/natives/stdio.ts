import { LuaEngine } from "wasmoon";

export function println(stdoutput: string) {
  process.stdout.write(stdoutput + "\n");
}

export function printErrln(stderror: string) {
  process.stderr.write(stderror + "\n");
}

export function print(stdoutput: string) {
  process.stdout.write(stdoutput);
}

export function printErr(stderror: string) {
  process.stderr.write(stderror);
}

export default function register(engine: LuaEngine) {
  engine.global.set("println", println);
  engine.global.set("printErrln", printErrln);
  engine.global.set("print", print);
  engine.global.set("printErr", printErr);

  // stdio namespace
  engine.global.set(
    "stdio",
    Object.freeze({
      println,
      printErrln,
      print,
      printErr,
    }),
  );
}
