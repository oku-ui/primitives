import type { EmitsToHookProps } from '../shared/typeUtils.ts'
import { NOOP } from '@vue/shared'
import { createContext } from '../hooks/index.ts'

export interface MenuRadioGroupProps {
  value?: string
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

export interface UseMenuRadioGroupProps extends EmitsToHookProps<MenuRadioGroupEmits> {
  value?: () => string | undefined
}

export function useMenuRadioGroup(props: UseMenuRadioGroupProps): void {
  const {
    value = () => undefined,
    onUpdateValue = NOOP,
  } = props
  providRadioGroupContext({
    value,
    onValueChange: onUpdateValue,
  })
}
