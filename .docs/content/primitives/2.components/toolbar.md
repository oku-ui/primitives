---
title: Toolbar
description: A container for grouping a set of controls, such as buttons, toggle groups or dropdown menus.
componentName: OkuToolbar
image: 'https://oku-ui.com/og/oku-toolbar.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/toolbar
    title: OkuToolbar
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuToolbar" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuToolbar/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuToolbar" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuToolbar/radix.vue" lang="vue"} -->
::
::

## Features
- Full keyboard navigation.



## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/toolbar
```

```bash [yarn]
yarn add @oku-ui/toolbar
```

```bash [npm]
npm install @oku-ui/toolbar
```

::

## Anatomy

Import the component.

```vue
<script setup lang="ts">
import {
  OkuToolbar,
  OkuToolbarButton,
  OkuToolbarLink,
  OkuToolbarSeparator,
  OkuToolbarToggleGroup,
  OkuToolbarToggleItem
} from '@oku-ui/toolbar'
</script>

<template>
  <OkuToolbar>
    <OkuToolbarButton />
    <OkuToolbarSeparator />
    <OkuToolbarLink />
    <OkuToolbarToggleGroup>
      <OkuToolbarToggleItem />
    </OkuToolbarToggleGroup>
  </OkuToolbar>
</template>
```

## API Reference

### OkuToolbar
Contains all the toolbar component parts.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: 'false'
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior. Read our [Composition](../guides/composition) guide for more details.'
  - name: orientation
    required: false
    type: '"horizontal" | "vertical" | undefined'
    typeSimple: enum
    default: '"horizontal"'
    description: 'The orientation of the toolbar.'
  - name: dir
    required: false
    type: '"ltr" | "rtl"'
    typeSimple: enum
    description: 'The reading direction of the toolbar. If omitted, inherits globally from `DirectionProvider` or assumes LTR (left-to-right) reading mode.'
  - name: loop
    required: false
    type: boolean
    default: 'true'
    description: 'When `true`, keyboard navigation will loop from last tab to first, and vice versa.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::


### OkuToolbarButton
A button item.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: 'false'
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior. Read our [Composition](../guides/composition) guide for more details.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::

### OkuToolbarLink
A link item.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: 'false'
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior. Read our [Composition](../guides/composition) guide for more details.'
---
::

### OkuToolbarToggleGroup
A set of two-state buttons that can be toggled on or off.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: 'false'
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior. Read our [Composition](../guides/composition) guide for more details.'
  - name: type
    required: true
    type: '"single" | "multiple"'
    typeSimple: enum
    description: 'Determines whether a single or multiple items can be pressed at a time.'
  - name: value
    required: false
    type: string
    description: 'The controlled value of the pressed item when `type` is `"single"`. Must be used in conjunction with `onValueChange`.'
  - name: defaultValue
    required: false
    type: string
    description: 'The value of the item to show as pressed when initially rendered and `type` is `"single"`. Use when you do not need to control the state of the items.'
  - name: onValueChange
    required: false
    type: '(value: string) => void'
    typeSimple: function
    description: 'Event handler called when the pressed state of an item changes and `type` is `"single".'
  - name: value
    required: false
    default: '[]'
    type: 'string[]'
    description: 'The controlled value of the pressed items when `type` is `"multiple"`. Must be used in conjunction with `onValueChange`.'
  - name: defaultValue
    required: false
    default: '[]'
    type: 'string[]'
    description: 'The values of the items to show as pressed when initially rendered and `type` is `"multiple"`. Use when you do not need to control the state of the items.'
  - name: onValueChange
    required: false
    type: '(value: string[]) => void'
    typeSimple: function
    description: 'Event handler called when the pressed state of an item changes and `type` is `"multiple".'
  - name: disabled
    required: false
    type: boolean
    default: 'false'
    description: 'When `true`, prevents the user from interacting with the toggle group and all its items.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::


### OkuToolbarToggleItem
An item in the group.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: 'false'
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


### OkuToolbarSeparator
Used to visually separate items in the toolbar.


::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: 'false'
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior. Read our [Composition](../guides/composition) guide for more details.'
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

Uses [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.2/examples/radio/radio.html) to manage focus movement among items.

### Keyboard Interactions

::OkuKeyboardTable
---
data:
  - keys: ['Tab']
    description: 'Moves focus to the first item in the group.'
  - keys: ['Space']
    description: 'Activates/deactivates the item.'
  - keys: ['Enter']
    description: 'Activates/deactivates the item.'
  - keys: ['ArrowDown']
    description: 'Moves focus to the next item depending on `orientation`.'
  - keys: ['ArrowRight']
    description: 'Moves focus to the next item depending on `orientation`.'
  - keys: ['ArrowUp']
    description: 'Moves focus to the previous item depending on `orientation`.'
  - keys: ['ArrowLeft']
    description: 'Moves focus to the previous item depending on `orientation`.'
  - keys: ['Home']
    description: 'Moves focus to the first item.'
  - keys: ['End']
    description: 'Moves focus to the last item.'
---
::
