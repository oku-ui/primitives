import { createContext } from '@oku-ui/hooks'

export interface MenuRadioGroupProps {
  value?: string
  onValueChange?: (value: string) => void
}

export type MenuRadioGroupEmits = {
  /** Event handler called when the value changes. */
  'update:value': [payload: string]
}

export interface MenuRadioGroupContext {
  value: () => string | undefined
  onValueChange: (value: string) => void
}

export const [providRadioGroupContext, useRadioGroupContext] = createContext<MenuRadioGroupContext>(
  'MenuRadioGroup',
  {
    value() {
      return undefined
    },
    onValueChange() { },
  },
)
