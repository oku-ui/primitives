import type { PrimitiveProps } from '../primitive/Primitive.ts'
import type { RadixPrimitiveReturns } from '../shared/index.ts'
import { useCollapsibleTrigger } from '../collapsible/index.ts'
import { DATA_COLLECTION_ITEM } from '../collection/Collection.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
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
      const attrs = {
        'aria-disabled': (itemContext.open.value && !accordionContext.collapsible) || undefined,
        'data-orientation': accordionContext.orientation,
        [DATA_COLLECTION_ITEM]: true,
      }

      mergePrimitiveAttrs(attrs, [collapsibleTrigger.attrs(), ...extraAttrs])

      return attrs
    },
  }
}
