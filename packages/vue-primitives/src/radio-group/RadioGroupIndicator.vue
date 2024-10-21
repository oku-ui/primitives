<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_RADIO_GROUP_INDICATOR_PROPS, type RadioGroupIndicatorProps, useRadioGroupIndicator } from './RadioGroupIndicator.ts'

defineOptions({
  name: 'RadioGroupIndicator',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RadioGroupIndicatorProps>(), DEFAULT_RADIO_GROUP_INDICATOR_PROPS)

const radioGroupIndicator = useRadioGroupIndicator(convertPropsToHookProps(props))
</script>

<template>
  <Primitive
    v-if="radioGroupIndicator.isPresent.value"
    v-bind="normalizeAttrs(radioGroupIndicator.attrs([$attrs, { as }]))"
  >
    <slot />
  </Primitive>
</template>
