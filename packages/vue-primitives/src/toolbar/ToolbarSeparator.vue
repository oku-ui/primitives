<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { type ToolbarSeparatorProps, useToolbarSeparator } from './ToolbarSeparator.ts'

defineOptions({
  name: 'ToolbarSeparator',
  inheritAttrs: false,
})

const props = defineProps<ToolbarSeparatorProps>()

const toolbarSeparator = useToolbarSeparator({
  decorative: props.decorative,
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toolbarSeparator.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
