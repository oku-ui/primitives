<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type RadioGroupIndicatorProps, useRadioGroupIndicator } from './RadioGroupIndicator.ts'

defineOptions({
  name: 'RadioGroupIndicator',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RadioGroupIndicatorProps>(), {
  as: 'span',
})

const radioGroupIndicator = useRadioGroupIndicator({
  forceMount: props.forceMount,
})
</script>

<template>
  <Primitive
    v-if="radioGroupIndicator.isPresent.value"
    v-bind="normalizeAttrs(radioGroupIndicator.attrs([$attrs, { as }]))"
  >
    <slot />
  </Primitive>
</template>
