<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { type RadioGroupItemProps, useRadioGroupItem } from './RadioGroupItem.ts'

defineOptions({
  name: 'RadioGroupItem',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RadioGroupItemProps>(), {
  as: 'button',
})

const radioGroupItem = useRadioGroupItem({
  value() {
    return props.value
  },
  name() {
    return props.name
  },
  disabled() {
    return props.disabled
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(radioGroupItem.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
