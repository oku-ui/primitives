import type { CheckedState } from '../checkbox/index.ts'

export interface MenuCheckboxItemProps {
  checked?: CheckedState
}

// eslint-disable-next-line ts/consistent-type-definitions
export type MenuCheckboxItemEmits = {
  'update:checked': [event: boolean]
}
