import { defineComponent, h, mergeProps } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { TITLE_NAME, scopeDialogProps, useDialogInject } from './utils'

export type DialogTitleNaviteElement = OkuElement<'h2'>
export type DialogTitleElement = HTMLHeadingElement

export interface DialogTitleProps extends PrimitiveProps {}

export const dialogTitleProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
  },
}

const dialogTitle = defineComponent({
  name: TITLE_NAME,
  inheritAttrs: false,
  props: {
    ...dialogTitleProps.props,
    ...scopeDialogProps,
  },
  emits: dialogTitleProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuDialog, ...titleProps } = props

    const inject = useDialogInject(TITLE_NAME, scopeOkuDialog)

    const forwardRef = useForwardRef()

    return () => h(Primitive.h2, {
      id: inject?.titleId.value,
      ...mergeProps(attrs, titleProps),
      ref: forwardRef,
    },
    {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogTitle = dialogTitle as typeof dialogTitle &
(new () => {
  $props: DialogTitleNaviteElement
})
