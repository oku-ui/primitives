import { PropType, Ref, computed, defineComponent, h, ref, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { DIALOG_NAME, DialogProvider, getState, scopeDialogrops, useDialogInject } from './utils'
import { OVERLAY_NAME } from './dialogOverlay'

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
  name: DIALOG_NAME,
  inheritAttrs: false,
  props: {
    ...dialogOverlayImplProps.props,
    ...scopeDialogrops,
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
