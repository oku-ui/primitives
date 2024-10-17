<script setup lang="ts">
import type { AccordionHeaderProps } from './AccordionHeader'
import { Primitive } from '@oku-ui/primitive'
import { useAccordionInject } from './AccordionImpl'
import { useAccordionItemInject } from './AccordionItem'
import { ACCORDION_NAME, HEADER_NAME } from './constants'
import { getState } from './utils'

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
