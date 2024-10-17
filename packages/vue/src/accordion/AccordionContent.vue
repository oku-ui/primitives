<script setup lang="ts">
import type { AccordionContentProps } from './AccordionContent'
import { OkuCollapsibleContent } from '@oku-ui/collapsible'
import { useCollapsibleScope } from './Accordion'
import { CONTENT_NAME } from './AccordionContent'
import { useAccordionInject } from './AccordionImpl'
import { useAccordionItemInject } from './AccordionItem'
import { ACCORDION_NAME } from './constants'

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
