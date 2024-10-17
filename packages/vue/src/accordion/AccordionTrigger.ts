import type { CollapsibleTriggerEmits, CollapsibleTriggerProps } from '@oku-ui/collapsible'
import type { Scope } from '@oku-ui/provide'

// Props

export interface AccordionTriggerProps extends CollapsibleTriggerProps {
  scopeOkuAccordion?: Scope
}

// Emits

export type AccordionTriggerEmits = CollapsibleTriggerEmits

export type AccordionTriggerElement = HTMLButtonElement
