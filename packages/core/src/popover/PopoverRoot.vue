<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from './PopoverRoot.ts'
import { DEFAULT_POPOVER_ROOT_PROPS, usePopoverRoot } from './PopoverRoot.ts'

defineOptions({
  name: 'PopoverRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopoverRootProps>(), DEFAULT_POPOVER_ROOT_PROPS)
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
