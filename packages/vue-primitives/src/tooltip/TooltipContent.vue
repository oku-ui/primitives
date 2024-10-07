<script setup lang="ts">
import { type TooltipContentProps, useTooltipContent } from './TooltipContent.ts'
import TooltipContentImpl from './TooltipContentImpl.vue'

defineOptions({
  name: 'TooltipContent',
})

const props = defineProps<TooltipContentProps>()

const context = useTooltipContent({
  forceMount: props.forceMount,
})
</script>

<template>
  <TooltipContentImpl v-if="context.isPresent.value">
    <slot />
  </TooltipContentImpl>
</template>
