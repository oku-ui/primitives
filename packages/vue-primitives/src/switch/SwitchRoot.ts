import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Ref } from 'vue'
import { createContext, type MutableRefObject } from '@oku-ui/hooks'

export interface SwitchRootProps {
  as?: PrimitiveProps['as']
  checked?: boolean
  defaultChecked?: boolean
  required?: boolean

  disabled?: boolean
  value?: string
  name?: string
}

export type SwitchRootEmits = {
  'update:checked': [checked: boolean]
  'click': [event: MouseEvent]
}

export type SwitchRootSlots = {
  default: (props: {
    isFormControl: boolean
    input: {
      control: HTMLButtonElement | undefined
      bubbles: MutableRefObject<boolean>
      name?: string
      value: string
      checked: boolean
      required?: boolean
      disabled?: boolean
    }
  }) => any
}

export interface SwitchRootContext {
  checked: Ref<boolean>
  disabled: () => boolean
}

export const [provideSwitchContext, useSwitchContext] = createContext<SwitchRootContext>('Switch')

export function getState(checked: boolean) {
  return checked ? 'checked' : 'unchecked'
}
