import type { PrimitiveProps } from '../primitive/index.ts'
import type { RadixPrimitiveReturns } from '../shared/index.ts'
import { useCollapsibleTrigger } from '../collapsible/index.ts'
import { DATA_COLLECTION_ITEM } from '../collection/index.ts'
import { useAccordionItemContext } from './AccordionItem.ts'
import { useAccordionContext } from './AccordionRoot.ts'

export interface AccordionTriggerProps {
  as?: PrimitiveProps['as']
}

export function useAccordionTrigger(): RadixPrimitiveReturns {
  const collapsibleTrigger = useCollapsibleTrigger()

  const accordionContext = useAccordionContext('AccordionTrigger')
  const itemContext = useAccordionItemContext('AccordionHeader')

  return {
    attrs(extraAttrs = []) {
      const collapsibleTriggerAttrs = {
        'id': itemContext.triggerId,
        'aria-disabled': (itemContext.open.value && !accordionContext.collapsible) || undefined,
        'data-orientation': accordionContext.orientation,
        [DATA_COLLECTION_ITEM]: true,
      }

      return collapsibleTrigger.attrs([collapsibleTriggerAttrs, ...extraAttrs])
    },
  }
}
