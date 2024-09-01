<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import { context } from './DismissableLayer.ts'

defineOptions({
  name: 'DismissableLayerBranch',
})

const elRef = shallowRef<HTMLElement>()
const forwardElement = useForwardElement(elRef)

onMounted(() => {
  context.branches.add(elRef.value!)
})

onBeforeUnmount(() => {
  context.branches.delete(elRef.value!)
})
</script>

<template>
  <Primitive :ref="forwardElement">
    <slot />
  </Primitive>
</template>
