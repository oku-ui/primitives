<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type AccordionHeaderProps, useAccordionHeader } from './AccordionHeader.ts'

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
  <Primitive :as="as" v-bind="normalizeAttrs(accordionHeader(), $attrs)">
    <slot />
  </Primitive>
</template>
