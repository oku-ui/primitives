<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { useScrollAreaContent } from './ScrollAreaContent.ts'

defineOptions({
  name: 'ScrollAreaContent',
  inheritAttrs: false,
})

const scrollAreaContent = useScrollAreaContent()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(scrollAreaContent.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
