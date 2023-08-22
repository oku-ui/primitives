import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'

export type ScopeToggleGroup<T> = T & { scopeOkuToggleGroup?: Scope }

export const scopeToggleGroupProps = {
  scopeOkuToggleGroup: {
    ...ScopePropObject,
  },
}
