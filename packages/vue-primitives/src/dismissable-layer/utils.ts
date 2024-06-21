import { isClient } from '@vueuse/core'
import { type Ref, nextTick, ref, toValue, watchEffect } from 'vue'
import { dispatchDiscreteCustomEvent } from '../utils/dispatchDiscreteCustomEvent.ts'

export type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent
}>
export type FocusOutsideEvent = CustomEvent<{ originalEvent: FocusEvent }>

export const DISMISSABLE_LAYER_NAME = 'DismissableLayer'
export const CONTEXT_UPDATE = 'dismissableLayer.update'
export const POINTER_DOWN_OUTSIDE = 'dismissableLayer.pointerDownOutside'
export const FOCUS_OUTSIDE = 'dismissableLayer.focusOutside'

// function isLayerExist(layerElement: HTMLElement, targetElement: HTMLElement) {
//   const targetLayer = targetElement.closest(
//     '[data-dismissable-layer]',
//   ) as HTMLElement

//   const mainLayer = layerElement.dataset.dismissableLayer === ''
//     ? layerElement
//     : layerElement.querySelector(
//       '[data-dismissable-layer]',
//     ) as HTMLElement

//   const nodeList = Array.from(
//     layerElement.ownerDocument.querySelectorAll('[data-dismissable-layer]'),
//   )
//   if (
//     (targetLayer
//     && mainLayer === targetLayer)
//     || nodeList.indexOf(mainLayer) < nodeList.indexOf(targetLayer)
//   ) {
//     return true
//   }
//   else {
//     return false
//   }
// }

/**
 * Listens for `pointerdown` outside a DOM subtree. We use `pointerdown` rather than `pointerup`
 * to mimic layer dismissing behaviour present in OS.
 * Returns props to pass to the node we want to check for outside events.
 */
export function usePointerDownOutside(
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void,
  ownerDocumentRef?: Ref<Document | undefined>,
) {
  let isPointerInsideDOMTree = false
  let handleClickRef = () => {}

  watchEffect((onCleanup) => {
    if (!isClient)
      return

    const ownerDocument = toValue(ownerDocumentRef) || globalThis?.document

    const handlePointerDown = async (event: PointerEvent) => {
      if (event.target && !isPointerInsideDOMTree) {
        const eventDetail = { originalEvent: event }

        function handleAndDispatchPointerDownOutsideEvent() {
          handleAndDispatchCustomEvent(
            POINTER_DOWN_OUTSIDE,
            onPointerDownOutside,
            eventDetail,
            { discrete: true },
          )
        }

        /**
         * On touch devices, we need to wait for a click event because browsers implement
         * a ~350ms delay between the time the user stops touching the display and when the
         * browser executes events. We need to ensure we don't reactivate pointer-events within
         * this timeframe otherwise the browser may execute events that should have been prevented.
         *
         * Additionally, this also lets us deal automatically with cancellations when a click event
         * isn't raised because the page was considered scrolled/drag-scrolled, long-pressed, etc.
         *
         * This is why we also continuously remove the previous listener, because we cannot be
         * certain that it was raised, and therefore cleaned-up.
         */
        if (event.pointerType === 'touch') {
          ownerDocument.removeEventListener('click', handleClickRef)
          handleClickRef = handleAndDispatchPointerDownOutsideEvent
          ownerDocument.addEventListener('click', handleClickRef, { once: true })
        }
        else {
          handleAndDispatchPointerDownOutsideEvent()
        }
      }
      else {
        // We need to remove the event listener in case the outside click has been canceled.
        // See: https://github.com/radix-ui/primitives/issues/2171
        ownerDocument.removeEventListener('click', handleClickRef)
      }
      isPointerInsideDOMTree = false
    }
    /**
     * if this hook executes in a component that mounts via a `pointerdown` event, the event
     * would bubble up to the document and trigger a `pointerDownOutside` event. We avoid
     * this by delaying the event listener registration on the document.
     * This is how the DOM works, ie:
     * ```
     * button.addEventListener('pointerdown', () => {
     *   console.log('I will log');
     *   document.addEventListener('pointerdown', () => {
     *     console.log('I will also log');
     *   })
     * });
     */
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener('pointerdown', handlePointerDown)
    }, 0)

    onCleanup(() => {
      window.clearTimeout(timerId)
      ownerDocument.removeEventListener('pointerdown', handlePointerDown)
      ownerDocument.removeEventListener('click', handleClickRef)
    })
  })

  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => (isPointerInsideDOMTree = true),
  }
}

/**
 * Listens for when focus happens outside a DOM subtree.
 * Returns props to pass to the root (node) of the subtree we want to check.
 */
export function useFocusOutside(
  onFocusOutside?: (event: FocusOutsideEvent) => void,
  element?: Ref<HTMLElement | undefined>,
) {
  const ownerDocument: Document
    = element?.value?.ownerDocument ?? globalThis?.document

  const isFocusInsideDOMTree = ref(false)
  watchEffect((cleanupFn) => {
    if (!isClient)
      return
    const handleFocus = async (event: FocusEvent) => {
      if (!element?.value)
        return

      await nextTick()
      if (!element.value || isLayerExist(element.value, event.target as HTMLElement))
        return

      if (event.target && !isFocusInsideDOMTree.value) {
        const eventDetail = { originalEvent: event }
        handleAndDispatchCustomEvent(
          FOCUS_OUTSIDE,
          onFocusOutside,
          eventDetail,
        )
      }
    }

    ownerDocument.addEventListener('focusin', handleFocus)

    cleanupFn(() => ownerDocument.removeEventListener('focusin', handleFocus))
  })

  return {
    onFocusCapture: () => (isFocusInsideDOMTree.value = true),
    onBlurCapture: () => (isFocusInsideDOMTree.value = false),
  }
}

export function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE)
  document.dispatchEvent(event)
}

function handleAndDispatchCustomEvent<E extends CustomEvent, OriginalEvent extends Event>(
  name: string,
  handler: ((event: E) => void) | undefined,
  detail: { originalEvent: OriginalEvent } & (E extends CustomEvent<infer D> ? D : never),
  { discrete }: { discrete: boolean },
) {
  const currentTarget = detail.originalEvent.currentTarget as HTMLElement
  const event = new CustomEvent(name, { bubbles: true, cancelable: true, detail })

  if (handler)
    currentTarget.addEventListener(name, handler as EventListener, { once: true })

  if (discrete)
    dispatchDiscreteCustomEvent(currentTarget, event)
  else
    currentTarget.dispatchEvent(event)
}
