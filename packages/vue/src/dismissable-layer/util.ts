import type { Ref } from 'vue'
import { nextTick, onUnmounted, ref, watchEffect } from 'vue'
import { dispatchDiscreteCustomEvent } from '@oku-ui/primitive'
import type { FocusOutsideEvent, PointerdownOutsideEvent } from './props'
import { FOCUS_OUTSIDE, POINTER_DOWN_OUTSIDE } from './props'

/**
 * Listens for `pointerdown` outside a subtree. We use `pointerdown` rather than `pointerup`
 * to mimic layer dismissing behaviour present in OS.
 * Returns props to pass to the node we want to check for outside events.
 */
export function usePointerdownOutside(
  onPointerDownOutside?: (event: PointerdownOutsideEvent) => void,
  ownerDocument: Ref<Document> = ref(globalThis?.document),
) {
  const isPointerInsideDOMTree = ref(false)
  const handleClickRef = ref(() => { })

  const handlePointerDown = async (event: PointerEvent) => {
    await nextTick()

    if (event.target && !isPointerInsideDOMTree.value) {
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
        ownerDocument.value.removeEventListener('click', handleClickRef.value)
        handleClickRef.value = handleAndDispatchPointerDownOutsideEvent
        ownerDocument.value.addEventListener('click', handleClickRef.value, {
          once: true,
        })
      }
      else {
        handleAndDispatchPointerDownOutsideEvent()
      }
    }
    else {
      // We need to remove the event listener in case the outside click has been canceled.
      // See: https://github.com/radix-ui/primitives/issues/2171
      ownerDocument.value.removeEventListener('click', handleClickRef.value)
    }
    isPointerInsideDOMTree.value = false
  }

  watchEffect((onCleanup) => {
    if (!ownerDocument.value)
      return

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
      ownerDocument.value.addEventListener('pointerdown', handlePointerDown)
    }, 0)

    onCleanup(() => {
      window.clearTimeout(timerId)
      ownerDocument.value.removeEventListener('pointerdown', handlePointerDown)
      ownerDocument.value.removeEventListener('click', handleClickRef.value)
    })
  })

  onUnmounted(() => {
    ownerDocument.value.removeEventListener('pointerdown', handlePointerDown)
    ownerDocument.value.removeEventListener('click', handleClickRef.value)
  })

  return {
    onPointerdownCapture: () => (isPointerInsideDOMTree.value = true),
  }
}

/**
 * Listens for when focus happens outside a react subtree.
 * Returns props to pass to the root (node) of the subtree we want to check.
 */
export function useFocusOutside(
  onFocusOutside?: (event: FocusOutsideEvent) => void,
  ownerDocument: Ref<Document> = ref(globalThis?.document),
) {
  const isFocusInsideTreeRef = ref<boolean>(false)

  const handleFocus = async (event: FocusEvent) => {
    await nextTick()

    if (event.target && !isFocusInsideTreeRef.value) {
      const eventDetail = { originalEvent: event }

      handleAndDispatchCustomEvent(
        FOCUS_OUTSIDE,
        onFocusOutside,
        eventDetail,
        { discrete: true },
      )
    }
  }

  watchEffect((onCleanup) => {
    if (!ownerDocument.value)
      return

    const timerId = window.setTimeout(() => {
      ownerDocument.value.addEventListener('focusin', handleFocus)
    }, 0)

    onCleanup(() => {
      window.clearTimeout(timerId)
      ownerDocument.value.removeEventListener('focusin', handleFocus)
    })
  })

  onUnmounted(() => {
    ownerDocument.value?.removeEventListener('focusin', handleFocus)
  })

  return {
    onFocusCapture: () => (isFocusInsideTreeRef.value = true),
    onBlurCapture: () => (isFocusInsideTreeRef.value = false),
  }
}

export function handleAndDispatchCustomEvent<E extends CustomEvent, OriginalEvent extends Event>(
  name: string,
  handler: ((event: E) => void) | undefined,
  detail: { originalEvent: OriginalEvent } & (E extends CustomEvent<infer D> ? D : never),
  { discrete }: { discrete: boolean },
) {
  const target = detail.originalEvent.target
  const event = new CustomEvent(name, { bubbles: true, cancelable: true, detail })

  if (handler)
    handler(event as E)

  if (discrete)
    dispatchDiscreteCustomEvent(target, event)

  else
    target.dispatchEvent(event)
}
