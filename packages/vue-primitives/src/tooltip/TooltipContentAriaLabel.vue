<script setup lang="ts">
import { VisuallyHidden } from '../visually-hidden/index.ts'
import { useTooltipContentContext } from './TooltipContentImpl.ts'

defineOptions({
  name: 'TooltipContentAriaLabel',
})

const context = useTooltipContentContext('TooltipContentAriaLabel')
</script>

<template>
  <VisuallyHidden v-if="context.ariaLabel()" :id="context.id" role="tooltip">
    {{ context.ariaLabel() }}
  </VisuallyHidden>
</template>
