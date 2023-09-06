import { defineComponent, h } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { OVERLAY_NAME, getState, scopeDialogProps, useDialogInject } from './utils'

export type DialogOverlayImplNaviteElement = OkuElement<'div'>

export interface DialogOverlayImplProps extends PrimitiveProps {}

export const dialogOverlayImplProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
  },
}

const dialogOverlayImpl = defineComponent({
  name: OVERLAY_NAME,
  inheritAttrs: false,
  props: {
    ...dialogOverlayImplProps.props,
    ...scopeDialogProps,
  },
  emits: dialogOverlayImplProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { ...restAttrs } = attrs as DialogOverlayImplNaviteElement

    const inject = useDialogInject(OVERLAY_NAME, props.scopeOkuDialog)

    const forwardRef = useForwardRef()

    const originalReturn = () => h(Primitive.div, {
      'data-state': getState(inject.open.value!),
      ...restAttrs,
      'ref': forwardRef,
      'style': {
        pointerEvents: 'auto',
        ...attrs.style as any,
      },
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogOverlayImpl = dialogOverlayImpl as typeof dialogOverlayImpl &
(new () => {
  $props: DialogOverlayImplNaviteElement
})
