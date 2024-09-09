<script setup lang="ts">
import ScrollAreaCornerImpl from './ScrollAreaCornerImpl.vue'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'

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
