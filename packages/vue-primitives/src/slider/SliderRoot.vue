<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { type SliderRootEmits, type SliderRootProps, useSliderRoot } from './SliderRoot.ts'

defineOptions({
  name: 'SliderRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SliderRootProps>(), {
  as: 'span',
  name: undefined,
  disabled: false,
  orientation: 'horizontal',
  dir: undefined,
  min: 0,
  max: 100,
  step: 1,
  minStepsBetweenThumbs: 0,
  value: undefined,
  defaultValue: undefined,
  inverted: false,
})

const emit = defineEmits<SliderRootEmits>()

const sliderRoot = useSliderRoot({
  value() {
    return props.value
  },
  onUpdateValue(value) {
    emit('update:value', value)
  },
  defaultValue: props.defaultValue,
  name() {
    return props.name
  },
  disabled() {
    return props.disabled
  },
  orientation: props.orientation,
  dir() {
    return props.dir
  },
  min() {
    return props.min
  },
  max() {
    return props.max
  },
  step() {
    return props.step
  },
  minStepsBetweenThumbs() {
    return props.minStepsBetweenThumbs
  },
  inverted() {
    return props.inverted
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(sliderRoot.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
