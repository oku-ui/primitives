import type { CheckedState } from '../checkbox/index.ts'

export interface MenuCheckboxItemProps {
  checked?: CheckedState
}

export type MenuCheckboxItemEmits = {
  'update:checked': [event: boolean]
}
