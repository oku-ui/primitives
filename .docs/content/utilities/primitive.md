---
title: Primitive
description: Compose Radix's functionality onto alternative element types or your own Vue components.
---

# Primitive

<Description>

Compose Radix's functionality onto alternative element types or your own Vue components.

</Description>

When you are building a component, in some cases you might want to allow user to compose some functionalities onto the underlying element, or alternative element. This is where `Primitive` comes in handy as it expose this capability to the user.

## API Reference

<PropsTable
  :data="[
    {
      name: 'as',
      required: false,
      type: 'string | Component',
      default: 'div',
      description: 'The element or component the current element should render as.',
    },
    {
      name: 'as=\'template\'',
      required: false,
      type: 'boolean',
      default: 'false',
      description: 'Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our <a href=&quot;/guides/composition&quot;>Composition</a> guide for more details.',
    }
  ]"
/>

## Usage

### Changing `as` value

If you want to change the default element or component being render, you can set the default `as` when defining the props.

```vue
<script setup lang="ts">
import { Primitive, type PrimitiveProps } from '@oku-ui/primitives'

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'span'
})
</script>

<template>
  <!-- Now this element will be rendered as `span` by default -->
  <Primitive v-bind="props">
    ...
  </Primitive>
</template>
```

### Render "as=\"template\""

Change the default rendered element for the one passed as a child, merging their props and behavior.<br><br>Read our <a href="/guides/composition">Composition</a> guide for more details.
