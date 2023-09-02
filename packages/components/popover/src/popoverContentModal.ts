import { defineComponent, h, onMounted, ref } from 'vue'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef, useScrollLock } from '@oku-ui/use-composable'
import { hideOthers } from 'aria-hidden'
import { OkuSlot } from '@oku-ui/slot'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuPopoverContentImpl, popoverContentImplProps } from './popoverContentImpl'
import type { PopoverContentImplElement, PopoverContentImplEmits, PopoverContentImplIntrinsicElement, PopoverContentImplProps } from './popoverContentImpl'
import { type ScopePopover, scopePopoverProps } from './utils'
import { usePopoverInject } from './popover'
import { CONTENT_NAME } from './popoverContent'

export type PopoverContentTypeIntrinsicElement = PopoverContentImplIntrinsicElement
export type PopoverContentTypeElement = PopoverContentImplElement

export interface PopoverContentTypeProps
  extends Omit<PopoverContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents'> { }

export interface PopoverContentTypeEmits extends PopoverContentImplEmits { }

export const popoverContentTypeProps = {
  props: {
    ...propsOmit(popoverContentImplProps.props, ['trapFocus', 'disableOutsidePointerEvents']),
  },
  emits: {
    ...popoverContentImplProps.emits,
  },
}

const NAME = 'OkuPopoverContentModal'

const popoverContentModal = defineComponent({
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

    const contentRef = ref<HTMLDivElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(contentRef, forwardedRef)

    const isRightClickOutsideRef = ref(false)

    onMounted(() => {
      const content = contentRef.value
      if (content)
        return hideOthers(content)
    })

    useScrollLock(contentRef, true)
    return () => h(OkuSlot, {}, {
      default: () => h(OkuPopoverContentImpl, {
        ...attrs,
        ...props,
        ref: composedRefs,
        trapFocus: inject.open.value,
        disableOutsidePointerEvents: inject.open.value,
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
  $props: ScopePopover<Partial<PopoverContentTypeElement>>
})
