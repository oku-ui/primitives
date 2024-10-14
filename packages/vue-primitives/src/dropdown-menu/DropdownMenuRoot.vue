<script setup lang="ts">
import { type DropdownMenuRootEmits, type DropdownMenuRootProps, useDropdownMenuRoot } from './DropdownMenuRoot.ts'

defineOptions({
  name: 'DropdownMenuRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownMenuRootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
})
const emit = defineEmits<DropdownMenuRootEmits>()

useDropdownMenuRoot({
  open() {
    return props.open
  },
  onUpdateOpen(open) {
    emit('update:open', open)
  },
  defaultOpen: props.defaultOpen,
  dir() {
    return props.dir
  },
  modal: props.modal,
})
</script>

<template>
  <slot />
</template>
