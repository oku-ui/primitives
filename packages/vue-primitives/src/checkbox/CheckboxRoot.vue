
<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type CheckboxRootEmits, type CheckboxRootProps, useCheckboxRoot } from './CheckboxRoot.ts'

defineOptions({
  name: 'Checkbox',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CheckboxRootProps>(), {
  checked: undefined,
  defaultChecked: false,
  value: 'on',
  as: 'button',
})

const emit = defineEmits<CheckboxRootEmits>()

const checkboxRoot = useCheckboxRoot({
  checked() {
    return props.checked
  },
  onUpdateChecked(checked) {
    emit('update:checked', checked)
  },
  defaultChecked: props.defaultChecked,
  disabled() {
    return props.disabled
  },
  required() {
    return props.required
  },
  value() {
    return props.value
  },
  name() {
    return props.name
  },
})
</script>

<template>
  <Primitive :as="as" v-bind="normalizeAttrs(checkboxRoot.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
