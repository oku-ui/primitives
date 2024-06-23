<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import type { DismissableLayerBranchProps } from './DismissableLayerBranch'
import { context } from './DismissableLayer.ts'

defineOptions({
  name: 'DismissableLayerBranch',
})

defineProps<DismissableLayerBranchProps>()

const elRef = shallowRef<HTMLElement>()

onMounted(() => {
  context.branches.add(elRef.value!)
})

onUnmounted(() => {
  context.branches.delete(elRef.value!)
})
</script>

<template>
  <Primitive
    :ref="(el: any) => elRef = el?.$el"
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
