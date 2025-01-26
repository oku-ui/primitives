<script setup lang="ts" generic="T extends AccordionType = undefined">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { AccordionRootEmits, AccordionRootProps, AccordionType } from './AccordionRoot.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_ACCORDION_ROOT_PROPS, useAccordionRoot } from './AccordionRoot.ts'

defineOptions({
  name: 'AccordionRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AccordionRootProps<T>>(), DEFAULT_ACCORDION_ROOT_PROPS)
const emit = defineEmits<AccordionRootEmits<T>>()

const accordionRoot = useAccordionRoot(convertPropsToHookProps(
  props,
  ['value', 'disabled', 'dir'],
  (): Required<EmitsToHookProps<AccordionRootEmits<T>>> => ({
    onUpdateValue(value) {
      emit('update:value', value)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(accordionRoot.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
