<script setup lang="ts">
import { shallowRef } from 'vue'
import { useForwardElement } from '../hooks/useForwardElement.ts'
import { usePresence } from '../presence/usePresence.ts'
import TooltipContentHoverable from './TooltipContentHoverable.vue'
import TooltipContentImpl from './TooltipContentImpl.vue'
import { useTooltipContext } from './TooltipRoot.ts'
import type { TooltipContentProps } from './TooltipContent'

defineOptions({
  name: 'TooltipContent',
})

const props = withDefaults(defineProps<TooltipContentProps>(), {
  side: 'top',
})

const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const context = useTooltipContext('TooltipContent')

const isPresent = usePresence($el, () => props.forceMount || context.open.value)

const Comp = context.disableHoverableContent ? TooltipContentImpl : TooltipContentHoverable

defineExpose({
  $el,
})
</script>

<template>
  <Comp v-if="isPresent" :ref="forwardElement" :side="side">
    <slot />
  </Comp>
</template>
