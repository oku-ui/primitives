<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { useScrollAreaCornerImpl } from './ScrollAreaCornerImpl.ts'

defineOptions({
  name: 'ScrollAreaCornerImpl',
  inheritAttrs: false,
})

const scrollAreaCornerImpl = useScrollAreaCornerImpl()
</script>

<template>
  <Primitive
    v-if="scrollAreaCornerImpl.hasSize.value"
    v-bind="normalizeAttrs(scrollAreaCornerImpl.attrs(), $attrs)"
  >
    <slot />
  </Primitive>
</template>
