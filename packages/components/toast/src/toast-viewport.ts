/* eslint-disable unused-imports/no-unused-vars */
/* -------------------------------------------------------------------------------------------------
 * ToastViewport
 * ----------------------------------------------------------------------------------------------- */

import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { toValue } from '@oku-ui/utils'
import type { PropType } from 'vue'
import { computed, defineComponent, ref, toRefs, watchEffect } from 'vue'
import type { Scope } from '@oku-ui/provide'
import { PROVIDER_NAME, useCollection, useToastProviderContext } from './toast-provider'
import { focusFirst } from './utils'

const VIEWPORT_NAME = 'ToastViewport'
const VIEWPORT_DEFAULT_HOTKEY = ['F8']
const VIEWPORT_PAUSE = 'toast.viewportPause'
const VIEWPORT_RESUME = 'toast.viewportResume'

export type ToastViewportElement = ElementType<'ol'>
// type PrimitiveOrderedListProps = ComponentPropsWithoutRef<typeof Primitive.ol>
// interface ToastViewportProps extends PrimitiveOrderedListProps {
interface ToastViewportProps extends IPrimitiveProps {
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

// const ToastViewport = React.forwardRef<ToastViewportElement, ToastViewportProps>((props: ScopedProps<ToastViewportProps>, forwardedRef) => {

const ToastViewport = defineComponent({
  name: VIEWPORT_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    scopeToast: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
    hotkey: {
      type: [] as PropType<string[]>,
      default: VIEWPORT_DEFAULT_HOTKEY,
      // validator: value => value.every(item => typeof item === 'string'),
    },
    label: {
      type: String,
      default: 'Notifications ({hotkey})',
    },
  },
  setup(props, { attrs, slots }) {
    // const { ...viewportProps } = attrs as ToastElement

    const {
      scopeToast,
      hotkey = VIEWPORT_DEFAULT_HOTKEY,
      label = 'Notifications ({hotkey})',
      // ...viewportProps
    } = toRefs(props)

    const forwardedRef = useForwardRef()

    const context = useToastProviderContext(PROVIDER_NAME, scopeToast.value)
    const getItems = useCollection(scopeToast.value)
    const wrapperRef = ref<HTMLDivElement | null>(null)
    const headFocusProxyRef = ref<FocusProxyElement | null>(null)
    const tailFocusProxyRef = ref<FocusProxyElement | null>(null)
    const viewportRef = ref<ToastViewportElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, viewportRef.value, context.value.onViewportChange)
    const hotkeyLabel = toValue(hotkey).join('+').replace(/Key/g, '').replace(/Digit/g, '')
    const hasToasts = context.value.toastCount > 0

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
          if (!context.value.isClosePausedRef.value) {
            const pauseEvent = new CustomEvent(VIEWPORT_PAUSE)
            viewport.dispatchEvent(pauseEvent)
            context.value.isClosePausedRef.value = true
          }
        }

        const handleResume = () => {
          if (context.value.isClosePausedRef.value) {
            const resumeEvent = new CustomEvent(VIEWPORT_RESUME)
            viewport.dispatchEvent(resumeEvent)
            context.value.isClosePausedRef.value = false
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

    // const getSortedTabbableCandidates = React.useCallback(
    //   ({ tabbingDirection }: { tabbingDirection: 'forwards' | 'backwards' }) => {
    //     const toastItems = getItems()
    //     const tabbableCandidates = toastItems.map((toastItem) => {
    //       const toastNode = toastItem.viewportRef.value!
    //       const toastTabbableCandidates = [toastNode, ...getTabbableCandidates(toastNode)]
    //       return tabbingDirection === 'forwards'
    //         ? toastTabbableCandidates
    //         : toastTabbableCandidates.reverse()
    //     })
    //     return (
    //       tabbingDirection === 'forwards' ? tabbableCandidates.reverse() : tabbableCandidates
    //     ).flat()
    //   },
    //   [getItems],
    // )

    const getSortedTabbableCandidates = computed(({ tabbingDirection }: { tabbingDirection: 'forwards' | 'backwards' }) => {
      const toastItems = getItems()
      const tabbableCandidates = toastItems.map((toastItem: typeof viewportRef) => {
        const toastNode = toastItem.value!
        const toastTabbableCandidates = [toastNode, ...getSortedTabbableCandidates.value(toastNode)]
        return tabbingDirection === 'forwards'
          ? toastTabbableCandidates
          : toastTabbableCandidates.reverse()
      })
      return (
        tabbingDirection === 'forwards'
          ? tabbableCandidates.reverse()
          : tabbableCandidates
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
        viewport.addEventListener('keydown', handleKeyDown)
        onInvalidate(() => viewport.removeEventListener('keydown', handleKeyDown))
      }
    })

    // const originalReturn = () =>

    // return (
    //   <DismissableLayer.Branch
    //     ref={wrapperRef}
    //     role="region"
    //     aria-label={label.replace('{hotkey}', hotkeyLabel)}
    //     // Ensure virtual cursor from landmarks menus triggers focus/blur for pause/resume
    //     tabIndex={-1}
    //     // incase list has size when empty (e.g. padding), we remove pointer events so
    //     // it doesn't prevent interactions with page elements that it overlays
    //     style={{ pointerEvents: hasToasts ? undefined : 'none' }}
    //   >
    //     {hasToasts && (
    //       <FocusProxy
    //         ref={headFocusProxyRef}
    //         onFocusFromOutsideViewport={() => {
    //           const tabbableCandidates = getSortedTabbableCandidates({
    //             tabbingDirection: 'forwards',
    //           });
    //           focusFirst(tabbableCandidates);
    //         }}
    //       />
    //     )}
    //     {/**
    //      * tabindex on the the list so that it can be focused when items are removed. we focus
    //      * the list instead of the viewport so it announces number of items remaining.
    //      */}
    //     <Collection.Slot scope={__scopeToast}>
    //       <Primitive.ol tabIndex={-1} {...viewportProps} ref={composedRefs} />
    //     </Collection.Slot>
    //     {hasToasts && (
    //       <FocusProxy
    //         ref={tailFocusProxyRef}
    //         onFocusFromOutsideViewport={() => {
    //           const tabbableCandidates = getSortedTabbableCandidates({
    //             tabbingDirection: 'backwards',
    //           });
    //           focusFirst(tabbableCandidates);
    //         }}
    //       />
    //     )}
    //   </DismissableLayer.Branch>
    // );

    // return originalReturn
  },
})

type _ToastViewport = MergeProps<ToastViewportProps, ToastViewportElement>
type InstanceToastViewportType = InstanceTypeRef<typeof ToastViewport, _ToastViewportEl>

const OkuToastViewport = ToastViewport as typeof ToastViewport & (new () => { $props: _ToastViewport })

// export { OkuToastViewport, useToastViewportContext, createToastScope, createToastContext, useCollection }

export type { ToastViewportProps, InstanceToastViewportType }
