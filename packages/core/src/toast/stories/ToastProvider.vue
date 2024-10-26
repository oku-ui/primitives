<script setup lang="ts">
import { type ToastProviderProps, useToastProvider } from '../index.ts'

const props = defineProps<ToastProviderProps>()

useToastProvider(props)
</script>

<template>
  <slot />
</template>
