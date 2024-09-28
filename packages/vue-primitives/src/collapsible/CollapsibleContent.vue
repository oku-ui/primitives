<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type CollapsibleContentProps, useCollapsibleContent } from './CollapsibleContent.ts'

defineOptions({
  name: 'CollapsibleContent',
  inheritAttrs: false,
})

const props = defineProps<CollapsibleContentProps>()

const collapsibleContent = useCollapsibleContent({
  forceMount: props.forceMount,
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(collapsibleContent.attrs(), $attrs)">
    <slot v-if="collapsibleContent.isOpen.value" />
  </Primitive>
</template>
