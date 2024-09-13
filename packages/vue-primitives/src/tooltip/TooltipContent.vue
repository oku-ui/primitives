<script setup lang="ts">
import type { TooltipContentProps } from './TooltipContent'
import { usePopperContext } from '../popper/index.ts'
import { usePresence } from '../presence/usePresence.ts'
import TooltipContentHoverable from './TooltipContentHoverable.vue'
import TooltipContentImpl from './TooltipContentImpl.vue'
import { useTooltipContext } from './TooltipRoot.ts'

defineOptions({
  name: 'TooltipContent',
})

const props = withDefaults(defineProps<TooltipContentProps>(), {
  side: 'top',
})

const context = useTooltipContext('TooltipContent')
const popperContext = usePopperContext('TooltipContent')

const isPresent = usePresence(popperContext.content, () => props.forceMount || context.open.value)

const Comp = context.disableHoverableContent ? TooltipContentImpl : TooltipContentHoverable
</script>

<template>
  <Comp v-if="isPresent" :side="side">
    <slot />
  </Comp>
</template>
