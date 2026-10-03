import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { VpathIR } from "@src/compiler/ir.js";
import { VpathRule } from "@cbuild-backend/model.js";
import { BuildFileEvaluationState } from "@cbuild-backend/evaluator/core/type.js";

export default class VpathIREvaluator {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly ir: VpathIR;
  private readonly evaluationState: BuildFileEvaluationState;
  constructor(
    context: Env,
    ir: VpathIR,
    evaluationState: BuildFileEvaluationState,
  ) {
    this.context = context;
    this.ir = ir;
    this.evaluationState = evaluationState;
    this.valueExpansionEngine = new ValueExpansionEngine(context);
  }

  public execute() {
    if (this.ir.vpath.type === "clear-all") {
      this.evaluationState.vpaths = [];
    } else if (this.ir.vpath.type === "clear-pattern") {
      const vpathPattern = this.valueExpansionEngine.exec(
        this.ir.vpath.pattern,
      );

      this.evaluationState.vpaths = this.evaluationState.vpaths.filter(
        (vpath) => vpath.pattern !== vpathPattern,
      );
    } else if (this.ir.vpath.type === "set-pattern") {
      const vpathPattern = this.valueExpansionEngine.exec<string>(
        this.ir.vpath.pattern,
      );
      const searchDirs: string[] = this.ir.vpath.directories.map((path) =>
        this.valueExpansionEngine.exec(path),
      );

      this.evaluationState.vpaths.push(new VpathRule(vpathPattern, searchDirs));
    }
  }
}
