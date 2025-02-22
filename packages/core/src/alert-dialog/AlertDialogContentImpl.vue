<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { AlertDialogContentImplEmits } from './AlertDialogContentImpl.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { useAlertDialogContentImpl } from './AlertDialogContentImpl.ts'

defineOptions({
  name: 'AlertDialogContentImpl',
  inheritAttrs: false,
})

const emit = defineEmits<AlertDialogContentImplEmits>()

const alertDialogContentImpl = useAlertDialogContentImpl({
  onEscapeKeydown(event) {
    emit('escapeKeydown', event)
  },
  onFocusOutside(event) {
    emit('focusOutside', event)
  },
  onOpenAutoFocus(event) {
    emit('openAutoFocus', event)
  },
  onCloseAutoFocus(event) {
    emit('closeAutoFocus', event)
  },
} satisfies Required<EmitsToHookProps<AlertDialogContentImplEmits>>)
</script>

<template>
  <Primitive v-bind="normalizeAttrs(alertDialogContentImpl.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
