import type { ArrowProps } from '../arrow/index.ts'
import type { PrimitiveDefaultProps } from '../shared/index.ts'
import type { Side } from './PopperContent.ts'

export interface PopperArrowProps extends ArrowProps {
}

export const DEFAULT_ARROW_PROPS = {
  as: 'svg',
  width: 10,
  height: 5,
} satisfies PrimitiveDefaultProps<PopperArrowProps>

export const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}
