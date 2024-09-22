<script setup lang="ts">
import { type ScrollAreaThumbProps, useScrollAreaThumb } from './ScrollAreaThumb.ts'
import ScrollAreaThumbImpl from './ScrollAreaThumbImpl.vue'

defineOptions({
  name: 'ScrollAreaThumb',
})

const props = defineProps<ScrollAreaThumbProps>()

const scrollAreaThumb = useScrollAreaThumb({
  forceMount: props.forceMount,
})
</script>

<template>
  <ScrollAreaThumbImpl v-if="scrollAreaThumb.isPresent.value">
    <slot />
  </ScrollAreaThumbImpl>
</template>
