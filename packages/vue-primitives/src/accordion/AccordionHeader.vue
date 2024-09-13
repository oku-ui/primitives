<script setup lang="ts">
import type { AccordionHeaderProps } from './AccordionHeader.ts'
import { Primitive } from '../primitive/index.ts'
import { useAccordionItemContext } from './AccordionItem.ts'
import { useAccordionContext } from './AccordionRoot.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'AccordionHeader',
})

withDefaults(defineProps<AccordionHeaderProps>(), {
  as: 'h3',
})

const accordionContext = useAccordionContext('AccordionHeader')
const itemContext = useAccordionItemContext('AccordionHeader')
</script>

<template>
  <Primitive
    :as="as"
    :data-orientation="accordionContext.orientation"
    :data-state="getState(itemContext.open.value)"
    :data-disabled="itemContext.disabled.value ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
