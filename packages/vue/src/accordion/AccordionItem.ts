import type { Scope } from '@oku-ui/provide'
import type { CollapsibleProps } from '@oku-ui/collapsible'
import type { Ref } from 'vue'
import { createAccordionProvider } from './Accordion'
import { ITEM_NAME } from './constants'

// Props

export interface AccordionItemProps extends Omit<CollapsibleProps, 'open' | 'defaultOpen' | 'scopeOkuCollapsible'> {
  /**
   * Whether or not an accordion item is disabled from user interaction.
   * When `true`, prevents the user from interacting with the item.
   */
  disabled?: boolean

  /**
   * A string value for the accordion item. All items within an accordion should use a unique value.
   */
  value: string

  scopeOkuAccordion?: Scope
}

// Context

export interface AccordionItemContextValue {
  open?: Ref<boolean>
  disabled?: Ref<boolean | undefined>
  triggerId: string
}

export const [accordionItemProvider, useAccordionItemInject] = createAccordionProvider<AccordionItemContextValue>(ITEM_NAME)
