<script setup lang="ts">
import { useControllableState, useRef } from '../hooks/index.ts'
import { type DialogContentElement, type DialogEmits, type DialogProps, provideDialogContext } from './Dialog.ts'

defineOptions({
  name: 'OkuDialog',
})

const props = withDefaults(defineProps<DialogProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
})

const emit = defineEmits<DialogEmits>()

const triggerRef = useRef<HTMLButtonElement>()
const contentRef = useRef<DialogContentElement>()

const open = useControllableState(props, v => emit('update:open', v), 'open', props.defaultOpen)

provideDialogContext({
  triggerRef,
  contentRef,
  contentId: undefined,
  titleId: undefined,
  descriptionId: undefined,
  open,
  modal: props.modal,
  onOpenChange(value) {
    open.value = value
  },
  onOpenToggle() {
    open.value = !open.value
  },
})
</script>

<template>
  <slot />
</template>
