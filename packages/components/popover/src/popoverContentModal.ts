import { defineComponent, h, mergeProps, onBeforeUnmount, ref } from 'vue'
import { useComposedRefs, useForwardRef, useScrollLock } from '@oku-ui/use-composable'
import { hideOthers } from 'aria-hidden'
import { OkuSlot } from '@oku-ui/slot'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuPopoverContentImpl } from './popoverContentImpl'
import type { PopoverContentTypeEmits, PopoverContentTypeNaviteElement } from './props'
import { CONTENT_MODAL_NAME, CONTENT_NAME, popoverContentTypeProps, scopePopoverProps, usePopoverInject } from './props'

const popoverContentModal = defineComponent({
  name: CONTENT_MODAL_NAME,
  inheritAttrs: false,
  props: {
    ...popoverContentTypeProps.props,
    ...scopePopoverProps,
  },
  emits: popoverContentTypeProps.emits,
  setup(props, { attrs, slots, emit }) {
    const inject = usePopoverInject(CONTENT_NAME, props.scopeOkuPopover)

    const contentRef = ref<HTMLDivElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(contentRef, forwardedRef)

    const isRightClickOutsideRef = ref(false)

    onBeforeUnmount(() => {
      const content = contentRef.value
      if (content)
        hideOthers(content)
    })

    useScrollLock(contentRef, true)

    return () => h(OkuSlot, {}, {
      default: () => h(OkuPopoverContentImpl, {
        ...mergeProps(attrs, props),
        ref: composedRefs,
        trapFocus: inject.open.value,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers<PopoverContentTypeEmits['closeAutoFocus'][0]>((el) => {
          emit('closeAutoFocus', el)
        }, (event) => {
          event.preventDefault()
          if (!isRightClickOutsideRef.value)
            inject.triggerRef.value?.focus()
        }),
        onPointerdownOutside: composeEventHandlers<PopoverContentTypeEmits['pointerdownOutside'][0]>((el) => {
          emit('pointerdownOutside', el)
        }, (event) => {
          const originalEvent = event.detail.originalEvent
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick

          isRightClickOutsideRef.value = isRightClick
        }, { checkForDefaultPrevented: false }),
        // When focus is trapped, a `focusout` event may still happen.
        // We make sure we don't trigger our `onDismiss` in such case.
        onFocusoutSide: composeEventHandlers<PopoverContentTypeEmits['focusoutSide'][0]>((el) => {
          emit('focusoutSide', el)
        }, event => event.preventDefault(),
        { checkForDefaultPrevented: false }),
      }, {
        default: () => slots.default?.(),
      }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverContentModal = popoverContentModal as typeof popoverContentModal &
(new () => {
  $props: PopoverContentTypeNaviteElement
})
