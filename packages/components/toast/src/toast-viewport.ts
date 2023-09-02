import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { PropType } from 'vue'
import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { OkuDismissableLayerBranch } from '@oku-ui/dismissable-layer'
import { CollectionSlot, useCollection, useToastProviderInject } from './share'
import { focusFirst, getTabbableCandidates } from './utils'
import { scopedToastProps } from './types'
import { OkuToastFocusProxy } from './toast-focus-proxy'
import type { FocusProxyElement } from './toast-focus-proxy'

/* -------------------------------------------------------------------------------------------------
 * ToastViewport
 * ----------------------------------------------------------------------------------------------- */

const VIEWPORT_NAME = 'OkuToastViewport'

export const VIEWPORT_DEFAULT_HOTKEY = ['F8']
export const VIEWPORT_PAUSE = 'toast.viewportPause'
export const VIEWPORT_RESUME = 'toast.viewportResume'

export type ToastViewportIntrinsicElement = ElementType<'ol'>
type ToastViewportElement = HTMLOListElement

export type PrimitiveOrderedListIntrinsicElement = ElementType<'ol'>
export type PrimitiveOrderedElement = HTMLOListElement

interface ToastViewportProps extends PrimitiveProps {
  /**
   * The keys to use as the keyboard shortcut that will move focus to the toast viewport.
   * @defaultValue ['F8']
   */
  hotkey?: string[]
  /**
   * An author-localized label for the toast viewport to provide inject for screen reader users
   * when navigating page landmarks. The available `{hotkey}` placeholder will be replaced for you.
   * @defaultValue 'Notifications ({hotkey})'
   */
  label?: string
}

const toastViewportProps = {
  props: {
    hotkey: {
      type: Array as PropType<string[]>,
      default: VIEWPORT_DEFAULT_HOTKEY,
    },
    label: {
      type: String,
      default: 'Notifications ({hotkey})',
    },
  },
}

const toastViewport = defineComponent({
  name: VIEWPORT_NAME,
  components: {
    OkuDismissableLayerBranch,
  },
  inheritAttrs: false,
  props: {
    ...scopedToastProps,
    ...primitiveProps,
    ...toastViewportProps.props,
  },
  setup(props, { attrs, slots }) {
    const { ...toastViewportAttrs } = attrs as ToastViewportIntrinsicElement

    const {
      hotkey,
      label,
    } = toRefs(props)

    const forwardedRef = useForwardRef()

    const inject = useToastProviderInject(VIEWPORT_NAME, props.scopeOkuToast)
    const getItems = useCollection(props.scopeOkuToast)
    const wrapperRef = ref<HTMLDivElement | null>(null)
    const headFocusProxyRef = ref<FocusProxyElement | null>(null)
    const tailFocusProxyRef = ref<FocusProxyElement | null>(null)
    const viewportRef = ref<ToastViewportElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, viewportRef, (el) => {
      inject.onViewportChange(el as HTMLOListElement)
    })

    const hotkeyLabel = hotkey.value.join('+').replace(/Key/g, '').replace(/Digit/g, '')
    const hasToasts = computed(() => inject.toastCount.value > 0)

    watchEffect((onInvalidate) => {
      const handleKeyDown = (event: KeyboardEvent) => {
        // we use `event.code` as it is consistent regardless of meta keys that were pressed.
        // for example, `event.key` for `Control+Alt+t` is `†` and `t !== †`
        const isHotkeyPressed = hotkey.value.every(key => (event as any)[key] || event.code === key)
        if (isHotkeyPressed)
          viewportRef.value?.focus()
      }
      document.addEventListener('keydown', handleKeyDown)
      onInvalidate(() => {
        document.removeEventListener('keydown', handleKeyDown)
      })
    })

    watchEffect((onInvalidate) => {
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
            const index = sortedCandidates.findIndex((candidate: Element | null) => candidate === focusedElement)
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
        onInvalidate(() => viewport?.removeEventListener('keydown', handleKeyDown))
      }
    })

    return () =>
      h(
        OkuDismissableLayerBranch,
        {
          'ref': wrapperRef,
          'role': 'region',
          'aria-label': label.value.replace('{hotkey}', hotkeyLabel),
          // Ensure virtual cursor from landmarks menus triggers focus/blur for pause/resume
          'tabindex': -1,
          // incase list has size when empty (e.g. padding), we remove pointer events so
          // it doesn't prevent interactions with page elements that it overlays
          'style': { pointerEvents: hasToasts.value ? undefined : 'none' } as CSSStyleDeclaration,
        },
        {
          default: () => [
            hasToasts.value && h(OkuToastFocusProxy, {
              ref: headFocusProxyRef,
              onFocusFromOutsideViewport: () => {
                const tabbableCandidates = getSortedTabbableCandidates({ tabbingDirection: 'forwards' })
                focusFirst(tabbableCandidates)
              },
            },
            ),
            /**
             * tabindex on the the list so that it can be focused when items are removed. we focus
             * the list instead of the viewport so it announces number of items remaining.
             */
            h(CollectionSlot,
              { scope: props.scopeOkuToast },
              {
                default: () => h(Primitive.ol,
                  {
                    tabindex: -1,
                    ...toastViewportAttrs,
                    asChild: props.asChild,
                    ref: composedRefs,
                  }, {
                    default: () => slots.default?.(),
                  },
                ),
              },
            ),

            hasToasts.value && h(OkuToastFocusProxy,
              {
                ref: tailFocusProxyRef,
                onFocusFromOutsideViewport: () => {
                  const tabbableCandidates = getSortedTabbableCandidates({
                    tabbingDirection: 'backwards',
                  })
                  focusFirst(tabbableCandidates)
                },
              },
            ),
          ],
        },
      )
  },
})

export const OkuToastViewport = toastViewport as typeof toastViewport &
(new () => { $props: Partial<ToastViewportElement> })

export type { ToastViewportElement, ToastViewportProps }
