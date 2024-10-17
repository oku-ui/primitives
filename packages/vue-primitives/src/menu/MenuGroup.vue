<script setup lang="ts">
import { Primitive } from '@oku-ui/primitive'

defineOptions({
  name: 'MenuGroup',
})
</script>

<template>
  <Primitive role="group">
    <slot />
  </Primitive>
</template>
