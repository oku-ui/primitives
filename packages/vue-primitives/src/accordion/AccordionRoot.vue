<script setup lang="ts" generic="T extends AccordionType">
import { useForwardElement, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { type AccordionRootEmits, type AccordionRootProps, type AccordionType, useAccordionRoot } from './AccordionRoot.ts'

defineOptions({
  name: 'AccordionRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AccordionRootProps<T>>(), {
  disabled: false,
  orientation: 'vertical',
  collapsible: false,
})
const emit = defineEmits<AccordionRootEmits<T>>()

const elRef = useRef<HTMLElement>()
const forwardElement = useForwardElement(elRef)

const accordionRoot = useAccordionRoot({
  elRef,
  value() {
    return props.value
  },
  onUpdateValue(value) {
    emit('update:value', value)
  },
  defaultValue: props.defaultValue,
  collapsible: props.collapsible,
  type: props.type,
  disabled() {
    return props.disabled
  },
  orientation: props.orientation,
  dir() {
    return props.dir
  },
  onKeydown(event: KeyboardEvent) {
    emit('keydown', event)
  },
})
</script>

<template>
  <Primitive :ref="forwardElement" v-bind="accordionRoot($attrs)">
    <slot />
  </Primitive>
</template>
