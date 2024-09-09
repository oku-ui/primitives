<script setup lang="ts">
import { hideOthers } from 'aria-hidden'
import { onBeforeUnmount, shallowRef } from 'vue'
import { type FocusOutsideEvent, type PointerdownOutsideEvent, useDismissableLayer } from '../dismissable-layer/index.ts'
import { useFocusGuards } from '../focus-guards/index.ts'
import { useFocusScope } from '../focus-scope/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useDialogContext } from './DialogRoot.ts'
import { getState } from './utils.ts'
import type { DialogContentModalEmits } from './DialogContentModal.ts'

defineOptions({
  name: 'DialogContentModal',
})

const emit = defineEmits<DialogContentModalEmits>()

const $el = shallowRef<HTMLDivElement>()
const forwardElement = useForwardElement($el)

const context = useDialogContext('DialogContentModal')

// aria-hide everything except the content (better supported equivalent to setting aria-modal)
onBeforeUnmount(() => {
  if ($el.value)
    hideOthers($el.value)
})

const onCloseAutoFocus = composeEventHandlers((event) => {
  emit('closeAutoFocus', event)
}, (event) => {
  event.preventDefault()
  context.triggerRef.current?.focus()
})

const onPointerdownOutside = composeEventHandlers<PointerdownOutsideEvent>((event) => {
  emit('pointerdownOutside', event)
}, (event) => {
  const originalEvent = event.detail.originalEvent
  const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true
  const isRightClick = originalEvent.button === 2 || ctrlLeftClick

  // If the event is a right-click, we shouldn't close because
  // it is effectively as if we right-clicked the `Overlay`.
  if (isRightClick)
    event.preventDefault()
})

// When focus is trapped, a `focusout` event may still happen.
// We make sure we don't trigger our `onDismiss` in such case.
const onFocusOutside = composeEventHandlers<FocusOutsideEvent>((event) => {
  emit('focusOutside', event)
}, (event) => {
  event.preventDefault()
})

// DialogContentImpl

// Make sure the whole tree has focus guards as our `Dialog` will be
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
  onDismiss() {
    context.onOpenChange(false)
  },
  onFocusOutside,
  onBlurCapture(event) {
    emit('blurCapture', event)
  },
  onPointerdownOutside,
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
