<script setup lang="ts">
import { useId } from '@oku-ui/use-composable'
import { accordionItemProvider } from './AccordionItem.ts'
import type { AccordionItemProps } from './AccordionItem.ts'
import { useAccordionInject } from './AccordionImpl'
import { useAccordionValueInject, useCollapsibleScope } from './Accordion'
import { computed } from 'vue'
import { OkuCollapsible } from '@oku-ui/collapsible'
import { getState } from './utils.ts'
import { ITEM_NAME } from './constants.ts'

defineOptions({
  name: ITEM_NAME,
})

const props = defineProps<AccordionItemProps>()

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
    :as-child="asChild"
    :data-orientation="accordionContext.orientation"
    :data-state="getState(open)"
    :disabled="disabled"
    :open="open"
    @update:open="(open) => {
      if (open)
        valueContext.onItemOpen(props.value)
      else
        valueContext.onItemClose(props.value)
    }"
  >
    <slot />
  </OkuCollapsible>
</template>
