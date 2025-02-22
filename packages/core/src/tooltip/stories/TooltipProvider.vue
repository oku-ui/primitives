<script setup lang="ts">
import type { TooltipProviderProps } from '../index.ts'
import { useTooltipProvider } from '../index.ts'

const props = defineProps<TooltipProviderProps>()

useTooltipProvider(props)
</script>

<template>
  <slot />
</template>
