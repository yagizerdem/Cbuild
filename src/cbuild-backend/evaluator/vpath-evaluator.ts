import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { VpathIR } from "@src/compiler/ir.js";
import { VpathRule } from "../model.js";

export default class VpathIREvaluator {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly ir: VpathIR;
  constructor(context: Env, ir: VpathIR) {
    this.context = context;
    this.ir = ir;
    this.valueExpansionEngine = new ValueExpansionEngine(context);
  }

  public execute(vpaths: VpathRule[]): VpathRule[] {
    if (this.ir.vpath.type === "clear-all") {
      return [];
    } else if (this.ir.vpath.type === "clear-pattern") {
      const vpathPattern = this.valueExpansionEngine.exec(
        this.ir.vpath.pattern,
      );

      vpaths = vpaths.filter((vpath) => vpath.pattern !== vpathPattern);
      return vpaths;
    }

    const vpathPattern = this.valueExpansionEngine.exec<string>(
      this.ir.vpath.pattern,
    );
    const searchDirs: string[] = this.ir.vpath.directories.map((path) =>
      this.valueExpansionEngine.exec(path),
    );

    vpaths.push(new VpathRule(vpathPattern, searchDirs));

    return vpaths;
  }
}
