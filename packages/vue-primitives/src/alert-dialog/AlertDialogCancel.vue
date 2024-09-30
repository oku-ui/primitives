<script setup lang="ts">
import { DialogClose } from '../dialog/index.ts'
import { useAlertDialogContentContext } from './AlertDialogContent.ts'

defineOptions({
  name: 'AlertDialogCancel',
})

const context = useAlertDialogContentContext('AlertDialogCancel')

function setCancelRef(nodeRef: any) {
  const node = nodeRef ? nodeRef.$el : undefined
  context.cancelRef.value = node
}
</script>

<template>
  <DialogClose :ref="setCancelRef">
    <slot />
  </DialogClose>
</template>
