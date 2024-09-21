<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { mergeAttrs } from '../shared/index.ts'
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
  <Primitive :as="as" v-bind="mergeAttrs(accordionTrigger(), $attrs)">
    <slot />
  </Primitive>
</template>
