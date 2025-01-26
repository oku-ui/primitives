<script setup lang="ts">
import type { CollapsibleTriggerProps } from './CollapsibleTrigger.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { useCollapsibleTrigger } from './CollapsibleTrigger.ts'

defineOptions({
  name: 'CollapsibleTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<CollapsibleTriggerProps>(), {
  as: 'button',
})
const collapsibleTrigger = useCollapsibleTrigger()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(collapsibleTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
