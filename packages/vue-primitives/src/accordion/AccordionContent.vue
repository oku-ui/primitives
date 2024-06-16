<script setup lang="ts">
import { useAccordionContext } from './Accordion.ts'
import type { AccordionContentProps } from './AccordionContent.ts'
import { useAccordionItemContext } from './AccordionItem.ts'
import { CollapsibleContent } from '~/collapsible/index.ts'

defineOptions({
  name: 'AccordionContent',
})

withDefaults(defineProps<AccordionContentProps>(), {
  forceMount: undefined,
})

const accordionContext = useAccordionContext()
const itemContext = useAccordionItemContext()
</script>

<template>
  <CollapsibleContent
    :as="as"
    :as-child="asChild"
    :force-mount="forceMount"
    role="region"
    :aria-labelledby="itemContext.triggerId"
    :data-orientation="accordionContext.orientation"
    style="--radix-accordion-content-height: var(--radix-collapsible-content-height); --radix-accordion-content-width: var(--radix-collapsible-content-width);"
  >
    <slot />
  </CollapsibleContent>
</template>
