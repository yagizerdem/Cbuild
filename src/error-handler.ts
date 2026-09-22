import { CbuildException } from "@src/cbuild-exception.js";

export default function handleError(error: unknown): void {
  if (error instanceof Error) {
    handleBaseError(error);
  } else if (error instanceof CbuildException) {
    handleCbuildError(error);
  } else {
    handleUnknownError(error);
  }
}

function handleBaseError(error: Error): void {
  console.error(error.message);

  if (process.env.DEV_MODE) {
    console.log("--- Error Details (Base) ---");
    console.log(error);
    console.log("--- Stack Trace ---");
    console.log(error.stack);
  }
}

function handleCbuildError(error: CbuildException): void {
  console.error(error.message);

  if (process.env.DEV_MODE) {
    console.log("--- Error Details (Cbuild) ---");
    console.log(error);
    console.log("--- Stack Trace ---");
    console.log(error.stack);
  }
}

function handleUnknownError(error: unknown): void {
  console.error("An unknown error occurred:");

  if (process.env.DEV_MODE) {
    console.log("--- Error Details (Unknown) ---");
    console.log(error);
  }
}
