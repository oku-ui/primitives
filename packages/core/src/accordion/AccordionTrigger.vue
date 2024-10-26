<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type AccordionTriggerProps, useAccordionTrigger } from './AccordionTrigger.ts'

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
