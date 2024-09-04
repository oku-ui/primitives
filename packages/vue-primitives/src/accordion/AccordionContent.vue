<script setup lang="ts">
import { CollapsibleContent } from '../collapsible/index.ts'
import { useAccordionContext } from './AccordionRoot.ts'
import { useAccordionItemContext } from './AccordionItem.ts'

defineOptions({
  name: 'AccordionContent',
})

const accordionContext = useAccordionContext('AccordionContent')
const itemContext = useAccordionItemContext('AccordionContent')
</script>

<template>
  <CollapsibleContent
    role="region"
    :aria-labelledby="itemContext.triggerId"
    :data-orientation="accordionContext.orientation"
    style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width);"
  >
    <slot />
  </CollapsibleContent>
</template>
