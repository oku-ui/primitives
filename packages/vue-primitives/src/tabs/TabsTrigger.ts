import type { PrimitiveProps } from '../primitive/index.ts'

export interface TabsTriggerProps {
  as?: PrimitiveProps['as']
  value: string
  disabled?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type TabsTriggerEmits = {
  mousedown: [event: MouseEvent]
  keydown: [event: KeyboardEvent]
  focus: [event: FocusEvent]
}
