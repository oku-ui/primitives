<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { useScrollAreaThumbImpl } from './ScrollAreaThumbImpl.ts'

defineOptions({
  name: 'ScrollAreaThumbImpl',
  inheritAttrs: false,
})

const scrollAreaThumbImpl = useScrollAreaThumbImpl()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(scrollAreaThumbImpl.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
