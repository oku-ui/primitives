<script setup lang="ts">
import { CONTENT_NAME } from './AccordionContent.ts'
import { useAccordionInject } from './AccordionImpl.ts'
import { useAccordionItemInject } from './AccordionItem.ts'
import type { AccordionContentProps } from './AccordionContent.ts'
import { useCollapsibleScope } from './Accordion.ts'
import { OkuCollapsibleContent } from '@oku-ui/collapsible'
import { ACCORDION_NAME } from './constants.ts'

defineOptions({
  name: CONTENT_NAME,
})

const props = defineProps<AccordionContentProps>()

const accordionInject = useAccordionInject(ACCORDION_NAME, props.scopeOkuAccordion)
const itemInject = useAccordionItemInject(CONTENT_NAME, props.scopeOkuAccordion)
const collapsibleScope = useCollapsibleScope(props.scopeOkuAccordion)
</script>

<template>
  <OkuCollapsibleContent
    :is="is"
    :as-child="asChild"
    role="region"
    :aria-labelledby="itemInject.triggerId"
    :data-orientation="accordionInject.orientation"
    :style="{
      '--oku-accordion-content-height': 'var(--oku-collapsible-content-height)',
      '--oku-accordion-content-width': 'var(--oku-collapsible-content-width)',
    }"
    v-bind="collapsibleScope"
  >
    <slot />
  </OkuCollapsibleContent>
</template>
