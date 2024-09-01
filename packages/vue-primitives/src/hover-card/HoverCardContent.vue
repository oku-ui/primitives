<script setup lang="ts">
import { shallowRef } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { usePresence } from '../presence/usePresence.ts'
import type { HoverCardContentEmits, HoverCardContentProps } from './HoverCardContent'
import HoverCardContentImpl from './HoverCardContentImpl.vue'
import { useHoverCardContext } from './HoverCardRoot.ts'
import { excludeTouch } from './utils.ts'

defineOptions({
  name: 'HoverCardContent',
})

const props = defineProps<HoverCardContentProps>()
const emit = defineEmits<HoverCardContentEmits>()

const $el = shallowRef<HTMLElement>()
const forwardedRef = useForwardElement($el)

const context = useHoverCardContext('HoverCardContent')

const isPresent = usePresence($el, () => props.forceMount || context.open.value)

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
    :ref="forwardedRef"
    :data-state="context.open.value ? 'open' : 'closed'"
    @pointerenter="onPointerenter"
    @pointerleave="onPointerleave"
  >
    <slot />
  </HoverCardContentImpl>
</template>
