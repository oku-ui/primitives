<script setup lang="ts">
import { useFocusGuards } from './FocusGuards.ts'

defineOptions({
  name: 'FocusGuards',
})

useFocusGuards()
</script>

<template>
  <slot />
</template>
