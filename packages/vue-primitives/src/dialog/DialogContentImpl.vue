<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { type DialogContentImplEmits, useDialogContentImpl } from './DialogContentImpl.ts'

defineOptions({
  name: 'DialogContentImpl',
  inheritAttrs: false,
})

const emit = defineEmits<DialogContentImplEmits>()

const dialogContentImpl = useDialogContentImpl({
  onOpenAutoFocus(event) {
    emit('openAutoFocus', event)
  },
  onCloseAutoFocus(event) {
    emit('closeAutoFocus', event)
  },
  onEscapeKeydown(event) {
    emit('escapeKeydown', event)
  },
  onPointerdownOutside(event) {
    emit('pointerdownOutside', event)
  },
  onFocusOutside(event) {
    emit('focusOutside', event)
  },
  onInteractOutside(event) {
    emit('interactOutside', event)
  },
} satisfies Required<EmitsToHookProps<DialogContentImplEmits>>)
</script>

<template>
  <Primitive v-bind="normalizeAttrs(dialogContentImpl.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
