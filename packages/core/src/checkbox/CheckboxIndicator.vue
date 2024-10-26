<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { type CheckboxIndicatorProps, DEFAULT_CHECKBOX_INDICATOR_PROPS, useCheckboxIndicator } from './CheckboxIndicator.ts'

defineOptions({
  name: 'CheckboxIndicator',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CheckboxIndicatorProps>(), DEFAULT_CHECKBOX_INDICATOR_PROPS)

const checkboxIndicator = useCheckboxIndicator(convertPropsToHookProps(props))
</script>

<template>
  <Primitive
    v-if="checkboxIndicator.isPresent.value"
    v-bind="normalizeAttrs(checkboxIndicator.attrs([$attrs, { as }]))"
  >
    <slot />
  </Primitive>
</template>
