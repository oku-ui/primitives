<script setup lang="ts">
import { Primitive } from '@oku-ui/primitive'

defineOptions({
  name: 'MenuSeparator',
})
</script>

<template>
  <Primitive role="separator" aria-orientation="horizontal">
    <slot />
  </Primitive>
</template>
