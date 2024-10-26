<script setup lang="ts">
import { type TooltipProviderProps, useTooltipProvider } from '../index.ts'

const props = defineProps<TooltipProviderProps>()

useTooltipProvider(props)
</script>

<template>
  <slot />
</template>
