import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuPopperAnchor } from '@oku-ui/popper'
import { getState, scopePopoverProps } from './utils'
import { usePopoverInject, usePopperScope } from './popover'

export type PopoverTriggerNaviteElement = OkuElement<'button'>
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
    const { scopeOkuPopover, ...triggerProps } = toRefs(props)
    const _reactive = reactive(triggerProps)
    const reactiveTriggerProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = usePopoverInject(TRIGGER_NAME, scopeOkuPopover?.value)

    const popperScope = usePopperScope(scopeOkuPopover?.value)

    const forwardedRef = useForwardRef()
    const composedTriggerRef = useComposedRefs(forwardedRef, (el) => {
      if (el)
        inject.triggerRef.value = el as HTMLButtonElement
    })

    return () => {
      const trigger
        = h(Primitive.button, {
          'type': 'button',
          'aria-haspopup': 'dialog',
          'aria-expanded': inject.open.value,
          'aria-controls': inject.contentId.value,
          'data-state': getState(inject.open.value),
          ...mergeProps(attrs, reactiveTriggerProps),
          'ref': composedTriggerRef,
          'onClick': composeEventHandlers<MouseEvent>((el) => {
            emit('click', el)
          }, () => inject.onOpenToggle()),
        }, {
          default: () => slots.default?.(),
        })

      return inject.hasCustomAnchor.value
        ? trigger
        : h(OkuPopperAnchor, {
          asChild: true,
          ...popperScope,
        }, {
          default: () => trigger,
        })
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverTrigger = popoverTrigger as typeof popoverTrigger &
(new () => {
  $props: PopoverTriggerNaviteElement
})
