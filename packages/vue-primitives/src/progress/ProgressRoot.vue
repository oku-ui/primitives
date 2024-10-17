<script setup lang="ts">
import type { PropType } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, isNumber, normalizeAttrs } from '../shared/index.ts'
import { type ProgressRootProps, useProgressRoot } from './ProgressRoot.ts'
import { DEFAULT_MAX, defaultGetValueLabel, isValidMaxNumber, isValidValueNumber } from './utils.ts'

defineOptions({
  name: 'ProgressRoot',
  inheritAttrs: false,
})

const props = defineProps({
  value: {
    type: [Number, undefined] as PropType<Required<ProgressRootProps>['value']>,
    required: false,
    validator(value, props) {
      return isNumber(props.max) && isValidValueNumber(value, props.max)
    },
    default: undefined,
  },
  max: {
    type: Number as PropType<Required<ProgressRootProps>['max']>,
    required: false,
    validator(value) {
      return isValidMaxNumber(value)
    },
    default: DEFAULT_MAX,
  },
  getValueLabel: {
    type: Function as PropType<Required<ProgressRootProps>['getValueLabel']>,
    required: false,
    default: defaultGetValueLabel,
  },
})

const progressRoot = useProgressRoot(convertPropsToHookProps(props, ['value', 'max']))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(progressRoot.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
