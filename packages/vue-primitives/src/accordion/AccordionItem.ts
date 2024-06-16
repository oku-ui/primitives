import type { Ref } from 'vue'
import { createContext } from '../hooks/createContext.ts'
import type { PrimitiveProps } from '../primitive/index.ts'

export interface AccordionItemProps extends PrimitiveProps {
  /**
   * Whether or not an accordion item is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * A string value for the accordion item. All items within an accordion should use a unique value.
   */
  value: string
}

export interface AccordionItemContext {
  open: Ref<boolean>
  disabled: Ref<boolean>
  triggerId: string
}

export const [provideAccordionItemContext, useAccordionItemContext] = createContext<AccordionItemContext>('AccordionItem')
