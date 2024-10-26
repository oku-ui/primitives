<script setup lang="ts">
import { DEFAULT_TOOLTIP_PROVIDER_PROPS, type TooltipProviderProps, useTooltipProvider } from './TooltipProvider.ts'

const props = withDefaults(defineProps<TooltipProviderProps>(), DEFAULT_TOOLTIP_PROVIDER_PROPS)

useTooltipProvider(props)
</script>

<template>
  <slot />
</template>
