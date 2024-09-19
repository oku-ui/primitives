<script setup lang="ts">
import { shallowRef } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { type AccordionTriggerEmits, type AccordionTriggerProps, useAccordionTrigger } from './AccordionTrigger.ts'

defineOptions({
  name: 'AccordionTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<AccordionTriggerProps>(), {
  as: 'button',
})
const emit = defineEmits<AccordionTriggerEmits>()

const el = shallowRef<HTMLButtonElement>()
const forwardElement = useForwardElement(el)

const accordionTrigger = useAccordionTrigger({
  el,
  onClick(event) {
    emit('click', event)
  },
})
</script>

<template>
  <Primitive :ref="forwardElement" :as="as" v-bind="accordionTrigger($attrs)">
    <slot />
  </Primitive>
</template>
