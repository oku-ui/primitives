import type { PopperContentProps } from '../popper/index.ts'

export interface TooltipContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean

  side?: PopperContentProps['side']
}
