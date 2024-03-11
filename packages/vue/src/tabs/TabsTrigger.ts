import type { PrimitiveProps } from '@oku-ui/primitive'
import type { TabsScopeProps } from './types'

// Props

export interface TabsTriggerProps extends PrimitiveProps, TabsScopeProps {
  value: string
  disabled?: boolean
}

// Emits

export type TabsTriggerEmits = {
  mousedown: [event: MouseEvent]
  keydown: [event: KeyboardEvent]
  focus: [event: FocusEvent]
}
