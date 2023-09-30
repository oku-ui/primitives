import { defineComponent, h, mergeProps, ref } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuPopoverContentImpl } from './popoverContentImpl'
import { CONTENT_NAME, CONTENT_NON_MODAL_NAME, popoverContentTypeProps, scopePopoverProps, usePopoverInject } from './props'
import type { PopoverContentTypeEmits, PopoverContentTypeNaviteElement } from './props'

const popoverContentNonModal = defineComponent({
  name: CONTENT_NON_MODAL_NAME,
  inheritAttrs: false,
  props: {
    ...popoverContentTypeProps.props,
    ...scopePopoverProps,
  },
  emits: popoverContentTypeProps.emits,
  setup(props, { attrs, slots, emit }) {
    const inject = usePopoverInject(CONTENT_NAME, props.scopeOkuPopover)

    const hasInteractedOutsideRef = ref(false)
    const hasPointerDownOutsideRef = ref(false)

    const forwardedRef = useForwardRef()

    return () => h(OkuPopoverContentImpl, {
      ...mergeProps(attrs, props),
      ref: forwardedRef,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      onCloseAutoFocus: composeEventHandlers<PopoverContentTypeEmits['closeAutoFocus'][0]>((event) => {
        emit('closeAutoFocus', event)

        if (!event.defaultPrevented) {
          if (!hasInteractedOutsideRef.value)
            inject.triggerRef.value?.focus()
            // Always prevent auto focus because we either focus manually or want user agent focus
          event.preventDefault()
        }

        hasInteractedOutsideRef.value = false
        hasPointerDownOutsideRef.value = false
      }),
      onInteractOutside: composeEventHandlers<PopoverContentTypeEmits['focusoutSide'][0]>((event) => {
        emit('interactOutside', event)

        if (!event.defaultPrevented) {
          hasInteractedOutsideRef.value = true
          if (event.detail.originalEvent.type === 'pointerdown')
            hasPointerDownOutsideRef.value = true
        }

        // Prevent dismissing when clicking the trigger.
        // As the trigger is already setup to close, without doing so would
        // cause it to close and immediately open.
        const target = event.target as HTMLElement
        const targetIsTrigger = inject.triggerRef.value?.contains(target)
        if (targetIsTrigger)
          event.preventDefault()

        // On Safari if the trigger is inside a container with tabIndex={0}, when clicked
        // we will get the pointer down outside event on the trigger, but then a subsequent
        // focus outside event on the container, we ignore any focus outside event when we've
        // already had a pointer down outside event.
        if (event.detail.originalEvent.type === 'focusin' && hasPointerDownOutsideRef.value)
          event.preventDefault()
      }),
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverContentNonModal = popoverContentNonModal as typeof popoverContentNonModal &
(new () => {
  $props: PopoverContentTypeNaviteElement
})
