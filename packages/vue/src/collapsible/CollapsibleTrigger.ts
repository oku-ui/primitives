import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'

// Props

export interface CollapsibleTriggerProps extends PrimitiveProps {
  scopeOkuCollapsible?: Scope
}

// Emits

export type CollapsibleTriggerEmits = {
  click: [event: MouseEvent]
}
