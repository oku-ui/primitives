<script setup lang="ts">
import { shallowRef } from 'vue'
import type { FocusOutsideEvent, PointerdownOutsideEvent } from '../dismissable-layer/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import { usePopoverContext } from './PopoverRoot.ts'
import PopoverContentImpl from './PopoverContentImpl.vue'
import type { PopoverContentNonModal } from './PopoverContentNonModal.ts'

defineOptions({
  name: 'PopoverContentNonModal',
})
const emit = defineEmits<PopoverContentNonModal>()

const $el = shallowRef<HTMLElement>()
const forwardElement = useForwardElement($el)

const context = usePopoverContext('PopoverContentNonModal')
let hasInteractedOutsideRef = false
let hasPointerDownOutsideRef = false

function onCloseAutoFocus(event: Event) {
  emit('closeAutoFocus', event)

  if (!event.defaultPrevented) {
    if (!hasInteractedOutsideRef) {
      context.triggerRef.current?.focus()
    }
    // Always prevent auto focus because we either focus manually or want user agent focus
    event.preventDefault()
  }

  hasInteractedOutsideRef = false
  hasPointerDownOutsideRef = false
}

function interactOutside(event: PointerdownOutsideEvent | FocusOutsideEvent) {
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
  const targetIsTrigger = context.triggerRef.current?.contains(target)
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
</script>

<template>
  <PopoverContentImpl
    :ref="forwardElement"
    :trap-focus="false"
    :disable-outside-pointer-events="false"
    @close-auto-focus="onCloseAutoFocus "
    @interact-outside="interactOutside"
  >
    <slot />
  </PopoverContentImpl>
</template>
