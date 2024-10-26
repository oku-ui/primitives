<script setup lang="ts">
import { convertPropsToHookProps } from '../shared/index.ts'
import { DEFAULT_TOOLTIP_CONTENT_PROPS, type TooltipContentProps, useTooltipContent } from './TooltipContent.ts'
import TooltipContentImpl from './TooltipContentImpl.vue'

defineOptions({
  name: 'TooltipContent',
})

const props = withDefaults(defineProps<TooltipContentProps>(), DEFAULT_TOOLTIP_CONTENT_PROPS)

const context = useTooltipContent(convertPropsToHookProps(props))
</script>

<template>
  <TooltipContentImpl v-if="context.isPresent.value">
    <slot />
  </TooltipContentImpl>
</template>
