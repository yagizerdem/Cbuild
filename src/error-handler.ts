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
}

function handleCbuildError(error: CbuildException): void {
  console.error(error.message);
}

function handleUnknownError(error: unknown): void {
  console.error("An unknown error occurred:");
}
