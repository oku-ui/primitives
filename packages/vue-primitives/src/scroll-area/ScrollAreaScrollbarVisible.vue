<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'

import { type ScrollAreaScrollbarVisibleProps, useScrollAreaScrollbarVisible } from './ScrollAreaScrollbarVisible.ts'

defineOptions({
  name: 'ScrollAreaScrollbarVisible',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaScrollbarVisibleProps>(), {
  orientation: 'vertical',
})

const scrollAreaScrollbarVisible = useScrollAreaScrollbarVisible({
  orientation: props.orientation,
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(scrollAreaScrollbarVisible.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
