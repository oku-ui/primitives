import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import type { PresenceProps } from '@oku-ui/presence'

// Props

export interface CollapsibleContentImplProps extends PrimitiveProps, PresenceProps {
  scopeOkuCollapsible?: Scope
}
