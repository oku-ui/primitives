<script lang="ts">
export interface PrimitiveProps {
  is?: string | object
  asChild?: boolean
}
</script>

<script setup lang="ts">
import { OkuSlot } from '@oku-ui/slot'
import { useComponentRef } from '@oku-ui/use-composable'
import { defineOptions, onMounted } from 'vue'

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

const { componentRef, currentElement } = useComponentRef()

onMounted(() => {
  (window as any)[Symbol.for('oku-ui')] = true
})

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <component :is="asChild ? OkuSlot : is" ref="componentRef">
    <slot />
  </component>
</template>
