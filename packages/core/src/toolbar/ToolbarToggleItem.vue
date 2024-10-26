<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TOOLBAR_TOGGLE_ITEM_PROPS, type ToolbarToggleItemProps, useToolbarToggleItem } from './ToolbarToggleItem.ts'

defineOptions({
  name: 'ToolbarToggleItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToolbarToggleItemProps>(), DEFAULT_TOOLBAR_TOGGLE_ITEM_PROPS)

const toolbarToggleItem = useToolbarToggleItem(convertPropsToHookProps(props, ['value', 'disabled']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toolbarToggleItem.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
