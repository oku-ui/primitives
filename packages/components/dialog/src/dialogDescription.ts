import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { scopeDialogProps, useDialogInject } from './utils'

export const DESCRIPTION_NAME = 'OkuDialogDescription'

export type DialogDescriptionNaviteElement = OkuElement<'p'>
export type DialogDescriptionElement = HTMLParagraphElement

export interface DialogDescriptionProps extends PrimitiveProps {}

export const dialogDescriptionProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
  },
}

const dialogDescription = defineComponent({
  name: DESCRIPTION_NAME,
  inheritAttrs: false,
  props: {
    ...dialogDescriptionProps.props,
    ...scopeDialogProps,
  },
  emits: dialogDescriptionProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuDialog, ...descriptionProps } = toRefs(props)

    const _reactive = reactive(descriptionProps)
    const reactiveDescriptionProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useDialogInject(DESCRIPTION_NAME, scopeOkuDialog.value)

    const forwardRef = useForwardRef()

    return () => h(Primitive.p, {
      id: inject?.descriptionId.value,
      ...mergeProps(attrs, reactiveDescriptionProps),
      ref: forwardRef,
    },
    {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDialogDescription = dialogDescription as typeof dialogDescription &
(new () => {
  $props: DialogDescriptionNaviteElement
})
