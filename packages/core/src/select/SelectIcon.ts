import type { PrimitiveProps } from '@oku-ui/primitive'
import type { PrimitiveDefaultProps } from '@oku-ui/shared'

export interface SelectIconProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_SELECT_ICON_PROPS = {
  as: 'span',
} satisfies PrimitiveDefaultProps<SelectIconProps>
