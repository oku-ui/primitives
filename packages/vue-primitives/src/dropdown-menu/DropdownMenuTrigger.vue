<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type DropdownMenuTriggerProps, useDropdownMenuTrigger } from './DropdownMenuTrigger.ts'

defineOptions({
  name: 'DropdownMenuTrigger',
})

const props = withDefaults(defineProps<DropdownMenuTriggerProps>(), {
  as: 'button',
  disabled: undefined,
})

const dropdownMenuTrigger = useDropdownMenuTrigger({
  disabled() {
    return props.disabled
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(dropdownMenuTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
