import type { Ref } from 'vue'
import type { RadixPrimitiveGetAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { type CollapsibleContentProps, useCollapsibleContent, type UseCollapsibleContentProps } from '../collapsible/index.ts'
import { mergeHooksAttrs } from '../shared/index.ts'
import { useAccordionItemContext } from './AccordionItem.ts'
import { useAccordionContext } from './AccordionRoot.ts'

export type AccordionContentProps = CollapsibleContentProps

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

      mergeHooksAttrs(attrs, [collapsibleContent.attrs(), ...extraAttrs])

      return attrs
    },
  }
}
