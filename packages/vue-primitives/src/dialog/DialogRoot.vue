<script setup lang="ts">
import { useControllableState, useId, useRef } from '../hooks/index.ts'
import { type DialogContentElement, type DialogRootEmits, type DialogRootProps, provideDialogContext } from './DialogRoot.ts'

defineOptions({
  name: 'DialogRoot',
})

const props = withDefaults(defineProps<DialogRootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
})

const emit = defineEmits<DialogRootEmits>()

const triggerRef = useRef<HTMLButtonElement>()
const contentRef = useRef<DialogContentElement>()

const open = useControllableState(props, v => emit('update:open', v), 'open', props.defaultOpen)

provideDialogContext({
  triggerRef,
  contentRef,
  contentId: useId(),
  titleId: useId(),
  descriptionId: useId(),
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
