import type { UseCollapsibleContentProps, UseCollapsibleContentReturns } from '../collapsible/CollapsibleContent.ts'
import { type CollapsibleContentProps, useCollapsibleContent } from '../collapsible/index.ts'
import { type Data, mergeAttrs, mergeProps } from '../shared/mergeProps.ts'
import { useAccordionItemContext } from './AccordionItem.ts'
import { useAccordionContext } from './AccordionRoot.ts'

export type AccordionContentProps = CollapsibleContentProps

export interface UseAccordionContentProps extends UseCollapsibleContentProps {}

export interface UseAccordionContentReturns extends UseCollapsibleContentReturns {
  'role': 'region'
  'aria-labelledby': string
  'data-orientation': 'horizontal' | 'vertical'
}

export function useAccordionContent(
  props: UseAccordionContentProps,
): (extraAttrs?: Data) => UseAccordionContentReturns {
  const collapsibleContent = useCollapsibleContent(props)

  const accordionContext = useAccordionContext('AccordionContent')
  const itemContext = useAccordionItemContext('AccordionContent')

  return (extraAttrs?: Data): UseAccordionContentReturns => {
    const attrs = {
      'role': 'region',
      'aria-labelledby': itemContext.triggerId,
      'data-orientation': accordionContext.orientation,
    } as const

    if (extraAttrs)
      mergeProps(attrs, [collapsibleContent(), extraAttrs])
    else
      mergeAttrs(attrs, collapsibleContent())

    return attrs as UseAccordionContentReturns
  }
}
