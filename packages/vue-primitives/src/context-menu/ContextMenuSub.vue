<script setup lang="ts">
import { type ContextMenuSubEmits, type ContextMenuSubProps, useContextMenuSub } from './ContextMenuSub.ts'

defineOptions({
  name: 'ContextMenuSub',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuSubProps>(), {
  open: undefined,
  defaultOpen: false,
})

const emit = defineEmits<ContextMenuSubEmits>()

// COMP::MenuSub

useContextMenuSub({
  open() {
    return props.open
  },
  onUpdateOpen(open) {
    emit('update:open', open)
  },
  defaultOpen: props.defaultOpen,
})
</script>

<template>
  <slot />
</template>
