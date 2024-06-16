import type { PrimitiveProps } from '../primitive/index.ts'

export interface TabsContentProps extends PrimitiveProps {
  value: string

  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}
