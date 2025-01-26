<script setup lang="ts">
import type { ToolbarRootProps } from './ToolbarRoot.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TOOLBAR_ROOT_PROPS, useToolbarRoot } from './ToolbarRoot.ts'

defineOptions({
  name: 'ToolbarRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToolbarRootProps>(), DEFAULT_TOOLBAR_ROOT_PROPS)

const toolbarRoot = useToolbarRoot(convertPropsToHookProps(props, ['dir']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toolbarRoot.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
