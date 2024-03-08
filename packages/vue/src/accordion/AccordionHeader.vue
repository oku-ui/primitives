<script setup lang="ts">
import type { AccordionHeaderProps } from './AccordionHeader.ts'
import { useAccordionInject } from './AccordionImpl.ts'
import { useAccordionItemInject } from './AccordionItem.ts'
import { ACCORDION_NAME, HEADER_NAME } from './constants.ts'
import { Primitive } from '@oku-ui/primitive'
import { getState } from './utils.ts'

defineOptions({
  name: HEADER_NAME,
})

const props = withDefaults(defineProps<AccordionHeaderProps>(), {
  is: 'h3',
})

const accordionContext = useAccordionInject(ACCORDION_NAME, props.scopeOkuAccordion)
const itemContext = useAccordionItemInject(HEADER_NAME, props.scopeOkuAccordion)
</script>

<template>
  <Primitive
    :is="is"
    :as-child="asChild"
    :data-orientation="accordionContext.orientation.value"
    :data-state="getState(itemContext.open?.value)"
    :data-disabled="itemContext.disabled?.value ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
