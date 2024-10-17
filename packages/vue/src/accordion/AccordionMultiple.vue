<script setup lang="ts">
import type { Ref } from 'vue'
import type { AccordionMultipleEmits, AccordionMultipleProps } from './AccordionMultiple'
import { useVModel } from '@oku-ui/use-composable'
import { ref } from 'vue'
import { accordionCollapsibleProvider, accordionValueProvider } from './Accordion'
import AccordionImpl from './AccordionImpl.vue'
import { ACCORDION_MULTIPLE_NAME } from './constants'

defineOptions({
  name: ACCORDION_MULTIPLE_NAME,
})

const props = withDefaults(defineProps<AccordionMultipleProps>(), {
  defaultValue: () => [],
})
const emit = defineEmits<AccordionMultipleEmits>()

const value = useVModel(props, 'value', emit, {
  defaultValue: props.defaultValue,
  passive: (props.value === undefined) as false,
}) as Ref<typeof props.defaultValue>

accordionValueProvider({
  scope: props.scopeOkuAccordion,
  value,
  onItemOpen(itemValue: string) {
    value.value = [...value.value, itemValue]
  },
  onItemClose(itemValue: string) {
    value.value = [...value.value].filter(value => value !== itemValue)
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
    :as-child="asChild"
    :value="value"
    :default-value="defaultValue"
    :disabled="disabled"
    :orientation="orientation"
    :dir="dir"
    @keydown="(payload) => emit('keydown', payload)"
  >
    <slot />
  </AccordionImpl>
</template>
