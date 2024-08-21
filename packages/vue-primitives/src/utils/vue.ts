import type { Ref } from 'vue'

export function forwardRef<T = HTMLElement>(elRef: Ref<T>) {
  function setRef(nodeRef: any) {
    const node = nodeRef?.$el

    elRef.value = node
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
