<script lang="ts">
import type { Ref } from 'vue'
import type { RadixPrimitiveGetAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import {
  type CollapsibleContentProps,
  DEFAULT_COLLAPSIBLE_CONTENT_PROPS,
  useCollapsibleContent,
  type UseCollapsibleContentProps
} from '../collapsible/index.ts'
import {
  convertPropsToHookProps,
  mergePrimitiveAttrs,
  normalizeAttrs
} from '../shared/index.ts'
import { useAccordionItemContext } from './AccordionItem.vue'
import { useAccordionContext } from './AccordionRoot.vue'

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

  const style = {
    '--radix-accordion-content-height': 'var(--radix-collapsible-content-height)',
    '--radix-accordion-content-width': 'var(--radix-collapsible-content-width)',
  }

  return {
    isOpen: collapsibleContent.isOpen,
    attrs(extraAttrs = []) {
      const attrs = {
        'role': 'region',
        'aria-labelledby': itemContext.triggerId,
        'data-orientation': accordionContext.orientation,
        'style': style,
      }

      mergePrimitiveAttrs(attrs, [collapsibleContent.attrs(), ...extraAttrs])

      return attrs
    },
  }
}

</script>

<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'

defineOptions({
  name: 'AccordionContent',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AccordionContentProps>(), DEFAULT_ACCORDION_CONTENT_PROPS)

const accordionContent = useAccordionContent(convertPropsToHookProps(props))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(accordionContent.attrs([$attrs]))">
    <slot v-if="accordionContent.isOpen.value" />
  </Primitive>
</template>
