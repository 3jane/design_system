# `@3jane/design-tokens`

## Overview

This package is designed to streamline the management and application of design tokens in your projects. Utilizing the power of the Token Studio plugin in Figma, it allows designers to create and edit tokens efficiently. The package then compiles these disparate tokens into a cohesive JSON file, resolving references and transforming them into actual values.

## How to use

```ts
import tokens from "@3jane/design-tokens/dist/tokens.json";

// Use tokens and values as you wish
export const colors = {
  main: tokens.semantics.color.palette.main[100],
  secondary: tokens.semantics.color.palette.secondary[400],
};

export const shadows = tokens.composites.dropShadow;
```
