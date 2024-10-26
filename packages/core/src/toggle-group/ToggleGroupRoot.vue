<script setup lang="ts" generic="T extends ToggleGroupType = undefined">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import {
  DEFAULT_TOGGLE_GROUP_PROPS,
  type ToggleGroupEmits,
  type ToggleGroupProps,
  type ToggleGroupType,
  useToggleGroup,
} from './ToggleGroupRoot.ts'

defineOptions({
  name: 'ToggleGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToggleGroupProps<T>>(), DEFAULT_TOGGLE_GROUP_PROPS)
const emit = defineEmits<ToggleGroupEmits<T>>()

const toggleGroup = useToggleGroup(convertPropsToHookProps(
  props,
  ['value', 'disabled', 'dir'],
  (): Required<EmitsToHookProps<ToggleGroupEmits<T>>> => ({
    onUpdateValue(value) {
      emit('update:value', value)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toggleGroup.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
