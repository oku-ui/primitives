<script lang="ts">
export interface PrimitiveProps {
  is?: string | object
  asChild?: boolean
}
</script>

<script setup lang="ts">
import { useComponentRef } from '@oku-ui/use-composable'
import { defineExpose, defineOptions, onMounted } from 'vue'
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

const { componentRef, currentElement } = useComponentRef<HTMLDivElement | null>()

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <component
    v-bind="$attrs"
    :is="asChild ? OkuSlot : is"
    ref="componentRef"
  >
    <slot />
  </component>
</template>
