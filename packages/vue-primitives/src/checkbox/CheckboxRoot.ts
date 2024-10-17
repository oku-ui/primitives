import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Ref } from 'vue'
import { createContext, type MutableRefObject } from '@oku-ui/hooks'

export interface CheckboxRootProps {
  as?: PrimitiveProps['as']
  checked?: CheckedState
  defaultChecked?: CheckedState
  disabled?: boolean
  required?: boolean
  value?: string
  name?: string
}

export type CheckboxRootEmits = {
  'update:checked': [value: CheckedState]
  'keydown': [event: KeyboardEvent]
  'click': [event: MouseEvent]
}

export type CheckboxRootSlots = {
  default: (props: {
    isFormControl: boolean
    input: {
      control: HTMLButtonElement | undefined
      bubbles: MutableRefObject<boolean>
      name?: string
      value: string
      checked: CheckedState
      required?: boolean
      disabled?: boolean
    }
  }) => any
}

export type CheckedState = boolean | 'indeterminate'

export interface CheckboxContext {
  state: Ref<CheckedState>
  disabled: () => boolean
}

export const [provideCheckboxContext, useCheckboxContext] = createContext<CheckboxContext>('Checkbox')
