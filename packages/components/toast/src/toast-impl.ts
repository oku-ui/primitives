import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import type { PropType } from 'vue'
import { Fragment, Teleport, computed, defineComponent, h, mergeProps, nextTick, reactive, ref, toRefs, watchEffect } from 'vue'
import { isClient, reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { DismissableLayerEmits } from '@oku-ui/dismissable-layer'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { composeEventHandlers } from '@oku-ui/utils'
import { CollectionItemSlot, TOAST_NAME, toastInteractiveProvider, useToastProviderInject } from './share'
import { scopedToastProps } from './types'
import { OkuToastAnnounce } from './toast-announce'
import { getAnnounceTextContent, handleAndDispatchCustomEvent, isDeltaInDirection } from './utils'
import { VIEWPORT_PAUSE, VIEWPORT_RESUME } from './toast-viewport'

const TOAST_SWIPE_START = 'toast.swipeStart'
const TOAST_SWIPE_MOVE = 'toast.swipeMove'
const TOAST_SWIPE_CANCEL = 'toast.swipeCancel'
const TOAST_SWIPE_END = 'toast.swipeEnd'

export type SwipeEvent = { currentTarget: EventTarget & ToastImplElement } & Omit<
  CustomEvent<{ originalEvent: PointerEvent; delta: { x: number; y: number } }>,
  'currentTarget'
>

export type ToastImplNaviteElement = OkuElement<'li'>
export type ToastImplElement = HTMLLIElement

export type ToastImplPrivateProps = {
  open: boolean
}

export type ToastImplPrivateEmits = {
  close: []
}

export const toastImplPrivateProps = {
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    close: () => true,
  },
}

export type PrimitiveListItemProps = OkuElement<'li'>

export interface ToastImplProps extends ToastImplPrivateProps, PrimitiveProps {
  type?: 'foreground' | 'background'
  /**
   * Time in milliseconds that toast should remain visible for. Overrides value
   * given to `ToastProvider`.
   */
  duration?: number
}

export type ToastImplEmits = {
  escapeKeydown: [event: DismissableLayerEmits['escapeKeydown'][0]]
  close: []
  pause: []
  resume: []
  swipeStart: [event: SwipeEvent]
  swipeMove: [event: SwipeEvent]
  swipeCancel: [event: SwipeEvent]
  swipeEnd: [event: SwipeEvent]
  keydown: [event: KeyboardEvent]
  pointerdown: [event: PointerEvent]
  pointermove: [event: PointerEvent]
  pointerup: [event: PointerEvent]
} & ToastImplPrivateEmits

export const toastImplProps = {
  props: {
    type: {
      type: String as PropType<ToastImplProps['type']>,
      default: 'foreground',
      required: false,
    },
    duration: {
      type: Number as PropType<number>,
      required: false,
    },
    ...toastImplPrivateProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    escapeKeydown: (event: DismissableLayerEmits['escapeKeydown'][0]) => true,
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
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointermove: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerup: (event: PointerEvent) => true,
    ...toastImplPrivateProps.emits,
  },
}

const toastImpl = defineComponent({
  name: TOAST_NAME,
  components: {
    OkuToastAnnounce,
    OkuDismissableLayer,
  },
  inheritAttrs: false,
  props: {
    ...toastImplProps.props,
    ...scopedToastProps,
    ...primitiveProps,
  },
  emits: toastImplProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      type,
      duration: durationProp,
      open,
      ...toastProps
    } = toRefs(props)
    const _reactive = reactive(toastProps)
    const reactiveReactiveProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useToastProviderInject(TOAST_NAME, props.scopeOkuToast)

    const node = ref<ToastImplElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, node)

    const pointerStartRef = ref<{ x: number; y: number } | null>(null)
    const swipeDeltaRef = ref<{ x: number; y: number } | null>(null)
    const duration = computed(() => durationProp.value || inject.duration.value)
    const closeTimerStartTimeRef = ref(0)
    const closeTimerRemainingTimeRef = ref(duration.value)
    const closeTimerRef = ref(0)

    const { onToastAdd, onToastRemove } = inject

    const handleClose = () => {
      // focus viewport if focus is within toast to read the remaining toast
      // count to SR users and ensure focus isn't lost
      const isFocusInToast = node.value?.contains(document.activeElement)
      if (isFocusInToast)
        inject.viewport?.value?.focus()
      emit('close')
    }

    const startTimer = (duration: number) => {
      if (!duration || duration === Number.POSITIVE_INFINITY)
        return
      window.clearTimeout(closeTimerRef.value)
      closeTimerStartTimeRef.value = new Date().getTime()
      closeTimerRef.value = window.setTimeout(handleClose, duration)
    }

    watchEffect((onInvalidate) => {
      if (!isClient)
        return

      const viewport = inject.viewport.value
      if (viewport) {
        const handleResume = () => {
          startTimer(closeTimerRemainingTimeRef.value)

          emit('resume')
        }
        const handlePause = () => {
          const elapsedTime = new Date().getTime() - closeTimerStartTimeRef.value
          closeTimerRemainingTimeRef.value = closeTimerRemainingTimeRef.value - elapsedTime
          window.clearTimeout(closeTimerRef.value)

          emit('pause')
        }
        viewport.addEventListener(VIEWPORT_PAUSE, handlePause)
        viewport.addEventListener(VIEWPORT_RESUME, handleResume)

        onInvalidate(() => {
          viewport.removeEventListener(VIEWPORT_PAUSE, handlePause)
          viewport.removeEventListener(VIEWPORT_RESUME, handleResume)
        })
      }
    })

    // start timer when toast opens or duration changes.
    // we include `open` in deps because closed !== unmounted when animating
    // so it could reopen before being completely unmounted
    watchEffect(() => {
      if (!isClient)
        return

      if (open.value && !inject.isClosePausedRef.value)
        startTimer(duration.value)
    })

    watchEffect(async (onInvalidate) => {
      await nextTick()

      onToastAdd()

      onInvalidate(() => onToastRemove())
    })

    const announceTextContent = computed(() => {
      return node.value ? getAnnounceTextContent(node.value) : null
    })

    toastInteractiveProvider({
      scope: props.scopeOkuToast,
      onClose: () => handleClose(),
    })

    return () => {
      if (type.value && !['foreground', 'background'].includes(type.value))
        throw new Error(`Invalid prop \`type\` supplied to \`${TOAST_NAME}\`. Expected \`foreground | background\`.`)

      if (!inject.viewport.value)
        return null

      return h(Fragment, [
        announceTextContent.value
        && h(OkuToastAnnounce, {
          'scope': props.scopeOkuToast,
          // Toasts are always role=status to avoid stuttering issues with role=alert in SRs.
          'role': 'status',
          'aria-live': computed(() => type.value === 'foreground' ? 'assertive' : 'polite').value,
          'aria-atomic': true,
        }, {
          default: () => announceTextContent.value,
        }),

        h(Teleport, { to: inject.viewport.value }, h(CollectionItemSlot, { scope: props.scopeOkuToast }, {
          default: () => h(OkuDismissableLayer, {
            asChild: true,
            onEscapeKeydown: composeEventHandlers<ToastImplEmits['escapeKeydown'][0]>((event) => {
              emit('escapeKeydown', event)
            }, () => {
              if (!inject.isFocusedToastEscapeKeyDownRef.value)
                handleClose()
              inject.isFocusedToastEscapeKeyDownRef.value = false
            }),
          }, {
            default: () => h(Primitive.li, {
              // Ensure toasts are announced as status list or status when focused
              'role': 'status',
              'aria-live': 'off',
              'aria-atomic': true,
              'tabIndex': 0,
              'data-state': open.value ? 'open' : 'closed',
              'data-swipe-direction': inject.swipeDirection.value,
              ...mergeProps(attrs, reactiveReactiveProps),
              'ref': composedRefs,
              'style': {
                userSelect: 'none',
                touchAction: 'none',
                ...attrs.style as any,
              },
              'onKeydown': composeEventHandlers<ToastImplEmits['keydown'][0]>((event) => {
                emit('keydown', event)
              }, (event) => {
                if (event.key !== 'Escape')
                  return
                emit('escapeKeydown', event)
                if (!event.defaultPrevented) {
                  inject.isFocusedToastEscapeKeyDownRef.value = true
                  handleClose()
                }
              }),
              'onPointerdown': composeEventHandlers<ToastImplEmits['pointerdown'][0]>((event) => {
                emit('pointerdown', event)
              }, (event) => {
                if (event.button !== 0)
                  return
                pointerStartRef.value = { x: event.clientX, y: event.clientY }
              }),
              'onPointermove': composeEventHandlers<ToastImplEmits['pointermove'][0]>((event) => {
                emit('pointermove', event)
              }, (event) => {
                if (!pointerStartRef.value)
                  return
                const x = event.clientX - pointerStartRef.value.x
                const y = event.clientY - pointerStartRef.value.y
                const hasSwipeMoveStarted = Boolean(swipeDeltaRef.value)
                const isHorizontalSwipe = ['left', 'right'].includes(inject.swipeDirection.value)
                const clamp = ['left', 'up'].includes(inject.swipeDirection.value) ? Math.min : Math.max
                const clampedX = isHorizontalSwipe ? clamp(0, x) : 0
                const clampedY = !isHorizontalSwipe ? clamp(0, y) : 0
                const moveStartBuffer = event.pointerType === 'touch' ? 10 : 2
                const delta = { x: clampedX, y: clampedY }
                const eventDetail = { originalEvent: event, delta }
                if (hasSwipeMoveStarted) {
                  swipeDeltaRef.value = delta
                  handleAndDispatchCustomEvent(TOAST_SWIPE_MOVE, (event) => {
                    emit('swipeMove', event as SwipeEvent)
                  }, eventDetail, {
                    discrete: false,
                  })
                }
                else if (isDeltaInDirection(delta, inject.swipeDirection.value, moveStartBuffer)) {
                  swipeDeltaRef.value = delta
                  handleAndDispatchCustomEvent(TOAST_SWIPE_START, (event) => {
                    emit('swipeStart', event as SwipeEvent)
                  }, eventDetail, {
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
              'onPointerup': composeEventHandlers<ToastImplEmits['pointerup'][0]>((event) => {
                emit('pointerup', event)
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
                  if (isDeltaInDirection(delta, inject.swipeDirection.value, inject.swipeThreshold.value)) {
                    handleAndDispatchCustomEvent(TOAST_SWIPE_END, (event) => {
                      emit('swipeEnd', event as SwipeEvent)
                    }, eventDetail, {
                      discrete: true,
                    })
                  }
                  else {
                    handleAndDispatchCustomEvent(TOAST_SWIPE_CANCEL, (event) => {
                      emit('swipeCancel', event as SwipeEvent)
                    }, eventDetail, {
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
            }, {
              default: () => slots.default?.(),
            }),
          }),
        })),
      ])
    }
  },
})

export const OkuToastImpl = toastImpl as typeof toastImpl &
(new () => { $props: ToastImplNaviteElement })
