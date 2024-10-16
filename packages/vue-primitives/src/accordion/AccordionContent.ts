import type { Ref } from 'vue'
import type { RadixPrimitiveGetAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { type CollapsibleContentProps, DEFAULT_COLLAPSIBLE_CONTENT_PROPS, useCollapsibleContent, type UseCollapsibleContentProps } from '../collapsible/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useAccordionItemContext } from './AccordionItem.ts'
import { useAccordionContext } from './AccordionRoot.ts'

export type AccordionContentProps = CollapsibleContentProps

export const DEFAULT_ACCORDION_CONTENT_PROPS = DEFAULT_COLLAPSIBLE_CONTENT_PROPS

export interface UseAccordionContentProps extends UseCollapsibleContentProps {}

export function useAccordionContent(props: UseAccordionContentProps): RadixPrimitiveReturns<{
  isOpen: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const collapsibleContent = useCollapsibleContent(props)

  const accordionContext = useAccordionContext('AccordionContent')
  const itemContext = useAccordionItemContext('AccordionContent')

  return {
    isOpen: collapsibleContent.isOpen,
    attrs(extraAttrs = []) {
      const attrs = {
        'role': 'region',
        'aria-labelledby': itemContext.triggerId,
        'data-orientation': accordionContext.orientation,
      }

      mergePrimitiveAttrs(attrs, [collapsibleContent.attrs(), ...extraAttrs])

      return attrs
    },
  }
}
