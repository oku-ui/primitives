import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { DialogTriggerProps } from '@oku-ui/dialog'
import { OkuDialogTrigger, dialogTriggerProps } from '@oku-ui/dialog'
import { scopeAlertDialogProps, useAlertDialogScope } from './utils'

const TRIGGER_NAME = 'OkuAlertDialogTrigger'

export type AlertDialogTriggerNaviteElement = OkuElement<'button'>
export type AlertDialogTriggerElement = typeof OkuDialogTrigger

export interface AlertDialogTriggerProps extends DialogTriggerProps {}

export type AlertDialogTriggerEmits = {
  click: [event: MouseEvent]
}

export const alertDialogTriggerProps = {
  props: {
    ...dialogTriggerProps.props,
  },
  emits: {
    ...dialogTriggerProps.emits,
  },
}
const alertDialogTrigger = defineComponent({
  name: TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...alertDialogTriggerProps.props,
    ...scopeAlertDialogProps,
  },
  emits: alertDialogTriggerProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuAlertDialog, ...alertDialogTriggerProps } = toRefs(props)
    const dialogScope = useAlertDialogScope(scopeOkuAlertDialog.value)

    const forwardRef = useForwardRef()

    const _props = reactive(alertDialogTriggerProps)

    const originalReturn = () => h(OkuDialogTrigger, {
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
export const OkuAlertDialogTrigger = alertDialogTrigger as typeof alertDialogTrigger &
(new () => {
  $props: AlertDialogTriggerNaviteElement
})
