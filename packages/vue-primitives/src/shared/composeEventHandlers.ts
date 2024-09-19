export function composeEventHandlers<E extends Event>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
) {
  return function handleEvent(event: E) {
    const currentTarget = event.currentTarget as HTMLButtonElement
    if (currentTarget.disabled || currentTarget.hasAttribute('data-disabled')) {
      return
    }

    const target = event.target as HTMLButtonElement
    if (target.disabled || target.hasAttribute('data-disabled')) {
      return
    }

    originalEventHandler?.(event)

    if (checkForDefaultPrevented === false || !((event as unknown) as Event).defaultPrevented)
      ourEventHandler?.(event)
  }
}
