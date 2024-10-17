import type { PresenceProps } from '@oku-ui/presence'
import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'

// Props

export interface CollapsibleContentImplProps extends PrimitiveProps, PresenceProps {
  scopeOkuCollapsible?: Scope
}
