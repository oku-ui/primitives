<script setup lang="ts">
import { useForwardRef, useId } from '@oku-ui/use-composable'
import { accordionItemProvider } from './AccordionItem.js'
import type { AccordionItemProps } from './AccordionItem.js'
import { useAccordionInject } from './AccordionImpl'
import { useAccordionValueInject, useCollapsibleScope } from './Accordion'
import { computed } from 'vue'
import { OkuCollapsible } from '@oku-ui/collapsible'
import { getState } from './utils.js'
import { ITEM_NAME } from './constants.js'

defineOptions({
  name: ITEM_NAME,
})

const props = defineProps<AccordionItemProps>()

const forwardRef = useForwardRef()
const accordionContext = useAccordionInject(ITEM_NAME, props.scopeOkuAccordion)
const valueContext = useAccordionValueInject(ITEM_NAME, props.scopeOkuAccordion)
const collapsibleScope = useCollapsibleScope(props.scopeOkuAccordion)
const triggerId = useId()

const open = computed(() => (props.value && valueContext.value.value?.includes(props.value)) || false)
const disabled = computed(() => accordionContext.disabled?.value || props.disabled)

accordionItemProvider({
  scope: props.scopeOkuAccordion,
  open,
  triggerId,
  disabled,
})
</script>

<template>
  <OkuCollapsible
    v-bind="collapsibleScope"
    :is="is"
    :ref="forwardRef"
    :as-child="asChild"
    :data-orientation="accordionContext.orientation"
    :data-state="getState(open)"
    :disabled="disabled"
    :open="open"
    @open-change="(open) => {
      if (open)
        valueContext.onItemOpen(props.value)
      else
        valueContext.onItemClose(props.value)
    }"
  >
    <slot />
  </OkuCollapsible>
</template>
