<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/typeUtils.ts'
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps } from '../shared/convertPropsToHookProps.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_SWITCH_ROOT_PROPS, type SwitchRootEmits, type SwitchRootProps, useSwitchRoot } from './SwitchRoot.ts'

defineOptions({
  name: 'SwitchRoot',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SwitchRootProps>(), DEFAULT_SWITCH_ROOT_PROPS)
const emit = defineEmits<SwitchRootEmits>()

const switchRoot = useSwitchRoot(convertPropsToHookProps(
  props,
  ['checked', 'disabled', 'required', 'value', 'name'],
  (): Required<EmitsToHookProps<SwitchRootEmits>> => ({
    onUpdateChecked(checked) {
      emit('update:checked', checked)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(switchRoot.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
