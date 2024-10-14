<script setup lang="ts">
import { type DropdownMenuSubEmits, type DropdownMenuSubProps, useDropdownMenuSub } from './DropdownMenuSub.ts'

defineOptions({
  name: 'DropdownMenuSub',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownMenuSubProps>(), {
  open: undefined,
  defaultOpen: false,
})
const emit = defineEmits<DropdownMenuSubEmits>()

useDropdownMenuSub({
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
