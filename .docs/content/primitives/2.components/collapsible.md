---
title: Collapsible
description: An interactive component which expands/collapses a panel.
componentName: OkuCollapsible
image: 'https://oku-ui.com/og/oku-collapsible.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/collapsible
    title: OkuCollapsible
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuCollapsible" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuCollapsible/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuCollapsible" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuCollapsible/radix.vue" lang="vue"} -->
::
::

## Features
- Full keyboard navigation.
- Can be controlled or uncontrolled.


## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/collapsible
```

```bash [yarn]
yarn add @oku-ui/collapsible
```

```bash [npm]
npm install @oku-ui/collapsible
```

::

## Anatomy

Import the component.

```vue
<script setup lang="ts">
import { OkuCollapsible, OkuCollapsibleContent, OkuCollapsibleTrigger } from '@oku-ui/collapsible'
</script>

<template>
  <OkuCollapsible>
    <OkuCollapsibleTrigger />
    <OkuCollapsibleContent />
  </OkuCollapsible>
</template>
```

## API Reference

### OkuCollapsible
Contains all the parts of a collapsible.

::OkuTable
---
data:
  - name: v-model
    type: boolean
    description: 'The controlled open state of the collapsible. Must be used in conjunction with `onOpenChange`.'
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
  - name: defaultOpen
    type: boolean
    description: 'The open state of the collapsible when it is initially rendered. Use when you do not need to control its open state.'
  - name: open
    type: boolean
    description: 'The controlled open state of the collapsible. Must be used in conjunction with `onOpenChange`.'
  - name: onOpenChange
    type: '(open: boolean) => void'
    typeSimple: function
    description: 'Event handler called when the open state of the collapsible changes.'
  - name: disabled
    type: boolean
    description: 'When `true`, prevents the user from interacting with the collapsible.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values:
      - 'open'
      - 'closed'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::


## OkuCollapsibleTrigger
The button that toggles the collapsible.


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
    values:
      - 'open'
      - 'closed'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::


## OkuCollapsibleContent
The component that contains the collapsible content.


::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
  - name: forceMount
    type: boolean
    description: 'Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values:
      - 'open'
      - 'closed'
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::

::OkuCssVariablesTable
---
data:
  - cssVariable: '--oku-collapsible-content-width'
    description: 'The width of the content when it opens/closes'
  - cssVariable: '--oku-collapsible-content-height'
    description: 'The height of the content when it opens/closes'
---
::


## Accessibility

Adheres to the [Disclosure WAI-ARIA design pattern.](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)


::OkuKeyboardTable
---
data:
  - keys: ['Space']
    description: 'Opens/closes the collapsible.'
  - keys: ['Enter']
    description: 'Opens/closes the collapsible.'
---
::
