<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type ContextMenuTriggerProps, useContextMenuTrigger } from './ContextMenuTrigger.ts'

defineOptions({
  name: 'ContextMenuTrigger',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ContextMenuTriggerProps>(), {
  as: 'span',
  disabled: false,
})

const contextMenuTrigger = useContextMenuTrigger({
  disabled() {
    return props.disabled
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(contextMenuTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
