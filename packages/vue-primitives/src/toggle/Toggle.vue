<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type ToggleEmits, type ToggleProps, useToggle } from './Toggle.ts'

defineOptions({
  name: 'Toggle',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToggleProps>(), {
  pressed: undefined,
  as: 'button',
  disabled: undefined,
})
const emit = defineEmits<ToggleEmits>()

const toggle = useToggle({
  pressed() {
    return props.pressed
  },
  onUpdatePressed(checked) {
    emit('update:pressed', checked)
  },
  defaultPressed: props.defaultPressed,
  disabled() {
    return props.disabled
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toggle.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
