---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
componentName: OkuProgress
image: 'https://oku-ui.com/og/oku-progress.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/progress
    title: OkuProgress
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuProgress" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuProgress/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuProgress" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuProgress/radix.vue" lang="vue"} -->
::
::

## Features
- Provides context for assistive technology to read the progress of a task.

## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/progress
```

```bash [yarn]
yarn add @oku-ui/progress
```

```bash [npm]
npm install @oku-ui/progress
```

::


## Anatomy

Import the component.

```vue
<script setup lang="ts">
import { OkuProgress, OkuProgressIndicator } from '@oku-ui/progress'
</script>

<template>
  <OkuProgress>
    <OkuProgressIndicator />
  </OkuProgress>
</template>
```

## API Reference

### OkuProgress
Contains all of the progress parts.

::OkuTable
---
data:
  - name: v-model
    type: 'number | null'
    description: 'The progress value.'
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
  - name: value
    type: 'number | null'
    description: 'The progress value.'
  - name: max
    type: number
    description: 'The maximum progress value.'
  - name: getValueLabel
    type: '(value: number, max: number) => string'
    typeSimple: 'function'
    description: 'A function to get the accessible label text representing the current value in a human-readable format. If not provided, the value label will be read as the numeric value as a percentage of the max value.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values: ['complete', 'indeterminate', 'loading']
  - attribute: '[data-value]'
    values: 'The current value'
  - attribute: '[data-max]'
    values: 'The max value'
---
::


### OkuProgressIndicator
Used to show the progress visually. It also makes progress accessible to assistive technologies.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values: ['complete', 'indeterminate', 'loading']
  - attribute: '[data-value]'
    values: 'The current value'
  - attribute: '[data-max]'
    values: 'The max value'
---
::


## Accessibility
Adheres to the `progressbar` [role requirements.](https://www.w3.org/WAI/ARIA/apg/patterns/meter/)

