<script setup lang="ts">
import { shallowRef } from 'vue'
import { useCollapsibleContent } from '../collapsible/CollapsibleContent.ts'
import { useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useAccordionItemContext } from './AccordionItem.ts'
import { useAccordionContext } from './AccordionRoot.ts'
import { getState } from './utils.ts'
import type { AccordionContentProps } from './AccordionContent.ts'

defineOptions({
  name: 'AccordionContent',
})

const props = defineProps<AccordionContentProps>()

const accordionContext = useAccordionContext('AccordionContent')
const itemContext = useAccordionItemContext('AccordionContent')

const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const collapsibleContent = useCollapsibleContent($el, props)
</script>

<template>
  <Primitive
    :id="collapsibleContent.context.contentId"
    :ref="forwardElement"
    :data-state="getState(collapsibleContent.context.open.value)"
    :data-disabled="collapsibleContent.context.disabled() ? '' : undefined"
    :hidden="!collapsibleContent.isOpen.value"
    :style="{
      '--radix-collapsible-content-height': '0px',
      '--radix-collapsible-content-width': '0px',
      '--radix-accordion-content-height': 'var(--radix-collapsible-content-height)',
      '--radix-accordion-content-width': 'var(--radix-collapsible-content-width)',
      ...collapsibleContent.blockAnimationStyles.value,
    }"

    role="region"
    :aria-labelledby="itemContext.triggerId"
    :data-orientation="accordionContext.orientation"
  >
    <slot v-if="collapsibleContent.isOpen.value" />
  </Primitive>
</template>
