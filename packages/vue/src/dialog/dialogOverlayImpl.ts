import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef, useScrollLock } from '@oku-ui/use-composable'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { getState, OVERLAY_NAME, scopeDialogProps, useDialogInject } from './utils'

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
    const { scopeOkuDialog, ...overlayProps } = toRefs(props)
    const _reactive = reactive(overlayProps)
    const reactiveOverlayProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useDialogInject(OVERLAY_NAME, scopeOkuDialog.value)
    const forwardRef = useForwardRef()

    useScrollLock(inject.contentRef, true)
    return () => h(Primitive.div, {
      'data-state': getState(inject.open.value),
      ...mergeProps(attrs, reactiveOverlayProps),
      'ref': forwardRef,
      'style': {
        pointerEvents: 'auto',
        ...attrs.style as any,
      },
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogOverlayImpl = dialogOverlayImpl as typeof dialogOverlayImpl &
  (new () => {
    $props: DialogOverlayImplNaviteElement
  })
