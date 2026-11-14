---
title: The Two Flavors of Variables
description: Learn how recursive, simple, immediate and conditional assignments give a variable its value in a buildfile.
sidebar_position: 2
---

A variable in a buildfile can get its value in several ways. These ways are called the **flavors** of variables. The flavors differ in two things: what happens to the value when it is assigned, and what happens to it later, when the variable is used and expanded.

CBuild supports the same assignment operators as GNU make:

| Operator      | Flavor      | When the right-hand side is expanded                             |
| ------------- | ----------- | ---------------------------------------------------------------- |
| `=`           | Recursive   | Every time the variable is used                                  |
| `:=` or `::=` | Simple      | Once, when the variable is assigned                              |
| `:::=`        | Immediate   | Once, when assigned, and the result is kept as a recursive value |
| `?=`          | Conditional | Like `=`, but only if the variable is not defined yet            |

## Recursively Expanded Variable Assignment

The first flavor is the **recursively expanded** variable. You define it with `=` or with the `define` directive. CBuild stores the value exactly as you wrote it. If the value contains references to other variables, those references are expanded each time this variable is substituted. This is called recursive expansion.

```buildfile
foo = $(bar)
bar = $(ugh)
ugh = Huh?

all:
	echo $(foo)
```

This prints `Huh?`: `$(foo)` expands to `$(bar)`, which expands to `$(ugh)`, which finally expands to `Huh?`.

The advantage of this flavor is that the order of definitions does not matter. A variable can refer to another variable that is defined further down:

```buildfile
CFLAGS = $(include_dirs) -O
include_dirs = -Ifoo -Ibar
```

When `CFLAGS` is expanded in a recipe, it becomes `-Ifoo -Ibar -O`.

The flavor has two disadvantages.

**You cannot append to the variable using its own value.** The following line would expand forever:

```buildfile
CFLAGS = $(CFLAGS) -O
```

CBuild detects the loop and stops with an error:

```text
Recursive variable expansion: CFLAGS
```

Use `+=` or a simply expanded variable instead.

**Functions in the value run on every use.** Any function referenced in the definition is called again each time the variable is expanded. This makes the build slower. It also makes `wildcard` and `shell` hard to predict, because you cannot easily control when they run, or how many times.

## Simply Expanded Variable Assignment

To avoid these problems, use a **simply expanded** variable. You define it with `:=` or `::=`. The two operators are equivalent in CBuild. `::=` is the form described by the POSIX standard.

The value is scanned once, when the variable is defined. All references to other variables and functions are expanded at that moment. After that, the value is never expanded again: when the variable is used, its value is copied as it is. If the value referred to other variables, the result holds their values as of the time of the definition.

```buildfile
x := foo
y := $(x) bar
x := later
```

is equivalent to

```buildfile
y := foo bar
x := later
```

Simply expanded variables are a good fit for the `shell` function, because the command runs only once:

```buildfile
GIT_HASH := $(shell git rev-parse --short HEAD)

version.txt:
	echo $(GIT_HASH) > version.txt
```

With `=` instead of `:=`, `git` would run again every time `GIT_HASH` is used.

Simply expanded variables make complex buildfiles more predictable, because they behave like variables in most programming languages. You can redefine a variable using its own value, for example `CFLAGS := $(CFLAGS) -O`, and you can call functions without running them again and again.

### Controlling whitespace

Leading whitespace is removed from a value before variable references and functions are expanded. To start a value with a space, protect the space with a variable reference:

```buildfile
nullstring :=
space := $(nullstring) # end of the line
```

The value of `space` is exactly one space. The comment is there only to make the intent clear. CBuild does not remove trailing whitespace from values, so a single space at the end of the line would have the same effect, but it would be hard to see.

The same rule can surprise you in the other direction. Do not put a comment after some spaces at the end of a value unless you want those spaces:

```buildfile
dir := /foo/bar    # directory to put the frobs in
```

Here the value of `dir` is `/foo/bar    ` with four trailing spaces, so `$(dir)/file` becomes `/foo/bar    /file`.

## Immediately Expanded Variable Assignment

The `:::=` operator expands the value immediately, like `:=`, but the variable it creates is **recursive**. To keep the result from being expanded a second time, every `$` in the expanded value is escaped as `$$`.

```buildfile
var = first
OUT :::= $(var)
var = second
```

`OUT` contains `first`, because `$(var)` was expanded when `OUT` was assigned.

```buildfile
var = one$$two
OUT :::= $(var)
var = three$$four
```

`OUT` contains `one$$two`. At assignment time `$(var)` expands to `one$two`, and the `$` is then escaped again. When `OUT` is used, it expands to `one$two`.

This looks the same as `:=`, but there are two differences:

- **After the assignment, the variable is recursive.** When you append to it with `+=`, the right-hand side is not expanded immediately. If you want `+=` to expand the right-hand side at once, use `:=` or `::=`.
- **It is slightly slower to use.** The value has to be expanded on every use instead of being copied. Because every `$` is escaped, this expansion only removes the escaping. It never expands variables or runs functions.

```buildfile
var = one$$two
OUT :::= $(var)
OUT += $(var)
var = three$$four

all:
	echo $(OUT)
```

After these lines, the value of `OUT` is `one$$two $(var)`. When the recipe uses it, it expands to `one$two three$four`. With `:=` instead of `:::=`, the appended `$(var)` would be expanded at once and the result would be `one$two one$two`.

`:::=` matches the traditional BSD make `:=` operator, and it is part of POSIX Issue 8.

## Conditional Variable Assignment

The `?=` operator assigns a value only if the variable is not defined yet:

```buildfile
FOO ?= bar
```

This is exactly equivalent to:

```buildfile
ifeq ($(origin FOO),undefined)
  FOO = bar
endif
```

A variable that is set to an empty value is still defined, so `?=` leaves it empty:

```buildfile
EMPTY :=
EMPTY ?= value
```

Here `EMPTY` stays empty.

`?=` is useful for defaults that the user can override from the command line or the environment:

```buildfile
CC ?= gcc
```

`cbuild CC=clang` builds with `clang`, and plain `cbuild` builds with `gcc`.

:::note
CBuild does not support writing a recipe on the same line as the rule after a semicolon, as in `all: ; echo done`. Put each recipe line on its own line, starting with a tab.
:::
