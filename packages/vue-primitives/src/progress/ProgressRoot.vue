<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { isNumber } from '../shared/index.ts'
import { DEFAULT_MAX, defaultGetValueLabel, getProgressState, isValidMaxNumber, isValidValueNumber, type ProgressRootProps, provideProgressContext } from './ProgressRoot.ts'

defineOptions({
  name: 'ProgressRoot',
})

const props = defineProps({
  value: {
    type: [Number, null] as PropType<Required<ProgressRootProps>['value']>,
    required: false,
    validator(value, props) {
      return isNumber(props.max) && isValidValueNumber(value, props.max)
    },
    default: null,
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

const valueLabel = computed(() => isNumber(props.value) ? props.getValueLabel(props.value, props.max) : undefined)

provideProgressContext({
  value() {
    return props.value
  },
  max() {
    return props.max
  },
})
</script>

<template>
  <Primitive
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
