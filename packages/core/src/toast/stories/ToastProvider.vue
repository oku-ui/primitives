<script setup lang="ts">
import type { ToastProviderProps } from '../index.ts'
import { useToastProvider } from '../index.ts'

const props = defineProps<ToastProviderProps>()

useToastProvider(props)
</script>

<template>
  <slot />
</template>
