import type { Ref } from 'vue'
import type { FocusOutsideEvent, PointerdownOutsideEvent } from './props'
import { dispatchDiscreteCustomEvent } from '@oku-ui/primitive'
import { isClient } from '@oku-ui/use-composable'
import { nextTick, ref, watchEffect } from 'vue'
import { CONTEXT_UPDATE, FOCUS_OUTSIDE, POINTER_DOWN_OUTSIDE } from './props'

function isElementDescendantOf(layerElement: HTMLElement, targetElement: HTMLElement) {
  const findDismissableLayer = (element: HTMLElement) => element.closest('[data-dismissable-layer]')

  const findLayers = (element: HTMLElement) => {
    const layers = Array.from(element.ownerDocument.querySelectorAll('[data-dismissable-layer]'))
    const mainLayer = element.querySelector('[data-dismissable-layer]')
    return { layers, mainLayer }
  }

  const { layers, mainLayer } = findLayers(layerElement) as { layers: HTMLElement[], mainLayer: HTMLElement }
  const targetLayer = findDismissableLayer(targetElement) as HTMLElement

  return (targetLayer && mainLayer === targetLayer) || layers.indexOf(mainLayer) < layers.indexOf(targetLayer)
}

/**
 * Listens for `pointerdown` outside a subtree. We use `pointerdown` rather than `pointerup`
 * to mimic layer dismissing behaviour present in OS.
 * Returns props to pass to the node we want to check for outside events.
 */

export function usePointerdownOutside(
  onPointerDownOutside?: (event: PointerdownOutsideEvent) => void,
  element?: Ref<HTMLDivElement | null>,
) {
  const ownerDocument = element?.value?.ownerDocument ?? globalThis?.document
  const isPointerInsideReactTreeRef = ref(false)
  const handleClickRef = ref(() => { })

  watchEffect((onClean) => {
    if (!isClient)
      return

    const handlePointerDown = async (event: PointerEvent) => {
      if (!element?.value)
        return

      await nextTick()
      if (isElementDescendantOf(element.value, event.target as HTMLElement)) {
        isPointerInsideReactTreeRef.value = false
        return
      }

      if (event.target && !isPointerInsideReactTreeRef.value) {
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
         * browser executres events. We need to ensure we don't reactivate pointer-events within
         * this timeframe otherwise the browser may execute events that should have been prevented.
         *
         * Additionally, this also lets us deal automatically with cancellations when a click event
         * isn't raised because the page was considered scrolled/drag-scrolled, long-pressed, etc.
         *
         * This is why we also continuously remove the previous listener, because we cannot be
         * certain that it was raised, and therefore cleaned-up.
         */
        if (event.pointerType === 'touch') {
          ownerDocument.removeEventListener('click', handleClickRef.value)
          handleClickRef.value = handleAndDispatchPointerDownOutsideEvent
          ownerDocument.addEventListener('click', handleClickRef.value, { once: true })
        }
        else {
          handleAndDispatchPointerDownOutsideEvent()
        }
      }
      else {
        // We need to remove the event listener in case the outside click has been canceled.
        // See: https://github.com/radix-ui/primitives/issues/2171
        ownerDocument.removeEventListener('click', handleClickRef.value)
      }
      isPointerInsideReactTreeRef.value = false
    }
    /**
     * if this hook executes in a component that mounts via a `pointerdown` event, the event
     * would bubble up to the document and trigger a `pointerDownOutside` event. We avoid
     * this by delaying the event listener registration on the document.
     * This is not React specific, but rather how the DOM works, ie:
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

    onClean(() => {
      window.clearTimeout(timerId)
      ownerDocument.removeEventListener('pointerdown', handlePointerDown)
      ownerDocument.removeEventListener('click', handleClickRef.value)
    })
  })

  return {
    onPointerdownCapture: () => isPointerInsideReactTreeRef.value = true,
  }
}

/**
 * Listens for when focus happens outside a react subtree.
 * Returns props to pass to the root (node) of the subtree we want to check.
 */
export function useFocusOutside(
  onFocusOutside?: (event: FocusOutsideEvent) => void,
  element?: Ref<HTMLDivElement | null>,
) {
  const ownerDocument = element?.value?.ownerDocument ?? globalThis?.document
  const isFocusInsideReactTree = ref(false)

  watchEffect((onClean) => {
    if (!isClient)
      return

    const handleFocus = async (event: FocusEvent) => {
      if (!element?.value)
        return

      await nextTick()
      if (isElementDescendantOf(element.value, event.target as HTMLElement))
        return

      if (event.target && !isFocusInsideReactTree.value) {
        const eventDetail = { originalEvent: event }
        handleAndDispatchCustomEvent(FOCUS_OUTSIDE, onFocusOutside, eventDetail, {
          discrete: false,
        })
      }
    }

    ownerDocument.addEventListener('focusin', handleFocus)

    onClean(() => {
      if (ownerDocument)
        ownerDocument.removeEventListener('focusin', handleFocus)
    })
  })

  return {
    onFocusCapture: () => {
      isFocusInsideReactTree.value = true
    },
    onBlurCapture: () => {
      isFocusInsideReactTree.value = false
    },
  }
}

export function handleAndDispatchCustomEvent<E extends CustomEvent, OriginalEvent extends Event>(
  name: string,
  handler: ((event: E) => void) | undefined,
  detail: { originalEvent: OriginalEvent } & (E extends CustomEvent<infer D> ? D : never),
  { discrete }: { discrete: boolean },
) {
  const target = detail.originalEvent.target
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail })
  if (handler)
    target.addEventListener(name, handler as EventListener, { once: true })

  if (discrete)
    dispatchDiscreteCustomEvent(target, event)

  else
    target.dispatchEvent(event)
}

export function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE)
  document.dispatchEvent(event)
}
