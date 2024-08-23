<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import type { ArrowProps } from './Arrow.ts'

defineOptions({
  name: 'Arrow',
})

withDefaults(defineProps<ArrowProps>(), {
  as: 'svg',
  width: 10,
  height: 5,
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :width="width"
    :height="height"
    :viewBox="asChild ? undefined : '0 0 30 10'"
    :preserveAspectRatio="asChild ? undefined : 'none'"
  >
    <slot><polygon points="0,0 30,0 15,10" /></slot>
  </Primitive>
</template>
