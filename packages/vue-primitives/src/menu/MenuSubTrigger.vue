<script setup lang="ts">
import type { MenuSubTriggerEmits, MenuSubTriggerProps } from './MenuSubTrigger.ts'
import { onBeforeUnmount, onMounted } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { usePopperContext } from '../popper/index.ts'
import { composeEventHandlers } from '../shared/index.ts'
import { useMenuContentContext } from './MenuContent.ts'
import MenuItemImpl from './MenuItemImpl.vue'
import { SUB_OPEN_KEYS, useMenuContext, useMenuRootContext } from './MenuRoot.ts'
import { useMenuSubContext } from './MenuSub.ts'
import { getOpenState, type Side } from './utils.ts'

defineOptions({
  name: 'MenuSubTrigger',
})

const props = defineProps<MenuSubTriggerProps>()

const emit = defineEmits<MenuSubTriggerEmits>()

const context = useMenuContext('MenuSubTrigger')
const rootContext = useMenuRootContext('MenuSubTrigger')
const subContext = useMenuSubContext('MenuSubTrigger')
const contentContext = useMenuContentContext('MenuSubTrigger')
const popperContext = usePopperContext('MenuSubTrigger')

let openTimerRef: number | undefined

function clearOpenTimer() {
  if (openTimerRef)
    window.clearTimeout(openTimerRef)
  openTimerRef = undefined
}

onBeforeUnmount(() => {
  clearOpenTimer()

  window.clearTimeout(contentContext.pointerGraceTimerRef.current)
  contentContext.onPointerGraceIntentChange(undefined)
})

function onClick(event: MouseEvent) {
  if (props.disabled || event.defaultPrevented) {
    return
  }
  /**
   * We manually focus because iOS Safari doesn't always focus on click (e.g. buttons)
   * and we rely heavily on `onFocusOutside` for submenus to close when switching
   * between separate submenus.
   */
  ;(event.currentTarget as HTMLElement).focus()
  if (!context.open())
    context.onOpenChange(true)
}

const onPointermove = composeEventHandlers<PointerEvent>((event) => {
  emit('pointermove', event)
}, (event) => {
  if (event.pointerType !== 'mouse')
    return

  contentContext.onItemEnter(event)

  if (event.defaultPrevented)
    return

  if (!props.disabled && !context.open() && !openTimerRef) {
    contentContext.onPointerGraceIntentChange(undefined)

    openTimerRef = window.setTimeout(() => {
      context.onOpenChange(true)
      clearOpenTimer()
    }, 100)
  }
})

const onPointerLeave = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerleave', event)
}, (event) => {
  if (event.pointerType !== 'mouse')
    return

  clearOpenTimer()

  const contentRect = popperContext.content.value?.getBoundingClientRect()
  if (contentRect) {
    // TODO: make sure to update this when we change positioning logic
    const side = popperContext.content.value?.dataset.side as Side
    const rightSide = side === 'right'
    const bleed = rightSide ? -5 : +5
    const contentNearEdge = contentRect[rightSide ? 'left' : 'right']
    const contentFarEdge = contentRect[rightSide ? 'right' : 'left']

    contentContext.onPointerGraceIntentChange({
      area: [
        // Apply a bleed on clientX to ensure that our exit point is
        // consistently within polygon bounds
        { x: event.clientX + bleed, y: event.clientY },
        { x: contentNearEdge, y: contentRect.top },
        { x: contentFarEdge, y: contentRect.top },
        { x: contentFarEdge, y: contentRect.bottom },
        { x: contentNearEdge, y: contentRect.bottom },
      ],
      side,
    })

    window.clearTimeout(contentContext.pointerGraceTimerRef.current)
    contentContext.pointerGraceTimerRef.current = window.setTimeout(
      () => contentContext.onPointerGraceIntentChange(undefined),
      300,
    )
  }
  else {
    contentContext.onTriggerLeave(event)
    if (event.defaultPrevented)
      return

    // There's 100ms where the user may leave an item before the submenu was opened.
    contentContext.onPointerGraceIntentChange(undefined)
  }
})

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event) => {
  const isTypingAhead = contentContext.searchRef.current !== ''

  if (props.disabled || (isTypingAhead && event.key === ' '))
    return

  if (SUB_OPEN_KEYS[rootContext.dir.value].includes(event.key)) {
    context.onOpenChange(true)
    // The trigger may hold focus if opened via pointer interaction
    // so we ensure content is given focus again when switching to keyboard.
    popperContext.content.value?.focus()
    // prevent window from scrolling
    event.preventDefault()
  }
})

// COMP::PopperAnchor

const forwardElement = useForwardElement(subContext.trigger)

onMounted(() => {
  popperContext.onAnchorChange(props.virtualRef?.current || subContext.trigger.current)
})
</script>

<template>
  <MenuItemImpl
    v-if="!virtualRef"
    :id="subContext.triggerId"
    :ref="forwardElement"
    :disabled="disabled"
    aria-haspopup="menu"
    :aria-expanded="context.open()"
    :aria-controls="subContext.contentId"
    :data-state="getOpenState(context.open())"
    @click="onClick"
    @pointermove="onPointermove"
    @pointerleave="onPointerLeave"
    @keydown="onKeydown"
  >
    <slot />
  </MenuItemImpl>
</template>
