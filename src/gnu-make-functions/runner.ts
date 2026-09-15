import { FunctionIR } from "@src/compiler/ir.js";

export abstract class AbstractFnRunner implements FnRunner {
  substFn(ir: FunctionIR): string {
    throw new Error("substFn not implemented.");
  }

  patsubstFn(ir: FunctionIR): string {
    throw new Error("patsubstFn not implemented.");
  }

  stripFn(ir: FunctionIR): string {
    throw new Error("stripFn not implemented.");
  }

  findstringFn(ir: FunctionIR): string {
    throw new Error("findstringFn not implemented.");
  }

  filterFn(ir: FunctionIR): string {
    throw new Error("filterFn not implemented.");
  }

  filterOutFn(ir: FunctionIR): string {
    throw new Error("filterOutFn not implemented.");
  }

  sortFn(ir: FunctionIR): string {
    throw new Error("sortFn not implemented.");
  }

  wordFn(ir: FunctionIR): string {
    throw new Error("wordFn not implemented.");
  }

  wordsFn(ir: FunctionIR): string {
    throw new Error("wordsFn not implemented.");
  }

  wordlistFn(ir: FunctionIR): string {
    throw new Error("wordlistFn not implemented.");
  }

  firstwordFn(ir: FunctionIR): string {
    throw new Error("firstwordFn not implemented.");
  }

  lastwordFn(ir: FunctionIR): string {
    throw new Error("lastwordFn not implemented.");
  }

  dirFn(ir: FunctionIR): string {
    throw new Error("dirFn not implemented.");
  }

  suffixFn(ir: FunctionIR): string {
    throw new Error("suffixFn not implemented.");
  }

  basenameFn(ir: FunctionIR): string {
    throw new Error("basenameFn not implemented.");
  }

  addsuffixFn(ir: FunctionIR): string {
    throw new Error("addsuffixFn not implemented.");
  }

  addprefixFn(ir: FunctionIR): string {
    throw new Error("addprefixFn not implemented.");
  }

  joinFn(ir: FunctionIR): string {
    throw new Error("joinFn not implemented.");
  }

  wildcardFn(ir: FunctionIR): string {
    throw new Error("wildcardFn not implemented.");
  }

  realpathFn(ir: FunctionIR): string {
    throw new Error("realpathFn not implemented.");
  }

  abspathFn(ir: FunctionIR): string {
    throw new Error("abspathFn not implemented.");
  }

  errorFn(ir: FunctionIR): string {
    throw new Error("errorFn not implemented.");
  }

  warningFn(ir: FunctionIR): string {
    throw new Error("warningFn not implemented.");
  }

  shellFn(ir: FunctionIR): string {
    throw new Error("shellFn not implemented.");
  }

  originFn(ir: FunctionIR): string {
    throw new Error("originFn not implemented.");
  }

  flavorFn(ir: FunctionIR): string {
    throw new Error("flavorFn not implemented.");
  }

  foreachFn(ir: FunctionIR): string {
    throw new Error("foreachFn not implemented.");
  }

  ifFn(ir: FunctionIR): string {
    throw new Error("ifFn not implemented.");
  }

  orFn(ir: FunctionIR): string {
    throw new Error("orFn not implemented.");
  }

  andFn(ir: FunctionIR): string {
    throw new Error("andFn not implemented.");
  }

  callFn(ir: FunctionIR): string {
    throw new Error("callFn not implemented.");
  }

  evalFn(ir: FunctionIR): string {
    throw new Error("evalFn not implemented.");
  }

  fileFn(ir: FunctionIR): string {
    throw new Error("fileFn not implemented.");
  }

  valueFn(ir: FunctionIR): string {
    throw new Error("valueFn not implemented.");
  }
}

export class BaseFnRunner extends AbstractFnRunner {
  override substFn(ir: FunctionIR): string {
    return "";
  }

  override patsubstFn(ir: FunctionIR): string {
    return "";
  }

  override stripFn(ir: FunctionIR): string {
    return "";
  }

  override findstringFn(ir: FunctionIR): string {
    return "";
  }

  override filterFn(ir: FunctionIR): string {
    return "";
  }

  override filterOutFn(ir: FunctionIR): string {
    return "";
  }

  override sortFn(ir: FunctionIR): string {
    return "";
  }

  override wordFn(ir: FunctionIR): string {
    return "";
  }

  override wordsFn(ir: FunctionIR): string {
    return "";
  }

  override wordlistFn(ir: FunctionIR): string {
    return "";
  }

  override firstwordFn(ir: FunctionIR): string {
    return "";
  }

  override lastwordFn(ir: FunctionIR): string {
    return "";
  }

  override dirFn(ir: FunctionIR): string {
    return "";
  }

  override suffixFn(ir: FunctionIR): string {
    return "";
  }

  override basenameFn(ir: FunctionIR): string {
    return "";
  }

  override addsuffixFn(ir: FunctionIR): string {
    return "";
  }

  override addprefixFn(ir: FunctionIR): string {
    return "";
  }

  override joinFn(ir: FunctionIR): string {
    return "";
  }

  override wildcardFn(ir: FunctionIR): string {
    return "";
  }

  override realpathFn(ir: FunctionIR): string {
    return "";
  }

  override abspathFn(ir: FunctionIR): string {
    return "";
  }

  override errorFn(ir: FunctionIR): string {
    return "";
  }

  override warningFn(ir: FunctionIR): string {
    return "";
  }

  override shellFn(ir: FunctionIR): string {
    return "";
  }

  override originFn(ir: FunctionIR): string {
    return "";
  }

  override flavorFn(ir: FunctionIR): string {
    return "";
  }

  override foreachFn(ir: FunctionIR): string {
    return "";
  }

  override ifFn(ir: FunctionIR): string {
    return "";
  }

  override orFn(ir: FunctionIR): string {
    return "";
  }

  override andFn(ir: FunctionIR): string {
    return "";
  }

  override callFn(ir: FunctionIR): string {
    return "";
  }

  override evalFn(ir: FunctionIR): string {
    return "";
  }

  override fileFn(ir: FunctionIR): string {
    return "";
  }

  override valueFn(ir: FunctionIR): string {
    return "";
  }
}

export interface FnRunner {
  substFn(ir: FunctionIR): string;
  patsubstFn(ir: FunctionIR): string;
  stripFn(ir: FunctionIR): string;
  findstringFn(ir: FunctionIR): string;
  filterFn(ir: FunctionIR): string;
  filterOutFn(ir: FunctionIR): string;
  sortFn(ir: FunctionIR): string;
  wordFn(ir: FunctionIR): string;
  wordsFn(ir: FunctionIR): string;
  wordlistFn(ir: FunctionIR): string;
  firstwordFn(ir: FunctionIR): string;
  lastwordFn(ir: FunctionIR): string;
  dirFn(ir: FunctionIR): string;
  suffixFn(ir: FunctionIR): string;
  basenameFn(ir: FunctionIR): string;
  addsuffixFn(ir: FunctionIR): string;
  addprefixFn(ir: FunctionIR): string;
  joinFn(ir: FunctionIR): string;
  wildcardFn(ir: FunctionIR): string;
  realpathFn(ir: FunctionIR): string;
  abspathFn(ir: FunctionIR): string;
  errorFn(ir: FunctionIR): string;
  warningFn(ir: FunctionIR): string;
  shellFn(ir: FunctionIR): string;
  originFn(ir: FunctionIR): string;
  flavorFn(ir: FunctionIR): string;
  foreachFn(ir: FunctionIR): string;
  ifFn(ir: FunctionIR): string;
  orFn(ir: FunctionIR): string;
  andFn(ir: FunctionIR): string;
  callFn(ir: FunctionIR): string;
  evalFn(ir: FunctionIR): string;
  fileFn(ir: FunctionIR): string;
  valueFn(ir: FunctionIR): string;
}
