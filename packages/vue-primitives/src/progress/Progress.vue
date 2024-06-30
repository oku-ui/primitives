<script setup lang="ts">
import { type PropType, computed, toRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { isNumber } from '../utils/is.ts'
import { DEFAULT_MAX, type ProgressProps, defaultGetValueLabel, getProgressState, isValidMaxNumber, isValidValueNumber, provideProgressContext } from './Progress.ts'

defineOptions({
  name: 'OkuProgress',
})

const props = defineProps({
  as: {
    type: [String, Object] as PropType<Required<ProgressProps>['as']>,
    required: false,
    default: undefined,
  },
  asChild: {
    type: Boolean as PropType<Required<ProgressProps>['asChild']>,
    required: false,
    default: undefined,
  },
  value: {
    type: [Number, null] as PropType<Required<ProgressProps>['value']>,
    required: false,
    validator(value, props) {
      return isNumber(props.max) && isValidValueNumber(value, props.max)
    },
    default: null,
  },
  max: {
    type: Number as PropType<Required<ProgressProps>['max']>,
    required: false,
    validator(value) {
      return isValidMaxNumber(value)
    },
    default: DEFAULT_MAX,
  },
  getValueLabel: {
    type: Function as PropType<Required<ProgressProps>['getValueLabel']>,
    required: false,
    default: defaultGetValueLabel,
  },
})

const valueLabel = computed(() => isNumber(props.value) ? props.getValueLabel(props.value, props.max) : undefined)

provideProgressContext({
  value: toRef(props, 'value'),
  max: toRef(props, 'max'),
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :aria-valuemax="max"
    :aria-valuemin="0"
    :aria-valuenow="isNumber(value) ? value : undefined"
    :aria-valuetext="valueLabel"
    role="progressbar"
    :data-state="getProgressState(value, max)"
    :data-value="value ?? undefined"
    :data-max="max"
  >
    <slot />
  </Primitive>
</template>
