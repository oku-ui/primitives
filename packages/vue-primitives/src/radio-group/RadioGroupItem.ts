import type { MutableRefObject } from '../hooks/index.ts'
import type { PrimitiveProps } from '../primitive/index.ts'

export interface RadioGroupItemProps {
  as?: PrimitiveProps['as']
  disabled?: boolean
  value: string

  name?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type RadioGroupItemEmits = {
  mousedown: [event: MouseEvent]
  keydown: [event: KeyboardEvent]
  focus: [event: FocusEvent]
  click: [event: MouseEvent]
}

// eslint-disable-next-line ts/consistent-type-definitions
export type RadioGroupItemSlots = {
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

export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
