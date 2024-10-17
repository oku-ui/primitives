<script setup lang="ts">
import type { AccordionTriggerEmits, AccordionTriggerProps } from './AccordionTrigger.ts'
import { useCollapsibleContext } from '@oku-ui/collapsible'
import { DATA_COLLECTION_ITEM } from '@oku-ui/collection'
import { useForwardElement } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/shared'
import { shallowRef } from 'vue'
import { useAccordionItemContext } from './AccordionItem.ts'
import { useAccordionContext } from './AccordionRoot.ts'
import { getState } from './utils.ts'

defineOptions({
  name: 'AccordionTrigger',
})

withDefaults(defineProps<AccordionTriggerProps>(), {
  as: 'button',
})
const emit = defineEmits<AccordionTriggerEmits>()

const $el = shallowRef<HTMLButtonElement>()
const forwardElement = useForwardElement($el)

const accordionContext = useAccordionContext('AccordionTrigger')
const itemContext = useAccordionItemContext('AccordionHeader')

const collapsibleContext = useCollapsibleContext('CollapsibleTrigger')

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, collapsibleContext.onOpenToggle)
</script>

<template>
  <Primitive
    :id="itemContext.triggerId"
    :ref="forwardElement"
    :as="as"
    :aria-disabled="(itemContext.open.value && !accordionContext.collapsible) || undefined"
    :data-orientation="accordionContext.orientation"
    :[DATA_COLLECTION_ITEM]="true"

    type="button"
    :aria-controls="collapsibleContext.contentId"
    :aria-expanded="itemContext.open.value || false"
    :data-state="getState(itemContext.open.value)"
    :data-disabled="itemContext.disabled.value ? '' : undefined"
    :disabled="itemContext.disabled.value"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>
