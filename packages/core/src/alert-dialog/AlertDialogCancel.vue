<script setup lang="ts">
import type { AlertDialogCancelProps } from './AlertDialogCancel.ts'
import { DialogClose } from '../dialog/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_ALERT_DIALOG_CANCEL_PROPS, useAlretDialogCancel } from './AlertDialogCancel.ts'

defineOptions({
  name: 'AlertDialogCancel',
  inheritAttrs: false,
})

withDefaults(defineProps<AlertDialogCancelProps>(), DEFAULT_ALERT_DIALOG_CANCEL_PROPS)

const alretDialogCancel = useAlretDialogCancel()
</script>

<template>
  <DialogClose v-bind="normalizeAttrs(alretDialogCancel.attrs([$attrs, { as }]))">
    <slot />
  </DialogClose>
</template>
