import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'

export type ScopeToolbar<T> = T & { scopeOkuToolbar?: Scope }

export const scopeToolbarProps = {
  scopeOkuToolbar: {
    ...ScopePropObject,
  },
}
