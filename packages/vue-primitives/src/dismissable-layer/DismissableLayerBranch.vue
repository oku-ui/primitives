<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { useDismissableLayerBranch } from './DismissableLayerBranch.ts'

defineOptions({
  name: 'DismissableLayerBranch',
  inheritAttrs: false,
})

const dismissableLayerBranch = useDismissableLayerBranch()
</script>

<template>
  <Primitive v-bind="dismissableLayerBranch.attrs([$attrs])">
    <slot />
  </Primitive>
</template>
