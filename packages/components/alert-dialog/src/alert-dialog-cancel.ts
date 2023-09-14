import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { DialogCloseProps } from '@oku-ui/dialog'
import { OkuDialogClose, dialogCloseProps } from '@oku-ui/dialog'
import { scopeAlertDialogProps, useAlertDialogContentInject, useAlertDialogScope } from './utils'

const CANCEL_NAME = 'OkuAlertDialogCancel'

export type AlertDialogCancelNaviteElement = OkuElement<'button'>
export type AlertDialogCancelElement = typeof OkuDialogClose

export interface AlertDialogCancelProps extends DialogCloseProps {}

export type AlertDialogCancelEmits = {
  click: [event: MouseEvent]
}

export const alertDialogCancelProps = {
  props: {
    ...dialogCloseProps.props,
  },
  emits: {
    ...dialogCloseProps.emits,
  },
}
const alertDialogCancel = defineComponent({
  name: CANCEL_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...alertDialogCancelProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogCancelProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...alertDialogCancelProps } = toRefs(props)
    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)

    const { cancelRef } = useAlertDialogContentInject(CANCEL_NAME, scopeOkuAlertDialog.value)

    const forwardRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardRef, cancelRef)

    const _props = reactive(alertDialogCancelProps)

    const originalReturn = () => h(OkuDialogClose, {
      ...dialogScope,
      ...mergeProps(attrs, _props),
      ref: composedRefs,
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAlertDialogCancel = alertDialogCancel as typeof alertDialogCancel &
(new () => {
  $props: AlertDialogCancelNaviteElement
})
