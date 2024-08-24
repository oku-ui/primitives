import type { Ref } from 'vue'

type SetRef<T> = (el: T | undefined) => void

export function forwardRef<T = HTMLElement>(elRef: Ref<T>, elRefs?: Array<SetRef<T>>) {
  let rawRef: T | undefined
  function setRef(nodeRef: any) {
    const node = nodeRef?.$el

    if (node === rawRef)
      return

    elRef.value = node
    rawRef = node

    if (elRefs) {
      for (const set of elRefs) {
        set(node)
      }
    }
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
