import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { DialogDescriptionProps } from '@oku-ui/dialog'
import { OkuDialogDescription, dialogDescriptionProps } from '@oku-ui/dialog'
import { DESCRIPTION_NAME, scopeAlertDialogProps, useAlertDialogScope } from './utils'

export type AlertDialogDescriptionNaviteElement = OkuElement<'p'>
export type AlertDialogDescriptionElement = typeof OkuDialogDescription

export interface AlertDialogDescriptionProps extends DialogDescriptionProps {}

export type AlertDialogDescriptionEmits = {
  click: [event: MouseEvent]
}

export const alertDialogDescriptionProps = {
  props: {
    ...dialogDescriptionProps.props,
  },
  emits: {
    ...dialogDescriptionProps.emits,
  },
}
const alertDialogDescription = defineComponent({
  name: DESCRIPTION_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...alertDialogDescriptionProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogDescriptionProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...alertDialogDescriptionProps } = toRefs(props)

    const _props = reactive(alertDialogDescriptionProps)

    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)
    const forwardRef = useForwardRef()
    const originalReturn = () => h(OkuDialogDescription, {
      ...dialogScope,
      ...mergeProps(attrs, _props),
      ref: forwardRef,
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogDescription = alertDialogDescription as typeof alertDialogDescription &
(new () => {
  $props: AlertDialogDescriptionNaviteElement
})
