import { defineComponent, h, ref } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuSlot } from '@oku-ui/slot'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuPopoverContentImpl } from './popoverContentImpl'
import { type ScopePopover, scopePopoverProps } from './utils'
import { usePopoverInject } from './popover'
import { CONTENT_NAME } from './popoverContent'
import type { PopoverContentTypeElement, PopoverContentTypeEmits } from './popoverContentModal'
import { popoverContentTypeProps } from './popoverContentModal'

const NAME = 'OkuPopoverContentNonModal'

const popoverContentNonModal = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...popoverContentTypeProps.props,
    ...primitiveProps,
    ...scopePopoverProps,
  },
  emits: popoverContentTypeProps.emits,
  setup(props, { attrs, slots, emit }) {
    const inject = usePopoverInject(CONTENT_NAME, props.scopeOkuPopover)

    const hasInteractedOutsideRef = ref(false)
    const hasPointerDownOutsideRef = ref(false)

    const forwardedRef = useForwardRef()

    return () => h(OkuSlot, {}, {
      default: () => h(OkuPopoverContentImpl, {
        ...attrs,
        ...props,
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
        onFocusoutSide: composeEventHandlers<PopoverContentTypeEmits['focusoutSide'][0]>((event) => {
          emit('focusoutSide', event)
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
      }, {
        default: () => slots.default?.(),
      }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverContentNonModal = popoverContentNonModal as typeof popoverContentNonModal &
(new () => {
  $props: ScopePopover<Partial<PopoverContentTypeElement>>
})
