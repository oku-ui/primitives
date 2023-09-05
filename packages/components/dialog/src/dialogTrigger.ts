import { defineComponent, h } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { DIALOG_NAME, getState, scopeDialogrops, useDialogInject } from './utils'

const TRIGGER_NAME = 'OkuDialogTrigger'

export type DialogTriggerNaviteElement = OkuElement<'button'>

export interface DialogTriggerProps extends PrimitiveProps {
}
export const dialogTriggerProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
  },
}

const dialogTrigger = defineComponent({
  name: DIALOG_NAME,
  inheritAttrs: false,
  props: {
    ...dialogTriggerProps.props,
    ...scopeDialogrops,
  },
  emits: dialogTriggerProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { ...restAttrs } = attrs as DialogTriggerNaviteElement

    const inject = useDialogInject(TRIGGER_NAME, props.scopeOkuDialog)

    const forwardRef = useForwardRef()
    const composedTriggerRef = useComposedRefs(forwardRef, inject.triggerRef)

    const originalReturn = () => h(Primitive.button, {
      'type': 'button',
      'aria-haspopup': 'dialog',
      'aria-expanded': inject.open.value,
      'aria-controls': inject.contentId.value,
      'data-state': getState(inject.open.value!),
      ...restAttrs,
      'ref': composedTriggerRef,
      'onClick': composeEventHandlers((e: MouseEvent) => {
        emit('click', e)
      }, inject.onOpenToggle),
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogTrigger = dialogTrigger as typeof dialogTrigger &
(new () => {
  $props: DialogTriggerNaviteElement
})
