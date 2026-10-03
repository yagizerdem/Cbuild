import { CbuildException, MachineCode } from "@src/cbuild-exception.js";
import { Env } from "./cbuild-backend/env.js";

export default class ErrorHandler {
  private context: Env | null = null;
  public constructor(context: Env | null = null) {
    this.context = context;
  }

  public handleError(error: Error): void {
    if (error instanceof CbuildException) {
      this.handleCbuildError(error);
    } else if (error instanceof Error) {
      this.handleBaseError(error);
    } else {
      this.handleUnknownError(error);
    }
  }

  handleBaseError(error: Error): void {
    console.error(error.message);

    if (process.env.DEV_MODE) {
      console.log("--- Error Details (Base) ---");
      console.log(error);
      console.log("--- Stack Trace ---");
      console.log(error.stack);
    }

    process.exit(1);
  }

  handleCbuildError(error: CbuildException): void {
    console.error(error.message);

    if (process.env.DEV_MODE) {
      console.log("--- Error Details (Cbuild) ---");
      console.log(error);
      console.log("--- Stack Trace ---");
      console.log(error.stack);
    }

    if (error.exitCode !== undefined && error.exitCode !== null) {
      process.exit(error.exitCode);
    }

    if (error.machineCode === MachineCode.REBUILD_REQUIRED) {
      process.exit(1);
    }

    if (this.context?.cliOptions.question) {
      process.exit(2);
    }

    process.exit(1);
  }

  handleUnknownError(error: unknown): void {
    console.error("An unknown error occurred:");

    if (process.env.DEV_MODE) {
      console.log("--- Error Details (Unknown) ---");
      console.log(error);
    }

    process.exit(1);
  }
}
