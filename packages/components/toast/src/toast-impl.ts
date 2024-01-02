import { Fragment, Teleport, computed, defineComponent, h, mergeProps, nextTick, reactive, ref, toRefs, watchEffect } from 'vue'
import { isClient, reactiveOmit, useComposedRefs, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { OkuDismissableLayer } from '@oku-ui/dismissable-layer'
import { composeEventHandlers } from '@oku-ui/utils'
import { getAnnounceTextContent, handleAndDispatchCustomEvent, isDeltaInDirection } from './utils'
import { OkuToastAnnounce } from './toast-announce'
import { CollectionItemSlot, TOAST_IMPL_NAME, TOAST_NAME, TOAST_SWIPE_CANCEL, TOAST_SWIPE_END, TOAST_SWIPE_MOVE, TOAST_SWIPE_START, VIEWPORT_PAUSE, VIEWPORT_RESUME, scopeToastProps, toastImplProps, toastInteractiveProvider, useToastProviderInject } from './props'
import type { SwipeEvent, ToastImplElement, ToastImplEmits, ToastImplNativeElement } from './props'

const toastImpl = defineComponent({
  name: TOAST_IMPL_NAME,
  components: {
    OkuToastAnnounce,
    OkuDismissableLayer,
  },
  inheritAttrs: false,
  props: {
    ...toastImplProps.props,
    ...scopeToastProps,
  },
  emits: toastImplProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuToast,
      type,
      duration: durationProp,
      open,
      ...toastProps
    } = toRefs(props)

    const _reactive = reactive(toastProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const inject = useToastProviderInject(TOAST_NAME, scopeOkuToast.value)
    const node = ref<ToastImplElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, node)
    const pointerStartRef = ref<{ x: number, y: number } | null>(null)
    const swipeDeltaRef = ref<{ x: number, y: number } | null>(null)
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
      await nextTick(() => onToastAdd())

      onInvalidate(() => onToastRemove())
    })

    const announceTextContent = computed(() => {
      return node.value ? getAnnounceTextContent(node.value) : null
    })

    toastInteractiveProvider({
      scope: scopeOkuToast.value,
      onClose: () => handleClose(),
    })

    // if (type.value && !['foreground', 'background'].includes(type.value))
    //   throw new Error(`Invalid prop \`type\` supplied to \`${TOAST_NAME}\`. Expected \`foreground | background\`.`)

    return () => {
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
        }, () => announceTextContent.value),

        h(Teleport, {
          to: inject.viewport.value,
        }, h(CollectionItemSlot, {
          scope: props.scopeOkuToast,
        }, () => h(OkuDismissableLayer, {
          asChild: true,
          onEscapeKeydown: composeEventHandlers<ToastImplEmits['escapeKeydown'][0]>((event) => {
            emit('escapeKeydown', event)
          }, () => {
            if (!inject.isFocusedToastEscapeKeyDownRef.value)
              handleClose()
            inject.isFocusedToastEscapeKeyDownRef.value = false
          }),
        }, () => h(Primitive.li, {
          // Ensure toasts are announced as status list or status when focused
          'role': 'status',
          'aria-live': 'off',
          'aria-atomic': true,
          'tabIndex': 0,
          'data-state': open.value ? 'open' : 'closed',
          'data-swipe-direction': inject.swipeDirection.value,
          ...mergeProps(attrs, otherProps, emits),
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
              handleAndDispatchCustomEvent(TOAST_SWIPE_MOVE, (event: SwipeEvent) => emit('swipeMove', event), eventDetail, {
                discrete: false,
              })
            }
            else if (isDeltaInDirection(delta, inject.swipeDirection.value, moveStartBuffer)) {
              swipeDeltaRef.value = delta
              handleAndDispatchCustomEvent(TOAST_SWIPE_START, (event: SwipeEvent) => emit('swipeStart', event), eventDetail, {
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
                handleAndDispatchCustomEvent(TOAST_SWIPE_END, (event: SwipeEvent) => emit('swipeEnd', event), eventDetail, {
                  discrete: true,
                })
              }
              else {
                handleAndDispatchCustomEvent(
                  TOAST_SWIPE_CANCEL,
                  (event: SwipeEvent) => emit('swipeCancel', event),
                  eventDetail,
                  {
                    discrete: true,
                  },
                )
              }
              // Prevent click event from triggering on items within the toast when
              // pointer up is part of a swipe gesture
              toast?.addEventListener('click', event => event.preventDefault(), {
                once: true,
              })
            }
          }),
        }, () => slots.default?.())))),
      ])
    }
  },
})

export const OkuToastImpl = toastImpl as typeof toastImpl & (new () => { $props: ToastImplNativeElement })
