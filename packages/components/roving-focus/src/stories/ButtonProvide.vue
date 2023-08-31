<script setup lang="ts">
import { provide, ref } from 'vue'

const value = ref('two')

provide('value', value)
</script>

<template>
  <slot />
</template>
