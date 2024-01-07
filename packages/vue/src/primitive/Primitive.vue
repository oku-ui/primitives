<script lang="ts">
export interface PrimitiveProps {
  is?: string | object
  asChild?: boolean
}
</script>

<script setup lang="ts">
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { mergeProps, onMounted, toRefs, useAttrs } from 'vue'
import { OkuSlot } from '@oku-ui/slot'

defineOptions({
  name: 'OkuPrimitive',
  inheritAttrs: false,
})

const props = defineProps<PrimitiveProps>()
const forwarded = useForwardRef()
const composedRefs = useComposedRefs(forwarded)

const { asChild, is, ...primitiveProps } = toRefs(props)

onMounted(() => {
  (window as any)[Symbol.for('oku-ui')] = true
})

const attrs = useAttrs()
</script>

<template>
  <component
    v-bind="mergeProps(primitiveProps, attrs)"
    :is="asChild ? OkuSlot : is"
    ref="composedRefs"
  >
    <slot />
  </component>
</template>
