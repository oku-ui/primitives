<script setup lang="ts">
import { usePresence } from '../presence/index.ts'
import { useScrollbarContext } from './ScrollAreaScrollbar.ts'
import ScrollAreaThumbImpl from './ScrollAreaThumbImpl.vue'
import type { ScrollAreaThumbProps } from './ScrollAreaThumb.ts'

defineOptions({
  name: 'ScrollAreaThumb',
})

const props = defineProps<ScrollAreaThumbProps>()

const scrollbarContext = useScrollbarContext('ScrollAreaThumb')

const isPresent = usePresence(scrollbarContext.thumb, () => props.forceMount || scrollbarContext.hasThumb.value)
</script>

<template>
  <ScrollAreaThumbImpl v-if="isPresent">
    <slot />
  </ScrollAreaThumbImpl>
</template>
