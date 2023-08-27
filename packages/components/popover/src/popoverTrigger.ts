import { defineComponent, h, toRefs } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuPopperAnchor } from '@oku-ui/popper'
import { type ScopePopover, getState, scopePopoverProps } from './utils'
import { usePopoverInject, usePopperScope } from './popover'

export type PopoverTriggerIntrinsicElement = ElementType<'button'>
export type PopoverTriggerElement = HTMLButtonElement

export interface PopoverTriggerProps extends PrimitiveProps {}

export interface PopoverTriggerEmits {
  click: [event: MouseEvent]
}

export const popoverTriggerProps = {
  props: {
    ...primitiveProps,
    ...scopePopoverProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
  },
}

const TRIGGER_NAME = 'OkuPopoverTrigger'

const popoverTrigger = defineComponent({
  name: TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...popoverTriggerProps.props,
  },
  emits: popoverTriggerProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { scopeOkuPopover, asChild } = toRefs(props)

    const inject = usePopoverInject(TRIGGER_NAME, scopeOkuPopover?.value)

    const popperScope = usePopperScope(scopeOkuPopover?.value)

    const forwardedRef = useForwardRef()
    const composedTriggerRef = useComposedRefs(forwardedRef, (el) => {
      inject.triggerRef.value = el as HTMLButtonElement
    })

    const trigger
      = h(Primitive.button, {
        'type': 'button',
        'aria-haspopup': 'dialog',
        'aria-expanded': inject.open.value,
        'aria-controls': inject.contentId.value,
        'data-state': getState(inject.open.value),
        ...attrs,
        'asChild': props.asChild,
        'ref': composedTriggerRef,
        'onClick': composeEventHandlers<MouseEvent>((el) => {
          emit('click', el)
        }),
      }, {
        default: () => slots.default?.(),
      })

    return () => inject.hasCustomAnchor.value
      ? trigger
      : h(OkuPopperAnchor, {
        asChild: asChild?.value,
        ...popperScope,
      }, {
        default: () => trigger,
      })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverTrigger = popoverTrigger as typeof popoverTrigger &
(new () => {
  $props: ScopePopover<Partial<PopoverTriggerElement>>
})
