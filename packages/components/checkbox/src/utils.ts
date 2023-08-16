import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'

export type CheckedState = boolean | string | number | undefined | 'indeterminate'

export type ScopeCheckbox<T> = T & { scopeOkuCheckbox?: Scope }

export const scopeCheckboxProps = {
  scopeOkuCheckbox: {
    ...ScopePropObject,
  },
}

function isIndeterminate(checked?: CheckedState): checked is 'indeterminate' {
  return checked === 'indeterminate'
}

function getState(checked: CheckedState) {
  return isIndeterminate(checked) ? 'indeterminate' : checked ? 'checked' : 'unchecked'
}

export {
  isIndeterminate,
  getState,
}
