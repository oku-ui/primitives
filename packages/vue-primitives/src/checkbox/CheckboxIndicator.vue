<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type CheckboxIndicatorProps, useCheckboxIndicator } from './CheckboxIndicator.ts'

defineOptions({
  name: 'CheckboxIndicator',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CheckboxIndicatorProps>(), {
  as: 'span',
})

const checkboxIndicator = useCheckboxIndicator({
  forceMount: props.forceMount,
})
</script>

<template>
  <Primitive
    v-if="checkboxIndicator.isPresent.value"
    :as="as"
    v-bind="normalizeAttrs(checkboxIndicator.attrs(), $attrs)"
  >
    <slot />
  </Primitive>
</template>
