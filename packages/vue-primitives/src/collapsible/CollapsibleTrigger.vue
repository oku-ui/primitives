<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { mergeAttrs } from '../shared/index.ts'
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
  <Primitive :as="as" v-bind="mergeAttrs(collapsibleTrigger(), $attrs)">
    <slot />
  </Primitive>
</template>
