import type { ArrowProps } from '../arrow/Arrow.ts'
import type { Side } from './PopperContent.ts'

export interface PopperArrowProps extends ArrowProps {
}

export const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}
