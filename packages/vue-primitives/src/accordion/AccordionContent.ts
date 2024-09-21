import type { RadixPrimitiveReturns } from '../shared/index.ts'
import { type CollapsibleContentProps, useCollapsibleContent, type UseCollapsibleContentProps } from '../collapsible/index.ts'
import { mergeHookAttrs } from '../shared/index.ts'
import { useAccordionItemContext } from './AccordionItem.ts'
import { useAccordionContext } from './AccordionRoot.ts'

export type AccordionContentProps = CollapsibleContentProps

export interface UseAccordionContentProps extends UseCollapsibleContentProps {}

export function useAccordionContent(props: UseAccordionContentProps): RadixPrimitiveReturns {
  const collapsibleContent = useCollapsibleContent(props)

  const accordionContext = useAccordionContext('AccordionContent')
  const itemContext = useAccordionItemContext('AccordionContent')

  return (extraAttrs) => {
    const attrs = {
      'role': 'region',
      'aria-labelledby': itemContext.triggerId,
      'data-orientation': accordionContext.orientation,
    }

    if (extraAttrs)
      mergeHookAttrs(attrs, [collapsibleContent(extraAttrs)])

    return attrs
  }
}
