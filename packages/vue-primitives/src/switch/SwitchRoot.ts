import type { Ref } from 'vue'
import type { PrimitiveProps } from '../primitive/index.ts'
import { createContext, type MutableRefObject } from '../hooks/index.ts'

export interface SwitchRootProps {
  as?: PrimitiveProps['as']
  checked?: boolean
  defaultChecked?: boolean
  required?: boolean

  disabled?: boolean
  value?: string
  name?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type SwitchRootEmits = {
  'update:checked': [checked: boolean]
  'click': [event: MouseEvent]
}

// eslint-disable-next-line ts/consistent-type-definitions
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
