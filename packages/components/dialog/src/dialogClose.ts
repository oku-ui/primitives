import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
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
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
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
    const { scopeOkuDialog, ...closeProps } = toRefs(props)

    const _reactive = reactive(closeProps)
    const reactiveCloseProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useDialogInject(CLOSE_NAME, scopeOkuDialog.value)

    const forwardRef = useForwardRef()

    return () => h(Primitive.button, {
      type: 'button',
      ...mergeProps(attrs, reactiveCloseProps),
      ref: forwardRef,
      onClick: composeEventHandlers((e: DialogCloseEmits['click'][0]) => {
        emit('click', e)
      }, () => inject.onOpenChange(false)),
    },
    {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogClose = dialogClose as typeof dialogClose &
(new () => {
  $props: DialogCloseNaviteElement
})
