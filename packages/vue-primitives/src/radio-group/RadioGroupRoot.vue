<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type RadioGroupRootEmits, type RadioGroupRootProps, useRadioGroupRoot } from './RadioGroupRoot.ts'

defineOptions({
  name: 'RadioGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RadioGroupRootProps>(), {
  disabled: false,
  required: false,
  defaultValue: undefined,
  loop: true,
})
const emit = defineEmits<RadioGroupRootEmits>()

const radioGroupRoot = useRadioGroupRoot({
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
  required() {
    return props.required
  },
  disabled() {
    return props.disabled
  },
  orientation: props.orientation,
  loop: props.loop,
  dir() {
    return props.dir
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(radioGroupRoot.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
