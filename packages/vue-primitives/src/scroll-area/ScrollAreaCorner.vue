<script setup lang="ts">
import { useScrollAreaCorner } from './ScrollAreaCorner.ts'
import ScrollAreaCornerImpl from './ScrollAreaCornerImpl.vue'

defineOptions({
  name: 'ScrollAreaCorner',
})

const scrollAreaCorner = useScrollAreaCorner()
</script>

<template>
  <ScrollAreaCornerImpl v-if="scrollAreaCorner.hasCorner.value">
    <slot />
  </ScrollAreaCornerImpl>
</template>
