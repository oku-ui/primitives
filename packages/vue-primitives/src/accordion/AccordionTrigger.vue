<script setup lang="ts">
import { shallowRef } from 'vue'
import { CollapsibleTrigger } from '../collapsible/index.ts'
import { ITEM_DATA_ATTR } from '../collection/Collection.ts'
import { forwardRef } from '../utils/vue.ts'
import { Collection, useAccordionContext } from './Accordion.ts'
import type { AccordionTriggerProps } from './AccordionTrigger.ts'
import { useAccordionItemContext } from './AccordionItem.ts'

defineOptions({
  name: 'AccordionTrigger',
})

defineProps<AccordionTriggerProps>()
const $el = shallowRef<HTMLButtonElement>()
const forwardedRef = forwardRef($el)

Collection.useCollectionItem($el, undefined)

const accordionContext = useAccordionContext()
const itemContext = useAccordionItemContext()
</script>

<template>
  <CollapsibleTrigger
    :id="itemContext.triggerId"
    :ref="forwardedRef"
    :as="as"
    :as-child="asChild"
    :aria-disabled="(itemContext.open.value && !accordionContext.collapsible) || undefined"
    :data-orientation="accordionContext.orientation"
    :[ITEM_DATA_ATTR]="true"
  >
    <slot />
  </CollapsibleTrigger>
</template>
