import type { Ref } from 'vue'

export function forwardRef<T = HTMLElement>(elRef: Ref<T>) {
  function setRef(nodeRef: any) {
    elRef.value = nodeRef?.$el
  }

  return setRef
}

export function composeEventHandlers<E extends Event>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event)

    if (checkForDefaultPrevented === false || !((event as unknown) as Event).defaultPrevented)
      ourEventHandler?.(event)
  }
}
