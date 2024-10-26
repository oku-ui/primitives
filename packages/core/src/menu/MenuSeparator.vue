<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'

defineOptions({
  name: 'MenuSeparator',
})
</script>

<template>
  <Primitive role="separator" aria-orientation="horizontal">
    <slot />
  </Primitive>
</template>
