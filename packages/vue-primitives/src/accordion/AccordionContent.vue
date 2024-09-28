<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type AccordionContentProps, useAccordionContent } from './AccordionContent.ts'

defineOptions({
  name: 'AccordionContent',
  inheritAttrs: false,
})

const props = defineProps<AccordionContentProps>()

const accordionContent = useAccordionContent({
  forceMount: props.forceMount,
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(accordionContent.attrs(), $attrs)">
    <slot v-if="accordionContent.isOpen.value" />
  </Primitive>
</template>
