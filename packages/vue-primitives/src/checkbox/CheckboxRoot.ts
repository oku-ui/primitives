import type { Ref } from 'vue'
import { createContext } from '../hooks/index.ts'
import type { PrimitiveProps } from '../primitive/index.ts'

export interface CheckboxRootProps {
  as?: PrimitiveProps['as']
  checked?: CheckedState
  defaultChecked?: CheckedState
  disabled?: boolean
  required?: boolean
  value?: string
  name?: string
}

export type ClickEvent = Event & { _stopPropagation: Event['stopPropagation'], _isPropagationStopped: boolean, isPropagationStopped: () => boolean }

// eslint-disable-next-line ts/consistent-type-definitions
export type CheckboxRootEmits = {
  'update:checked': [value: CheckedState]
  'keydown': [event: KeyboardEvent]
  'click': [event: ClickEvent]
}

export type CheckedState = boolean | 'indeterminate'

export interface CheckboxContext {
  state: Ref<CheckedState>
  disabled: () => boolean
}

export const [provideCheckboxContext, useCheckboxContext] = createContext<CheckboxContext>('Checkbox')
