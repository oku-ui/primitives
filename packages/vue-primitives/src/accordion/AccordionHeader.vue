<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { useAccordionContext } from './Accordion.ts'
import type { AccordionHeaderProps } from './AccordionHeader.ts'
import { useAccordionItemContext } from './AccordionItem.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'AccordionHeader',
})

withDefaults(defineProps<AccordionHeaderProps>(), {
  as: 'h3',
})

const accordionContext = useAccordionContext()
const itemContext = useAccordionItemContext()
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :data-orientation="accordionContext.orientation"
    :data-state="getState(itemContext.open.value)"
    :data-disabled="itemContext.disabled.value ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
