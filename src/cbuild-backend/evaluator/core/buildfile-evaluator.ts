import {
  AssignmentIR,
  ConditionalIR,
  DefineIR,
  ExportIR,
  HookIR,
  IncludeIR,
  IR,
  NormalRuleIR,
  RecipeIR,
  StaticPatternRuleIR,
  UndefineIR,
  VpathIR,
} from "@src/compiler/ir.js";
import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import Interpreter from "@cbuild-backend/interpreter/interpreter.js";
import { allowedIR } from "@cbuild-backend/semantic.js";
import AssignmentIREvaluator from "@cbuild-backend/evaluator/assignment-evaluator.js";
import UndefineIREvaluator from "@cbuild-backend/evaluator/undefine-evaluator.js";
import ExportIREvaluator from "@cbuild-backend/evaluator/export-evaluator.js";
import ConditionalIREvaluator from "@cbuild-backend/evaluator/conditional-evaluator.js";
import { BaseModel, VpathRule } from "@src/cbuild-backend/model.js";
import ModelResolver from "@cbuild-backend/evaluator/core/model-resolver.js";
import VpathIREvaluator from "@cbuild-backend/evaluator/vpath-evaluator.js";
import IncludeIREvaluator from "@cbuild-backend/evaluator/include-evaluator.js";
import StaticPatternIREvaluator from "@cbuild-backend/evaluator/staticpattern-evaluator.js";
import { BuildFileEvaluationState } from "@cbuild-backend/evaluator/core/type.js";

export function unsupported(ir: IR) {
  // programmatic error should never send invalid irtype to cbuild backend
  throw new Error("Unsupported IR type");
}

export default class BuildFileEvaluator {
  private readonly context: Env;
  private readonly irs: IR[];
  private evaluationState: BuildFileEvaluationState;

  public constructor(
    context: Env,
    irs: IR[],
    evaluationState: BuildFileEvaluationState,
  ) {
    this.context = context;
    this.irs = irs;
    this.evaluationState = evaluationState;
  }

  public async evaluateAsync(): Promise<BaseModel[]> {
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
        const evaluator = new BuildFileEvaluator(
          this.context,
          activeBranch,
          this.evaluationState,
        );
        const evaluatedModels = await evaluator.evaluateAsync();
        this.evaluationState.resolvedModels.push(...evaluatedModels);
      } else if (ir instanceof DefineIR) {
        const expandedValue =
          ir.value?.exec<string>(valueExpansionEngine) ?? "";
        const identifier = ir.name?.exec<string>(valueExpansionEngine) ?? "";
        this.context.setRawVariable(identifier, expandedValue);
      } else if (ir instanceof NormalRuleIR) {
        const modelResolver = new ModelResolver(
          this.context,
          this.evaluationState,
        );
        const resolutionResult = await modelResolver.execAsync<BaseModel[]>(ir);
        this.evaluationState.resolvedModels.push(...resolutionResult);
      } else if (ir instanceof VpathIR) {
        const vpathIREvaluator = new VpathIREvaluator(
          this.context,
          ir,
          this.evaluationState,
        );

        vpathIREvaluator.execute();
      } else if (ir instanceof IncludeIR) {
        const includeIREvaluator = new IncludeIREvaluator(
          this.context,
          ir,
          this.evaluationState,
        );
        const includedModels = await includeIREvaluator.executeAsync();
        this.evaluationState.resolvedModels.push(...includedModels);
      } else if (ir instanceof StaticPatternRuleIR) {
        const staticPatternRuleIREvaluator = new StaticPatternIREvaluator(
          this.context,
          ir,
        );
        const resolutionResult = staticPatternRuleIREvaluator.execute();
        this.evaluationState.resolvedModels.push(...resolutionResult);
      } else if (!allowedIR(ir)) {
        unsupported(ir);
      } else {
        unsupported(ir);
      }
    }
    return this.evaluationState.resolvedModels;
  }
}
