<script setup lang="ts">
import type { AccordionHeaderProps } from './AccordionHeader.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { useAccordionHeader } from './AccordionHeader.ts'

defineOptions({
  name: 'AccordionHeader',
  inheritAttrs: false,
})

withDefaults(defineProps<AccordionHeaderProps>(), {
  as: 'h3',
})

const accordionHeader = useAccordionHeader()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(accordionHeader.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
