<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type HoverCardTriggerProps, useHoverCardTrigger } from './HoverCardTrigger.ts'

defineOptions({
  name: 'HoverCardTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<HoverCardTriggerProps>(), {
  as: 'a',
})

const hoverCardTrigger = useHoverCardTrigger()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(hoverCardTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
