<script setup lang="ts">
import { useForwardRef } from '@oku-ui/use-composable'
import type { AccordionHeaderProps } from './AccordionHeader.js'
import { useAccordionInject } from './AccordionImpl.js'
import { useAccordionItemInject } from './AccordionItem.js'
import { ACCORDION_NAME, HEADER_NAME } from './constants.js'
import { Primitive } from '@oku-ui/primitive'
import { getState } from './utils.js'

defineOptions({
  name: HEADER_NAME,
})

const props = withDefaults(defineProps<AccordionHeaderProps>(), {
  is: 'h3',
})

const accordionContext = useAccordionInject(ACCORDION_NAME, props.scopeOkuAccordion)
const itemContext = useAccordionItemInject(HEADER_NAME, props.scopeOkuAccordion)

const forwardRef = useForwardRef()
</script>

<template>
  <Primitive
    :is="is"
    :ref="forwardRef"
    :as-child="asChild"
    :data-orientation="accordionContext.orientation.value"
    :data-state="getState(itemContext.open?.value)"
    :data-disabled="itemContext.disabled?.value ? '' : undefined"
  >
    <slot />
  </Primitive>
</template>
