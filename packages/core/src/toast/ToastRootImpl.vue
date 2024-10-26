<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { VISUALLY_HIDDEN_STYLE } from '../visually-hidden/VisuallyHidden.ts'
import { useToastAnnounce } from './ToastAnnounce.ts'
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

const toastAnnounce = useToastAnnounce()
</script>

<template>
  <template v-if="toastRootImpl.viewport.value">
    <Teleport v-if="!toastAnnounce.isAnnounced.value" to="body">
      <span
        v-if="toastRootImpl.announceTextContent.value"
        role="status"
        :aria-live="toastRootImpl.type === 'foreground' ? 'assertive' : 'polite'"
        aria-atomic
        :style="VISUALLY_HIDDEN_STYLE"
      >
        <span v-if="toastAnnounce.renderAnnounceText.value">
          {{ toastAnnounce.label }} {{ toastRootImpl.announceTextContent.value }}
        </span>
      </span>
    </Teleport>
    <Teleport :to="toastRootImpl.viewport.value">
      <Primitive v-bind="normalizeAttrs(toastRootImpl.attrs([$attrs, { as }]))">
        <slot />
      </Primitive>
    </Teleport>
  </template>
</template>
