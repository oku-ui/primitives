<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type AccordionItemProps, useAccordionItem } from './AccordionItem.ts'

defineOptions({
  name: 'AccordionItem',
  inheritAttrs: false,
})

const props = defineProps<AccordionItemProps>()

const accordionItem = useAccordionItem({
  value() {
    return props.value
  },
  disabled() {
    return props.disabled
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(accordionItem.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
