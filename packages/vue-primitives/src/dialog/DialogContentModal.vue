<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { hideOthers } from 'aria-hidden'
import type { FocusOutsideEvent, PointerdownOutsideEvent } from '../dismissable-layer/DismissableLayer.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useDialogContext } from './Dialog.ts'
import DialogContentImpl from './DialogContentImpl.vue'
import type { DialogContentModal } from './DialogContentModal.ts'

defineOptions({
  name: 'DialogContentModal',
})

const emit = defineEmits<DialogContentModal>()

const context = useDialogContext('DialogContentModal')
let contentRef: HTMLDivElement | undefined

function setContentRef(nodeRef: any) {
  const node = nodeRef ? nodeRef.$el : undefined
  contentRef = node
}

// aria-hide everything except the content (better supported equivalent to setting aria-modal)
onBeforeUnmount(() => {
  if (contentRef)
    hideOthers(contentRef)
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
</script>

<template>
  <DialogContentImpl
    :ref="setContentRef"
    :trap-focus="context.open.value"
    disable-outside-pointer-events
    @close-auto-focus="onCloseAutoFocus"
    @pointerdown-outside="onPointerdownOutside"
    @focus-outside="onFocusOutside"
  >
    <slot />
  </DialogContentImpl>
</template>
