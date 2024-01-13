<script setup lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { defineExpose, defineOptions, defineProps, onMounted, onUnmounted } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'
import type { DismissableLayerBranchElement } from './props'
import { context } from './DismissableLayer.vue'

export interface DismissableLayerBranchProps extends PrimitiveProps {}

defineOptions({
  name: 'DismissableLayerBranch',
})

const props = defineProps<DismissableLayerBranchProps>()

const { componentRef, currentElement } = useComponentRef<DismissableLayerBranchElement>()

onMounted(() => {
  if (currentElement.value)
    context.branches.add(currentElement.value)
})

onUnmounted(() => {
  if (currentElement.value)
    context.branches.delete(currentElement.value)
})

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <Primitive
    ref="componentRef"
    v-bind="props"
  >
    <slot />
  </Primitive>
</template>
