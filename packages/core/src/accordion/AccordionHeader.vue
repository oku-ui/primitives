<script lang="ts">
import type { PrimitiveProps } from '../primitive/index.ts'
import type { RadixPrimitiveReturns } from '../shared/index.ts'
import { mergePrimitiveAttrs, normalizeAttrs } from '../shared/index.ts'
import { useAccordionItemContext } from './AccordionItem.vue'
import { useAccordionContext } from './AccordionRoot.vue'

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

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}

</script>

<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'

defineOptions({
  name: 'AccordionHeader',
  inheritAttrs: false,
})

withDefaults(defineProps<AccordionHeaderProps>(), {
  as: 'h3',
})

const accordionHeader = useAccordionHeader()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(accordionHeader.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
