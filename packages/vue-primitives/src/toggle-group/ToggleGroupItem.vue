<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type ToggleGroupItemProps, useToggleGroupItem } from './ToggleGroupItem.ts'

defineOptions({
  name: 'ToggleGroupItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToggleGroupItemProps>(), {
  as: 'button',
  disabled: undefined,
})

const toggleGroupItem = useToggleGroupItem({
  value() {
    return props.value
  },
  disabled() {
    return props.disabled
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toggleGroupItem.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
