<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { type CollapsibleRootEmits, type CollapsibleRootProps, useCollapsibleRoot } from './CollapsibleRoot.ts'

defineOptions({
  name: 'CollapsibleRoot',
})

const props = withDefaults(defineProps<CollapsibleRootProps>(), {
  open: undefined,
  defaultOpen: false,
})
const emit = defineEmits<CollapsibleRootEmits>()

const collapsibleRoot = useCollapsibleRoot({
  open() {
    return props.open
  },
  defaultOpen: props.defaultOpen,
  disabled() {
    return props.disabled
  },
}, {
  onUpdateOpen(value) {
    emit('update:open', value)
  },
})
</script>

<template>
  <Primitive v-bind="collapsibleRoot()">
    <slot />
  </Primitive>
</template>
