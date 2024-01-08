import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'

export function getState(open?: boolean) {
  return open ? 'open' : 'closed'
}

export type ScopeCollapsible<T> = T & { scopeOkuCollapsible?: Scope }

export const scopeCollapsibleProps = {
  scopeOkuCollapsible: {
    ...ScopePropObject,
  },
}
