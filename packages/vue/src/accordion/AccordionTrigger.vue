<script setup lang="ts">
import { useAccordionItemInject } from './AccordionItem'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { useAccordionCollapsibleInject, useCollapsibleScope } from './Accordion'
import { useAccordionInject } from './AccordionImpl'
import type { AccordionTriggerEmits, AccordionTriggerProps } from './AccordionTrigger'
import { computed } from 'vue'
import { OkuCollapsibleTrigger } from '@oku-ui/collapsible'
import { CollectionItemSlot } from './AccordionCollections'
import { ACCORDION_NAME, TRIGGER_NAME } from './constants'

defineOptions({
  name: TRIGGER_NAME,
  inheritAttrs: false,
})

const props = defineProps<AccordionTriggerProps>()
const emit = defineEmits<AccordionTriggerEmits>()

const [$el, set$el] = usePrimitiveElement()
const accordionInject = useAccordionInject(ACCORDION_NAME, props.scopeOkuAccordion)
const itemContext = useAccordionItemInject(TRIGGER_NAME, props.scopeOkuAccordion)
const collapsibleInject = useAccordionCollapsibleInject(TRIGGER_NAME, props.scopeOkuAccordion)
const collapsibleScope = useCollapsibleScope(props.scopeOkuAccordion)

const disabled = computed(() => (itemContext.open?.value && !collapsibleInject.collapsible.value) || undefined)

defineExpose({
  $el,
})
</script>

<template>
  <CollectionItemSlot :scope="scopeOkuAccordion">
    <OkuCollapsibleTrigger
      :is="is"
      v-bind="{ ...$attrs, ...collapsibleScope }"
      :id="itemContext.triggerId"
      :ref="set$el"
      :as-child="asChild"
      :aria-disabled="disabled"
      :data-orientation="accordionInject.orientation"
      @click="(e) => emit('click', e)"
    >
      <slot />
    </OkuCollapsibleTrigger>
  </CollectionItemSlot>
</template>
