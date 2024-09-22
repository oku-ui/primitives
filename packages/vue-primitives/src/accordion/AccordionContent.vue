<script setup lang="ts">
import { shallowRef } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type AccordionContentProps, useAccordionContent } from './AccordionContent.ts'

defineOptions({
  name: 'AccordionContent',
  inheritAttrs: false,
})

const props = defineProps<AccordionContentProps>()

const el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement(el)

const accordionContent = useAccordionContent({
  el,
  forceMount: props.forceMount,
})
</script>

<template>
  <Primitive :ref="forwardElement" v-bind="normalizeAttrs(accordionContent.attrs(), $attrs)">
    <slot v-if="accordionContent.isOpen.value" />
  </Primitive>
</template>
