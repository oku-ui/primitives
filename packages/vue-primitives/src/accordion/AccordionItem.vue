<script setup lang="ts">
import { computed } from 'vue'
import { useId } from '../hooks/useId.ts'
import { Collapsible } from '../collapsible/index.ts'
import { type AccordionItemProps, provideAccordionItemContext } from './AccordionItem.ts'
import { useAccordionContext } from './Accordion.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'AccordionItem',
})

const props = defineProps<AccordionItemProps>()

const context = useAccordionContext()
const open = computed(() => (props.value && context.value.value.includes(props.value)) || false)
const disabled = computed(() => context.disabled?.value || props.disabled)

function onUpdateOpen(open: boolean) {
  if (open)
    context.onItemOpen(props.value)
  else
    context.onItemClose(props.value)
}

provideAccordionItemContext({
  open,
  disabled,
  triggerId: `${context.id}-${props.value}`,
})
</script>

<template>
  <Collapsible
    :as="as"
    :as-child="asChild"
    :data-orientation="context.orientation"
    :data-state="getState(open)"
    :disabled="disabled"
    :open="open"
    @update:open="onUpdateOpen"
  >
    <slot />
  </Collapsible>
</template>
