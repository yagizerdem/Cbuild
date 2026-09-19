import {
  AssignmentIR,
  ConditionalIR,
  DefineIR,
  ExportIR,
  HookIR,
  IR,
  NormalRuleIR,
  UndefineIR,
} from "@src/compiler/ir.js";
import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import Interpreter from "@cbuild-backend/interpreter/interpreter.js";
import { allowedIR } from "@cbuild-backend/semantic.js";
import AssignmentIREvaluator from "@cbuild-backend/evaluator/assignment-evaluator.js";
import UndefineIREvaluator from "@cbuild-backend/evaluator/undefine-evaluator.js";
import ExportIREvaluator from "@cbuild-backend/evaluator/export-evaluator.js";
import ConditionalIREvaluator from "@cbuild-backend/evaluator/conditional-evaluator.js";
import { BaseModel } from "@src/cbuild-backend/model.js";
import ModelResolver from "@cbuild-backend/evaluator/core/model-resolver.js";

export function unsupported(ir: IR) {
  // programmatic error should never send invalid irtype to cbuild backend
  throw new Error("Unsupported IR type");
}

export default class BuildFileEvaluator {
  private readonly context: Env;
  private readonly irs: IR[];

  public constructor(context: Env, irs: IR[]) {
    this.context = context;
    this.irs = irs;
  }

  public async evaluateAsync(): Promise<BaseModel[]> {
    const resolvedModels: BaseModel[] = [];

    for (const ir of this.irs) {
      const valueExpansionEngine = new ValueExpansionEngine(this.context);

      if (ir instanceof AssignmentIR) {
        const assignmentIREvaluator = new AssignmentIREvaluator(
          this.context,
          ir,
        );
        await assignmentIREvaluator.evaluate();
      } else if (ir instanceof UndefineIR) {
        const undefineIREvaluator = new UndefineIREvaluator(this.context, ir);
        undefineIREvaluator.execute();
      } else if (ir instanceof ExportIR) {
        const exportIREvaluator = new ExportIREvaluator(this.context, ir);
        exportIREvaluator.execute();
      } else if (ir instanceof HookIR) {
        const interpreter = new Interpreter();
        interpreter.init(this.context);
        await interpreter.runAsync(ir.hookProgram);
      } else if (ir instanceof ConditionalIR) {
        const condionalIrEvaluator = new ConditionalIREvaluator(
          this.context,
          ir,
        );
        const activeBranch: IR[] = condionalIrEvaluator.execute();
        // recursively evaluate the active branch
        const evaluator = new BuildFileEvaluator(this.context, activeBranch);
        const evaluatedIR = await evaluator.evaluateAsync();
        resolvedModels.push(...evaluatedIR);
      } else if (ir instanceof DefineIR) {
        const expandedValue =
          ir.value?.exec<string>(valueExpansionEngine) ?? "";
        const identifier = ir.name?.exec<string>(valueExpansionEngine) ?? "";
        this.context.setRawVariable(identifier, expandedValue);
      } else if (ir instanceof NormalRuleIR) {
        const modelResolver = new ModelResolver(this.context);
        const resolutionResult = await modelResolver.execAsync<BaseModel[]>(ir);
        resolvedModels.push(...resolutionResult);
      } else if (!allowedIR(ir)) {
        unsupported(ir);
      } else {
        unsupported(ir);
      }
    }
    return resolvedModels;
  }
}
