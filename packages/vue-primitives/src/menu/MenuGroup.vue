<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'

defineOptions({
  name: 'MenuGroup',
})
</script>

<template>
  <Primitive role="group">
    <slot />
  </Primitive>
</template>
