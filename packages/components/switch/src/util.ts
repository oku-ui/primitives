import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'

export function getState(checked: boolean | undefined) {
  return checked ? 'checked' : 'unchecked'
}

export type ScopeSwitch<T> = T & { scopeOkuSwitch?: Scope }

export const scopeSwitchProps = {
  scopeOkuSwitch: {
    ...ScopePropObject,
  },
}
