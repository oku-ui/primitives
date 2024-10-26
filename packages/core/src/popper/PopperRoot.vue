<script setup lang="ts">
import { usePooperRoot } from './PopperRoot.ts'

defineOptions({
  name: 'PopperRoot',
  inheritAttrs: false,
})

usePooperRoot()
</script>

<template>
  <slot />
</template>
