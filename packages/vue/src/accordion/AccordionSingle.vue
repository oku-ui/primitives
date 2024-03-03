<script setup lang="ts">
import { computed, ref } from 'vue'
import { accordionCollapsibleProvider, accordionValueProvider } from './Accordion.js'
import type { AccordionSingleEmits, AccordionSingleProps } from './AccordionSingle.js'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'
import AccordionImpl from './AccordionImpl.vue'
import { ACCORDION_SIMPLE_NAME } from './constants.js'

defineOptions({
  name: ACCORDION_SIMPLE_NAME,
})

const props = defineProps<AccordionSingleProps>()
const emit = defineEmits<AccordionSingleEmits>()

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
  value: computed(() => state.value ? [state.value] : []),
  onItemOpen: (e) => {
    updateValue(e)
  },
  onItemClose: () => {
    if (props.collapsible)
      updateValue('')
  },
})

accordionCollapsibleProvider({
  scope: props.scopeOkuAccordion,
  collapsible: ref(props.collapsible || false),
})
</script>

<template>
  <AccordionImpl
    :is="is"
    :ref="forwardRef"
    :as-child="asChild"
    :model-value="modelValue"
    :default-value="defaultValue"
    :collapsible="collapsible"
    :disabled="disabled"
    :orientation="orientation"
    :dir="dir"
    @keydown="(payload) => emit('keydown', payload)"
  >
    <slot />
  </AccordionImpl>
</template>
