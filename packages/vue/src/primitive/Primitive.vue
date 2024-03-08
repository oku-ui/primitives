<script lang="ts">
export interface PrimitiveProps {
  is?: string | object
  asChild?: boolean
}
</script>

<script setup lang="ts">
import { defineOptions, onMounted } from 'vue'
import { OkuSlot } from '@oku-ui/slot'

defineOptions({
  name: 'OkuPrimitive',
})

withDefaults(
  defineProps<PrimitiveProps>(),
  {
    is: 'div',
    asChild: false,
  },
)

onMounted(() => {
  (window as any)[Symbol.for('oku-ui')] = true
})
</script>

<template>
  <component :is="asChild ? OkuSlot : is">
    <slot />
  </component>
</template>
