---
title: How to Use Variables
description: Learn the basics of variable usage in buildfile.
sidebar_position: 0
---

## How to Use Variables

A variable is a name defined in a buildfile to represent a string of text, called the variable's value. These values are substituted by explicit request into targets, prerequisites, recipes, and other parts of the buildfile.

Variables and functions in all parts of a buildfile are expanded when read, except for in recipes. the right-hand sides of variable definitions using '=', and the bodies of variable definitions using the define directive. The value a variable expands to is that of its most recent definition at the time of expansion. In other words, variables are dynamically scoped.

Variables can represent lists of file names, options to pass to compilers, programs to run, directories to look in for source files, directories to write output in, or anything else you can imagine.

A variable name may be any sequence of characters not containing ':', '#', '='. Variable names beginning with '.' and an uppercase letter may be given special meaning in future versions of buildfiles.

Variable names are case-sensitive. The names 'foo', 'FOO', and 'Foo' all refer to different variables.

It is traditional to use upper case letters in variable names, but we recommend using lower case letters for variable names that serve internal purposes in the buildfile, and reserving upper case for parameters that control implicit rules or for parameters that the user should override with command options

A few variables have names that are a single punctuation character or just a few characters. These are the automatic variables, and they have particular specialized uses.
