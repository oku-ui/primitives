<script setup lang="ts">
import type { AccordionTriggerProps } from './AccordionTrigger.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { useAccordionTrigger } from './AccordionTrigger.ts'

defineOptions({
  name: 'AccordionTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<AccordionTriggerProps>(), {
  as: 'button',
})

const accordionTrigger = useAccordionTrigger()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(accordionTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
