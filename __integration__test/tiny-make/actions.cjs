// Real recipe commands. This fixture neither imports nor mocks the build backend.
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const [operation, target, ...args] = process.argv.slice(2);
const record = (event) => fs.appendFileSync("events.jsonl", JSON.stringify({
  event, target, cwd: process.cwd(), pid: process.pid,
}) + "\n");
const write = (content) => {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
};

async function main() {
  if (operation === "stdout") { process.stdout.write(target); return; }
  if (operation === "upper-stdin") {
    process.stdout.write(fs.readFileSync(0, "utf8").toUpperCase()); return;
  }
  record("start");
  switch (operation) {
    case "write": write(args[0]); break;
    case "copy": write(fs.readFileSync(args[0], "utf8")); break;
    case "upper": write(fs.readFileSync(args[0], "utf8").toUpperCase()); break;
    case "join": write(args.map((name) => fs.readFileSync(name, "utf8")).join("|")); break;
    case "append": fs.appendFileSync(target, args[0]); break;
    case "cwd": write(process.cwd()); break;
    case "delay-copy":
      await new Promise((resolve) => setTimeout(resolve, Number(args[1])));
      write(fs.readFileSync(args[0], "utf8")); break;
    case "delay-write":
      await new Promise((resolve) => setTimeout(resolve, Number(args[1])));
      write(args[0]); break;
    case "exec":
    case "capture": {
      const executable = operation === "capture" ? path.resolve(args[0]) : args[0];
      const result = spawnSync(executable, args.slice(1), { encoding: "utf8", windowsHide: true, timeout: 10000 });
      if (result.stdout) process.stdout.write(result.stdout);
      if (result.stderr) process.stderr.write(result.stderr);
      if (result.error || result.status !== 0) {
        record("failure");
        process.stderr.write(`${result.error?.message ?? "compiler failed"}\n`);
        process.exit(result.status || 1);
      }
      if (operation === "capture") write(result.stdout);
      break;
    }
    case "fail":
      record("failure"); process.stderr.write(`intentional failure ${args[0]}\n`); process.exit(Number(args[0]));
    default: throw new Error(`Unknown fixture operation: ${operation}`);
  }
  record("end");
}
main().catch((error) => { record("failure"); console.error(error); process.exitCode = 1; });
