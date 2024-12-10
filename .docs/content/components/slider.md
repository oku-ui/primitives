---

title: Slider
description: An input where the user selects a value from within a given range.
name: slider
aria: https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb
---

# Slider

<Description>
An input where the user selects a value from within a given range.
</Description>

<ComponentPreview name="Slider" />

## Features

<Highlights
  :features="[
    'Can be controlled or uncontrolled.',
    'Supports multiple thumbs.',
    'Supports a minimum value between thumbs.',
    'Supports touch or click on track to update value.',
    'Supports Right to Left direction.',
    'Full keyboard navigation.',
  ]"
/>

## Installation

Install the component from your command line.

<InstallationTabs value="@oku-ui/primitives" />

## Anatomy

Import all parts and piece them together.

```vue
<script setup>
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '@oku-ui/primitives'
</script>

<template>
  <SliderRoot>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb />
  </SliderRoot>
</template>
```

## API Reference

### Root

Contains all the parts of a slider. It will render an `input` for each thumb when used within a `form` to ensure events propagate correctly.

<!-- @include: @/meta/SliderRoot.md -->

<DataAttributesTable
  :data="[
    {
      attribute: '[data-disabled]',
      values: 'Present when disabled',
    },
    {
      attribute: '[data-orientation]',
      values: ['vertical', 'horizontal'],
    },
  ]"
/>

### Track

The track that contains the `SliderRange`.

<!-- @include: @/meta/SliderTrack.md -->

<DataAttributesTable
  :data="[
    {
      attribute: '[data-disabled]',
      values: 'Present when disabled',
    },
    {
      attribute: '[data-orientation]',
      values: ['vertical', 'horizontal'],
    },
  ]"
/>

### Range

The range part. Must live inside `SliderTrack`.

<!-- @include: @/meta/SliderRange.md -->

<DataAttributesTable
  :data="[
    {
      attribute: '[data-disabled]',
      values: 'Present when disabled',
    },
    {
      attribute: '[data-orientation]',
      values: ['vertical', 'horizontal'],
    },
  ]"
/>

### Thumb

A draggable thumb. You can render multiple thumbs.

<!-- @include: @/meta/SliderThumb.md -->

<DataAttributesTable
  :data="[
    {
      attribute: '[data-disabled]',
      values: 'Present when disabled',
    },
    {
      attribute: '[data-orientation]',
      values: ['vertical', 'horizontal'],
    },
  ]"
/>

## Examples

### Vertical orientation

Use the `orientation` prop to create a vertical slider.

```vue line=7
// index.vue
<script setup>
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '@oku-ui/primitives'
</script>

<template>
  <SliderRoot
    class="SliderRoot"
    :default-value="[50]"
    orientation="vertical"
  >
    <SliderTrack class="SliderTrack">
      <SliderRange class="SliderRange" />
    </SliderTrack>
    <SliderThumb class="SliderThumb" />
  </SliderRoot>
</template>
```

```css line=7,18,26
/* styles.css */
.SliderRoot {
  position: relative;
  display: flex;
  align-items: center;
}
.SliderRoot[data-orientation="vertical"] {
  flex-direction: column;
  width: 20px;
  height: 100px;
}

.SliderTrack {
  position: relative;
  flex-grow: 1;
  background-color: grey;
}
.SliderTrack[data-orientation="vertical"] {
  width: 3px;
}

.SliderRange {
  position: absolute;
  background-color: black;
}
.SliderRange[data-orientation="vertical"] {
  width: 100%;
}

.SliderThumb {
  display: block;
  width: 20px;
  height: 20px;
  background-color: black;
}
```

### Create a range

Add multiple thumbs and values to create a range slider.

```vue line=7,11-12
// index.vue
<script setup>
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '@oku-ui/primitives'
</script>

<template>
  <SliderRoot :default-value="[25, 75]">
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb />
    <SliderThumb />
  </SliderRoot>
</template>
```

### Define step size

Use the `step` prop to increase the stepping interval.

```vue line=7
// index.vue
<script setup>
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '@oku-ui/primitives'
</script>

<template>
  <SliderRoot
    :default-value="[50]"
    :step="10"
  >
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb />
  </SliderRoot>
</template>
```

### Prevent thumb overlap

Use `minStepsBetweenThumbs` to avoid thumbs with equal values.

```vue line=10
// index.vue
<script setup>
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from '@oku-ui/primitives'
</script>

<template>
  <SliderRoot
    :default-value="[25, 75]"
    :step="10"
    :min-steps-between-thumbs="1"
  >
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb />
    <SliderThumb />
  </SliderRoot>
</template>
```

## Accessibility

Adheres to the [Slider WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slidertwothumb).

### Keyboard Interactions

<KeyboardTable
  :data="[
    {
      keys: ['ArrowRight'],
      description: '<span> Increments/decrements by the <Code>step</Code> value depending on <Code>orientation</Code>. </span>',
    },
    {
      keys: ['ArrowLeft'],
      description: '<span> Increments/decrements by the <Code>step</Code> value depending on <Code>orientation</Code>. </span>',
    },
    {
      keys: ['ArrowUp'],
      description: '<span> Increases the value by the <Code>step</Code> amount. </span>',
    },
    {
      keys: ['ArrowDown'],
      description: '<span> Decreases the value by the <Code>step</Code> amount. </span>',
    },
    {
      keys: ['PageUp'],
      description: '<span> Increases the value by a larger <Code>step</Code>. </span>',
    },
    {
      keys: ['PageDown'],
      description: '<span> Decreases the value by a larger <Code>step</Code>. </span>',
    },
    {
      keys: ['Shift + ArrowUp'],
      description: '<span> Increases the value by a larger <Code>step</Code>. </span>',
    },
    {
      keys: ['Shift + ArrowDown'],
      description: '<span> Decreases the value by a larger <Code>step</Code>. </span>',
    },
    {
      keys: ['Home'],
      description: 'Sets the value to its minimum.',
    },
    {
      keys: ['End'],
      description: 'Sets the value to its maximum.',
    },
  ]"
/>

## Custom APIs

Create your own API by abstracting the primitive parts into your own component.

### Abstract all parts

This example abstracts all of the `Slider` parts so it can be used as a self closing element.

#### Usage

```vue
<script setup lang="ts">
import { Slider } from './your-slider'
</script>

<template>
  <Slider :default-value="[25]" />
</template>
```

#### Implementation

 ```ts
// your-slider.ts
export { default as Slider } from 'Slider.vue'
```

```vue
 <!-- Slider.vue -->
<script setup lang="ts">
import { SlideRoot, SliderRange, type SliderRootEmits, type SliderRootProps, SliderThumb, SliderTrack, useForwardPropsEmits } from '@oku-ui/primitives'

const props = defineProps<SliderRootProps>()
const emits = defineEmits<SliderRootEmits>()

const forward = useForwardPropsEmits(props, emits)
</script>

<template>
  <SliderRoot v-bind="forward">
    <SliderTrack>
      <SliderRange />
    </SliderTrack>

    <SliderThumb
      v-for="(_, i) in value"
      :key="i"
    />
  </SliderRoot>
</template>
```

## Caveats

### Mouse events are not fired

Because of [a limitation](https://github.com/oku-ui/primitives/blob/main/packages/core/src/Slider/SliderImpl.vue#L48-L49) we faced during implementation, the following example won't work as expected and the `@mousedown` and `@mousedown` event handlers won't be fired:

```vue
<SliderRoot
  @mousedown="() => { console.log('onMouseDown')  }"
  @mouseup="() => { console.log('onMouseUp')  }"
>
  …
</SliderRoot>
```

We recommend using pointer events instead (eg. `@pointerdown`, `@pointerup`). Regardless of the above limitation, these events are better suited for cross-platform/device handling as they are fired for all pointer input types (mouse, touch, pen, etc.).
