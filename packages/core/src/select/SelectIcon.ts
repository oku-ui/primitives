import type { PrimitiveProps } from '../primitive'
import type { PrimitiveDefaultProps } from '../shared'

export interface SelectIconProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_SELECT_ICON_PROPS = {
  as: 'span',
} satisfies PrimitiveDefaultProps<SelectIconProps>
