export interface RadioGroupItemProps {
  disabled?: boolean
  value: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type RadioGroupItemEmits = {
  focus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}

export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
