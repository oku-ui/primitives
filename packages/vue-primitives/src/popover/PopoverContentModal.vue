<script setup lang="ts">
import { hideOthers } from 'aria-hidden'
import { onBeforeUnmount, shallowRef } from 'vue'
import { useDismissableLayer } from '../dismissable-layer/index.ts'
import { useFocusGuards } from '../focus-guards/index.ts'
import { useFocusScope } from '../focus-scope/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import { PopperContent } from '../popper/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { usePopoverContext } from './PopoverRoot.ts'
import { getState } from './utilts.ts'
import type { FocusOutsideEvent, PointerdownOutsideEvent } from '../dismissable-layer/DismissableLayer.ts'
import type { PopoverContentModalEmits } from './PopoverContentModal.ts'

defineOptions({
  name: 'PopoverContentModal',
})

const emit = defineEmits<PopoverContentModalEmits>()

const $el = shallowRef<HTMLDivElement>()
const forwardElement = useForwardElement($el)

const context = usePopoverContext('PopoverContentModal')
let contentRef: HTMLDivElement | undefined
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
  if (contentRef)
    hideOthers(contentRef)
})

// PopoverContentImpl

// Make sure the whole tree has focus guards as our `Popover` may be
// the last element in the DOM (because of the `Portal`)
useFocusGuards()

const focusScope = useFocusScope(
  $el,
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

const dismissableLayer = useDismissableLayer($el, {
  disableOutsidePointerEvents() {
    return true
  },
}, {
  onPointerdownCapture(event) {
    emit('pointerdownCapture', event)
  },
  onFocusCapture(event) {
    emit('focusCapture', event)
  },
  onInteractOutside(event) {
    emit('interactOutside', event)
  },
  onEscapeKeydown(event) {
    emit('escapeKeydown', event)
  },
  onFocusOutside,
  onBlurCapture(event) {
    emit('blurCapture', event)
  },
  onPointerdownOutside,
  onDismiss() {
    context.onOpenChange(false)
  },
})
</script>

<template>
  <PopperContent
    :id="context.contentId"
    :ref="forwardElement"

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

    @focus.capture="dismissableLayer.onFocusCapture"
    @blur.capture="dismissableLayer.onBlurCapture"
    @pointerdown.capture="dismissableLayer.onPointerdownCapture"
  >
    <slot />
  </PopperContent>
</template>
