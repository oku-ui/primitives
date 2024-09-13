<script setup lang="ts">
import type { FocusOutsideEvent, PointerdownOutsideEvent } from '../dismissable-layer/index.ts'
import type { PopoverContentModalEmits } from './PopoverContentModal.ts'
import { hideOthers } from 'aria-hidden'
import { onBeforeUnmount } from 'vue'
import { useDismissableLayer } from '../dismissable-layer/index.ts'
import { useFocusGuards } from '../focus-guards/index.ts'
import { useFocusScope } from '../focus-scope/index.ts'
import { PopperContent, usePopperContext } from '../popper/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { usePopoverContext } from './PopoverRoot.ts'
import { getState } from './utilts.ts'

defineOptions({
  name: 'PopoverContentModal',
})

const emit = defineEmits<PopoverContentModalEmits>()

const context = usePopoverContext('PopoverContentModal')
const popperContext = usePopperContext('PopoverContentModal')
let isRightClickOutsideRef = false

const onCloseAutoFocus = composeEventHandlers((event) => {
  emit('closeAutoFocus', event)
}, (event: Event) => {
  event.preventDefault()
  if (!isRightClickOutsideRef)
    context.triggerRef.current?.focus()
})

const onPointerdownOutside = composeEventHandlers(
  (event) => {
    emit('pointerdownOutside', event)
  },
  (event: PointerdownOutsideEvent) => {
    emit('pointerdownOutside', event)
    const originalEvent = event.detail.originalEvent
    const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true
    const isRightClick = originalEvent.button === 2 || ctrlLeftClick

    isRightClickOutsideRef = isRightClick
  },
  { checkForDefaultPrevented: false },
)

// When focus is trapped, a `focusout` event may still happen.
// We make sure we don't trigger our `onDismiss` in such case.
const onFocusOutside = composeEventHandlers<FocusOutsideEvent>((event) => {
  emit('focusOutside', event)
}, event => event.preventDefault(), { checkForDefaultPrevented: false })

onBeforeUnmount(() => {
  if (popperContext.content.value)
    hideOthers(popperContext.content.value)
})

// COMP::PopoverContentImpl

// Make sure the whole tree has focus guards as our `Popover` may be
// the last element in the DOM (because of the `Portal`)
useFocusGuards()

const focusScope = useFocusScope(
  popperContext.content,
  {
    loop: true,
    trapped() {
      return context.open.value
    },
  },
  {
    onMountAutoFocus(event) {
      emit('openAutoFocus', event)
    },
    onUnmountAutoFocus: onCloseAutoFocus,
  },
)

const dismissableLayer = useDismissableLayer(popperContext.content, {
  disableOutsidePointerEvents() {
    return true
  },
}, {
  onInteractOutside(event) {
    emit('interactOutside', event)
  },
  onEscapeKeydown(event) {
    emit('escapeKeydown', event)
  },
  onFocusOutside,
  onPointerdownOutside,
  onDismiss() {
    context.onOpenChange(false)
  },
})
</script>

<template>
  <PopperContent
    :id="context.contentId"

    tabindex="-1"

    data-dismissable-layer

    :data-state="getState(context.open.value)"
    role="dialog"
    :style="{
      'pointerEvents': dismissableLayer.pointerEvents(),
      '--radix-popover-content-transform-origin': 'var(--radix-popper-transform-origin)',
      '--radix-popover-content-available-width': 'var(--radix-popper-available-width)',
      '--radix-popover-content-available-height': 'var(--radix-popper-available-height)',
      '--radix-popover-trigger-width': 'var(--radix-popper-anchor-width)',
      '--radix-popover-trigger-height': 'var(--radix-popper-anchor-height)',
    }"

    @keydown="focusScope.onKeydown"
  >
    <slot />
  </PopperContent>
</template>
