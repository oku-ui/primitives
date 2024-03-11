import type { PrimitiveProps } from '@oku-ui/primitive'
import type { TabsScopeProps } from './types'

// Props

export interface TabsListProps extends PrimitiveProps, TabsScopeProps {
  loop?: boolean
}
