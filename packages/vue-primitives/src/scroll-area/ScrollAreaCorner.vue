<script setup lang="ts">
import { useScrollAreaContext } from './ScrollArea.ts'
import type { ScrollAreaCornerProps } from './ScrollAreaCorner.ts'
import ScrollAreaCornerImpl from './ScrollAreaCornerImpl.vue'

defineOptions({
  name: 'ScrollAreaCorner',
})

defineProps<ScrollAreaCornerProps>()

const context = useScrollAreaContext('ScrollAreaCorner')
const hasCorner = () => context.type() !== 'scroll' && Boolean(context.scrollbarX.value && context.scrollbarY.value)
</script>

<template>
  <ScrollAreaCornerImpl
    v-if="hasCorner()"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </ScrollAreaCornerImpl>
</template>
