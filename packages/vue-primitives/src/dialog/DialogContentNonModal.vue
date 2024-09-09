<script setup lang="ts">
import { shallowRef } from 'vue'
import { type FocusOutsideEvent, type PointerdownOutsideEvent, useDismissableLayer } from '../dismissable-layer/DismissableLayer.ts'
import { useFocusGuards } from '../focus-guards/index.ts'
import { useFocusScope } from '../focus-scope/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useDialogContext } from './DialogRoot.ts'
import { getState } from './utils.ts'
import type { DialogContentNonModalEmits } from './DialogContentNonModal.ts'

defineOptions({
  name: 'DialogContentNonModal',
})

const emit = defineEmits<DialogContentNonModalEmits>()

const $el = shallowRef<HTMLDivElement>()
const forwardElement = useForwardElement($el)

const context = useDialogContext('DialogContentNonModal')

let hasInteractedOutsideRef = false
let hasPointerDownOutsideRef = false

function onCloseAutoFocus(event: Event) {
  emit('closeAutoFocus', event)

  if (!event.defaultPrevented) {
    if (!hasInteractedOutsideRef)
      context.triggerRef.current?.focus()
    // Always prevent auto focus because we either focus manually or want user agent focus
    event.preventDefault()
  }

  hasInteractedOutsideRef = false
  hasPointerDownOutsideRef = false
}

function onInteractOutside(event: PointerdownOutsideEvent | FocusOutsideEvent) {
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

// DialogContentImpl

// Make sure the whole tree has focus guards as our `Dialog` will be
// the last element in the DOM (because of the `Portal`)
useFocusGuards()

const focusScope = useFocusScope(
  $el,
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

const dismissableLayer = useDismissableLayer($el, {
  disableOutsidePointerEvents() {
    return false
  },
}, {
  onPointerdownCapture(event) {
    emit('pointerdownCapture', event)
  },
  onFocusCapture(event) {
    emit('focusCapture', event)
  },
  onInteractOutside,
  onEscapeKeydown(event) {
    emit('escapeKeydown', event)
  },
  onDismiss() {
    context.onOpenChange(false)
  },
  onFocusOutside(event) {
    emit('focusOutside', event)
  },
  onBlurCapture(event) {
    emit('blurCapture', event)
  },
  onPointerdownOutside(event) {
    emit('pointerdownOutside', event)
  },
})
</script>

<template>
  <Primitive
    :id="context.contentId"
    :ref="forwardElement"

    data-dismissable-layer

    :style="{ pointerEvents: dismissableLayer.pointerEvents() }"
    role="dialog"
    :aria-describedby="context.descriptionId"
    :aria-labelledby="context.titleId"
    :data-state="getState(context.open.value)"

    tabindex="-1"

    @focus.capture="dismissableLayer.onFocusCapture"
    @blur.capture="dismissableLayer.onBlurCapture"
    @pointerdown.capture="dismissableLayer.onPointerdownCapture"

    @keydown="focusScope.onKeydown"
  >
    <slot />
  </Primitive>
</template>
