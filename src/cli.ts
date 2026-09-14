import { program } from "commander";

const cli = program
  .option("--sequential <boolean>")
  .option("--cwd <string>")
  .option("--backend <string>")
  .option("-j , --jobs <number>")
  .option("--silent <boolean>");

export default cli;
