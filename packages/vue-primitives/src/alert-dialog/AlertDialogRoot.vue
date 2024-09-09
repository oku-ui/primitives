<script setup lang="ts">
import { provideDialogContext } from '../dialog/index.ts'
import { useId, useRef } from '../hooks/index.ts'
import { useControllableState } from '../hooks/useControllableState.ts'
import type { DialogContentElement } from '../dialog/DialogRoot.ts'
import type { AlertDialogRootEmits, AlertDialogRootProps } from './AlertDialogRoot.ts'

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

const open = useControllableState(props, v => emit('update:open', v), 'open', props.defaultOpen)

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
