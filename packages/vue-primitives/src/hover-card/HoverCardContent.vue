<script setup lang="ts">
import type { HoverCardContentEmits, HoverCardContentProps } from './HoverCardContent'
import { usePopperContext } from '../popper/index.ts'
import { usePresence } from '../presence/usePresence.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import HoverCardContentImpl from './HoverCardContentImpl.vue'
import { useHoverCardContext } from './HoverCardRoot.ts'
import { excludeTouch } from './utils.ts'

defineOptions({
  name: 'HoverCardContent',
})

const props = defineProps<HoverCardContentProps>()
const emit = defineEmits<HoverCardContentEmits>()

const context = useHoverCardContext('HoverCardContent')
const popperContext = usePopperContext('HoverCardContent')

const isPresent = usePresence(popperContext.content, () => props.forceMount || context.open.value)

const onPointerenter = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerenter', event)
}, excludeTouch(context.onOpen))

const onPointerleave = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerleave', event)
}, excludeTouch(context.onClose))
</script>

<template>
  <HoverCardContentImpl
    v-if="isPresent"
    :data-state="context.open.value ? 'open' : 'closed'"
    @pointerenter="onPointerenter"
    @pointerleave="onPointerleave"
  >
    <slot />
  </HoverCardContentImpl>
</template>
