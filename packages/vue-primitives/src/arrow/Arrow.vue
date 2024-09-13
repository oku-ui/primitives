<script setup lang="ts">
import type { ArrowProps } from './Arrow.ts'
import { Primitive } from '../primitive/index.ts'

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
    :width="width"
    :height="height"
    :viewBox="as === 'template' ? undefined : '0 0 30 10'"
    :preserveAspectRatio="as === 'template' ? undefined : 'none'"
  >
    <slot><polygon points="0,0 30,0 15,10" /></slot>
  </Primitive>
</template>
