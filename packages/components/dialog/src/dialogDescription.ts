import { defineComponent, h } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { DIALOG_NAME, scopeDialogrops, useDialogInject } from './utils'

export const DESCRIPTION_NAME = 'OkuDialogDescription'

export type DialogDescriptionElement = OkuElement<'p'>

interface DialogDescriptionProps extends PrimitiveProps {}

export const dialogDescriptionProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
  },
}

const dialogDescription = defineComponent({
  name: DIALOG_NAME,
  inheritAttrs: false,
  props: {
    ...dialogDescriptionProps.props,
    ...scopeDialogrops,
  },
  emits: dialogDescriptionProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { ...restAttrs } = attrs as DialogDescriptionElement

    const inject = useDialogInject(DESCRIPTION_NAME, props.scopeOkuDialog)

    const forwardRef = useForwardRef()

    const originalReturn = () => h(Primitive.p, {
      id: inject.descriptionId.value,
      ...restAttrs,
      ref: forwardRef,
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogDescription = dialogDescription as typeof dialogDescription &
(new () => {
  $props: DialogDescriptionElement
})
