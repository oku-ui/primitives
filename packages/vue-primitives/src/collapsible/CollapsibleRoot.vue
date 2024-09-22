<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type CollapsibleRootEmits, type CollapsibleRootProps, useCollapsibleRoot } from './CollapsibleRoot.ts'

defineOptions({
  name: 'CollapsibleRoot',
  inheritAttrs: false,
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
  onUpdateOpen(value) {
    emit('update:open', value)
  },
  defaultOpen: props.defaultOpen,
  disabled() {
    return props.disabled
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(collapsibleRoot.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
