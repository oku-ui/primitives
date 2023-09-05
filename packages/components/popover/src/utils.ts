import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'

export type ScopePopover<T> = T & { scopeOkuPopover?: Scope }

export const scopePopoverProps = {
  scopeOkuPopover: {
    ...ScopePropObject,
  },
}

export function getState(open: boolean) {
  return open ? 'open' : 'closed'
}
