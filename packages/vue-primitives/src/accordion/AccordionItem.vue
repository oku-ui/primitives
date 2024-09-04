<script setup lang="ts">
import { computed } from 'vue'
import { CollapsibleRoot } from '../collapsible/index.ts'
import { useId } from '../hooks/index.ts'
import { type AccordionItemProps, provideAccordionItemContext } from './AccordionItem.ts'
import { useAccordionContext } from './AccordionRoot.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'AccordionItem',
})

const props = defineProps<AccordionItemProps>()

const context = useAccordionContext('AccordionItem')
const open = computed(() => (props.value && context.value.value.includes(props.value)) || false)
const disabled = computed(() => context.disabled() || props.disabled)

function onUpdateOpen(open: boolean) {
  if (open)
    context.onItemOpen(props.value)
  else
    context.onItemClose(props.value)
}

provideAccordionItemContext({
  open,
  disabled,
  triggerId: useId(),
})
</script>

<template>
  <CollapsibleRoot
    :data-orientation="context.orientation"
    :data-state="getState(open)"
    :disabled="disabled"
    :open="open"
    @update:open="onUpdateOpen"
  >
    <slot />
  </CollapsibleRoot>
</template>
