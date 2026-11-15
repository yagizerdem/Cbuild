---
title: Assignments
description: A reference for every assignment operator and specifier in CBuild, with examples.
sidebar_position: 2
---

An **assignment** gives a variable a value. In a buildfile, an assignment is a line with a variable name, an assignment operator and a value:

```buildfile
NAME operator value
```

Variables can also get values from outside the buildfile: from the environment that CBuild runs in, and from `NAME=value` arguments on the command line. CBuild also predefines some variables, such as `CC` and `CFLAGS`.

This page lists every assignment operator and specifier that CBuild supports, then shows examples of each one. The [Variables](./variables) section covers each topic in more depth, and this page links to it where it does.

## Assignment Operators

| Operator | Syntax                       | Flavor                        | When the right-hand side is expanded                                                 | More                                                                                                         |
| -------- | ---------------------------- | ----------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `=`      | `NAME = value`               | Recursive                     | Every time the variable is used                                                      | [Recursively Expanded](./variables/the-two-flavors-of-variables.md#recursively-expanded-variable-assignment) |
| `:=`     | `NAME := value`              | Simple                        | Once, when the line is read                                                          | [Simply Expanded](./variables/the-two-flavors-of-variables.md#simply-expanded-variable-assignment)           |
| `::=`    | `NAME ::= value`             | Simple                        | Once, when the line is read. POSIX spelling of `:=`                                  | [Simply Expanded](./variables/the-two-flavors-of-variables.md#simply-expanded-variable-assignment)           |
| `:::=`   | `NAME :::= value`            | Recursive                     | Once, when the line is read. The result is stored with every `$` escaped as `$$`     | [Immediately Expanded](./variables/the-two-flavors-of-variables.md#immediately-expanded-variable-assignment) |
| `?=`     | `NAME ?= value`              | Recursive                     | Like `=`, but only if `NAME` is not defined yet                                      | [Conditional](./variables/the-two-flavors-of-variables.md#conditional-variable-assignment)                   |
| `+=`     | `NAME += value`              | Keeps flavor                  | Depends on the flavor of the existing variable. Acts like `=` if `NAME` is undefined | [Appending](./variables/appending-more-text-to-variables.md)                                                 |
| `!=`     | `NAME != command`            | Recursive                     | Once. The value is run as a shell command and its output is stored                   | [Setting Variables](./variables/setting-variables.md)                                                        |
| `define` | `define NAME [op]` … `endef` | Depends on `op` (default `=`) | Same as the operator after the name                                                  | [Multi-Line Variables](./variables/multi-line-var.md)                                                        |

The operator decides the **flavor** of the variable: recursive or simple. A recursive variable stores the text as written and expands it on every use. A simple variable stores the expanded result. See [The Two Flavors of Variables](./variables/the-two-flavors-of-variables.md). You can ask CBuild for the flavor of a variable with `$(flavor NAME)`.

## Assignment Specifiers

A specifier is a keyword written before the variable name. It changes the priority of the assignment or whether the variable is exported to recipes. Every operator above accepts every specifier.

| Specifier                             | Syntax                         | Effect                                                                           | More                                              |
| ------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------- |
| _(none)_                              | `NAME = value`                 | Normal assignment from the buildfile. `$(origin NAME)` is `file`                 |                                                   |
| `override`                            | `override NAME = value`        | Wins over command-line and environment values. `$(origin NAME)` is `override`    | [The override Directive](./variables/override.md) |
| `export`                              | `export NAME = value`          | Assigns the variable and passes it to recipe commands as an environment variable |                                                   |
| `unexport`                            | `unexport NAME = value`        | Assigns the variable and stops it from being exported                            |                                                   |
| `override export` / `export override` | `override export NAME = value` | Both `override` and `export`. The two orders mean the same thing                 | [The override Directive](./variables/override.md) |

You can also use `export NAME` and `unexport NAME` with no operator. These lines do not assign anything. They only change whether an existing variable is exported.

Once a variable is exported, later assignments to it keep it exported, unless one of them uses `unexport`.

## Where Variables Come From

A variable can get its value from several sources. When two sources set the same variable, the one with the higher priority wins. An assignment with a lower priority is ignored.

| Priority    | Source                                        | `$(origin NAME)`       |
| ----------- | --------------------------------------------- | ---------------------- |
| 1 (highest) | Buildfile assignment with `override`          | `override`             |
| 2           | Command line: `cbuild NAME=value`             | `command line`         |
| 3           | Environment, when CBuild runs with `-e`       | `environment override` |
| 4           | Buildfile assignment without `override`       | `file`                 |
| 5           | Environment, without `-e`                     | `environment`          |
| 6 (lowest)  | Built-in variables, such as `CC` and `CFLAGS` | `default`              |

In short:

- **Built-in variables** can be changed by any assignment. Run CBuild with `-R` (`--no-builtin-variables`) to turn them off.
- **Environment variables** become buildfile variables. A buildfile assignment replaces them. With `-e` (`--environment-overrides`), the environment wins instead.
- **Command-line variables** win over the buildfile and the environment. Only `override` assignments can change them.
- **`override` assignments** win over everything. A later assignment without `override` cannot change them.

The same rules apply to `undefine`. See [Undefining Variables](./variables/undefine-var.md).

:::note
CBuild differs from GNU make in a few ways when it reads variables from outside the buildfile:

- Values from the command line and the environment are stored as **simple** variables, and their text is not expanded. With `cbuild 'X=$(Y)'`, the value of `X` is the literal text `$(Y)`. GNU make stores them as recursive variables.
- Only the `NAME=value` form is accepted on the command line. Arguments such as `NAME:=value` or `NAME+=value` are not treated as assignment operators.
- Environment variables with an empty value are not imported. The `SHELL` environment variable is never imported.
- Command-line variables are not exported to recipes automatically. Use `export` in the buildfile if a recipe needs them in its environment.
- Recipes always inherit the environment that CBuild was started with. `unexport` does not remove a variable that was already in that environment.
  :::

## Examples

### `=` Recursive Assignment

The value is stored as written. References are expanded when the variable is used, so they can refer to variables defined further down.

```buildfile
greeting = Hello $(name)
name = World

all:
	@echo $(greeting)
```

This prints `Hello World`, even though `name` is defined after `greeting`.

### `:=` Simple Assignment

The value is expanded once, when the line is read. Later changes to other variables do not affect it.

```buildfile
name = World
base := $(name)
name = CBuild

all:
	@echo $(base) $(name)
```

This prints `World CBuild`.

### `::=` POSIX Simple Assignment

`::=` is the same as `:=`. It is the spelling used by the POSIX standard.

```buildfile
name = World
posix ::= $(name)
name = CBuild

all:
	@echo $(posix) $(flavor posix)
```

This prints `World simple`.

### `:::=` Immediately Expanded Assignment

The value is expanded once, like `:=`, but the variable is recursive. Every `$` in the result is escaped, so the result is not expanded a second time.

```buildfile
var = first
OUT :::= $(var)
var = second

all:
	@echo $(OUT) $(flavor OUT)
```

This prints `first recursive`.

Because `OUT` is recursive, a later `+=` does not expand its right-hand side right away:

```buildfile
var = first
OUT :::= $(var)
OUT += $(var)
var = second

all:
	@echo $(OUT)
```

This prints `first second`.

### `?=` Conditional Assignment

The value is assigned only if the variable is not defined yet. A variable with an empty value is defined, so `?=` leaves it alone.

```buildfile
MODE ?= debug
MODE ?= release

EMPTY :=
EMPTY ?= value

all:
	@echo [$(MODE)] [$(EMPTY)]
```

This prints `[debug] []`. `cbuild MODE=fast` prints `[fast] []`, and so does `MODE=fast cbuild`, because both the command line and the environment define `MODE` before the buildfile is read.

:::caution
Built-in variables are already defined, so `?=` does not change them. With `CC ?= gcc`, `$(CC)` is still the built-in `cc`. Use `=` to set a built-in variable, or run CBuild with `-R`.
:::

### `+=` Append

`+=` adds a space and the new text to the end of the current value. The variable keeps its flavor.

```buildfile
FLAGS = -O2
FLAGS += -Wall
FLAGS += -Wextra

all:
	@echo $(FLAGS)
```

This prints `-O2 -Wall -Wextra`.

With a recursive variable, the new text is stored unexpanded. With a simple variable, it is expanded right away:

```buildfile
R = a
R += $(Y)

S := a
S += $(Y)

Y = b

all:
	@echo [$(R)] [$(S)]
```

This prints `[a b] [a ]`. `Y` was not defined yet when it was appended to `S`. See [Appending More Text to Variables](./variables/appending-more-text-to-variables.md).

### `!=` Shell Assignment

The right-hand side is expanded and run as a shell command. A trailing newline is removed from the output, and the other newlines become spaces.

```buildfile
FILES != echo main.c util.c

all:
	@echo $(FILES) $(flavor FILES)
```

This prints `main.c util.c recursive`. `$(shell ...)` with `:=` does the same job and gives a simple variable.

### `define` Multi-Line Assignment

`define` takes an optional operator after the name. Without one, it works like `=`.

```buildfile
bar = baz

define commands
echo foo $(bar)
endef

all:
	@$(commands)
```

This prints `foo baz`. See [Defining Multi-Line Variables](./variables/multi-line-var.md) for the other operators and the current limitations.

### `override`

An `override` assignment wins over the command line. A later plain assignment cannot change it.

```buildfile
MODE = debug
override TARGET = app
override TARGET += lib
TARGET = ignored

all:
	@echo $(MODE) $(TARGET)
```

`cbuild` prints `debug app lib`. `cbuild MODE=release TARGET=x` prints `release app lib`. See [The override Directive](./variables/override.md).

### `export` and `unexport`

An exported variable is passed to recipe commands as an environment variable. In the recipe, `$$` produces a literal `$`, so the shell sees `$GREETING`:

```buildfile
export GREETING = hello
unexport SECRET = hidden
PLAIN = plain

all:
	@echo [$$GREETING] [$$SECRET] [$$PLAIN]
```

With a POSIX shell, this prints `[hello] [] []`. `SECRET` and `PLAIN` are still buildfile variables, so `$(SECRET)` and `$(PLAIN)` work as usual. They are just not in the environment of the recipe.

:::note
On Windows, recipes run in `cmd.exe`, which uses `%NAME%` instead of `$NAME`: write `@echo [%GREETING%]`.
:::

`export` and `unexport` also work on their own, without an assignment:

```buildfile
PLAIN = plain
export PLAIN

COUNT = 1
export COUNT += 2
```

Both `PLAIN` and `COUNT` are exported, and `COUNT` is `1 2`.

### `override export`

The two specifiers can be combined in either order:

```buildfile
override export MODE = debug
export override LEVEL = 3

all:
	@echo $(MODE) $(LEVEL)
```

`cbuild MODE=release LEVEL=9` still prints `debug 3`, and recipes see `MODE` and `LEVEL` in their environment.

### Command-Line Variables

A `NAME=value` argument sets a variable for the whole run. It wins over plain assignments, including `+=`:

```buildfile
CFLAGS = -O2
CFLAGS += -fPIC

all:
	@echo $(CFLAGS) $(origin CFLAGS)
```

`cbuild CFLAGS=-g` prints `-g command line`. To keep the user's value and add to it, use `override CFLAGS += -fPIC`.

### Environment Variables

Variables in the environment become buildfile variables. A buildfile assignment wins over them, unless you run CBuild with `-e`:

```buildfile
CC = gcc
TOOL ?= default-tool

all:
	@echo $(CC) $(TOOL) [$(origin CC)] [$(origin TOOL)]
```

| Command                           | Output                                                    |
| --------------------------------- | --------------------------------------------------------- |
| `cbuild`                          | `gcc default-tool [file] [file]`                          |
| `CC=clang TOOL=env cbuild`        | `gcc env [file] [environment]`                            |
| `CC=clang TOOL=env cbuild -e`     | `clang env [environment override] [environment override]` |
| `CC=clang cbuild CC=tcc TOOL=cli` | `tcc cli [command line] [command line]`                   |

### Target-Specific Assignments

Every operator can also be used after a target name. The value is then used only in the recipe of that target:

```buildfile
CFLAGS = -O2

debug: CFLAGS = -g
debug: CFLAGS += -DDEBUG
release: CFLAGS := -O3

all: debug release

debug:
	@echo debug: $(CFLAGS)

release:
	@echo release: $(CFLAGS)
```

This prints `debug: -g -DDEBUG` and `release: -O3`. See [Target-specific Variable Values](./variables/target-specific-variable-values.md).
