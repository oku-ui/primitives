<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TOOLBAR_SEPARATOR_PROPS, type ToolbarSeparatorProps, useToolbarSeparator } from './ToolbarSeparator.ts'

defineOptions({
  name: 'ToolbarSeparator',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToolbarSeparatorProps>(), DEFAULT_TOOLBAR_SEPARATOR_PROPS)

const toolbarSeparator = useToolbarSeparator(convertPropsToHookProps(props))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toolbarSeparator.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
