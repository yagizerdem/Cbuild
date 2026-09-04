import { FunctionContext } from "@parser/cbuildParser";
import { FunctionIR } from "@compiler/ir";
import * as type from "@gnu-make-functions/type";

export interface MakeFunctionHandler {
  compile(ctx: FunctionContext): FunctionIR;
}

export class make_function_dispatcher {
  private static readonly handlers = new Map<string, MakeFunctionHandler>();

  private static initialized = false;

  private static initialize(): void {
    if (make_function_dispatcher.initialized) {
      return;
    }

    make_function_dispatcher.initialized = true;
    make_function_dispatcher.register("subst", new type.substFn());
    make_function_dispatcher.register("patsubst", new type.patsubstFn());
    make_function_dispatcher.register("strip", new type.stripFn());
    make_function_dispatcher.register("findstring", new type.findstringFn());
    make_function_dispatcher.register("filter", new type.filterFn());
    make_function_dispatcher.register("filter-out", new type.filterOutFn());
    make_function_dispatcher.register("sort", new type.sortFn());
    make_function_dispatcher.register("word", new type.wordFn());
    make_function_dispatcher.register("words", new type.wordsFn());
    make_function_dispatcher.register("wordlist", new type.wordlistFn());
    make_function_dispatcher.register("firstword", new type.firstwordFn());
    make_function_dispatcher.register("lastword", new type.lastwordFn());
    make_function_dispatcher.register("dir", new type.dirFn());
    make_function_dispatcher.register("suffix", new type.suffixFn());
    make_function_dispatcher.register("basename", new type.basenameFn());
    make_function_dispatcher.register("addsuffix", new type.addsuffixFn());
    make_function_dispatcher.register("addprefix", new type.addprefixFn());
    make_function_dispatcher.register("join", new type.joinFn());
    make_function_dispatcher.register("wildcard", new type.wildcardFn());
    make_function_dispatcher.register("realpath", new type.realpathFn());
    make_function_dispatcher.register("abspath", new type.abspathFn());
    make_function_dispatcher.register("error", new type.errorFn());
    make_function_dispatcher.register("warning", new type.warningFn());
    make_function_dispatcher.register("shell", new type.shellFn());
    make_function_dispatcher.register("origin", new type.originFn());
    make_function_dispatcher.register("flavor", new type.flavorFn());
    make_function_dispatcher.register("foreach", new type.foreachFn());
    make_function_dispatcher.register("if", new type.ifFn());
    make_function_dispatcher.register("or", new type.orFn());
    make_function_dispatcher.register("and", new type.andFn());
    make_function_dispatcher.register("call", new type.callFn());
    make_function_dispatcher.register("eval", new type.evalFn());
    make_function_dispatcher.register("file", new type.fileFn());
    make_function_dispatcher.register("value", new type.valueFn());
  }

  public static register(name: string, handler: MakeFunctionHandler): void {
    make_function_dispatcher.handlers.set(name, handler);
  }

  public has(name: string): boolean {
    make_function_dispatcher.initialize();
    return make_function_dispatcher.handlers.has(name);
  }

  public getHandler(name: string): MakeFunctionHandler {
    make_function_dispatcher.initialize();
    return make_function_dispatcher.handlers.get(name)!;
  }
}
