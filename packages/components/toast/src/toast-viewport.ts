import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType } from '@oku-ui/primitive'
import { useCallbackRef, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { toValue } from '@oku-ui/utils'
import type { PropType } from 'vue'
import { defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import type { Scope } from '@oku-ui/provide'
import { OkuDismissableLayerBranch } from '@oku-ui/dismissable-layer'
import { CollectionSlot, PROVIDER_NAME, useCollection, useToastProviderContext } from './toast-provider'
import { focusFirst } from './utils'
import { scopedProps } from './types'
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

type PrimitiveOrderedListProps = HTMLOListElement
interface ToastViewportProps extends PrimitiveOrderedListProps {
  scopeToast?: Scope
  /**
   * The keys to use as the keyboard shortcut that will move focus to the toast viewport.
   * @defaultValue ['F8']
   */
  hotkey?: string[]
  /**
   * An author-localized label for the toast viewport to provide context for screen reader users
   * when navigating page landmarks. The available `{hotkey}` placeholder will be replaced for you.
   * @defaultValue 'Notifications ({hotkey})'
   */
  label?: string
}

const toastViewportProps = {
  hotkey: {
    type: Array as PropType<string[]>,
    default: VIEWPORT_DEFAULT_HOTKEY,
  },
  label: {
    type: String,
    default: 'Notifications ({hotkey})',
  },
}

const toastViewport = defineComponent({
  name: VIEWPORT_NAME,
  components: {
    OkuDismissableLayerBranch,
  },
  inheritAttrs: false,
  props: {
    ...toastViewportProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...toastViewportAttrs } = attrs as ToastViewportIntrinsicElement

    const {
      hotkey,
      label,
    } = toRefs(props)

    const forwardedRef = useForwardRef()

    const context = useToastProviderContext(PROVIDER_NAME, props.scopeOkuToast)
    const getItems = useCollection(props.scopeOkuToast)
    const wrapperRef = ref<HTMLDivElement | null>(null)
    const headFocusProxyRef = ref<FocusProxyElement | null>(null)
    const tailFocusProxyRef = ref<FocusProxyElement | null>(null)
    const viewportRef = ref<ToastViewportElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, viewportRef, context.onViewportChange)
    const hotkeyLabel = toValue(hotkey).join('+').replace(/Key/g, '').replace(/Digit/g, '')
    const hasToasts = context.toastCount.value > 0

    watchEffect((onInvalidate) => {
      const handleKeyDown = (event: KeyboardEvent) => {
        // we use `event.code` as it is consistent regardless of meta keys that were pressed.
        // for example, `event.key` for `Control+Alt+t` is `†` and `t !== †`
        const isHotkeyPressed = toValue(hotkey).every(key => (event as any)[key] || event.code === key)
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
      if (hasToasts && wrapper && viewport) {
        const handlePause = () => {
          if (!context.isClosePausedRef.value) {
            const pauseEvent = new CustomEvent(VIEWPORT_PAUSE)
            viewport.dispatchEvent(pauseEvent)
            context.isClosePausedRef.value = true
          }
        }

        const handleResume = () => {
          if (context.isClosePausedRef.value) {
            const resumeEvent = new CustomEvent(VIEWPORT_RESUME)
            viewport.dispatchEvent(resumeEvent)
            context.isClosePausedRef.value = false
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

    const getSortedTabbableCandidates: any = useCallbackRef(({ tabbingDirection }: { tabbingDirection: 'forwards' | 'backwards' }) => {
      const toastItems = getItems.value
      const tabbableCandidates = toastItems.map((toastItem: typeof viewportRef) => {
        const toastNode = toastItem.value!
        const toastTabbableCandidates = [toastNode, ...getSortedTabbableCandidates.value(toastNode)]
        return tabbingDirection === 'forwards' ? toastTabbableCandidates : toastTabbableCandidates.reverse()
      })
      return (
        tabbingDirection === 'forwards' ? tabbableCandidates.reverse() : tabbableCandidates
      ).flat()
    })

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
            const sortedCandidates = getSortedTabbableCandidates.value({ tabbingDirection })
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

    const originalReturn = () =>
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
          'style': { pointerEvents: hasToasts ? undefined : 'none' },
        },
        [
          hasToasts && h(
            OkuToastFocusProxy,
            {
              ref: headFocusProxyRef,
              onFocusFromOutsideViewport: () => {
                const tabbableCandidates = getSortedTabbableCandidates.value({ tabbingDirection: 'forwards' })
                focusFirst(tabbableCandidates)
              },
            },
          ),
          /**
           * tabindex on the the list so that it can be focused when items are removed. we focus
           * the list instead of the viewport so it announces number of items remaining.
           */
          h(
            CollectionSlot,
            { cope: props.scopeOkuToast },
            [
              h(Primitive.ol,
                {
                  tabindex: -1,
                  ...toastViewportAttrs,
                  ref: composedRefs,
                },
              ),
            ],
          ),

          hasToasts && h(
            OkuToastFocusProxy,
            {
              ref: tailFocusProxyRef,
              onFocusFromOutsideViewport: () => {
                const tabbableCandidates = getSortedTabbableCandidates.value({ tabbingDirection: 'backwards' })
                focusFirst(tabbableCandidates)
              },
            },
          ),
        ],
      )

    return originalReturn
  },
})

export const OkuToastViewport = toastViewport as typeof toastViewport &
(new () => { $props: Partial<ToastViewportElement> })

export type { ToastViewportElement, ToastViewportProps }
