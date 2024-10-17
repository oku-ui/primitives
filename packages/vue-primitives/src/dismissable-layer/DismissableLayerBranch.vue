<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useForwardElement, useRef } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { context } from './DismissableLayer.ts'

defineOptions({
  name: 'DismissableLayerBranch',
})

const elRef = useRef<HTMLElement>()
const forwardElement = useForwardElement(elRef)

onMounted(() => {
  context.branches.add(elRef.current!)
})

onBeforeUnmount(() => {
  context.branches.delete(elRef.current!)
})
</script>

<template>
  <Primitive :ref="forwardElement">
    <slot />
  </Primitive>
</template>
