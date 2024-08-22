import type { PrimitiveProps } from '../primitive/Primitive.ts'
import type { SeparatorProps } from '../separator/index.ts'

export interface ToolbarSeparatorProps extends PrimitiveProps {
  decorative?: SeparatorProps['decorative']
}
