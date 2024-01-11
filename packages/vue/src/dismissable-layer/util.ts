import type { Ref } from 'vue'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
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

  const handleClick = () => {
    ownerDocument.value.removeEventListener('click', handleClick)
    isPointerInsideDOMTree.value = false
  }

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

      if (event.pointerType === 'touch') {
        ownerDocument.value.removeEventListener('click', handleClick)
        ownerDocument.value.addEventListener('click', handleClick, { once: true })
      }
      else {
        handleAndDispatchPointerDownOutsideEvent()
      }
    }
  }

  onMounted(() => {
    ownerDocument.value.addEventListener('pointerdown', handlePointerDown)
  })

  onBeforeUnmount(() => {
    ownerDocument.value.removeEventListener('pointerdown', handlePointerDown)
    ownerDocument.value.removeEventListener('click', handleClick)
  })

  return {
    onPointerdownCapture: () => {
      isPointerInsideDOMTree.value = true
    },
  }
}

/**
 * Listens for when focus happens outside a react subtree.
 * Returns props to pass to the root (node) of the subtree we want to check.
 */
export function useFocusOutside(
  onFocusOutside?: (event: FocusOutsideEvent) => void,
  ownerDocument: Ref<Document | null> = ref(globalThis?.document),
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

  const addFocusEventListener = () => {
    if (ownerDocument.value)
      ownerDocument.value.addEventListener('focusin', handleFocus)
  }

  const removeFocusEventListener = () => {
    if (ownerDocument.value)
      ownerDocument.value.removeEventListener('focusin', handleFocus)
  }

  onMounted(() => {
    addFocusEventListener()
  })

  onBeforeUnmount(() => {
    removeFocusEventListener()
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
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail })
  if (handler)
    target.addEventListener(name, handler as EventListener, { once: true })

  if (discrete)
    dispatchDiscreteCustomEvent(target, event)

  else
    target.dispatchEvent(event)
}
