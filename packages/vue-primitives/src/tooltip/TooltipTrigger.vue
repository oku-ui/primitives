<script setup lang="ts">
import { Primitive } from '../primitive/Primitive.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_TOOLTIP_TRIGGER_PROPS, type TooltipTriggerProps, useTooltipTrigger } from './TooltipTrigger.ts'

defineOptions({
  name: 'TooltipTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<TooltipTriggerProps>(), DEFAULT_TOOLTIP_TRIGGER_PROPS)

const tooltipTrigger = useTooltipTrigger()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(tooltipTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
