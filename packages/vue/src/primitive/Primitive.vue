<script lang="ts">
export interface PrimitiveProps {
  is?: string | object
  asChild?: boolean
}
</script>

<script setup lang="ts">
import { useForwardRef } from '@oku-ui/use-composable'
import { mergeProps, onMounted, useAttrs } from 'vue'
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

const forwarded = useForwardRef()

onMounted(() => {
  (window as any)[Symbol.for('oku-ui')] = true
})

const attrs = useAttrs()
</script>

<template>
  <component
    :is="asChild ? OkuSlot : is"
    :ref="forwarded"
    v-bind="mergeProps(attrs)"
  >
    <slot />
  </component>
</template>
