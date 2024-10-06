<script setup lang="ts" generic="T extends ToggleGroupType = undefined">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type ToggleGroupEmits, type ToggleGroupProps, type ToggleGroupType, useToggleGroup } from './ToggleGroupRoot.ts'

defineOptions({
  name: 'ToggleGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToggleGroupProps<T>>(), {
  disabled: undefined,
  rovingFocus: true,
  loop: true,
})
const emit = defineEmits<ToggleGroupEmits<T>>()

const toggleGroup = useToggleGroup({
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
  rovingFocus: props.rovingFocus,
  loop: props.loop,
  orientation: props.orientation,
  dir() {
    return props.dir
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toggleGroup.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
