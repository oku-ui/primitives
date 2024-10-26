<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { VISUALLY_HIDDEN_STYLE, type VisuallyHiddenProps } from './VisuallyHidden.ts'

defineOptions({
  name: 'VisuallyHidden',
})

withDefaults(defineProps<VisuallyHiddenProps>(), {
  as: 'span',
})
</script>

<template>
  <Primitive
    :as="as"
    :style="VISUALLY_HIDDEN_STYLE"
  >
    <slot />
  </Primitive>
</template>
