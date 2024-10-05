<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type ScrollAreaRootProps, useScrollAreaRoot } from './ScrollAreaRoot.ts'

defineOptions({
  name: 'ScrollAreaRoot',
  inheritAttrs: false,

})

const props = withDefaults(defineProps<ScrollAreaRootProps>(), {
  type: 'hover',
  scrollHideDelay: 600,
})

const scrollAreaRoot = useScrollAreaRoot({
  type: props.type,
  dir() {
    return props.dir
  },
  scrollHideDelay: props.scrollHideDelay,
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(scrollAreaRoot.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
