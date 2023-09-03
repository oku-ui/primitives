import { PropType, Ref, computed, defineComponent, h, ref, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import { DIALOG_NAME, DialogProvider, createDialogProvider, getState, scopeDialogrops, useDialogInject } from './utils'

export const DESCRIPTION_NAME = 'OkuDialogDescription'

export type DialogDescriptionElement = OkuElement<typeof Primitive.p>

interface DialogDescriptionProps extends PrimitiveProps {}

export const dialogTitleProps = {
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
    ...dialogTitleProps.props,
    ...scopeDialogrops,
  },
  emits: dialogTitleProps.emits,
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
export const OkuDialogDesciprtion = dialogDescription as typeof dialogDescription &
(new () => {
  $props: DialogDescriptionElement
})
