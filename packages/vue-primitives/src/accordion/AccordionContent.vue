<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { type AccordionContentProps, DEFAULT_ACCORDION_CONTENT_PROPS, useAccordionContent } from './AccordionContent.ts'

defineOptions({
  name: 'AccordionContent',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AccordionContentProps>(), DEFAULT_ACCORDION_CONTENT_PROPS)

const accordionContent = useAccordionContent(convertPropsToHookProps(props))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(accordionContent.attrs([$attrs]))">
    <slot v-if="accordionContent.isOpen.value" />
  </Primitive>
</template>
