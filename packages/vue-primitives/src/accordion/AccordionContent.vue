<script setup lang="ts">
import { shallowRef } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { mergeAttrs } from '../shared/index.ts'
import { type AccordionContentProps, useAccordionContent } from './AccordionContent.ts'

defineOptions({
  name: 'AccordionContent',
  inheritAttrs: false,
})

const props = defineProps<AccordionContentProps>()

const el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement(el)

const isOpen = shallowRef(false)

const accordionContent = useAccordionContent({
  el,
  isOpen,
  forceMount: props.forceMount,
})
</script>

<template>
  <Primitive :ref="forwardElement" v-bind="mergeAttrs(accordionContent(), $attrs)">
    <slot v-if="isOpen" />
  </Primitive>
</template>
