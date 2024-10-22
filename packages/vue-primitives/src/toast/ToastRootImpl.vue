<script setup lang="ts">
import { Portal } from '../portal/index.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { type ToastRootImplEmits, type ToastRootImplProps, useToastRootImpl } from './ToastRootImpl.ts'

defineOptions({
  name: 'ToastRootImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToastRootImplProps>(), {
  as: 'li',
  type: 'foreground',
})
const emit = defineEmits<ToastRootImplEmits>()

const toastRootImpl = useToastRootImpl(convertPropsToHookProps(
  props,
  ['duration'],
  (): Required<EmitsToHookProps<ToastRootImplEmits>> => ({
    onEscapeKeydown(event) {
      emit('escapeKeydown', event)
    },
    onPause() {
      emit('pause')
    },
    onResume() {
      emit('resume')
    },
    onSwipeStart(event) {
      emit('swipeStart', event)
    },
    onSwipeMove(event) {
      emit('swipeMove', event)
    },
    onSwipeEnd(event) {
      emit('swipeEnd', event)
    },
    onSwipeCancel(event) {
      emit('swipeCancel', event)
    },
  }),
))
</script>

<template>
  <Portal v-if="toastRootImpl.viewport.value" :to="toastRootImpl.viewport.value">
    <Primitive v-bind="normalizeAttrs(toastRootImpl.attrs([$attrs, { as }]))">
      <slot />
    </Primitive>
  </Portal>
</template>
