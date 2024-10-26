<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { type CollapsibleContentProps, DEFAULT_COLLAPSIBLE_CONTENT_PROPS, useCollapsibleContent } from './CollapsibleContent.ts'

defineOptions({
  name: 'CollapsibleContent',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CollapsibleContentProps>(), DEFAULT_COLLAPSIBLE_CONTENT_PROPS)

const collapsibleContent = useCollapsibleContent(convertPropsToHookProps(props))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(collapsibleContent.attrs([$attrs]))">
    <slot v-if="collapsibleContent.isOpen.value" />
  </Primitive>
</template>
