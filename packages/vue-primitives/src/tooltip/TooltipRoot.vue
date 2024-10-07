<script setup lang="ts">
import { type TooltipRootEmits, type TooltipRootProps, useTooltipRoot } from './TooltipRoot.ts'

defineOptions({
  name: 'TooltipRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipRootProps>(), {
  open: undefined,
  defaultOpen: false,
  delayDuration: undefined,
  disableHoverableContent: undefined,
})
const emit = defineEmits<TooltipRootEmits>()

useTooltipRoot({
  open() {
    return props.open
  },
  onUpdateOpen(open) {
    emit('update:open', open)
  },
  delayDuration: props.delayDuration,
  disableHoverableContent: props.disableHoverableContent,
})
</script>

<template>
  <slot />
</template>
