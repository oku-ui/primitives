import type { PrimitiveProps } from '../primitive/index.ts'
import type { EmitsToHookProps, PrimitiveDefaultProps, PrimitiveElAttrs, RadixPrimitiveGetAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { isClient } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, onWatcherCleanup, type Ref, toValue, watch, watchEffect } from 'vue'
import { DATA_COLLECTION_ITEM } from '../collection/Collection.ts'
import { type DismissableLayerEmits, useDismissableLayer } from '../dismissable-layer/index.ts'
import { useToastProviderContext } from './ToastProvider.ts'
import { type SwipeEvent, TOAST_SWIPE_CANCEL, TOAST_SWIPE_END, TOAST_SWIPE_MOVE, TOAST_SWIPE_START, useToastRootContext } from './ToastRoot.ts'
import { VIEWPORT_PAUSE, VIEWPORT_RESUME } from './ToastViewport.ts'
import { getAnnounceTextContent, handleAndDispatchCustomEvent, isDeltaInDirection } from './utils.ts'

export interface ToastRootImplProps {
  as?: PrimitiveProps['as']
  type?: 'foreground' | 'background'
  /**
   * Time in milliseconds that toast should remain visible for. Overrides value
   * given to `ToastProvider`.
   */
  duration?: number
}

export const DEFAULT_TOAST_ROOT_IMPL_PROPS = {
  as: 'li',
} satisfies PrimitiveDefaultProps<ToastRootImplProps>

export type ToastRootImplEmits = {
  escapeKeydown: DismissableLayerEmits['escapeKeydown']
  pause: []
  resume: []
  swipeStart: [event: SwipeEvent]
  swipeMove: [event: SwipeEvent]
  swipeEnd: [event: SwipeEvent]
  swipeCancel: [event: SwipeEvent]
}

export interface UseToastRootImplProps extends EmitsToHookProps<ToastRootImplEmits> {
  type?: ToastRootImplProps['type']
  duration?: () => number | undefined
}

export function useToastRootImpl(props: UseToastRootImplProps): RadixPrimitiveReturns<{
  type: 'foreground' | 'background'
  viewport: Ref<HTMLElement | undefined>
  announceTextContent: Ref<string | undefined>
  attrs: RadixPrimitiveGetAttrs
}> {
  const {
    type = 'foreground',
  } = props

  const context = useToastProviderContext('ToastRootImpl')
  const contextToastRoot = useToastRootContext('ToastRootImpl')

  function setElRef(node: HTMLElement | undefined) {
    contextToastRoot.el.value = node
  }

  let pointerStartRef: { x: number, y: number } | undefined
  let swipeDeltaRef: { x: number, y: number } | undefined
  const duration = () => props.duration?.() || context.duration
  let closeTimerStartTimeRef = 0
  let closeTimerRemainingTimeRef = duration()
  let closeTimerRef = 0
  const { onToastAdd, onToastRemove } = context

  function handleClose() {
    // focus viewport if focus is within toast to read the remaining toast
    // count to SR users and ensure focus isn't lost
    const isFocusInToast = contextToastRoot.el.value?.contains(document.activeElement)
    if (isFocusInToast)
      context.viewport.value?.focus()
    contextToastRoot.onChangeOpen(false)
  }
  contextToastRoot.setOnClose(handleClose)

  function startTimer(duration: number) {
    if (!duration || duration === Infinity)
      return
    window.clearTimeout(closeTimerRef)
    closeTimerStartTimeRef = new Date().getTime()
    closeTimerRef = window.setTimeout(handleClose, duration)
  }

  function handleResume() {
    startTimer(closeTimerRemainingTimeRef)
    props.onResume?.()
  }

  function handlePause() {
    const elapsedTime = new Date().getTime() - closeTimerStartTimeRef
    closeTimerRemainingTimeRef = closeTimerRemainingTimeRef - elapsedTime
    window.clearTimeout(closeTimerRef)
    props.onPause?.()
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
    watchEffect(() => {
      if (!contextToastRoot.open.value || context.isClosePausedRef.value)
        return

      startTimer(duration())
      onWatcherCleanup(() => {
        window.clearTimeout(closeTimerRef)
      })
    })
  }

  onMounted(() => {
    onToastAdd()
  })

  onBeforeUnmount(() => {
    onToastRemove()
  })

  const announceTextContent = computed(() => {
    if (!contextToastRoot.el.value)
      return undefined
    let text = ''

    for (const item of getAnnounceTextContent(contextToastRoot.el.value)) {
      text += `${item} `
    }

    return text
  })

  function onSwipeStart(event: SwipeEvent) {
    props.onSwipeStart?.(event)
    if (event.defaultPrevented)
      return
    event.currentTarget?.setAttribute('data-swipe', 'start')
  }

  function onSwipeMove(event: SwipeEvent) {
    props.onSwipeMove?.(event)
    if (event.defaultPrevented)
      return
    event.currentTarget.setAttribute('data-swipe', 'move')
    event.currentTarget.style.setProperty('--radix-toast-swipe-move-x', `${event.detail.delta.x}px`)
    event.currentTarget.style.setProperty('--radix-toast-swipe-move-y', `${event.detail.delta.y}px`)
  }

  function onSwipeCancel(event: SwipeEvent) {
    props.onSwipeCancel?.(event)
    if (event.defaultPrevented)
      return
    event.currentTarget.setAttribute('data-swipe', 'cancel')
    event.currentTarget.style.removeProperty('--radix-toast-swipe-move-x')
    event.currentTarget.style.removeProperty('--radix-toast-swipe-move-y')
    event.currentTarget.style.removeProperty('--radix-toast-swipe-end-x')
    event.currentTarget.style.removeProperty('--radix-toast-swipe-end-y')
  }

  function onSwipeEnd(event: SwipeEvent) {
    props.onSwipeCancel?.(event)
    if (event.defaultPrevented)
      return
    event.currentTarget.setAttribute('data-swipe', 'end')
    event.currentTarget.style.removeProperty('--radix-toast-swipe-move-x')
    event.currentTarget.style.removeProperty('--radix-toast-swipe-move-y')
    event.currentTarget.style.setProperty('--radix-toast-swipe-end-x', `${event.detail.delta.x}px`)
    event.currentTarget.style.setProperty('--radix-toast-swipe-end-y', `${event.detail.delta.y}px`)
    contextToastRoot.onChangeOpen(false)
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented)
      return
    if (event.key !== 'Escape')
      return

    props.onEscapeKeydown?.(event)

    if (!event.defaultPrevented) {
      context.isFocusedToastEscapeKeyDownRef.value = true
      handleClose()
    }
  }

  function onPointerdown(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    if (event.button !== 0)
      return
    pointerStartRef = { x: event.clientX, y: event.clientY }
  }

  function onPointermove(event: PointerEvent) {
    if (event.defaultPrevented)
      return
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
  }

  function onPointerup(event: PointerEvent) {
    if (event.defaultPrevented)
      return
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
    toast?.addEventListener('click', onClick, { once: true })
  }

  const dismissableLayer = useDismissableLayer(
    {
      el: contextToastRoot.el,
      disableOutsidePointerEvents() {
        return false
      },
      onEscapeKeydown: props.onEscapeKeydown,
    },
  )

  const style = {
    userSelect: 'none',
    touchAction: 'none',
  } as const

  return {
    type,
    viewport: context.viewport,
    announceTextContent,
    attrs(extraAttrs = []) {
      const attrs: PrimitiveElAttrs = {
        'elRef': setElRef,
        [DATA_COLLECTION_ITEM]: true,
        'role': 'status',
        'aria-live': 'off',
        'aria-atomic': true,
        'tabindex': 0,
        'data-state': contextToastRoot.open.value ? 'open' : 'closed',
        'data-swipe-direction': context.swipeDirection.value,
        'style': style,
        onKeydown,
        onPointerdown,
        onPointermove,
        onPointerup,
      }

      return dismissableLayer.attrs([attrs, ...extraAttrs])
    },
  }
}
