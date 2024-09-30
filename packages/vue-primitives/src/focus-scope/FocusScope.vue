
<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import {
  type FocusScopeEmits,
  type FocusScopeProps,
  useFocusScope,
} from './FocusScope.ts'

defineOptions({
  name: 'FocusScope',
  inheritAttrs: false,
})

const props = defineProps<FocusScopeProps>()
const emit = defineEmits<FocusScopeEmits>()

const focusScope = useFocusScope({
  loop: props.loop,
  trapped: props.trapped,
  onMountAutoFocus(event) {
    emit('mountAutoFocus', event)
  },
  onUnmountAutoFocus(event) {
    emit('unmountAutoFocus', event)
  },
})
</script>

<template>
  <Primitive v-bind="normalizeAttrs(focusScope.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
