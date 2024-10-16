<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TOOLBAR_BUTTON_PROPS, type ToolbarButtonProps, useToolbarButton } from './ToolbarButton.ts'

defineOptions({
  name: 'ToolbarButton',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToolbarButtonProps>(), DEFAULT_TOOLBAR_BUTTON_PROPS)

const toolbarButton = useToolbarButton(convertPropsToHookProps(props, ['disabled']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toolbarButton.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
