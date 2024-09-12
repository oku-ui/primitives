import { createContext, type MutableRefObject } from '../hooks/index.ts'
import type { GraceIntent } from './utils.ts'

export interface MenuContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export interface MenuContentContext {
  onItemEnter: (event: PointerEvent) => void
  onItemLeave: (event: PointerEvent) => void
  onTriggerLeave: (event: PointerEvent) => void
  searchRef: MutableRefObject<string>
  pointerGraceTimerRef: MutableRefObject<number>
  onPointerGraceIntentChange: (intent: GraceIntent | undefined) => void
}
export const [provideMenuContentContext, useMenuContentContext] = createContext<MenuContentContext>('MenuContent')
