<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_HOVER_CARD_TRIGGER_PROPS, type HoverCardTriggerProps, useHoverCardTrigger } from './HoverCardTrigger.ts'

defineOptions({
  name: 'HoverCardTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<HoverCardTriggerProps>(), DEFAULT_HOVER_CARD_TRIGGER_PROPS)

const hoverCardTrigger = useHoverCardTrigger()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(hoverCardTrigger.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
