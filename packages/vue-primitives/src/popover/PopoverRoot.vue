<script setup lang="ts">
import { type PopoverRootEmits, type PopoverRootProps, usePopoverRoot } from './PopoverRoot.ts'

defineOptions({
  name: 'PopoverRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopoverRootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: false,
})
const emit = defineEmits<PopoverRootEmits>()

usePopoverRoot({
  open() {
    return props.open
  },
  onUpdateOpen(open) {
    emit('update:open', open)
  },
  defaultOpen: props.defaultOpen,
  modal: props.modal,
})
</script>

<template>
  <slot />
</template>
