<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import { hideOthers } from 'aria-hidden'
import { composeEventHandlers } from '../utils/vue.ts'
import type { FocusOutsideEvent, PointerdownOutsideEvent } from '../dismissable-layer/DismissableLayer.ts'
import { useForwardElement } from '../hooks/index.ts'
import { usePopoverContext } from './PopoverRoot.ts'
import PopoverContentImpl from './PopoverContentImpl.vue'
import type { PopoverContentModalEmits } from './PopoverContentModal.ts'

defineOptions({
  name: 'PopoverContentModal',
})

const emit = defineEmits<PopoverContentModalEmits>()

const $el = shallowRef<HTMLElement>()
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

const onPointerDownOutside = composeEventHandlers(
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
</script>

<template>
  <PopoverContentImpl
    :ref="forwardElement"
    :trap-focus="context.open.value"
    disable-outside-pointer-events

    @close-auto-focus="onCloseAutoFocus"
    @pointerdown-outside="onPointerDownOutside"
    @focus-outside="onFocusOutside"
  >
    <slot />
  </PopoverContentImpl>
</template>
