<script setup lang="ts">
import { computed, ref } from 'vue'
import { accordionCollapsibleProvider, accordionValueProvider } from './Accordion.js'
import type { AccordionMultipleEmits, AccordionMultipleProps } from './AccordionMultiple.js'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'
import AccordionImpl from './AccordionImpl.vue'
import { ACCORDION_MULTIPLE_NAME } from './constants.js'

defineOptions({
  name: ACCORDION_MULTIPLE_NAME,
})

const props = defineProps<AccordionMultipleProps>()
const emit = defineEmits<AccordionMultipleEmits>()

const computedOpen = computed(() => props.modelValue !== undefined ? props.modelValue : undefined)

const [state, updateValue] = useControllable({
  prop: computedOpen,
  defaultProp: computed(() => props.defaultValue),
  onChange: (result) => {
    emit('update:modelValue', result)
  },
})

const forwardRef = useForwardRef()

accordionValueProvider({
  scope: props.scopeOkuAccordion,
  value: state,
  onItemOpen: (itemValue: string) => {
    updateValue([...state.value, itemValue])
  },
  onItemClose: (itemValue: string) => {
    updateValue([...state.value].filter(value => value !== itemValue))
  },
})

accordionCollapsibleProvider({
  scope: props.scopeOkuAccordion,
  collapsible: ref(true),
})
</script>

<template>
  <AccordionImpl
    :is="is"
    :ref="forwardRef"
    :as-child="asChild"
    :model-value="modelValue"
    :default-value="defaultValue"
    :disabled="disabled"
    :orientation="orientation"
    :dir="dir"
    @keydown="(payload) => emit('keydown', payload)"
  >
    <slot />
  </AccordionImpl>
</template>
