import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType } from '@oku-ui/primitive'
import type { PropType } from 'vue'
import { Fragment, Teleport, computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { useCallbackRef, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { composeEventHandlers } from '@oku-ui/utils'
import { CollectionItemSlot, createToastProvide, useToastProviderInject } from './toast-provider'
import { scopedProps } from './types'
import { OkuToastAnnounce } from './toast-announce'
import { getAnnounceTextContent, handleAndDispatchCustomEvent, isDeltaInDirection } from './utils'
import { TOAST_NAME } from './toast'
import { VIEWPORT_PAUSE, VIEWPORT_RESUME } from './toast-viewport'

const TOAST_SWIPE_START = 'toast.swipeStart'
const TOAST_SWIPE_MOVE = 'toast.swipeMove'
const TOAST_SWIPE_CANCEL = 'toast.swipeCancel'
const TOAST_SWIPE_END = 'toast.swipeEnd'

export type SwipeEvent = { currentTarget: EventTarget & ToastImplElement } & Omit<
  CustomEvent<{ originalEvent: PointerEvent; delta: { x: number; y: number } }>,
  'currentTarget'
>

const [toastInteractiveProvider, useToastInteractiveInject] = createToastProvide(TOAST_NAME, {
  onClose() {},
})

export type ToastImplIntrinsicElement = ElementType<'li'>
type ToastImplElement = HTMLLIElement
// type DismissableLayerProps = ComponentPropsWithoutRef<typeof DismissableLayer.Root>;
type ToastImplPrivateProps = { open: boolean; onClose(): void }
type PrimitiveListItemProps = ElementType<'li'>
interface ToastImplProps extends ToastImplPrivateProps, PrimitiveListItemProps {
  type?: 'foreground' | 'background'
  /**
   * Time in milliseconds that toast should remain visible for. Overrides value
   * given to `ToastProvider`.
   */
  duration?: number
}

const toastImplProps = {
  type: {
    type: String as PropType<ToastImplProps['type']>,
    default: 'foreground',
    required: false,
  },
  duration: {
    type: Number as PropType<number>,
    required: false,
  },
  open: {
    type: Boolean,
    required: false,
  },
  // onClose: {
  //   type: Function,
  //   required: false,
  // },
  // onEscapeKeyDown: {
  //   type: Function as PropType<(event: KeyboardEvent) => void>,
  //   required: false,
  // },
  // onPause: {
  //   type: Function as PropType<(event: any) => void>,
  //   required: false,
  // },
  // onResume: {
  //   type: Function as PropType<(event: any) => void>,
  //   required: false,
  // },
  // onSwipeStart: {
  //   type: Function as PropType<(event: SwipeEvent) => void>,
  //   required: false,
  // },
  // onSwipeMove: {
  //   type: Function as PropType<(event: SwipeEvent) => void>,
  //   required: false,
  // },
  // onSwipeCancel: {
  //   type: Function as PropType<(event: SwipeEvent) => void>,
  //   required: false,
  // },
  // onSwipeEnd: {
  //   type: Function as PropType<(event: SwipeEvent) => void>,
  //   required: false,
  // },
}

const toastImpl = defineComponent({
  name: TOAST_NAME,
  components: {
    OkuToastAnnounce,
    OkuDismissableLayer,
  },
  inheritAttrs: false,
  props: {
    ...toastImplProps,
    ...scopedProps,
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    escapeKeyDown: (event: KeyboardEvent) => true,
    // escapeKeyDown: DismissableLayerProps['onEscapeKeyDown'] => true,
    close: () => true,
    pause: () => true,
    resume: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    swipeStart: (event: SwipeEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    swipeMove: (event: SwipeEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    swipeCancel: (event: SwipeEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    swipeEnd: (event: SwipeEvent) => true,
  },
  setup(props, { attrs, emit }) {
    const { ...toastImplAttrs } = attrs as ToastImplIntrinsicElement

    const forwardedRef = useForwardRef()

    const {
      type,
      duration: durationProp,
      open,
      // onClose,
      // onEscapeKeyDown,
      // onPause,
      // onResume,
      // onSwipeStart,
      // onSwipeMove,
      // onSwipeCancel,
      // onSwipeEnd,
    } = toRefs(props)

    const context = useToastProviderInject(TOAST_NAME, props.scopeOkuToast)
    const node = ref<ToastImplElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, node)
    const pointerStartRef = ref<{ x: number; y: number } | null>(null)
    const swipeDeltaRef = ref<{ x: number; y: number } | null>(null)
    const duration = durationProp.value || context.duration
    const closeTimerStartTimeRef = ref(0)
    const closeTimerRemainingTimeRef = ref(duration)
    const closeTimerRef = ref(0)
    const { onToastAdd, onToastRemove } = context
    const handleClose = useCallbackRef(() => {
      // focus viewport if focus is within toast to read the remaining toast
      // count to SR users and ensure focus isn't lost
      const isFocusInToast = node.value?.contains(document.activeElement)
      if (isFocusInToast)
        context.viewport?.value?.focus()
      // onClose()
      emit('close')
    })

    const startTimer = useCallbackRef(
      (duration: number) => {
        if (!duration || duration === Number.POSITIVE_INFINITY)
          return
        window.clearTimeout(closeTimerRef.value)
        closeTimerStartTimeRef.value = new Date().getTime()
        closeTimerRef.value = window.setTimeout(handleClose, duration)
      },
    )

    watchEffect((onInvalidate) => {
      const viewport = context.viewport
      if (viewport) {
        const handleResume = () => {
          startTimer(closeTimerRemainingTimeRef.value)
          // onResume?.()
          emit('resume')
        }
        const handlePause = () => {
          const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.value
          closeTimerRemainingTimeRef.value = closeTimerRemainingTimeRef.value - elapsedTime
          window.clearTimeout(closeTimerRef.value)
          // onPause?.()
          emit('pause')
        }
        viewport.value?.addEventListener(VIEWPORT_PAUSE, handlePause)
        viewport.value?.addEventListener(VIEWPORT_RESUME, handleResume)

        onInvalidate(() => {
          viewport.value?.removeEventListener(VIEWPORT_PAUSE, handlePause)
          viewport.value?.removeEventListener(VIEWPORT_RESUME, handleResume)
        })
      }
    })

    // start timer when toast opens or duration changes.
    // we include `open` in deps because closed !== unmounted when animating
    // so it could reopen before being completely unmounted
    watchEffect(() => {
      if (open.value && !context.isClosePausedRef.value)
        startTimer(duration as number)
    })

    watchEffect((onInvalidate) => {
      onToastAdd()

      onInvalidate(() => onToastRemove())
    })

    const announceTextContent = computed(() => {
      return node.value ? getAnnounceTextContent(node.value) : null
    })

    if (!context.viewport)
      return null

    const handleSwipeMove = (event: SwipeEvent) => {
      emit('swipeMove', event)
    }

    const handleSwipeStart = (event: SwipeEvent) => {
      emit('swipeStart', event)
    }

    const handleSwipeEnd = (event: SwipeEvent) => {
      emit('swipeEnd', event)
    }
    const handleSwipeCancel = (event: SwipeEvent) => {
      emit('swipeCancel', event)
    }

    const originalReturn = () =>
      h(
        Fragment,
        [
          announceTextContent.value
          && h(
            OkuToastAnnounce,
            {
              'scope': props.scopeOkuToast,
              // Toasts are always role=status to avoid stuttering issues with role=alert in SRs.
              'role': 'status',
              'aria-live': type.value === 'foreground' ? 'assertive' : 'polite',
              'aria-atomic': true,
            },
            [
              h(announceTextContent),
            ],
          ),

          h(
            toastInteractiveProvider,
            {
              scope: props.scopeOkuToast,
              onClose: handleClose,
            },
            [
              h(
                Teleport,
                { to: 'body' },
                [
                  h(
                    CollectionItemSlot,
                    { scope: props.scopeOkuToast },
                    [
                      h(
                        OkuDismissableLayer,
                        {
                          asChild: true,
                          // onEscapeKeyDown: composeEventHandlers(onEscapeKeyDown.value, () => {
                          //   if (!context.isFocusedToastEscapeKeyDownRef.value)
                          //     handleClose()
                          //   context.isFocusedToastEscapeKeyDownRef.value = false
                          // }),
                          onEscapeKeyDown: composeEventHandlers<KeyboardEvent>((event) => {
                            emit('escapeKeyDown', event)
                          }, () => {
                            if (!context.isFocusedToastEscapeKeyDownRef.value)
                              handleClose()
                            context.isFocusedToastEscapeKeyDownRef.value = false
                          }),
                        },
                        [
                          h(
                            Primitive.li,
                            {
                              // Ensure toasts are announced as status list or status when focused
                              'role': 'status',
                              'aria-live': 'off',
                              'aria-atomic': true,
                              'tabIndex': 0,
                              'data-state': open.value ? 'open' : 'closed',
                              'data-swipe-direction': context.swipeDirection,
                              ...toastImplAttrs,
                              'ref': composedRefs,
                              'style': { userSelect: 'none', touchAction: 'none' },
                              // 'onKeyDown': composeEventHandlers(onKeyDown, (event) => {
                              //   if (event.key !== 'Escape')
                              //     return
                              //   onEscapeKeyDown.value?.(event.nativeEvent)
                              //   if (!event.nativeEvent.defaultPrevented) {
                              //     context.isFocusedToastEscapeKeyDownRef.value = true
                              //     handleClose()
                              //   }
                              // }),
                              'onKeyDown': composeEventHandlers<KeyboardEvent>((event) => {
                                emit('escapeKeyDown', event)
                              }, (event) => {
                                if (event.key !== 'Escape')
                                  return
                                if (!event.defaultPrevented) {
                                  context.isFocusedToastEscapeKeyDownRef.value = true
                                  handleClose()
                                }
                              }),
                              // 'onPointerDown': composeEventHandlers(onPointerDown, (event: PointerEvent) => {
                              //   if (event.button !== 0)
                              //     return
                              //   pointerStartRef.value = { x: event.clientX, y: event.clientY }
                              // }),
                              'onPointerDown': composeEventHandlers<PointerEvent>((_event) => {
                                // emit('pointerDown', event)
                              }, (event) => {
                                if (event.button !== 0)
                                  return
                                pointerStartRef.value = { x: event.clientX, y: event.clientY }
                              }),
                              // 'onPointerMove': composeEventHandlers(onPointerMove, (event: PointerEvent) => {
                              //   if (!pointerStartRef.value)
                              //     return
                              //   const x = event.clientX - pointerStartRef.value.x
                              //   const y = event.clientY - pointerStartRef.value.y
                              //   const hasSwipeMoveStarted = Boolean(swipeDeltaRef.value)
                              //   const isHorizontalSwipe = ['left', 'right'].includes(context.swipeDirection.value)
                              //   const clamp = ['left', 'up'].includes(context.swipeDirection.value) ? Math.min : Math.max
                              //   const clampedX = isHorizontalSwipe ? clamp(0, x) : 0
                              //   const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0
                              //   const moveStartBuffer = event.pointerType === 'touch' ? 10 : 2
                              //   const delta = { x: clampedX, y: clampedY }
                              //   const eventDetail = { originalEvent: event, delta }
                              //   if (hasSwipeMoveStarted) {
                              //     swipeDeltaRef.value = delta
                              //     handleAndDispatchCustomEvent(TOAST_SWIPE_MOVE, onSwipeMove.value, eventDetail, {
                              //       discrete: false,
                              //     })
                              //   }
                              //   else if (isDeltaInDirection(delta, context.swipeDirection.value, moveStartBuffer)) {
                              //     swipeDeltaRef.value = delta
                              //     handleAndDispatchCustomEvent(TOAST_SWIPE_START, onSwipeStart.value, eventDetail, {
                              //       discrete: false,
                              //     });
                              //     (event.target as HTMLElement).setPointerCapture(event.pointerId)
                              //   }
                              //   else if (Math.abs(x) > moveStartBuffer || Math.abs(y) > moveStartBuffer) {
                              //   // User is swiping in wrong direction so we disable swipe gesture
                              //   // for the current pointer down interaction
                              //     pointerStartRef.value = null
                              //   }
                              // }),
                              'onPointerMove': composeEventHandlers<PointerEvent>((_event) => {
                                // emit('pointerMove', event)
                              }, (event) => {
                                if (!pointerStartRef.value)
                                  return
                                const x = event.clientX - pointerStartRef.value.x
                                const y = event.clientY - pointerStartRef.value.y
                                const hasSwipeMoveStarted = Boolean(swipeDeltaRef.value)
                                const isHorizontalSwipe = ['left', 'right'].includes(context.swipeDirection.value)
                                const clamp = ['left', 'up'].includes(context.swipeDirection.value) ? Math.min : Math.max
                                const clampedX = isHorizontalSwipe ? clamp(0, x) : 0
                                const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0
                                const moveStartBuffer = event.pointerType === 'touch' ? 10 : 2
                                const delta = { x: clampedX, y: clampedY }
                                const eventDetail = { originalEvent: event, delta }
                                if (hasSwipeMoveStarted) {
                                  swipeDeltaRef.value = delta
                                  handleAndDispatchCustomEvent(TOAST_SWIPE_MOVE, handleSwipeMove, eventDetail, {
                                    discrete: false,
                                  })
                                }
                                else if (isDeltaInDirection(delta, context.swipeDirection.value, moveStartBuffer)) {
                                  swipeDeltaRef.value = delta
                                  handleAndDispatchCustomEvent(TOAST_SWIPE_START, handleSwipeStart, eventDetail, {
                                    discrete: false,
                                  });
                                  (event.target as HTMLElement).setPointerCapture(event.pointerId)
                                }
                                else if (Math.abs(x) > moveStartBuffer || Math.abs(y) > moveStartBuffer) {
                                // User is swiping in wrong direction so we disable swipe gesture
                                // for the current pointer down interaction
                                  pointerStartRef.value = null
                                }
                              }),
                              // 'onPointerUp': composeEventHandlers(onPointerUp, (event: PointerEvent) => {
                              //   const delta = swipeDeltaRef.value
                              //   const target = event.target as HTMLElement
                              //   if (target.hasPointerCapture(event.pointerId))
                              //     target.releasePointerCapture(event.pointerId)

                              //   swipeDeltaRef.value = null
                              //   pointerStartRef.value = null
                              //   if (delta) {
                              //     const toast = event.currentTarget
                              //     const eventDetail = { originalEvent: event, delta }
                              //     if (isDeltaInDirection(delta, context.swipeDirection.value, context.swipeThreshold.value)) {
                              //       handleAndDispatchCustomEvent(TOAST_SWIPE_END, onSwipeEnd.value, eventDetail, {
                              //         discrete: true,
                              //       })
                              //     }
                              //     else {
                              //       handleAndDispatchCustomEvent(TOAST_SWIPE_CANCEL, onSwipeCancel.value, eventDetail, {
                              //         discrete: true,
                              //       })
                              //     }
                              //     // Prevent click event from triggering on items within the toast when
                              //     // pointer up is part of a swipe gesture
                              //     toast?.addEventListener('click', (event: Event) => event.preventDefault(), {
                              //       once: true,
                              //     })
                              //   }
                              // }),
                              'onPointerUp': composeEventHandlers<PointerEvent>((_event) => {
                                // emit('pointerUp', event)
                              }, (event) => {
                                const delta = swipeDeltaRef.value
                                const target = event.target as HTMLElement
                                if (target.hasPointerCapture(event.pointerId))
                                  target.releasePointerCapture(event.pointerId)

                                swipeDeltaRef.value = null
                                pointerStartRef.value = null
                                if (delta) {
                                  const toast = event.currentTarget
                                  const eventDetail = { originalEvent: event, delta }
                                  if (isDeltaInDirection(delta, context.swipeDirection.value, context.swipeThreshold.value)) {
                                    handleAndDispatchCustomEvent(TOAST_SWIPE_END, handleSwipeEnd, eventDetail, {
                                      discrete: true,
                                    })
                                  }
                                  else {
                                    handleAndDispatchCustomEvent(TOAST_SWIPE_CANCEL, handleSwipeCancel, eventDetail, {
                                      discrete: true,
                                    })
                                  }
                                  // Prevent click event from triggering on items within the toast when
                                  // pointer up is part of a swipe gesture
                                  toast?.addEventListener('click', (event: Event) => event.preventDefault(), {
                                    once: true,
                                  })
                                }
                              }),
                            },
                          ),
                        ],
                      ),
                    ],
                  ),

                  h(context.viewport.value!),
                ],
              ),
            ],
          ),
        ],
      )

    if (type.value && !['foreground', 'background'].includes(type.value))
      throw new Error(`Invalid prop \`type\` supplied to \`${TOAST_NAME}\`. Expected \`foreground | background\`.`)

    return originalReturn
  },
})

export { useToastInteractiveInject }

export const OkuToastImpl = toastImpl as typeof toastImpl &
(new () => { $props: Partial<ToastImplElement> })

export type { ToastImplElement, ToastImplPrivateProps, ToastImplProps }
