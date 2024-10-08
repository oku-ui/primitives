<script setup lang="ts">
import { type HoverCardContentProps, useHoverCardConten } from './HoverCardContent.ts'
import HoverCardContentImpl from './HoverCardContentImpl.vue'

defineOptions({
  name: 'HoverCardContent',
})

const props = defineProps<HoverCardContentProps>()

const hoverCardConten = useHoverCardConten({
  forceMount: props.forceMount,
})
</script>

<template>
  <HoverCardContentImpl v-if="hoverCardConten.isPresent.value">
    <slot />
  </HoverCardContentImpl>
</template>
