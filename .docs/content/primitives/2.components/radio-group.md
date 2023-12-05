---
title: Radio Group
description: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
componentName: OkuRadioGroup
image: 'https://oku-ui.com/og/oku-radio-group.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/radio-group
    title: OkuRadioGroup
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuRadioGroup" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuRadioGroup/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuRadioGroup" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuRadioGroup/radix.vue" lang="vue"} -->
::
::


## Features
- Full keyboard navigation.
- Supports horizontal/vertical orientation.
- Can be controlled or uncontrolled.



## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/radio-group
```

```bash [yarn]
yarn add @oku-ui/radio-group
```

```bash [npm]
npm install @oku-ui/radio-group
```

::

## Anatomy

Import the component.

```vue
<script setup lang="ts">
import {
  OkuRadioGroup,
  OkuRadioGroupIndicator,
  OkuRadioGroupItem
} from '@oku-ui/radio-group'
</script>

<template>
  <OkuRadioGroup>
    <OkuRadioGroupItem>
      <OkuRadioGroupIndicator />
    </OkuRadioGroupItem>
  </OkuRadioGroup>
</template>
```

## API Reference

### OkuRadioGroup
Contains all the parts of a radio group.

::OkuTable
---
data:
  - name: v-model
    type: string
    description: 'The controlled value of the radio item to check. Should be used in conjunction with <Code>onValueChange</Code>.'
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
  - name: defaultValue
    type: string
    description: 'The value of the radio item that should be checked when initially rendered. Use when you do not need to control the state of the radio items.'
  - name: value
    type: string
    description: 'The controlled value of the radio item to check. Should be used in conjunction with <Code>onValueChange</Code>.'
  - name: onValueChange
    type: '(value: string) => void'
    typeSimple: function
    description: 'Event handler called when the value changes.'
  - name: disabled
    type: boolean
    description: 'When <Code>true</Code>, prevents the user from interacting with radio items.'
  - name: name
    type: string
    description: 'The name of the group. Submitted with its owning form as part of a name/value pair.'
  - name: required
    type: boolean
    description: 'When <Code>true</Code>, indicates that the user must check a radio item before the owning form can be submitted.'
  - name: orientation
    required: false
    type: '"horizontal" | "vertical" | undefined'
    typeSimple: enum
    default: undefined
    description: 'The orientation of the component.'
  - name: dir
    required: false
    type: '"ltr" | "rtl"'
    typeSimple: enum
    description: 'The reading direction of the radio group. If omitted, inherits globally from <Code>DirectionProvider</Code> or assumes LTR (left-to-right) reading mode.'
  - name: loop
    required: false
    type: boolean
    default: true
    description: 'When <Code>true</Code>, keyboard navigation will loop from the last item to the first, and vice versa.'
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::


### OkuRadioGroupItem
An item in the group that can be checked. An `input` will also render when used within a `form` to ensure events propagate correctly.

::OkuTable
---
data:
  - name: asChild
    required: false
    type: boolean
    default: false
    description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our [Composition](../guides/composition) guide for more details.'
  - name: value
    type: string
    description: 'The value given as data when submitted with a <Code>name</Code>.'
  - name: disabled
    type: boolean
    description: 'When <Code>true</Code>, prevents the user from interacting with the radio item.'
  - name: required
    type: boolean
    description: 'When <Code>true</Code>, indicates that the user must check the radio item before the owning form can be submitted.'
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


### OkuRadioGroupIndicator
Renders when the radio item is in a checked state. You can style this element directly, or you can use it as a wrapper to put an icon into, or both.

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
    values: ['checked', 'unchecked']
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
---
::



## Accessibility

Adheres to the [Radio Group WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton) and uses [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.2/examples/radio/radio.html) to manage focus movement among radio items.

### Keyboard Interactions

::OkuKeyboardTable
---
data:
  - keys: ['Tab']
    description: 'Moves focus to either the checked radio item or the first radio item in the group.'
  - keys: ['Space']
    description: 'When focus is on an unchecked radio item, checks it.'
  - keys: ['ArrowDown']
    description: 'Moves focus and checks the next radio item in the group.'
  - keys: ['ArrowRight']
    description: 'Moves focus and checks the next radio item in the group.'
  - keys: ['ArrowUp']
    description: 'Moves focus to the previous radio item in the group.'
  - keys: ['ArrowLeft']
    description: 'Moves focus to the previous radio item in the group.'
---
::
