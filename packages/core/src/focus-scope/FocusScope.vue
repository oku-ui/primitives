<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { convertPropsToHookProps, type EmitsToHookProps, normalizeAttrs } from '../shared/index.ts'
import {
  DEFAULT_FOCUS_SCOPE_PROPS,
  type FocusScopeEmits,
  type FocusScopeProps,
  useFocusScope,
} from './FocusScope.ts'

defineOptions({
  name: 'FocusScope',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<FocusScopeProps>(), DEFAULT_FOCUS_SCOPE_PROPS)
const emit = defineEmits<FocusScopeEmits>()

const focusScope = useFocusScope(convertPropsToHookProps(
  props,
  ['trapped'],
  (): Required<EmitsToHookProps<FocusScopeEmits>> => ({
    onMountAutoFocus(event) {
      emit('mountAutoFocus', event)
    },
    onUnmountAutoFocus(event) {
      emit('unmountAutoFocus', event)
    },
  }),
))
</script>

<template>
  <Primitive v-bind="normalizeAttrs(focusScope.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
