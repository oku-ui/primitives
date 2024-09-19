import type { PrimitiveProps } from '../primitive/index.ts'
import { type Data, mergeAttrs } from '../shared/index.ts'
import { useAccordionItemContext } from './AccordionItem.ts'
import { useAccordionContext } from './AccordionRoot.ts'

export interface AccordionHeaderProps {
  as?: PrimitiveProps['as']
}

export interface UseAccordionHeaderRetuns {
  'data-orientation': string
  'data-state': 'open' | 'closed'
  'data-disabled'?: string
  [key: string]: any
}

export function useAccordionHeader(): (extraAttrs?: Data) => UseAccordionHeaderRetuns {
  const accordionContext = useAccordionContext('AccordionHeader')
  const itemContext = useAccordionItemContext('AccordionHeader')

  return (extraAttrs?: Data): UseAccordionHeaderRetuns => {
    const attrs = {
      'data-orientation': accordionContext.orientation,
      'data-state': itemContext.open.value ? 'open' : 'closed',
      'data-disabled': itemContext.disabled.value ? '' : undefined,
    } as const

    if (extraAttrs)
      mergeAttrs(attrs, extraAttrs)

    return attrs
  }
}
