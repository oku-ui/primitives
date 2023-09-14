import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { DialogCloseProps } from '@oku-ui/dialog'
import { OkuDialogClose, dialogCloseProps } from '@oku-ui/dialog'
import { scopeAlertDialogProps, useAlertDialogScope } from './utils'

const ACTION_NAME = 'OkuAlertDialogAction'

export type AlertDialogActionNaviteElement = OkuElement<'button'>
export type AlertDialogActionElement = typeof OkuDialogClose

export interface AlertDialogActionProps extends DialogCloseProps {}

export type AlertDialogActionEmits = {
  click: [event: MouseEvent]
}

export const alertDialogActionProps = {
  props: {
    ...dialogCloseProps.props,
  },
  emits: {
    ...dialogCloseProps.emits,
  },
}
const alertDialogAction = defineComponent({
  name: ACTION_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...alertDialogActionProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogActionProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...alertDialogActionProps } = toRefs(props)
    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)
    const forwardRef = useForwardRef()

    const _props = reactive(alertDialogActionProps)

    const originalReturn = () => h(OkuDialogClose, {
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
export const OkuAlertDialogAction = alertDialogAction as typeof alertDialogAction &
(new () => {
  $props: AlertDialogActionNaviteElement
})
