<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type CollapsibleTriggerProps, useCollapsibleTrigger } from './CollapsibleTrigger.ts'

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
  <Primitive :as="as" v-bind="normalizeAttrs(collapsibleTrigger(), $attrs)">
    <slot />
  </Primitive>
</template>
