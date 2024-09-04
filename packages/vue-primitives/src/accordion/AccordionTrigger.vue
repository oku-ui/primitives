<script setup lang="ts">
import { shallowRef } from 'vue'
import { CollapsibleTrigger } from '../collapsible/index.ts'
import { ITEM_DATA_ATTR } from '../collection/Collection.ts'
import { useForwardElement } from '../hooks/index.ts'
import { Collection, useAccordionContext } from './AccordionRoot.ts'
import { useAccordionItemContext } from './AccordionItem.ts'

defineOptions({
  name: 'AccordionTrigger',
})

const $el = shallowRef<HTMLButtonElement>()
const forwardElement = useForwardElement($el)

Collection.useCollectionItem($el, undefined)

const accordionContext = useAccordionContext('AccordionTrigger')
const itemContext = useAccordionItemContext('AccordionHeader')
</script>

<template>
  <CollapsibleTrigger
    :id="itemContext.triggerId"
    :ref="forwardElement"
    :aria-disabled="(itemContext.open.value && !accordionContext.collapsible) || undefined"
    :data-orientation="accordionContext.orientation"
    :[ITEM_DATA_ATTR]="true"
  >
    <slot />
  </CollapsibleTrigger>
</template>
