---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
componentName: OkuSwitch
image: 'https://oku-ui.com/og/oku-switch.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/switch
    title: OkuSwitch
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuSwitch" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuSwitch/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuSwitch" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuSwitch/radix.vue" lang="vue"} -->
::
::

## Features
- Full keyboard navigation.
- Can be controlled or uncontrolled.



## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/switch
```

```bash [yarn]
yarn add @oku-ui/switch
```

```bash [npm]
npm install @oku-ui/switch
```

::

## Anatomy

Import the component.

```vue
<script setup lang="ts">
import {
  OkuSwitch,
  OkuSwitchThumb
} from '@oku-ui/switch'
</script>

<template>
  <OkuSwitch>
    <OkuSwitchThumb />
  </OkuSwitch>
</template>
```

## API Reference

### OkuSwitch

Contains all the parts of a switch. An `input` will also render when used within a `form` to ensure events propagate correctly.

::OkuTable
---
data:
  - name: v-model
    type: boolean
    description: |
      The controlled state of the switch. Must be used in conjunction with `onCheckedChange`.
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
  - name: defaultChecked
    type: boolean
    description:
      'The state of the switch when it is initially rendered. Use when you do not need to control its state.'
  - name: checked
    type: boolean
    description: |
      The controlled state of the switch. Must be used in conjunction with `onCheckedChange`.
  - name: onCheckedChange
    type: '(checked: boolean) => void'
    typeSimple: function
    description: 'Event handler called when the state of the switch changes.'
  - name: disabled
    type: boolean
    description: |
      When `true`, prevents the user from interacting with the switch.
  - name: required
    type: boolean
    description: |
      When `true`, indicates that the user must check the switch
      before the owning form can be submitted.
  - name: name
    type: string
    description:
      'The name of the switch. Submitted with its owning form as part of a name/value pair.'
  - name: value
    type: string
    default: 'on'
    description: |
      The value given as data when submitted with a `name`.
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values: ['checked', 'unchecked']
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::


### OkuSwitchThumb

The thumb that is used to visually indicate whether the switch is on or off.


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
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-state]'
    values: ['checked', 'unchecked']
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::


## Accessibility

Adheres to the [`switch` role requirements](https://www.w3.org/WAI/ARIA/apg/patterns/switch).

### Keyboard Interactions


::OkuKeyboardTable
---
data:
  - keys: ['Space']
    description: "Toggles the component's state."
  - keys: ['Enter']
    description: "Toggles the component's state."
---
::
