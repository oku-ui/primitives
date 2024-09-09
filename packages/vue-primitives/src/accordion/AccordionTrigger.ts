import type { CollapsibleTriggerEmits } from '../collapsible/index.ts'
import type { PrimitiveProps } from '../primitive/Primitive.ts'

export interface AccordionTriggerProps {
  as?: PrimitiveProps['as']
}

export type AccordionTriggerEmits = CollapsibleTriggerEmits
