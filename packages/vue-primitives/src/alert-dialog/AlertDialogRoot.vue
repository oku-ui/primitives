<script setup lang="ts">
import type { DialogContentElement } from '../dialog/index.ts'
import type { AlertDialogRootEmits, AlertDialogRootProps } from './AlertDialogRoot.ts'
import { provideDialogContext } from '../dialog/index.ts'
import { useControllableState, useId, useRef } from '../hooks/index.ts'

defineOptions({
  name: 'AlertDialogRoot',
})

const props = withDefaults(defineProps<AlertDialogRootProps>(), {
  open: undefined,
  defaultOpen: false,
})

const emit = defineEmits<AlertDialogRootEmits>()

const triggerRef = useRef<HTMLButtonElement>()
const contentRef = useRef<DialogContentElement>()

const open = useControllableState(props, 'open', v => emit('update:open', v), props.defaultOpen)

provideDialogContext({
  triggerRef,
  contentRef,
  contentId: useId(),
  titleId: useId(),
  descriptionId: useId(),
  open,
  modal: true,
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
