<script setup lang="ts" generic="T extends ToggleGroupType = undefined">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { ToggleGroupEmits, ToggleGroupProps, ToggleGroupType } from './ToggleGroupRoot.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import {
  DEFAULT_TOGGLE_GROUP_PROPS,

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
