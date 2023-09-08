import { defineComponent, h, mergeProps } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef, useScrollLock } from '@oku-ui/use-composable'
import { OVERLAY_NAME, getState, scopeDialogProps, useDialogInject } from './utils'

export type DialogOverlayImplNaviteElement = OkuElement<'div'>

export interface DialogOverlayImplProps extends PrimitiveProps {}

export const dialogOverlayImplProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
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
  setup(props, { attrs, slots }) {
    const { scopeOkuDialog, ...overlayProps } = props
    const inject = useDialogInject(OVERLAY_NAME, scopeOkuDialog)
    const forwardRef = useForwardRef()

    useScrollLock(inject.contentRef, true)

    return () => h(Primitive.div, {
      'data-state': getState(inject.open.value),
      ...mergeProps(attrs, overlayProps),
      'ref': forwardRef,
      'style': {
        pointerEvents: 'auto',
        ...attrs.style as any,
      },
    },
    {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogOverlayImpl = dialogOverlayImpl as typeof dialogOverlayImpl &
(new () => {
  $props: DialogOverlayImplNaviteElement
})
