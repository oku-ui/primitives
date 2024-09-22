import type { PrimitiveProps } from '../primitive/index.ts'
import type { RadixPrimitiveReturns } from '../shared/index.ts'
import { mergeHooksAttrs } from '../shared/index.ts'
import { useAccordionItemContext } from './AccordionItem.ts'
import { useAccordionContext } from './AccordionRoot.ts'

export interface AccordionHeaderProps {
  as?: PrimitiveProps['as']
}

export function useAccordionHeader(): RadixPrimitiveReturns {
  const accordionContext = useAccordionContext('AccordionHeader')
  const itemContext = useAccordionItemContext('AccordionHeader')

  return {
    attrs(extraAttrs) {
      const attrs = {
        'data-orientation': accordionContext.orientation,
        'data-state': itemContext.open.value ? 'open' : 'closed',
        'data-disabled': itemContext.disabled.value ? '' : undefined,
      }

      if (extraAttrs)
        mergeHooksAttrs(attrs, extraAttrs)

      return attrs
    },
  }
}
