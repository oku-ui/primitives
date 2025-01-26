<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { RadioGroupRootEmits, RadioGroupRootProps } from './RadioGroupRoot.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_RADIO_GROUP_ROOT_PROPS, useRadioGroupRoot } from './RadioGroupRoot.ts'

defineOptions({
  name: 'RadioGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<RadioGroupRootProps>(), DEFAULT_RADIO_GROUP_ROOT_PROPS)
const emit = defineEmits<RadioGroupRootEmits>()

const radioGroupRoot = useRadioGroupRoot(convertPropsToHookProps(
  props,
  ['value', 'name', 'required', 'disabled', 'dir'],
  (): Required<EmitsToHookProps<RadioGroupRootEmits>> => ({
    onUpdateValue(value) {
      emit('update:value', value)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(radioGroupRoot.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
