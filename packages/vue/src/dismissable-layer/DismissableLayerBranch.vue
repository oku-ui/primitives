<script setup lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { onMounted, onUnmounted, ref } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { DismissableLayerBranchElement } from './props'
import { context } from './DismissableLayer.vue'

export interface DismissableLayerBranchProps extends PrimitiveProps {}

defineOptions({
  name: 'DismissableLayerBranch',
})

const props = defineProps<DismissableLayerBranchProps>()

const node = ref<DismissableLayerBranchElement>()

const forwardedRef = useForwardRef()
const composedRefs = useComposedRefs(forwardedRef, node)

onMounted(() => {
  if (node.value)
    context.branches.add(node.value)
})

onUnmounted(() => {
  if (node.value)
    context.branches.delete(node.value)
})
</script>

<template>
  <Primitive
    ref="composedRefs"
    v-bind="props"
  >
    <slot />
  </Primitive>
</template>
