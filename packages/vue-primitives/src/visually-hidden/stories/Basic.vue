<script setup lang="ts">
import { VisuallyHidden } from '../index.ts'
</script>

<template>
  <button>
    <VisuallyHidden>Save the file</VisuallyHidden>
    <span aria-hidden="true">💾</span>
  </button>
</template>
