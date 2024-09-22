<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type LabelEmits, type LabelProps, useLabel } from './Label.ts'

defineOptions({
  name: 'RadixLabel',
  inheritAttrs: false,
})

withDefaults(defineProps<LabelProps>(), {
  as: 'label',
})
const emit = defineEmits<LabelEmits>()

const label = useLabel({
  onMousedown(event) {
    emit('mousedown', event)
  },
})
</script>

<template>
  <Primitive :as="as" v-bind="normalizeAttrs(label.attrs(), $attrs)">
    <slot />
  </Primitive>
</template>
