<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { forwardRef } from '../utils/vue.ts'
import { context } from './DismissableLayer.ts'

defineOptions({
  name: 'DismissableLayerBranch',
})

const elRef = shallowRef<HTMLElement>()
const forwardedRef = forwardRef(elRef)

onMounted(() => {
  context.branches.add(elRef.value!)
})

onBeforeUnmount(() => {
  context.branches.delete(elRef.value!)
})
</script>

<template>
  <Primitive :ref="forwardedRef">
    <slot />
  </Primitive>
</template>
