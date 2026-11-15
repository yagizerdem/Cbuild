---
title: How Variables Get Their Values
description: Learn how variables get their values in buildfile.
sidebar_position: 5
---

Variables can get values in several different ways:

- You can specify an overriding value when you run make.
- You can specify a value in the makefile, either with an assignment or with a verbatim definition.
- You can specify a short-lived value with the foreach function.
- Variables in the environment become make variables.
- Several automatic variables are given new values for each rule. Each of these has a single conventional use.
- Several variables have constant initial values. (Mostly used by implicit rules, pre-defined by cbuild.)
