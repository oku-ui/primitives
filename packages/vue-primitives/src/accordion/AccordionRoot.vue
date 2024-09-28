<script setup lang="ts" generic="T extends AccordionType = undefined">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
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

const accordionRoot = useAccordionRoot({
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
  <Primitive v-bind="normalizeAttrs(accordionRoot.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
