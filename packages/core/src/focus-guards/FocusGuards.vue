<script setup lang="ts">
import { useFocusGuards } from './FocusGuards.ts'

defineOptions({
  name: 'FocusGuards',
  inheritAttrs: false,
})

useFocusGuards()
</script>

<template>
  <slot />
</template>
