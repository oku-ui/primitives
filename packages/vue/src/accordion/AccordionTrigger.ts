import type { Scope } from '@oku-ui/provide'
import type { CollapsibleTriggerEmits, CollapsibleTriggerProps } from '@oku-ui/collapsible'

// Props

export interface AccordionTriggerProps extends CollapsibleTriggerProps {
  scopeOkuAccordion?: Scope
}

// Emits

export type AccordionTriggerEmits = CollapsibleTriggerEmits

export type AccordionTriggerElement = HTMLButtonElement
