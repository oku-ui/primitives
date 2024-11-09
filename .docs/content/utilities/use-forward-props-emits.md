---
title: useForwardPropsEmits
description: Combinations for useForwardProps & useEmitAsProps
---

# useForwardPropsEmits

<Description>
Combinations for useForwardProps & useEmitAsProps
</Description>

This composable is just a wrapper for [useForwardProps](/utilities/use-forward-props) & [useEmitAsProps](/utilities/use-emit-as-props.html) composables. Doing so it returns only 1 object that is designed to be use with `v-bind` directly.

## Usage

```vue
<script setup lang="ts">
import { useForwardPropsEmits } from '@oku-ui/primitives'

const props = defineProps<CompEmitProps>()
const emits = defineEmits<CompEmitEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Comp v-bind="forwarded">
    ...
  </Comp>
</template>
```
