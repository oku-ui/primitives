<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { type CollapsibleTriggerEmits, type CollapsibleTriggerProps, useCollapsibleTrigger } from './CollapsibleTrigger.ts'

defineOptions({
  name: 'CollapsibleTrigger',
})

withDefaults(defineProps<CollapsibleTriggerProps>(), {
  as: 'button',
})
const emit = defineEmits<CollapsibleTriggerEmits>()

const collapsibleTrigger = useCollapsibleTrigger({
  onClick(event) {
    emit('click', event)
  },
})
</script>

<template>
  <Primitive :as="as" v-bind="collapsibleTrigger()">
    <slot />
  </Primitive>
</template>
