<script setup lang="ts">
import { provide, ref } from 'vue'

const value = ref('')

provide('value', value)
</script>

<template>
  <slot />
</template>
