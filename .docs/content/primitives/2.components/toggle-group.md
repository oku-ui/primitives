---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
componentName: OkuToggleGroup
image: 'https://oku-ui.com/og/oku-toggle-group.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/toggle-group
    title: OkuToggleGroup
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuToggleGroup" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuToggleGroup/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuToggleGroup" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuToggleGroup/radix.vue" lang="vue"} -->
::
::

## Features
- Full keyboard navigation.
- Supports horizontal/vertical orientation.
- Support single and multiple pressed buttons.
- Can be controlled or uncontrolled.



## Installation

Install the component from your command line.


::code-group

```sh [pnpm]
pnpm i @oku-ui/toggle-group
```

```bash [yarn]
yarn add @oku-ui/toggle-group
```

```bash [npm]
npm install @oku-ui/toggle-group
```

::


## Anatomy

Import the component.

```vue
<script setup lang="ts">
import {
  OkuToggleGroup,
  OkuToggleGroupItem
} from '@oku-ui/toggle-group'
</script>

<template>
  <OkuToggleGroup>
    <OkuToggleGroupItem />
  </OkuToggleGroup>
</template>
```

## API Reference

### OkuToggleGroup
Contains all the parts of a toggle group.

::OkuTable
---
data:
  - name: v-model
    required: false
    type: string
    description: |
      The controlled value of the pressed item when `type` is "single". Must be used in conjunction with `onValueChange`.
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
  - name: type
    required: true
    type: enum
    values: ["single", "multiple"]
    description: |
      Determines whether a single or multiple items can be pressed at a time.
  - name: value
    required: false
    type: string
    description: |
      The controlled value of the pressed item when `type` is "single". Must be used in conjunction with `onValueChange`.
  - name: defaultValue
    required: false
    type: string
    description: |
      The value of the item to show as pressed when initially rendered and `type` is "single". Use when you do not need to control the state of the items.
  - name: onValueChange
    required: false
    type: function
    typeSimple: '(value: string) => void'
    description: |
      Event handler called when the pressed state of an item changes and `type` is "single".
  - name: value
    required: false
    default: '[]'
    type: string[]
    description: |
      The controlled value of the pressed items when `type` is "multiple". Must be used in conjunction with `onValueChange`.
  - name: defaultValue
    required: false
    default: '[]'
    type: string[]
    description: |
      The values of the items to show as pressed when initially rendered and `type` is "multiple". Use when you do not need to control the state of the items.
  - name: disabled
    required: false
    type: boolean
    default: false
    description: |
      When `true`, prevents the user from interacting with the toggle group and all its items.
  - name: rovingFocus
    required: false
    type: boolean
    default: true
    description: |
      When `false`, navigating through the items using arrow keys will be disabled.
  - name: orientation
    required: false
    type: enum
    values: ["horizontal", "vertical", "undefined"]
    default: "undefined"
    description: |
      The orientation of the component, which determines how focus moves: "horizontal" for left/right arrows and "vertical" for up/down arrows.
  - name: dir
    required: false
    type: enum
    values: ["ltr", "rtl"]
    description: |
      The reading direction of the toggle group. If omitted, inherits globally from `DirectionProvider` or assumes LTR (left-to-right) reading mode.
  - name: loop
    required: false
    type: boolean
    default: true
    description: |
      When `true` and `rovingFocus` is `true`, keyboard navigation will loop from last item to first, and vice versa.
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::


### OkuToggleGroupItem
An item in the group.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior. Read our [Composition](../guides/composition) guide for more details.'
  - name: value
    required: true
    type: string
    description: 'A unique value for the item.'
  - name: disabled
    type: boolean
    description: 'When `true`, prevents the user from interacting with the item.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values: ['on', 'off']
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::



## Accessibility
Uses [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.2/examples/radio/radio.html) to manage focus movement among items.

### Keyboard Interactions

::OkuKeyboardTable
---
data:
  - keys: ['Tab']
    description: 'Moves focus to either the pressed item or the first item in the group.'
  - keys: ['Space']
    description: 'Activates/deactivates the item.'
  - keys: ['Enter']
    description: 'Activates/deactivates the item.'
  - keys: ['ArrowDown']
    description: 'Moves focus to the next item in the group.'
  - keys: ['ArrowRight']
    description: 'Moves focus to the next item in the group.'
  - keys: ['ArrowUp']
    description: 'Moves focus to the previous item in the group.'
  - keys: ['ArrowLeft']
    description: 'Moves focus to the previous item in the group.'
  - keys: ['Home']
    description: 'Moves focus to the first item.'
  - keys: ['End']
    description: 'Moves focus to the last item.'
---
::
