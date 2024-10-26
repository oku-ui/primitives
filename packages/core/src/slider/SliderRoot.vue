<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_SLIDER_ROOT_PROPS, type SliderRootEmits, type SliderRootProps, useSliderRoot } from './SliderRoot.ts'

defineOptions({
  name: 'SliderRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SliderRootProps>(), DEFAULT_SLIDER_ROOT_PROPS)

const emit = defineEmits<SliderRootEmits>()

const sliderRoot = useSliderRoot(convertPropsToHookProps(props, [
  'value',
  'defaultValue',
  'name',
  'disabled',
  'dir',
  'min',
  'max',
  'step',
  'minStepsBetweenThumbs',
], (): Required<EmitsToHookProps<SliderRootEmits>> => ({
  onUpdateValue(value) {
    emit('update:value', value)
  },
  onValueCommit(value) {
    emit('valueCommit', value)
  },
})))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(sliderRoot.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
