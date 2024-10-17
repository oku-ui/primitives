<script setup lang="ts">
import type { Ref } from 'vue'
import type { AccordionSingleEmits, AccordionSingleProps } from './AccordionSingle'
import { useVModel } from '@oku-ui/use-composable'
import { computed, ref } from 'vue'
import { accordionCollapsibleProvider, accordionValueProvider } from './Accordion'
import AccordionImpl from './AccordionImpl.vue'
import { ACCORDION_SIMPLE_NAME } from './constants'

defineOptions({
  name: ACCORDION_SIMPLE_NAME,
})

const props = withDefaults(defineProps<AccordionSingleProps>(), {
  defaultValue: '',
})
const emit = defineEmits<AccordionSingleEmits>()

const value = useVModel(props, 'value', emit, {
  defaultValue: props.defaultValue,
  passive: (props.value === undefined) as false,
}) as Ref<typeof props.defaultValue>

accordionValueProvider({
  scope: props.scopeOkuAccordion,
  value: computed(() => value.value ? [value.value] : []),
  onItemOpen(payload) {
    value.value = payload
  },
  onItemClose() {
    if (props.collapsible)
      value.value = ''
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
    :as-child="asChild"
    :value="value"
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
