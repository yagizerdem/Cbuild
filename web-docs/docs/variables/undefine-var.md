---
title: Undefining Variables
description: Learn how to undefine variables in buildfile.
sidebar_position: 10
---

To clear a variable, setting its value to empty is usually enough. Expanding an empty variable gives the same result, an empty string, as expanding a variable that was never set.

The `origin` and `flavor` functions can tell the two cases apart, though. A variable with an empty value still exists: its origin is `file`. A variable that was never set has the origin `undefined`. If you want a variable to look as if it was never set, use the `undefine` directive:

```buildfile
foo := foo
bar = bar
empty =

undefine foo
undefine bar

all:
	@echo $(origin foo) $(origin bar) $(origin empty)
```

This prints `undefined undefined file`. After `undefine`, `foo` and `bar` behave as if they were never defined. `empty` has no value, but it is still defined.

The variable name can contain variable and function references. They are expanded before the variable is removed:

```buildfile
name = foo
foo = 1

undefine $(name)
```

This removes `foo`. Undefining a variable that does not exist is not an error.

## Undefining Command-Line Variables

A plain `undefine` does not affect a variable set with a command argument, just as a plain assignment does not change it. Take this buildfile:

```buildfile
undefine CFLAGS

all:
	@echo [$(CFLAGS)]
```

`cbuild CFLAGS=-O2` still prints `[-O2]`.

To remove a command-line variable, use the `override` directive together with `undefine`, the same way you would for an assignment:

```buildfile
override undefine CFLAGS

all:
	@echo [$(CFLAGS)]
```

Now `cbuild CFLAGS=-O2` prints `[]`, and `$(origin CFLAGS)` is `undefined`. See [The override Directive](./override.md).
