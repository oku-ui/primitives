<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { type AccordionItemProps, DEFAULT_ACCORDION_ITEM_PROPS, useAccordionItem } from './AccordionItem.ts'

defineOptions({
  name: 'AccordionItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AccordionItemProps>(), DEFAULT_ACCORDION_ITEM_PROPS)

const accordionItem = useAccordionItem(convertPropsToHookProps(props, ['value', 'disabled']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(accordionItem.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
