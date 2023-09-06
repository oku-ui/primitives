import { defineComponent, h } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { scopeDialogProps, useDialogInject } from './utils'

export const CLOSE_NAME = 'OkuDialogClose'

export type DialogCloseNaviteElement = OkuElement<'button'>

export type DialogCloseEmits = {
  click: [event: MouseEvent]
}

export interface DialogCloseProps extends PrimitiveProps {}

export const dialogCloseProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
  },
}

const dialogClose = defineComponent({
  name: CLOSE_NAME,
  inheritAttrs: false,
  props: {
    ...dialogCloseProps.props,
    ...scopeDialogProps,
  },
  emits: dialogCloseProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { ...restAttrs } = attrs as DialogCloseNaviteElement

    const inject = useDialogInject(CLOSE_NAME, props.scopeOkuDialog)

    const forwardRef = useForwardRef()

    const originalReturn = () => h(Primitive.button, {
      type: 'button',
      ...restAttrs,
      ref: forwardRef,
      onClick: composeEventHandlers<DialogCloseEmits['click'][0]>((event) => {
        emit('click', event)
      }, () => inject.onOpenChange(false)),
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogClose = dialogClose as typeof dialogClose &
(new () => {
  $props: DialogCloseNaviteElement
})
