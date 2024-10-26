<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/mergeProps.ts'
import { useDismissableLayerBranch } from './DismissableLayerBranch.ts'

defineOptions({
  name: 'DismissableLayerBranch',
  inheritAttrs: false,
})

const dismissableLayerBranch = useDismissableLayerBranch()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(dismissableLayerBranch.attrs([$attrs]))">
    <slot />
  </Primitive>
</template>
