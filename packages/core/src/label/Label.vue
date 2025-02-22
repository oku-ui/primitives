<script setup lang="ts">
import type { EmitsToHookProps } from '../shared/index.ts'
import type { LabelEmits, LabelProps } from './Label.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_LABEL_PROPS, useLabel } from './Label.ts'

defineOptions({
  name: 'RadixLabel',
  inheritAttrs: false,
})

withDefaults(defineProps<LabelProps>(), DEFAULT_LABEL_PROPS)
const emit = defineEmits<LabelEmits>()

const label = useLabel({
  onMousedown(event) {
    emit('mousedown', event)
  },
} satisfies Required<EmitsToHookProps<LabelEmits>>)
</script>

<template>
  <Primitive v-bind="normalizeAttrs(label.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
