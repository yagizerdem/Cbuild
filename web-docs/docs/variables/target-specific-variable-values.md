---
title: Target-specific Variable Values
description: Learn how to set target-specific variable values in buildfile.
sidebar_position: 11
---

Variable values in cbuild are usually global; that is, they are the same regardless of where they are evaluated,
Exceptions to that are variables defined with the foreach function, and automatic variables like `$@` and `$<`.

Another exception are target-specific variable values. This feature allows you to define different values for the same variable, based on the target that cbuild is currently building. As with automatic variables, these values are only available within the context of a target’s recipe

Set a target-specific variable value like this:

```buildfile
target … : variable-assignment
```

The variable-assignment can be any valid form of assignment; recursive (‘=’), simple (‘:=’ or ‘::=’), immediate (‘::=’), appending (‘+=’), or conditional (‘?=’). All variables that appear within the variable-assignment are evaluated within the context of the target: thus, any previously-defined target-specific variable values will be in effect. Note that this variable is actually distinct from any “global” value: the two variables do not have to have the same flavor (recursive vs. simple).

Target-specific variables have the same priority as any other makefile variable. Variables provided on the command line (and in the environment if the ‘-e’ option is in force) will take precedence. Specifying the override directive will allow the target-specific variable value to be preferred.

:::note
In GNU make, a target-specific variable value is also in effect for all prerequisites of the target, and all their prerequisites, unless a prerequisite overrides the variable with its own target-specific value. CBuild does not support this yet. A target-specific value is in effect only in the recipe of the target it is defined for. The prerequisites of that target see the global value of the variable.

```buildfile
CFLAGS = -O2

prog: CFLAGS = -g
prog: prog.o
	@echo prog: $(CFLAGS)

prog.o:
	@echo prog.o: $(CFLAGS)
```

GNU make prints `prog.o: -g`, but CBuild prints `prog.o: -O2`. Both print `prog: -g`.
:::
