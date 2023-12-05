---
title: Tabs
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
componentName: OkuTabs
image: 'https://oku-ui.com/og/oku-tabs.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/tabs
    title: OkuTabs
---


::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuTabs" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuTabs/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuTabs" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuTabs/radix.vue" lang="vue"} -->
::
::

## Features
- Can be controlled or uncontrolled.
- Supports horizontal/vertical orientation.
- Supports automatic/manual activation.
- Full keyboard navigation.



## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/tabs
```

```bash [yarn]
yarn add @oku-ui/tabs
```

```bash [npm]
npm install @oku-ui/tabs
```

::

## Anatomy

Import the component.

```vue
<script setup lang="ts">
import {
  OkuTabs,
  OkuTabsContent,
  OkuTabsList,
  OkuTabsTrigger
} from '@oku-ui/tabs'
</script>

<template>
  <OkuTabs>
    <OkuTabsList>
      <OkuTabsTrigger />
    </OkuTabsList>
    <OkuTabsContent />
  </OkuTabs>
</template>
```

## API Reference

### OkuTabs
Contains all the tabs component parts.

::OkuTable
---
data:
  - name: v-model
    required: false
    type: string
    description: |
      The controlled value of the tab to activate. Should be used in conjunction with `onValueChange`.
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
  - name: defaultValue
    required: false
    type: string
    description:
      'The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs.'
  - name: value
    required: false
    type: string
    description: |
      The controlled value of the tab to activate. Should be used in conjunction with `onValueChange`.
  - name: onValueChange
    required: false
    type: '(value: string) => void'
    typeSimple: function
    description: 'Event handler called when the value changes.'
  - name: orientation
    required: false
    type: '"horizontal" | "vertical" | undefined'
    typeSimple: enum
    default: '"horizontal"'
    description: 'The orientation of the component.'
  - name: dir
    required: false
    type: '"ltr" | "rtl"'
    typeSimple: enum
    description: |
      The reading direction of the tabs. If omitted, inherits globally from `DirectionProvider` or assumes LTR (left-to-right) reading mode.
  - name: activationMode
    required: false
    type: '"automatic" | "manual"'
    typeSimple: enum
    default: '"automatic"'
    description: |
      When `automatic`, tabs are activated when receiving focus. When `manual`, tabs are activated when clicked.
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::


### OkuTabsList
Contains the triggers that are aligned along the edge of the active content.

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
  - name: loop
    required: false
    type: boolean
    default: true
    description: |
      When `true`, keyboard navigation will loop from last tab to first, and vice versa.
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::


### OkuTabsTrigger
The button that activates its associated content.

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
  - name: value
    required: true
    type: string
    description: 'A unique value that associates the trigger with a content.'
  - name: disabled
    required: false
    type: boolean
    default: false
    description: |
      When `true`, prevents the user from interacting with the tab.
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values: ['active', 'inactive']
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::


### OkuTabsContent

Contains the content associated with each trigger.

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
  - name: value
    required: true
    type: string
    description: 'A unique value that associates the content with a trigger.'
  - name: forceMount
    type: boolean
    description: |
      Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries.
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values: ['active', 'inactive']
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::



## Accessibility
Adheres to the [Tabs WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel).

### Keyboard Interactions

::OkuKeyboardTable
---
data:
  - keys: ['Tab']
    description: |
      When focus moves onto the tabs, focuses the active trigger. When a trigger is focused, moves focus to the active content.
  - keys: ['ArrowDown']
    description: |
      Moves focus to the next trigger depending on `orientation` and activates its associated content.
  - keys: ['ArrowRight']
    description: |
      Moves focus to the next trigger depending on `orientation` and activates its associated content.
  - keys: ['ArrowUp']
    description: |
      Moves focus to the previous trigger depending on `orientation` and activates its associated content.
  - keys: ['ArrowLeft']
    description: |
      Moves focus to the previous trigger depending on `orientation` and activates its associated content.
  - keys: ['Home']
    description: |
      Moves focus to the first trigger and activates its associated content.
  - keys: ['End']
    description: |
      Moves focus to the last trigger and activates its associated content.
---
::
