---
title: Toggle
description: A two-state button that can be either on or off.
componentName: OkuToggle
image: 'https://oku-ui.com/og/oku-toggle.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/toggle
    title: OkuToggle
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuToggle" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuToggle/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuToggle" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuToggle/radix.vue" lang="vue"} -->
::
::

## Features
- Full keyboard navigation.
- Can be controlled or uncontrolled.



## Installation

Install the component from your command line.


::code-group

```sh [pnpm]
pnpm i @oku-ui/toggle
```

```bash [yarn]
yarn add @oku-ui/toggle
```

```bash [npm]
npm install @oku-ui/toggle
```

::


## Anatomy

Import the component.

```vue
<script setup lang="ts">
import { OkuToggle } from '@oku-ui/toggle'
</script>

<template>
  <OkuToggle />
</template>
```

## API Reference

### OkuToggle
The toggle.

::OkuTable
---
data:
  - name: v-model
    type: boolean
    description: 'The controlled pressed state of the toggle. Must be used in conjunction with `onPressedChange`.'
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior. Read our [Composition](../guides/composition) guide for more details.'
  - name: defaultPressed
    type: boolean
    description: 'The pressed state of the toggle when it is initially rendered. Use when you do not need to control its pressed state.'
  - name: pressed
    type: boolean
    description: 'The controlled pressed state of the toggle. Must be used in conjunction with `onPressedChange`.'
  - name: onPressedChange
    type: '(pressed: boolean) => void'
    typeSimple: function
    description: 'Event handler called when the pressed state of the toggle changes.'
  - name: disabled
    type: boolean
    description: 'When `true`, prevents the user from interacting with the toggle.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values: ['on', 'off']
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::



## Accessibility
### Keyboard Interactions

::OkuKeyboardTable
---
data:
  - keys: ['Space']
    description: 'Activates/deactivates the toggle.'
  - keys: ['Enter']
    description: 'Activates/deactivates the toggle.'
---
::
