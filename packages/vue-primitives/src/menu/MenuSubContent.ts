import type { FocusOutsideEvent } from '../dismissable-layer/index.ts'

export interface MenuSubContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

// eslint-disable-next-line ts/consistent-type-definitions
export type MenuSubContentEmits = {
  focusOutside: [event: FocusOutsideEvent]
  escapeKeydown: [event: KeyboardEvent]
  keydown: [event: KeyboardEvent]
}
