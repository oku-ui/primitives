import type { Ref } from 'vue'
import type { PrimitiveProps } from '../primitive/Primitive.ts'
import type { ConvertEmitsToUseEmits } from '../shared/typeUtils.ts'
import { type CollapsibleTriggerEmits, useCollapsibleTrigger, type UseCollapsibleTriggerReturns } from '../collapsible/index.ts'
import { type CollectionItemAttrs, DATA_COLLECTION_ITEM } from '../collection/Collection.ts'
import { type Data, mergeAttrs, mergeProps } from '../shared/index.ts'
import { useAccordionItemContext } from './AccordionItem.ts'
import { useAccordionContext } from './AccordionRoot.ts'

export interface AccordionTriggerProps {
  as?: PrimitiveProps['as']
}

export type AccordionTriggerEmits = CollapsibleTriggerEmits

export interface UseAccordionTriggerProps extends ConvertEmitsToUseEmits<CollapsibleTriggerEmits> {
  el: Ref<HTMLElement | undefined>
}

export interface UseAccordionTriggerReturns extends CollectionItemAttrs, UseCollapsibleTriggerReturns {
  'aria-disabled'?: boolean
  'data-orientation'?: 'horizontal' | 'vertical'
}

export function useAccordionTrigger(
  props: UseAccordionTriggerProps,
): (extraAttrs?: Data) => UseAccordionTriggerReturns {
  const collapsibleTrigger = useCollapsibleTrigger({
    onClick: props.onClick,
  })

  const accordionContext = useAccordionContext('AccordionTrigger')
  const itemContext = useAccordionItemContext('AccordionHeader')

  return (extraAttrs?: Data): UseAccordionTriggerReturns => {
    const attrs = {
      'aria-disabled': (itemContext.open.value && !accordionContext.collapsible) || undefined,
      'data-orientation': accordionContext.orientation,
      [DATA_COLLECTION_ITEM]: true,
    }

    if (extraAttrs)
      mergeProps(attrs, collapsibleTrigger(), extraAttrs)
    else
      mergeAttrs(attrs, collapsibleTrigger())

    return attrs as UseAccordionTriggerReturns
  }
}
