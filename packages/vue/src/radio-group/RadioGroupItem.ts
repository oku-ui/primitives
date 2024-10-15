import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'

// Props

export interface RadioGroupItemProps extends PrimitiveProps {
  disabled?: boolean
  value: string

  scopeOkuRadioGroup?: Scope
}

// Emits

export type RadioGroupItemEmits = {
  focus: [event: FocusEvent]
}
