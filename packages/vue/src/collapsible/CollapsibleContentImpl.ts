import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import type { PresenceProps } from '@oku-ui/presence'

export const COLLAPSIBLE_CONTENT_IMPL_NAME = 'OkuCollapsibleContentImpl'

// Props

export interface CollapsibleContentImplProps extends PrimitiveProps, PresenceProps {
  scopeOkuCollapsible?: Scope
}
