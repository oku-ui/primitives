export interface HoverCardContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

// eslint-disable-next-line ts/consistent-type-definitions
export type HoverCardContentEmits = {
  pointerenter: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
}
