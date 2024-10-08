<script setup lang="ts">
import { type HoverCardRootEmits, type HoverCardRootProps, useHoverCardRoot } from './HoverCardRoot.ts'

defineOptions({
  name: 'HoverCardRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<HoverCardRootProps>(), {
  open: undefined,
  defaultOpen: false,
  openDelay: 700,
  closeDelay: 300,
})

const emit = defineEmits<HoverCardRootEmits>()

useHoverCardRoot({
  open() {
    return props.open
  },
  onUpdateOpen(open) {
    emit('update:open', open)
  },
  defaultOpen: props.defaultOpen,
  openDelay: props.openDelay,
  closeDelay: props.closeDelay,
})
</script>

<template>
  <slot />
</template>
