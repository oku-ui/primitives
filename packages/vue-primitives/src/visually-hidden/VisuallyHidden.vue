<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'

defineOptions({
  name: 'VisuallyHidden',
})
</script>

<template>
  <Primitive style="position: absolute; border: 0; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; word-wrap: normal;">
    <slot />
  </Primitive>
</template>
