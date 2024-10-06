


<script setup lang="ts">
import { type DialogRootEmits, type DialogRootProps, useDialogRoot } from './DialogRoot.ts'

defineOptions({
  name: 'DialogRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<DialogRootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
})

const emit = defineEmits<DialogRootEmits>()

useDialogRoot({
  modal: props.modal,
  open() {
    return props.open
  },
  onUpdateOpen(value) {
    emit('update:open', value)
  },
  defaultOpen: props.defaultOpen,
})
</script>

<template>
  <slot />
</template>
