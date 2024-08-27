<script setup lang="ts">
import { useScrollAreaContext } from './ScrollAreaRoot.ts'
import ScrollAreaCornerImpl from './ScrollAreaCornerImpl.vue'

defineOptions({
  name: 'ScrollAreaCorner',
})

const context = useScrollAreaContext('ScrollAreaCorner')
const hasCorner = () => context.type() !== 'scroll' && Boolean(context.scrollbarX.value && context.scrollbarY.value)
</script>

<template>
  <ScrollAreaCornerImpl v-if="hasCorner()">
    <slot />
  </ScrollAreaCornerImpl>
</template>
