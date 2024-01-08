import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'

export type ScopeRadioGroup<T> = T & { scopeOkuRadioGroup?: Scope }

export const scopeRadioGroupProps = {
  scopeOkuRadioGroup: {
    ...ScopePropObject,
  },
}

export type ScopeRadio<T> = T & { scopeOkuRadio?: Scope }

export const scopeRadioProps = {
  scopeOkuRadio: {
    ...ScopePropObject,
  },
}

export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

export function getState(checked: boolean) {
  return checked ? 'checked' : 'unchecked'
}
