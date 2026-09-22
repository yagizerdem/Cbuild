import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { defaultShell, ProcessRunner } from "@cbuild-backend/process.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class ShellRunner {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly activeLookups: Set<string>;

  public constructor(context: Env, activeLookups: Set<string>) {
    this.context = context;
    this.activeLookups = activeLookups;

    this.valueExpansionEngine = new ValueExpansionEngine(
      context,
      activeLookups,
    );
  }

  public run(functionIr: FunctionIR): string {
    const command = this.valueExpansionEngine.expand(functionIr.args[0]);
    const shell = defaultShell();
    const shellVariable = this.context.getVariableRecursive("SHELL");

    if (shellVariable !== undefined) {
      const shellPath = this.valueExpansionEngine
        .expand(shellVariable.value)
        .trim();

      if (shellPath !== "") {
        shell.executable = shellPath;
      }
    }

    const exportedVarsMap: NodeJS.ProcessEnv = {};
    for (const [identifier, variable] of this.context.getExportedVariables()) {
      exportedVarsMap[identifier] = this.valueExpansionEngine.expand(
        variable.value,
      );
    }

    const result = new ProcessRunner().runSync(command, {
      shell,
      cwd: process.cwd(),
      env: { ...process.env, ...exportedVarsMap },
      output: "capture",
      ignoreErrors: true,
    });

    this.context.setRawVariable(
      ".SHELLSTATUS",
      result.exitCode === null ? "" : result.exitCode.toString(),
      "automatic",
    );

    return result.stdout
      .replace(/\r\n/g, "\n")
      .replace(/\n+$/, "")
      .replace(/\n/g, " ");
  }
}
