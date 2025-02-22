<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { ToggleEmits, ToggleProps } from './Toggle.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TOGGLE_PROPS, useToggle } from './Toggle.ts'

defineOptions({
  name: 'Toggle',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ToggleProps>(), DEFAULT_TOGGLE_PROPS)
const emit = defineEmits<ToggleEmits>()

const toggle = useToggle(convertPropsToHookProps(
  props,
  ['pressed', 'disabled'],
  (): Required<EmitsToHookProps<ToggleEmits>> => ({
    onUpdatePressed(value) {
      emit('update:pressed', value)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(toggle.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
