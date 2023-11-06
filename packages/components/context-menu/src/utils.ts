export function whenTouchOrPen<E extends PointerEvent>(handler: ((event: E) => void)): (event: E) => void {
  return (event: E) => (event.pointerType !== 'mouse' ? handler(event) : undefined)
}
