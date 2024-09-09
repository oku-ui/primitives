<script setup lang="ts">
import { isClient } from '@vueuse/core'
import { computed, onBeforeUnmount, onWatcherCleanup, shallowRef, toValue, watch, watchEffect } from 'vue'
import { ITEM_DATA_ATTR } from '../collection/Collection.ts'
import { useDismissableLayer } from '../dismissable-layer/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import { Portal } from '../portal/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useToastProviderContext } from './index.ts'
import ToastAnnounce from './ToastAnnounce.vue'
import { provideToastInteractiveContext, type SwipeEvent, TOAST_SWIPE_CANCEL, TOAST_SWIPE_END, TOAST_SWIPE_MOVE, TOAST_SWIPE_START } from './ToastRoot.ts'
import { VIEWPORT_PAUSE, VIEWPORT_RESUME } from './ToastViewport.ts'
import { getAnnounceTextContent, handleAndDispatchCustomEvent, isDeltaInDirection, useNextFrame } from './utils.ts'
import type { ToastRootImplEmits, ToastRootImplProps } from './ToastRootImpl.ts'

defineOptions({
  name: 'ToastRootImpl',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToastRootImplProps>(), {
  as: 'li',
  type: 'foreground',
})
const emit = defineEmits<ToastRootImplEmits>()

const $el = shallowRef<HTMLLIElement>()
const forwardElement = useForwardElement($el)

const context = useToastProviderContext('ToastRootImpl')

let pointerStartRef: { x: number, y: number } | undefined
let swipeDeltaRef: { x: number, y: number } | undefined
const duration = () => props.duration || context.duration
let closeTimerStartTimeRef = 0
let closeTimerRemainingTimeRef = duration()
let closeTimerRef = 0
const { onToastAdd, onToastRemove } = context

function onSwipeMove(event: SwipeEvent) {
  emit('swipeMove', event)
}

function onSwipeStart(event: SwipeEvent) {
  emit('swipeStart', event)
}

function onSwipeEnd(event: SwipeEvent) {
  emit('swipeEnd', event)
}

function onSwipeCancel(event: SwipeEvent) {
  emit('swipeCancel', event)
}

function handleClose() {
  // focus viewport if focus is within toast to read the remaining toast
  // count to SR users and ensure focus isn't lost
  const isFocusInToast = $el.value?.contains(document.activeElement)
  if (isFocusInToast)
    context.viewport.value?.focus()
  emit('close')
}

function startTimer(duration: number) {
  if (!duration || duration === Infinity)
    return
  window.clearTimeout(closeTimerRef)
  closeTimerStartTimeRef = new Date().getTime()
  closeTimerRef = window.setTimeout(handleClose, duration)
}

function handleResume() {
  startTimer(closeTimerRemainingTimeRef)
  emit('resume')
}

function handlePause() {
  const elapsedTime = new Date().getTime() - closeTimerStartTimeRef
  closeTimerRemainingTimeRef = closeTimerRemainingTimeRef - elapsedTime
  window.clearTimeout(closeTimerRef)
  emit('pause')
}

watch(context.viewport, (viewport) => {
  if (!viewport)
    return

  viewport.addEventListener(VIEWPORT_PAUSE, handlePause)
  viewport.addEventListener(VIEWPORT_RESUME, handleResume)

  onWatcherCleanup(() => {
    viewport.removeEventListener(VIEWPORT_PAUSE, handlePause)
    viewport.removeEventListener(VIEWPORT_RESUME, handleResume)
  })
}, { immediate: true })

// start timer when toast opens or duration changes.
// we include `open` in deps because closed !== unmounted when animating
// so it could reopen before being completely unmounted
if (isClient) {
  watchEffect((onCleanup) => {
    if (props.open && !context.isClosePausedRef.current) {
      startTimer(duration())
      onCleanup(() => window.clearTimeout(closeTimerRef))
    }
  })
}

const announceTextContent = computed(() => $el.value ? getAnnounceTextContent($el.value) : null)

const renderAnnounceText = shallowRef(false)
const isAnnounced = shallowRef(false)
// let timerIsAnnounced: number | undefined

// TODO: render text content in the next frame to ensure toast is announced in NVDA
// let cliear: () => void

// if (!context.viewport)
//   return null

watch($el, (el) => {
  if (!el)
    return
  onToastAdd()

  // render text content in the next frame to ensure toast is announced in NVDA
  const cliear = useNextFrame(() => {
    renderAnnounceText.value = true
  })

  const timerIsAnnounced = window.setTimeout(() => {
    isAnnounced.value = true
  }, 1000)

  onWatcherCleanup(() => {
    onToastRemove()
    cliear()
    window.clearTimeout(timerIsAnnounced)
  })
})

const onEscapeKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('escapeKeydown', event)
}, () => {
  if (!context.isFocusedToastEscapeKeyDownRef.current)
    handleClose()
  context.isFocusedToastEscapeKeyDownRef.current = false
})

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event) => {
  if (event.key !== 'Escape')
    return

  emit('escapeKeydown', event)

  if (!event.defaultPrevented) {
    context.isFocusedToastEscapeKeyDownRef.current = true
    handleClose()
  }
})

const onPointerdown = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerdown', event)
}, (event) => {
  if (event.button !== 0)
    return
  pointerStartRef = { x: event.clientX, y: event.clientY }
})

const onPointermove = composeEventHandlers<PointerEvent>((event) => {
  emit('pointermove', event)
}, (event) => {
  if (!pointerStartRef)
    return
  const x = event.clientX - pointerStartRef.x
  const y = event.clientY - pointerStartRef.y
  const hasSwipeMoveStarted = Boolean(swipeDeltaRef)
  const isHorizontalSwipe = ['left', 'right'].includes(context.swipeDirection.value)
  const clamp = ['left', 'up'].includes(context.swipeDirection.value)
    ? Math.min
    : Math.max
  const clampedX = isHorizontalSwipe ? clamp(0, x) : 0
  const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0
  const moveStartBuffer = event.pointerType === 'touch' ? 10 : 2
  const delta = { x: clampedX, y: clampedY }
  const eventDetail = { originalEvent: event, delta }
  if (hasSwipeMoveStarted) {
    swipeDeltaRef = delta
    handleAndDispatchCustomEvent(TOAST_SWIPE_MOVE, onSwipeMove, eventDetail)
  }
  else if (isDeltaInDirection(delta, context.swipeDirection.value, moveStartBuffer)) {
    swipeDeltaRef = delta
    handleAndDispatchCustomEvent(TOAST_SWIPE_START, onSwipeStart, eventDetail);
    (event.target as HTMLElement).setPointerCapture(event.pointerId)
  }
  else if (Math.abs(x) > moveStartBuffer || Math.abs(y) > moveStartBuffer) {
    // User is swiping in wrong direction so we disable swipe gesture
    // for the current pointer down interaction
    pointerStartRef = undefined
  }
})

let clearOnClick: (() => void) | undefined

const onPointerup = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerup', event)
}, (event) => {
  const delta = swipeDeltaRef
  const target = event.target as HTMLElement
  if (target.hasPointerCapture(event.pointerId)) {
    target.releasePointerCapture(event.pointerId)
  }
  swipeDeltaRef = undefined
  pointerStartRef = undefined

  if (!delta)
    return

  const toast = event.currentTarget
  const eventDetail = { originalEvent: event, delta }
  if (isDeltaInDirection(delta, context.swipeDirection.value, toValue(context.swipeThreshold))) {
    handleAndDispatchCustomEvent(TOAST_SWIPE_END, onSwipeEnd, eventDetail)
  }
  else {
    handleAndDispatchCustomEvent(TOAST_SWIPE_CANCEL, onSwipeCancel, eventDetail)
  }
  // Prevent click event from triggering on items within the toast when
  // pointer up is part of a swipe gesture
  const onClick = (event: Event) => {
    event.preventDefault()
  }
  clearOnClick?.()
  toast?.addEventListener('click', onClick, { once: true })
  clearOnClick = () => {
    toast?.removeEventListener('click', onClick)
  }
})

onBeforeUnmount(() => {
  clearOnClick?.()
})

// ToastAnnounce

// TODO: wip
// const [renderAnnounceText, setRenderAnnounceText] = React.useState(false)

// // render text content in the next frame to ensure toast is announced in NVDA
// useNextFrame(() => {
//   setRenderAnnounceText(true)
// })

provideToastInteractiveContext({
  onClose: handleClose,
})

// DismissableLayer

const dismissableLayer = useDismissableLayer(
  $el,
  {
    disableOutsidePointerEvents() {
      return false
    },
  },
  {
    onEscapeKeydown,
  },
)

defineExpose({
  $el,
})
</script>

<template>
  <template v-if="context.viewport.value">
    <ToastAnnounce
      v-if="announceTextContent"
      :aria-live="type === 'foreground' ? 'assertive' : 'polite'"
    >
      {{ announceTextContent }}
    </ToastAnnounce>

    <Portal :to="context.viewport.value">
      <Primitive
        :ref="forwardElement"
        :as="as"

        data-dismissable-layer

        role="status"
        aria-live="off"
        aria-atomic
        tabindex="0"
        :data-state="open ? 'open' : 'closed'"
        :data-swipe-direction="context.swipeDirection.value"
        v-bind="$attrs"
        :style="{
          pointerEvents: dismissableLayer.pointerEvents(),
          userSelect: 'none',
          touchAction: 'none',
        }"
        :[ITEM_DATA_ATTR]="true"
        @keydown="onKeydown"
        @pointerdown="onPointerdown"
        @pointermove="onPointermove"
        @pointerup="onPointerup"

        @focus.capture="dismissableLayer.onFocusCapture"
        @blur.capture="dismissableLayer.onBlurCapture"
        @pointerdown.capture="dismissableLayer.onPointerdownCapture"
      >
        <slot />
      </Primitive>
    </Portal>
  </template>
</template>
