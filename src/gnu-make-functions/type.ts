import { FunctionIR } from "@compiler/ir.js";
import { FunctionContext } from "@parser/cbuildParser.js";
import { MakeFunctionHandler } from "@gnu-make-functions/make_function_dispatcher.js";
import { compile_subst } from "@gnu-make-functions/compiler/overwrite/compile_subst.js";
import { compile_patsubst } from "@gnu-make-functions/compiler/overwrite/compile_patsubst.js";
import { compile_strip } from "@gnu-make-functions/compiler/overwrite/compile_strip.js";
import { compile_findstring } from "@gnu-make-functions/compiler/overwrite/compile_findstring.js";
import { compile_filter } from "@gnu-make-functions/compiler/overwrite/compile_filter.js";
import { compile_filter_out } from "@gnu-make-functions/compiler/overwrite/compile_filter_out.js";
import { compile_sort } from "@gnu-make-functions/compiler/overwrite/compile_sort.js";
import { compile_word } from "@gnu-make-functions/compiler/overwrite/compile_word.js";
import { compile_words } from "@gnu-make-functions/compiler/overwrite/compile_words.js";
import { compile_wordlist } from "@gnu-make-functions/compiler/overwrite/compile_wordlist.js";
import { compile_firstword } from "@gnu-make-functions/compiler/overwrite/compile_firstword.js";
import { compile_lastword } from "@gnu-make-functions/compiler/overwrite/compile_lastword.js";
import { compile_dir } from "@gnu-make-functions/compiler/overwrite/compile_dir.js";
import { compile_suffix } from "@gnu-make-functions/compiler/overwrite/compile_suffix.js";
import { compile_basename } from "@gnu-make-functions/compiler/overwrite/compile_basename.js";
import { compile_addsuffix } from "@gnu-make-functions/compiler/overwrite/compile_addsuffix.js";
import { compile_addprefix } from "@gnu-make-functions/compiler/overwrite/compile_addprefix.js";
import { compile_join } from "@gnu-make-functions/compiler/overwrite/compile_join.js";
import { compile_wildcard } from "@gnu-make-functions/compiler/overwrite/compile_wildcard.js";
import { compile_realpath } from "@gnu-make-functions/compiler/overwrite/compile_realpath.js";
import { compile_abspath } from "@gnu-make-functions/compiler/overwrite/compile_abspath.js";
import { compile_error } from "@gnu-make-functions/compiler/overwrite/compile_error.js";
import { compile_warning } from "@gnu-make-functions/compiler/overwrite/compile_warning.js";
import { compile_shell } from "@gnu-make-functions/compiler/overwrite/compile_shell.js";
import { compile_origin } from "@gnu-make-functions/compiler/overwrite/compile_origin.js";
import { compile_flavor } from "@gnu-make-functions/compiler/overwrite/compile_flavor.js";
import { compile_foreach } from "@gnu-make-functions/compiler/overwrite/compile_foreach.js";
import { compile_if } from "@gnu-make-functions/compiler/overwrite/compile_if.js";
import { compile_or } from "@gnu-make-functions/compiler/overwrite/compile_or.js";
import { compile_and } from "@gnu-make-functions/compiler/overwrite/compile_and.js";
import { compile_call } from "@gnu-make-functions/compiler/overwrite/compile_call.js";
import { compile_eval } from "@gnu-make-functions/compiler/overwrite/compile_eval.js";
import { compile_file } from "@gnu-make-functions/compiler/overwrite/compile_file.js";
import { compile_value } from "@gnu-make-functions/compiler/overwrite/compile_value.js";

export interface MakeFunction extends MakeFunctionHandler {
  arity(): number;
  getFnName(): string;
}

export class substFn implements MakeFunction {
  private readonly compiler: compile_subst;

  public constructor() {
    this.compiler = new compile_subst();
  }

  public getFnName(): string {
    return "subst";
  }

  public arity(): number {
    return 3;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class patsubstFn implements MakeFunction {
  private readonly compiler: compile_patsubst;

  public constructor() {
    this.compiler = new compile_patsubst();
  }

  public getFnName(): string {
    return "patsubst";
  }

  public arity(): number {
    return 3;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class stripFn implements MakeFunction {
  private readonly compiler: compile_strip;

  public constructor() {
    this.compiler = new compile_strip();
  }

  public getFnName(): string {
    return "strip";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class findstringFn implements MakeFunction {
  private readonly compiler: compile_findstring;

  public constructor() {
    this.compiler = new compile_findstring();
  }

  public getFnName(): string {
    return "findstring";
  }

  public arity(): number {
    return 2;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class filterFn implements MakeFunction {
  private readonly compiler: compile_filter;

  public constructor() {
    this.compiler = new compile_filter();
  }

  public getFnName(): string {
    return "filter";
  }

  public arity(): number {
    return 2;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class filterOutFn implements MakeFunction {
  private readonly compiler: compile_filter_out;

  public constructor() {
    this.compiler = new compile_filter_out();
  }

  public getFnName(): string {
    return "filter-out";
  }

  public arity(): number {
    return 2;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class sortFn implements MakeFunction {
  private readonly compiler: compile_sort;

  public constructor() {
    this.compiler = new compile_sort();
  }

  public getFnName(): string {
    return "sort";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class wordFn implements MakeFunction {
  private readonly compiler: compile_word;

  public constructor() {
    this.compiler = new compile_word();
  }

  public getFnName(): string {
    return "word";
  }

  public arity(): number {
    return 2;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class wordsFn implements MakeFunction {
  private readonly compiler: compile_words;

  public constructor() {
    this.compiler = new compile_words();
  }

  public getFnName(): string {
    return "words";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class wordlistFn implements MakeFunction {
  private readonly compiler: compile_wordlist;

  public constructor() {
    this.compiler = new compile_wordlist();
  }

  public getFnName(): string {
    return "wordlist";
  }

  public arity(): number {
    return 3;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class firstwordFn implements MakeFunction {
  private readonly compiler: compile_firstword;

  public constructor() {
    this.compiler = new compile_firstword();
  }

  public getFnName(): string {
    return "firstword";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class lastwordFn implements MakeFunction {
  private readonly compiler: compile_lastword;

  public constructor() {
    this.compiler = new compile_lastword();
  }

  public getFnName(): string {
    return "lastword";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class dirFn implements MakeFunction {
  private readonly compiler: compile_dir;

  public constructor() {
    this.compiler = new compile_dir();
  }

  public getFnName(): string {
    return "dir";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class suffixFn implements MakeFunction {
  private readonly compiler: compile_suffix;

  public constructor() {
    this.compiler = new compile_suffix();
  }

  public getFnName(): string {
    return "suffix";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class basenameFn implements MakeFunction {
  private readonly compiler: compile_basename;

  public constructor() {
    this.compiler = new compile_basename();
  }

  public getFnName(): string {
    return "basename";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class addsuffixFn implements MakeFunction {
  private readonly compiler: compile_addsuffix;

  public constructor() {
    this.compiler = new compile_addsuffix();
  }

  public getFnName(): string {
    return "addsuffix";
  }

  public arity(): number {
    return 2;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class addprefixFn implements MakeFunction {
  private readonly compiler: compile_addprefix;

  public constructor() {
    this.compiler = new compile_addprefix();
  }

  public getFnName(): string {
    return "addprefix";
  }

  public arity(): number {
    return 2;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class joinFn implements MakeFunction {
  private readonly compiler: compile_join;

  public constructor() {
    this.compiler = new compile_join();
  }

  public getFnName(): string {
    return "join";
  }

  public arity(): number {
    return 2;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class wildcardFn implements MakeFunction {
  private readonly compiler: compile_wildcard;

  public constructor() {
    this.compiler = new compile_wildcard();
  }

  public getFnName(): string {
    return "wildcard";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class realpathFn implements MakeFunction {
  private readonly compiler: compile_realpath;

  public constructor() {
    this.compiler = new compile_realpath();
  }

  public getFnName(): string {
    return "realpath";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class abspathFn implements MakeFunction {
  private readonly compiler: compile_abspath;

  public constructor() {
    this.compiler = new compile_abspath();
  }

  public getFnName(): string {
    return "abspath";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class errorFn implements MakeFunction {
  private readonly compiler: compile_error;

  public constructor() {
    this.compiler = new compile_error();
  }

  public getFnName(): string {
    return "error";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class warningFn implements MakeFunction {
  private readonly compiler: compile_warning;

  public constructor() {
    this.compiler = new compile_warning();
  }

  public getFnName(): string {
    return "warning";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class shellFn implements MakeFunction {
  private readonly compiler: compile_shell;

  public constructor() {
    this.compiler = new compile_shell();
  }

  public getFnName(): string {
    return "shell";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class originFn implements MakeFunction {
  private readonly compiler: compile_origin;

  public constructor() {
    this.compiler = new compile_origin();
  }

  public getFnName(): string {
    return "origin";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class flavorFn implements MakeFunction {
  private readonly compiler: compile_flavor;

  public constructor() {
    this.compiler = new compile_flavor();
  }

  public getFnName(): string {
    return "flavor";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class foreachFn implements MakeFunction {
  private readonly compiler: compile_foreach;

  public constructor() {
    this.compiler = new compile_foreach();
  }

  public getFnName(): string {
    return "foreach";
  }

  public arity(): number {
    return 3;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class ifFn implements MakeFunction {
  private readonly compiler: compile_if;

  public constructor() {
    this.compiler = new compile_if();
  }

  public getFnName(): string {
    return "if";
  }

  public arity(): number {
    return -1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class orFn implements MakeFunction {
  private readonly compiler: compile_or;

  public constructor() {
    this.compiler = new compile_or();
  }

  public getFnName(): string {
    return "or";
  }

  public arity(): number {
    return -1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class andFn implements MakeFunction {
  private readonly compiler: compile_and;

  public constructor() {
    this.compiler = new compile_and();
  }

  public getFnName(): string {
    return "and";
  }

  public arity(): number {
    return -1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class callFn implements MakeFunction {
  private readonly compiler: compile_call;

  public constructor() {
    this.compiler = new compile_call();
  }

  public getFnName(): string {
    return "call";
  }

  public arity(): number {
    return -1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class evalFn implements MakeFunction {
  private readonly compiler: compile_eval;

  public constructor() {
    this.compiler = new compile_eval();
  }

  public getFnName(): string {
    return "eval";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class fileFn implements MakeFunction {
  private readonly compiler: compile_file;

  public constructor() {
    this.compiler = new compile_file();
  }

  public getFnName(): string {
    return "file";
  }

  public arity(): number {
    return -1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}

export class valueFn implements MakeFunction {
  private readonly compiler: compile_value;

  public constructor() {
    this.compiler = new compile_value();
  }

  public getFnName(): string {
    return "value";
  }

  public arity(): number {
    return 1;
  }

  public compile(ctx: FunctionContext): FunctionIR {
    return this.compiler.compile(ctx, this);
  }
}
