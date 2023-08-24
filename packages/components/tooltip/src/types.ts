import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'

export type Point = { x: number; y: number }
export type Polygon = Point[]

export type Side = NonNullable<TooltipContentProps['side']>

export type ScopeTooltip<T> = T & { scopeOkuTooltip?: Scope }

export const scopeTooltipProps = {
  scopeOkuTooltip: {
    ...ScopePropObject,
  },
}
