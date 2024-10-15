export interface HoverCardContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export type HoverCardContentEmits = {
  pointerenter: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
}
