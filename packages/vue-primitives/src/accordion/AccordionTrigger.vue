<script setup lang="ts">
import type { AccordionTriggerEmits, AccordionTriggerProps } from './AccordionTrigger.ts'
import { shallowRef } from 'vue'
import { useCollapsibleContext } from '../collapsible/index.ts'
import { DATA_COLLECTION_ITEM } from '../collection/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
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

const context = useCollapsibleContext('CollapsibleTrigger')

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, context.onOpenToggle)
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
    :aria-controls="context.contentId"
    :aria-expanded="context.open.value || false"
    :data-state="getState(context.open.value)"
    :data-disabled="context.disabled() ? '' : undefined"
    :disabled="context.disabled()"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>
