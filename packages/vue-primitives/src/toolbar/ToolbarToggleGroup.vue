<script setup lang="ts" generic="T extends ToggleGroupType = undefined">
import type { ToggleGroupType } from '../toggle-group/index.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { type ToolbarToggleGroupEmits, type ToolbarToggleGroupProps, useToolbarToggleGroup } from './ToolbarToggleGroup.ts'

defineOptions({
  name: 'ToolbarToggleGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToolbarToggleGroupProps<T>>(), {
  disabled: undefined,
  loop: true,
})

const emit = defineEmits<ToolbarToggleGroupEmits<T>>()

const toolbarToggleGroup = useToolbarToggleGroup({
  type: props.type,

  value() {
    return props.value
  },
  onUpdateValue(value) {
    emit('update:value', value)
  },
  defaultValue: props.defaultValue,

  disabled() {
    return props.disabled
  },
  loop: props.loop,
  orientation: props.orientation,
  dir() {
    return props.dir
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toolbarToggleGroup.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
