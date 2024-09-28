<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { useScrollAreaViewport } from './ScrollAreaViewport.ts'

defineOptions({
  name: 'ScrollAreaViewport',
  inheritAttrs: false,
})

const scrollAreaViewport = useScrollAreaViewport()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(scrollAreaViewport.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
