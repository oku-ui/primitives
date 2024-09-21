<script setup lang="ts" generic="T extends AccordionType = undefined">
import { useForwardElement, useRef } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { mergeAttrs } from '../shared/index.ts'
import { type AccordionRootEmits, type AccordionRootProps, type AccordionType, useAccordionRoot } from './AccordionRoot.ts'

defineOptions({
  name: 'AccordionRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AccordionRootProps<T>>(), {
  disabled: false,
  orientation: 'vertical',
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
})
</script>

<template>
  <Primitive :ref="forwardElement" v-bind="mergeAttrs(accordionRoot(), $attrs)">
    <slot />
  </Primitive>
</template>
