<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { type ToolbarRootProps, useToolbarRoot } from './ToolbarRoot.ts'

defineOptions({
  name: 'ToolbarRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToolbarRootProps>(), {
  orientation: 'horizontal',
  loop: true,
})

const toolbarRoot = useToolbarRoot({
  orientation: props.orientation,
  loop: props.loop,
  dir() {
    return props.dir
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toolbarRoot.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
