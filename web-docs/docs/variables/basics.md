---
title: Basics of Variable References
description: Learn the basics of variable references in CBuild buildfiles.
sidebar_position: 0
---

## How to Use Variables

A variable is a name defined in a buildfile to represent a string of text, called the variable's value. These values are substituted by explicit request into targets, prerequisites, recipes, and other parts of the buildfile.

Variables and functions in all parts of a buildfile are expanded when read, except for in recipes. the right-hand sides of variable definitions using '=', and the bodies of variable definitions using the define directive. The value a variable expands to is that of its most recent definition at the time of expansion. In other words, variables are dynamically scoped.
