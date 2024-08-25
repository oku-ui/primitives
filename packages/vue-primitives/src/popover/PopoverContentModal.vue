<script setup lang="ts">
import { onBeforeUnmount, shallowRef } from 'vue'
import { hideOthers } from 'aria-hidden'
import { composeEventHandlers, forwardRef } from '../utils/vue.ts'
import type { FocusOutsideEvent, PointerdownOutsideEvent } from '../dismissable-layer/DismissableLayer.ts'
import { usePopoverContext } from './Popover.ts'
import type { PopoverContentTypeEmits, PopoverContentTypeProps } from './PopoverContent.ts'
import PopoverContentImpl from './PopoverContentImpl.vue'

defineOptions({
  name: 'PopoverContentModal',
})

const props = defineProps<PopoverContentTypeProps>()
const emit = defineEmits<PopoverContentTypeEmits>()

const $el = shallowRef<HTMLElement>()
const forwardedRef = forwardRef($el)

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

defineExpose({
  $el,
})
</script>

<template>
  <PopoverContentImpl
    v-bind="props"
    :ref="forwardedRef"
    :trap-focus="context.open.value"
    disable-outside-pointer-events

    @open-auto-focus="emit('openAutoFocus', $event)"
    @close-auto-focus="onCloseAutoFocus"

    @escape-keydown="emit('escapeKeydown', $event)"
    @pointerdown-outside="onPointerDownOutside"
    @focus-outside="onFocusOutside"
    @interact-outside="emit('interactOutside', $event)"
    @dismiss="emit('dismiss')"
  >
    <slot />
  </PopoverContentImpl>
</template>
