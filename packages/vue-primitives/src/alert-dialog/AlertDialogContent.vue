<script setup lang="ts">
import { useRef } from '@oku-ui/hooks'
import { composeEventHandlers } from '@oku-ui/shared'
import { DialogContent } from '../dialog/index.ts'
import { type AlertDialogCancelElement, type AlertDialogContentEmits, provideAlertDialogContentContext } from './AlertDialogContent.ts'

defineOptions({
  name: 'AlertDialogContent',
})

const emit = defineEmits<AlertDialogContentEmits>()

const cancelRef = useRef<AlertDialogCancelElement>()

provideAlertDialogContentContext({
  cancelRef,
})

function preventDefault(event: Event) {
  event.preventDefault()
}

const onOpenAutoFocus = composeEventHandlers((event) => {
  emit('openAutoFocus', event)
}, (event) => {
  event.preventDefault()
  cancelRef.current?.focus({ preventScroll: true })
})
</script>

<template>
  <DialogContent
    role="alertdialog"
    @open-auto-focus="onOpenAutoFocus"
    @pointerdown-outside="preventDefault"
    @interact-outside="preventDefault"
  >
    <slot />
  </DialogContent>
</template>
