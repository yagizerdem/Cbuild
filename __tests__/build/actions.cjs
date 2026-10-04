// Real recipe program executed by the OS shell, never imported by Vitest.
const fs = require("node:fs");
const path = require("node:path");
const [action, target, ...args] = process.argv.slice(2);
function log(event) {
  fs.appendFileSync("execution.jsonl", JSON.stringify({
    event, action, target, args, cwd: process.cwd(), pid: process.pid,
  }) + "\n");
}
function output(content) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}
async function main() {
  log("start");
  switch (action) {
    case "copy": output(fs.readFileSync(args[0], "utf8")); break;
    case "upper": output(fs.readFileSync(args[0], "utf8").toUpperCase()); break;
    case "join": output(args.map((name) => fs.readFileSync(name, "utf8")).join("|")); break;
    case "write": output(args.join(" ")); break;
    case "append": fs.appendFileSync(target, args.join(" ")); break;
    case "inspect": output(JSON.stringify({ args, cwd: process.cwd(),
      exported: process.env.CBUILD_E2E_EXPORTED ?? null,
      private: process.env.CBUILD_E2E_PRIVATE ?? null })); break;
    case "fail":
      log("failure");
      process.stderr.write("RECIPE_FAILURE_SENTINEL\n");
      process.exitCode = Number(args[0] || 7);
      return;
    case "overlap": {
      fs.writeFileSync(target + ".started", "started");
      const deadline = Date.now() + 4000;
      while (!fs.existsSync(args[0] + ".started")) {
        if (Date.now() > deadline) throw new Error("Sibling job did not start concurrently");
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      output(target);
      break;
    }
    case "stream":
      process.stdout.write("STDOUT_SENTINEL\n");
      process.stderr.write("STDERR_SENTINEL\n");
      output("stream-complete");
      break;
    default: throw new Error("Unknown test action: " + action);
  }
  log("end");
}
main().catch((error) => {
  log("failure");
  process.stderr.write(String(error) + "\n");
  process.exitCode = 9;
});
