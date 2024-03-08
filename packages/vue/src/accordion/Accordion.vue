<script setup lang="ts">
import { CollectionProvider } from './AccordionCollections'
import { ACCORDION_NAME } from './constants'
import type { AccordionEmits, AccordionProps } from './Accordion'
import AccordionMultiple from './AccordionMultiple.vue'
import AccordionSingle from './AccordionSingle.vue'
import { usePrimitiveElement } from '@oku-ui/use-composable'

defineOptions({
  name: ACCORDION_NAME,
  inheritAttrs: false,
})

const props = defineProps<AccordionProps>()
const emit = defineEmits<AccordionEmits>()

const [$el, set$el] = usePrimitiveElement<HTMLElement>()

defineExpose({
  $el,
})
</script>

<template>
  <CollectionProvider>
    <AccordionSingle
      v-bind="$attrs"
      :is="is"
      v-if="props.type === 'single'"
      :ref="set$el"
      :as-child="asChild"
      :value="value as string"
      :default-value="defaultValue as string"
      :collapsible="collapsible"
      :disabled="disabled"
      :orientation="orientation"
      :dir="dir"
      @update:value="(payload) => emit('update:value', payload)"
      @keydown="(payload) => emit('keydown', payload)"
    >
      <slot />
    </AccordionSingle>

    <AccordionMultiple
      v-bind="$attrs"
      :is="is"
      v-else
      :ref="set$el"
      :as-child="asChild"
      :value="value as string[]"
      :default-value="defaultValue as string[]"
      :disabled="disabled"
      :orientation="orientation"
      :dir="dir"
      @update:value="(payload) => emit('update:value', payload)"
      @keydown="(payload) => emit('keydown', payload)"
    >
      <slot />
    </AccordionMultiple>
  </CollectionProvider>
</template>
