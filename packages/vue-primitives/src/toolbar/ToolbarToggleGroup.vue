<script setup lang="ts" generic="T extends ToggleGroupType = undefined">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { ToggleGroupType } from '../toggle-group/index.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TOOLBAR_TOGGLE_GROUP_PROPS, type ToolbarToggleGroupEmits, type ToolbarToggleGroupProps, useToolbarToggleGroup } from './ToolbarToggleGroup.ts'

defineOptions({
  name: 'ToolbarToggleGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToolbarToggleGroupProps<T>>(), DEFAULT_TOOLBAR_TOGGLE_GROUP_PROPS)

const emit = defineEmits<ToolbarToggleGroupEmits<T>>()

const toolbarToggleGroup = useToolbarToggleGroup(convertPropsToHookProps(
  props,
  ['value', 'disabled', 'dir'],
  (): Required<EmitsToHookProps<ToolbarToggleGroupEmits<T>>> => ({
    onUpdateValue(value) {
      emit('update:value', value)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toolbarToggleGroup.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
