import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuPopperAnchor } from '@oku-ui/popper'
import type { PopoverTriggerNaviteElement } from './props'
import { TRIGGER_NAME, popoverTriggerProps, usePopoverInject, usePopperScope } from './props'
import { getState } from './utils'

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
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = usePopoverInject(TRIGGER_NAME, scopeOkuPopover?.value)
    const popperScope = usePopperScope(scopeOkuPopover?.value)

    const composedTriggerRef = useComposedRefs(forwardedRef, (el) => {
      if (el)
        inject.triggerRef.value = el as HTMLButtonElement
    })

    return () => {
      const trigger = h(Primitive.button, {
        'type': 'button',
        'aria-haspopup': 'dialog',
        'aria-expanded': inject.open.value,
        'aria-controls': inject.contentId.value,
        'data-state': getState(inject.open.value),
        ...mergeProps(attrs, otherProps),
        'ref': composedTriggerRef,
        'onClick': composeEventHandlers<MouseEvent>((el) => {
          emit('click', el)
        }, inject.onOpenToggle),
      }, () => slots.default?.())

      return [inject.hasCustomAnchor.value
        ? trigger
        : h(OkuPopperAnchor, {
          asChild: true,
          ...popperScope,
        }, () => trigger),
      ]
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverTrigger = popoverTrigger as typeof popoverTrigger & (new () => { $props: PopoverTriggerNaviteElement })
