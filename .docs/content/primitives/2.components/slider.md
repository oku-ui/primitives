---
title: Slider
description: An input where the user selects a value from within a given range.
componentName: OkuSlider
image: 'https://oku-ui.com/og/oku-slider.jpg'
links:
  - label: NPM - 0.5.0
    icon: i-simple-icons-npm
    to: https://www.npmjs.com/package/@oku-ui/slider
    title: OkuSlider
---

::ContentDesignTabs
#oku
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuSlider" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuSlider/index.vue" lang="vue"} -->
::
#radix
::ContentTabs
#preview
:ContentPreview{componentSrc="OkuSlider" design="radix" lang="vue" project="primitives"}
#vue
<!-- Autodocs{src="/primitives/OkuSlider/radix.vue" lang="vue"} -->
::
::

## Features
- Can be controlled or uncontrolled.
- Supports multiple thumbs.
- Supports a minimum value between thumbs.
- Supports touch or click on track to update value.
- Supports Right to Left direction.
- Full keyboard navigation.



## Installation

Install the component from your command line.

::code-group

```sh [pnpm]
pnpm i @oku-ui/slider
```

```bash [yarn]
yarn add @oku-ui/slider
```

```bash [npm]
npm install @oku-ui/slider
```

::

## Anatomy

Import the component.

```vue
<script setup lang="ts">
import {
  OkuSlider,
  OkuSliderRange,
  OkuSliderThumb,
  OkuSliderTrack
} from '@oku-ui/slider'
</script>

<template>
  <OkuSlider>
    <OkuSliderTrack>
      <OkuSliderRange />
    </OkuSliderTrack>
    <OkuSliderThumb />
  </OkuSlider>
</template>
```

## API Reference

### OkuSlider
Contains all the parts of a slider. It will render an `input` for each thumb when used within a `form` to ensure events propagate correctly.


::OkuTable
---
data:
  - name: v-model
    required: false
    type: number[]
    description: |
      The controlled value of the slider. Must be used in conjunction with `onValueChange`.
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
    type: number[]
    description:
      'The value of the slider when initially rendered. Use when you do not need to control the state of the slider.'
  - name: value
    required: false
    type: number[]
    description: |
      The controlled value of the slider. Must be used in conjunction with `onValueChange`.
  - name: onValueChange
    required: false
    type: 'onValueChange?(value: number[]): void'
    typeSimple: function
    description: 'Event handler called when the value changes.'
  - name: onValueCommit
    required: false
    type: 'onValueCommit?(value: number[]): void'
    typeSimple: function
    description:
      'Event handler called when the value changes at the end of an interaction. Useful when you only need to capture a final value e.g. to update a backend service.'
  - name: name
    required: false
    type: string
    description:
      'The name of the slider. Submitted with its owning form as part of a name/value pair.'
  - name: disabled
    required: false
    type: boolean
    default: false
    description: |
      When `true`, prevents the user from interacting with the slider.
  - name: orientation
    required: false
    type: '"horizontal" | "vertical"'
    typeSimple: enum
    default: '"horizontal"'
    description: 'The orientation of the slider.'
  - name: dir
    required: false
    type: '"ltr" | "rtl"'
    typeSimple: enum
    description: |
      The reading direction of the slider. If omitted, inherits globally from `DirectionProvider` or assumes LTR (left-to-right) reading mode.
  - name: inverted
    required: false
    type: boolean
    default: false
    description: 'Whether the slider is visually inverted.'
  - name: min
    required: false
    type: number
    default: '0'
    description: 'The minimum value for the range.'
  - name: max
    required: false
    type: number
    default: '100'
    description: 'The maximum value for the range.'
  - name: step
    required: false
    type: number
    default: '1'
    description: 'The stepping interval.'
  - name: minStepsBetweenThumbs
    required: false
    type: number
    default: '0'
    description: |
      The minimum permitted `step`s between multiple thumbs.
---
::

::OkuAttributesTable
---
data:
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::

### OkuSliderTrack

The track that contains the `Slider.Range`.


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
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::

### OkuSliderRange

The range part. Must live inside `Slider.Track`.

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
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::


### OkuSliderThumb

A draggable thumb. You can render multiple thumbs.

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
  - attribute: '[data-disabled]'
    values: 'Present when disabled'
  - attribute: '[data-orientation]'
    values: ['vertical', 'horizontal']
---
::



## Accessibility

Adheres to the [Slider WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb).

### Keyboard Interactions

::OkuKeyboardTable
---
data:
  - keys: ['ArrowRight']
    description: |
      Increments/decrements by the `step` value depending on `orientation`.
  - keys: ['ArrowLeft']
    description: |
      Increments/decrements by the `step` value depending on `orientation`.
  - keys: ['ArrowUp']
    description: |
      Increases the value by the `step` amount.
  - keys: ['ArrowDown']
    description: |
      Decreases the value by the `step` amount.
  - keys: ['PageUp']
    description: |
      Increases the value by a larger `step`.
  - keys: ['PageDown']
    description: |
      Decreases the value by a larger `step`.
  - keys: ['Shift + ArrowUp']
    description: |
      Increases the value by a larger `step`.
  - keys: ['Shift + ArrowDown']
    description: |
      Decreases the value by a larger `step`.
  - keys: ['Home']
    description: 'Sets the value to its minimum.'
  - keys: ['End']
    description: 'Sets the value to its maximum.'
---
::
