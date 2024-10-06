<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type ToolbarToggleItemProps, useToolbarToggleItem } from './ToolbarToggleItem.ts'

defineOptions({
  name: 'ToolbarToggleItem',
  inheritAttrs: false,
})

const prosp = withDefaults(defineProps<ToolbarToggleItemProps>(), {
  disabled: undefined,
})

const toolbarToggleItem = useToolbarToggleItem({
  value() {
    return prosp.value
  },
  disabled() {
    return prosp.disabled
  },
})
</script>

<template>
  <Primitive
    v-bind="normalizeAttrs(toolbarToggleItem.attrs([$attrs]))"
  >
    <slot />
  </Primitive>
</template>
