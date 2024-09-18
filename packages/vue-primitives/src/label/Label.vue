<script setup lang="ts">
import type { LabelEmits, LabelProps } from './Label.ts'
import { Primitive } from '@oku-ui/primitive'

defineOptions({
  name: 'RadixLabel',
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
  <Primitive :as="as" v-bind="label">
    <slot />
  </Primitive>
</template>
