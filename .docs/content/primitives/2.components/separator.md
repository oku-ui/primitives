---
title: Separator
description: Visually or semantically separates content.
componentName: OkuSeparator
image: 'https://oku-ui.com/og/oku-separator.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/separator
    title: OkuSeparator
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuSeparator" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuSeparator/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuSeparator" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuSeparator/radix.vue" lang="vue"} -->
::
::

## Features
- Supports horizontal and vertical orientations.


## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/separator
```

```bash [yarn]
yarn add @oku-ui/separator
```

```bash [npm]
npm install @oku-ui/separator
```

::

## Anatomy

Import the component.

```vue
<script setup lang="ts">
import { OkuSeparator } from '@oku-ui/separator'
</script>

<template>
  <OkuSeparator />
</template>
```

## API Reference

### Root
The separator.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: |
      Change the default rendered element for the one passed as a child,
      merging their props and behavior.
      <br />
      <br />
      Read our [Composition](../guides/composition) guide for more details.
  - name: orientation
    type: '"horizontal" | "vertical"'
    default: "horizontal"
    description: The orientation of the separator.
  - name: decorative
    type: boolean
    description: |
      When `true`, signifies that it is purely visual, carries no
      semantic meaning, and ensures it is not present in the accessibility
      tree.
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::

## Accessibility

Adheres to the [separator role requirements.](https://www.w3.org/TR/wai-aria-1.2/#separator)