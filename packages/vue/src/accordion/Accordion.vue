<script setup lang="ts">
import { CollectionProvider } from './AccordionCollections.js'
import { ACCORDION_NAME } from './constants.js'
import type { AccordionEmits, AccordionProps } from './Accordion.js'
import AccordionMultiple from './AccordionMultiple.vue'
import AccordionSingle from './AccordionSingle.vue'

defineOptions({
  name: ACCORDION_NAME,
  inheritAttrs: false,
})

const props = defineProps<AccordionProps>()
const emit = defineEmits<AccordionEmits>()

if (props.type) {
  const value = props.modelValue || props.defaultValue
  if (props.type && !['single', 'multiple'].includes(props.type)) {
    throw new Error(
      'Invalid prop `type` supplied to `Accordion`. Expected one of `single | multiple`.',
    )
  }
  if (props.type === 'multiple' && typeof value === 'string') {
    throw new Error(
      'Invalid prop `type` supplied to `Accordion`. Expected `single` when `defaultValue` or `value` is type `string`.',
    )
  }
  if (props.type === 'single' && Array.isArray(value)) {
    throw new Error(
      'Invalid prop `type` supplied to `Accordion`. Expected `multiple` when `defaultValue` or `value` is type `string[]`.',
    )
  }
}
</script>

<template>
  <CollectionProvider>
    <AccordionSingle
      v-bind="$attrs"
      :is="is"
      v-if="props.type === 'single'"
      :as-child="asChild"
      :model-value="modelValue as string"
      :default-value="defaultValue as string"
      :collapsible="collapsible"
      :disabled="disabled"
      :orientation="orientation"
      :dir="dir"
      @update:model-value="(payload) => emit('update:modelValue', payload)"
      @keydown="(payload) => emit('keydown', payload)"
    >
      <slot />
    </AccordionSingle>

    <AccordionMultiple
      v-bind="$attrs"
      :is="is"
      v-else
      :as-child="asChild"
      :model-value="modelValue as string[]"
      :default-value="defaultValue as string[]"
      :disabled="disabled"
      :orientation="orientation"
      :dir="dir"
      @update:model-value="(payload) => emit('update:modelValue', payload)"
      @keydown="(payload) => emit('keydown', payload)"
    >
      <slot />
    </AccordionMultiple>
  </CollectionProvider>
</template>
