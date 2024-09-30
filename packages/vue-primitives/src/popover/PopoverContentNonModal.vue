<script setup lang="ts">
import type { PopoverContentNonModal } from './PopoverContentNonModal.ts'
import { useDismissableLayer } from '../dismissable-layer/index.ts'
import { useFocusGuards } from '../focus-guards/index.ts'
import { useFocusScope } from '../focus-scope/index.ts'
import { PopperContent, usePopperContext } from '../popper/index.ts'
import { usePopoverContext } from './PopoverRoot.ts'
import { getState } from './utilts.ts'

defineOptions({
  name: 'PopoverContentNonModal',
})
const emit = defineEmits<PopoverContentNonModal>()

const context = usePopoverContext('PopoverContentNonModal')
const popperContext = usePopperContext('PopoverContentNonModal')
let hasInteractedOutsideRef = false
let hasPointerDownOutsideRef = false

function onCloseAutoFocus(event: Event) {
  emit('closeAutoFocus', event)

  if (!event.defaultPrevented) {
    if (!hasInteractedOutsideRef) {
      context.triggerRef.value?.focus()
    }
    // Always prevent auto focus because we either focus manually or want user agent focus
    event.preventDefault()
  }

  hasInteractedOutsideRef = false
  hasPointerDownOutsideRef = false
}

function onInteractOutside(event: PopoverContentNonModal['interactOutside'][0]) {
  emit('interactOutside', event)

  if (!event.defaultPrevented) {
    hasInteractedOutsideRef = true
    if (event.detail.originalEvent.type === 'pointerdown') {
      hasPointerDownOutsideRef = true
    }
  }

  // Prevent dismissing when clicking the trigger.
  // As the trigger is already setup to close, without doing so would
  // cause it to close and immediately open.
  const target = event.target as HTMLElement
  const targetIsTrigger = context.triggerRef.value?.contains(target)
  if (targetIsTrigger)
    event.preventDefault()

  // On Safari if the trigger is inside a container with tabIndex={0}, when clicked
  // we will get the pointer down outside event on the trigger, but then a subsequent
  // focus outside event on the container, we ignore any focus outside event when we've
  // already had a pointer down outside event.
  if (event.detail.originalEvent.type === 'focusin' && hasPointerDownOutsideRef) {
    event.preventDefault()
  }
}

// COMP::PopoverContentImpl

// Make sure the whole tree has focus guards as our `Popover` may be
// the last element in the DOM (because of the `Portal`)
useFocusGuards()

const focusScope = useFocusScope(
  popperContext.content,
  {
    loop: true,
    trapped() {
      return false
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
    return false
  },
}, {
  onInteractOutside,
  onEscapeKeydown(event) {
    emit('escapeKeydown', event)
  },
  onFocusOutside(event) {
    emit('focusOutside', event)
  },
  onPointerdownOutside(event) {
    emit('pointerdownOutside', event)
  },
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
