<script setup lang="ts">
import { useForwardElement, useRef } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { onBeforeUnmount, onMounted } from 'vue'
import { context } from './DismissableLayer.ts'

defineOptions({
  name: 'DismissableLayerBranch',
})

const elRef = useRef<HTMLElement>()
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
