<script lang="ts">
export interface PrimitiveProps {
  is?: string | object
  asChild?: boolean
}
</script>

<script setup lang="ts">
import { useComponentRef } from '@oku-ui/use-composable'
import { defineExpose, mergeProps, onMounted, useAttrs } from 'vue'
import { OkuSlot } from '@oku-ui/slot'

defineOptions({
  name: 'OkuPrimitive',
  inheritAttrs: false,
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

const attrs = useAttrs()

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <component
    :is="asChild ? OkuSlot : is"
    ref="componentRef"
    v-bind="mergeProps(attrs)"
  >
    <slot />
  </component>
</template>
