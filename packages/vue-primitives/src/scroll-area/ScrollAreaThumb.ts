export interface ScrollAreaThumbProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

// eslint-disable-next-line ts/consistent-type-definitions
export type ScrollAreaThumbEmits = {
  pointerdownCapture: [event: PointerEvent]
  pointerup: [event: PointerEvent]
}
