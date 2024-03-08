import type { PrimitiveProps } from '@oku-ui/primitive'
import type { TabsScopeProps } from './types'

// Props

export interface TabsContentProps extends PrimitiveProps, TabsScopeProps {
  value: string

  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}
