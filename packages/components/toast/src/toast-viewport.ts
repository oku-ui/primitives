import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { isClient, reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { OkuDismissableLayerBranch } from '@oku-ui/dismissable-layer'
import { focusFirst, getTabbableCandidates } from './utils'
import { OkuToastFocusProxy } from './toast-focus-proxy'
import { CollectionSlot, TOAST_VIEWPORT_NAME, VIEWPORT_PAUSE, VIEWPORT_RESUME, scopeToastProps, toastViewportProps, useCollection, useToastProviderInject } from './props'
import type { FocusProxyElement, ToastViewportElement, ToastViewportNativeElement } from './props'

const toastViewport = defineComponent({
  name: TOAST_VIEWPORT_NAME,
  components: {
    OkuDismissableLayerBranch,
  },
  inheritAttrs: false,
  props: {
    ...toastViewportProps.props,
    ...scopeToastProps,
  },
  emits: toastViewportProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuToast,
      hotkey,
      label,
      ...viewportProps
    } = toRefs(props)

    const _reactive = reactive(viewportProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useToastProviderInject(TOAST_VIEWPORT_NAME, scopeOkuToast.value)
    const getItems = useCollection(scopeOkuToast.value)
    const wrapperRef = ref<HTMLDivElement | null>(null)
    const headFocusProxyRef = ref<FocusProxyElement | null>(null)
    const tailFocusProxyRef = ref<FocusProxyElement | null>(null)
    const viewportRef = ref<ToastViewportElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, viewportRef, el => inject.onViewportChange(el as ToastViewportElement))
    const hotkeyLabel = hotkey.value.join('+').replace(/Key/g, '').replace(/Digit/g, '')
    const hasToasts = computed(() => inject.toastCount.value > 0)

    watchEffect((onInvalidate) => {
      if (!isClient)
        return

      const handleKeyDown = (event: KeyboardEvent) => {
        // we use `event.code` as it is consistent regardless of meta keys that were pressed.
        // for example, `event.key` for `Control+Alt+t` is `†` and `t !== †`
        const isHotkeyPressed = hotkey.value.every(key => (event as any)[key] || event.code === key)
        if (isHotkeyPressed)
          viewportRef.value?.focus()
      }
      document.addEventListener('keydown', handleKeyDown)

      onInvalidate(() => document.removeEventListener('keydown', handleKeyDown))
    })

    watchEffect((onInvalidate) => {
      if (!isClient)
        return

      const wrapper = wrapperRef.value
      const viewport = viewportRef.value
      if (hasToasts.value && wrapper && viewport) {
        const handlePause = () => {
          if (!inject.isClosePausedRef.value) {
            const pauseEvent = new CustomEvent(VIEWPORT_PAUSE)
            viewport.dispatchEvent(pauseEvent)
            inject.isClosePausedRef.value = true
          }
        }

        const handleResume = () => {
          if (inject.isClosePausedRef.value) {
            const resumeEvent = new CustomEvent(VIEWPORT_RESUME)
            viewport.dispatchEvent(resumeEvent)
            inject.isClosePausedRef.value = false
          }
        }

        const handleFocusOutResume = (event: FocusEvent) => {
          const isFocusMovingOutside = !wrapper.contains(event.relatedTarget as HTMLElement)
          if (isFocusMovingOutside)
            handleResume()
        }

        const handlePointerLeaveResume = () => {
          const isFocusInside = wrapper.contains(document.activeElement)
          if (!isFocusInside)
            handleResume()
        }

        // Toasts are not in the viewport React tree so we need to bind DOM events
        wrapper.addEventListener('focusin', handlePause)
        wrapper.addEventListener('focusout', handleFocusOutResume)
        wrapper.addEventListener('pointermove', handlePause)
        wrapper.addEventListener('pointerleave', handlePointerLeaveResume)
        window.addEventListener('blur', handlePause)
        window.addEventListener('focus', handleResume)

        onInvalidate(() => {
          wrapper.removeEventListener('focusin', handlePause)
          wrapper.removeEventListener('focusout', handleFocusOutResume)
          wrapper.removeEventListener('pointermove', handlePause)
          wrapper.removeEventListener('pointerleave', handlePointerLeaveResume)
          window.removeEventListener('blur', handlePause)
          window.removeEventListener('focus', handleResume)
        })
      }
    })

    const getSortedTabbableCandidates = ({ tabbingDirection }: { tabbingDirection: 'forwards' | 'backwards' }) => {
      const toastItems = getItems()
      const tabbableCandidates = toastItems.map((toastItem) => {
        const toastNode = toastItem.ref.value
        const toastTabbableCandidates = [toastNode, ...getTabbableCandidates(toastNode)]
        return tabbingDirection === 'forwards'
          ? toastTabbableCandidates
          : toastTabbableCandidates.reverse()
      })
      return (
        tabbingDirection === 'forwards' ? tabbableCandidates.reverse() : tabbableCandidates
      ).flat()
    }

    watchEffect((onInvalidate) => {
      if (!isClient)
        return

      const viewport = viewportRef.value
      // We programmatically manage tabbing as we are unable to influence
      // the source order with portals, this allows us to reverse the
      // tab order so that it runs from most recent toast to least
      if (viewport) {
        const handleKeyDown = (event: KeyboardEvent) => {
          const isMetaKey = event.altKey || event.ctrlKey || event.metaKey
          const isTabKey = event.key === 'Tab' && !isMetaKey

          if (isTabKey) {
            const focusedElement = document.activeElement
            const isTabbingBackwards = event.shiftKey
            const targetIsViewport = event.target === viewport

            // If we're back tabbing after jumping to the viewport then we simply
            // proxy focus out to the preceding document
            if (targetIsViewport && isTabbingBackwards) {
              headFocusProxyRef.value?.focus()
              return
            }

            const tabbingDirection = isTabbingBackwards ? 'backwards' : 'forwards'
            const sortedCandidates = getSortedTabbableCandidates({ tabbingDirection })
            const index = sortedCandidates.findIndex(candidate => candidate === focusedElement)
            if (focusFirst(sortedCandidates.slice(index + 1))) {
              event.preventDefault()
            }
            else {
              // If we can't focus that means we're at the edges so we
              // proxy to the corresponding exit point and let the browser handle
              // tab/shift+tab keypress and implicitly pass focus to the next valid element in the document
              isTabbingBackwards
                ? headFocusProxyRef.value?.focus()
                : tailFocusProxyRef.value?.focus()
            }
          }
        }

        // Toasts are not in the viewport React tree so we need to bind DOM events
        viewport?.addEventListener('keydown', handleKeyDown)

        onInvalidate(() => viewport.removeEventListener('keydown', handleKeyDown))
      }
    })

    return () => h(OkuDismissableLayerBranch, {
      'ref': wrapperRef,
      'role': 'region',
      'aria-label': label.value.replace('{hotkey}', hotkeyLabel),
      // Ensure virtual cursor from landmarks menus triggers focus/blur for pause/resume
      'tabIndex': -1,
      // incase list has size when empty (e.g. padding), we remove pointer events so
      // it doesn't prevent interactions with page elements that it overlays
      'style': { pointerEvents: hasToasts.value ? undefined : 'none' },
    }, () => [
      hasToasts.value && h(OkuToastFocusProxy, {
        ref: headFocusProxyRef,
        onFocusFromOutsideViewport: () => {
          const tabbableCandidates = getSortedTabbableCandidates({ tabbingDirection: 'forwards' })
          focusFirst(tabbableCandidates)
        },
      }),
      /**
       * tabindex on the the list so that it can be focused when items are removed. we focus
       * the list instead of the viewport so it announces number of items remaining.
       */
      h(CollectionSlot, {
        scope: scopeOkuToast.value,
      }, () => h(Primitive.ol, {
        tabIndex: -1,
        ...mergeProps(attrs, otherProps),
        ref: composedRefs,
      }, () => slots.default?.())),

      hasToasts.value && h(OkuToastFocusProxy, {
        ref: tailFocusProxyRef,
        onFocusFromOutsideViewport: () => {
          const tabbableCandidates = getSortedTabbableCandidates({
            tabbingDirection: 'backwards',
          })
          focusFirst(tabbableCandidates)
        },
      }),
    ])
  },
})

export const OkuToastViewport = toastViewport as typeof toastViewport & (new () => { $props: ToastViewportNativeElement })
