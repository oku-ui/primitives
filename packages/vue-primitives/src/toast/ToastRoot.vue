<script setup lang="ts">
import type { SwipeEvent, ToastRootEmits, ToastRootProps } from './ToastRoot.ts'
import { shallowRef } from 'vue'
import { useControllableState, useForwardElement } from '../hooks/index.ts'
import { usePresence } from '../presence/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import ToastRootImpl from './ToastRootImpl.vue'

defineOptions({
  name: 'ToastRoot',
})
const props = withDefaults(defineProps<ToastRootProps>(), {
  open: undefined,
  defaultOpen: true,
})
const emit = defineEmits<ToastRootEmits>()
const open = useControllableState(props, 'open', v => emit('update:open', v), props.defaultOpen)

const $el = shallowRef<HTMLLIElement>()
const forwardElement = useForwardElement($el)

const isPresent = usePresence($el, () => props.forceMount || open.value)

function onClose() {
  open.value = false
}

const onSwipeStart = composeEventHandlers<SwipeEvent>((event) => {
  emit('swipeStart', event)
}, (event) => {
  event.currentTarget?.setAttribute('data-swipe', 'start')
})

const onSwipeMove = composeEventHandlers<SwipeEvent>((event) => {
  emit('swipeMove', event)
}, (event) => {
  event.currentTarget.setAttribute('data-swipe', 'move')
  event.currentTarget.style.setProperty('--radix-toast-swipe-move-x', `${event.detail.delta.x}px`)
  event.currentTarget.style.setProperty('--radix-toast-swipe-move-y', `${event.detail.delta.y}px`)
})

const onSwipeCancel = composeEventHandlers<SwipeEvent>((event) => {
  emit('swipeCancel', event)
}, (event) => {
  event.currentTarget.setAttribute('data-swipe', 'cancel')
  event.currentTarget.style.removeProperty('--radix-toast-swipe-move-x')
  event.currentTarget.style.removeProperty('--radix-toast-swipe-move-y')
  event.currentTarget.style.removeProperty('--radix-toast-swipe-end-x')
  event.currentTarget.style.removeProperty('--radix-toast-swipe-end-y')
})

const onSwipeEnd = composeEventHandlers<SwipeEvent>((event) => {
  emit('swipeEnd', event)
}, (event) => {
  event.currentTarget.setAttribute('data-swipe', 'end')
  event.currentTarget.style.removeProperty('--radix-toast-swipe-move-x')
  event.currentTarget.style.removeProperty('--radix-toast-swipe-move-y')
  event.currentTarget.style.setProperty('--radix-toast-swipe-end-x', `${event.detail.delta.x}px`)
  event.currentTarget.style.setProperty('--radix-toast-swipe-end-y', `${event.detail.delta.y}px`)
  open.value = false
})

defineExpose({
  $el,
})
</script>

<template>
  <ToastRootImpl
    v-if="isPresent"
    :ref="forwardElement"
    :open="open"
    @close="onClose"
    @swipe-start="onSwipeStart"
    @swipe-move="onSwipeMove"
    @swipe-cancel="onSwipeCancel"
    @swipe-end="onSwipeEnd"
  >
    <slot />
  </ToastRootImpl>
</template>
