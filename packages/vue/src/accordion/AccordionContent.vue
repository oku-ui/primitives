<script setup lang="ts">
import { CONTENT_NAME } from './AccordionContent.js'
import { useAccordionInject } from './AccordionImpl.js'
import { useAccordionItemInject } from './AccordionItem.js'
import type { AccordionContentProps } from './AccordionContent.js'
import { useCollapsibleScope } from './Accordion.js'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuCollapsibleContent } from '@oku-ui/collapsible'
import { ACCORDION_NAME } from './constants.js'

defineOptions({
  name: CONTENT_NAME,
})

const props = defineProps<AccordionContentProps>()

const accordionInject = useAccordionInject(ACCORDION_NAME, props.scopeOkuAccordion)
const itemInject = useAccordionItemInject(CONTENT_NAME, props.scopeOkuAccordion)
const collapsibleScope = useCollapsibleScope(props.scopeOkuAccordion)

const forwardRef = useForwardRef()
</script>

<template>
  <OkuCollapsibleContent
    :is="is"
    :ref="forwardRef"
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
