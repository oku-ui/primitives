<script setup lang="ts">
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'
</script>

<template>
  <button>
    <OkuVisuallyHidden>Save the file</OkuVisuallyHidden>
    <span :aria-hidden="true">💾</span>
  </button>
</template>
