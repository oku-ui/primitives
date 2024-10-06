<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type ToolbarButtonProps, useToolbarButton } from './ToolbarButton.ts'

defineOptions({
  name: 'ToolbarButton',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToolbarButtonProps>(), {
  as: 'button',
  disabled: undefined,
})

const toolbarButton = useToolbarButton({
  disabled() {
    return props.disabled
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toolbarButton.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
